import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost" | "outline";
}

export function Badge({ children, className, variant = "primary" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 text-xs font-medium rounded-full transition-colors",
        variant === "primary" && "bg-primary/10 text-primary border border-primary/20",
        variant === "secondary" && "bg-surface text-foreground border border-[var(--border)] hover:bg-surface-hover",
        variant === "ghost" && "text-muted hover:text-foreground hover:bg-surface",
        variant === "outline" && "border border-primary/30 text-primary hover:bg-primary/10 hover:border-primary",
        className
      )}
    >
      {children}
    </span>
  );
}
