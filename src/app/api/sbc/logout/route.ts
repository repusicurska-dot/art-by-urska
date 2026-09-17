import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, SIGNED_IN_HINT, hintCookieOptions, sessionCookieOptions } from "@/lib/starCalendar/session";

export async function POST(request: NextRequest) {
  const response = NextResponse.redirect(new URL("/zvezdni-koledar", request.url), 303);
  response.cookies.set(SESSION_COOKIE, "", { ...sessionCookieOptions, maxAge: 0 });
  response.cookies.set(SIGNED_IN_HINT, "", { ...hintCookieOptions, maxAge: 0 });
  return response;
}
