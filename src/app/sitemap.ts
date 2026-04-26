import type { MetadataRoute } from "next";
import { locales, htmlLang } from "@/i18n/config";

const BASE_URL = "https://neteon.ai";

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((lang) => ({
    url: `${BASE_URL}/${lang}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: lang === "en" ? 1.0 : 0.8,
    alternates: {
      languages: Object.fromEntries(
        locales.map((l) => [htmlLang[l], `${BASE_URL}/${l}`])
      ),
    },
  }));
}
