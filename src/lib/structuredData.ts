import { Artwork } from "@/content/types";
import { business } from "@/content/business";

const AVAILABILITY_SCHEMA: Record<Artwork["availability"], string> = {
  available: "https://schema.org/InStock",
  reserved: "https://schema.org/LimitedAvailability",
  sold: "https://schema.org/SoldOut",
  inquire: "https://schema.org/PreOrder",
};

export function productJsonLd(artwork: Artwork) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: artwork.title,
    description: artwork.shortIntro,
    sku: artwork.sku,
    image: artwork.heroImage,
    brand: { "@type": "Person", name: "Urška" },
    offers: {
      "@type": "Offer",
      priceCurrency: artwork.currency,
      price: artwork.price,
      availability: AVAILABILITY_SCHEMA[artwork.availability],
      itemCondition: "https://schema.org/NewCondition",
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: business.tradingName,
    legalName: business.legalName,
    email: business.contactEmail,
    address: business.registeredAddress,
  };
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Urška",
    jobTitle: "Painter",
    worksFor: { "@type": "Organization", name: business.tradingName },
  };
}
