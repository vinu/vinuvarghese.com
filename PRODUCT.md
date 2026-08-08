# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences, roughly equal weight: recruiters/hiring managers evaluating Vinu for a full-time architect or leadership role, and prospective clients/consulting leads considering him for contract or advisory work. Both are assessing credibility and fit from a cold read, usually referred in from a resume, LinkedIn, or search rather than an ongoing relationship.

## Product Purpose

A personal portfolio/resume site for Vinu Varghese (Technical Architect, 20+ years) at www.vinuvarghese.com. It exists to give both audiences a fast, credible read on his experience, skills, and how to reach him. Success is a visitor leaving with an accurate picture of his capability and a clear path to contact — not a lead-gen funnel with a single hard CTA.

## Positioning

Breadth across domains: cloud (AWS, Azure), AI/ML integration, and full-stack development, spanning architecture, DevOps, and database administration. The pitch is the generalist architect who can own a system end-to-end, not a narrow specialist in any one of those domains.

## Operating Context

Static site, single long-scroll page (`/`) plus a 404. Visited cold, often on mobile, low-context (no prior relationship with the visitor). Also crawled by search engines and read by LLM-based agents/assistants doing candidate or vendor research — structured data (JSON-LD Person schema) and legible static HTML matter here, not just human visual polish.

## Capabilities and Constraints

- Content sections: hero, about, work experience, skills, contact — all sourced from `src/data/resume.ts` as the single source of truth (see CLAUDE.md).
- Includes a novelty terminal emulator (`TerminalPortfolio.tsx`) as an alternate, playful way to explore the same resume content — signals technical craft to a technical audience without being required to use it.
- Static output deployed to GitHub Pages; no backend, no forms, no server-side logic.
- Public contact email is `vinu@vinuvarghese.com` (distinct from any account/tooling email).

## Evidence on Hand

Real, current resume content lives in `src/data/resume.ts` (employment history, skills, stats, contact links) — this is factual and must not be embellished or invented beyond what's there. No testimonials, case studies, or press exist; do not fabricate any.

## Product Principles

1. Cold-read credibility first — a stranger with 10 seconds should immediately understand who this is and why they're credible.
2. Breadth is the differentiator, not a liability — don't force a narrow niche positioning the evidence doesn't support.
3. Serve both audiences without forking the experience — no separate "for recruiters" vs "for clients" tracks; one coherent site, dual-purpose contact section.
4. Resume data stays truthful — `resume.ts` is the ceiling on what any surface may claim.
5. Machine-legible by default — structured data and clean static HTML are load-bearing, not an afterthought, given AI-agent and crawler traffic.
