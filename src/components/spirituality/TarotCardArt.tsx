/**
 * Original card art for the 22 Major Arcana, drawn as inline SVG: a gold hairline
 * frame with botanical corners, the numeral above and the title below, and a
 * symbolic emblem in the middle.
 *
 * Written from scratch in the dark-ground / gold-line-art idiom Urška asked for.
 * Style isn't copyrightable and none of this traces anyone's deck — which is the
 * whole point: redrawing a specific illustrator's cards would still be a derivative
 * work, no matter who holds the pen.
 *
 * Vector rather than images, so the cards stay crisp at any size and the whole deck
 * costs a few KB instead of megabytes.
 */

const GOLD = "var(--color-accent-warm)";

function romanNumeral(n: number): string {
  if (n === 0) return "0";
  const table: [number, string][] = [
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];
  let remaining = n;
  let out = "";
  for (const [value, symbol] of table) {
    while (remaining >= value) {
      out += symbol;
      remaining -= value;
    }
  }
  return out;
}

/** A small botanical spray, drawn once and mirrored into all four corners. */
function CornerSpray() {
  return (
    <g fill="none" stroke={GOLD} strokeWidth="1" strokeLinecap="round" opacity="0.75">
      <path d="M0 0 C 16 6, 26 16, 32 34" />
      <path d="M11 4 C 17 0, 24 2, 26 8 C 20 11, 13 9, 11 4 Z" />
      <path d="M21 13 C 28 11, 34 15, 34 21 C 27 22, 22 19, 21 13 Z" />
      <path d="M7 13 C 5 20, 8 26, 14 27 C 16 21, 13 15, 7 13 Z" />
      <circle cx="33" cy="37" r="1.8" fill={GOLD} stroke="none" />
    </g>
  );
}

/**
 * A crescent, built as a big disc with an offset disc punched out of it via
 * fill-rule. Drawing it as two arcs instead looks obvious but degenerates: the
 * chord ends up equal to the diameter, and SVG quietly renders nothing.
 */
function Crescent({ cx, cy, r, bite = 0.86, shift = 0.42, o = 0.85 }: { cx: number; cy: number; r: number; bite?: number; shift?: number; o?: number }) {
  const ring = (x: number, y: number, rad: number) =>
    `M${x - rad} ${y} a${rad} ${rad} 0 1 0 ${rad * 2} 0 a${rad} ${rad} 0 1 0 ${-rad * 2} 0`;
  return (
    <path
      d={`${ring(cx, cy, r)} ${ring(cx + r * shift, cy - r * 0.12, r * bite)}`}
      fill={GOLD}
      fillRule="evenodd"
      stroke="none"
      opacity={o}
    />
  );
}

/** Star with four long points and four short ones — the deck's recurring sparkle. */
function Sparkle({ x, y, r = 7, o = 0.9 }: { x: number; y: number; r?: number; o?: number }) {
  const s = r * 0.28;
  return (
    <path
      d={`M${x} ${y - r} Q${x + s} ${y - s} ${x + r} ${y} Q${x + s} ${y + s} ${x} ${y + r} Q${x - s} ${y + s} ${x - r} ${y} Q${x - s} ${y - s} ${x} ${y - r} Z`}
      fill={GOLD}
      opacity={o}
    />
  );
}

function Rays({ cx, cy, r0, r1, count = 16, width = 1 }: { cx: number; cy: number; r0: number; r1: number; count?: number; width?: number }) {
  // Fixed precision: Node and the browser disagree on the last digit of a raw
  // Math.cos result, which is enough to trip a hydration mismatch.
  const p = (n: number) => n.toFixed(3);
  return (
    <g stroke={GOLD} strokeWidth={width} strokeLinecap="round" opacity="0.8">
      {Array.from({ length: count }, (_, i) => {
        const a = (i / count) * Math.PI * 2;
        return (
          <line
            key={i}
            x1={p(cx + Math.cos(a) * r0)}
            y1={p(cy + Math.sin(a) * r0)}
            x2={p(cx + Math.cos(a) * r1)}
            y2={p(cy + Math.sin(a) * r1)}
          />
        );
      })}
    </g>
  );
}

/** Each emblem is drawn inside roughly x 60–240, y 130–370, centred on (150, 250). */
const EMBLEMS: Record<string, React.ReactNode> = {
  fool: (
    <g fill="none" stroke={GOLD} strokeWidth="1.6" strokeLinecap="round">
      <circle cx="150" cy="180" r="26" opacity="0.9" />
      <Rays cx={150} cy={180} r0={32} r1={44} count={12} />
      <path d="M96 300 L150 286 L204 300" opacity="0.8" />
      <path d="M96 300 C 110 322, 130 332, 150 334 C 170 332, 190 322, 204 300" opacity="0.5" />
      <path d="M150 250 L150 286" />
      <Sparkle x={112} y={236} r={6} />
      <Sparkle x={192} y={248} r={5} o={0.7} />
    </g>
  ),
  magician: (
    <g fill="none" stroke={GOLD} strokeWidth="1.6" strokeLinecap="round">
      <path d="M126 196 C 112 196, 112 220, 126 220 C 140 220, 160 196, 174 196 C 188 196, 188 220, 174 220 C 160 220, 140 196, 126 196 Z" />
      <path d="M84 300 H216" opacity="0.8" />
      <circle cx="106" cy="274" r="9" />
      <path d="M144 264 L156 264 L150 284 Z" />
      <path d="M194 264 V284" />
      <path d="M188 270 L200 270" />
      <Sparkle x={150} y={150} r={7} />
    </g>
  ),
  "high-priestess": (
    <g fill="none" stroke={GOLD} strokeWidth="1.6" strokeLinecap="round">
      <Crescent cx={150} cy={206} r={30} />
      <path d="M96 158 V344 M204 158 V344" opacity="0.8" />
      <path d="M88 158 H104 M196 158 H212" opacity="0.8" />
      <path d="M88 344 H104 M196 344 H212" opacity="0.8" />
      <path d="M120 268 H180" opacity="0.3" />
      <path d="M114 292 H186" opacity="0.3" />
      <path d="M120 316 H180" opacity="0.3" />
      <Sparkle x={150} y={152} r={6} />
    </g>
  ),
  empress: (
    <g fill="none" stroke={GOLD} strokeWidth="1.6" strokeLinecap="round">
      {/* Venus glyph over a wheat sheaf */}
      <circle cx="150" cy="212" r="26" />
      <path d="M150 238 V292" />
      <path d="M128 266 H172" />
      <path d="M116 330 C 126 300, 136 282, 150 270" />
      <path d="M184 330 C 174 300, 164 282, 150 270" />
      <path d="M150 330 V276" opacity="0.8" />
      <path d="M128 300 C 136 292, 144 292, 150 298" opacity="0.6" />
      <path d="M172 300 C 164 292, 156 292, 150 298" opacity="0.6" />
      <Sparkle x={110} y={176} r={5} />
      <Sparkle x={150} y={152} r={7} />
      <Sparkle x={190} y={176} r={5} />
    </g>
  ),
  emperor: (
    <g fill="none" stroke={GOLD} strokeWidth="1.6" strokeLinecap="round">
      {/* throne with a high back, ram's horns at its shoulders */}
      <path d="M118 330 V214 H182 V330" />
      <path d="M104 330 H196" opacity="0.85" />
      <path d="M118 268 H182" opacity="0.7" />
      <path d="M118 214 C 102 208, 96 192, 108 182 C 116 176, 126 182, 124 192" />
      <path d="M182 214 C 198 208, 204 192, 192 182 C 184 176, 174 182, 176 192" />
      <path d="M134 296 H166" opacity="0.55" />
      <Sparkle x={150} y={240} r={7} />
    </g>
  ),
  hierophant: (
    <g fill="none" stroke={GOLD} strokeWidth="1.6" strokeLinecap="round">
      {/* triple crown above two crossed keys */}
      <path d="M120 214 L150 184 L180 214 Z" />
      <path d="M128 196 L150 176 L172 196" opacity="0.75" />
      <path d="M136 182 L150 168 L164 182" opacity="0.5" />
      <circle cx="122" cy="256" r="9" />
      <path d="M130 263 L184 316" />
      <path d="M176 310 h12 M182 304 v12" />
      <circle cx="178" cy="256" r="9" />
      <path d="M170 263 L116 316" />
      <path d="M112 310 h12 M118 304 v12" />
    </g>
  ),
  lovers: (
    <g fill="none" stroke={GOLD} strokeWidth="1.6" strokeLinecap="round">
      <circle cx="124" cy="262" r="38" opacity="0.9" />
      <circle cx="176" cy="262" r="38" opacity="0.9" />
      <path d="M150 172 C 138 158, 118 164, 118 180 C 118 196, 138 206, 150 218 C 162 206, 182 196, 182 180 C 182 164, 162 158, 150 172 Z" />
      <Sparkle x={150} y={326} r={6} />
    </g>
  ),
  chariot: (
    <g fill="none" stroke={GOLD} strokeWidth="1.6" strokeLinecap="round">
      <circle cx="112" cy="306" r="22" />
      <circle cx="188" cy="306" r="22" />
      <path d="M112 306 h0 M188 306 h0" />
      <path d="M104 268 H196 L186 240 H114 Z" />
      <path d="M150 240 V206" />
      <path d="M118 206 H182" opacity="0.8" />
      <Sparkle x={150} y={178} r={7} />
      <Rays cx={112} cy={306} r0={4} r1={18} count={8} width={0.8} />
      <Rays cx={188} cy={306} r0={4} r1={18} count={8} width={0.8} />
    </g>
  ),
  strength: (
    <g fill="none" stroke={GOLD} strokeWidth="1.6" strokeLinecap="round">
      <path d="M128 186 C 116 186, 116 206, 128 206 C 140 206, 160 186, 172 186 C 184 186, 184 206, 172 206 C 160 206, 140 186, 128 186 Z" />
      <circle cx="150" cy="282" r="34" />
      <Rays cx={150} cy={282} r0={38} r1={54} count={18} />
      <path d="M138 276 h6 M156 276 h6" strokeWidth="2.2" />
      <path d="M140 294 C 146 300, 154 300, 160 294" />
    </g>
  ),
  hermit: (
    <g fill="none" stroke={GOLD} strokeWidth="1.6" strokeLinecap="round">
      <path d="M132 182 H168 L176 200 V240 L168 258 H132 L124 240 V200 Z" />
      <Sparkle x={150} y={220} r={9} />
      <path d="M150 168 V182" />
      <path d="M196 176 V334" opacity="0.85" />
      <Rays cx={150} cy={220} r0={24} r1={34} count={8} width={0.8} />
    </g>
  ),
  "wheel-of-fortune": (
    <g fill="none" stroke={GOLD} strokeWidth="1.6" strokeLinecap="round">
      <circle cx="150" cy="252" r="66" />
      <circle cx="150" cy="252" r="50" opacity="0.55" />
      <circle cx="150" cy="252" r="10" />
      <Rays cx={150} cy={252} r0={10} r1={50} count={8} />
      <Sparkle x={150} y={162} r={6} />
      <Sparkle x={150} y={342} r={6} />
      <Sparkle x={60} y={252} r={5} o={0.7} />
      <Sparkle x={240} y={252} r={5} o={0.7} />
    </g>
  ),
  justice: (
    <g fill="none" stroke={GOLD} strokeWidth="1.6" strokeLinecap="round">
      <path d="M150 168 V330" />
      <path d="M96 206 H204" />
      <path d="M96 206 L80 240 H112 Z" />
      <path d="M204 206 L188 240 H220 Z" />
      <path d="M130 330 H170" />
      <Sparkle x={150} y={152} r={6} />
    </g>
  ),
  "hanged-man": (
    <g fill="none" stroke={GOLD} strokeWidth="1.6" strokeLinecap="round">
      <path d="M92 176 H208" opacity="0.85" />
      <path d="M150 176 V214" />
      <circle cx="150" cy="238" r="24" />
      <Rays cx={150} cy={238} r0={28} r1={40} count={12} width={0.8} />
      <path d="M150 262 V300" />
      <path d="M150 300 L124 332 M150 300 L176 322 L162 340" />
    </g>
  ),
  death: (
    <g fill="none" stroke={GOLD} strokeWidth="1.6" strokeLinecap="round">
      <path d="M96 200 C 150 188, 196 216, 208 264" />
      <path d="M208 264 C 186 250, 160 250, 142 260" opacity="0.8" />
      <path d="M104 208 L124 330" />
      <circle cx="150" cy="308" r="18" />
      <path d="M150 290 C 160 298, 160 318, 150 326 C 140 318, 140 298, 150 290 Z" />
      <Sparkle x={196} y={196} r={5} o={0.7} />
    </g>
  ),
  temperance: (
    <g fill="none" stroke={GOLD} strokeWidth="1.6" strokeLinecap="round">
      {/* two cups, one pouring into the other */}
      <path d="M98 196 H136 L128 230 H106 Z" />
      <path d="M104 240 H130 M117 230 V240" opacity="0.8" />
      <path d="M164 286 H202 L194 320 H172 Z" />
      <path d="M170 330 H196 M183 320 V330" opacity="0.8" />
      <path d="M130 226 C 148 246, 150 268, 172 288" opacity="0.9" />
      <path d="M136 232 C 152 250, 156 270, 176 292" opacity="0.45" />
      <Sparkle x={150} y={176} r={6} />
    </g>
  ),
  devil: (
    <g fill="none" stroke={GOLD} strokeWidth="1.6" strokeLinecap="round">
      {/* horns above a chain whose last link hangs open */}
      <path d="M122 216 C 108 196, 110 176, 126 168" />
      <path d="M178 216 C 192 196, 190 176, 174 168" />
      <path d="M122 216 C 134 230, 166 230, 178 216" />
      <circle cx="150" cy="196" r="5" fill={GOLD} stroke="none" opacity="0.9" />
      <ellipse cx="150" cy="268" rx="13" ry="19" />
      <ellipse cx="150" cy="302" rx="13" ry="19" />
      <path d="M137 330 C 137 344, 150 348, 158 340" opacity="0.85" />
      <Sparkle x={150} y={150} r={5} o={0.6} />
    </g>
  ),
  tower: (
    <g fill="none" stroke={GOLD} strokeWidth="1.6" strokeLinecap="round">
      <path d="M118 330 V216 H182 V330" />
      <path d="M110 216 H190" />
      <path d="M126 200 L150 176 L174 200" />
      <path d="M150 176 L138 140 L162 158 L150 122" strokeWidth="2" />
      <path d="M100 330 H200" opacity="0.85" />
      <Sparkle x={96} y={256} r={5} o={0.7} />
      <Sparkle x={204} y={240} r={5} o={0.7} />
    </g>
  ),
  star: (
    <g fill="none" stroke={GOLD} strokeWidth="1.6" strokeLinecap="round">
      <Sparkle x={150} y={214} r={34} />
      <Rays cx={150} cy={214} r0={40} r1={54} count={12} width={0.9} />
      <Sparkle x={92} y={178} r={7} o={0.8} />
      <Sparkle x={208} y={178} r={7} o={0.8} />
      <Sparkle x={76} y={240} r={5} o={0.6} />
      <Sparkle x={224} y={240} r={5} o={0.6} />
      <path d="M84 306 C 106 296, 128 316, 150 306 C 172 296, 194 316, 216 306" opacity="0.7" />
      <path d="M84 330 C 106 320, 128 340, 150 330 C 172 320, 194 340, 216 330" opacity="0.5" />
    </g>
  ),
  moon: (
    <g fill="none" stroke={GOLD} strokeWidth="1.6" strokeLinecap="round">
      <Crescent cx={150} cy={208} r={36} />
      <path d="M100 282 V344 M200 282 V344" opacity="0.85" />
      <path d="M100 282 L110 262 L120 282" opacity="0.85" />
      <path d="M180 282 L190 262 L200 282" opacity="0.85" />
      <path d="M150 286 C 140 306, 160 324, 150 344" opacity="0.6" />
      <Sparkle x={94} y={182} r={5} o={0.7} />
      <Sparkle x={212} y={166} r={4} o={0.6} />
      <Sparkle x={216} y={228} r={4} o={0.5} />
    </g>
  ),
  sun: (
    <g fill="none" stroke={GOLD} strokeWidth="1.6" strokeLinecap="round">
      <circle cx="150" cy="230" r="42" />
      <Rays cx={150} cy={230} r0={48} r1={72} count={20} />
      <path d="M136 222 h6 M158 222 h6" strokeWidth="2.2" />
      <path d="M136 244 C 144 252, 156 252, 164 244" />
      <path d="M92 330 H208" opacity="0.6" />
      <Sparkle x={104} y={318} r={5} o={0.7} />
      <Sparkle x={196} y={318} r={5} o={0.7} />
    </g>
  ),
  judgement: (
    <g fill="none" stroke={GOLD} strokeWidth="1.6" strokeLinecap="round">
      {/* a trumpet, its bell flaring toward the left, sounding over open ground */}
      <path d="M196 196 L118 210 L118 238 L196 252 Z" />
      <path d="M118 210 C 104 216, 104 232, 118 238" />
      <path d="M196 196 C 206 206, 206 242, 196 252" opacity="0.8" />
      <path d="M92 208 C 80 216, 80 232, 92 240" opacity="0.6" />
      <path d="M78 200 C 62 214, 62 234, 78 248" opacity="0.35" />
      <path d="M150 286 V336" />
      <path d="M122 310 H178" />
      <path d="M104 344 H196" opacity="0.6" />
    </g>
  ),
  world: (
    <g fill="none" stroke={GOLD} strokeWidth="1.6" strokeLinecap="round">
      <ellipse cx="150" cy="252" rx="62" ry="84" />
      <ellipse cx="150" cy="252" rx="52" ry="74" opacity="0.45" />
      <Sparkle x={150} y={252} r={26} />
      <Sparkle x={150} y={168} r={7} />
      <Sparkle x={150} y={336} r={7} />
      <Sparkle x={88} y={252} r={6} />
      <Sparkle x={212} y={252} r={6} />
    </g>
  ),
};

/** Cards with a painted image in public/images/tarot. Everything else uses the drawn emblem. */
const PAINTED_CARDS = new Set([
  "magician",
  "high-priestess",
  "empress",
  "emperor",
  "hierophant",
  "lovers",
  "chariot",
  "strength",
  "hermit",
  "wheel-of-fortune",
  "justice",
  "hanged-man",
  "death",
  "temperance",
  "devil",
  "tower",
  "star",
  "moon",
  "sun",
  "judgement",
  "world",
]);

export default function TarotCardArt({
  cardKey,
  number,
  title,
  className = "",
}: {
  cardKey: string;
  number: number;
  title: string;
  className?: string;
}) {
  const fontSize = title.length > 15 ? 10.5 : title.length > 10 ? 12.5 : 15;
  const letterSpacing = title.length > 15 ? 1.2 : title.length > 10 ? 1.9 : 2.6;

  // The painted cards (public/images/tarot/<key>.webp, cut from Teo's sheet). They carry their own
  // numeral; their printed English name was cut off, and the name is written below in the
  // visitor's language instead. The Fool isn't on the sheet, so it keeps the drawn emblem.
  if (PAINTED_CARDS.has(cardKey)) {
    return (
      <svg viewBox="0 0 300 510" className={className} role="img" aria-label={title}>
        <rect width="300" height="510" fill="var(--color-ink)" />
        <image
          href={`/images/tarot/${cardKey}.webp`}
          x="19"
          y="14"
          width="262"
          height="440"
          preserveAspectRatio="xMidYMid meet"
        />
        <rect x="10" y="10" width="280" height="490" rx="6" fill="none" stroke={GOLD} strokeWidth="1.2" opacity="0.65" />
        <line x1="92" y1="466" x2="208" y2="466" stroke={GOLD} strokeWidth="0.8" opacity="0.5" />
        <text
          x="150"
          y="488"
          textAnchor="middle"
          fill={GOLD}
          fontSize={fontSize}
          letterSpacing={letterSpacing}
          style={{ fontFamily: "var(--font-cormorant), serif" }}
        >
          {title.toUpperCase()}
        </text>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 300 510" className={className} role="img" aria-label={title}>
      <rect width="300" height="510" fill="var(--color-ink)" />

      {/* frame */}
      <rect x="10" y="10" width="280" height="490" rx="6" fill="none" stroke={GOLD} strokeWidth="1.2" opacity="0.65" />
      <rect x="17" y="17" width="266" height="476" rx="4" fill="none" stroke={GOLD} strokeWidth="0.6" opacity="0.35" />

      {/* botanical corners */}
      <g transform="translate(22 22)"><CornerSpray /></g>
      <g transform="translate(278 22) scale(-1 1)"><CornerSpray /></g>
      <g transform="translate(22 488) scale(1 -1)"><CornerSpray /></g>
      <g transform="translate(278 488) scale(-1 -1)"><CornerSpray /></g>

      {/* numeral */}
      <text
        x="150"
        y="62"
        textAnchor="middle"
        fill={GOLD}
        fontSize="17"
        letterSpacing="4"
        style={{ fontFamily: "var(--font-cormorant), serif" }}
      >
        {romanNumeral(number)}
      </text>

      {EMBLEMS[cardKey] ?? null}

      {/* Title plate. Slovenian card names run long ("Vrhovna Duhovnica"), so the
          type steps down rather than running off the edge of the card. */}
      <line x1="92" y1="434" x2="208" y2="434" stroke={GOLD} strokeWidth="0.8" opacity="0.5" />
      <text
        x="150"
        y="462"
        textAnchor="middle"
        fill={GOLD}
        fontSize={title.length > 15 ? 10.5 : title.length > 10 ? 12.5 : 15}
        letterSpacing={title.length > 15 ? 1.2 : title.length > 10 ? 1.9 : 2.6}
        style={{ fontFamily: "var(--font-cormorant), serif" }}
      >
        {title.toUpperCase()}
      </text>
    </svg>
  );
}
