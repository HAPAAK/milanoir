/**
 * LanguageContext - Provides internationalization support.
 * Translations are split into per-language JSON files under src/locales/.
 * Only the active language is loaded (dynamic import).
 */

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import type enStrings from "@/locales/en.json";

// The English file is used as the canonical type for all translations.
export type Translations = typeof enStrings;

export type LanguageCode = "en" | "es" | "ne";

export const languages: { code: LanguageCode; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "ne", label: "नेपाली", flag: "🇳🇵" },
];

/**
 * Dynamic import map for locale files.
 * Webpack/Next.js will code-split each JSON into its own chunk.
 */
const localeLoaders: Record<LanguageCode, () => Promise<{ default: Translations }>> = {
  en: () => import("@/locales/en.json"),
  es: () => import("@/locales/es.json"),
  ne: () => import("@/locales/ne.json"),
};

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: Translations;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// English is bundled inline as the default / fallback (avoids flash of missing text).
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fallback: Translations = require("@/locales/en.json");

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<LanguageCode>("en");
  const [translations, setTranslations] = useState<Translations>(fallback);
  const [isLoading, setIsLoading] = useState(false);

  const loadTranslations = useCallback(async (lang: LanguageCode) => {
    if (lang === "en") {
      setTranslations(fallback);
      return;
    }

    setIsLoading(true);
    try {
      const mod = await localeLoaders[lang]();
      setTranslations(mod.default);
    } catch (err) {
      console.error(`Failed to load locale "${lang}", falling back to English.`, err);
      setTranslations(fallback);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const setLanguage = useCallback(
    (lang: LanguageCode) => {
      setLanguageState(lang);
      loadTranslations(lang);
    },
    [loadTranslations],
  );

  // Load initial language on mount (handles SSR hydration).
  useEffect(() => {
    loadTranslations(language);
    // Only run on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations, isLoading }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export default LanguageContext;
