"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/a-la-medida", label: "A la medida" },
  { href: "/contacto", label: "Contacto" },
];

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cerrar menú al cambiar de ruta
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={[
        "sticky top-0 z-50 transition-colors duration-300",
        scrolled
          ? "bg-[var(--color-bone)]/85 backdrop-blur-md border-b border-[var(--color-line)]"
          : "bg-transparent",
      ].join(" ")}
    >
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:bg-[var(--color-ink)] focus:text-[var(--color-bone)] focus:px-3 focus:py-1 focus:rounded"
      >
        Saltar al contenido
      </a>

      <div className="container-edge flex items-center justify-between py-5">
        <Link
          href="/"
          className="flex items-baseline gap-2 group"
          aria-label="EYK Mueblería · inicio"
        >
          <span
            className="font-[family-name:var(--font-display)] text-[1.625rem] tracking-tight text-[var(--color-ink)] leading-none"
            style={{ fontWeight: 500 }}
          >
            EYK
          </span>
          <span className="display-italic text-sm text-[var(--color-ink-muted)] hidden sm:inline">
            mueblería
          </span>
        </Link>

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-9">
            {links.map((l) => {
              const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={[
                      "text-[0.95rem] tracking-tight transition-colors",
                      active
                        ? "text-[var(--color-walnut)]"
                        : "text-[var(--color-ink-2)] hover:text-[var(--color-ink)]",
                    ].join(" ")}
                  >
                    {l.label}
                    {active && (
                      <span
                        aria-hidden
                        className="block h-px bg-[var(--color-walnut)] mt-0.5"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="md:hidden flex items-center justify-center w-11 h-11 -mr-2"
        >
          <span className="relative block w-6 h-3">
            <span
              aria-hidden
              className={`absolute left-0 right-0 h-px bg-[var(--color-ink)] transition-transform duration-300 ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              aria-hidden
              className={`absolute left-0 right-0 h-px bg-[var(--color-ink)] transition-transform duration-300 ${
                open ? "top-1.5 -rotate-45" : "bottom-0"
              }`}
            />
          </span>
        </button>
      </div>

      {/* Menú móvil */}
      <div
        className={`md:hidden overflow-hidden transition-[grid-template-rows] duration-300 grid ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0">
          <nav aria-label="Móvil" className="container-edge pb-8">
            <ul className="flex flex-col gap-2 pt-2">
              {links.map((l) => {
                const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
                return (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className={`block py-3 text-2xl font-[family-name:var(--font-display)] ${
                        active ? "text-[var(--color-walnut)]" : "text-[var(--color-ink)]"
                      }`}
                    >
                      {l.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
