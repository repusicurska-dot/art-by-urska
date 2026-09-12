import type { MetadataRoute } from "next";
import { getAllArtworks } from "@/lib/content";

import { getSiteUrl } from "@/lib/siteUrl";

const SITE_URL = getSiteUrl();

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

  return [...staticEntries, ...artworkEntries];
}
