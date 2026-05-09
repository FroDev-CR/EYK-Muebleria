"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { Lang, Translations } from "@/lib/translations";
import { translations, t as translate } from "@/lib/translations";
import { CONTACT } from "@/lib/data";

export interface FaqItem {
  es: string;
  en: string;
  es_a: string;
  en_a: string;
}

export interface ContactInfo {
  whatsapp: string;
  phone: string;
  email: string;
  instagram: string;
}

interface LangContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: <Section extends keyof Translations, Key extends keyof Translations[Section]>(
    section: Section,
    key: Key
  ) => string;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  contentOverrides: Record<string, string>;
  setContentOverrides: (overrides: Record<string, string>) => void;
  contact: ContactInfo;
  whatsappLink: (message: string) => string;
  faq: FaqItem[];
}

const defaultContact: ContactInfo = {
  whatsapp: CONTACT.whatsapp,
  phone: CONTACT.phone,
  email: CONTACT.email,
  instagram: CONTACT.instagram,
};

const defaultFaq = translations.contact.faq as unknown as FaqItem[];

const LangContext = createContext<LangContextValue>({
  lang: "es",
  setLang: () => {},
  t: () => "",
  darkMode: false,
  setDarkMode: () => {},
  contentOverrides: {},
  setContentOverrides: () => {},
  contact: defaultContact,
  whatsappLink: (m: string) =>
    `https://wa.me/${defaultContact.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(m)}`,
  faq: defaultFaq,
});

export function LangProvider({
  children,
  initialLang = "es",
}: {
  children: React.ReactNode;
  initialLang?: Lang;
}) {
  const [lang, setLangState] = useState<Lang>(initialLang);
  const [darkMode, setDarkModeState] = useState<boolean>(false);
  const [contentOverrides, setContentOverrides] = useState<Record<string, string>>({});

  useEffect(() => {
    // Sync from localStorage on mount
    const stored = localStorage.getItem("eyk_lang") as Lang | null;
    if (stored === "es" || stored === "en") setLangState(stored);

    const storedDark = localStorage.getItem("eyk_darkMode");
    if (storedDark === "true") {
      setDarkModeState(true);
      document.documentElement.classList.add("dark");
    }

    // Load site content overrides
    fetch("/api/site-content", { cache: "no-store" })
      .then((r) => r.json())
      .then((data: Record<string, string>) => setContentOverrides(data))
      .catch(() => {});

    // Listen for changes from the nav toggle
    const handler = (e: Event) => {
      const l = (e as CustomEvent<Lang>).detail;
      if (l === "es" || l === "en") setLangState(l);
    };
    window.addEventListener("eyk_lang", handler);
    return () => window.removeEventListener("eyk_lang", handler);
  }, []);

  function setLang(l: Lang) {
    setLangState(l);
    localStorage.setItem("eyk_lang", l);
    window.dispatchEvent(new CustomEvent("eyk_lang", { detail: l }));
  }

  function setDarkMode(dark: boolean) {
    setDarkModeState(dark);
    localStorage.setItem("eyk_darkMode", dark.toString());
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }

  const t = <Section extends keyof Translations, Key extends keyof Translations[Section]>(
    section: Section,
    key: Key
  ): string => {
    // Spanish overrides take priority over translations.ts
    if (lang === "es") {
      const override = contentOverrides[`${section}.${String(key)}`];
      if (override) return override;
    }
    return translate(section, key, lang);
  };

  const contact: ContactInfo = {
    whatsapp: contentOverrides["contact.whatsapp_value"] || CONTACT.whatsapp,
    phone: contentOverrides["contact.phone_value"] || CONTACT.phone,
    email: contentOverrides["contact.email_value"] || CONTACT.email,
    instagram: contentOverrides["contact.instagram_value"] || CONTACT.instagram,
  };

  const whatsappLink = (message: string): string => {
    const w = contact.whatsapp.replace(/\D/g, "");
    return `https://wa.me/${w}?text=${encodeURIComponent(message)}`;
  };

  let faq: FaqItem[] = defaultFaq;
  const faqRaw = contentOverrides["contact.faq_json"];
  if (faqRaw) {
    try {
      const parsed = JSON.parse(faqRaw);
      if (Array.isArray(parsed)) faq = parsed as FaqItem[];
    } catch {
      // ignore malformed override
    }
  }

  return (
    <LangContext.Provider
      value={{
        lang,
        setLang,
        t,
        darkMode,
        setDarkMode,
        contentOverrides,
        setContentOverrides,
        contact,
        whatsappLink,
        faq,
      }}
    >
      {children}
    </LangContext.Provider>
  );
}

export function useLang(): LangContextValue {
  return useContext(LangContext);
}
