# SEO and accessibility release — November 2026

The portfolio retains its existing Sites project, public audience and visual identity. The production source is the Sites repository identified by `.openai/hosting.json`; the public GitHub repository is a mirror and should be compared before synchronization.

This release publishes descriptive project titles; static initial-head metadata; a contrast adjustment for small project labels; stable, indexable resume PDF downloads; immediately visible events-page hero content; consistent historical role verbs using owner-confirmed dates; and compatible dependency patches. The ordinary test command includes analytics, release invariants and native workerd route tests.

The www hostname is handled by an exact-host Cloudflare 301 redirect to `https://ajaneeigharo.com` with the original path and query retained. The Worker supplies a 308 fallback. Apex DNS is unchanged.

## Validation

Run `npm run lint`, `npm run typecheck` and `npm test`. Route tests execute the built Worker through Miniflare rather than pretending Cloudflare platform APIs exist in Node. Keep Lighthouse lab metrics separate from field data and do not call outbound intent events completed registrations.

The `satori` → `fflate` override stays on the compatible 0.7 patch line to exclude the affected 0.7.0–0.7.4 versions (GHSA-px8p-9vwx-vf98). Reassess when Satori updates its pin. Do not follow an audit suggestion to downgrade the framework.

## Rollback

Restore the previous accepted Sites version only after checking for unrelated later changes. DNS rollback removes only the new www CNAME, verification TXT records and named redirect rule; preserve the existing apex and Search Console records. PDF rollback restores the previous bytes and links together.

## Hosting verification limit

The Worker fallback supplies a PDF canonical Link header, but the Sites static asset layer does not expose this header in production. The clean PDF URL is linked throughout; Google already selects it over the old query variant. Do not claim the optional header is live.
