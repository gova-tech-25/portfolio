import gsap from "gsap";

/** Hero entrance: kicker lines then giant name then role + meta. */
export function heroIntro(scope: HTMLElement): gsap.core.Timeline {
  const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
  tl.fromTo(
    scope.querySelectorAll("[data-hero-kicker] .char-inner"),
    { yPercent: 120 },
    { yPercent: 0, duration: 0.9, stagger: 0.02 },
    0.05,
  )
    .fromTo(
      scope.querySelectorAll("[data-hero-name] .char-inner"),
      { yPercent: 130, rotate: 5 },
      { yPercent: 0, rotate: 0, duration: 1.3, stagger: 0.045 },
      0.25,
    )
    .fromTo(
      scope.querySelectorAll("[data-hero-role-line]"),
      { yPercent: 110 },
      { yPercent: 0, duration: 1, stagger: 0.12 },
      0.7,
    )
    .fromTo(
      scope.querySelectorAll("[data-hero-fade]"),
      { autoAlpha: 0, y: 24 },
      { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.08 },
      0.95,
    )
    .fromTo(
      scope.querySelector("[data-hero-scene]"),
      { autoAlpha: 0, scale: 0.92 },
      { autoAlpha: 1, scale: 1, duration: 1.6, ease: "power2.out" },
      0.3,
    );
  return tl;
}

/** Subtle mouse parallax on hero layers. */
export function heroParallax(
  layers: NodeListOf<HTMLElement>,
): () => void {
  const setters = Array.from(layers).map((layer) => ({
    el: layer,
    depth: Number(layer.dataset.depth ?? 10),
    x: gsap.quickTo(layer, "x", { duration: 0.9, ease: "power3.out" }),
    y: gsap.quickTo(layer, "y", { duration: 0.9, ease: "power3.out" }),
  }));
  const onMove = (e: MouseEvent) => {
    const nx = (e.clientX / window.innerWidth - 0.5) * 2;
    const ny = (e.clientY / window.innerHeight - 0.5) * 2;
    setters.forEach(({ x, y, depth }) => {
      x(nx * depth);
      y(ny * depth);
    });
  };
  window.addEventListener("mousemove", onMove, { passive: true });
  return () => window.removeEventListener("mousemove", onMove);
}
