"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  LOCALE_LABELS,
  SUPPORTED_LOCALES,
  hasLocale,
  type Locale,
} from "@/lib/locales";
import { ArrowDown } from "./icons";
import { cn } from "@/lib/utils";

type Props = {
  current: Locale;
  label: string;
  className?: string;
};

export function LanguageSwitcher({ current, label, className }: Props) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname() ?? "/";
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handle = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open]);

  const switchTo = (locale: Locale) => {
    setOpen(false);
    const segments = pathname.split("/");
    if (segments.length > 1 && hasLocale(segments[1])) {
      segments[1] = locale;
    } else {
      segments.splice(1, 0, locale);
    }
    const next = segments.join("/") || `/${locale}`;
    router.push(next);
  };

  return (
    <div ref={menuRef} className={cn("relative", className)}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 font-mono text-[13px] text-white/75 hover:text-white transition-colors px-2 py-1 rounded border border-white/10 hover:border-white/25"
      >
        <span className="uppercase tracking-[0.08em]">{current}</span>
        <ArrowDown width={11} height={11} />
      </button>
      {open ? (
        <ul
          role="listbox"
          className="absolute end-0 mt-2 z-50 min-w-[180px] bg-black border border-[var(--rule)] rounded-[8px] py-1 shadow-xl"
        >
          {SUPPORTED_LOCALES.map((loc) => {
            const active = loc === current;
            return (
              <li key={loc} role="option" aria-selected={active}>
                <button
                  type="button"
                  onClick={() => switchTo(loc)}
                  className={cn(
                    "w-full flex items-center justify-between gap-3 px-3 py-2 text-[13px] transition-colors",
                    active
                      ? "bg-white/5 text-[var(--accent-neteon)]"
                      : "text-white/80 hover:bg-white/5 hover:text-white",
                  )}
                >
                  <span>{LOCALE_LABELS[loc].native}</span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-white/45">
                    {loc}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
