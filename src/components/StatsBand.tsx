import type { Stat } from "@/types/content";

type Props = {
  stats: Stat[];
};

export function StatsBand({ stats }: Props) {
  return (
    <section className="bg-black text-white">
      <div className="container-huge pb-20 lg:pb-24">
        <div className="grid grid-cols-2 lg:grid-cols-4 bg-[var(--surface)] border border-[var(--rule)] rounded-[10px] overflow-hidden">
          {stats.map((s, i) => (
            <div
              key={s.value}
              className={
                "p-8 lg:p-10 " +
                (i < 3 ? "lg:border-r border-[var(--rule)] " : "") +
                (i < 2 ? "border-b lg:border-b-0 border-[var(--rule)]" : "")
              }
            >
              <div className="font-mono text-[clamp(36px,4vw,56px)] tracking-[-0.03em] leading-none tabular">
                <span className="text-[var(--accent-neteon)]">{s.value}</span>
              </div>
              <div className="mt-3 text-white/60 text-[14px]">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
