import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, sessionCookieOptions } from "@/lib/starCalendar/session";

export async function POST(request: NextRequest) {
  const response = NextResponse.redirect(new URL("/zvezdni-koledar", request.url), 303);
  response.cookies.set(SESSION_COOKIE, "", { ...sessionCookieOptions, maxAge: 0 });
  return response;
}
