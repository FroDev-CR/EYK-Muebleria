import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, getProductsByCategory, type Product } from "@/lib/products";
import { CATEGORIES, getCategory, whatsappLink } from "@/lib/data";
import { ProductCard } from "@/components/product-card";
import productsJson from "@/data/products.json";

export async function generateStaticParams() {
  const list = productsJson as Product[];
  return list.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const p = await getProductBySlug(slug);
  if (!p) return {};
  return {
    title: p.name,
    description: `${p.name} — Mueble a la medida fabricado por EYK Mueblería. Personaliza tela, color y acabados.`,
  };
}

export default async function ProductPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const product = await getProductBySlug(slug);
  if (!product) return notFound();

  const cat = getCategory(product.category);
  const related = (await getProductsByCategory(product.category))
    .filter((p) => p.slug !== product.slug)
    .slice(0, 4);

  const message = `Hola EYK, me interesa cotizar el mueble *${product.name}* (${cat?.label ?? product.category}). ¿Me ayudan con detalles y precio?`;

  return (
    <>
      <article className="container-edge pt-10 md:pt-14 pb-20">
        {/* breadcrumb */}
        <nav aria-label="Migas" className="text-sm text-[var(--color-ink-subtle)] mb-8">
          <ol className="flex items-center gap-2 flex-wrap">
            <li>
              <Link href="/" className="link-underline text-[var(--color-ink-muted)]">
                Inicio
              </Link>
            </li>
            <li aria-hidden>·</li>
            <li>
              <Link href="/catalogo" className="link-underline text-[var(--color-ink-muted)]">
                Catálogo
              </Link>
            </li>
            <li aria-hidden>·</li>
            <li>
              <Link
                href={`/catalogo?grupo=${cat?.group}`}
                className="link-underline text-[var(--color-ink-muted)]"
              >
                {cat?.short}
              </Link>
            </li>
          </ol>
        </nav>

        <div className="grid gap-10 md:gap-16 md:grid-cols-12 items-start">
          <div className="md:col-span-7">
            <div className="relative aspect-[4/5] bg-[var(--color-bone-2)] rounded-sm overflow-hidden border border-[var(--color-line)]">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(min-width: 768px) 60vw, 90vw"
                className="object-contain p-10 md:p-16"
                priority
              />
            </div>
          </div>

          <div className="md:col-span-5 md:sticky md:top-24">
            <p className="eyebrow">{cat?.label}</p>
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
                <dd className="text-[var(--color-ink-2)]">{cat?.customizable}</dd>
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
                href={whatsappLink(message)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Cotizar por WhatsApp
                <span aria-hidden>→</span>
              </a>
              <Link href="/a-la-medida" className="btn-secondary">
                Pedir a la medida
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
                <div className="flex items-center justify-center rounded border border-[#e0e0e0] bg-[#1A1F71] px-3 py-1" title="Visa">
                  <svg width="38" height="12" viewBox="0 0 38 12" xmlns="http://www.w3.org/2000/svg" aria-label="Visa">
                    <text x="19" y="11" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold" fontStyle="italic" fontFamily="Arial, Helvetica, sans-serif" letterSpacing="1">VISA</text>
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
                <div className="flex items-center justify-center rounded border border-[#007BC1] bg-[#007BC1] px-2.5 py-1" title="American Express">
                  <span className="text-white text-[0.6rem] font-black tracking-widest leading-none">AMEX</span>
                </div>
                {/* Financing */}
                <span className="text-[0.78rem] text-[var(--color-ink-muted)]">· Financiamiento disponible</span>
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
              Otros {cat?.short.toLowerCase()}
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
