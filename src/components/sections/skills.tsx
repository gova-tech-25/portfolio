"use client";

import { SectionTitle } from "@/components/ui/section-title";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { skillCategories } from "@/lib/resume-data";

export function Skills() {
  return (
    <section id="skills" className="section-padding relative">
      <div className="container-custom">
        <SectionTitle
          title="Skills & Technologies"
          subtitle="Technologies I work with on a daily basis"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {skillCategories.map((category, i) => (
            <ScrollReveal key={category.title} delay={i * 0.05}>
              <div className="glass rounded-2xl p-5 h-full transition-all duration-500 hover:bg-surface-hover hover:translate-y-[-2px]">
                <div className={`w-8 h-1 rounded-full bg-gradient-to-r ${category.color} mb-3`} />
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted mb-3">
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 text-xs font-medium rounded-full bg-surface text-muted border border-[var(--border)]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
