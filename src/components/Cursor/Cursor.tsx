import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useIsTouch, useReducedMotion } from "../../hooks/useReducedMotion";

const LABELS: Record<string, string> = {
  view: "VIEW",
  explore: "EXPLORE",
  drag: "DRAG",
};

/**
 * Cursor *enhancement*: a translucent follower that trails the native cursor,
 * which is never hidden. Disabled on touch devices and reduced motion.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const isTouch = useIsTouch();
  const reduced = useReducedMotion();

  useEffect(() => {
    if (isTouch || reduced) return;
    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const label = labelRef.current!;

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, autoAlpha: 0 });

    const dotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power2.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power2.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });

    let shown = false;
    const onMove = (e: MouseEvent) => {
      if (!shown) {
        shown = true;
        gsap.to([dot, ring], { autoAlpha: 1, duration: 0.3 });
      }
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const setState = (state: string | null) => {
      const text = state ? LABELS[state] : "";
      const isLink = state === "link";
      gsap.to(ring, {
        width: state && !isLink ? 76 : isLink ? 52 : 34,
        height: state && !isLink ? 76 : isLink ? 52 : 34,
        borderColor: state ? "rgba(200,255,46,0.85)" : "rgba(200,255,46,0.45)",
        backgroundColor: state && !isLink ? "rgba(200,255,46,0.08)" : "transparent",
        duration: 0.35,
        ease: "power3.out",
      });
      label.textContent = text;
      gsap.to(label, { autoAlpha: text ? 1 : 0, duration: 0.25 });
    };

    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest<HTMLElement>(
        "[data-cursor], a, button",
      );
      if (!target) {
        setState(null);
        return;
      }
      const custom = target.dataset.cursor;
      if (custom === "view" || custom === "explore" || custom === "drag") setState(custom);
      else setState("link");
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
    };
  }, [isTouch, reduced]);

  if (isTouch || reduced) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[95] h-1.5 w-1.5 rounded-full bg-accent"
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[95] flex h-[34px] w-[34px] items-center justify-center rounded-full border"
        style={{ borderColor: "rgba(200,255,46,0.45)" }}
      >
        <span
          ref={labelRef}
          className="font-display text-[10px] font-medium tracking-[0.18em] text-accent opacity-0 select-none"
        />
      </div>
    </>
  );
}
