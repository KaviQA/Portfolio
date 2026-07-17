# David Johnson — AI Engineer Portfolio

A single-page animated portfolio built around the Figma "Cherry Blossom" palette
(combination #24: `#F2C7C7`, `#FFFFFF`, `#D5F3D8`, `#FFB7C5`), recast as a dark
"Night Bloom" design language: the palette's pinks and pale green act as light
sources on a plum-ink field.

All content is sourced from `src/data/resume.ts`, which mirrors the resume PDF
in this repository. Edit that one file to update the site.

## Stack

- **Vite + React 19 + TypeScript**
- **Tailwind CSS v4** (design tokens in `src/styles/global.css` under `@theme`)
- **GSAP 3 + ScrollTrigger + SplitText** for scroll choreography
- **Lenis** for smooth scrolling (disabled under `prefers-reduced-motion`)
- **Satoshi** (display/body) + **JetBrains Mono** (numbers/meta), self-hosted variable fonts

## Commands

```bash
npm install
npm run dev       # local dev server
npm run build     # type-check + production build to dist/
npm run preview   # serve the production build
```

## Architecture notes

- `src/data/resume.ts` — single source of truth for all copy, metrics, roles, projects.
- `src/lib/gsap.ts` — one place where GSAP plugins are registered.
- `src/lib/useLenis.ts` — Lenis driven by the GSAP ticker so ScrollTrigger stays in sync; exposes `scrollToAnchor` for nav links.
- `src/lib/useReveal.ts` — declarative scroll reveals via `[data-reveal]` / `[data-reveal-group]` attributes.
- `src/components/PetalCanvas.tsx` — generative hero visual (Canvas 2D, zero React state, pauses off-screen and on hidden tabs, static frame under reduced motion).
- Projects use a CSS `position: sticky` card stack; GSAP only scrubs the scale/dim of the outgoing card, so the layout still works with JavaScript animations off.

## Accessibility & performance

- Every animation is gated behind `prefers-reduced-motion`; content is never hidden without it.
- Text colors meet WCAG AA against the ink background; focus-visible rings on all interactive elements.
- Only `transform` and `opacity` are animated; the canvas caps device-pixel ratio at 2 and scales petal count with viewport area.
- Fonts are preloaded, variable, and `font-display: swap`.
