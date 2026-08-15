import { createContext } from "react";
import type { Lang, TranslationKey } from "../i18n/translations";

export interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TranslationKey) => string;
}

export const LanguageContext = createContext<LanguageContextValue | null>(null);