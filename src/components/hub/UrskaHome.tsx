"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Container from "@/components/shared/Container";
import WorldEmblem from "@/components/shared/WorldEmblem";
import WorldLogo from "@/components/shared/WorldLogo";
import { useLanguage } from "@/i18n/LanguageProvider";
import { HUB } from "@/content/hub";
import { WORLDS, type World } from "@/lib/worlds";

/**
 * Urška's own home page. The site used to open straight into the gallery; now it opens on
 * her — who she is — and the five worlds of her life lead off it (Teo, 2026-09-21).
 */

const EASE = [0.22, 1, 0.36, 1] as const;
const NUMERALS = ["I", "II", "III", "IV", "V"];

/** Each world's own light, used for the glow behind its card. */
const ACCENT: Record<World, string> = {
  art: "#e3a693",
  poetry: "#b07a86",
  spirituality: "#8d9fd0",
  climb: "#8fae96",
  finance: "#d9b46f",
};

export default function UrskaHome() {
  const { locale, t } = useLanguage();
  const c = HUB[locale];
  return (
    <div className="relative isolate overflow-x-clip">
      <Hero roles={c.roles} lead={c.lead} scroll={c.scroll} worldsLabel={c.worldsEyebrow} storyLabel={c.readStory} />

      {/* ------------------------------ Five worlds ------------------------------ */}
      <section id="worlds" className="relative scroll-mt-24 py-24 md:py-36">
        <Container className="max-w-7xl">
          <SectionHead eyebrow={c.worldsEyebrow} title={c.worldsTitle} />
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
            {WORLDS.map((w, i) => (
              <WorldCard
                key={w.key}
                world={w.key}
                href={w.href}
                external={!!w.external}
                index={i}
                line={c.worlds[w.key].line}
                cta={c.worlds[w.key].cta}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* -------------------------------- Her story ------------------------------- */}
      <section className="relative py-24 md:py-36">
        <Container className="max-w-6xl">
          <div className="grid items-center gap-16 md:grid-cols-[0.9fr_1.1fr] md:gap-20">
            <Reveal className="relative mx-auto w-full max-w-sm">
              <div className="relative aspect-[3/4] overflow-hidden rounded-t-[999px] rounded-b-[28px] shadow-[0_40px_80px_-40px_rgba(43,36,49,0.55)]">
                <Image
                  src="/images/about-castle-5.jpg"
                  alt={t.about.alt.roses}
                  fill
                  sizes="(min-width: 768px) 380px, 80vw"
                  className="object-cover object-[88%_50%]"
                />
              </div>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-3 rounded-t-[999px] rounded-b-[34px] border border-gold-400/50"
              />
              <div className="absolute -bottom-10 -right-6 w-[46%] overflow-hidden rounded-2xl border-4 border-paper shadow-[0_30px_60px_-30px_rgba(43,36,49,0.6)] md:-right-12">
                <Image
                  src="/images/about-castle-1.jpg"
                  alt={t.about.alt.portrait}
                  width={940}
                  height={1410}
                  sizes="200px"
                  className="aspect-[4/5] h-auto w-full object-cover object-[20%_100%]"
                />
              </div>
            </Reveal>

            <div>
              <Reveal>
                <Eyebrow>{c.storyEyebrow}</Eyebrow>
                <h2 className="mt-5 font-heading text-4xl leading-[1.05] text-bone md:text-6xl">{c.storyTitle}</h2>
              </Reveal>
              {c.story.map((p, i) => (
                <Reveal key={i} delay={0.1 + i * 0.1}>
                  <p className="mt-6 text-lg leading-relaxed text-bone/75">{p}</p>
                </Reveal>
              ))}
              <Reveal delay={0.3}>
                <ul className="mt-10 grid gap-x-8 gap-y-4 border-t border-gold-400/30 pt-8 sm:grid-cols-2">
                  {c.milestones.map((m) => (
                    <li key={m} className="flex items-start gap-3 text-sm leading-snug text-bone/85">
                      <span aria-hidden="true" className="mt-1.5 h-2 w-2 shrink-0 rotate-45 bg-gold-400" />
                      {m}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/about"
                  className="group mt-10 inline-flex items-center gap-3 border-b border-bone/30 pb-1 text-xs uppercase tracking-[0.3em] text-bone transition-colors hover:border-gold-600 hover:text-gold-600"
                >
                  {c.readStory}
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* ---------------------------------- Her words ---------------------------------- */}
      <section className="relative py-24 md:py-32">
        <Container className="max-w-4xl text-center">
          <Reveal>
            <span aria-hidden="true" className="block font-heading text-8xl leading-none text-gold-400/60 md:text-9xl">
              “
            </span>
            <p className="-mt-8 font-heading text-3xl italic leading-snug text-bone md:text-5xl">{t.poetry.lead}</p>
            <p className="mt-8 text-xs uppercase tracking-[0.4em] text-gold-600">— Urška</p>
          </Reveal>
        </Container>
      </section>

      {/* ------------------------------- Where to begin ------------------------------- */}
      <section className="relative border-t border-gold-400/20 py-24 md:py-28">
        <Container className="max-w-5xl text-center">
          <Reveal>
            <h2 className="font-heading text-3xl text-bone md:text-5xl">{c.beginTitle}</h2>
          </Reveal>
          <div className="mt-14 grid grid-cols-2 gap-y-12 sm:grid-cols-3 md:grid-cols-5">
            {WORLDS.map((w, i) => (
              <Reveal key={w.key} delay={i * 0.08}>
                <WorldLink href={w.href} external={!!w.external} className="group flex flex-col items-center gap-4">
                  <span className="text-gold-600 transition-transform duration-500 group-hover:-translate-y-1">
                    <WorldLogo world={w.key} className="h-24 w-24 md:h-28 md:w-28" delay={i * 0.1} sizes="112px" />
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.3em] text-bone/80 transition-colors group-hover:text-gold-600">
                    {c.worlds[w.key].nav}
                  </span>
                </WorldLink>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}

/* ----------------------------------- Hero ----------------------------------- */

function Hero({
  roles,
  lead,
  scroll,
  worldsLabel,
  storyLabel,
}: {
  roles: string;
  lead: string;
  scroll: string;
  worldsLabel: string;
  storyLabel: string;
}) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const letters = Array.from("Urška");
  // The page waits behind the arrival logo; start just as it lifts.
  const start = 0.2;

  return (
    <section ref={ref} className="relative flex min-h-[100svh] items-center overflow-hidden pb-24 pt-10 md:pt-0">
      {/* soft light behind everything */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 55% at 72% 45%, rgba(233,196,128,0.28) 0%, rgba(233,196,128,0) 70%), radial-gradient(45% 50% at 12% 80%, rgba(205,184,236,0.22) 0%, rgba(205,184,236,0) 70%)",
        }}
      />
      {/* the monogram, very large and very quiet */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[12vw] top-1/2 -z-10 -translate-y-1/2 text-gold-400/[0.09]"
        initial={reduceMotion ? false : { rotate: -8, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 2.4, delay: start, ease: EASE }}
      >
        <WorldEmblem world="home" className="h-[80vmin] w-[80vmin]" draw={false} />
      </motion.div>

      <Container className="max-w-7xl">
        <div className="grid items-center gap-14 md:grid-cols-[1.1fr_0.9fr] md:gap-10">
          <motion.div style={reduceMotion ? undefined : { y: textY, opacity: fade }} className="order-2 md:order-1">
            <motion.div
              className="flex items-center gap-4"
              initial={reduceMotion ? false : { opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: start, ease: EASE }}
            >
              <span aria-hidden="true" className="h-px w-12 bg-gold-600/70" />
              <span className="text-[11px] uppercase tracking-[0.38em] text-gold-600">{roles}</span>
            </motion.div>

            <h1 className="mt-6 font-heading text-[5.5rem] font-medium leading-[0.85] tracking-tight text-bone sm:text-[8rem] lg:text-[11rem]" aria-label="Urška">
              {letters.map((ch, i) => (
                <motion.span
                  key={i}
                  aria-hidden="true"
                  className="inline-block"
                  initial={reduceMotion ? false : { opacity: 0, y: "0.35em", filter: "blur(12px)" }}
                  animate={{ opacity: 1, y: "0em", filter: "blur(0px)" }}
                  transition={{ duration: 1.2, delay: start + 0.15 + i * 0.09, ease: EASE }}
                >
                  {ch}
                </motion.span>
              ))}
            </h1>

            <motion.div
              aria-hidden="true"
              className="mt-8 h-px w-40 origin-left bg-gradient-to-r from-gold-600 to-transparent"
              initial={reduceMotion ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.4, delay: start + 0.7, ease: EASE }}
            />

            <motion.p
              className="mt-8 max-w-xl font-heading text-2xl italic leading-snug text-bone/85 md:text-3xl"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: start + 0.85, ease: EASE }}
            >
              {lead}
            </motion.p>

            <motion.div
              className="mt-10 flex flex-wrap items-center gap-6"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: start + 1.05, ease: EASE }}
            >
              <a href="#worlds" className="btn-primary">
                {worldsLabel}
              </a>
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-bone/80 transition-colors hover:text-gold-600"
              >
                {storyLabel}
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>

          {/* the portrait, in an arch with a gold hairline standing off it */}
          <motion.div
            className="relative order-1 mx-auto w-[min(78vw,26rem)] md:order-2"
            initial={reduceMotion ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.6, delay: start, ease: EASE }}
          >
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-4 rounded-t-[999px] rounded-b-[36px] border border-gold-400/60"
              initial={reduceMotion ? false : { opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.8, delay: start + 0.5, ease: EASE }}
            />
            <div className="relative aspect-[3/4] overflow-hidden rounded-t-[999px] rounded-b-[28px] shadow-[0_50px_100px_-45px_rgba(43,36,49,0.6)]">
              <motion.div className="absolute inset-0" style={reduceMotion ? undefined : { y: imageY }}>
                <motion.div
                  className="absolute -inset-y-[8%] inset-x-0"
                  initial={reduceMotion ? false : { scale: 1.15 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 2.6, delay: start, ease: EASE }}
                >
                  <Image
                    src="/images/about-castle-3.jpg"
                    alt="Urška"
                    fill
                    priority
                    sizes="(min-width: 768px) 420px, 78vw"
                    className="object-cover object-[50%_30%]"
                  />
                </motion.div>
              </motion.div>
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[rgba(43,36,49,0.25)] via-transparent to-transparent" />
            </div>
            {/* the UR seal on the frame */}
            <motion.div
              className="absolute -bottom-8 left-1/2 flex h-20 w-20 -translate-x-1/2 items-center justify-center rounded-full border border-gold-400/60 bg-paper text-gold-600 shadow-[0_18px_40px_-18px_rgba(43,36,49,0.5)]"
              initial={reduceMotion ? false : { opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: start + 1.1, ease: EASE }}
            >
              <WorldEmblem world="home" className="h-14 w-14" delay={start + 1.1} />
            </motion.div>
          </motion.div>
        </div>
      </Container>

      <motion.a
        href="#worlds"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-bone/60 md:flex"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: start + 1.6 }}
      >
        {scroll}
        <span className="relative h-12 w-px overflow-hidden bg-bone/15">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-gold-600"
            animate={reduceMotion ? undefined : { y: ["-100%", "200%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.a>
    </section>
  );
}

/* ---------------------------------- Pieces ---------------------------------- */

function WorldCard({
  world,
  href,
  external,
  index,
  line,
  cta,
}: {
  world: World;
  href: string;
  external: boolean;
  index: number;
  line: string;
  cta: string;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 1, delay: index * 0.1, ease: EASE }}
    >
      <WorldLink
        href={href}
        external={external}
        className="group relative flex h-full flex-col items-center overflow-hidden rounded-t-[999px] rounded-b-[28px] border border-gold-400/30 bg-paper/60 px-6 pb-9 pt-14 text-center backdrop-blur-sm transition-all duration-700 ease-out hover:-translate-y-2 hover:border-gold-400/80 hover:shadow-[0_40px_70px_-40px_rgba(43,36,49,0.55)]"
      >
        {/* the world's own light, rising on hover */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-3/4 opacity-40 transition-opacity duration-700 group-hover:opacity-100"
          style={{ background: `radial-gradient(90% 70% at 50% 100%, ${ACCENT[world]}55 0%, transparent 70%)` }}
        />
        {/* a gold sheen passing over the card */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -inset-y-10 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 transition-all duration-1000 ease-out group-hover:left-[130%] group-hover:opacity-100"
        />
        <span aria-hidden="true" className="pointer-events-none absolute inset-2 rounded-t-[999px] rounded-b-[22px] border border-gold-400/15" />

        <span className="relative font-heading text-sm tracking-[0.3em] text-gold-600/80">{NUMERALS[index]}</span>
        <span className="relative mt-5 transition-transform duration-700 ease-out group-hover:scale-105">
          <WorldLogo world={world} className="h-40 w-40" delay={0.2 + index * 0.12} />
        </span>
        <span aria-hidden="true" className="relative mt-6 h-px w-10 bg-gold-400/60 transition-all duration-700 group-hover:w-20" />
        <span className="relative mt-6 flex-1 text-sm leading-relaxed text-bone/75">{line}</span>
        <span className="relative mt-8 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-bone transition-colors group-hover:text-gold-600">
          {cta}
          {external ? (
            <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          ) : (
            <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
          )}
        </span>
      </WorldLink>
    </motion.div>
  );
}

/** Finance is on its own site; it opens there in the same tab, like every other world. */
function WorldLink({
  href,
  external,
  className,
  children,
}: {
  href: string;
  external: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  if (external) {
    return (
      <a href={href} className={className} rel="noopener">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

function SectionHead({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <Reveal className="text-center">
      <Eyebrow center>{eyebrow}</Eyebrow>
      <h2 className="mx-auto mt-5 max-w-3xl font-heading text-4xl leading-[1.05] text-bone md:text-6xl">{title}</h2>
    </Reveal>
  );
}

function Eyebrow({ children, center = false }: { children: React.ReactNode; center?: boolean }) {
  return (
    <span className={`flex items-center gap-4 text-[11px] uppercase tracking-[0.38em] text-gold-600 ${center ? "justify-center" : ""}`}>
      <span aria-hidden="true" className="h-px w-10 bg-gold-600/60" />
      {children}
      {center && <span aria-hidden="true" className="h-px w-10 bg-gold-600/60" />}
    </span>
  );
}

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
