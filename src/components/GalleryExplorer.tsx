"use client";

import { useState } from "react";
import PhotoFrame from "./PhotoFrame";
import ImageGallery from "./ImageGallery";
import type { PhotoRef } from "@/types";

export interface GalleryCollection {
  slug: string;
  title: string;
  cover: PhotoRef;
  images: PhotoRef[];
}

interface GalleryExplorerProps {
  collections: GalleryCollection[];
}

export default function GalleryExplorer({ collections }: GalleryExplorerProps) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const active = collections.find((collection) => collection.slug === activeSlug) ?? null;

  if (active) {
    return (
      <div>
        <button
          type="button"
          onClick={() => setActiveSlug(null)}
          className="mb-8 inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-forest/60 transition-colors hover:text-terracotta"
        >
          ← All Photos
        </button>
        <h2 className="mb-8 font-serif text-3xl text-forest sm:text-4xl">{active.title}</h2>
        <ImageGallery images={active.images} showLabels={false} />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
      {collections.map((collection) => (
        <button
          key={collection.slug}
          type="button"
          onClick={() => setActiveSlug(collection.slug)}
          className="group relative aspect-[4/5] w-full overflow-hidden bg-forest text-left"
          aria-label={`View photos from ${collection.title}`}
        >
          <PhotoFrame photo={collection.cover} sizes="(min-width: 768px) 33vw, 50vw" showLabel={false} />
          <div className="absolute inset-0 bg-gradient-to-t from-forest/85 via-forest/15 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
            <span className="block font-serif text-xl text-white-warm sm:text-2xl">{collection.title}</span>
            <span className="mt-1 block font-sans text-xs uppercase tracking-[0.15em] text-cream/80">
              {collection.images.length} photo{collection.images.length === 1 ? "" : "s"}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}
