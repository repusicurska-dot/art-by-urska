import { redis } from "@/lib/redis";
import { sendEmail } from "@/lib/email";
import { OSS_ALERT_EMAILS } from "@/lib/ossThreshold";
import { sendPoetryLetter } from "@/lib/poetry/emails";
import { letterForWeek, lettersRemainingAfter } from "@/lib/poetry/schedule";
import { hasPoetryAccess, syncPoetry } from "@/lib/poetry/subscription";
import { isoWeek } from "@/lib/tarotSubscribers";
import { allMemberEmails, getMember } from "@/lib/starCalendar/store";

/** Warn the owners this many weeks before the written letters run out. */
const LOW_STOCK_WEEKS = 8;

/**
 * The weekly "Letter from the studio", sent automatically to everyone whose poetry subscription
 * is live. Each week has its own letter (lib/poetry/schedule.ts), so letters never repeat.
 *
 * Two locks make sure nobody gets the same letter twice even if a run is retried or the
 * schedule were ever changed: one per member per week, and one per member per letter.
 * When the written letters run out, nothing is sent — and Urška and Teo hear about it by email
 * eight weeks ahead.
 */
export async function sendPoetryLetters(now = new Date()): Promise<{
  week: string;
  letter: string | null;
  sent: number;
  remaining: number;
}> {
  const week = isoWeek(now).key;
  const letter = letterForWeek(week);
  const remaining = lettersRemainingAfter(week);
  await warnIfRunningLow(week, remaining);
  if (!letter) return { week, letter: null, sent: 0, remaining };

  let sent = 0;
  for (const email of await allMemberEmails()) {
    const cached = await getMember(email);
    if (!cached?.poetry) continue;
    const member = await syncPoetry(cached, 0);
    if (!hasPoetryAccess(member)) continue;

    const weekLock = await redis<string | null>(["SET", `poetry:sent:${week}:${email}`, "1", "NX", "EX", 40 * 86400]);
    if (weekLock !== "OK") continue;
    // Kept for good: this person has had this letter, whatever week it is.
    const letterLock = await redis<string | null>(["SET", `poetry:got:${letter.id}:${email}`, "1", "NX"]);
    if (letterLock !== "OK") continue;
    if (await sendPoetryLetter(member, letter)) sent++;
  }
  return { week, letter: letter.id, sent, remaining };
}

async function warnIfRunningLow(week: string, remaining: number) {
  if (remaining > LOW_STOCK_WEEKS) return;
  const claimed = await redis<string | null>(["SET", `poetry:lowstock:${week}`, "1", "NX", "EX", 40 * 86400]);
  if (claimed !== "OK") return;
  const text =
    remaining === 0
      ? "Pisma iz ateljeja so porabljena — ta teden in naprej se naročnikom ne pošlje nič, dokler v src/content/poetry.ts ne dodamo novih."
      : `Pisem iz ateljeja je ostalo še za ${remaining} ${remaining === 1 ? "teden" : "tednov"}. Po tem se naročnikom ne bo pošiljalo nič, dokler v src/content/poetry.ts ne dodamo novih — ponovitev ne bo nikoli.`;
  for (const to of OSS_ALERT_EMAILS) {
    await sendEmail({ to, subject: "🕊️ Pisma iz ateljeja — zaloga gre h koncu", text });
  }
}
