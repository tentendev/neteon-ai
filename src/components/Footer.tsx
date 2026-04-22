import type { FooterColumn } from "@/types/content";
import { contactStatic, urls } from "@/lib/neteon-data";
import { NeteonWordmark } from "./icons";

type Props = {
  tagline: string;
  columns: FooterColumn[];
  linkedinLabel: string;
  copyright: string;
  privacy: string;
  cookie: string;
  phoneMainLabel: string;
  phoneTollFreeLabel: string;
};

export function Footer({
  tagline,
  columns,
  linkedinLabel,
  copyright,
  privacy,
  cookie,
  phoneMainLabel,
  phoneTollFreeLabel,
}: Props) {
  return (
    <footer className="bg-black text-white border-t border-[var(--rule)]">
      <div className="container-huge py-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
          <div className="col-span-2 lg:col-span-2">
            <a href="#" aria-label="Neteon home" className="inline-flex items-center">
              <NeteonWordmark height={22} className="h-[22px] w-auto text-white" />
            </a>
            <p className="mt-4 max-w-sm text-[14px] text-white/55">{tagline}</p>
            <div className="mt-5 flex flex-col gap-1.5 text-[13px] text-white/60">
              <a href={urls.telMain} className="hover:text-white">{phoneMainLabel}</a>
              <a href={urls.telTollFree} className="hover:text-white">{phoneTollFreeLabel}</a>
              <a href={urls.mailSales} className="hover:text-white">{contactStatic.emailSales}</a>
            </div>
            <a
              href={urls.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 font-mono text-[12px] text-white/60 hover:text-[var(--accent-neteon)]"
            >
              {linkedinLabel}
            </a>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h5 className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--text-faint)]">
                {col.title}
              </h5>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="text-[14px] text-white/70 hover:text-white transition-colors"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 pt-8 border-t border-[var(--rule)] flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <span className="text-[13px] text-[var(--text-faint)]">{copyright}</span>
          <div className="flex gap-5 text-[13px] text-white/55">
            <a href={urls.privacy} target="_blank" rel="noopener noreferrer" className="hover:text-white">{privacy}</a>
            <a href={urls.privacy} target="_blank" rel="noopener noreferrer" className="hover:text-white">{cookie}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
