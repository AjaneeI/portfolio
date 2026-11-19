# Downloadable resume maintenance

The downloadable PDF is the curated one-page Applied AI Engineering application resume, revised with explicit owner approval on October 28, 2026 and the approved Institute end-date correction on November 18, 2026. The website retains the fuller portfolio and editorial layout.

Generate a candidate without overwriting the approved download:

```sh
python scripts/generate-applied-ai-resume.py --output /tmp/resume-candidate.pdf
```

This curated generator replaces the older one-page HTML-to-PDF export workflow. Do not run `generate-resume.py` against the redesigned page: its selectors and old one-page layout are no longer the current downloadable format.

Factual references: owner-confirmed EOED October-December 2024, Girls' LEAP financial internship January-March 2026, MBA expected May 2027; LinkedIn/Notion employment and project review in the October 28 resume thread. Keep public web and PDF claims reconciled when changing factual copy. The generator contains deliberately curated copy, so website wording changes do not automatically propagate.

The current PDF selects Agentic Analytics Lab and AWRC to demonstrate engineering and evaluation. Gateway, ARMS, speaking and recognition remain on the website. Role ownership, agent assistance, synthetic/local boundaries,  are retained. No quantitative business impact is invented. The download is a single-column application resume without tables, graphics, text boxes or image-based text.

QA: exactly 1 Letter page, 10.5pt body with 13pt leading, all extracted text black, stable download filename, dates checked, 6 active links, text within page margins. The rendered page inspected without clipping or overlaps. Text extraction checked; this does not certify accessibility or guarantee a particular ATS score.

## Current parity check

The current approved public PDF already says `Nov 2025 - Nov 2026`. Its bytes are preserved by this maintenance change (SHA-256 `17f5faa845bcff5305db79f0b38428c3f489fcbb96c62fd6abd241fe55634dc6`). Do not replace it merely to repair the generator. Review any new candidate visually before promoting it to the stable public filename.

After building the site, run:

```sh
node scripts/export-resume.mjs /tmp/current-resume.html
python scripts/verify-resume.py /tmp/current-resume.html public/Ajanee_Igharo_Applied_AI_Engineer_Resume.pdf
python scripts/verify-resume.py /tmp/current-resume.html /tmp/resume-candidate.pdf
```

Python dependencies: `reportlab` for generation; `lxml` and `pypdf` for verification. The verifier checks shared identity, four role/date pairs, two selected projects, six active PDF links, one page, and consistent web downloads. It does not require every web bullet, publication, or project in the shorter application PDF. It rejects stale layouts, role-date drift, divergent download buttons, and multi-page candidates.
