"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MapPin, Phone } from "lucide-react";
import { SectionTitle } from "@/components/ui/section-title";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { personalInfo } from "@/lib/resume-data";

export function Contact() {
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    const res = await fetch("https://formspree.io/f/xqaplyna", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      setSubmitted(true);
      form.reset();
    }
  }

  return (
    <section id="contact" className="section-padding relative">
      <div className="container-custom">
        <SectionTitle
          title="Get In Touch"
          subtitle="Have a project in mind? Let's work together"
        />

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <ScrollReveal direction="left">
            <GlassCard className="h-full">
              <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
              <p className="text-muted text-sm mb-6">
                I&apos;m always open to new opportunities, collaborations, and
                interesting projects. Feel free to reach out!
              </p>

              <div className="space-y-4">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-3 text-sm text-muted hover:text-foreground transition-colors group"
                >
                  <span className="w-10 h-10 rounded-full bg-surface flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <Mail size={16} className="text-primary" />
                  </span>
                  {personalInfo.email}
                </a>
                <a
                  href={`tel:${personalInfo.phone}`}
                  className="flex items-center gap-3 text-sm text-muted hover:text-foreground transition-colors group"
                >
                  <span className="w-10 h-10 rounded-full bg-surface flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <Phone size={16} className="text-primary" />
                  </span>
                  {personalInfo.phone}
                </a>
                <div className="flex items-center gap-3 text-sm text-muted group">
                  <span className="w-10 h-10 rounded-full bg-surface flex items-center justify-center">
                    <MapPin size={16} className="text-primary" />
                  </span>
                  {personalInfo.location}
                </div>
              </div>
            </GlassCard>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.1}>
            <GlassCard>
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Send size={28} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Message Sent!</h3>
                  <p className="text-muted text-sm">
                    Thank you! I&apos;ll get back to you as soon as possible.
                  </p>
                  <Button
                    variant="ghost"
                    className="mt-4"
                    onClick={() => setSubmitted(false)}
                  >
                    Send another message
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1.5">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-2.5 rounded-xl bg-surface border border-[var(--border)] text-foreground placeholder-muted focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-colors text-sm"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-2.5 rounded-xl bg-surface border border-[var(--border)] text-foreground placeholder-muted focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-colors text-sm"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1.5">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      className="w-full px-4 py-2.5 rounded-xl bg-surface border border-[var(--border)] text-foreground placeholder-muted focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-colors text-sm resize-none"
                      placeholder="Your message..."
                    />
                  </div>
                  <Button variant="primary" size="md" type="submit">
                    <Send size={16} />
                    Send Message
                  </Button>
                </form>
              )}
            </GlassCard>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
