"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { Marquee } from "@/components/marquee";
import { StatCounter } from "@/components/stat-counter";
import { HeroSpotlight } from "@/components/hero-spotlight";
import { useLang } from "@/contexts/lang-context";
import { translations } from "@/lib/translations";
import { whatsappLink } from "@/lib/data";

interface Props {
  bestSellers: Product[];
  previewByGroup: Array<{
    group: { id: string; label: string; description: string };
    sample: Product | undefined;
    count: number;
  }>;
  big: Product | undefined;
}

export function HomeContent({ bestSellers, previewByGroup, big }: Props) {
  const { lang } = useLang();
  const h = translations.home;

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white">
        <HeroSpotlight />
        <div className="container-edge pt-12 md:pt-20 pb-16 md:pb-24">
          <div className="grid gap-12 md:gap-16 md:grid-cols-12 items-end">
            <div className="md:col-span-7 animate-fade-rise">
              <p className="eyebrow flex items-center gap-3">
                <span aria-hidden className="inline-block w-8 h-px bg-[#FB531F]" />
                {h.eyebrow[lang]}
              </p>
              <h1 className="mt-6 font-[family-name:var(--font-display)] text-[clamp(2.75rem,7.5vw,6rem)] leading-[0.98] tracking-[-0.025em] text-[#111]">
                {h.hero_h1a[lang]}
                <br />
                <span className="display-italic text-[#FB531F]">{h.hero_h1b[lang]}</span>
                <span className="text-[#FB531F]">.</span>
              </h1>
              <p className="mt-7 max-w-xl text-[1.0625rem] leading-relaxed text-[#444]">
                {h.hero_sub[lang]}
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Link href="/catalogo" className="btn-primary">
                  {h.cta_catalog[lang]} <span aria-hidden>→</span>
                </Link>
                <Link href="/a-la-medida" className="btn-secondary">
                  {h.cta_custom[lang]}
                </Link>
              </div>
            </div>

            <div className="md:col-span-5">
              {big && (
                <Reveal variant="scale-in" delay={200}>
                  <div className="product-watermark relative aspect-[4/5] rounded-xl overflow-hidden bg-[#f8f8f8] border border-[#e5e5e5]">
                    <Image
                      src={big.image}
                      alt={big.name}
                      fill
                      sizes="(min-width: 768px) 40vw, 90vw"
                      className="object-contain p-6 hover:scale-[1.04] transition-transform duration-[1200ms] ease-out"
                      priority
                    />
                    <div className="absolute top-4 right-4 inline-flex items-center gap-2 bg-[#FB531F] text-white px-3 py-1.5 rounded-full">
                      <span className="block w-1.5 h-1.5 rounded-full bg-white/70" />
                      <span className="text-xs tracking-[0.12em] font-bold">{h.best_seller_badge[lang]}</span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-white/95 backdrop-blur-sm px-4 py-3 rounded-lg">
                        <p className="text-[0.7rem] font-bold tracking-[0.15em] uppercase text-[#FB531F]">
                          {h.featured[lang]}
                        </p>
                        <p className="font-[family-name:var(--font-display)] text-lg text-[#111] leading-tight mt-0.5">
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

        <div className="border-y border-[#e5e5e5] py-4 bg-[#f8f8f8]">
          <Marquee
            speed={50}
            items={[...h.marquee.items[lang]]}
            className="text-[#333] font-[family-name:var(--font-display)] italic text-[1.5rem] md:text-[2rem]"
          />
        </div>
      </section>

      {/* ── STATS ──────────────────────────────────────────────────────── */}
      <section className="container-edge py-20 md:py-24">
        <div className="grid gap-px bg-[#e5e5e5] border border-[#e5e5e5] sm:grid-cols-3">
          {h.stats.map((s, i) => (
            <Reveal key={i} delay={i * 120} className="bg-white">
              <div className="p-8 md:p-12">
                <p className="font-[family-name:var(--font-display)] text-[clamp(3rem,7vw,5.5rem)] leading-none tracking-[-0.02em] text-[#111]">
                  <StatCounter value={s.num} suffix={s.suffix} />
                </p>
                <p className={["mt-4 text-[#777]", s.italic ? "display-italic text-xl" : "text-[0.95rem]"].join(" ")}>
                  {s[lang]}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── PROCESO ───────────────────────────────────────────────────── */}
      <section className="bg-[#111] text-white">
        <div className="container-edge py-20 md:py-28">
          <div className="grid gap-12 md:grid-cols-12 items-start">
            <Reveal variant="slide-right" className="md:col-span-5">
              <p className="text-[0.75rem] font-bold tracking-[0.2em] uppercase text-[#FB531F]">
                {h.process_eyebrow[lang]}
              </p>
              <h2 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-[-0.015em]">
                {h.process_h2a[lang]}{" "}
                <span className="display-italic text-[#FB531F]">{h.process_h2b[lang]}</span>.
              </h2>
              <p className="mt-6 text-[1.0625rem] leading-relaxed text-white/70 max-w-md">
                {h.process_sub[lang]}
              </p>
              <p className="mt-3 text-sm text-white/40">{h.process_note[lang]}</p>
              <div className="mt-8 flex gap-3 flex-wrap">
                <Link href="/a-la-medida" className="btn-primary">
                  {h.process_cta1[lang]}
                </Link>
                <a
                  href={whatsappLink("Hola EYK, quiero cotizar un mueble a la medida.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors text-[0.9375rem] font-medium"
                >
                  {h.process_cta2[lang]}
                </a>
              </div>
            </Reveal>

            <ol className="md:col-span-7 grid sm:grid-cols-3 gap-px bg-white/10">
              {h.steps.map((step, i) => (
                <Reveal key={step.n} delay={i * 150 + 200} className="bg-[#111]">
                  <li className="p-7 md:p-8 h-full">
                    <p className="display-italic text-3xl text-[#FB531F]">{step.n}</p>
                    <h3 className="mt-4 font-[family-name:var(--font-display)] text-xl text-white">
                      {step[`${lang}_t` as `es_t` | `en_t`]}
                    </h3>
                    <p className="mt-2 text-[0.9375rem] text-white/60 leading-relaxed">
                      {step[`${lang}_b` as `es_b` | `en_b`]}
                    </p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── BEST SELLERS ──────────────────────────────────────────────── */}
      {bestSellers.length > 0 && (
        <section className="container-edge pb-20 md:pb-28">
          <Reveal>
            <header className="flex items-end justify-between gap-8 mb-10">
              <div>
                <p className="eyebrow flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#FB531F]" />
                  {h.bs_eyebrow[lang]}
                </p>
                <h2 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(2rem,4.5vw,3rem)] leading-tight tracking-[-0.015em]">
                  {h.bs_h2a[lang]}{" "}
                  <span className="display-italic text-[#FB531F]">{h.bs_h2b[lang]}</span>.
                </h2>
                <p className="mt-3 text-[#666] text-[0.95rem] max-w-xl">{h.bs_sub[lang]}</p>
              </div>
              <Link
                href="/catalogo"
                className="hidden md:inline-flex items-center gap-1 text-[#FB531F] hover:text-[#d43e0a] font-semibold text-sm transition-colors"
              >
                {h.bs_link[lang]}
              </Link>
            </header>
          </Reveal>

          {/* Mobile: horizontal scroll; sm+: grid */}
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-3 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:snap-none sm:pb-0 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {bestSellers.slice(0, 12).map((p, i) => (
              <Reveal key={p.id} delay={Math.min(i * 60, 400)} className="min-w-[75vw] flex-shrink-0 snap-start sm:min-w-0 sm:flex-shrink">
                <ProductCard product={p} index={i} priority={i < 4} />
              </Reveal>
            ))}
          </div>

          <Reveal delay={400}>
            <div className="mt-10 flex justify-center">
              <Link href="/catalogo" className="btn-primary">
                {h.bs_cta[lang]}
              </Link>
            </div>
          </Reveal>
        </section>
      )}

      {/* ── CATEGORÍAS ────────────────────────────────────────────────── */}
      <section className="bg-[#f8f8f8] border-y border-[#e5e5e5]">
        <div className="container-edge py-16 md:py-24">
          <Reveal>
            <header className="flex items-end justify-between gap-8 mb-12">
              <div>
                <p className="eyebrow">{h.cat_eyebrow[lang]}</p>
                <h2 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(2rem,4.5vw,3.25rem)] leading-tight tracking-[-0.015em] max-w-xl">
                  {h.cat_h2a[lang]}{" "}
                  <span className="display-italic">{h.cat_h2b[lang]}</span>
                </h2>
              </div>
              <Link
                href="/catalogo"
                className="hidden md:inline-flex items-center gap-1 text-[#FB531F] hover:text-[#d43e0a] font-semibold text-sm transition-colors"
              >
                {h.cat_link[lang]}
              </Link>
            </header>
          </Reveal>

          <div className="grid gap-4 md:gap-5 grid-cols-1 md:grid-cols-3 md:auto-rows-[260px]">
            {previewByGroup.map(({ group, sample, count }, i) => {
              const isFeatured = i === 0;
              return (
                <Reveal key={group.id} delay={i * 100} className={isFeatured ? "md:col-span-1 md:row-span-2" : ""}>
                  <Link
                    href={`/catalogo?grupo=${group.id}`}
                    className={[
                      "group relative block h-full overflow-hidden rounded-xl border border-[#e5e5e5] bg-white transition-all hover:border-[#FB531F]/40 hover:shadow-md",
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
                    <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-white/95 via-white/20 to-transparent">
                      <p className="text-[10px] tracking-[0.2em] uppercase text-[#FB531F] font-bold">
                        {String(i + 1).padStart(2, "0")} / {count} {h.cat_pieces[lang]}
                      </p>
                      <h3 className={["mt-2 font-[family-name:var(--font-display)] text-[#111] leading-tight tracking-[-0.015em]", isFeatured ? "text-3xl md:text-5xl" : "text-2xl"].join(" ")}>
                        {group.label}
                      </h3>
                      <span aria-hidden className="mt-3 inline-flex items-center gap-1.5 text-[#FB531F] font-semibold text-sm transition-transform duration-300 group-hover:translate-x-1">
                        {h.cat_see[lang]}
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── MARQUEE FINAL ─────────────────────────────────────────────── */}
      <div className="border-y border-[#e5e5e5] py-4 overflow-hidden">
        <Marquee
          reverse
          speed={60}
          items={[...h.marquee2.items[lang]]}
          className="text-[#FB531F] font-[family-name:var(--font-display)] text-[1.25rem] md:text-[1.5rem] tracking-tight"
        />
      </div>
    </>
  );
}
