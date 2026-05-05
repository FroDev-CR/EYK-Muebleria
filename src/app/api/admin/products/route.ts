import { NextResponse } from "next/server";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";
import type { Product } from "@/lib/products";
import type { CategoryId } from "@/lib/data";

const OVERRIDES_PATH = join(process.cwd(), "src", "data", "products-admin.json");

function readOverrides(): Record<string, Partial<Product>> {
  if (!existsSync(OVERRIDES_PATH)) return {};
  try {
    return JSON.parse(readFileSync(OVERRIDES_PATH, "utf-8"));
  } catch {
    return {};
  }
}

function writeOverrides(data: Record<string, Partial<Product>>) {
  writeFileSync(OVERRIDES_PATH, JSON.stringify(data, null, 2), "utf-8");
}

// GET /api/admin/products — list all with overrides merged
export async function GET() {
  try {
    const base = (await import("@/data/products.json")).default as Product[];
    const hd = (await import("@/data/products-hd.json")).default as Product[];
    const overrides = readOverrides();

    const all = [...hd, ...base.filter((p) => (p.category as string) !== "coquetas")];
    const merged = all.map((p) => ({ ...p, ...(overrides[p.id] ?? {}) }));

    return NextResponse.json(merged);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

// POST /api/admin/products — create new product
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const overrides = readOverrides();

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

    overrides[id] = newProduct;
    writeOverrides(overrides);

    return NextResponse.json(newProduct, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

// PATCH /api/admin/products — update product by id
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;
    if (!id) return NextResponse.json({ error: "id requerido" }, { status: 400 });

    const overrides = readOverrides();
    overrides[id] = { ...(overrides[id] ?? {}), ...updates };
    writeOverrides(overrides);

    return NextResponse.json({ ok: true, id });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

// DELETE /api/admin/products?id=xxx — hide product
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "id requerido" }, { status: 400 });

    const overrides = readOverrides();
    overrides[id] = { ...(overrides[id] ?? {}), visible: false };
    writeOverrides(overrides);

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
