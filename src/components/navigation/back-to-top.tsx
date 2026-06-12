"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useScrollProgress } from "@/hooks/use-scroll-progress";
import { scrollToSection } from "@/lib/utils";

export function BackToTop() {
  const { progress } = useScrollProgress();
  const visible = progress > 0.3;

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={() => scrollToSection("hero")}
          className="fixed bottom-8 right-8 z-40 p-3 rounded-full bg-primary text-white shadow-lg hover:bg-primary-hover transition-colors"
          aria-label="Back to top"
        >
          <ArrowUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
