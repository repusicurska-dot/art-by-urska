export interface Category {
  slug: string;
  name: string;
  nameEn: string;
  moodDescription: string;
  /** Short line shown during the page-transition ceremony when entering this category. */
  epigraph: string;
  accentColor: string;
  order: number;
}

export interface StoryBeat {
  heading?: string;
  text: string;
}

export interface Painting {
  slug: string;
  title: string;
  categorySlug: string;
  heroImage?: string;
  /** Short line shown during the page-transition ceremony when entering this painting's story. */
  epigraph: string;
  storyBeats: StoryBeat[];
  price: number;
  currency: "EUR";
  dimensions?: string;
  medium?: string;
  year?: number;
  available: boolean;
}
