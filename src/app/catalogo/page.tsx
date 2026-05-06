import { Suspense } from "react";
import { CategoryTabs } from "@/components/category-tabs";
import { CatalogContent } from "@/components/catalog-content";
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
      <div className="container-edge sticky top-[68px] z-20 bg-[var(--color-bone)]/90 backdrop-blur-md py-3">
        <Suspense fallback={null}>
          <CategoryTabs />
        </Suspense>
      </div>
      <CatalogContent sections={sections} activeGroup={activeGroup} productCount={products.length} />
    </>
  );
}
