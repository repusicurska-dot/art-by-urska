"use client";

import { useId } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageProvider";

/**
 * The gold "UR — Art by Urška" logo, drawn in on every arrival (Teo, 2026-09-21): first the
 * ring traces itself, then the monogram is painted in with a brush, then the wordmark — and
 * then the logo turns into the world you've arrived in:
 *
 *   art          watercolour blooms around the ring and a brushstroke sweeping past it
 *   poetry       an ink line writes itself under the logo, with Urška's line about poetry
 *   spirituality rays and stars open around it, on a soft halo
 *
 * The logo is one image (public/images/logo-ur.webp, background removed); the drawing is done
 * with SVG masks over it, measured to its parts: ring r 426–448 around (450, 449), monogram
 * y 178–672, wordmark y 691–723.
 */

export type ArrivalVariant = "art" | "poetry" | "spirituality";

/** Which world a path belongs to. Everything that isn't poetry or spirituality is art. */
export function arrivalVariantFor(pathname: string): ArrivalVariant {
  if (pathname.startsWith("/poetry")) return "poetry";
  if (pathname.startsWith("/spirituality") || pathname.startsWith("/zvezdni-koledar")) return "spirituality";
  return "art";
}

/** Seconds from the start until the drawing — flourish included — is complete. */
export const ARRIVAL_DRAW_SECONDS = 2.1;

const GOLD = "#b8892f";
const CX = 450;
const CY = 449;

export default function ArrivalLogo({
  variant = "art",
  reduceMotion = false,
}: {
  variant?: ArrivalVariant;
  reduceMotion?: boolean;
}) {
  const id = useId().replace(/:/g, "");
  const { t } = useLanguage();
  // With reduced motion everything is simply there.
  const at = (delay: number, duration: number) =>
    reduceMotion ? { duration: 0 } : { delay, duration, ease: [0.45, 0, 0.25, 1] as const };

  return (
    <div className="flex flex-col items-center">
      <svg
        viewBox="-160 -160 1220 1218"
        className="h-72 w-72 md:h-96 md:w-96 overflow-visible"
        role="img"
        aria-label="Art by Urška"
      >
        <defs>
          <mask id={`ring-${id}`} maskUnits="userSpaceOnUse">
            <motion.circle
              cx={CX}
              cy={CY}
              r={437}
              fill="none"
              stroke="white"
              strokeWidth={44}
              transform={`rotate(-90 ${CX} ${CY})`}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={at(0, 0.8)}
            />
          </mask>
          <mask id={`mono-${id}`} maskUnits="userSpaceOnUse">
            <motion.path
              d="M160 245 H620 L160 425 H775 L160 600 H775"
              fill="none"
              stroke="white"
              strokeWidth={200}
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={at(0.5, 0.85)}
            />
          </mask>
          <mask id={`word-${id}`} maskUnits="userSpaceOnUse">
            <motion.rect
              x={140}
              y={684}
              height={48}
              fill="white"
              initial={{ width: 0 }}
              animate={{ width: 640 }}
              transition={at(1.2, 0.45)}
            />
          </mask>
          <radialGradient id={`halo-${id}`}>
            <stop offset="0%" stopColor="#fff6d8" stopOpacity="0.9" />
            <stop offset="55%" stopColor="#f4dfa6" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#f4dfa6" stopOpacity="0" />
          </radialGradient>
          <filter id={`soft-${id}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="22" />
          </filter>
        </defs>

        {/* The world behind the logo, drawn first so the logo sits on top of it. */}
        {variant === "art" && <ArtBehind id={id} at={at} />}
        {variant === "spirituality" && <SpiritBehind id={id} at={at} />}

        <image href="/images/logo-ur.webp" x="0" y="0" width="900" height="898" mask={`url(#ring-${id})`} />
        <image href="/images/logo-ur.webp" x="0" y="0" width="900" height="898" mask={`url(#mono-${id})`} />
        <image href="/images/logo-ur.webp" x="0" y="0" width="900" height="898" mask={`url(#word-${id})`} />

        {variant === "art" && <ArtFront at={at} />}
        {variant === "poetry" && <PoetryFront at={at} />}
        {variant === "spirituality" && <SpiritFront at={at} />}
      </svg>

      {variant === "poetry" && (
        <motion.p
          className="-mt-4 max-w-md px-6 text-center font-heading italic text-lg leading-relaxed text-bone/85 md:text-xl"
          initial={reduceMotion ? false : { opacity: 0, clipPath: "inset(0 100% 0 0)" }}
          animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
          transition={at(1.4, 0.9)}
        >
          “{t.poetry.lead}”
        </motion.p>
      )}
    </div>
  );
}

type At = (delay: number, duration: number) => object;

/* --------------------------------- Art ---------------------------------- */

/** Watercolour pigment blooming out from behind the ring. */
function ArtBehind({ id, at }: { id: string; at: At }) {
  const blooms = [
    { x: 130, y: 170, r: 190, c: "#e8b4b8" },
    { x: 790, y: 230, r: 170, c: "#c9b6e4" },
    { x: 820, y: 720, r: 200, c: "#f0c987" },
    { x: 120, y: 760, r: 170, c: "#b9d3e8" },
    { x: 470, y: 900, r: 150, c: "#f2b8a2" },
  ];
  return (
    <g filter={`url(#soft-${id})`}>
      {blooms.map((b, i) => (
        <motion.circle
          key={i}
          cx={b.x}
          cy={b.y}
          r={b.r}
          fill={b.c}
          style={{ transformOrigin: `${b.x}px ${b.y}px` }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.55 }}
          transition={at(1.3 + i * 0.08, 0.8)}
        />
      ))}
    </g>
  );
}

/** A loose brushstroke sweeping around the ring, with a few flicks of paint. */
function ArtFront({ at }: { at: At }) {
  return (
    <g fill="none" stroke={GOLD} strokeLinecap="round">
      <motion.path
        d="M -40 620 C 40 900, 420 1010, 700 930 C 860 885, 960 760, 990 610"
        strokeWidth={14}
        opacity={0.75}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={at(1.35, 0.7)}
      />
      {[
        [1010, 560, 8],
        [1040, 610, 5],
        [-70, 580, 6],
        [-40, 540, 4],
      ].map(([x, y, r], i) => (
        <motion.circle
          key={i}
          cx={x}
          cy={y}
          r={r}
          fill={GOLD}
          stroke="none"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          style={{ transformOrigin: `${x}px ${y}px` }}
          transition={at(1.9 + i * 0.05, 0.2)}
        />
      ))}
    </g>
  );
}

/* -------------------------------- Poetry -------------------------------- */

/** An ink line writing itself beneath the logo, ending in a small loop like a signature. */
function PoetryFront({ at }: { at: At }) {
  return (
    <g fill="none" stroke={GOLD} strokeLinecap="round" strokeLinejoin="round">
      <motion.path
        d="M 90 960 C 220 925, 330 990, 450 955 C 560 925, 640 985, 740 950 C 790 932, 815 905, 790 890 C 765 876, 750 910, 790 925 C 820 936, 850 930, 880 918"
        strokeWidth={5}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={at(1.3, 0.9)}
      />
      {/* a quill's first dip of ink */}
      <motion.circle
        cx={90}
        cy={960}
        r={7}
        fill={GOLD}
        stroke="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={at(1.25, 0.2)}
      />
    </g>
  );
}

/* ----------------------------- Spirituality ----------------------------- */

/** A soft halo behind the logo. */
function SpiritBehind({ id, at }: { id: string; at: At }) {
  return (
    <motion.circle
      cx={CX}
      cy={CY}
      r={640}
      fill={`url(#halo-${id})`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={at(1.2, 0.9)}
    />
  );
}

/** Rays opening out from the ring, and stars kindling between them. */
function SpiritFront({ at }: { at: At }) {
  const rays = Array.from({ length: 16 }, (_, i) => {
    const a = (i / 16) * Math.PI * 2 - Math.PI / 2;
    const long = i % 2 === 0;
    const r1 = 480;
    const r2 = long ? 600 : 545;
    return {
      x1: CX + Math.cos(a) * r1,
      y1: CY + Math.sin(a) * r1,
      x2: CX + Math.cos(a) * r2,
      y2: CY + Math.sin(a) * r2,
      long,
    };
  });
  const stars = [
    [120, 60, 16],
    [800, 90, 12],
    [1010, 420, 10],
    [-70, 360, 12],
    [140, 900, 10],
    [830, 880, 14],
    [460, -90, 11],
  ];
  return (
    <g>
      {rays.map((r, i) => (
        <motion.line
          key={i}
          x1={r.x1}
          y1={r.y1}
          x2={r.x2}
          y2={r.y2}
          stroke={GOLD}
          strokeWidth={r.long ? 5 : 3}
          strokeLinecap="round"
          opacity={r.long ? 0.8 : 0.5}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={at(1.3 + (i % 8) * 0.04, 0.45)}
        />
      ))}
      {stars.map(([x, y, s], i) => (
        <motion.path
          key={i}
          d={`M ${x} ${y - s} L ${x + s * 0.28} ${y - s * 0.28} L ${x + s} ${y} L ${x + s * 0.28} ${y + s * 0.28} L ${x} ${y + s} L ${x - s * 0.28} ${y + s * 0.28} L ${x - s} ${y} L ${x - s * 0.28} ${y - s * 0.28} Z`}
          fill={GOLD}
          style={{ transformOrigin: `${x}px ${y}px` }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.3, 1], opacity: 1 }}
          transition={at(1.6 + i * 0.07, 0.5)}
        />
      ))}
    </g>
  );
}
