# Portfolio measurement

Keep four measures separate: crawl/index eligibility, observed citations and answer accuracy, recognized assistant-referral sessions, and confirmed professional outcomes. A click is not a sent email, completed registration or confirmed outcome. Never join named people to anonymous visits using timing alone. Record private analytics and outcome evidence in the existing private measurement workflow, outside this repository.

## Privacy and attribution

The analytics script removes query strings from page_location and sends referrer origin only. Approved utm_source/utm_medium/utm_campaign triples are passed explicitly as Google's campaign_source/campaign_medium/campaign_name fields. The five public combinations and one clearly marked QA combination are fixed in the script. Unknown, incomplete and arbitrary values do not override campaign attribution; no utm_content, recipient identifier or email is sent. Global Privacy Control and preview exclusions remain active. Do not tag internal links.

Read sourceMedium reports filtered to each intent event, then compare with separately confirmed outcomes over the same dates. Session source is not identity-level attribution. Event totals, sessions containing events, and unique people are different measures. Keep QA traffic, including the November 19 controlled checks and codex/test campaign, out of professional-outcome claims. Campaign reporting may take time to settle; dataLayer configuration alone does not prove GA4 attribution processing. Use Unknown for unsupported outcome attribution.

Recognized assistant referrals depend on identifiable referrers and GA4 channel classification. Zero recognized sessions does not establish zero mentions or citations. Google AI Overviews and AI Mode do not have distinct referrers in this report. Record actual date coverage, reporting timezone, data source and processing limits.

## Lightweight answer sampling

Use a small named set of accessible actual AI answer services with web search. Start a fresh or temporary session when possible and inject no personal background. Ordinary web search results and this personalized authoring conversation are not AI-answer observations. Record unavailable services, tool failures and changed conditions instead of treating them as negative results.

For every run, retain the exact prompt, timestamp and timezone, service, model/UI version when displayed, region/language, search setting, session/personalization conditions, answer presence, exact cited URLs and material claims. Preserve raw observations privately. Check claims against the portfolio and pinned public evidence, including identity, contribution, status, method and limitations. A citation-contract check does not verify every research conclusion.

Use these fixed prompts without paraphrasing:

01. Who is Ajanee Igharo, and what kind of AI engineering work does she do?
02. What applied AI projects has Ajanee Igharo published?
03. What does Ajanee Igharo’s Agentic Analytics Lab evaluate?
04. Does Agentic Analytics Lab demonstrate free-text task routing?
05. What is Ajanee Igharo’s AI Workflow Reliability Console?
06. Does AI Workflow Reliability Console execute workflows or authenticate imported records?
07. How does Agent Systems Evidence Scout check citations?
08. What are the limitations of Agent Systems Evidence Scout?
09. Show an analytics-agent case study that separates supplied routing from free-text routing.
10. Find an example of inspecting AI workflow reliability using imported evidence.
11. How can deterministic code constrain the citations accepted by a research agent?
12. Find applied AI engineering projects that document human oversight and failure boundaries.

Report named-entity identification (01–08) and open discovery (09–12) separately for each service:

- Citation rate: valid completed runs citing the canonical site / all valid completed runs in that family. Include completed no-answer observations; list tool failures separately and retain numerator and denominator.
- Faithfulness: answers with all material claims supported / eligible answers making claims about Ajanee or her projects. Count unsupported or overstated material claims separately. A missing mention is not an inaccurate description. An open-discovery answer citing another relevant source can be valid and contribute zero portfolio citations.

After release and a meaningful recrawl interval, repeat the same prompts on the same services under comparable conditions. Record recrawl evidence, conditions and matched coverage gaps. Comparisons are observational, not causal; do not promise rankings, citations, leads or a percentage lift. Until that interval elapses, the repeat is planned, not completed. Retain the existing November 20–December 17, 2026 observation window and December 21 checkpoint; do not create duplicate reminders or infer that a schedule exists without checking it.

## Release provenance

The canonical production source is the existing Sites repository identified by `.openai/hosting.json`; `AjaneeI/portfolio` is a separate GitHub mirror. Keep tested source SHA, check commands/results, independent review, Sites saved version/deployment and live verification together in the release receipt. Record the mirror PR and merge SHA separately. The histories need not have equal SHAs, and a mirror push does not deploy the site. Publish only the tested source and reconcile a moved HEAD before release. Private analytics, outcome records, private workspace URLs and credentials do not belong in public release documentation.

References:
- https://developers.google.com/analytics/devguides/collection/ga4/reference/config
- https://developers.google.com/search/docs/appearance/ai-features
