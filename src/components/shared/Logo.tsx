type LogoProps = {
  className?: string;
  ring?: boolean;
  wordmark?: boolean;
  iconClassName?: string;
  wordmarkClassName?: string;
};

// Interlocking "U/R" monogram, adapted from Urška's gold emboss badge concept
// into a stroke-based mark that stays legible at navbar scale and works on
// both light and dark backgrounds via currentColor.
export default function Logo({
  className = "",
  ring = false,
  wordmark = false,
  iconClassName = "h-8 w-8",
  wordmarkClassName = "",
}: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <svg viewBox="0 0 121 104" className={`shrink-0 ${iconClassName}`} aria-hidden="true">
        {ring && <circle cx="60.5" cy="52" r="48" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.55" />}
        <path
          d="M27 22 V58 C27 74 36 82 50 82 C64 82 73 74 73 58 V22
             M73 22 Q94 22 94 34 Q94 46 73 46
             M73 46 L94 82"
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {wordmark && (
        <span className={`font-heading text-[11px] tracking-[0.32em] uppercase leading-none ${wordmarkClassName}`}>
          Art by Urška
        </span>
      )}
    </span>
  );
}
