import PlaceholderPhoto from "@/components/PlaceholderPhoto";
import Container from "@/components/Container";
import Button from "@/components/Button";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-forest">
      <div className="absolute inset-0">
        <PlaceholderPhoto tone="dusk" variant="desert" showLabel={false} className="h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest/95 via-forest/75 to-forest/55" />
      </div>

      <Container className="relative z-10 max-w-xl pt-20 text-center">
        <span className="mb-4 block font-sans text-xs font-semibold uppercase tracking-[0.25em] text-gold">
          Lost, Somewhere Off The Map
        </span>
        <h1 className="font-serif text-4xl text-white-warm sm:text-5xl">
          This page hasn&apos;t been journeyed to yet.
        </h1>
        <p className="mt-5 leading-relaxed text-cream/85">
          The page you&apos;re looking for doesn&apos;t exist, but there are
          plenty of stories and destinations to explore instead.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
          <Button href="/" variant="solid">
            Back Home
          </Button>
          <Button href="/blog" variant="link" tone="dark">
            Read My Stories
          </Button>
        </div>
      </Container>
    </section>
  );
}
