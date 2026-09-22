"use client";

import { useEffect, useRef, useState } from "react";
import PhotoFrame from "./PhotoFrame";
import type { PhotoRef } from "@/types";

interface ImageGalleryProps {
  images: PhotoRef[];
  showLabels?: boolean;
}

export default function ImageGallery({ images, showLabels = true }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const open = (index: number) => {
    triggerRef.current = document.activeElement as HTMLButtonElement;
    setActiveIndex(index);
  };

  const close = () => {
    setActiveIndex(null);
    triggerRef.current?.focus();
  };

  useEffect(() => {
    if (activeIndex === null) return;
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") {
        setActiveIndex((i) => (i === null ? i : (i + 1) % images.length));
      }
      if (event.key === "ArrowLeft") {
        setActiveIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length));
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeIndex, images.length]);

  if (images.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
        {images.map((image, index) => (
          <button
            key={image.src + index}
            type="button"
            onClick={() => open(index)}
            className="group relative aspect-[4/5] w-full overflow-hidden bg-forest text-left"
            aria-label={`View larger image: ${image.alt}`}
          >
            <PhotoFrame photo={image} sizes="(min-width: 768px) 33vw, 50vw" showLabel={false} />
          </button>
        ))}
      </div>

      {activeIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-forest/95 p-4 sm:p-10"
        >
          <button
            ref={closeButtonRef}
            type="button"
            onClick={close}
            className="absolute right-5 top-5 font-sans text-sm uppercase tracking-[0.2em] text-white-warm transition-colors hover:text-gold sm:right-8 sm:top-8"
          >
            Close ✕
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => setActiveIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length))}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-3 text-2xl text-white-warm transition-colors hover:text-gold sm:left-6"
                aria-label="Previous image"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => setActiveIndex((i) => (i === null ? i : (i + 1) % images.length))}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-3 text-2xl text-white-warm transition-colors hover:text-gold sm:right-6"
                aria-label="Next image"
              >
                →
              </button>
            </>
          )}

          <div className="relative aspect-[4/5] w-full max-w-2xl overflow-hidden">
            <PhotoFrame photo={images[activeIndex]} sizes="90vw" showLabel={showLabels} />
          </div>
        </div>
      )}
    </>
  );
}
