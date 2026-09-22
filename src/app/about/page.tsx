import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import Container from "@/components/Container";
import Button from "@/components/Button";
import RevealOnScroll from "@/components/RevealOnScroll";
import { resolvePhoto } from "@/lib/images";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Darshan R., a traveller, storyteller, and Research Officer from Bangalore, and the person behind Wanderlouge.",
};

const headerPhoto = resolvePhoto({
  src: "/images/pages/about-header.png",
  alt: "A desert highway stretching toward mountains at sunset",
  tone: "terracotta",
  variant: "desert",
});

export default function AboutPage() {
  return (
    <>
      <PageHeader
        label="The Person Behind The Journeys"
        heading="About Darshan"
        photo={headerPhoto}
      />

      <section className="bg-white-warm py-20 sm:py-24">
        <Container className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <RevealOnScroll className="lg:col-span-5">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden lg:sticky lg:top-28 lg:mx-0">
              <Image
                src="/images/profile/darshan.jpg"
                alt="Darshan R., founder of Wanderlouge, smiling outdoors"
                fill
                sizes="(min-width: 1024px) 35vw, 90vw"
                className="object-cover"
                priority
              />
            </div>
          </RevealOnScroll>

          <div className="lg:col-span-7">
            <RevealOnScroll className="space-y-6 font-serif text-lg leading-relaxed text-forest/85 sm:text-xl">
              <p>
                Hi, I&apos;m Darshan, a traveller and storyteller from
                Bangalore, India.
              </p>
              <p>
                I work as a Research Officer in Bangalore, with a background
                in public health and a curiosity that extends far beyond my
                work. I&apos;ve always enjoyed discovering new places, taking
                the road less travelled, experiencing different cultures, and
                finding stories in the places I visit.
              </p>
              <p>
                Wanderlouge is my personal space to document these journeys,
                from the destinations and roads to the food, people,
                photographs, and little moments that make each trip
                memorable.
              </p>
              <p>
                I believe travelling is more than simply visiting a new
                place. It is about experiencing it at your own pace, being
                curious about what lies around the next corner, and creating
                memories along the way.
              </p>
              <p>
                Through Wanderlouge, I share my travel stories, experiences,
                photographs, and discoveries, a collection of journeys, one
                place at a time.
              </p>
              <p className="font-serif text-2xl italic text-terracotta sm:text-3xl">
                Welcome to Wanderlouge.
              </p>
              <p className="font-sans text-sm font-semibold uppercase tracking-[0.25em] text-forest/60">
                Wander. Explore. Experience. Remember.
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={150} className="mt-10">
              <Button href="/blog" variant="solid">
                Read My Stories
              </Button>
            </RevealOnScroll>
          </div>
        </Container>
      </section>

      <section className="bg-forest py-20 text-white-warm sm:py-24">
        <Container className="max-w-2xl">
          <RevealOnScroll>
            <span className="mb-4 block font-sans text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              Why Wanderlouge Exists
            </span>
            <h2 className="font-serif text-3xl leading-tight sm:text-4xl">
              A record, more than a recommendation.
            </h2>
            <p className="mt-6 leading-relaxed text-cream/85">
              Most travel content online is written to sell something,
              whether that&apos;s a stay, a package, or a destination.
              Wanderlouge isn&apos;t that. It
              exists because I kept coming back from trips with more stories
              than I had people to tell them to, and more photographs than I
              had a use for. This is where they live instead, unpolished in
              places, personal throughout, and added to only when there&apos;s
              a real journey behind the entry.
            </p>
          </RevealOnScroll>
        </Container>
      </section>
    </>
  );
}
