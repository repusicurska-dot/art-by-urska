"use client";

import Link from "next/link";
import Container from "@/components/shared/Container";
import { useLanguage } from "@/i18n/LanguageProvider";

export default function ClimbContent() {
  const { t } = useLanguage();
  return (
    <section className="min-h-[70vh] flex items-center justify-center px-6 py-24 text-center">
      <Container className="max-w-xl">
        <span className="block text-xs tracking-[0.3em] uppercase text-smoke">{t.climb.eyebrow}</span>
        <h1 className="font-heading text-4xl md:text-5xl text-bone mt-6">{t.climb.title}</h1>
        <p className="mt-6 text-bone/70 leading-relaxed">{t.climb.text}</p>
        <Link
          href="/"
          className="inline-block mt-10 text-sm tracking-widest uppercase text-bone/85 hover:text-bone transition-colors border-b border-bone/40 pb-1"
        >
          {t.climb.back}
        </Link>
      </Container>
    </section>
  );
}
