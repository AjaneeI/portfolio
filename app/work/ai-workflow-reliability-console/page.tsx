/* eslint-disable @next/next/no-html-link-for-pages -- Native anchors preserve the portfolio's existing vinext navigation behavior. */
import { ArrowUpRight } from "../../arrow-up-right";
import { projectMetadata, ProjectStructuredData } from "../../project-metadata";
import { SiteNav } from "../../site-nav";
import { EvidenceCaptures, type EvidenceCapture } from "../_components/evidence-captures";
import styles from "../_components/portfolio-case-study.module.css";

const page = {
  title: "AI Workflow Reliability Console | Ajanee Igharo",
  description: "A local Python and SQLite console to inspect AI workflow evidence, distinguish claims from verification, compare compatible runs, and export reports.",
  url: "https://ajaneeigharo.com/work/ai-workflow-reliability-console",
  dateModified: "2026-11-18",
};

export const metadata = projectMetadata(page);

const captures: readonly EvidenceCapture[] = [
  {
    label: "Inspect a run",
    src: "/images/awrc-overview.jpg",
    width: 1363,
    height: 936,
    alt: "AWRC's local run list and inspection area displaying an imported synthetic workflow record, with source outcome and evidence assessment shown separately.",
    caption: "A real local application capture using synthetic imported evidence. A source-reported success remains separate from independent verification. Loading this example does not execute an agent or workflow.",
  },
  {
    label: "Compare evidence",
    src: "/images/awrc-comparison.jpg",
    width: 1348,
    height: 926,
    alt: "AWRC comparing compatible imported synthetic evidence and displaying case-level differences.",
    caption: "Two illustrative imported fixture revisions differ in a task check and the reported outcome. Their supporting artifact data was updated consistently; no workflow was executed.",
  },
  {
    label: "See a refusal",
    src: "/images/awrc-refusal.jpg",
    width: 1348,
    height: 926,
    alt: "AWRC refusing an incompatible comparison and displaying the reason instead of an improvement score.",
    caption: "This illustrative copy changes only the scope revision. AWRC refuses the pairing with an explanation, so a change in evaluation context cannot silently become a claim of improvement.",
  },
];

export default function Page() {
  return (
    <main>
      <ProjectStructuredData {...page} />
      <SiteNav label="Case study navigation" />
      <article className="detail" id="main-content">
        <p className="section-kicker">LOCAL EVIDENCE WORKSPACE · APPLIED AI ENGINEERING</p>
        <h1>What does a successful AI run actually prove?</h1>
        <p className="detail-lead">
          AI Workflow Reliability Console makes source outcomes, supporting evidence,
          and comparison limits visible in one local workspace.
        </p>
        <dl className={styles.projectFacts}>
          <div><dt>Stage</dt><dd>Local application · reviewed local candidate</dd></div>
          <div><dt>My role</dt><dd>Project owner; agent-assisted development</dd></div>
          <div><dt>Built with</dt><dd>Python · SQLite · plain JavaScript</dd></div>
        </dl>
        <div className={styles.resourceLinks}>
          <a className={`primary-link ${styles.downloadLink}`} href="/downloads/awrc-portfolio-source.zip" download>
            Download source package <ArrowUpRight />
          </a>
          <a className={styles.textLink} href="/evidence/awrc-verification.json">
            Verification record <ArrowUpRight />
          </a>
          <a className={styles.textLink} href="#awrc-captures">
            Explore the captures <ArrowUpRight />
          </a>
        </div>

        <section>
          <h2>Problem</h2>
          <p>
            A workflow can report success while leaving its reviewer unsure what completed,
            which checks passed, or whether the evidence supports the claim. A single status
            hides those different questions.
          </p>
        </section>
        <section>
          <h2>Engineering question</h2>
          <p>
            How can a reviewer distinguish an imported claim from supporting evidence,
            then compare two runs without changing what is being evaluated?
          </p>
        </section>
        <section>
          <h2>What I built</h2>
          <p>
            A local application that imports supported evidence bundles, inspects outcomes
            and checks, compares compatible records, explains refused comparisons, and
            exports exact JSON or Markdown reports. The run list and inspection area keep
            the selected evidence close to the decision a reviewer needs to make.
          </p>
        </section>

        <EvidenceCaptures id="awrc-captures" label="AI Workflow Reliability Console captures" captures={captures} />
        <div className={styles.resourceLinks}>
          <a className={styles.textLink} href="/evidence/awrc-comparison-example.json" download>
            Download the illustrated comparison <ArrowUpRight />
          </a>
        </div>

        <section>
          <h2>Architecture</h2>
          <p>
            Standard-library Python handles validation and a loopback-only server. SQLite
            retains imported bytes and their revisions; plain JavaScript presents the
            inspection and comparison views. The interface and exports share the same
            evidence core. No model runtime or external service is needed to inspect the
            supplied examples.
          </p>
        </section>
        <section>
          <h2>Evaluation</h2>
          <div className={styles.copy}>
            <p>
              The accepted local walkthrough covered import, inspection, compatible
              comparison, refusal, and export. A separately reviewed local successor
              corrects nanosecond timestamp ordering while preserving the accepted interface.
            </p>
            <p>
              The recorded candidate check passed <strong>87 Python test methods</strong>,
              including 14 HTTP checks, with 44 conformance vectors exercised. The{" "}
              <a className={styles.inlineLink} href="/evidence/awrc-verification.json">verification record</a>{" "}
              documents the Linux temporary-path adaptation and independent review scope.
              These checks do not establish a new browser acceptance.
            </p>
            <p>
              In owner review, I asked for a clearer explanation of source-reported
              <strong> Success</strong> beside <strong>Independently verified: No</strong>.
              The revised explanation says the report claims the task worked, while a
              separate trusted check has not confirmed it. That distinction was then clear
              enough to accept the walkthrough. This was qualitative owner feedback.
            </p>
          </div>
        </section>
        <section>
          <h2>Guardrails and boundaries</h2>
          <p>
            Imports are data: their commands, paths, and URLs are not executed or fetched.
            Source claims stay distinct from the console&apos;s assessment. Comparison requires
            compatible workflow, task, scope, configuration, and check sets. Byte consistency
            helps preserve a record; it does not establish its author or the truth of its claims.
          </p>
        </section>
        <section>
          <h2>Failure evidence</h2>
          <p>
            An incompatible comparison returns its reason without an improvement score.
            An imported success claim with incomplete support remains unverified. These
            are visible outcomes a reviewer can inspect and export, rather than missing
            details behind an overall success label.
          </p>
        </section>
        <section>
          <h2>Tradeoffs</h2>
          <p>
            A compact local application makes this first review workflow easier to inspect
            and reproduce. Keeping collection and model execution outside the console also
            makes its responsibility clear: assess the supplied evidence and explain the
            comparison boundary. Live collection and broader integrations require further work.
          </p>
        </section>
        <section>
          <h2>Current limitations</h2>
          <p>
            The console serves one local operator; browser acceptance was on macOS. It has
            no hosted service, account authentication, or runtime collector. General evidence-format
            interoperability remains partial, and imported review claims do not become
            independent verification. The captures use synthetic or preserved evidence.
          </p>
        </section>
        <section>
          <h2>Questions about the evidence</h2>
          <h3>Does AWRC run or verify an AI agent?</h3>
          <p>AWRC imports and inspects supplied evidence. It does not run an agent, and a source-reported success is not independent verification.</p>
          <h3>What did Ajanee contribute?</h3>
          <p>I own the project and directed its agent-assisted development, including the review workflow and the distinction between reported outcomes and independent confirmation.</p>
          <h3>Where can someone check the result?</h3>
          <p>The downloadable source package, verification record, and synthetic comparison example above let a reader inspect the recorded checks and their limits. They do not establish production deployment or adoption.</p>
        </section>
        <section>
          <h2>What comes next</h2>
          <p>
            Extend the supported evidence sources while keeping source claims, verification,
            and comparison compatibility distinct. The useful product question remains how
            much explanation a person needs to make the next judgment confidently.
          </p>
        </section>
        <section>
          <h2>Related work</h2>
          <div className={styles.copy}>
            <p>
              ARMS explores the other side of this evidence workflow: a bounded code repair
              with protected checks and a separate review decision.
            </p>
            <div className={styles.relatedLinks}>
              <a className={styles.textLink} href="/work/autonomous-repository-maintenance-system">
                Read the ARMS case study <ArrowUpRight />
              </a>
              <a className={styles.textLink} href="/#work">All selected work <ArrowUpRight /></a>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
