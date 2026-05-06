"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { Lang, Translations } from "@/lib/translations";
import { translations, t as translate } from "@/lib/translations";

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
}

const LangContext = createContext<LangContextValue>({
  lang: "es",
  setLang: () => {},
  t: () => "",
  darkMode: false,
  setDarkMode: () => {},
  contentOverrides: {},
  setContentOverrides: () => {},
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
    fetch("/api/site-content")
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

  return (
    <LangContext.Provider value={{ lang, setLang, t, darkMode, setDarkMode, contentOverrides, setContentOverrides }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang(): LangContextValue {
  return useContext(LangContext);
}
