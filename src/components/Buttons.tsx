import { cn } from "@/lib/utils";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { ArrowRight } from "./icons";

type Variant = "primary" | "ghost" | "secondary" | "banner";
type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  withArrow?: boolean;
  external?: boolean;
  children: ReactNode;
};

const base =
  "inline-flex items-center gap-2 font-mono text-[14px] leading-none rounded-[4px] px-3 h-8 transition-[background-color,color,border-radius] duration-[250ms] select-none whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--accent-neteon)] text-[var(--ink)] hover:bg-[var(--accent-neteon-hover)] hover:rounded-[8px]",
  ghost:
    "bg-transparent text-white border border-white hover:bg-white hover:text-[var(--ink)] hover:rounded-[8px]",
  secondary:
    "bg-[#e8e8e8] text-[var(--ink)] hover:bg-white hover:rounded-[8px]",
  banner:
    "bg-transparent text-[var(--accent-neteon)] hover:underline px-0 h-auto",
};

export function NTButton({
  variant = "primary",
  withArrow = false,
  external = false,
  className,
  children,
  ...rest
}: Props) {
  const externalProps = external
    ? { target: "_blank", rel: "noopener noreferrer" as const }
    : {};
  return (
    <a className={cn(base, variants[variant], className)} {...externalProps} {...rest}>
      <span>{children}</span>
      {withArrow && <ArrowRight width={14} height={14} />}
    </a>
  );
}
