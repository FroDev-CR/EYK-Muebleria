import { NextResponse } from "next/server";
import type { Product } from "@/lib/products";
import type { CategoryId } from "@/lib/data";
import { createAdminClient, isAdminConfigured } from "@/lib/supabase-admin";

const TABLE = "product_overrides";

async function readOverrides(): Promise<Record<string, Partial<Product>>> {
  if (!isAdminConfigured()) return {};
  const supabase = createAdminClient();
  const { data, error } = await supabase.from(TABLE).select("id, data");
  if (error || !data) return {};
  const out: Record<string, Partial<Product>> = {};
  for (const row of data) {
    out[row.id as string] = row.data as Partial<Product>;
  }
  return out;
}

// GET /api/admin/products — list all with overrides merged
export async function GET() {
  try {
    const base = (await import("@/data/products.json")).default as Product[];
    const hd = (await import("@/data/products-hd.json")).default as Product[];
    const overrides = await readOverrides();

    const all = [...hd, ...base.filter((p) => (p.category as string) !== "coquetas")];
    const overrideIds = new Set(Object.keys(overrides));
    const merged = all.map((p) => ({ ...p, ...(overrides[p.id] ?? {}) }));

    // Custom products (only in overrides, not in JSON files)
    const customs: Partial<Product>[] = [];
    const baseIds = new Set(all.map((p) => p.id));
    for (const id of overrideIds) {
      if (!baseIds.has(id)) customs.push(overrides[id]);
    }

    return NextResponse.json([...merged, ...customs]);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

// POST /api/admin/products — create new product
export async function POST(request: Request) {
  if (!isAdminConfigured()) {
    return NextResponse.json({ error: "Supabase no configurado" }, { status: 500 });
  }
  try {
    const body = await request.json();
    const id = body.id || `custom-${Date.now()}`;
    const slug = body.slug || id;

    const newProduct: Partial<Product> = {
      id,
      slug,
      category: body.category as CategoryId,
      name: body.name,
      description: body.description ?? null,
      image: body.image,
      highlight: body.highlight ?? false,
      page: 0,
      price: body.price ?? null,
      regularPrice: body.regularPrice ?? null,
      dimensions: body.dimensions ?? null,
      deliveryDays: body.deliveryDays ?? null,
      isBestSeller: body.isBestSeller ?? false,
      visible: body.visible ?? true,
      fabricOptions: body.fabricOptions ?? [],
    };

    const supabase = createAdminClient();
    const { error } = await supabase
      .from(TABLE)
      .upsert({ id, data: newProduct }, { onConflict: "id" });
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(newProduct, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

// PATCH /api/admin/products — update product by id
export async function PATCH(request: Request) {
  if (!isAdminConfigured()) {
    return NextResponse.json({ error: "Supabase no configurado" }, { status: 500 });
  }
  try {
    const body = await request.json();
    const { id, ...updates } = body;
    if (!id) return NextResponse.json({ error: "id requerido" }, { status: 400 });

    const supabase = createAdminClient();
    const { data: existing } = await supabase
      .from(TABLE)
      .select("data")
      .eq("id", id)
      .maybeSingle();

    const merged = { ...((existing?.data as Partial<Product>) ?? {}), ...updates };
    const { error } = await supabase
      .from(TABLE)
      .upsert({ id, data: merged }, { onConflict: "id" });
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, id });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

// DELETE /api/admin/products?id=xxx — hide product
export async function DELETE(request: Request) {
  if (!isAdminConfigured()) {
    return NextResponse.json({ error: "Supabase no configurado" }, { status: 500 });
  }
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "id requerido" }, { status: 400 });

    const supabase = createAdminClient();
    const { data: existing } = await supabase
      .from(TABLE)
      .select("data")
      .eq("id", id)
      .maybeSingle();

    const merged = {
      ...((existing?.data as Partial<Product>) ?? {}),
      visible: false,
    };
    const { error } = await supabase
      .from(TABLE)
      .upsert({ id, data: merged }, { onConflict: "id" });
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
