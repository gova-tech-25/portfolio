"use client";

import { useEffect, useRef } from "react";

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Check if mobile/touch device
    const isTouchDevice = () => {
      return (
        typeof window !== "undefined" &&
        ("ontouchstart" in window ||
          navigator.maxTouchPoints > 0 ||
          (navigator as any).msMaxTouchPoints > 0)
      );
    };

    if (isTouchDevice()) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      maxLife: number;
      life: number;
      size: number;
      color: string;
      isSparkle: boolean;
    }

    let particles: Particle[] = [];
    const mouse = { x: 0, y: 0, lastX: 0, lastY: 0, active: false };

    // Dynamic color palette based on Tailwind CSS/design theme
    const colors = [
      "rgba(168, 85, 247, ", // purple-500
      "rgba(99, 102, 241, ", // indigo-500
      "rgba(59, 130, 246, ", // blue-500
      "rgba(139, 92, 246, ", // violet-500
      "rgba(6, 182, 212, ",  // cyan-500
    ];

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };

    resizeCanvas();
    const resizeObserver = new ResizeObserver(() => resizeCanvas());
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;

      if (!mouse.active) {
        mouse.lastX = currentX;
        mouse.lastY = currentY;
        mouse.active = true;
      }

      mouse.x = currentX;
      mouse.y = currentY;

      const dx = mouse.x - mouse.lastX;
      const dy = mouse.y - mouse.lastY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > 1) {
        // Create particles along the path for smooth drawing
        const steps = Math.min(Math.floor(distance / 2), 8);
        for (let i = 0; i <= steps; i++) {
          const ratio = steps === 0 ? 1 : i / steps;
          const px = mouse.lastX + dx * ratio;
          const py = mouse.lastY + dy * ratio;

          // Main comet glow particle
          const color = colors[Math.floor(Math.random() * colors.length)];
          const size = Math.random() * 3 + 1.5;
          const life = Math.random() * 20 + 20;

          particles.push({
            x: px,
            y: py,
            // Drag effect: move opposite to cursor velocity + random dispersion
            vx: -dx * 0.1 + (Math.random() - 0.5) * 0.5,
            vy: -dy * 0.1 + (Math.random() - 0.5) * 0.5,
            alpha: 1.0,
            maxLife: life,
            life: life,
            size: size,
            color: color,
            isSparkle: false,
          });

          // Occasional sparkle particle
          if (Math.random() > 0.6) {
            const sparkleLife = Math.random() * 30 + 15;
            particles.push({
              x: px + (Math.random() - 0.5) * 6,
              y: py + (Math.random() - 0.5) * 6,
              // Sparkles shoot outwards slightly more
              vx: -dx * 0.15 + (Math.random() - 0.5) * 1.5,
              vy: -dy * 0.15 + (Math.random() - 0.5) * 1.5,
              alpha: 1.0,
              maxLife: sparkleLife,
              life: sparkleLife,
              size: Math.random() * 1.5 + 0.5,
              color: "rgba(255, 255, 255, ", // white sparkle
              isSparkle: true,
            });
          }
        }
      }

      mouse.lastX = mouse.x;
      mouse.lastY = mouse.y;
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.lastX = mouse.x;
      mouse.lastY = mouse.y;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener("mousemove", handleMouseMove);
      parent.addEventListener("mouseenter", handleMouseEnter);
      parent.addEventListener("mouseleave", handleMouseLeave);
    }

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        
        // Apply physics
        p.x += p.vx;
        p.y += p.vy;
        
        // Slow deceleration (friction)
        p.vx *= 0.98;
        p.vy *= 0.98;

        p.life--;
        p.alpha = p.life / p.maxLife;

        // Remove dead particles
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        if (p.isSparkle) {
          // Draw star-like shapes or small squares/diamonds for sparkles
          ctx.rect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
          ctx.fillStyle = `${p.color}${p.alpha})`;
          ctx.shadowBlur = p.size * 2;
          ctx.shadowColor = "rgba(255, 255, 255, 0.8)";
          ctx.fill();
        } else {
          // Draw standard glow particle
          ctx.arc(p.x, p.y, p.size * p.alpha, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${p.alpha * 0.8})`;
          
          // Outer glow
          ctx.shadowBlur = p.size * 3;
          ctx.shadowColor = `${p.color}0.6)`;
          ctx.fill();
        }
      }

      // Draw active cursor glow (comet head aura)
      if (mouse.active) {
        ctx.beginPath();
        const glowGrad = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          30
        );
        glowGrad.addColorStop(0, "rgba(168, 85, 247, 0.12)");
        glowGrad.addColorStop(0.5, "rgba(99, 102, 241, 0.04)");
        glowGrad.addColorStop(1, "rgba(99, 102, 241, 0)");
        
        ctx.arc(mouse.x, mouse.y, 30, 0, Math.PI * 2);
        ctx.fillStyle = glowGrad;
        ctx.shadowBlur = 0; // turn off shadow for performance
        ctx.fill();
      }

      // Limit particle count to avoid slowdowns
      if (particles.length > 250) {
        particles.splice(0, particles.length - 250);
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (parent) {
        parent.removeEventListener("mousemove", handleMouseMove);
        parent.removeEventListener("mouseenter", handleMouseEnter);
        parent.removeEventListener("mouseleave", handleMouseLeave);
      }
      resizeObserver.disconnect();
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-10"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
