import type Stripe from "stripe";
import { getStripeClient } from "@/lib/payments";
import { redis } from "@/lib/redis";

/**
 * EU VAT "OSS" threshold watch.
 *
 * Urška is not VAT-registered. Sales to consumers in OTHER EU countries — the calendar
 * subscription (an electronic service) and paintings shipped abroad (distance sales) — count
 * together towards a €10,000 per calendar year threshold. Above it she has to register for
 * VAT/OSS and charge the buyer country's VAT. At €9,000 we start warning Urška and Teo every
 * day, by email and on the site.
 *
 * The total is summed from Stripe charges of the current year: succeeded, minus refunds, in
 * EUR, where the buyer's country (shipping address, else billing address, else card country)
 * is an EU member state other than Slovenia. Buyers outside the EU don't count.
 *
 * Not tax advice — the warning tells them to talk to the accountant.
 */

export const OSS_THRESHOLD_EUR = 10000;
export const OSS_WARNING_EUR = 9000;
export const OSS_ALERT_EMAILS = ["urska.repusic@gmail.com", "teo.simonic7@gmail.com"];

const EU_OTHER_THAN_SI = new Set([
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IE",
  "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "ES", "SE",
]);

export interface OssStatus {
  year: number;
  /** EUR, cross-border EU consumer sales this year */
  totalEur: number;
  byCountry: Record<string, number>;
  /** Charges whose country couldn't be determined (not counted, listed so they can be checked). */
  unknownCountryEur: number;
  checkedAt: string;
}

function buyerCountry(charge: Stripe.Charge): string | null {
  const card = charge.payment_method_details?.card;
  return (
    charge.shipping?.address?.country ??
    charge.billing_details?.address?.country ??
    card?.country ??
    null
  );
}

export async function computeOssStatus(now = new Date()): Promise<OssStatus> {
  const year = now.getUTCFullYear();
  const from = Math.floor(Date.UTC(year, 0, 1) / 1000);
  const byCountry: Record<string, number> = {};
  let total = 0;
  let unknown = 0;

  for await (const charge of getStripeClient().charges.list({ created: { gte: from }, limit: 100 })) {
    if (charge.status !== "succeeded" || charge.currency !== "eur") continue;
    const net = (charge.amount - charge.amount_refunded) / 100;
    if (net <= 0) continue;
    const country = buyerCountry(charge)?.toUpperCase() ?? null;
    if (!country) {
      unknown += net;
      continue;
    }
    if (!EU_OTHER_THAN_SI.has(country)) continue;
    byCountry[country] = Math.round(((byCountry[country] ?? 0) + net) * 100) / 100;
    total += net;
  }

  const status: OssStatus = {
    year,
    totalEur: Math.round(total * 100) / 100,
    byCountry,
    unknownCountryEur: Math.round(unknown * 100) / 100,
    checkedAt: now.toISOString(),
  };
  await redis(["SET", `oss:status:${year}`, JSON.stringify(status)]);
  return status;
}

/** Last computed status for the current year (updated daily by the cron). */
export async function cachedOssStatus(): Promise<OssStatus | null> {
  try {
    const raw = await redis<string | null>(["GET", `oss:status:${new Date().getUTCFullYear()}`]);
    return raw ? (JSON.parse(raw) as OssStatus) : null;
  } catch {
    return null;
  }
}

export function ossLevel(status: OssStatus | null): "ok" | "warning" | "exceeded" {
  if (!status) return "ok";
  if (status.totalEur >= OSS_THRESHOLD_EUR) return "exceeded";
  if (status.totalEur >= OSS_WARNING_EUR) return "warning";
  return "ok";
}
