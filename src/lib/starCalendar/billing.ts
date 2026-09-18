import { PRODUCT_NAME, type Lang } from "@/lib/astro/texts";
import type Stripe from "stripe";
import { getStripeClient } from "@/lib/payments";
import { getSiteUrl } from "@/lib/siteUrl";
import { PRICE_EUR_CENTS, TRIAL_DAYS, saveMember, type Member, type MemberStatus } from "./store";

/**
 * Stripe side of the Star Business Calendar subscription. The price is sent inline with each
 * Checkout (no product has to be created by hand in the Stripe dashboard); Stripe then bills
 * monthly on its own. Cancelling is a button on the member page — as easy as signing up.
 */

/** The product as it appears on the Stripe payment page. */
const PRODUCT_DESCRIPTION: Record<Lang, string> = {
  sl: "Osebni mesečni koledar in horoskop — Art by Urška",
  en: "Personal monthly calendar and horoscope — Art by Urška",
  hr: "Osobni mjesečni kalendar i horoskop — Art by Urška",
  de: "Persönlicher Monatskalender und Horoskop — Art by Urška",
  it: "Calendario e oroscopo personale mensile — Art by Urška",
};

export async function createSubscriptionCheckout(member: Member): Promise<string> {
  const stripe = getStripeClient();
  const site = getSiteUrl();

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    ...(member.stripeCustomerId ? { customer: member.stripeCustomerId } : { customer_email: member.email }),
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "eur",
          unit_amount: PRICE_EUR_CENTS,
          recurring: { interval: "month" },
          product_data: {
            name: PRODUCT_NAME[member.lang],
            description: PRODUCT_DESCRIPTION[member.lang],
          },
        },
      },
    ],
    subscription_data: {
      // One free trial per email address.
      ...(member.hadTrial ? {} : { trial_period_days: TRIAL_DAYS }),
      metadata: { product: "star-business-calendar", email: member.email },
    },
    metadata: { product: "star-business-calendar", email: member.email },
    // Stripe supports all five, so the payment page matches the language they signed up in.
    locale: member.lang,
    // Country of the buyer, for the EU VAT (OSS) threshold count and for invoices.
    billing_address_collection: "required",
    allow_promotion_codes: true,
    success_url: `${site}/api/sbc/finish?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${site}/zvezdni-koledar?canceled=1`,
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

/** Copies the subscription's state from Stripe onto the member and saves it. */
export async function applySubscription(member: Member, sub: Stripe.Subscription): Promise<Member> {
  const end = sub.status === "canceled" ? (sub.ended_at ?? sub.canceled_at) : periodEnd(sub);
  const updated: Member = {
    ...member,
    stripeCustomerId: typeof sub.customer === "string" ? sub.customer : sub.customer.id,
    stripeSubscriptionId: sub.id,
    status: mapStatus(sub.status),
    accessUntil: end ? new Date(end * 1000).toISOString() : undefined,
    cancelAtPeriodEnd: sub.cancel_at_period_end,
    hadTrial: true,
    syncedAt: new Date().toISOString(),
  };
  await saveMember(updated);
  return updated;
}

/** Refreshes from Stripe if the cached state is older than `maxAgeMinutes`. */
export async function syncMember(member: Member, maxAgeMinutes = 60): Promise<Member> {
  if (!member.stripeSubscriptionId) return member;
  if (member.syncedAt && Date.now() - new Date(member.syncedAt).getTime() < maxAgeMinutes * 60000) return member;
  try {
    const sub = await getStripeClient().subscriptions.retrieve(member.stripeSubscriptionId);
    return await applySubscription(member, sub);
  } catch (err) {
    console.error("[sbc] could not sync subscription:", err);
    return member;
  }
}

export async function setCancelAtPeriodEnd(member: Member, cancel: boolean): Promise<Member> {
  if (!member.stripeSubscriptionId) return member;
  const sub = await getStripeClient().subscriptions.update(member.stripeSubscriptionId, { cancel_at_period_end: cancel });
  return applySubscription(member, sub);
}
