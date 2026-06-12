"use client";

import { SectionTitle } from "@/components/ui/section-title";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { GlassCard } from "@/components/ui/glass-card";
import { personalInfo } from "@/lib/resume-data";

export function About() {
  return (
    <section id="about" className="section-padding relative">
      <div className="container-custom">
        <SectionTitle
          title="About Me"
          subtitle="A passionate developer crafting digital experiences"
        />

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <ScrollReveal direction="left">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 mx-auto rounded-full glass flex items-center justify-center">
                <span className="text-6xl md:text-7xl font-bold gradient-text">
                  {personalInfo.initials}
                </span>
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl" />
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.2}>
            <GlassCard>
              <h3 className="text-xl font-semibold mb-4">
                B.Tech CSE @ IIIT Sri City
              </h3>
              <p className="text-muted leading-relaxed mb-4">
                I&apos;m a third-year Computer Science student at IIIT Sri City with a
                deep passion for building innovative solutions. My expertise spans
                full-stack development, machine learning, and cloud computing.
              </p>
              <p className="text-muted leading-relaxed mb-6">
                I thrive on turning complex problems into elegant, user-friendly
                applications. Whether it&apos;s crafting responsive frontends with
                React or training deep learning models, I bring creativity and
                technical rigor to every project.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted">Location</span>
                  <p className="font-medium">{personalInfo.location}</p>
                </div>
                <div>
                  <span className="text-muted">Email</span>
                  <p className="font-medium truncate">{personalInfo.email}</p>
                </div>
                <div>
                  <span className="text-muted">Phone</span>
                  <p className="font-medium">{personalInfo.phone}</p>
                </div>
                <div>
                  <span className="text-muted">Status</span>
                  <p className="font-medium text-primary">Open to opportunities</p>
                </div>
              </div>
            </GlassCard>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
