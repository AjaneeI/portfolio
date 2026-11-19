# Portfolio measurement

GA4 records anonymous resume, email and workshop link intent. Confirmed interviews, collaborations and registrations are recorded separately with date, source and evidence in Notion:
https://app.notion.com/p/41d8182531ca81af89c1dc8a9e97e87b

A click is not a sent email, completed registration or confirmed outcome. Never join named people to anonymous visits using timing alone.

The analytics script removes query strings from page_location and sends referrer origin only. Approved utm_source/utm_medium/utm_campaign triples are passed explicitly as Google's campaign_source/campaign_medium/campaign_name fields. The five public combinations and one clearly marked QA combination are fixed in the script. Unknown, incomplete and arbitrary values do not override campaign attribution; no utm_content, recipient identifier or email is sent. Global Privacy Control and preview exclusions remain active. Use the Notion page's ready-made links; do not tag internal links.

Read sourceMedium reports filtered to each intent event, then compare with separately confirmed outcomes over the same dates. GA4 session source is not identity-level attribution. The November 19 QA traffic must not be treated as organic leads. The codex/test campaign identifies controlled campaign tests. Campaign reporting may take time to settle; dataLayer configuration alone does not prove GA4 attribution processing.

Reference: https://developers.google.com/analytics/devguides/collection/ga4/reference/config
