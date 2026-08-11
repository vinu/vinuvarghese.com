# VR-viewable portfolio — design

## Problem

The portfolio (Astro + React 19 + R3F/three.js) has no way to be experienced in a VR headset. We want a walkable 3D version of the resume content, reachable from a VR headset, plus a way to build and test it without owning a headset.

## Goals

- A VR headset user can enter an immersive, walkable 3D space presenting the same resume content as the 2D site (About, Experience, Skills, Contact).
- The existing (non-VR) site is unaffected for everyone else — no forced redirects, no SEO/crawler impact.
- The feature is developable and testable end-to-end without a physical headset.

## Non-goals (explicitly out of scope for v1)

- **AR / mixed-reality mode** — `immersive-ar` sessions, passthrough, anchoring content to the real room. VR (`immersive-vr`) only.
- **Hand-tracking** — controller-based interaction only; no hand-pose/gesture input.
- **Spatial audio** — no positional/ambisonic sound design for the VR space.
- **Per-section themed 3D rooms** — each resume section is a flat panel in one shared space, not its own distinct environment/scene (e.g. no dedicated "skills room" with custom geometry per section).
- **Custom controller models / avatars** — use the default controller rendering `@react-three/xr` provides; no bespoke 3D controller or avatar art.
- **Cross-user/multiplayer presence** — single-user experience only, no shared sessions.
- **Automated VR/WebXR test coverage in CI** — verification is manual (desktop fallback + Immersive Web Emulator), no headless WebXR test harness is being built.

These are reasonable v2+ follow-ups if the v1 lands well, not things being designed around now.

## Approach

**Library: `@react-three/xr`** (pmndrs), not A-Frame or raw WebXR.

Rationale: the site already builds 3D scenes with React Three Fiber + drei + three.js (`HeroScene.tsx`, `TensegrityScene.tsx`). `@react-three/xr` extends that exact paradigm (JSX components, `useFrame`) with WebXR session handling, so there's no second 3D framework to learn or maintain, and one new dependency.

## Architecture

### Detection (on the existing 2D site)

A small component, mounted on the existing site (e.g. alongside `Hero.tsx`), checks WebXR capability on mount:

```js
navigator.xr?.isSessionSupported('immersive-vr')
```

If it resolves `true`, show a dismissible banner: "VR headset detected — enter 3D portfolio", linking to `/vr`.

- No auto-redirect — the 2D site always loads first for everyone.
- No user-agent sniffing — Quest Browser is Chromium-based, Vision Pro's is Safari-based, so UA strings are brittle. The capability check is the honest signal.
- If the check rejects or `navigator.xr` is undefined (desktop/mobile, no WebXR), no banner renders — zero visual change for the vast majority of visitors.

### The VR page

`src/pages/vr.astro` renders a `client:only="react"` React island (`VrPortfolio.tsx`). Client-only because WebXR requires `navigator`/`window`, which don't exist during Astro's static build.

`VrPortfolio.tsx`:
- `<XR>` (from `@react-three/xr`) wraps a `<Canvas>`.
- `<XRButton mode="VR">` to start the session — this hides/no-ops itself on browsers without WebXR support, so `/vr` never shows a broken "enter VR" control to someone without the capability.
- A ground/teleport plane using `@react-three/xr`'s teleportation primitives.
- Floating content panels for the 4 resume sections.
- A camera-rig component that switches behavior based on whether an XR session is active (see Locomotion).

### Content

Panels are built directly from the existing `src/data/resume.ts` (About, Experience, Skills, Contact) — no new copy is authored. They're arranged in a circle around a center point, in the same order as the 2D site's section numbering (`/01 About` → `/04 Contact`).

### Locomotion

- **In VR:** point-and-click teleport (via `@react-three/xr`'s teleport controller) to move between panels.
- **Outside VR (desktop fallback):** the identical scene, but a custom WASD + mouse-drag camera controller (~30 lines; drei's `FirstPersonControls` is deprecated) replaces the teleport controller. Same content, same layout, different input mapping.

This means `/vr` is fully explorable in an ordinary desktop browser tab with no headset and no browser extension — this doubles as the primary day-to-day dev-test path.

## Testing without a headset

1. **Desktop fallback** (above) — open `/vr` in any regular browser tab, WASD + mouse-drag to walk the scene. No setup. Exercises the actual scene content and layout.
2. **Immersive Web Emulator** — Meta's free Chrome/Edge DevTools extension. Simulates a real headset session (head tracking, controllers, entering/exiting an XR session, teleport input) so the real WebXR/`@react-three/xr` code path — not just the visuals — can be tested without owning hardware.

## Error handling / fallback behavior

- No WebXR support at all → no banner on the 2D site; `/vr` still loads and is usable via desktop fallback if someone navigates there directly.
- `isSessionSupported` promise rejects → treated the same as `false` (no banner).
- User denies the XR session permission prompt → falls back to the desktop camera controller in the same tab, scene remains usable.

## Testing plan for this feature

- Manual: desktop fallback walkthrough in a normal browser (primary, fast-iteration path).
- Manual: Immersive Web Emulator session — enter VR, teleport between all 4 panels, exit VR, confirm the 2D site is untouched.
- Manual: confirm the detection banner does *not* appear in a normal desktop/mobile browser (no `navigator.xr` / unsupported).
- No automated test suite exists in this repo (per `CLAUDE.md`); this feature follows that existing convention rather than introducing one.
