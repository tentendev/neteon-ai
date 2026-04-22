"use client";

import type { ReactNode } from "react";
import { useQuoteModal } from "./QuoteFormProvider";
import { ArrowRight } from "./icons";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "secondary";

const base =
  "inline-flex items-center gap-2 font-mono text-[14px] leading-none rounded-[4px] px-3 h-8 transition-[background-color,color,border-radius] duration-[250ms] select-none whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--accent-neteon)] text-[var(--ink)] hover:bg-[var(--accent-neteon-hover)] hover:rounded-[8px]",
  ghost:
    "bg-transparent text-white border border-white hover:bg-white hover:text-[var(--ink)] hover:rounded-[8px]",
  secondary:
    "bg-[#e8e8e8] text-[var(--ink)] hover:bg-white hover:rounded-[8px]",
};

type Props = {
  variant?: Variant;
  withArrow?: boolean;
  className?: string;
  children: ReactNode;
};

export function QuoteTrigger({ variant = "primary", withArrow = false, className, children }: Props) {
  const { open } = useQuoteModal();
  return (
    <button
      type="button"
      onClick={open}
      className={cn(base, variants[variant], className)}
    >
      <span>{children}</span>
      {withArrow ? <ArrowRight width={14} height={14} /> : null}
    </button>
  );
}
