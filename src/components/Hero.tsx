import { urls } from "@/lib/neteon-data";
import { NTButton } from "./Buttons";

type Props = {
  eyebrow: string;
  titleLine1: string;
  titleLine2Emphasis: string;
  sub: string;
  distributorLine: string;
  primaryCta: string;
  secondaryCta: string;
  chips: {
    jetson: string;
    temp: string;
    milstd: string;
    pcie: string;
  };
};

export function Hero({
  eyebrow,
  titleLine1,
  titleLine2Emphasis,
  sub,
  distributorLine,
  primaryCta,
  secondaryCta,
  chips,
}: Props) {
  return (
    <section className="relative bg-black text-white overflow-hidden">
      <div className="container-huge grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 py-16 lg:py-28 min-h-[680px]">
        <div className="relative z-10 flex flex-col justify-center">
          <span className="inline-flex self-start items-center gap-2 font-mono text-[12px] text-[var(--accent-neteon)] mb-8">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--accent-neteon)]" />
            {eyebrow}
          </span>
          <h1 className="font-mono font-normal leading-[1.04] tracking-[-0.03em] text-white text-[clamp(40px,6.2vw,70px)]">
            {titleLine1}
            <br />
            <span className="text-[var(--accent-neteon)]">{titleLine2Emphasis}</span>
          </h1>
          <p className="mt-6 max-w-xl text-white/70 text-[16px] leading-[24px]">
            {sub}
          </p>
          <p className="mt-3 max-w-xl text-white/45 text-[13px] leading-[20px] font-mono">
            {distributorLine}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <NTButton variant="primary" href={urls.shop} external withArrow>
              {primaryCta}
            </NTButton>
            <NTButton variant="ghost" href="#contact" withArrow>
              {secondaryCta}
            </NTButton>
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div
            className="absolute inset-y-[-2rem] start-0 w-px"
            style={{ background: "rgba(255,255,255,0.08)" }}
            aria-hidden="true"
          />
          <HeroOrbit chips={chips} />
        </div>
      </div>
      <div className="h-6 w-full" style={{ background: "var(--accent-neteon)" }} />
    </section>
  );
}

function HeroOrbit({ chips }: { chips: Props["chips"] }) {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 grid place-items-center"
    >
      <div className="relative aspect-square w-[88%]">
        {[92, 74, 56, 38, 22].map((size, i) => (
          <div
            key={i}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
            style={{
              width: `${size}%`,
              height: `${size}%`,
              borderColor: `rgba(255,255,255,${0.05 + i * 0.015})`,
            }}
          />
        ))}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[74%] h-[74%] orbit-slow">
          <span
            className="absolute left-1/2 top-0 -translate-x-1/2 block w-2 h-2 rounded-full"
            style={{ background: "var(--accent-neteon)", boxShadow: "0 0 20px var(--accent-neteon)" }}
          />
        </div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[38%] h-[38%] orbit-med">
          <span
            className="absolute left-1/2 top-0 -translate-x-1/2 block w-1.5 h-1.5 rounded-full"
            style={{ background: "var(--accent-neteon)" }}
          />
        </div>
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[14%] h-[14%]"
          style={{
            background: "var(--accent-neteon)",
            borderRadius: "4px",
            boxShadow: "0 0 60px rgba(206,235,19,0.4), 0 0 120px rgba(206,235,19,0.2)",
          }}
        />
        <Chip className="top-[8%] left-[6%]">{chips.jetson}</Chip>
        <Chip className="top-[14%] right-[4%]">{chips.temp}</Chip>
        <Chip className="bottom-[16%] left-[10%]">{chips.milstd}</Chip>
        <Chip className="bottom-[6%] right-[8%]">{chips.pcie}</Chip>
      </div>
    </div>
  );
}

function Chip({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={
        "absolute font-mono text-[11px] text-white/80 px-2.5 py-1.5 border border-white/15 bg-black/60 rounded-[4px] backdrop-blur-sm " +
        (className ?? "")
      }
    >
      {children}
    </span>
  );
}
