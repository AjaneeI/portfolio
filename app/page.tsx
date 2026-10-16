/* eslint-disable @next/next/no-img-element -- A fixed-dimension local hero avoids vinext image-runtime dependencies. */
import { SiteNav } from "./site-nav";

type Project = {
  index: string; name: string; type: string; title: string;
  problem: string; built: string; evidence: string; repo: string;
  href?: string; highlights?: string; contribution?: string; stack?: string;
};

const projects: Project[] = [
  { index:"01", name:"Agentic Analytics Lab", type:"Flagship · Applied AI engineering", title:"When is more agent complexity actually worth it?", problem:"Analytics agents can sound correct while violating the data or metric boundary.", built:"A guarded ClickHouse analytics agent, deterministic evaluation layer, and separate single-agent, routed-execution, and natural-language routing lanes.", evidence:"146 tests on Python 3.11/3.12 · green CI and CodeQL · reviewed 12/18 baseline vs. 17/18 oracle-routed comparison, explicitly bounded to execution-layer evidence.", href:"/work/agentic-analytics-lab", repo:"https://github.com/AjaneeI/agentic-analytics-lab" },
  { index:"02", name:"Agent Systems Evidence Scout", type:"Evidence-controlled research agent", title:"Let the model choose the path without waiving the evidence rules.", problem:"Research agents can produce fluent answers while citing papers they never verified.", built:"A bounded arXiv research workflow with model-directed tools, a per-run verification registry, and a deterministic citation gate outside the LLM.", evidence:"39 deterministic tests · Python 3.11/3.12 CI · successful Hugging Face + arXiv integration run in 4 of 6 available steps.", href:"/work/agent-systems-evidence-scout", repo:"https://github.com/AjaneeI/agent-systems-evidence-scout" },
  { index:"03", name:"HomeOps Agent", type:"Prototype · Human-in-the-loop agents", title:"Automation that knows when to ask permission.", problem:"Household automation needs a clear boundary between safe routine work and actions that require a person.", built:"A deterministic Good Night Check with explicit tool contracts, approval gates, failure handling, audit history, and a Strands adapter.", evidence:"12 tests on Python 3.11/3.12 · Chromium scenario-parity coverage · simulated device layer for reproducible safety and failure tests.", href:"/work/homeops-agent", repo:"https://github.com/AjaneeI/homeops-agent" },
  {
    index: "04",
    name: "Glasswing Gateway",
    type: "Collaborative Full-Stack / Applied AI Engineering",
    title: "Did the shopper succeed, or just finish running?",
    problem: "A storefront can work for people while browser agents miss product evidence or shopping constraints.",
    built: "A collaborative storefront-testing prototype that turns merchant-reviewed shopping scenarios into bounded browser sessions, replayable evidence, and separate deterministic and AI-based evaluations.",
    highlights: "Merchant approval before execution; constrained Playwright actions; schema-validated model responses; independent evaluation; owner-scoped records.",
    contribution: "My hackathon work covered investigation/replay UX, authentication/security work, regression testing, and demo coordination. Later release hardening was AI-assisted. The application was built with Nathan, Andrew, and LeulTe.",
    stack: "Next.js, React, TypeScript, Tailwind CSS, Playwright, Zod, Supabase Auth, and the OpenAI Responses API.",
    evidence: "Local fixture tests exercise the application and browser runner with synthetic identity and model outputs. Hosted Supabase behavior and live-model outcomes remain unverified. A hackathon-origin prototype, not a production service.",
    repo: "https://github.com/AjaneeI/glasswing-gateway",
  },
];
const principles = [
  ["Baseline first", "Start with the simplest credible system, define success, and make added complexity earn its place."],
  ["Bound the tools", "Permissions, data scope, semantic rules, and approval gates are part of the architecture."],
  ["Separate the measures", "Execution, correctness, grounding, routing, latency, and cost should not collapse into one score."],
  ["Learn from failure", "Stable failure patterns are evidence. They should shape the next experiment, not disappear from the story."],
];

export default function Home() {
  return <>
    <SiteNav label="Main navigation" />
    <main id="main-content">
      <section className="editorial-hero" aria-labelledby="hero-title">
        <div className="hero-image" aria-hidden="true"><img src="/hero-architecture.jpg" width="1024" height="1536" alt="" fetchPriority="high" /></div>
        <div className="hero-copy"><p className="hero-eyebrow">Applied AI Engineer <span>· Boston</span></p><h1 id="hero-title"><span>systems for</span><em>real-world</em><span>workflows.</span></h1><span className="hero-accent" aria-hidden="true" /><p className="hero-summary">I build and evaluate AI systems for real organizational workflows. My current work focuses on agent systems, tool use, evaluation, workflow automation, guardrails, observability, structured data, and human oversight.</p><div className="hero-actions"><a className="hero-primary" href="#work">Explore my work <span aria-hidden="true">↗</span></a><div><a href="https://github.com/AjaneeI">GitHub <span aria-hidden="true">↗</span></a><a href="/resume">Resume <span aria-hidden="true">↗</span></a></div></div></div>
      </section>
      <section className="work" id="work" aria-labelledby="work-title"><p className="section-kicker light">Selected technical work</p><div className="work-heading"><h2 id="work-title">Evidence before claims.</h2><p>Four projects: independent agent-system work followed by collaborative full-stack engineering. Each claim links back to public implementation and stated limits.</p></div>{projects.map((project) => <article className="project" key={project.name}><p className="project-number">{project.index}</p><div><p className="project-type">{project.type}</p><h3>{project.title}</h3><p className="project-name">{project.name}</p><dl className="project-evidence"><div><dt>Problem</dt><dd>{project.problem}</dd></div><div><dt>{project.contribution ? "Team implementation" : "What I built"}</dt><dd>{project.built}</dd></div>{project.highlights && <div><dt>Engineering highlights</dt><dd>{project.highlights}</dd></div>}{project.contribution && <div><dt>My contribution &amp; team</dt><dd>{project.contribution}</dd></div>}{project.stack && <div><dt>Technology stack</dt><dd>{project.stack}</dd></div>}<div><dt>{project.contribution ? "Verification limits" : "Measured evidence"}</dt><dd>{project.evidence}</dd></div></dl><div className="project-actions">{project.href && <a href={project.href}>Read case study →</a>}<a href={project.repo}>{project.contribution ? "View Glasswing Gateway on GitHub ↗" : "View repository ↗"}</a>{project.contribution && <a href={`${project.repo}/blob/main/docs/contributions.md`}>Read contribution records ↗</a>}</div></div></article>)}<p className="supporting-work">Supporting product and measurement work: <a href="/work/closing-the-loop">Closing the Loop →</a></p></section>
      <section className="approach" aria-labelledby="approach-title"><p className="section-kicker">How I work</p><div className="approach-intro"><h2 id="approach-title">I care about what happens after the demo.</h2><p>Useful AI needs a baseline, a boundary, and a way to learn from failure.</p></div><div className="principle-grid">{principles.map(([title, body]) => <article className="principle" key={title}><h3>{title}</h3><p>{body}</p></article>)}</div></section>
      <section className="context" aria-labelledby="context-title"><p className="section-kicker light">Current context</p><div><h2 id="context-title">Applied AI Engineering <em>·</em><br />AI for Knowledge Work</h2><p>Alongside my engineering work, I serve as Applied AI Programs &amp; Operations Coordinator at the Paul English Applied Artificial Intelligence Institute at UMass Boston. The role gives me a close view of how people learn, adopt, and operationalize AI, and why technical systems must make sense inside the organizations around them.</p></div></section>
      <section className="story" id="about" aria-labelledby="about-title"><p className="section-kicker">About</p><div className="story-grid"><h2 id="about-title">Engineering with a wider systems view.</h2><div className="story-copy"><p>My path into applied AI is interdisciplinary: psychology, analytics, information systems, operations, and hands-on system building.</p><p>That mix shapes the questions I ask: Can the system stay inside its boundary? Is its output grounded? What happens when a tool fails? When should a person remain in control? And what evidence would justify the next layer of complexity?</p><p>I am completing an MBA at UMass Boston. It supports my focus on applied AI engineering rather than replacing it.</p></div></div></section>
      <section className="contact" id="contact" aria-labelledby="contact-title"><p className="contact-label">Let’s talk</p><h2 id="contact-title">Useful AI.<br /><em>Clear evidence.</em></h2><div className="contact-actions"><a href="mailto:ajaneeigharo@gmail.com">Email Ajanee <span aria-hidden="true">↗</span></a><a href="https://www.linkedin.com/in/ajaneeigharo/">LinkedIn <span aria-hidden="true">↗</span></a><a href="https://github.com/AjaneeI">GitHub <span aria-hidden="true">↗</span></a></div></section>
    </main>
    <footer className="site-footer"><p>Ajanee Igharo · Applied AI Engineer</p><p>Boston, Massachusetts</p><p><a href="#main-content">Back to top ↑</a></p></footer>
  </>;
}
