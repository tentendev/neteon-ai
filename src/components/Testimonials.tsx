import type { Testimonial } from "@/types/content";
import { SectionHead } from "./ProductsGrid";

type Props = {
  tag: string;
  title: React.ReactNode;
  sub: string;
  items: Testimonial[];
};

export function Testimonials({ tag, title, sub, items }: Props) {
  return (
    <section id="testimonials" className="bg-black text-white border-t border-[var(--rule)]">
      <div className="container-huge py-24 lg:py-28">
        <SectionHead tag={tag} title={title} sub={sub} />
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
          {items.map((t) => (
            <figure
              key={t.author + t.role}
              className="relative bg-[var(--surface-2)] border border-[var(--rule)] rounded-[10px] p-8 flex flex-col justify-between"
            >
              <span
                aria-hidden="true"
                className="absolute top-4 start-6 font-mono text-[60px] leading-none text-[var(--accent-neteon)]/25 select-none"
              >
                &ldquo;
              </span>
              <blockquote className="relative text-[18px] leading-[1.45] tracking-[-0.005em] text-white/90 pt-6">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 pt-5 border-t border-[var(--rule)] flex items-center gap-3">
                <span className="grid place-items-center h-9 w-9 rounded-full bg-[var(--accent-neteon)]/15 border border-[var(--accent-neteon)]/30 font-mono text-[12px] text-[var(--accent-neteon)]">
                  {initials(t.author)}
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="text-[14px] text-white">{t.author}</span>
                  <span className="text-[12px] text-white/55 font-mono">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function initials(name: string): string {
  const tokens = name.trim().split(/\s+/).filter(Boolean).slice(0, 2);
  if (!tokens.length) return "··";
  return tokens.map((t) => Array.from(t)[0] ?? "").join("") || "··";
}
