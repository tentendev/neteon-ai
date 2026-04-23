"use client";

import { useState } from "react";
import { urls } from "@/lib/neteon-data";
import type { Locale } from "@/lib/locales";
import { ArrowDown, Menu, Close, NeteonWordmark } from "./icons";
import { NTButton } from "./Buttons";
import { QuoteTrigger } from "./QuoteTrigger";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { cn } from "@/lib/utils";

const isExternal = (href: string) => /^https?:\/\//.test(href);

type NavLabels = {
  products: string;
  solutions: string;
  why: string;
  contact: string;
  blog: string;
  shopCta: string;
  quoteCta: string;
  languageLabel: string;
  openMenu: string;
  closeMenu: string;
};

type Props = {
  labels: NavLabels;
  locale: Locale;
};

export function Nav({ labels, locale }: Props) {
  const [open, setOpen] = useState(false);

  const items = [
    { label: labels.products, href: "#products", hasDropdown: true },
    { label: labels.solutions, href: "#solutions", hasDropdown: true },
    { label: labels.why, href: "#why" },
    { label: labels.contact, href: "#contact" },
    { label: labels.blog, href: urls.blogAi },
  ];

  return (
    <nav className="sticky top-0 z-[1000] w-full bg-black/70 backdrop-blur-md">
      <div className="container-huge h-16 flex items-center justify-between gap-6">
        <a href={`/${locale}`} aria-label="Neteon home" className="flex items-center text-white">
          <NeteonWordmark height={18} className="h-[18px] w-auto text-white" />
        </a>

        <ul className="hidden lg:flex items-center gap-7 text-[14px] text-white/80 font-mono">
          {items.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                {...(isExternal(item.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="inline-flex items-center gap-1 hover:text-white transition-colors"
              >
                {item.label}
                {item.hasDropdown && <ArrowDown width={12} height={12} />}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-2">
          <LanguageSwitcher current={locale} label={labels.languageLabel} />
          <NTButton variant="ghost" href={urls.shop} external withArrow>{labels.shopCta}</NTButton>
          <QuoteTrigger variant="primary" withArrow>{labels.quoteCta}</QuoteTrigger>
        </div>

        <div className="lg:hidden flex items-center gap-2">
          <LanguageSwitcher current={locale} label={labels.languageLabel} />
          <button
            type="button"
            aria-label={open ? labels.closeMenu : labels.openMenu}
            className="text-white p-2"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "lg:hidden overflow-hidden border-t border-[var(--rule)] transition-[max-height,opacity] duration-300",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="container-huge py-4 flex flex-col gap-3 text-white font-mono text-[15px]">
          {items.map((item) => (
            <a
              key={item.label}
              href={item.href}
              {...(isExternal(item.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              onClick={() => setOpen(false)}
              className="py-1"
            >
              {item.label}
            </a>
          ))}
          <div className="flex gap-2 pt-2">
            <NTButton variant="ghost" href={urls.shop} external withArrow>{labels.shopCta}</NTButton>
            <QuoteTrigger variant="primary" withArrow>{labels.quoteCta}</QuoteTrigger>
          </div>
        </div>
      </div>
    </nav>
  );
}
