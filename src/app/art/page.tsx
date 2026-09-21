import type { Metadata } from "next";
import HomeJourney from "@/components/home/journey/HomeJourney";
import { getAllArtworks } from "@/lib/content";

export const metadata: Metadata = {
  title: "Art by Urška — Original paintings",
  description:
    "Original paintings by Urška — a storytelling gallery of mood, memory, and light. Shipping from Slovenia, EU, worldwide.",
  alternates: { canonical: "/art" },
};

export default function ArtPage() {
  return <HomeJourney artworks={getAllArtworks()} />;
}
