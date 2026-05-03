"use client";

import { CONTACT, whatsappLink } from "@/lib/data";
import { useEffect, useState } from "react";

export function WhatsAppFloat() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={whatsappLink("Hola, vengo del sitio web. Me interesa cotizar un mueble.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Contactar por WhatsApp al ${CONTACT.phone}`}
      className={`fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[oklch(0.55_0.16_145)] text-white shadow-[0_8px_30px_-8px_oklch(0.55_0.16_145/0.55)] transition-all duration-300 ${
        show ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0 pointer-events-none"
      }`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.057 22h-.005c-1.92-.001-3.804-.515-5.45-1.488l-.39-.232-4.052 1.063 1.082-3.95-.255-.404a9.95 9.95 0 01-1.524-5.31C1.466 6.252 6.108 1.61 11.86 1.61c2.847 0 5.522 1.108 7.535 3.122 2.012 2.014 3.121 4.689 3.12 7.535-.003 5.751-4.645 10.392-10.396 10.392zm8.835-19.222C18.687.59 16.135-.012 13.482 0 6.792.012 1.36 5.444 1.348 12.135a11.87 11.87 0 001.594 5.953L1 24l6.062-1.59a11.93 11.93 0 005.71 1.453h.005c6.69-.012 12.123-5.443 12.135-12.135a12.04 12.04 0 00-3.02-7.95z" />
      </svg>
      <span className="text-sm font-medium hidden sm:inline">Cotizar por WhatsApp</span>
    </a>
  );
}
