"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import StoryCard from "./StoryCard";
import type { Story } from "@/types";
import { getBookmarkedSlugs, subscribeBookmarks } from "@/lib/bookmarks";

interface SavedStoriesProps {
  stories: Story[];
}

const EMPTY_SLUGS: string[] = [];

export default function SavedStories({ stories }: SavedStoriesProps) {
  const savedSlugs = useSyncExternalStore(
    subscribeBookmarks,
    getBookmarkedSlugs,
    () => EMPTY_SLUGS,
  );

  const saved = stories.filter((story) => savedSlugs.includes(story.slug));

  if (saved.length === 0) {
    return (
      <div className="mx-auto max-w-lg border border-dashed border-forest/20 px-8 py-24 text-center">
        <p className="font-serif text-3xl italic text-forest/80">
          Nothing Saved Yet
        </p>
        <p className="mt-4 text-forest/60">
          Tap &ldquo;Save for Later&rdquo; on any story and it&apos;ll show up here.
        </p>
        <Link
          href="/blog"
          className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-terracotta transition-colors hover:text-terracotta-dark"
        >
          Browse the blog
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
      {saved.map((story, index) => (
        <StoryCard key={story.slug} story={story} size="small" priority={index === 0} />
      ))}
    </div>
  );
}
