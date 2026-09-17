import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, SIGNED_IN_HINT, hintCookieOptions, sessionCookieOptions, sessionValue, verifyLoginToken } from "@/lib/starCalendar/session";

/** The sign-in link from the email: sets the session cookie and opens the member page. */
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const email = (params.get("e") ?? "").toLowerCase();
  const exp = Number(params.get("exp"));
  const token = params.get("t") ?? "";
  if (!email || !verifyLoginToken(email, exp, token)) {
    return NextResponse.redirect(new URL("/zvezdni-koledar/prijava?expired=1", request.url), 303);
  }
  const response = NextResponse.redirect(new URL("/zvezdni-koledar/moj", request.url), 303);
  const { value, maxAge } = sessionValue(email);
  response.cookies.set(SESSION_COOKIE, value, { ...sessionCookieOptions, maxAge });
  response.cookies.set(SIGNED_IN_HINT, "1", { ...hintCookieOptions, maxAge });
  return response;
}
