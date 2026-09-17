"use client";

import { ReactNode } from "react";
import Container from "@/components/shared/Container";
import { useLanguage } from "@/i18n/LanguageProvider";

/**
 * The frame around every legal page. Its own labels follow the visitor's language; the policy
 * text inside stays in English, and a line says so — a machine translation of a legal document
 * shouldn't be the version anyone relies on.
 */
export default function LegalPageShell({
  title,
  updated,
  children,
}: {
  title: string;
  updated?: string;
  children: ReactNode;
}) {
  const { t, locale } = useLanguage();
  return (
    <section className="py-24 md:py-32">
      <Container className="max-w-2xl">
        <span className="block text-xs tracking-widest uppercase text-gold-400">{t.legal.eyebrow}</span>
        <h1 className="font-heading text-4xl md:text-5xl text-bone mt-4">{title}</h1>
        {updated && (
          <p className="mt-2 text-xs text-bone/40">
            {t.legal.lastUpdated}: {updated}
          </p>
        )}

        <div className="mt-8 rounded-sm border border-terracotta/30 bg-terracotta/5 px-5 py-4 text-sm text-bone/70">
          <strong className="block text-bone mb-1">{t.legal.pendingTitle}</strong>
          {t.legal.pendingBody}
          {locale !== "en" && <span className="mt-2 block">{t.legal.englishNote}</span>}
        </div>

        <div className="mt-12 space-y-8 text-bone/80 leading-relaxed [&_h2]:font-heading [&_h2]:text-xl [&_h2]:text-bone [&_h2]:mb-3 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_a]:underline [&_a]:hover:text-gold-400">
          {children}
        </div>
      </Container>
    </section>
  );
}
