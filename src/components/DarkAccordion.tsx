"use client";

import { useState } from "react";
import type { AccordionRow } from "@/types/content";
import { ArrowDown } from "./icons";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow: string;
  rows: AccordionRow[];
  illustration?: "wireframe-cloud" | "wireframe-rack";
};

export function DarkAccordion({ eyebrow, rows, illustration = "wireframe-cloud" }: Props) {
  const [openId, setOpenId] = useState<string | null>(rows[0]?.id ?? null);

  return (
    <section className="bg-black text-white">
      <div className="container-huge py-24 lg:py-28 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left column: eyebrow + illustration */}
        <aside className="lg:col-span-4">
          <p className="font-mono text-[14px] leading-[1.2] text-[var(--accent-neteon)]">
            {eyebrow.split(" ").map((word, i, arr) => (
              <span key={i}>
                {word}
                {i < arr.length - 1 ? <br /> : null}
              </span>
            ))}
          </p>
          <div className="hidden lg:block mt-10">
            {illustration === "wireframe-cloud" ? <WireCloud /> : <WireRack />}
          </div>
        </aside>

        {/* Right column: accordion rows */}
        <div className="lg:col-span-8">
          <ul className="divide-y divide-[var(--rule)] border-y border-[var(--rule)]">
            {rows.map((row) => {
              const isOpen = openId === row.id;
              return (
                <li key={row.id}>
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? null : row.id)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 py-7 text-left group"
                  >
                    <span className="font-sans text-[clamp(28px,3.4vw,44px)] tracking-[-0.02em] leading-[1.05] text-white group-hover:text-[var(--accent-neteon)] transition-colors">
                      {row.title}
                    </span>
                    <span
                      className={cn(
                        "shrink-0 text-white/70 transition-transform duration-300",
                        isOpen ? "rotate-180 text-[var(--accent-neteon)]" : ""
                      )}
                    >
                      <ArrowDown width={28} height={28} />
                    </span>
                  </button>
                  <div
                    className={cn(
                      "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
                      isOpen ? "grid-rows-[1fr] opacity-100 pb-7" : "grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-2xl text-white/70 text-[16px] leading-[24px]">
                        {row.body}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

function WireCloud() {
  return (
    <svg
      viewBox="0 0 240 200"
      fill="none"
      stroke="var(--accent-neteon)"
      strokeWidth="1"
      aria-hidden="true"
      className="w-full h-auto"
    >
      {/* Cloud outline, isometric feel */}
      <path d="M60 80 Q60 58 82 58 Q90 42 110 42 Q134 42 140 62 Q164 62 164 82 Q164 100 144 100 L80 100 Q60 100 60 80 Z" />
      <path d="M66 86 Q66 70 84 70 Q92 56 108 56 Q128 56 134 74 Q156 74 156 88" opacity="0.6" />
      {/* Rain dots */}
      <circle cx="92" cy="112" r="1.5" fill="var(--accent-neteon)" />
      <circle cx="112" cy="112" r="1.5" fill="var(--accent-neteon)" />
      <circle cx="132" cy="112" r="1.5" fill="var(--accent-neteon)" />
      {/* Chip base (isometric) */}
      <path d="M50 160 L120 130 L200 160 L130 190 Z" />
      <path d="M80 152 L120 136 L168 152 L130 168 Z" opacity="0.7" />
      <circle cx="124" cy="152" r="2" fill="var(--accent-neteon)" />
      {/* Pins */}
      <path d="M60 165 L48 170 M80 172 L68 177 M160 168 L172 173 M180 160 L192 165" />
    </svg>
  );
}

function WireRack() {
  return (
    <svg
      viewBox="0 0 240 200"
      fill="none"
      stroke="var(--accent-neteon)"
      strokeWidth="1"
      aria-hidden="true"
      className="w-full h-auto"
    >
      <rect x="56" y="36" width="128" height="130" rx="3" />
      <line x1="56" y1="66" x2="184" y2="66" />
      <line x1="56" y1="94" x2="184" y2="94" />
      <line x1="56" y1="122" x2="184" y2="122" />
      <line x1="56" y1="150" x2="184" y2="150" />
      {[48, 76, 104, 132].map((y) => (
        <g key={y}>
          <circle cx="68" cy={y} r="2" fill="var(--accent-neteon)" />
          <circle cx="80" cy={y} r="2" fill="var(--accent-neteon)" />
          <rect x="96" y={y - 4} width="72" height="8" opacity="0.4" />
        </g>
      ))}
      <path d="M56 170 L184 170 L200 180 L40 180 Z" opacity="0.5" />
    </svg>
  );
}
