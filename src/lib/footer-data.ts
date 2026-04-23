import type { Dictionary } from "@/types/dictionary";
import { urls } from "./neteon-data";

export function buildFooterColumns(dict: Dictionary) {
  return [
    {
      title: dict.footer.columns.products.title,
      links: [
        { label: dict.footer.columns.products.links.rugged, href: urls.ruggedEdgeAi, external: true },
        { label: dict.footer.columns.products.links.compact, href: urls.shop, external: true },
        { label: dict.footer.columns.products.links.gpu, href: urls.shop, external: true },
        { label: dict.footer.columns.products.links.jetson, href: urls.shop, external: true },
      ],
    },
    {
      title: dict.footer.columns.shop.title,
      links: [
        { label: dict.footer.columns.shop.links.ipc, href: urls.shop, external: true },
        { label: dict.footer.columns.shop.links.moxa, href: urls.shopMoxa, external: true },
        { label: dict.footer.columns.shop.links.iiot, href: urls.iiot, external: true },
      ],
    },
    {
      title: dict.footer.columns.resources.title,
      links: [
        { label: dict.footer.columns.resources.links.shipping, href: urls.shipping, external: true },
        { label: dict.footer.columns.resources.links.support, href: urls.support, external: true },
        { label: dict.footer.columns.resources.links.warranty, href: urls.warranty, external: true },
        { label: dict.footer.columns.resources.links.blogAi, href: urls.blogAi, external: true },
        { label: dict.footer.columns.resources.links.blogNet, href: urls.blogNet, external: true },
      ],
    },
    {
      title: dict.footer.columns.company.title,
      links: [
        { label: dict.footer.columns.company.links.why, href: "/#why" },
        { label: dict.footer.columns.company.links.contact, href: "/#contact" },
        { label: dict.footer.columns.company.links.linkedin, href: urls.linkedin, external: true },
      ],
    },
  ];
}
