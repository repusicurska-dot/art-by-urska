import { NextRequest, NextResponse } from "next/server";
import { createSubscriptionCheckout } from "@/lib/starCalendar/billing";
import { sendLoginEmail } from "@/lib/starCalendar/emails";
import { feedUrls, getMember, hasAccess, isComplimentary, newFeedToken, saveMember, type Member } from "@/lib/starCalendar/store";
import { sendWelcomeEmail } from "@/lib/starCalendar/emails";
import { getSiteUrl } from "@/lib/siteUrl";
import { isAvailable, isEmail, parseBirth, parseLang } from "@/lib/starCalendar/validate";
import { hashPassword, passwordProblem } from "@/lib/starCalendar/password";
import { clientIp, withinDailyLimit } from "@/lib/rateLimit";

/** Sign-up: stores the member's birth data and sends them to Stripe Checkout (7-day trial). */
export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }
  const lang = parseLang(body.lang);
  const sl = lang === "sl";

  if (!isAvailable()) {
    return NextResponse.json(
      { error: sl ? "Naročnina bo na voljo zelo kmalu." : "Subscriptions open very soon." },
      { status: 503 }
    );
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!isEmail(email)) {
    return NextResponse.json({ error: sl ? "Vpiši veljaven e-naslov." : "Please enter a valid email." }, { status: 400 });
  }
  const birth = parseBirth(body);
  if (!birth) {
    return NextResponse.json(
      { error: sl ? "Preveri datum, uro in kraj rojstva." : "Please check your birth date, time and place." },
      { status: 400 }
    );
  }
  const passwordIssue = passwordProblem(body.password, lang);
  if (passwordIssue) {
    return NextResponse.json({ error: passwordIssue }, { status: 400 });
  }
  if (body.consent !== true) {
    return NextResponse.json(
      { error: sl ? "Za nadaljevanje potrdi pogoje naročnine." : "Please accept the subscription terms to continue." },
      { status: 400 }
    );
  }
  if (!(await withinDailyLimit("sbc-start", { ip: clientIp(request), email }, { perIp: 10, perEmail: 5 }))) {
    return NextResponse.json({ error: sl ? "Preveč poskusov danes. Poskusi jutri." : "Too many attempts today. Please try tomorrow." }, { status: 429 });
  }

  const existing = await getMember(email);

  // An account that already exists and still has a password belongs to someone — don't let a
  // stranger overwrite it (or its birth data) just by typing the address into the sign-up form.
  if (existing?.passwordHash) {
    return NextResponse.json(
      {
        error: sl
          ? "Račun s tem e-naslovom že obstaja. Prijavi se s svojim geslom."
          : "An account with this email already exists. Please sign in with your password.",
        code: "account_exists",
      },
      { status: 409 }
    );
  }

  const passwordHash = await hashPassword(body.password as string);
  const now = new Date().toISOString();

  // Owner / free accounts: no payment — store the details and send the welcome email.
  if (isComplimentary(email)) {
    const member: Member = {
      ...(existing ?? { feedToken: newFeedToken(), createdAt: now }),
      email,
      lang,
      ...birth,
      passwordHash,
      passwordUpdatedAt: now,
      status: "active",
    } as Member;
    if (!member.welcomedAt) {
      await sendWelcomeEmail(member, feedUrls(member, getSiteUrl()).webcal);
      member.welcomedAt = new Date().toISOString();
    }
    await saveMember(member);
    return NextResponse.json({ complimentary: true });
  }

  if (existing && hasAccess(existing)) {
    // Subscribed already (an old account without a password): let them in by email link
    // instead of charging twice.
    await sendLoginEmail({ ...existing, lang });
    return NextResponse.json({ alreadyMember: true });
  }

  const member: Member = {
    ...(existing ?? { status: "pending", feedToken: newFeedToken(), createdAt: now }),
    email,
    lang,
    ...birth,
    passwordHash,
    passwordUpdatedAt: now,
  } as Member;
  await saveMember(member);

  try {
    const url = await createSubscriptionCheckout(member);
    return NextResponse.json({ url });
  } catch (err) {
    console.error("[sbc] checkout failed:", err);
    return NextResponse.json(
      { error: sl ? "Plačila trenutno ni mogoče začeti. Poskusi znova čez nekaj minut." : "Couldn't start checkout. Please try again in a few minutes." },
      { status: 502 }
    );
  }
}
