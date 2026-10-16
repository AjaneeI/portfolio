# Glasswing Gateway portfolio update

## Scope and ordering

The homepage now features Agentic Analytics Lab, Agent Systems Evidence Scout, HomeOps Agent, and Glasswing Gateway, in that order. Closing the Loop remains the supporting link. The first three establish independent agent-system work before Gateway adds collaborative full-stack experience. Existing project descriptions are unchanged.

Gateway reuses the existing editorial project row, definition-list grid, typography, colors, spacing, and responsive breakpoints. Its labels distinguish team implementation, individual contributions, and verification limits. No case-study route, screenshot, demo link, dependency, or deployment workflow is added.

## Final description

> A collaborative storefront-testing prototype that turns merchant-reviewed shopping scenarios into bounded browser sessions, replayable evidence, and separate deterministic and AI-based evaluations.

Classification: **Collaborative Full-Stack / Applied AI Engineering**.

## Claim evidence

Inspected public release: [`0652429ee4091073cfa9566ee6c7abbaae372251`](https://github.com/AjaneeI/glasswing-gateway/tree/0652429ee4091073cfa9566ee6c7abbaae372251). This is the source of the Gateway claims, not evidence that hosted services or paid model calls were exercised during this website update.

| Claim | Source evidence | Boundary |
| --- | --- | --- |
| Merchant approval before execution | [`service.ts`](https://github.com/AjaneeI/glasswing-gateway/blob/0652429ee4091073cfa9566ee6c7abbaae372251/lib/gateway/service.ts), draft revision and approval checks before scan creation | Editing or policy changes require renewed approval. |
| Constrained Playwright actions | [`browser.ts`](https://github.com/AjaneeI/glasswing-gateway/blob/0652429ee4091073cfa9566ee6c7abbaae372251/lib/gateway/browser.ts), URL/action policy and browser runner | Authorized test environments; not unrestricted browsing or completed purchases. |
| Schema-validated model responses | [`provider.ts`](https://github.com/AjaneeI/glasswing-gateway/blob/0652429ee4091073cfa9566ee6c7abbaae372251/lib/gateway/provider.ts), explicit fixture mode and OpenAI Responses API adapter | Implemented integration; live-model outcomes unverified. |
| Independent evaluation | [`evaluate.ts`](https://github.com/AjaneeI/glasswing-gateway/blob/0652429ee4091073cfa9566ee6c7abbaae372251/lib/gateway/evaluate.ts), fresh evaluator call, observation references, deterministic failure precedence | Separate evaluation call, not proof of unbiased judgments or live model quality. |
| Owner-scoped records and replay evidence | [`store.ts`](https://github.com/AjaneeI/glasswing-gateway/blob/0652429ee4091073cfa9566ee6c7abbaae372251/lib/gateway/store.ts), owner-specific file paths and record checks; service trace persistence | Local-file prototype architecture, not production multi-tenant isolation. |
| Technology stack | [`package.json`](https://github.com/AjaneeI/glasswing-gateway/blob/0652429ee4091073cfa9566ee6c7abbaae372251/package.json) and provider implementation | Supabase Auth is implemented; hosted configuration and acceptance remain unverified. |
| Ajanee's work and team attribution | [`docs/contributions.md`](https://github.com/AjaneeI/glasswing-gateway/blob/0652429ee4091073cfa9566ee6c7abbaae372251/docs/contributions.md) | Merged investigation/replay UX is distinct from separate auth/session work and later AI-assisted release hardening. No sole-authorship claim. |
| Fixture test limitations | [`docs/testing.md`](https://github.com/AjaneeI/glasswing-gateway/blob/0652429ee4091073cfa9566ee6c7abbaae372251/docs/testing.md) and [`publication-security.spec.ts`](https://github.com/AjaneeI/glasswing-gateway/blob/0652429ee4091073cfa9566ee6c7abbaae372251/tests/gateway/publication-security.spec.ts) | Synthetic identity/model outputs do not establish hosted Supabase or merchant outcomes. |

## Verification on October 16, 2026

- `npm ci --ignore-scripts`: existing lockfile installed successfully; no dependency changes.
- `npm run typecheck`: passed.
- `npm run lint`: passed.
- `npm test`: production build succeeded, followed by **12 passed, 0 failed, 0 skipped** rendered tests. Coverage includes all existing routes, metadata, navigation, resume, security headers, and the new ordering/attribution/limits check.
- `git diff --check`: passed.
- Browser checks on the production build: no horizontal overflow at 1440, 768, 390, or 320 px. Gateway visually inspected at desktop and mobile sizes; existing CSS supplies three, two, and one-column layouts. Mobile menu and Resume navigation worked; the resume return-to-work link worked. Gateway links have descriptive names and visible keyboard focus. No unnamed homepage links or captured browser console errors. These checks are not a full accessibility certification.
- GitHub confirmed Gateway is public at the inspected release SHA; the homepage points to that repository and its contribution record.
- Source verification: all 39 tracked version-26 files matched the clean source commit before import; 38 were imported, with the historical internal task plan excluded. Imported runtime/build configuration and public assets are unchanged except the approved homepage update. The favicon PNG, hero JPG, social PNG, and resume PDF also matched current live bytes.
- Rendered comparison: the three original project rows and the hero, approach, current-context, about, and contact text matched the current live homepage exactly. Gateway is the sole added project row.
- Complete diff reviewed against both existing GitHub main and the source-import commit. Credential/private-path pattern checks found no matches. The lockfile's resolved package URLs use the npm registry. Generated files remain ignored.

## Remaining deployment considerations

No merge or deployment is performed by this change. The live website remains Sites version 26; the GitHub branch is a proposed update, not a published website.

The inherited lockfile reports **27 npm audit advisories: 23 high, 2 moderate, 2 low, 0 critical** as of this verification. Direct affected packages include `vinext`, `vite`, `react-server-dom-webpack`, `wrangler`, `@cloudflare/vite-plugin`, and `@next/eslint-plugin-next`. These advisories predate the Gateway edit because the dependency files are byte-identical to version 26. They require a separately scoped dependency review before a future release; passing content tests is not security clearance. No automated audit fix or dependency upgrade was applied.

The build also emits the existing Node `module.register()` deprecation warning and Vinext's unknown route-classification notice. Compilation and rendered route tests pass. No build or hosting settings were changed to suppress these messages.
