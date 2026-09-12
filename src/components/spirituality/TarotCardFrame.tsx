/**
 * The gold ornament that makes a card read as a tarot card rather than a box: a
 * hairline double border with a botanical spray in each corner, in the same
 * line-art language as the rest of the page. Drawn as fixed-size corner SVGs (so
 * they never stretch) over CSS borders, and sits above the card art but below its
 * text. Purely decorative.
 */
function CornerFlourish({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 60 60"
      className={`absolute h-10 w-10 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      aria-hidden="true"
    >
      {/* stem sweeping away from the corner */}
      <path d="M4 4 C 20 10, 30 20, 36 38" opacity="0.85" />
      {/* leaves off the stem */}
      <path d="M14 8 C 20 4, 27 6, 29 12 C 23 15, 16 13, 14 8 Z" opacity="0.7" />
      <path d="M24 16 C 31 14, 37 18, 37 24 C 30 25, 25 22, 24 16 Z" opacity="0.7" />
      <path d="M10 16 C 8 23, 11 29, 17 30 C 19 24, 16 18, 10 16 Z" opacity="0.7" />
      {/* small bud at the tip */}
      <circle cx="37" cy="41" r="2.2" fill="currentColor" stroke="none" opacity="0.8" />
    </svg>
  );
}

export default function TarotCardFrame() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{ color: "var(--color-accent-warm)" }}
    >
      {/* inner hairline frame */}
      <div
        className="absolute inset-[10px] rounded-[6px]"
        style={{ border: "1px solid color-mix(in srgb, var(--color-accent-warm) 45%, transparent)" }}
      />
      <div
        className="absolute inset-[15px] rounded-[4px]"
        style={{ border: "1px solid color-mix(in srgb, var(--color-accent-warm) 20%, transparent)" }}
      />

      <CornerFlourish className="left-[12px] top-[12px]" />
      <CornerFlourish className="right-[12px] top-[12px] -scale-x-100" />
      <CornerFlourish className="left-[12px] bottom-[12px] -scale-y-100" />
      <CornerFlourish className="right-[12px] bottom-[12px] -scale-x-100 -scale-y-100" />
    </div>
  );
}
