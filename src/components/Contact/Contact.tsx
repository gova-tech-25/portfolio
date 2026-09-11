import { useEffect, useRef, useState } from "react";
import { Check, Copy, Github, Linkedin, Mail } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { profile } from "../../data/profile";
import { social } from "../../data/social";
import MagneticButton from "../ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const LINES = ["LET'S", "BUILD", "SOMETHING", "INTELLIGENT."];

export default function Contact() {
  const rootRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      el.querySelectorAll<HTMLElement>("[data-contact-line]").forEach((line, i) => {
        gsap.fromTo(
          line.querySelectorAll(".char-inner"),
          { yPercent: 120 },
          {
            yPercent: 0,
            duration: 1,
            stagger: 0.03,
            ease: "power4.out",
            scrollTrigger: { trigger: line, start: "top 85%" },
            delay: i * 0.05,
          },
        );
      });
    }, el);
    return () => ctx.revert();
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(social.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${social.email}`;
    }
  };

  return (
    <section
      ref={rootRef}
      id="contact"
      aria-label="Contact"
      className="relative scroll-mt-24 overflow-hidden px-5 pt-32 pb-24 sm:px-8 sm:pt-44"
    >
      <div className="grid-lines absolute inset-0 opacity-50" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl">
        <h2 className="font-display select-none leading-[0.92] font-bold tracking-tighter uppercase">
          {LINES.map((line, i) => (
            <span key={line} className="block overflow-hidden" aria-label={line}>
              <span
                data-contact-line
                className={`flex ${i === LINES.length - 1 ? "text-accent" : ""} ${i % 2 === 1 ? "sm:ml-[10%]" : ""}`}
                aria-hidden="true"
              >
                {line.split("").map((ch, ci) => (
                  <span key={ci} className="char-mask">
                    <span className="char-inner">{ch === " " ? "\u00A0" : ch}</span>
                  </span>
                ))}
              </span>
            </span>
          ))}
        </h2>

        <div className="mt-20 grid gap-14 lg:grid-cols-2">
          {/* Interactive email */}
          <div>
            <button
              onClick={copyEmail}
              data-cursor="explore"
              className="group glass relative flex w-full max-w-lg items-center justify-between gap-4 overflow-hidden rounded-2xl p-6 text-left transition-colors hover:border-accent/60 sm:p-8"
              aria-label={`Copy email address ${social.email}`}
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-accent/15 to-transparent transition-transform duration-700 group-hover:translate-x-0"
              />
              <span className="relative min-w-0">
                <span className="font-display block text-[10px] tracking-[0.3em] text-muted">
                  DROP A LINE — CLICK TO COPY
                </span>
                <span className="mt-2 block truncate text-lg sm:text-xl">{social.email}</span>
              </span>
              <span className="relative shrink-0">
                {copied ? (
                  <Check className="h-6 w-6 text-accent" aria-hidden="true" />
                ) : (
                  <Copy className="h-6 w-6 text-muted transition-colors group-hover:text-accent" aria-hidden="true" />
                )}
              </span>
            </button>
            {copied && (
              <p className="font-display mt-3 text-[10px] tracking-[0.3em] text-accent" role="status">
                COPIED TO CLIPBOARD
              </p>
            )}

            <div className="mt-8 flex flex-wrap gap-4">
              {social.github ? (
                <MagneticButton
                  href={social.github}
                  cursor="link"
                  className="font-display inline-flex items-center gap-2 rounded-full border border-line px-6 py-3.5 text-[11px] tracking-[0.25em] hover:border-accent hover:text-accent"
                  ariaLabel="GitHub profile"
                >
                  <Github className="h-4 w-4" aria-hidden="true" /> GITHUB
                </MagneticButton>
              ) : (
                <span className="font-display inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-dashed border-line px-6 py-3.5 text-[11px] tracking-[0.25em] text-muted" title="Add URL in src/data/social.ts">
                  <Github className="h-4 w-4" aria-hidden="true" /> GITHUB
                </span>
              )}
              {social.linkedin ? (
                <MagneticButton
                  href={social.linkedin}
                  cursor="link"
                  className="font-display inline-flex items-center gap-2 rounded-full border border-line px-6 py-3.5 text-[11px] tracking-[0.25em] hover:border-accent hover:text-accent"
                  ariaLabel="LinkedIn profile"
                >
                  <Linkedin className="h-4 w-4" aria-hidden="true" /> LINKEDIN
                </MagneticButton>
              ) : (
                <span className="font-display inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-dashed border-line px-6 py-3.5 text-[11px] tracking-[0.25em] text-muted" title="Add URL in src/data/social.ts">
                  <Linkedin className="h-4 w-4" aria-hidden="true" /> LINKEDIN
                </span>
              )}
              <MagneticButton
                href={`mailto:${social.email}`}
                cursor="link"
                className="font-display inline-flex items-center gap-2 rounded-full bg-text px-6 py-3.5 text-[11px] font-bold tracking-[0.25em] text-bg"
                ariaLabel={`Email ${profile.displayName}`}
              >
                <Mail className="h-4 w-4" aria-hidden="true" /> EMAIL ME
              </MagneticButton>
            </div>
          </div>

          {/* Identity block */}
          <div className="lg:justify-self-end lg:text-right">
            <p className="font-display text-[clamp(2rem,5vw,3.6rem)] leading-tight font-semibold tracking-tight">
              {profile.displayName}
            </p>
            <ul className="font-display mt-4 space-y-1 text-sm tracking-[0.3em] text-muted">
              <li>AI / ML</li>
              <li>SOFTWARE</li>
              <li>BUILDING</li>
            </ul>
            <p className="mt-8 max-w-xs text-sm leading-relaxed text-muted max-lg:text-left max-lg:mx-auto">
              Open to collaborations, research conversations and interesting problems.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
