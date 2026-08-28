/** Homepage scroll-journey chapters, shared between section anchors and the chapter navigator. */
export const CHAPTERS = [
  { id: "arrival", label: "Arrival" },
  { id: "painting", label: "The Painting" },
  { id: "collection", label: "Collection" },
  { id: "poetry", label: "Poetry" },
  { id: "artist", label: "The Artist" },
] as const;

export type ChapterId = (typeof CHAPTERS)[number]["id"];
