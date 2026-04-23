import type { ReactNode } from "react";
import type { Locale } from "@/lib/locales";
import type { Dictionary } from "@/types/dictionary";
import { Announcement } from "./Announcement";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { QuoteFormProvider } from "./QuoteFormProvider";
import { buildFooterColumns } from "@/lib/footer-data";

type Props = {
  dict: Dictionary;
  locale: Locale;
  title: string;
  updated: string;
  children: ReactNode;
};

export function PolicyPage({ dict, locale, title, updated, children }: Props) {
  const columns = buildFooterColumns(dict);
  return (
    <QuoteFormProvider copy={dict.quote}>
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Announcement text={dict.announcement.text} ctaLabel={dict.announcement.ctaLabel} />
      <Nav labels={dict.nav} locale={locale} />
      <main className="flex-1">
        <header className="border-b border-[var(--rule)]">
          <div className="container-huge py-20 md:py-28">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--text-faint)]">
              Legal · Last updated {updated}
            </p>
            <h1 className="mt-5 font-mono text-[clamp(36px,5vw,64px)] leading-[1.05] tracking-tight">
              {title}
            </h1>
          </div>
        </header>
        <article className="container-huge py-14 md:py-20">
          <div className="max-w-3xl policy-prose text-white/80 text-[15px] leading-[1.75]">
            {children}
          </div>
        </article>
      </main>
      <Footer
        tagline={dict.footer.tagline}
        columns={columns}
        copyright={dict.footer.copyright}
        privacy={dict.footer.privacy}
        cookie={dict.footer.cookie}
        ctaBand={dict.footer.ctaBand}
        subscribe={dict.footer.subscribe}
        partnerBadge={dict.footer.partnerBadge}
        socials={dict.footer.socials}
        locale={locale}
      />
    </div>
    </QuoteFormProvider>
  );
}
