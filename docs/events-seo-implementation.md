# Applied AI in Practice events page: SEO/AEO implementation

## Goal and publishing boundary
Create a crawlable workshop-series landing page at https://ajaneeigharo.com/events with a responsive live Luma calendar.
Workshop cards link directly to their confirmed Luma event pages. The separate series-calendar CTA uses https://lu.ma/applied-ai-in-practice.

IMPORTANT: This GitHub main branch is older than the live OpenAI Sites production project. GitHub changes DO NOT deploy to ajaneeigharo.com. Existing draft PR #3 documents Sites version 45 published on Nov 16, 2026, without merging its GitHub PR. Do not publish this whole branch as a replacement. Reconcile its discrete changes with the latest production Sites source before merging or deploying.

## Files
- app/events/page.tsx: crawlable overview, schedule, FAQ, CollectionPage/ItemList schema and Luma embed
- app/events/events.css: responsive layout
- app/site-nav.tsx: Events link in desktop/mobile navigation
- app/home-events.tsx: founder-led workshop feature with matching direct registration links
- app/page.tsx: homepage feature placement and home-to-events internal link
- app/sitemap.ts: events route in XML sitemap
- tests/rendered-html.test.mjs: SEO, CTA, embed, and navigation regression tests

## Source facts
The confirmed December 3 and 11, 2026 workshops, speaker names, venue and schedule were cross-checked with the connected Luma calendar on Nov 18, 2026. Update future sessions only when confirmed. This is a CollectionPage with an ItemList, not a Google single-event rich-result page.

## Acceptance checks before Sites publication
1. Apply against latest Sites source and preserve all newer application and design changes.
2. Run npm ci, npm run lint, npm run typecheck, npm test. These commands have NOT been run in the current chat; code received static checks only.
3. Verify /events returns HTTP 200 with server-readable HTML, one H1, a descriptive title/meta description, self-canonical, CollectionPage/ItemList JSON-LD, and FAQs.
4. Verify each workshop's Register link opens its own confirmed Luma event page, while the separate series CTA opens https://lu.ma/applied-ai-in-practice.
5. Test 320px, 390px, 768px, 1024px, 1440px widths for layout, focus, menu, iframe usability, and no horizontal overflow.
6. Check homepage nav, mobile menu, sitemap.xml, robots.txt, and all pre-existing portfolio and resume routes.
7. Publish via Sites, then run live HTTP, crawl, metadata and schema checks and submit the new URL for indexing in Search Console if needed.

Keep this PR as a source patch until its discrete changes are reconciled with the latest Sites version 45 source. Never deploy the older repository snapshot as a replacement. Run the listed build and browser checks after forward-porting.