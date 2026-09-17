import { NextRequest, NextResponse } from "next/server";
import { ljubljanaDate } from "@/lib/bookings";
import { isAuthorizedCron } from "@/lib/cron";
import { redis } from "@/lib/redis";
import { syncMember } from "@/lib/starCalendar/billing";
import { sendMonthlyEmail, sendWeeklyEmail } from "@/lib/starCalendar/emails";
import { memberMonth, memberUpcoming } from "@/lib/starCalendar/readings";
import { sendPoetryLetters } from "@/lib/poetry/send";
import { allMemberEmails, getMember, hasAccess } from "@/lib/starCalendar/store";
import { isAvailable } from "@/lib/starCalendar/validate";

/**
 * Daily (vercel.json). On the 1st of the month every active member gets their personal monthly
 * horoscope; on Mondays, the week ahead; on Thursdays, the Poetry subscribers get that week's
 * letter from the studio. Each send is claimed per member per period first, so a retried run
 * doesn't email anyone twice.
 *
 * The three jobs share one cron because the Hobby plan allows only a few — see
 * api/cron/poetry-letter for sending a letter by hand.
 */
export async function GET(request: NextRequest) {
  if (!isAuthorizedCron(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isAvailable()) return NextResponse.json({ skipped: "not configured" });

  const today = ljubljanaDate();
  const [y, m, d] = today.split("-").map(Number);
  const weekday = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
  const monday = weekday === 1;
  const thursday = weekday === 4;
  const firstOfMonth = d === 1;
  const poetry = thursday ? await sendPoetryLetters() : null;
  if (!monday && !firstOfMonth) return NextResponse.json({ today, poetry, skipped: "nothing else due" });

  let monthly = 0;
  let weekly = 0;
  for (const email of await allMemberEmails()) {
    const cached = await getMember(email);
    if (!cached) continue;
    const member = await syncMember(cached, 0);
    if (!hasAccess(member)) continue;

    if (firstOfMonth) {
      const claimed = await redis<string | null>(["SET", `sbc:sent:month:${today.slice(0, 7)}:${email}`, "1", "NX", "EX", 40 * 86400]);
      if (claimed === "OK" && (await sendMonthlyEmail(member, memberMonth(member, y, m)))) monthly++;
    }
    if (monday) {
      const claimed = await redis<string | null>(["SET", `sbc:sent:week:${today}:${email}`, "1", "NX", "EX", 10 * 86400]);
      if (claimed === "OK" && (await sendWeeklyEmail(member, memberUpcoming(member, 7)))) weekly++;
    }
  }
  return NextResponse.json({ today, monthly, weekly, poetry });
}
