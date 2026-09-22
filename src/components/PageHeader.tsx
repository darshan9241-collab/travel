import PhotoFrame from "./PhotoFrame";
import Container from "./Container";
import type { PhotoRef } from "@/types";

interface PageHeaderProps {
  label: string;
  heading: React.ReactNode;
  description?: string;
  photo: PhotoRef;
}

export default function PageHeader({
  label,
  heading,
  description,
  photo,
}: PageHeaderProps) {
  return (
    <section className="relative flex min-h-[52vh] w-full items-end overflow-hidden bg-forest pt-28">
      <div className="absolute inset-0">
        <PhotoFrame photo={photo} priority sizes="100vw" showLabel={false} className="h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest/95 via-forest/70 to-forest/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest/60 via-forest/15 to-transparent" />
      </div>

      <Container className="relative z-10 pb-14 sm:pb-16">
        <span className="mb-4 block font-sans text-xs font-semibold uppercase tracking-[0.3em] text-gold sm:text-sm">
          {label}
        </span>
        <h1 className="max-w-3xl font-serif text-4xl leading-[1.1] text-white-warm sm:text-5xl lg:text-6xl">
          {heading}
        </h1>
        {description && (
          <p className="mt-5 max-w-xl text-base leading-relaxed text-cream/85 sm:text-lg">
            {description}
          </p>
        )}
      </Container>
    </section>
  );
}
