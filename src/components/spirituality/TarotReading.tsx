"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Container from "@/components/shared/Container";
import TarotIcon from "./TarotIcon";
import TarotCardFrame from "./TarotCardFrame";
import ScratchCard from "./ScratchCard";
import TarotEmailSignup from "./TarotEmailSignup";
import { TAROT_CARDS, getCardOfTheDayKey, type Lang } from "./tarotData";

const LABELS: Record<
  Lang,
  {
    heading: string;
    intro: string;
    drawButton: string;
    drawAgain: string;
    cardOfDay: string;
    yourCard: string;
    chooseInstead: string;
    numberPrefix: string;
    backHint: string;
  }
> = {
  sl: {
    heading: "Tarot",
    intro:
      "Karte ne odločajo namesto tebe — pokažejo jezik za tisto, kar že nosiš v sebi. Izvleci karto, ali si izberi eno sam, in prisluhni, kaj ti pove.",
    drawButton: "Izvleci karto",
    drawAgain: "Izvleci znova",
    cardOfDay: "Karta dneva",
    yourCard: "Tvoja karta",
    chooseInstead: "Ali izberi karto sama",
    numberPrefix: "Karta",
    backHint: "Klikni za obračanje",
  },
  en: {
    heading: "Tarot",
    intro:
      "The cards don't decide for you — they offer a language for what you already carry. Draw a card, or choose one yourself, and listen to what it says.",
    drawButton: "Draw a card",
    drawAgain: "Draw again",
    cardOfDay: "Card of the day",
    yourCard: "Your card",
    chooseInstead: "Or choose a card yourself",
    numberPrefix: "Card",
    backHint: "Click to turn",
  },
};

function romanNumeral(n: number): string {
  if (n === 0) return "0";
  const table: [number, string][] = [
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];
  let remaining = n;
  let out = "";
  for (const [value, symbol] of table) {
    while (remaining >= value) {
      out += symbol;
      remaining -= value;
    }
  }
  return out;
}

export default function TarotReading({ lang }: { lang: Lang }) {
  const reduceMotion = useReducedMotion();
  const [todayKey, setTodayKey] = useState<string | null>(null);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [drawCount, setDrawCount] = useState(0);

  // Deferred to the client's clock: this page can be statically generated, so "today"
  // can't be computed at build time. The day's card waits face-down until the visitor
  // turns it over — a deliberate first beat, not just an auto-reveal.
  useEffect(() => {
    const key = getCardOfTheDayKey();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTodayKey(key);
    setSelectedKey(key);
  }, []);

  const labels = LABELS[lang];
  const selected = useMemo(() => TAROT_CARDS.find((c) => c.key === selectedKey) ?? null, [selectedKey]);
  const isCardOfDay = !!selectedKey && selectedKey === todayKey && drawCount === 0;

  function reveal() {
    setRevealed(true);
  }

  function drawRandom() {
    const pool = TAROT_CARDS.filter((c) => c.key !== selectedKey);
    const pick = pool[Math.floor(Math.random() * pool.length)] ?? TAROT_CARDS[0];
    setRevealed(false);
    setDrawCount((n) => n + 1);
    window.setTimeout(
      () => {
        setSelectedKey(pick.key);
        setRevealed(true);
      },
      reduceMotion ? 0 : 380
    );
  }

  function choose(key: string) {
    if (key === selectedKey) {
      if (!revealed) reveal();
      return;
    }
    setRevealed(false);
    window.setTimeout(
      () => {
        setSelectedKey(key);
        setRevealed(true);
      },
      reduceMotion ? 0 : 380
    );
  }

  return (
    <section className="border-t border-bone/10 py-24 md:py-32">
      <Container className="max-w-2xl text-center">
        <span className="block text-xs tracking-[0.3em] uppercase text-smoke">{labels.heading}</span>
        <p
          className="mt-6 text-bone/90 leading-relaxed max-w-xl mx-auto"
          style={{ textShadow: "0 1px 12px rgba(0,0,0,0.5)" }}
        >
          {labels.intro}
        </p>

        {/* The big reading card: flips between a decorative back and the drawn front. */}
        <div className="relative mx-auto mt-16 h-[374px] w-[220px] sm:h-[425px] sm:w-[250px]" style={{ perspective: 1200 }}>
          <motion.div
            className="relative h-full w-full cursor-pointer"
            style={{ transformStyle: "preserve-3d" }}
            animate={{ rotateY: revealed && selected ? 180 : 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.6, ease: "easeInOut" }}
            onClick={() => {
              if (selected && !revealed) reveal();
              else if (!selected) drawRandom();
            }}
            role="button"
            tabIndex={0}
            aria-label={labels.drawButton}
            onKeyDown={(e) => {
              if (e.key !== "Enter" && e.key !== " ") return;
              if (selected && !revealed) reveal();
              else if (!selected) drawRandom();
            }}
          >
            {/* Back */}
            <div
              className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-lg border"
              style={{
                backfaceVisibility: "hidden",
                borderColor: "color-mix(in srgb, var(--color-accent-warm) 35%, transparent)",
                background:
                  "radial-gradient(circle at 50% 45%, color-mix(in srgb, var(--color-accent-warm) 9%, var(--color-ink)) 0%, var(--color-ink) 72%)",
                boxShadow: "0 25px 60px -25px rgba(0,0,0,0.6)",
              }}
            >
              <TarotCardFrame />
              <span
                className="flex h-20 w-20 items-center justify-center"
                style={{ color: "var(--color-accent-warm)" }}
              >
                <TarotIcon cardKey="star" className="h-full w-full" />
              </span>
            </div>

            {/* Front */}
            <div
              className="absolute inset-0 flex flex-col items-center overflow-hidden rounded-lg border px-4 py-6 text-center"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
                borderColor: "color-mix(in srgb, var(--color-accent-warm) 45%, transparent)",
                background:
                  "radial-gradient(circle at 50% 40%, color-mix(in srgb, var(--color-accent-warm) 11%, var(--color-ink)) 0%, var(--color-ink) 75%)",
                boxShadow:
                  "0 25px 60px -25px rgba(0,0,0,0.6), 0 0 40px -10px color-mix(in srgb, var(--color-accent-warm) 22%, transparent)",
              }}
            >
              <TarotCardFrame />
              {selected && (
                <>
                  <span
                    className="relative z-10 text-[11px] tracking-[0.35em]"
                    style={{ color: "color-mix(in srgb, var(--color-accent-warm) 85%, transparent)" }}
                  >
                    {romanNumeral(selected.number)}
                  </span>

                  <div className="relative z-10 flex flex-1 items-center justify-center py-3">
                    {selected.image ? (
                      <div className="relative h-full w-full overflow-hidden rounded-sm">
                        <Image
                          src={selected.image}
                          alt={selected.name[lang]}
                          fill
                          sizes="250px"
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <span
                        className="flex h-24 w-24 items-center justify-center rounded-full p-5"
                        style={{
                          background:
                            "radial-gradient(circle at 35% 30%, var(--color-accent-warm), var(--color-terracotta) 75%)",
                          color: "var(--color-ink)",
                          boxShadow:
                            "0 0 0 1px color-mix(in srgb, var(--color-accent-warm) 60%, transparent), 0 0 50px 10px color-mix(in srgb, var(--color-accent-warm) 40%, transparent)",
                        }}
                      >
                        <TarotIcon key={selected.key} cardKey={selected.key} className="h-full w-full" animateIn />
                      </span>
                    )}
                  </div>

                  <div className="relative z-10 w-full">
                    <div
                      className="mx-auto mb-2.5 h-px w-16"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent, color-mix(in srgb, var(--color-accent-warm) 60%, transparent), transparent)",
                      }}
                    />
                    <h3
                      className="font-heading text-[13px] tracking-[0.22em] uppercase leading-snug"
                      style={{ color: "color-mix(in srgb, var(--color-accent-warm) 55%, var(--color-bone))" }}
                    >
                      {selected.name[lang]}
                    </h3>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>

        {!revealed && (
          <p className="mt-6 text-xs tracking-widest uppercase text-smoke">{labels.backHint}</p>
        )}

        <button type="button" onClick={drawRandom} className="btn-primary mt-8">
          {revealed ? labels.drawAgain : labels.drawButton}
        </button>

        <AnimatePresence mode="wait">
          {selected && revealed && (
            <motion.div
              key={selected.key + drawCount}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="mt-10 flex flex-col items-center"
            >
              <span className="text-xs tracking-widest uppercase text-smoke mb-3">
                {isCardOfDay ? labels.cardOfDay : labels.yourCard}
              </span>

              <div className="flex flex-wrap justify-center gap-2">
                {selected.keywords[lang].map((word) => (
                  <span
                    key={word}
                    className="rounded-full border px-3 py-1 text-xs tracking-wide"
                    style={{
                      borderColor: "color-mix(in srgb, var(--color-terracotta) 35%, transparent)",
                      background: "var(--color-accent-warm)",
                      color: "var(--color-ink)",
                    }}
                  >
                    {word}
                  </span>
                ))}
              </div>

              <p
                className="mt-6 max-w-md rounded-md px-5 py-3 leading-relaxed italic font-heading text-lg"
                style={{ background: "var(--color-bone)", color: "var(--color-ink)" }}
              >
                {selected.meaning[lang]}
              </p>

              <div
                className="mt-10 w-full max-w-lg rounded-lg px-7 py-8 text-left md:px-10 md:py-10"
                style={{
                  background: "var(--color-bone)",
                  border: "1px solid color-mix(in srgb, var(--color-terracotta) 30%, transparent)",
                  boxShadow: "0 25px 60px -25px rgba(0,0,0,0.6)",
                }}
              >
                <div className="space-y-5 text-left">
                  {selected.profile[lang].split("\n\n").map((para, i, arr) => {
                    const isFirst = i === 0;
                    const isLast = i === arr.length - 1;

                    if (isFirst) {
                      return (
                        <p key={i} className="leading-relaxed" style={{ color: "var(--color-ink)" }}>
                          <span
                            className="float-left mr-2 pt-1 font-heading text-5xl leading-[0.8]"
                            style={{ color: "var(--color-terracotta)" }}
                          >
                            {para.charAt(0)}
                          </span>
                          {para.slice(1)}
                        </p>
                      );
                    }

                    if (isLast) {
                      return (
                        <p
                          key={i}
                          className="clear-both font-heading italic text-lg leading-relaxed"
                          style={{ color: "var(--color-terracotta)" }}
                        >
                          {para}
                        </p>
                      );
                    }

                    return (
                      <p key={i} className="clear-both leading-relaxed" style={{ color: "var(--color-ink)" }}>
                        {para}
                      </p>
                    );
                  })}
                </div>
              </div>

              <ScratchCard lang={lang} />

              <TarotEmailSignup lang={lang} cardKey={selected.key} cardName={selected.name[lang]} />
            </motion.div>
          )}
        </AnimatePresence>

        <p className="mt-16 text-xs tracking-widest uppercase text-smoke">{labels.chooseInstead}</p>
        <div className="mt-5 flex flex-wrap justify-center gap-2.5">
          {TAROT_CARDS.map((card) => {
            const isSelected = card.key === selectedKey;
            return (
              <button
                key={card.key}
                type="button"
                onClick={() => choose(card.key)}
                aria-pressed={isSelected}
                aria-label={card.name[lang]}
                title={card.name[lang]}
                className="flex h-11 w-8 items-center justify-center rounded-sm border p-1.5 transition-transform hover:scale-110"
                style={{
                  borderColor: isSelected
                    ? "var(--color-accent-warm)"
                    : "color-mix(in srgb, var(--color-bone) 15%, transparent)",
                  background: isSelected
                    ? "color-mix(in srgb, var(--color-accent-warm) 18%, transparent)"
                    : "transparent",
                  color: isSelected ? "var(--color-accent-warm)" : "var(--color-smoke)",
                }}
              >
                <TarotIcon cardKey={card.key} className="h-full w-full" />
              </button>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
