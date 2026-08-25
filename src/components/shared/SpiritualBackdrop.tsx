const STAR_COUNT = 60;

// Deterministic pseudo-random so the star field renders identically on the
// server and client — Math.random() here would cause a hydration mismatch.
function seededRandom(seed: number) {
  let t = seed;
  return function () {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = seededRandom(1312);
const stars = Array.from({ length: STAR_COUNT }, () => ({
  x: rand() * 100,
  y: rand() * 100,
  size: 0.5 + rand() * 1.1,
  opacity: 0.12 + rand() * 0.22,
}));

// A small constellation — abstract, not any specific real zodiac sign —
// tucked in the upper-right, stars connected by thin lines.
const CONSTELLATION: [number, number][] = [
  [82, 10],
  [86, 16],
  [91, 15],
  [88, 22],
  [93, 27],
  [84, 29],
  [79, 24],
];
const CONSTELLATION_LINES = [
  [0, 1],
  [1, 2],
  [1, 3],
  [3, 4],
  [3, 5],
  [5, 6],
  [6, 0],
];

export default function SpiritualBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-40 overflow-hidden pointer-events-none mix-blend-screen"
    >
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        {stars.map((s, i) => (
          <circle
            key={i}
            cx={`${s.x}%`}
            cy={`${s.y}%`}
            r={s.size}
            fill="rgb(242,240,235)"
            opacity={s.opacity}
          />
        ))}

        {CONSTELLATION_LINES.map(([a, b], i) => (
          <line
            key={i}
            x1={`${CONSTELLATION[a][0]}%`}
            y1={`${CONSTELLATION[a][1]}%`}
            x2={`${CONSTELLATION[b][0]}%`}
            y2={`${CONSTELLATION[b][1]}%`}
            stroke="rgb(242,240,235)"
            strokeWidth={0.5}
            opacity={0.14}
          />
        ))}
        {CONSTELLATION.map(([x, y], i) => (
          <circle key={`c${i}`} cx={`${x}%`} cy={`${y}%`} r={1.4} fill="rgb(242,240,235)" opacity={0.55} />
        ))}
      </svg>
    </div>
  );
}
