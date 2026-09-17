"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/shared/Container";
import PlaceholderArt from "@/components/shared/PlaceholderArt";
import ArtworkLightbox from "@/components/shared/ArtworkLightbox";
import { Artwork } from "@/content/types";
import { useLanguage } from "@/i18n/LanguageProvider";

const AVAILABILITY_DOT: Record<Artwork["availability"], string> = {
  available: "#7fae8b",
  reserved: "#c5aa82",
  sold: "#8f8d88",
  inquire: "#afc4d6",
};

export default function CollectionContent({ artworks }: { artworks: Artwork[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { t } = useLanguage();

  return (
    <section className="px-2 pt-20 pb-20 md:pt-28 md:pb-28">
      <Container>
        {/* The room's title wall: one line of context, then the works themselves. */}
        <div className="max-w-2xl">
          <span className="block text-xs tracking-[0.35em] uppercase text-accent-warm">{t.collection.eyebrow}</span>
          <h1 className="font-gothic text-4xl md:text-6xl text-bone mt-5 leading-[1.05]">{t.collection.title}</h1>
          <p className="mt-6 text-lg leading-relaxed text-bone/75">{t.collection.intro}</p>
          <p className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs tracking-widest uppercase text-smoke">
            <span>
              {artworks.length} {t.collection.originals}
            </span>
            <span aria-hidden="true">·</span>
            <span>{t.collection.oneOfEach}</span>
            <span aria-hidden="true">·</span>
            <span>{t.collection.shippedWorldwide}</span>
          </p>
          <span aria-hidden="true" className="mt-10 block h-px w-24 bg-gradient-to-r from-accent-warm/70 to-transparent" />
        </div>

        <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3 md:mt-16 md:gap-9">
          {artworks.map((artwork, i) => {
            const status = { label: t.collection[artwork.availability], dot: AVAILABILITY_DOT[artwork.availability] };
            return (
              <article key={artwork.slug} className="art-card group flex flex-col rounded-2xl p-3 md:p-4">
                <button
                  type="button"
                  onClick={() => setOpenIndex(i)}
                  className="relative aspect-[4/5] w-full cursor-zoom-in overflow-hidden rounded-xl"
                  aria-label={`${artwork.title} — ${t.collection.viewFullSize}`}
                >
                  {artwork.heroImage ? (
                    <Image
                      src={artwork.heroImage}
                      alt={artwork.heroImageAlt ?? artwork.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                    />
                  ) : (
                    <PlaceholderArt
                      label={artwork.title}
                      accentColor={artwork.accentColor}
                      className="h-full w-full transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                    />
                  )}
                  {/* A whisper of the piece's own colour, so each frame feels lit from within. */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                    style={{ background: `radial-gradient(75% 55% at 50% 100%, ${artwork.accentColor}33, transparent 70%)` }}
                  />
                  <span className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-ink/70 px-3 py-1 text-[10px] tracking-widest uppercase text-bone opacity-0 backdrop-blur-sm transition-opacity duration-500 group-hover:opacity-100">
                    {t.collection.viewFullSize}
                  </span>
                </button>

                <div className="flex flex-1 flex-col px-1 pt-5 pb-1">
                  <Link href={`/artworks/${artwork.slug}`} className="block">
                    <h2 className="font-heading text-2xl leading-tight text-bone transition-colors group-hover:text-accent-warm">
                      {artwork.title}
                    </h2>
                  </Link>
                  {artwork.quote && <p className="mt-2 font-heading italic text-sm text-bone/60">“{artwork.quote}”</p>}

                  <div className="mt-auto flex items-end justify-between gap-3 pt-5">
                    <p className="text-xs tracking-widest uppercase text-smoke">
                      {artwork.medium}
                      {artwork.year ? ` · ${artwork.year}` : ""}
                      {artwork.dimensions ? ` · ${artwork.dimensions}` : ""}
                    </p>
                    <span className="flex shrink-0 items-center gap-1.5 text-[10px] tracking-widest uppercase text-bone/70">
                      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full" style={{ background: status.dot }} />
                      {status.label}
                    </span>
                  </div>

                  <Link
                    href={`/artworks/${artwork.slug}`}
                    className="mt-4 inline-flex items-center gap-2 border-t border-bone/10 pt-4 text-xs tracking-widest uppercase text-bone/70 transition-colors hover:text-accent-warm"
                  >
                    {t.collection.readStory}
                    <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </Container>

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
