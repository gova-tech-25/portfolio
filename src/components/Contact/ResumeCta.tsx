import { Download, Eye } from "lucide-react";
import { social, resumeUrl } from "../../data/social";
import MagneticButton from "../ui/MagneticButton";
import { revealOnScroll } from "../../animations/textReveal";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useEffect, useRef } from "react";

export default function ResumeCta() {
  const rootRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const hasResume = Boolean(resumeUrl);

  useEffect(() => {
    if (!rootRef.current || reduced) return;
    rootRef.current.querySelectorAll("[data-reveal]").forEach((el) => revealOnScroll(el));
  }, [reduced]);

  return (
    <section
      ref={rootRef}
      aria-label="Resume"
      className="relative overflow-hidden py-32 sm:py-44"
    >
      <div
        className="blob-morph absolute top-1/2 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 bg-accent opacity-[0.05]"
        style={{ filter: "blur(90px)" }}
        aria-hidden="true"
      />
      <div data-reveal className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
        <p className="font-display text-xs tracking-[0.35em] text-muted">RESUME</p>
        <h2 className="font-display mt-5 text-[clamp(2.4rem,8vw,6.5rem)] leading-[0.95] font-bold tracking-tight uppercase">
          WANT THE <span className="text-accent">FULL</span> STORY?
        </h2>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          {hasResume ? (
            <>
              <MagneticButton
                href={resumeUrl}
                cursor="link"
                className="font-display inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 text-xs font-bold tracking-[0.25em] text-bg transition-transform hover:scale-[1.03]"
                ariaLabel="View resume"
              >
                <Eye className="h-4 w-4" aria-hidden="true" /> VIEW RESUME
              </MagneticButton>
              <MagneticButton
                href={resumeUrl}
                download
                cursor="link"
                className="font-display inline-flex items-center gap-2 rounded-full border border-line px-7 py-4 text-xs tracking-[0.25em] hover:border-accent hover:text-accent"
                ariaLabel="Download resume"
              >
                <Download className="h-4 w-4" aria-hidden="true" /> DOWNLOAD RESUME
              </MagneticButton>
            </>
          ) : (
            <>
              <span
                className="font-display inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-dashed border-line px-7 py-4 text-xs tracking-[0.25em] text-muted"
                title="Configure resumeUrl in src/data/social.ts"
              >
                <Eye className="h-4 w-4" aria-hidden="true" /> VIEW RESUME
              </span>
              <span
                className="font-display inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-dashed border-line px-7 py-4 text-xs tracking-[0.25em] text-muted"
                title="Configure resumeUrl in src/data/social.ts"
              >
                <Download className="h-4 w-4" aria-hidden="true" /> DOWNLOAD RESUME
              </span>
            </>
          )}
        </div>
        {!hasResume && (
          <p className="mt-6 text-xs text-muted/70">
            Placeholder buttons — set <code className="text-accent">resumeUrl</code> in{" "}
            <code className="text-accent">src/data/social.ts</code> (drop the PDF into{" "}
            <code className="text-accent">/public</code>). Or reach me at{" "}
            <a href={`mailto:${social.email}`} className="underline underline-offset-2 hover:text-accent">
              {social.email}
            </a>
            .
          </p>
        )}
      </div>
    </section>
  );
}
