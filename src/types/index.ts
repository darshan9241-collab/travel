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
  /** Only published stories appear on the site — draft entries stay in the
   * data file, ready to flip on once their photos are in. */
  published: boolean;
  title: string;
  location: string;
  state: string;
  country: string;
  destinationSlug: string;
  date: string;
  excerpt: string;
  /** Optional short "why this journey" blurb shown before the main content. */
  intro?: string;
  content: string[];
  tags: string[];
  readingTime: number;
  featuredImage: PhotoRef;
  galleryImages: PhotoRef[];
  /** Optional trip stats. `route`/`mapsUrl`/`mapsEmbedUrl` power the Route
   * Preview section; `items` powers the inline "Trip Details" numbers box
   * (only include figures you actually know — e.g. distance, fuel, tolls). */
  tripStats?: {
    route?: string;
    /** Google Maps directions URL — the route line links here when set. */
    mapsUrl?: string;
    /** Keyless Google Maps embed URL (maps.google.com/maps?...&output=embed) for the Route Preview iframe. */
    mapsEmbedUrl?: string;
    /** Heading shown above the numbers grid, e.g. "The Numbers" or "What It Cost". */
    itemsHeading?: string;
    items?: { label: string; value: string }[];
  };
  /** Optional "Before You Go" checklist shown in a sidebar card. */
  tips?: string[];
  /** Optional local food highlights — rendered inline in the story via inlineBoxes. */
  foodNotes?: string[];
  /** Positions callout boxes (trip stats, food notes) inline within `content`,
   * right after the paragraph at the given index (0-based). */
  inlineBoxes?: { afterParagraph: number; box: "tripDetails" | "foodNotes" }[];
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
