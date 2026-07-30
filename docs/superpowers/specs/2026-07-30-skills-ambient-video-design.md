# Skills-section ambient video — design spec

Date: 2026-07-30 · Branch: `master` (or a short-lived feature branch) · Approved by user.

## Goal

Embed a 12.4s portrait stock clip of a moody dev desk (dual monitors running
code, backlit keyboard, red/orange ambient light, slow rack-focus) as a
purely decorative, atmospheric background layer behind the Skills section's
technology constellation. It reinforces the "engineering blueprint" mood
without pretending to be real footage of the user's work — it's texture, not
evidence.

Source file: `14188177_2160_3840_25fps.mp4` (18.6MB, 2160×3840, h264, no
scroll-scrub or pinning — the video just loops ambiently).

## Non-goals

- Not a hero replacement, not a new standalone section.
- Not scroll-scrubbed playback, not pinned/sticky.
- Not shown on mobile or in light mode (see Placement & gating).
- No new npm dependency (no GSAP/ScrollTrigger) — CSS scroll-driven
  animations cover the parallax need natively.

## 1. Asset pipeline (one-time preprocessing, not part of the app build)

- `ffmpeg` re-encode: scale to ~720px-wide portrait, H.264, strip audio,
  `-movflags +faststart`, CRF tuned for a target well under 2MB (background
  texture doesn't need source resolution or bitrate).
- Extract one poster frame around the ~1s mark (past the near-black opening)
  as a JPEG, used as the `<video poster>` so the section paints instantly
  before video bytes arrive.
- Output: `public/videos/skills-ambient.mp4` + `public/videos/skills-ambient.jpg`.
  Plain static files — video doesn't go through Astro's `getImage()`
  pipeline, so `public/` is the right amount of machinery.

## 2. Placement & gating

- Lives inside the existing desktop constellation container in
  `Skills.tsx` — the `<div data-reveal className="hidden md:block relative
  h-[540px]" ...>` block — as the first child, so it paints behind the SVG
  connector lines, category nodes, and center panel via normal DOM stacking
  order (no z-index needed).
- A one-shot `useEffect` (same shape as `Hero.tsx`'s WebGL capability probe)
  decides whether to mount the `<video>` element at all:
  ```
  matchMedia('(min-width: 768px)').matches
  && !matchMedia('(prefers-reduced-motion: reduce)').matches
  && document.documentElement.classList.contains('dark')
  ```
  If any condition is false, the video element is never rendered — mobile
  and light-mode visitors never fetch the bytes, not just CSS-hidden.
  This check runs once on mount; it does not need to react live to a
  mid-session theme toggle (decorative element, worst case it appears only
  after the next reload — acceptable, not worth a listener).
- `<video autoPlay muted loop playsInline poster={...} />`.

## 3. Visual treatment

- `grayscale` + slightly boosted contrast on the `<video>` itself.
- A copper→night gradient overlay (`mix-blend-color`) painted on top,
  producing a tinted "blueprint schematic" look rather than the clip's raw
  red/green stock-footage color — keeps it inside the site's single-accent
  palette.
- Low overall opacity — texture behind the UI, never competing with the
  constellation for attention.

## 4. Scroll effect

- **Entrance fade**: reuse the existing `data-reveal` mechanism already
  applied to this container. No new JS.
- **Parallax drift**: pure CSS via the `animation-timeline: view()`
  scroll-driven-animations API — a small `@keyframes` translateY drift (a
  few px each direction) tied to the element's own scroll-through range via
  `animation-range: cover 0% cover 100%`, guarded with `@supports
  (animation-timeline: view())`. Browsers without support simply render the
  video static (no parallax) — an acceptable degrade, consistent with the
  site's existing "no-JS visitors still see full content" philosophy.

## 5. Deliberately out of scope

- No IntersectionObserver-based pause/resume of the video once mounted. A
  muted, hardware-decoded 12s loop is cheap enough that it doesn't need the
  same offscreen-pause treatment the R3F canvas gets (that one matters
  because it's a continuous GPU render loop; this is a passive decode).
  If this ever proves to be a real perf/battery issue, it's a small,
  isolated addition later.
- No live theme-toggle reactivity for the video's mount/unmount decision.
- No fallback video formats (webm/av1) — single h264 mp4, already
  universally supported.

## Guardrails

- `prefers-reduced-motion: reduce` fully disables the layer (no mount).
- Mobile and light-mode visitors incur zero video network cost.
- Constellation UI (nodes, connectors, detail panel) remains fully legible
  on top of the video at all times.
- No new dependency added to `package.json`.

## Out of scope for this change

Re-treating any other section with video, a projects/case-studies section
(tracked separately as a content gap, not a visual one), swapping this stock
clip for real footage of the user's own work (may happen later; this spec
is for the mechanic, not the asset's authenticity).
