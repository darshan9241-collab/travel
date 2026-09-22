import Image from "next/image";
import PlaceholderPhoto from "./PlaceholderPhoto";
import type { PhotoRef } from "@/types";
import { cn } from "@/lib/utils";

interface PhotoFrameProps {
  photo: PhotoRef;
  sizes?: string;
  priority?: boolean;
  className?: string;
  showLabel?: boolean;
}

/**
 * Renders a real photograph via next/image once `photo.exists` is true
 * (resolved server-side in the data layer). Until a real file is dropped in
 * at `photo.src`, it renders a tasteful editorial placeholder instead. Pure
 * and presentational — safe to use from both server and client components.
 */
export default function PhotoFrame({
  photo,
  sizes = "100vw",
  priority = false,
  className,
  showLabel = true,
}: PhotoFrameProps) {
  if (photo.exists) {
    return (
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn("img-zoom object-cover", className)}
      />
    );
  }

  return (
    <PlaceholderPhoto
      tone={photo.tone}
      variant={photo.variant}
      label={photo.label ?? photo.alt}
      showLabel={showLabel}
      className={cn("img-zoom", className)}
    />
  );
}
