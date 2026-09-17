import { artworks } from "@/content/artworks";
import type { PoetryLetter } from "@/content/poetry";

/** One letter in one language, with its painting resolved — what the pages render. */
export interface LetterView {
  id: string;
  title: string;
  body: string;
  artwork: { slug: string; title: string; image: string } | null;
}

export function letterView(letter: PoetryLetter, lang: "sl" | "en"): LetterView {
  const artwork = letter.artworkSlug ? artworks.find((a) => a.slug === letter.artworkSlug) : undefined;
  return {
    id: letter.id,
    title: letter.title[lang],
    body: letter.body[lang],
    artwork: artwork?.heroImage ? { slug: artwork.slug, title: artwork.title, image: artwork.heroImage } : null,
  };
}
