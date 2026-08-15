import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { translations } from "../i18n/translations";
import type { Lang, TranslationKey } from "../i18n/translations";
import { LanguageContext } from "./languageContextCore";

const STORAGE_KEY = "toza-mahalla-lang";

function getInitialLang(): Lang {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "uz" || stored === "ru" || stored === "en") return stored;
  return "uz";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getInitialLang);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  function setLang(next: Lang) {
    setLangState(next);
  }

  function t(key: TranslationKey): string {
    return translations[lang][key];
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}