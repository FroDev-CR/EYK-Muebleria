"use client";

import { useEffect, useState } from "react";

// Default values shown as placeholder (from translations.ts)
const SECTIONS = [
  {
    title: "Hero principal",
    fields: [
      { key: "home.eyebrow", label: "Frase sobre el título", placeholder: "Fabricantes nacionales · A la medida" },
      { key: "home.hero_h1a", label: "Título línea 1", placeholder: "Muebles que se sienten" },
      { key: "home.hero_h1b", label: "Título línea 2 (itálica)", placeholder: "como tu casa" },
      { key: "home.hero_sub", label: "Subtítulo hero", placeholder: "Salas, comedores, camas y muebles en madera fabricados en Costa Rica. 25% de adelanto, resto contra entrega. Envío gratis en Cartago y alrededores.", multiline: true },
    ],
  },
  {
    title: "Best Sellers",
    fields: [
      { key: "home.bs_eyebrow", label: "Eyebrow (etiqueta)", placeholder: "Best Sellers" },
      { key: "home.bs_h2a", label: "Título línea 1", placeholder: "Los más" },
      { key: "home.bs_h2b", label: "Título línea 2 (itálica)", placeholder: "pedidos" },
      { key: "home.bs_sub", label: "Subtítulo", placeholder: "Salas, comedores y camas en fotografía de alta calidad. Cada pieza se fabrica a la medida.", multiline: true },
    ],
  },
  {
    title: "Proceso A la Medida",
    fields: [
      { key: "home.process_h2a", label: "Título línea 1", placeholder: "Si tenés una idea," },
      { key: "home.process_h2b", label: "Título línea 2 (itálica)", placeholder: "la cotizamos" },
      { key: "home.process_sub", label: "Subtítulo", placeholder: "Trabajamos principalmente en madera y algunas estructuras metálicas. Fabricamos diseños personalizados — mandanos tu referencia y lo cotizamos.", multiline: true },
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
      { key: "footer.tagline", label: "Tagline / descripción", placeholder: "Fabricamos salas, comedores, camas y muebles en madera a la medida. Tela, color y acabados a tu gusto. Cotizamos cualquier diseño de referencia.", multiline: true },
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

type Status = "idle" | "saving" | "saved" | "error";

export default function ContenidoAdminPage() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/content")
      .then((r) => r.json())
      .then((data: Record<string, string>) => { setValues(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  function handleChange(key: string, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setStatus("idle");
  }

  async function handleSave() {
    setStatus("saving");
    try {
      const res = await fetch("/api/admin/content", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Error al guardar");
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 3000);
    } catch {
      setStatus("error");
    }
  }

  function handleReset(key: string) {
    setValues((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
    setStatus("idle");
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="text-[#999] text-sm">Cargando contenido...</div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#111]">Contenido del sitio</h1>
          <p className="mt-1 text-sm text-[#666]">
            Editá los textos principales del sitio web. Dejá un campo vacío para usar el texto por defecto.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={status === "saving"}
          className={[
            "shrink-0 px-5 py-2 rounded text-sm font-semibold transition",
            status === "saving"
              ? "bg-[#999] text-white cursor-not-allowed"
              : status === "saved"
              ? "bg-green-600 text-white"
              : status === "error"
              ? "bg-red-600 text-white"
              : "bg-[#FB531F] text-white hover:bg-[#e04318]",
          ].join(" ")}
        >
          {status === "saving" ? "Guardando..." : status === "saved" ? "¡Guardado!" : status === "error" ? "Error — reintentar" : "Guardar cambios"}
        </button>
      </div>

      {/* Sections */}
      <div className="space-y-10">
        {SECTIONS.map((section) => (
          <div key={section.title}>
            <h2 className="text-[0.7rem] font-bold tracking-[0.18em] uppercase text-[#FB531F] mb-4">
              {section.title}
            </h2>
            <div className="space-y-4 bg-white border border-[#e5e5e5] rounded-lg p-5">
              {section.fields.map((field) => {
                const hasOverride = values[field.key] !== undefined && values[field.key] !== "";
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
                          onClick={() => handleReset(field.key)}
                          className="text-[0.65rem] text-[#999] hover:text-red-500 transition"
                        >
                          Restaurar defecto
                        </button>
                      )}
                    </div>
                    {field.multiline ? (
                      <textarea
                        rows={3}
                        value={values[field.key] ?? ""}
                        onChange={(e) => handleChange(field.key, e.target.value)}
                        placeholder={field.placeholder}
                        className="w-full border border-[#e5e5e5] rounded px-3 py-2 text-sm text-[#111] placeholder:text-[#bbb] focus:outline-none focus:border-[#FB531F] resize-y"
                      />
                    ) : (
                      <input
                        type="text"
                        value={values[field.key] ?? ""}
                        onChange={(e) => handleChange(field.key, e.target.value)}
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
      </div>

      {/* Bottom save button */}
      <div className="mt-8 pt-6 border-t border-[#e5e5e5] flex justify-end">
        <button
          onClick={handleSave}
          disabled={status === "saving"}
          className={[
            "px-6 py-2.5 rounded text-sm font-semibold transition",
            status === "saving"
              ? "bg-[#999] text-white cursor-not-allowed"
              : status === "saved"
              ? "bg-green-600 text-white"
              : status === "error"
              ? "bg-red-600 text-white"
              : "bg-[#FB531F] text-white hover:bg-[#e04318]",
          ].join(" ")}
        >
          {status === "saving" ? "Guardando..." : status === "saved" ? "¡Guardado!" : status === "error" ? "Error — reintentar" : "Guardar cambios"}
        </button>
      </div>
    </div>
  );
}
