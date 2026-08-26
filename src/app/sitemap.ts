import type { MetadataRoute } from "next";
import { getAllArtworks, getAllQuotes } from "@/lib/content";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const STATIC_ROUTES = [
  "",
  "/collection",
  "/about",
  "/contact",
  "/poetry",
  "/spirituality",
  "/climb",
  "/legal/terms",
  "/legal/privacy",
  "/legal/cookies",
  "/legal/shipping",
  "/legal/returns",
  "/legal/notice",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));

  const artworkEntries: MetadataRoute.Sitemap = getAllArtworks().map((artwork) => ({
    url: `${SITE_URL}/artworks/${artwork.slug}`,
    lastModified: new Date(),
  }));

  const quoteEntries: MetadataRoute.Sitemap = getAllQuotes().map((quote) => ({
    url: `${SITE_URL}/poetry/${quote.slug}`,
    lastModified: new Date(),
  }));

  return [...staticEntries, ...artworkEntries, ...quoteEntries];
}
