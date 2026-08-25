"use client";

import { useState } from "react";
import Link from "next/link";
import Container from "@/components/shared/Container";
import ProvisionalPriceNote from "@/components/story/ProvisionalPriceNote";
import { useCart } from "@/lib/cart/CartContext";
import { getArtworkBySlug } from "@/lib/content";
import { ZONE_DESCRIPTIONS, ZONE_LABELS, ZONE_ORDER } from "@/lib/shipping";
import { ShippingZone } from "@/content/types";

type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "error"; message: string }
  | { status: "checkout-not-live"; message: string };

export default function CheckoutContent() {
  const cart = useCart();
  const items = cart.slugs
    .map((slug) => getArtworkBySlug(slug))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));
  const subtotal = items.reduce((sum, item) => sum + item.price, 0);

  const [zone, setZone] = useState<ShippingZone>("SI");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [state, setState] = useState<SubmitState>({ status: "idle" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState({ status: "submitting" });
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slugs: items.map((i) => i.slug),
          shippingZone: zone,
          contact: { name, email },
          agreedToTerms: agreed,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setState({ status: "error", message: data.error ?? "Something went wrong." });
        return;
      }
      if (data.url) {
        window.location.assign(data.url);
        return;
      }
      setState({ status: "checkout-not-live", message: data.message });
    } catch {
      setState({ status: "error", message: "Couldn't reach the server. Please try again." });
    }
  }

  if (items.length === 0) {
    return (
      <section className="py-24 md:py-32 text-center bg-ink">
        <Container>
          <p className="text-bone/60">Your cart is empty.</p>
          <Link
            href="/collection"
            className="inline-block mt-6 text-sm tracking-widest uppercase text-gold-400 hover:text-bone transition-colors border-b border-gold-400/40 pb-1"
          >
            Browse the collection →
          </Link>
        </Container>
      </section>
    );
  }

  if (state.status === "checkout-not-live") {
    return (
      <section className="py-24 md:py-32 text-center bg-ink">
        <Container className="max-w-lg">
          <h1 className="font-heading text-3xl text-bone mb-4">Almost there</h1>
          <p className="text-bone/70 leading-relaxed">{state.message}</p>
          <Link
            href={`/contact?piece=${items[0].slug}`}
            className="btn-primary inline-block mt-8"
          >
            Go to inquiry form
          </Link>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-24 md:py-32 bg-ink">
      <Container className="max-w-2xl">
        <span className="block text-xs tracking-widest uppercase text-gold-400">Checkout</span>
        <h1 className="font-heading text-4xl md:text-5xl text-bone mt-4 mb-12">
          Complete your order
        </h1>

        <form onSubmit={handleSubmit} className="space-y-10">
          <fieldset className="space-y-6">
            <legend className="text-xs tracking-widest uppercase text-bone/60 mb-2">
              Contact details
            </legend>
            <div>
              <label htmlFor="name" className="block text-xs tracking-widest uppercase text-bone/60 mb-2">
                Full name
              </label>
              <input
                id="name"
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-bone/20 rounded-sm px-4 py-3 bg-transparent focus:outline-none focus:border-bone"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-xs tracking-widest uppercase text-bone/60 mb-2">
                Email
              </label>
              <input
                id="email"
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-bone/20 rounded-sm px-4 py-3 bg-transparent focus:outline-none focus:border-bone"
              />
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-xs tracking-widest uppercase text-bone/60 mb-3">
              Shipping destination
            </legend>
            <div className="space-y-2">
              {ZONE_ORDER.map((z) => (
                <label
                  key={z}
                  className="flex items-start gap-3 border border-bone/15 rounded-sm px-4 py-3 cursor-pointer has-[:checked]:border-bone"
                >
                  <input
                    type="radio"
                    name="zone"
                    value={z}
                    checked={zone === z}
                    onChange={() => setZone(z)}
                    className="mt-1"
                  />
                  <span>
                    <span className="block text-sm text-bone">{ZONE_LABELS[z]}</span>
                    <span className="block text-xs text-bone/50 mt-0.5">{ZONE_DESCRIPTIONS[z]}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="border-t border-b border-bone/10 py-6 space-y-3">
            <span className="block text-xs tracking-widest uppercase text-bone/60">
              Order summary
            </span>
            {items.map((item) => (
              <div key={item.slug} className="flex justify-between text-sm text-bone/80">
                <span>{item.title}</span>
                <span>{item.price.toLocaleString("en-IE")} €</span>
              </div>
            ))}
            <div className="flex justify-between text-sm text-bone/60 pt-2">
              <span>VAT / tax</span>
              <span>See individual artwork specifications</span>
            </div>
            <div className="flex justify-between text-sm text-bone/60">
              <span>Shipping</span>
              <span>To be confirmed before payment</span>
            </div>
            <div className="flex justify-between font-heading text-xl text-bone pt-3">
              <span>Estimated total (excl. shipping)</span>
              <span>{subtotal.toLocaleString("en-IE")} €</span>
            </div>
            <ProvisionalPriceNote />
          </div>

          <label className="flex items-start gap-3 text-sm text-bone/70">
            <input
              type="checkbox"
              required
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1"
            />
            <span>
              I have read and accept the{" "}
              <Link href="/legal/terms" className="underline hover:text-gold-400">Terms &amp; Conditions</Link>,{" "}
              the <Link href="/legal/returns" className="underline hover:text-gold-400">Returns &amp; Cancellations Policy</Link>,
              and understand my right of withdrawal where it applies. Placing this order creates an obligation to pay.
            </span>
          </label>

          {state.status === "error" && (
            <p role="alert" className="text-sm text-terracotta">
              {state.message}
            </p>
          )}

          <button
            type="submit"
            disabled={state.status === "submitting"}
            className="btn-primary w-full py-4"
          >
            {state.status === "submitting" ? "Placing order…" : "Place order — payment required"}
          </button>
        </form>
      </Container>
    </section>
  );
}
