"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { Dictionary } from "@/types/dictionary";
import { QuoteModal } from "./QuoteModal";

type Ctx = { open: () => void; close: () => void };
const QuoteContext = createContext<Ctx | null>(null);

export function useQuoteModal(): Ctx {
  const ctx = useContext(QuoteContext);
  if (!ctx) throw new Error("useQuoteModal must be used within QuoteFormProvider");
  return ctx;
}

type Props = {
  copy: Dictionary["quote"];
  children: ReactNode;
};

export function QuoteFormProvider({ copy, children }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <QuoteContext.Provider value={{ open: () => setIsOpen(true), close: () => setIsOpen(false) }}>
      {children}
      {isOpen ? <QuoteModal copy={copy} onClose={() => setIsOpen(false)} /> : null}
    </QuoteContext.Provider>
  );
}
