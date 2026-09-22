import Link from "next/link";
import PhotoFrame from "./PhotoFrame";
import type { PhotoRef } from "@/types";
import { cn } from "@/lib/utils";

interface GalleryCardProps {
  photo: PhotoRef;
  className?: string;
  priority?: boolean;
}

export default function GalleryCard({
  photo,
  className,
  priority = false,
}: GalleryCardProps) {
  return (
    <Link
      href="/gallery"
      className={cn("group relative block aspect-[4/5] w-full overflow-hidden bg-forest", className)}
    >
      <PhotoFrame
        photo={photo}
        priority={priority}
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        showLabel={false}
      />
    </Link>
  );
}
