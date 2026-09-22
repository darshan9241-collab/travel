import Link from "next/link";
import Container from "./Container";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

// Add real profile URLs here whenever they're ready — links render only once a URL is set.
const SOCIAL_LINKS: { label: string; href: string }[] = [
  { label: "Instagram", href: "" },
  { label: "YouTube", href: "" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white-warm/10 bg-forest text-white-warm">
      <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div className="max-w-sm">
          <Link href="/" className="font-serif text-2xl text-white-warm">
            Wanderlouge
          </Link>
          <p className="mt-4 font-serif text-lg italic text-cream/80">
            Where journeys become stories.
          </p>
          <p className="mt-6 text-sm leading-relaxed text-cream/60">
            A personal collection of places explored, roads travelled, and
            moments remembered by Darshan R.
          </p>
        </div>

        <div>
          <span className="block font-sans text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Explore
          </span>
          <nav className="mt-5 flex flex-col gap-3" aria-label="Footer">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="w-fit text-sm text-cream/75 transition-colors duration-300 hover:text-white-warm"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <span className="block font-sans text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Connect
          </span>
          <div className="mt-5 flex flex-col gap-3 text-sm text-cream/75">
            <a href="mailto:darshan9241@gmail.com" className="w-fit transition-colors duration-300 hover:text-white-warm">
              darshan9241@gmail.com
            </a>
            <span>Bangalore, India</span>
          </div>
          {SOCIAL_LINKS.some((s) => s.href) && (
            <div className="mt-6 flex gap-5">
              {SOCIAL_LINKS.filter((s) => s.href).map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-cream/75 transition-colors duration-300 hover:text-white-warm"
                >
                  {social.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </Container>

      <div className="border-t border-white-warm/10">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-xs text-cream/50 sm:flex-row">
          <p>© {year} Wanderlouge. All rights reserved.</p>
          <p>Designed &amp; written by Darshan R.</p>
        </Container>
      </div>
    </footer>
  );
}
