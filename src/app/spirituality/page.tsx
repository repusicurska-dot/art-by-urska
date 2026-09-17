import type { Metadata } from "next";
import SpiritualityContent from "@/components/spirituality/SpiritualityContent";

export const metadata: Metadata = {
  title: "Spirituality — Art by Urška",
  description:
    "Spirituality by Urška — card of the day, the moon today, a minute of stillness, a gratitude practice, and live tarot readings with Urška.",
  alternates: { canonical: "/spirituality" },
};

export default function SpiritualityPage() {
  return <SpiritualityContent />;
}
