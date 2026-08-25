"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Artwork } from "@/content/types";

const AUTOPLAY_MS = 6500;

function Panel({
  artwork,
  variant,
}: {
  artwork: Artwork;
  variant: "side" | "center";
}) {
  if (!artwork.heroImage) return null;
  return (
    <div className="relative h-full w-full overflow-hidden bg-ink">
      <Image
        src={artwork.heroImage}
        alt={variant === "center" ? artwork.heroImageAlt ?? artwork.title : ""}
        fill
        sizes={variant === "center" ? "70vw" : "16vw"}
        priority={variant === "center"}
        className={`scale-90 ${variant === "center" ? "object-contain" : "object-cover"}`}
      />
      {variant === "center" ? (
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent pointer-events-none" />
      ) : (
        <div className="absolute inset-0 bg-ink/60" />
      )}
    </div>
  );
}

export default function CinematicHero({ artworks }: { artworks: Artwork[] }) {
  const withImages = artworks.filter((a) => a.heroImage);
  const count = withImages.length;
  const [index, setIndex] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(false);
  const reduceMotion = useReducedMotion();

  const goTo = useCallback((i: number) => setIndex(((i % count) + count) % count), [count]);

  useEffect(() => {
    function onVisibility() {
      setHidden(document.hidden);
    }
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    if (hovering || hidden || reduceMotion || count < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [hovering, hidden, reduceMotion, count]);

  if (count === 0) return null;

  const active = withImages[index];
  const prevArtwork = withImages[(index - 1 + count) % count];
  const nextArtwork = withImages[(index + 1) % count];

  return (
    <section
      className="relative h-[92vh] min-h-[600px] bg-ink overflow-hidden"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      aria-roledescription="carousel"
      aria-label="Featured artworks"
    >
      <div className="absolute inset-0 flex items-stretch px-[1cm]">
        <div className="hidden md:block w-[15%] opacity-40">
          <Panel artwork={prevArtwork} variant="side" />
        </div>
        <div className="relative w-full md:w-[70%]">
          <motion.div
            key={active.slug}
            className="relative h-full w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <motion.div
              className="h-full w-full"
              initial={{ scale: 1 }}
              animate={reduceMotion ? { scale: 1 } : { scale: 1.015 }}
              transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
            >
              <Panel artwork={active} variant="center" />
            </motion.div>
          </motion.div>
        </div>
        <div className="hidden md:block w-[15%] opacity-40">
          <Panel artwork={nextArtwork} variant="side" />
        </div>
      </div>

      <div className="relative h-full flex flex-col items-center justify-center px-6 text-center pointer-events-none">
        <motion.span
          key={`label-${active.slug}`}
          className="text-xs tracking-[0.3em] uppercase text-smoke"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Original paintings
        </motion.span>
        <motion.h1
          className="mt-6 font-gothic text-5xl md:text-7xl text-bone"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Art by Urška
        </motion.h1>
        <motion.p
          className="mt-5 max-w-md font-heading italic text-lg text-bone/80"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Some things are easier to paint than to say.
        </motion.p>
      </div>

      <div
        aria-live="polite"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 md:left-auto md:right-[17%] md:translate-x-0 pointer-events-auto"
      >
        <Link
          href={`/artworks/${active.slug}`}
          className="text-xs tracking-widest uppercase text-bone/80 hover:text-bone transition-colors border-b border-bone/40 pb-1"
        >
          {active.title} →
        </Link>
      </div>

      {count > 1 && (
        <>
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label="Previous artwork"
            className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 text-bone/70 hover:text-bone transition-colors"
          >
            <ChevronLeft size={28} strokeWidth={1.25} />
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label="Next artwork"
            className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 text-bone/70 hover:text-bone transition-colors"
          >
            <ChevronRight size={28} strokeWidth={1.25} />
          </button>
        </>
      )}
    </section>
  );
}
