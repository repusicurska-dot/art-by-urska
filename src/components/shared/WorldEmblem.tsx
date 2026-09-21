"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Place } from "@/lib/worlds";

/**
 * The sign of each of Urška's worlds, in the same family as the UR logo: a double hairline
 * ring with a small diamond at each side, and one line drawing inside it. The drawing draws
 * itself the first time it comes into view.
 *
 *   art           a painter's palette with its wells of colour and a brush
 *   poetry        a quill, and the line of ink it leaves
 *   spirituality  a crescent moon holding a star
 *   climb         a ridge of peaks, the route up it and a flag on the summit
 *   finance       a rising line over growing bars
 *   home          the UR monogram itself
 */

type Stroke = { d: string; fill?: boolean; dash?: boolean };

const DRAWINGS: Record<Place, Stroke[]> = {
  art: [
    {
      d: "M58 30 C38 30 26 44 26 60 C26 78 41 90 58 90 C65 90 67 85 65 80 C63 75 66 71 72 71 H79 C87 71 92 65 92 57 C92 42 77 30 58 30 Z",
    },
    { d: "M47 70 m-4.5 0 a4.5 4.5 0 1 0 9 0 a4.5 4.5 0 1 0 -9 0" },
    { d: "M42 52 m-3.2 0 a3.2 3.2 0 1 0 6.4 0 a3.2 3.2 0 1 0 -6.4 0", fill: true },
    { d: "M56 43 m-3.2 0 a3.2 3.2 0 1 0 6.4 0 a3.2 3.2 0 1 0 -6.4 0", fill: true },
    { d: "M71 47 m-3.2 0 a3.2 3.2 0 1 0 6.4 0 a3.2 3.2 0 1 0 -6.4 0", fill: true },
    { d: "M94 30 L72 62" },
    { d: "M72 62 C68 66 66 70 67 74 C71 73 75 70 76 66 Z" },
  ],
  poetry: [
    { d: "M88 24 C62 30 44 52 38 84 C58 78 78 58 88 24 Z" },
    { d: "M88 24 L34 94" },
    { d: "M60 50 L70 48 M52 62 L64 60 M46 72 L56 71" },
    { d: "M30 96 C42 90 52 98 64 94 C74 91 82 96 92 92" },
  ],
  spirituality: [
    { d: "M62 28 A30 30 0 1 0 90 74 A24 24 0 1 1 62 28 Z" },
    { d: "M74 40 L76.6 47.4 L84 50 L76.6 52.6 L74 60 L71.4 52.6 L64 50 L71.4 47.4 Z", fill: true },
    { d: "M88 32 L89 35 L92 36 L89 37 L88 40 L87 37 L84 36 L87 35 Z", fill: true },
  ],
  climb: [
    { d: "M22 88 L48 50 L60 66 L74 42 L98 88 Z" },
    { d: "M42 59 L48 50 L53 57 M68 52 L74 42 L80 52" },
    { d: "M74 42 V26 L86 30 L74 34" },
    { d: "M38 88 C46 80 52 82 56 74 C60 66 66 64 68 56 C70 50 72 46 74 42", dash: true },
  ],
  finance: [
    { d: "M26 90 H94" },
    { d: "M36 88 V74 M50 88 V66 M64 88 V58 M78 88 V48" },
    { d: "M30 70 L46 56 L58 62 L86 32" },
    { d: "M74 32 H86 V44" },
  ],
  home: [
    { d: "M32 40 V63 C32 74 38.5 82 47 82 C55.5 82 62 74 62 63 V41" },
    { d: "M62 40 V82" },
    { d: "M65 40 H74 A9.8 9.8 0 0 1 74 59.6 H65" },
    { d: "M72 59.6 L88 82" },
  ],
};

export default function WorldEmblem({
  world,
  className = "h-20 w-20",
  draw = true,
  delay = 0,
}: {
  world: Place;
  className?: string;
  /** Draw it in when it comes into view (off: shown finished). */
  draw?: boolean;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();
  const animate = draw && !reduceMotion;
  const paths = DRAWINGS[world];
  const view = { once: true, amount: 0.6 } as const;

  return (
    <svg viewBox="0 0 120 120" className={`shrink-0 overflow-visible ${className}`} aria-hidden="true">
      <g fill="none" stroke="currentColor">
        <motion.circle
          cx="60"
          cy="60"
          r="56"
          strokeWidth="1"
          opacity="0.75"
          transform="rotate(-90 60 60)"
          initial={animate ? { pathLength: 0 } : false}
          whileInView={{ pathLength: 1 }}
          viewport={view}
          transition={{ duration: 1.4, delay, ease: [0.45, 0, 0.25, 1] }}
        />
        <motion.circle
          cx="60"
          cy="60"
          r="51"
          strokeWidth="0.5"
          opacity="0.4"
          initial={animate ? { opacity: 0 } : false}
          whileInView={{ opacity: 0.4 }}
          viewport={view}
          transition={{ duration: 1, delay: delay + 0.6 }}
        />
        <motion.g
          fill="currentColor"
          stroke="none"
          initial={animate ? { opacity: 0 } : false}
          whileInView={{ opacity: 0.8 }}
          viewport={view}
          transition={{ duration: 0.6, delay: delay + 1.1 }}
        >
          <path d="M1 60 L4.5 56.5 L8 60 L4.5 63.5 Z" />
          <path d="M112 60 L115.5 56.5 L119 60 L115.5 63.5 Z" />
        </motion.g>
      </g>

      <g fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        {paths.map((p, i) => {
          const dashed = !!p.dash;
          const still = p.fill || dashed;
          return (
            <motion.path
              key={i}
              d={p.d}
              fill={p.fill ? "currentColor" : "none"}
              strokeWidth={dashed ? 1.6 : undefined}
              strokeDasharray={dashed ? "0.1 5" : undefined}
              initial={animate ? (still ? { opacity: 0, scale: p.fill ? 0.4 : 1 } : { pathLength: 0, opacity: 0 }) : false}
              whileInView={still ? { opacity: 1, scale: 1 } : { pathLength: 1, opacity: 1 }}
              viewport={view}
              style={p.fill ? { transformBox: "fill-box", transformOrigin: "center" } : undefined}
              transition={{ duration: p.fill ? 0.5 : 1, delay: delay + 0.35 + i * 0.18, ease: [0.45, 0, 0.25, 1] }}
            />
          );
        })}
      </g>
    </svg>
  );
}
