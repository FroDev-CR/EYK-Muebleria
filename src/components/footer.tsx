"use client";

import Link from "next/link";
import { CONTACT, CATEGORY_GROUPS } from "@/lib/data";
import { useLang } from "@/contexts/lang-context";
import type { CategoryId } from "@/lib/data";

export function Footer() {
  const { lang, t } = useLang();

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
                  href={`https://wa.me/${CONTACT.whatsapp.replace(/\D/g, "")}`}
                  className="hover:text-[#FB531F] transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp · {CONTACT.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT.email}`} className="hover:text-[#FB531F] transition-colors">
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a
                  href={`https://instagram.com/${CONTACT.instagram}`}
                  className="hover:text-[#FB531F] transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram · @{CONTACT.instagram}
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
            <div className="flex items-center justify-center rounded-md border border-[#e0e0e0] bg-white px-2 py-1.5" title="Visa">
              <svg width="46" height="16" viewBox="0 0 46 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Visa">
                <path d="M18.5 1L15 15H11.8L15.3 1H18.5Z" fill="#1A1F71"/>
                <path d="M30.4 1.3C29.7 1 28.6 0.8 27.2 0.8C23.7 0.8 21.2 2.6 21.2 5.2C21.2 7.1 22.9 8.1 24.2 8.7C25.5 9.3 25.9 9.7 25.9 10.3C25.9 11.2 24.8 11.6 23.8 11.6C22.4 11.6 21.7 11.4 20.5 10.9L20.1 10.7L19.6 13.6C20.5 14 22 14.4 23.6 14.4C27.3 14.4 29.7 12.6 29.7 9.8C29.7 8.3 28.8 7.2 26.9 6.3C25.7 5.7 25 5.3 25 4.7C25 4.1 25.7 3.5 27.2 3.5C28.4 3.5 29.3 3.8 30 4L30.4 4.2L30.9 1.4L30.4 1.3Z" fill="#1A1F71"/>
                <path d="M35.2 1H32.7C31.9 1 31.3 1.2 31 2L26 15H29.7L30.4 13H34.9L35.3 15H38.6L35.2 1ZM31.3 10.4C31.6 9.6 32.8 6.3 32.8 6.3C32.8 6.3 33.1 5.4 33.3 4.9L33.6 6.1C33.6 6.1 34.4 9.6 34.6 10.4H31.3Z" fill="#1A1F71"/>
                <path d="M11.4 1L7.9 10.3L7.5 8.6C6.8 6.4 4.7 4 2.3 2.8L5.5 15H9.2L15.1 1H11.4Z" fill="#1A1F71"/>
                <path d="M4.2 1H0.2L0.1 1.2C3.2 1.9 5.3 3.6 6.2 5.7L5.2 2.1C5 1.3 4.7 1 4.2 1Z" fill="#F9A51A"/>
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
