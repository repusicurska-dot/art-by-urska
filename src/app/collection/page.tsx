import type { Metadata } from "next";
import CollectionContent from "@/components/collection/CollectionContent";
import InTheHome from "@/components/collection/InTheHome";
import { getAllArtworks } from "@/lib/content";

export const metadata: Metadata = {
  title: "Art — Art by Urška",
  description: "The complete collection of original paintings by Urška.",
  alternates: { canonical: "/collection" },
};

export default function CollectionPage() {
  const artworks = getAllArtworks();
  return (
    // art-ground lifts the page off pure black — a warm graphite lit from above, so the
    // paintings sit in a room rather than a void (see globals.css).
    <div className="art-ground relative">
      <CollectionContent artworks={artworks} />
      <InTheHome />
    </div>
  );
}
