import { projectMetadata, ProjectStructuredData } from "../../project-metadata";
import { SiteNav } from "../../site-nav";

const page = {
  title: "Agent Systems Evidence Scout | Ajanee Igharo",
  description: "Evidence-controlled arXiv research agent with bounded tools, per-run verification, deterministic citation guardrails, regression tests, and live integration evidence.",
  url: "https://ajaneeigharo.com/work/agent-systems-evidence-scout",
  dateModified: "2026-10-05",
};
export const metadata = projectMetadata(page);
const sections = [
  ["Problem", "Research agents can produce fluent answers while citing papers they never actually verified."],
  ["Engineering question", "How can a model choose a useful research path without controlling whether its own evidence is accepted?"],
  ["What I built", "A bounded arXiv research workflow using smolagents and Hugging Face inference. The model selects research tools; deterministic Python validates canonical arXiv identities, records verified papers for the current run, and withholds drafts that fail the citation contract."],
  ["Architecture", "Search returns at most five papers. Comparison accepts two to five unique papers. Retrieved titles and abstracts are treated as untrusted research data. A per-run registry separates successful arXiv verification from model assertions, and the final citation gate runs outside the LLM."],
  ["Evaluation", "The accepted release has 39 deterministic tests, green Python 3.11 and 3.12 CI, source-compilation checks, Chromium smoke coverage, and a successful real Hugging Face plus arXiv integration run."],
  ["Failure evidence", "The first live run exposed a model-tool parameter mismatch, a blocked JSON import, malformed comparison input, and step-budget exhaustion. The original offline suite did not reveal these issues. The interfaces were corrected and regression coverage expanded without increasing the six-step budget."],
  ["Measured result", "After the integration repair, the same live scenario completed in four of six available agent steps. This validates the bounded workflow and interface path; it does not establish the truth of every research conclusion."],
  ["Current limitations", "Evidence comes from arXiv metadata and abstracts, not full-paper analysis. The registry is in memory and scoped to one run. There is no production authentication, persistence, hosted tracing, or deployment. This is a compact work sample, not a production research platform."],
];

export default function Page() {
  return <main><ProjectStructuredData {...page} /><SiteNav label="Case study navigation" /><article className="detail" id="main-content"><p className="section-kicker">EVIDENCE-CONTROLLED RESEARCH AGENT</p><h1>Let the model choose the path without waiving the evidence rules.</h1><p className="detail-lead">Agent Systems Evidence Scout separates model discretion from deterministic evidence enforcement.</p>{sections.map(([title, body]) => <section key={title}><h2>{title}</h2><p>{body}</p></section>)}<a className="primary-link" href="https://github.com/AjaneeI/agent-systems-evidence-scout">View repository ↗</a></article></main>;
}
