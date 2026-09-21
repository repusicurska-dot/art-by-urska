"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Container from "@/components/shared/Container";
import WorldLogo from "@/components/shared/WorldLogo";
import { useLanguage } from "@/i18n/LanguageProvider";
import { HUB } from "@/content/hub";
import { FINANCE_URL } from "@/lib/worlds";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Finance by Urška — a page of its own like the other worlds, rather than a jump straight to
 * another site (Teo, 2026-09-21): where she learned the markets, and the way through to
 * My Edge Official.
 */
export default function FinanceContent() {
  const { locale } = useLanguage();
  const c = HUB[locale];
  const f = c.finance;
  const reduceMotion = useReducedMotion();
  const rise = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 1, delay, ease: EASE },
  });

  return (
    <div className="relative isolate overflow-x-clip">
      {/* a line rising quietly behind the page */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 400"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 top-[55vh] -z-10 h-[40vh] w-full text-gold-400"
      >
        <motion.path
          d="M0 360 L160 330 L300 345 L460 270 L600 290 L760 200 L900 225 L1060 140 L1220 160 L1440 60"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
          opacity="0.4"
          initial={reduceMotion ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.6, delay: 0.3, ease: EASE }}
        />
        <path
          d="M0 360 L160 330 L300 345 L460 270 L600 290 L760 200 L900 225 L1060 140 L1220 160 L1440 60 V400 H0 Z"
          fill="url(#financeFade)"
        />
        <defs>
          <linearGradient id="financeFade" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#e9d3a2" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#e9d3a2" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      <section className="pb-20 pt-24 text-center md:pb-28 md:pt-32">
        <Container className="max-w-3xl">
          <div className="mx-auto w-fit">
            <WorldLogo world="finance" className="h-44 w-44 md:h-52 md:w-52" delay={0.2} sizes="208px" />
          </div>
          <motion.h1
            className="mt-10 font-heading text-4xl leading-[1.05] text-bone md:text-6xl"
            initial={reduceMotion ? false : { opacity: 0, y: 24, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.3, delay: 0.5, ease: EASE }}
          >
            {f.lead}
          </motion.h1>
          <motion.p
            className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-bone/75"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.8, ease: EASE }}
          >
            {f.intro}
          </motion.p>
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.0, ease: EASE }}
          >
            <a href={FINANCE_URL} className="btn-primary mt-10 inline-flex items-center gap-2">
              {f.visit}
              <ArrowUpRight size={16} />
            </a>
          </motion.div>
        </Container>
      </section>

      {/* what she learned there */}
      <section className="pb-24 md:pb-32">
        <Container className="max-w-5xl">
          <motion.p {...rise(0)} className="text-center text-[11px] uppercase tracking-[0.4em] text-gold-600">
            {f.learnedEyebrow}
          </motion.p>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {f.topics.map(([title, line], i) => (
              <motion.li
                key={title}
                {...rise(i * 0.07)}
                className="group relative overflow-hidden rounded-[22px] border border-gold-400/30 bg-paper/60 px-7 py-7 backdrop-blur-sm transition-colors duration-500 hover:border-gold-400/70"
              >
                <span className="font-heading text-sm tracking-[0.3em] text-gold-600/80">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-3 font-heading text-2xl leading-snug text-bone">{title}</p>
                <p className="mt-2 text-sm leading-relaxed text-bone/70">{line}</p>
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-7 h-px w-10 bg-gold-400/60 transition-all duration-700 group-hover:w-[calc(100%-3.5rem)]"
                />
              </motion.li>
            ))}
          </ul>
        </Container>
      </section>

      {/* her words, and the way through */}
      <section className="pb-28 md:pb-36">
        <Container className="max-w-3xl text-center">
          <motion.div {...rise(0)}>
            <span aria-hidden="true" className="block font-heading text-8xl leading-none text-gold-400/60">
              “
            </span>
            <p className="-mt-6 font-heading text-3xl italic leading-snug text-bone md:text-4xl">{f.quote}</p>
            <p className="mt-6 text-xs uppercase tracking-[0.4em] text-gold-600">— Urška</p>
          </motion.div>
          <motion.div {...rise(0.15)} className="mt-14 flex flex-col items-center gap-8">
            <a href={FINANCE_URL} className="btn-primary inline-flex items-center gap-2">
              {f.visit}
              <ArrowUpRight size={16} />
            </a>
            <p className="max-w-lg text-xs leading-relaxed text-smoke">{f.note}</p>
            <Link
              href="/"
              className="group inline-flex items-center gap-3 border-b border-bone/30 pb-1 text-xs uppercase tracking-[0.3em] text-bone transition-colors hover:border-gold-600 hover:text-gold-600"
            >
              <ArrowLeft size={14} className="transition-transform duration-300 group-hover:-translate-x-1" />
              {c.worldsTitle}
            </Link>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
