import type { Metadata } from "next";
import SpiritualityContent from "@/components/spirituality/SpiritualityContent";

export const metadata: Metadata = {
  title: "Spirituality — Art by Urška",
  description: "Spirituality by Urška — coming soon.",
  alternates: { canonical: "/spirituality" },
};

export default function SpiritualityPage() {
  return <SpiritualityContent />;
}
