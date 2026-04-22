import { urls } from "@/lib/neteon-data";
import { NTButton } from "./Buttons";

type Props = {
  titleLine1: string;
  titleLine2: string;
  body: string;
  primaryCta: string;
  secondaryCta: string;
};

export function CtaBanner({ titleLine1, titleLine2, body, primaryCta, secondaryCta }: Props) {
  return (
    <section
      className="w-full"
      style={{ background: "var(--bg-slab)", color: "var(--ink)" }}
    >
      <div className="container-huge py-24 lg:py-28 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <h3 className="font-sans text-[clamp(30px,3.6vw,52px)] leading-[1.05] tracking-[-0.02em] font-medium">
          {titleLine1}
          <br />
          {titleLine2}
        </h3>
        <div className="flex flex-col gap-5">
          <p className="text-[var(--ink)]/80 text-[16px] leading-[24px] max-w-xl">
            {body}
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={urls.shop}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-[14px] h-9 px-4 rounded-[4px] bg-[var(--ink)] text-[var(--accent-neteon)] hover:rounded-[8px] transition-[border-radius]"
            >
              {primaryCta}
            </a>
            <NTButton variant="secondary" href="#contact">{secondaryCta}</NTButton>
          </div>
        </div>
      </div>
    </section>
  );
}
