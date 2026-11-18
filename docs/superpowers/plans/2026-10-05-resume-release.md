# Resume release implementation plan

> Use superpowers:executing-plans for implementation and verification-before-completion for release claims.

Goal: publish the corrected existing resume and synchronized PDF, then perform a read-only portability audit.

Architecture: preserve Vinext/React and the existing Sites project. Generate the PDF from built resume HTML rather than duplicating factual copy. Use two readable pages when necessary.

Spec: user attachment a0b773cf-905c-4190-8665-d27008e291f6/Pasted text.txt, production resume revision and portability audit.

## Global constraints

- User corrections override historical sources; no migration, DNS changes, new host, or paid services.
- Preserve the existing approved dirty resume page, scoped CSS, and tests.
- Exact summary, three PEAAII bullets, Summer 2025 EOED, Nov 2025 Girls' LEAP internship, undated additional service.
- Agentic Analytics, Gateway, HomeOps order; Writing & Speaking before Leadership & Recognition.
- Gateway auth/session PR #17 is open and unmerged at preflight; disclose branch status.
- Keep the established PDF URL. Inspect every PDF page and compare live bytes after deployment.

## Execution

1. Add rendered regression assertions for section names, skills, role/date boundaries, bullet count, project order, and stale artifacts. Run and observe failures.
2. Apply narrowly scoped page corrections; add HTML export and PDF generator. Archive original PDF outside public files. Generate two-page text PDF; verify all text and render both pages.
3. Run npm run typecheck, npm run lint, npm test and git diff --check. Inspect desktop, tablet, narrow mobile, keyboard focus, links, console and download. Review scoped diff.
4. Commit/push/package through existing Sites workflow, save and deploy to current public project. Open actual production domain; download PDF and verify hash and corrected copy.
5. Only after production verification, document read-only architecture and portability findings, preserving all current infrastructure.

## Review focus

- PDF extraction order and complete content, especially page boundaries.
- Long organization/date text at narrow widths.
- Unmerged Gateway work accidentally described as shipped.
- A stale binary at the existing public PDF URL.
- Unrelated files inadvertently included in the Sites all-files commit.
