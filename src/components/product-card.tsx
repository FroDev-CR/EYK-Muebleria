"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/products";
import { getCategory } from "@/lib/data";
import { useLang } from "@/contexts/lang-context";
import { translations } from "@/lib/translations";

interface Props {
  product: Product;
  priority?: boolean;
  index?: number;
  aspect?: "square" | "portrait" | "landscape" | "tall";
  showQuote?: boolean;
}

const ASPECT_CLASS: Record<NonNullable<Props["aspect"]>, string> = {
  square: "aspect-square",
  portrait: "aspect-[4/5]",
  landscape: "aspect-[5/4]",
  tall: "aspect-[3/4]",
};

export function ProductCard({ product, priority, index = 0, aspect = "portrait", showQuote = true }: Props) {
  const { lang } = useLang();
  const tr = translations.card;
  const catTr = translations.categories;
  const cat = getCategory(product.category);
  const hasPrice = product.price !== null && product.price !== undefined;
  const hasDiscount = hasPrice && product.regularPrice !== null && product.regularPrice !== undefined;
  const catLabel = catTr[product.category as keyof typeof catTr]?.[lang] ?? cat?.short ?? product.category;

  return (
    <div
      className="group block"
      style={{ animationDelay: `${Math.min(index * 60, 400)}ms` }}
    >
      {/* Imagen con watermark */}
      <Link href={`/catalogo/${product.slug}`} className="block focus:outline-none">
        <div
          className={[
            "product-watermark relative overflow-hidden rounded-lg bg-[var(--color-bone-2)] border border-[var(--color-line)] transition-all duration-500",
            "group-hover:border-[#FB531F]/30 group-hover:shadow-md",
            ASPECT_CLASS[aspect],
          ].join(" ")}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
            className="object-contain p-6 transition-all duration-700 ease-[cubic-bezier(0.165,0.84,0.44,1)] group-hover:scale-[1.05]"
            priority={priority}
          />
          {product.isBestSeller && (
            <span className="absolute top-3 left-3 bg-[#FB531F] text-white text-[9px] font-bold tracking-[0.15em] uppercase px-2 py-1 rounded-sm">
              {tr.best_seller[lang]}
            </span>
          )}
          {hasDiscount && (
            <span className="absolute top-3 right-3 bg-[#111] text-white text-[9px] font-bold px-2 py-1 rounded-sm">
              {tr.offer[lang]}
            </span>
          )}
          <span className="pointer-events-none absolute bottom-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/90 backdrop-blur-[2px] text-[9px] font-semibold tracking-[0.15em] uppercase text-[#FB531F] opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
            <span className="inline-block w-1 h-1 rounded-full bg-[#FB531F]" />
            {catLabel}
          </span>
        </div>
      </Link>

      {/* Info */}
      <div className="pt-3 space-y-1.5">
        <Link href={`/catalogo/${product.slug}`} className="block group/link">
          <p className="text-[0.65rem] font-semibold tracking-[0.15em] uppercase text-[#FB531F]">
            {catLabel}
          </p>
          <h3 className="mt-0.5 font-[family-name:var(--font-display)] text-[1rem] text-[var(--color-ink)] leading-snug group-hover/link:text-[#FB531F] transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Dimensiones */}
        {product.dimensions && (
          <p className="text-[0.75rem] text-[var(--color-ink-muted)]">{product.dimensions}</p>
        )}

        {/* Precio */}
        {hasPrice ? (
          <div className="flex items-baseline gap-2 pt-0.5">
            <span className="text-[1.0625rem] font-bold text-[#FB531F]">
              {formatPrice(product.price!)}
            </span>
            {hasDiscount && (
              <span className="text-[0.8rem] text-[var(--color-ink-subtle)] line-through">
                {formatPrice(product.regularPrice!)}
              </span>
            )}
          </div>
        ) : (
          <p className="text-[0.8rem] text-[var(--color-ink-muted)] pt-0.5">{tr.ask_price[lang]}</p>
        )}

        {showQuote && (
          <a
            href={`/catalogo/${product.slug}`}
            className="inline-flex items-center gap-1.5 mt-2 text-[0.78rem] font-semibold text-[#FB531F] hover:text-[#d43e0a] transition-colors group/cta"
          >
            {tr.quote[lang]}
            <span className="transition-transform group-hover/cta:translate-x-0.5">→</span>
          </a>
        )}
      </div>
    </div>
  );
}
