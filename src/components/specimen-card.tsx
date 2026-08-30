import { cn } from "../lib/utils";

interface SpecimenCardProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Flat, hard-edged specimen frame. Deliberately no spotlight or glow —
 * depth comes from a solid offset shadow that snaps on hover.
 */
export function SpecimenCard({ children, className }: SpecimenCardProps) {
  return (
    <div
      className={cn(
        "group relative border border-foreground/25 bg-card transition-all duration-200 ease-out",
        "hover:-translate-x-0.5 hover:-translate-y-0.5 hover:border-foreground hover:hard-shadow",
        className,
      )}
    >
      {/* Corner tick — a registration mark, replaces the old border glow */}
      <span className="pointer-events-none absolute right-0 top-0 h-2 w-2 bg-ocean opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
      {children}
    </div>
  );
}
