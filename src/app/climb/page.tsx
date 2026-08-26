import type { Metadata } from "next";
import ClimbContent from "@/components/climb/ClimbContent";

export const metadata: Metadata = {
  title: "Climb — Art by Urška",
  description: "Climb by Urška — coming soon.",
  alternates: { canonical: "/climb" },
};

export default function ClimbPage() {
  return <ClimbContent />;
}
