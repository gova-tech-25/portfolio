import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap } from "lucide-react";
import { profile } from "../../data/profile";
import { revealOnScroll } from "../../animations/textReveal";
import { useReducedMotion } from "../../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

/** Card with 3D tilt + cursor-following glow. */
function TiltCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(hover: none)").matches) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(700px) rotateX(${(-py * 7).toFixed(2)}deg) rotateY(${(px * 7).toFixed(2)}deg)`;
      el.style.setProperty("--gx", `${((px + 0.5) * 100).toFixed(0)}%`);
      el.style.setProperty("--gy", `${((py + 0.5) * 100).toFixed(0)}%`);
    };
    const onLeave = () => {
      el.style.transform = "perspective(700px) rotateX(0deg) rotateY(0deg)";
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`group relative overflow-hidden rounded-2xl border border-line bg-surface transition-transform duration-200 ease-out ${className}`}
      style={{ transitionProperty: "transform" }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(240px circle at var(--gx,50%) var(--gy,50%), rgba(200,255,46,0.09), transparent 70%)",
        }}
      />
      {children}
    </div>
  );
}

export default function About() {
  const rootRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!rootRef.current || reduced) return;
    const ctx = gsap.context(() => {
      rootRef.current!
        .querySelectorAll("[data-reveal]")
        .forEach((el, i) => revealOnScroll(el, { delay: (i % 4) * 0.08 }));

      // Timeline progress line draws with scroll
      gsap.fromTo(
        "[data-timeline-bar]",
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: "left center",
          ease: "none",
          scrollTrigger: {
            trigger: "[data-timeline]",
            start: "top 80%",
            end: "bottom 55%",
            scrub: 0.5,
          },
        },
      );
    }, rootRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={rootRef}
      id="about"
      aria-label="About me"
      className="relative mx-auto max-w-7xl scroll-mt-24 px-5 pb-32 sm:px-8 sm:pb-44"
    >
      <div data-reveal className="mb-14 flex items-center gap-4 sm:mb-20">
        <span className="font-display text-[11px] tracking-[0.35em] text-accent">01</span>
        <h2 className="font-display text-[clamp(2.4rem,7vw,5.5rem)] font-semibold tracking-tight uppercase">
          ABOUT ME
        </h2>
      </div>

      <div className="grid gap-12 lg:grid-cols-12">
        {/* Portrait */}
        <div data-reveal className="lg:col-span-4">
          <TiltCard className="aspect-[4/5] overflow-hidden p-0">
            <img
              src="/images/profile.png"
              alt={`${profile.firstName} ${profile.displayName}`}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </TiltCard>

          <div data-reveal className="mt-6 space-y-2">
            <p className="font-display flex items-center gap-2 text-xs tracking-[0.2em] text-muted">
              <GraduationCap className="h-4 w-4 text-accent" aria-hidden="true" />
              {profile.college.toUpperCase()}
            </p>
            <p className="text-sm text-text/90">{profile.title} · {profile.year}</p>
            <p className="text-sm text-muted">CGPA {profile.cgpa} / 10</p>
          </div>
        </div>

        {/* Bio + interests */}
        <div className="lg:col-span-8">
          <div className="space-y-6" data-reveal>
            {profile.about.map((p) => (
              <p key={p} className="max-w-2xl text-lg leading-relaxed text-text/85 sm:text-xl">
                {p}
              </p>
            ))}
          </div>

          <h3 data-reveal className="font-display mt-14 mb-6 text-xs tracking-[0.35em] text-muted">
            PARTICULARLY INTERESTED IN
          </h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {profile.interests.map((interest) => (
              <TiltCard key={interest.label}>
                <div className="p-4">
                  <p className="font-display text-sm font-semibold tracking-wide">
                    {interest.label}
                  </p>
                  <p className="mt-1.5 text-[11px] leading-relaxed text-muted">
                    {interest.desc}
                  </p>
                </div>
              </TiltCard>
            ))}
          </div>

          {/* Animated mindset timeline */}
          <div data-timeline data-reveal className="mt-16">
            <div className="relative h-px w-full bg-line">
              <div data-timeline-bar className="absolute inset-0 origin-left bg-accent" />
              {profile.timeline.map((_, i) => (
                <span
                  key={i}
                  aria-hidden="true"
                  className="absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
                  style={{ left: `${(i / (profile.timeline.length - 1)) * 100}%` }}
                />
              ))}
            </div>
            <div className="relative mt-4 flex justify-between">
              {profile.timeline.map((step, i) => (
                <span
                  key={step}
                  className={`font-display text-[10px] tracking-[0.25em] ${
                    i % 2 ? "text-muted" : "text-text"
                  }`}
                >
                  {step}
                </span>
              ))}
            </div>
            <p className="font-display mt-12 text-[10px] tracking-[0.3em] text-accent">
              {profile.phraseAlt}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
