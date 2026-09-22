import PhotoFrame from "./PhotoFrame";
import Button from "./Button";
import Container from "./Container";
import { resolvePhoto } from "@/lib/images";

const heroPhoto = resolvePhoto({
  src: "/images/hero/hero.jpg",
  alt: "Green monsoon hills of the Western Ghats at sunrise",
  tone: "dusk",
  variant: "ghats",
});

export default function Hero() {
  return (
    <section className="relative flex h-[100svh] min-h-[640px] w-full items-center overflow-hidden bg-forest">
      <div className="absolute inset-0">
        <PhotoFrame photo={heroPhoto} priority sizes="100vw" showLabel={false} className="h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/70 to-forest/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest/70 via-forest/25 to-transparent" />
      </div>

      <Container className="relative z-10">
        <div className="max-w-3xl">
          <span className="mb-6 block font-sans text-xs font-semibold uppercase tracking-[0.3em] text-gold sm:text-sm">
            Travel Diaries of Darshan R
          </span>
          <h1 className="font-serif text-5xl leading-[1.05] text-white-warm sm:text-6xl md:text-7xl lg:text-8xl">
            Where Journeys
            <br />
            Become <em className="text-terracotta italic">Stories</em>
          </h1>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-cream/90 sm:text-lg">
            A collection of destinations, roads, experiences, and moments,
            documented along the way, one journey at a time.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Button href="/blog" variant="solid">
              Read My Stories
            </Button>
            <Button href="/about" variant="outline" tone="dark">
              About Me
            </Button>
          </div>
        </div>
      </Container>

      <div className="absolute inset-x-0 bottom-8 z-10 flex justify-center">
        <div className="flex flex-col items-center gap-2 text-cream/70 motion-safe:animate-bounce">
          <span className="font-sans text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <span className="h-8 w-px bg-cream/50" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
