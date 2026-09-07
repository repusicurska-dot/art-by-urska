"use client";

import { motion } from "framer-motion";

/**
 * Constellation-style glyphs for the Major Arcana, in the same visual language as
 * SpiritualBackdrop's star field: glowing dots connected by thin lines, loosely
 * gesturing at each card's classic imagery (the Sun's rays, the Moon's crescent, the
 * Wheel's spokes, the Tower's lightning) rather than a literal illustration.
 */
type Star = [x: number, y: number, weight?: number];
type Pattern = {
  stars: Star[];
  lines: [number, number][];
};

export const TAROT_PATTERNS: Record<string, Pattern> = {
  fool: {
    stars: [
      [50, 18, 1.3],
      [50, 38, 1],
      [66, 52, 1],
      [76, 68, 0.7],
      [84, 82, 0.55],
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
    ],
  },
  magician: {
    stars: [
      [30, 42, 1],
      [50, 50, 1.4],
      [70, 42, 1],
      [50, 32, 0.8],
      [50, 68, 0.8],
      [32, 80, 0.7],
      [68, 80, 0.7],
    ],
    lines: [
      [0, 3],
      [3, 2],
      [2, 4],
      [4, 0],
      [5, 6],
    ],
  },
  "high-priestess": {
    stars: [
      [50, 24, 1.5],
      [42, 30, 0.7],
      [58, 30, 0.7],
      [24, 30, 1],
      [24, 76, 1],
      [76, 30, 1],
      [76, 76, 1],
    ],
    lines: [
      [1, 0],
      [0, 2],
      [3, 4],
      [5, 6],
    ],
  },
  empress: {
    stars: [
      [50, 16, 1.1],
      [34, 26, 0.8],
      [66, 26, 0.8],
      [50, 50, 1.6],
      [30, 66, 0.9],
      [70, 66, 0.9],
      [50, 84, 1],
    ],
    lines: [
      [1, 0],
      [0, 2],
      [3, 4],
      [3, 5],
      [4, 6],
      [5, 6],
    ],
  },
  emperor: {
    stars: [
      [30, 78, 1],
      [30, 40, 1],
      [70, 40, 1],
      [70, 78, 1],
      [30, 26, 0.7],
      [70, 26, 0.7],
      [50, 16, 0.6],
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 0],
      [1, 4],
      [4, 6],
      [6, 5],
      [5, 2],
    ],
  },
  hierophant: {
    stars: [
      [50, 16, 1.2],
      [30, 34, 1],
      [70, 34, 1],
      [30, 80, 0.9],
      [70, 80, 0.9],
    ],
    lines: [
      [0, 1],
      [0, 2],
      [1, 3],
      [2, 4],
    ],
  },
  lovers: {
    stars: [
      [36, 50, 1.3],
      [64, 50, 1.3],
      [50, 32, 1],
      [50, 18, 0.7],
    ],
    lines: [
      [0, 2],
      [2, 1],
      [2, 3],
    ],
  },
  chariot: {
    stars: [
      [28, 62, 1],
      [72, 62, 1],
      [50, 46, 1.2],
      [50, 26, 1.4],
      [36, 76, 0.6],
      [64, 76, 0.6],
    ],
    lines: [
      [0, 2],
      [2, 1],
      [2, 3],
      [0, 4],
      [1, 5],
    ],
  },
  strength: {
    stars: [
      [30, 40, 1.2],
      [50, 32, 1],
      [70, 40, 1.2],
      [50, 60, 0.8],
      [38, 72, 0.6],
      [62, 72, 0.6],
    ],
    lines: [
      [0, 1],
      [1, 2],
      [0, 3],
      [3, 2],
      [3, 4],
      [3, 5],
    ],
  },
  hermit: {
    stars: [
      [50, 20, 1.6],
      [50, 40, 0.6],
      [50, 58, 0.6],
      [50, 76, 0.6],
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
    ],
  },
  "wheel-of-fortune": {
    stars: [
      [50, 50, 1],
      [50, 20, 0.9],
      [50, 80, 0.9],
      [20, 50, 0.9],
      [80, 50, 0.9],
      [30, 30, 0.7],
      [70, 30, 0.7],
      [30, 70, 0.7],
      [70, 70, 0.7],
    ],
    lines: [
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
      [0, 5],
      [0, 6],
      [0, 7],
      [0, 8],
    ],
  },
  justice: {
    stars: [
      [50, 18, 0.7],
      [50, 40, 0.7],
      [26, 40, 1],
      [74, 40, 1],
      [26, 58, 0.8],
      [74, 58, 0.8],
      [50, 78, 0.9],
    ],
    lines: [
      [0, 1],
      [1, 2],
      [1, 3],
      [2, 4],
      [3, 5],
      [1, 6],
    ],
  },
  "hanged-man": {
    stars: [
      [30, 24, 0.9],
      [70, 24, 0.9],
      [50, 24, 0.6],
      [50, 46, 1],
      [62, 66, 1.3],
      [40, 78, 0.6],
    ],
    lines: [
      [0, 1],
      [2, 3],
      [3, 4],
      [4, 5],
    ],
  },
  death: {
    stars: [
      [26, 76, 0.9],
      [42, 58, 1],
      [56, 40, 1.1],
      [68, 24, 1.3],
      [80, 14, 0.6],
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
    ],
  },
  temperance: {
    stars: [
      [26, 34, 1.1],
      [74, 66, 1.1],
      [50, 50, 0.7],
      [26, 66, 0.5],
      [74, 34, 0.5],
    ],
    lines: [
      [0, 2],
      [2, 1],
      [0, 3],
      [1, 4],
    ],
  },
  devil: {
    stars: [
      [34, 22, 0.9],
      [50, 34, 1],
      [66, 22, 0.9],
      [40, 56, 1.1],
      [60, 56, 1.1],
      [50, 78, 0.8],
    ],
    lines: [
      [0, 1],
      [1, 2],
      [3, 4],
      [3, 5],
      [4, 5],
    ],
  },
  tower: {
    stars: [
      [50, 16, 1],
      [38, 32, 0.8],
      [56, 40, 1.2],
      [30, 54, 0.7],
      [70, 62, 0.6],
      [24, 84, 0.5],
      [64, 84, 0.5],
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [2, 4],
      [3, 5],
      [4, 6],
    ],
  },
  star: {
    stars: [
      [50, 20, 1.7],
      [50, 6, 0.8],
      [50, 34, 0.8],
      [38, 20, 0.8],
      [62, 20, 0.8],
      [30, 60, 0.6],
      [46, 60, 0.6],
      [62, 60, 0.6],
      [78, 60, 0.6],
    ],
    lines: [
      [1, 2],
      [3, 4],
      [5, 6],
      [6, 7],
      [7, 8],
    ],
  },
  moon: {
    stars: [
      [58, 24, 1.5],
      [46, 18, 1],
      [50, 30, 0.7],
      [26, 70, 0.7],
      [74, 70, 0.7],
      [50, 82, 0.6],
    ],
    lines: [
      [1, 0],
      [0, 2],
      [3, 5],
      [5, 4],
    ],
  },
  sun: {
    stars: [
      [50, 50, 2],
      [50, 20, 0.7],
      [50, 80, 0.7],
      [20, 50, 0.7],
      [80, 50, 0.7],
      [28, 28, 0.6],
      [72, 28, 0.6],
      [28, 72, 0.6],
      [72, 72, 0.6],
    ],
    lines: [
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
      [0, 5],
      [0, 6],
      [0, 7],
      [0, 8],
    ],
  },
  judgement: {
    stars: [
      [50, 70, 1],
      [50, 46, 0.7],
      [36, 26, 1.1],
      [50, 16, 0.6],
      [64, 26, 0.6],
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [2, 4],
    ],
  },
  world: {
    stars: [
      [50, 50, 1.3],
      [50, 16, 0.8],
      [84, 50, 0.8],
      [50, 84, 0.8],
      [16, 50, 0.8],
      [26, 26, 0.6],
      [74, 26, 0.6],
      [74, 74, 0.6],
      [26, 74, 0.6],
    ],
    lines: [
      [1, 6],
      [6, 2],
      [2, 7],
      [7, 3],
      [3, 8],
      [8, 4],
      [4, 5],
      [5, 1],
    ],
  },
};

export default function TarotIcon({
  cardKey,
  className = "",
  animateIn = false,
}: {
  cardKey: string;
  className?: string;
  /** Play a one-time "connecting the stars" draw-in instead of rendering statically. */
  animateIn?: boolean;
}) {
  const pattern = TAROT_PATTERNS[cardKey];
  if (!pattern) return null;

  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      {pattern.lines.map(([a, b], i) =>
        animateIn ? (
          <motion.line
            key={i}
            x1={pattern.stars[a][0]}
            y1={pattern.stars[a][1]}
            x2={pattern.stars[b][0]}
            y2={pattern.stars[b][1]}
            stroke="currentColor"
            strokeWidth={2.25}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.6 }}
            transition={{ duration: 0.5, delay: i * 0.09, ease: "easeOut" }}
          />
        ) : (
          <line
            key={i}
            x1={pattern.stars[a][0]}
            y1={pattern.stars[a][1]}
            x2={pattern.stars[b][0]}
            y2={pattern.stars[b][1]}
            stroke="currentColor"
            strokeWidth={2.25}
            strokeLinecap="round"
            opacity={0.55}
          />
        )
      )}

      {pattern.stars.map(([x, y, weight = 1], i) => {
        const r = 3.4 * weight;
        const delay = pattern.lines.length * 0.09 + i * 0.05;
        return (
          <g key={i}>
            <circle cx={x} cy={y} r={r * 1.9} fill="currentColor" opacity={0.22} />
            {animateIn ? (
              <motion.circle
                cx={x}
                cy={y}
                r={r}
                fill="currentColor"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay, ease: "backOut" }}
                style={{ transformOrigin: `${x}px ${y}px` }}
              />
            ) : (
              <circle cx={x} cy={y} r={r} fill="currentColor" />
            )}
          </g>
        );
      })}
    </svg>
  );
}
