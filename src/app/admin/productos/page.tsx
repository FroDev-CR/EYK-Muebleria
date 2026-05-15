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
    title: "Estadísticas (home)",
    fields: [
      { key: "home.stat1_num", label: "Stat 1 — número", placeholder: "280" },
      { key: "home.stat1_suffix", label: "Stat 1 — sufijo (+, %, etc.)", placeholder: "+" },
      { key: "home.stat2_num", label: "Stat 2 — número", placeholder: "100" },
      { key: "home.stat2_suffix", label: "Stat 2 — sufijo", placeholder: "%" },
      { key: "home.stat3_num", label: "Stat 3 — número", placeholder: "10" },
      { key: "home.stat3_suffix", label: "Stat 3 — sufijo", placeholder: "+" },
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
    title: "Información de contacto",
    fields: [
      { key: "contact.whatsapp_value", label: "WhatsApp (solo dígitos, ej. 50688887777)", placeholder: "50688887777" },
      { key: "contact.phone_value", label: "Teléfono visible (formato libre)", placeholder: "+506 8888 7777" },
      { key: "contact.email_value", label: "Correo electrónico", placeholder: "ventas@eykmuebleria.com" },
      { key: "contact.instagram_value", label: "Usuario Instagram (sin @)", placeholder: "eykmuebleria" },
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
  {
    title: "A la medida — Cómo funciona (pasos)",
    fields: [
      { key: "custom.step1_t", label: "Paso 1 — título", placeholder: "Llenas el formulario" },
      { key: "custom.step1_b", label: "Paso 1 — descripción", placeholder: "Foto, medidas y detalles. No te preocupes si no sabes todo.", multiline: true },
      { key: "custom.step2_t", label: "Paso 2 — título", placeholder: "Te contactamos" },
      { key: "custom.step2_b", label: "Paso 2 — descripción", placeholder: "Por WhatsApp, generalmente el mismo día.", multiline: true },
      { key: "custom.step3_t", label: "Paso 3 — título", placeholder: "Cotización formal" },
      { key: "custom.step3_b", label: "Paso 3 — descripción", placeholder: "Te enviamos precio, materiales y tiempo de entrega.", multiline: true },
      { key: "custom.step4_t", label: "Paso 4 — título", placeholder: "Fabricación" },
      { key: "custom.step4_b", label: "Paso 4 — descripción", placeholder: "Empezamos con el 50% de adelanto. Entre 2 y 4 semanas.", multiline: true },
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

interface FaqItem {
  es: string;
  en: string;
  es_a: string;
  en_a: string;
}

const DEFAULT_FAQ: FaqItem[] = [
  { es: "¿Cuánto tarda un pedido?", en: "How long does an order take?", es_a: "Entre 2 y 4 semanas según el diseño y la complejidad.", en_a: "2 to 4 weeks depending on design and complexity." },
  { es: "¿Hacen entregas a todo el país?", en: "Do you deliver nationwide?", es_a: "Sí. La logística se cotiza aparte según la zona.", en_a: "Yes. Shipping costs vary by region." },
  { es: "¿Puedo llevar mi propio diseño?", en: "Can I bring my own design?", es_a: "Claro. Cualquier diseño de referencia se puede cotizar.", en_a: "Of course. Any reference design can be quoted." },
  { es: "¿Manejan adelantos?", en: "Do you require a deposit?", es_a: "Sí, normalmente trabajamos con un 50% de adelanto.", en_a: "Yes, we typically work with a 50% deposit." },
];

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
  const [faqItems, setFaqItems] = useState<FaqItem[]>(DEFAULT_FAQ);
  const [faqOverridden, setFaqOverridden] = useState(false);
  const [contentLoading, setContentLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");

  useEffect(() => {
    fetch("/api/admin/products")
      .then((r) => r.json())
      .then((data) => { setProducts(data); setLoading(false); })
      .catch(() => setLoading(false));

    fetch("/api/admin/content")
      .then((r) => r.json())
      .then((data: Record<string, string>) => {
        setContentValues(data);
        const raw = data["contact.faq_json"];
        if (raw) {
          try {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed) && parsed.length > 0) {
              setFaqItems(parsed as FaqItem[]);
              setFaqOverridden(true);
            }
          } catch {
            // keep default
          }
        }
        setContentLoading(false);
      })
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

  function updateFaqField(idx: number, field: keyof FaqItem, value: string) {
    setFaqItems((prev) => prev.map((it, i) => (i === idx ? { ...it, [field]: value } : it)));
    setFaqOverridden(true);
    setSaveStatus("idle");
  }

  function addFaqItem() {
    setFaqItems((prev) => [...prev, { es: "", en: "", es_a: "", en_a: "" }]);
    setFaqOverridden(true);
    setSaveStatus("idle");
  }

  function removeFaqItem(idx: number) {
    setFaqItems((prev) => prev.filter((_, i) => i !== idx));
    setFaqOverridden(true);
    setSaveStatus("idle");
  }

  function moveFaqItem(idx: number, dir: -1 | 1) {
    setFaqItems((prev) => {
      const next = [...prev];
      const target = idx + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[idx], next[target]] = [next[target], next[idx]];
      return next;
    });
    setFaqOverridden(true);
    setSaveStatus("idle");
  }

  function resetFaqDefault() {
    setFaqItems(DEFAULT_FAQ);
    setFaqOverridden(false);
    setSaveStatus("idle");
  }

  async function handleContentSave() {
    setSaveStatus("saving");
    try {
      const payload: Record<string, string> = { ...contentValues };
      if (faqOverridden) {
        const cleaned = faqItems.filter(
          (it) => it.es.trim() || it.en.trim() || it.es_a.trim() || it.en_a.trim(),
        );
        payload["contact.faq_json"] = JSON.stringify(cleaned);
      } else {
        payload["contact.faq_json"] = "";
      }
      const res = await fetch("/api/admin/content", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      setContentValues(payload);
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

              {/* FAQ editor */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-[0.7rem] font-bold tracking-[0.18em] uppercase text-[#FB531F]">
                    Preguntas frecuentes
                    {faqOverridden && (
                      <span className="ml-2 px-1.5 py-0.5 bg-[#FB531F]/10 text-[#FB531F] text-[0.65rem] rounded font-normal normal-case tracking-normal">
                        personalizado
                      </span>
                    )}
                  </h2>
                  {faqOverridden && (
                    <button
                      onClick={resetFaqDefault}
                      className="text-[0.7rem] text-[#999] hover:text-red-500 transition"
                    >
                      Restaurar defecto
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  {faqItems.map((item, i) => (
                    <div key={i} className="bg-white border border-[#e5e5e5] rounded-lg p-5">
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-xs font-semibold text-[#666]">Pregunta #{i + 1}</p>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => moveFaqItem(i, -1)}
                            disabled={i === 0}
                            className="px-2 py-1 text-xs text-[#666] hover:bg-[#f1f1f1] rounded disabled:opacity-30 disabled:cursor-not-allowed transition"
                            title="Subir"
                          >
                            ↑
                          </button>
                          <button
                            onClick={() => moveFaqItem(i, 1)}
                            disabled={i === faqItems.length - 1}
                            className="px-2 py-1 text-xs text-[#666] hover:bg-[#f1f1f1] rounded disabled:opacity-30 disabled:cursor-not-allowed transition"
                            title="Bajar"
                          >
                            ↓
                          </button>
                          <button
                            onClick={() => removeFaqItem(i)}
                            className="px-2 py-1 text-xs text-red-500 hover:bg-red-50 rounded transition"
                            title="Eliminar"
                          >
                            ×
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs font-medium text-[#444] block mb-1">
                            Pregunta (ES)
                          </label>
                          <input
                            type="text"
                            value={item.es}
                            onChange={(e) => updateFaqField(i, "es", e.target.value)}
                            placeholder="¿Cuánto tarda un pedido?"
                            className="w-full border border-[#e5e5e5] rounded px-3 py-2 text-sm text-[#111] placeholder:text-[#bbb] focus:outline-none focus:border-[#FB531F]"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-[#444] block mb-1">
                            Pregunta (EN)
                          </label>
                          <input
                            type="text"
                            value={item.en}
                            onChange={(e) => updateFaqField(i, "en", e.target.value)}
                            placeholder="How long does an order take?"
                            className="w-full border border-[#e5e5e5] rounded px-3 py-2 text-sm text-[#111] placeholder:text-[#bbb] focus:outline-none focus:border-[#FB531F]"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-[#444] block mb-1">
                            Respuesta (ES)
                          </label>
                          <textarea
                            rows={2}
                            value={item.es_a}
                            onChange={(e) => updateFaqField(i, "es_a", e.target.value)}
                            placeholder="Entre 2 y 4 semanas..."
                            className="w-full border border-[#e5e5e5] rounded px-3 py-2 text-sm text-[#111] placeholder:text-[#bbb] focus:outline-none focus:border-[#FB531F] resize-y"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-[#444] block mb-1">
                            Respuesta (EN)
                          </label>
                          <textarea
                            rows={2}
                            value={item.en_a}
                            onChange={(e) => updateFaqField(i, "en_a", e.target.value)}
                            placeholder="2 to 4 weeks..."
                            className="w-full border border-[#e5e5e5] rounded px-3 py-2 text-sm text-[#111] placeholder:text-[#bbb] focus:outline-none focus:border-[#FB531F] resize-y"
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={addFaqItem}
                    className="w-full border-2 border-dashed border-[#e5e5e5] hover:border-[#FB531F] hover:text-[#FB531F] rounded-lg py-3 text-sm font-semibold text-[#999] transition"
                  >
                    + Agregar pregunta
                  </button>
                </div>
              </div>

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
