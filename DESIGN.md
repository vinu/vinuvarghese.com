---
name: Vinu Varghese — Portfolio
description: A broadcast teletext service (CEEFAX-register) portfolio — numbered pages, a fixed six-color broadcast palette, VT323 throughout, zero border-radius.
colors:
  paper: "#f7f5f0"
  ink: "#14120f"
  broadcast-black: "#000000"
  broadcast-white: "#ffffff"
  yellow: "#ffff00"
  cyan: "#00ffff"
  green: "#00ff00"
  red: "#ff0000"
  red-chip: "#b30000"
  blue: "#12206b"
typography:
  display:
    fontFamily: "VT323, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "clamp(3.75rem, 9vw, 8rem)"
    fontWeight: 400
    lineHeight: 0.9
    letterSpacing: "normal"
  headline:
    fontFamily: "VT323, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "clamp(2.25rem, 5vw, 3rem)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "normal"
  title:
    fontFamily: "VT323, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "clamp(1.5rem, 3vw, 1.875rem)"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "normal"
  body:
    fontFamily: "VT323, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "VT323, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "1rem"
    fontWeight: 400
    letterSpacing: "0.02em"
rounded:
  none: "0px"
spacing:
  section-y: "4rem"
  section-y-md: "6rem"
  frame-p: "1.5rem"
  frame-p-md: "2rem"
  gutter-x: "1.5rem"
components:
  button-primary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "10px 20px"
  button-primary-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  nav-chip:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.broadcast-white}"
    rounded: "{rounded.none}"
    padding: "6px 12px"
  nav-chip-active:
    backgroundColor: "{colors.cyan}"
    textColor: "{colors.broadcast-black}"
  chip-alert:
    backgroundColor: "{colors.red-chip}"
    textColor: "{colors.broadcast-white}"
    rounded: "{rounded.none}"
    padding: "2px 8px"
---

# Design System: Vinu Varghese — Portfolio

## Overview

**Creative North Star: "The Broadcast Teletext Service"**

This is a broadcast teletext service, not a scrolling resume — a CEEFAX/Ceefax-register system where content lives on numbered pages (100 Home, 200 About, 300 Work, 400 Skills, 500 Contact) and arrives like a live bulletin rather than unrolling as a webpage. The grammar is entirely broadcast-native: a rigid character grid, block-bordered content units, double-height headers, and a fixed six-color role palette (yellow/cyan/green/red/red-chip/blue) applied by function, never by decoration. One typeface — VT323 — carries every line of copy, matching the single-glyph-set character grid of real teletext hardware rather than pairing a display face against a body face.

The system runs two registers, not a simple light/dark toggle. Dark mode is the **broadcast register**: pure black ground, white body text, and the full role palette in play. Light mode is the **printed-teletext register**: body text and hairlines fall back to plain ink on paper, as if the page had been printed from the broadcast signal — but small filled chips (page-address nav pills, the LIVE tag, the 404 page header) keep their broadcast color as stamped badges on paper in both registers, per real teletext-adjacent print convention. That asymmetry is deliberate and load-bearing, not an inconsistency to fix.

Explicit anti-reference: this is not the "/01 About"-numbered engineering-blueprint identity that preceded it, and it is not a generic dark-gradient developer portfolio. No copper accent, no blueprint grid, no Space Grotesk/JetBrains Mono pairing carries forward — the only survivor from that world is the zero-border-radius invariant and a shared seriousness about engineering credibility.

**Key Characteristics:**
- Content is addressed as numbered pages (100/200/300/400/500), keyed and clicked like a real teletext service, not scrolled as anonymous sections
- One typeface (VT323) for all type, in both roles — no display/body pairing
- A fixed six-color broadcast palette (yellow, cyan, green, red, red-chip, blue) applied strictly by function
- Two registers: full-color broadcast (dark) vs. ink-on-paper printed (light) — with filled chips exempt from the light-mode fallback
- Double-height page numbers and titles (`scaleY(1.15)`), a real teletext typographic convention
- Depth reads through 2px solid `tt-frame` borders and dashed `tt-rule` dividers, not ambient shadows
- Zero border-radius everywhere — the one invariant carried over from the prior "Engineering Blueprint" system

## Colors

Ten roles across two registers: two neutrals per register (paper/ink for print, plain black/white for broadcast) plus six functional broadcast hues used identically in both.

### Primary
- **Signal Cyan** (`#00ffff` — `--color-cyan`): The system's primary interactive/active accent. Used for the active page-address chip, text selection, the focus ring (`:focus-visible`), link/icon/button hover states, the primary CTA's border and hover-fill in both registers, and the terminal prompt glyph. This is the closest analogue to the old system's single-accent rule, but per real teletext convention it is one of several role colors, not the only one.

### Secondary
- **Display Yellow** (`#ffff00` — `--color-yellow`): Reserved for double-height display type — the hero masthead ("VINU VARGHESE"), every `PageHeader` page-number + title pair, and the 404 page's "404" digits. Falls back to plain ink in light-mode running text (it is text color, not a chip).
- **Data Green** (`#00ff00` — `--color-green`): Reserved for numeric/data values — stat-tile figures (hero ticker, About stat quad) and the skill-list `+` marker. Also falls back to ink in light mode; these are data readouts, not chips.
- **Chrome Blue** (`#12206b` — `--color-blue`): Structural chrome fill, always paired with white text, always broadcast-colored regardless of register. Fills the inactive page-address nav chips, the Experience "ITEM 30N" header bar, the Skills subpage bar, the Terminal window's header bar, and the Contact row hover state.

### Neutral
- **Printed Paper** (`#f7f5f0` — `--color-paper`): Light-mode (printed-register) background.
- **Broadcast Ink** (`#14120f` — `--color-ink`): Light-mode text and the base for every `tt-frame`/`tt-rule` border and hairline.
- **Broadcast Black** (`#000000`, plain `bg-black`, no custom property): Dark-mode (broadcast-register) ground. Deliberately not a token — real teletext black is just black.
- **Broadcast White** (`#ffffff`, plain `text-white`, no custom property): Dark-mode text and border color, mirroring Broadcast Black.

### Alert (used sparingly; not yet fully exercised)
- **Alert Red** (`#ff0000` — `--color-red`): The role color for alerts per the system's own direction contract ("red for alerts and the LIVE tag — broadcast convention, on-air is red"). Not yet applied directly anywhere in the shipped build — every current "alert" surface uses Chip Red instead.
- **Chip Red** (`#b30000` — `--color-red-chip`): A darker variant of Alert Red, chosen because it holds reliable white-on-fill contrast at small chip sizes. This is what's actually shipped: the hero's "LIVE" badge and the 404 page's "P404 / PAGE NOT FOUND" header bar.

### Named Rules
**The Chip Exception Rule.** Filled chips with a solid background and white/black text — page-address nav pills, the LIVE tag, the 404 page header — keep their broadcast color in both the printed and broadcast register. Everything else (running text, hairline borders, stat/data figures) falls back to plain ink-on-paper in light mode via a `dark:` pairing. A color's use as a small stamped badge is what exempts it from the light-mode fallback; a color used as running text or a resting number never is.

**The Six-Role Palette Rule.** Only six functional hues exist system-wide — yellow (display), cyan (signal/active), green (data), red (alert, reserved), red-chip (alert, shipped), blue (structural chrome) — plus the register-appropriate neutral pair. No color is introduced outside these roles; a new chip or accent must be justified against this list, not invented ad hoc.

## Typography

**Display/Body/Label Font:** VT323 (with `ui-monospace, SFMono-Regular, Menlo, monospace` fallback) — the only typeface in the system; `--font-sans` and `--font-mono` both resolve to it.

**Character:** A single bitmap-derived broadcast face carries every register in the system — masthead, body copy, labels, terminal chrome. This is a deliberate, cited departure from a display/body font pairing: real teletext hardware renders one character set at one grid resolution, and the system matches that constraint rather than defaulting to a training-data-typical two-font pairing.

### Hierarchy
- **Display** (400, `clamp(3.75rem, 9vw, 8rem)` / text-6xl→text-8xl, leading-[0.9], `scaleY(1.15)`): Hero masthead only ("VINU / VARGHESE") and the 404 page's "404" digits (text-7xl→text-9xl at the same treatment).
- **Headline** (400, `clamp(2.25rem, 5vw, 3rem)` / text-4xl→text-5xl, leading-none, `scaleY(1.15)`): Every `PageHeader` page-number + title pair (200 About, 300 Work, 400 Skills, 500 Contact).
- **Title** (400, text-2xl→text-3xl): Experience role headings, Skills active-subpage title.
- **Body** (400, text-lg→text-xl, leading-relaxed): Paragraph copy throughout.
- **Label** (400, text-sm→text-lg, uppercase or tracked where used): Nav page chips, stat captions, terminal chrome, contact-row labels, prompt copy (`vinu@vinuvarghese.com:~$ whoami`).

### Named Rules
**The One Glyph Rule.** Every line of type on the site — hero name, body prose, nav chips, terminal output — renders in VT323. No second family is introduced for contrast or hierarchy; hierarchy comes entirely from size, the double-height transform, and color role.

**The Double-Height Rule.** Page numbers and titles apply `transform: scaleY(1.15); transform-origin: bottom;` — the hero masthead, every `PageHeader`, and the 404 digit block. This mimics real teletext's double-height row convention and is reserved for that exact role; it does not apply to body text, labels, or card titles.

## Layout

Single-column, long-scroll page capped at `max-w-6xl` and centered with `px-6` gutters, addressed as five numbered pages (100/200/300/400/500) rather than an unlabeled section list. Section rhythm steps from `py-16` (mobile, 4rem) to `py-24` (`md:`, 6rem). About uses a 12-column grid (7/5 split: a `tt-frame` prose panel vs. a 2×2 `tt-frame` stat quad with internal dividers). Experience is a flat vertical stack of independent `tt-frame` items, each with its own blue "ITEM 30N" header bar — not a rail/timeline. Skills is a single `tt-frame` containing a blue subpage-nav bar plus a content pane (the subpage-carousel device; see Components). Contact is one `tt-frame` of stacked address-style rows separated by dashed `tt-rule` dividers. The fixed nav bar is transparent until scrolled past 50px, then gains a `tt-frame` bottom border; page-address chips (100 HOME … 500 CONTACT) replace the prior system's `/01 About` numbered-section motif as the primary navigational structure.

## Elevation & Depth

Flat and bordered by default. Depth reads through 2px solid `tt-frame` borders (ink light / white dark) and 1px dashed `tt-rule` dividers, never through ambient drop shadows on content. The only genuine `box-shadow` values in the system are: the terminal modal panel's detach shadow (`shadow-[0_32px_80px_-24px_rgba(0,0,0,0.7)]`), separating it from the page behind the scrim; and the hero's primary CTA, which uses an *inset* shadow (`shadow-[inset_0_0_0_2px_var(--color-paper)]` light / `black` dark) sitting just inside its 2px border to draw a groove-like double-border "SELECT" button treatment — a signature detail, not a general button rule (the 404 page's CTA uses a plain single border with no inset).

**Not yet reached:** the world's own reference materials (Ceefax-style catalog imagery) use dither and halftone as native rendering devices — coarse dot patterns standing in for continuous tone on broadcast-resolution displays. The current build doesn't use either; the hero portrait ships as a plain grayscale photograph (`grayscale contrast-125`) rather than a halftone or dithered treatment. This is a legitimate gap for future work, not a rule against the device — dither/halftone belong to this world and should be picked up, not avoided.

### Named Rules
**The Bordered-Not-Shadowed Rule.** Structural depth is a border or a dashed rule, never a resting shadow. A shadow appearing on a piece of content at rest (not a modal, not an inset CTA groove) is a bug, not a variant.

## Shapes

Zero border-radius everywhere — no `rounded-*` utility appears anywhere in the codebase. This is the one invariant carried forward unchanged from the prior "Engineering Blueprint" system. Borders are always 2px solid (`tt-frame`) or 1px dashed (`tt-rule`), in ink (light) or white (dark), and do all the framing/separation work a card-elevation system would do elsewhere: bordering the hero stat ticker, the About panels, every Experience item, the Skills carousel, the Contact block, the nav bar on scroll, the mobile menu panel, the theme dropdown, and the terminal window.

## Components

Every content unit sits inside a rigid `tt-frame` border, styled to read as a broadcast page module rather than a soft card.

### Buttons
- **Shape:** Square corners, always a visible 2px border — never borderless, never filled at rest except the two dedicated filled variants below.
- **Primary CTA ("SELECT" style, hero only):** Transparent background, `border-2 border-ink` (light) / `border-cyan` (dark), plus an inset 2px paper/black shadow drawing a groove just inside the border. Hover fills solid ink/cyan with inverted text and drops the inset shadow.
- **Secondary CTA (404 "SELECT cd ~"):** Same border-and-invert hover logic, without the inset groove — the simpler of the two treatments.
- **Floating action (terminal launcher, back-to-top):** Solid filled square icon buttons (`bg-cyan text-black`, or bordered ink/white), fixed bottom-right, stacked above each other.

### Chips
- **Page-address nav chip:** `font-mono` number + label, `bg-blue text-white border-blue` at rest, `bg-cyan text-black border-cyan` when active — broadcast-colored in both registers per the Chip Exception Rule.
- **Alert/status chip (LIVE tag, 404 header):** `bg-red-chip text-white`, small, uppercase, no border — the filled-badge alert treatment.
- **Skills subpage number chip:** Same chip grammar as nav (`bg-cyan` active / transparent-bordered-white inactive), plus a third state, `bg-yellow text-black`, for the HOLD/HELD toggle.

### Cards / Containers (`tt-frame`)
- **Corner Style:** Square, 0 radius, no exceptions.
- **Background:** `bg-paper` / `bg-black`, occasionally with a blue chrome header bar (Experience items, Skills bar, Terminal header) that is always broadcast-blue with white text regardless of register.
- **Shadow Strategy:** None at rest; see Elevation & Depth.
- **Border:** `2px solid` ink (light) / white (dark) via `.tt-frame`.
- **Internal Padding:** `p-5`–`p-6` mobile → `p-6`–`p-8` desktop (1.25–2rem), depending on component.

### Navigation
- **Style:** Fixed top bar, transparent until 50px scroll, then gains a `tt-frame` bottom border. Logo is a filled cyan "P100" chip. Page-address chips (100 HOME, 200 ABOUT, 300 WORK, 400 SKILLS, 500 CONTACT) run horizontally on desktop; active section (via `IntersectionObserver`) resolves to the cyan-filled active chip state.
- **Theme toggle:** Monitor/Sun/Moon icon opening a `tt-frame` dropdown; options are labeled **AUTO** (system), **PRINT** (light/printed register), **BROADCAST** (dark/broadcast register) — the labels are in-world, not generic theme names.
- **Mobile:** Hamburger + full-screen scrim panel listing the same page-address chips stacked and centered.

### Skills Subpage Carousel (signature component)
The system's clearest medium-native device. Six skill categories are numbered subpages (401–406) inside a single `tt-frame`, auto-advancing every 6 seconds like a real teletext subpage cycling on a fixed page number. Selecting a subpage number or pressing **HOLD** stops the cycle and shows **HELD** — a genuine broadcast-page interaction (holding a subpage on a real teletext remote), not decorative animation. Disabled entirely under `prefers-reduced-motion`.

### Terminal
`TerminalPortfolio.tsx`'s command/filesystem logic is unchanged from the prior system and out of scope here. Its chrome was restyled to match the rest of this system: a blue header bar (matching Experience/Skills bars) with a **CLOSE** text button in place of a macOS traffic-light metaphor, and the modal panel carries the system's one detach drop-shadow.

## Do's and Don'ts

### Do:
- **Do** keep every corner square. Zero border-radius is a hard invariant carried over unchanged from the prior system.
- **Do** set VT323 for all type, in every role — no second typeface, ever.
- **Do** keep filled chips (nav pills, LIVE tag, 404 header) broadcast-colored in light mode, per the Chip Exception Rule — do not let them fall back to ink-on-paper.
- **Do** let running text, borders, and stat/data figures fall back to plain ink in light mode via `dark:`-prefixed color roles.
- **Do** use `scaleY(1.15)` on page numbers and titles only — the Double-Height Rule is reserved for that role.
- **Do** use `tt-frame` (2px solid border) and `tt-rule` (1px dashed) for structural separation instead of shadows or elevation.
- **Do** use Chip Red (`#b30000`) rather than bare Alert Red (`#ff0000`) for any small filled badge that needs reliable white-text contrast.
- **Do** treat cyan as the system's primary interactive/active signal — active nav state, focus rings, selection, hover, primary CTA.

### Don't:
- **Don't** round any corner, anywhere, for any reason.
- **Don't** pair VT323 with a second font for "hierarchy" — hierarchy comes from size, the double-height transform, and color role only.
- **Don't** add a resting drop-shadow to page content. The terminal's detach shadow and the hero CTA's inset groove are the only two exceptions, both named above.
- **Don't** introduce a color outside the six-role palette (yellow/cyan/green/red/red-chip/blue) plus the two register-neutral pairs.
- **Don't** reintroduce the prior "Engineering Blueprint" identity — copper accent, blueprint grid texture, Space Grotesk/JetBrains Mono pairing, `/01`-style numbered sections. None of it carries forward except zero-radius.
- **Don't** avoid dither/halftone rendering on the assumption it's off-brand — it's a native device of this world that the current build simply hasn't reached yet (see Elevation & Depth).
