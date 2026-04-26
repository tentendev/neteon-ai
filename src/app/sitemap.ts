import type { MetadataRoute } from "next";
import { SUPPORTED_LOCALES } from "@/lib/locales";

const BASE_URL = "https://neteon.ai";

const hreflang: Record<(typeof SUPPORTED_LOCALES)[number], string> = {
  en: "en",
  es: "es",
  fr: "fr",
  de: "de",
  ja: "ja",
  zh: "zh-Hant",
  ko: "ko",
  pt: "pt-BR",
  ar: "ar",
};

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const languages = Object.fromEntries(
    SUPPORTED_LOCALES.map((l) => [hreflang[l], `${BASE_URL}/${l}`])
  );

  return SUPPORTED_LOCALES.flatMap((lang) => [
    {
      url: `${BASE_URL}/${lang}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: lang === "en" ? 1.0 : 0.8,
      alternates: { languages },
    },
    {
      url: `${BASE_URL}/${lang}/privacy`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/${lang}/cookies`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
  ]);
}
