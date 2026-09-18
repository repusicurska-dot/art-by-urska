"use client";

import Link from "next/link";
import Container from "@/components/shared/Container";
import { useLanguage } from "@/i18n/LanguageProvider";

/**
 * What a buyer sees after paying — and the two pages next to it, the plain order confirmation
 * and the 404. They are one component because they are one sentence and a link each, and all
 * three have to speak the visitor's language.
 */
export default function OrderStatus({
  variant,
  email,
}: {
  variant: "received" | "paid" | "unconfirmed" | "not-found";
  /** The address Stripe collected, for the "paid" variant. */
  email?: string | null;
}) {
  const { t } = useLanguage();
  const o = t.orderStatus;

  if (variant === "not-found") {
    return (
      <section className="py-32 text-center">
        <Container>
          <h1 className="font-heading text-4xl text-bone">{o.notFoundTitle}</h1>
          <p className="mt-4 text-bone/60">{o.notFoundBody}</p>
          <Link href="/" className={linkClass}>
            {o.backHome}
          </Link>
        </Container>
      </section>
    );
  }

  if (variant === "received") {
    return (
      <section className="py-24 md:py-32 text-center">
        <Container className="max-w-lg">
          <span className="block text-xs tracking-widest uppercase text-gold-400">{o.confirmed}</span>
          <h1 className="font-heading text-4xl text-bone mt-4">{o.thankYou}</h1>
          <p className="mt-6 text-bone/70 leading-relaxed">{o.receivedBody}</p>
          <Link href="/" className={linkClass}>
            {o.backToGallery}
          </Link>
        </Container>
      </section>
    );
  }

  const paid = variant === "paid";
  return (
    <section className="min-h-[70vh] flex items-center justify-center px-6 py-24 text-center">
      <Container className="max-w-xl">
        <span className="block text-xs tracking-[0.3em] uppercase text-smoke">
          {paid ? o.confirmed : o.almostThere}
        </span>
        <h1 className="font-heading text-4xl md:text-5xl text-bone mt-6">
          {paid ? o.thankYou : o.notConfirmedTitle}
        </h1>
        <p className="mt-6 text-bone/70 leading-relaxed">
          {paid ? o.paidBody.replace("{email}", email || o.yourEmail) : o.notConfirmedBody}
        </p>
        <Link href="/collection" className={linkClass}>
          {o.backToCollection}
        </Link>
      </Container>
    </section>
  );
}

const linkClass =
  "inline-block mt-8 text-sm tracking-widest uppercase text-bone/85 hover:text-bone transition-colors border-b border-bone/40 pb-1";
