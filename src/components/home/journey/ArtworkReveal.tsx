"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValueEvent, useReducedMotion, useTransform } from "framer-motion";
import { Artwork } from "@/content/types";
import { usePinnedScroll } from "@/lib/usePinnedScroll";

const SPECS_THRESHOLD = 0.78;

/** Scroll-controlled zoom-out: a macro detail pulls back into the full, floating canvas. */
export default function ArtworkReveal({ artwork }: { artwork: Artwork }) {
  const reduceMotion = useReducedMotion();
  const { ref, progress } = usePinnedScroll();
  const [showSpecs, setShowSpecs] = useState(reduceMotion ?? false);

  useMotionValueEvent(progress, "change", (v) => {
    if (v >= SPECS_THRESHOLD && !showSpecs) setShowSpecs(true);
    else if (v < SPECS_THRESHOLD - 0.05 && showSpecs) setShowSpecs(false);
  });

  const scale = useTransform(progress, [0, 0.55, 0.85], [1.7, 1, 0.6]);
  const radius = useTransform(progress, [0.6, 0.85], [0, 14]);
  const glowOpacity = useTransform(progress, [0.55, 0.85], [0, 0.5]);
  const bgDim = useTransform(progress, [0, 0.55], [0, 1]);
  const specsOpacity = useTransform(progress, [0.76, 0.92], [0, 1]);
  const specsY = useTransform(progress, [0.76, 0.92], [16, 0]);

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
    <section ref={ref} className="relative h-[320vh] bg-ink">
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-0 bg-ink" style={{ opacity: bgDim }} />
        <motion.div
          aria-hidden="true"
          className="absolute h-[70vmin] w-[70vmin] rounded-full blur-[140px]"
          style={{ opacity: glowOpacity, background: `radial-gradient(circle, ${artwork.accentColor}55, transparent 70%)` }}
        />
        {artwork.heroImage && (
          <motion.div
            className="relative aspect-[4/5] h-[80vh] max-w-[92vw] overflow-hidden"
            style={{ scale, borderRadius: radius }}
          >
            <Image
              src={artwork.heroImage}
              alt={artwork.heroImageAlt ?? artwork.title}
              fill
              priority
              sizes="90vw"
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
