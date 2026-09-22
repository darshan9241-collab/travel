import type { PlaceholderTone, PlaceholderVariant } from "@/types";
import { cn } from "@/lib/utils";

interface PlaceholderPhotoProps {
  tone?: PlaceholderTone;
  variant?: PlaceholderVariant;
  label?: string;
  showLabel?: boolean;
  className?: string;
}

const toneStops: Record<PlaceholderTone, [string, string]> = {
  forest: ["#1c4235", "#0d2b21"],
  terracotta: ["#e29467", "#b85c30"],
  gold: ["#ddc496", "#a5854f"],
  dusk: ["#1f3b30", "#081b14"],
};

const lineColor: Record<PlaceholderTone, string> = {
  forest: "rgba(245, 241, 232, 0.5)",
  terracotta: "rgba(250, 248, 242, 0.55)",
  gold: "rgba(13, 43, 33, 0.35)",
  dusk: "rgba(199, 166, 106, 0.55)",
};

function Motif({ variant, stroke }: { variant: PlaceholderVariant; stroke: string }) {
  switch (variant) {
    case "hills":
      return (
        <>
          <path d="M-20 340 Q 100 260 220 320 T 420 300 V520 H-20 Z" fill={stroke} opacity={0.25} />
          <path d="M-20 400 Q 120 320 240 380 T 420 360 V520 H-20 Z" fill={stroke} opacity={0.4} />
          <path d="M-20 450 Q 140 390 260 430 T 420 410 V520 H-20 Z" fill={stroke} opacity={0.6} />
        </>
      );
    case "palace":
      return (
        <>
          <circle cx="200" cy="230" r="10" fill={stroke} opacity={0.7} />
          <path
            d="M100 420 V300 h20 v-30 a30 30 0 0 1 60 0 v30 h20 v-60 a30 30 0 0 1 60 0 v60 h20 v30 h20 v120 Z"
            fill={stroke}
            opacity={0.55}
          />
          <rect x="80" y="420" width="240" height="10" fill={stroke} opacity={0.55} />
        </>
      );
    case "coast":
      return (
        <>
          <circle cx="320" cy="180" r="46" fill={stroke} opacity={0.35} />
          <path d="M-20 330 Q 80 300 180 330 T 420 330 V520 H-20 Z" fill={stroke} opacity={0.3} />
          <path d="M-20 390 Q 100 360 200 390 T 420 390 V520 H-20 Z" fill={stroke} opacity={0.45} />
          <path d="M-20 450 Q 120 420 220 450 T 420 450 V520 H-20 Z" fill={stroke} opacity={0.65} />
        </>
      );
    case "backwater":
      return (
        <>
          <path d="M280 200 q10 -40 30 -50 q-4 30 6 46 q-20 8 -36 4Z" fill={stroke} opacity={0.6} />
          <path d="M290 210 q26 -30 50 -32 q-14 24 -6 42 q-24 4 -44 -10Z" fill={stroke} opacity={0.5} />
          <rect x="300" y="205" width="8" height="90" fill={stroke} opacity={0.6} />
          <path d="M-20 360 H420" stroke={stroke} strokeWidth="2" opacity={0.4} />
          <path d="M-20 400 H420" stroke={stroke} strokeWidth="2" opacity={0.3} />
          <path d="M-20 440 H420" stroke={stroke} strokeWidth="2" opacity={0.25} />
        </>
      );
    case "desert":
      return (
        <>
          <circle cx="90" cy="160" r="38" fill={stroke} opacity={0.4} />
          <path d="M-20 380 Q 100 320 220 370 T 420 350 V520 H-20 Z" fill={stroke} opacity={0.4} />
          <path d="M-20 430 Q 140 380 260 420 T 420 400 V520 H-20 Z" fill={stroke} opacity={0.6} />
        </>
      );
    case "ghats":
      return (
        <>
          <path d="M-20 330 L60 250 L130 310 L210 220 L300 300 L360 260 L420 310 V520 H-20 Z" fill={stroke} opacity={0.35} />
          <path d="M-20 400 L80 330 L160 390 L250 310 L340 380 L420 340 V520 H-20 Z" fill={stroke} opacity={0.55} />
        </>
      );
    default:
      return null;
  }
}

export default function PlaceholderPhoto({
  tone = "forest",
  variant = "hills",
  label,
  showLabel = true,
  className,
}: PlaceholderPhotoProps) {
  const uid = `${variant}-${tone}-${(label ?? "photo").replace(/[^a-zA-Z0-9]/g, "").slice(0, 24)}`;
  const [from, to] = toneStops[tone];
  const stroke = lineColor[tone];

  return (
    <div className={cn("relative h-full w-full overflow-hidden bg-forest", className)}>
      <svg
        viewBox="0 0 400 520"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        role="img"
        aria-label={label ? `Editorial illustration representing ${label}` : "Editorial placeholder illustration"}
      >
        <defs>
          <linearGradient id={`${uid}-sky`} x1="0" y1="0" x2="0.3" y2="1">
            <stop offset="0%" stopColor={from} />
            <stop offset="100%" stopColor={to} />
          </linearGradient>
          <filter id={`${uid}-grain`}>
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" result="noise" />
            <feColorMatrix in="noise" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.035 0" />
          </filter>
        </defs>
        <rect width="400" height="520" fill={`url(#${uid}-sky)`} />
        <Motif variant={variant} stroke={stroke} />
        <rect width="400" height="520" filter={`url(#${uid}-grain)`} />
      </svg>
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/5" />
      {showLabel && label && (
        <div className="absolute bottom-5 left-5 right-5">
          <span className="font-sans text-xs uppercase tracking-[0.2em] text-white-warm/90">
            {label}
          </span>
        </div>
      )}
    </div>
  );
}
