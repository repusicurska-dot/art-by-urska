type LogoProps = {
  className?: string;
  ring?: boolean;
  wordmark?: boolean;
  iconClassName?: string;
  wordmarkClassName?: string;
};

/**
 * The "UR" monogram emblem: a U whose right stem doubles as the R's, so the two
 * letters read as one mark rather than two initials side by side. Drawn in
 * currentColor so it works gold on the intro, bone in the header, and on either
 * background.
 *
 * `ring` adds the emblem frame — a double hairline circle with a small diamond at
 * each side. It's deliberately opt-in: at header size (32px) those hairlines turn
 * to mud, so the header shows the bare monogram and the footer/intro show the full
 * emblem.
 */
export default function Logo({
  className = "",
  ring = false,
  wordmark = false,
  iconClassName = "h-8 w-8",
  wordmarkClassName = "",
}: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <svg viewBox="0 0 120 120" className={`shrink-0 ${iconClassName}`} aria-hidden="true">
        {ring && (
          <g fill="none" stroke="currentColor">
            <circle cx="60" cy="60" r="54" strokeWidth="1" opacity="0.75" />
            <circle cx="60" cy="60" r="49" strokeWidth="0.6" opacity="0.4" />
            {/* a small diamond breaking the frame at each side */}
            <g fill="currentColor" stroke="none" opacity="0.75">
              <path d="M6 60 L9.5 56.5 L13 60 L9.5 63.5 Z" />
              <path d="M107 60 L110.5 56.5 L114 60 L110.5 63.5 Z" />
            </g>
          </g>
        )}

        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          {/* U — the right stem is shared with the R */}
          <path d="M32 40 V63 C32 74 38.5 82 47 82 C55.5 82 62 74 62 63 V41" strokeWidth="4.6" />
          {/* R — stem, bowl, leg. The bowl starts a little right of the stem so three
              round caps don't pile up into a blob at the top junction. */}
          <path d="M62 40 V82" strokeWidth="4.6" />
          <path d="M65 40 H74 A9.8 9.8 0 0 1 74 59.6 H65" strokeWidth="4.2" />
          <path d="M72 59.6 L88 82" strokeWidth="4.2" />
        </g>
      </svg>
      {wordmark && (
        <span className={`font-heading text-[11px] tracking-[0.32em] uppercase leading-none ${wordmarkClassName}`}>
          Art by Urška
        </span>
      )}
    </span>
  );
}
