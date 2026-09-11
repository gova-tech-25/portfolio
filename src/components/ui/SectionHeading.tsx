import { useEffect, useRef } from "react";
import { charsIn, splitChars } from "../../animations/textReveal";
import { useReducedMotion } from "../../hooks/useReducedMotion";

interface Props {
  index: string;
  title: string;
  hint?: string;
}

export default function SectionHeading({ index, title, hint }: Props) {
  const ref = useRef<HTMLHeadingElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!ref.current || reduced) return;
    const chars = splitChars(ref.current);
    const tween = charsIn(chars, { stagger: 0.025, scroll: true });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [reduced]);

  return (
    <div className="mb-14 sm:mb-20">
      <div className="font-display mb-6 flex items-center gap-4 text-[11px] tracking-[0.35em] text-muted">
        <span className="text-accent">{index}</span>
        <span className="h-px w-14 bg-line" aria-hidden="true" />
        {hint && <span>{hint}</span>}
      </div>
      <h2
        ref={ref}
        className="font-display text-[clamp(2.6rem,9vw,7.5rem)] leading-[0.95] font-semibold tracking-tight text-balance uppercase"
      >
        {title}
      </h2>
    </div>
  );
}
