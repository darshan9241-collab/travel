"use client";

import { useMemo, useState } from "react";
import StoryCard from "./StoryCard";
import type { Story } from "@/types";
import { cn } from "@/lib/utils";

interface StoriesGridProps {
  stories: Story[];
}

export default function StoriesGrid({ stories }: StoriesGridProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const tags = useMemo(() => {
    const set = new Set<string>();
    stories.forEach((story) => story.tags.forEach((tag) => set.add(tag)));
    return Array.from(set).sort();
  }, [stories]);

  const filtered = activeTag
    ? stories.filter((story) => story.tags.includes(activeTag))
    : stories;

  return (
    <div>
      <div className="flex flex-wrap gap-3" role="group" aria-label="Filter stories by tag">
        <button
          type="button"
          onClick={() => setActiveTag(null)}
          className={cn(
            "border px-4 py-2 text-xs font-medium uppercase tracking-[0.1em] transition-colors duration-300",
            activeTag === null
              ? "border-terracotta bg-terracotta text-white-warm"
              : "border-forest/20 text-forest/70 hover:border-terracotta hover:text-terracotta",
          )}
          aria-pressed={activeTag === null}
        >
          All Stories
        </button>
        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setActiveTag(tag)}
            className={cn(
              "border px-4 py-2 text-xs font-medium uppercase tracking-[0.1em] transition-colors duration-300",
              activeTag === tag
                ? "border-terracotta bg-terracotta text-white-warm"
                : "border-forest/20 text-forest/70 hover:border-terracotta hover:text-terracotta",
            )}
            aria-pressed={activeTag === tag}
          >
            {tag}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-16 text-forest/60">No stories with this tag just yet.</p>
      ) : (
        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((story, index) => (
            <StoryCard key={story.slug} story={story} size="small" priority={index === 0} />
          ))}
        </div>
      )}
    </div>
  );
}
