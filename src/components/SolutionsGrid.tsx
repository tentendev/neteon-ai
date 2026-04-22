import type { Solution } from "@/types/content";
import { SectionHead } from "./ProductsGrid";
import { ArrowUpRight } from "./icons";

type Props = {
  tag: string;
  title: React.ReactNode;
  sub: string;
  solutions: Solution[];
};

export function SolutionsGrid({ tag, title, sub, solutions }: Props) {
  return (
    <section id="solutions" className="bg-black text-white border-t border-[var(--rule)]">
      <div className="container-huge py-24 lg:py-28">
        <SectionHead tag={tag} title={title} sub={sub} />
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-[var(--rule)] border border-[var(--rule)] rounded-[10px] overflow-hidden gap-px">
          {solutions.map((s) => (
            <a
              key={s.id}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group bg-black hover:bg-[var(--surface)] transition-colors p-8 min-h-[220px] flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-[12px] text-[var(--text-faint)]">
                  / {s.num}
                </span>
                <h4 className="mt-1 text-[22px] leading-[1.15] tracking-[-0.01em] font-sans font-medium">
                  {s.name}
                </h4>
              </div>
              <p className="text-white/60 text-[14px] leading-[20px]">
                {s.description}
              </p>
              <span className="absolute top-7 end-7 text-white/40 group-hover:text-[var(--accent-neteon)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                <ArrowUpRight width={18} height={18} />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
