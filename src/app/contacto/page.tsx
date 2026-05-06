"use client";

import { useLang } from "@/contexts/lang-context";
import { CONTACT, whatsappLink } from "@/lib/data";
import { translations } from "@/lib/translations";

export default function ContactoPage() {
  const { lang, t } = useLang();
  const faqItems = translations.contact.faq;

  return (
    <section className="container-edge pt-12 md:pt-20 pb-24">
      <div className="grid gap-16 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="eyebrow">{t("contact", "eyebrow")}</p>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05] tracking-[-0.02em]">
            {t("contact", "h1")}
          </h1>
          <p className="mt-6 max-w-xl text-[1.0625rem] text-[var(--color-ink-2)] leading-relaxed">
            {t("contact", "sub")}
          </p>

          <div className="mt-12 grid gap-px bg-[var(--color-line)] border border-[var(--color-line)]">
            <a
              href={whatsappLink("Hola EYK 👋")}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[var(--color-bone)] hover:bg-[var(--color-bone-2)] p-6 md:p-8 grid grid-cols-[1fr_auto] gap-4 items-baseline transition-colors"
            >
              <div>
                <p className="eyebrow">{t("contact", "whatsapp")}</p>
                <p className="mt-2 font-[family-name:var(--font-display)] text-2xl text-[var(--color-ink)]">
                  {CONTACT.phone}
                </p>
                <p className="mt-1 text-sm text-[var(--color-ink-muted)]">
                  {t("contact", "whatsapp_sub")}
                </p>
              </div>
              <span aria-hidden className="text-[var(--color-walnut)]">
                →
              </span>
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className="bg-[var(--color-bone)] hover:bg-[var(--color-bone-2)] p-6 md:p-8 grid grid-cols-[1fr_auto] gap-4 items-baseline transition-colors"
            >
              <div>
                <p className="eyebrow">{t("contact", "email")}</p>
                <p className="mt-2 font-[family-name:var(--font-display)] text-2xl text-[var(--color-ink)]">
                  {CONTACT.email}
                </p>
                <p className="mt-1 text-sm text-[var(--color-ink-muted)]">{t("contact", "email_sub")}</p>
              </div>
              <span aria-hidden className="text-[var(--color-walnut)]">
                →
              </span>
            </a>
            <a
              href={`https://instagram.com/${CONTACT.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[var(--color-bone)] hover:bg-[var(--color-bone-2)] p-6 md:p-8 grid grid-cols-[1fr_auto] gap-4 items-baseline transition-colors"
            >
              <div>
                <p className="eyebrow">{t("contact", "instagram")}</p>
                <p className="mt-2 font-[family-name:var(--font-display)] text-2xl text-[var(--color-ink)]">
                  @{CONTACT.instagram}
                </p>
                <p className="mt-1 text-sm text-[var(--color-ink-muted)]">{t("contact", "insta_sub")}</p>
              </div>
              <span aria-hidden className="text-[var(--color-walnut)]">
                →
              </span>
            </a>
          </div>
        </div>

        <aside className="md:col-span-5 md:pl-8 md:border-l md:border-[var(--color-line)]">
          <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-tight">
            {t("contact", "faq_h2")}
          </h2>
          <dl className="mt-8 space-y-7">
            {faqItems.map((f, i) => (
              <div key={i}>
                <dt className="font-[family-name:var(--font-display)] text-lg text-[var(--color-ink)]">
                  {lang === "es" ? f.es : f.en}
                </dt>
                <dd className="mt-1.5 text-[var(--color-ink-muted)] text-[0.95rem] leading-relaxed">
                  {lang === "es" ? f.es_a : f.en_a}
                </dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </section>
  );
}
