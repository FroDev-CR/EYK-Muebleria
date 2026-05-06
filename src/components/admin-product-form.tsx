"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import type { Product } from "@/lib/products";
import { FABRICS } from "@/lib/data";

const CATEGORIES = [
  { id: "sofas", label: "Sofás" },
  { id: "divan-ottoman", label: "Sofá Diván · Sofá Ottoman" },
  { id: "esquineros", label: "Esquineros" },
  { id: "sofa-camas", label: "Sofá Camas" },
  { id: "comedores", label: "Comedores" },
  { id: "camas", label: "Camas" },
  { id: "butacas", label: "Butacas" },
  { id: "tendencia", label: "Tendencia (minimalistas, curvos)" },
];

interface Props {
  product?: Partial<Product>;
  mode: "create" | "edit";
}

export function AdminProductForm({ product, mode }: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [uploadingImg, setUploadingImg] = useState(false);

  const [form, setForm] = useState({
    id: product?.id || "",
    slug: product?.slug || "",
    name: product?.name || "",
    category: product?.category || "sofas",
    description: product?.description || "",
    image: product?.image || "",
    price: product?.price?.toString() || "",
    regularPrice: product?.regularPrice?.toString() || "",
    dimensions: product?.dimensions || "",
    deliveryDays: product?.deliveryDays?.toString() || "",
    isBestSeller: product?.isBestSeller ?? false,
    visible: product?.visible ?? true,
    fabricOptions: product?.fabricOptions || [],
    highlight: product?.highlight ?? false,
  });

  function set(key: string, value: unknown) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function toggleFabric(id: string) {
    setForm((f) => ({
      ...f,
      fabricOptions: f.fabricOptions.includes(id)
        ? f.fabricOptions.filter((x) => x !== id)
        : [...f.fabricOptions, id],
    }));
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImg(true);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("category", form.category);
    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (data.url) set("image", data.url);
      else setError(data.error || "Error al subir imagen");
    } catch {
      setError("Error al subir imagen");
    } finally {
      setUploadingImg(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      ...form,
      slug: form.slug || form.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
      id: form.id || `custom-${Date.now()}`,
      price: form.price ? Number(form.price) : null,
      regularPrice: form.regularPrice ? Number(form.regularPrice) : null,
      deliveryDays: form.deliveryDays ? Number(form.deliveryDays) : null,
      description: form.description || null,
    };

    try {
      const method = mode === "create" ? "POST" : "PATCH";
      const res = await fetch("/api/admin/products", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const d = await res.json();
        setError(d.error || "Error al guardar");
        return;
      }
      router.push("/admin/productos");
      router.refresh();
    } catch {
      setError("Error de conexión");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {/* Nombre + categoría */}
      <div className="bg-white rounded-xl border border-[#e5e5e5] p-6">
        <h2 className="font-semibold text-[#111] mb-4">Información básica</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="label-admin">Nombre del producto *</label>
            <input
              required
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              className="input-admin"
              placeholder="Ej: Sala Milano"
            />
          </div>
          <div>
            <label className="label-admin">Categoría *</label>
            <select
              required
              value={form.category}
              onChange={(e) => set("category", e.target.value)}
              className="input-admin"
            >
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>{c.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label-admin">Slug (URL)</label>
            <input
              value={form.slug}
              onChange={(e) => set("slug", e.target.value)}
              className="input-admin"
              placeholder="sala-milano (auto si vacío)"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="label-admin">Descripción</label>
            <textarea
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              className="input-admin min-h-[80px] resize-y"
              placeholder="Descripción corta del producto"
            />
          </div>
        </div>
      </div>

      {/* Precio */}
      <div className="bg-white rounded-xl border border-[#e5e5e5] p-6">
        <h2 className="font-semibold text-[#111] mb-4">Precios (₡ colones)</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label-admin">Precio oferta</label>
            <input
              type="number"
              min="0"
              step="500"
              value={form.price}
              onChange={(e) => set("price", e.target.value)}
              className="input-admin"
              placeholder="Ej: 450000"
            />
            <p className="text-xs text-[#999] mt-1">Precio actual (naranja)</p>
          </div>
          <div>
            <label className="label-admin">Precio regular (tachado)</label>
            <input
              type="number"
              min="0"
              step="500"
              value={form.regularPrice}
              onChange={(e) => set("regularPrice", e.target.value)}
              className="input-admin"
              placeholder="Ej: 550000"
            />
            <p className="text-xs text-[#999] mt-1">Precio anterior (tachado)</p>
          </div>
          <div>
            <label className="label-admin">Medidas / Dimensiones</label>
            <input
              value={form.dimensions}
              onChange={(e) => set("dimensions", e.target.value)}
              className="input-admin"
              placeholder="Ej: 210 × 90 × 85 cm"
            />
          </div>
          <div>
            <label className="label-admin">Días de fabricación aprox.</label>
            <input
              type="number"
              min="1"
              value={form.deliveryDays}
              onChange={(e) => set("deliveryDays", e.target.value)}
              className="input-admin"
              placeholder="Ej: 30"
            />
          </div>
        </div>
      </div>

      {/* Imagen */}
      <div className="bg-white rounded-xl border border-[#e5e5e5] p-6">
        <h2 className="font-semibold text-[#111] mb-4">Imagen</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label-admin">URL de imagen</label>
            <input
              value={form.image}
              onChange={(e) => set("image", e.target.value)}
              className="input-admin"
              placeholder="/productos/salas/mi-sala.jpg"
            />
            <div className="mt-3">
              <label className="label-admin">O subir imagen</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploadingImg}
                className="block w-full text-sm text-[#666] file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-[#FB531F] file:text-white hover:file:bg-[#d43e0a] cursor-pointer"
              />
              {uploadingImg && <p className="text-xs text-[#999] mt-1">Subiendo...</p>}
            </div>
          </div>
          {form.image && (
            <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-[#f1f1f1] border border-[#e5e5e5]">
              <Image
                src={form.image}
                alt="Preview"
                fill
                className="object-contain p-4"
                sizes="200px"
              />
            </div>
          )}
        </div>
      </div>

      {/* Telas */}
      <div className="bg-white rounded-xl border border-[#e5e5e5] p-6">
        <h2 className="font-semibold text-[#111] mb-4">Telas disponibles</h2>
        <div className="flex flex-wrap gap-3">
          {FABRICS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => toggleFabric(f.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition ${
                form.fabricOptions.includes(f.id)
                  ? "border-[#FB531F] bg-[#fde3d9] text-[#FB531F]"
                  : "border-[#e5e5e5] text-[#666] hover:border-[#ccc]"
              }`}
            >
              <span
                className="w-4 h-4 rounded-full border border-[#ccc] flex-shrink-0"
                style={{ background: f.hex }}
              />
              {f.name}
            </button>
          ))}
        </div>
      </div>

      {/* Flags */}
      <div className="bg-white rounded-xl border border-[#e5e5e5] p-6">
        <h2 className="font-semibold text-[#111] mb-4">Opciones</h2>
        <div className="space-y-3">
          {[
            { key: "isBestSeller", label: "Best Seller (aparece en sección destacada)" },
            { key: "highlight", label: "Destacado (aparece en home highlights)" },
            { key: "visible", label: "Visible en el catálogo" },
          ].map(({ key, label }) => (
            <label key={key} className="flex items-center gap-3 cursor-pointer select-none">
              <div
                onClick={() => set(key, !(form as Record<string, unknown>)[key])}
                className={`w-10 h-6 rounded-full transition relative ${
                  (form as Record<string, unknown>)[key] ? "bg-[#FB531F]" : "bg-[#e5e5e5]"
                }`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                    (form as Record<string, unknown>)[key] ? "translate-x-5" : "translate-x-1"
                  }`}
                />
              </div>
              <span className="text-sm text-[#333]">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {error && (
        <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {error}
        </p>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="bg-[#FB531F] hover:bg-[#d43e0a] text-white font-semibold px-6 py-2.5 rounded-lg transition disabled:opacity-60"
        >
          {saving ? "Guardando..." : mode === "create" ? "Crear producto" : "Guardar cambios"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="bg-[#f1f1f1] hover:bg-[#e5e5e5] text-[#333] font-semibold px-6 py-2.5 rounded-lg transition"
        >
          Cancelar
        </button>
      </div>

      <style>{`
        .label-admin { display: block; font-size: 0.8rem; font-weight: 600; color: #555; margin-bottom: 0.375rem; }
        .input-admin { width: 100%; border: 1px solid #e5e5e5; border-radius: 0.5rem; padding: 0.625rem 0.75rem; font-size: 0.875rem; color: #111; transition: border-color 0.15s; }
        .input-admin:focus { outline: none; border-color: #FB531F; box-shadow: 0 0 0 3px rgba(251,83,31,0.12); }
      `}</style>
    </form>
  );
}
