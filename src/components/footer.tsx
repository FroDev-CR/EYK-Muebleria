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

        <div className="mt-16 pt-6 border-t border-[#e5e5e5] flex flex-col md:flex-row gap-4 md:items-end md:justify-between">
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
