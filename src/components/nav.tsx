"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLang } from "@/contexts/lang-context";

const links = [
  { href: "/",           key: "home"      },
  { href: "/catalogo",   key: "catalog"   },
  { href: "/entregas",   key: "deliveries"},
  { href: "/a-la-medida",key: "custom"    },
  { href: "/descargas",  key: "downloads" },
  { href: "/contacto",   key: "contact"   },
] as const;

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { lang, setLang, t, darkMode, setDarkMode } = useLang();

  function toggleLang() {
    setLang(lang === "es" ? "en" : "es");
  }

  function toggleDarkMode() {
    setDarkMode(!darkMode);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header className="sticky top-0 z-50 transition-all duration-300 bg-black border-b border-black">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:bg-[#FB531F] focus:text-white focus:px-3 focus:py-1 focus:rounded"
      >
        Saltar al contenido
      </a>

      <div className="container-edge flex items-center justify-between py-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group"
          aria-label="EYK Mueblería · inicio"
        >
          <Image
            src="/productos/HDimagen/logo.PNG"
            alt="EYK Mueblería"
            width={60}
            height={60}
            className="rounded"
          />
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {links.map((l) => {
              const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
              const label = t("nav", l.key);
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={[
                      "text-[0.875rem] font-medium tracking-tight transition-colors relative py-1",
                      active
                        ? "text-[#FB531F]"
                        : "text-white hover:text-[#FB531F]",
                    ].join(" ")}
                  >
                    {label}
                    {active && (
                      <span
                        aria-hidden
                        className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-[#FB531F] rounded"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Derecha: modo oscuro + idioma + hamburguesa */}
        <div className="flex items-center gap-2">
          {/* Dark mode toggle */}
          <button
            onClick={toggleDarkMode}
            className="hidden sm:flex items-center justify-center w-11 h-11 border border-white text-white hover:border-[#FB531F] hover:text-[#FB531F] rounded-full transition-colors"
            aria-label={darkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          {/* Language toggle */}
          <button
            onClick={toggleLang}
            className="hidden sm:flex items-center gap-1 text-[0.75rem] font-bold tracking-wider border border-white text-white hover:border-[#FB531F] hover:text-[#FB531F] rounded-full px-3 py-1.5 transition-colors"
            aria-label="Cambiar idioma"
          >
            <span>{lang === "es" ? "🇨🇷" : "🇺🇸"}</span>
            {lang === "es" ? "ES" : "EN"}
          </button>

          {/* Mobile hamburger */}
          <button
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="lg:hidden flex items-center justify-center w-11 h-11 -mr-2"
          >
            <span className="relative block w-6 h-3.5">
              <span
                aria-hidden
                className={`absolute left-0 right-0 h-[2px] bg-white rounded transition-all duration-300 ${
                  open ? "top-[6px] rotate-45" : "top-0"
                }`}
              />
              <span
                aria-hidden
                className={`absolute left-0 right-0 h-[2px] bg-white rounded transition-all duration-300 ${
                  open ? "top-[6px] -rotate-45" : "bottom-0"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-[grid-template-rows] duration-300 grid ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0 bg-black border-t border-black">
          <nav aria-label="Móvil" className="container-edge pb-6 pt-2">
            <ul className="flex flex-col">
              {links.map((l) => {
                const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
                const label = t("nav", l.key);
                return (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className={`block py-3 text-xl font-[family-name:var(--font-display)] border-b border-[#333] ${
                        active ? "text-[#FB531F]" : "text-white"
                      }`}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <button
              onClick={toggleLang}
              className="mt-4 flex items-center gap-2 text-sm font-semibold text-[#666]"
            >
              {lang === "es" ? "🇺🇸 Switch to English" : "🇨🇷 Cambiar a Español"}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
