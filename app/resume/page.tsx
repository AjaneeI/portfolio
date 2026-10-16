import type { Metadata } from "next";
import { SiteNav } from "../site-nav";

/* eslint-disable @next/next/no-html-link-for-pages -- Native anchors avoid vinext's broken Link click interception. */

const pdfUrl = "/Ajanee_Igharo_Applied_AI_Engineer_Resume.pdf";
const resumeDescription = "Ajanee Igharo is an MBA candidate building and evaluating reliable agent systems and implementing applied AI programs for real organizational workflows.";

export const metadata: Metadata = {
  title: { absolute: "Ajanee Igharo | Resume" },
  description: resumeDescription,
  alternates: { canonical: "/resume" },
  authors: [{ name: "Ajanee Igharo", url: "https://ajaneeigharo.com" }],
  openGraph: { title: "Ajanee Igharo | Resume", description: resumeDescription, type: "website", url: "https://ajaneeigharo.com/resume", siteName: "Ajanee Igharo", locale: "en_US", images: [{ url: "/og.png", width: 1200, height: 630, alt: "Ajanee Igharo portfolio preview." }] },
  twitter: { card: "summary_large_image", site: "@AjaneeIgharo", title: "Ajanee Igharo | Resume", description: resumeDescription, images: ["/og.png"] },
};

type EntryProps = { title: string; organization?: string; context?: string; dates: string; items: string[]; technologies?: string; href?: string };

function Entry({ title, organization, context, dates, items, technologies, href }: EntryProps) {
  return <article className="resume-entry">
    <div className="resume-entry-head"><div><h3>{href ? <a href={href}>{title}</a> : title}</h3>{organization && <p className="resume-organization">{organization}</p>}{context && <p className="resume-context">{context}</p>}</div><time>{dates}</time></div>
    <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    {technologies && <p className="technologies"><strong>Tools:</strong> {technologies}</p>}
  </article>;
}

export default function ResumePage() {
  return <main>
    <SiteNav label="Resume navigation" current="resume" />
    <article className="resume-page" id="main-content">
      <header className="resume-header">
        <p className="section-kicker">Resume</p>
        <div className="resume-intro"><div><h1>Ajanee Igharo</h1><p className="resume-summary">MBA candidate building and evaluating reliable agent systems and implementing applied AI programs for real organizational workflows.</p></div><div className="resume-actions"><a className="resume-download" href={pdfUrl} download>Download Resume PDF</a><a className="resume-work-link" href="/#work">View all projects</a></div></div>
        <address><span>Boston, MA</span><a href="mailto:ajaneeigharo@gmail.com">ajaneeigharo@gmail.com</a><a href="https://www.linkedin.com/in/ajaneeigharo/">LinkedIn</a><a href="https://github.com/AjaneeI">GitHub</a></address>
      </header>

      <section className="resume-section" aria-labelledby="education"><h2 id="education">Education</h2><div className="education-list">
        <div className="education-entry"><div><h3>Master of Business Administration</h3><p>University of Massachusetts Boston</p></div><time>Expected May 2027</time><p className="education-coursework"><strong>Selected coursework:</strong> AI Industry Applications Lab, Business Intelligence, Statistical Analysis for Managers</p></div>
        <div className="education-entry"><div><h3>Bachelor of Arts, Psychology</h3><p>University of Massachusetts Boston</p></div><time>2026</time></div>
      </div></section>

      <section className="resume-section" aria-labelledby="experience"><h2 id="experience">Experience</h2><div>
        <Entry title="AI Programs & Operations Coordinator" organization="Paul English Applied Artificial Intelligence Institute, UMass Boston" dates="Current" items={["Coordinate applied AI programs, workshops, outreach, and operational workflows across faculty, students, speakers, and external partners.", "Led operational planning for a Summer 2026 AI workshop series serving 30+ career advisors, revising workshop outlines, coordinating speakers, developing participant resources, and supporting delivery.", "Support the Applied AI Microcredential Program and co-develop Module 2 with Rebaz Kamal, creating learner-facing materials and agent exercises using plain Python, OpenRouter, and Google Colab."]} />
        <Entry title="Small Business Development Intern" organization="Massachusetts Executive Office of Economic Development" dates="Summer 2025" items={["Analyzed market trends, financial information, and business models to support small-business growth planning, resource access, job creation, retention, and capital investment.", "Collaborated with cross-functional teams supporting statewide business incentive and development programs and translated program resources into actionable guidance for businesses."]} />
        <Entry title="Venture Capital Extern" organization="HP Tech Ventures" dates="Sep to Oct 2024" items={["Researched AI-enabled productivity tools, markets, and competitors.", "Sourced a startup aligned with the investment thesis, conducted early-stage diligence, and prepared an investment summary."]} />
        <Entry title="Financial Consulting & Analytics Intern" organization="Girls’ LEAP" dates="Nov 2025" items={["Reviewed QuickBooks and treasury information and translated financial records into clearer decision-support information."]} />
        <div className="resume-role-history" aria-label="Additional Girls’ LEAP role history"><p><strong>Additional Girls’ LEAP service:</strong> Teaching and mentoring | Board service</p></div>
      </div></section>

      <section className="resume-section" aria-labelledby="projects"><h2 id="projects">Selected Projects</h2><div>
        <Entry title="Agentic Analytics Lab" context="Flagship portfolio project | Grounded analytics and deterministic evaluation" dates="2026" href="/work/agentic-analytics-lab" items={["Built a Python analytics-agent baseline over synthetic data with dataset-scoped, read-only ClickHouse access, semantic metric guards, and explicit SQL and resource safeguards.", "Created a frozen Q1 to Q6 benchmark with repeated runs and deterministic scoring across task success, tool grounding, latency, cost, and failure analysis to assess added system complexity.", "Maintain reproducibility artifacts, failure diagnostics, Python 3.11 and 3.12 CI, GitHub Actions, and CodeQL security analysis."]} technologies="Python, SQL, ClickHouse, GitHub Actions, CodeQL, Ollama" />
        <Entry title="Gateway: Agentic Commerce Assurance" context="Team hackathon prototype | Glasswing Ventures Hackathon" dates="2026" href="https://github.com/nnt-git13/GlasswingHackathon" items={["Contributed UX/UI to a merchant-facing agent-assurance prototype, helping shape workflows for agent tests, replay evidence, findings, recommendations, and retesting.", "Implemented and tested auth/session protection in a separate, unmerged pull request using TypeScript, Next.js, React, Playwright, and build/typecheck validation."]} technologies="Next.js, React, TypeScript, Playwright" />
        <Entry title="HomeOps Agent" context="Portfolio project | Human-in-the-loop workflow automation" dates="2026" href="/work/homeops-agent" items={["Built a deterministic Good Night Check with explicit tool contracts and a Strands adapter to inspect simulated smart-home state and complete bounded, low-risk actions.", "Requires human approval before safety-sensitive actions and records an audit trail for tool use and decisions.", "Added automated regression tests for deterministic safety behavior, tool traces, and device-failure handling."]} technologies="Python, Strands Agents SDK, deterministic testing" />
      </div></section>

      <section className="resume-section" aria-labelledby="skills"><h2 id="skills">Technical Skills</h2><dl className="skills-list">
        <div><dt>Programming &amp; Web</dt><dd>Python, SQL, TypeScript, HTML/CSS, React, Next.js</dd></div><div><dt>Agent Systems</dt><dd>MCP, tool invocation, multi-step workflows, structured outputs, deterministic guardrails, human-in-the-loop controls</dd></div><div><dt>Data / Infrastructure</dt><dd>ClickHouse, Docker, Git/GitHub, Ollama</dd></div><div><dt>Testing / Quality</dt><dd>Python testing, Playwright, GitHub Actions, CodeQL, regression testing, reproducibility, failure analysis</dd></div><div><dt>Workflow Systems</dt><dd>Notion, Google Drive, Asana</dd></div>
      </dl></section>

      <section className="resume-section" aria-labelledby="publications"><h2 id="publications">Writing &amp; Speaking</h2><ul className="publication-list">
        <li><a href="https://scholarworks.umb.edu/ai_pubs/47/"><strong>AI-Powered Personal Branding: A Coaching Toolkit for Career Advisors</strong></a><span>Author | UMass Boston ScholarWorks | 2026</span></li><li><a href="https://www.youtube.com/watch?v=Bu7thi-qPPw&t=5204s"><strong>AI in Education: The Skills Gap Students Are Already Solving Themselves</strong></a><span>Solo Presenter | UCTLT 2026 | UMass Boston</span></li><li><a href="https://scholarworks.umb.edu/ai_pubs/43/"><strong>Spring AI 2026 Workshop and Speaker Series Report</strong></a><span>Co-author | UMass Boston ScholarWorks | 2026</span></li><li><strong>UMass Boston Department Chairs’ Retreat</strong><span>Student presentation | 2025</span></li>
      </ul></section>

      <section className="resume-section" aria-labelledby="leadership"><h2 id="leadership">Leadership & Recognition</h2><ul className="recognition-list"><li><strong>Member</strong><span>Paul English Applied AI Institute Student Advisory Council</span></li><li><strong>3rd Place</strong><span>Paul English Applied AI Institute Hackathon | 2024</span></li><li><strong>AI Workshop Leadership</strong><span>Multi-week Summer 2026 series for 30+ career advisors</span></li></ul></section>

      <aside className="resume-cta" aria-label="Contact Ajanee Igharo"><p>Interested in applied AI programs, reliable agent systems, or cross-functional implementation?</p><a href="mailto:ajaneeigharo@gmail.com">Get in touch</a></aside>
    </article>
  </main>;
}
