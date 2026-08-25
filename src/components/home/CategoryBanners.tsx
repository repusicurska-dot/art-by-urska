"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const CATEGORIES = [
  {
    title: "Originals",
    eyebrow: "Shop",
    description: "One-of-a-kind paintings, each with its own story.",
    href: "/collection",
  },
  {
    title: "Poetry Prints",
    eyebrow: "Shop",
    description: "Words from the paintings, made to live on your wall.",
    href: "/poetry",
  },
  {
    title: "Commissions",
    eyebrow: "Bespoke",
    description: "A piece painted for you, from a story only you know.",
    href: "/contact",
  },
];

export default function CategoryBanners() {
  return (
    <section className="border-t border-bone/10">
      {CATEGORIES.map((category, i) => (
        <Link
          key={category.title}
          href={category.href}
          className={`group relative block h-[280px] md:h-[360px] overflow-hidden ${
            i % 2 === 1 ? "bg-midnight" : "bg-ink"
          } ${i > 0 ? "border-t border-bone/10" : ""}`}
        >
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-bone/[0.04] blur-[100px] opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            aria-hidden="true"
          />

          <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
            <span className="text-xs tracking-[0.3em] uppercase text-smoke mb-4">
              {category.eyebrow}
            </span>
            <span className="font-gothic text-4xl md:text-6xl text-bone transition-transform duration-500 group-hover:-translate-y-1">
              {category.title}
            </span>
            <span className="mt-4 max-w-sm text-sm text-bone/50 leading-relaxed">
              {category.description}
            </span>
            <span className="mt-7 inline-flex items-center gap-2 text-xs tracking-widest uppercase text-bone/70 border-b border-bone/20 pb-1 opacity-0 -translate-y-1 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
              Explore
              <ArrowRight size={14} strokeWidth={1.5} />
            </span>
          </div>
        </Link>
      ))}
    </section>
  );
}
