import { TAROT_CARDS, type Lang } from "@/components/spirituality/tarotData";
import { redis } from "./redis";
import { sign } from "./signing";
import { getSiteUrl } from "./siteUrl";

/**
 * Weekly tarot subscribers, stored in Upstash Redis as one hash:
 *   tarot:subscribers   email → language ("sl" | "en")
 *   tarot:weekly:<week> set once that week's email has gone out, so a retried cron can't
 *                       send it twice
 */

const SUBSCRIBERS = "tarot:subscribers";

export async function addSubscriber(email: string, lang: Lang) {
  await redis(["HSET", SUBSCRIBERS, email.toLowerCase(), lang]);
}

export async function removeSubscriber(email: string) {
  await redis(["HDEL", SUBSCRIBERS, email.toLowerCase()]);
}

export async function listSubscribers(): Promise<{ email: string; lang: Lang }[]> {
  const flat = await redis<string[]>(["HGETALL", SUBSCRIBERS]);
  const list: { email: string; lang: Lang }[] = [];
  for (let i = 0; i < flat.length; i += 2) {
    list.push({ email: flat[i], lang: flat[i + 1] === "sl" ? "sl" : "en" });
  }
  return list;
}

/** Claims this week's send. Returns false if it already went out (or is going out). */
export async function claimWeeklySend(week: string): Promise<boolean> {
  const claimed = await redis<string | null>(["SET", `tarot:weekly:${week}`, new Date().toISOString(), "NX", "EX", 60 * 60 * 24 * 14]);
  return claimed === "OK";
}

export async function releaseWeeklySend(week: string) {
  await redis(["DEL", `tarot:weekly:${week}`]);
}

function unsubscribeQuery(email: string): string {
  const e = email.toLowerCase();
  return `e=${encodeURIComponent(e)}&t=${sign(`unsub:${e}`)}`;
}

/** Link shown in the email — a page with a button, so link scanners can't unsubscribe anyone. */
export function unsubscribeUrl(email: string): string {
  return `${getSiteUrl()}/odjava?${unsubscribeQuery(email)}`;
}

/** Target for mail apps' one-click unsubscribe (List-Unsubscribe-Post), which POSTs here. */
export function oneClickUnsubscribeUrl(email: string): string {
  return `${getSiteUrl()}/api/tarot-unsubscribe?${unsubscribeQuery(email)}`;
}

/** ISO week, e.g. "2026-W38". */
export function isoWeek(date = new Date()): { key: string; number: number } {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const day = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - day);
  const yearStart = Date.UTC(d.getUTCFullYear(), 0, 1);
  const number = Math.ceil(((d.getTime() - yearStart) / 86400000 + 1) / 7);
  return { key: `${d.getUTCFullYear()}-W${String(number).padStart(2, "0")}`, number };
}

/**
 * The week's card. Steps through the deck by 5 each week (5 and 22 share no factor, so every
 * card comes up once in 22 weeks) — so consecutive weeks don't land on neighbouring cards.
 */
export function cardOfTheWeek(date = new Date()) {
  const { number } = isoWeek(date);
  return TAROT_CARDS[(number * 5 + date.getUTCFullYear()) % TAROT_CARDS.length];
}
