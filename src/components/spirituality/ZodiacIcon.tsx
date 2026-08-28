"use client";

import { motion } from "framer-motion";

/**
 * Custom constellation-style glyphs, replacing generic Unicode astrological
 * characters with something drawn in the site's own visual language — glowing
 * stars of varying brightness connected by thin lines, echoing SpiritualBackdrop's
 * star field and loosely gesturing at each sign's real asterism (Scorpio's curling
 * tail, Sagittarius's teapot, Pisces's long cord between two fish, Taurus/Cancer's
 * companion star clusters) rather than a literal star atlas.
 */
type Star = [x: number, y: number, weight?: number];
type Pattern = {
  stars: Star[];
  lines: [number, number][];
};

export const ZODIAC_PATTERNS: Record<string, Pattern> = {
  aries: {
    stars: [
      [16, 74, 1.3],
      [32, 60, 1],
      [40, 38, 1.1],
      [58, 24, 1.5],
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
    ],
  },
  taurus: {
    stars: [
      [52, 34, 1.9],
      [38, 54, 1],
      [26, 76, 1.1],
      [66, 52, 1],
      [80, 74, 1.1],
      [60, 16, 0.7],
      [68, 20, 0.6],
      [72, 14, 0.65],
    ],
    lines: [
      [0, 1],
      [1, 2],
      [0, 3],
      [3, 4],
    ],
  },
  gemini: {
    stars: [
      [26, 16, 1.3],
      [26, 42, 1],
      [26, 70, 1.2],
      [74, 16, 1.3],
      [74, 42, 1],
      [74, 70, 1.2],
    ],
    lines: [
      [0, 1],
      [1, 2],
      [3, 4],
      [4, 5],
      [1, 4],
    ],
  },
  cancer: {
    stars: [
      [50, 18, 1],
      [50, 44, 1.4],
      [30, 70, 0.9],
      [70, 70, 0.9],
      [46, 52, 0.55],
      [54, 50, 0.5],
      [50, 58, 0.55],
    ],
    lines: [
      [0, 1],
      [1, 2],
      [1, 3],
    ],
  },
  leo: {
    stars: [
      [20, 36, 1.1],
      [28, 20, 1],
      [46, 16, 1.1],
      [56, 32, 1.7],
      [46, 50, 1],
      [80, 56, 1],
      [72, 76, 0.9],
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 0],
      [3, 5],
      [5, 6],
    ],
  },
  virgo: {
    stars: [
      [50, 14, 1],
      [52, 40, 1.1],
      [28, 58, 1],
      [76, 54, 1],
      [60, 84, 1.8],
    ],
    lines: [
      [0, 1],
      [1, 2],
      [1, 3],
      [3, 4],
    ],
  },
  libra: {
    stars: [
      [30, 30, 1.2],
      [70, 30, 1.2],
      [76, 64, 1],
      [24, 64, 1],
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 0],
    ],
  },
  scorpio: {
    stars: [
      [14, 20, 1],
      [20, 36, 1],
      [30, 48, 1.7],
      [44, 54, 1],
      [58, 50, 1],
      [70, 58, 1.1],
      [66, 74, 1],
      [52, 84, 0.9],
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [6, 7],
    ],
  },
  sagittarius: {
    stars: [
      [36, 24, 1.1],
      [58, 20, 1.2],
      [76, 36, 1],
      [68, 60, 1],
      [38, 62, 1.1],
      [18, 48, 0.9],
      [84, 22, 0.8],
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 0],
      [4, 5],
      [1, 6],
      [6, 2],
    ],
  },
  capricorn: {
    stars: [
      [24, 26, 1.2],
      [76, 26, 1.2],
      [64, 66, 1],
      [34, 66, 1.1],
      [16, 50, 1],
      [26, 42, 0.7],
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 0],
      [0, 4],
      [4, 5],
      [5, 3],
    ],
  },
  aquarius: {
    stars: [
      [12, 48, 1],
      [27, 30, 1.1],
      [42, 52, 0.9],
      [57, 28, 1.2],
      [72, 52, 0.9],
      [88, 32, 1.1],
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
    ],
  },
  pisces: {
    stars: [
      [14, 28, 1.1],
      [24, 40, 1],
      [16, 54, 1],
      [40, 48, 0.7],
      [58, 46, 0.7],
      [84, 26, 1.1],
      [76, 38, 1],
      [86, 50, 1],
    ],
    lines: [
      [0, 1],
      [1, 2],
      [1, 3],
      [3, 4],
      [4, 6],
      [5, 6],
      [6, 7],
    ],
  },
};

export default function ZodiacIcon({
  signKey,
  className = "",
  animateIn = false,
}: {
  signKey: string;
  className?: string;
  /** Play a one-time "connecting the stars" draw-in instead of rendering statically. */
  animateIn?: boolean;
}) {
  const pattern = ZODIAC_PATTERNS[signKey];
  if (!pattern) return null;

  const glowId = `zodiac-glow-${signKey}`;

  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <defs>
        <filter id={glowId} x="-120%" y="-120%" width="340%" height="340%">
          <feGaussianBlur stdDeviation="3.2" />
        </filter>
      </defs>

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
            <circle cx={x} cy={y} r={r * 2.1} fill="currentColor" opacity={0.4} filter={`url(#${glowId})`} />
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
