# Resume PDF maintenance

The factual source is `app/resume/page.tsx`. The generator consumes its built HTML, not a second copy of the resume.

Use Node as specified in package.json and Python with reportlab, lxml and pypdf installed. From the repository root:

```sh
npm run build
node scripts/export-resume.mjs /tmp/resume.html
python3 scripts/generate-resume.py /tmp/resume.html public/Ajanee_Igharo_Applied_AI_Engineer_Resume.pdf
python3 scripts/verify-resume.py /tmp/resume.html public/Ajanee_Igharo_Applied_AI_Engineer_Resume.pdf
npm run typecheck
npm run lint
npm test
```

Render and inspect both PDF pages after every regeneration. Verify clipping, wrapping, contrast and balanced page breaks. The verifier checks text, links, page count and stale copy; it does not replace visual inspection or certify PDF accessibility. Keep the public filename stable. After release download from the actual domain and compare SHA-256 with the generated file.

The current PDF uses a conventional, ATS-readable one-page layout derived from Ajanee's retained one-page resume template: a centered header, compact section rules, one-column flow, 8.5pt body text and 9.5pt leading. The website body copy remains 17px with a 1.68 line height.

Release review: no Critical or Important findings. Deferred minor: existing browser-print CSS targets `.resume-site-nav`, while shared navigation renders `.site-header`; direct browser printing can include navigation. The canonical downloadable PDF excludes navigation. Shared navigation was intentionally not changed in this scoped release.
