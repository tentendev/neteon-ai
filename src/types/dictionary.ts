export type Dictionary = {
  meta: {
    title: string;
    description: string;
  };
  announcement: {
    text: string;
    ctaLabel: string;
  };
  nav: {
    products: string;
    solutions: string;
    why: string;
    contact: string;
    blog: string;
    shopCta: string;
    quoteCta: string;
    languageLabel: string;
    openMenu: string;
    closeMenu: string;
  };
  hero: {
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
  slab1: {
    pre: string;
    emphasis: string;
    post: string;
  };
  slab2: {
    pre: string;
    since: string;
  };
  edgeAccordion: {
    eyebrow: string;
    rows: {
      rugged: { title: string; body: string };
      gpu: { title: string; body: string };
      jetson: { title: string; body: string };
    };
  };
  platformAccordion: {
    eyebrow: string;
    rows: {
      networking: { title: string; body: string };
      storage: { title: string; body: string };
      compact: { title: string; body: string };
    };
  };
  products: {
    tag: string;
    titleLine1: string;
    titleLine2: string;
    sub: string;
    exploreCta: string;
    items: {
      "rugged-edge": { name: string; tag: string; description: string; specs: string[] };
      compact: { name: string; tag: string; description: string; specs: string[] };
      gpu: { name: string; tag: string; description: string; specs: string[] };
      jetson: { name: string; tag: string; description: string; specs: string[] };
      networking: { name: string; tag: string; description: string; specs: string[] };
      storage: { name: string; tag: string; description: string; specs: string[] };
    };
  };
  stats: {
    years: string;
    devices: string;
    customers: string;
    support: string;
  };
  solutions: {
    tag: string;
    titleLine1: string;
    titleLine2: string;
    sub: string;
    items: {
      manufacturing: { name: string; description: string };
      energy: { name: string; description: string };
      transportation: { name: string; description: string };
      datacenter: { name: string; description: string };
      oilgas: { name: string; description: string };
      renewable: { name: string; description: string };
    };
  };
  why: {
    tag: string;
    titleLine1: string;
    titleLine2: string;
    sub: string;
    cards: {
      experience: { eyebrow: string; title: string; body: string };
      curated: { eyebrow: string; title: string; body: string };
      engineers: { eyebrow: string; title: string; body: string };
    };
  };
  testimonials: {
    tag: string;
    titleLine1: string;
    titleLine2: string;
    sub: string;
    items: Array<{ quote: string; author: string; role: string }>;
  };
  cta: {
    titleLine1: string;
    titleLine2: string;
    body: string;
    primaryCta: string;
    secondaryCta: string;
  };
  contact: {
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
  blog: {
    tag: string;
    titleLine1: string;
    titleLine2: string;
    sub: string;
    viewAll: string;
    read: string;
    prev: string;
    next: string;
  };
  quote: {
    title: string;
    sub: string;
    labels: {
      firstname: string;
      lastname: string;
      email: string;
      company: string;
      phone: string;
      message: string;
      consent: string;
    };
    placeholders: {
      message: string;
    };
    submit: string;
    submitting: string;
    success: string;
    error: string;
    close: string;
    required: string;
    invalidEmail: string;
  };
  footer: {
    tagline: string;
    phoneMain: string;
    phoneTollFree: string;
    linkedin: string;
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
    columns: {
      products: {
        title: string;
        links: {
          rugged: string;
          compact: string;
          gpu: string;
          jetson: string;
        };
      };
      shop: {
        title: string;
        links: {
          ipc: string;
          moxa: string;
          iiot: string;
        };
      };
      resources: {
        title: string;
        links: {
          shipping: string;
          support: string;
          warranty: string;
          blogAi: string;
          blogNet: string;
        };
      };
      company: {
        title: string;
        links: {
          why: string;
          contact: string;
          linkedin: string;
        };
      };
    };
  };
};
