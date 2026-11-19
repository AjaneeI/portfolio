/* eslint-disable @next/next/no-img-element -- Original repository SVG evidence is rendered directly. */
import { ArrowUpRight } from "../../arrow-up-right";
import { SiteNav } from "../../site-nav";
import { projectMetadata, ProjectStructuredData } from "../../project-metadata";

const repo = "https://github.com/AjaneeI/enterprise-knowledge-validation-mcp";
const page = {
  title: "Enterprise Knowledge Validation MCP | Ajanee Igharo",
  description: "A read-only Python MCP server validates procedure status and action readiness using cited synthetic evidence and explicit human-review boundaries.",
  url: "https://ajaneeigharo.com/work/enterprise-knowledge-validation-mcp",
};
export const metadata = projectMetadata(page);

const sections = [
  ["Problem", "Finding a document does not establish that it is the effective version, that an approval covers the exact action, or that supporting evidence is complete."],
  ["What I built", "An independent Python Model Context Protocol server with two read-only tools: check_procedure_status and assess_action_readiness. They return typed assessments, cited records and explicit blockers from a validated synthetic knowledge snapshot."],
  ["Architecture", "FastMCP handles discovery and calls over stdio or loopback Streamable HTTP. Pydantic defines strict contracts. Deterministic logic loads one validated snapshot per assessment. The packaged JSON is the local trust root; synthetic citations identify records in that snapshot rather than external URLs."],
  ["Validation decisions", "Approval evidence must match the action, exact procedure version, scope, required role and time window. Caller-supplied approval claims cannot substitute for stored evidence. Duplicate fields, ambiguous records or contradictory current versions invalidate the store. Failures accumulate explicit blockers."],
  ["Real demonstrations", "In an official-SDK session, SOP-104@1.0 is reported as superseded, cites its approved replacement and remains held for review. ACT-001 is blocked because stored approval evidence is missing. ACT-002 is a positive control eligible for human review, but it still returns human_review_required=true and execution_authorized=false."],
  ["Verification", "The preserved suite contains 106 tests, including 36 real MCP protocol cases. Official clients exercise both transports, discovery, typed responses, invalid inputs, spoofed approvals, corrupted evidence and recovery. GitHub Actions for commit 494e081 passed the suite, demonstration, package build and installed-wheel demonstration outside the checkout. These are recorded checks, not a production-readiness claim."],
  ["Trust and limitations", "All 23 records are fictional. Evaluation is frozen at October 16, 2026, 12:00 UTC, so results do not establish readiness today. No live Glean or Stellix connection, enterprise authentication, source ACL enforcement, operational deployment, employee adoption study or organizational ROI is established. The loopback server is a local demonstration; the website presents its evidence, not a public MCP endpoint."],
  ["Tradeoff", "A small deterministic snapshot makes the rules inspectable and repeatable. It does not authenticate the fixture's stored names or roles: a local editor can forge consistent evidence. A real pilot would need trusted sources, identity, authorization and workflow validation before integration."],
  ["Contribution and provenance", "I prepared this independent portfolio project with ChatGPT/Codex-assisted code, testing, documentation and visual design. The public repository is available for inspection under an All Rights Reserved notice. Its original diagrams and response captures retain their repository provenance."],
];

export default function Page() {
  return <main>
    <ProjectStructuredData {...page} />
    <SiteNav label="Case study navigation" />
    <article className="detail" id="main-content">
      <p className="section-kicker">READ-ONLY MCP · EVIDENCE VALIDATION</p>
      <h1>Enterprise Knowledge Validation MCP</h1>
      <p className="detail-lead">Is the knowledge current? Is the evidence enough?</p>
      <img className="mcp-demo" src="/work-mcp-hero-charcoal.svg" width="1280" height="440" alt="Repository artwork, adapted to the portfolio palette: two read-only MCP tools validate synthetic evidence for human review." />
      {sections.map(([title, body]) => <section key={title}><h2>{title}</h2><p>{body}</p></section>)}
      <section><h2>Inspectable tool responses</h2><p>Selected JSON fields rendered from an actual official-SDK stdio session using fictional records. This is a response transcript, not a separate application interface.</p>
        <a className="mcp-demo-link" href={`${repo}/blob/main/evidence/demo-stdio.json`}><img className="mcp-demo" src="/work-mcp-demonstrations-charcoal.svg" width="1280" height="1326" loading="lazy" alt="Recorded MCP responses: a superseded procedure is held for review; an action is blocked for missing approval evidence." /></a>
      </section>
      <p><a className="primary-link" href={repo}>View repository <ArrowUpRight /></a></p>
      <p><a href={`${repo}/blob/main/docs/verification.md`}>Verification record <ArrowUpRight /></a> · <a href={`${repo}/actions/runs/38957362583`}>Verified GitHub Actions run <ArrowUpRight /></a> · <a href={`${repo}/blob/main/evidence/demo-stdio.json`}>Full stdio transcript <ArrowUpRight /></a></p>
    </article>
  </main>;
}
