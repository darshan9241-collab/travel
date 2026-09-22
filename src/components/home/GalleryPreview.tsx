import Container from "../Container";
import SectionHeading from "../SectionHeading";
import GalleryCard from "../GalleryCard";
import Button from "../Button";
import RevealOnScroll from "../RevealOnScroll";
import { destinations } from "@/data/destinations";

export default function GalleryPreview() {
  const photos = destinations.map((destination) => destination.heroImage);

  return (
    <section className="bg-white-warm py-24 sm:py-28 lg:py-32">
      <Container>
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <SectionHeading
            label="Places Along The Way"
            heading="Gallery"
            description="A visual collection from the road, growing one journey at a time."
          />
          <RevealOnScroll delay={150} className="hidden sm:block">
            <Button href="/gallery" variant="link" tone="light">
              View full gallery
            </Button>
          </RevealOnScroll>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {photos.map((photo, index) => (
            <RevealOnScroll key={photo.src + index} delay={(index % 3) * 100}>
              <GalleryCard photo={photo} priority={index === 0} />
            </RevealOnScroll>
          ))}
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
