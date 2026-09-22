import RevealOnScroll from "./RevealOnScroll";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label: string;
  heading: React.ReactNode;
  description?: string;
  tone?: "dark" | "light";
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  label,
  heading,
  description,
  tone = "light",
  align = "left",
  className,
}: SectionHeadingProps) {
  const isDark = tone === "dark";

  return (
    <RevealOnScroll
      className={cn(align === "center" && "text-center", className)}
    >
      <span
        className={cn(
          "mb-4 block font-sans text-xs font-semibold uppercase tracking-[0.25em] sm:text-sm",
          isDark ? "text-gold" : "text-terracotta",
        )}
      >
        {label}
      </span>
      <h2
        className={cn(
          "font-serif text-4xl leading-[1.1] sm:text-5xl lg:text-6xl",
          isDark ? "text-white-warm" : "text-forest",
        )}
      >
        {heading}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-5 max-w-xl text-base leading-relaxed sm:text-lg",
            align === "center" && "mx-auto",
            isDark ? "text-cream/85" : "text-forest/70",
          )}
        >
          {description}
        </p>
      )}
    </RevealOnScroll>
  );
}
