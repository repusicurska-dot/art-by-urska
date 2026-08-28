import Link from "next/link";
import { Artwork } from "@/content/types";
import StoryHero from "./StoryHero";
import StorySection from "./StorySection";
import DetailImages from "./DetailImages";
import ArtworkSpecs from "./ArtworkSpecs";
import PriceReveal from "./PriceReveal";

export default function ArtworkStory({ artwork }: { artwork: Artwork }) {
  return (
    <article>
      <StoryHero artwork={artwork} />
      {artwork.storyBeats.map((beat, index) => (
        <StorySection
          key={index}
          beat={beat}
          index={index}
          accentColor={artwork.accentColor}
          artworkTitle={artwork.title}
          image={beat.image ?? artwork.heroImage}
          imageAlt={beat.imageAlt ?? artwork.heroImageAlt}
        />
      ))}
      {artwork.artistNote && (
        <section className="py-12 md:py-16 bg-midnight">
          <div className="mx-auto max-w-2xl px-6 text-center">
            <span className="block text-xs tracking-widest uppercase text-gold-400 mb-4">
              Artist&rsquo;s note
            </span>
            <p className="font-heading italic text-xl md:text-2xl text-ivory/90 leading-relaxed">
              {artwork.artistNote}
            </p>
            <Link
              href="/spirituality"
              className="inline-block mt-8 text-xs tracking-widest uppercase text-ivory/60 hover:text-gold-400 transition-colors border-b border-ivory/20 pb-1"
            >
              More on the soul behind the work →
            </Link>
          </div>
        </section>
      )}
      <DetailImages images={artwork.detailImages} />
      <ArtworkSpecs artwork={artwork} />
      <div className="border-t border-bone/10">
        <PriceReveal artwork={artwork} />
      </div>
    </article>
  );
}
