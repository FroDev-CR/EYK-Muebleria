"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import type { Product } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { Marquee } from "@/components/marquee";
import { StatCounter } from "@/components/stat-counter";
import { HeroSpotlight } from "@/components/hero-spotlight";
import { useLang } from "@/contexts/lang-context";
import { translations } from "@/lib/translations";

interface Props {
  bestSellers: Product[];
  previewByGroup: Array<{
    group: { id: string; label: string; description: string };
    sample: Product | undefined;
    count: number;
  }>;
}

export function HomeContent({ bestSellers, previewByGroup }: Props) {
  const { lang, t, whatsappLink } = useLang();
  const h = translations.home;

  const scrollRef = useRef<HTMLDivElement>(null);
  const idxRef = useRef(0);
  const pausedRef = useRef(false);
  const count = Math.min(bestSellers.length, 8);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || count === 0) return;

    const advance = () => {
      if (pausedRef.current || !scrollRef.current) return;
      idxRef.current = (idxRef.current + 1) % count;
      const cardWidth = (scrollRef.current.firstElementChild as HTMLElement)?.offsetWidth ?? scrollRef.current.offsetWidth;
      scrollRef.current.scrollTo({
        left: idxRef.current * cardWidth,
        behavior: "smooth",
      });
    };

    const pause = () => { pausedRef.current = true; };
    const resume = () => { setTimeout(() => { pausedRef.current = false; }, 2500); };

    const timer = setInterval(advance, 3500);
    el.addEventListener("touchstart", pause, { passive: true });
    el.addEventListener("mousedown", pause);
    el.addEventListener("touchend", resume, { passive: true });
    el.addEventListener("mouseup", resume);

    return () => {
      clearInterval(timer);
      el.removeEventListener("touchstart", pause);
      el.removeEventListener("mousedown", pause);
      el.removeEventListener("touchend", resume);
      el.removeEventListener("mouseup", resume);
    };
  }, [count]);

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white">
        <HeroSpotlight />
        <div className="container-edge pt-12 md:pt-20 pb-16 md:pb-24">
          <div className="grid gap-12 md:gap-16 md:grid-cols-12 items-end">
            <div className="min-w-0 md:col-span-7 animate-fade-rise">
              <p className="eyebrow flex items-center gap-3">
                <span aria-hidden className="inline-block w-8 h-px bg-[#FB531F]" />
                {t("home", "eyebrow")}
              </p>
              <h1 className="mt-6 font-[family-name:var(--font-display)] text-[clamp(1.75rem,8vw,2.5rem)] sm:text-[clamp(2rem,7vw,3rem)] md:text-[clamp(2.75rem,7.5vw,6rem)] leading-[1.05] md:leading-[0.98] tracking-[-0.025em] text-[#111]">
                {t("home", "hero_h1a")}
                <br />
                <span className="display-italic text-[#FB531F]">{t("home", "hero_h1b")}</span>
                <span className="text-[#FB531F]">.</span>
              </h1>
              <p className="mt-7 max-w-xl text-[1.0625rem] leading-relaxed text-[#444]">
                {t("home", "hero_sub")}
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

            <div className="min-w-0 md:col-span-5">
              {bestSellers.length > 0 && (
                <>
                  <Reveal delay={200}>
                    <p className="eyebrow flex items-center gap-2 mb-4">
                      <span className="inline-block w-2 h-2 rounded-full bg-[#FB531F]" />
                      {t("home", "bs_eyebrow")}
                    </p>
                  </Reveal>
                  <div
                    ref={scrollRef}
                    className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
                    style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-x" }}
                  >
                    {bestSellers.slice(0, 8).map((p, i) => (
                      <div key={p.id} className="min-w-[78vw] md:min-w-full flex-shrink-0 snap-start">
                        <ProductCard product={p} index={i} priority={i < 2} />
                      </div>
                    ))}
                  </div>
                  <Link
                    href="/catalogo"
                    className="mt-3 inline-flex items-center gap-1 text-[#FB531F] hover:text-[#d43e0a] font-semibold text-sm transition-colors"
                  >
                    {h.bs_link[lang]}
                  </Link>
                </>
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
                {t("home", "process_h2a")}
                <br />
                <span className="display-italic text-[#FB531F]">{t("home", "process_h2b")}</span>
                <span className="text-[#FB531F]">.</span>
              </h2>
              <p className="mt-6 text-[1.0625rem] leading-relaxed text-white/70 max-w-md">
                {t("home", "process_sub")}
              </p>
              <p className="mt-3 text-sm text-white/40">{t("home", "process_note")}</p>
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


      {/* ── CATEGORÍAS ────────────────────────────────────────────────── */}
      <section className="bg-[#f8f8f8] border-y border-[#e5e5e5]">
        <div className="container-edge py-16 md:py-24">
          <Reveal>
            <header className="flex items-end justify-between gap-8 mb-12">
              <div>
                <p className="eyebrow">{h.cat_eyebrow[lang]}</p>
                <h2 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(2rem,4.5vw,3.25rem)] leading-tight tracking-[-0.015em] max-w-xl">
                  {t("home", "cat_h2a")}{" "}
                  <span className="display-italic">{t("home", "cat_h2b")}</span>
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
