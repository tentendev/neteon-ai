import type { Partner } from "@/types/content";

export const urls = {
  shop: "https://ipc.neteon.net/",
  shopMoxa: "https://shopmoxa.neteon.net/",
  iiot: "https://iiot.neteon.net/",
  ruggedEdgeAi: "https://ipc.neteon.net/rugged-edge-ai-computers/",
  shipping: "https://ipc.neteon.net/shipping-orders/",
  support: "https://neousys.neteon.net/contact/",
  warranty: "https://neousys.neteon.net/warranty/",
  blogAi: "https://neteon.ai/blog/",
  blogNet: "https://www.neteon.net/blog/",
  linkedin: "https://www.linkedin.com/company/neteon/",
  privacy: "https://neteon.net/privacy",
  mailSales: "mailto:sales@neteon.net",
  mailSupport: "mailto:support@neteon.net",
  telMain: "tel:+17325681988",
  telTollFree: "tel:+18889083330",
} as const;

export const partners: Partner[] = [
  { name: "NVIDIA" },
  { name: "Intel" },
  { name: "Moxa" },
  { name: "Neousys" },
  { name: "Innodisk" },
  { name: "Teltonika" },
  { name: "Planet" },
  { name: "Vertiv" },
];

export const statsValues = {
  years: "22+",
  devices: "1M+",
  customers: "26K+",
  support: "24/7",
} as const;

export const contactStatic = {
  phoneMain: "732-568-1988",
  phoneTollFree: "888-908-3330",
  emailSales: "sales@neteon.net",
  emailSupport: "support@neteon.net",
  corporateLine1: "1 Tower Center Blvd, Suite 1510",
  corporateLine2: "East Brunswick, NJ 08816",
  warehouseLine1: "2913 Saturn Street, Unit F",
  warehouseLine2: "Brea, CA 92821",
} as const;

export const productIcons = {
  "rugged-edge": "cpu",
  compact: "compact",
  gpu: "gpu",
  jetson: "jetson",
  networking: "network",
  storage: "storage",
} as const;

export const productHrefs = {
  "rugged-edge": urls.ruggedEdgeAi,
  compact: urls.shop,
  gpu: urls.shop,
  jetson: urls.shop,
  networking: urls.shopMoxa,
  storage: urls.shop,
} as const;

export const PRODUCT_ORDER = [
  "rugged-edge",
  "compact",
  "gpu",
  "jetson",
  "networking",
  "storage",
] as const;

export const SOLUTION_ORDER = [
  "manufacturing",
  "energy",
  "transportation",
  "datacenter",
  "oilgas",
  "renewable",
] as const;

export const SOLUTION_NUMS: Record<(typeof SOLUTION_ORDER)[number], string> = {
  manufacturing: "01",
  energy: "02",
  transportation: "03",
  datacenter: "04",
  oilgas: "05",
  renewable: "06",
};

export const EDGE_ROW_ORDER = ["rugged", "gpu", "jetson"] as const;
export const PLATFORM_ROW_ORDER = ["networking", "storage", "compact"] as const;
