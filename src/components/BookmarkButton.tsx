"use client";

import { useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";
import { isBookmarked, subscribeBookmarks, toggleBookmark } from "@/lib/bookmarks";

interface BookmarkButtonProps {
  slug: string;
  className?: string;
}

export default function BookmarkButton({ slug, className }: BookmarkButtonProps) {
  const saved = useSyncExternalStore(
    subscribeBookmarks,
    () => isBookmarked(slug),
    () => false,
  );

  return (
    <button
      type="button"
      onClick={() => toggleBookmark(slug)}
      aria-pressed={saved}
      className={cn(
        "flex w-full items-center justify-center gap-2 border px-4 py-3 text-sm font-medium tracking-wide transition-colors duration-300",
        saved
          ? "border-terracotta bg-terracotta text-white-warm hover:bg-terracotta-dark"
          : "border-forest/20 text-forest hover:border-terracotta hover:text-terracotta",
        className,
      )}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill={saved ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" />
      </svg>
      {saved ? "Saved for Later" : "Save for Later"}
    </button>
  );
}
