"use client";

import { useState } from "react";
import { urls } from "@/lib/neteon-data";
import { Close, ArrowRight } from "./icons";

type Props = {
  text: string;
  ctaLabel: string;
};

export function Announcement({ text, ctaLabel }: Props) {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  return (
    <div
      className="relative w-full font-sans"
      style={{ background: "var(--bg-banner)", height: 40 }}
    >
      <div className="container-huge h-full flex items-center justify-center gap-3 text-white text-[14px]">
        <span className="hidden sm:inline">{text}</span>
        <a
          href={urls.shop}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-sans text-[14px] text-[var(--accent-neteon)] hover:underline"
        >
          {ctaLabel}
          <ArrowRight width={14} height={14} />
        </a>
      </div>
      <button
        type="button"
        aria-label="Dismiss announcement"
        onClick={() => setOpen(false)}
        className="absolute end-0 top-0 h-10 w-14 grid place-items-center text-white/80 hover:text-white"
      >
        <Close width={16} height={16} />
      </button>
    </div>
  );
}
