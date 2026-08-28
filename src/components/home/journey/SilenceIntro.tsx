"use client";

import Image from "next/image";
import { motion, useReducedMotion, useTransform } from "framer-motion";
import { Artwork } from "@/content/types";
import { usePinnedScroll } from "@/lib/usePinnedScroll";

/** Opening chapter: near-black viewport, a whispered line, then the faintest hint of texture. */
export default function SilenceIntro({ artwork }: { artwork: Artwork }) {
  const reduceMotion = useReducedMotion();
  const { ref, progress } = usePinnedScroll();

  const textOpacity = useTransform(progress, [0, 0.18, 0.42], [0, 1, 0]);
  const textSpacing = useTransform(progress, [0, 0.42], [0, 10]);
  const textSpacingPx = useTransform(textSpacing, (v) => `${v}px`);
  const textY = useTransform(progress, [0, 0.42], [0, -18]);
  const textureOpacity = useTransform(progress, [0, 0.3, 1], [0.05, 0.16, 0.4]);
  const textureScale = useTransform(progress, [0, 1], [1.15, 1.35]);
  const hintOpacity = useTransform(progress, [0, 0.12, 0.3], [1, 1, 0]);

  if (reduceMotion) {
    return (
      <section className="relative flex min-h-[80vh] items-center justify-center bg-ink px-6 py-24 text-center">
        <p className="font-heading italic text-2xl text-bone/90">
          Before every painting,
          <br />
          there is silence.
        </p>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative h-[180vh] bg-ink">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {artwork.heroImage && (
          <motion.div className="absolute inset-0" style={{ opacity: textureOpacity, scale: textureScale }}>
            <Image
              src={artwork.heroImage}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
              style={{ filter: "grayscale(0.4) contrast(1.15) blur(1px)" }}
            />
          </motion.div>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/70 to-ink" />

        <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
          <motion.p
            style={{ opacity: textOpacity, y: textY, letterSpacing: textSpacingPx }}
            className="font-heading italic text-2xl md:text-4xl text-bone"
          >
            Before every painting,
            <br />
            there is silence.
          </motion.p>
        </div>

        <motion.div
          style={{ opacity: hintOpacity }}
          className="absolute inset-x-0 bottom-10 flex flex-col items-center gap-3 text-bone/60"
        >
          <span className="text-[11px] tracking-[0.3em] uppercase">Scroll to enter</span>
          <motion.span
            className="h-8 w-px bg-bone/40"
            animate={{ scaleY: [0.3, 1, 0.3] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "top" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
