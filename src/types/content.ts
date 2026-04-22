export type Product = {
  id: string;
  name: string;
  tag: string;
  description: string;
  specs: string[];
  href: string;
  icon: "cpu" | "compact" | "gpu" | "jetson" | "network" | "storage";
};

export type Solution = {
  id: string;
  num: string;
  name: string;
  description: string;
  href: string;
};

export type Stat = {
  value: string;
  label: string;
};

export type WhyCard = {
  eyebrow: string;
  title: string;
  body: string;
};

export type AccordionRow = {
  id: string;
  title: string;
  body: string;
};

export type Partner = {
  name: string;
};

export type NavItem = {
  label: string;
  href: string;
  hasDropdown?: boolean;
};

export type FooterColumn = {
  title: string;
  links: { label: string; href: string; external?: boolean }[];
};

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
};
