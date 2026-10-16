import { projectMetadata, ProjectStructuredData } from "../../project-metadata";
import { SiteNav } from "../../site-nav";
const page = {
  title: "Agentic Analytics Lab | Ajanee Igharo",
  description: "Evaluation-driven analytics-agent lab testing when specialized execution is worth added complexity, with ClickHouse, guardrails, CI, and failure analysis.",
  url: "https://ajaneeigharo.com/work/agentic-analytics-lab",
  dateModified: "2026-10-05",
};
export const metadata = projectMetadata(page);
const sections = [
  ["Problem", "Analytics agents can return plausible answers without respecting metric definitions or the data boundary."],
  ["Engineering question", "When does additional agent complexity improve correctness enough to justify its cost?"],
  ["What I built", "A Python analytics-agent baseline using synthetic operational data, dataset-scoped read-only ClickHouse tooling, semantic metric guards, evaluation infrastructure, three deliberately separate architecture lanes, automated regression coverage, CI, and CodeQL."],
  ["Architecture", "The project includes a measured single-agent baseline plus an implemented oracle_metadata_routed_v0 experiment. The routed experiment uses frozen benchmark metadata to select deterministic handlers for structured cases while preserving the existing local model path where model reasoning is required. This isolates the value of specialized execution when task type is already known. It does not evaluate natural-language route inference."],
  ["Evaluation", "The current main branch has 146 passing tests on Python 3.11 and 3.12. The fixed benchmark separates execution, correctness, task success, tool grounding, evidence quality, route selection, and worker execution."],
  ["Guardrails and boundaries", "Tools are read-only and dataset-scoped. Semantic guards protect metric meaning. The data is synthetic."],
  ["Failure evidence", "The accepted frozen single-agent comparison baseline produced repeatable failure evidence rather than a single benchmark score. Q1, Q2, Q4, and Q6 passed consistently across three unchanged runs, while Q3 and Q5 failed consistently. Those stable failures became the basis for a controlled execution-layer experiment rather than an assumption that more agent complexity would automatically help."],
  ["Tradeoffs", "Under oracle task metadata, specialized deterministic execution corrected the stable Q3 and Q5 baseline failures and substantially reduced model work in the reviewed experiment. That result has an important boundary: route selection was supplied by frozen benchmark metadata. The experiment therefore demonstrates the value of different execution strategies for known task categories, not the reliability of a deployable natural-language router. The routed design also adds control-plane and handler complexity, so the architectural question remains whether those benefits survive realistic route inference."],
  ["Current limitations", "The dataset is synthetic, and the project is an evaluation lab rather than a production analytics service. The routed experiment uses oracle benchmark metadata and therefore does not establish natural-language route inference, a general multi-agent advantage, production performance, or real organizational outcomes. The natural-language development set is a regression fixture set, not held-out evidence of generalization."],
  ["What comes next", "Establish a reviewed post-hardening single-agent comparison anchor, then evaluate natural-language routing on a separate held-out or novel-request set before making broader route-inference claims."],
];
export default function Page() { return <main><ProjectStructuredData {...page} /><SiteNav label="Case study navigation" /><article className="detail" id="main-content"><p className="section-kicker">FLAGSHIP · APPLIED AI ENGINEERING</p><h1>When is more agent complexity actually worth it?</h1><p className="detail-lead">Agentic Analytics Lab is an implemented analytics-agent baseline and a test bed for architecture decisions.</p>{sections.map(([title, body]) => <section key={title}><h2>{title}</h2><p>{body}</p></section>)}<a className="primary-link" href="https://github.com/AjaneeI/agentic-analytics-lab">View repository ↗</a></article></main>; }
