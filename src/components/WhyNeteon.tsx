import type { WhyCard } from "@/types/content";
import { SectionHead } from "./ProductsGrid";

type Props = {
  tag: string;
  title: React.ReactNode;
  sub: string;
  cards: WhyCard[];
};

export function WhyNeteon({ tag, title, sub, cards }: Props) {
  return (
    <section id="why" className="bg-black text-white border-t border-[var(--rule)]">
      <div className="container-huge py-24 lg:py-28">
        <SectionHead tag={tag} title={title} sub={sub} />
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
          {cards.map((w) => (
            <div
              key={w.title}
              className="bg-[var(--surface-2)] border border-[var(--rule)] rounded-[10px] p-8"
            >
              <span className="inline-block font-mono text-[12px] text-[var(--accent-neteon)] bg-[var(--accent-neteon)]/8 border border-[var(--accent-neteon)]/25 px-2.5 py-1 rounded-[4px]">
                {w.eyebrow}
              </span>
              <h4 className="mt-6 text-[22px] leading-[1.2] tracking-[-0.01em] font-sans font-medium">
                {w.title}
              </h4>
              <p className="mt-2.5 text-white/60 text-[15px] leading-[22px]">{w.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
