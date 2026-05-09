"use client";

import Link from "next/link";
import { CATEGORY_GROUPS } from "@/lib/data";
import { useLang } from "@/contexts/lang-context";
import type { CategoryId } from "@/lib/data";

export function Footer() {
  const { lang, t, contact } = useLang();

  return (
    <footer className="mt-32 border-t border-[#e5e5e5] bg-[#f8f8f8]">
      <div className="container-edge py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5">
              <div className="bg-[#FB531F] text-white font-bold text-xl px-3 py-1 rounded leading-none">
                EYK
              </div>
              <span className="display-italic text-sm text-[#777]">mueblería</span>
            </div>
            <p className="mt-4 max-w-md text-[#444] text-[0.95rem] leading-relaxed">
              {t("footer", "tagline")}
            </p>
          </div>

          <div className="md:col-span-3">
            <h2 className="text-[0.75rem] font-bold tracking-[0.18em] uppercase text-[#FB531F] mb-4">
              {t("footer", "catalog")}
            </h2>
            <ul className="space-y-2.5">
              {CATEGORY_GROUPS.map((g) => (
                <li key={g.id}>
                  <Link
                    href={`/catalogo?grupo=${g.id}`}
                    className="text-[#444] hover:text-[#FB531F] text-[0.95rem] transition-colors"
                  >
                    {t("categories", g.id as CategoryId)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h2 className="text-[0.75rem] font-bold tracking-[0.18em] uppercase text-[#FB531F] mb-4">
              {t("footer", "contact")}
            </h2>
            <ul className="space-y-3 text-[0.95rem] text-[#444]">
              <li>
                <a
                  href={`https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`}
                  className="hover:text-[#FB531F] transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp · {contact.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className="hover:text-[#FB531F] transition-colors">
                  {contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`https://instagram.com/${contact.instagram}`}
                  className="hover:text-[#FB531F] transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram · @{contact.instagram}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment methods */}
        <div className="mt-12 pt-6 border-t border-[#e5e5e5]">
          <p className="text-[0.7rem] font-bold tracking-[0.15em] uppercase text-[#aaa] mb-3">
            {lang === "es" ? "Métodos de pago" : "Payment methods"}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            {/* Visa */}
            <div className="flex items-center justify-center rounded-md border border-[#e0e0e0] bg-[#1A1F71] px-3 py-1.5" title="Visa">
              <svg width="42" height="14" viewBox="0 0 42 14" xmlns="http://www.w3.org/2000/svg" aria-label="Visa">
                <text x="21" y="13" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold" fontStyle="italic" fontFamily="Arial, Helvetica, sans-serif" letterSpacing="1">VISA</text>
              </svg>
            </div>

            {/* Mastercard */}
            <div className="flex items-center justify-center rounded-md border border-[#e0e0e0] bg-white px-2.5 py-1.5" title="Mastercard">
              <svg width="34" height="22" viewBox="0 0 34 22" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Mastercard">
                <circle cx="13" cy="11" r="9" fill="#EB001B"/>
                <circle cx="21" cy="11" r="9" fill="#F79E1B" opacity="0.88"/>
              </svg>
            </div>

            {/* Financing */}
            <div className="flex items-center gap-1.5 text-[0.8rem] text-[#666]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#FB531F]">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                <line x1="1" y1="10" x2="23" y2="10"/>
              </svg>
              <span>{lang === "es" ? "Financiamiento disponible · Consulte condiciones" : "Financing available · Ask for terms"}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-[#e5e5e5] flex flex-col md:flex-row gap-4 md:items-end md:justify-between">
          <p className="text-xs text-[#999]">
            © {new Date().getFullYear()} EYK Mueblería. {t("footer", "rights")}
          </p>
          <p className="display-italic text-sm text-[#777]">
            {t("footer", "handmade")}
          </p>
        </div>
      </div>
    </footer>
  );
}
