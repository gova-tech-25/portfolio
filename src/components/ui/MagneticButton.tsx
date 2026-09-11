import { useRef, type ReactNode, type MouseEvent } from "react";
import gsap from "gsap";

interface Props {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  cursor?: string;
  ariaLabel?: string;
  download?: boolean | string;
}

/** Button that leans toward the cursor and springs back. */
export default function MagneticButton({
  children,
  className = "",
  onClick,
  href,
  cursor = "link",
  ariaLabel,
  download,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);

  const onMove = (e: MouseEvent) => {
    if (window.matchMedia("(hover: none)").matches) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(el, { x: x * 0.35, y: y * 0.35, duration: 0.5, ease: "power3.out" });
    if (innerRef.current)
      gsap.to(innerRef.current, {
        x: x * 0.12,
        y: y * 0.12,
        duration: 0.5,
        ease: "power3.out",
      });
  };

  const onLeave = () => {
    gsap.to([ref.current, innerRef.current], {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.4)",
    });
  };

  const content = (
    <span ref={innerRef} className="flex items-center justify-center gap-2">
      {children}
    </span>
  );

  if (href !== undefined) {
    return (
      <a
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref={ref as any}
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer" : undefined}
        download={download}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        data-cursor={cursor}
        aria-label={ariaLabel}
        className={`inline-block ${className}`}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={ref as never}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      data-cursor={cursor}
      aria-label={ariaLabel}
      className={`inline-block ${className}`}
    >
      {content}
    </button>
  );
}
