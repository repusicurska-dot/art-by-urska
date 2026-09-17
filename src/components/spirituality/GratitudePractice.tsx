"use client";

import { useEffect, useState } from "react";
import Container from "@/components/shared/Container";
import type { Lang } from "./tarotData";
import { GRATITUDE_LABELS } from "./pathsData";

const STORAGE_KEY = "au-gratitude-v1";

type Store = Record<string, [string, string, string]>;

function todayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function readStore(): Store {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Store) : {};
  } catch {
    return {};
  }
}

export default function GratitudePractice({ lang }: { lang: Lang }) {
  const labels = GRATITUDE_LABELS[lang];
  const [lights, setLights] = useState<[string, string, string]>(["", "", ""]);
  const [saved, setSaved] = useState(false);
  const [days, setDays] = useState(0);

  // Only ever stored in this visitor's own browser — nothing is sent anywhere.
  useEffect(() => {
    const store = readStore();
    const today = store[todayKey()];
    /* eslint-disable react-hooks/set-state-in-effect */
    if (today) {
      setLights(today);
      setSaved(true);
    }
    setDays(Object.keys(store).length);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  function save(e: React.FormEvent) {
    e.preventDefault();
    const store = readStore();
    store[todayKey()] = lights;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    } catch {
      // Storage unavailable (private mode) — still show the moment, just don't keep it.
    }
    setDays(Object.keys(store).length);
    setSaved(true);
  }

  const filled = lights.filter((l) => l.trim()).length;

  return (
    <section id="gratitude" className="scroll-mt-24 border-t border-bone/10 py-24 md:py-28">
      <Container className="max-w-2xl text-center">
        <span className="block text-xs tracking-[0.3em] uppercase text-smoke">{labels.eyebrow}</span>
        <h2 className="mt-5 font-heading italic text-3xl md:text-4xl text-bone">{labels.heading}</h2>
        <p className="mt-4 text-bone leading-relaxed max-w-lg mx-auto">{labels.intro}</p>

        <form
          onSubmit={save}
          className="mx-auto mt-10 max-w-lg rounded-3xl border border-bone/10 bg-paper/80 p-6 text-left shadow-[0_30px_70px_-40px_rgba(75,58,94,0.45)] md:p-8"
        >
          <div className="space-y-4">
            {lights.map((value, i) => {
              const lit = value.trim().length > 0;
              return (
                <div key={i} className="flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className="h-3 w-3 shrink-0 rounded-full transition-all duration-700"
                    style={{
                      background: lit ? "var(--color-aurora-gold)" : "color-mix(in srgb, var(--color-bone) 12%, transparent)",
                      boxShadow: lit ? "0 0 14px 4px color-mix(in srgb, var(--color-aurora-gold) 80%, transparent)" : "none",
                    }}
                  />
                  <label htmlFor={`gratitude-${i}`} className="sr-only">
                    {labels.placeholders[i]}
                  </label>
                  <input
                    id={`gratitude-${i}`}
                    type="text"
                    maxLength={140}
                    value={value}
                    placeholder={labels.placeholders[i]}
                    onChange={(e) => {
                      const next = [...lights] as [string, string, string];
                      next[i] = e.target.value;
                      setLights(next);
                      setSaved(false);
                    }}
                    className="w-full border-b border-bone/15 bg-transparent py-2 text-bone placeholder:text-smoke focus:border-accent-warm focus:outline-none"
                  />
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex flex-col items-center gap-3 text-center">
            {saved ? (
              <>
                <p className="font-heading italic text-lg text-bone">{labels.saved}</p>
                <p className="text-xs tracking-widest uppercase text-accent-warm">{labels.streak(days)}</p>
              </>
            ) : (
              <button type="submit" disabled={filled === 0} className="btn-primary">
                {labels.save}
              </button>
            )}
            <p className="text-xs italic text-smoke">{labels.privacy}</p>
          </div>
        </form>
      </Container>
    </section>
  );
}
