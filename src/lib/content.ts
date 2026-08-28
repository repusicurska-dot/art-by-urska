import { artworks } from "@/content/artworks";
import { Artwork } from "@/content/types";

export function getAllArtworks(): Artwork[] {
  return [...artworks].sort((a, b) => a.order - b.order);
}

export function getArtworkBySlug(slug: string): Artwork | undefined {
  return artworks.find((a) => a.slug === slug);
}
