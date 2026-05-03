import { CONTACT, whatsappLink } from "@/lib/data";

export const metadata = {
  title: "Contacto",
  description: "Cómo contactar a EYK Mueblería: WhatsApp, teléfono, correo e Instagram.",
};

export default function ContactoPage() {
  return (
    <section className="container-edge pt-12 md:pt-20 pb-24">
      <div className="grid gap-16 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="eyebrow">Contacto</p>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05] tracking-[-0.02em]">
            Hablemos de tu próximo mueble.
          </h1>
          <p className="mt-6 max-w-xl text-[1.0625rem] text-[var(--color-ink-2)] leading-relaxed">
            Respondemos por WhatsApp generalmente el mismo día. También puedes escribirnos por correo o seguirnos en Instagram para ver trabajos recientes.
          </p>

          <div className="mt-12 grid gap-px bg-[var(--color-line)] border border-[var(--color-line)]">
            <a
              href={whatsappLink("Hola EYK 👋")}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[var(--color-bone)] hover:bg-[var(--color-bone-2)] p-6 md:p-8 grid grid-cols-[1fr_auto] gap-4 items-baseline transition-colors"
            >
              <div>
                <p className="eyebrow">WhatsApp</p>
                <p className="mt-2 font-[family-name:var(--font-display)] text-2xl text-[var(--color-ink)]">
                  {CONTACT.phone}
                </p>
                <p className="mt-1 text-sm text-[var(--color-ink-muted)]">
                  Respuesta el mismo día
                </p>
              </div>
              <span aria-hidden className="text-[var(--color-walnut)]">
                →
              </span>
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className="bg-[var(--color-bone)] hover:bg-[var(--color-bone-2)] p-6 md:p-8 grid grid-cols-[1fr_auto] gap-4 items-baseline transition-colors"
            >
              <div>
                <p className="eyebrow">Correo</p>
                <p className="mt-2 font-[family-name:var(--font-display)] text-2xl text-[var(--color-ink)]">
                  {CONTACT.email}
                </p>
                <p className="mt-1 text-sm text-[var(--color-ink-muted)]">Para envíos formales</p>
              </div>
              <span aria-hidden className="text-[var(--color-walnut)]">
                →
              </span>
            </a>
            <a
              href={`https://instagram.com/${CONTACT.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[var(--color-bone)] hover:bg-[var(--color-bone-2)] p-6 md:p-8 grid grid-cols-[1fr_auto] gap-4 items-baseline transition-colors"
            >
              <div>
                <p className="eyebrow">Instagram</p>
                <p className="mt-2 font-[family-name:var(--font-display)] text-2xl text-[var(--color-ink)]">
                  @{CONTACT.instagram}
                </p>
                <p className="mt-1 text-sm text-[var(--color-ink-muted)]">Trabajos del taller</p>
              </div>
              <span aria-hidden className="text-[var(--color-walnut)]">
                →
              </span>
            </a>
          </div>
        </div>

        <aside className="md:col-span-5 md:pl-8 md:border-l md:border-[var(--color-line)]">
          <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-tight">
            Preguntas frecuentes
          </h2>
          <dl className="mt-8 space-y-7">
            {[
              {
                q: "¿Cuánto tarda un pedido?",
                a: "Entre 2 y 4 semanas según el diseño y la complejidad.",
              },
              {
                q: "¿Hacen entregas a todo el país?",
                a: "Sí. La logística se cotiza aparte según la zona.",
              },
              {
                q: "¿Puedo llevar mi propio diseño?",
                a: "Claro. Cualquier diseño de referencia se puede cotizar.",
              },
              {
                q: "¿Manejan adelantos?",
                a: "Sí, normalmente trabajamos con un 50% de adelanto.",
              },
            ].map((f) => (
              <div key={f.q}>
                <dt className="font-[family-name:var(--font-display)] text-lg text-[var(--color-ink)]">
                  {f.q}
                </dt>
                <dd className="mt-1.5 text-[var(--color-ink-muted)] text-[0.95rem] leading-relaxed">
                  {f.a}
                </dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </section>
  );
}
