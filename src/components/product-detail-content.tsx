"use client";

import Link from "next/link";
import { useLang } from "@/contexts/lang-context";
import { ProductCard } from "@/components/product-card";
import type { Product } from "@/lib/products";

interface Props {
  product: Product;
  related: Product[];
  categoryLabel: string;
  categoryShort: string;
  categoryGroup: string;
  whatsappMessage: string;
}

export function ProductDetailContent({
  product,
  related,
  categoryLabel,
  categoryShort,
  categoryGroup,
  whatsappMessage,
}: Props) {
  const { t } = useLang();

  return (
    <>
      <article className="container-edge pt-10 md:pt-14 pb-20">
        {/* breadcrumb */}
        <nav aria-label={t("nav", "home")} className="text-sm text-[var(--color-ink-subtle)] mb-8">
          <ol className="flex items-center gap-2 flex-wrap">
            <li>
              <Link href="/" className="link-underline text-[var(--color-ink-muted)]">
                {t("nav", "home")}
              </Link>
            </li>
            <li aria-hidden>·</li>
            <li>
              <Link href="/catalogo" className="link-underline text-[var(--color-ink-muted)]">
                {t("nav", "catalog")}
              </Link>
            </li>
            <li aria-hidden>·</li>
            <li>
              <Link
                href={`/catalogo?grupo=${categoryGroup}`}
                className="link-underline text-[var(--color-ink-muted)]"
              >
                {categoryShort}
              </Link>
            </li>
          </ol>
        </nav>

        <div className="grid gap-10 md:gap-16 md:grid-cols-12 items-start">
          <div className="md:col-span-7">
            <div className="relative aspect-[4/5] bg-[var(--color-bone-2)] rounded-sm overflow-hidden border border-[var(--color-line)]">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain p-10 md:p-16"
              />
            </div>
          </div>

          <div className="md:col-span-5 md:sticky md:top-24">
            <p className="eyebrow">{categoryLabel}</p>
            <h1 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[1.05] tracking-[-0.02em]">
              {product.name}
            </h1>

            <p className="mt-6 text-[1.0625rem] text-[var(--color-ink-2)] leading-relaxed">
              Mueble fabricado a la medida por EYK. Personaliza tela, color y acabado a tu gusto. Podemos cotizar también tu propio diseño de referencia.
            </p>

            <dl className="mt-8 grid gap-4 text-sm">
              <div className="flex gap-6 items-baseline">
                <dt className="eyebrow text-[var(--color-ink-muted)] min-w-[110px]">
                  Personalizable
                </dt>
                <dd className="text-[var(--color-ink-2)]">Tela, color, acabado</dd>
              </div>
              <div className="flex gap-6 items-baseline">
                <dt className="eyebrow text-[var(--color-ink-muted)] min-w-[110px]">Tela</dt>
                <dd className="text-[var(--color-ink-2)]">Lino · Microfibra · Vinil</dd>
              </div>
              <div className="flex gap-6 items-baseline">
                <dt className="eyebrow text-[var(--color-ink-muted)] min-w-[110px]">Madera</dt>
                <dd className="text-[var(--color-ink-2)]">Pino · Laurel · Cenízaro</dd>
              </div>
              <div className="flex gap-6 items-baseline">
                <dt className="eyebrow text-[var(--color-ink-muted)] min-w-[110px]">Tiempo</dt>
                <dd className="text-[var(--color-ink-2)]">2–4 semanas según diseño</dd>
              </div>
            </dl>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={`https://wa.me/${whatsappMessage.replace(/\D/g, "")}?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                {t("card", "quote")}
                <span aria-hidden>→</span>
              </a>
              <Link href="/a-la-medida" className="btn-secondary">
                {t("nav", "custom")}
              </Link>
            </div>

            <p className="mt-8 text-xs text-[var(--color-ink-subtle)]">
              Sin compromiso · Te respondemos el mismo día.
            </p>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="container-edge pb-24">
          <header className="mb-8">
            <p className="eyebrow">Tal vez te guste también</p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(1.75rem,3.5vw,2.25rem)] tracking-tight">
              Otros {categoryShort.toLowerCase()}
            </h2>
          </header>
          <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-4 stagger">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
