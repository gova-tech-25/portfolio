import { cn } from "@/lib/utils";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  external?: boolean;
}

export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  href,
  onClick,
  type = "button",
  disabled = false,
  external = false,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50";

  const variants = {
    primary:
      "bg-gradient-to-r from-primary to-purple-600 text-white hover:shadow-[0_0_25px_rgba(99,102,241,0.4)] hover:scale-105 active:scale-95",
    secondary:
      "bg-surface text-foreground border border-[var(--border)] hover:bg-surface-hover hover:border-primary/30",
    ghost:
      "text-muted hover:text-foreground hover:bg-surface",
    outline:
      "border border-primary/30 text-primary hover:bg-primary/10 hover:border-primary",
  };

  const sizes = {
    sm: "px-4 py-1.5 text-sm gap-1.5",
    md: "px-6 py-2.5 text-sm gap-2",
    lg: "px-8 py-3 text-base gap-2.5",
  };

  const classes = cn(base, variants[variant], sizes[size], disabled && "opacity-50 pointer-events-none", className);

  if (href && external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
