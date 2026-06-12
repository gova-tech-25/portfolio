"use client";

import { cn } from "@/lib/utils";

interface GradientBlobProps {
  className?: string;
  color?: string;
  style?: React.CSSProperties;
}

export function GradientBlob({ className, color, style }: GradientBlobProps) {
  return (
    <div
      className={cn(
        "absolute rounded-full blur-[100px] opacity-20 animate-blob pointer-events-none",
        color || "bg-gradient-to-r from-primary to-secondary",
        className
      )}
      style={style}
    />
  );
}

export function GradientBlobs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      <GradientBlob className="w-[500px] h-[500px] -top-48 -left-48 bg-gradient-to-r from-primary/20 to-secondary/20 animate-blob" />
      <GradientBlob
        className="w-[400px] h-[400px] top-1/2 -right-48 bg-gradient-to-r from-purple-500/20 to-pink-500/20 animate-blob"
        style={{ animationDelay: "2s" }}
      />
      <GradientBlob
        className="w-[350px] h-[350px] -bottom-48 left-1/3 bg-gradient-to-r from-amber-500/10 to-rose-500/10 animate-blob"
        style={{ animationDelay: "4s" }}
      />
    </div>
  );
}
