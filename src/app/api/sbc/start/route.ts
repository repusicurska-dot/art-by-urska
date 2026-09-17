import { NextRequest, NextResponse } from "next/server";
import { createSubscriptionCheckout } from "@/lib/starCalendar/billing";
import { sendLoginEmail } from "@/lib/starCalendar/emails";
import { getMember, hasAccess, newFeedToken, saveMember, type Member } from "@/lib/starCalendar/store";
import { isAvailable, isEmail, parseBirth, parseLang } from "@/lib/starCalendar/validate";
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
  if (existing && hasAccess(existing)) {
    // Already subscribed: don't charge twice — send a sign-in link instead.
    await sendLoginEmail({ ...existing, lang });
    return NextResponse.json({ alreadyMember: true });
  }

  const member: Member = {
    ...(existing ?? { status: "pending", feedToken: newFeedToken(), createdAt: new Date().toISOString() }),
    email,
    lang,
    ...birth,
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
