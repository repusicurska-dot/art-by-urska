import type { Metadata } from "next";
import SpiritualityContent from "@/components/spirituality/SpiritualityContent";

export const metadata: Metadata = {
  title: "Spirituality — Art by Urška",
  description:
    "Spirituality by Urška — on the soul, painting as practice, and the journey from climbing to canvas.",
  alternates: { canonical: "/spirituality" },
};

export default function SpiritualityPage() {
  return <SpiritualityContent />;
}
