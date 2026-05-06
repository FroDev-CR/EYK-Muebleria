"use client";

import { Reveal } from "@/components/reveal";
import { useLang } from "@/contexts/lang-context";
import { translations } from "@/lib/translations";

export default function DescargasPage() {
  const { lang, t } = useLang();
  const downloads = translations.downloads.files;

  return (
    <>
      <header className="container-edge pt-12 md:pt-20 pb-10 md:pb-14">
        <Reveal>
          <p className="eyebrow flex items-center gap-3">
            <span aria-hidden className="inline-block w-8 h-px bg-[#FB531F]" />
            {t("downloads", "eyebrow")}
          </p>
          <h1 className="mt-5 font-[family-name:var(--font-display)] text-[clamp(2.25rem,5.5vw,4rem)] leading-[1.04] tracking-[-0.02em]">
            {t("downloads", "h1a")}{" "}
            <span className="display-italic text-[#FB531F]">{t("downloads", "h1b")}</span>
          </h1>
          <p className="mt-5 max-w-2xl text-[1.0625rem] text-[#555] leading-relaxed">
            {t("downloads", "sub")}
          </p>
        </Reveal>
      </header>

      <section className="container-edge pb-16 md:pb-24">
        <div className="grid gap-5 sm:grid-cols-2 max-w-3xl">
          {downloads.map((d, i) => (
            <Reveal key={i} delay={i * 100}>
              <a
                href={i === 0 ? "/catalaogos/EYK_Catálogo2025.pdf.pdf" : "/catalaogos/CATÁLOGO_TEXILES_2026.pdf"}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-white border border-[#e5e5e5] hover:border-[#FB531F] rounded-xl p-7 transition-all hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <span className="text-4xl">{i === 0 ? "📖" : "🎨"}</span>
                  <span className="bg-[#fde3d9] text-[#FB531F] text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full">
                    PDF
                  </span>
                </div>
                <h2 className="font-[family-name:var(--font-display)] text-xl text-[#111] mb-2 group-hover:text-[#FB531F] transition-colors">
                  {lang === "es" ? d.es_title : d.en_title}
                </h2>
                <p className="text-[0.875rem] text-[#666] leading-relaxed mb-4">
                  {lang === "es" ? d.es_desc : d.en_desc}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#999]">{lang === "es" ? d.es_size : d.en_size}</span>
                  <span className="flex items-center gap-1.5 text-sm font-semibold text-[#FB531F] group-hover:gap-2.5 transition-all">
                    {t("downloads", "download")}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="7 10 12 15 17 10"/>
                      <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        {/* Info */}
        <Reveal delay={200}>
          <div className="mt-12 max-w-3xl bg-[#f8f8f8] border border-[#e5e5e5] rounded-xl p-6">
            <h3 className="font-semibold text-[#111] mb-3">{t("downloads", "how_h3")}</h3>
            <ul className="space-y-2 text-sm text-[#555]">
              {translations.downloads.steps.map((step, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-[#FB531F] font-bold mt-0.5">→</span>
                  {lang === "es" ? step.es : step.en}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>
    </>
  );
}
