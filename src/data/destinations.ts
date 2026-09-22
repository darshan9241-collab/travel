import { resolvePhoto } from "@/lib/images";
import type { Destination } from "@/types";
import { rawDestinations } from "@/data/destinations.raw";

export const destinations: Destination[] = rawDestinations.map((destination) => ({
  ...destination,
  heroImage: resolvePhoto(destination.heroImage),
  galleryImages: destination.galleryImages.map(resolvePhoto),
}));
