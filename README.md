> Deployment source: the Sites repository for project `appgprj_6a77ef93ffe481918671673f4ff051da`. This public GitHub mirror is synchronized with deployed source commit `6af49ca867b0cb291f8d293d6bcab6c5c391eb56` (Version 53). Pushing to GitHub alone does not publish the site. See [release notes](docs/seo-release.md).

# Ajanee Igharo | Applied AI Engineer

Public source mirror for [ajaneeigharo.com](https://ajaneeigharo.com), an evidence-oriented portfolio for applied AI engineering and AI for knowledge work.

## Portfolio contract

- Lead identity: Applied AI Engineer
- Positioning: Applied AI Engineering · AI for Knowledge Work
- Strong technical claims must link to public implementation, evaluation, tests, CI, architecture, or reproducible artifacts.
- Prototypes, simulations, historical benchmarks, and current evidence must remain clearly distinguished.
- The visual system uses editorial serif typography, warm cream, forest green, restrained rules, and generous whitespace.

## Local checks

```bash
npm install
npm run lint
npm run typecheck
npm test
```

`npm test` builds the Vinext/Cloudflare application and runs route, claim-boundary, navigation, résumé, metadata, robots, and sitemap checks against the built worker.

## Primary routes

- `/`: homepage and selected work
- `/work/agentic-analytics-lab`: flagship evaluation-driven engineering case study
- `/work/agent-systems-evidence-scout`: evidence-controlled research-agent case study
- `/work/homeops-agent`: human-in-the-loop automation prototype
- `/work/closing-the-loop`: supporting product analytics case study
- `/resume`: web résumé and canonical PDF download

The production deployment is managed through the existing OpenAI Sites project recorded in `.openai/hosting.json`.
