import type { Metadata } from "next";
import PoetryIndexContent from "@/components/poetry/PoetryIndexContent";

export const metadata: Metadata = {
  title: "Poetry by Urška",
  description: "Poetry by Urška — coming soon.",
  alternates: { canonical: "/poetry" },
};

export default function PoetryPage() {
  return <PoetryIndexContent />;
}
