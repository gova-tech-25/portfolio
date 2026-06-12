"use client";

import { Trophy, Star, Code2, BookOpen } from "lucide-react";
import { SectionTitle } from "@/components/ui/section-title";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { GlassCard } from "@/components/ui/glass-card";
import { achievements } from "@/lib/resume-data";

const iconMap: Record<string, React.ReactNode> = {
  trophy: <Trophy size={24} />,
  star: <Star size={24} />,
  "code-2": <Code2 size={24} />,
  "book-open": <BookOpen size={24} />,
};

export function Achievements() {
  return (
    <section id="achievements" className="section-padding relative">
      <div className="container-custom">
        <SectionTitle
          title="Achievements"
          subtitle="Milestones and accomplishments"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.1}>
              <GlassCard className="text-center group">
                <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-primary">
                    {iconMap[item.icon] || <Trophy size={24} />}
                  </span>
                </div>
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-xs text-primary mb-1">{item.year}</p>
                <p className="text-muted text-xs">{item.description}</p>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
