"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/products";

// ─── Content editor config ────────────────────────────────────────────────────
const CONTENT_SECTIONS = [
  {
    title: "Hero principal",
    fields: [
      { key: "home.eyebrow", label: "Frase sobre el título", placeholder: "Fabricantes nacionales · A la medida" },
      { key: "home.hero_h1a", label: "Título línea 1", placeholder: "Muebles que se sienten" },
      { key: "home.hero_h1b", label: "Título línea 2 (itálica)", placeholder: "como tu casa" },
      { key: "home.hero_sub", label: "Subtítulo hero", placeholder: "Salas, comedores, camas y muebles en madera fabricados en Costa Rica.", multiline: true },
    ],
  },
  {
    title: "Best Sellers",
    fields: [
      { key: "home.bs_eyebrow", label: "Eyebrow (etiqueta)", placeholder: "Best Sellers" },
      { key: "home.bs_h2a", label: "Título línea 1", placeholder: "Los más" },
      { key: "home.bs_h2b", label: "Título línea 2 (itálica)", placeholder: "pedidos" },
      { key: "home.bs_sub", label: "Subtítulo", placeholder: "Salas, comedores y camas en fotografía de alta calidad.", multiline: true },
    ],
  },
  {
    title: "Proceso A la Medida",
    fields: [
      { key: "home.process_h2a", label: "Título línea 1", placeholder: "Si tenés una idea," },
      { key: "home.process_h2b", label: "Título línea 2 (itálica)", placeholder: "la cotizamos" },
      { key: "home.process_sub", label: "Subtítulo", placeholder: "Trabajamos principalmente en madera y algunas estructuras metálicas.", multiline: true },
      { key: "home.process_note", label: "Nota de fabricación", placeholder: "* Lapso de fabricación: ~1 mes salas · ~1 mes y 2 semanas comedores.", multiline: true },
    ],
  },
  {
    title: "Categorías (inicio)",
    fields: [
      { key: "home.cat_h2a", label: "Título línea 1", placeholder: "Cuatro grupos." },
      { key: "home.cat_h2b", label: "Título línea 2 (itálica)", placeholder: "Posibilidades infinitas." },
    ],
  },
  {
    title: "Footer",
    fields: [
      { key: "footer.tagline", label: "Tagline / descripción", placeholder: "Fabricamos salas, comedores, camas y muebles en madera a la medida.", multiline: true },
      { key: "footer.handmade", label: "Frase final (itálica)", placeholder: "Hecho a mano, en Costa Rica." },
    ],
  },
  {
    title: "Contacto",
    fields: [
      { key: "contact.h1", label: "Título página contacto", placeholder: "Hablemos de tu próximo mueble." },
      { key: "contact.sub", label: "Subtítulo contacto", placeholder: "Respondemos por WhatsApp generalmente el mismo día.", multiline: true },
    ],
  },
  {
    title: "Entregas",
    fields: [
      { key: "deliveries.h1a", label: "Título línea 1", placeholder: "Muebles" },
      { key: "deliveries.h1b", label: "Título línea 2 (itálica)", placeholder: "en su hogar" },
      { key: "deliveries.sub", label: "Subtítulo", placeholder: "Cada entrega es el resultado de semanas de fabricación artesanal.", multiline: true },
    ],
  },
];

const CATEGORY_LABELS: Record<string, string> = {
  sofas: "Sofás",
  "divan-ottoman": "Sofá Diván · Sofá Ottoman",
  esquineros: "Esquineros",
  "sofa-camas": "Sofá Camas",
  comedores: "Comedores",
  camas: "Camas",
  butacas: "Butacas",
  tendencia: "Tendencia",
  // Legacy (productos sin re-categorizar)
  salas: "Salas (legacy)",
  "sofas-tantricos": "Tántricos (legacy)",
  madera: "Madera (legacy)",
  camillas: "Camillas (legacy)",
};

type SaveStatus = "idle" | "saving" | "saved" | "error";

export default function ProductosAdminPage() {
  const [tab, setTab] = useState<"productos" | "contenido">("productos");

  // ── Products state ──
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("");
  const [filterBS, setFilterBS] = useState<"" | "yes" | "no">("");

  // ── Content state ──
  const [contentValues, setContentValues] = useState<Record<string, string>>({});
  const [contentLoading, setContentLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");

  useEffect(() => {
    fetch("/api/admin/products")
      .then((r) => r.json())
      .then((data) => { setProducts(data); setLoading(false); })
      .catch(() => setLoading(false));

    fetch("/api/admin/content")
      .then((r) => r.json())
      .then((data: Record<string, string>) => { setContentValues(data); setContentLoading(false); })
      .catch(() => setContentLoading(false));
  }, []);

  // ── Product actions ──
  async function toggleVisible(id: string, current: boolean) {
    await fetch("/api/admin/products", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, visible: !current }),
    });
    setProducts((ps) => ps.map((p) => (p.id === id ? { ...p, visible: !current } : p)));
  }

  async function toggleBestSeller(id: string, current: boolean) {
    await fetch("/api/admin/products", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, isBestSeller: !current }),
    });
    setProducts((ps) => ps.map((p) => (p.id === id ? { ...p, isBestSeller: !current } : p)));
  }

  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat ? p.category === filterCat : true;
    const matchBS =
      filterBS === "yes" ? p.isBestSeller
      : filterBS === "no" ? !p.isBestSeller
      : true;
    return matchSearch && matchCat && matchBS;
  });

  // ── Content actions ──
  function handleContentChange(key: string, value: string) {
    setContentValues((prev) => ({ ...prev, [key]: value }));
    setSaveStatus("idle");
  }

  function handleContentReset(key: string) {
    setContentValues((prev) => { const next = { ...prev }; delete next[key]; return next; });
    setSaveStatus("idle");
  }

  async function handleContentSave() {
    setSaveStatus("saving");
    try {
      const res = await fetch("/api/admin/content", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contentValues),
      });
      if (!res.ok) throw new Error();
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 3000);
    } catch {
      setSaveStatus("error");
    }
  }

  return (
    <div>
      {/* Tabs */}
      <div className="flex items-center gap-1 mb-8 border-b border-[#e5e5e5]">
        <button
          onClick={() => setTab("productos")}
          className={[
            "px-4 py-2.5 text-sm font-semibold transition border-b-2 -mb-px",
            tab === "productos"
              ? "border-[#FB531F] text-[#FB531F]"
              : "border-transparent text-[#666] hover:text-[#111]",
          ].join(" ")}
        >
          Productos
        </button>
        <button
          onClick={() => setTab("contenido")}
          className={[
            "px-4 py-2.5 text-sm font-semibold transition border-b-2 -mb-px",
            tab === "contenido"
              ? "border-[#FB531F] text-[#FB531F]"
              : "border-transparent text-[#666] hover:text-[#111]",
          ].join(" ")}
        >
          Contenido del sitio
        </button>
      </div>

      {/* ── TAB: PRODUCTOS ─────────────────────────────────────────────── */}
      {tab === "productos" && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-[#111]">Productos</h1>
              <p className="text-sm text-[#666] mt-0.5">{filtered.length} de {products.length} productos</p>
            </div>
            <Link
              href="/admin/productos/nuevo"
              className="bg-[#FB531F] hover:bg-[#d43e0a] text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
            >
              + Agregar producto
            </Link>
          </div>

          <div className="flex flex-wrap gap-3 mb-5">
            <input
              type="text"
              placeholder="Buscar por nombre..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-[#e5e5e5] rounded-lg px-3 py-2 text-sm w-56 focus:outline-none focus:border-[#FB531F]"
            />
            <select
              value={filterCat}
              onChange={(e) => setFilterCat(e.target.value)}
              className="border border-[#e5e5e5] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#FB531F]"
            >
              <option value="">Todas las categorías</option>
              {Object.entries(CATEGORY_LABELS).map(([id, label]) => (
                <option key={id} value={id}>{label}</option>
              ))}
            </select>
            <select
              value={filterBS}
              onChange={(e) => setFilterBS(e.target.value as "" | "yes" | "no")}
              className="border border-[#e5e5e5] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#FB531F]"
            >
              <option value="">Todos</option>
              <option value="yes">Best Sellers</option>
              <option value="no">No Best Seller</option>
            </select>
          </div>

          {loading ? (
            <div className="text-center py-16 text-[#999]">Cargando productos...</div>
          ) : (
            <div className="bg-white rounded-xl border border-[#e5e5e5] overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#e5e5e5] bg-[#f8f8f8]">
                    <th className="text-left px-4 py-3 text-[#666] font-semibold w-16">Img</th>
                    <th className="text-left px-4 py-3 text-[#666] font-semibold">Nombre</th>
                    <th className="text-left px-4 py-3 text-[#666] font-semibold">Categoría</th>
                    <th className="text-left px-4 py-3 text-[#666] font-semibold">Precio Oferta</th>
                    <th className="text-left px-4 py-3 text-[#666] font-semibold">Precio Regular</th>
                    <th className="text-left px-4 py-3 text-[#666] font-semibold">Medidas</th>
                    <th className="text-center px-4 py-3 text-[#666] font-semibold">Best Seller</th>
                    <th className="text-center px-4 py-3 text-[#666] font-semibold">Visible</th>
                    <th className="text-center px-4 py-3 text-[#666] font-semibold">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p) => (
                    <tr key={p.id} className={`border-b border-[#f1f1f1] hover:bg-[#fafafa] transition ${!p.visible ? "opacity-50" : ""}`}>
                      <td className="px-4 py-3">
                        <div className="w-12 h-12 rounded overflow-hidden bg-[#f1f1f1] relative">
                          <Image src={p.image} alt={p.name} fill className="object-cover" sizes="48px" />
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-medium text-[#111] leading-snug">{p.name}</p>
                        <p className="text-[10px] text-[#999] mt-0.5">{p.id}</p>
                      </td>
                      <td className="px-4 py-3 text-[#555]">{CATEGORY_LABELS[p.category] ?? p.category}</td>
                      <td className="px-4 py-3 font-semibold text-[#FB531F]">
                        {p.price ? formatPrice(p.price) : <span className="text-[#ccc]">—</span>}
                      </td>
                      <td className="px-4 py-3 text-[#999] line-through">
                        {p.regularPrice ? formatPrice(p.regularPrice) : <span className="no-underline text-[#ccc]">—</span>}
                      </td>
                      <td className="px-4 py-3 text-[#555] text-xs">{p.dimensions || <span className="text-[#ccc]">—</span>}</td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => toggleBestSeller(p.id, p.isBestSeller)}
                          className={`w-8 h-8 rounded-full text-sm font-bold transition ${p.isBestSeller ? "bg-[#FB531F] text-white" : "bg-[#f1f1f1] text-[#999] hover:bg-[#e5e5e5]"}`}
                          title="Toggle Best Seller"
                        >★</button>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => toggleVisible(p.id, p.visible)}
                          className={`px-2 py-1 rounded text-xs font-semibold transition ${p.visible ? "bg-green-100 text-green-700 hover:bg-green-200" : "bg-[#f1f1f1] text-[#999] hover:bg-[#e5e5e5]"}`}
                        >
                          {p.visible ? "Sí" : "No"}
                        </button>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Link href={`/admin/productos/${p.id}`} className="inline-block text-xs font-semibold text-[#FB531F] hover:underline">
                          Editar
                        </Link>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={9} className="px-4 py-12 text-center text-[#999]">No se encontraron productos</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ── TAB: CONTENIDO ─────────────────────────────────────────────── */}
      {tab === "contenido" && (
        <div className="max-w-3xl">
          <div className="mb-8 flex items-start justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-[#111]">Contenido del sitio</h1>
              <p className="mt-1 text-sm text-[#666]">
                Editá los textos principales. Campo vacío = usa el texto por defecto.
              </p>
            </div>
            <button
              onClick={handleContentSave}
              disabled={saveStatus === "saving"}
              className={[
                "shrink-0 px-5 py-2 rounded text-sm font-semibold transition",
                saveStatus === "saving" ? "bg-[#999] text-white cursor-not-allowed"
                  : saveStatus === "saved" ? "bg-green-600 text-white"
                  : saveStatus === "error" ? "bg-red-600 text-white"
                  : "bg-[#FB531F] text-white hover:bg-[#e04318]",
              ].join(" ")}
            >
              {saveStatus === "saving" ? "Guardando..." : saveStatus === "saved" ? "¡Guardado!" : saveStatus === "error" ? "Error — reintentar" : "Guardar cambios"}
            </button>
          </div>

          {contentLoading ? (
            <div className="text-center py-16 text-[#999]">Cargando contenido...</div>
          ) : (
            <div className="space-y-10">
              {CONTENT_SECTIONS.map((section) => (
                <div key={section.title}>
                  <h2 className="text-[0.7rem] font-bold tracking-[0.18em] uppercase text-[#FB531F] mb-4">
                    {section.title}
                  </h2>
                  <div className="space-y-4 bg-white border border-[#e5e5e5] rounded-lg p-5">
                    {section.fields.map((field) => {
                      const hasOverride = !!contentValues[field.key];
                      return (
                        <div key={field.key}>
                          <div className="flex items-center justify-between mb-1">
                            <label className="text-xs font-medium text-[#444]">
                              {field.label}
                              {hasOverride && (
                                <span className="ml-2 px-1.5 py-0.5 bg-[#FB531F]/10 text-[#FB531F] text-[0.65rem] rounded font-normal">
                                  personalizado
                                </span>
                              )}
                            </label>
                            {hasOverride && (
                              <button
                                onClick={() => handleContentReset(field.key)}
                                className="text-[0.65rem] text-[#999] hover:text-red-500 transition"
                              >
                                Restaurar defecto
                              </button>
                            )}
                          </div>
                          {field.multiline ? (
                            <textarea
                              rows={3}
                              value={contentValues[field.key] ?? ""}
                              onChange={(e) => handleContentChange(field.key, e.target.value)}
                              placeholder={field.placeholder}
                              className="w-full border border-[#e5e5e5] rounded px-3 py-2 text-sm text-[#111] placeholder:text-[#bbb] focus:outline-none focus:border-[#FB531F] resize-y"
                            />
                          ) : (
                            <input
                              type="text"
                              value={contentValues[field.key] ?? ""}
                              onChange={(e) => handleContentChange(field.key, e.target.value)}
                              placeholder={field.placeholder}
                              className="w-full border border-[#e5e5e5] rounded px-3 py-2 text-sm text-[#111] placeholder:text-[#bbb] focus:outline-none focus:border-[#FB531F]"
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}

              <div className="pt-4 flex justify-end">
                <button
                  onClick={handleContentSave}
                  disabled={saveStatus === "saving"}
                  className={[
                    "px-6 py-2.5 rounded text-sm font-semibold transition",
                    saveStatus === "saving" ? "bg-[#999] text-white cursor-not-allowed"
                      : saveStatus === "saved" ? "bg-green-600 text-white"
                      : saveStatus === "error" ? "bg-red-600 text-white"
                      : "bg-[#FB531F] text-white hover:bg-[#e04318]",
                  ].join(" ")}
                >
                  {saveStatus === "saving" ? "Guardando..." : saveStatus === "saved" ? "¡Guardado!" : saveStatus === "error" ? "Error — reintentar" : "Guardar cambios"}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
