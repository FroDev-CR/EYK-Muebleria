"use client";

import { useEffect, useRef, useState } from "react";

type Variant = "fade-up" | "fade-in" | "slide-left" | "slide-right" | "scale-in";

interface Props {
  as?: "div" | "section" | "article" | "header" | "li" | "ul";
  variant?: Variant;
  delay?: number;
  threshold?: number;
  once?: boolean;
  className?: string;
  children: React.ReactNode;
}

const VARIANT_CLASSES: Record<Variant, { from: string; to: string }> = {
  "fade-up": {
    from: "opacity-0 translate-y-6",
    to: "opacity-100 translate-y-0",
  },
  "fade-in": {
    from: "opacity-0",
    to: "opacity-100",
  },
  "slide-left": {
    from: "opacity-0 translate-x-8",
    to: "opacity-100 translate-x-0",
  },
  "slide-right": {
    from: "opacity-0 -translate-x-8",
    to: "opacity-100 translate-x-0",
  },
  "scale-in": {
    from: "opacity-0 scale-[0.96]",
    to: "opacity-100 scale-100",
  },
};

/**
 * Reveal — wrapper que dispara una animación cuando el elemento entra al viewport.
 * Respeta `prefers-reduced-motion` automáticamente vía CSS.
 */
export function Reveal({
  as: Tag = "div",
  variant = "fade-up",
  delay = 0,
  threshold = 0.15,
  once = true,
  className = "",
  children,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    // Respeta reduced-motion: muestra inmediato sin animación
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            if (once) obs.disconnect();
          } else if (!once) {
            setShown(false);
          }
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );

    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold, once]);

  const v = VARIANT_CLASSES[variant];

  return (
    <Tag
      ref={ref}
      className={[
        "transition-all duration-[800ms] ease-out-quart will-change-transform",
        shown ? v.to : v.from,
        className,
      ].join(" ")}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
