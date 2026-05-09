"use client";

import { useState, type FormEvent } from "react";
import { CATEGORY_GROUPS } from "@/lib/data";
import { useLang } from "@/contexts/lang-context";

interface FormState {
  nombre: string;
  telefono: string;
  email: string;
  tipo: string;
  medidas: string;
  tela: string;
  madera: string;
  detalles: string;
  presupuesto: string;
  ciudad: string;
}

const INITIAL: FormState = {
  nombre: "",
  telefono: "",
  email: "",
  tipo: "",
  medidas: "",
  tela: "",
  madera: "",
  detalles: "",
  presupuesto: "",
  ciudad: "",
};

export function CustomOrderForm() {
  const { whatsappLink } = useLang();
  const [data, setData] = useState<FormState>(INITIAL);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [done, setDone] = useState(false);

  function update<K extends keyof FormState>(key: K, val: FormState[K]) {
    setData((d) => ({ ...d, [key]: val }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate(): boolean {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!data.nombre.trim()) e.nombre = "Necesitamos tu nombre.";
    if (!data.telefono.trim()) e.telefono = "Necesitamos un número para contactarte.";
    if (!data.tipo) e.tipo = "Elige el tipo de mueble.";
    if (!data.detalles.trim()) e.detalles = "Cuéntanos algo del diseño que tienes en mente.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(ev: FormEvent) {
    ev.preventDefault();
    if (!validate()) {
      // foco en el primer campo con error
      const firstError = Object.keys(errors)[0] as keyof FormState | undefined;
      if (firstError) {
        document.getElementById(firstError)?.focus();
      }
      return;
    }

    setSubmitting(true);

    // 1. Intentar guardar en Supabase si hay url configurada
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      try {
        const res = await fetch("/api/leads", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error("save failed");
      } catch {
        // fallback silencioso a WhatsApp
      }
    }

    // 2. Abrir WhatsApp con el mensaje formateado
    const msg = buildMessage(data);
    window.open(whatsappLink(msg), "_blank", "noopener,noreferrer");
    setDone(true);
    setSubmitting(false);
  }

  if (done) {
    return (
      <div className="rounded-sm border border-[var(--color-line)] bg-[var(--color-bone-2)] p-8">
        <p className="eyebrow text-[oklch(0.55_0.12_145)]">✓ Listo</p>
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl">
          Te abrimos WhatsApp con tu pedido.
        </h2>
        <p className="mt-3 text-[var(--color-ink-2)]">
          Si no se abrió, revisa tu navegador o escríbenos directamente. Generalmente respondemos el mismo día.
        </p>
        <button
          type="button"
          onClick={() => {
            setData(INITIAL);
            setDone(false);
          }}
          className="mt-6 btn-secondary"
        >
          Empezar otro pedido
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      {/* Tipo */}
      <Field
        id="tipo"
        label="¿Qué quieres fabricar?"
        required
        error={errors.tipo}
      >
        <select
          id="tipo"
          value={data.tipo}
          onChange={(e) => update("tipo", e.target.value)}
          className="form-input"
          aria-invalid={!!errors.tipo}
          aria-describedby={errors.tipo ? "tipo-error" : undefined}
        >
          <option value="">Elige una categoría…</option>
          {CATEGORY_GROUPS.map((g) => (
            <option key={g.id} value={g.label}>
              {g.label}
            </option>
          ))}
          <option value="Otro">Otro · No estoy seguro</option>
        </select>
      </Field>

      {/* Nombre + Teléfono */}
      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="nombre" label="Nombre" required error={errors.nombre}>
          <input
            id="nombre"
            type="text"
            autoComplete="name"
            value={data.nombre}
            onChange={(e) => update("nombre", e.target.value)}
            className="form-input"
            aria-invalid={!!errors.nombre}
          />
        </Field>
        <Field id="telefono" label="WhatsApp / Teléfono" required error={errors.telefono}>
          <input
            id="telefono"
            type="tel"
            autoComplete="tel"
            value={data.telefono}
            onChange={(e) => update("telefono", e.target.value)}
            placeholder="+506 8888 7777"
            className="form-input"
            aria-invalid={!!errors.telefono}
          />
        </Field>
      </div>

      <Field id="email" label="Email" hint="Opcional, por si te queremos enviar imágenes">
        <input
          id="email"
          type="email"
          autoComplete="email"
          value={data.email}
          onChange={(e) => update("email", e.target.value)}
          className="form-input"
        />
      </Field>

      {/* Detalles del producto */}
      <Field
        id="detalles"
        label="Cuéntanos del diseño"
        required
        error={errors.detalles}
        hint="Estilo, color, referencias, dónde irá ubicado…"
      >
        <textarea
          id="detalles"
          rows={5}
          value={data.detalles}
          onChange={(e) => update("detalles", e.target.value)}
          className="form-input resize-y"
          aria-invalid={!!errors.detalles}
        />
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="medidas" label="Medidas aproximadas" hint="Largo · Ancho · Alto">
          <input
            id="medidas"
            type="text"
            value={data.medidas}
            onChange={(e) => update("medidas", e.target.value)}
            placeholder="2.20 m × 0.90 m × 0.80 m"
            className="form-input"
          />
        </Field>
        <Field id="ciudad" label="Ciudad / cantón" hint="Para coordinar entrega">
          <input
            id="ciudad"
            type="text"
            value={data.ciudad}
            onChange={(e) => update("ciudad", e.target.value)}
            className="form-input"
          />
        </Field>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        <Field id="tela" label="Tela preferida">
          <select
            id="tela"
            value={data.tela}
            onChange={(e) => update("tela", e.target.value)}
            className="form-input"
          >
            <option value="">No estoy seguro</option>
            <option>Lino</option>
            <option>Microfibra</option>
            <option>Vinil</option>
          </select>
        </Field>
        <Field id="madera" label="Madera preferida">
          <select
            id="madera"
            value={data.madera}
            onChange={(e) => update("madera", e.target.value)}
            className="form-input"
          >
            <option value="">No estoy seguro</option>
            <option>Pino</option>
            <option>Laurel</option>
            <option>Cenízaro</option>
          </select>
        </Field>
        <Field id="presupuesto" label="Presupuesto aprox." hint="Opcional">
          <input
            id="presupuesto"
            type="text"
            value={data.presupuesto}
            onChange={(e) => update("presupuesto", e.target.value)}
            className="form-input"
          />
        </Field>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? "Enviando…" : "Enviar y abrir WhatsApp"}
        <span aria-hidden>→</span>
      </button>

      <p className="text-xs text-[var(--color-ink-subtle)]">
        Al enviar, abrimos una conversación de WhatsApp con tu pedido formateado. Sin compromiso.
      </p>

      <style>{`
        .form-input {
          width: 100%;
          background: transparent;
          padding: 0.875rem 1rem;
          border: 1px solid var(--color-line);
          border-radius: 2px;
          font-family: var(--font-body);
          font-size: 1rem;
          color: var(--color-ink);
          transition: border-color 0.18s var(--ease-out-quart),
                      background-color 0.18s var(--ease-out-quart);
          min-height: 44px;
        }
        .form-input:hover {
          border-color: var(--color-line-strong);
        }
        .form-input:focus {
          outline: none;
          border-color: var(--color-walnut);
          background: var(--color-bone-2);
        }
        .form-input[aria-invalid="true"] {
          border-color: var(--color-error);
        }
      `}</style>
    </form>
  );
}

function Field({
  id,
  label,
  required,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-[0.9375rem] mb-2 text-[var(--color-ink)]">
        {label}{" "}
        {required && (
          <span className="text-[var(--color-walnut)]" aria-hidden>
            *
          </span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p className="mt-1.5 text-xs text-[var(--color-ink-subtle)]">{hint}</p>
      )}
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-1.5 text-xs text-[var(--color-error)]"
        >
          {error}
        </p>
      )}
    </div>
  );
}

function buildMessage(d: FormState): string {
  const lines = [
    `Hola EYK 👋, vengo del sitio web. Quiero cotizar un mueble a la medida:`,
    ``,
    `*Tipo:* ${d.tipo || "—"}`,
    `*Diseño:* ${d.detalles}`,
    d.medidas ? `*Medidas:* ${d.medidas}` : null,
    d.tela ? `*Tela:* ${d.tela}` : null,
    d.madera ? `*Madera:* ${d.madera}` : null,
    d.presupuesto ? `*Presupuesto:* ${d.presupuesto}` : null,
    d.ciudad ? `*Ciudad:* ${d.ciudad}` : null,
    ``,
    `*Mis datos:*`,
    `${d.nombre} · ${d.telefono}${d.email ? " · " + d.email : ""}`,
  ].filter(Boolean) as string[];
  return lines.join("\n");
}
