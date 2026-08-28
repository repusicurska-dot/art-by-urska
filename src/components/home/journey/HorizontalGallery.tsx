"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { Artwork } from "@/content/types";
import CustomCursor from "./CustomCursor";

const CARD_WIDTHS = ["42vw", "34vw", "46vw", "36vw", "40vw"];

function GalleryCard({
  artwork,
  index,
  onHover,
}: {
  artwork: Artwork;
  index: number;
  onHover: (hovering: boolean) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty("--ry", `${px * 6}deg`);
    el.style.setProperty("--rx", `${-py * 6}deg`);
  }

  function onMouseLeave() {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--rx", "0deg");
    onHover(false);
  }

  return (
    <div
      className="group shrink-0"
      style={{ width: CARD_WIDTHS[index % CARD_WIDTHS.length], perspective: "1200px" }}
    >
      <Link
        href={`/artworks/${artwork.slug}`}
        aria-label={`View ${artwork.title}`}
        onMouseEnter={() => onHover(true)}
        onMouseLeave={onMouseLeave}
      >
        <div
          ref={cardRef}
          onMouseMove={onMouseMove}
          className="relative aspect-[4/5] w-full overflow-hidden bg-raised transition-transform duration-300 ease-out"
          style={{
            transform: "rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))",
            transformStyle: "preserve-3d",
          }}
        >
          {artwork.heroImage && (
            <Image
              src={artwork.heroImage}
              alt={artwork.heroImageAlt ?? artwork.title}
              fill
              sizes="45vw"
              className="object-contain p-6 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
          )}
        </div>
        <div className="mt-5">
          <span className="text-xs tracking-widest text-smoke">{String(index + 1).padStart(2, "0")}</span>
          <h3 className="mt-1 font-heading text-xl text-bone">{artwork.title}</h3>
          <p className="mt-1 text-xs text-smoke">
            {[artwork.year, artwork.dimensions].filter(Boolean).join(" · ")}
          </p>
        </div>
        <span className="mt-3 inline-block border-b border-bone/0 pb-1 text-[11px] tracking-widest uppercase text-bone/70 transition-colors group-hover:border-bone/50 group-hover:text-bone">
          View artwork
        </span>
      </Link>
    </div>
  );
}

export default function HorizontalGallery({ artworks }: { artworks: Artwork[] }) {
  const reduceMotion = useReducedMotion();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxScroll, setMaxScroll] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [cursorActive, setCursorActive] = useState(false);
  const count = artworks.length;

  const { scrollYProgress } = useScroll({ target: wrapperRef, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 260, damping: 40, mass: 0.2 });
  const x = useTransform(progress, [0, 1], [0, -maxScroll]);

  useEffect(() => {
    function measure() {
      if (!trackRef.current) return;
      setMaxScroll(Math.max(0, trackRef.current.scrollWidth - window.innerWidth));
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useMotionValueEvent(progress, "change", (v) => {
    setActiveIndex(Math.min(count - 1, Math.max(0, Math.round(v * (count - 1)))));
  });

  const active = artworks[activeIndex];

  if (reduceMotion) {
    return (
      <section className="bg-ink py-24">
        <GalleryMobile artworks={artworks} />
      </section>
    );
  }

  return (
    <section className="bg-ink">
      {/* Desktop: scroll-linked horizontal track inside a pinned viewport. */}
      <div ref={wrapperRef} className="relative hidden md:block" style={{ height: `${100 * count}vh` }}>
        <div className="sticky top-0 flex h-screen w-full flex-col justify-center overflow-hidden">
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 -z-10"
            animate={{ background: `radial-gradient(circle at 30% 50%, ${active?.accentColor ?? "#111"}22, transparent 60%)` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
          <div className="px-6 pb-10 md:px-16">
            <span className="text-xs tracking-[0.3em] uppercase text-smoke">The collection</span>
          </div>
          <motion.div ref={trackRef} className="flex gap-12 px-6 md:px-16" style={{ x }}>
            {artworks.map((artwork, i) => (
              <GalleryCard key={artwork.slug} artwork={artwork} index={i} onHover={setCursorActive} />
            ))}
          </motion.div>
          <div className="pointer-events-none absolute bottom-10 right-10 text-xs tracking-widest text-smoke">
            {String(activeIndex + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </div>
        </div>
      </div>

      {/* Mobile: natural swipe with scroll-snap, no scroll-jacking. */}
      <div className="md:hidden py-20">
        <div className="px-6 pb-8">
          <span className="text-xs tracking-[0.3em] uppercase text-smoke">The collection</span>
        </div>
        <GalleryMobile artworks={artworks} />
      </div>

      <CustomCursor active={cursorActive} />
    </section>
  );
}

function GalleryMobile({ artworks }: { artworks: Artwork[] }) {
  return (
    <div
      className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      style={{ scrollPaddingLeft: "1.5rem", scrollPaddingRight: "1.5rem" }}
    >
      {artworks.map((artwork, i) => (
        <Link
          key={artwork.slug}
          href={`/artworks/${artwork.slug}`}
          className="w-[82%] shrink-0 snap-start"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-raised">
            {artwork.heroImage && (
              <Image
                src={artwork.heroImage}
                alt={artwork.heroImageAlt ?? artwork.title}
                fill
                sizes="82vw"
                className="object-contain p-5"
              />
            )}
          </div>
          <div className="mt-4">
            <span className="text-xs tracking-widest text-smoke">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="mt-1 font-heading text-lg text-bone">{artwork.title}</h3>
            <p className="mt-1 text-xs text-smoke">{[artwork.year, artwork.dimensions].filter(Boolean).join(" · ")}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
