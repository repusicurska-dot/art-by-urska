import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ArtworkStory from "@/components/story/ArtworkStory";
import { getAllArtworks, getArtworkBySlug } from "@/lib/content";
import StructuredData from "@/components/seo/StructuredData";
import { productJsonLd } from "@/lib/structuredData";

export function generateStaticParams() {
  return getAllArtworks().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const artwork = getArtworkBySlug(slug);
  if (!artwork) return {};

  return {
    title: `${artwork.title} — Art by Urška`,
    description: artwork.shortIntro,
    alternates: { canonical: `/artworks/${artwork.slug}` },
    openGraph: {
      title: artwork.title,
      description: artwork.shortIntro,
      images: artwork.heroImage ? [{ url: artwork.heroImage }] : undefined,
      type: "website",
    },
  };
}

export default async function ArtworkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const artwork = getArtworkBySlug(slug);
  if (!artwork) notFound();

  return (
    // Same warm graphite ground as the collection, so a painting's own page doesn't drop
    // back into flat black (see .art-ground in globals.css).
    <div className="art-ground relative">
      <StructuredData data={productJsonLd(artwork)} />
      <ArtworkStory artwork={artwork} />
    </div>
  );
}
