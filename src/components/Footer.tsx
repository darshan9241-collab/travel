import Link from "next/link";
import Container from "./Container";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

type SocialPlatform =
  | "Instagram"
  | "YouTube"
  | "Facebook"
  | "X"
  | "Pinterest"
  | "TikTok"
  | "LinkedIn"
  | "Threads";

// Add real profile URLs here whenever they're ready — an icon only renders
// once its href is set, so these stay ready to go live one at a time.
const SOCIAL_LINKS: { label: SocialPlatform; href: string }[] = [
  { label: "Instagram", href: "https://www.instagram.com/wander_louge?stkn=MjNzZ2QyYXN5dDV0" },
  { label: "YouTube", href: "" },
  { label: "Facebook", href: "" },
  { label: "X", href: "" },
  { label: "Pinterest", href: "" },
  { label: "TikTok", href: "" },
  { label: "LinkedIn", href: "" },
  { label: "Threads", href: "" },
];

function SocialIcon({ platform }: { platform: SocialPlatform }) {
  const iconProps = {
    "aria-hidden": true as const,
    viewBox: "0 0 24 24",
    className: "h-5 w-5",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (platform) {
    case "Instagram":
      return (
        <svg {...iconProps}>
          <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
          <circle cx="12" cy="12" r="4.3" />
          <circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" stroke="none" />
        </svg>
      );
    case "YouTube":
      return (
        <svg {...iconProps}>
          <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
          <path d="M10.5 9.3v5.4l4.8-2.7-4.8-2.7z" fill="currentColor" stroke="none" />
        </svg>
      );
    case "Facebook":
      return (
        <svg {...iconProps}>
          <path d="M15 3h-2a4 4 0 0 0-4 4v3H6v4h3v7h4v-7h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      );
    case "X":
      return (
        <svg {...iconProps}>
          <path d="M5 5l14 14M19 5 5 19" />
        </svg>
      );
    case "TikTok":
      return (
        <svg {...iconProps}>
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      );
    case "Pinterest":
      return (
        <svg {...iconProps}>
          <circle cx="12" cy="12" r="9.5" />
          <text x="12" y="12.5" textAnchor="middle" dominantBaseline="central" fontSize="12" fontWeight="700" fill="currentColor" stroke="none">
            P
          </text>
        </svg>
      );
    case "LinkedIn":
      return (
        <svg {...iconProps}>
          <rect x="2.5" y="2.5" width="19" height="19" rx="4" />
          <text x="12" y="12.5" textAnchor="middle" dominantBaseline="central" fontSize="10" fontWeight="700" fill="currentColor" stroke="none">
            in
          </text>
        </svg>
      );
    case "Threads":
      return (
        <svg {...iconProps}>
          <circle cx="12" cy="12" r="9.5" />
          <text x="12" y="12.5" textAnchor="middle" dominantBaseline="central" fontSize="12" fontWeight="700" fill="currentColor" stroke="none">
            @
          </text>
        </svg>
      );
    default:
      return null;
  }
}

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
            <a href="mailto:wanderlouge@gmail.com" className="w-fit transition-colors duration-300 hover:text-white-warm">
              wanderlouge@gmail.com
            </a>
            <span>Bangalore, India</span>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            {SOCIAL_LINKS.map((social) =>
              social.href ? (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center border border-white-warm/15 text-cream/75 transition-colors duration-300 hover:border-gold hover:text-gold"
                >
                  <SocialIcon platform={social.label} />
                </a>
              ) : (
                <span
                  key={social.label}
                  aria-label={`${social.label} — coming soon`}
                  title="Coming soon"
                  className="flex h-10 w-10 cursor-not-allowed items-center justify-center border border-white-warm/10 text-cream/30"
                >
                  <SocialIcon platform={social.label} />
                </span>
              ),
            )}
          </div>
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
