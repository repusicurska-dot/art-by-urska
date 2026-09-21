"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Container from "@/components/shared/Container";
import WorldLogo from "@/components/shared/WorldLogo";
import { useLanguage } from "@/i18n/LanguageProvider";
import { CLIMB_TITLES, HUB } from "@/content/hub";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Climb by Urška — her years on the rock, until the stories from the wall are ready. */
export default function ClimbContent() {
  const { locale, t } = useLanguage();
  const c = HUB[locale];
  const titles = CLIMB_TITLES[locale];
  const reduceMotion = useReducedMotion();
  const rise = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 1, delay, ease: EASE },
  });

  return (
    <div className="relative isolate overflow-x-clip">
      {/* a ridge line across the top of the page */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 top-[60vh] -z-10 h-[34vh] w-full text-gold-400"
      >
        <motion.path
          d="M0 300 L180 170 L300 230 L470 80 L610 210 L760 40 L920 200 L1060 120 L1200 220 L1440 90"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
          opacity="0.35"
          initial={reduceMotion ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.6, delay: 0.3, ease: EASE }}
        />
        <path
          d="M0 300 L180 170 L300 230 L470 80 L610 210 L760 40 L920 200 L1060 120 L1200 220 L1440 90 V320 H0 Z"
          fill="url(#climbFade)"
        />
        <defs>
          <linearGradient id="climbFade" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#e9d3a2" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#e9d3a2" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      <section className="pb-24 pt-24 text-center md:pb-32 md:pt-32">
        <Container className="max-w-3xl">
          <motion.div
            className="mx-auto w-fit text-gold-600"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: EASE }}
          >
            <WorldLogo world="climb" className="h-44 w-44 md:h-52 md:w-52" delay={0.2} sizes="208px" />
          </motion.div>
          <motion.h1
            className="mt-10 font-heading text-5xl leading-[1.02] text-bone md:text-7xl"
            initial={reduceMotion ? false : { opacity: 0, y: 24, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.3, delay: 0.5, ease: EASE }}
          >
            {c.climb.lead}
          </motion.h1>
        </Container>
      </section>

      {/* the titles */}
      <section className="pb-24 md:pb-32">
        <Container className="max-w-5xl">
          <motion.p {...rise(0)} className="text-center text-[11px] uppercase tracking-[0.4em] text-gold-600">
            {c.climb.titlesEyebrow}
          </motion.p>
          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {titles.map((title, i) => (
              <motion.li
                key={title}
                {...rise(i * 0.07)}
                className="group relative overflow-hidden rounded-[22px] border border-gold-400/30 bg-paper/60 px-7 py-7 backdrop-blur-sm transition-colors duration-500 hover:border-gold-400/70"
              >
                <span className="font-heading text-sm tracking-[0.3em] text-gold-600/80">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-3 font-heading text-2xl leading-snug text-bone">{title}</p>
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-7 h-px w-10 bg-gold-400/60 transition-all duration-700 group-hover:w-[calc(100%-3.5rem)]"
                />
              </motion.li>
            ))}
          </ol>
        </Container>
      </section>

      {/* what the wall gave her */}
      <section className="pb-28 md:pb-36">
        <Container className="max-w-6xl">
          <div className="grid items-center gap-14 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
            <motion.div {...rise(0)} className="relative mx-auto w-full max-w-xs">
              <div className="relative aspect-[3/4] overflow-hidden rounded-t-[999px] rounded-b-[28px] shadow-[0_40px_80px_-40px_rgba(43,36,49,0.55)]">
                <Image
                  src="/images/about-castle-2.jpg"
                  alt={t.about.alt.garden}
                  fill
                  sizes="320px"
                  className="object-cover object-[50%_80%]"
                />
              </div>
              <div aria-hidden="true" className="pointer-events-none absolute -inset-3 rounded-t-[999px] rounded-b-[34px] border border-gold-400/50" />
            </motion.div>
            <div>
              <motion.p {...rise(0)} className="text-[11px] uppercase tracking-[0.4em] text-gold-600">
                {c.climb.shapedEyebrow}
              </motion.p>
              <motion.p {...rise(0.1)} className="mt-6 font-heading text-2xl italic leading-snug text-bone md:text-3xl">
                {t.about.shaped}
              </motion.p>
              <motion.p {...rise(0.2)} className="mt-10 border-t border-gold-400/30 pt-8 text-bone/70">
                {c.climb.soon}
              </motion.p>
              <motion.div {...rise(0.3)}>
                <Link
                  href="/"
                  className="group mt-8 inline-flex items-center gap-3 border-b border-bone/30 pb-1 text-xs uppercase tracking-[0.3em] text-bone transition-colors hover:border-gold-600 hover:text-gold-600"
                >
                  <ArrowLeft size={14} className="transition-transform duration-300 group-hover:-translate-x-1" />
                  {c.worldsTitle}
                </Link>
              </motion.div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
