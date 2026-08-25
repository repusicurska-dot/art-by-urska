import { ReactNode } from "react";
import Container from "@/components/shared/Container";
import { legalReviewNotice } from "@/content/business";

export default function LegalPageShell({
  title,
  updated,
  children,
}: {
  title: string;
  updated?: string;
  children: ReactNode;
}) {
  return (
    <section className="py-24 md:py-32 bg-ink">
      <Container className="max-w-2xl">
        <span className="block text-xs tracking-widest uppercase text-gold-400">Legal</span>
        <h1 className="font-heading text-4xl md:text-5xl text-bone mt-4">{title}</h1>
        {updated && <p className="mt-2 text-xs text-bone/40">Last updated: {updated}</p>}

        <div className="mt-8 rounded-sm border border-terracotta/30 bg-terracotta/5 px-5 py-4 text-sm text-bone/70">
          <strong className="block text-bone mb-1">Pending legal review</strong>
          {legalReviewNotice}
        </div>

        <div className="mt-12 space-y-8 text-bone/80 leading-relaxed [&_h2]:font-heading [&_h2]:text-xl [&_h2]:text-bone [&_h2]:mb-3 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_a]:underline [&_a]:hover:text-gold-400">
          {children}
        </div>
      </Container>
    </section>
  );
}
