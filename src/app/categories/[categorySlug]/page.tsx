import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/shared/Container";
import PlaceholderArt from "@/components/shared/PlaceholderArt";
import BackLink from "@/components/shared/BackLink";
import { getAllCategories, getCategory, getPaintingsByCategory } from "@/lib/content";

export function generateStaticParams() {
  return getAllCategories().map((c) => ({ categorySlug: c.slug }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}) {
  const { categorySlug } = await params;
  const category = getCategory(categorySlug);
  if (!category) notFound();

  const paintings = getPaintingsByCategory(categorySlug);

  return (
    <div>
      <section
        className="relative py-28 md:py-36 text-center"
        style={{
          background: `linear-gradient(180deg, ${category.accentColor}25 0%, transparent 100%)`,
        }}
      >
        <Container>
          <div className="mb-8 text-left">
            <BackLink />
          </div>
          <span
            className="inline-block h-2 w-2 rounded-full mb-4"
            style={{ backgroundColor: category.accentColor }}
          />
          <h1 className="font-heading text-4xl md:text-5xl text-charcoal">
            {category.name}
          </h1>
          <p className="mt-4 max-w-xl mx-auto text-charcoal/70 italic">
            {category.moodDescription}
          </p>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {paintings.map((painting) => (
              <Link
                key={painting.slug}
                href={`/paintings/${painting.slug}`}
                className="group block"
              >
                <PlaceholderArt
                  label={painting.title}
                  accentColor={category.accentColor}
                  className="aspect-[4/5] rounded-sm mb-4 transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <h3 className="font-heading text-xl text-charcoal group-hover:text-gold-600 transition-colors">
                  {painting.title}
                </h3>
                <p className="text-sm text-charcoal/50 mt-1">
                  {painting.medium}
                  {painting.dimensions ? ` · ${painting.dimensions}` : ""}
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
