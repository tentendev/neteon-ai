import { contactStatic, urls } from "@/lib/neteon-data";
import { SectionHead } from "./ProductsGrid";

type Props = {
  tag: string;
  title: string;
  sub: string;
  labels: {
    phone: string;
    email: string;
    corporate: string;
    warehouse: string;
    sales: string;
    support: string;
    main: string;
    tollFree: string;
  };
};

export function ContactStrip({ tag, title, sub, labels }: Props) {
  const phones = [
    { label: labels.main, value: contactStatic.phoneMain, href: urls.telMain },
    { label: labels.tollFree, value: contactStatic.phoneTollFree, href: urls.telTollFree },
  ];
  const emails = [
    { label: labels.sales, value: contactStatic.emailSales, href: urls.mailSales },
    { label: labels.support, value: contactStatic.emailSupport, href: urls.mailSupport },
  ];
  return (
    <section id="contact" className="bg-black text-white border-t border-[var(--rule)]">
      <div className="container-huge py-24 lg:py-28">
        <SectionHead tag={tag} title={title} sub={sub} />
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <Card title={labels.phone}>
            {phones.map((p) => (
              <p key={p.value} className="text-[15px]">
                <a href={p.href} className="text-white hover:text-[var(--accent-neteon)]">
                  {p.value}
                </a>{" "}
                <span className="text-white/60">· {p.label}</span>
              </p>
            ))}
          </Card>
          <Card title={labels.email}>
            {emails.map((e) => (
              <p key={e.value} className="text-[15px]">
                <a href={e.href} className="text-white hover:text-[var(--accent-neteon)] break-all">
                  {e.value}
                </a>
                <br />
                <span className="text-white/60 text-[13px]">{e.label}</span>
              </p>
            ))}
          </Card>
          <Card title={labels.corporate}>
            <p className="text-[15px] text-white">{contactStatic.corporateLine1}</p>
            <p className="text-[14px] text-white/60">{contactStatic.corporateLine2}</p>
          </Card>
          <Card title={labels.warehouse}>
            <p className="text-[15px] text-white">{contactStatic.warehouseLine1}</p>
            <p className="text-[14px] text-white/60">{contactStatic.warehouseLine2}</p>
          </Card>
        </div>
      </div>
    </section>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-[var(--surface-2)] border border-[var(--rule)] rounded-[10px] p-7">
      <h5 className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--text-faint)]">
        {title}
      </h5>
      <div className="mt-4 space-y-1.5">{children}</div>
    </div>
  );
}
