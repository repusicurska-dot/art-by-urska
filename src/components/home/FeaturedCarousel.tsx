"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { Artwork } from "@/content/types";
import Container from "@/components/shared/Container";
import ArtworkLightbox from "@/components/shared/ArtworkLightbox";
import { fadeInUp } from "@/lib/motion";

export default function FeaturedCarousel({ artworks }: { artworks: Artwork[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function scrollByCard(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 24 : track.clientWidth * 0.8;
    track.scrollBy({ left: direction * step, behavior: "smooth" });
  }

  function onScroll() {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 24 : 1;
    setActiveIndex(Math.round(track.scrollLeft / step));
  }

  return (
    <section className="py-24 md:py-32 bg-ink">
      <Container>
        <motion.h2
          className="font-gothic text-4xl md:text-5xl text-bone text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          variants={fadeInUp}
        >
          Most Coveted
        </motion.h2>
      </Container>

      <div className="relative mt-14 px-6 md:px-10 lg:px-16">
        <div
          ref={trackRef}
          onScroll={onScroll}
          role="region"
          aria-label="Most coveted artworks"
          tabIndex={0}
          className="flex gap-6 lg:gap-10 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {artworks.map((artwork, i) => (
            <button
              key={artwork.slug}
              type="button"
              onClick={() => setOpenIndex(i)}
              data-card
              className="group shrink-0 lg:shrink lg:flex-1 snap-start text-left w-[60%] sm:w-[33%]"
            >
              <div className="relative aspect-[4/5] rounded-[20px] overflow-hidden bg-bone/95 cursor-zoom-in">
                {artwork.heroImage ? (
                  <Image
                    src={artwork.heroImage}
                    alt={artwork.heroImageAlt ?? artwork.title}
                    fill
                    sizes="(min-width: 1024px) 18vw, (min-width: 640px) 33vw, 60vw"
                    className="object-contain p-4 transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                ) : null}
                <span
                  role="button"
                  tabIndex={-1}
                  aria-label={`Save ${artwork.title} to favorites`}
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-4 right-4 h-9 w-9 rounded-full bg-ink/80 text-bone flex items-center justify-center hover:bg-ink transition-colors"
                >
                  <Heart size={16} strokeWidth={1.5} />
                </span>
              </div>
              <h3 className="mt-5 font-heading text-lg text-bone">{artwork.title}</h3>
              <p className="mt-1 text-sm text-bone">
                {artwork.price.toLocaleString("en-IE")} €
                {!artwork.priceConfirmed && <span className="text-smoke"> · provisional</span>}
              </p>
              <p className="mt-1 text-xs text-smoke">
                {artwork.availability === "available" ? "In stock" : "Inquire for availability"}
              </p>
              <span className="inline-block mt-3 text-xs tracking-widest uppercase text-bone/80 border-b border-bone/0 group-hover:border-bone/60 transition-colors">
                View This Piece
              </span>
            </button>
          ))}
        </div>

        <div className="flex items-center justify-center gap-6 mt-8">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            aria-label="Previous"
            className="text-bone/70 hover:text-bone transition-colors"
          >
            <ChevronLeft size={22} strokeWidth={1.25} />
          </button>
          <div className="flex items-center gap-2">
            {artworks.map((artwork, i) => (
              <span
                key={artwork.slug}
                className={`h-1.5 w-1.5 rounded-full transition-colors ${
                  i === activeIndex ? "bg-bone" : "bg-bone/25"
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            aria-label="Next"
            className="text-bone/70 hover:text-bone transition-colors"
          >
            <ChevronRight size={22} strokeWidth={1.25} />
          </button>
        </div>
      </div>

      {openIndex !== null && (
        <ArtworkLightbox
          artworks={artworks}
          index={openIndex}
          onIndexChange={setOpenIndex}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </section>
  );
}
