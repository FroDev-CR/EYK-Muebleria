import hdProductsData from "@/data/products-hd.json";
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

async function readOverrides(): Promise<Record<string, Partial<Product>>> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return {};
  }
  try {
    const { createAdminClient } = await import("@/lib/supabase-admin");
    const supabase = createAdminClient();
    const { data, error } = await supabase.from("product_overrides").select("id, data");
    if (error || !data) return {};
    const out: Record<string, Partial<Product>> = {};
    for (const row of data) {
      out[row.id as string] = row.data as Partial<Product>;
    }
    return out;
  } catch {
    return {};
  }
}

export async function getProducts(): Promise<Product[]> {
  const base = getLocalProducts();
  const overrides = await readOverrides();

  if (Object.keys(overrides).length === 0) return base.filter((p) => p.visible !== false);

  // Aplicar overrides sobre base
  const merged = base.map((p) => normalizeProduct({ ...p, ...overrides[p.id] }));

  // Agregar custom products (sólo en overrides, no en JSON base)
  const baseIds = new Set(base.map((p) => p.id));
  const customs = Object.entries(overrides)
    .filter(([id]) => !baseIds.has(id))
    .map(([, data]) => data as Record<string, unknown>)
    .filter((d) => d.id && d.name && d.image)
    .map(normalizeProduct);

  return [...merged, ...customs].filter((p) => p.visible !== false);
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

