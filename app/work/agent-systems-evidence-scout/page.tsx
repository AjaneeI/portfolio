import { ArrowUpRight } from "../../arrow-up-right";
import { projectMetadata, ProjectStructuredData } from "../../project-metadata";
import { SiteNav } from "../../site-nav";

const page = {
  title: "Agent Systems Evidence Scout | Ajanee Igharo",
  description: "An arXiv research agent with bounded tools, citation checks, regression tests, and documented integration evidence.",
  url: "https://ajaneeigharo.com/work/agent-systems-evidence-scout",
  dateModified: "2026-11-18",
};
export const metadata = projectMetadata(page);
const sections = [
  ["What does this project demonstrate?", "A research agent can choose tools while deterministic Python independently enforces which arXiv citations are accepted. This is a local work sample with a token-free interface preview and an optional credentialed research path."],
  ["Problem", "Research agents can produce fluent answers while citing papers they never actually verified."],
  ["Engineering question", "How can a model choose a useful research path without controlling whether its own evidence is accepted?"],
  ["What I built", "A bounded arXiv research workflow using smolagents and Hugging Face inference. The model selects research tools; deterministic Python validates canonical arXiv identities, records verified papers for the current run, and withholds drafts that fail the citation contract."],
  ["Origin and contribution", "This project began in CS 697: Industry AI Applications Lab and extends Inal Mashukov’s UMBInal/arxiv-agent-lab Hugging Face example. That example supplied the smolagents, Hugging Face, arXiv, and Gradio pattern. My extension adds verification tools, the deterministic citation gate, regression coverage, integration hardening, and the portfolio interface."],
  ["Architecture", "Search returns at most five papers. Comparison accepts two to five unique papers. Retrieved titles and abstracts are treated as untrusted research data. A per-run registry separates successful arXiv verification from model assertions, and the final citation gate runs outside the LLM."],
  ["Evaluation", "The audited snapshot at commit 04119db passed 39 deterministic tests on Python 3.11 and 3.12 in the October 4, 2026 CI run, with separately recorded source-compilation checks, Chromium smoke coverage, and a successful real Hugging Face plus arXiv integration run."],
  ["Failure evidence", "The first live run exposed a model-tool parameter mismatch, a blocked JSON import, malformed comparison input, and step-budget exhaustion. The original offline suite did not reveal these issues. The interfaces were corrected and regression coverage expanded without increasing the six-step budget."],
  ["Measured result", "After the integration repair, the same live scenario completed in four of six available agent steps. This validates the bounded workflow and interface path; it does not establish the truth of every research conclusion."],
  ["Current limitations", "Evidence comes from arXiv metadata and abstracts, not full-paper analysis. The registry is in memory and scoped to one run. There is no production authentication, persistence, hosted tracing, or deployment. This is a compact work sample, not a production research platform."],
];

export default function Page() {
  return <main><ProjectStructuredData {...page} /><SiteNav label="Case study navigation" /><article className="detail" id="main-content"><p className="section-kicker">EVIDENCE-CONTROLLED RESEARCH AGENT</p><h1>Let the model choose the path without waiving the evidence rules.</h1><p className="detail-lead">Agent Systems Evidence Scout separates model discretion from deterministic evidence enforcement.</p>{sections.map(([title, body]) => <section key={title}><h2>{title}</h2><p>{body}</p></section>)}<a className="primary-link" href="https://github.com/AjaneeI/agent-systems-evidence-scout">View repository <ArrowUpRight /></a><p><a href="https://huggingface.co/spaces/UMBInal/arxiv-agent-lab">Upstream course example</a> · <a href="https://github.com/AjaneeI/agent-systems-evidence-scout/actions/runs/37238401582">Audited CI record</a></p></article></main>;
}
