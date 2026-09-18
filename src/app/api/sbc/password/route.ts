import { API_MESSAGES } from "@/lib/apiMessages";
import { NextRequest, NextResponse } from "next/server";
import { clientIp, withinDailyLimit } from "@/lib/rateLimit";
import { sendPasswordChangedEmail, sendPasswordResetEmail } from "@/lib/starCalendar/emails";
import { hashPassword, passwordProblem, verifyPassword, verifyResetToken } from "@/lib/starCalendar/password";
import { SESSION_COOKIE, SIGNED_IN_HINT, currentMemberEmail, hintCookieOptions, sessionCookieOptions, sessionValue } from "@/lib/starCalendar/session";
import { getMember, saveMember } from "@/lib/starCalendar/store";
import { isAvailable, isEmail, parseLang } from "@/lib/starCalendar/validate";

/**
 * Everything about a member's password:
 *
 *   action "forgot" — emails a reset link (always answers the same, member or not)
 *   action "reset"  — sets a new password from that link, and signs them in
 *   action "change" — changes the password of the signed-in member, current one required
 */
export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const lang = parseLang(body.lang);
  const m = API_MESSAGES[lang];
  const action = body.action;

  if (!isAvailable()) {
    return NextResponse.json({ error: m.notAvailable }, { status: 503 });
  }

  if (action === "forgot") {
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    if (!isEmail(email)) {
      return NextResponse.json({ error: m.invalidEmail }, { status: 400 });
    }
    if (!(await withinDailyLimit("sbc-forgot", { ip: clientIp(request), email }, { perIp: 10, perEmail: 5 }))) {
      return NextResponse.json({ error: m.tooManyTodayShort }, { status: 429 });
    }
    const member = await getMember(email);
    if (member) await sendPasswordResetEmail({ ...member, lang });
    return NextResponse.json({ sent: true });
  }

  if (action === "reset") {
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const exp = Number(body.exp);
    const token = typeof body.token === "string" ? body.token : "";
    const issue = passwordProblem(body.password, lang);
    if (issue) return NextResponse.json({ error: issue }, { status: 400 });
    if (!isEmail(email)) {
      return NextResponse.json({ error: m.linkInvalid }, { status: 400 });
    }
    if (!(await withinDailyLimit("sbc-reset", { ip: clientIp(request), email }, { perIp: 20, perEmail: 10 }))) {
      return NextResponse.json({ error: m.tooManyTodayShort }, { status: 429 });
    }

    const member = await getMember(email);
    // The token covers the old hash, so a used or superseded link no longer verifies.
    if (!member || !verifyResetToken(email, exp, token, member.passwordHash)) {
      return NextResponse.json(
        {
          error: m.linkExpired,
        },
        { status: 400 }
      );
    }

    const updated = {
      ...member,
      passwordHash: await hashPassword(body.password as string),
      passwordUpdatedAt: new Date().toISOString(),
    };
    await saveMember(updated);
    await sendPasswordChangedEmail(updated);

    // Straight into the calendar — they've just proven they own the address.
    const response = NextResponse.json({ ok: true });
    const { value, maxAge } = sessionValue(email);
    response.cookies.set(SESSION_COOKIE, value, { ...sessionCookieOptions, maxAge });
    response.cookies.set(SIGNED_IN_HINT, "1", { ...hintCookieOptions, maxAge });
    return response;
  }

  if (action === "change") {
    const email = await currentMemberEmail();
    const member = email ? await getMember(email) : null;
    if (!member) {
      return NextResponse.json({ error: m.notSignedIn }, { status: 401 });
    }
    const issue = passwordProblem(body.password, lang);
    if (issue) return NextResponse.json({ error: issue }, { status: 400 });
    if (!(await withinDailyLimit("sbc-change", { ip: clientIp(request), email: member.email }, { perIp: 20, perEmail: 10 }))) {
      return NextResponse.json({ error: m.tooManyTodayShort }, { status: 429 });
    }

    // Members who never had a password (created before passwords) set one without the old one.
    if (member.passwordHash) {
      const current = typeof body.currentPassword === "string" ? body.currentPassword : "";
      if (!(await verifyPassword(current, member.passwordHash))) {
        return NextResponse.json({ error: m.wrongCurrentPassword }, { status: 401 });
      }
    }

    const updated = {
      ...member,
      passwordHash: await hashPassword(body.password as string),
      passwordUpdatedAt: new Date().toISOString(),
    };
    await saveMember(updated);
    await sendPasswordChangedEmail(updated);
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "Unknown action." }, { status: 400 });
}
