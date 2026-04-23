import type { FooterColumn } from "@/types/content";
import type { Locale } from "@/lib/locales";
import { urls } from "@/lib/neteon-data";
import { NeteonWordmark } from "./icons";
import { FooterSubscribe } from "./FooterSubscribe";

type Props = {
  tagline: string;
  columns: FooterColumn[];
  copyright: string;
  privacy: string;
  cookie: string;
  ctaBand: {
    title: string;
    contact: string;
    start: string;
  };
  subscribe: {
    title: string;
    firstname: string;
    lastname: string;
    email: string;
    consent: string;
    submit: string;
  };
  partnerBadge: string;
  socials: {
    linkedin: string;
    x: string;
    youtube: string;
    instagram: string;
  };
  locale: Locale;
};

const BG_IMAGE =
  "https://cdn.prod.website-files.com/6855c1aa175582ee23e0aa19/6874fa8602ae6f9dddc48df3_ecd0ee4ff6afac5e58eec5d3e4a69109_CTA-bg.avif";

export function Footer({
  tagline,
  columns,
  copyright,
  privacy,
  cookie,
  ctaBand,
  subscribe,
  partnerBadge,
  socials,
  locale,
}: Props) {
  const privacyHref = `/${locale}/privacy`;
  const cookieHref = `/${locale}/cookies`;
  return (
    <footer className="bg-black text-white">
      {/* Hero CTA band with landscape photo */}
      <section className="relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={BG_IMAGE}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
        <div className="relative container-huge py-32 md:py-44 lg:py-56 flex flex-col items-center text-center">
          <h2 className="font-mono text-[clamp(32px,6vw,80px)] leading-[1.05] tracking-tight max-w-4xl">
            {ctaBand.title}
          </h2>
          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <a
              href="#contact"
              className="px-6 py-3 text-[14px] font-mono uppercase tracking-[0.1em] border border-white/70 text-white hover:bg-white hover:text-black transition-colors"
            >
              {ctaBand.contact}
            </a>
            <a
              href={urls.shop}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 text-[14px] font-mono uppercase tracking-[0.1em] bg-[var(--accent-neteon)] text-black hover:bg-[var(--accent-neteon-hover)] transition-colors"
            >
              {ctaBand.start}
            </a>
          </div>
        </div>
      </section>

      {/* Main block */}
      <div className="container-huge pt-20 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,420px)_1fr] gap-14 lg:gap-20">
          {/* Left: brand + subscribe + socials */}
          <div>
            <a href={`/${locale}`} aria-label="Neteon home" className="inline-flex items-center">
              <NeteonWordmark height={22} className="h-[22px] w-auto text-white" />
            </a>
            <p className="mt-4 max-w-sm text-[14px] text-white/55">{tagline}</p>
            <FooterSubscribe copy={subscribe} />
            <div className="mt-8 flex gap-3">
              <SocialIcon href={urls.linkedin} label={socials.linkedin} icon="linkedin" />
              <SocialIcon href="#" label={socials.x} icon="x" />
              <SocialIcon href="#" label={socials.youtube} icon="youtube" />
              <SocialIcon href="#" label={socials.instagram} icon="instagram" />
            </div>
          </div>

          {/* Right: 4 link columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
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
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-[var(--rule)] flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 text-[13px]">
            <span className="text-[var(--text-faint)]">{copyright}</span>
            <div className="flex gap-5 text-white/55">
              <a href={privacyHref} className="hover:text-white">
                {privacy}
              </a>
              <a href={cookieHref} className="hover:text-white">
                {cookie}
              </a>
            </div>
          </div>
          <div className="flex items-center gap-2 border border-[var(--rule)] px-3 py-2">
            <span className="w-2 h-2 bg-[#76b900] rounded-sm" aria-hidden="true" />
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/70">
              {partnerBadge}
            </span>
          </div>
        </div>
      </div>

      {/* Oversized wordmark bleed */}
      <div className="overflow-hidden px-[2vw] pb-[2vw]">
        <NeteonWordmark className="w-full h-auto text-white/[0.08]" />
      </div>
    </footer>
  );
}

function SocialIcon({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: "linkedin" | "x" | "youtube" | "instagram";
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-9 h-9 inline-flex items-center justify-center border border-[var(--rule)] text-white/70 hover:text-white hover:border-white transition-colors"
    >
      {icon === "linkedin" && (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S.02 4.88.02 3.5 1.13 1 2.5 1s2.48 1.12 2.48 2.5zM.25 8h4.5v14H.25V8zm7.5 0h4.3v1.9h.06c.6-1.1 2.07-2.26 4.26-2.26 4.56 0 5.4 3 5.4 6.9V22h-4.5v-6.4c0-1.52-.03-3.48-2.12-3.48-2.13 0-2.46 1.66-2.46 3.37V22H7.75V8z" />
        </svg>
      )}
      {icon === "x" && (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
        </svg>
      )}
      {icon === "youtube" && (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 00.5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 002.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 002.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z" />
        </svg>
      )}
      {icon === "instagram" && (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      )}
    </a>
  );
}
