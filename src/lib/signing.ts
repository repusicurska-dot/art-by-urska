import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Signed tokens for links sent by email — Urška's confirm/decline link for a booking, and a
 * subscriber's unsubscribe link — so nobody can act on a booking or unsubscribe someone else
 * just by guessing an id or address.
 *
 * Keyed on BOOKING_SECRET if set, otherwise the Resend API key that already exists. Rotating
 * that key invalidates links in emails already sent, which is acceptable for these.
 */
function secret(): string {
  const key = process.env.BOOKING_SECRET || process.env.RESEND_API_KEY;
  if (!key) throw new Error("No signing secret configured.");
  return key;
}

export function sign(value: string): string {
  return createHmac("sha256", secret()).update(value).digest("base64url").slice(0, 32);
}

export function verify(value: string, token: string | null | undefined): boolean {
  if (!token) return false;
  const expected = Buffer.from(sign(value));
  const given = Buffer.from(token);
  return expected.length === given.length && timingSafeEqual(expected, given);
}
