"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Container from "@/components/shared/Container";
import type { Lang } from "./tarotData";
import { BREATH_LABELS } from "./pathsData";

type Step = "inhale" | "hold" | "exhale";

// 4 – 2 – 6: a longer exhale than inhale is the part that actually calms the body.
const STEPS: { key: Step; seconds: number }[] = [
  { key: "inhale", seconds: 4 },
  { key: "hold", seconds: 2 },
  { key: "exhale", seconds: 6 },
];
const ROUNDS = 5;

export default function BreathingPause({ lang }: { lang: Lang }) {
  const labels = BREATH_LABELS[lang];
  const reduceMotion = useReducedMotion();
  const [status, setStatus] = useState<"idle" | "running" | "done">("idle");
  const [round, setRound] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    if (status !== "running") return;
    const timer = window.setTimeout(() => {
      if (stepIndex < STEPS.length - 1) {
        setStepIndex(stepIndex + 1);
      } else if (round < ROUNDS - 1) {
        setRound(round + 1);
        setStepIndex(0);
      } else {
        setStatus("done");
      }
    }, STEPS[stepIndex].seconds * 1000);
    return () => window.clearTimeout(timer);
  }, [status, round, stepIndex]);

  function start() {
    setRound(0);
    setStepIndex(0);
    setStatus("running");
  }

  const step = STEPS[stepIndex];
  const expanded = status === "running" && step.key !== "exhale";

  return (
    <section id="pause" className="scroll-mt-24 border-t border-bone/10 py-24 md:py-28">
      <Container className="max-w-2xl text-center">
        <span className="block text-xs tracking-[0.3em] uppercase text-smoke">{labels.eyebrow}</span>
        <h2 className="mt-5 font-heading italic text-3xl md:text-4xl text-bone">{labels.heading}</h2>
        <p className="mt-4 text-bone/75 leading-relaxed max-w-md mx-auto">{labels.intro}</p>

        <div className="relative mx-auto mt-12 flex h-64 w-64 items-center justify-center">
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(circle, color-mix(in srgb, var(--color-aurora-gold) 70%, transparent) 0%, color-mix(in srgb, var(--color-aurora-violet) 45%, transparent) 60%, transparent 72%)",
            }}
            animate={{ scale: reduceMotion ? 1 : expanded ? 1 : 0.62 }}
            transition={{ duration: reduceMotion ? 0 : step.seconds, ease: "easeInOut" }}
            initial={{ scale: 0.62 }}
          />
          <div
            className="relative flex h-32 w-32 flex-col items-center justify-center rounded-full border"
            style={{
              background: "color-mix(in srgb, var(--color-paper) 85%, transparent)",
              borderColor: "color-mix(in srgb, var(--color-accent-warm) 35%, transparent)",
            }}
          >
            <p className="font-heading text-xl text-bone" aria-live="polite">
              {status === "running" ? labels[step.key] : status === "done" ? "✦" : labels.ready}
            </p>
            {status === "running" && (
              <p className="mt-1 text-[10px] tracking-widest uppercase text-smoke">
                {round + 1} / {ROUNDS}
              </p>
            )}
          </div>
        </div>

        {status === "done" && <p className="mt-6 font-heading italic text-lg text-bone">{labels.done}</p>}

        <button
          type="button"
          onClick={status === "running" ? () => setStatus("idle") : start}
          className={status === "running" ? "btn-secondary mt-8 border-bone/30 text-bone" : "btn-primary mt-8"}
        >
          {status === "running" ? labels.stop : status === "done" ? labels.again : labels.start}
        </button>
      </Container>
    </section>
  );
}
