"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Container from "@/components/shared/Container";
import ZodiacIcon from "./ZodiacIcon";
import ScratchCard from "./ScratchCard";
import HoroscopeEmailSignup from "./HoroscopeEmailSignup";
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

        {/* A real zodiac wheel: 12 signs orbiting a slowly, continuously turning ring. */}
        <div className="relative mx-auto mt-16 aspect-square w-[300px] sm:w-[380px]">
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, color-mix(in srgb, var(--color-accent-warm) 22%, transparent) 0%, transparent 70%)",
            }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-[10%] rounded-full"
            style={{
              border: "1px solid transparent",
              backgroundImage:
                "linear-gradient(var(--color-ink), var(--color-ink)), conic-gradient(from 0deg, color-mix(in srgb, var(--color-accent-warm) 45%, transparent), transparent 30%, transparent 70%, color-mix(in srgb, var(--color-accent-warm) 45%, transparent))",
              backgroundOrigin: "border-box",
              backgroundClip: "padding-box, border-box",
            }}
          />

          <div className="absolute inset-0 zodiac-wheel-spin">
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
                  {/* Counter-rotate the icon itself so it stays upright while it orbits. */}
                  <span className="flex items-center justify-center zodiac-icon-counter-spin">
                    {isSelected ? (
                      <motion.span
                        className="relative flex h-24 w-24 items-center justify-center rounded-full p-5"
                        style={{
                          background:
                            "radial-gradient(circle at 35% 30%, var(--color-accent-warm), var(--color-terracotta) 75%)",
                          color: "var(--color-ink)",
                          boxShadow:
                            "0 0 0 1px color-mix(in srgb, var(--color-accent-warm) 60%, transparent), 0 0 50px 10px color-mix(in srgb, var(--color-accent-warm) 55%, transparent)",
                        }}
                        animate={reduceMotion ? {} : { scale: [1, 1.06, 1] }}
                        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <ZodiacIcon key={sign.key} signKey={sign.key} className="h-full w-full" animateIn />
                      </motion.span>
                    ) : isToday ? (
                      <motion.span
                        className="relative flex h-14 w-14 items-center justify-center rounded-full border-2 p-2.5 text-bone"
                        style={{
                          borderColor: "var(--color-accent-warm)",
                          background:
                            "radial-gradient(circle at 35% 30%, color-mix(in srgb, var(--color-accent-warm) 35%, transparent), color-mix(in srgb, var(--color-accent-warm) 10%, transparent) 75%)",
                        }}
                        animate={
                          reduceMotion
                            ? {}
                            : {
                                boxShadow: [
                                  "0 0 0 0 color-mix(in srgb, var(--color-accent-warm) 45%, transparent)",
                                  "0 0 16px 4px color-mix(in srgb, var(--color-accent-warm) 45%, transparent)",
                                  "0 0 0 0 color-mix(in srgb, var(--color-accent-warm) 45%, transparent)",
                                ],
                              }
                        }
                        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <ZodiacIcon signKey={sign.key} className="h-full w-full" />
                      </motion.span>
                    ) : (
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-bone/15 p-2 text-smoke transition-colors hover:text-bone hover:border-bone/40">
                        <ZodiacIcon signKey={sign.key} className="h-full w-full" />
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {selected && (
            <motion.div
              key={selected.key}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="mt-10 flex flex-col items-center"
            >
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

              <div
                className="mt-10 w-full max-w-lg rounded-lg px-7 py-8 text-left md:px-10 md:py-10"
                style={{
                  background:
                    "linear-gradient(160deg, color-mix(in srgb, var(--color-accent-warm) 14%, var(--color-raised)) 0%, color-mix(in srgb, var(--color-terracotta) 10%, var(--color-raised)) 100%)",
                  border: "1px solid color-mix(in srgb, var(--color-accent-warm) 30%, transparent)",
                  boxShadow:
                    "0 25px 60px -25px rgba(0,0,0,0.5), 0 0 40px -10px color-mix(in srgb, var(--color-accent-warm) 25%, transparent)",
                }}
              >
                <div
                  className="rounded-sm px-5 py-4"
                  style={{
                    background: "color-mix(in srgb, var(--color-accent-warm) 16%, transparent)",
                    borderLeft: "2px solid var(--color-accent-warm)",
                  }}
                >
                  <span className="text-xs tracking-widest uppercase text-bone/70">
                    {labels.thisWeek}
                  </span>
                  <p className="mt-2 text-bone leading-relaxed">
                    {selected.weeklyFocus[lang][focusIndex]}
                  </p>
                </div>

                <div className="mt-8 text-bone/75 leading-relaxed whitespace-pre-line">
                  {selected.profile[lang]}
                </div>
              </div>

              <ScratchCard lang={lang} />

              <HoroscopeEmailSignup lang={lang} signKey={selected.key} signName={selected.name[lang]} />
            </motion.div>
        )}
      </Container>
    </section>
  );
}
