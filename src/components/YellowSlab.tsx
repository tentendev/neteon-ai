import { ReactNode } from "react";

export function YellowSlab({ children }: { children: ReactNode }) {
  return (
    <section
      className="w-full"
      style={{ background: "var(--bg-slab)", color: "var(--ink)" }}
    >
      <div className="container-huge py-24 lg:py-32 flex items-center justify-center">
        <p className="max-w-4xl text-center text-[clamp(26px,3.2vw,44px)] leading-[1.1] tracking-[-0.02em] font-sans">
          {children}
        </p>
      </div>
    </section>
  );
}
