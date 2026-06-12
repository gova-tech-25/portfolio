"use client";

import { Award, ExternalLink } from "lucide-react";
import { SectionTitle } from "@/components/ui/section-title";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { GlassCard } from "@/components/ui/glass-card";
import { certifications } from "@/lib/resume-data";

const iconMap: Record<string, React.ReactNode> = {
  brain: <Award size={20} />,
  cloud: <Award size={20} />,
  code: <Award size={20} />,
  "git-branch": <Award size={20} />,
};

export function Certifications() {
  return (
    <section id="certifications" className="section-padding relative">
      <div className="container-custom">
        <SectionTitle
          title="Certifications"
          subtitle="Professional certifications and credentials"
        />

        <div className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {certifications.map((cert, i) => (
            <ScrollReveal key={cert.title} delay={i * 0.1}>
              <GlassCard className="flex gap-4 items-start group">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  {iconMap[cert.icon] || <Award size={20} className="text-primary" />}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-muted text-xs mt-0.5">{cert.issuer}</p>
                  <p className="text-muted text-xs mt-1 leading-relaxed">
                    {cert.description}
                  </p>
                  {cert.url && (
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-primary mt-2 hover:underline"
                    >
                      View credential <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
