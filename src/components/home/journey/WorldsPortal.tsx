"use client";

import Link from "next/link";
import { motion, useReducedMotion, useTransform } from "framer-motion";
import { usePinnedScroll } from "@/lib/usePinnedScroll";

const DIRECTIONS = [
  {
    label: "Original Art",
    description: "The paintings, one by one.",
    href: "/collection",
    accent: "var(--color-accent-cold)",
  },
  {
    label: "Poetry",
    description: "Words the paintings left behind.",
    href: "/poetry",
    accent: "var(--color-accent-poetry)",
  },
  {
    label: "Spirituality",
    description: "Where the brush meets the soul.",
    href: "/spirituality",
    accent: "var(--color-accent-spirit)",
  },
];

/** A slow-growing light swallows the screen, then opens onto three paths through Urška's world. */
export default function WorldsPortal() {
  const reduceMotion = useReducedMotion();
  const { ref, progress } = usePinnedScroll();

  const orbScale = useTransform(progress, [0, 0.42], [0.15, 3.6]);
  const orbOpacity = useTransform(progress, [0, 0.1, 0.42], [0, 0.85, 1]);
  const washOpacity = useTransform(progress, [0.26, 0.55], [0, 1]);
  const linksOpacity = useTransform(progress, [0.46, 0.7], [0, 1]);
  const linksY = useTransform(progress, [0.46, 0.7], [18, 0]);

  if (reduceMotion) {
    return (
      <section className="bg-ink py-28">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <span className="text-xs tracking-[0.3em] uppercase text-smoke">Three paths</span>
          <h2 className="mt-4 font-gothic text-3xl md:text-4xl text-bone">Where would you like to go?</h2>
          <DirectionLinks />
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative h-[140vh] md:h-[175vh] bg-ink">
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        <motion.div
          aria-hidden="true"
          className="absolute h-[26vmin] w-[26vmin] rounded-full blur-[90px]"
          style={{
            scale: orbScale,
            opacity: orbOpacity,
            background:
              "radial-gradient(circle, rgba(197,170,130,0.9) 0%, rgba(175,196,214,0.55) 45%, rgba(3,3,3,0) 75%)",
          }}
        />
        <motion.div aria-hidden="true" className="absolute inset-0 bg-ink" style={{ opacity: washOpacity }} />

        <motion.div style={{ opacity: linksOpacity, y: linksY }} className="relative px-6 text-center">
          <span className="text-xs tracking-[0.3em] uppercase text-smoke">Three paths</span>
          <h2 className="mt-4 font-gothic text-3xl md:text-4xl text-bone">Where would you like to go?</h2>
          <DirectionLinks />
        </motion.div>
      </div>
    </section>
  );
}

function DirectionLinks() {
  return (
    <div className="mt-12 grid gap-8 sm:grid-cols-3 sm:gap-6">
      {DIRECTIONS.map((d) => (
        <Link
          key={d.label}
          href={d.href}
          target={d.href === "/spirituality" ? "_blank" : undefined}
          rel={d.href === "/spirituality" ? "noopener noreferrer" : undefined}
          className="group relative block rounded-sm border border-bone/10 px-6 py-8 transition-colors duration-500 hover:border-bone/25"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 rounded-sm opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-30"
            style={{ background: d.accent }}
          />
          <span className="font-heading text-xl text-bone">{d.label}</span>
          <span className="mt-2 block text-xs text-smoke">{d.description}</span>
          <span
            className="mt-5 inline-block border-b pb-1 text-[11px] tracking-widest uppercase text-bone/60 transition-colors group-hover:text-bone"
            style={{ borderColor: "transparent" }}
          >
            Enter →
          </span>
        </Link>
      ))}
    </div>
  );
}
