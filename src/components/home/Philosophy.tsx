import Container from "../Container";
import RevealOnScroll from "../RevealOnScroll";

export default function Philosophy() {
  return (
    <section className="bg-cream py-28 sm:py-32 lg:py-40">
      <Container className="max-w-3xl text-center">
        <RevealOnScroll>
          <p className="font-serif text-3xl italic leading-snug text-forest sm:text-4xl lg:text-5xl">
            &ldquo;Every journey leaves behind a story.&rdquo;
          </p>
          <p className="mt-8 font-sans text-xs font-semibold uppercase tracking-[0.3em] text-terracotta sm:text-sm">
            Wander. Explore. Experience. Remember.
          </p>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
