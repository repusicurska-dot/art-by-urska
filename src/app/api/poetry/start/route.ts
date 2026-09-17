import { NextRequest, NextResponse } from "next/server";
import { clientIp, withinDailyLimit } from "@/lib/rateLimit";
import { createPoetryCheckout, hasPoetryAccess } from "@/lib/poetry/subscription";
import { hashPassword, passwordProblem } from "@/lib/starCalendar/password";
import { getMember, isComplimentary, newFeedToken, saveMember, type Member } from "@/lib/starCalendar/store";
import { isAvailable, isEmail, parseLang } from "@/lib/starCalendar/validate";
import { sendPoetryWelcome } from "@/lib/poetry/emails";

/**
 * Subscribing to "Letters from the studio". Same account as the Star Business Calendar: a
 * visitor who already has one signs in and subscribes from their account page instead of
 * creating a second account here, and the owner accounts get it for free.
 */
export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const lang = parseLang(body.lang);
  const sl = lang === "sl";

  if (!isAvailable()) {
    return NextResponse.json({ error: sl ? "Naročnina bo na voljo zelo kmalu." : "Subscriptions open very soon." }, { status: 503 });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!isEmail(email)) {
    return NextResponse.json({ error: sl ? "Vpiši veljaven e-naslov." : "Please enter a valid email." }, { status: 400 });
  }
  const passwordIssue = passwordProblem(body.password, lang);
  if (passwordIssue) return NextResponse.json({ error: passwordIssue }, { status: 400 });
  if (body.consent !== true) {
    return NextResponse.json(
      { error: sl ? "Za nadaljevanje potrdi pogoje naročnine." : "Please accept the subscription terms to continue." },
      { status: 400 }
    );
  }
  if (!(await withinDailyLimit("poetry-start", { ip: clientIp(request), email }, { perIp: 10, perEmail: 5 }))) {
    return NextResponse.json({ error: sl ? "Preveč poskusov danes. Poskusi jutri." : "Too many attempts today. Please try tomorrow." }, { status: 429 });
  }

  const existing = await getMember(email);
  if (existing && hasPoetryAccess(existing)) {
    return NextResponse.json(
      {
        error: sl ? "Ta naslov je že naročen. Prijavi se." : "This address is already subscribed. Please sign in.",
        code: "already_subscribed",
      },
      { status: 409 }
    );
  }
  // An account that already belongs to someone — because it has a password, or has ever paid —
  // must not have its password replaced by whoever types the address into this form. They sign
  // in instead (with "email me a link" if they are old enough not to have a password).
  if (existing?.passwordHash || existing?.stripeCustomerId) {
    return NextResponse.json(
      {
        error: sl
          ? "Račun s tem e-naslovom že obstaja. Prijavi se in naročnino dodaj na svoji strani."
          : "An account with this email already exists. Sign in and add the subscription from your account page.",
        code: "account_exists",
      },
      { status: 409 }
    );
  }

  const now = new Date().toISOString();
  const member: Member = {
    ...(existing ?? {
      status: "pending",
      feedToken: newFeedToken(),
      createdAt: now,
      birthDate: "",
      birthTime: null,
      birthTimeZone: "Europe/Ljubljana",
    }),
    email,
    lang,
    passwordHash: await hashPassword(body.password as string),
    passwordUpdatedAt: now,
  } as Member;

  // The owners read everything for free.
  if (isComplimentary(email)) {
    member.poetry = { ...member.poetry, status: "active", accessUntil: new Date(Date.now() + 100 * 365 * 86400000).toISOString() };
    await saveMember(member);
    await sendPoetryWelcome(member);
    return NextResponse.json({ complimentary: true });
  }

  await saveMember(member);
  try {
    return NextResponse.json({ url: await createPoetryCheckout(member) });
  } catch (err) {
    console.error("[poetry] checkout failed:", err);
    return NextResponse.json(
      { error: sl ? "Plačila ni bilo mogoče začeti. Poskusi znova čez nekaj minut." : "Couldn't start checkout. Please try again in a few minutes." },
      { status: 502 }
    );
  }
}
