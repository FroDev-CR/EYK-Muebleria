import { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { whatsappLink } from "@/lib/data";

export const metadata: Metadata = {
  title: "Entregas a clientes",
  description: "Muebles EYK en los hogares de nuestros clientes. Reseñas y fotos de entregas reales.",
};

// Reseñas de ejemplo — actualizar con reseñas reales
const reviews = [
  {
    name: "María José R.",
    location: "Cartago",
    text: "Recibí mi sala hace 3 semanas y quedé enamorada. La calidad es excelente, el color quedó exactamente como lo pedí. El equipo fue muy amable en la entrega.",
    product: "Sala a la medida",
    date: "Abril 2025",
    stars: 5,
  },
  {
    name: "Carlos A.",
    location: "San José",
    text: "Pedí un comedor de 6 sillas y superó mis expectativas. La madera es hermosa y las sillas muy cómodas. Lo recomiendo 100%.",
    product: "Comedor 6 sillas",
    date: "Marzo 2025",
    stars: 5,
  },
  {
    name: "Sofía M.",
    location: "Tres Ríos",
    text: "El camarote que hicieron para mis hijos es increíble. Pidieron medidas exactas del cuarto y aprovecharon cada centímetro. Rapidez y buen precio.",
    product: "Camarote a la medida",
    date: "Febrero 2025",
    stars: 5,
  },
  {
    name: "Andrés P.",
    location: "Cartago",
    text: "Segunda compra con EYK. Esta vez una cama king. Como siempre, excelente acabado y puntualidad en la entrega.",
    product: "Cama King",
    date: "Enero 2025",
    stars: 5,
  },
];

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${n} de 5 estrellas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < n ? "#FB531F" : "#e5e5e5"}>
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </div>
  );
}

export default function EntregasPage() {
  return (
    <>
      <header className="container-edge pt-12 md:pt-20 pb-10 md:pb-14">
        <Reveal>
          <p className="eyebrow flex items-center gap-3">
            <span aria-hidden className="inline-block w-8 h-px bg-[#FB531F]" />
            Entregas a clientes
          </p>
          <h1 className="mt-5 font-[family-name:var(--font-display)] text-[clamp(2.25rem,5.5vw,4rem)] leading-[1.04] tracking-[-0.02em]">
            Muebles{" "}
            <span className="display-italic text-[#FB531F]">en su hogar</span>
          </h1>
          <p className="mt-5 max-w-2xl text-[1.0625rem] text-[#555] leading-relaxed">
            Cada entrega es el resultado de semanas de fabricación artesanal.
            Aquí compartimos algunos de los hogares que han confiado en nosotros.
          </p>
        </Reveal>
      </header>

      {/* Grid de fotos de entregas */}
      <section className="container-edge pb-16 md:pb-24">
        <Reveal>
          <div className="bg-[#f8f8f8] border-2 border-dashed border-[#e5e5e5] rounded-2xl p-12 text-center">
            <div className="text-5xl mb-4">📸</div>
            <h2 className="font-[family-name:var(--font-display)] text-xl text-[#111] mb-2">
              Fotos de entregas próximamente
            </h2>
            <p className="text-[#777] text-sm max-w-sm mx-auto">
              Estamos recopilando las fotografías de entregas recientes. Mientras tanto, podés ver el catálogo o contactarnos por WhatsApp.
            </p>
            <div className="mt-6 flex gap-3 justify-center flex-wrap">
              <a
                href={whatsappLink("Hola EYK! Quiero ver más fotos de sus productos.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm"
              >
                Ver fotos por WhatsApp
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Reseñas de clientes */}
      <section className="bg-[#f8f8f8] border-t border-[#e5e5e5]">
        <div className="container-edge py-16 md:py-24">
          <Reveal>
            <header className="mb-12">
              <p className="eyebrow">Lo que dicen</p>
              <h2 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.75rem)] leading-tight tracking-[-0.015em]">
                Clientes satisfechos
              </h2>
            </header>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {reviews.map((r, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="bg-white rounded-xl border border-[#e5e5e5] p-6 h-full flex flex-col">
                  <Stars n={r.stars} />
                  <p className="mt-4 text-[0.9375rem] text-[#333] leading-relaxed flex-1">
                    &ldquo;{r.text}&rdquo;
                  </p>
                  <div className="mt-5 pt-4 border-t border-[#f1f1f1]">
                    <p className="font-semibold text-[#111] text-sm">{r.name}</p>
                    <p className="text-xs text-[#999] mt-0.5">{r.location} · {r.product} · {r.date}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-edge py-16 md:py-20 text-center">
        <Reveal>
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] tracking-[-0.015em]">
            ¿Querés ser el próximo cliente?
          </h2>
          <p className="mt-4 text-[#666] max-w-md mx-auto">
            Contáctanos y cotizamos tu mueble hoy mismo.
          </p>
          <div className="mt-8 flex gap-3 justify-center flex-wrap">
            <a
              href={whatsappLink("Hola EYK, me interesa cotizar un mueble.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Cotizar por WhatsApp
            </a>
            <a href="/a-la-medida" className="btn-secondary">
              Pedido a la medida
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
