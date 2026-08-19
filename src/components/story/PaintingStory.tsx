import { Category, Painting } from "@/content/types";
import StoryHero from "./StoryHero";
import StorySection from "./StorySection";
import PriceReveal from "./PriceReveal";

export default function PaintingStory({
  painting,
  category,
}: {
  painting: Painting;
  category: Category;
}) {
  return (
    <article>
      <StoryHero painting={painting} category={category} />
      {painting.storyBeats.map((beat, index) => (
        <StorySection
          key={index}
          beat={beat}
          index={index}
          accentColor={category.accentColor}
          paintingTitle={painting.title}
        />
      ))}
      <div className="border-t border-charcoal/10 mt-8">
        <PriceReveal painting={painting} />
      </div>
    </article>
  );
}
