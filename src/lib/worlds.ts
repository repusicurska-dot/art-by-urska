/**
 * byurska.com is Urška's own home, with five worlds of her life beneath it (Teo, 2026-09-21):
 * art, poetry, spirituality, climbing and finance. The home page is about her; each world has
 * its own emblem, its own name ("… by Urška") and its own way of drawing the logo on arrival.
 *
 * Finance has its own page here, like the others: how Urška learned the markets on My Edge
 * Official, with the way through to it.
 */

export type World = "art" | "poetry" | "spirituality" | "climb" | "finance";

/** Where a page belongs: one of the five worlds, or Urška's own home. */
export type Place = World | "home";

/** My Edge Official's About page — who they are, rather than the Sentinel front page. */
export const FINANCE_URL = "https://www.myedgeofficial.com/about";

export const WORLDS: { key: World; href: string; external?: boolean }[] = [
  { key: "art", href: "/art" },
  { key: "poetry", href: "/poetry" },
  { key: "spirituality", href: "/spirituality" },
  { key: "climb", href: "/climb" },
  { key: "finance", href: "/finance" },
];

/** The world's name as it's written in the logo and the header. */
export const WORLD_NAME: Record<Place, string> = {
  home: "Urška",
  art: "Art by Urška",
  poetry: "Poetry by Urška",
  spirituality: "Spirituality by Urška",
  climb: "Climb by Urška",
  finance: "Finance by Urška",
};

/**
 * Each world's own logo: the gold ring with its name inside (Teo, 2026-09-21). Urška's own
 * home page carries the UR monogram.
 */
export const WORLD_LOGO: Record<Place, string> = {
  home: "/images/logo-ur.webp",
  art: "/images/logo-art.webp",
  poetry: "/images/logo-poetry.webp",
  spirituality: "/images/logo-spirituality.webp",
  climb: "/images/logo-climb.webp",
  finance: "/images/logo-finance.webp",
};

const ART_PATHS = ["/art", "/collection", "/artworks", "/cart", "/checkout", "/order-confirmation"];

export function placeFor(pathname: string): Place {
  if (pathname.startsWith("/poetry")) return "poetry";
  if (pathname.startsWith("/spirituality") || pathname.startsWith("/zvezdni-koledar") || pathname.startsWith("/rezervacija"))
    return "spirituality";
  if (pathname.startsWith("/climb")) return "climb";
  if (pathname.startsWith("/finance")) return "finance";
  if (ART_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`))) return "art";
  return "home";
}
