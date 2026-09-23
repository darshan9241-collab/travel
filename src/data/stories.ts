import { resolvePhoto } from "@/lib/images";
import type { Story } from "@/types";
import { rawStories } from "@/data/stories.raw";

export const stories: Story[] = rawStories
  .filter((story) => story.published)
  .map((story) => ({
    ...story,
    featuredImage: resolvePhoto(story.featuredImage),
    galleryImages: story.galleryImages.map(resolvePhoto),
  }));

export function getStoryBySlug(slug: string): Story | undefined {
  return stories.find((story) => story.slug === slug);
}

export function getStoriesByDestination(destinationSlug: string): Story[] {
  return stories
    .filter((story) => story.destinationSlug === destinationSlug)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getSortedStories(): Story[] {
  return [...stories].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAdjacentStories(slug: string): { prev: Story | null; next: Story | null } {
  const sorted = getSortedStories();
  const index = sorted.findIndex((story) => story.slug === slug);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? sorted[index - 1] : null,
    next: index < sorted.length - 1 ? sorted[index + 1] : null,
  };
}

export function getRelatedStories(story: Story, limit = 3): Story[] {
  return stories
    .filter((s) => s.slug !== story.slug)
    .sort((a, b) => {
      const aScore = a.destinationSlug === story.destinationSlug ? 1 : 0;
      const bScore = b.destinationSlug === story.destinationSlug ? 1 : 0;
      return bScore - aScore;
    })
    .slice(0, limit);
}
