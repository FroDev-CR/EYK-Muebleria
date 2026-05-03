"use client";

import { useEffect, useRef } from "react";

/**
 * Spotlight sutil que sigue el cursor en el hero. Da textura sin caer en
 * "AI gradient mesh". Solo visible en pantallas grandes y respeta reduced-motion.
 */
export function HeroSpotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return; // skip táctil

    let rafId = 0;
    let nextX = 50;
    let nextY = 50;
    let curX = 50;
    let curY = 50;

    function onMove(ev: MouseEvent) {
      const rect = el!.getBoundingClientRect();
      nextX = ((ev.clientX - rect.left) / rect.width) * 100;
      nextY = ((ev.clientY - rect.top) / rect.height) * 100;
    }

    function tick() {
      curX += (nextX - curX) * 0.08;
      curY += (nextY - curY) * 0.08;
      el!.style.setProperty("--mx", `${curX}%`);
      el!.style.setProperty("--my", `${curY}%`);
      rafId = requestAnimationFrame(tick);
    }

    window.addEventListener("mousemove", onMove);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 hidden md:block"
      style={
        {
          "--mx": "50%",
          "--my": "50%",
          background:
            "radial-gradient(600px circle at var(--mx) var(--my), oklch(0.94 0.025 70 / 0.6), transparent 60%)",
          transition: "opacity 0.4s",
        } as React.CSSProperties
      }
    />
  );
}
