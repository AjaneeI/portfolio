import { projectMetadata, ProjectStructuredData } from "../../project-metadata";
import { SiteNav } from "../../site-nav";
const page = {
  title: "HomeOps Agent | Ajanee Igharo",
  description: "Human-in-the-loop AI prototype with explicit tool contracts, approval gates, simulated devices, failure handling, and audit logging.",
  url: "https://ajaneeigharo.com/work/homeops-agent",
};
export const metadata = projectMetadata(page);
const sections = [
  ["Problem", "Household automation needs to distinguish a safe suggestion from an action that requires a person’s approval."],
  ["Engineering question", "How can an agent use tools while keeping permission, failure, and audit behavior explicit?"],
  ["What I built", "A prototype with explicit agent tools, approval gates, deterministic scenarios, failure handling, audit history, a visible web dashboard, and a Strands adapter."],
  ["Architecture", "The agent selects bounded tools. Approval gates interrupt actions that require human authorization."],
  ["Evaluation", "Twelve deterministic tests run on Python 3.11 and 3.12. Chromium scenario-parity coverage checks that the browser reflects the same permission and failure behavior."],
  ["Guardrails and boundaries", "Current device integrations are simulated for reproducible testing. Human approval remains part of the design."],
  ["Failure evidence", "Failure handling is modeled as a first-class path; this prototype does not establish reliability in a real household."],
  ["Tradeoffs", "Simulation makes behavior repeatable but does not validate real device behavior or operational resilience."],
  ["Current limitations", "This is a prototype, not a production deployment or a real device integration."],
  ["What comes next", "Extend validation before connecting any real device or durable action."],
];
export default function Page() { return <main><ProjectStructuredData {...page} /><SiteNav label="Case study navigation" /><article className="detail" id="main-content"><p className="section-kicker">PROTOTYPE · HUMAN-IN-THE-LOOP AGENTS</p><h1>Automation that knows when to ask permission.</h1><p className="detail-lead">HomeOps Agent explores explicit boundaries for useful household automation.</p>{sections.map(([title, body]) => <section key={title}><h2>{title}</h2><p>{body}</p></section>)}<a className="primary-link" href="https://github.com/AjaneeI/homeops-agent">View repository ↗</a></article></main>; }
