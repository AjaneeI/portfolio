import type { Metadata } from "next";
import { SiteNav } from "../site-nav";
import "./events.css";

const siteUrl = "https://ajaneeigharo.com";
const pageUrl = siteUrl + "/events";
const calendarUrl = "https://luma.com/calendar/cal-Hn5j7FxO7A7Ensp";

const description =
  "Explore Applied AI in Practice, a student-led series of hands-on AI workshops in Boston, founded and led by Ajanee Igharo at UMass Boston.";

export const metadata: Metadata = {
  title: "Applied AI in Practice | Boston AI Workshops",
  description,
  alternates: { canonical: "/events" },
  openGraph: {
    title: "Applied AI in Practice | Boston AI Workshops",
    description,
    url: pageUrl,
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Ajanee Igharo portfolio preview" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Applied AI in Practice | Boston AI Workshops",
    description,
    images: ["/og.png"],
  },
};

const workshops = [
  {
    id: "gtm-engineering",
    day: "03",
    month: "DEC",
    dateLabel: "Thursday, December 3, 2026",
    starts: "2026-12-03T15:30:00-05:00",
    ends: "2026-12-03T16:45:00-05:00",
    timeLabel: "3:30–4:45 PM ET",
    name: "GTM Engineering: AI-Powered Go-to-Market Workflows",
    registrationUrl: "https://luma.com/1sts0xgz",
    speakers: "Amrutha “Amu” Killada",
    summary:
      "Explore an emerging career combining AI, business, marketing, and technology. Practice identifying potential customers, creating a go-to-market strategy, and building AI-enabled customer acquisition workflows.",
    tags: ["Hands-on", "AI for business", "AI careers", "No coding required"],
  },
  {
    id: "becoming-ai-first",
    day: "11",
    month: "DEC",
    dateLabel: "Friday, December 11, 2026",
    starts: "2026-12-11T12:00:00-05:00",
    ends: "2026-12-11T13:30:00-05:00",
    timeLabel: "12:00–1:30 PM ET",
    name: "Becoming AI-First: Context Capture & Starting with the Why",
    registrationUrl: "https://luma.com/gzrgw7b0",
    speakers: "Alex Turgeon and Logan Reilly of Valere",
    summary:
      "Learn why the context behind a workflow matters. See how teams capture tacit knowledge, turn it into useful specifications, and design an AI skill for a recurring task through a live demo and hands-on practice.",
    tags: ["Hands-on", "AI workflows", "AI for business", "No coding required"],
  },
] as const;

// A calendar landing page is not a Google single-event detail page. Use
// CollectionPage + ItemList rather than claiming Event rich-result eligibility.
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": pageUrl + "#webpage",
      url: pageUrl,
      name: "Applied AI in Practice | Boston AI Workshops",
      description,
      inLanguage: "en-US",
      isPartOf: { "@id": siteUrl + "/#website" },
      about: [
        { "@type": "Thing", name: "Applied artificial intelligence" },
        { "@type": "Thing", name: "Hands-on AI workshops in Boston" },
      ],
      creator: { "@id": siteUrl + "/#person" },
      mainEntity: { "@id": pageUrl + "#upcoming-workshops" },
    },
    {
      "@type": "ItemList",
      "@id": pageUrl + "#upcoming-workshops",
      name: "Upcoming Applied AI in Practice workshops",
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      itemListElement: workshops.map((workshop, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: workshop.name,
        url: pageUrl + "#" + workshop.id,
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Events", item: pageUrl },
      ],
    },
  ],
};

const questions = [
  {
    question: "What is Applied AI in Practice?",
    answer:
      "Applied AI in Practice is a student-led workshop and speaker series founded and led by Ajanee Igharo at UMass Boston. Sessions connect participants with industry practitioners and practical applications of artificial intelligence.",
  },
  {
    question: "Who can attend the workshops?",
    answer:
      "Workshops welcome students and participants from business, technology, and other disciplines. Each event description explains the specific activities and preparation.",
  },
  {
    question: "Do I need programming experience?",
    answer:
      "No. The December 3 and December 11 workshops are designed for participants without prior coding experience. Bring a laptop when requested in the event details.",
  },
  {
    question: "Where are the workshops held?",
    answer:
      "The confirmed December workshops take place at the Venture Development Center, 3rd Floor, Wheatley Hall, UMass Boston, 100 Morrissey Boulevard, Boston, Massachusetts. Check the calendar for each event's current venue.",
  },
  {
    question: "How do I register?",
    answer:
      "Visit the Applied AI in Practice Luma calendar to see the current schedule and registration details. The calendar is the official registration destination for the series.",
  },
] as const;

export default function EventsPage() {
  return (
    <>
      <SiteNav label="Events navigation" current="events" />
      <main id="main-content" className="events-page">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
        />
        <section className="events-hero" aria-labelledby="events-title">
          <div className="events-hero-inner">
            <p className="events-eyebrow">Boston's next generation of AI builders</p>
            <h1 id="events-title">Applied AI <em>in Practice.</em></h1>
            <p className="events-deck">The future of AI is being built here.</p>
            <p className="events-motto">Learn. Build. Connect.</p>
            <p className="events-intro">
              Hands-on AI workshops in Boston bringing students, emerging builders,
              and industry practitioners together to explore real-world applications
              of artificial intelligence, workflows, and careers.
            </p>
            <p className="events-byline">Founded and led by Ajanee Igharo at UMass Boston.</p>
            <a className="events-primary-cta" href={calendarUrl}>
              Explore the workshop series and register <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>

        <section className="events-section events-upcoming" aria-labelledby="events-upcoming-title">
          <div className="events-heading">
            <p className="events-section-label">Upcoming in Boston</p>
            <h2 id="events-upcoming-title">Workshops you can put to work.</h2>
            <p>Meet practitioners, try real workflows, and leave with something useful.</p>
          </div>
          <div className="events-workshop-list">
            {workshops.map((workshop) => (
              <article className="events-workshop" id={workshop.id} key={workshop.id}>
                <div className="events-date-block" aria-hidden="true">
                  <span>{workshop.month}</span><strong>{workshop.day}</strong>
                </div>
                <div className="events-workshop-content">
                  <p className="events-workshop-date">
                    <time dateTime={workshop.starts}>{workshop.dateLabel}</time>
                    <span aria-hidden="true"> · </span>{workshop.timeLabel}
                  </p>
                  <h3>{workshop.name}</h3>
                  <p className="events-speakers">With {workshop.speakers}</p>
                  <p>{workshop.summary}</p>
                  <ul className="events-tag-list" aria-label="Workshop topics">
                    {workshop.tags.map((tag) => <li key={tag}>{tag}</li>)}
                  </ul>
                  <a className="events-register" href={workshop.registrationUrl} target="_blank" rel="noopener noreferrer">Register <span aria-hidden="true">↗</span></a>
                </div>
              </article>
            ))}
          </div>
          <p className="events-venue">
            <strong>Venue:</strong> Venture Development Center, 3rd Floor, Wheatley Hall,
            UMass Boston, 100 Morrissey Boulevard, Boston, MA 02125.
            Check the live calendar for any updates.
          </p>
        </section>

        <section className="events-section events-calendar-section" aria-labelledby="events-calendar-title">
          <div className="events-heading">
            <p className="events-section-label">Live calendar</p>
            <h2 id="events-calendar-title">See what's coming up.</h2>
            <p>The calendar below updates as new sessions are announced.</p>
          </div>
          <div className="events-calendar-frame">
            <iframe
              src="https://luma.com/embed/calendar/cal-Hn5j7FxO7A7Ensp/events"
              title="Applied AI in Practice live calendar of upcoming workshops"
              width="100%"
              height="620"
              loading="lazy"
              allowFullScreen
            />
          </div>
          <p className="events-calendar-note">
            If the calendar does not load, use the registration link at the top of this page.
          </p>
        </section>

        <section className="events-section events-faq" aria-labelledby="events-faq-title">
          <div className="events-heading">
            <p className="events-section-label">Common questions</p>
            <h2 id="events-faq-title">Good to know.</h2>
          </div>
          <div className="events-faq-list">
            {questions.map(({ question, answer }) => (
              <article key={question} className="events-faq-item">
                <h3>{question}</h3>
                <p>{answer}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <p>Ajanee Igharo · Applied AI Engineer</p>
        <p>Boston, Massachusetts</p>
        <p><a href="#main-content">Back to top ↑</a></p>
      </footer>
    </>
  );
}
