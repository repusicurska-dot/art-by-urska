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
    // A warm gallery-white wall washed with the paintings' own palette — see .art-light in
    // globals.css, which also lightens the header and footer while this page is open.
    <div className="art-light art-ground relative isolate">
      <CollectionContent artworks={artworks} />
      <InTheHome />
    </div>
  );
}
