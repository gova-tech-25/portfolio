import { useEffect, useRef, useState } from "react";
import { profile } from "../../data/profile";
import {
  pageTransition,
  registerTransitionOverlay,
} from "../../animations/pageTransitions";

const LINKS = [
  { id: "#home", label: "HOME" },
  { id: "#about", label: "ABOUT" },
  { id: "#work", label: "WORK" },
  { id: "#skills", label: "SKILLS" },
  { id: "#experiments", label: "EXPERIMENTS" },
  { id: "#contact", label: "CONTACT" },
];

export default function Navigation() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    registerTransitionOverlay(overlayRef.current);
    return () => registerTransitionOverlay(null);
  }, []);

  // Track current section
  useEffect(() => {
    const sections = LINKS.map((l) => document.querySelector(l.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((s) => s && io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setMenuOpen(false);
    pageTransition(id);
  };

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-[80] flex items-center justify-between px-5 py-4 transition-all duration-500 sm:px-8"
      >
        {/* Logo */}
        <button
          onClick={() => go("#home")}
          data-cursor="link"
          className={`glass font-display rounded-full px-4 py-2 text-sm font-bold tracking-widest transition-all duration-500 ${
            scrolled ? "accent-glow" : ""
          }`}
          aria-label="Back to top"
        >
          <span className="text-accent">G</span>
          <span className="text-text">.</span>
        </button>

        {/* Desktop pill nav */}
        <nav
          aria-label="Primary"
          className={`glass hidden items-center gap-1 rounded-full px-2 py-2 transition-transform duration-500 md:flex ${
            scrolled ? "scale-[0.94]" : "scale-100"
          }`}
        >
          {LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => go(link.id)}
              data-cursor="link"
              className={`font-display relative rounded-full px-4 py-2 text-[11px] font-medium tracking-[0.18em] transition-colors duration-300 ${
                active === link.id ? "text-bg" : "text-muted hover:text-text"
              }`}
            >
              {active === link.id && (
                <span className="absolute inset-0 rounded-full bg-accent" aria-hidden="true" />
              )}
              <span className="relative">{link.label}</span>
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <span className="font-display glass hidden items-center gap-2 rounded-full px-4 py-2 text-[10px] tracking-[0.25em] text-muted lg:flex">
            <span className="animate-pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-accent" />
            {profile.year.toUpperCase()}
          </span>
          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            data-cursor="link"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="glass font-display flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full md:hidden"
          >
            <span
              className={`h-px w-4 bg-text transition-transform duration-300 ${menuOpen ? "translate-y-[3.5px] rotate-45" : ""}`}
            />
            <span
              className={`h-px w-4 bg-text transition-transform duration-300 ${menuOpen ? "-translate-y-[3.5px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </header>

      {/* Section indicator (desktop) */}
      <div
        aria-hidden="true"
        className="fixed top-1/2 right-6 z-[70] hidden -translate-y-1/2 flex-col items-end gap-3 xl:flex"
      >
        {LINKS.map((link) => (
          <button
            key={link.id}
            onClick={() => go(link.id)}
            tabIndex={-1}
            className="group flex items-center gap-2"
          >
            <span
              className={`font-display text-[9px] tracking-[0.25em] transition-all duration-300 ${
                active === link.id
                  ? "text-accent opacity-100"
                  : "text-muted opacity-0 group-hover:opacity-100"
              }`}
            >
              {link.label}
            </span>
            <span
              className={`block rounded-full transition-all duration-300 ${
                active === link.id
                  ? "h-1.5 w-6 bg-accent"
                  : "h-1.5 w-1.5 bg-line group-hover:bg-muted"
              }`}
            />
          </button>
        ))}
      </div>

      {/* Mobile fullscreen menu */}
      <div
        className={`fixed inset-0 z-[75] flex flex-col justify-between bg-bg/95 px-6 pt-28 pb-10 backdrop-blur-xl transition-all duration-500 md:hidden ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav aria-label="Mobile" className="flex flex-col gap-2">
          {LINKS.map((link, i) => (
            <button
              key={link.id}
              onClick={() => go(link.id)}
              className="font-display border-b border-line py-4 text-left text-[clamp(2rem,9vw,3rem)] font-semibold tracking-tight text-text transition-colors hover:text-accent"
              style={{
                transitionDelay: `${i * 40}ms`,
                transform: menuOpen ? "none" : "translateY(16px)",
                opacity: menuOpen ? 1 : 0,
                transitionProperty: "transform, opacity, color",
                transitionDuration: "400ms",
              }}
            >
              <span className="mr-4 text-xs text-accent">0{i + 1}</span>
              {link.label}
            </button>
          ))}
        </nav>
        <p className="font-display text-xs tracking-[0.3em] text-muted">
          {profile.tagline}
        </p>
      </div>

      {/* Page-transition overlay */}
      <div
        ref={overlayRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[99] hidden items-center justify-center bg-bg"
        style={{ clipPath: "inset(100% 0% 0% 0%)" }}
      >
        <span
          data-transition-word
          className="font-display stroke-text text-[clamp(2.5rem,10vw,7rem)] font-bold tracking-tight"
        >
          {profile.displayName}
        </span>
      </div>
    </>
  );
}
