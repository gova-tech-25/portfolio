import { useEffect, useRef, useState } from "react";
import { Github, Star, GitFork, ArrowUpRight } from "lucide-react";
import { profile } from "../../data/profile";
import { social } from "../../data/social";
import SectionHeading from "../ui/SectionHeading";
import MagneticButton from "../ui/MagneticButton";
import { revealOnScroll } from "../../animations/textReveal";
import { useReducedMotion } from "../../hooks/useReducedMotion";

interface Repo {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
}

/**
 * BUILDING IN PUBLIC — live GitHub data when profile.githubUsername is set
 * (no token required), graceful static fallback otherwise.
 */
export default function BuildingInPublic() {
  const rootRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [repos, setRepos] = useState<Repo[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!rootRef.current || reduced) return;
    rootRef.current?.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el, i) =>
      revealOnScroll(el, { delay: i * 0.06 }),
    );
  }, [reduced]);

  useEffect(() => {
    if (!profile.githubUsername) return;
    const controller = new AbortController();
    fetch(
      `https://api.github.com/users/${encodeURIComponent(profile.githubUsername)}/repos?sort=updated&per_page=6`,
      { signal: controller.signal },
    )
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data: Repo[]) => setRepos(data))
      .catch(() => !controller.signal.aborted && setFailed(true));
    return () => controller.abort();
  }, []);

  const live = repos && repos.length > 0;

  return (
    <section
      ref={rootRef}
      aria-label="Building in public"
      className="relative mx-auto max-w-7xl px-5 py-32 sm:px-8 sm:py-44"
    >
      <SectionHeading index="07" title="BUILDING IN PUBLIC" hint="GITHUB" />

      {!live ? (
        <div data-reveal className="glass rounded-2xl p-8 sm:p-12">
          <Github className="h-10 w-10 text-accent" aria-hidden="true" />
          <p className="font-display mt-6 max-w-xl text-lg leading-relaxed text-text/90 sm:text-xl">
            {failed
              ? "GitHub is not answering right now — the code lives on regardless."
              : "Commit history, experiments and half-finished ideas — all public."}
          </p>
          <div className="mt-8">
            <MagneticButton
              href={social.github || undefined}
              cursor={social.github ? "link" : undefined}
              className={`font-display inline-flex items-center gap-2 rounded-full border px-6 py-3.5 text-[11px] font-bold tracking-[0.25em] ${
                social.github
                  ? "border-accent bg-accent text-bg"
                  : "pointer-events-none cursor-not-allowed border-dashed border-line text-muted"
              }`}
              ariaLabel="View GitHub profile"
            >
              VIEW GITHUB <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </MagneticButton>
          </div>
          {!social.github && (
            <p className="mt-5 text-xs text-muted/70">
              Placeholder — add your GitHub URL in{" "}
              <code className="text-accent">src/data/social.ts</code>, and a username in{" "}
              <code className="text-accent">src/data/profile.ts</code> to enable live repo cards.
            </p>
          )}
        </div>
      ) : (
        <>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {repos.slice(0, 6).map((repo) => (
              <li key={repo.name} data-reveal>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="link"
                  className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-accent/50"
                >
                  <p className="font-display flex items-center justify-between text-sm font-bold tracking-wide group-hover:text-accent">
                    {repo.name}
                    <ArrowUpRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                  </p>
                  <p className="mt-2 line-clamp-2 flex-1 text-xs leading-relaxed text-muted">
                    {repo.description ?? "No description provided."}
                  </p>
                  <p className="mt-4 flex items-center gap-4 text-[11px] text-muted">
                    {repo.language && (
                      <span className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-accent/80" aria-hidden="true" />
                        {repo.language}
                      </span>
                    )}
                    <span className="flex items-center gap-1"><Star className="h-3 w-3" aria-hidden="true" />{repo.stargazers_count}</span>
                    <span className="flex items-center gap-1"><GitFork className="h-3 w-3" aria-hidden="true" />{repo.forks_count}</span>
                  </p>
                </a>
              </li>
            ))}
          </ul>
          <div data-reveal className="mt-8">
            <MagneticButton
              href={social.github || `https://github.com/${profile.githubUsername}`}
              cursor="link"
              className="font-display inline-flex items-center gap-2 rounded-full border border-accent px-6 py-3.5 text-[11px] font-bold tracking-[0.25em] text-accent hover:bg-accent hover:text-bg"
              ariaLabel="View GitHub profile"
            >
              VIEW GITHUB <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </MagneticButton>
          </div>
        </>
      )}
    </section>
  );
}
