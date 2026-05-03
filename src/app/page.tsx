import Image from "next/image";
import Link from "next/link";
import { CATEGORY_GROUPS, whatsappLink, CATEGORIES } from "@/lib/data";
import { getHighlights, getProducts } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { Marquee } from "@/components/marquee";
import { StatCounter } from "@/components/stat-counter";
import { MaterialsShowcase } from "@/components/materials-showcase";
import { HeroSpotlight } from "@/components/hero-spotlight";

export default async function Home() {
  const highlights = await getHighlights(8);
  const all = await getProducts();

  // Sample por grupo para el preview de categorías
  const previewByGroup = await Promise.all(
    CATEGORY_GROUPS.map(async (g) => {
      const ids = new Set(CATEGORIES.filter((c) => c.group === g.id).map((c) => c.id));
      const items = all.filter((p) => ids.has(p.category));
      const sample = items[Math.floor(items.length / 3)] || items[0];
      return { group: g, sample, count: items.length };
    }),
  );

  // Para el bento de highlights necesitamos foto grande + 6 chicas
  const big = highlights[0];
  const bento = highlights.slice(1, 7);

  return (
    <>
      {/* ============================================================
          HERO con spotlight + marquee
          ============================================================ */}
      <section className="relative overflow-hidden">
        <HeroSpotlight />
        <div className="container-edge pt-12 md:pt-20 pb-16 md:pb-24">
          <div className="grid gap-12 md:gap-16 md:grid-cols-12 items-end">
            <div className="md:col-span-7 animate-fade-rise">
              <p className="eyebrow flex items-center gap-3">
                <span aria-hidden className="inline-block w-8 h-px bg-[var(--color-walnut)]" />
                Catálogo 2025 · A la medida
              </p>
              <h1 className="mt-6 font-[family-name:var(--font-display)] text-[clamp(2.75rem,7.5vw,6rem)] leading-[0.98] tracking-[-0.025em] text-[var(--color-ink)]">
                Muebles que se sienten
                <br />
                <span className="display-italic text-[var(--color-walnut)]">como tu casa</span>
                <span className="text-[var(--color-walnut)]">.</span>
              </h1>
              <p className="mt-7 max-w-xl text-[1.0625rem] leading-relaxed text-[var(--color-ink-2)]">
                Salas, comedores, camas y muebles en madera fabricados a la medida.
                Tela, color, tono de madera y dimensiones a tu gusto. Cotizamos
                cualquier diseño de referencia.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Link href="/catalogo" className="btn-primary">
                  Ver el catálogo
                  <span aria-hidden>→</span>
                </Link>
                <Link href="/a-la-medida" className="btn-secondary">
                  Pedido a la medida
                </Link>
              </div>
            </div>

            <div className="md:col-span-5">
              {big && (
                <Reveal variant="scale-in" delay={200}>
                  <div className="relative aspect-[4/5] rounded-sm overflow-hidden bg-[var(--color-bone-2)] border border-[var(--color-line)]">
                    <Image
                      src={big.image}
                      alt={big.name}
                      fill
                      sizes="(min-width: 768px) 40vw, 90vw"
                      className="object-contain p-8 hover:scale-[1.04] transition-transform duration-[1200ms] ease-out"
                      priority
                    />
                    {/* Badge año */}
                    <div className="absolute top-5 right-5 inline-flex items-center gap-2 bg-[var(--color-ink)] text-[var(--color-bone)] px-3 py-1.5 rounded-sm">
                      <span className="block w-1.5 h-1.5 rounded-full bg-[var(--color-clay-soft)]" />
                      <span className="text-xs tracking-[0.15em] font-medium">2025</span>
                    </div>
                    {/* Tag flotante */}
                    <div className="absolute bottom-5 left-5 right-5">
                      <div className="bg-[var(--color-bone)]/95 backdrop-blur-sm px-4 py-3 rounded-sm">
                        <p className="display-italic text-[0.78rem] text-[var(--color-walnut)]">
                          destacado
                        </p>
                        <p className="font-[family-name:var(--font-display)] text-lg text-[var(--color-ink)] leading-tight mt-0.5">
                          {big.name}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              )}
            </div>
          </div>
        </div>

        {/* MARQUEE editorial */}
        <div className="border-y border-[var(--color-line)] py-5 bg-[var(--color-bone-2)]/40">
          <Marquee
            speed={50}
            items={[
              "Hecho a la medida",
              "Cualquier diseño se cotiza",
              "Tela · Color · Madera",
              "Hecho a mano en Costa Rica",
              "Cotización el mismo día",
              "2 — 4 semanas de fabricación",
            ]}
            className="text-[var(--color-ink-2)] font-[family-name:var(--font-display)] italic text-[1.5rem] md:text-[2rem]"
          />
        </div>
      </section>

      {/* ============================================================
          STATS BAND
          ============================================================ */}
      <section className="container-edge py-20 md:py-24">
        <div className="grid gap-px bg-[var(--color-line)] border border-[var(--color-line)] sm:grid-cols-3">
          {[
            { num: 251, suffix: "+", label: "Piezas en catálogo", italic: false },
            { num: 100, suffix: "%", label: "A la medida", italic: true },
            { num: 10, suffix: "+", label: "Categorías de mueble", italic: false },
          ].map((s, i) => (
            <Reveal key={s.label} delay={i * 120} className="bg-[var(--color-bone)]">
              <div className="p-8 md:p-12">
                <p className="font-[family-name:var(--font-display)] text-[clamp(3rem,7vw,5.5rem)] leading-none tracking-[-0.02em] text-[var(--color-ink)]">
                  <StatCounter value={s.num} suffix={s.suffix} />
                </p>
                <p
                  className={[
                    "mt-4 text-[var(--color-ink-muted)]",
                    s.italic ? "display-italic text-xl" : "text-[0.95rem]",
                  ].join(" ")}
                >
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============================================================
          CATEGORÍAS — bento asimétrico
          ============================================================ */}
      <section className="container-edge py-12 md:py-20">
        <Reveal>
          <header className="flex items-end justify-between gap-8 mb-12">
            <div>
              <p className="eyebrow">Categorías</p>
              <h2 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(2rem,4.5vw,3.25rem)] leading-tight tracking-[-0.015em] max-w-xl">
                Cuatro grupos.{" "}
                <span className="display-italic">Posibilidades infinitas.</span>
              </h2>
            </div>
            <Link
              href="/catalogo"
              className="hidden md:inline-flex items-center gap-1 text-[var(--color-walnut)] link-underline"
            >
              Todo el catálogo →
            </Link>
          </header>
        </Reveal>

        {/* Bento: 1 grande + 3 chicas en 2x2 */}
        <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-3 md:auto-rows-[260px]">
          {previewByGroup.map(({ group, sample, count }, i) => {
            const isFeatured = i === 0;
            return (
              <Reveal
                key={group.id}
                delay={i * 100}
                className={isFeatured ? "md:col-span-1 md:row-span-2" : ""}
              >
                <Link
                  href={`/catalogo?grupo=${group.id}`}
                  className={[
                    "group relative block h-full overflow-hidden rounded-sm border border-[var(--color-line)] bg-[var(--color-bone-2)] transition-colors hover:border-[var(--color-walnut)]/40",
                    isFeatured ? "min-h-[540px] md:min-h-0" : "min-h-[260px]",
                  ].join(" ")}
                >
                  {sample && (
                    <Image
                      src={sample.image}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 33vw, 90vw"
                      className="object-contain p-6 md:p-10 transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
                    />
                  )}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-7 bg-gradient-to-t from-[var(--color-bone)]/95 via-[var(--color-bone)]/30 to-transparent">
                    <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-walnut)] font-semibold">
                      {String(i + 1).padStart(2, "0")} / {count} piezas
                    </p>
                    <h3
                      className={[
                        "mt-2 font-[family-name:var(--font-display)] text-[var(--color-ink)] leading-tight tracking-[-0.015em]",
                        isFeatured ? "text-3xl md:text-5xl" : "text-2xl",
                      ].join(" ")}
                    >
                      {group.label}
                    </h3>
                    <p
                      className={[
                        "mt-2 text-[var(--color-ink-muted)] leading-relaxed transition-all duration-500",
                        isFeatured ? "text-[0.95rem] max-w-md opacity-100" : "text-[0.85rem] max-h-0 opacity-0 group-hover:max-h-20 group-hover:opacity-100",
                      ].join(" ")}
                    >
                      {group.description}
                    </p>
                    <span
                      aria-hidden
                      className="mt-4 inline-flex items-center gap-1.5 text-[var(--color-walnut)] text-sm transition-transform duration-300 group-hover:translate-x-1"
                    >
                      Ver categoría →
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ============================================================
          MATERIALES SHOWCASE
          ============================================================ */}
      <MaterialsShowcase />

      {/* ============================================================
          HIGHLIGHTS — bento de selección
          ============================================================ */}
      <section className="container-edge pb-20 md:pb-28">
        <Reveal>
          <header className="flex items-end justify-between gap-8 mb-10 max-w-3xl">
            <div>
              <p className="eyebrow">Selección</p>
              <h2 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(2rem,4.5vw,3rem)] leading-tight tracking-[-0.015em]">
                Una probadita <span className="display-italic">del taller</span>.
              </h2>
              <p className="mt-4 text-[var(--color-ink-muted)] text-[0.95rem] leading-relaxed">
                Algunas piezas del catálogo. Cada una se fabrica a la medida con la
                tela y el acabado que prefieras.
              </p>
            </div>
          </header>
        </Reveal>

        {/* Bento mix: una grande + 6 chicas */}
        <div className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {bento.map((p, i) => {
            // Alternar tamaños para asimetría
            const isWide = i === 0 || i === 4;
            return (
              <Reveal
                key={p.id}
                delay={i * 80}
                className={isWide ? "sm:col-span-2 lg:col-span-2" : ""}
              >
                <ProductCard
                  product={p}
                  index={i}
                  aspect={isWide ? "landscape" : "portrait"}
                />
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={400}>
          <div className="mt-12 flex justify-center">
            <Link href="/catalogo" className="btn-secondary">
              Ver todas las piezas
              <span aria-hidden>→</span>
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ============================================================
          MARQUEE BANDA SECUNDARIA — antes del proceso
          ============================================================ */}
      <div className="border-y border-[var(--color-line)] py-4 overflow-hidden">
        <Marquee
          reverse
          speed={60}
          items={[
            "EYK Mueblería",
            "Catálogo 2025",
            "Salas",
            "Comedores",
            "Camas",
            "Madera",
            "Sofá Diván",
            "Esquineros",
          ]}
          className="text-[var(--color-walnut)] font-[family-name:var(--font-display)] text-[1.25rem] md:text-[1.5rem] tracking-tight"
        />
      </div>

      {/* ============================================================
          PROCESO — banda oscura
          ============================================================ */}
      <section className="bg-[var(--color-ink)] text-[var(--color-bone)]">
        <div className="container-edge py-24 md:py-32">
          <div className="grid gap-12 md:grid-cols-12 items-start">
            <Reveal variant="slide-right" className="md:col-span-5">
              <p className="eyebrow text-[var(--color-clay-soft)]">A la medida</p>
              <h2 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-[-0.015em]">
                Si tienes una idea, <span className="display-italic">la cotizamos</span>.
              </h2>
              <p className="mt-6 text-[1.0625rem] leading-relaxed text-[var(--color-bone)]/80 max-w-md">
                Mándanos una foto, un boceto o las medidas. Cualquier diseño de
                referencia se puede cotizar y fabricar.
              </p>
              <div className="mt-10 flex gap-3 flex-wrap">
                <Link
                  href="/a-la-medida"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[var(--color-bone)] text-[var(--color-ink)] font-medium text-[0.9375rem] hover:bg-[var(--color-clay-soft)] transition-colors"
                >
                  Empezar pedido
                  <span aria-hidden>→</span>
                </Link>
                <a
                  href={whatsappLink("Hola EYK, quiero cotizar un mueble a la medida.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-[var(--color-bone)]/30 text-[var(--color-bone)] hover:bg-[var(--color-bone)]/10 transition-colors text-[0.9375rem]"
                >
                  Por WhatsApp
                </a>
              </div>
            </Reveal>

            <ol className="md:col-span-7 grid sm:grid-cols-3 gap-px bg-[var(--color-bone)]/15">
              {[
                {
                  n: "01",
                  title: "Cuéntanos tu idea",
                  body: "Foto, boceto, medidas o una pieza que te gustó.",
                },
                {
                  n: "02",
                  title: "Cotizamos sin compromiso",
                  body: "Definimos materiales, tela, madera y precio.",
                },
                {
                  n: "03",
                  title: "Fabricamos y entregamos",
                  body: "Trabajo a mano. Acabados a tu gusto.",
                },
              ].map((step, i) => (
                <Reveal key={step.n} delay={i * 150 + 200} className="bg-[var(--color-ink)]">
                  <li className="p-7 md:p-8 h-full">
                    <p className="display-italic text-3xl text-[var(--color-clay-soft)]">
                      {step.n}
                    </p>
                    <h3 className="mt-4 font-[family-name:var(--font-display)] text-xl text-[var(--color-bone)]">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-[0.9375rem] text-[var(--color-bone)]/70 leading-relaxed">
                      {step.body}
                    </p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
