import type { Metadata } from "next";
import { SiteNav } from "../site-nav";
import "./events.css";
import { workshops } from "./workshops";

const siteUrl = "https://ajaneeigharo.com";
const pageUrl = siteUrl + "/events";
const calendarUrl = "https://luma.com/applied-ai-in-practice";

const description =
  "Explore Applied AI in Practice, a student-led series of hands-on AI workshops in Boston, founded and led by Ajanee Igharo at UMass Boston.";

export const metadata: Metadata = {
  title: { absolute: "Applied AI Workshops in Boston | Applied AI in Practice" },
  description,
  alternates: { canonical: "/events" },
  openGraph: {
    title: "Applied AI Workshops in Boston | Applied AI in Practice",
    description,
    url: pageUrl,
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Ajanee Igharo portfolio preview" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Applied AI Workshops in Boston | Applied AI in Practice",
    description,
    images: ["/og.png"],
  },
};



// A calendar landing page is not a Google single-event detail page. Use
// CollectionPage + ItemList rather than claiming Event rich-result eligibility.
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": pageUrl + "#webpage",
      url: pageUrl,
      name: "Applied AI Workshops in Boston | Applied AI in Practice",
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
        url: pageUrl + "/" + workshop.id,
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
      "The series is open to all. Workshops welcome students and participants from business, technology, and other disciplines. Each event description explains the specific activities and preparation.",
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
          <noscript><style>{`.events-reveal { opacity:1!important; transform:none!important; filter:none!important; }`}</style></noscript>
          <div className="events-hero-inner">
            <div className="events-reveal"><p className="events-eyebrow">Boston&apos;s next generation of AI builders</p></div>
            <div className="events-reveal"><h1 id="events-title">Applied AI <em>in Practice.</em></h1></div>
            <div className="events-reveal"><p className="events-deck">The future of AI is being built here.</p>
            <p className="events-motto">Learn. Build. Connect.</p></div>
            <div className="events-reveal"><p className="events-intro">
              Open to all. Hands-on AI workshops in Boston bringing students, emerging builders,
              and industry practitioners together to explore real-world applications
              of artificial intelligence, workflows, and careers.
            </p>
            <p className="events-byline">Founded and led by Ajanee Igharo at UMass Boston.</p></div>
            <div className="events-reveal"><a className="events-primary-cta" href={calendarUrl} target="_blank" rel="noopener noreferrer">
              Explore the series calendar <span aria-hidden="true">↗</span>
            </a></div>
          </div>
        </section>

        <aside className="events-section events-press" aria-labelledby="events-press-title">
          <p className="events-section-label">Featured in UMass Boston News</p>
          <h2 id="events-press-title"><a href="https://www.umb.edu/news/recent-news/mba-student-led-ai-workshop-and-speaker-series-coming-to-umass-boston/" target="_blank" rel="noopener noreferrer" aria-label="MBA Student-Led AI Workshop and Speaker Series Coming to UMass Boston (opens in a new tab)">MBA Student-Led AI Workshop and Speaker Series Coming to UMass Boston</a></h2>
          <p className="events-press-meta">UMass Boston News · <time dateTime="2026-11-23">November 23, 2026</time></p>
          <p>UMass Boston featured the student-led workshop and speaker series founded by Ajanee Igharo.</p>
        </aside>

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
                  <h3><a href={`/events/${workshop.id}`}>{workshop.name}</a></h3>
                  <p className="events-speakers">With {workshop.speakers}</p>
                  <p>{workshop.summary}</p>
                  <ul className="events-tag-list" aria-label="Workshop topics">
                    {workshop.tags.map((tag) => <li key={tag}>{tag}</li>)}
                  </ul>
                  <a className="events-details-link" href={`/events/${workshop.id}`}>Workshop details</a>{" "}
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
            <h2 id="events-calendar-title">See what&apos;s coming up.</h2>
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

