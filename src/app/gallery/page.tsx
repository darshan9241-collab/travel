import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Container from "@/components/Container";
import ImageGallery from "@/components/ImageGallery";
import { destinations } from "@/data/destinations";
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

const galleryImages = destinations.flatMap((destination) => [
  destination.heroImage,
  ...destination.galleryImages,
]);

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        label="Places Along The Way"
        heading="Gallery"
        description="A visual collection from the road, growing one journey at a time."
        photo={headerPhoto}
      />
      <section className="bg-white-warm py-20 sm:py-24">
        <Container>
          <ImageGallery images={galleryImages} showLabels={false} />
        </Container>
      </section>
    </>
  );
}
