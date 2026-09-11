import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Clip-path image reveal + parallax for project cards within one scope. */
export function initProjectAnimations(scope: HTMLElement): () => void {
  const ctx = gsap.context(() => {
    scope.querySelectorAll<HTMLElement>("[data-project]").forEach((card) => {
      const visual = card.querySelector("[data-project-visual]");
      const media = card.querySelector("[data-project-media]");

      if (visual && media && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.fromTo(
          visual,
          { clipPath: "inset(12% 8% 12% 8% round 24px)", scale: 0.96 },
          {
            clipPath: "inset(0% 0% 0% 0% round 24px)",
            scale: 1,
            ease: "none",
            scrollTrigger: { trigger: card, start: "top 92%", end: "top 35%", scrub: 0.5 },
          },
        );
        gsap.fromTo(
          media,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: { trigger: visual, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      }

      gsap.from(card.querySelectorAll("[data-project-reveal]"), {
        autoAlpha: 0,
        y: 36,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: card, start: "top 75%" },
      });
    });

    // Big section title slide
    gsap.from(scope.querySelectorAll("[data-work-title]"), {
      xPercent: -6,
      autoAlpha: 0,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: { trigger: scope, start: "top 80%" },
    });
  }, scope);

  return () => ctx.revert();
}
