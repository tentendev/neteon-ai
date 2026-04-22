import { fetchBlogPosts } from "@/lib/rss";
import type { Dictionary } from "@/types/dictionary";
import { SectionHead } from "./ProductsGrid";
import { BlogInsightsSlider } from "./BlogInsightsSlider";
import { ArrowRight } from "./icons";

type Props = {
  copy: Dictionary["blog"];
  locale: string;
};

export async function BlogInsights({ copy, locale }: Props) {
  const posts = await fetchBlogPosts(10);
  if (posts.length === 0) return null;

  return (
    <section id="insights" className="bg-black text-white border-t border-[var(--rule)]">
      <div className="container-huge py-24 lg:py-28">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex-1">
            <SectionHead
              tag={copy.tag}
              title={
                <>
                  {copy.titleLine1}
                  <br />
                  {copy.titleLine2}
                </>
              }
              sub={copy.sub}
            />
          </div>
          <a
            href="https://neteon.ai/blog/"
            target="_blank"
            rel="noopener noreferrer"
            className="self-start lg:self-end inline-flex items-center gap-2 font-mono text-[13px] text-[var(--accent-neteon)] hover:gap-3 transition-all whitespace-nowrap"
          >
            {copy.viewAll}
            <ArrowRight width={14} height={14} />
          </a>
        </div>

        <BlogInsightsSlider
          posts={posts}
          locale={locale}
          labels={{ prev: copy.prev, next: copy.next, read: copy.read }}
        />
      </div>
    </section>
  );
}
