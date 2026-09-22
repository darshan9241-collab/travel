import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "solid" | "outline" | "link";
type Tone = "dark" | "light";

interface BaseProps {
  variant?: Variant;
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
}

interface LinkButtonProps extends BaseProps {
  href: string;
  type?: never;
  onClick?: never;
}

interface NativeButtonProps extends BaseProps {
  href?: never;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
}

type ButtonProps = LinkButtonProps | NativeButtonProps;

const solidStyles =
  "bg-terracotta text-white-warm hover:bg-terracotta-dark focus-visible:outline-white-warm";

const outlineStyles: Record<Tone, string> = {
  dark: "border border-white-warm/50 text-white-warm hover:bg-white-warm hover:text-forest",
  light: "border border-forest/30 text-forest hover:bg-forest hover:text-white-warm",
};

const linkStyles: Record<Tone, string> = {
  dark: "text-white-warm hover:text-gold",
  light: "text-terracotta hover:text-terracotta-dark",
};

function getClasses(variant: Variant, tone: Tone, className?: string) {
  if (variant === "solid") {
    return cn(
      "inline-flex items-center justify-center gap-2 rounded-none px-7 py-3.5 text-sm font-medium tracking-wide transition-colors duration-300",
      solidStyles,
      className,
    );
  }
  if (variant === "outline") {
    return cn(
      "inline-flex items-center justify-center gap-2 rounded-none px-7 py-3.5 text-sm font-medium tracking-wide transition-colors duration-300",
      outlineStyles[tone],
      className,
    );
  }
  return cn(
    "group/btn inline-flex items-center gap-2 text-sm font-medium tracking-wide transition-colors duration-300",
    linkStyles[tone],
    className,
  );
}

export default function Button({
  variant = "solid",
  tone = "light",
  className,
  children,
  href,
  ...rest
}: ButtonProps) {
  const classes = getClasses(variant, tone, className);
  const content =
    variant === "link" ? (
      <>
        <span>{children}</span>
        <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover/btn:translate-x-1">
          →
        </span>
      </>
    ) : (
      children
    );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  const { type = "button", onClick, disabled } = rest as NativeButtonProps;

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {content}
    </button>
  );
}
