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

            {/* Métodos de pago */}
            <div className="mt-6 pt-6 border-t border-[var(--color-line)]">
              <p className="text-[0.65rem] font-bold tracking-[0.15em] uppercase text-[var(--color-ink-subtle)] mb-2.5">
                Métodos de pago aceptados
              </p>
              <div className="flex flex-wrap items-center gap-2">
                {/* Visa */}
                <div className="flex items-center justify-center rounded border border-[#e0e0e0] bg-white px-2 py-1" title="Visa">
                  <svg width="40" height="14" viewBox="0 0 46 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Visa">
                    <path d="M18.5 1L15 15H11.8L15.3 1H18.5Z" fill="#1A1F71"/>
                    <path d="M30.4 1.3C29.7 1 28.6 0.8 27.2 0.8C23.7 0.8 21.2 2.6 21.2 5.2C21.2 7.1 22.9 8.1 24.2 8.7C25.5 9.3 25.9 9.7 25.9 10.3C25.9 11.2 24.8 11.6 23.8 11.6C22.4 11.6 21.7 11.4 20.5 10.9L20.1 10.7L19.6 13.6C20.5 14 22 14.4 23.6 14.4C27.3 14.4 29.7 12.6 29.7 9.8C29.7 8.3 28.8 7.2 26.9 6.3C25.7 5.7 25 5.3 25 4.7C25 4.1 25.7 3.5 27.2 3.5C28.4 3.5 29.3 3.8 30 4L30.4 4.2L30.9 1.4L30.4 1.3Z" fill="#1A1F71"/>
                    <path d="M35.2 1H32.7C31.9 1 31.3 1.2 31 2L26 15H29.7L30.4 13H34.9L35.3 15H38.6L35.2 1ZM31.3 10.4C31.6 9.6 32.8 6.3 32.8 6.3C32.8 6.3 33.1 5.4 33.3 4.9L33.6 6.1C33.6 6.1 34.4 9.6 34.6 10.4H31.3Z" fill="#1A1F71"/>
                    <path d="M11.4 1L7.9 10.3L7.5 8.6C6.8 6.4 4.7 4 2.3 2.8L5.5 15H9.2L15.1 1H11.4Z" fill="#1A1F71"/>
                    <path d="M4.2 1H0.2L0.1 1.2C3.2 1.9 5.3 3.6 6.2 5.7L5.2 2.1C5 1.3 4.7 1 4.2 1Z" fill="#F9A51A"/>
                  </svg>
                </div>
                {/* Mastercard */}
                <div className="flex items-center justify-center rounded border border-[#e0e0e0] bg-white px-2 py-1" title="Mastercard">
                  <svg width="30" height="20" viewBox="0 0 34 22" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Mastercard">
                    <circle cx="13" cy="11" r="9" fill="#EB001B"/>
                    <circle cx="21" cy="11" r="9" fill="#F79E1B" opacity="0.88"/>
                  </svg>
                </div>
                {/* Amex */}
                <div className="flex items-center justify-center rounded border border-[#e0e0e0] bg-[#007BC1] px-2.5 py-1" title="American Express">
                  <span className="text-white text-[0.6rem] font-black tracking-widest leading-none">AMEX</span>
                </div>
                {/* Financing */}
                <span className="text-[0.75rem] text-[var(--color-ink-muted)]">· Financiamiento disponible</span>
              </div>
            </div>
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
