import { Suspense } from "react";
import { CategoryTabs } from "@/components/category-tabs";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { CATEGORIES, CATEGORY_GROUPS, type CategoryGroup } from "@/lib/data";
import { getProducts } from "@/lib/products";

export const metadata = {
  title: "Catálogo",
  description:
    "Catálogo completo de salas, comedores, camas y muebles en madera fabricados a la medida.",
};

export default async function CatalogoPage(props: {
  searchParams: Promise<{ grupo?: string }>;
}) {
  const { grupo } = await props.searchParams;
  const all = await getProducts();

  // Filtrar por grupo si está activo
  let products = all;
  let activeGroup: (typeof CATEGORY_GROUPS)[number] | null = null;
  if (grupo) {
    activeGroup = CATEGORY_GROUPS.find((g) => g.id === grupo) ?? null;
    if (activeGroup) {
      const ids = new Set(
        CATEGORIES.filter((c) => c.group === (grupo as CategoryGroup)).map((c) => c.id),
      );
      products = all.filter((p) => ids.has(p.category));
    }
  }

  // Agrupar por categoría dentro del grupo, para mostrar secciones
  const sections: Array<{
    id: string;
    label: string;
    description: string;
    items: typeof products;
  }> = [];

  if (activeGroup) {
    for (const c of CATEGORIES.filter((c) => c.group === activeGroup!.id)) {
      const items = products.filter((p) => p.category === c.id);
      if (items.length === 0) continue;
      sections.push({ id: c.id, label: c.label, description: c.description, items });
    }
  } else {
    for (const g of CATEGORY_GROUPS) {
      const ids = new Set(
        CATEGORIES.filter((c) => c.group === g.id).map((c) => c.id),
      );
      const items = all.filter((p) => ids.has(p.category));
      if (items.length === 0) continue;
      sections.push({ id: g.id, label: g.label, description: g.description, items });
    }
  }

  return (
    <>
      <header className="container-edge pt-12 md:pt-20 pb-8 md:pb-12">
        <Reveal>
          <p className="eyebrow flex items-center gap-3">
            <span aria-hidden className="inline-block w-8 h-px bg-[var(--color-walnut)]" />
            Catálogo · {products.length} piezas
          </p>
          <h1 className="mt-5 font-[family-name:var(--font-display)] text-[clamp(2.25rem,5.5vw,4rem)] leading-[1.04] tracking-[-0.02em]">
            {activeGroup ? activeGroup.label : (
              <>
                Todo el <span className="display-italic">catálogo</span>
              </>
            )}
          </h1>
          <p className="mt-5 max-w-2xl text-[1.0625rem] text-[var(--color-ink-2)] leading-relaxed">
            {activeGroup
              ? activeGroup.description
              : "Todo lo que fabricamos: salas, comedores, camas y muebles en madera. Cada pieza se hace a la medida."}
          </p>
        </Reveal>
      </header>

      <div className="container-edge sticky top-[68px] z-20 bg-[var(--color-bone)]/90 backdrop-blur-md py-3">
        <Suspense fallback={null}>
          <CategoryTabs />
        </Suspense>
      </div>

      <div className="container-edge py-12 md:py-16 space-y-20 md:space-y-28">
        {sections.map((section) => (
          <section key={section.id} aria-labelledby={`s-${section.id}`}>
            <Reveal>
              <header className="flex items-end justify-between gap-6 mb-8">
                <div>
                  <p className="eyebrow">{section.items.length} pieza{section.items.length === 1 ? "" : "s"}</p>
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
                  ¿Querés ver más opciones de {section.label.toLowerCase()}?
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
                  Ver catálogo completo PDF
                </a>
              </div>
            </Reveal>
          </section>
        ))}
      </div>
    </>
  );
}
