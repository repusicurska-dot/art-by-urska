const STAR_COUNT = 140;

function seededRandom(seed: number) {
  let t = seed;
  return function () {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = seededRandom(8829);
const stars = Array.from({ length: STAR_COUNT }, () => ({
  x: rand() * 100,
  y: rand() * 100,
  size: 0.6 + rand() * 1.6,
  opacity: 0.25 + rand() * 0.55,
  delay: rand() * 8,
  duration: 3 + rand() * 5,
}));

export default function SpiritualityStarfield() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        {stars.map((s, i) => (
          <circle
            key={i}
            className="ambient-motion"
            cx={`${s.x}%`}
            cy={`${s.y}%`}
            r={s.size}
            fill="var(--color-accent-cold)"
            style={{
              opacity: s.opacity,
              animation: `spirit-twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
              transformOrigin: `${s.x}% ${s.y}%`,
            }}
          />
        ))}
      </svg>
    </div>
  );
}
