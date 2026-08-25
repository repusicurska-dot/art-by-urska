"use client";

import { useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Artwork } from "@/content/types";
import PlaceholderArt from "@/components/shared/PlaceholderArt";

export default function ArtworkLightbox({
  artworks,
  index,
  onIndexChange,
  onClose,
}: {
  artworks: Artwork[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const artwork = artworks[index];
  const count = artworks.length;

  const goPrev = useCallback(
    () => onIndexChange((index - 1 + count) % count),
    [index, count, onIndexChange]
  );
  const goNext = useCallback(() => onIndexChange((index + 1) % count), [index, count, onIndexChange]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose, goPrev, goNext]);

  // Prefetch adjacent images so prev/next feels instant.
  const prevSrc = artworks[(index - 1 + count) % count]?.heroImage;
  const nextSrc = artworks[(index + 1) % count]?.heroImage;

  if (!artwork) return null;

  // Split the poem into two halves (by stanza): the opening sits top-left,
  // the close sits bottom-right, diagonally framing the artwork.
  const poem = artwork.storyBeats[0]?.text ?? artwork.quote ?? "";
  const stanzas = poem.split(/\n\n+/);
  const mid = Math.ceil(stanzas.length / 2);
  const openingText = stanzas.slice(0, mid).join("\n\n");
  const closingText = stanzas.slice(mid).join("\n\n");

  const textMotion = (delay: number) => ({
    initial: { opacity: 0, y: reduceMotion ? 0 : 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : delay, ease: "easeOut" as const },
  });

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`${artwork.title} — full view`}
      className="fixed inset-0 z-[200] bg-ink/80 flex items-center justify-center p-4 md:p-10 overflow-y-auto"
      initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
      animate={{ opacity: 1, backdropFilter: reduceMotion ? "blur(0px)" : "blur(14px)" }}
      transition={{ duration: reduceMotion ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {prevSrc && <link rel="prefetch" as="image" href={prevSrc} />}
      {nextSrc && <link rel="prefetch" as="image" href={nextSrc} />}

      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-5 right-5 md:top-8 md:right-8 text-bone/80 hover:text-bone transition-colors z-20"
      >
        <X size={26} strokeWidth={1.5} />
      </button>

      {count > 1 && (
        <>
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous artwork"
            className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 text-bone/70 hover:text-bone transition-colors z-20"
          >
            <ChevronLeft size={30} strokeWidth={1.25} />
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next artwork"
            className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 text-bone/70 hover:text-bone transition-colors z-20"
          >
            <ChevronRight size={30} strokeWidth={1.25} />
          </button>
        </>
      )}

      <div
        key={artwork.slug}
        className="w-full max-w-7xl my-auto grid md:grid-cols-[1fr_1.4fr_1fr] gap-6 md:gap-8 items-center md:items-stretch py-16 md:py-10"
      >
        <div className="order-2 md:order-1 flex md:flex-col md:justify-start">
          {openingText && (
            <motion.p
              {...textMotion(0.25)}
              className="font-heading italic text-lg md:text-xl leading-snug text-bone whitespace-pre-line text-center md:text-left"
            >
              {openingText}
            </motion.p>
          )}
        </div>

        <div className="order-1 md:order-2 flex flex-col items-center">
          <motion.h2
            {...textMotion(0.05)}
            className="mb-4 font-heading text-xl md:text-2xl text-bone text-center"
          >
            {artwork.title}
          </motion.h2>
          <motion.div
            className="relative w-full max-w-lg mx-auto md:max-w-none aspect-[4/5] md:h-[80vh] shadow-[0_40px_120px_-20px_rgba(0,0,0,0.7)] bg-ink"
            initial={{
              opacity: 0,
              scale: reduceMotion ? 1 : 0.85,
              y: reduceMotion ? 0 : 28,
              filter: reduceMotion ? "blur(0px)" : "blur(10px)",
            }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { type: "spring", stiffness: 220, damping: 24, delay: 0.1 }
            }
          >
            {artwork.heroImage ? (
              <Image
                src={artwork.heroImage}
                alt={artwork.heroImageAlt ?? artwork.title}
                fill
                sizes="(min-width: 768px) 45vw, 90vw"
                className="object-contain rounded-sm"
                priority
              />
            ) : (
              <PlaceholderArt label={artwork.title} accentColor={artwork.accentColor} className="h-full w-full rounded-sm" />
            )}
          </motion.div>
        </div>

        <div className="order-3 flex md:flex-col md:justify-end text-center md:text-right">
          {closingText && (
            <motion.p
              {...textMotion(0.4)}
              className="font-heading italic text-lg md:text-xl leading-snug text-bone whitespace-pre-line"
            >
              {closingText}
            </motion.p>
          )}
          <motion.div {...textMotion(0.55)}>
            <span
              className="inline-block mt-6 text-xs tracking-widest uppercase px-3 py-1 rounded-full border"
              style={{ color: artwork.accentColor, borderColor: `${artwork.accentColor}90` }}
            >
              {artwork.editionType === "original" ? "Original artwork" : "Edition"}
            </span>
            <Link
              href={`/artworks/${artwork.slug}`}
              className="inline-block mt-6 text-xs tracking-widest uppercase text-bone/80 hover:text-bone transition-colors border-b border-bone/40 pb-1"
            >
              Discover the full story →
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
