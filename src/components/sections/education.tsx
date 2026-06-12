"use client";

import { GraduationCap } from "lucide-react";
import { SectionTitle } from "@/components/ui/section-title";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { GlassCard } from "@/components/ui/glass-card";
import { education } from "@/lib/resume-data";

export function Education() {
  return (
    <section id="education" className="section-padding relative">
      <div className="container-custom">
        <SectionTitle
          title="Education"
          subtitle="My academic journey"
        />

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-[23px] top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-transparent" />

          <div className="space-y-8">
            {education.map((edu, i) => (
              <ScrollReveal key={edu.degree} delay={i * 0.15}>
                <div className="flex gap-6">
                  <div className="relative z-10 shrink-0">
                    <div className="w-12 h-12 rounded-full glass flex items-center justify-center">
                      <GraduationCap size={20} className="text-primary" />
                    </div>
                  </div>

                  <GlassCard className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                      <div>
                        <h3 className="text-lg font-semibold">{edu.degree}</h3>
                        <p className="text-primary text-sm">{edu.institution}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-muted text-sm">{edu.period}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-muted text-xs">{edu.location}</p>
                      <span className="text-sm font-medium gradient-text">{edu.details}</span>
                    </div>
                  </GlassCard>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
