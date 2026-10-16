# Website source provenance

## Verified import, October 16, 2026

This repository imports the existing Sites/Vinext website source, then adds Glasswing Gateway to the homepage. It does not migrate hosting or deploy the change.

- Website: https://ajaneeigharo.com
- Sites project: `appgprj_6a77ef93ffe481918671673f4ff051da`
- Saved version: **26**
- Version ID: `appgprj_6a77ef93ffe481918671673f4ff051da~appgver_d31e161210348191898aa3c6d4ba4f8f`
- Source commit: `a05dd2d812f8029c7feb89343930e9833337c684`
- Deployment: `appgdep_6ac44265a40881919777e8d2a2614396`, verified `succeeded`
- Existing GitHub main: `8afc9c40fea92263c7085b42a1b0e48793f7dcf6` (README-only repository)

Before import, the local source HEAD matched the version's full commit SHA and its working tree was clean. All 39 tracked files were compared byte-for-byte with that commit. The import copies 38 of those files directly from Git objects, excluding only `docs/superpowers/plans/2026-10-05-resume-release.md`, a historical internal task plan with no runtime role. Source hashes are recorded in `source-import-manifest.json`.

No source Git history, local Git configuration, dependencies, environment files, credentials, generated build output, caches, logs, or machine-specific state are imported. Existing public images and the published resume PDF are retained unchanged. `build/sites-vite-plugin.ts` is authored build tooling, not generated output. `.openai/hosting.json` contains the existing non-secret project identifier and null storage bindings; it and all existing deployment/build configuration are preserved unchanged.

The feature branch descends from existing GitHub main. The source import and Gateway homepage changes are separate commits. The original main commit remains in history; no force push or history rewrite is required.

## GitHub and deployment are separate

GitHub provides source review and change history. The live site remains managed by the existing Sites project. Pushing this branch, opening this PR, or later merging it does **not** establish that the website was updated. No GitHub deployment workflow or new hosting connection is introduced.

A future deployment requires separate owner approval, reconciliation with the then-current Sites source, and publication through the existing Sites process. Preserve any intervening live changes. Do not treat this GitHub branch as an automatically synchronized deployment source.

## Scope after import

The Gateway change affects `app/page.tsx` and adds a focused rendered regression check in `tests/rendered-html.test.mjs`. Documentation records source provenance, technical evidence, and verification. Existing project descriptions, shared navigation, CSS, metadata, case studies, resume, dependencies, and hosting configuration remain unchanged from version 26.
