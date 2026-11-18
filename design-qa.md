# AWRC + ARMS portfolio design QA

**Final result: passed** for the publication candidate and the checks described below. Public publication and owner approval remain separate steps.

The previous arrow-update QA record is preserved verbatim in `qa-history/arrow-update.md`. Its historical preview blocker predates this review.

## Target and scope

The target is Ajanee Igharo's existing live portfolio, specifically its Agentic Analytics Lab case study, captured on October 28, 2026. The implementation extends Sites version 35, source `cdfc53f7d6ca61e6f9c26cbafbaa381d9200dbb6`, with AWRC and ARMS case-study pages and two homepage entries. Existing navigation, selected-project order, resume, and security headers remain intact.

Source and both implementation hero captures were inspected together in the same comparison input. Evidence filenames below are included in the presentation review kit's `qa/` directory.

## Fidelity comparison

| Surface | Result and evidence |
| --- | --- |
| Fonts and typography | Pass. Existing Georgia display treatment and Geist body text retained. Both question-led headings wrap cleanly in the same desktop content width. Their additional stage, role, and technology facts are intentional additions. Compare `portfolio-case-reference-20261028.jpg`, `awrc-portfolio-hero-20261028.jpg`, and `arms-portfolio-hero-20261028.jpg`. |
| Spacing and layout | Pass. Existing page margins, wordmark, navigation, section dividers, and two-column case-study rows retained. Resource links wrap without overlap. The ARMS evaluation row expands to one full-width column at 1000px and below so the tablet table remains readable. |
| Colors and tokens | Pass. Existing cream `#f6f2e9`, forest green `#174b39`, ink `#111615`, subdued body color, and line tokens retained. Selected capture buttons use the existing green/cream contrast. No new decorative surfaces or generic card system introduced. |
| Image quality and asset fidelity | Pass. Five real application captures are shown without cropping or altered content. Every image has descriptive alt text, its exact intrinsic dimensions, a caption, and a full-size link. ARMS captures are explicitly labeled as imported evidence viewed in AWRC. At phone width, the caption and full-size link carry the readable explanation; embedded desktop UI text is not claimed to be phone-legible. |
| Icons and interaction states | Pass. Existing ArrowUpRight component reused. AWRC's three controls select the correct image and caption. Both ARMS controls work by keyboard Space as well as native button interaction; selected state uses aria-pressed and caption changes use a polite live region. |

## Responsive and behavioral checks

- Live desktop pages rendered with correct titles, one H1 each, linked source packages, verification records, related-project navigation, and the intended five captures.
- Static responsive layout was rendered from the actual served page HTML and CSS at iframe viewport widths of 390px and 768px. Scripts were omitted from those frames, so this is layout verification, not mobile interaction or physical-device acceptance. No page-level horizontal overflow was observed: content widths were 375px and 753px after the browser's scrollbar allocation.
- AWRC facts, controls, and captions wrap and stack cleanly. Evidence: `awrc-responsive-hero-20261028.jpg` and `awrc-responsive-gallery-20261028.jpg`.
- ARMS's 530px-minimum table scrolls within its labeled, keyboard-focusable region on a phone. The final tablet table shows all three columns. Evidence: `arms-responsive-evaluation-final-20261028.jpg`.
- The new homepage entries stack on the phone and retain the two-column treatment on the tablet. Evidence: `portfolio-responsive-studies-20261028.jpg`.
- Application-origin browser error log was empty for the reviewed live pages. Unrelated extension logs were excluded explicitly.
- All ten linked source archives, evidence JSON files, and images returned HTTP 200 with the expected media types. Served byte lengths and non-cryptographic FNV-1a checksums matched the local files; local SHA256 values are also recorded. Browser Web Crypto was unavailable on the HTTP preview, so no browser SHA256 claim is made.
- Native ZIP links were present and static delivery was verified. The automation's download-event capture timed out; the browser/tool cause is undiagnosed. No application download defect was found and no security or browser protection was bypassed. Actual post-publication HTTPS download behavior remains part of deployment smoke verification.
- Production typecheck, build, 13 explicitly named rendered-HTML tests, and direct built-worker rendering of both new routes are recorded separately in `portfolio-final-validation.md`.

## Findings and resolutions

| Severity | Finding | Resolution |
| --- | --- | --- |
| P1 | The older portfolio preview configuration did not bind the managed preview host; the initial new-route review reached an unrelated stale page. | Adopted the current Sites template's ignored local execution profile and host allowlist. Correct homepage and both routes then rendered. Production defaults and security headers are preserved. |
| P2 | Lazy-loaded evidence images lacked intrinsic dimensions, allowing avoidable layout movement. | Added exact width/height to all five capture entries and the shared image element; scoped TypeScript validation passed. |
| P2 | The ARMS table unnecessarily scrolled inside a narrow right column at tablet width. | Stack the evaluation section below 1000px. Recaptured the final 768px view with all columns visible. |

No unresolved P0, P1, or P2 design finding remains in the reviewed scope. Native mobile interaction, narrated video, owner acceptance of the new pages, and production-host verification were not performed. The temporary responsive harness was removed from `public/` after QA and is retained only as review evidence.
