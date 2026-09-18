import { isLocale } from "@/i18n/locales";
import type { Lang } from "@/lib/astro/texts";

/** Shared input checks for the Star Business Calendar forms. */

export function isAvailable(): boolean {
  return Boolean(
    (process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL) &&
      process.env.STRIPE_SECRET_KEY &&
      process.env.RESEND_API_KEY
  );
}

export function parseLang(value: unknown): Lang {
  return isLocale(value) ? value : "sl";
}

export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
}

export function isBirthDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [y, m, d] = value.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return (
    date.getUTCFullYear() === y &&
    date.getUTCMonth() === m - 1 &&
    date.getUTCDate() === d &&
    y >= 1900 &&
    date.getTime() < Date.now()
  );
}

export function isBirthTime(value: string): boolean {
  return /^([01]\d|2[0-3]):[0-5]\d$/.test(value);
}

export function isTimeZone(value: string): boolean {
  try {
    new Intl.DateTimeFormat("en", { timeZone: value });
    return value.length < 64;
  } catch {
    return false;
  }
}

export interface BirthInput {
  birthDate: string;
  birthTime: string | null;
  birthTimeZone: string;
}

export function parseBirth(body: Record<string, unknown>): BirthInput | null {
  const birthDate = typeof body.birthDate === "string" ? body.birthDate : "";
  const rawTime = typeof body.birthTime === "string" ? body.birthTime.trim() : "";
  const birthTimeZone = typeof body.birthTimeZone === "string" ? body.birthTimeZone : "Europe/Ljubljana";
  if (!isBirthDate(birthDate)) return null;
  if (rawTime && !isBirthTime(rawTime)) return null;
  if (!isTimeZone(birthTimeZone)) return null;
  return { birthDate, birthTime: rawTime || null, birthTimeZone };
}
