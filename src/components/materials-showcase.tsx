"use client";

import { useState } from "react";
import { Reveal } from "@/components/reveal";

const FABRICS = [
  { name: "Lino", subtitle: "Trama natural · 14 colores", color: "oklch(0.86 0.018 80)", accent: "oklch(0.78 0.030 75)" },
  { name: "Microfibra", subtitle: "Suave · 18 colores", color: "oklch(0.75 0.025 60)", accent: "oklch(0.65 0.040 50)" },
  { name: "Vinil", subtitle: "Resistente · 12 colores", color: "oklch(0.42 0.030 50)", accent: "oklch(0.32 0.025 50)" },
];

const WOODS = [
  { name: "Pino", subtitle: "Liviano · tonos claros", color: "oklch(0.82 0.045 75)", accent: "oklch(0.72 0.060 70)" },
  { name: "Laurel", subtitle: "Veta cálida media", color: "oklch(0.55 0.060 50)", accent: "oklch(0.45 0.075 50)" },
  { name: "Cenízaro", subtitle: "Madera noble · oscura", color: "oklch(0.32 0.045 45)", accent: "oklch(0.22 0.050 45)" },
];

export function MaterialsShowcase() {
  const [activeFabric, setActiveFabric] = useState<string | null>(null);
  const [activeWood, setActiveWood] = useState<string | null>(null);

  return (
    <section className="container-edge py-20 md:py-32">
      <Reveal>
        <header className="mb-14 max-w-2xl">
          <p className="eyebrow">Materiales</p>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(2rem,4.5vw,3rem)] leading-tight tracking-[-0.015em]">
            <span className="display-italic">Buenas</span> telas. Maderas honestas.
          </h2>
          <p className="mt-5 text-[var(--color-ink-2)] text-[1.0625rem] leading-relaxed">
            Combiná cualquier acabado con cualquier diseño del catálogo. Si tenés algo
            específico en mente, lo conseguimos.
          </p>
        </header>
      </Reveal>

      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        <div>
          <Reveal delay={100}>
            <p className="eyebrow text-[var(--color-ink-muted)] mb-6">Telas</p>
          </Reveal>
          <ul className="space-y-3">
            {FABRICS.map((f, i) => (
              <Reveal key={f.name} delay={150 + i * 80}>
                <li
                  onMouseEnter={() => setActiveFabric(f.name)}
                  onMouseLeave={() => setActiveFabric(null)}
                  className={[
                    "group grid grid-cols-[64px_1fr_auto] gap-5 items-center py-4 border-b border-[var(--color-line)] cursor-default transition-all duration-500",
                    activeFabric && activeFabric !== f.name ? "opacity-40" : "opacity-100",
                  ].join(" ")}
                >
                  <div
                    className="aspect-square rounded-sm transition-transform duration-500 ease-out-quart group-hover:scale-110"
                    style={{
                      background: `linear-gradient(135deg, ${f.color} 0%, ${f.accent} 100%)`,
                      boxShadow: "inset 0 0 0 1px oklch(0 0 0 / 0.06)",
                    }}
                  />
                  <div>
                    <p className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-ink)] leading-none">
                      {f.name}
                    </p>
                    <p className="mt-1.5 text-sm text-[var(--color-ink-muted)]">{f.subtitle}</p>
                  </div>
                  <span
                    aria-hidden
                    className="text-[var(--color-ink-subtle)] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[var(--color-walnut)]"
                  >
                    →
                  </span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>

        <div>
          <Reveal delay={150}>
            <p className="eyebrow text-[var(--color-ink-muted)] mb-6">Maderas</p>
          </Reveal>
          <ul className="space-y-3">
            {WOODS.map((w, i) => (
              <Reveal key={w.name} delay={200 + i * 80}>
                <li
                  onMouseEnter={() => setActiveWood(w.name)}
                  onMouseLeave={() => setActiveWood(null)}
                  className={[
                    "group grid grid-cols-[64px_1fr_auto] gap-5 items-center py-4 border-b border-[var(--color-line)] cursor-default transition-all duration-500",
                    activeWood && activeWood !== w.name ? "opacity-40" : "opacity-100",
                  ].join(" ")}
                >
                  <div
                    className="aspect-square rounded-sm transition-transform duration-500 ease-out-quart group-hover:scale-110"
                    style={{
                      background: `linear-gradient(135deg, ${w.color} 0%, ${w.accent} 100%)`,
                      boxShadow: "inset 0 0 0 1px oklch(0 0 0 / 0.06)",
                    }}
                  />
                  <div>
                    <p className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-ink)] leading-none">
                      {w.name}
                    </p>
                    <p className="mt-1.5 text-sm text-[var(--color-ink-muted)]">{w.subtitle}</p>
                  </div>
                  <span
                    aria-hidden
                    className="text-[var(--color-ink-subtle)] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[var(--color-walnut)]"
                  >
                    →
                  </span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
