import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Wrap each character in a mask span for staggered reveals. */
export function splitChars(el: HTMLElement): HTMLElement[] {
  const text = el.textContent ?? "";
  el.textContent = "";
  el.setAttribute("aria-label", text);
  const inners: HTMLElement[] = [];
  for (const ch of text) {
    const mask = document.createElement("span");
    mask.className = "char-mask";
    mask.setAttribute("aria-hidden", "true");
    const inner = document.createElement("span");
    inner.className = "char-inner";
    inner.textContent = ch === " " ? "\u00A0" : ch;
    mask.appendChild(inner);
    el.appendChild(mask);
    inners.push(inner);
  }
  return inners;
}

/** Wrap each word for word-by-word reveals. */
export function splitWords(el: HTMLElement): HTMLElement[] {
  const text = el.textContent ?? "";
  el.textContent = "";
  el.setAttribute("aria-label", text);
  const words: HTMLElement[] = [];
  text.split(/\s+/).forEach((word, i, arr) => {
    const span = document.createElement("span");
    span.className = "inline-block overflow-hidden align-bottom";
    span.setAttribute("aria-hidden", "true");
    const inner = document.createElement("span");
    inner.className = "inline-block will-change-transform";
    inner.textContent = word;
    span.appendChild(inner);
    el.appendChild(span);
    if (i < arr.length - 1) el.appendChild(document.createTextNode(" "));
    words.push(inner);
  });
  return words;
}

/** Animate characters up into place. */
export function charsIn(
  els: HTMLElement[],
  opts: { delay?: number; stagger?: number; scroll?: boolean } = {},
): gsap.core.Timeline {
  const { delay = 0, stagger = 0.03, scroll = false } = opts;
  const triggerEl = els[0]?.closest("h1,h2,h3,p")?.parentElement;
  const tl = gsap.timeline(
    scroll
      ? {
          scrollTrigger: triggerEl
            ? { trigger: triggerEl, start: "top 88%" }
            : undefined,
        }
      : { delay },
  );
  tl.fromTo(
    els,
    { yPercent: 120, rotate: 4 },
    { yPercent: 0, rotate: 0, duration: 1.1, stagger, ease: "power4.out" },
    delay,
  );
  return tl;
}

export interface SectionRevealOptions {
  y?: number;
  delay?: number;
  start?: string;
  duration?: number;
}

/** Standard fade-up entrance driven by scroll position. */
export function revealOnScroll(
  el: Element,
  opts: SectionRevealOptions = {},
): gsap.core.Tween {
  const { y = 48, delay = 0, start = "top 85%", duration = 1 } = opts;
  return gsap.fromTo(
    el,
    { autoAlpha: 0, y },
    {
      autoAlpha: 1,
      y: 0,
      duration,
      delay,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start },
    },
  );
}

/** Scrub-based word opacity reveal (editorial paragraphs). */
export function scrubReveal(words: HTMLElement[], trigger: Element): void {
  gsap.fromTo(
    words,
    { opacity: 0.14, y: 8 },
    {
      opacity: 1,
      y: 0,
      stagger: 0.06,
      ease: "none",
      scrollTrigger: {
        trigger,
        start: "top 78%",
        end: "bottom 45%",
        scrub: 0.6,
      },
    },
  );
}
