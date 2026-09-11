import { lazy, Suspense, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown } from "lucide-react";
import { profile } from "../../data/profile";
import { scrollToSection } from "../../hooks/useLenis";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { heroIntro, heroParallax } from "../../animations/hero";

const HeroScene = lazy(() => import("../../three/HeroScene"));

gsap.registerPlugin(ScrollTrigger);

function MaskedLine({
  text,
  className = "",
  marker,
}: {
  text: string;
  className?: string;
  marker?: string;
}) {
  return (
    <span className={`block overflow-hidden ${className}`} aria-label={text}>
      <span
        {...(marker ? { [`data-${marker}`]: true } : {})}
        className="flex"
        aria-hidden="true"
      >
        {text.split("").map((ch, i) => (
          <span key={i} className="char-mask">
            <span className="char-inner">{ch === " " ? "\u00A0" : ch}</span>
          </span>
        ))}
      </span>
    </span>
  );
}

export default function Hero({ started }: { started: boolean }) {
  const rootRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!rootRef.current || !started || reduced) return;
    const scope = rootRef.current;
    const ctx = gsap.context(() => {
      heroIntro(scope);
      // Fade + drift content away on scroll
      gsap.to(scope.querySelector("[data-hero-content]"), {
        yPercent: -18,
        autoAlpha: 0,
        ease: "none",
        scrollTrigger: {
          trigger: scope,
          start: "top top",
          end: "75% bottom",
          scrub: true,
        },
      });
      gsap.to(scope.querySelector("[data-hero-scene]"), {
        yPercent: 14,
        scale: 1.06,
        ease: "none",
        scrollTrigger: {
          trigger: scope,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, scope);

    const cleanupParallax = reduced
      ? undefined
      : heroParallax(scope.querySelectorAll<HTMLElement>("[data-depth]"));

    return () => {
      ctx.revert();
      cleanupParallax?.();
    };
  }, [started, reduced]);

  return (
    <section
      ref={rootRef}
      id="home"
      aria-label="Introduction"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* Backdrop layers */}
      <div className="grid-lines absolute inset-0" aria-hidden="true" />
      <div
        data-depth="26"
        className="blob-morph absolute -top-24 -left-24 h-[34rem] w-[34rem] bg-accent opacity-[0.05]"
        style={{ filter: "blur(90px)" }}
        aria-hidden="true"
      />
      <div
        data-depth="-18"
        className="absolute right-[8%] bottom-[12%] h-80 w-80 rounded-full bg-emerald-500 opacity-[0.06]"
        style={{ filter: "blur(100px)" }}
        aria-hidden="true"
      />
      <div
        data-hero-scene
        data-depth="10"
        className="pointer-events-none absolute inset-y-0 right-[-8%] w-full max-w-[54rem] opacity-90 md:right-0"
        aria-hidden="true"
      >
        <Suspense fallback={null}>
          <HeroScene className="h-full w-full" />
        </Suspense>
      </div>

      {/* Content */}
      <div
        data-hero-content
        className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8"
      >
        <p className="font-display mb-4 overflow-hidden text-sm tracking-[0.4em] text-muted sm:text-base">
          <MaskedLine
            text={`${profile.heroKicker[0]} ${profile.heroKicker[1]}`}
            marker="hero-kicker"
          />
        </p>

        <h1 className="font-display select-none text-[clamp(3.2rem,13vw,11.5rem)] leading-[0.9] font-bold tracking-tighter">
          <MaskedLine text={profile.displayName} marker="hero-name" />
        </h1>

        <div className="font-display mt-6 text-[clamp(1rem,2.6vw,1.8rem)] font-medium tracking-wide text-text/90">
          {profile.heroRole.map((line) => (
            <span key={line} className="block overflow-hidden">
              <span data-hero-role-line className="flex items-center gap-3">
                {line === profile.heroRole[1] && (
                  <span className="inline-block h-px w-8 sm:w-12 bg-accent" aria-hidden="true" />
                )}
                {line}
              </span>
            </span>
          ))}
        </div>

        <div
          data-hero-fade
          className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 font-display text-[10px] tracking-[0.3em] text-muted sm:text-[11px]"
        >
          <span>{profile.college.toUpperCase()}</span>
          <span className="h-1 w-1 rounded-full bg-accent" aria-hidden="true" />
          <span>{profile.year.toUpperCase()}</span>
          <span className="h-1 w-1 rounded-full bg-accent" aria-hidden="true" />
          <span className="text-accent">{profile.tagline}</span>
        </div>

        <button
          data-hero-fade
          onClick={() => scrollToSection("#about")}
          data-cursor="link"
          className="group mt-16 inline-flex items-center gap-3"
          aria-label="Scroll to About section"
        >
          <span className="glass font-display rounded-full px-5 py-3 text-[10px] tracking-[0.35em] transition-colors group-hover:text-accent">
            SCROLL TO EXPLORE
          </span>
          <ArrowDown className="h-4 w-4 animate-bounce text-accent" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
