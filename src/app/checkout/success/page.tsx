import type { Metadata } from "next";
import Link from "next/link";
import Stripe from "stripe";
import Container from "@/components/shared/Container";

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

  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-ink px-6 py-24 text-center">
      <Container className="max-w-xl">
        {paid ? (
          <>
            <span className="block text-xs tracking-[0.3em] uppercase text-smoke">Order confirmed</span>
            <h1 className="font-heading text-4xl md:text-5xl text-bone mt-6">Thank you.</h1>
            <p className="mt-6 text-bone/70 leading-relaxed">
              Your order has been received and payment confirmed. Urška will be in touch personally
              at {session?.customer_details?.email ?? "the email you provided"} to arrange
              packaging and shipping.
            </p>
          </>
        ) : (
          <>
            <span className="block text-xs tracking-[0.3em] uppercase text-smoke">Almost there</span>
            <h1 className="font-heading text-4xl md:text-5xl text-bone mt-6">
              We couldn&apos;t confirm this order
            </h1>
            <p className="mt-6 text-bone/70 leading-relaxed">
              If you completed payment, please contact us with your confirmation email so we can
              verify it manually.
            </p>
          </>
        )}
        <Link
          href="/collection"
          className="inline-block mt-10 text-sm tracking-widest uppercase text-bone/85 hover:text-bone transition-colors border-b border-bone/40 pb-1"
        >
          ← Back to the collection
        </Link>
      </Container>
    </section>
  );
}
