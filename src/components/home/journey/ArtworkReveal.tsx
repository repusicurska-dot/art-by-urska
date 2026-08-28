"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValueEvent, useReducedMotion, useTransform } from "framer-motion";
import { Artwork } from "@/content/types";
import { usePinnedScroll } from "@/lib/usePinnedScroll";

const SPECS_THRESHOLD = 0.7;

/**
 * Scroll-controlled reveal: plain dark space with a soft accent glow, while the painting
 * arrives as its own floating canvas — kept as a separate, bounded layer so it's never scaled
 * past the viewport edge (which previously read as "everything's too zoomed in").
 */
export default function ArtworkReveal({ artwork }: { artwork: Artwork }) {
  const reduceMotion = useReducedMotion();
  const { ref, progress } = usePinnedScroll();
  const [showSpecs, setShowSpecs] = useState(reduceMotion ?? false);

  useMotionValueEvent(progress, "change", (v) => {
    if (v >= SPECS_THRESHOLD && !showSpecs) setShowSpecs(true);
    else if (v < SPECS_THRESHOLD - 0.05 && showSpecs) setShowSpecs(false);
  });

  const cardOpacity = useTransform(progress, [0, 0.18], [0, 1]);
  const cardScale = useTransform(progress, [0, 0.28, 0.7], [0.86, 1, 0.66]);
  const radius = useTransform(progress, [0.5, 0.75], [4, 14]);
  const glowOpacity = useTransform(progress, [0, 0.3, 0.75], [0.15, 0.5, 0.5]);
  const specsOpacity = useTransform(progress, [0.68, 0.85], [0, 1]);
  const specsY = useTransform(progress, [0.68, 0.85], [16, 0]);

  const meta = [artwork.year, artwork.dimensions, artwork.medium].filter(Boolean).join("  ·  ");

  if (reduceMotion) {
    return (
      <div className="bg-ink py-24">
        <div className="mx-auto max-w-2xl px-6">
          {artwork.heroImage && (
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md shadow-[0_40px_120px_-30px_rgba(0,0,0,0.7)]">
              <Image src={artwork.heroImage} alt={artwork.heroImageAlt ?? artwork.title} fill className="object-cover" sizes="90vw" />
            </div>
          )}
          <ArtworkCaption artwork={artwork} meta={meta} />
        </div>
      </div>
    );
  }

  return (
    <section ref={ref} className="relative h-[150vh] md:h-[230vh] bg-ink">
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        <motion.div
          aria-hidden="true"
          className="absolute h-[70vmin] w-[70vmin] rounded-full blur-[140px]"
          style={{ opacity: glowOpacity, background: `radial-gradient(circle, ${artwork.accentColor}55, transparent 70%)` }}
        />

        {artwork.heroImage && (
          <motion.div
            className="relative aspect-[4/5] h-[72vh] max-h-[600px] w-auto max-w-[88vw] overflow-hidden shadow-[0_40px_120px_-30px_rgba(0,0,0,0.7)]"
            style={{ opacity: cardOpacity, scale: cardScale, borderRadius: radius }}
          >
            <Image
              src={artwork.heroImage}
              alt={artwork.heroImageAlt ?? artwork.title}
              fill
              priority
              sizes="80vw"
              className="object-cover"
            />
          </motion.div>
        )}

        {showSpecs && (
          <motion.div
            style={{ opacity: specsOpacity, y: specsY }}
            className="pointer-events-auto absolute inset-x-0 bottom-12 flex flex-col items-center gap-2 px-6 text-center"
          >
            <ArtworkCaption artwork={artwork} meta={meta} />
          </motion.div>
        )}
      </div>
    </section>
  );
}

function ArtworkCaption({ artwork, meta }: { artwork: Artwork; meta: string }) {
  return (
    <>
      <span className="text-[11px] tracking-[0.3em] uppercase text-smoke">Original painting</span>
      <h2 className="mt-3 font-gothic text-3xl md:text-5xl text-bone">{artwork.title}</h2>
      {meta && <p className="mt-3 text-sm text-bone/70">{meta}</p>}
      <Link
        href={`/artworks/${artwork.slug}`}
        className="mt-6 inline-block border-b border-bone/40 pb-1 text-xs tracking-widest uppercase text-bone/85 transition-colors hover:text-bone hover:border-bone"
      >
        Enter the story →
      </Link>
    </>
  );
}
