"use client";

import { useEffect, useState } from "react";
import Container from "@/components/shared/Container";
import type { Lang } from "./tarotData";
import {
  MOON_LABELS,
  MOON_PHASES,
  getDaysUntilFull,
  getIllumination,
  getMoonCycle,
  getMoonPhaseIndex,
} from "./pathsData";

/** Lit part of the disc as seen from the northern hemisphere: waxing lights the right side. */
function litPath(cycle: number, r: number, c: number): string {
  const rx = Math.abs(Math.cos(2 * Math.PI * cycle)) * r;
  const waxing = cycle < 0.5;
  const outerSweep = waxing ? 1 : 0;
  const innerSweep = waxing ? (cycle < 0.25 ? 0 : 1) : cycle < 0.75 ? 0 : 1;
  return `M ${c} ${c - r} A ${r} ${r} 0 0 ${outerSweep} ${c} ${c + r} A ${rx} ${r} 0 0 ${innerSweep} ${c} ${c - r} Z`;
}

export default function MoonToday({ lang }: { lang: Lang }) {
  const labels = MOON_LABELS[lang];
  // Client clock only — this page is statically generated, so "today" can't be baked in.
  const [cycle, setCycle] = useState<number | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCycle(getMoonCycle(new Date()));
  }, []);

  const phase = cycle === null ? null : MOON_PHASES[getMoonPhaseIndex(cycle)];

  return (
    <section id="moon" className="scroll-mt-24 border-t border-bone/10 py-24 md:py-28">
      <Container className="max-w-3xl">
        <div className="flex flex-col items-center gap-10 text-center md:flex-row md:text-left">
          <div className="relative shrink-0">
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-full blur-2xl"
              style={{ background: "color-mix(in srgb, var(--color-aurora-gold) 55%, transparent)" }}
            />
            <svg viewBox="0 0 200 200" className="relative h-44 w-44" role="img" aria-label={phase?.name[lang] ?? ""}>
              <defs>
                <radialGradient id="moon-lit" cx="40%" cy="38%" r="70%">
                  <stop offset="0%" stopColor="#fffdf6" />
                  <stop offset="100%" stopColor="#f4d488" />
                </radialGradient>
              </defs>
              <circle cx="100" cy="100" r="80" fill="#d8cde6" />
              {cycle !== null && <path d={litPath(cycle, 80, 100)} fill="url(#moon-lit)" />}
              <circle cx="100" cy="100" r="80" fill="none" stroke="var(--color-accent-warm)" strokeOpacity="0.35" />
            </svg>
          </div>

          <div className="min-h-[12rem]">
            <span className="block text-xs tracking-[0.3em] uppercase text-smoke">{labels.eyebrow}</span>
            {phase && cycle !== null && (
              <>
                <h2 className="mt-4 font-heading text-3xl md:text-4xl text-bone">{phase.name[lang]}</h2>
                <p className="mt-1 text-xs tracking-widest uppercase text-accent-warm">
                  {Math.round(getIllumination(cycle) * 100)}% {labels.illuminated}
                  {getMoonPhaseIndex(cycle) !== 4 && (
                    <>
                      {" · "}
                      {labels.nextFull} {getDaysUntilFull(cycle)} {labels.days}
                    </>
                  )}
                </p>
                <p className="mt-5 font-heading italic text-xl text-bone">{phase.intention[lang]}</p>
                <p className="mt-2 leading-relaxed text-bone/75">{phase.prompt[lang]}</p>
              </>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
