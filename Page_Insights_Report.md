# PageSpeed Insights Report — vinuvarghese.com

**Date:** February 1, 2026
**URL:** https://www.vinuvarghese.com/
**Tool:** Google PageSpeed Insights (Lighthouse 13.0.1)
**Environment:** HeadlessChromium 137.0.7151.119

---

## Scores

| Category | Mobile | Desktop |
|----------|:------:|:-------:|
| Performance | **98** | **100** |
| Accessibility | **95** | **95** |
| Best Practices | **100** | **100** |
| SEO | **100** | **100** |

---

## Performance (Mobile: 98 / Desktop: 100)

### Core Web Vitals & Metrics

| Metric | Value | Status |
|--------|------:|:------:|
| First Contentful Paint (FCP) | 1.1 s | Pass |
| Largest Contentful Paint (LCP) | 1.4 s | Pass |
| Total Blocking Time (TBT) | 0 ms | Pass |
| Cumulative Layout Shift (CLS) | 0 | Pass |
| Speed Index | 3.9 s | Warning |

> Tested on emulated Moto G Power with slow 4G throttling. Single page session, initial page load.

### Insights & Opportunities

| Insight | Severity | Est. Savings |
|---------|:--------:|:------------:|
| Use efficient cache lifetimes | High | 91 KiB |
| Render blocking requests | High | 380 ms |
| LCP request discovery | High | — |
| Network dependency tree | High | — |
| Improve image delivery | Medium | 27 KiB |
| LCP breakdown | Info | — |

### Diagnostics

| Diagnostic | Detail |
|------------|--------|
| Avoid non-composited animations | 1 animated element found |

### Passed Audits

20 performance audits passed.

---

## Accessibility (95/100)

### Failing Audits

| Audit | Severity | Detail |
|-------|:--------:|--------|
| Background and foreground colors do not have a sufficient contrast ratio | Failure | Some text elements do not meet WCAG contrast thresholds |

### Summary

| Status | Count |
|--------|:-----:|
| Passed audits | 19 |
| Items requiring manual review | 10 |
| Not applicable | 40 |

---

## Best Practices (100/100)

### Trust & Safety (Informational)

These are platform-level items controlled by GitHub Pages, not actionable at the application level:

| Item | Status |
|------|:------:|
| Ensure CSP is effective against XSS attacks | Info |
| Use a strong HSTS policy | Info |
| Ensure proper origin isolation with COOP | Info |
| Mitigate clickjacking with XFO or CSP | Info |
| Mitigate DOM-based XSS with Trusted Types | Info |

### Summary

| Status | Count |
|--------|:-----:|
| Passed audits | 13 |

---

## SEO (100/100)

### Audits

All SEO audits passed.

| Audit | Status |
|-------|:------:|
| Document has a `<title>` element | Pass |
| Document has a meta description | Pass |
| Page has successful HTTP status code | Pass |
| Links have descriptive text | Pass |
| Page isn't blocked from indexing | Pass |
| Image elements have `[alt]` attributes | Pass |
| Document has a valid `hreflang` | Pass |
| Document has a valid `rel=canonical` | Pass |
| Document avoids plugins | Pass |
| Document has a valid `robots.txt` | Pass |

### Items Requiring Manual Review

| Item | Status |
|------|:------:|
| Structured data is valid | Manual check |

### Summary

| Status | Count |
|--------|:-----:|
| Passed audits | 10 |
| Items requiring manual review | 1 |

---

## CrUX (Chrome User Experience Report)

**Status:** No Data

The site does not yet have sufficient real-world traffic data in the Chrome User Experience Report. Field data will become available once the site accumulates enough user visits.
