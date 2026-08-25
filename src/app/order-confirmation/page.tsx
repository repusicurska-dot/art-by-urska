import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/shared/Container";

export const metadata: Metadata = {
  title: "Order confirmed — Art by Urška",
  robots: { index: false },
};

export default function OrderConfirmationPage() {
  return (
    <section className="py-24 md:py-32 text-center bg-ink">
      <Container className="max-w-lg">
        <span className="block text-xs tracking-widest uppercase text-gold-400">
          Order confirmed
        </span>
        <h1 className="font-heading text-4xl text-bone mt-4">Thank you.</h1>
        <p className="mt-6 text-bone/70 leading-relaxed">
          Your order has been received. A confirmation email is on its way — if it doesn&rsquo;t
          arrive shortly, please get in touch and we&rsquo;ll make sure everything is in order.
        </p>
        <Link
          href="/"
          className="inline-block mt-8 text-sm tracking-widest uppercase text-gold-400 hover:text-bone transition-colors border-b border-gold-400/40 pb-1"
        >
          Back to the gallery →
        </Link>
      </Container>
    </section>
  );
}
