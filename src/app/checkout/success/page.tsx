import type { Metadata } from "next";
import Stripe from "stripe";
import OrderStatus from "@/components/checkout/OrderStatus";

export const metadata: Metadata = {
  title: "Order confirmed — Art by Urška",
  robots: { index: false },
};

async function getSession(sessionId: string) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  const stripe = new Stripe(key);
  try {
    return await stripe.checkout.sessions.retrieve(sessionId);
  } catch {
    return null;
  }
}

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;
  const session = session_id ? await getSession(session_id) : null;
  const paid = session?.payment_status === "paid";

  return <OrderStatus variant={paid ? "paid" : "unconfirmed"} email={session?.customer_details?.email} />;
}
