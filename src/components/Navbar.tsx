"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import SearchOverlay from "@/components/search/SearchOverlay";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen((isOpen) => !isOpen);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const solid = scrolled || menuOpen;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        solid
          ? "border-b border-forest/10 bg-white-warm/95 backdrop-blur-sm"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-6 py-5 sm:px-8 lg:px-12">
        <Link
          href="/"
          className={cn(
            "font-serif text-xl tracking-wide transition-colors duration-300 sm:text-2xl",
            solid ? "text-forest" : "text-white-warm",
          )}
        >
          Wanderlouge
        </Link>

        <div className="flex items-center gap-10 lg:gap-12">
          <nav className="hidden items-center gap-10 md:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => {
              const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "font-sans text-xs font-medium uppercase tracking-[0.15em] transition-colors duration-300",
                    solid ? "text-forest hover:text-terracotta" : "text-white-warm hover:text-gold",
                    active && (solid ? "text-terracotta" : "text-gold"),
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-5 md:border-l md:border-current/15 md:pl-6">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className={cn(
                "flex h-9 w-9 items-center justify-center transition-colors duration-300",
                solid ? "text-forest hover:text-terracotta" : "text-white-warm hover:text-gold",
              )}
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" strokeLinecap="round" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className={cn(
                "flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden",
                solid ? "text-forest" : "text-white-warm",
              )}
            >
              <span
                className={cn(
                  "block h-px w-6 bg-current transition-transform duration-300",
                  menuOpen && "translate-y-[3.5px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "block h-px w-6 bg-current transition-transform duration-300",
                  menuOpen && "-translate-y-[3.5px] -rotate-45",
                )}
              />
            </button>
          </div>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={cn(
          "overflow-hidden bg-white-warm transition-[max-height] duration-500 ease-in-out md:hidden",
          menuOpen ? "max-h-96" : "max-h-0",
        )}
      >
        <nav
          className="flex flex-col gap-1 px-6 pb-8 pt-2 sm:px-8"
          aria-label="Mobile"
        >
          {NAV_LINKS.map((link) => {
            const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "border-b border-forest/10 py-4 font-serif text-2xl text-forest transition-colors duration-300",
                  active && "text-terracotta",
                )}
                aria-current={active ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
    </header>
  );
}
