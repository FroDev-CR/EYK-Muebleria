import { CATEGORY_GROUPS, CATEGORIES } from "@/lib/data";
import { getProducts, getBestSellers } from "@/lib/products";
import { HomeContent } from "@/components/home-content";

export default async function Home() {
  const [all, bestSellers] = await Promise.all([getProducts(), getBestSellers()]);

  const previewByGroup = CATEGORY_GROUPS.map((g) => {
    const ids = new Set(CATEGORIES.filter((c) => c.group === g.id).map((c) => c.id));
    const items = all.filter((p) => ids.has(p.category));
    const sample = items[Math.floor(items.length / 3)] || items[0];
    return { group: g, sample, count: items.length };
  });

  return (
    <HomeContent
      bestSellers={bestSellers}
      previewByGroup={previewByGroup}
    />
  );
}
