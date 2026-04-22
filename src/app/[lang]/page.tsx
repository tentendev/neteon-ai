import { notFound } from "next/navigation";
import { Announcement } from "@/components/Announcement";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { YellowSlab } from "@/components/YellowSlab";
import { DarkAccordion } from "@/components/DarkAccordion";
import { PartnersStrip } from "@/components/PartnersStrip";
import { ProductsGrid } from "@/components/ProductsGrid";
import { StatsBand } from "@/components/StatsBand";
import { SolutionsGrid } from "@/components/SolutionsGrid";
import { WhyNeteon } from "@/components/WhyNeteon";
import { Testimonials } from "@/components/Testimonials";
import { CtaBanner } from "@/components/CtaBanner";
import { ContactStrip } from "@/components/ContactStrip";
import { Footer } from "@/components/Footer";
import {
  EDGE_ROW_ORDER,
  PLATFORM_ROW_ORDER,
  PRODUCT_ORDER,
  SOLUTION_NUMS,
  SOLUTION_ORDER,
  productHrefs,
  productIcons,
  statsValues,
  urls,
} from "@/lib/neteon-data";
import { hasLocale } from "@/lib/locales";
import { getDictionary } from "./dictionaries";
import type { AccordionRow, Product, Solution } from "@/types/content";

export default async function Home({
  params,
}: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const locale = lang;
  const dict = await getDictionary(locale);

  const products: Product[] = PRODUCT_ORDER.map((id) => {
    const item = dict.products.items[id];
    return {
      id,
      name: item.name,
      tag: item.tag,
      description: item.description,
      specs: item.specs,
      href: productHrefs[id],
      icon: productIcons[id],
    };
  });

  const solutions: Solution[] = SOLUTION_ORDER.map((id) => {
    const item = dict.solutions.items[id];
    return {
      id,
      num: SOLUTION_NUMS[id],
      name: item.name,
      description: item.description,
      href: urls.shop,
    };
  });

  const edgeRows: AccordionRow[] = EDGE_ROW_ORDER.map((id) => ({
    id,
    title: dict.edgeAccordion.rows[id].title,
    body: dict.edgeAccordion.rows[id].body,
  }));

  const platformRows: AccordionRow[] = PLATFORM_ROW_ORDER.map((id) => ({
    id,
    title: dict.platformAccordion.rows[id].title,
    body: dict.platformAccordion.rows[id].body,
  }));

  const stats = [
    { value: statsValues.years, label: dict.stats.years },
    { value: statsValues.devices, label: dict.stats.devices },
    { value: statsValues.customers, label: dict.stats.customers },
    { value: statsValues.support, label: dict.stats.support },
  ];

  const footerColumns = [
    {
      title: dict.footer.columns.products.title,
      links: [
        { label: dict.footer.columns.products.links.rugged, href: urls.ruggedEdgeAi, external: true },
        { label: dict.footer.columns.products.links.compact, href: urls.shop, external: true },
        { label: dict.footer.columns.products.links.gpu, href: urls.shop, external: true },
        { label: dict.footer.columns.products.links.jetson, href: urls.shop, external: true },
      ],
    },
    {
      title: dict.footer.columns.shop.title,
      links: [
        { label: dict.footer.columns.shop.links.ipc, href: urls.shop, external: true },
        { label: dict.footer.columns.shop.links.moxa, href: urls.shopMoxa, external: true },
        { label: dict.footer.columns.shop.links.iiot, href: urls.iiot, external: true },
      ],
    },
    {
      title: dict.footer.columns.resources.title,
      links: [
        { label: dict.footer.columns.resources.links.shipping, href: urls.shipping, external: true },
        { label: dict.footer.columns.resources.links.support, href: urls.support, external: true },
        { label: dict.footer.columns.resources.links.warranty, href: urls.warranty, external: true },
        { label: dict.footer.columns.resources.links.blogAi, href: urls.blogAi, external: true },
        { label: dict.footer.columns.resources.links.blogNet, href: urls.blogNet, external: true },
      ],
    },
    {
      title: dict.footer.columns.company.title,
      links: [
        { label: dict.footer.columns.company.links.why, href: "#why" },
        { label: dict.footer.columns.company.links.contact, href: "#contact" },
        { label: dict.footer.columns.company.links.linkedin, href: urls.linkedin, external: true },
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Announcement text={dict.announcement.text} ctaLabel={dict.announcement.ctaLabel} />
      <Nav labels={dict.nav} locale={locale} />
      <main className="flex-1">
        <Hero
          eyebrow={dict.hero.eyebrow}
          titleLine1={dict.hero.titleLine1}
          titleLine2Emphasis={dict.hero.titleLine2Emphasis}
          sub={dict.hero.sub}
          distributorLine={dict.hero.distributorLine}
          primaryCta={dict.hero.primaryCta}
          secondaryCta={dict.hero.secondaryCta}
          chips={dict.hero.chips}
        />
        <PartnersStrip />
        <YellowSlab>
          {dict.slab1.pre}{" "}
          <span className="italic font-sans">{dict.slab1.emphasis}</span> {dict.slab1.post}
        </YellowSlab>
        <DarkAccordion
          eyebrow={dict.edgeAccordion.eyebrow}
          rows={edgeRows}
          illustration="wireframe-cloud"
        />
        <ProductsGrid
          tag={dict.products.tag}
          title={
            <>
              {dict.products.titleLine1}
              <br />
              {dict.products.titleLine2}
            </>
          }
          sub={dict.products.sub}
          products={products}
          exploreCta={dict.products.exploreCta}
        />
        <StatsBand stats={stats} />
        <YellowSlab>
          {dict.slab2.pre}{" "}
          <span className="font-mono text-[0.72em] align-middle">{dict.slab2.since}</span>
        </YellowSlab>
        <DarkAccordion
          eyebrow={dict.platformAccordion.eyebrow}
          rows={platformRows}
          illustration="wireframe-rack"
        />
        <SolutionsGrid
          tag={dict.solutions.tag}
          title={
            <>
              {dict.solutions.titleLine1}
              <br />
              {dict.solutions.titleLine2}
            </>
          }
          sub={dict.solutions.sub}
          solutions={solutions}
        />
        <WhyNeteon
          tag={dict.why.tag}
          title={
            <>
              {dict.why.titleLine1}
              <br />
              {dict.why.titleLine2}
            </>
          }
          sub={dict.why.sub}
          cards={[
            dict.why.cards.experience,
            dict.why.cards.curated,
            dict.why.cards.engineers,
          ]}
        />
        <Testimonials
          tag={dict.testimonials.tag}
          title={
            <>
              {dict.testimonials.titleLine1}
              <br />
              {dict.testimonials.titleLine2}
            </>
          }
          sub={dict.testimonials.sub}
          items={dict.testimonials.items}
        />
        <CtaBanner
          titleLine1={dict.cta.titleLine1}
          titleLine2={dict.cta.titleLine2}
          body={dict.cta.body}
          primaryCta={dict.cta.primaryCta}
          secondaryCta={dict.cta.secondaryCta}
        />
        <ContactStrip
          tag={dict.contact.tag}
          title={dict.contact.title}
          sub={dict.contact.sub}
          labels={dict.contact.labels}
        />
      </main>
      <Footer
        tagline={dict.footer.tagline}
        columns={footerColumns}
        linkedinLabel={dict.footer.linkedin}
        copyright={dict.footer.copyright}
        privacy={dict.footer.privacy}
        cookie={dict.footer.cookie}
        phoneMainLabel={dict.footer.phoneMain}
        phoneTollFreeLabel={dict.footer.phoneTollFree}
      />
    </div>
  );
}
