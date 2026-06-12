"use client";

import { Github, Linkedin, Mail, Heart } from "lucide-react";
import { personalInfo } from "@/lib/resume-data";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] py-8 mt-8">
      <div className="container-custom px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted text-sm flex items-center gap-1">
            &copy; {year} {personalInfo.name}. Made with <Heart size={14} className="text-red-500 fill-red-500" /> using Next.js &amp; Three.js
          </p>

          <div className="flex items-center gap-3">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full text-muted hover:text-foreground hover:bg-surface transition-all"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full text-muted hover:text-foreground hover:bg-surface transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="p-2 rounded-full text-muted hover:text-foreground hover:bg-surface transition-all"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
