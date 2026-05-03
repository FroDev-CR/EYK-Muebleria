/**
 * Productos: data layer con fallback local + Supabase opcional.
 *
 * Por defecto leemos de `src/data/products.json` (generado del PDF).
 * Si Supabase está configurado y la tabla existe, sobreescribe.
 */

import productsData from "@/data/products.json";
import { createClient } from "@/lib/supabase";
import type { CategoryId } from "@/lib/data";

export interface Product {
  id: string;
  slug: string;
  category: CategoryId;
  name: string;
  description: string | null;
  image: string;
  highlight: boolean;
  page: number;
}

export function getLocalProducts(): Product[] {
  return productsData as Product[];
}

export async function getProducts(): Promise<Product[]> {
  // Si NO hay Supabase configurado, usar JSON local.
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return getLocalProducts();
  }
  try {
    const supabase = createClient();
    const { data, error } = await supabase.from("products").select("*").order("category");
    if (error || !data || data.length === 0) {
      return getLocalProducts();
    }
    return data as Product[];
  } catch {
    return getLocalProducts();
  }
}

export async function getProductsByCategory(category: CategoryId): Promise<Product[]> {
  const all = await getProducts();
  return all.filter((p) => p.category === category);
}

export async function getProductsByGroup(group: string): Promise<Product[]> {
  const { CATEGORIES } = await import("@/lib/data");
  const ids = new Set(CATEGORIES.filter((c) => c.group === group).map((c) => c.id));
  const all = await getProducts();
  return all.filter((p) => ids.has(p.category));
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const all = await getProducts();
  return all.find((p) => p.slug === slug) ?? null;
}

export async function getHighlights(limit = 8): Promise<Product[]> {
  const all = await getProducts();
  return all.filter((p) => p.highlight).slice(0, limit);
}
