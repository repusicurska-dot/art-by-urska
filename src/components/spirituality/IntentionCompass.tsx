"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Compass, Feather, Flower2, HeartHandshake, Sparkles } from "lucide-react";
import Container from "@/components/shared/Container";
import type { Lang } from "./tarotData";
import { COMPASS_LABELS, INTENTIONS, type IntentionKey } from "./pathsData";

const ICONS: Record<IntentionKey, typeof Compass> = {
  calm: Feather,
  clarity: Sparkles,
  selfLove: Flower2,
  connection: HeartHandshake,
  meaning: Compass,
};

export default function IntentionCompass({ lang }: { lang: Lang }) {
  const labels = COMPASS_LABELS[lang];
  const [selectedKey, setSelectedKey] = useState<IntentionKey | null>(null);
  const selected = INTENTIONS.find((i) => i.key === selectedKey) ?? null;

  return (
    <section id="intention" className="scroll-mt-24 border-t border-bone/10 py-24 md:py-28">
      <Container className="max-w-4xl text-center">
        <span className="block text-xs tracking-[0.3em] uppercase text-smoke">{labels.eyebrow}</span>
        <h2 className="mt-5 font-heading italic text-3xl md:text-4xl text-bone">{labels.heading}</h2>
        <p className="mt-4 text-bone/75 leading-relaxed max-w-xl mx-auto">{labels.intro}</p>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {INTENTIONS.map((intention) => {
            const Icon = ICONS[intention.key];
            const isSelected = intention.key === selectedKey;
            return (
              <button
                key={intention.key}
                type="button"
                onClick={() => setSelectedKey(isSelected ? null : intention.key)}
                aria-pressed={isSelected}
                aria-controls="intention-result"
                className="group flex flex-col items-center rounded-2xl border px-3 py-6 transition-all duration-300 hover:-translate-y-0.5 last:col-span-2 sm:last:col-span-1"
                style={{
                  borderColor: isSelected
                    ? "var(--color-accent-warm)"
                    : "color-mix(in srgb, var(--color-bone) 12%, transparent)",
                  background: isSelected
                    ? "color-mix(in srgb, var(--color-aurora-gold) 30%, var(--color-paper))"
                    : "color-mix(in srgb, var(--color-paper) 70%, transparent)",
                  boxShadow: isSelected ? "0 18px 40px -24px rgba(143,103,45,0.55)" : "none",
                }}
              >
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-full transition-colors"
                  style={{
                    background: "color-mix(in srgb, var(--color-aurora-violet) 30%, transparent)",
                    color: "var(--color-accent-warm)",
                  }}
                >
                  <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
                </span>
                <span className="mt-4 font-heading text-lg text-bone">{intention.label[lang]}</span>
                <span className="mt-1 text-xs leading-snug text-smoke">{intention.when[lang]}</span>
              </button>
            );
          })}
        </div>

        <div id="intention-result" aria-live="polite">
          <AnimatePresence mode="wait">
            {selected && (
              <motion.div
                key={`${selected.key}-${lang}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="mt-10 grid gap-8 rounded-3xl border border-bone/10 bg-paper/80 p-7 text-left shadow-[0_30px_70px_-40px_rgba(75,58,94,0.45)] md:grid-cols-[1fr_auto] md:p-10"
              >
                <div>
                  <p className="font-heading italic text-2xl leading-snug text-bone">{selected.message[lang]}</p>

                  <p className="mt-7 text-xs tracking-widest uppercase text-accent-warm">{labels.practiceLabel}</p>
                  <p className="mt-2 leading-relaxed text-bone/80">{selected.practice[lang]}</p>

                  <a href={`#${selected.anchor}`} className="btn-primary mt-8 inline-block">
                    {selected.anchorLabel[lang]}
                  </a>
                </div>

                <Link
                  href={`/artworks/${selected.artwork.slug}`}
                  className="group flex items-center gap-4 md:w-48 md:flex-col md:items-start"
                >
                  <div className="relative h-28 w-20 shrink-0 overflow-hidden rounded-lg bg-raised md:h-56 md:w-48">
                    <Image
                      src={selected.artwork.image}
                      alt={selected.artwork.title}
                      fill
                      sizes="(min-width: 768px) 192px, 80px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-widest uppercase text-smoke">{labels.artworkLabel}</p>
                    <p className="mt-1 font-heading text-base text-bone group-hover:underline">
                      {selected.artwork.title}
                    </p>
                  </div>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
