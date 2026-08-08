---
target: whole homepage (src/pages/index.astro)
total_score: 36
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 2
timestamp: 2026-08-07T13-36-23Z
slug: src-pages-index-astro
---
Method: dual-agent (A: general-purpose design-review agent · B: general-purpose detector/browser-evidence agent)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3/4 | Active-section nav, scroll state, back-to-top all work; dinged by the invisible-focus issue below |
| 2 | Match System / Real World | 4/4 | Terminal/Unix and blueprint/drafting metaphors applied with real semantics throughout |
| 3 | User Control and Freedom | 3/4 | Esc and click-outside work; terminal's mobile close target is a 10×10px dot with no touch alternative |
| 4 | Consistency and Standards | 4/4 | Hairline borders, square corners, one-accent rule, mono-for-system-voice followed with zero exceptions found |
| 5 | Error Prevention | 4/4 | No forms to break; terminal handles bad input, `sudo`, `rm -rf /` gracefully and in-character |
| 6 | Recognition Rather Than Recall | 4/4 | Always-visible nav with active state, tab-completion + history in terminal, no hover-only-locked content |
| 7 | Flexibility and Efficiency | 3/4 | Scored (not n/a): terminal's tab-completion/history genuinely rewards a repeat visitor |
| 8 | Aesthetic and Minimalist Design | 3/4 | Otherwise a 4 — the Skills ambient video is undocumented decoration on a "depth is earned" system |
| 9 | Error Recovery | 4/4 | Unix-accurate terminal errors, on-brand 404 page |
| 10 | Help and Documentation | 4/4 | Scored (not n/a): `help` and `man <cmd>` are real in-character documentation |
| **Total** | | **36/40** | **Excellent** |

## Design Specificity Verdict

**LLM assessment**: Mostly passes the "could a stranger clone-and-swap this template" test. The blueprint grid, numbered `/01–/04` sections, terminal prompt-voice copy, the fully-built virtual-filesystem terminal easter egg, the offset-copper-square portrait motif, and the in-voice 404 page all encode this specific person and metaphor in ways a generic template couldn't reproduce without real rebuilding. The one place genericism creeps back in: the Skills section's ambient background video (blurred keyboard/code/clock stock footage, dark-mode+desktop only) is the single stock-photography-style visual on an otherwise decoration-free system, isn't mentioned in DESIGN.md, and resembles the exact "generic AI-startup" mood the design system explicitly disclaims.

**Deterministic scan**: The bundled detector found 1 real finding on static source scan (`bounce-easing` at `Hero.tsx:117`, the scroll-cue arrow's `animate-bounce`) and 18 findings via live browser injection on `/` (14 `line-length` instances at ~96-110 chars/line, 1 `low-contrast` at 4.49:1, 1 `blinking-cursor`, 1 `call-caps-body`, 1 `bounce-easing`, plus 2 advisory-only items) and 4 on `/404` (3 `low-contrast` — one at 4.49:1, two at 4.3:1 — plus the same `bounce-easing`, and 1 advisory item). Cross-checked against DESIGN.md: `blinking-cursor` and `call-caps-body` are very likely false positives (both are documented, intentional system-voice motifs — the terminal cursor blink and the mono-overline label pattern), and the two advisory-only items (`codex-grid-background`, `cream-palette`) are explicitly the blueprint grid and warm-paper background this system commits to by design. `bounce-easing`, `low-contrast`, and `line-length` are real and independent of any design-system invariant.

**Visual overlays**: Browser injection succeeded on both `/` and `/404`; the console output above is what the detector reported live in the page. No user-visible overlay tab remains open — the live-server helper used for injection was started and stopped cleanly during the assessment.

## Overall Impression

This is a well-executed, disciplined implementation of its own design system — copper stays scarce, corners stay square, borders stay hairline, and the terminal easter egg is real craft that backs up the "20-year architect" claim rather than just gesturing at personality. The 36/40 score reflects that discipline. What holds it back from "ship it, minor polish only" is a small cluster of real bugs concentrated at mobile/short viewports and keyboard navigation — not a design-system failure, but a testing-coverage gap: the site is solid at the two viewports it was clearly built and checked at (desktop ~1440px, phone in portrait) and starts showing seams at the edges (scroll position, resize, keyboard-only nav).

## What's Working

1. **`TerminalPortfolio.tsx`** — a genuinely real virtual filesystem (`cd`/`ls -l`/`cat`/`tree`/`grep`/`man`/tab-completion/history) with in-character easter eggs. This is rare, load-bearing craft for a portfolio site: it demonstrates the technical competence the site is selling, without gating the actual resume content behind it.
2. **The One Accent Rule is actually followed** — copper appears only as index numbers, active/hover state, and bullet markers across every section checked, never as a background fill. That discipline is what makes the accent register as intentional.
3. **The 404 page stays in voice** — `cat: requested-page: No such file or directory` with a `$ cd ~` button. Most sites break character on error states; this one doesn't.

## Priority Issues

**[P1] Keyboard focus on the back-to-top button is invisible.** The button's resting classes include `opacity-0 pointer-events-none`; tabbing to it lands focus on an element the correctly-implemented `:focus-visible` copper outline renders onto — but nothing is visible on screen. A keyboard-only visitor (persona Sam) hits a dead, invisible stop mid-tab-order, which reads as broken navigation, not just a missing indicator.
- **Why it matters**: This is the one hard accessibility break found — worse than no focus state, because it looks like the tab order silently failed.
- **Fix**: `tabIndex={-1}` on the button, flipped to `0` only when `showBackToTop` is true, so it's never focusable while invisible.
- **Suggested command**: `/impeccable audit`

**[P1] The fixed back-to-top button overlaps section headings at every section boundary on short/mobile viewports.** At 390×844, scrolled to any section boundary, the bottom-left button sits directly on top of the heading's index number and first letter — this recurs at every `/01`–`/04` boundary since they share the same screen position.
- **Why it matters**: Obscures the numbered-section motif that's central to the system's identity, on the majority (mobile) traffic segment per PRODUCT.md.
- **Fix**: Offset the fixed buttons from the heading zone, or fade them out while a `[data-reveal]` heading is entering the same screen band.
- **Suggested command**: `/impeccable adapt`

**[P2] Several text instances sit just under WCAG AA contrast (4.5:1)**, found via live computed-style scan: copper-on-paper body text at 4.49:1 (homepage and 404), and stone-on-paper caption text at 4.3:1 (404, ×2).
- **Why it matters**: These are near-misses on real accessibility text, not the deliberate-palette false positives elsewhere in the scan — low-vision readers are affected.
- **Fix**: Nudge the copper/stone values a step darker in light mode, or restrict the affected instances to larger text sizes where the AA threshold is lower (3:1).
- **Suggested command**: `/impeccable audit`

**[P2] Mobile hamburger menu panel has no scrim and clips page content beneath it.** At 390px, opening the nav panel shows the hero headline abruptly cut off directly under the menu's hard bottom edge, with page content still visible below — reads as a layering bug rather than an intentional overlay (the terminal modal, by contrast, already uses `bg-paper/80 backdrop-blur-sm` for exactly this situation).
- **Why it matters**: Breaks the otherwise-consistent overlay treatment and looks unfinished on the majority traffic segment.
- **Fix**: Reuse the terminal modal's backdrop-blur/dim treatment, or extend the panel to full-viewport height.
- **Suggested command**: `/impeccable adapt`

**[P2] Hero portrait is desktop-only (`hidden md:block`) and appears nowhere else on the page.** Mobile visitors — the majority per PRODUCT.md's "often on mobile" — never see a photo of Vinu at all, on a site whose stated job is building cold-read credibility for two audiences meeting him for the first time.
- **Why it matters**: The human/trust signal the offset-copper-square portrait motif is built around is entirely absent for most traffic.
- **Fix**: Design a mobile-appropriate placement (e.g. smaller inline portrait near the prompt line) rather than dropping it.
- **Suggested command**: `/impeccable adapt`

## Persona Red Flags

**Sam (Accessibility-Dependent)**: The invisible-focus bug on the back-to-top button (P1 above) is a hard failure — a keyboard user tabbing through the page loses all visual track of focus for one full Tab press with no recovery cue. This isn't systemic, though: `prefers-reduced-motion` is correctly respected on the constellation float animation and the ambient video, and decorative SVG/grid elements are properly `aria-hidden` — this is one specific, fixable regression, not a pattern.

**Casey (Mobile)**: Three concrete mobile-only failures stack up: the back-to-top/heading collision (P1), the menu-panel content bleed (P2), and a 10×10px terminal close-dot with no touch-sized alternative (the only fallback, "[esc] to close," is meaningless copy on a touchscreen). Structurally, the desktop-only Hero portrait (above) means the majority traffic segment never sees a photo of Vinu at all.

**Riley (Stress-Tester)**: The terminal's mobile/desktop detection (`isMobile = window.innerWidth < 768`) is computed once at mount, not reactively — open the terminal on desktop, then resize or rotate mid-session, and the prompt/banner stay in the original mode until the terminal is closed and reopened. Combined with the P1 viewport-position bug, this is a page tested solidly at two fixed viewports that starts showing seams at anything in between or resized mid-session.

## Minor Observations

- Contact link rows use the entire row as the tap target — good mobile hit-target practice, no complaint.
- 14 instances of prose/list-item lines running to ~96–110 characters (detector's `line-length` rule, target <80) — readability polish, not urgent.
- The hero scroll-cue arrow uses Tailwind's `animate-bounce` (both the static scan and live scan flagged this) — the only motion in the system that isn't in DESIGN.md's documented vocabulary (state-transition, reveal-on-scroll, magnetic-pull, blink, float-y); a small inconsistency worth a deliberate swap to a subtler cue.
- Desktop Skills section shows the same 6 categories twice in immediate succession — the radial constellation, then an identical "full index" grid directly beneath it (deliberate per the code comment, but it means the progressive-disclosure interaction on the constellation doesn't actually gate anything since the grid answers the same question with zero interaction).
- Skills ambient video is dark-mode+desktop-only, undocumented in DESIGN.md, and is the system's only stock-photography-style visual — worth either cutting or formally writing into the design system with a rationale.

## Questions to Consider

- If the Skills "full index" grid answers the same question as the constellation with zero interaction required, is the constellation serving the visitor's decision-making, or mainly demonstrating "I can build a radial diagram" to a technical audience — and is that a legitimate portfolio flourish or redundant load dressed as a feature?
- The ambient video is the site's only stock-imagery moment, gated to a fraction of sessions, and absent from the committed design system — deliberate addition DESIGN.md should catch up to, or scope creep worth cutting to preserve the offset-copper-square as the system's sole decorative gesture?
- The page ends on a plain, unembellished contact list with no restated pitch or personality beat — for this audience, is that the more credible "instrument, not salesman" choice, or does ending on a data table under-deliver relative to the Hero's confident opening?
