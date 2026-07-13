# Premium 3D redesign — design spec

Date: 2026-07-13 · Branch: `redesign-3d` · Approved by user.

## Goal

Elevate the existing "engineering blueprint" design into a premium, futuristic
engineering site (Linear/Raycast/Apple restraint) while preserving the current
identity: paper/night monochrome, single copper accent, Space Grotesk +
JetBrains Mono, square corners, numbered sections. No blue gradients, no
cyberpunk.

## Architecture: one R3F island, CSS/SVG everywhere else

Three.js is the cost center (~150KB gz). It ships in exactly one lazy island;
every other effect is CSS, SVG, or a few lines of vanilla JS. All content stays
server-rendered — SEO output unchanged.

| Piece | Tech | Hydration |
|---|---|---|
| Hero 3D scene (wireframe cube + particle network) | R3F + three | `client:idle`, own chunk |
| Career timeline scroll reveal | IntersectionObserver + CSS | inline script, no hydration |
| Tech constellation (Skills) | SVG + React state | `client:visible` (no three) |
| Immersive experience cards (3D tilt, glass panel) | CSS perspective + pointermove | inline script |
| Architecture visualization | SVG stroke-draw on scroll | CSS only |
| Micro-interactions (magnetic buttons, focus) | CSS + inline script | inline script |

## Components

1. **HeroScene.tsx** — R3F `<Canvas>` behind hero content: slowly rotating
   wireframe cube (EdgesGeometry, copper), ~80-node drifting particle network
   with proximity lines, mouse parallax. DPR capped at 2, `frameloop` paused
   when tab/section not visible. Renders nothing when `prefers-reduced-motion`
   or no WebGL — static blueprint grid remains the fallback.
2. **Experience.tsx** — entries get `data-reveal` (fade/slide on enter),
   rail markers draw in, cards get `data-tilt` perspective hover with copper
   edge glow and a sparing `backdrop-blur` glass panel.
3. **Skills.tsx** — desktop: animated SVG constellation (categories orbiting a
   center node, hairline connectors, hover/focus highlights category and shows
   its skills in a side panel). Mobile & reduced-motion: current grid.
4. **ArchDiagram.astro** — static SVG blueprint (client → edge → services →
   data) that draws itself in on scroll via `.in-view` + stroke-dashoffset.
   Sits inside About.
5. **enhance script** (inline in index.astro) — one small vanilla IIFE:
   IntersectionObserver for `[data-reveal]`/`.in-view`, pointer tilt for
   `[data-tilt]`, magnetic hover for `[data-magnetic]`. Skips everything under
   `prefers-reduced-motion`.

## Guardrails

- `prefers-reduced-motion: reduce` disables scene, reveals, tilt, magnetic.
- Lighthouse performance ≥ 90; three.js chunk never blocks first paint.
- No new fonts, no new sections invented; projects treatment applies to real
  experience data from `resume.ts`.
- Keyboard/focus parity for everything hover does.

## Out of scope

Dedicated projects section (no data), CMS, blog, additional pages.
