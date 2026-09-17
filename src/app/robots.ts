import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/siteUrl";

const SITE_URL = getSiteUrl();

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/cart", "/checkout", "/order-confirmation", "/api/", "/rezervacija/", "/odjava", "/zvezdni-koledar/moj", "/zvezdni-koledar/prijava"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
