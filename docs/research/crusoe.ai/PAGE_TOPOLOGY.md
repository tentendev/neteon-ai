# Page Topology — crusoe.ai

Desktop 1440 full-page height: 10,588px. 16 top-level children under `.main-wrapper` (excluding dividers).

| # | Class | Top | H | BG | Role (interpreted) |
|---|---|---|---|---|---|
| 0 | `.nav__banner` | 0 | 40 | `#323c2a` dark green | Announcement banner (dismissable) |
| 0 | `nav.header-wr` | 0 | sticky | transparent | Primary nav (sticky, over hero) |
| 1 | `.section.is-hero.is-home` | 40 | 808 | `#000` | Hero: split 50/50 — left big mono H1 + subhead + 2 buttons, right line-art visualization |
| 2 | `.section.test-section` | 848 | 402 | `#ceeb13` yellow | Yellow feature slab — centered large H2 statement |
| 3 | `.section.is-grid-info` | 1250 | 869 | `#000` | Dark accordion: mono eyebrow "Managed AI services" + 3 accordion rows (Seamless scaling / Breakthrough speed / Latest models) + model swiper |
| 4 | `.section.test-section` | 2119 | 364 | `#ceeb13` yellow | Second yellow slab |
| 5 | `.section.is-grid-info` | 2483 | 285 | `#000` | Dark accordion: "AI cloud platform" + 3 rows (Peak performance / Simplified operations / Reliable and supported) with isometric line-art illustration on left |
| 6 | `.section` (We design…) | 2768 | 2566 | transparent/white | Large white section with big mono statement + photo + isometric illustration (data-center farm with yellow square accents) |
| 7 | `.section.partners-scroll` | 5334 | 255 | transparent | "Trusted by:" partner logo strip (grayscale, marquee-style) |
| 8 | `.section.overflow-hidden` | 5590 | 1070 | transparent | "Built for the demands of AI. Ready for what's next." — GPU offering grid |
| 9 | `.section` (News) | 6660 | 767 | transparent | News / blog post grid with tab filter (All / General / Cloud / Energy / Climate / Engineering / Data center) |
| 10 | `.section.hm-video` | 7427 | 784 | transparent | Large video hero "About Crusoe" |
| 11 | `.section.overflow-hidden.cc-quotes` | 8210 | 751 | transparent | "Hear it from our customers" — testimonial carousel (quote cards with giant quote mark) |
| 12 | `.section.hm-cta` | 8961 | 938 | transparent | Final CTA: "Are you ready to build something amazing?" + Contact us / Get started |
| 13 | `footer.footer` | 9899 | 689 | `#000` | Dark footer with newsletter, sitemap columns |

## Rhythm pattern
```
banner      (dark green)
nav         (transparent sticky)
HERO        (black)
SLAB        (yellow)
GRID-INFO   (black accordion)
SLAB        (yellow)
GRID-INFO   (black accordion)
STATEMENT   (light)
PARTNERS    (light)
GPU GRID    (light)
NEWS GRID   (light)
VIDEO       (dark media)
TESTIMONY   (light)
CTA         (light)
FOOTER      (black)
```

## Neteon adaptation — section mapping

Goal: preserve the black↔yellow↔dark rhythm + mono display type + ghost-button treatment, but populate with Neteon's content.

| Section (new) | Pattern from Crusoe | Neteon content |
|---|---|---|
| Nav | sticky transparent, center menu, right CTA pill | Products · Solutions · Why Neteon · Contact · Blog · Shop IPC Store |
| Announcement bar | dark-green slab with yellow inline link | e.g. "22+ years of industrial computing — meet us at ISC West" (optional) |
| Hero | split 50/50, big mono H1 on black, line-art visual right | "Industrial Computing, AI-Ready." + rugged Edge AI subhead |
| Yellow slab #1 | big H2 centered statement on yellow | "Rugged Edge AI, from -40°C to 70°C." (or similar) |
| Dark accordion #1 | mono eyebrow + 3 expandable rows | Eyebrow "Edge AI services" + rows: Rugged Edge AI / GPU Computing / Jetson Platform |
| Yellow slab #2 | another yellow statement | "1M+ connected devices. 26K+ customers." |
| Dark accordion #2 | 3 rows + line-art illustration | Eyebrow "Industrial platform" + rows: Industrial Networking / Industrial Storage / Fanless Compact |
| Stats band | none in Crusoe (so treated as extra) | 22+ / 1M+ / 26K+ / 24/7 — in dark-card strip |
| Solutions grid | Crusoe's white GPU grid | 6 industries (Manufacturing, Energy, Transportation, Data Center, Oil & Gas, Renewables) |
| Partners strip | grayscale wordmarks | NVIDIA / Intel / Moxa / Neousys / Innodisk / Teltonika |
| Why Neteon | crusoe's "About" video block adapted | 3 big why-cards (22+ years / Curated portfolio / Engineer support) |
| Testimonials | quote cards carousel | (skip if we don't have Neteon testimonials yet; placeholder ok) |
| Final CTA slab | yellow or dark CTA band with two buttons | "Have a deployment in mind? Let's spec it." |
| Contact strip | N/A in Crusoe | Neteon contact cards (phone, NJ office, CA warehouse) |
| Footer | dark sitemap + newsletter | Neteon's 4-column link map + copyright |
