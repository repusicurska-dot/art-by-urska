import type { Metadata } from "next";
import UrskaHome from "@/components/hub/UrskaHome";
import StructuredData from "@/components/seo/StructuredData";
import { personJsonLd } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "Urška — Art, Poetry, Spirituality, Climb & Finance",
  description:
    "Urška — painter, poet, climber and seeker. A bouldering champion who traded the rock for the canvas: five worlds, one life.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <StructuredData data={personJsonLd()} />
      <UrskaHome />
    </>
  );
}
