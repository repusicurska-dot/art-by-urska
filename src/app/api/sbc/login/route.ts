import { NextRequest, NextResponse } from "next/server";
import { sendLoginEmail } from "@/lib/starCalendar/emails";
import { getMember } from "@/lib/starCalendar/store";
import { isAvailable, isEmail, parseLang } from "@/lib/starCalendar/validate";
import { clientIp, withinDailyLimit } from "@/lib/rateLimit";

/**
 * Sends a sign-in link to a member. Answers the same whether or not the address is a member,
 * so the form can't be used to find out who subscribes.
 */
export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const lang = parseLang(body.lang);
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!isEmail(email)) {
    return NextResponse.json({ error: lang === "sl" ? "Vpiši veljaven e-naslov." : "Please enter a valid email." }, { status: 400 });
  }
  if (!isAvailable()) return NextResponse.json({ ok: true });
  if (!(await withinDailyLimit("sbc-login", { ip: clientIp(request), email }, { perIp: 10, perEmail: 5 }))) {
    return NextResponse.json({ error: lang === "sl" ? "Preveč poskusov danes." : "Too many attempts today." }, { status: 429 });
  }
  const member = await getMember(email);
  if (member && member.stripeSubscriptionId) await sendLoginEmail(member);
  return NextResponse.json({ ok: true });
}
