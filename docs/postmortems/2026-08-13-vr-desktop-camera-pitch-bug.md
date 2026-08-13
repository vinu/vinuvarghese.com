# VR desktop fallback rendered nothing — postmortem

## Symptom

`/vr`'s no-headset desktop fallback (drag-to-look + WASD, built in
[the VR portfolio plan](../superpowers/plans/2026-08-11-vr-portfolio.md))
showed a solid black canvas — just the "Enter VR" button and helper text,
no panels, no ground, nothing. Entering an actual VR session (verified via
the real Immersive Web Emulator Chrome extension, paired through its
`iwer` MCP bridge) rendered everything correctly: all 4 panels present,
readable, correctly bounded and oriented.

This was the one thing the whole subagent-driven build (5 tasks, task
reviews, a final whole-branch review, and a fix wave) could never actually
verify — every review had to fall back to hand-derived trigonometry
instead of a screenshot, because the sandbox those agents ran in has
`requestAnimationFrame` permanently suspended for automated browser tabs.
This bug only surfaced once a human did a real walkthrough in a real,
focused browser tab.

## Dead ends ruled out, in order

1. **Font-CDN Suspense (the final review's finding #6)** — plausible at
   first (drei's `<Text>` suspends on a third-party font fetch), but the
   scene stayed black indefinitely, and once it *did* render (inside an
   XR session), the font had clearly already loaded. Not it.
2. **`@react-three/xr`'s built-in emulator (`emulate: import.meta.env.DEV`)
   conflicting with the real extension** — tested by serving a production
   build (`emulate` off) instead of `npm run dev`. Still black. Not it.
3. **Duplicate three.js instances from the extension** — the console
   showed `THREE.WARNING: Multiple instances of Three.js being imported`,
   a real and independently-true finding, and a plausible-looking culprit.
   Disproven by disabling the extension entirely and reloading: still
   black, warning gone. Not it (though worth knowing about separately —
   see "also noticed" below).
4. **Canvas stuck at a degenerate size** — this exact codebase hit a
   canvas-stuck-at-300×150 bug before (`HeroScene.tsx`, an earlier
   session). Checked via `document.querySelector('canvas').width/height`:
   `3584x1034`, a real, correctly-sized buffer. Not it.
5. **Render loop not running at all** — checked via a temporary `useFrame`
   probe logging a frame counter every 60 ticks. Frames were firing
   continuously (60, 120, 180, ... 780+), with `gl.xr.enabled` and
   `gl.xr.isPresenting` both correctly `false`, camera correctly *not*
   the XR array-camera, and the scene graph correctly populated with all
   8 expected children (lights, 4 panel groups at their correct
   positions, the teleport ground, the XR origin). The loop, the XR
   state, and the scene contents were all completely healthy.

## Root cause

The same debug probe that ruled out #5 also printed the camera's actual
transform every tick:

```
pos=(0.00,1.50,0.00) rot=(-1.57,0.00,0.00)
```

`rot.x = -1.57` rad ≈ **-90°** — the camera was pitched straight down at
the floor, not level and forward. Position was exactly right
(`[0, 1.5, 0]`, per `VrExperience.tsx`'s `<Canvas camera={{ position: [0,
1.5, 0], fov: 60 }}>`); orientation was not.

React Three Fiber's default camera — the one it constructs internally
from a plain `camera={{ position, fov }}` object prop on `<Canvas>`,
as opposed to an explicit `<PerspectiveCamera>` JSX element — calls
`camera.lookAt(0, 0, 0)` once it's positioned. For the common case
(camera offset along X/Z, e.g. the R3F default `[0, 0, 5]`), that lookAt
is invisible: looking at the origin from `[0, 0, 5]` already produces
identity rotation, so it's easy to assume R3F's default camera has *no*
implicit orientation logic at all.

Our camera sits at `[0, 1.5, 0]` — directly **above** the world origin on
the Y axis, with zero X/Z offset. `lookAt(0, 0, 0)` from straight overhead
has nowhere to go but straight down, so R3F's implicit lookAt produced
exactly the -90° pitch the probe captured.

`DesktopFlyControls.tsx` then compounded it:

```ts
const yaw = useRef(camera.rotation.y);
const pitch = useRef(camera.rotation.x);   // captured -1.57 at mount
```

and re-applied that captured pitch every single frame via
`camera.rotation.set(pitch.current, yaw.current, 0, 'YXZ')` — permanently
locking the camera to point at the floor, regardless of any panel
geometry, lighting, or scene content, all of which were completely
correct the whole time.

This project's own history had already surfaced the general shape of this
gotcha once before (a different branch, `TensegrityScene.tsx`): *drei's*
`<PerspectiveCamera>` JSX component does **not** auto-aim, unlike R3F's
own internal default camera, which does. That precedent was about the
opposite failure mode (a component that doesn't auto-aim when you assumed
it would); this bug is the same underlying fact read backwards — a
component that *does* auto-aim when the plan's geometry math assumed
identity rotation instead.

## Fix

`src/components/vr/DesktopFlyControls.tsx` — stop trusting
`camera.rotation` at mount time; seed a deterministic, known-good level
forward orientation instead:

```ts
// Seeded to a fixed level/forward start rather than read from camera.rotation:
// R3F's default camera auto-lookAt(0,0,0), and this camera sits directly
// above the origin, so its initial rotation is a broken straight-down pitch.
const yaw = useRef(0);
const pitch = useRef(0);
```

This is the exact fix the final whole-branch review's reviewer already
suggested — filed as a Minor, cosmetic-sounding nitpick ("seeding from a
fixed (0, 0) would be deterministic," about a "small orientation pop" on
remount) — without realizing it was load-bearing, because no reviewer in
that process ever had a rendered frame to look at.

## Verification

- Confirmed broken: debug probe printing `rot=(-1.57,0.00,0.00)` every
  frame, camera never recovering, panels never visible, across a fresh
  page load, a production build, and with the emulator extension both
  enabled and fully disabled.
- Confirmed fixed: same debug probe removed, fix applied, rebuilt,
  hard-refreshed — desktop fallback now shows `/01 About` immediately on
  load, matches the same correctly-bounded, correctly-oriented panel
  content already independently verified inside a real VR session via the
  `iwer` MCP bridge (screenshots of all 4 panels, teleport working,
  session mode confirmed `immersive-vr` not `immersive-ar`).

## Also noticed, not acted on

`THREE.WARNING: Multiple instances of Three.js being imported` appears
whenever the Immersive Web Emulator extension is enabled on the page —
the extension bundles its own copy of three.js for its synthetic-room
rendering. This did not cause this bug (ruled out in dead-end #3 above),
and won't affect real headset visitors (who won't have this extension
installed), but it's a real signal worth knowing about if a *different*,
genuinely extension-specific rendering issue ever comes up during future
local testing with the emulator active.

## Tooling note

This bug was only findable once a human connected a real WebXR runtime.
Two tools made that possible in this session:
- The **Immersive Web Emulator** Chrome extension (real WebXR polyfill,
  emulated Meta Quest 3 device).
- Its **`iwer` MCP bridge** (`npx @iwer/extension-bridge`, configured via
  a project-scoped `.mcp.json`), which let the agent drive the emulated
  headset/controllers and pull real composited screenshots directly,
  rather than relying on the user to narrate what they saw.
