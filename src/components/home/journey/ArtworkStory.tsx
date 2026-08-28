"use client";

import Image from "next/image";
import { motion, useReducedMotion, useTransform } from "framer-motion";
import { Artwork } from "@/content/types";
import { usePinnedScroll } from "@/lib/usePinnedScroll";

const PARTICLES = Array.from({ length: 24 }, (_, i) => {
  // Deterministic placement so server and client render identically.
  const seed = i * 137.5;
  return {
    x: (seed % 100),
    y: ((seed * 1.7) % 100),
    size: 1 + ((i * 13) % 3),
    delay: (i % 8) * 0.4,
  };
});

/** Entering the painting's world: a slow scale, drifting light, a single whispered line. */
export default function ArtworkStory({ artwork }: { artwork: Artwork }) {
  const reduceMotion = useReducedMotion();
  const { ref, progress } = usePinnedScroll();

  const imageScale = useTransform(progress, [0, 1], [1, 1.35]);
  const imageOpacity = useTransform(progress, [0, 0.15, 0.85, 1], [0, 0.55, 0.55, 0.3]);
  const vignette = useTransform(progress, [0, 0.5], [0.4, 0.85]);
  const textOpacity = useTransform(progress, [0.28, 0.45, 0.68, 0.85], [0, 1, 1, 0]);
  const textY = useTransform(progress, [0.28, 0.45], [22, 0]);
  const particlesOpacity = useTransform(progress, [0.1, 0.4, 0.9], [0, 0.6, 0]);

  if (reduceMotion) return null;

  return (
    <section ref={ref} className="relative h-[220vh] bg-ink">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {artwork.heroImage && (
          <motion.div className="absolute inset-0" style={{ scale: imageScale, opacity: imageOpacity }}>
            <Image
              src={artwork.heroImage}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
              style={{ filter: "saturate(1.1)" }}
            />
          </motion.div>
        )}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            opacity: vignette,
            background:
              "radial-gradient(circle at 50% 50%, rgba(3,3,3,0) 0%, rgba(3,3,3,0.75) 65%, rgba(3,3,3,0.98) 100%)",
          }}
        />

        <motion.div aria-hidden="true" className="absolute inset-0" style={{ opacity: particlesOpacity }}>
          {PARTICLES.map((p, i) => (
            <motion.span
              key={i}
              className="absolute rounded-full bg-accent-warm"
              style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
              animate={{ y: [0, -14, 0], opacity: [0.2, 0.7, 0.2] }}
              transition={{ duration: 6 + p.delay, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
            />
          ))}
        </motion.div>

        <div className="relative flex h-full items-center justify-center px-6 text-center">
          <motion.p
            style={{ opacity: textOpacity, y: textY }}
            className="max-w-xl font-heading italic text-2xl md:text-3xl text-bone"
          >
            Some things are easier
            <br />
            to paint than to say.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
