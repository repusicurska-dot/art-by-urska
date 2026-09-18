import { dayReading, monthReadings, natalChart, type DayReading, type NatalChart } from "@/lib/astro/calendar";
import { signOf, type Sign } from "@/lib/astro/ephemeris";
import { TYPE_LABEL, TYPE_ADVICE, CATEGORY_EMOJI, factorText, moonEmoji, moonPhaseName, SIGN_NAME, SIGN_SYMBOL, starsText, TYPE_EMOJI, type Lang } from "@/lib/astro/texts";
import { ljubljanaDate } from "@/lib/bookings";
import type { Member } from "./store";

export function memberNatal(member: Member): NatalChart {
  return natalChart(member.birthDate, member.birthTime, member.birthTimeZone);
}

export function memberSunSign(member: Member): Sign {
  return signOf(memberNatal(member).positions.sun);
}

export function memberMonth(member: Member, year: number, month: number): DayReading[] {
  return monthReadings(year, month, memberNatal(member));
}

/** The next `count` days starting today (Ljubljana), personal. */
export function memberUpcoming(member: Member, count: number): DayReading[] {
  const natal = memberNatal(member);
  return Array.from({ length: count }, (_, i) => dayReading(ljubljanaDate(i), natal));
}

/** Just the word "Moon", for the one-line day description. */
const PLANET_LABEL: Record<Lang, string> = { sl: "Luna", en: "Moon", hr: "Mjesec", de: "Mond", it: "Luna" };

/** Plain-text description of one day, used in emails and calendar events. */
export function dayDescription(day: DayReading, lang: Lang): string {
  return [
    `${TYPE_EMOJI[day.type]} ${TYPE_LABEL[day.type][lang]} — ${TYPE_ADVICE[day.type][lang]}`,
    `${moonEmoji(day.moonPhase)} ${PLANET_LABEL[lang]}: ${moonPhaseName(day.moonPhase, lang)}, ${SIGN_SYMBOL[day.moonSign]} ${SIGN_NAME[day.moonSign][lang]}`,
    `${CATEGORY_EMOJI.love} ${starsText(day.stars.love)}  ${CATEGORY_EMOJI.money} ${starsText(day.stars.money)}  ${CATEGORY_EMOJI.health} ${starsText(day.stars.health)}`,
    "",
    ...day.factors.map((f) => factorText(f.factor, lang)),
  ].join("\n");
}
