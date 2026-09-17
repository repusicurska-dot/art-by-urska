import type { NextRequest } from "next/server";
import { isRedisConfigured, pipeline } from "./redis";

/**
 * Per-day limits on how often one visitor can use a form, so nobody can flood Urška's inbox
 * through the site. Counted per IP address and per email address, and reset at midnight UTC.
 *
 * Counts live in Redis when it's connected. Until then they're kept in the memory of the
 * serverless instance — weaker (an instance can restart or a request can land on another one),
 * but still enough to stop someone hammering the submit button.
 */

const memory = new Map<string, { count: number; day: string }>();

function today() {
  return new Date().toISOString().slice(0, 10);
}

export function clientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

async function hit(key: string): Promise<number> {
  const day = today();
  if (isRedisConfigured()) {
    try {
      const [count] = await pipeline<number>([
        ["INCR", `rl:${day}:${key}`],
        ["EXPIRE", `rl:${day}:${key}`, 60 * 60 * 26],
      ]);
      return count;
    } catch (err) {
      console.error("[rate-limit] redis unavailable, using memory:", err);
    }
  }
  const entry = memory.get(key);
  const count = entry && entry.day === day ? entry.count + 1 : 1;
  memory.set(key, { count, day });
  return count;
}

/**
 * Counts this submission and returns true if it is still within the limits.
 * Pass only the identifiers you have (e.g. no email for a form without one).
 */
export async function withinDailyLimit(
  form: string,
  ids: { ip: string; email?: string },
  limits: { perIp: number; perEmail?: number }
): Promise<boolean> {
  const ipCount = await hit(`${form}:ip:${ids.ip}`);
  if (ipCount > limits.perIp) return false;
  if (ids.email && limits.perEmail) {
    const emailCount = await hit(`${form}:email:${ids.email.toLowerCase()}`);
    if (emailCount > limits.perEmail) return false;
  }
  return true;
}
