import { cn } from "@/lib/utils";

export default function Container({
  children,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}) {
  return (
    <Tag className={cn("mx-auto w-full max-w-[1440px] px-6 sm:px-8 lg:px-12", className)}>
      {children}
    </Tag>
  );
}
