# Ajanee Igharo | Applied AI Engineer

Production source for [ajaneeigharo.com](https://ajaneeigharo.com), an evidence-oriented portfolio for applied AI engineering and AI for knowledge work.

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

## GitHub source and Gateway update

This repository imports verified Sites version 26 for reviewable source control. GitHub pushes and merges do not automatically update the live site. Deployment remains a separate, explicitly approved Sites action; no deployment workflow is added here.

See [source provenance and import boundaries](docs/source-provenance.md), the [source hash manifest](docs/source-import-manifest.json), and [Gateway evidence and verification](docs/gateway-portfolio-update.md).
