import { LETTERS, LETTER_START_WEEK, weekThursday, type PoetryLetter } from "@/content/poetry";
import { isoWeek } from "@/lib/tarotSubscribers";

/**
 * Which letter belongs to which week.
 *
 * Letter 0 goes out in LETTER_START_WEEK, letter 1 the week after, and so on — one per week,
 * each exactly once. Weeks never repeat, so no subscriber can ever receive the same letter
 * twice. Before the first week and after the last letter, a week has no letter at all: the
 * sender then sends nothing rather than repeating one.
 */

const WEEK_MS = 7 * 86400000;

/** How many weeks after the first letter's week this ISO week is (negative before it). */
export function letterIndexForWeek(week: string): number {
  const start = Date.parse(weekThursday(LETTER_START_WEEK));
  const target = Date.parse(weekThursday(week));
  return Math.round((target - start) / WEEK_MS);
}

/** The ISO week a letter goes out in. */
export function weekForLetterIndex(index: number): string {
  const thursday = new Date(Date.parse(weekThursday(LETTER_START_WEEK)) + index * WEEK_MS);
  return isoWeek(new Date(thursday.getUTCFullYear(), thursday.getUTCMonth(), thursday.getUTCDate())).key;
}

/** The letter that goes out this week, or null when there is none (never a repeat). */
export function letterForWeek(week: string): PoetryLetter | null {
  const index = letterIndexForWeek(week);
  return index >= 0 && index < LETTERS.length ? LETTERS[index] : null;
}

/** Every letter that has gone out up to and including `week`, newest first, with its week. */
export function lettersSentBy(week: string): { letter: PoetryLetter; week: string }[] {
  const last = Math.min(letterIndexForWeek(week), LETTERS.length - 1);
  const out: { letter: PoetryLetter; week: string }[] = [];
  for (let i = last; i >= 0; i--) out.push({ letter: LETTERS[i], week: weekForLetterIndex(i) });
  return out;
}

/** Letters still to come after `week`. */
export function lettersRemainingAfter(week: string): number {
  return Math.max(0, LETTERS.length - 1 - letterIndexForWeek(week));
}

/** This week's letter, or — once the list has run out — the most recent one, for display only. */
export function currentLetterForDisplay(now = new Date()): PoetryLetter | null {
  const week = isoWeek(now).key;
  return letterForWeek(week) ?? lettersSentBy(week)[0]?.letter ?? LETTERS[0] ?? null;
}
