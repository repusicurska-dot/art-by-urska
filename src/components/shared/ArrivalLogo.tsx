"use client";

import { createContext, useContext, useId } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageProvider";
import { placeFor, WORLD_LOGO, WORLD_NAME, type Place } from "@/lib/worlds";

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
 *   home          Urška's own page: a line of light opens like dawn over the monogram, and
 *                 five small diamonds settle on the ring — one for each of her worlds
 *   climb         a ridge is drawn, the logo rises up out of it from the bottom, and a dotted
 *                 route climbs to a flag on the top of the ring
 *   finance       the ring is milled like the edge of a coin, the name is uncovered along a
 *                 rising line, and a chart climbs beneath it to an arrow
 *
 * Every world draws its own logo (public/images/logo-<world>.webp — the name in the ring,
 * "by Urška" beneath it); Urška's home draws the UR monogram and writes "Urška" in place of its
 * "Art by Urška". All of them end the same way — a slow gold shimmer
 * across the finished logo.
 *
 * The logo is one image (public/images/logo-ur.webp, background removed); the drawing is done
 * with feathered SVG masks over it, measured to its parts: ring r 426–448 around (450, 449),
 * monogram y 178–672, wordmark y 691–723.
 */

export type ArrivalVariant = Place;

export function arrivalVariantFor(pathname: string): ArrivalVariant {
  return placeFor(pathname);
}

/** Seconds from the start until the drawing — shimmer included — is complete. */
export const ARRIVAL_DRAW_SECONDS = 3.2;

/** The logo image the current world is drawing. */
const LogoSrc = createContext(WORLD_LOGO.art);
const GOLD = "#b8892f";
const CX = 450;
const CY = 449;
const EASE = [0.45, 0, 0.25, 1] as const;

type At = (delay: number, duration: number) => object;

/** Rounded, so the server and the browser print the same coordinates and hydration matches. */
const r2 = (v: number) => Math.round(v * 100) / 100;

export default function ArrivalLogo({
  variant = "art",
  reduceMotion = false,
}: {
  variant?: ArrivalVariant;
  reduceMotion?: boolean;
}) {
  const id = useId().replace(/:/g, "");
  const src = WORLD_LOGO[variant];
  const { t } = useLanguage();
  const at: At = (delay, duration) => (reduceMotion ? { duration: 0 } : { delay, duration, ease: EASE });

  return (
    <div className="flex flex-col items-center">
      <motion.svg
        viewBox="-160 -160 1220 1218"
        className="h-72 w-72 md:h-96 md:w-96 overflow-visible"
        role="img"
        aria-label={WORLD_NAME[variant]}
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
            <rect x="0" y="150" width="900" height="590" />
          </clipPath>
          <clipPath id={`wordClip-${id}`}>
            <rect x="0" y="682" width="900" height="52" />
          </clipPath>
          {/* the whole logo except its own "Art by Urška", for the worlds that write their own name */}
          <clipPath id={`noWord-${id}`}>
            <path clipRule="evenodd" d="M-400 -400 H1300 V1300 H-400 Z M125 680 H775 V738 H125 Z" />
          </clipPath>
          <linearGradient id={`goldText-${id}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#e6c67e" />
            <stop offset="55%" stopColor="#b8892f" />
            <stop offset="100%" stopColor="#8a6122" />
          </linearGradient>
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
            <image href={src} x="0" y="0" width="900" height="898" />
          </mask>
        </defs>

        <LogoSrc.Provider value={src}>
          {variant === "art" && <ArtLogo id={id} at={at} />}
          {variant === "poetry" && <PoetryLogo id={id} at={at} />}
          {variant === "spirituality" && <SpiritLogo id={id} at={at} />}
          {variant === "climb" && <ClimbLogo id={id} at={at} />}
          {variant === "finance" && <FinanceLogo id={id} at={at} />}
          {variant === "home" && (
            <>
              <g clipPath={`url(#noWord-${id})`}>
                <HomeLogo id={id} at={at} />
              </g>
              <WordName id={id} at={at} label={WORLD_NAME.home} delay={1.75} duration={0.9} />
            </>
          )}
        </LogoSrc.Provider>

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

/** "Urška" in place of the UR logo's "Art by Urška": the same spaced gold capitals between two rules. */
function WordName({ id, at, label, delay, duration }: { id: string; at: At; label: string; delay: number; duration: number }) {
  const text = label.toUpperCase();
  const n = text.length;
  const fs = Math.min(45, 600 / (n * 0.99));
  const width = n * fs * 0.99;
  const rule = width < 470;
  const left = CX - width / 2;
  return (
    <>
      <defs>
        <mask id={`nameWipe-${id}`} maskUnits="userSpaceOnUse">
          <motion.rect
            x={100}
            y={660}
            height={100}
            fill="white"
            filter={`url(#feather-${id})`}
            initial={{ width: 0 }}
            animate={{ width: 700 }}
            transition={at(delay, duration)}
          />
        </mask>
      </defs>
      <g mask={`url(#nameWipe-${id})`} fill={`url(#goldText-${id})`}>
        <text
          x={CX}
          y={723}
          textAnchor="middle"
          fontSize={fs}
          textLength={width}
          lengthAdjust="spacing"
          style={{ fontFamily: "var(--font-inter), sans-serif", fontWeight: 500 }}
        >
          {text}
        </text>
        {rule && (
          <>
            <rect x={left - 90} y={705} width={62} height={3.5} rx={1.75} />
            <rect x={CX + width / 2 + 28} y={705} width={62} height={3.5} rx={1.75} />
          </>
        )}
      </g>
    </>
  );
}

/** The logo image seen through one mask. */
function Part({ mask }: { mask: string }) {
  const src = useContext(LogoSrc);
  return <image href={src} x="0" y="0" width="900" height="898" mask={`url(#${mask})`} />;
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
        <clipPath id={`poTop-${id}`}>
          <rect x="100" y="215" width="700" height="247" />
        </clipPath>
        <clipPath id={`poBottom-${id}`}>
          <rect x="110" y="462" width="680" height="260" />
        </clipPath>
        {/* "Poetry", written first */}
        <mask id={`poWord-${id}`} maskUnits="userSpaceOnUse">
          <g clipPath={`url(#poTop-${id})`}>
            <motion.rect
              x={40}
              y={200}
              height={280}
              fill="white"
              filter={`url(#feather-${id})`}
              initial={{ width: 0 }}
              animate={{ width: 860 }}
              transition={at(0.15, 1.2)}
            />
          </g>
        </mask>
        {/* "by Urška" flowing in beneath it like ink across a page */}
        <mask id={`poMono-${id}`} maskUnits="userSpaceOnUse">
          <g clipPath={`url(#poBottom-${id})`}>
            <motion.rect
              x={60}
              y={440}
              height={300}
              fill="white"
              filter={`url(#feather-${id})`}
              initial={{ width: 0 }}
              animate={{ width: 820 }}
              transition={at(0.95, 1.0)}
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
      x1: r2(CX + Math.cos(a) * 480),
      y1: r2(CY + Math.sin(a) * 480),
      x2: r2(CX + Math.cos(a) * (long ? 610 : 550)),
      y2: r2(CY + Math.sin(a) * (long ? 610 : 550)),
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

/* --------------------------------- Home --------------------------------- */

/** The five worlds, as five diamonds around the ring: art, poetry, spirituality, climb, finance. */
const FIVE = [-90, -18, 54, 126, 198].map((deg) => {
  const a = (deg * Math.PI) / 180;
  return { x: r2(CX + Math.cos(a) * 437), y: r2(CY + Math.sin(a) * 437) };
});

function HomeLogo({ id, at }: { id: string; at: At }) {
  return (
    <>
      <defs>
        {/* dawn: a line of light opening upwards and downwards */}
        <mask id={`homeDawn-${id}`} maskUnits="userSpaceOnUse">
          <motion.rect
            x={-100}
            width={1100}
            fill="white"
            filter={`url(#feather-${id})`}
            initial={{ y: CY, height: 0 }}
            animate={{ y: -80, height: 1060 }}
            transition={at(0.55, 1.35)}
          />
        </mask>
        <linearGradient id={`dawnLine-${id}`} x1="0" x2="1">
          <stop offset="0%" stopColor={GOLD} stopOpacity="0" />
          <stop offset="50%" stopColor="#f3d58e" stopOpacity="1" />
          <stop offset="100%" stopColor={GOLD} stopOpacity="0" />
        </linearGradient>
      </defs>

      <motion.ellipse
        cx={CX}
        cy={CY}
        rx={520}
        ry={260}
        fill={`url(#halo-${id})`}
        initial={{ opacity: 0, scaleY: 0.1 }}
        animate={{ opacity: [0, 0.9, 0.35], scaleY: 1 }}
        style={{ transformOrigin: `${CX}px ${CY}px` }}
        transition={at(0.4, 1.8)}
      />

      <Part mask={`homeDawn-${id}`} />

      {/* the line of light itself, drawn out from the centre and then fading into the logo */}
      <motion.rect
        y={CY - 2.5}
        height={5}
        rx={2.5}
        fill={`url(#dawnLine-${id})`}
        initial={{ x: CX, width: 0, opacity: 1 }}
        animate={{ x: -60, width: 1020, opacity: [1, 1, 0] }}
        transition={{ x: at(0, 0.7), width: at(0, 0.7), opacity: { ...at(0, 1.6), times: [0, 0.55, 1] } }}
      />

      {FIVE.map((p, i) => (
        <g key={i}>
          <motion.circle
            cx={p.x}
            cy={p.y}
            r={60}
            fill={`url(#spark-${id})`}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.9, 0.35] }}
            transition={at(1.75 + i * 0.12, 0.8)}
          />
          <motion.path
            d={`M ${p.x} ${p.y - 30} L ${p.x + 19} ${p.y} L ${p.x} ${p.y + 30} L ${p.x - 19} ${p.y} Z`}
            fill="#fff6dc"
            stroke={GOLD}
            strokeWidth={3}
            style={{ transformOrigin: `${p.x}px ${p.y}px` }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.3, 1], opacity: 1 }}
            transition={at(1.8 + i * 0.12, 0.5)}
          />
        </g>
      ))}
    </>
  );
}

/* --------------------------------- Climb -------------------------------- */

function ClimbLogo({ id, at }: { id: string; at: At }) {
  const ridge = "M -150 1010 L 40 880 L 150 945 L 300 790 L 420 900 L 560 760 L 700 890 L 820 820 L 1050 1010";
  const route = "M 250 1010 C 300 960, 250 900, 330 860 C 400 825, 360 740, 250 700 C 150 660, 60 560, 40 440 C 25 300, 110 170, 250 80 C 330 35, 400 14, 450 11";
  return (
    <>
      <defs>
        {/* the logo rising up out of the ridge, bottom to top */}
        <mask id={`climbRise-${id}`} maskUnits="userSpaceOnUse">
          <motion.rect
            x={-100}
            width={1100}
            height={1300}
            fill="white"
            filter={`url(#feather-${id})`}
            initial={{ y: 1000 }}
            animate={{ y: -150 }}
            transition={at(0.45, 1.6)}
          />
        </mask>
        <mask id={`climbRoute-${id}`} maskUnits="userSpaceOnUse">
          <motion.rect
            x={-300}
            width={1500}
            height={1400}
            fill="white"
            initial={{ y: 1060 }}
            animate={{ y: -150 }}
            transition={at(0.9, 1.35)}
          />
        </mask>
        <linearGradient id={`ridgeFade-${id}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#e9d3a2" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#e9d3a2" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* the mountains, first as a shadow and then as one line */}
      <motion.path
        d={`${ridge} L 1050 1100 L -150 1100 Z`}
        fill={`url(#ridgeFade-${id})`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={at(0.5, 1)}
      />
      <motion.path
        d={ridge}
        fill="none"
        stroke={GOLD}
        strokeWidth={5}
        strokeLinejoin="round"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={at(0, 0.95)}
      />

      <Part mask={`climbRise-${id}`} />

      {/* the route, climbed hold by hold to the top of the ring */}
      <motion.path
        d={route}
        fill="none"
        stroke={GOLD}
        strokeWidth={6}
        strokeLinecap="round"
        strokeDasharray="0.1 22"
        opacity={0.85}
        mask={`url(#climbRoute-${id})`}
      />

      {/* and a flag on the summit */}
      <motion.g
        style={{ transformOrigin: "450px 11px" }}
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        transition={at(2.2, 0.45)}
      >
        <line x1={450} y1={11} x2={450} y2={-95} stroke={GOLD} strokeWidth={5} strokeLinecap="round" />
        <motion.path
          d="M 452 -95 L 530 -72 L 452 -48 Z"
          fill={GOLD}
          style={{ transformOrigin: "452px -72px" }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: [0, 1.1, 1] }}
          transition={at(2.5, 0.5)}
        />
      </motion.g>
    </>
  );
}

/* -------------------------------- Finance ------------------------------- */

function FinanceLogo({ id, at }: { id: string; at: At }) {
  // the milled edge of a coin, one tick at a time around the ring
  const ticks = Array.from({ length: 72 }, (_, i) => {
    const a = (i / 72) * Math.PI * 2 - Math.PI / 2;
    return {
      x1: r2(CX + Math.cos(a) * 466),
      y1: r2(CY + Math.sin(a) * 466),
      x2: r2(CX + Math.cos(a) * (i % 6 === 0 ? 500 : 484)),
      y2: r2(CY + Math.sin(a) * (i % 6 === 0 ? 500 : 484)),
      i,
    };
  });
  const chart = "M 80 1010 L 220 975 L 320 990 L 450 935 L 560 955 L 700 890 L 840 850";
  return (
    <>
      <defs>
        {/* the name, uncovered along a rising line from the lower left */}
        <mask id={`finText-${id}`} maskUnits="userSpaceOnUse">
          <g clipPath={`url(#finInner-${id})`}>
            <motion.rect
              x={-200}
              y={-300}
              height={1500}
              fill="white"
              filter={`url(#feather-${id})`}
              transform={`rotate(-18 ${CX} ${CY})`}
              initial={{ width: 0 }}
              animate={{ width: 1300 }}
              transition={at(0.45, 1.4)}
            />
          </g>
        </mask>
        <clipPath id={`finInner-${id}`}>
          <circle cx={CX} cy={CY} r={420} />
        </clipPath>
        {/* the ring, struck from the lower left all the way round */}
        <mask id={`finRing-${id}`} maskUnits="userSpaceOnUse">
          <motion.circle
            cx={CX}
            cy={CY}
            r={437}
            fill="none"
            stroke="white"
            strokeWidth={50}
            transform={`rotate(135 ${CX} ${CY})`}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={at(0.2, 1.3)}
          />
        </mask>
      </defs>

      {ticks.map((t) => (
        <motion.line
          key={t.i}
          x1={t.x1}
          y1={t.y1}
          x2={t.x2}
          y2={t.y2}
          stroke={GOLD}
          strokeWidth={t.i % 6 === 0 ? 5 : 3}
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={{ opacity: t.i % 6 === 0 ? 0.85 : 0.45 }}
          transition={at(0.1 + (t.i / 72) * 1.1, 0.2)}
        />
      ))}

      <Part mask={`finRing-${id}`} />
      <Part mask={`finText-${id}`} />

      {/* a chart climbing beneath it, ending in an arrow */}
      <g fill="none" stroke={GOLD} strokeLinecap="round" strokeLinejoin="round">
        <motion.path
          d={chart}
          strokeWidth={6}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={at(1.5, 0.8)}
        />
        <motion.path
          d="M 790 845 L 845 848 L 830 900"
          strokeWidth={6}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={at(2.25, 0.25)}
        />
      </g>
      {[
        [220, 975],
        [450, 935],
        [700, 890],
      ].map(([x, y], i) => (
        <motion.circle
          key={i}
          cx={x}
          cy={y}
          r={9}
          fill={GOLD}
          style={{ transformOrigin: `${x}px ${y}px` }}
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.4, 1] }}
          transition={at(1.6 + i * 0.22, 0.4)}
        />
      ))}
    </>
  );
}
