import Container from "../Container";
import SectionHeading from "../SectionHeading";
import Button from "../Button";
import RevealOnScroll from "../RevealOnScroll";
import GalleryExplorer, { type GalleryCollection } from "../GalleryExplorer";
import { stories } from "@/data/stories";

export default function GalleryPreview() {
  const collections: GalleryCollection[] = stories.map((story) => ({
    slug: `story-${story.slug}`,
    title: story.title,
    cover: story.featuredImage,
    images: [story.featuredImage, ...story.galleryImages],
  }));

  if (collections.length === 0) return null;

  return (
    <section className="bg-white-warm py-24 sm:py-28 lg:py-32">
      <Container>
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <SectionHeading
            label="Places Along The Way"
            heading="Gallery"
            description="A collection of moments, places, and memories gathered along the way."
          />
          <RevealOnScroll delay={150} className="hidden sm:block">
            <Button href="/gallery" variant="link" tone="light">
              View full gallery
            </Button>
          </RevealOnScroll>
        </div>

        <div className="mt-16">
          <GalleryExplorer collections={collections} />
        </div>

        <div className="mt-14 sm:hidden">
          <Button href="/gallery" variant="link" tone="light">
            View full gallery
          </Button>
        </div>
      </Container>
    </section>
  );
}
