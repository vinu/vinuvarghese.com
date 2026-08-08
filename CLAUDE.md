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
- The hero no longer runs a three.js scene — `HeroScene.tsx` and the `@react-three/fiber`/`three` dependencies were removed as part of the teletext redesign (a flat broadcast medium has no wireframe/particle background).
- Reveal-on-scroll (`[data-reveal]`) is one vanilla script in `index.astro`: a `pour-in` clip-path wipe simulating a broadcast page arriving, skipped entirely under `prefers-reduced-motion`. The head script adds an `html.js` class — reveal-hiding CSS only applies under `.js` so no-JS visitors see full content. Card tilt and magnetic buttons (physical/tactile devices from the old design world) were retired in the same redesign.
- Tailwind 4 runs via `@tailwindcss/postcss` (`postcss.config.mjs`) — NOT `@tailwindcss/vite`, which breaks against Astro 7's rolldown-based Vite 8, and NOT the deprecated `@astrojs/tailwind`. There is no `tailwind.config` file; all theme tokens live in `src/index.css` under `@theme`.
- Google Analytics (`gtag.js`) loads as a normal async script in `Layout.astro` — not proxied through Partytown. That was tried and quietly dropped 100% of analytics data (Astro's `define:vars` strips the `type="text/partytown"` attribute, and even after fixing that, Partytown's worker sandbox never actually fetched `gtag/js`— confirmed via GA4 Admin showing zero data ever received). Don't reintroduce Partytown for this.
- `@astrojs/sitemap` generates XML sitemaps at build time.
- lucide-react 1.x removed brand icons — GitHub/LinkedIn/Stack Overflow SVGs live in `src/components/Icons.tsx`.

### Key directories

- `src/pages/` — Astro file-based routing (`index.astro`, `404.astro`)
- `src/layouts/Layout.astro` — Main layout wrapper (SEO meta, JSON-LD, analytics, fonts, theme init script)
- `src/components/` — React components (Navigation, Hero, About, Experience, Skills, Contact, Footer, PageHeader, Icons, TerminalPortfolio)
- `src/data/resume.ts` — Centralized resume data (experiences, skills, stats, contact links, nav items). Single source of truth used by multiple components.
- `src/utils/ImageUtils.ts` — Image optimization via Astro's `getImage()` API
- `src/index.css` — Tailwind 4 `@theme` tokens, keyframes, `tt-frame`/`tt-rule`/`tt-scanlines` teletext utilities
- `public/robots.txt` — Crawler rules and sitemap reference

### Design system ("broadcast teletext service")

Full DESIGN.md at the project root documents this system in detail; keep it in sync with this summary.

- **Type**: VT323 (single typeface for everything — both `--font-sans` and `--font-mono`) via Google Fonts in `Layout.astro`. No font pairing.
- **Palette** (defined in `@theme` in `src/index.css`): `paper`/`ink` (printed-register neutrals, light mode) plus plain `bg-black`/`text-white` (broadcast-register neutrals, dark mode, not tokens) and six functional role colors — `yellow` (display type), `cyan` (signal/active accent), `green` (data/stat values), `red` (alert, reserved), `red-chip` (alert, actually used — LIVE tag, 404 header), `blue` (structural chrome fill: nav pills, Experience/Skills/Terminal header bars, always white-on-blue).
- **Registers, not just light/dark**: light mode = printed teletext (ink-only text/borders on paper); dark mode = broadcast (full color on black). Filled chips (page-address nav pills, LIVE tag, 404 header) keep their broadcast color in both registers — only running text/borders/stat figures fall back to ink in light mode.
- **Motifs**: pages addressed by number (`100 HOME` … `500 CONTACT`) via `Navigation.tsx`, not a scrolling section list; double-height page numbers/titles (`transform: scaleY(1.15)`) in `PageHeader.tsx`/`Hero.tsx`/`404.astro`; `tt-frame` (2px border) and `tt-rule` (dashed divider) in place of shadows/cards; zero border-radius everywhere (the one invariant carried over from the prior "Engineering Blueprint" system).
- Signature component: `Skills.tsx`'s subpage carousel — auto-advances every 6s through numbered subpages 401–406, pauses/shows "HELD" on interaction.

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
