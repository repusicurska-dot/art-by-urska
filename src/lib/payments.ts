import Stripe from "stripe";
import { Artwork } from "@/content/types";

// TODO(phase-2): crypto payments (e.g. Coinbase Commerce) — Stripe Checkout only for now.
// Set STRIPE_SECRET_KEY (and NEXT_PUBLIC_SITE_URL) to go live; until then this throws and
// the checkout flow falls back to the "inquire by email" path (see api/checkout/route.ts).

let stripeClient: Stripe | null = null;

function getStripeClient(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not set.");
  }
  if (!stripeClient) {
    stripeClient = new Stripe(key);
  }
  return stripeClient;
}

export async function createCheckoutSession(
  items: Artwork[],
  contact: { name: string; email: string }
): Promise<{ url: string } | null> {
  const stripe = getStripeClient();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: contact.email,
    line_items: items.map((item) => ({
      quantity: 1,
      price_data: {
        currency: item.currency.toLowerCase(),
        unit_amount: Math.round(item.price * 100),
        product_data: {
          name: item.title,
          images: item.heroImage ? [`${siteUrl}${item.heroImage}`] : undefined,
        },
      },
    })),
    success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/checkout`,
    metadata: {
      slugs: items.map((i) => i.slug).join(","),
      contactName: contact.name,
    },
  });

  if (!session.url) return null;
  return { url: session.url };
}
