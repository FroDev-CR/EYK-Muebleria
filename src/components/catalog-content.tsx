"use client";

import { Reveal } from "@/components/reveal";
import { ProductCard } from "@/components/product-card";
import { useLang } from "@/contexts/lang-context";
import type { Product } from "@/lib/products";
import { CATEGORIES, type CategoryGroup } from "@/lib/data";

interface CatalogSection {
  id: string;
  label: string;
  description: string;
  items: Product[];
}

interface Props {
  sections: CatalogSection[];
  activeGroup: { id: string; label: string; description: string } | null;
  productCount: number;
}

export function CatalogContent({ sections, activeGroup, productCount }: Props) {
  const { t } = useLang();

  return (
    <>
      <header className="container-edge pt-12 md:pt-20 pb-8 md:pb-12">
        <Reveal>
          <p className="eyebrow flex items-center gap-3">
            <span aria-hidden className="inline-block w-8 h-px bg-[var(--color-walnut)]" />
            {t("catalog", "eyebrow")} · {productCount} {productCount === 1 ? t("catalog", "piece") : t("catalog", "pieces")}
          </p>
          <h1 className="mt-5 font-[family-name:var(--font-display)] text-[clamp(2.25rem,5.5vw,4rem)] leading-[1.04] tracking-[-0.02em]">
            {activeGroup ? activeGroup.label : (
              <>
                {t("catalog", "h1")} <span className="display-italic">{t("catalog", "h1_italic")}</span>
              </>
            )}
          </h1>
          <p className="mt-5 max-w-2xl text-[1.0625rem] text-[var(--color-ink-2)] leading-relaxed">
            {activeGroup
              ? activeGroup.description
              : t("catalog", "all_desc")}
          </p>
        </Reveal>
      </header>

      <div className="container-edge py-12 md:py-16 space-y-20 md:space-y-28">
        {sections.map((section) => (
          <section key={section.id} aria-labelledby={`s-${section.id}`}>
            <Reveal>
              <header className="flex items-end justify-between gap-6 mb-8">
                <div>
                  <p className="eyebrow">
                    {section.items.length} {section.items.length === 1 ? t("catalog", "piece") : t("catalog", "pieces")}
                  </p>
                  <h2
                    id={`s-${section.id}`}
                    className="mt-3 font-[family-name:var(--font-display)] text-[clamp(1.75rem,3.5vw,2.5rem)] leading-tight tracking-[-0.01em]"
                  >
                    {section.label}
                  </h2>
                  <p className="mt-2 max-w-2xl text-[var(--color-ink-muted)] text-[0.95rem] leading-relaxed">
                    {section.description}
                  </p>
                </div>
              </header>
            </Reveal>

            <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {section.items.map((p, i) => (
                <Reveal key={p.id} delay={Math.min(i * 50, 400)}>
                  <ProductCard product={p} index={i} priority={i < 4} />
                </Reveal>
              ))}
            </div>

            {/* Botón catálogo PDF */}
            <Reveal delay={200}>
              <div className="mt-10 pt-8 border-t border-[#e5e5e5] flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm text-[#666]">
                  {t("catalog", "pdf_q")} {section.label.toLowerCase()}?
                </p>
                <a
                  href="/catalaogos/EYK_Catálogo2025.pdf.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-[#FB531F] text-[#FB531F] font-semibold text-sm hover:bg-[#FB531F] hover:text-white transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14,2 14,8 20,8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10,9 9,9 8,9"/>
                  </svg>
                  {t("catalog", "pdf_btn")}
                </a>
              </div>
            </Reveal>
          </section>
        ))}
      </div>
    </>
  );
}
