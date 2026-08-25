"use client";

import Link from "next/link";
import Image from "next/image";
import Container from "@/components/shared/Container";
import PlaceholderArt from "@/components/shared/PlaceholderArt";
import ProvisionalPriceNote from "@/components/story/ProvisionalPriceNote";
import { useCart } from "@/lib/cart/CartContext";
import { getArtworkBySlug } from "@/lib/content";

export default function CartContent() {
  const cart = useCart();
  const items = cart.slugs
    .map((slug) => getArtworkBySlug(slug))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));
  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  const anyUnconfirmed = items.some((item) => !item.priceConfirmed);

  return (
    <section className="py-24 md:py-32 bg-ink">
      <Container className="max-w-2xl">
        <span className="block text-xs tracking-widest uppercase text-gold-400">Cart</span>
        <h1 className="font-heading text-4xl md:text-5xl text-bone mt-4 mb-12">
          Your selection
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-16 border-t border-bone/10">
            <p className="text-bone/60">Your cart is empty.</p>
            <Link
              href="/collection"
              className="inline-block mt-6 text-sm tracking-widest uppercase text-gold-400 hover:text-bone transition-colors border-b border-gold-400/40 pb-1"
            >
              Browse the collection →
            </Link>
          </div>
        ) : (
          <>
            <ul className="divide-y divide-bone/10 border-t border-b border-bone/10">
              {items.map((item) => (
                <li key={item.slug} className="flex items-center gap-5 py-5">
                  <div className="relative w-20 h-24 shrink-0 rounded-sm overflow-hidden">
                    {item.heroImage ? (
                      <Image
                        src={item.heroImage}
                        alt={item.heroImageAlt ?? item.title}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    ) : (
                      <PlaceholderArt label="" accentColor={item.accentColor} className="h-full w-full" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-heading text-lg text-bone truncate">{item.title}</p>
                    <p className="text-sm text-bone/50">{item.dimensions}</p>
                  </div>
                  <p className="font-heading text-lg text-bone shrink-0">
                    {item.price.toLocaleString("en-IE")} €
                  </p>
                  <button
                    type="button"
                    onClick={() => cart.remove(item.slug)}
                    className="text-xs tracking-widest uppercase text-bone/40 hover:text-terracotta transition-colors shrink-0"
                    aria-label={`Remove ${item.title} from cart`}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between mt-8">
              <span className="text-sm tracking-widest uppercase text-bone/60">Subtotal</span>
              <span className="font-heading text-2xl text-bone">
                {subtotal.toLocaleString("en-IE")} €
              </span>
            </div>
            {anyUnconfirmed && <ProvisionalPriceNote className="mt-2 text-right" />}
            <p className="mt-2 text-xs text-bone/40 text-right">
              Excludes shipping and any applicable VAT — calculated at checkout.
            </p>

            <Link
              href="/checkout"
              className="btn-primary block text-center mt-10 py-4"
            >
              Proceed to checkout
            </Link>
          </>
        )}
      </Container>
    </section>
  );
}
