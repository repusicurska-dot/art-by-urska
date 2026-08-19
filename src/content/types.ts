export interface Category {
  slug: string;
  name: string;
  nameEn: string;
  moodDescription: string;
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
  storyBeats: StoryBeat[];
  price: number;
  currency: "EUR";
  dimensions?: string;
  medium?: string;
  year?: number;
  available: boolean;
}
