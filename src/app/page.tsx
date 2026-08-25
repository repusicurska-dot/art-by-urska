import CinematicHero from "@/components/home/CinematicHero";
import FeaturedCarousel from "@/components/home/FeaturedCarousel";
import CategoryBanners from "@/components/home/CategoryBanners";
import StructuredData from "@/components/seo/StructuredData";
import { getAllArtworks } from "@/lib/content";
import { personJsonLd } from "@/lib/structuredData";

export default function Home() {
  const artworks = getAllArtworks();

  return (
    <>
      <StructuredData data={personJsonLd()} />
      <CinematicHero artworks={artworks} />
      <FeaturedCarousel artworks={artworks} />
      <CategoryBanners />
    </>
  );
}
