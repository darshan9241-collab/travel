import type { Metadata } from "next";
import { Fragment } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Container from "@/components/Container";
import ImageGallery from "@/components/ImageGallery";
import StoryCard from "@/components/StoryCard";
import RevealOnScroll from "@/components/RevealOnScroll";
import BookmarkButton from "@/components/BookmarkButton";
import {
  getStoryBySlug,
  getAdjacentStories,
  getRelatedStories,
  stories,
} from "@/data/stories";
import { formatDate } from "@/lib/utils";
import type { Story } from "@/types";

interface StoryPageProps {
  params: Promise<{ slug: string }>;
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-3 w-3"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function ForkKnifeIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-3 w-3"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 3v7a2 2 0 0 0 4 0V3M8 10v11M18 3c-1.5 0-3 1.5-3 4s1.5 4 3 4v10" />
    </svg>
  );
}

function SmallIcon({ path, className }: { path: React.ReactNode; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className ?? "h-3.5 w-3.5"}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {path}
    </svg>
  );
}

const TRIP_DETAILS_ICON = (
  <>
    <circle cx="6" cy="19" r="2" />
    <circle cx="18" cy="5" r="2" />
    <path d="M8 19h6a4 4 0 0 0 4-4V9a4 4 0 0 0-4-4h-1" />
  </>
);

const CHECKLIST_ICON = (
  <>
    <rect x="5" y="3" width="14" height="18" rx="2" />
    <path d="M9 3v3h6V3M8.5 12.5l2 2 4-4" />
  </>
);

const COST_ICON = (
  <>
    <path d="M4 21V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v15" />
    <path d="M4 11h8" />
    <path d="M14 8h1.5L18 10.5V17a1.5 1.5 0 0 1-3 0" />
  </>
);

const STAT_ICONS: Record<string, React.ReactNode> = {
  distance: (
    <>
      <path d="M4 20 14 4" />
      <path d="M6 8h2M9 12.5h2M12 17h2" />
    </>
  ),
  fuel: COST_ICON,
  "approx. cost": COST_ICON,
  cost: COST_ICON,
  mileage: (
    <>
      <path d="M12 4a9 9 0 1 0 9 9" />
      <path d="M12 13 16 8" />
      <path d="M21 12h-2M12 3v2" />
    </>
  ),
  "travel style": (
    <>
      <circle cx="12" cy="7" r="3" />
      <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
    </>
  ),
  "travel mode": (
    <>
      <circle cx="6" cy="17" r="2.5" />
      <circle cx="17" cy="17" r="2.5" />
      <path d="M6 17 9 9h4l3 4M9 9 8 6H6" />
    </>
  ),
};

const DEFAULT_STAT_ICON = (
  <>
    <circle cx="12" cy="12" r="8" />
  </>
);

function TripDetailsBox({ tripStats }: { tripStats: NonNullable<Story["tripStats"]> }) {
  if (!tripStats.items || tripStats.items.length === 0) return null;

  return (
    <div className="my-2 border border-forest/10 bg-cream/40 p-6 sm:p-8">
      <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
        Trip Details
      </span>
      <h3 className="mt-1 font-serif text-3xl text-forest sm:text-4xl">
        {tripStats.itemsHeading ?? "The Numbers"}
      </h3>
      <dl className="mt-6 grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-3">
        {tripStats.items.map((item) => (
          <div key={item.label} className="flex items-center justify-between gap-3 border-b border-forest/10 pb-3">
            <dt className="font-sans text-sm text-forest/50">{item.label}</dt>
            <dd className="font-sans text-base font-bold tabular-nums text-forest">{item.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function FoodNotesBox({ items }: { items: string[] }) {
  return (
    <div className="my-2 border border-forest/10 bg-terracotta/5 p-6 sm:p-7">
      <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
        Local Food Notes
      </span>
      <ul className="mt-4 grid gap-3 font-sans text-sm text-forest/80 sm:grid-cols-2">
        {items.map((note) => (
          <li key={note} className="flex items-start gap-3">
            <span
              aria-hidden="true"
              className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center bg-terracotta/10 text-terracotta"
            >
              <ForkKnifeIcon />
            </span>
            <span>{note}</span>
          </li>
        ))}
      </ul>
    </div>
  );
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

      <header className="relative flex min-h-[46vh] w-full items-end overflow-hidden bg-forest pb-14 pt-40 sm:min-h-[50vh] sm:pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-forest via-forest to-forest-dark" />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 20%, rgba(199,166,106,0.16), transparent 55%), radial-gradient(circle at 85% 85%, rgba(217,120,74,0.12), transparent 55%)",
          }}
        />
        <Container className="relative z-10">
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
            {story.intro && (
              <div className="mb-12 border-l-2 border-terracotta pl-6">
                <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
                  Why I Chose This Journey
                </span>
                <p className="mt-3 font-serif text-xl leading-snug text-forest sm:text-2xl">
                  {story.intro}
                </p>
              </div>
            )}

            <RevealOnScroll className="space-y-6 font-serif text-lg leading-relaxed text-forest/85 sm:text-xl">
              {story.content.map((paragraph, index) => (
                <Fragment key={index}>
                  <p>{paragraph}</p>
                  {story.inlineBoxes
                    ?.filter((entry) => entry.afterParagraph === index)
                    .map((entry) =>
                      entry.box === "tripDetails" && story.tripStats ? (
                        <TripDetailsBox key="trip-details" tripStats={story.tripStats} />
                      ) : entry.box === "foodNotes" && story.foodNotes ? (
                        <FoodNotesBox key="food-notes" items={story.foodNotes} />
                      ) : null,
                    )}
                </Fragment>
              ))}
            </RevealOnScroll>

            {story.tripStats?.mapsEmbedUrl && (
              <div className="mt-16 border border-forest/10 bg-cream/40 p-6 sm:p-8">
                <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-forest/50">
                  Route Preview
                </span>
                <h2 className="mt-2 font-serif text-2xl text-forest sm:text-3xl">
                  Follow the Road
                </h2>
                <div className="mt-6 aspect-[4/3] w-full overflow-hidden border border-forest/10 sm:aspect-[16/9]">
                  <iframe
                    src={story.tripStats.mapsEmbedUrl}
                    title={`Map of the route: ${story.tripStats.route ?? story.title}`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-full w-full border-0"
                  />
                </div>
                {story.tripStats.mapsUrl && (
                  <a
                    href={story.tripStats.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 bg-terracotta px-6 py-3 text-sm font-medium tracking-wide text-white-warm transition-colors duration-300 hover:bg-terracotta-dark"
                  >
                    Open Full Route in Google Maps
                    <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
            )}

            {story.galleryImages.length > 0 && (
              <div className="mt-16">
                <h2 className="mb-6 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-forest/50">
                  Photographs
                </h2>
                <ImageGallery images={story.galleryImages} />
              </div>
            )}
          </div>

          <aside className="flex flex-col gap-5 lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
            <BookmarkButton slug={story.slug} />

            {story.tripStats?.items && story.tripStats.items.length > 0 && (
              <div className="border border-forest/10 bg-cream/40 p-6 shadow-sm">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center bg-terracotta text-white-warm">
                    <SmallIcon path={TRIP_DETAILS_ICON} className="h-4 w-4" />
                  </span>
                  <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-forest">
                    Trip Details
                  </span>
                </div>
                <dl className="mt-5 space-y-3.5">
                  {story.tripStats.items.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between gap-3 border-b border-forest/10 pb-3.5 last:border-b-0 last:pb-0"
                    >
                      <dt className="flex items-center gap-2.5 font-sans text-sm text-forest/60">
                        <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center bg-white-warm text-terracotta">
                          <SmallIcon path={STAT_ICONS[item.label.toLowerCase()] ?? DEFAULT_STAT_ICON} />
                        </span>
                        {item.label}
                      </dt>
                      <dd className="font-sans text-base font-bold tabular-nums text-forest">{item.value}</dd>
                    </div>
                  ))}
                </dl>

                {story.tripStats.route && (
                  <div className="mt-4 border-t border-forest/10 pt-4">
                    <p className="flex items-center gap-2.5 font-sans text-sm text-forest/60">
                      <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center bg-white-warm text-terracotta">
                        <SmallIcon path={TRIP_DETAILS_ICON} />
                      </span>
                      Route
                    </p>
                    <p className="mt-2 font-sans text-sm leading-relaxed text-forest">
                      {story.tripStats.mapsUrl ? (
                        <a
                          href={story.tripStats.mapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline text-terracotta underline decoration-terracotta/30 underline-offset-4 transition-colors hover:text-terracotta-dark hover:decoration-terracotta-dark"
                        >
                          {story.tripStats.route}
                          <span aria-hidden="true"> ↗</span>
                        </a>
                      ) : (
                        story.tripStats.route
                      )}
                    </p>
                  </div>
                )}
              </div>
            )}

            {story.foodNotes && story.foodNotes.length > 0 && (
              <div className="border border-forest/10 bg-terracotta/5 p-6 shadow-sm">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center bg-terracotta text-white-warm">
                    <ForkKnifeIcon />
                  </span>
                  <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-forest">
                    Local Food Notes
                  </span>
                </div>
                <ul className="mt-5 space-y-3.5">
                  {story.foodNotes.map((note) => (
                    <li key={note} className="flex items-start gap-3 border-b border-terracotta/10 pb-3.5 last:border-b-0 last:pb-0">
                      <span
                        aria-hidden="true"
                        className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center bg-white-warm text-terracotta"
                      >
                        <ForkKnifeIcon />
                      </span>
                      <span className="text-sm leading-relaxed text-forest/80">{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {story.tips && story.tips.length > 0 && (
              <div className="border border-forest/10 p-6 shadow-sm">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center bg-forest text-white-warm">
                    <SmallIcon path={CHECKLIST_ICON} className="h-4 w-4" />
                  </span>
                  <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-forest">
                    Before You Go
                  </span>
                </div>
                <ul className="mt-5 space-y-3.5">
                  {story.tips.map((tip) => (
                    <li key={tip} className="flex items-start gap-3 border-b border-forest/10 pb-3.5 text-sm text-forest/80 last:border-b-0 last:pb-0">
                      <span
                        aria-hidden="true"
                        className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center bg-cream/60 text-forest/60"
                      >
                        <CheckIcon />
                      </span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
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
