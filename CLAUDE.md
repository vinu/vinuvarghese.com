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
- `HeroScene.tsx` (React Three Fiber: wireframe cubes + particle network behind the hero) is `React.lazy`-loaded from `Hero.tsx`, so three.js (~230KB gz) sits in its own chunk fetched after hydration and never blocks first paint. It's gated on WebGL support and `prefers-reduced-motion`, watches the `dark` class for theme colors, and pauses its frameloop when the hero is off-screen.
- Scroll/hover effects (reveal-on-scroll `[data-reveal]`, card tilt `[data-tilt]`, magnetic buttons `[data-magnetic]`) are one vanilla script in `index.astro`, all skipped under `prefers-reduced-motion`. The head script adds an `html.js` class — reveal-hiding CSS only applies under `.js` so no-JS visitors see full content.
- Tailwind 4 runs via `@tailwindcss/postcss` (`postcss.config.mjs`) — NOT `@tailwindcss/vite`, which breaks against Astro 7's rolldown-based Vite 8, and NOT the deprecated `@astrojs/tailwind`. There is no `tailwind.config` file; all theme tokens live in `src/index.css` under `@theme`.
- Google Analytics runs in a Web Worker via Partytown integration.
- `@astrojs/sitemap` generates XML sitemaps at build time.
- lucide-react 1.x removed brand icons — GitHub/LinkedIn/Stack Overflow SVGs live in `src/components/Icons.tsx`.

### Key directories

- `src/pages/` — Astro file-based routing (`index.astro`, `404.astro`)
- `src/layouts/Layout.astro` — Main layout wrapper (SEO meta, JSON-LD, analytics, fonts, theme init script)
- `src/components/` — React components (Navigation, Hero, HeroScene, About, ArchDiagram, Experience, Skills, Contact, Footer, SectionHeading, Icons, TerminalPortfolio)
- `src/data/resume.ts` — Centralized resume data (experiences, skills, stats, contact links, nav items). Single source of truth used by multiple components.
- `src/utils/ImageUtils.ts` — Image optimization via Astro's `getImage()` API
- `src/index.css` — Tailwind 4 `@theme` tokens, keyframes, blueprint grid utility
- `public/robots.txt` — Crawler rules and sitemap reference

### Design system ("engineering blueprint")

- **Type**: Space Grotesk (display/body) + JetBrains Mono (labels, prompts) via Google Fonts in `Layout.astro`.
- **Palette** (defined in `@theme` in `src/index.css`): `paper` (warm off-white bg), `night` (warm near-black bg), `ink` (text on paper), `copper` / `copper-bright` (single accent; use `text-copper dark:text-copper-bright`).
- **Motifs**: numbered sections via `SectionHeading` (`/01 About` … `/04 Contact`), monospace overlines, hairline rules (`border-ink/10 dark:border-white/10`), square corners everywhere (no rounded), `.blueprint` CSS grid texture on hero/404, terminal-prompt flavored copy (`$ ./portfolio --interactive`).
- Secondary text uses Tailwind `stone-*` grays.

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
