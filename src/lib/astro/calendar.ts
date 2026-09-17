import {
  aspectBetween,
  dailyMotion,
  eclipsesBetween,
  isMoonVoid,
  isRetrograde,
  moonPhaseAngle,
  positions,
  signOf,
  type AspectName,
  type Planet,
  type Positions,
  type Sign,
} from "./ephemeris";

/**
 * The Star Business Calendar's rules: turns planetary positions into a score per life area for
 * every day, generally and — given a birth chart — personally. Rules follow traditional
 * electional astrology (Mercury for contracts, the waxing Moon for beginnings, void-of-course
 * Moon and eclipses as "start nothing", Venus for love, Jupiter for money, and so on).
 *
 * This is spiritual/entertainment content, not financial advice — the UI says so.
 */

export const CATEGORIES = ["contracts", "beginnings", "avoid", "self", "love", "money", "health"] as const;
export type Category = (typeof CATEGORIES)[number];

/** The four day types from the original brief; love/money/health are extra "stars". */
export const DAY_TYPES = ["contracts", "beginnings", "avoid", "self"] as const;
export type DayType = (typeof DAY_TYPES)[number];

/** A reason behind a score, rendered to text in texts.ts. */
export type Factor =
  | { kind: "mercuryRetro" }
  | { kind: "mercuryDirect" }
  | { kind: "venusRetro" }
  | { kind: "marsRetro" }
  | { kind: "planetStation"; planet: Planet }
  | { kind: "moonVoid" }
  | { kind: "eclipse"; eclipse: "solar" | "lunar"; daysAway: number }
  | { kind: "newMoon" }
  | { kind: "fullMoon" }
  | { kind: "waxing" }
  | { kind: "waning" }
  | { kind: "balsamic" }
  | { kind: "moonSign"; sign: Sign }
  | { kind: "transitAspect"; a: Planet; b: Planet; aspect: AspectName }
  | { kind: "personalAspect"; transit: Planet; natal: Planet; aspect: AspectName }
  | { kind: "moonOverNatalSun" }
  | { kind: "lunarReturn" };

interface Contribution {
  category: Category;
  points: number;
  factor: Factor;
}

export interface DayReading {
  /** YYYY-MM-DD (Ljubljana calendar day; positions taken at 12:00 local) */
  date: string;
  moonPhase: number;
  moonSign: Sign;
  sunSign: Sign;
  retrograde: Planet[];
  moonVoid: boolean;
  eclipse: "solar" | "lunar" | null;
  scores: Record<Category, number>;
  /** The day's headline type. */
  type: DayType;
  /** 0–3 stars for love, money, health. */
  stars: { love: number; money: number; health: number };
  /** Strongest reasons, most important first. */
  factors: { category: Category; points: number; factor: Factor }[];
  personal: boolean;
}

export interface NatalChart {
  positions: Positions;
  /** Whether the birth time was known (the Moon's position is only reliable with it). */
  timeKnown: boolean;
}

const FIRE: Sign[] = ["aries", "leo", "sagittarius"];
const EARTH: Sign[] = ["taurus", "virgo", "capricorn"];
const WATER: Sign[] = ["cancer", "scorpio", "pisces"];

/** Noon in Ljubljana for a YYYY-MM-DD, as a UTC Date. */
export function middayLjubljana(date: string): Date {
  return zonedTimeToUtc(date, "12:00", "Europe/Ljubljana");
}

/** Converts a wall-clock time in an IANA zone to the UTC instant. */
export function zonedTimeToUtc(date: string, time: string, timeZone: string): Date {
  const [y, m, d] = date.split("-").map(Number);
  const [h, min] = time.split(":").map(Number);
  const guess = Date.UTC(y, m - 1, d, h, min);
  const offsetAt = (ms: number) => {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone,
      hourCycle: "h23",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).formatToParts(new Date(ms));
    const get = (t: string) => Number(parts.find((p) => p.type === t)?.value);
    return Date.UTC(get("year"), get("month") - 1, get("day"), get("hour"), get("minute")) - ms;
  };
  const first = guess - offsetAt(guess);
  return new Date(guess - offsetAt(first));
}

export function natalChart(birthDate: string, birthTime: string | null, timeZone: string): NatalChart {
  const instant = zonedTimeToUtc(birthDate, birthTime ?? "12:00", timeZone);
  return { positions: positions(instant), timeKnown: !!birthTime };
}

function generalContributions(date: Date, eclipses: { kind: "solar" | "lunar"; date: Date }[]): {
  list: Contribution[];
  meta: Pick<DayReading, "moonPhase" | "moonSign" | "sunSign" | "retrograde" | "moonVoid" | "eclipse">;
  pos: Positions;
} {
  const pos = positions(date);
  const list: Contribution[] = [];
  const add = (category: Category, points: number, factor: Factor) => list.push({ category, points, factor });

  const phase = moonPhaseAngle(date);
  const moonSign = signOf(pos.moon);
  const retrograde = (["mercury", "venus", "mars", "jupiter", "saturn"] as Planet[]).filter((p) => isRetrograde(p, date));
  // Void through the whole working day (9:00, 12:00 and 15:00 all void) — short void spells
  // that fall outside working hours don't make a day "start nothing".
  const voidSamples = [-3, 0, 3].filter((h) => isMoonVoid(new Date(date.getTime() + h * 3600000))).length;
  const moonVoid = voidSamples === 3;

  let eclipse: "solar" | "lunar" | null = null;
  for (const e of eclipses) {
    const days = Math.round((e.date.getTime() - date.getTime()) / 86400000);
    if (days === 0) eclipse = e.kind;
    if (Math.abs(days) <= 3) {
      const f: Factor = { kind: "eclipse", eclipse: e.kind, daysAway: days };
      add("beginnings", days === 0 ? -5 : -2, f);
      add("contracts", days === 0 ? -3 : -1, f);
      add("avoid", days === 0 ? 6 : 2, f);
      add("self", 2, f);
    }
  }

  // Stations: a planet turning retrograde or direct — the day itself is unsettled.
  // Only the day the direction actually flips counts, not the slow days around it.
  for (const p of ["mercury", "venus", "mars"] as Planet[]) {
    const before = dailyMotion(p, new Date(date.getTime() - 86400000 / 2));
    const after = dailyMotion(p, new Date(date.getTime() + 86400000 / 2));
    if (Math.sign(before) !== Math.sign(after)) {
      add("avoid", p === "mercury" ? 4 : 2, { kind: "planetStation", planet: p });
      if (p === "mercury") add("contracts", -3, { kind: "planetStation", planet: p });
    }
  }

  if (!retrograde.includes("mercury") && Math.abs(dailyMotion("mercury", date)) > 1) {
    add("contracts", 0.5, { kind: "mercuryDirect" });
  }
  if (retrograde.includes("mercury")) {
    add("contracts", -4, { kind: "mercuryRetro" });
    add("beginnings", -2, { kind: "mercuryRetro" });
    add("self", 1, { kind: "mercuryRetro" });
  }
  if (retrograde.includes("venus")) {
    add("love", -2, { kind: "venusRetro" });
    add("money", -1, { kind: "venusRetro" });
  }
  if (retrograde.includes("mars")) {
    add("beginnings", -2, { kind: "marsRetro" });
    add("health", -1, { kind: "marsRetro" });
  }

  if (voidSamples >= 2) {
    add("beginnings", moonVoid ? -4 : -3, { kind: "moonVoid" });
    add("contracts", moonVoid ? -3 : -2, { kind: "moonVoid" });
    add("money", -1, { kind: "moonVoid" });
    add("avoid", moonVoid ? 5 : 3, { kind: "moonVoid" });
  }

  // Moon phase
  if (phase < 12 || phase > 354) {
    add("beginnings", 3, { kind: "newMoon" });
    add("self", 1, { kind: "newMoon" });
  } else if (phase < 170) {
    add("beginnings", phase < 90 ? 2 : 1, { kind: "waxing" });
    add("contracts", 1, { kind: "waxing" });
    add("money", 1, { kind: "waxing" });
  } else if (phase <= 190) {
    add("self", 2, { kind: "fullMoon" });
    add("love", 1, { kind: "fullMoon" });
    add("beginnings", -1, { kind: "fullMoon" });
  } else if (phase < 330) {
    add("self", phase > 260 ? 2 : 1, { kind: "waning" });
    add("health", 1, { kind: "waning" });
  } else {
    add("self", 3, { kind: "balsamic" });
    add("avoid", 2, { kind: "balsamic" });
    add("beginnings", -2, { kind: "balsamic" });
  }

  // Moon sign
  const ms: Factor = { kind: "moonSign", sign: moonSign };
  if (["gemini", "virgo", "libra", "capricorn"].includes(moonSign)) add("contracts", 2, ms);
  if (moonSign === "taurus") add("contracts", 1, ms);
  if (FIRE.includes(moonSign)) add("beginnings", 2, ms);
  if (["taurus", "capricorn", "cancer", "libra"].includes(moonSign)) add("beginnings", 1, ms);
  if (WATER.includes(moonSign)) add("self", 2, ms);
  if (["taurus", "libra", "cancer", "pisces"].includes(moonSign)) add("love", 2, ms);
  if (EARTH.includes(moonSign)) add("money", 2, ms);
  if (moonSign === "virgo" || moonSign === "capricorn" || moonSign === "aries") add("health", 2, ms);
  if (moonSign === "aquarius" || moonSign === "sagittarius") add("contracts", 1, ms);

  // Transiting aspects between planets (tight orbs)
  const pairs: { a: Planet; b: Planet; orb: number; map: (h: number) => [Category, number][] }[] = [
    { a: "mercury", b: "jupiter", orb: 3, map: (h) => (h >= 0 ? [["contracts", 3], ["money", 1]] : [["contracts", -1]]) },
    { a: "mercury", b: "saturn", orb: 3, map: (h) => (h > 0 ? [["contracts", 2]] : [["contracts", -2], ["self", 1]]) },
    { a: "mercury", b: "mars", orb: 3, map: (h) => (h > 0 ? [["contracts", 1], ["beginnings", 1]] : [["contracts", -2]]) },
    { a: "sun", b: "jupiter", orb: 4, map: (h) => (h >= 0 ? [["beginnings", 2], ["money", 2]] : [["money", -1]]) },
    { a: "venus", b: "jupiter", orb: 4, map: (h) => (h >= 0 ? [["love", 2], ["money", 2]] : [["money", -1]]) },
    { a: "venus", b: "saturn", orb: 3, map: (h) => (h > 0 ? [["love", 1], ["money", 1]] : [["love", -2], ["self", 1]]) },
    { a: "venus", b: "mars", orb: 3, map: (h) => (h >= 0 ? [["love", 2]] : [["love", -1]]) },
    { a: "mars", b: "saturn", orb: 3, map: (h) => (h > 0 ? [["health", 1], ["beginnings", 1]] : [["beginnings", -2], ["health", -2], ["avoid", 2]]) },
    { a: "mars", b: "jupiter", orb: 3, map: (h) => (h >= 0 ? [["beginnings", 2], ["health", 2]] : [["health", -1]]) },
    { a: "moon", b: "jupiter", orb: 6, map: (h) => (h >= 0 ? [["money", 1], ["beginnings", 1]] : []) },
    { a: "moon", b: "saturn", orb: 6, map: (h) => (h < 0 ? [["self", 2], ["beginnings", -1]] : [["contracts", 1]]) },
    { a: "moon", b: "venus", orb: 6, map: (h) => (h >= 0 ? [["love", 2]] : []) },
    { a: "moon", b: "mars", orb: 6, map: (h) => (h > 0 ? [["health", 1]] : h < 0 ? [["health", -1], ["self", 1]] : [["beginnings", 1]]) },
  ];
  for (const pair of pairs) {
    const asp = aspectBetween(pos[pair.a], pos[pair.b], pair.orb);
    if (!asp) continue;
    for (const [category, pts] of pair.map(asp.harmony)) {
      add(category, pts * (0.5 + asp.exactness / 2), { kind: "transitAspect", a: pair.a, b: pair.b, aspect: asp.name });
    }
  }

  return {
    list,
    meta: { moonPhase: phase, moonSign, sunSign: signOf(pos.sun), retrograde, moonVoid, eclipse },
    pos,
  };
}

/** What a transit to a natal planet touches in each area. */
const PERSONAL: { transit: Planet; natal: Planet[]; orb: number; map: (h: number) => [Category, number][] }[] = [
  { transit: "mercury", natal: ["sun", "mercury"], orb: 2, map: (h) => (h >= 0 ? [["contracts", 3]] : [["contracts", -2]]) },
  { transit: "jupiter", natal: ["sun", "moon", "venus", "mercury"], orb: 2, map: (h) => (h >= 0 ? [["money", 3], ["beginnings", 2], ["contracts", 1]] : [["money", -1]]) },
  { transit: "saturn", natal: ["sun", "moon", "mars"], orb: 2, map: (h) => (h > 0 ? [["contracts", 1]] : [["self", 3], ["beginnings", -2], ["avoid", 2]]) },
  { transit: "mars", natal: ["sun", "mars"], orb: 2, map: (h) => (h >= 0 ? [["beginnings", 2], ["health", 2]] : [["health", -2], ["avoid", 1]]) },
  { transit: "venus", natal: ["sun", "moon", "venus"], orb: 2, map: (h) => (h >= 0 ? [["love", 3], ["money", 1]] : [["love", -1]]) },
  { transit: "sun", natal: ["sun", "moon"], orb: 1.5, map: (h) => (h >= 0 ? [["beginnings", 1], ["health", 1]] : [["self", 1]]) },
  { transit: "moon", natal: ["venus"], orb: 8, map: (h) => (h >= 0 ? [["love", 1]] : []) },
  { transit: "moon", natal: ["mercury"], orb: 8, map: (h) => (h >= 0 ? [["contracts", 1]] : []) },
];

// Slow planets sit on a natal point for weeks; weight them down so one transit doesn't paint
// the whole month the same colour.
const SLOW_WEIGHT: Partial<Record<Planet, number>> = { jupiter: 0.5, saturn: 0.4 };

function personalContributions(pos: Positions, natal: NatalChart): Contribution[] {
  const list: Contribution[] = [];
  for (const rule of PERSONAL) {
    for (const n of rule.natal) {
      if (n === "moon" && !natal.timeKnown) continue;
      const asp = aspectBetween(pos[rule.transit], natal.positions[n], rule.orb);
      if (!asp) continue;
      for (const [category, pts] of rule.map(asp.harmony)) {
        list.push({
          category,
          points: pts * (0.5 + asp.exactness / 2) * (SLOW_WEIGHT[rule.transit] ?? 1),
          factor: { kind: "personalAspect", transit: rule.transit, natal: n, aspect: asp.name },
        });
      }
    }
  }
  // The Moon passing over your Sun sign's degree — a monthly personal "fresh start" day.
  if (aspectBetween(pos.moon, natal.positions.sun, 6)?.name === "conjunction") {
    list.push({ category: "beginnings", points: 2, factor: { kind: "moonOverNatalSun" } });
    list.push({ category: "health", points: 1, factor: { kind: "moonOverNatalSun" } });
  }
  if (natal.timeKnown && aspectBetween(pos.moon, natal.positions.moon, 6)?.name === "conjunction") {
    list.push({ category: "self", points: 2, factor: { kind: "lunarReturn" } });
  }
  return list;
}

function starsFor(score: number): number {
  return score >= 4 ? 3 : score >= 2 ? 2 : score >= 0.5 ? 1 : 0;
}

function pickType(scores: Record<Category, number>): DayType {
  if (scores.avoid >= 5) return "avoid";
  const ranked = (["contracts", "beginnings", "self"] as DayType[]).sort((a, b) => scores[b] - scores[a]);
  if (scores[ranked[0]] < 1) return "self";
  return ranked[0];
}

/** Every day of a month, generally or personally. `month` is 1–12. */
export function monthReadings(year: number, month: number, natal?: NatalChart): DayReading[] {
  const days = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const eclipses = eclipsesBetween(new Date(Date.UTC(year, month - 1, 1) - 5 * 86400000), new Date(Date.UTC(year, month - 1, days) + 5 * 86400000));
  const out: DayReading[] = [];
  for (let d = 1; d <= days; d++) {
    const date = `${year}-${String(month).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    out.push(dayReading(date, natal, eclipses));
  }
  return out;
}

export function dayReading(
  date: string,
  natal?: NatalChart,
  eclipses?: { kind: "solar" | "lunar"; date: Date }[]
): DayReading {
  const noon = middayLjubljana(date);
  const ecl = eclipses ?? eclipsesBetween(new Date(noon.getTime() - 5 * 86400000), new Date(noon.getTime() + 5 * 86400000));
  const { list, meta, pos } = generalContributions(noon, ecl);
  if (natal) list.push(...personalContributions(pos, natal));

  const scores = Object.fromEntries(CATEGORIES.map((c) => [c, 0])) as Record<Category, number>;
  for (const c of list) scores[c.category] += c.points;
  for (const c of CATEGORIES) scores[c] = Math.round(scores[c] * 10) / 10;

  const type = pickType(scores);
  // Reasons that support the headline type (or explain a warning), strongest first.
  const factors = list
    .filter((c) => (c.category === type ? c.points > 0 : c.category === "avoid" || c.points <= -2))
    .concat(list.filter((c) => c.factor.kind === "personalAspect" || c.factor.kind === "moonOverNatalSun"))
    .sort((a, b) => Math.abs(b.points) - Math.abs(a.points))
    .filter((c, i, arr) => arr.findIndex((x) => JSON.stringify(x.factor) === JSON.stringify(c.factor)) === i)
    .slice(0, 4)
    .map((c) => ({ category: c.category, points: Math.round(c.points * 10) / 10, factor: c.factor }));

  return {
    date,
    ...meta,
    scores,
    type,
    stars: { love: starsFor(scores.love), money: starsFor(scores.money), health: starsFor(scores.health) },
    factors,
    personal: !!natal,
  };
}
