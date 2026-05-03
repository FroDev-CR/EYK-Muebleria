import { CustomOrderForm } from "@/components/custom-order-form";

export const metadata = {
  title: "A la medida",
  description:
    "Cotiza un mueble fabricado a la medida. Sala, comedor, cama o cualquier diseño de referencia.",
};

export default function ALaMedidaPage() {
  return (
    <>
      <header className="container-edge pt-12 md:pt-20 pb-12">
        <p className="eyebrow">A la medida</p>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(2.25rem,5.5vw,4rem)] leading-[1.04] tracking-[-0.02em] max-w-3xl">
          Cuéntanos tu idea. <span className="display-italic">La hacemos realidad.</span>
        </h1>
        <p className="mt-6 max-w-xl text-[1.0625rem] text-[var(--color-ink-2)] leading-relaxed">
          Cualquier diseño se puede cotizar. Adjunta una foto de referencia, dinos las medidas, el espacio donde irá y nos encargamos del resto.
        </p>
      </header>

      <section className="container-edge pb-24">
        <div className="grid gap-12 md:gap-16 md:grid-cols-12">
          <div className="md:col-span-7">
            <CustomOrderForm />
          </div>

          <aside className="md:col-span-5 md:pl-8 md:border-l md:border-[var(--color-line)]">
            <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-tight">
              Cómo funciona
            </h2>
            <ol className="mt-6 space-y-6">
              {[
                {
                  n: "01",
                  title: "Llenas el formulario",
                  body: "Foto, medidas y detalles. No te preocupes si no sabes todo.",
                },
                {
                  n: "02",
                  title: "Te contactamos",
                  body: "Por WhatsApp, generalmente el mismo día. Confirmamos detalles.",
                },
                {
                  n: "03",
                  title: "Cotización formal",
                  body: "Te enviamos precio, materiales y tiempo de entrega.",
                },
                {
                  n: "04",
                  title: "Fabricación",
                  body: "Empezamos con el 50% de adelanto. Entre 2 y 4 semanas.",
                },
              ].map((s) => (
                <li key={s.n} className="grid grid-cols-[auto_1fr] gap-5 items-baseline">
                  <span className="display-italic text-[var(--color-walnut)] text-xl">{s.n}</span>
                  <div>
                    <p className="font-[family-name:var(--font-display)] text-lg text-[var(--color-ink)]">
                      {s.title}
                    </p>
                    <p className="mt-1 text-[0.95rem] text-[var(--color-ink-muted)] leading-relaxed">
                      {s.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-10 p-6 rounded-sm bg-[var(--color-bone-2)] border border-[var(--color-line)]">
              <p className="eyebrow">Materiales</p>
              <dl className="mt-3 space-y-2 text-[0.9375rem] text-[var(--color-ink-2)]">
                <div className="flex gap-3">
                  <dt className="text-[var(--color-ink-muted)] min-w-[70px]">Telas:</dt>
                  <dd>Lino, microfibra, vinil</dd>
                </div>
                <div className="flex gap-3">
                  <dt className="text-[var(--color-ink-muted)] min-w-[70px]">Maderas:</dt>
                  <dd>Pino, laurel, cenízaro</dd>
                </div>
                <div className="flex gap-3">
                  <dt className="text-[var(--color-ink-muted)] min-w-[70px]">Sobres:</dt>
                  <dd>Vidrio templado, porcelanato</dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
