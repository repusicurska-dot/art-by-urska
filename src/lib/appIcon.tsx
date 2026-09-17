import { ImageResponse } from "next/og";

/**
 * The home-screen app icon: the "UR" monogram in champagne gold on the site's near-black,
 * drawn at any size. `padding` shrinks the mark for Android "maskable" icons, whose edges the
 * launcher may crop into a circle or squircle.
 */
export function appIcon(size: number, { padding = 0.18 }: { padding?: number } = {}) {
  const mark = Math.round(size * (1 - padding * 2));
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "radial-gradient(circle at 50% 40%, #1d1a22 0%, #030303 75%)",
        }}
      >
        <svg width={mark} height={mark} viewBox="0 0 120 120">
          <g fill="none" stroke="#d6bb8c" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="60" cy="60" r="54" strokeWidth="1.6" opacity="0.8" />
            <path d="M32 40 V63 C32 74 38.5 82 47 82 C55.5 82 62 74 62 63 V41" strokeWidth="5.2" />
            <path d="M62 40 V82" strokeWidth="5.2" />
            <path d="M65 40 H74 A9.8 9.8 0 0 1 74 59.6 H65" strokeWidth="4.8" />
            <path d="M72 59.6 L88 82" strokeWidth="4.8" />
          </g>
        </svg>
      </div>
    ),
    { width: size, height: size }
  );
}
