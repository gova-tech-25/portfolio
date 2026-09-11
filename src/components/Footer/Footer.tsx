import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "../../data/profile";
import { social } from "../../data/social";
import { scrollToSection } from "../../hooks/useLenis";

export default function Footer() {
  return (
    <footer className="border-t border-line px-5 py-10 sm:px-8" aria-label="Footer">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 md:flex-row">
        <button
          onClick={() => scrollToSection("#home")}
          data-cursor="link"
          className="font-display text-sm font-bold tracking-widest"
          aria-label="Back to top"
        >
          <span className="text-accent">{profile.displayName}</span>{" "}
          <span className="text-muted">© 2026</span>
        </button>

        <p className="font-display text-[10px] tracking-[0.4em] text-muted">AI / ML / SOFTWARE</p>

        <nav aria-label="Social links" className="flex items-center gap-3">
          {[
            { href: social.github, label: "GitHub", Icon: Github },
            { href: social.linkedin, label: "LinkedIn", Icon: Linkedin },
            { href: social.email ? `mailto:${social.email}` : "", label: "Email", Icon: Mail },
          ].map(({ href, label, Icon }) =>
            href ? (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                data-cursor="link"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-accent"
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
              </a>
            ) : null,
          )}
        </nav>
      </div>

      {/* Marquee */}
      <div className="mt-10 overflow-hidden" aria-hidden="true">
        <div className="animate-marquee flex w-max whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, half) => (
            <span key={half} className="font-display flex text-[clamp(1.4rem,4vw,3rem)] font-bold tracking-tight uppercase">
              {Array.from({ length: 4 }).map((_, i) => (
                <span key={i} className="mr-8 flex items-center gap-8">
                  <span className={i % 2 ? "stroke-text" : "text-text/90"}>BUILT WITH CURIOSITY.</span>
                  <span className="text-accent">✦</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
