import Image from "next/image";

/**
 * The site's sky: Urška's painted clouds with the light breaking through, fixed behind every
 * page. The source is 512×512, so it is deliberately scaled up, softened and veiled — at that
 * treatment it reads as a painted atmosphere rather than a photograph, and the text above it
 * keeps its contrast. Swap `/images/sky.jpg` for a larger file and it sharpens by itself.
 */
export default function SkyBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="ambient-motion sky-drift absolute inset-[-6%]">
        <Image
          src="/images/sky.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ filter: "blur(1px) saturate(1.08)" }}
        />
      </div>

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
