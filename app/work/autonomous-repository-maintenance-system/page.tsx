/* eslint-disable @next/next/no-html-link-for-pages -- Native anchors preserve the portfolio's existing vinext navigation behavior. */
import { ArrowUpRight } from "../../arrow-up-right";
import { projectMetadata, ProjectStructuredData } from "../../project-metadata";
import { SiteNav } from "../../site-nav";
import { EvidenceCaptures, type EvidenceCapture } from "../_components/evidence-captures";
import styles from "../_components/portfolio-case-study.module.css";

const page = {
  title: "Autonomous Repository Maintenance System | Ajanee Igharo",
  description: "A supervised offline Python repair prototype with bounded candidate intake, protected checks, preserved Git evidence, and a separate review decision.",
  url: "https://ajaneeigharo.com/work/autonomous-repository-maintenance-system",
  dateModified: "2026-10-28",
};

export const metadata = projectMetadata(page);

const captures: readonly EvidenceCapture[] = [
  {
    label: "Original reviewed run",
    src: "/images/arms-original-inspection.jpg",
    width: 1348,
    height: 926,
    alt: "AWRC displaying imported inspection evidence from the original reviewed synthetic ARMS repair run.",
    caption: "The original reviewed ARMS experiment, inspected inside AWRC. This is the console's view of imported evidence, not an ARMS-native interface. The review attestation belongs to the exact preserved run; AWRC does not independently authenticate it.",
  },
  {
    label: "Fresh pending-review replay",
    src: "/images/arms-fresh-inspection.jpg",
    width: 1348,
    height: 926,
    alt: "AWRC displaying the fresh ARMS replay's raw envelope, including an imported verification claim, awaiting_independent_review, and task success false.",
    caption: "The fresh replay's raw envelope reports awaiting independent review and task success false. Its case results are in the verification package; this envelope-only view keeps them unknown. No new model call or review attestation.",
  },
];

export default function Page() {
  return (
    <main>
      <ProjectStructuredData {...page} />
      <SiteNav label="Case study navigation" />
      <article className="detail" id="main-content">
        <p className="section-kicker">SUPERVISED OFFLINE PROTOTYPE · APPLIED AI ENGINEERING</p>
        <h1>What makes a proposed code repair reviewable?</h1>
        <p className="detail-lead">
          Autonomous Repository Maintenance System checks a bounded Python repair,
          preserves its evidence, and keeps verification separate from review.
        </p>
        <dl className={styles.projectFacts}>
          <div><dt>Stage</dt><dd>Supervised offline engineering prototype</dd></div>
          <div><dt>My role</dt><dd>Project owner; agent-assisted development</dd></div>
          <div><dt>Built with</dt><dd>Python · SQLite · local Git</dd></div>
        </dl>
        <div className={styles.resourceLinks}>
          <a className={`primary-link ${styles.downloadLink}`} href="/downloads/arms-portfolio-source.zip" download>
            Download source package <ArrowUpRight />
          </a>
          <a className={styles.textLink} href="/evidence/arms-verification.json">
            Verification record <ArrowUpRight />
          </a>
          <a className={styles.textLink} href="#arms-captures">
            Explore the captures <ArrowUpRight />
          </a>
        </div>

        <section>
          <h2>Problem</h2>
          <p>
            A plausible patch is only one part of repository maintenance. A reviewer also
            needs to know the starting state, permitted changes, validation result, and
            what happened when an attempt failed.
          </p>
        </section>
        <section>
          <h2>Engineering question</h2>
          <p>
            How can a small repair process make its actions and results inspectable,
            while keeping a candidate&apos;s passed checks separate from task acceptance?
          </p>
        </section>
        <section>
          <h2>What I built</h2>
          <div className={styles.copy}>
            <p>
              A supervised offline repair workflow for one seeded Python retry-delay defect.
              It accepts a bounded source proposal, checks the eligible change, and retains
              the diff, local Git objects, and machine-readable evidence for review.
            </p>
            <p>
              The original reviewed experiment moved from <strong>6/18 baseline passes
              to 18/18 candidate passes</strong>. Those finite checks cover attempts zero
              through five at three stated base delays. The result describes this exact fixture.
            </p>
          </div>
        </section>

        <EvidenceCaptures id="arms-captures" label="ARMS evidence inspected inside AWRC" captures={captures} />

        <section>
          <h2>Architecture</h2>
          <p>
            A standard-library Python host admits the fixed synthetic task, reserves its
            local attempt in SQLite, and accepts a JSON proposal containing the task key,
            expected source digest, and replacement source. A restricted arithmetic
            interpreter checks this fixture without executing arbitrary candidate Python.
            Local Git and evidence records preserve the resulting change.
          </p>
        </section>
        <section className={styles.evaluationSection}>
          <h2>Evaluation</h2>
          <div className={styles.copy}>
            <p>
              The original candidate came from a separate native coding worker during the
              supervised build. The later package check reused that saved proposal. These
              records describe different events and retain their own review states.
            </p>
            {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- The labeled scroll region needs keyboard focus on narrow screens. */}
            <div className={styles.tableRegion} role="region" aria-label="ARMS evidence events and review states" tabIndex={0}>
              <table className={styles.evidenceTable}>
                <caption>Recorded results and their review boundaries</caption>
                <thead>
                  <tr><th scope="col">Evidence event</th><th scope="col">Result</th><th scope="col">Review state</th></tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Original native-candidate experiment</th>
                    <td>6/18 baseline → 18/18 candidate. One seeded retry defect.</td>
                    <td>Separate agent review for that exact original run and offline scope.</td>
                  </tr>
                  <tr>
                    <th scope="row">October 28 package check</th>
                    <td>101 tests, zero failures; 11 documented cases. Frozen source <code>59016b3</code>.</td>
                    <td>Package verification. No new review attestation.</td>
                  </tr>
                  <tr>
                    <th scope="row">Fresh supplied-candidate replay</th>
                    <td>6/18 → 18/18; local inspection exited zero. No new model call.</td>
                    <td>Awaiting independent review. <code>task_success: false</code>.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              The fresh check was recorded on October 28, 2026 (Eastern). The original
              review remains attached to its original run; passing the same checks does
              not transfer that approval to a replay.
            </p>
          </div>
        </section>
        <section>
          <h2>Guardrails and boundaries</h2>
          <p>
            The host owns the target file and protected checks. Candidate JSON cannot choose
            commands, alter the suite, approve a result, or publish it. A repeated completed
            local task returns its existing attempt; incomplete state requires reconciliation.
            Restoration after failed verification
            proceeds only when the current source still matches what that run wrote.
          </p>
        </section>
        <section>
          <h2>Failure evidence</h2>
          <p>
            The recorded scenarios include an incorrect repair, a forbidden-path proposal,
            forged approval, duplicate delivery, and a stale base. An incorrect repair fails
            its checks; unsupported candidate fields are refused. Those outcomes remain in
            the evidence instead of disappearing from the successful example.
          </p>
        </section>
        <section>
          <h2>Tradeoffs</h2>
          <p>
            One synthetic repository and a restricted source form make the control path
            small enough to inspect. The experiment demonstrates a bounded repair process;
            it does not measure general repository reasoning or establish correctness beyond
            the declared finite checks. Model cost and human effort were not measured.
          </p>
        </section>
        <section>
          <h2>Current limitations</h2>
          <div className={styles.copy}>
            <p>
              This is an offline prototype without an operating-system sandbox, remote
              publisher, or unattended service. A separate agent review is an attestation
              for the stated experiment, not human acceptance of a live repository change.
            </p>
            <p>
              The supported demonstration uses producer-emitted microsecond timestamps.
              The unchanged standalone validator has a known ordering limitation for
              external or stored timestamps beyond six fractional digits. Broader timestamp
              validation requires a successor.
            </p>
          </div>
        </section>
        <section>
          <h2>What comes next</h2>
          <p>
            A tightly scoped private repository pilot with an exact target and base,
            appropriate runtime isolation, explicit budgets, and a separate publishing
            path that reconciles uncertain remote results. The real issue-to-draft-PR
            goal remains open.
          </p>
        </section>
        <section>
          <h2>Related work</h2>
          <div className={styles.copy}>
            <p>
              AWRC provides the local evidence workspace shown in these captures. It lets
              a reviewer inspect imported outcomes and their supporting records without
              turning an imported claim into independent confirmation.
            </p>
            <div className={styles.relatedLinks}>
              <a className={styles.textLink} href="/work/ai-workflow-reliability-console">
                Read the AWRC case study <ArrowUpRight />
              </a>
              <a className={styles.textLink} href="/#work">All selected work <ArrowUpRight /></a>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
