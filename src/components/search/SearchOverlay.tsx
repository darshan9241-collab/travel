"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { searchSite, type SearchItem } from "@/lib/search";

const TYPE_LABEL: Record<SearchItem["type"], string> = {
  page: "Page",
  destination: "Destination",
  story: "Story",
};

interface SearchOverlayProps {
  onClose: () => void;
}

export default function SearchOverlay({ onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = searchSite(query);

  useEffect(() => {
    const id = window.setTimeout(() => inputRef.current?.focus(), 50);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveIndex((index) => Math.min(index + 1, results.length - 1));
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveIndex((index) => Math.max(index - 1, 0));
      } else if (event.key === "Enter") {
        const result = results[activeIndex];
        if (result) {
          window.location.href = result.href;
          onClose();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [results, activeIndex, onClose]);

  function handleQueryChange(value: string) {
    setQuery(value);
    setActiveIndex(0);
  }

  return (
    <div className="fixed inset-0 z-[100]">
      <button
        type="button"
        aria-label="Close search"
        onClick={onClose}
        className="absolute inset-0 bg-forest/60 backdrop-blur-sm"
      />
      <div className="relative mx-auto mt-24 w-full max-w-xl px-4 sm:mt-32">
        <div className="border border-forest/10 bg-white-warm shadow-2xl">
          <div className="flex items-center gap-3 border-b border-forest/10 px-5 py-4">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-5 w-5 flex-shrink-0 text-forest/50"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" strokeLinecap="round" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(event) => handleQueryChange(event.target.value)}
              placeholder="Search destinations, stories, pages…"
              aria-label="Search Wanderlouge"
              className="w-full bg-transparent font-sans text-base text-forest placeholder:text-forest/40 focus:outline-none"
            />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close search"
              className="flex-shrink-0 font-sans text-xs uppercase tracking-widest text-forest/40 hover:text-terracotta"
            >
              Esc
            </button>
          </div>

          <div className="max-h-[60vh] overflow-y-auto">
            {query.trim() === "" ? (
              <p className="px-5 py-10 text-center text-sm text-forest/50">
                Try &ldquo;Goa&rdquo;, &ldquo;Coorg&rdquo;, or &ldquo;contact&rdquo;.
              </p>
            ) : results.length === 0 ? (
              <p className="px-5 py-10 text-center text-sm text-forest/50">
                No results for &ldquo;{query}&rdquo;.
              </p>
            ) : (
              <ul>
                {results.map((result, index) => (
                  <li key={`${result.type}-${result.title}`}>
                    <Link
                      href={result.href}
                      onClick={onClose}
                      onMouseEnter={() => setActiveIndex(index)}
                      className={cn(
                        "flex items-center justify-between gap-4 border-b border-forest/5 px-5 py-4 transition-colors duration-150 last:border-b-0",
                        index === activeIndex ? "bg-cream/60" : "bg-transparent",
                      )}
                    >
                      <span className="min-w-0">
                        <span className="block truncate font-serif text-lg text-forest">
                          {result.title}
                        </span>
                        <span className="mt-0.5 block truncate text-sm text-forest/55">
                          {result.subtitle ?? result.description}
                        </span>
                      </span>
                      <span className="flex-shrink-0 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-terracotta">
                        {TYPE_LABEL[result.type]}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
