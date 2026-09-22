import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Container from "@/components/Container";
import PhotoFrame from "@/components/PhotoFrame";
import ImageGallery from "@/components/ImageGallery";
import StoryCard from "@/components/StoryCard";
import RevealOnScroll from "@/components/RevealOnScroll";
import {
  getStoryBySlug,
  getAdjacentStories,
  getRelatedStories,
  stories,
} from "@/data/stories";
import { formatDate } from "@/lib/utils";

interface StoryPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return stories.map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({ params }: StoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = getStoryBySlug(slug);
  if (!story) return {};

  return {
    title: story.title,
    description: story.excerpt,
    openGraph: {
      title: story.title,
      description: story.excerpt,
      type: "article",
      publishedTime: story.date,
    },
  };
}

export default async function StoryPage({ params }: StoryPageProps) {
  const { slug } = await params;
  const story = getStoryBySlug(slug);
  if (!story) notFound();

  const { prev, next } = getAdjacentStories(slug);
  const related = getRelatedStories(story);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAction",
    name: story.title,
    description: story.excerpt,
    startTime: story.date,
    author: { "@type": "Person", name: "Darshan R." },
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="relative flex min-h-[64vh] w-full items-end overflow-hidden bg-forest pt-28">
        <div className="absolute inset-0">
          <PhotoFrame photo={story.featuredImage} priority sizes="100vw" showLabel={false} />
          <div className="absolute inset-0 bg-gradient-to-t from-forest/95 via-forest/70 to-forest/45" />
          <div className="absolute inset-0 bg-gradient-to-r from-forest/60 via-forest/15 to-transparent" />
        </div>
        <Container className="relative z-10 pb-14 sm:pb-16">
          <div className="flex flex-wrap items-center gap-3 font-sans text-xs uppercase tracking-[0.2em] text-gold sm:text-sm">
            <span>{story.location}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={story.date}>{formatDate(story.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{story.readingTime} min read</span>
          </div>
          <h1 className="mt-4 max-w-4xl font-serif text-4xl leading-[1.1] text-white-warm sm:text-5xl lg:text-6xl">
            {story.title}
          </h1>
        </Container>
      </header>

      <div className="bg-white-warm py-16 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <RevealOnScroll className="space-y-6 font-serif text-lg leading-relaxed text-forest/85 sm:text-xl">
              {story.content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </RevealOnScroll>

            {story.galleryImages.length > 0 && (
              <div className="mt-16">
                <h2 className="mb-6 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-forest/50">
                  Photographs
                </h2>
                <ImageGallery images={story.galleryImages} />
              </div>
            )}
          </div>

          <aside className="lg:col-span-4">
            <div className="border border-forest/10 p-6 lg:sticky lg:top-28">
              <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-forest/50">
                Filed Under
              </span>
              <div className="mt-4 flex flex-wrap gap-2">
                {story.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-forest/15 px-3 py-1 text-xs uppercase tracking-[0.08em] text-forest/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </Container>
      </div>

      {(prev || next) && (
        <div className="border-t border-forest/10 bg-cream">
          <Container className="grid grid-cols-1 sm:grid-cols-2">
            {prev ? (
              <Link
                href={`/blog/${prev.slug}`}
                className="group border-b border-forest/10 py-10 pr-8 sm:border-b-0 sm:border-r"
              >
                <span className="font-sans text-xs uppercase tracking-[0.2em] text-forest/50">
                  ← Previous Story
                </span>
                <p className="mt-3 font-serif text-2xl text-forest transition-colors group-hover:text-terracotta">
                  {prev.title}
                </p>
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link href={`/blog/${next.slug}`} className="group py-10 sm:pl-8 sm:text-right">
                <span className="font-sans text-xs uppercase tracking-[0.2em] text-forest/50">
                  Next Story →
                </span>
                <p className="mt-3 font-serif text-2xl text-forest transition-colors group-hover:text-terracotta">
                  {next.title}
                </p>
              </Link>
            ) : (
              <div />
            )}
          </Container>
        </div>
      )}

      {related.length > 0 && (
        <section className="bg-white-warm py-20 sm:py-24">
          <Container>
            <h2 className="font-serif text-3xl text-forest sm:text-4xl">
              More Stories
            </h2>
            <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((relatedStory) => (
                <StoryCard key={relatedStory.slug} story={relatedStory} size="small" />
              ))}
            </div>
          </Container>
        </section>
      )}
    </article>
  );
}
