/**
 * The site's own absolute base URL, resolved once for everything that has to hand
 * out a real link: canonical tags, Open Graph images, the sitemap, robots.txt, and
 * Stripe's success/cancel redirects.
 *
 * This used to fall straight back to http://localhost:3000 when NEXT_PUBLIC_SITE_URL
 * wasn't set, which is what production was actually doing: every canonical pointed at
 * localhost, the sitemap listed localhost URLs, share previews had no image, and — the
 * expensive one — a customer who paid on Stripe was redirected to localhost afterwards.
 * The production domain is now the fallback, so the site is correct whether or not the
 * env var is ever set, and local development still gets localhost.
 */
const PRODUCTION_URL = "https://byurska.com";

export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/+$/, "");

  // Vercel injects this into every deployment of the project, production or preview.
  const vercelProduction = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercelProduction) return `https://${vercelProduction}`;

  if (process.env.NODE_ENV === "production") return PRODUCTION_URL;
  return "http://localhost:3000";
}
