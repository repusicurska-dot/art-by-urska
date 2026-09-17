import { NextRequest, NextResponse } from "next/server";
import { getBookingsOnDate, ljubljanaDate, markReminderSent } from "@/lib/bookings";
import { sendOwnerTomorrow, sendVisitorReminder } from "@/lib/bookingEmails";
import { isAuthorizedCron } from "@/lib/cron";
import { isEmailConfigured } from "@/lib/email";
import { isRedisConfigured } from "@/lib/redis";

/**
 * Daily (vercel.json): reminds every visitor with a confirmed reading tomorrow, and sends
 * Urška one summary of tomorrow's readings. Each booking is reminded at most once.
 */
export async function GET(request: NextRequest) {
  if (!isAuthorizedCron(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isRedisConfigured() || !isEmailConfigured()) {
    return NextResponse.json({ skipped: "database or email not configured" });
  }

  const tomorrow = ljubljanaDate(1);
  const confirmed = (await getBookingsOnDate(tomorrow)).filter((b) => b.status === "confirmed");
  const due = confirmed.filter((b) => !b.reminderSentAt);

  let reminded = 0;
  for (const booking of due) {
    if (await sendVisitorReminder(booking)) {
      await markReminderSent(booking);
      reminded++;
    }
  }
  if (due.length > 0) await sendOwnerTomorrow(confirmed);

  return NextResponse.json({ date: tomorrow, confirmed: confirmed.length, reminded });
}
