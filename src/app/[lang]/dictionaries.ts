import "server-only";
import type { Dictionary } from "@/types/dictionary";
import type { Locale } from "@/lib/locales";

const dictionaries = {
  en: () => import("./dictionaries/en.json").then((m) => m.default as Dictionary),
  es: () => import("./dictionaries/es.json").then((m) => m.default as Dictionary),
  fr: () => import("./dictionaries/fr.json").then((m) => m.default as Dictionary),
  de: () => import("./dictionaries/de.json").then((m) => m.default as Dictionary),
  ja: () => import("./dictionaries/ja.json").then((m) => m.default as Dictionary),
  zh: () => import("./dictionaries/zh.json").then((m) => m.default as Dictionary),
  ko: () => import("./dictionaries/ko.json").then((m) => m.default as Dictionary),
  pt: () => import("./dictionaries/pt.json").then((m) => m.default as Dictionary),
  ar: () => import("./dictionaries/ar.json").then((m) => m.default as Dictionary),
} satisfies Record<Locale, () => Promise<Dictionary>>;

export const getDictionary = async (locale: Locale): Promise<Dictionary> =>
  dictionaries[locale]();
