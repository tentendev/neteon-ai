import type { Product } from "@/types/content";
import { ProductIcon, ArrowRight } from "./icons";

type Props = {
  tag: string;
  title: React.ReactNode;
  sub: string;
  products: Product[];
  exploreCta: string;
};

export function ProductsGrid({ tag, title, sub, products, exploreCta }: Props) {
  return (
    <section id="products" className="bg-black text-white">
      <div className="container-huge py-24 lg:py-28">
        <SectionHead tag={tag} title={title} sub={sub} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">
          {products.map((p) => (
            <article
              key={p.id}
              className="relative bg-[var(--surface-2)] border border-[var(--rule)] rounded-[10px] p-7 transition-[border-color,transform] duration-300 hover:border-white/20 hover:-translate-y-0.5"
            >
              <div className="absolute top-6 end-6 grid place-items-center h-10 w-10 rounded-[8px] border border-[var(--accent-neteon)]/30 bg-[var(--accent-neteon)]/10 text-[var(--accent-neteon)]">
                <ProductIcon name={p.icon} width={20} height={20} />
              </div>
              <span className="inline-flex items-center font-mono text-[11px] tracking-[0.08em] text-[var(--accent-neteon)] border border-[var(--accent-neteon)]/25 bg-[var(--accent-neteon)]/8 px-2.5 py-1 rounded-full">
                {p.tag}
              </span>
              <h3 className="mt-5 text-[22px] leading-[1.15] tracking-[-0.01em] font-sans font-medium">
                {p.name}
              </h3>
              <p className="mt-2.5 text-[14.5px] leading-[22px] text-white/60">
                {p.description}
              </p>
              <ul className="mt-5 flex flex-wrap gap-1.5">
                {p.specs.map((s) => (
                  <li
                    key={s}
                    className="font-mono text-[11px] text-white/70 px-2.5 py-1 border border-[var(--rule)] rounded-[4px]"
                  >
                    {s}
                  </li>
                ))}
              </ul>
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 font-mono text-[13px] text-[var(--accent-neteon)] hover:gap-3 transition-all"
              >
                {exploreCta}
                <ArrowRight width={14} height={14} />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SectionHead({
  tag,
  title,
  sub,
}: {
  tag: string;
  title: React.ReactNode;
  sub: string;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:items-end">
      <div>
        <span className="inline-flex items-center gap-3 font-mono text-[12px] tracking-[0.12em] uppercase text-[var(--accent-neteon)]">
          <span className="block w-5 h-px bg-[var(--accent-neteon)]" />
          {tag}
        </span>
        <h2 className="mt-3 text-[clamp(32px,3.6vw,50px)] leading-[1.06] tracking-[-0.02em] font-sans font-medium">
          {title}
        </h2>
      </div>
      <p className="text-white/60 text-[16px] leading-[24px] max-w-xl">{sub}</p>
    </div>
  );
}
