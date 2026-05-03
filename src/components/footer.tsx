import Link from "next/link";
import { CONTACT, CATEGORY_GROUPS } from "@/lib/data";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-[var(--color-line)] bg-[var(--color-bone-2)]">
      <div className="container-edge py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-baseline gap-2">
              <span className="font-[family-name:var(--font-display)] text-3xl text-[var(--color-ink)] leading-none">
                EYK
              </span>
              <span className="display-italic text-sm text-[var(--color-ink-muted)]">mueblería</span>
            </div>
            <p className="mt-4 max-w-md text-[var(--color-ink-2)] text-[0.95rem] leading-relaxed">
              Fabricamos salas, comedores, camas y muebles en madera a la medida. Tela, color y acabados a tu gusto. Cotizamos cualquier diseño de referencia.
            </p>
          </div>

          <div className="md:col-span-3">
            <h2 className="eyebrow mb-4">Catálogo</h2>
            <ul className="space-y-2.5">
              {CATEGORY_GROUPS.map((g) => (
                <li key={g.id}>
                  <Link
                    href={`/catalogo?grupo=${g.id}`}
                    className="text-[var(--color-ink-2)] hover:text-[var(--color-ink)] text-[0.95rem]"
                  >
                    {g.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h2 className="eyebrow mb-4">Contacto</h2>
            <ul className="space-y-3 text-[0.95rem] text-[var(--color-ink-2)]">
              <li>
                <a
                  href={`https://wa.me/${CONTACT.whatsapp.replace(/\D/g, "")}`}
                  className="link-underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp · {CONTACT.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT.email}`} className="link-underline">
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a
                  href={`https://instagram.com/${CONTACT.instagram}`}
                  className="link-underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram · @{CONTACT.instagram}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-[var(--color-line)] flex flex-col md:flex-row gap-4 md:items-end md:justify-between">
          <p className="text-xs text-[var(--color-ink-subtle)]">
            © {new Date().getFullYear()} EYK Mueblería. Todos los derechos reservados.
          </p>
          <p className="display-italic text-sm text-[var(--color-ink-muted)]">
            Hecho a mano, en Costa Rica.
          </p>
        </div>
      </div>
    </footer>
  );
}
