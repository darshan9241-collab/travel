"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

const COOKIE_NAME = "googtrans";
const KANNADA_VALUE = "/en/kn";

function getCookie(name: string): string | undefined {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

function setTranslateCookie(value: string | null) {
  if (value) {
    // Set on both the bare host and the dot-prefixed host — Google's widget
    // reads the cookie inconsistently across the two depending on setup.
    document.cookie = `${COOKIE_NAME}=${value}; path=/`;
    document.cookie = `${COOKIE_NAME}=${value}; path=/; domain=.${window.location.hostname}`;
  } else {
    document.cookie = `${COOKIE_NAME}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
    document.cookie = `${COOKIE_NAME}=; path=/; domain=.${window.location.hostname}; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
  }
}

// The cookie only ever changes via our own toggle, which reloads the page —
// so there's nothing to subscribe to; this just gives the client/server a
// consistent snapshot without setState-in-effect.
function subscribe() {
  return () => {};
}

function getSnapshot(): boolean {
  return getCookie(COOKIE_NAME) === KANNADA_VALUE;
}

function getServerSnapshot(): boolean {
  return false;
}

export default function TranslateButton({ className }: { className?: string }) {
  const isKannada = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function selectLanguage(kannada: boolean) {
    setOpen(false);
    if (kannada === isKannada) return;
    setTranslateCookie(kannada ? KANNADA_VALUE : null);
    window.location.reload();
  }

  return (
    <div ref={rootRef} className={cn("notranslate relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Change language"
        className="flex h-9 w-9 items-center justify-center transition-colors duration-300"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18" />
          <path d="M12 3c2.4 2.6 3.7 5.7 3.7 9s-1.3 6.4-3.7 9c-2.4-2.6-3.7-5.7-3.7-9s1.3-6.4 3.7-9z" />
        </svg>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-20 mt-3 w-40 border border-forest/10 bg-white-warm py-1.5 shadow-lg"
        >
          <button
            type="button"
            role="menuitem"
            onClick={() => selectLanguage(false)}
            className={cn(
              "flex w-full items-center justify-between px-4 py-2.5 text-left font-sans text-sm text-forest transition-colors hover:bg-cream",
              !isKannada && "font-semibold text-terracotta",
            )}
          >
            English
          </button>
          <button
            type="button"
            role="menuitem"
            onClick={() => selectLanguage(true)}
            className={cn(
              "flex w-full items-center justify-between px-4 py-2.5 text-left font-sans text-sm text-forest transition-colors hover:bg-cream",
              isKannada && "font-semibold text-terracotta",
            )}
          >
            ಕನ್ನಡ
          </button>
        </div>
      )}
    </div>
  );
}
