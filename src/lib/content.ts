import { artworks } from "@/content/artworks";
import { quotes } from "@/content/quotes";
import { Artwork, QuotePrint } from "@/content/types";

export function getAllArtworks(): Artwork[] {
  return [...artworks].sort((a, b) => a.order - b.order);
}

export function getArtworkBySlug(slug: string): Artwork | undefined {
  return artworks.find((a) => a.slug === slug);
}

export function getAllQuotes(): QuotePrint[] {
  return [...quotes].sort((a, b) => a.order - b.order);
}

export function getQuoteBySlug(slug: string): QuotePrint | undefined {
  return quotes.find((q) => q.slug === slug);
}
