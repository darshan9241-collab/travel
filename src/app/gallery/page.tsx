import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Container from "@/components/Container";
import GalleryExplorer, { type GalleryCollection } from "@/components/GalleryExplorer";
import { stories } from "@/data/stories";
import { resolvePhoto } from "@/lib/images";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "A growing photography collection from the road, gathered one journey at a time.",
};

const headerPhoto = resolvePhoto({
  src: "/images/pages/gallery-header.png",
  alt: "Himalayan peaks at sunset above a sea of clouds",
  tone: "dusk",
  variant: "hills",
});

const collections: GalleryCollection[] = stories.map((story) => ({
  slug: `story-${story.slug}`,
  title: story.title,
  cover: story.featuredImage,
  images: [story.featuredImage, ...story.galleryImages],
}));

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        label="Places Along The Way"
        heading="Gallery"
        description="A collection of moments, places, and memories gathered along the way."
        photo={headerPhoto}
      />
      <section className="bg-white-warm py-20 sm:py-24">
        <Container>
          <GalleryExplorer collections={collections} />
        </Container>
      </section>
    </>
  );
}
