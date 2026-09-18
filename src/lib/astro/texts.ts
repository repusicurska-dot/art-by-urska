import type { Planet, Sign } from "./ephemeris";
import type { Category, DayReading, DayType, Factor } from "./calendar";
import { STRINGS, byKey, type Lang } from "./strings";

/**
 * Every word the Star Business Calendar says, generated from the readings — in all five site
 * languages, with emoji. Written to be clear and grounded: a planning ritual, never a promise.
 *
 * The words themselves live in ./strings/<lang>.ts, one file per language, because each
 * language builds these sentences with its own grammar. This file is only the assembly: it
 * picks the pieces and joins them.
 */

export type { Lang } from "./strings";
type T = Record<Lang, string>;

export const PRODUCT_NAME: T = {
  sl: STRINGS.sl.productName,
  en: STRINGS.en.productName,
  hr: STRINGS.hr.productName,
  de: STRINGS.de.productName,
  it: STRINGS.it.productName,
};

export const TYPE_EMOJI: Record<DayType, string> = { contracts: "🤝", beginnings: "🚀", avoid: "⛔", self: "🧘" };
export const CATEGORY_EMOJI: Record<Category, string> = {
  contracts: "🤝",
  beginnings: "🚀",
  avoid: "⛔",
  self: "🧘",
  love: "💞",
  money: "💰",
  health: "🌿",
};

export const TYPE_LABEL = byKey<DayType>((s) => s.typeLabel);
export const TYPE_ADVICE = byKey<DayType>((s) => s.typeAdvice);
export const CATEGORY_LABEL = byKey<Category>((s) => s.categoryLabel);
export const SIGN_NAME = byKey<Sign>((s) => s.signName);

export const SIGN_SYMBOL: Record<Sign, string> = {
  aries: "♈",
  taurus: "♉",
  gemini: "♊",
  cancer: "♋",
  leo: "♌",
  virgo: "♍",
  libra: "♎",
  scorpio: "♏",
  sagittarius: "♐",
  capricorn: "♑",
  aquarius: "♒",
  pisces: "♓",
};

export const PLANET_SYMBOL: Record<Planet, string> = {
  sun: "☉",
  moon: "☽",
  mercury: "☿",
  venus: "♀",
  mars: "♂",
  jupiter: "♃",
  saturn: "♄",
};

/** How harmonious an aspect is — it picks the emoji and the hopeful or wary wording. */
const ASPECT_HARMONY = {
  conjunction: 0,
  sextile: 1,
  trine: 1,
  square: -1,
  opposition: -1,
} as const;

export function moonEmoji(phase: number): string {
  const icons = ["🌑", "🌒", "🌓", "🌔", "🌕", "🌖", "🌗", "🌘"];
  return icons[Math.round(phase / 45) % 8];
}

export function moonPhaseName(phase: number, lang: Lang): string {
  return STRINGS[lang].moonPhaseName[Math.round(phase / 45) % 8];
}

function pairHint(a: Planet, b: Planet, harmony: number, lang: Lang): string {
  const s = STRINGS[lang];
  const key = `${a}-${b}`;
  return (harmony < 0 ? s.pairHintTense[key] : s.pairHintGood[key]) ?? s.pairHintFallback;
}

function personalHint(transit: Planet, harmony: number, lang: Lang): string {
  const s = STRINGS[lang];
  return (harmony < 0 ? s.personalHintHard[transit] : s.personalHintGood[transit]) ?? s.personalHintFallback;
}

/** One sentence explaining a single factor. */
export function factorText(f: Factor, lang: Lang): string {
  const s = STRINGS[lang];
  switch (f.kind) {
    case "mercuryRetro":
      return s.factor.mercuryRetro;
    case "mercuryDirect":
      return s.factor.mercuryDirect;
    case "venusRetro":
      return s.factor.venusRetro;
    case "marsRetro":
      return s.factor.marsRetro;
    case "planetStation":
      return s.factor.planetStation(s.planetName[f.planet]);
    case "moonVoid":
      return s.factor.moonVoid;
    case "eclipse": {
      const kind = f.eclipse === "solar" ? s.factor.eclipseSolar : s.factor.eclipseLunar;
      if (f.daysAway === 0) return s.factor.eclipseToday(kind);
      return f.daysAway > 0 ? s.factor.eclipseApproaching(kind) : s.factor.eclipsePassed(kind);
    }
    case "newMoon":
      return s.factor.newMoon;
    case "fullMoon":
      return s.factor.fullMoon;
    case "waxing":
      return s.factor.waxing;
    case "waning":
      return s.factor.waning;
    case "balsamic":
      return s.factor.balsamic;
    case "moonSign":
      return `${SIGN_SYMBOL[f.sign]} ${s.planetName.moon} ${s.moonInSign[f.sign]} — ${s.moonSignHint[f.sign]}`;
    case "transitAspect": {
      const harmony = ASPECT_HARMONY[f.aspect];
      const icon = harmony > 0 ? "✨" : harmony < 0 ? "⚡" : "🔗";
      return `${icon} ${s.planetName[f.a]} ${s.aspectPhrase[f.aspect]} ${s.planetObject[f.b]} — ${pairHint(f.a, f.b, harmony, lang)}`;
    }
    case "personalAspect": {
      const harmony = ASPECT_HARMONY[f.aspect];
      const icon = harmony > 0 ? "🌟" : harmony < 0 ? "🔥" : "💫";
      return `${icon} ${s.planetName[f.transit]} ${s.personalVerb[f.aspect]} ${s.natalPlanet[f.natal]} — ${personalHint(f.transit, harmony, lang)}`;
    }
    case "moonOverNatalSun":
      return s.factor.moonOverNatalSun;
    case "lunarReturn":
      return s.factor.lunarReturn;
  }
}

export function starsText(n: number): string {
  return "★".repeat(n) + "☆".repeat(3 - n);
}

/** Short headline for a day, e.g. "🤝 Dober za pogodbe · 🌒 ♍". */
export function dayHeadline(day: DayReading, lang: Lang): string {
  return `${TYPE_EMOJI[day.type]} ${TYPE_LABEL[day.type][lang]} · ${moonEmoji(day.moonPhase)} ${SIGN_SYMBOL[day.moonSign]}`;
}

export function formatDate(
  date: string,
  lang: Lang,
  opts: Intl.DateTimeFormatOptions = { weekday: "short", day: "numeric", month: "short" }
): string {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d, 12)).toLocaleDateString(STRINGS[lang].locale, { timeZone: "UTC", ...opts });
}

function cap(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/** The month overview / personal monthly horoscope, as plain paragraphs. */
export function monthSummary(days: DayReading[], lang: Lang, sunSign?: Sign): { title: string; paragraphs: string[] } {
  const s = STRINGS[lang];
  const count: Record<DayType, number> = { contracts: 0, beginnings: 0, avoid: 0, self: 0 };
  for (const d of days) count[d.type]++;
  const dominant = (Object.keys(count) as DayType[]).sort((a, b) => count[b] - count[a])[0];

  const best = (cat: Category, n = 3) =>
    [...days]
      .sort((a, b) => b.scores[cat] - a.scores[cat])
      .filter((d) => d.scores[cat] > 0 && d.type !== "avoid")
      .slice(0, n)
      .sort((a, b) => a.date.localeCompare(b.date))
      .map((d) => formatDate(d.date, lang, { day: "numeric", month: "numeric" }));

  const avoidDays = days.filter((d) => d.type === "avoid").map((d) => formatDate(d.date, lang, { day: "numeric", month: "numeric" }));
  const retro = new Set(days.flatMap((d) => d.retrograde));
  const eclipses = days.filter((d) => d.eclipse);
  const personal = days.flatMap((d) => d.factors.filter((f) => f.factor.kind === "personalAspect").map((f) => f.factor));
  const personalCounts = new Map<string, { f: Factor; n: number }>();
  for (const f of personal) {
    const key = JSON.stringify(f);
    personalCounts.set(key, { f, n: (personalCounts.get(key)?.n ?? 0) + 1 });
  }
  const longTransits = [...personalCounts.values()].filter((x) => x.n >= 5).map((x) => x.f).slice(0, 2);

  const monthName = cap(formatDate(days[0].date, lang, { month: "long", year: "numeric" }));
  const paragraphs: string[] = [];

  paragraphs.push(
    (sunSign ? `${SIGN_SYMBOL[sunSign]} ${s.month.forSign(s.signName[sunSign])}` : "") + s.month.intro[dominant]
  );

  if (longTransits.length) {
    paragraphs.push(longTransits.map((f) => factorText(f, lang)).join(" "));
  }

  const notes: string[] = [];
  if (retro.has("mercury")) notes.push(s.month.mercuryRetro);
  if (retro.has("venus")) notes.push(s.month.venusRetro);
  if (retro.has("mars")) notes.push(s.month.marsRetro);
  for (const e of eclipses) {
    notes.push(
      s.month.eclipseOn(
        formatDate(e.date, lang, { day: "numeric", month: "numeric" }),
        e.eclipse === "solar" ? s.factor.eclipseSolar : s.factor.eclipseLunar
      )
    );
  }
  if (notes.length) paragraphs.push(notes.join(" "));

  const line = (emoji: string, label: string, list: string[]) => (list.length ? `${emoji} ${label}: ${list.join(", ")}` : null);
  paragraphs.push(
    [
      line("🤝", s.month.bestContracts, best("contracts")),
      line("🚀", s.month.bestBeginnings, best("beginnings")),
      line("💰", s.month.forMoney, best("money")),
      line("💞", s.month.forLove, best("love")),
      line("🌿", s.month.forHealth, best("health")),
      line("⛔", s.month.startNothing, avoidDays),
    ]
      .filter(Boolean)
      .join("\n")
  );

  paragraphs.push(s.month.disclaimer);

  return {
    title: sunSign ? s.month.titlePersonal(monthName) : s.month.titleOverview(monthName),
    paragraphs,
  };
}
