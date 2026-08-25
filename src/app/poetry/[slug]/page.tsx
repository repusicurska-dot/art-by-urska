import { notFound } from "next/navigation";
import type { Metadata } from "next";
import QuoteStory from "@/components/poetry/QuoteStory";
import { getAllQuotes, getQuoteBySlug } from "@/lib/content";

export function generateStaticParams() {
  return getAllQuotes().map((q) => ({ slug: q.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const quote = getQuoteBySlug(slug);
  if (!quote) return {};
  return {
    title: `${quote.title} — Poetry by Urška`,
    alternates: { canonical: `/poetry/${quote.slug}` },
  };
}

export default async function QuotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const quote = getQuoteBySlug(slug);
  if (!quote) notFound();

  return <QuoteStory quote={quote} />;
}
