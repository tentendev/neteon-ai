"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { BlogPost } from "@/lib/rss";
import { ArrowRight } from "./icons";
import { cn } from "@/lib/utils";

type Labels = {
  prev: string;
  next: string;
  read: string;
};

type Props = {
  posts: BlogPost[];
  locale: string;
  labels: Labels;
};

export function BlogInsightsSlider({ posts, locale, labels }: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateEdges = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const isRTL = getComputedStyle(el).direction === "rtl";
    const max = el.scrollWidth - el.clientWidth;
    const pos = isRTL ? Math.abs(el.scrollLeft) : el.scrollLeft;
    setAtStart(pos <= 2);
    setAtEnd(pos >= max - 2);
  }, []);

  useEffect(() => {
    updateEdges();
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => updateEdges();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateEdges);
    };
  }, [updateEdges]);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const isRTL = getComputedStyle(el).direction === "rtl";
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 20 : el.clientWidth * 0.85;
    const delta = (isRTL ? -1 : 1) * dir * step;
    el.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <div className="mt-10 lg:mt-12">
      <div className="flex justify-end gap-2 mb-5">
        <SliderButton
          label={labels.prev}
          onClick={() => scrollBy(-1)}
          disabled={atStart}
          direction="prev"
        />
        <SliderButton
          label={labels.next}
          onClick={() => scrollBy(1)}
          disabled={atEnd}
          direction="next"
        />
      </div>

      <div
        ref={scrollerRef}
        className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 pb-2 no-scrollbar"
      >
        {posts.map((p) => (
          <PostCard key={p.link} post={p} locale={locale} readLabel={labels.read} />
        ))}
      </div>
    </div>
  );
}

function PostCard({ post, locale, readLabel }: { post: BlogPost; locale: string; readLabel: string }) {
  const date = formatDate(post.pubDate, locale);
  return (
    <a
      data-card
      href={post.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group snap-start shrink-0 basis-[84%] sm:basis-[60%] md:basis-[45%] lg:basis-[calc((100%-40px)/3)] bg-[var(--surface-2)] border border-[var(--rule)] rounded-[10px] overflow-hidden transition-[border-color,transform] duration-300 hover:border-white/20 hover:-translate-y-0.5 flex flex-col"
    >
      <div className="relative aspect-[16/10] bg-[#141414] overflow-hidden">
        {post.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.image}
            alt=""
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center text-white/20 font-mono text-[11px]">
            NETEON.AI
          </div>
        )}
        {post.category ? (
          <span className="absolute top-3 start-3 font-mono text-[10px] tracking-[0.1em] uppercase text-[var(--accent-neteon)] border border-[var(--accent-neteon)]/30 bg-black/70 backdrop-blur px-2 py-1 rounded-full">
            {post.category}
          </span>
        ) : null}
      </div>
      <div className="flex flex-col flex-1 p-6">
        <time className="font-mono text-[11px] tracking-[0.08em] uppercase text-white/50">
          {date}
        </time>
        <h3 className="mt-3 text-[17px] leading-[1.25] tracking-[-0.005em] font-sans font-medium text-white line-clamp-2">
          {post.title}
        </h3>
        <p className="mt-2.5 text-[13.5px] leading-[20px] text-white/55 line-clamp-2">
          {post.description}
        </p>
        <div className="mt-auto pt-5 flex items-center justify-between">
          {post.author ? (
            <span className="text-[12px] text-white/45 font-mono truncate max-w-[60%]">
              {post.author}
            </span>
          ) : (
            <span />
          )}
          <span className="inline-flex items-center gap-1.5 font-mono text-[12px] text-[var(--accent-neteon)] group-hover:gap-2.5 transition-all">
            {readLabel}
            <ArrowRight width={13} height={13} />
          </span>
        </div>
      </div>
    </a>
  );
}

function SliderButton({
  label,
  onClick,
  disabled,
  direction,
}: {
  label: string;
  onClick: () => void;
  disabled: boolean;
  direction: "prev" | "next";
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "h-10 w-10 grid place-items-center rounded-full border border-[var(--rule)] bg-[var(--surface-2)] text-white/75 transition-colors",
        "hover:border-white/30 hover:text-white",
        "disabled:opacity-35 disabled:cursor-not-allowed disabled:hover:border-[var(--rule)] disabled:hover:text-white/75",
      )}
    >
      <ArrowRight
        width={14}
        height={14}
        className={cn(
          direction === "prev" ? "rotate-180 rtl:rotate-0" : "rtl:rotate-180",
        )}
      />
    </button>
  );
}

function formatDate(pubDate: string, locale: string): string {
  const d = new Date(pubDate);
  if (Number.isNaN(d.getTime())) return pubDate;
  try {
    return new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(d);
  } catch {
    return d.toDateString();
  }
}
