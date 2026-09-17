"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Artwork } from "@/content/types";
import { useCart } from "@/lib/cart/CartContext";
import { useLanguage } from "@/i18n/LanguageProvider";

export default function EnquireCTA({ artwork }: { artwork: Artwork }) {
  const cart = useCart();
  const router = useRouter();
  const { t } = useLanguage();
  const inCart = cart.has(artwork.slug);
  const purchasable = artwork.availability === "available" || artwork.availability === "reserved";

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
      <Link
        href={`/contact?piece=${artwork.slug}`}
        className="btn-primary"
      >
        {t.artwork.inquireAbout}
      </Link>
      <button
        type="button"
        disabled={!purchasable}
        title={purchasable ? undefined : t.artwork.notAvailableOnline}
        onClick={() => {
          if (inCart) {
            router.push("/cart");
          } else {
            cart.add(artwork.slug);
          }
        }}
        className="btn-secondary border-bone/30 text-bone hover:border-bone hover:text-bone disabled:cursor-not-allowed"
      >
        {inCart ? t.artwork.viewCart : t.artwork.addToCart}
      </button>
    </div>
  );
}
