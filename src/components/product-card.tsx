import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { getCategory } from "@/lib/data";

interface Props {
  product: Product;
  priority?: boolean;
  /** índice para escalonar la entrada en grids */
  index?: number;
  /** ratio de aspecto del marco — default 4/5 */
  aspect?: "square" | "portrait" | "landscape" | "tall";
}

const ASPECT_CLASS: Record<NonNullable<Props["aspect"]>, string> = {
  square: "aspect-square",
  portrait: "aspect-[4/5]",
  landscape: "aspect-[5/4]",
  tall: "aspect-[3/4]",
};

export function ProductCard({ product, priority, index = 0, aspect = "portrait" }: Props) {
  const cat = getCategory(product.category);
  return (
    <Link
      href={`/catalogo/${product.slug}`}
      className="group block focus:outline-none"
      style={{ animationDelay: `${Math.min(index * 60, 400)}ms` }}
    >
      <div
        className={[
          "relative overflow-hidden rounded-sm bg-[var(--color-bone-2)] border border-[var(--color-line)] transition-colors duration-500",
          "group-hover:border-[var(--color-walnut)]/40",
          ASPECT_CLASS[aspect],
        ].join(" ")}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
          className="object-contain p-6 transition-all duration-700 ease-[cubic-bezier(0.165,0.84,0.44,1)] group-hover:scale-[1.06]"
          priority={priority}
        />
        {/* Eyebrow flotante con la categoría — aparece on hover */}
        <span className="pointer-events-none absolute top-4 left-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-[var(--color-bone)]/90 backdrop-blur-[2px] text-[10px] font-semibold tracking-[0.18em] uppercase text-[var(--color-walnut)] opacity-0 -translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          <span className="inline-block w-1 h-1 rounded-full bg-[var(--color-walnut)]" />
          {cat?.short ?? product.category}
        </span>
      </div>
      <div className="pt-4 flex items-baseline justify-between gap-3">
        <div className="min-w-0">
          <p className="eyebrow text-[0.65rem] transition-colors duration-300 group-hover:text-[var(--color-clay)]">
            {cat?.short ?? product.category}
          </p>
          <h3 className="mt-1 font-[family-name:var(--font-display)] text-[1.0625rem] text-[var(--color-ink)] leading-snug truncate">
            {product.name}
          </h3>
        </div>
        <span
          aria-hidden
          className="text-[var(--color-ink-subtle)] transition-all duration-300 group-hover:translate-x-1 group-hover:text-[var(--color-walnut)]"
        >
          →
        </span>
      </div>
    </Link>
  );
}
