export type PlaceholderTone = "forest" | "terracotta" | "gold" | "dusk";

export type PlaceholderVariant =
  | "hills"
  | "palace"
  | "coast"
  | "backwater"
  | "desert"
  | "ghats";

export interface PhotoInput {
  /** Path relative to /public, e.g. "/images/stories/mysore-palace.jpg".
   * Drop a real file at this exact path and it will be used automatically —
   * until then, an editorial placeholder renders instead. */
  src: string;
  alt: string;
  tone: PlaceholderTone;
  variant: PlaceholderVariant;
  label?: string;
}

export interface PhotoRef extends PhotoInput {
  /** Resolved server-side at data-definition time: does a real file exist at `src` yet? */
  exists: boolean;
}

export interface Story {
  slug: string;
  title: string;
  location: string;
  state: string;
  country: string;
  destinationSlug: string;
  date: string;
  excerpt: string;
  content: string[];
  tags: string[];
  readingTime: number;
  featuredImage: PhotoRef;
  galleryImages: PhotoRef[];
}

export interface Destination {
  slug: string;
  name: string;
  country: string;
  tagline: string;
  description: string;
  longDescription: string[];
  travelNotes: string[];
  heroImage: PhotoRef;
  galleryImages: PhotoRef[];
}
