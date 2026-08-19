import { notFound } from "next/navigation";
import PaintingStory from "@/components/story/PaintingStory";
import { getAllPaintings, getCategory, getPaintingBySlug } from "@/lib/content";

export function generateStaticParams() {
  return getAllPaintings().map((p) => ({ slug: p.slug }));
}

export default async function PaintingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const painting = getPaintingBySlug(slug);
  if (!painting) notFound();

  const category = getCategory(painting.categorySlug);
  if (!category) notFound();

  return <PaintingStory painting={painting} category={category} />;
}
