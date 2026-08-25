import { ShippingZone } from "@/content/types";

export const ZONE_LABELS: Record<ShippingZone, string> = {
  SI: "Slovenia",
  EU: "European Union",
  EUROPE_NON_EU: "Europe (outside the EU)",
  INTERNATIONAL: "International (worldwide)",
};

export const ZONE_ORDER: ShippingZone[] = ["SI", "EU", "EUROPE_NON_EU", "INTERNATIONAL"];

/** Countries are grouped, not enumerated — final country list/shipping costs are configured later. */
export const ZONE_DESCRIPTIONS: Record<ShippingZone, string> = {
  SI: "Delivered within Slovenia.",
  EU: "Delivered within the European Union.",
  EUROPE_NON_EU:
    "Delivered within Europe, outside the EU. Customs or import charges may apply depending on destination.",
  INTERNATIONAL:
    "Delivered worldwide. Import duties, taxes, or customs charges may apply depending on destination and are the recipient's responsibility unless stated otherwise at checkout.",
};
