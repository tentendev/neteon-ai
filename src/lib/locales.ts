export const SUPPORTED_LOCALES = [
  "en",
  "es",
  "fr",
  "de",
  "ja",
  "zh",
  "ko",
  "pt",
  "ar",
] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_LABELS: Record<Locale, { native: string; english: string }> = {
  en: { native: "English", english: "English" },
  es: { native: "Español", english: "Spanish" },
  fr: { native: "Français", english: "French" },
  de: { native: "Deutsch", english: "German" },
  ja: { native: "日本語", english: "Japanese" },
  zh: { native: "繁體中文", english: "Chinese" },
  ko: { native: "한국어", english: "Korean" },
  pt: { native: "Português", english: "Portuguese" },
  ar: { native: "العربية", english: "Arabic" },
};

const RTL_LOCALES: ReadonlySet<Locale> = new Set<Locale>(["ar"]);

export const isRtl = (locale: Locale): boolean => RTL_LOCALES.has(locale);

export const hasLocale = (locale: string): locale is Locale =>
  (SUPPORTED_LOCALES as readonly string[]).includes(locale);
