import { categories } from "@/content/categories";
import { paintings } from "@/content/paintings";
import { Category, Painting } from "@/content/types";

export function getAllCategories(): Category[] {
  return [...categories].sort((a, b) => a.order - b.order);
}

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getPaintingsByCategory(categorySlug: string): Painting[] {
  return paintings.filter((p) => p.categorySlug === categorySlug);
}

export function getPaintingBySlug(slug: string): Painting | undefined {
  return paintings.find((p) => p.slug === slug);
}

export function getAllPaintings(): Painting[] {
  return paintings;
}
