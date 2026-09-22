import Image from "next/image";
import Container from "../Container";
import SectionHeading from "../SectionHeading";
import Button from "../Button";
import RevealOnScroll from "../RevealOnScroll";

export default function AboutPreview() {
  return (
    <section className="bg-forest py-24 text-white-warm sm:py-28 lg:py-32">
      <Container className="grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
        <RevealOnScroll className="lg:col-span-5">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden lg:mx-0">
            <Image
              src="/images/profile/darshan.jpg"
              alt="Darshan R., founder of Wanderlouge"
              fill
              sizes="(min-width: 1024px) 30vw, 80vw"
              className="object-cover"
              priority
            />
          </div>
        </RevealOnScroll>

        <div className="lg:col-span-7">
          <SectionHeading
            label="The Person Behind The Journeys"
            heading="Hi, I'm Darshan."
            tone="dark"
          />
          <RevealOnScroll delay={100} className="mt-6 space-y-5 text-base leading-relaxed text-cream/85 sm:text-lg">
            <p>
              I&apos;m a traveller and storyteller from Bangalore, working as a
              Research Officer, with a curiosity that has always extended
              well beyond my work.
            </p>
            <p>
              Wanderlouge is my personal space to document the destinations,
              roads, food, people, and quiet moments that make each journey
              worth remembering. Travelling, to me, is about experiencing a
              place at your own pace and staying curious about what lies
              around the next corner.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={200} className="mt-8">
            <Button href="/about" variant="outline" tone="dark">
              More About Me
            </Button>
          </RevealOnScroll>
        </div>
      </Container>
    </section>
  );
}
