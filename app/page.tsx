import { SeriesFeature } from "./series-feature";
import { SelectedWork } from "./selected-work";
import { ArrowUpRight } from "./arrow-up-right";
/* eslint-disable @next/next/no-img-element -- A fixed-dimension local hero avoids vinext image-runtime dependencies. */
import { SiteNav } from "./site-nav";

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
        <div className="hero-copy"><p className="hero-eyebrow">Applied AI Engineer <span>· Boston</span></p><h1 id="hero-title"><span>systems for</span>{" "}<em>real-world</em>{" "}<span>workflows.</span></h1><span className="hero-accent" aria-hidden="true" /><p className="hero-summary">I’m Ajanee Igharo, a Boston-based applied AI engineer. I build and evaluate agent systems for organizational workflows, with a focus on tool use, workflow automation, and human oversight.</p><div className="hero-actions"><a className="hero-primary" href="#work">Explore my work <ArrowUpRight /></a><div><a href="https://github.com/AjaneeI">GitHub <ArrowUpRight /></a><a href="/resume">Resume <ArrowUpRight /></a></div></div></div>
      </section>
      <SeriesFeature />
      <SelectedWork />
      <section className="approach" aria-labelledby="approach-title"><p className="section-kicker">How I work</p><div className="approach-intro"><h2 id="approach-title">I care about what happens after the demo.</h2><p>Useful AI needs a baseline, a boundary, and a way to learn from failure.</p></div><div className="principle-grid">{principles.map(([title, body]) => <article className="principle" key={title}><h3>{title}</h3><p>{body}</p></article>)}</div></section>
      <section className="context" aria-labelledby="context-title"><p className="section-kicker light">Current context</p><div><h2 id="context-title">Applied AI Engineering <em>·</em><br />AI for Knowledge Work</h2><p>From November 2025 through November 2026, I served as AI Programs &amp; Operations Coordinator at the Paul English Applied Artificial Intelligence Institute at UMass Boston. That work gave me a close view of how people learn, adopt, and operationalize AI, and why technical systems must make sense inside the organizations around them.</p></div></section>
      <section className="story" id="about" aria-labelledby="about-title"><p className="section-kicker">About</p><div className="story-grid"><h2 id="about-title">Engineering with a wider systems view.</h2><div className="story-copy"><p>My path into applied AI is interdisciplinary: psychology, analytics, information systems, operations, and hands-on system building.</p><p>That mix shapes the questions I ask: Can the system stay inside its boundary? Is its output grounded? What happens when a tool fails? When should a person remain in control? And what evidence would justify the next layer of complexity?</p><p>I am completing an MBA at UMass Boston. It supports my focus on applied AI engineering rather than replacing it.</p></div></div></section>
      <section className="story opportunities" id="opportunities" aria-labelledby="opportunities-title"><p className="section-kicker">Work with me</p><div className="story-grid"><h2 id="opportunities-title">Boston first.<br />Focused remote projects.</h2><div className="story-copy"><h3>Boston hiring opportunities</h3><p>My priority is a Boston-area role in applied AI, implementation, workflow automation or evaluation. I bring hands-on Python and SQL projects, experience coordinating AI programs, and an MBA in progress at UMass Boston, expected May 2027.</p><p><a className="opportunity-link" href="/resume">Review my resume</a> · <a className="opportunity-link" data-contact-purpose="hiring" href="mailto:ajaneeigharo@gmail.com?subject=Boston%20hiring%20opportunity">Discuss a Boston role</a></p><h3>Remote AI workflow evaluation and prototyping</h3><p>I’m also available for small, scoped paid projects: testing a defined AI workflow, documenting failures and limitations, or building a prototype with a practical handoff.</p><p>We agree on the question, authorized inputs, deliverable and review before work begins. My <a className="opportunity-link" href="/work/agentic-analytics-lab">AAL</a> and <a className="opportunity-link" href="/work/ai-workflow-reliability-console">AWRC</a> case studies show my approach and its limits.</p><p><a className="opportunity-link" data-contact-purpose="consulting" href="mailto:ajaneeigharo@gmail.com?subject=Scoped%20remote%20AI%20project">Discuss a scoped paid project</a></p></div></div></section>
      <section className="contact" id="contact" aria-labelledby="contact-title"><p className="contact-label">Let’s talk</p><h2 id="contact-title">Useful AI.<br /><em>Clear evidence.</em></h2><div className="contact-actions"><a href="mailto:ajaneeigharo@gmail.com">Email Ajanee <ArrowUpRight /></a><a href="https://www.linkedin.com/in/ajaneeigharo/">LinkedIn <ArrowUpRight /></a><a href="https://github.com/AjaneeI">GitHub <ArrowUpRight /></a></div></section>
    </main>
    <footer className="site-footer"><p>Ajanee Igharo · Applied AI Engineer</p><p>Boston, Massachusetts</p><p><a href="#main-content">Back to top ↑</a></p></footer>
  </>;
}
