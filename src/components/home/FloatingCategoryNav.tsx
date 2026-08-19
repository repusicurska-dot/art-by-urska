import { getAllCategories } from "@/lib/content";
import FloatingCategoryItem from "./FloatingCategoryItem";
import Container from "@/components/shared/Container";

export default function FloatingCategoryNav() {
  const categories = getAllCategories();

  return (
    <div className="absolute inset-0 z-10 flex items-center pt-24">
      <Container>
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
          {categories.map((category, index) => (
            <FloatingCategoryItem
              key={category.slug}
              category={category}
              index={index}
            />
          ))}
        </div>
      </Container>
    </div>
  );
}
