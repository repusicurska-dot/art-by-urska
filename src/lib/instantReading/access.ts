import type Stripe from "stripe";
import type { Lang } from "@/components/spirituality/lang";
import { LOCALES } from "@/i18n/locales";
import { findInstantTopic, type InstantTopic } from "@/components/spirituality/instantReadingData";
import { getStripeClient } from "@/lib/payments";
import { isRedisConfigured, redis } from "@/lib/redis";
import { getSiteUrl } from "@/lib/siteUrl";
import { isoWeek } from "@/lib/tarotSubscribers";

/**
 * Who may open an instant reading: one free per visitor per week, anything more paid through
 * Stripe Checkout. Server-side, so neither can be skipped from the browser.
 */

export const PRODUCT = "instant-reading";

export function parseLang(value: unknown): Lang {
  return (LOCALES as readonly string[]).includes(value as string) ? (value as Lang) : "en";
}

export function cleanQuestion(value: unknown): string {
  // Stripe metadata values are capped at 500 characters.
  return typeof value === "string" ? value.replace(/\s+/g, " ").trim().slice(0, 300) : "";
}

const memory = new Map<string, string>();

/**
 * Claims this week's free reading of one topic for the visitor (by IP address) — every topic
 * has its own, at Urška's request (2026-09-29). Returns false if that one has already been
 * used. The week turns over on Monday, like the scratch card.
 */
export async function claimFreeReading(ip: string, topic: InstantTopic["key"]): Promise<boolean> {
  const week = isoWeek().key;
  const key = `ir:free:${week}:${topic}:${ip}`;
  if (isRedisConfigured()) {
    try {
      const ok = await redis<string | null>(["SET", key, "1", "NX", "EX", 8 * 86400]);
      return ok === "OK";
    } catch (err) {
      console.error("[instant-reading] redis unavailable, using memory:", err);
    }
  }
  if (memory.get(key) === week) return false;
  memory.set(key, week);
  return true;
}

export async function createReadingCheckout(params: {
  topic: InstantTopic;
  lang: Lang;
  question: string;
}): Promise<string | null> {
  const { topic, lang, question } = params;
  const siteUrl = getSiteUrl();
  const session = await getStripeClient().checkout.sessions.create({
    mode: "payment",
    locale: lang === "sl" ? "sl" : lang === "hr" ? "hr" : lang === "de" ? "de" : lang === "it" ? "it" : "en",
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "eur",
          unit_amount: topic.priceCents,
          product_data: { name: `Tarot — ${topic.title[lang]}` },
        },
      },
    ],
    success_url: `${siteUrl}/spirituality?reading={CHECKOUT_SESSION_ID}#instant-reading`,
    cancel_url: `${siteUrl}/spirituality#instant-reading`,
    metadata: {
      product: PRODUCT,
      topic: topic.key,
      lang,
      question,
      // The visitor ticked the immediate-delivery / withdrawal-waiver box before paying.
      withdrawalWaiver: new Date().toISOString(),
    },
  });
  return session.url ?? null;
}

/** The paid session behind a reading link, or null if it isn't a paid instant reading. */
export async function paidReadingSession(
  sessionId: string
): Promise<{ session: Stripe.Checkout.Session; topic: InstantTopic } | null> {
  if (!/^cs_[A-Za-z0-9_]+$/.test(sessionId)) return null;
  let session: Stripe.Checkout.Session;
  try {
    session = await getStripeClient().checkout.sessions.retrieve(sessionId);
  } catch {
    return null;
  }
  if (session.metadata?.product !== PRODUCT || session.payment_status !== "paid") return null;
  const topic = findInstantTopic(session.metadata.topic);
  return topic ? { session, topic } : null;
}

/** True the first time it's called for a session — so the email copy goes out only once. */
export async function firstTimeFor(sessionId: string): Promise<boolean> {
  const key = `ir:mailed:${sessionId}`;
  if (isRedisConfigured()) {
    try {
      return (await redis<string | null>(["SET", key, "1", "NX", "EX", 90 * 86400])) === "OK";
    } catch {
      return false;
    }
  }
  if (memory.has(key)) return false;
  memory.set(key, "1");
  return true;
}
