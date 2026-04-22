# Behaviors — crusoe.ai

## Global
- **No smooth-scroll library** (no Lenis / Locomotive). Native scroll.
- **Webflow IX** drives entrance animations (class `w-mod-ix` on `<html>`). Typical effect: opacity 0 → 1, translateY on viewport entry. Approximate with `framer-motion` `whileInView` or plain CSS `animation-timeline: view()`.
- Page is NOT scroll-snapped.
- Root uses `scroll-behavior: smooth` (inferred; not confirmed from CSSOM here — safe to set in clone).

## Nav
- `position: sticky; top: 0; z-index: 1000;`
- **No transform on scroll** — background stays transparent, no shrink, no bg change, no shadow.
- Banner above nav scrolls away naturally (not sticky).
- Desktop: full menu with dropdown indicators (↓ glyph after "Crusoe Cloud", "AI Infrastructure", "About", "Resources"). Assume hover-open dropdown panels.
- Mobile (<768): hamburger replaces center menu; right-side CTA hidden behind hamburger.

## Hero
- Left column: static typesetting.
- Right column: animated line-art visualization — single yellow dots moving along wireframe curves (SVG / Canvas / Lottie, indeterminate; safe to approximate with pure CSS ring + dot + `@keyframes` orbit).
- **Banner "Join us →" link** uses yellow color #ceeb13 on the dark-green banner.

## Accordion (`.is-grid-info` rows)
- Rows stacked vertically with horizontal divider line between them.
- Each row: big white title + ↓ arrow on right.
- On click: row expands to reveal content below (animated height).
- Only one open at a time (inferred — standard pattern).
- Transition: `height .3s ease` or similar.

## Buttons
- Hover transitions: `background-color .25s, border-radius .25s`.
- Primary (yellow filled): hover — darkens to ~`#a0b711` (observed rgb(160, 183, 17) in palette).
- Ghost (white outline): hover — fill with white, text switches to black (inferred pattern).

## Partner logo strip
- Class `.partners-scroll` suggests marquee/infinite scroll. Observed truncation at edges in screenshot. Likely a CSS keyframe animation or Embla/Swiper loop.

## Testimonials
- `.cc-quotes` with `.swiper` detected elsewhere on page — likely Swiper.js carousel with 2–3 visible cards at desktop.

## Model swiper (in first accordion)
- `.swiper-wrapper.is-services` → Swiper horizontal carousel with multiple model cards ("Nemotron 3", "DeepSeek V3", "gpt-oss", "Llama 3.3", etc. — 230px × 246px each).

## Responsive
- Breakpoints (Webflow defaults): 1440 / 991 / 767 / 479
- Hero H1 at 1440: **70px / 73.5px / -3.5px**
- Hero H1 at 390: **40px / 42px / -0.8px** → use `clamp(40px, 4.8vw, 70px)` as proxy
- Buttons don't shrink (stay 32px tall at all viewports)
- Container: `max-width: 1408px` with viewport-proportional side gutters (~13.75% or ~27px on mobile)

## What we will NOT clone
- Webflow's Mktoform newsletter integration (just use a static email field)
- Robinson AI chatbot widget (proprietary third party)
- Proprietary isometric illustrations (we'll recreate simple original line-art in SVG)
- Swiper.js runtime (can be replaced with CSS scroll-snap or Embla if needed)
