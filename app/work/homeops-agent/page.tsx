import { ArrowUpRight } from "../../arrow-up-right";
import { projectMetadata, ProjectStructuredData } from "../../project-metadata";
import { SiteNav } from "../../site-nav";
const page = {
  title: "HomeOps Agent: Human-in-the-Loop Automation | Ajanee Igharo",
  description: "Human-in-the-loop AI prototype with explicit tool contracts, approval gates, simulated devices, failure handling, and audit logging.",
  url: "https://ajaneeigharo.com/work/homeops-agent",
  dateModified: "2026-10-28",
};
export const metadata = projectMetadata(page);
const sections = [
  ["Problem", "Household automation needs to distinguish a safe suggestion from an action that requires a person’s approval."],
  ["Engineering question", "How can an agent use tools while keeping permission, failure, and audit behavior explicit?"],
  ["What I built", "A prototype with explicit agent tools, approval gates, deterministic scenarios, failure handling, audit history, a visible web dashboard, and a Strands adapter."],
  ["Architecture", "The deterministic Good Night workflow and Strands-facing action tool share a host-enforced permission boundary. Only three exact low-risk device/action pairs can reach the simulated mutator. Lock and access requests stop for human review; no approval-resolution flow is implemented."],
  ["Evaluation", "The reviewed October 18, 2026 implementation CI run passed 37 deterministic tests on both Python 3.11 and 3.12. Chromium scenario-parity coverage checks that the browser reflects the same permission and failure behavior."],
  ["Guardrails and boundaries", "Current device integrations are simulated for reproducible testing. Agent-supplied approval claims cannot authorize a protected action. A separate host enforcement log records decisions; the agent-authored audit narrative is not authorization evidence."],
  ["Failure evidence", "Failure handling is modeled as a first-class path; this prototype does not establish reliability in a real household."],
  ["Tradeoffs", "Simulation makes behavior repeatable but does not validate real device behavior or operational resilience."],
  ["Current limitations", "The device layer is simulated. There is no production deployment, real-device integration, approval-resolution flow, or demonstrated live Strands model/tool-calling quality. The host and its policy code are trusted; this is not an operating-system sandbox."],
  ["What comes next", "Extend validation before connecting any real device or durable action."],
];
export default function Page() { return <main><ProjectStructuredData {...page} /><SiteNav label="Case study navigation" /><article className="detail" id="main-content"><p className="section-kicker">PROTOTYPE · HUMAN-IN-THE-LOOP AGENTS</p><h1>Automation that knows when to ask permission.</h1><p className="detail-lead">HomeOps Agent explores explicit boundaries for useful household automation.</p>{sections.map(([title, body]) => <section key={title}><h2>{title}</h2><p>{body}</p></section>)}<a className="primary-link" href="https://github.com/AjaneeI/homeops-agent">View repository <ArrowUpRight /></a><p><a href="https://github.com/AjaneeI/homeops-agent/actions/runs/39088763292">37-test CI record</a> · <a href="https://github.com/AjaneeI/homeops-agent/blob/main/docs/permission-boundary-integration.md">Permission-boundary scope</a></p></article></main>; }
