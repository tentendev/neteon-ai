# Design Tokens — crusoe.ai

Extracted from https://www.crusoe.ai/ via Playwright `getComputedStyle()`.

## Source fonts (on original)
- Display / UI: `Suisseintl, Arial, sans-serif` (proprietary — Swiss Typefaces)
- Mono / Display-accent: `Abcdiatypemono, Arial, sans-serif` (proprietary — Dinamo)
- Framework: Webflow (`.w-mod-js .w-mod-ix .w-mod-ix3` on `<html>`)

## Substitution strategy (clone)
| Role | Original | Substitute (Google Fonts) |
|---|---|---|
| Display / body sans | Suisseintl | **Inter** (400, 500, 600) |
| Mono / headline mono | Abcdiatypemono | **JetBrains Mono** (400, 500) |

## Colors (exact)
```
--hi-vis-yellow   : #ceeb13   (primary accent, buttons, links)
--yellow-hover    : #a0b711   (hover state derived)
--night-black     : #000000   (primary bg)
--ink             : rgb(24,23,23)  (near-black for deep text)
--white           : #ffffff
--dark-green      : #323c2a   (announcement banner bg)
--dark-navy       : #1f232e   (secondary dark surface)
--stone-grey      : #a3a3a3   (muted text)
--gray-250        : #e8e8e8   (secondary button fill, light divider)
--light-gray      : #f1efed   (off-white panel)
--ecf0e9          : #ecf0e9   (light panel, eco tone)
--green-250       : #ced2cb
--blue            : #7799b6
--blue-500        : #bbccdb
```

**Observed usage split:** black sections dominate (hero, nav, grid sections), interspersed with **yellow slab** quote/feature sections (`#ceeb13`), and occasional **white/light-gray** content sections for longer copy.

## Typography — desktop (1440)
| Role | Family | Size | Line-height | Letter-spacing | Weight |
|---|---|---|---|---|---|
| H1 hero | **Mono** (JetBrains Mono) | 70px | 73.5px | -3.5px | 400 |
| H2 | Sans (Inter) | 35.008px | 38.51px | -0.70px | 400 |
| H3 | Sans (Inter) | 20px | 21px | normal | 400 |
| Body | Sans (Inter) | 14px | 20px | normal | 400 |
| Eyebrow / tag | **Mono** (JetBrains Mono) | 14px | normal | normal | 400 |
| Button label | **Mono** (JetBrains Mono) | 14px | normal | normal | 400 |

## Typography — mobile (390)
- H1 hero: 40px / 42px / -0.8px
- (scales ~linearly via Webflow breakpoints; treat `clamp(40px, 6vw, 70px)` as a safe proxy)

## Buttons
All buttons: `padding: 11px 12px`, `border-radius: 4px`, `font: JetBrains Mono 14px / 400`, `transition: background-color .25s, border-radius .25s`.

| Variant | Class | BG | Color | Border |
|---|---|---|---|---|
| **Primary** (filled yellow) | `.button` | `#ceeb13` | `#000` | none |
| **Ghost** (dark bg) | `.button.is-gh` | transparent | `#fff` | `1px solid #fff` |
| **Secondary** (light bg) | `.button.is-secondary` | `#e8e8e8` | `#000` | none |
| Banner link | `.button-banner` | transparent | `#ceeb13` | none (inline link with arrow) |

Buttons are small, square-ish (height 32px), and use the **mono font** for labels — a key Crusoe signature.

## Layout
- Container max-width: **1408px** (`.container-huge`)
- Mobile container width at 390 viewport: 335px (→ 27.5px outer gutters)
- Page scroll height (desktop): ~10,588px (substantial long-form page)
- No smooth scroll library (no Lenis / Locomotive); native scroll
- Nav: `position: sticky; top: 0; z-index: 1000;` — does **not** transform on scroll (no shrink, no bg change)
- Announcement banner (40px, dark green) sits above nav; is relative-positioned so it scrolls away

## Signature motifs
1. **Monospace display type** in the hero and section titles — most distinctive single signal.
2. **Alternating black ↔ yellow ↔ black** section rhythm — yellow "slab" quote sections break up the dark sections.
3. **Wireframe isometric line-art illustrations** in lime-yellow on black (cloud-on-chip, data-center isometrics).
4. **Small yellow squares** as graphic accents floating in whitespace.
5. **Hi-contrast ghost buttons** (thin white outline on black) for secondary actions.
6. **Dotted/animated line visualizations** in the hero (single yellow dots on white curves).

## Interaction system
- Button hover: `background-color .25s, border-radius .25s` (slight radius morph observed)
- Link hover: color shift to yellow `#ceeb13`
- Accordion rows: click to expand (Peak performance / Simplified operations / Reliable and supported pattern)
- Scroll effects: AOS-like fade-in on section entry via Webflow IX (`.w-mod-ix`)
- No parallax or scroll-snap detected
