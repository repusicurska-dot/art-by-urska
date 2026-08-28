"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Container from "@/components/shared/Container";
import ZodiacIcon from "./ZodiacIcon";
import { SIGNS, getCurrentSignKey, getWeeklyFocusIndex, type Lang } from "./zodiacData";

const WHEEL_RADIUS_PERCENT = 42;
const FOCUS_POOL_SIZE = 4;

const LABELS: Record<
  Lang,
  { heading: string; intro: string; today: string; element: string; thisWeek: string }
> = {
  sl: {
    heading: "Horoskop",
    intro:
      "Zvezde ne pišejo usode namesto naju — samo ponujajo jezik za tisto, kar že čutiva. Izberi svoje znamenje, ali poglej, katero trenutno vodi nebo.",
    today: "Trenutno znamenje",
    element: "Element",
    thisWeek: "Ta teden",
  },
  en: {
    heading: "Horoscope",
    intro:
      "The stars don't write our fate for us — they just offer a language for what we already feel. Pick your sign, or see which one the sky is currently moving through.",
    today: "Today's sign",
    element: "Element",
    thisWeek: "This week",
  },
};

export default function Horoscope({ lang }: { lang: Lang }) {
  const reduceMotion = useReducedMotion();
  const [todayKey, setTodayKey] = useState<string | null>(null);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [focusIndex, setFocusIndex] = useState(0);

  // Deliberately deferred to the client's clock: this page can be statically
  // generated, so computing "today"/"this week" during render would freeze them
  // at build time. Both then advance entirely on their own, no manual updates.
  useEffect(() => {
    const key = getCurrentSignKey();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTodayKey(key);
    setSelectedKey(key);
    setFocusIndex(getWeeklyFocusIndex(FOCUS_POOL_SIZE));
  }, []);

  const labels = LABELS[lang];
  const selected = SIGNS.find((s) => s.key === selectedKey) ?? null;

  return (
    <section className="border-t border-bone/10 py-24 md:py-32">
      <Container className="max-w-2xl text-center">
        <span className="block text-xs tracking-[0.3em] uppercase text-smoke">{labels.heading}</span>
        <p className="mt-6 text-bone/70 leading-relaxed max-w-xl mx-auto">{labels.intro}</p>

        {/* A real zodiac wheel: 12 signs arranged around a circle. */}
        <div className="relative mx-auto mt-16 aspect-square w-[280px] sm:w-[340px]">
          <div
            aria-hidden="true"
            className="absolute inset-[10%] rounded-full border border-bone/10"
          />
          {SIGNS.map((sign, i) => {
            const angle = (i / SIGNS.length) * 2 * Math.PI - Math.PI / 2;
            // Fixed precision avoids a server/client hydration mismatch from tiny
            // floating-point string differences between JS engines.
            const x = (50 + WHEEL_RADIUS_PERCENT * Math.cos(angle)).toFixed(4);
            const y = (50 + WHEEL_RADIUS_PERCENT * Math.sin(angle)).toFixed(4);
            const isToday = sign.key === todayKey;
            const isSelected = sign.key === selectedKey;

            return (
              <button
                key={sign.key}
                type="button"
                onClick={() => setSelectedKey(sign.key)}
                aria-pressed={isSelected}
                aria-label={`${sign.name[lang]}${isToday ? ` — ${labels.today}` : ""}`}
                className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-transform hover:scale-110"
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                {isSelected ? (
                  <motion.span
                    className="relative flex h-20 w-20 items-center justify-center rounded-full p-4"
                    style={{
                      background:
                        "radial-gradient(circle at 35% 30%, var(--color-accent-warm), var(--color-terracotta) 75%)",
                      color: "var(--color-ink)",
                      boxShadow:
                        "0 0 0 1px color-mix(in srgb, var(--color-accent-warm) 60%, transparent), 0 0 40px 8px color-mix(in srgb, var(--color-accent-warm) 55%, transparent)",
                    }}
                    animate={reduceMotion ? {} : { scale: [1, 1.06, 1] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ZodiacIcon signKey={sign.key} className="h-full w-full" />
                  </motion.span>
                ) : isToday ? (
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-full border-2 p-2 text-smoke transition-colors hover:text-bone"
                    style={{ borderColor: "color-mix(in srgb, var(--color-accent-warm) 70%, transparent)" }}
                  >
                    <ZodiacIcon signKey={sign.key} className="h-full w-full" />
                  </span>
                ) : (
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-bone/15 p-1.5 text-smoke transition-colors hover:text-bone hover:border-bone/40">
                    <ZodiacIcon signKey={sign.key} className="h-full w-full" />
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {selected && (
          <div className="mt-10 flex flex-col items-center">
            {selected.key === todayKey && (
              <span className="text-xs tracking-widest uppercase text-smoke mb-3">
                {labels.today}
              </span>
            )}
            <h3 className="font-heading text-2xl text-bone">{selected.name[lang]}</h3>
            <p className="mt-1 text-xs tracking-widest uppercase text-smoke">
              {selected.dates[lang]} · {labels.element}: {selected.element[lang]}
            </p>
            <p className="mt-6 max-w-md text-bone/75 leading-relaxed italic font-heading text-lg">
              {selected.tagline[lang]}
            </p>

            <div className="mt-10 w-full max-w-lg rounded-sm border border-bone/10 bg-raised/40 px-6 py-5 text-left">
              <span className="text-xs tracking-widest uppercase text-smoke">
                {labels.thisWeek}
              </span>
              <p className="mt-2 text-bone/85 leading-relaxed">
                {selected.weeklyFocus[lang][focusIndex]}
              </p>
            </div>

            <div className="mt-10 max-w-lg text-left text-bone/70 leading-relaxed whitespace-pre-line">
              {selected.profile[lang]}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
