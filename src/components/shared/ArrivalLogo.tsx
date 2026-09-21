"use client";

import { useId } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageProvider";

/**
 * The gold "UR — Art by Urška" logo, drawn in on every arrival — and each world begins it in
 * its own way (Teo, 2026-09-21: "vsi se začnejo na isti princip … še bolj premium"):
 *
 *   art           a drop of pigment in the centre spreads like watercolour and uncovers the
 *                 monogram; the ring is laid down in one brushstroke; paint blooms around it
 *   poetry        the wordmark is written first, the monogram flows in like ink across the
 *                 page, a quill traces the ring and it fills with gold; an ink line signs it
 *   spirituality  a single point of light in the dark grows until the whole logo appears in
 *                 it; a halo opens, rays reach out and stars kindle
 *
 * All three end the same way — a slow gold shimmer across the finished logo.
 *
 * The logo is one image (public/images/logo-ur.webp, background removed); the drawing is done
 * with feathered SVG masks over it, measured to its parts: ring r 426–448 around (450, 449),
 * monogram y 178–672, wordmark y 691–723.
 */

export type ArrivalVariant = "art" | "poetry" | "spirituality";

/** Which world a path belongs to. Everything that isn't poetry or spirituality is art. */
export function arrivalVariantFor(pathname: string): ArrivalVariant {
  if (pathname.startsWith("/poetry")) return "poetry";
  if (pathname.startsWith("/spirituality") || pathname.startsWith("/zvezdni-koledar")) return "spirituality";
  return "art";
}

/** Seconds from the start until the drawing — shimmer included — is complete. */
export const ARRIVAL_DRAW_SECONDS = 3.2;

const LOGO = "/images/logo-ur.webp";
const GOLD = "#b8892f";
const CX = 450;
const CY = 449;
const EASE = [0.45, 0, 0.25, 1] as const;

type At = (delay: number, duration: number) => object;

export default function ArrivalLogo({
  variant = "art",
  reduceMotion = false,
}: {
  variant?: ArrivalVariant;
  reduceMotion?: boolean;
}) {
  const id = useId().replace(/:/g, "");
  const { t } = useLanguage();
  const at: At = (delay, duration) => (reduceMotion ? { duration: 0 } : { delay, duration, ease: EASE });

  return (
    <div className="flex flex-col items-center">
      <motion.svg
        viewBox="-160 -160 1220 1218"
        className="h-72 w-72 md:h-96 md:w-96 overflow-visible"
        role="img"
        aria-label="Art by Urška"
        initial={reduceMotion ? false : { scale: 0.97 }}
        animate={{ scale: 1 }}
        transition={at(0, ARRIVAL_DRAW_SECONDS)}
      >
        <defs>
          <filter id={`feather-${id}`} x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="28" />
          </filter>
          <filter id={`soft-${id}`} x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="22" />
          </filter>
          <clipPath id={`monoClip-${id}`}>
            <rect x="0" y="150" width="900" height="530" />
          </clipPath>
          <clipPath id={`wordClip-${id}`}>
            <rect x="0" y="682" width="900" height="52" />
          </clipPath>
          <radialGradient id={`halo-${id}`}>
            <stop offset="0%" stopColor="#fff6d8" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#f4dfa6" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#f4dfa6" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`spark-${id}`}>
            <stop offset="0%" stopColor="#fffdf5" stopOpacity="1" />
            <stop offset="25%" stopColor="#f6d98c" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#d9a94a" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#d9a94a" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`shine-${id}`} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#fff" stopOpacity="0" />
            <stop offset="50%" stopColor="#fff" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          {/* The logo's own shape, so the shimmer only touches the gold. */}
          <mask id={`shape-${id}`} maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }}>
            <image href={LOGO} x="0" y="0" width="900" height="898" />
          </mask>
        </defs>

        {variant === "art" && <ArtLogo id={id} at={at} />}
        {variant === "poetry" && <PoetryLogo id={id} at={at} />}
        {variant === "spirituality" && <SpiritLogo id={id} at={at} />}

        {/* The same ending for every world: a slow gold shimmer across the finished logo. */}
        <g mask={`url(#shape-${id})`}>
          <motion.rect
            y="-200"
            width="220"
            height="1300"
            fill={`url(#shine-${id})`}
            transform="rotate(18 450 449)"
            initial={{ x: -700 }}
            animate={{ x: 1200 }}
            transition={at(ARRIVAL_DRAW_SECONDS - 0.95, 0.95)}
          />
        </g>
      </motion.svg>

      {variant === "poetry" && (
        <motion.p
          className="-mt-4 max-w-md px-6 text-center font-heading italic text-lg leading-relaxed text-bone/85 md:text-xl"
          initial={reduceMotion ? false : { opacity: 0, clipPath: "inset(0 100% 0 0)" }}
          animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
          transition={at(2.2, 1)}
        >
          “{t.poetry.lead}”
        </motion.p>
      )}
    </div>
  );
}

/** The logo image seen through one mask. */
function Part({ mask }: { mask: string }) {
  return <image href={LOGO} x="0" y="0" width="900" height="898" mask={`url(#${mask})`} />;
}

/* --------------------------------- Art ---------------------------------- */

function ArtLogo({ id, at }: { id: string; at: At }) {
  const blooms = [
    { x: 130, y: 170, r: 190, c: "#e8b4b8" },
    { x: 790, y: 230, r: 170, c: "#c9b6e4" },
    { x: 820, y: 720, r: 200, c: "#f0c987" },
    { x: 120, y: 760, r: 170, c: "#b9d3e8" },
    { x: 470, y: 900, r: 150, c: "#f2b8a2" },
  ];
  return (
    <>
      <defs>
        {/* a drop of pigment spreading from the centre */}
        <mask id={`artMono-${id}`} maskUnits="userSpaceOnUse">
          <g clipPath={`url(#monoClip-${id})`}>
            <motion.circle
              cx={450}
              cy={420}
              fill="white"
              filter={`url(#feather-${id})`}
              initial={{ r: 0 }}
              animate={{ r: 430 }}
              transition={at(0.25, 1.3)}
            />
          </g>
        </mask>
        {/* the ring, laid down in one brushstroke from the lower left */}
        <mask id={`artRing-${id}`} maskUnits="userSpaceOnUse">
          <motion.circle
            cx={CX}
            cy={CY}
            r={437}
            fill="none"
            stroke="white"
            strokeWidth={48}
            transform={`rotate(135 ${CX} ${CY})`}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={at(1.1, 1.05)}
          />
        </mask>
        <mask id={`artWord-${id}`} maskUnits="userSpaceOnUse">
          <g clipPath={`url(#wordClip-${id})`}>
            <motion.rect
              x={80}
              y={660}
              height={100}
              fill="white"
              filter={`url(#feather-${id})`}
              initial={{ width: 0 }}
              animate={{ width: 780 }}
              transition={at(1.9, 0.6)}
            />
          </g>
        </mask>
      </defs>

      {/* pigment washing out behind the logo as the drop spreads */}
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
            animate={{ scale: 1, opacity: 0.5 }}
            transition={at(0.5 + i * 0.14, 1.4)}
          />
        ))}
      </g>

      <Part mask={`artMono-${id}`} />
      <Part mask={`artRing-${id}`} />
      <Part mask={`artWord-${id}`} />

      {/* a loose brushstroke sweeping past, and a few flicks of paint */}
      <g fill="none" stroke={GOLD} strokeLinecap="round">
        <motion.path
          d="M -40 620 C 40 900, 420 1010, 700 930 C 860 885, 960 760, 990 610"
          strokeWidth={14}
          opacity={0.7}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={at(1.7, 0.8)}
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
            style={{ transformOrigin: `${x}px ${y}px` }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={at(2.35 + i * 0.06, 0.25)}
          />
        ))}
      </g>
    </>
  );
}

/* -------------------------------- Poetry -------------------------------- */

function PoetryLogo({ id, at }: { id: string; at: At }) {
  return (
    <>
      <defs>
        {/* the wordmark, written first */}
        <mask id={`poWord-${id}`} maskUnits="userSpaceOnUse">
          <g clipPath={`url(#wordClip-${id})`}>
            <motion.rect
              x={100}
              y={660}
              height={100}
              fill="white"
              filter={`url(#feather-${id})`}
              initial={{ width: 0 }}
              animate={{ width: 760 }}
              transition={at(0.15, 0.95)}
            />
          </g>
        </mask>
        {/* the monogram flowing in like ink across a page */}
        <mask id={`poMono-${id}`} maskUnits="userSpaceOnUse">
          <g clipPath={`url(#monoClip-${id})`}>
            <motion.rect
              x={60}
              y={120}
              height={600}
              fill="white"
              filter={`url(#feather-${id})`}
              initial={{ width: 0 }}
              animate={{ width: 820 }}
              transition={at(0.8, 1.2)}
            />
          </g>
        </mask>
        {/* the ring filling with gold once the quill has traced it */}
        <mask id={`poRing-${id}`} maskUnits="userSpaceOnUse">
          <motion.circle
            cx={CX}
            cy={CY}
            r={437}
            fill="none"
            stroke="white"
            strokeWidth={48}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={at(2.25, 0.5)}
          />
        </mask>
      </defs>

      <Part mask={`poWord-${id}`} />
      <Part mask={`poMono-${id}`} />
      <Part mask={`poRing-${id}`} />

      {/* the quill tracing the ring, then fading into the gold */}
      <motion.circle
        cx={CX}
        cy={CY}
        r={437}
        fill="none"
        stroke={GOLD}
        strokeWidth={3}
        strokeLinecap="round"
        transform={`rotate(-90 ${CX} ${CY})`}
        initial={{ pathLength: 0, opacity: 1 }}
        animate={{ pathLength: 1, opacity: [1, 1, 0] }}
        transition={{
          pathLength: at(1.45, 0.9),
          opacity: { ...at(1.45, 1.3), times: [0, 0.7, 1] },
        }}
      />

      {/* an ink line signing it off, ending in a small loop */}
      <g fill="none" stroke={GOLD} strokeLinecap="round" strokeLinejoin="round">
        <motion.circle
          cx={90}
          cy={960}
          r={7}
          fill={GOLD}
          stroke="none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={at(2.1, 0.2)}
        />
        <motion.path
          d="M 90 960 C 220 925, 330 990, 450 955 C 560 925, 640 985, 740 950 C 790 932, 815 905, 790 890 C 765 876, 750 910, 790 925 C 820 936, 850 930, 880 918"
          strokeWidth={5}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={at(2.15, 0.9)}
        />
      </g>
    </>
  );
}

/* ----------------------------- Spirituality ----------------------------- */

function SpiritLogo({ id, at }: { id: string; at: At }) {
  const rays = Array.from({ length: 16 }, (_, i) => {
    const a = (i / 16) * Math.PI * 2 - Math.PI / 2;
    const long = i % 2 === 0;
    return {
      x1: CX + Math.cos(a) * 480,
      y1: CY + Math.sin(a) * 480,
      x2: CX + Math.cos(a) * (long ? 610 : 550),
      y2: CY + Math.sin(a) * (long ? 610 : 550),
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
    <>
      <defs>
        {/* everything appears inside the growing light */}
        <mask id={`spLight-${id}`} maskUnits="userSpaceOnUse">
          <motion.circle
            cx={CX}
            cy={CY}
            fill="white"
            filter={`url(#feather-${id})`}
            initial={{ r: 0 }}
            animate={{ r: 560 }}
            transition={at(0.55, 1.5)}
          />
        </mask>
      </defs>

      {/* the halo opening behind it */}
      <motion.circle
        cx={CX}
        cy={CY}
        r={660}
        fill={`url(#halo-${id})`}
        style={{ transformOrigin: `${CX}px ${CY}px` }}
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={at(0.5, 1.6)}
      />

      <Part mask={`spLight-${id}`} />

      {/* a single point of light, before anything else */}
      <motion.circle
        cx={CX}
        cy={CY}
        fill={`url(#spark-${id})`}
        initial={{ r: 0, opacity: 0 }}
        animate={{ r: [0, 90, 220], opacity: [0, 1, 0] }}
        transition={at(0, 1.6)}
      />

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
          transition={at(1.7 + (i % 8) * 0.05, 0.55)}
        />
      ))}
      {stars.map(([x, y, s], i) => (
        <motion.path
          key={i}
          d={`M ${x} ${y - s} L ${x + s * 0.28} ${y - s * 0.28} L ${x + s} ${y} L ${x + s * 0.28} ${y + s * 0.28} L ${x} ${y + s} L ${x - s * 0.28} ${y + s * 0.28} L ${x - s} ${y} L ${x - s * 0.28} ${y - s * 0.28} Z`}
          fill={GOLD}
          style={{ transformOrigin: `${x}px ${y}px` }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.35, 1], opacity: 1 }}
          transition={at(2.0 + i * 0.09, 0.55)}
        />
      ))}
    </>
  );
}
