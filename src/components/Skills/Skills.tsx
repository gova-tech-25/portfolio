import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skillCategories } from "../../data/skills";
import SectionHeading from "../ui/SectionHeading";
import { useIsTouch, useReducedMotion } from "../../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

/**
 * Interactive "AI CORE": categories orbit a central core, connected by
 * animated lines. Hovering a node pauses the orbit and opens its detail
 * panel. Falls back to stacked cards on touch devices / reduced motion.
 */
function OrbitSystem() {
  const pausedRef = useRef(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const pinWrapRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<(HTMLButtonElement | null)[]>([]);
  const linesRef = useRef<SVGLineElement[]>([]);
  const [active, setActive] = useState<number | null>(null);
  const reduced = useReducedMotion();
  const isTouch = useIsTouch();

  // Desktop: pin the system while scroll cycles the highlighted cluster
  useEffect(() => {
    if (isTouch || reduced || !pinWrapRef.current) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const st = ScrollTrigger.create({
        trigger: pinWrapRef.current!,
        start: "center center",
        end: "+=900",
        pin: true,
        onUpdate: (self) => {
          setActive(Math.min(skillCategories.length - 1, Math.floor(self.progress * skillCategories.length)));
        },
      });
      return () => st.kill();
    });
    return () => mm.revert();
  }, [isTouch, reduced]);

  useEffect(() => {
    if (isTouch) return;
    const stage = stageRef.current;
    if (!stage) return;

    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(stage);

    let raf = 0;
    let angle = -Math.PI / 2;
    let last = performance.now();
    const speeds = 0.00012;

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (!visible || document.hidden) return;
      const dt = Math.min(now - last, 50);
      last = now;
      if (!reduced && !pausedRef.current) angle += speeds * dt;

      const rect = stage.getBoundingClientRect();
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const R = Math.min(cx, cy) * 0.78;

      skillCategories.forEach((_, i) => {
        const a = angle + (i / skillCategories.length) * Math.PI * 2;
        const x = cx + Math.cos(a) * R;
        const y = cy + Math.sin(a) * R;
        const node = nodesRef.current[i];
        if (node)
          node.style.transform = `translate(calc(${x.toFixed(1)}px - 50%), calc(${y.toFixed(1)}px - 50%))`;
        const line = linesRef.current[i];
        if (line) {
          line.setAttribute("x1", String(cx));
          line.setAttribute("y1", String(cy));
          line.setAttribute("x2", String(x));
          line.setAttribute("y2", String(y));
        }
      });
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [isTouch, reduced]);

  useEffect(() => {
    linesRef.current.forEach((l, i) =>
      l?.setAttribute("stroke", active === i ? skillCategories[i].color : "rgba(236,238,232,0.12)"),
    );
  }, [active]);

  if (isTouch) {
    return (
      <div className="space-y-4">
        {skillCategories.map((cat, i) => (
          <details key={cat.id} className="group rounded-2xl border border-line bg-surface p-5" open={i === 1}>
            <summary className="font-display flex cursor-pointer items-center justify-between text-sm font-semibold tracking-[0.2em]">
              <span>
                <span style={{ color: cat.color }}>{cat.short}</span>
                <span className="ml-3">{cat.name}</span>
              </span>
              <span className="text-muted transition-transform group-open:rotate-45">+</span>
            </summary>
            <ul className="mt-4 space-y-2.5">
              {cat.skills.map((s) => (
                <li key={s.name} className="flex items-baseline justify-between gap-3 border-b border-line pb-2 text-sm last:border-0">
                  <span>{s.name}</span>
                  {s.note && <span className="text-right text-[11px] text-muted">{s.note}</span>}
                </li>
              ))}
            </ul>
          </details>
        ))}
      </div>
    );
  }

  const current = active !== null ? skillCategories[active] : null;

  return (
    <div ref={pinWrapRef} className="grid items-center gap-10 lg:grid-cols-[1fr_360px]">
      <div
        ref={stageRef}
        className="relative mx-auto aspect-square w-full max-w-[42rem]"
        onMouseLeave={() => {
          pausedRef.current = false;
        }}
      >
        {/* Connection lines */}
        <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
          {skillCategories.map((cat, i) => (
            <line
              key={cat.id}
              ref={(el) => {
                if (el) linesRef.current[i] = el;
              }}
              stroke={active === i ? cat.color : "rgba(236,238,232,0.12)"}
              strokeWidth="1"
            />
          ))}
        </svg>

        {/* Orbit ring guides */}
        <div className="absolute inset-[11%] rounded-full border border-line/60" aria-hidden="true" />
        <div className="absolute inset-[22%] rounded-full border border-dashed border-line/40" aria-hidden="true" />

        {/* Core */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div
            className={`accent-glow flex h-24 w-24 items-center justify-center rounded-full border transition-colors duration-500 sm:h-28 sm:w-28 ${
              current ? "border-accent bg-accent/15" : "border-accent/50 bg-panel"
            }`}
          >
            <div className="blob-morph absolute inset-2 rounded-full bg-accent/10" aria-hidden="true" />
            <span className="font-display relative text-center text-[10px] leading-tight font-bold tracking-[0.2em] text-accent">
              AI<br />CORE
            </span>
          </div>
        </div>

        {/* Category nodes */}
        {skillCategories.map((cat, i) => (
          <button
            key={cat.id}
            ref={(el) => {
              nodesRef.current[i] = el;
            }}
            onMouseEnter={() => {
              pausedRef.current = true;
              setActive(i);
            }}
            onFocus={() => setActive(i)}
            data-cursor="link"
            aria-expanded={active === i}
            className={`font-display absolute top-0 left-0 z-10 flex h-16 w-16 flex-col items-center justify-center gap-0.5 rounded-full border backdrop-blur-md transition-all duration-300 sm:h-20 sm:w-20 ${
              active === i ? "scale-125" : "hover:scale-110"
            }`}
            style={{
              borderColor: active === i ? cat.color : "rgba(236,238,232,0.14)",
              background: active === i ? `${cat.color}1f` : "rgba(12,12,11,0.7)",
            }}
          >
            <span className="text-base sm:text-lg" style={{ color: cat.color }}>
              {cat.short}
            </span>
            <span className="max-w-full truncate px-1 text-[7px] tracking-[0.18em] text-muted sm:text-[8px]">
              {cat.name}
            </span>
          </button>
        ))}
      </div>

      {/* Detail panel */}
      <aside
        aria-live="polite"
        className="glass min-h-56 rounded-2xl p-6"
      >
        {current ? (
          <>
            <p className="font-display flex items-center gap-3 text-sm font-bold tracking-[0.25em]">
              <span style={{ color: current.color }}>{current.short}</span>
              {current.name}
            </p>
            <ul className="mt-5 space-y-3">
              {current.skills.map((s) => (
                <li key={s.name}>
                  <p className="flex items-baseline justify-between gap-3 text-sm">
                    <span>{s.name}</span>
                    {s.note && <span className="text-right text-[11px] text-muted">{s.note}</span>}
                  </p>
                  <span className="mt-1.5 block h-px w-full bg-line" />
                </li>
              ))}
            </ul>
          </>
        ) : (
          <div className="flex h-full min-h-44 flex-col items-center justify-center text-center">
            <p className="font-display text-xs tracking-[0.35em] text-muted">
              HOVER A NODE
            </p>
            <p className="mt-3 max-w-52 text-xs leading-relaxed text-muted/70">
              Six clusters orbit the core — each one is a layer of the stack I build with.
            </p>
          </div>
        )}
      </aside>
    </div>
  );
}

export default function Skills() {
  return (
    <section
      id="skills"
      aria-label="Skills"
      className="relative mx-auto max-w-7xl scroll-mt-24 px-5 py-32 sm:px-8 sm:py-44"
    >
      <SectionHeading index="02" title="TECH STACK" hint="THE ORBIT" />
      <OrbitSystem />
    </section>
  );
}
