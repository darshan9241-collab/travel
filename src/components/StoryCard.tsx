import Link from "next/link";
import PhotoFrame from "./PhotoFrame";
import type { Story } from "@/types";
import { formatDate, cn } from "@/lib/utils";

interface StoryCardProps {
  story: Story;
  size?: "large" | "small";
  priority?: boolean;
  className?: string;
}

export default function StoryCard({
  story,
  size = "small",
  priority = false,
  className,
}: StoryCardProps) {
  return (
    <article className={className}>
      <Link href={`/blog/${story.slug}`} className="group block">
        <div
          className={cn(
            "relative w-full overflow-hidden bg-forest",
            size === "large" ? "aspect-[4/3]" : "aspect-[3/4]",
          )}
        >
          <PhotoFrame
            photo={story.featuredImage}
            priority={priority}
            sizes={size === "large" ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 40vw, 100vw"}
          />
        </div>
        <div className="mt-6">
          <div className="flex items-center gap-3 font-sans text-xs uppercase tracking-[0.15em] text-forest/50">
            <span>{story.location}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={story.date}>{formatDate(story.date)}</time>
          </div>
          <h3
            className={cn(
              "mt-3 font-serif text-forest transition-colors duration-300 group-hover:text-terracotta",
              size === "large" ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl",
            )}
          >
            {story.title}
          </h3>
          <p className="mt-3 line-clamp-2 max-w-lg leading-relaxed text-forest/70">
            {story.excerpt}
          </p>
          <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-terracotta">
            Read Story
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </span>
        </div>
      </Link>
    </article>
  );
}
