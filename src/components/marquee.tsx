"use client";

interface Props {
  items: string[];
  /** segundos por loop completo */
  speed?: number;
  reverse?: boolean;
  className?: string;
}

/**
 * Marquee infinito puro CSS. Duplica los items para loop continuo.
 * Pausa en hover para que el usuario pueda leer.
 */
export function Marquee({ items, speed = 40, reverse = false, className = "" }: Props) {
  const dup = [...items, ...items];
  return (
    <div
      className={`group relative overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <div
        className="flex items-center gap-12 whitespace-nowrap will-change-transform"
        style={{
          animation: `marquee-slide ${speed}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
          animationPlayState: "running",
        }}
      >
        {dup.map((item, i) => (
          <span key={i} className="flex items-center gap-12 text-current">
            <span>{item}</span>
            <span aria-hidden className="text-[var(--color-line-strong)]">
              ✦
            </span>
          </span>
        ))}
      </div>

      <style jsx>{`
        .group:hover > div {
          animation-play-state: paused !important;
        }
        @keyframes marquee-slide {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .group > div {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
