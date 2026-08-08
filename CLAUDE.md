# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Vinu Varghese (www.vinuvarghese.com), built with Astro and deployed to GitHub Pages.

## Commands

```bash
npm run dev       # Start dev server
npm run build     # Production build (outputs to ./dist)
npm run preview   # Preview production build locally
```

No test framework is configured. Node v24 is required (see .nvmrc); Astro 7 needs Node >= 22.12.

## Architecture

**Astro 7 + React 19 + Tailwind CSS 4** using Astro's Islands Architecture.

- Pages are static HTML by default. React components hydrate only when marked with a `client:*` directive in Astro templates.
- Hydrated islands: `Navigation.tsx` and `Hero.tsx` (`client:load`), `Skills.tsx` (`client:visible`). Everything else renders as static HTML.
- The hero runs a live `@react-three/fiber` scene (`TensegrityScene.tsx`) — a procedurally-generated tensegrity lattice (carbon rods, tensioned cables, joint nodes, ground shadow), lazy-loaded via `React.lazy` so three.js (~230KB gz) sits in its own chunk fetched after hydration. Gated on a WebGL capability probe and `prefers-reduced-motion`. Needs a `requestAnimationFrame` + manual `resize` event dispatch on mount to work around a real r3f canvas-sizing bug when lazy-mounted inside a conditional `Suspense` branch — see DESIGN.md's Tensegrity Scene section before touching this.
- Reveal-on-scroll (`[data-reveal]`) is one vanilla script in `index.astro`: a fade+rise (`translateY(18px)→0`), skipped entirely under `prefers-reduced-motion`. The head script adds an `html.js` class — reveal-hiding CSS only applies under `.js` so no-JS visitors see full content.
- Tailwind 4 runs via `@tailwindcss/postcss` (`postcss.config.mjs`) — NOT `@tailwindcss/vite`, which breaks against Astro 7's rolldown-based Vite 8, and NOT the deprecated `@astrojs/tailwind`. There is no `tailwind.config` file; all theme tokens live in `src/index.css` under `@theme`.
- Google Analytics (`gtag.js`) loads as a normal async script in `Layout.astro` — not proxied through Partytown. That was tried and quietly dropped 100% of analytics data (Astro's `define:vars` strips the `type="text/partytown"` attribute, and even after fixing that, Partytown's worker sandbox never actually fetched `gtag/js`— confirmed via GA4 Admin showing zero data ever received). Don't reintroduce Partytown for this.
- `@astrojs/sitemap` generates XML sitemaps at build time.
- lucide-react 1.x removed brand icons — GitHub/LinkedIn/Stack Overflow SVGs live in `src/components/Icons.tsx`.

### Key directories

- `src/pages/` — Astro file-based routing (`index.astro`, `404.astro`)
- `src/layouts/Layout.astro` — Main layout wrapper (SEO meta, JSON-LD, analytics, fonts, theme init script)
- `src/components/` — React components (Navigation, Hero, TensegrityScene, About, Experience, Skills, Contact, Footer, SectionHeading, Icons, TerminalPortfolio)
- `src/data/resume.ts` — Centralized resume data (experiences, skills, stats, contact links, nav items). Single source of truth used by multiple components.
- `src/utils/ImageUtils.ts` — Image optimization via Astro's `getImage()` API
- `src/index.css` — Tailwind 4 `@theme` tokens, `.notch`/`.notch-sm` cut-corner clip-path utilities, `.leader` annotation utility
- `public/robots.txt` — Crawler rules and sitemap reference

### Design system ("the tensegrity column")

Full DESIGN.md at the project root documents this system in detail; keep it in sync with this summary.

- **Type**: three-tier pairing via Google Fonts in `Layout.astro` — Big Shoulders Display (condensed grotesk, always uppercase, hero name + section/role headings), IBM Plex Sans (body prose), IBM Plex Mono (labels/data/UI chrome).
- **Palette** (defined in `@theme` in `src/index.css`): `carbon`/`void`/`ash` (night-studio neutrals, dark mode), `concrete`/`graphite` (daylight-studio neutrals, light mode), and one accent — Signal Amber — split into two mode-safe variants: `amber-deep` (light mode) / `amber-bright` (dark mode), used for every accent role (text, border, focus ring, fill). There is no bare `amber` shortcut — amber is bright enough that neither variant is safe in the opposite register. See DESIGN.md's Mode-Safe Everything Rule.
- **Signature component**: `TensegrityScene.tsx` — a live WebGL rod-and-cable lattice anchoring the hero (see Architecture above). The `.leader` dot-plus-rule annotation motif (stats, timestamps, metadata) is the system's recurring 2D echo of the lattice's engineering-callout character — real data only, and explicitly NOT literal lines routed to the 3D scene's node coordinates.
- **Shapes**: `.notch`/`.notch-sm` cut-corner clip-path is the recurring silhouette on buttons/cards/panels. Two deliberate circular exceptions: the leader-line dot and the lattice's joint-node spheres.
- Primary CTAs carry a trailing `+` glyph; secondary/utility controls do not.

### Theme system

Light/dark theme with three modes: **System** (default), **Light**, **Dark**.

- **Dark variant**: `@custom-variant dark` in `src/index.css` — dark mode activates when `<html>` has the `dark` class.
- **FOUC prevention**: Inline `<script>` in `Layout.astro` `<head>` reads `localStorage('theme')` and falls back to `prefers-color-scheme` before first paint.
- **Toggle**: Dropdown in `Navigation.tsx` with Monitor/Sun/Moon icons. Persists to `localStorage`. System mode listens for live OS preference changes via `matchMedia('change')`.
- **Convention**: Light-mode styles are the base (unprefixed), dark-mode styles use `dark:` prefix.
- **Terminal**: Always dark regardless of theme (authentic terminal aesthetic).

### SEO

- Canonical URL and Open Graph tags in `Layout.astro` (dynamic via `Astro.url.pathname`)
- JSON-LD structured data (Person schema) with skills, employer, social links
- XML sitemap via `@astrojs/sitemap` (requires `site` in `astro.config.mjs`)
- `public/robots.txt` allows all crawlers

### Terminal

`TerminalPortfolio.tsx` is a Linux-like terminal emulator with:
- Virtual filesystem (`~/about.txt`, `~/skills/`, `~/experience/`, `~/contact.txt`)
- Commands: `ls`, `cd`, `pwd`, `cat`, `tree`, `grep`, `whoami`, `hostname`, `uname`, `date`, `echo`, `history`, `man`, `open`, `neofetch`, `help`, `clear`, `exit`
- Tab completion for commands and file paths
- Command history navigation (Up/Down arrows)
- Easter eggs: `sudo`, `rm -rf /`, `vim`/`nano`

## Deployment

GitHub Actions workflow (`.github/workflows/create-gh-pages.yml`) builds on push to master and deploys to GitHub Pages. The build runs `npm ci && npm run build` with Node 24.x.

## TypeScript

Strict mode via `astro/tsconfigs/strict`. Astro-specific types from `.astro/types.d.ts`.
