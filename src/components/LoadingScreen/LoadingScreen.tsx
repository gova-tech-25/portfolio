import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { profile } from "../../data/profile";

/**
 * Session loading screen: percentage counter over a morphing blob.
 * Shown once per browser session (sessionStorage flag).
 * Calls onReveal() when the outro starts so the page animates in
 * underneath, then removes itself when the outro ends.
 */
export default function LoadingScreen({ onReveal }: { onReveal: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(
    () => sessionStorage.getItem("gv-loaded") === "1",
  );

  useEffect(() => {
    if (done) return;
    const root = rootRef.current;
    if (!root) return;
    sessionStorage.setItem("gv-loaded", "1");
    const counter = { v: 0 };
    const words = root.querySelectorAll("[data-load-word]");
    const blob = root.querySelector("[data-load-blob]") ?? [];
    const meta = root.querySelector("[data-load-meta]") ?? [];

    const tl = gsap.timeline({
      onComplete: () => setDone(true),
    });
    tl.to(counter, {
      v: 100,
      duration: 1.5,
      ease: "power2.inOut",
      onUpdate: () => setPct(Math.round(counter.v)),
    })
      .to(words, {
        yPercent: -110,
        duration: 0.45,
        stagger: 0.04,
        ease: "power3.in",
      })
      .add(() => onReveal(), "-=0.15")
      .to(blob, { scale: 16, autoAlpha: 0.9, duration: 1, ease: "power3.in" }, "<")
      .to(meta, { autoAlpha: 0, duration: 0.25 }, "<")
      .to(root, { autoAlpha: 0, duration: 0.55, ease: "power2.inOut" }, "-=0.15");

    return () => {
      tl.kill();
    };
  }, [done]);

  if (done) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-bg"
      role="status"
      aria-label="Loading portfolio"
    >
      {/* Expanding accent veil that wipes upward over the old view */}
      <div className="absolute inset-0" aria-hidden="true">
        <div
          data-load-blob
          className="blob-morph absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 bg-accent opacity-[0.08]"
          style={{ filter: "blur(60px)" }}
        />
      </div>
      <div className="relative flex flex-col items-center gap-6">
        <h2 className="font-display flex overflow-hidden text-[clamp(2.2rem,8vw,5rem)] font-semibold tracking-tight">
          {profile.displayName.split("").map((ch, i) => (
            <span key={i} data-load-word className="char-mask">
              <span className="char-inner">{ch}</span>
            </span>
          ))}
        </h2>
        <div
          data-load-meta
          className="flex w-56 items-center justify-between font-display text-xs tracking-[0.3em] text-muted"
        >
          <span>PORTFOLIO</span>
          <span className="text-accent tabular-nums">{pct}%</span>
        </div>
        <div className="h-px w-56 overflow-hidden bg-line">
          <div
            className="h-full bg-accent transition-[width] duration-100"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  );
}
