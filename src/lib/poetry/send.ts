import { LETTERS } from "@/content/poetry";
import { redis } from "@/lib/redis";
import { sendPoetryLetter } from "@/lib/poetry/emails";
import { hasPoetryAccess, syncPoetry } from "@/lib/poetry/subscription";
import { isoWeek } from "@/lib/tarotSubscribers";
import { allMemberEmails, getMember } from "@/lib/starCalendar/store";

/**
 * The weekly "Letter from the studio", sent to everyone whose poetry subscription is live.
 *
 * Nothing goes out in a week Urška hasn't written a letter for — the archive still shows the
 * older ones, but no email repeats itself. Each send is claimed per member per week first, so
 * a retried cron run can't email anyone the same letter twice.
 */
export async function sendPoetryLetters(now = new Date()): Promise<{
  week: string;
  letter: string | null;
  sent: number;
}> {
  const week = isoWeek(now).key;
  const letter = LETTERS.find((l) => l.week === week) ?? null;
  if (!letter) return { week, letter: null, sent: 0 };

  let sent = 0;
  for (const email of await allMemberEmails()) {
    const cached = await getMember(email);
    if (!cached?.poetry) continue;
    const member = await syncPoetry(cached, 0);
    if (!hasPoetryAccess(member)) continue;

    const claimed = await redis<string | null>(["SET", `poetry:sent:${week}:${email}`, "1", "NX", "EX", 40 * 86400]);
    if (claimed !== "OK") continue;
    if (await sendPoetryLetter(member, letter)) sent++;
  }
  return { week, letter: letter.id, sent };
}
