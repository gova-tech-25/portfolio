"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import { navLinks } from "@/lib/resume-data";
import { scrollToSection } from "@/lib/utils";

interface MobileMenuProps {
  onClose: () => void;
}

export function MobileMenu({ onClose }: MobileMenuProps) {
  function handleClick(id: string) {
    scrollToSection(id);
    onClose();
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 md:hidden"
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="absolute top-0 right-0 bottom-0 w-72 glass p-6 pt-20"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-muted hover:text-foreground hover:bg-surface-hover transition-colors"
          aria-label="Close menu"
        >
          <X size={20} />
        </button>

        <nav className="flex flex-col gap-2">
          {navLinks.map((link, i) => (
            <motion.button
              key={link.href}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => handleClick(link.href.replace("#", ""))}
              className="text-left px-4 py-3 text-lg font-medium text-muted hover:text-foreground hover:bg-surface-hover rounded-xl transition-colors"
            >
              {link.label}
            </motion.button>
          ))}
        </nav>
      </motion.div>
    </motion.div>
  );
}
