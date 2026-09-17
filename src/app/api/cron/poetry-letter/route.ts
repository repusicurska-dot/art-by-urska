import { NextRequest, NextResponse } from "next/server";
import { isAuthorizedCron } from "@/lib/cron";
import { sendPoetryLetters } from "@/lib/poetry/send";
import { isAvailable } from "@/lib/starCalendar/validate";

/**
 * The weekly letter. Vercel's Hobby plan allows only a handful of cron jobs, so this isn't
 * scheduled on its own — the daily `sbc-digest` job calls the same function on Thursdays. This
 * route stays for sending a letter by hand (or from a scheduler later) and is safe to call
 * twice: every member's send is claimed once per week.
 */
export async function GET(request: NextRequest) {
  if (!isAuthorizedCron(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isAvailable()) return NextResponse.json({ skipped: "not configured" });
  return NextResponse.json(await sendPoetryLetters());
}
