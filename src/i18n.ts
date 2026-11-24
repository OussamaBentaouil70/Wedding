import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import fr from './locales/fr.json';
import es from './locales/es.json';
import de from './locales/de.json';
import it from './locales/it.json';
import nl from './locales/nl.json';

export const SUPPORTED_LANGUAGES = ['en', 'fr', 'es', 'de', 'it', 'nl'] as const;

type Json = Record<string, unknown> | unknown[];

// Each translation is layered over English: anything missing (image paths, icons,
// untranslated strings) falls back to the English value. Arrays merge item by item.
function mergeOver(base: unknown, override: unknown): unknown {
  if (override === undefined || override === null) return base;
  if (Array.isArray(base) && Array.isArray(override)) {
    const length = Math.max(base.length, override.length);
    return Array.from({ length }, (_, i) => mergeOver(base[i], override[i]));
  }
  if (base && override && typeof base === 'object' && typeof override === 'object' && !Array.isArray(base)) {
    const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
    for (const [key, value] of Object.entries(override as Record<string, unknown>)) {
      out[key] = mergeOver((base as Record<string, unknown>)[key], value);
    }
    return out;
  }
  return override;
}

const withEnglish = (lang: Json) => mergeOver(en, lang) as Record<string, unknown>;

const resources = {
  en: { translation: en },
  fr: { translation: withEnglish(fr) },
  es: { translation: withEnglish(es) },
  de: { translation: withEnglish(de) },
  it: { translation: withEnglish(it) },
  nl: { translation: withEnglish(nl) },
};

const readStoredLanguage = (): string => {
  try {
    const stored = localStorage.getItem('app_lang');
    if (stored && (SUPPORTED_LANGUAGES as readonly string[]).includes(stored)) return stored;
  } catch {
    // storage unavailable
  }
  return 'en';
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: readStoredLanguage(),
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

document.documentElement.lang = i18n.language;

i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng;
  try {
    localStorage.setItem('app_lang', lng);
  } catch {
    // storage unavailable
  }
});

export default i18n;
