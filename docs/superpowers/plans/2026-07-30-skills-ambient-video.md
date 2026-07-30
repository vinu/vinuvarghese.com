# Skills-Section Ambient Video Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Embed a compressed, grayscale/copper-tinted, CSS-parallaxing loop of the dev-desk stock clip as a decorative background layer behind the Skills section's desktop tech constellation — desktop + dark-mode + motion-ok visitors only.

**Architecture:** A preprocessed static `.mp4`/`.jpg` pair in `public/videos/` (no build-pipeline involvement), one gated `<video>` layer added as the first child of the existing constellation container in `Skills.tsx`, and a few CSS rules in `src/index.css` (grayscale/overlay classes + a `@supports (animation-timeline: view())`-gated parallax keyframe). No JS scroll listener, no new dependency.

**Tech Stack:** Astro 7 + React 19 (existing `Skills.tsx` island, `client:visible`), Tailwind CSS 4, native CSS scroll-driven animations, `ffmpeg` (one-time asset preprocessing, not a build step).

## Global Constraints

- No new npm dependency (spec: "No new npm dependency added to `package.json`").
- Video must never be fetched by mobile or light-mode visitors — gating happens before the `<video>` element is mounted, not via CSS `display:none` (spec section 2).
- `prefers-reduced-motion: reduce` fully disables the layer — no mount (spec Guardrails).
- No IntersectionObserver pause/resume for the video; no live theme-toggle reactivity; no webm/av1 fallback (spec section 5, explicitly out of scope).
- This project has no test framework configured (see project `CLAUDE.md`); "tests" in this plan are `npm run build` / `tsc --noEmit` correctness checks plus a manual visual check via the dev server, not automated unit tests.
- Constellation UI (nodes, connectors, detail panel) must remain fully legible on top of the video at all times (spec Guardrails).

---

### Task 1: Preprocess the video asset

**Files:**
- Create: `public/videos/skills-ambient.mp4`
- Create: `public/videos/skills-ambient.jpg`

**Interfaces:**
- Produces: two static files served at runtime from `/videos/skills-ambient.mp4` and `/videos/skills-ambient.jpg` (Astro serves `public/` at the site root, unprocessed). Task 3 references these exact paths.

- [ ] **Step 1: Create the output directory**

```bash
mkdir -p public/videos
```

- [ ] **Step 2: Compress the source video**

```bash
ffmpeg -y -i "/Users/vinu/Downloads/14188177_2160_3840_25fps.mp4" \
  -vf "scale=720:-2" -an -c:v libx264 -crf 28 -preset slow \
  -movflags +faststart public/videos/skills-ambient.mp4
```

Expected: exits 0, produces a file. Verified reproduction of this exact
command during spec/plan authoring produced a 720×1280 h264 mp4, no audio
stream, ~880KB (well under the spec's <2MB target), 12.44s duration.

- [ ] **Step 3: Extract the poster frame**

```bash
ffmpeg -y -i "/Users/vinu/Downloads/14188177_2160_3840_25fps.mp4" \
  -ss 1 -frames:v 1 -vf "scale=720:-2" -q:v 4 public/videos/skills-ambient.jpg
```

Expected: exits 0, produces a ~60KB JPEG (verified during authoring: 62811
bytes), showing the dual-monitor code screens (not the near-black opening
frame at t=0).

- [ ] **Step 4: Verify output**

```bash
ffprobe -v error -show_entries stream=width,height,codec_name -show_entries format=duration,size -of default=noprint_wrappers=0 public/videos/skills-ambient.mp4
ls -la public/videos/
```

Expected: `width=720`, `height=1280`, `codec_name=h264`, `duration=12.44...`,
`size` under 2000000 (bytes). Both files present in `public/videos/`.

- [ ] **Step 5: Commit**

```bash
git add public/videos/skills-ambient.mp4 public/videos/skills-ambient.jpg
git commit -m "Add compressed ambient dev-desk video asset for Skills section"
```

---

### Task 2: Add CSS treatment (grayscale/overlay + scroll-driven parallax)

**Files:**
- Modify: `src/index.css` (append after the existing "constellation node float" block at the end of the file, currently ending at line 92)

**Interfaces:**
- Produces: CSS classes `.ambient-video`, `.ambient-video-overlay`, `.ambient-parallax` — Task 3's JSX applies these exact class names.

- [ ] **Step 1: Append the new CSS rules**

Add to the end of `src/index.css`:

```css

/* Skills-section ambient video: grayscale + copper duotone tint */
.ambient-video {
  filter: grayscale(1) contrast(1.15);
  opacity: 0.35;
}
.ambient-video-overlay {
  background: linear-gradient(
    to bottom,
    rgba(16, 15, 13, 0.2),
    rgba(189, 75, 18, 0.18) 45%,
    rgba(16, 15, 13, 0.75)
  );
  mix-blend-mode: color;
}

/* scroll-driven parallax drift — degrades to static on unsupported browsers */
@keyframes ambient-parallax {
  from { transform: translateY(-24px); }
  to { transform: translateY(24px); }
}
@supports (animation-timeline: view()) {
  .ambient-parallax {
    animation: ambient-parallax linear both;
    animation-timeline: view();
    animation-range: cover 0% cover 100%;
  }
}
```

- [ ] **Step 2: Verify the build still compiles the stylesheet**

```bash
npm run build
```

Expected: build succeeds (exit 0), no PostCSS/Tailwind errors. (Skills.tsx
doesn't reference these classes yet — this step only proves the new CSS
itself is syntactically valid and doesn't break the existing build.)

- [ ] **Step 3: Commit**

```bash
git add src/index.css
git commit -m "Add grayscale/overlay/parallax CSS for Skills ambient video"
```

---

### Task 3: Wire the gated video layer into Skills.tsx

**Files:**
- Modify: `src/components/Skills.tsx:1` (import), `src/components/Skills.tsx:11-13` (component body, add state/effect), `src/components/Skills.tsx:21` (insert video layer as first child of the constellation container)

**Interfaces:**
- Consumes: `.ambient-video`, `.ambient-video-overlay`, `.ambient-parallax` CSS classes from Task 2; `/videos/skills-ambient.mp4` and `/videos/skills-ambient.jpg` static assets from Task 1.

- [ ] **Step 1: Add `useEffect` to the React import**

Current (`src/components/Skills.tsx:1`):

```tsx
import React, { useState } from 'react';
```

Change to:

```tsx
import React, { useEffect, useState } from 'react';
```

- [ ] **Step 2: Add the gating state**

Current (`src/components/Skills.tsx:11-13`):

```tsx
export default function Skills() {
  const [active, setActive] = useState(0);
  const current = skillCategories[active];
```

Change to:

```tsx
export default function Skills() {
  const [active, setActive] = useState(0);
  const [showAmbient, setShowAmbient] = useState(false);
  const current = skillCategories[active];

  useEffect(() => {
    setShowAmbient(
      matchMedia('(min-width: 768px)').matches &&
      !matchMedia('(prefers-reduced-motion: reduce)').matches &&
      document.documentElement.classList.contains('dark')
    );
  }, []);
```

- [ ] **Step 3: Insert the video layer as the first child of the constellation container**

Current (`src/components/Skills.tsx:21-27`):

```tsx
        <div data-reveal className="hidden md:block relative h-[540px]" role="tablist" aria-label="Skill categories">
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full"
            aria-hidden="true"
          >
```

Change to:

```tsx
        <div data-reveal className="hidden md:block relative h-[540px]" role="tablist" aria-label="Skill categories">
          {showAmbient && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
              <video
                autoPlay
                muted
                loop
                playsInline
                poster="/videos/skills-ambient.jpg"
                className="ambient-video ambient-parallax w-full h-full object-cover"
              >
                <source src="/videos/skills-ambient.mp4" type="video/mp4" />
              </video>
              <div className="ambient-video-overlay absolute inset-0" />
            </div>
          )}
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full"
            aria-hidden="true"
          >
```

Note: this reuses the parent container's existing `data-reveal` fade-in
(it already wraps the whole constellation, including this new child) —
no second `data-reveal` attribute is needed on the video layer itself.

- [ ] **Step 4: Type-check**

```bash
npx tsc --noEmit -p tsconfig.json
```

Expected: no errors.

- [ ] **Step 5: Build**

```bash
npm run build
```

Expected: build succeeds (exit 0).

- [ ] **Step 6: Manual visual verification**

```bash
npm run dev
```

Open the site in a desktop-width browser window with dark mode active,
scroll to the Skills section, and confirm:
- The dev-desk video is visible behind the constellation nodes/lines,
  grayscale with a copper-tinted overlay, at low opacity — text and nodes
  stay fully legible on top.
- Scrolling the section produces a subtle up/down drift in the video
  (Chrome/Edge support `animation-timeline: view()`; if testing in a
  browser without support, the video should simply stay static — not
  broken, not stretched, not overflowing its box).
- Switching to light mode (via the Navigation theme toggle) removes the
  video entirely (falls back to the plain constellation with no
  background layer).
- Resizing below the `md` breakpoint (or loading on a mobile viewport)
  never shows the video and never requests `/videos/skills-ambient.mp4`
  (check the Network tab).
- With OS-level "reduce motion" enabled, the video layer does not mount.

- [ ] **Step 7: Commit**

```bash
git add src/components/Skills.tsx
git commit -m "Add gated ambient video background to Skills constellation"
```

---

## Self-Review Notes

- **Spec coverage:** Section 1 (asset pipeline) → Task 1. Section 2
  (placement & gating) → Task 3 Steps 2–3. Section 3 (visual treatment) →
  Task 2 + Task 3 Step 3 (`.ambient-video` / `.ambient-video-overlay`
  classes). Section 4 (scroll effect) → Task 2 (`@supports`/`@keyframes`)
  and the note in Task 3 Step 3 about reusing the parent's `data-reveal`.
  Section 5 / Guardrails (no pause/resume, no live theme reactivity, no
  extra video formats, reduced-motion/mobile/light-mode exclusion) → all
  encoded directly in the `showAmbient` condition and explicitly called
  out as not-done anywhere else.
- **Placeholder scan:** none found — all commands were test-run during
  authoring and their real output values are recorded above.
- **Type consistency:** `showAmbient` is the only new piece of state; it's
  introduced and consumed within the same task/file, no cross-task type
  surface to mismatch.
