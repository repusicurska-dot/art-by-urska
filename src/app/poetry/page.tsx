import type { Metadata } from "next";
import PoetryIndexContent from "@/components/poetry/PoetryIndexContent";
import { getAllQuotes } from "@/lib/content";

export const metadata: Metadata = {
  title: "Poetry by Urška",
  description: "Original quotes and poems by Urška, available as fine art prints.",
  alternates: { canonical: "/poetry" },
};

export default function PoetryPage() {
  const quotes = getAllQuotes();
  return <PoetryIndexContent quotes={quotes} />;
}
