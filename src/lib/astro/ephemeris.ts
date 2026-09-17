import * as Astronomy from "astronomy-engine";

/**
 * Geocentric tropical positions for the Star Business Calendar, computed locally with
 * astronomy-engine (MIT, VSOP87-based — accurate to well under an arcminute, far more than
 * astrology needs). No external service, no API key.
 */

export const PLANETS = ["sun", "moon", "mercury", "venus", "mars", "jupiter", "saturn"] as const;
export type Planet = (typeof PLANETS)[number];

const BODY: Record<Planet, Astronomy.Body> = {
  sun: Astronomy.Body.Sun,
  moon: Astronomy.Body.Moon,
  mercury: Astronomy.Body.Mercury,
  venus: Astronomy.Body.Venus,
  mars: Astronomy.Body.Mars,
  jupiter: Astronomy.Body.Jupiter,
  saturn: Astronomy.Body.Saturn,
};

export const SIGNS = [
  "aries",
  "taurus",
  "gemini",
  "cancer",
  "leo",
  "virgo",
  "libra",
  "scorpio",
  "sagittarius",
  "capricorn",
  "aquarius",
  "pisces",
] as const;
export type Sign = (typeof SIGNS)[number];

export function norm(deg: number): number {
  return ((deg % 360) + 360) % 360;
}

export function signOf(longitude: number): Sign {
  return SIGNS[Math.floor(norm(longitude) / 30)];
}

/** Ecliptic longitude (degrees, 0 = 0° Aries) of a body as seen from Earth. */
export function longitude(planet: Planet, date: Date): number {
  if (planet === "sun") return norm(Astronomy.SunPosition(date).elon);
  if (planet === "moon") return norm(Astronomy.EclipticGeoMoon(date).lon);
  return norm(Astronomy.Ecliptic(Astronomy.GeoVector(BODY[planet], date, true)).elon);
}

export type Positions = Record<Planet, number>;

export function positions(date: Date): Positions {
  const out = {} as Positions;
  for (const p of PLANETS) out[p] = longitude(p, date);
  return out;
}

/** Signed daily motion in degrees (negative = retrograde). */
export function dailyMotion(planet: Planet, date: Date): number {
  const before = longitude(planet, new Date(date.getTime() - 12 * 3600000));
  const after = longitude(planet, new Date(date.getTime() + 12 * 3600000));
  let d = after - before;
  if (d > 180) d -= 360;
  if (d < -180) d += 360;
  return d;
}

export function isRetrograde(planet: Planet, date: Date): boolean {
  if (planet === "sun" || planet === "moon") return false;
  return dailyMotion(planet, date) < 0;
}

/** Moon phase angle: 0 = new, 90 = first quarter, 180 = full, 270 = last quarter. */
export function moonPhaseAngle(date: Date): number {
  return Astronomy.MoonPhase(date);
}

export type AspectName = "conjunction" | "sextile" | "square" | "trine" | "opposition";
export const ASPECTS: { name: AspectName; angle: number; harmony: number }[] = [
  { name: "conjunction", angle: 0, harmony: 0 },
  { name: "sextile", angle: 60, harmony: 1 },
  { name: "square", angle: 90, harmony: -1 },
  { name: "trine", angle: 120, harmony: 1 },
  { name: "opposition", angle: 180, harmony: -1 },
];

/** The aspect between two longitudes within `orb` degrees, if any. */
export function aspectBetween(a: number, b: number, orb: number): { name: AspectName; harmony: number; exactness: number } | null {
  let sep = Math.abs(norm(a) - norm(b));
  if (sep > 180) sep = 360 - sep;
  for (const asp of ASPECTS) {
    const off = Math.abs(sep - asp.angle);
    if (off <= orb) return { name: asp.name, harmony: asp.harmony, exactness: 1 - off / orb };
  }
  return null;
}

/**
 * Whether the Moon is "void of course" at `date`: it will make no further major aspect to the
 * Sun or planets before leaving its current sign. Traditionally a poor time to start anything.
 */
export function isMoonVoid(date: Date): boolean {
  const start = longitude("moon", date);
  const signEnd = (Math.floor(start / 30) + 1) * 30;
  // The Moon moves ~0.5°/hour; step hourly until it changes sign (at most ~2.5 days).
  const others: Planet[] = ["sun", "mercury", "venus", "mars", "jupiter", "saturn"];
  const other0 = others.map((p) => longitude(p, date));
  let prevMoon = start;
  for (let h = 1; h <= 64; h++) {
    const t = new Date(date.getTime() + h * 3600000);
    let moon = longitude("moon", t);
    if (moon < prevMoon) moon += 360; // unwrap past 0° Aries
    const crossed = moon >= signEnd;
    const upTo = crossed ? signEnd : moon;
    // Slow planets barely move in 2 days; using their start positions is accurate enough here.
    for (const pl of other0) {
      for (const asp of ASPECTS) {
        for (const target of [pl + asp.angle, pl - asp.angle, pl + asp.angle + 360, pl - asp.angle + 360, pl + asp.angle - 360]) {
          if (target > prevMoon && target <= upTo) return false;
        }
      }
    }
    if (crossed) return true;
    prevMoon = moon;
  }
  return true;
}

export interface Eclipse {
  kind: "solar" | "lunar";
  date: Date;
}

/** Solar and lunar eclipses between two dates. */
export function eclipsesBetween(from: Date, to: Date): Eclipse[] {
  const out: Eclipse[] = [];
  let lunar = Astronomy.SearchLunarEclipse(from);
  while (lunar.peak.date < to) {
    out.push({ kind: "lunar", date: lunar.peak.date });
    lunar = Astronomy.NextLunarEclipse(lunar.peak);
  }
  let solar = Astronomy.SearchGlobalSolarEclipse(from);
  while (solar.peak.date < to) {
    out.push({ kind: "solar", date: solar.peak.date });
    solar = Astronomy.NextGlobalSolarEclipse(solar.peak);
  }
  return out.sort((a, b) => a.date.getTime() - b.date.getTime());
}
