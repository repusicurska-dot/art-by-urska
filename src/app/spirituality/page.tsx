import type { Metadata } from "next";
import SpiritualityContent from "@/components/spirituality/SpiritualityContent";

export const metadata: Metadata = {
  title: "Spirituality — Art by Urška",
  description: "On soul, painting, and the quiet recognition between two people meeting through art.",
  alternates: { canonical: "/spirituality" },
};

export default function SpiritualityPage() {
  return <SpiritualityContent />;
}
