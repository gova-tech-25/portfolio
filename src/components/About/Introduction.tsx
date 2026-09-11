import { useEffect, useRef } from "react";
import { profile } from "../../data/profile";
import { splitWords, scrubReveal } from "../../animations/textReveal";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export default function Introduction() {
  const rootRef = useRef<HTMLElement>(null);
  const longRef = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!rootRef.current || reduced) return;
    if (!longRef.current) return;
    const words = splitWords(longRef.current);
    scrubReveal(words, rootRef.current);
  }, [reduced]);

  return (
    <section
      ref={rootRef}
      aria-label="Introduction"
      className="relative mx-auto max-w-7xl px-5 py-32 sm:px-8 sm:py-44"
    >
      <div className="space-y-2">
        {profile.introLines.map((line, i) => (
          <p
            key={line}
            className={`font-display leading-[1.05] font-semibold tracking-tight ${
              i === 1
                ? "stroke-text ml-[8%] text-[clamp(1.9rem,6.5vw,5.5rem)] uppercase"
                : i === 2
                  ? "text-accent ml-[16%] text-[clamp(1.4rem,4.5vw,3.8rem)]"
                  : "text-[clamp(1.6rem,5.5vw,4.6rem)] uppercase"
            }`}
          >
            {line}
          </p>
        ))}
      </div>

      <div className="mt-20 grid gap-10 md:grid-cols-12">
        <span className="font-display hidden text-xs tracking-[0.3em] text-muted md:col-span-3 md:block">
          ( WHO I AM )
        </span>
        <p
          ref={longRef}
          className="font-display max-w-3xl text-xl leading-snug font-medium text-text/95 sm:text-3xl md:col-span-9 md:text-4xl"
        >
          {profile.introLong}
        </p>
      </div>
    </section>
  );
}
