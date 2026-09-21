import type { Metadata } from "next";
import ClimbContent from "@/components/climb/ClimbContent";

export const metadata: Metadata = {
  title: "Climb by Urška",
  description: "Climb by Urška — European bouldering champion, and the years on the rock before the canvas.",
  alternates: { canonical: "/climb" },
};

export default function ClimbPage() {
  return <ClimbContent />;
}
