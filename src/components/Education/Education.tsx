import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { profile } from "../../data/profile";
import SectionHeading from "../ui/SectionHeading";
import { revealOnScroll } from "../../animations/textReveal";
import { useReducedMotion } from "../../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export default function Education() {
  const rootRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!rootRef.current || reduced) return;
    const ctx = gsap.context(() => {
      rootRef.current!.querySelectorAll("[data-reveal]").forEach((el) => revealOnScroll(el));
      gsap.fromTo(
        "[data-edu-line]",
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top center",
          ease: "none",
          scrollTrigger: { trigger: "[data-edu-track]", start: "top 75%", end: "bottom 60%", scrub: 0.5 },
        },
      );
    }, rootRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={rootRef}
      aria-label="Education"
      className="relative mx-auto max-w-7xl px-5 py-32 sm:px-8 sm:py-44"
    >
      <SectionHeading index="05" title="THE PATH" hint="EDUCATION" />

      <div data-edu-track className="relative ml-3 border-l border-line pl-8 sm:ml-6 sm:pl-14">
        <span data-edu-line className="absolute top-0 bottom-0 left-[-1px] w-[2px] bg-accent/80" aria-hidden="true" />
        <div className="space-y-20">
          {profile.education.map((item) => (
            <div key={item.year} data-reveal className="relative">
              <span
                className="accent-glow absolute top-2 left-0 h-3 w-3 -translate-x-[calc(100%+1.65rem)] rounded-full bg-accent sm:-translate-x-[calc(100%+3.4rem)]"
                aria-hidden="true"
              />
              <p className="font-display stroke-text text-[clamp(3rem,9vw,7rem)] leading-none font-bold">
                {item.year}
              </p>
              <h3 className="font-display mt-3 text-xl font-semibold tracking-wide sm:text-2xl">
                {item.title}
              </h3>
              <p className="mt-1 text-sm text-accent">{item.place}</p>
              <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
                {item.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
