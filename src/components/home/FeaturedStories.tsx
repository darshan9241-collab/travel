import Container from "../Container";
import SectionHeading from "../SectionHeading";
import StoryCard from "../StoryCard";
import Button from "../Button";
import RevealOnScroll from "../RevealOnScroll";
import { getSortedStories } from "@/data/stories";

export default function FeaturedStories() {
  const stories = getSortedStories().slice(0, 4);

  return (
    <section className="bg-cream py-24 sm:py-28 lg:py-32">
      <Container>
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <SectionHeading label="Along The Way" heading="Stories Worth Remembering" />
          {stories.length > 0 && (
            <RevealOnScroll delay={150} className="hidden sm:block">
              <Button href="/blog" variant="link" tone="light">
                View all stories
              </Button>
            </RevealOnScroll>
          )}
        </div>

        {stories.length === 0 ? (
          <RevealOnScroll delay={100} className="mt-16 border border-dashed border-forest/20 px-8 py-20 text-center sm:py-24">
            <p className="font-serif text-2xl italic text-forest/80 sm:text-3xl">
              New Stories Are on Their Way
            </p>
            <p className="mx-auto mt-4 max-w-md text-forest/60">
              I&apos;m currently writing up my journeys. Check back soon, or
              subscribe below and I&apos;ll let you know the moment the first
              one goes up.
            </p>
          </RevealOnScroll>
        ) : (
          <>
            <StoriesRail stories={stories} />
            <div className="mt-14 sm:hidden">
              <Button href="/blog" variant="link" tone="light">
                View all stories
              </Button>
            </div>
          </>
        )}
      </Container>
    </section>
  );
}

function StoriesRail({ stories }: { stories: ReturnType<typeof getSortedStories> }) {
  const [first, second, third, fourth] = stories;

  return (
    <div className="mt-16 grid gap-x-8 gap-y-16 lg:grid-cols-12">
      {first && (
        <RevealOnScroll className="lg:col-span-7" delay={0}>
          <StoryCard story={first} size="large" priority />
        </RevealOnScroll>
      )}
      {second && (
        <RevealOnScroll className="lg:col-span-5 lg:pt-14" delay={100}>
          <StoryCard story={second} size="small" />
        </RevealOnScroll>
      )}
      {third && (
        <RevealOnScroll className="lg:col-span-5" delay={0}>
          <StoryCard story={third} size="small" />
        </RevealOnScroll>
      )}
      {fourth && (
        <RevealOnScroll className="lg:col-span-7" delay={100}>
          <StoryCard story={fourth} size="large" />
        </RevealOnScroll>
      )}
    </div>
  );
}
