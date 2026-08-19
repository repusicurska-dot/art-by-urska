import { Category, Painting } from "@/content/types";
import PlaceholderArt from "@/components/shared/PlaceholderArt";
import Container from "@/components/shared/Container";
import BackLink from "@/components/shared/BackLink";

export default function StoryHero({
  painting,
  category,
}: {
  painting: Painting;
  category: Category;
}) {
  return (
    <section className="relative">
      <PlaceholderArt
        label={painting.title}
        accentColor={category.accentColor}
        className="h-[70vh] min-h-[420px] w-full"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-midnight/70 via-transparent to-transparent" />
      <div className="absolute top-24 left-0 right-0">
        <Container>
          <BackLink className="text-ivory/70 hover:text-gold-400" />
        </Container>
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <Container className="pb-10">
          <span
            className="inline-block text-xs tracking-widest uppercase mb-3 px-3 py-1 rounded-full border"
            style={{
              color: category.accentColor,
              borderColor: `${category.accentColor}80`,
              background: "rgba(0,0,0,0.25)",
            }}
          >
            {category.name}
          </span>
          <h1 className="font-heading text-4xl md:text-5xl text-ivory drop-shadow-sm">
            {painting.title}
          </h1>
        </Container>
      </div>
    </section>
  );
}
