import type Stripe from "stripe";
import { getStripeClient } from "@/lib/payments";
import { getSiteUrl } from "@/lib/siteUrl";
import { isComplimentary, saveMember, type Member, type MemberStatus } from "@/lib/starCalendar/store";

/**
 * "Letters from the studio" — the Poetry subscription, €4.99 a month with a 7-day trial.
 *
 * It rides on the same account as the Star Business Calendar: one email, one password, two
 * subscriptions that can be held independently. The calendar's fields stay where they are; the
 * poetry side lives under `member.poetry`.
 */

export const POETRY_PRICE_EUR_CENTS = 499;
export const POETRY_TRIAL_DAYS = 7;

export interface PoetrySubscription {
  status: MemberStatus;
  stripeSubscriptionId?: string;
  accessUntil?: string;
  cancelAtPeriodEnd?: boolean;
  hadTrial?: boolean;
  syncedAt?: string;
  welcomedAt?: string;
}

export function hasPoetryAccess(member: Member | null): boolean {
  if (!member) return false;
  // The owners read everything, however their account was created.
  if (isComplimentary(member.email)) return true;
  const p = member.poetry;
  if (!p) return false;
  if (p.status !== "trialing" && p.status !== "active" && p.status !== "canceled") return false;
  return !!p.accessUntil && new Date(p.accessUntil).getTime() > Date.now();
}

export async function createPoetryCheckout(member: Member): Promise<string> {
  const stripe = getStripeClient();
  const site = getSiteUrl();
  const sl = member.lang === "sl";

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    ...(member.stripeCustomerId ? { customer: member.stripeCustomerId } : { customer_email: member.email }),
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "eur",
          unit_amount: POETRY_PRICE_EUR_CENTS,
          recurring: { interval: "month" },
          product_data: {
            name: sl ? "Pisma iz ateljeja — Poezija Urške" : "Letters from the studio — Poetry by Urška",
            description: sl
              ? "Tedensko pismo in pesem, slika ob vsakem pismu in arhiv vseh pisem — Art by Urška"
              : "A weekly letter and poem, a painting beside each one and the full archive — Art by Urška",
          },
        },
      },
    ],
    subscription_data: {
      ...(member.poetry?.hadTrial ? {} : { trial_period_days: POETRY_TRIAL_DAYS }),
      metadata: { product: "poetry-letters", email: member.email },
    },
    metadata: { product: "poetry-letters", email: member.email },
    locale: sl ? "sl" : "en",
    billing_address_collection: "required",
    allow_promotion_codes: true,
    success_url: `${site}/api/poetry/finish?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${site}/poetry?canceled=1`,
  });
  if (!session.url) throw new Error("Stripe did not return a checkout URL.");
  return session.url;
}

function periodEnd(sub: Stripe.Subscription): number | null {
  if (sub.status === "trialing" && sub.trial_end) return sub.trial_end;
  const ends = sub.items.data.map((i) => i.current_period_end).filter((n): n is number => typeof n === "number");
  return ends.length ? Math.max(...ends) : null;
}

function mapStatus(status: Stripe.Subscription.Status): MemberStatus {
  if (status === "trialing" || status === "active" || status === "past_due" || status === "canceled") return status as MemberStatus;
  if (status === "unpaid" || status === "incomplete_expired") return "canceled";
  return "pending";
}

export async function applyPoetrySubscription(member: Member, sub: Stripe.Subscription): Promise<Member> {
  const end = sub.status === "canceled" ? (sub.ended_at ?? sub.canceled_at) : periodEnd(sub);
  const updated: Member = {
    ...member,
    stripeCustomerId: typeof sub.customer === "string" ? sub.customer : sub.customer.id,
    poetry: {
      ...member.poetry,
      status: mapStatus(sub.status),
      stripeSubscriptionId: sub.id,
      accessUntil: end ? new Date(end * 1000).toISOString() : undefined,
      cancelAtPeriodEnd: sub.cancel_at_period_end,
      hadTrial: true,
      syncedAt: new Date().toISOString(),
    },
  };
  await saveMember(updated);
  return updated;
}

/** Refreshes from Stripe when the cached state is stale. */
export async function syncPoetry(member: Member, maxAgeMinutes = 60): Promise<Member> {
  const id = member.poetry?.stripeSubscriptionId;
  if (!id) return member;
  const syncedAt = member.poetry?.syncedAt;
  if (syncedAt && Date.now() - new Date(syncedAt).getTime() < maxAgeMinutes * 60000) return member;
  try {
    const sub = await getStripeClient().subscriptions.retrieve(id);
    return await applyPoetrySubscription(member, sub);
  } catch (err) {
    console.error("[poetry] could not sync subscription:", err);
    return member;
  }
}

export async function setPoetryCancelAtPeriodEnd(member: Member, cancel: boolean): Promise<Member> {
  const id = member.poetry?.stripeSubscriptionId;
  if (!id) return member;
  const sub = await getStripeClient().subscriptions.update(id, { cancel_at_period_end: cancel });
  return applyPoetrySubscription(member, sub);
}
