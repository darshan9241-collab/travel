import Container from "../Container";
import SectionHeading from "../SectionHeading";
import RevealOnScroll from "../RevealOnScroll";

export default function Introduction() {
  return (
    <section className="bg-white-warm py-24 sm:py-28 lg:py-32">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading label="The Journey" heading="More Than Just Destinations" />
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <RevealOnScroll delay={100} className="space-y-6 text-base leading-relaxed text-forest/75 sm:text-lg">
            <p>
              I&apos;ve never really travelled to simply reach a place. Somewhere
              along the way, it became more about the roads that got me
              there, the ones that turn narrow and unmarked, the ones a map
              doesn&apos;t do justice to.
            </p>
            <p>
              It&apos;s the strangers who become part of the story without
              meaning to, like a homestay owner explaining his coffee
              harvest, or a market vendor threading a garland while laughing
              at how badly I fumbled the first attempt. It&apos;s food eaten
              at places with no signboards, and conversations that only
              happen because you slowed down long enough to have them.
            </p>
            <p>
              Wanderlouge holds all of it, the photographs I take without
              posting them anywhere, the quiet moments that don&apos;t make it
              into a highlight reel, and the small discoveries that never
              show up in a guidebook. This is less a travel guide and more
              a record of what actually happened along the way.
            </p>
          </RevealOnScroll>
        </div>
      </Container>
    </section>
  );
}
