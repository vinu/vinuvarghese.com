---
name: Vinu Varghese — Portfolio
description: A tensegrity structure rendered live in WebGL — carbon rods, amber tension cables, joint nodes, and a cut-corner engineering-signage system in a dark or daylight studio.
colors:
  carbon: "#0d0d0f"
  void: "#f7f7f8"
  ash: "#9a9a9c"
  concrete: "#e6e3df"
  graphite: "#1c1c1e"
  amber-deep: "#8a4a05"
  amber-bright: "#f59e0b"
typography:
  display:
    fontFamily: "Big Shoulders Display, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3.75rem, 9vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "-0.01em"
    textTransform: "uppercase"
  headline:
    fontFamily: "Big Shoulders Display, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 4vw, 3rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.01em"
    textTransform: "uppercase"
  body:
    fontFamily: "IBM Plex Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "IBM Plex Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    letterSpacing: "0.05em"
rounded:
  none: "0px"
  full: "999px"
spacing:
  section-y: "4rem"
  section-y-md: "7rem"
components:
  button-primary:
    backgroundColor: "{colors.amber-deep}"
    textColor: "{colors.void}"
    rounded: "{rounded.none}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.amber-deep}"
  card:
    backgroundColor: "transparent"
    rounded: "{rounded.none}"
    padding: "24px"
---

# Design System: Vinu Varghese — Portfolio

## Overview

**Creative North Star: "The Tensegrity Column"**

The portfolio is built like a tensegrity structure: rigid carbon rods that never touch, held in shape by taut amber cables, standing because of balanced opposing forces rather than a stacked frame. That's the literal 3D object anchoring the hero — a live-rendered WebGL lattice, not a photo or an illustration — and it's also the site's governing metaphor: twenty years of breadth across cloud, AI, and full-stack work holds together the same way, no single point of failure.

The system runs two registers. Dark is the **night studio**: carbon-black ground, void-white text, the lattice lit dramatically against near-black. Light is the **daylight studio**: poured-concrete ground, graphite text, the same lattice rendered in dark line-work against a warm neutral field. Both registers share one accent — Signal Amber — and the same cut-corner, engineering-signage vocabulary.

Explicit anti-reference: this replaces a prior "Broadcast Teletext Service" identity (flat, monospace-only, numbered pages) that didn't read as modern or dimensional. It also explicitly refuses the generic AI-portfolio default — a rotating abstract glass blob on a dark gradient with floating glassmorphic cards. The lattice is dimensional and animated, but it's a real, specific, procedurally-built structure tied to the product's own metaphor, not decorative motion for its own sake.

**Key Characteristics:**
- A live WebGL rod-and-cable lattice (rigid carbon struts, tensioned amber cables, dark joint-node spheres at every intersection, a soft ground contact shadow) anchors the hero, rotating slowly with a subtle breathing scale pulse
- Display type is a condensed industrial grotesk, always set in caps — engineering-signage voice, not default-case headings
- One accent color (Signal Amber) carries the whole system, split into two mode-safe variants — amber has no single bare value that's safe in both registers, so every use picks the correct one
- A cut-corner clip-path silhouette (`.notch`) replaces the traditional rounded-corner or square-corner language on buttons, cards, and chips
- A dot-plus-rule "leader-line" annotation motif is the recurring engineering-callout idiom for stats, timestamps, and metadata — real data only, never invented figures
- Primary calls to action carry a trailing "+" glyph, a device borrowed directly from the world's quality-bar reference

## Colors

Five neutrals across two registers plus one accent, split into two mode-safe variants.

### Primary
- **Signal Amber, Deep** (`#8a4a05` — `--color-amber-deep`): The light-register value — used for text, borders, focus rings, and fills in light mode. Verified ~5.5:1 against Concrete as text, clears the 3:1 non-text bar comfortably as a border/focus ring too.
- **Signal Amber, Bright** (`#f59e0b` — `--color-amber-bright`): The dark-register value — same roles, dark mode. Verified ~9.6:1 against Carbon.

### Named Rules
**The Mode-Safe Everything Rule.** Amber is an inherently bright hue: the bright variant fails contrast on light backgrounds (as low as 1.7:1 on Concrete, failing even the 3:1 non-text bar), and the deep variant is too dark to read well against Carbon. Unlike the prior "Tension Red" system — which had one bare value safe enough for fills/borders/large-text in both registers — amber has **no safe bare value**. Every single use (text, border, focus ring, fill) picks `amber-deep` in light mode and `amber-bright` in dark mode; there is no shortcut class. Fills pair `amber-deep` with void text in light mode and `amber-bright` with carbon text in dark mode (bright amber fails contrast against light/void text).

### Neutral
- **Carbon** (`#0d0d0f` — `--color-carbon`): Night-studio (dark mode) ground.
- **Void** (`#f7f7f8` — `--color-void`): Night-studio text and border base.
- **Ash** (`#9a9a9c` — `--color-ash`): Night-studio secondary/caption text (~7.2:1 on Carbon).
- **Concrete** (`#e6e3df` — `--color-concrete`): Daylight-studio (light mode) ground.
- **Graphite** (`#1c1c1e` — `--color-graphite`): Daylight-studio text and border base.

## Typography

**Display/Headline Font:** Big Shoulders Display (condensed industrial grotesk)
**Body Font:** IBM Plex Sans
**Label/Mono Font:** IBM Plex Mono

**Character:** A real three-tier pairing, not a single face doing every job. Big Shoulders Display carries the hero name and every section heading — condensed, heavy, built for signage rather than screens, and always set in caps. IBM Plex Sans carries paragraph prose, chosen for the same engineering register as the mono face without sacrificing long-form legibility. IBM Plex Mono carries anything that reads as data, label, or system chrome.

### Hierarchy
- **Display** (800, `clamp(3.75rem, 9vw, 6rem)`, line-height 0.92, uppercase): Hero name only.
- **Headline** (700, `clamp(1.875rem, 4vw, 3rem)`, line-height 1, uppercase): Section headings, Experience role titles, Skills node titles.
- **Body** (400, 1rem, line-height 1.6): Paragraph copy.
- **Label** (400, 0.75rem, tracking 0.05em, often uppercase): Nav links, stat captions, terminal chrome, contact-row labels, leader-line annotations.

### Named Rules
**The Signage Caps Rule.** Every Big Shoulders Display heading is set in uppercase via CSS `text-transform`, never relying on the source string's casing. This matches the quality-bar reference's engineering-signage voice; a mixed-case display heading is a regression, not a style choice.

## Layout

Single-column, long-scroll page capped at `max-w-6xl`, centered with `px-6` gutters. Section rhythm steps from `py-16` (mobile) to `py-28` (`md:`). The Hero breaks to a two-column grid (`md:grid-cols-[1.1fr_0.9fr]`) pairing text/CTA/stats against the 3D lattice; About splits `md:grid-cols-12` (7/5) between prose and the stat annotation list; Experience runs a vertical timeline rail with joint-dot markers echoing the lattice's own joints.

## Elevation & Depth

Mostly flat — no drop shadows on 2D UI, hairline borders (`border-graphite/12` / `border-void/12`) do the structural separation work instead. Depth lives almost entirely in the one place it should: the 3D lattice itself, which carries real geometric depth (cylindrical rods and cables, spherical joint nodes) plus a soft `ContactShadows` ground plane grounding it in the studio space. The terminal modal is the one 2D element with a real shadow (`0 32px 80px -24px rgba(0,0,0,0.7)`), since it needs to read as detached from the page behind it.

### Named Rules
**The Depth Belongs to the Structure Rule.** 2D chrome stays flat and border-defined; dimensional shadow and volume are reserved for the lattice, which is the one place the product's "dimensional" brief is meant to be felt directly rather than simulated with CSS.

## Shapes

A cut-corner silhouette (`.notch` / `.notch-sm`, `clip-path: polygon(14px 0, 100% 0, 100% 100%, 0 100%, 0 14px)` and an 8px variant) is the system's recurring angular signature — buttons, the terminal panel, content cards, the 404 frame. Two deliberate, scoped exceptions to that angular language: the leader-line's hollow dot marker and the 3D lattice's joint-node spheres are fully circular (`rounded-full`, `border-radius: 999px`) — a joint in a structural system is round in reality, and the exception is intentional, not drift.

## Components

### Buttons
- **Shape:** `.notch` cut corner, no other rounding.
- **Primary:** Solid Signal Amber fill (`amber-deep` light mode / `amber-bright` dark mode) paired with mode-matched text (`void` light / `carbon` dark — bright amber fails contrast against void text), `px-6 py-3`, a trailing `+` glyph (`Explore Systems +`, `Return to structure +`) — the plus device is reserved for primary calls to action, not applied to secondary/utility controls.
- **Hover:** `opacity-90`, not a color shift (amber has no third shade to shift to without breaking the mode-safe pairing).
- **Secondary/Utility (theme toggle, Skills node tabs, back-to-top):** Outline or ghost, no fill, no "+" glyph.

### Cards / Containers
- **Corner Style:** `.notch` cut corner.
- **Background:** Near-transparent tint (`bg-graphite/[0.02] dark:bg-void/[0.03]`) over the page ground, not a solid panel color.
- **Border:** `1px solid border-graphite/12` (light) / `border-void/12` (dark), brightening toward the mode-matched amber on hover where interactive.

### Navigation
- **Style:** Fixed top bar, transparent until scrolled, then a translucent blurred backdrop with a hairline bottom border. A small graphite node-diagram mark (with an `amber-deep` accent line, fixed regardless of mode — see Shapes) precedes the wordmark.
- **Link states:** Muted `graphite/60` / `ash` at rest; active/hover resolves to the mode-safe amber pair. Links are separated by literal `/` characters, not pipes or dots.
- **Mobile:** Hamburger opens a full-bleed scrim + panel (fixes a mobile-menu-clipping issue found in the prior redesign's critique).

### Tensegrity Scene (signature component)
A live `@react-three/fiber` WebGL scene: five alternating triangular rings of carbon-fiber rods (cylinders, `roughness 0.35 / metalness 0.6`), connected by thin emissive Signal Amber tension cables (`#f59e0b`, thin cylinders, not flat lines — flat `lineBasicMaterial` was tried first and rejected in finish review for not reading as taut cord), with a small dark sphere at every joint and a soft `ContactShadows` ground plane beneath. The 3D scene doesn't re-theme with light/dark mode (it isn't page text, so the mode-safe pairing rule doesn't apply) — it always uses the bright amber, which reads well against the rods' dark carbon-fiber material regardless of the page's register. The whole lattice rotates slowly (`rotation.y += 0.12/s`) with a subtle breathing scale pulse (`±1.5%`, `sin` over ~14s), driven directly in the Three.js render loop rather than CSS. Lazy-loaded (`React.lazy`) and gated on a WebGL capability probe plus `prefers-reduced-motion`, so it never blocks first paint and never renders for visitors who've asked for less motion.

**Implementation note:** the canvas requires a `requestAnimationFrame` + manual `window.dispatchEvent(new Event('resize'))` nudge on mount — a verified, real workaround for react-three-fiber's resize observer occasionally missing its first size reading when mounted lazily inside a conditionally-rendered `Suspense` boundary. Preserve this if the component is ever refactored; removing it silently reintroduces a canvas stuck at the browser's 300×150 default size.

### Leader-Line Annotation
- **Style:** A hollow `border-current` dot, a label, and a filling hairline rule (`opacity: 0.35`), used for stats, timestamps, and row metadata throughout Hero, About, Experience, Skills, Contact, and Navigation.
- **Scope:** This is a 2D UI annotation idiom echoing the lattice's engineering-callout character — it is not, and should not become, literal lines routed to the 3D scene's actual node coordinates; an earlier draft of this system's own direction contract overclaimed that connection and was corrected during finish review.

## Do's and Don'ts

### Do:
- **Do** set every Big Shoulders Display heading in uppercase — the Signage Caps Rule.
- **Do** use `amber-deep` in light mode and `amber-bright` in dark mode for every accent use (text, border, focus ring, fill) — the Mode-Safe Everything Rule. There is no bare `amber` shortcut.
- **Do** give primary CTAs (and only primary CTAs) a trailing "+" glyph.
- **Do** keep 2D chrome flat and border-defined; reserve real dimensional depth for the 3D lattice — the Depth Belongs to the Structure Rule.
- **Do** use real data in every leader-line annotation; never fabricate a stat, status, or reading to make a section feel more "live."

### Don't:
- **Don't** reintroduce the boxed "icon/number + label" metric-card grid for stats (a finish-review fix removed exactly this pattern from About) — the craft floor bans it outright, and this system's own idiom for stats is the leader-line list.
- **Don't** render the tension cables as flat unlit lines — they're cylindrical, emissive-tinted geometry, matching the rods' material treatment.
- **Don't** round any corner outside the two named exceptions (the leader-line dot, the lattice's joint spheres); everything else uses the cut-corner `.notch` silhouette or stays square.
- **Don't** reach for a second accent hue, a gradient, or glassmorphic panels — the anti-reference is the generic AI-startup portfolio default this system was built to avoid.
- **Don't** use bright amber as fill with light/void text, or deep amber as fill with dark text — both fail contrast; fills always pair the mode-matched amber with the opposite-register neutral.
- **Don't** remove the TensegrityScene mount-time resize nudge without understanding why it's there; the canvas will silently render at the wrong size.
