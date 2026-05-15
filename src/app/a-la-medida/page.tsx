"use client";

import { CustomOrderForm } from "@/components/custom-order-form";
import { useLang } from "@/contexts/lang-context";
import { translations } from "@/lib/translations";

export default function ALaMedidaPage() {
  const { lang, t, contentOverrides } = useLang();
  const baseSteps = translations.custom.steps;
  const steps = baseSteps.map((s, i) => {
    const idx = i + 1;
    const tOv = contentOverrides[`custom.step${idx}_t`];
    const bOv = contentOverrides[`custom.step${idx}_b`];
    return {
      ...s,
      es: tOv || s.es,
      es_b: bOv || s.es_b,
    };
  });

  return (
    <>
      <header className="container-edge pt-12 md:pt-20 pb-12">
        <p className="eyebrow">{t("custom", "eyebrow")}</p>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(2.25rem,5.5vw,4rem)] leading-[1.04] tracking-[-0.02em] max-w-3xl">
          {t("custom", "h1a")} <span className="display-italic">{t("custom", "h1b")}</span>
        </h1>
        <p className="mt-6 max-w-xl text-[1.0625rem] text-[var(--color-ink-2)] leading-relaxed">
          {t("custom", "sub")}
        </p>
      </header>

      <section className="container-edge pb-24">
        <div className="grid gap-12 md:gap-16 md:grid-cols-12">
          <div className="md:col-span-7">
            <CustomOrderForm />
          </div>

          <aside className="md:col-span-5 md:pl-8 md:border-l md:border-[var(--color-line)]">
            <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-tight">
              {t("custom", "how_h2")}
            </h2>
            <ol className="mt-6 space-y-6">
              {steps.map((s) => (
                <li key={s.n} className="grid grid-cols-[auto_1fr] gap-5 items-baseline">
                  <span className="display-italic text-[var(--color-walnut)] text-xl">{s.n}</span>
                  <div>
                    <p className="font-[family-name:var(--font-display)] text-lg text-[var(--color-ink)]">
                      {lang === "es" ? s.es : s.en}
                    </p>
                    <p className="mt-1 text-[0.95rem] text-[var(--color-ink-muted)] leading-relaxed">
                      {lang === "es" ? s.es_b : s.en_b}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-10 p-6 rounded-sm bg-[var(--color-bone-2)] border border-[var(--color-line)]">
              <p className="eyebrow">{t("custom", "materials_h3")}</p>
              <dl className="mt-3 space-y-2 text-[0.9375rem] text-[var(--color-ink-2)]">
                <div className="flex gap-3">
                  <dt className="text-[var(--color-ink-muted)] min-w-[70px]">{t("custom", "fabrics")}</dt>
                  <dd>{t("custom", "fabrics_list")}</dd>
                </div>
                <div className="flex gap-3">
                  <dt className="text-[var(--color-ink-muted)] min-w-[70px]">{t("custom", "woods")}</dt>
                  <dd>{t("custom", "woods_list")}</dd>
                </div>
                <div className="flex gap-3">
                  <dt className="text-[var(--color-ink-muted)] min-w-[70px]">{t("custom", "tops")}</dt>
                  <dd>{t("custom", "tops_list")}</dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
