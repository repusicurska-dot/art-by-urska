import { API_MESSAGES } from "@/lib/apiMessages";
import { NextRequest, NextResponse } from "next/server";
import { sendLoginEmail } from "@/lib/starCalendar/emails";
import { SESSION_COOKIE, SIGNED_IN_HINT, hintCookieOptions, sessionCookieOptions, sessionValue } from "@/lib/starCalendar/session";
import { getMember, isComplimentary } from "@/lib/starCalendar/store";
import { verifyPassword } from "@/lib/starCalendar/password";
import { isAvailable, isEmail, parseLang } from "@/lib/starCalendar/validate";
import { clientIp, withinDailyLimit } from "@/lib/rateLimit";

/**
 * Signing in. With a password when the account has one; for accounts created before passwords
 * existed (or when the visitor asks for it), a one-time link by email instead.
 *
 * Wrong password and unknown address answer exactly the same way, so the form can't be used to
 * find out who has an account.
 */
export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const lang = parseLang(body.lang);
  const m = API_MESSAGES[lang];
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const wantsLink = body.mode === "link";

  if (!isEmail(email)) {
    return NextResponse.json({ error: m.invalidEmail }, { status: 400 });
  }
  if (!isAvailable()) return NextResponse.json({ sent: true });
  if (!(await withinDailyLimit("sbc-login", { ip: clientIp(request), email }, { perIp: 20, perEmail: 10 }))) {
    return NextResponse.json(
      { error: m.tooManySignIn },
      { status: 429 }
    );
  }

  const member = await getMember(email);

  // Sign-in link: same answer whether or not the address is a member.
  if (wantsLink) {
    if (member && (member.stripeSubscriptionId || isComplimentary(member.email))) await sendLoginEmail(member);
    return NextResponse.json({ sent: true });
  }

  const password = typeof body.password === "string" ? body.password : "";
  const ok = !!member && (await verifyPassword(password, member.passwordHash));
  if (!ok) {
    return NextResponse.json(
      {
        error: m.wrongEmailOrPassword,
      },
      { status: 401 }
    );
  }

  const response = NextResponse.json({ ok: true });
  const { value, maxAge } = sessionValue(email);
  response.cookies.set(SESSION_COOKIE, value, { ...sessionCookieOptions, maxAge });
  response.cookies.set(SIGNED_IN_HINT, "1", { ...hintCookieOptions, maxAge });
  return response;
}
