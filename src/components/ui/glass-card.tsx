"use client";

import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export function GlassCard({ children, className, hover = true, glow = false }: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass rounded-2xl p-6 transition-all duration-500",
        hover && "hover:bg-surface-hover hover:translate-y-[-2px]",
        glow && "hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]",
        className
      )}
    >
      {children}
    </div>
  );
}
