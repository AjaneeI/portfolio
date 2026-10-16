/* eslint-disable @next/next/no-html-link-for-pages -- Native anchors avoid vinext's broken Link click interception. */

import { projectMetadata, ProjectStructuredData } from "../../project-metadata";
import { SiteNav } from "../../site-nav";

const metrics = [
  {
    label: "Activation",
    body: "Did the customer reach the first useful action after signing in, such as viewing a message, account update, next step, or task status?",
  },
  {
    label: "Task completion",
    body: "Which intended actions were completed, abandoned, repeated, or handed off to another channel?",
  },
  {
    label: "Follow-through",
    body: "Did the portal interaction lead to the next useful action, such as scheduling, replying, preparing, or resolving a question?",
  },
  {
    label: "Friction signals",
    body: "Where do delays, repeated visits, unclear language, or support handoffs suggest the experience is not making sense?",
  },
];

const considerations = [
  "Use metrics to clarify where customers lose momentum, not to blame people for complex service journeys.",
  "Separate product signals from expert conclusions; this is a product analytics and workflow framing exercise.",
  "Look for patterns that can help teams improve clarity, handoffs, reminders, and next-step design.",
  "Pair quantitative signals with customer and team context before recommending workflow changes.",
];

const page = {
  title: "Closing the Loop | Ajanee Igharo",
  description: "Product analytics case study focused on measuring customer portal journeys, friction, follow-through, workflow outcomes, and responsible AI boundaries.",
  url: "https://ajaneeigharo.com/work/closing-the-loop",
  dateModified: "2026-09-22T17:22:33.065Z",
};
export const metadata = projectMetadata(page);

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function DigitalPortalProductAnalyticsPage() {
  return (
    <main className="case-main">
      <ProjectStructuredData {...page} />
      <SiteNav label="Case study navigation" />

      <section className="case-hero" id="main-content">
        <a className="back-link" href="/#work">Back to selected work</a>
        <div className="case-eyebrow">CONCEPT · PRODUCT ANALYTICS CASE STUDY</div>
        <h1>Closing the loop in customer portal journeys.</h1>
        <p className="case-deck">
          A practical measurement framework for finding where a digital service
          journey loses momentum after a customer signs in, with a focus on
          clarity, follow-through, and responsible product decisions.
        </p>
        <div className="case-meta" aria-label="Case study focus">
          <span>Digital services</span>
          <span>Product analytics</span>
          <span>Measurement design</span>
          <span>Responsible AI lens</span>
        </div>
      </section>

      <section className="case-section">
        <h2>The question</h2>
        <div>
          <p>
            Customer portals can contain messages, account updates, scheduling,
            forms, summaries, billing, and next-step instructions. A
            customer may technically have access and still leave unsure about
            what to do next.
          </p>
          <p>
            This case study frames the product question as: where does the
            service journey lose momentum after sign-in, and what evidence would help a
            team decide what to improve?
          </p>
        </div>
      </section>

      <section className="case-section">
        <h2>Measurement frame</h2>
        <div className="metric-grid">
          {metrics.map((metric) => (
            <article className="metric-card" key={metric.label}>
              <span>{metric.label}</span>
              <p>{metric.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="case-section">
        <h2>How I would use it</h2>
        <div>
          <p>
            The goal is not to reduce a real service experience to clicks. The
            goal is to make product signals useful enough that teams can ask
            better questions about customer understanding, team workload,
            follow-up design, and operational handoffs.
          </p>
          <ul className="case-list">
            {considerations.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="case-section">
        <h2>What this proves</h2>
        <div>
          <p>
            This case study shows problem framing, measurement design,
            product curiosity, and the ability to translate ambiguous
            user behavior into decisions a product, strategy, or operations team
            can discuss.
          </p>
          <p>
            It is a concept and analytics case study, not production software.
          </p>
        </div>
      </section>

      <section className="case-cta">
        <a className="back-link" href="/#work">Review the full portfolio <Arrow /></a>
        <p>
          This concept shows measurement and workflow reasoning, with limits stated plainly.
        </p>
      </section>
    </main>
  );
}
