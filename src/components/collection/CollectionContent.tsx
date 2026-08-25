"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/shared/Container";
import PlaceholderArt from "@/components/shared/PlaceholderArt";
import ArtworkLightbox from "@/components/shared/ArtworkLightbox";
import { Artwork } from "@/content/types";

export default function CollectionContent({ artworks }: { artworks: Artwork[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 md:py-32 bg-ink min-h-screen">
      <Container>
        <span className="block text-xs tracking-widest uppercase text-smoke">Gallery</span>
        <h1 className="font-gothic text-4xl md:text-5xl text-bone mt-4 mb-14">
          Every original, in one place
        </h1>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {artworks.map((artwork, i) => (
            <div key={artwork.slug} className="group block">
              <button
                type="button"
                onClick={() => setOpenIndex(i)}
                className="relative aspect-[4/5] rounded-sm overflow-hidden w-full cursor-zoom-in"
                aria-label={`View "${artwork.title}" full size`}
              >
                {artwork.heroImage ? (
                  <Image
                    src={artwork.heroImage}
                    alt={artwork.heroImageAlt ?? artwork.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <PlaceholderArt
                    label={artwork.title}
                    accentColor={artwork.accentColor}
                    className="h-full w-full transition-transform duration-700 group-hover:scale-105"
                  />
                )}
              </button>
              <Link href={`/artworks/${artwork.slug}`} className="block mt-4">
                <h2 className="font-heading text-xl text-bone hover:text-bone/70 transition-colors">
                  {artwork.title}
                </h2>
                <p className="text-sm text-smoke mt-1">
                  {artwork.medium}
                  {artwork.year ? ` · ${artwork.year}` : ""}
                </p>
              </Link>
            </div>
          ))}
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
