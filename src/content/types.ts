export type ArtworkLayout =
  | "split"
  | "fullscreen-reveal"
  | "quote-first"
  | "cinematic-macro"
  | "minimal";

export type ShippingZone = "SI" | "EU" | "EUROPE_NON_EU" | "INTERNATIONAL";

export type Availability = "available" | "reserved" | "sold" | "inquire";

export interface StoryBeat {
  heading?: string;
  text: string;
}

export interface Artwork {
  slug: string;
  /** Display order in the homepage exhibition and /collection grid. */
  order: number;
  /** Which bespoke homepage storytelling treatment this piece gets. */
  layout: ArtworkLayout;

  title: string;
  /** The artwork's original quote — its emotional anchor. */
  quote: string;
  shortIntro: string;
  storyBeats: StoryBeat[];
  artistNote?: string;

  heroImage?: string;
  heroImageAlt?: string;
  detailImages?: { src?: string; alt: string; label: string }[];
  accentColor: string;

  year?: number;
  medium?: string;
  materials?: string;
  dimensions?: string;
  weight?: string;

  editionType: "original" | "edition";
  editionNumber?: string;
  certificateOfAuthenticity: boolean;
  framed: boolean;

  /** Demo/provisional price used to exercise the commerce flow — never shown as final until priceConfirmed. */
  price: number;
  currency: "EUR";
  priceConfirmed: boolean;
  vatNote: string;

  availability: Availability;
  sku: string;
  dispatchTime: string;
  shipsTo: ShippingZone[];
  careInfo?: string;
}

/**
 * A standalone quote/poem print — a lighter, more affordable product line
 * distinct from the original paintings. Not tied to a specific artwork image.
 */
export interface QuotePrint {
  slug: string;
  order: number;
  title: string;
  text: string;
  accentColor: string;
  format: string;
  price: number;
  currency: "EUR";
  priceConfirmed: boolean;
  availability: Availability;
  sku: string;
}
