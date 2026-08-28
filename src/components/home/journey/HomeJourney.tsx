import { Artwork } from "@/content/types";
import GrainOverlay from "./GrainOverlay";
import SilenceIntro from "./SilenceIntro";
import ArtworkReveal from "./ArtworkReveal";
import ArtworkStory from "./ArtworkStory";
import HorizontalGallery from "./HorizontalGallery";
import WorldsPortal from "./WorldsPortal";
import PoetryExperience from "./PoetryExperience";
import ArtistMoment from "./ArtistMoment";
import FinalInvitation from "./FinalInvitation";
import ScrollProgress from "./ScrollProgress";

export default function HomeJourney({ artworks }: { artworks: Artwork[] }) {
  const withImages = artworks.filter((a) => a.heroImage);
  const signature =
    withImages.find((a) => a.slug === "artwork-02") ?? withImages[0] ?? artworks[0];
  const poetryPiece =
    withImages.find((a) => a.slug === "artwork-05") ??
    withImages.find((a) => a.slug !== signature.slug) ??
    signature;

  return (
    <>
      <div id="arrival" />
      <SilenceIntro artwork={signature} />

      <div id="painting" />
      <ArtworkReveal artwork={signature} />
      <ArtworkStory artwork={signature} />

      <div id="collection" />
      <HorizontalGallery artworks={withImages} />

      <div id="poetry" />
      <WorldsPortal />
      <PoetryExperience artwork={poetryPiece} />

      <div id="artist" />
      <ArtistMoment />
      <FinalInvitation />

      <ScrollProgress />
      <GrainOverlay />
    </>
  );
}
