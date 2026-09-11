import { useEffect, useRef } from "react";
import { profile } from "../../data/profile";
import SectionHeading from "../ui/SectionHeading";
import { revealOnScroll } from "../../animations/textReveal";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export default function Achievements() {
  const rootRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!rootRef.current || reduced) return;
    rootRef.current.querySelectorAll("[data-reveal]").forEach((el, i) =>
      revealOnScroll(el, { delay: i * 0.05, y: 32 }),
    );
  }, [reduced]);

  return (
    <section
      ref={rootRef}
      aria-label="Activities"
      className="relative mx-auto max-w-7xl px-5 py-32 sm:px-8 sm:py-44"
    >
      <SectionHeading index="06" title="ACTIVITY LOG" hint="WHAT I'VE BEEN UP TO" />

      <ul>
        {profile.achievements.map((a, i) => (
          <li
            key={a.title}
            data-reveal
            className="group border-t border-line py-7 transition-colors last:border-b hover:bg-surface/60"
          >
            <div className="flex flex-col gap-2 px-2 sm:flex-row sm:items-baseline sm:gap-8 sm:px-4">
              <span className="font-display w-10 shrink-0 text-xs tracking-[0.25em] text-muted transition-colors group-hover:text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-1 sm:flex-row sm:flex-1 sm:items-baseline sm:justify-between sm:gap-8">
                <h3 className="font-display text-lg font-semibold tracking-wide transition-transform duration-300 group-hover:translate-x-2 sm:text-xl">
                  {a.title}
                </h3>
                <p className="max-w-md text-sm text-muted">{a.detail}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-6 px-2 text-xs text-muted/70 sm:px-4">
        Edit this list in{" "}
        <code className="text-accent">src/data/profile.ts</code> → achievements.
      </p>
    </section>
  );
}
