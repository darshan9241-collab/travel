import { rawDestinations } from "@/data/destinations.raw";
import { rawStories, PUBLISH_STORIES } from "@/data/stories.raw";

export type SearchResultType = "page" | "destination" | "story";

export interface SearchItem {
  type: SearchResultType;
  title: string;
  subtitle?: string;
  description: string;
  href: string;
  keywords: string[];
}

const STATIC_PAGES: SearchItem[] = [
  {
    type: "page",
    title: "Home",
    description: "Wanderlouge, a travel journal by Darshan R.",
    href: "/",
    keywords: ["home", "wanderlouge", "start"],
  },
  {
    type: "page",
    title: "Blog",
    description: "Travel stories from the road — destinations, food, and quiet moments.",
    href: "/blog",
    keywords: ["blog", "stories", "journal", "posts", "articles"],
  },
  {
    type: "page",
    title: "Gallery",
    description: "A growing photography collection from the road.",
    href: "/gallery",
    keywords: ["gallery", "photos", "photography", "pictures", "images"],
  },
  {
    type: "page",
    title: "About",
    description: "Meet Darshan R., traveller, storyteller, and Research Officer from Bangalore.",
    href: "/about",
    keywords: ["about", "darshan", "who", "author", "bio"],
  },
  {
    type: "page",
    title: "Contact",
    description: "Get in touch with Darshan R.",
    href: "/contact",
    keywords: ["contact", "email", "reach", "message", "get in touch"],
  },
];

function getPublishedRawStories() {
  return PUBLISH_STORIES
    ? [...rawStories].sort((a, b) => (a.date < b.date ? 1 : -1))
    : [];
}

export function getSearchIndex(): SearchItem[] {
  const destinationItems: SearchItem[] = rawDestinations.map((destination) => ({
    type: "destination",
    title: destination.name,
    subtitle: destination.tagline,
    description: destination.description,
    href: "/gallery",
    keywords: [
      destination.name,
      destination.country,
      destination.tagline,
      destination.description,
      ...destination.travelNotes,
    ],
  }));

  const storyItems: SearchItem[] = getPublishedRawStories().map((story) => ({
    type: "story",
    title: story.title,
    subtitle: `${story.location}, ${story.state}`,
    description: story.excerpt,
    href: `/blog/${story.slug}`,
    keywords: [story.title, story.location, story.state, story.excerpt, ...story.tags],
  }));

  return [...STATIC_PAGES, ...destinationItems, ...storyItems];
}

export function searchSite(query: string, limit = 8): SearchItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const terms = q.split(/\s+/).filter(Boolean);

  return getSearchIndex()
    .map((item) => {
      const title = item.title.toLowerCase();
      const haystack = [item.title, item.subtitle, item.description, ...item.keywords]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      let score = 0;
      for (const term of terms) {
        if (title.startsWith(term)) score += 4;
        else if (title.includes(term)) score += 3;
        if (haystack.includes(term)) score += 1;
      }
      return { item, score };
    })
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((result) => result.item);
}
