import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Container from "@/components/Container";
import StoriesGrid from "@/components/StoriesGrid";
import RevealOnScroll from "@/components/RevealOnScroll";
import Newsletter from "@/components/Newsletter";
import { getSortedStories } from "@/data/stories";
import { resolvePhoto } from "@/lib/images";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Personal travel stories documenting roads, food, and quiet moments from the journey, written by Darshan R.",
};

const headerPhoto = resolvePhoto({
  src: "/images/pages/blog-header.png",
  alt: "Palm-lined beach at sunset on the Goan coast",
  tone: "terracotta",
  variant: "coast",
});

export default function BlogPage() {
  const stories = getSortedStories();

  return (
    <>
      <PageHeader
        label="From The Road"
        heading="The Blog"
        description="Every journey leaves something behind worth writing down. These are the ones I've written down so far."
        photo={headerPhoto}
      />
      <section className="bg-white-warm py-20 sm:py-24">
        <Container>
          {stories.length === 0 ? (
            <RevealOnScroll className="mx-auto max-w-lg border border-dashed border-forest/20 px-8 py-24 text-center">
              <p className="font-serif text-3xl italic text-forest/80">
                New Stories Are on Their Way
              </p>
              <p className="mt-4 text-forest/60">
                I&apos;m currently writing up my journeys. Check back soon, or
                subscribe below and I&apos;ll let you know the moment the
                first one goes up.
              </p>
            </RevealOnScroll>
          ) : (
            <StoriesGrid stories={stories} />
          )}
        </Container>
      </section>
      {stories.length === 0 && <Newsletter />}
    </>
  );
}
