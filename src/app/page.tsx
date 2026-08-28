import HomeJourney from "@/components/home/journey/HomeJourney";
import StructuredData from "@/components/seo/StructuredData";
import { getAllArtworks } from "@/lib/content";
import { personJsonLd } from "@/lib/structuredData";

export default function Home() {
  const artworks = getAllArtworks();

  return (
    <>
      <StructuredData data={personJsonLd()} />
      <HomeJourney artworks={artworks} />
    </>
  );
}
