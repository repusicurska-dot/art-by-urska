"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useTransform } from "framer-motion";
import { Artwork } from "@/content/types";
import { usePinnedScroll } from "@/lib/usePinnedScroll";

/** The quote's words assemble themselves out of the dark, then give way to the piece they came from. */
export default function PoetryExperience({ artwork }: { artwork: Artwork }) {
  const reduceMotion = useReducedMotion();
  const { ref, progress } = usePinnedScroll();
  const words = useMemo(() => artwork.quote.split(" "), [artwork.quote]);

  const sentenceOpacity = useTransform(progress, [0.62, 0.72], [1, 0]);
  const imageOpacity = useTransform(progress, [0.55, 0.85], [0, 0.45]);
  const imageScale = useTransform(progress, [0.55, 1], [1.1, 1]);
  const ctaOpacity = useTransform(progress, [0.8, 1], [0, 1]);
  const ctaY = useTransform(progress, [0.8, 1], [14, 0]);

  if (reduceMotion) {
    return (
      <section className="bg-ink py-28 text-center">
        <div className="mx-auto max-w-2xl px-6">
          <p className="font-heading italic text-2xl md:text-3xl text-bone">{artwork.quote}</p>
          <Link
            href="/poetry"
            className="mt-8 inline-block border-b border-bone/40 pb-1 text-xs tracking-widest uppercase text-bone/85 hover:text-bone"
          >
            Explore poetry →
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative h-[240vh] bg-ink">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {artwork.heroImage && (
          <motion.div className="absolute inset-0" style={{ opacity: imageOpacity, scale: imageScale }}>
            <Image src={artwork.heroImage} alt="" fill sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-ink/40" />
          </motion.div>
        )}

        <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
          <motion.p
            style={{ opacity: sentenceOpacity }}
            className="max-w-3xl font-heading text-2xl md:text-4xl leading-relaxed text-bone"
          >
            {words.map((word, i) => (
              <RevealWord key={i} index={i} total={words.length} progress={progress}>
                {word}
              </RevealWord>
            ))}
          </motion.p>

          <motion.div style={{ opacity: ctaOpacity, y: ctaY }}>
            <Link
              href="/poetry"
              className="mt-10 inline-block border-b border-bone/40 pb-1 text-xs tracking-widest uppercase text-bone/85 transition-colors hover:text-bone hover:border-bone"
            >
              Explore poetry →
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function RevealWord({
  children,
  index,
  total,
  progress,
}: {
  children: string;
  index: number;
  total: number;
  progress: ReturnType<typeof usePinnedScroll>["progress"];
}) {
  const start = 0.08 + (index / total) * 0.42;
  const end = start + 0.12;
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const y = useTransform(progress, [start, end], [18, 0]);
  const blur = useTransform(progress, [start, end], [6, 0]);

  return (
    <motion.span
      style={{ opacity, y, filter: useTransform(blur, (v) => `blur(${v}px)`) }}
      className="mr-[0.3em] inline-block"
    >
      {children}
    </motion.span>
  );
}
