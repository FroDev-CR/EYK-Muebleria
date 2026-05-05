import productsData from "@/data/products.json";
import hdProductsData from "@/data/products-hd.json";
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
  // Precio
  price: number | null;
  regularPrice: number | null;
  // Info producto
  dimensions: string | null;
  deliveryDays: number | null;
  // Flags
  isBestSeller: boolean;
  visible: boolean;
  // Telas disponibles (IDs de FABRICS)
  fabricOptions: string[];
}

// Campos extra por defecto para productos del JSON legacy
const PRODUCT_DEFAULTS: Omit<Product, "id" | "slug" | "category" | "name" | "description" | "image" | "highlight" | "page"> = {
  price: null,
  regularPrice: null,
  dimensions: null,
  deliveryDays: null,
  isBestSeller: false,
  visible: true,
  fabricOptions: [],
};

function normalizeProduct(raw: Record<string, unknown>): Product {
  return {
    ...PRODUCT_DEFAULTS,
    ...(raw as Partial<Product>),
    visible: (raw.visible as boolean) ?? true,
    isBestSeller: (raw.isBestSeller as boolean) ?? false,
    fabricOptions: (raw.fabricOptions as string[]) ?? [],
    price: (raw.price as number | null) ?? null,
    regularPrice: (raw.regularPrice as number | null) ?? null,
    dimensions: (raw.dimensions as string | null) ?? null,
    deliveryDays: (raw.deliveryDays as number | null) ?? null,
  } as Product;
}

export function getLocalProducts(): Product[] {
  // Solo HD hasta que lleguen fotos en alta calidad para el resto
  return (hdProductsData as Record<string, unknown>[]).map(normalizeProduct);
}

export async function getProducts(): Promise<Product[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return getLocalProducts();
  }
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("visible", true)
      .order("is_best_seller", { ascending: false })
      .order("category");
    if (error || !data || data.length === 0) {
      return getLocalProducts();
    }
    return data.map((p) => ({
      ...p,
      isBestSeller: p.is_best_seller ?? false,
      regularPrice: p.regular_price ?? null,
      deliveryDays: p.delivery_days ?? null,
      fabricOptions: p.fabric_options ?? [],
      visible: p.visible ?? true,
    })) as Product[];
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

export async function getBestSellers(): Promise<Product[]> {
  const all = await getProducts();
  return all.filter((p) => p.isBestSeller);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("es-CR", {
    style: "currency",
    currency: "CRC",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}
