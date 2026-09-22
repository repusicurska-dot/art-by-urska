import Image from "next/image";

/**
 * The site's sky: Urška's painted clouds with the light breaking through, fixed behind every
 * page. The source is only 512×512 and carries JPEG blocks, which showed as pixels once it was
 * stretched to the screen (Teo, 2026-09-21). sky-soft-2560.webp is made from it with the
 * blocks taken out first (median 5), then enlarged and softened (lanczos3, blur 6) — so it
 * reads as a soft painted sky, with a fine canvas grain on top for texture. A larger original
 * would let it be sharper.
 */
export default function SkyBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="ambient-motion sky-drift absolute inset-[-6%]">
        <Image
          src="/images/sky-soft-2560.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
          quality={92}
          style={{ filter: "saturate(1.06)" }}
        />
      </div>

      {/* A woven canvas grain, so the enlarged painting reads as a canvas rather than a photo. */}
      <div
        className="absolute inset-0 opacity-[0.09] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='c'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.15 0.95' numOctaves='2'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23c)'/%3E%3C/svg%3E\")",
          backgroundSize: "180px 180px",
        }}
      />

      {/* A veil of light: keeps the plum text readable over the darker cloud banks and lets the
          bright centre of the painting carry the page. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(75% 60% at 50% 18%, rgba(255,252,245,0.3) 0%, rgba(253,248,238,0.45) 45%, rgba(250,245,236,0.6) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(255,253,248,0.2) 0%, rgba(250,244,234,0.34) 55%, rgba(244,238,229,0.5) 100%)" }}
      />
    </div>
  );
}
