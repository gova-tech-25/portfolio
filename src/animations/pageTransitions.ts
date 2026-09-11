import gsap from "gsap";
import { scrollToSection } from "../hooks/useLenis";

let overlayEl: HTMLElement | null = null;
let busy = false;

export function registerTransitionOverlay(el: HTMLElement | null) {
  overlayEl = el;
}

/**
 * Branded page transition: fast dark wipe with the name flashing through,
 * while we smooth-scroll to the target section underneath.
 */
export function pageTransition(targetId: string) {
  if (!overlayEl || busy) {
    scrollToSection(targetId);
    return;
  }
  busy = true;
  const label = overlayEl.querySelector("[data-transition-word]");
  const tl = gsap.timeline({ onComplete: () => (busy = false) });
  tl.set(overlayEl, { display: "flex" })
    .fromTo(
      overlayEl,
      { clipPath: "inset(100% 0% 0% 0%)" },
      { clipPath: "inset(0% 0% 0% 0%)", duration: 0.32, ease: "power3.inOut" },
    )
    .fromTo(
      label,
      { autoAlpha: 0, y: 30 },
      { autoAlpha: 1, y: 0, duration: 0.22, ease: "power2.out" },
      "-=0.08",
    )
    .add(() => scrollToSection(targetId, true), "+=0.05")
    .to(label, { autoAlpha: 0, y: -30, duration: 0.18, ease: "power2.in" })
    .to(
      overlayEl,
      {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: 0.34,
        ease: "power3.inOut",
      },
      "<",
    )
    .set(overlayEl, { display: "none", clipPath: "inset(100% 0% 0% 0%)" });
}
