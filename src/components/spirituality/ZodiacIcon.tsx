/**
 * Custom constellation-style glyphs, replacing generic Unicode astrological
 * characters (✗ "grozne ikonice") with something drawn in the site's own visual
 * language — thin lines connecting small stars, echoing SpiritualBackdrop's
 * constellation. Not astronomically precise star maps, just elegant, distinct
 * abstractions of each sign in a consistent hand.
 */
type Pattern = {
  stars: [number, number][];
  lines: [number, number][];
};

export const ZODIAC_PATTERNS: Record<string, Pattern> = {
  aries: {
    stars: [
      [22, 68],
      [36, 48],
      [55, 42],
      [76, 52],
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
    ],
  },
  taurus: {
    stars: [
      [50, 28],
      [36, 50],
      [22, 74],
      [64, 50],
      [80, 74],
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
      [30, 20],
      [30, 45],
      [30, 72],
      [70, 20],
      [70, 45],
      [70, 72],
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
      [50, 22],
      [50, 48],
      [30, 76],
      [70, 76],
    ],
    lines: [
      [0, 1],
      [1, 2],
      [1, 3],
    ],
  },
  leo: {
    stars: [
      [24, 32],
      [36, 20],
      [52, 25],
      [56, 42],
      [44, 55],
      [78, 62],
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 0],
      [3, 5],
    ],
  },
  virgo: {
    stars: [
      [50, 18],
      [50, 44],
      [28, 60],
      [72, 60],
      [50, 82],
    ],
    lines: [
      [0, 1],
      [1, 2],
      [1, 3],
      [1, 4],
    ],
  },
  libra: {
    stars: [
      [28, 34],
      [72, 34],
      [78, 66],
      [22, 66],
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
      [18, 24],
      [24, 40],
      [34, 53],
      [48, 59],
      [61, 55],
      [70, 65],
      [63, 81],
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
    ],
  },
  sagittarius: {
    stars: [
      [35, 23],
      [61, 18],
      [77, 40],
      [66, 66],
      [34, 66],
      [24, 44],
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 0],
    ],
  },
  capricorn: {
    stars: [
      [24, 28],
      [76, 28],
      [66, 70],
      [34, 70],
      [18, 54],
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 0],
      [0, 4],
      [4, 3],
    ],
  },
  aquarius: {
    stars: [
      [18, 42],
      [35, 24],
      [50, 46],
      [65, 24],
      [82, 42],
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
    ],
  },
  pisces: {
    stars: [
      [18, 28],
      [30, 45],
      [18, 62],
      [50, 50],
      [82, 28],
      [70, 45],
      [82, 62],
    ],
    lines: [
      [0, 1],
      [1, 2],
      [1, 3],
      [3, 5],
      [4, 5],
      [5, 6],
    ],
  },
};

export default function ZodiacIcon({
  signKey,
  className = "",
  brightStar = true,
}: {
  signKey: string;
  className?: string;
  brightStar?: boolean;
}) {
  const pattern = ZODIAC_PATTERNS[signKey];
  if (!pattern) return null;

  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      {pattern.lines.map(([a, b], i) => {
        const [x1, y1] = pattern.stars[a];
        const [x2, y2] = pattern.stars[b];
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            opacity={0.55}
          />
        );
      })}
      {pattern.stars.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={brightStar && i === 0 ? 6 : 4.5}
          fill="currentColor"
        />
      ))}
    </svg>
  );
}
