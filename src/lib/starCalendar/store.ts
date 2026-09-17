import { randomBytes } from "node:crypto";
import { redis } from "@/lib/redis";
import type { Lang } from "@/lib/astro/texts";

/**
 * Star Business Calendar members, stored in Upstash Redis.
 *
 *   sbc:member:<email>   JSON Member
 *   sbc:feed:<token>     email — lookup for the private calendar (.ics) feed
 *   sbc:members          set of all member emails, for the monthly/weekly emails
 *
 * Stripe is the source of truth for billing; `status` and `accessUntil` are a cached copy,
 * refreshed from Stripe on checkout, on visits to the member page and before emails go out.
 */

export const PRICE_EUR_CENTS = 599;

/**
 * Free, permanent access without Stripe — the owner (Urška, founder) and Teo. Sign-up with
 * one of these addresses skips payment entirely. To test the real Stripe flow with the same
 * inbox, use a Gmail "+" alias (e.g. name+test@gmail.com), which is a different address here.
 */
export const COMPLIMENTARY_EMAILS = new Set(["urska.repusic@gmail.com", "teo.simonic7@gmail.com"]);

export function isComplimentary(email: string): boolean {
  return COMPLIMENTARY_EMAILS.has(email.trim().toLowerCase());
}
export const TRIAL_DAYS = 7;

export type MemberStatus = "pending" | "trialing" | "active" | "past_due" | "canceled";

export interface Member {
  email: string;
  lang: Lang;
  /** YYYY-MM-DD */
  birthDate: string;
  /** HH:mm, or null if unknown */
  birthTime: string | null;
  /** IANA zone of the birth place, e.g. Europe/Ljubljana */
  birthTimeZone: string;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  status: MemberStatus;
  /** ISO — end of trial or of the paid period. */
  accessUntil?: string;
  /** True when the member cancelled but still has access until `accessUntil`. */
  cancelAtPeriodEnd?: boolean;
  feedToken: string;
  /** Set once a subscription has ever existed — the free trial is offered only once. */
  hadTrial?: boolean;
  createdAt: string;
  syncedAt?: string;
  welcomedAt?: string;
}

const key = (email: string) => `sbc:member:${email.toLowerCase()}`;

export async function getMember(email: string): Promise<Member | null> {
  const raw = await redis<string | null>(["GET", key(email)]);
  return raw ? (JSON.parse(raw) as Member) : null;
}

export async function saveMember(member: Member): Promise<void> {
  await redis(["SET", key(member.email), JSON.stringify(member)]);
  await redis(["SET", `sbc:feed:${member.feedToken}`, member.email.toLowerCase()]);
  await redis(["SADD", "sbc:members", member.email.toLowerCase()]);
}

export async function memberByFeedToken(token: string): Promise<Member | null> {
  if (!/^[A-Za-z0-9_-]{20,64}$/.test(token)) return null;
  const email = await redis<string | null>(["GET", `sbc:feed:${token}`]);
  return email ? getMember(email) : null;
}

export async function allMemberEmails(): Promise<string[]> {
  return redis<string[]>(["SMEMBERS", "sbc:members"]);
}

export function newFeedToken(): string {
  return randomBytes(24).toString("base64url");
}

export function feedUrls(member: Member, site: string): { https: string; webcal: string } {
  const https = `${site}/api/sbc/feed/${member.feedToken}`;
  return { https, webcal: https.replace(/^https?:/, "webcal:") };
}

/** Whether the member may see the calendar right now. */
export function hasAccess(member: Member | null): boolean {
  if (!member) return false;
  if (isComplimentary(member.email)) return true;
  if (member.status !== "trialing" && member.status !== "active" && member.status !== "canceled") return false;
  return !!member.accessUntil && new Date(member.accessUntil).getTime() > Date.now();
}
