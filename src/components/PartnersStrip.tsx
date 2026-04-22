import { partners } from "@/lib/neteon-data";

export function PartnersStrip() {
  // Duplicate the list so the marquee can loop seamlessly
  const row = [...partners, ...partners];
  return (
    <section className="bg-black border-y border-[var(--rule)]">
      <div className="container-huge py-10 flex flex-col lg:flex-row items-center gap-8">
        <span className="font-mono text-[12px] tracking-[0.18em] uppercase text-[var(--text-faint)] shrink-0">
          Trusted by
        </span>
        <div className="flex-1 min-w-0 overflow-hidden marquee-mask w-full">
          <div className="marquee-track flex gap-14 items-center w-max">
            {row.map((p, i) => (
              <span
                key={`${p.name}-${i}`}
                className="font-mono text-[22px] text-white/55 hover:text-white transition-colors whitespace-nowrap"
              >
                {p.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
