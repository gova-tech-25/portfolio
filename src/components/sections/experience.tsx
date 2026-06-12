"use client";

import { SectionTitle } from "@/components/ui/section-title";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { GlassCard } from "@/components/ui/glass-card";
import { experience } from "@/lib/resume-data";

export function Experience() {
  return (
    <section id="experience" className="section-padding relative">
      <div className="container-custom">
        <SectionTitle
          title="Experience"
          subtitle="Professional experience and internships"
        />

        <div className="space-y-6 max-w-3xl mx-auto">
          {experience.map((exp, i) => (
            <ScrollReveal key={exp.title + exp.company} delay={i * 0.1}>
              <GlassCard>
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-lg font-semibold">{exp.title}</h3>
                    <p className="text-primary text-sm">{exp.company}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-muted text-sm">{exp.period}</p>
                    <p className="text-muted text-xs">{exp.location}</p>
                  </div>
                </div>
                <ul className="space-y-1.5">
                  {exp.points.map((point, j) => (
                    <li key={j} className="text-muted text-sm flex gap-2">
                      <span className="text-primary mt-1.5 shrink-0">
                        <svg width="6" height="6" viewBox="0 0 6 6" fill="currentColor">
                          <circle cx="3" cy="3" r="3" />
                        </svg>
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
