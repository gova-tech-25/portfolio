import { useEffect, useRef } from "react";
import { ArrowUpRight, Github } from "lucide-react";
import { projects } from "../../data/projects";
import SectionHeading from "../ui/SectionHeading";
import ProjectVisual from "./ProjectVisual";
import MagneticButton from "../ui/MagneticButton";
import { initProjectAnimations } from "../../animations/projects";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export default function Projects() {
  const rootRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!rootRef.current || reduced) return;
    return initProjectAnimations(rootRef.current);
  }, [reduced]);

  return (
    <section
      ref={rootRef}
      id="work"
      aria-label="Selected work"
      className="relative mx-auto max-w-7xl scroll-mt-24 px-5 py-32 sm:px-8 sm:py-44"
    >
      <div data-work-title>
        <SectionHeading index="03" title="SELECTED WORK" hint="BUILT & SHIPPED" />
      </div>

      <div className="space-y-28 sm:space-y-40">
        {projects.map((project, i) => {
          const flip = i % 2 === 1;
          return (
            <article
              key={project.id}
              data-project
              className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14"
            >
              {/* Visual */}
              <a
                href={project.demo || project.github}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title} — open project`}
                onClick={(e) => {
                  if (!project.demo && !project.github) e.preventDefault();
                }}
                data-cursor="view"
                className={`group relative block overflow-hidden rounded-3xl border border-line lg:col-span-7 ${
                  flip ? "lg:order-2" : ""
                }`}
                style={{ aspectRatio: "16 / 10" }}
              >
                <div data-project-visual className="h-full w-full will-change-transform">
                  <div data-project-media className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]">
                    <ProjectVisual project={project} />
                  </div>
                </div>
                {/* Hover sheen */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
              </a>

              {/* Copy */}
              <div className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
                <p
                  data-project-reveal
                  className="font-display flex items-baseline gap-4 text-xs tracking-[0.3em] text-muted"
                >
                  <span className="text-accent">{project.index}</span>
                  {project.subtitle.toUpperCase()}
                </p>
                <h3
                  data-project-reveal
                  className="font-display mt-4 text-[clamp(2rem,5vw,4.2rem)] leading-[0.95] font-bold tracking-tight uppercase"
                >
                  {project.title}
                </h3>
                <p
                  data-project-reveal
                  className="mt-5 max-w-md leading-relaxed text-text/80"
                >
                  {project.description}
                </p>

                {project.architecture && (
                  <div
                    data-project-reveal
                    className="mt-6 rounded-xl border border-line bg-surface p-4"
                    aria-label={`${project.title} architecture pipeline`}
                  >
                    <ul className="flex flex-wrap items-center gap-x-1.5 gap-y-1 font-display text-[10px] tracking-wider text-muted">
                      {project.architecture.map((step, si) => (
                        <li key={step} className="flex items-center gap-1.5">
                          <span
                            className={
                              si === project.architecture!.length - 1
                                ? "text-accent"
                                : ""
                            }
                          >
                            {step.toUpperCase()}
                          </span>
                          {si < project.architecture!.length - 1 && (
                            <span className="text-accent/60">→</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {project.metrics && (
                  <ul data-project-reveal className="mt-5 flex gap-2">
                    {project.metrics.map((m) => (
                      <li
                        key={m}
                        className="font-display rounded-full border border-accent/40 px-3 py-1 text-[10px] tracking-widest text-accent"
                      >
                        {m}
                      </li>
                    ))}
                  </ul>
                )}

                <ul
                  data-project-reveal
                  className="mt-6 flex flex-wrap gap-2"
                  aria-label="Technologies"
                >
                  {project.tech.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-line px-3 py-1.5 text-[11px] text-muted"
                    >
                      {t}
                    </li>
                  ))}
                </ul>

                {(project.github || project.demo) && (
                  <div data-project-reveal className="mt-8 flex flex-wrap items-center gap-4">
                    <MagneticButton
                      href={project.demo || project.github}
                      cursor="link"
                      className="font-display rounded-full bg-accent px-6 py-3 text-[11px] font-bold tracking-[0.2em] text-bg transition-transform hover:scale-[1.03]"
                      ariaLabel={`View ${project.title} project`}
                    >
                      VIEW PROJECT <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </MagneticButton>
                    {project.github && (
                      <MagneticButton
                        href={project.github}
                        cursor="link"
                        className="font-display rounded-full border border-line px-5 py-3 text-[11px] tracking-[0.2em] text-text hover:border-accent hover:text-accent"
                        ariaLabel={`${project.title} on GitHub`}
                      >
                        <Github className="h-4 w-4" aria-hidden="true" /> GITHUB
                      </MagneticButton>
                    )}
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
