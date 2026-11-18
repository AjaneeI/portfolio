import type { Metadata } from "next";
import { SiteNav } from "../site-nav";
import { workshops } from "./workshops";
import "./events.css";

type Workshop = (typeof workshops)[number];
const base = "https://ajaneeigharo.com";
export function workshopMetadata(workshop: Workshop): Metadata {
  const title = `${workshop.name} | Boston AI Workshop`;
  const url = `${base}/events/${workshop.id}`;
  return { title: { absolute: title }, description: workshop.summary,
    alternates: { canonical: url },
    openGraph: { title, description: workshop.summary, url, type: "website", images: ["/og.png"] },
    twitter: { card: "summary_large_image", title, description: workshop.summary, images: ["/og.png"] } };
}

export function WorkshopDetail({ workshop }: { workshop: Workshop }) {
  const url = `${base}/events/${workshop.id}`;
  const gtm = workshop.id === "gtm-engineering";
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "Event", "@id": `${url}#event`, url, name: workshop.name,
      description: workshop.summary, startDate: workshop.starts, endDate: workshop.ends,
      eventStatus: "https://schema.org/EventScheduled", eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      isAccessibleForFree: true,
      image: gtm ? "https://images.lumacdn.com/uploads/jh/184e9803-1e9c-4d43-bb3f-25dd9042286d.png" : "https://images.lumacdn.com/api-uploads/5n/c8cfcc27-379b-4e2e-8473-86717f78c9f2.jpg",
      location: { "@type": "Place", name: "Venture Development Center, UMass Boston", address: { "@type": "PostalAddress", streetAddress: "Wheatley Peters Hall, 3rd Floor, 100 Morrissey Boulevard", addressLocality: "Boston", addressRegion: "MA", postalCode: "02125", addressCountry: "US" } },
      organizer: { "@type": "Person", "@id": `${base}/#person`, name: "Ajanee Igharo", url: `${base}/events` },
      performer: gtm ? [{ "@type": "Person", name: "Amrutha Killada" }] : [{ "@type": "Person", name: "Alex Turgeon" }, { "@type": "Person", name: "Logan Reilly" }],
      offers: { "@type": "Offer", url: workshop.registrationUrl, price: 0, priceCurrency: "USD", availability: "https://schema.org/InStock" }
    },
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: base }, { "@type": "ListItem", position: 2, name: "Applied AI in Practice", item: `${base}/events` }, { "@type": "ListItem", position: 3, name: workshop.name, item: url }] }
  ] };
  return <><SiteNav label="Workshop navigation" current="events" /><main id="main-content" className="events-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    <section className="events-hero"><div className="events-hero-inner">
      <nav className="events-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><a href="/events">Applied AI in Practice</a></nav>
      <p className="events-eyebrow">Free hands-on workshop · Boston · Open to all</p>
      <h1 style={{ fontSize: "clamp(40px,6vw,76px)", lineHeight: 1.08 }}>{workshop.name}</h1>
      <p className="events-deck">With {workshop.speakers}</p>
      <p className="events-motto"><time dateTime={workshop.starts}>{workshop.dateLabel}</time> · {workshop.timeLabel}</p>
      <p className="events-intro">{workshop.summary}</p>
      <a className="events-primary-cta" href={workshop.registrationUrl} target="_blank" rel="noopener noreferrer">Register for this workshop <span aria-hidden="true">↗</span></a>
    </div></section>
    <section className="events-section"><div className="events-heading"><p className="events-section-label">Plan your visit</p><h2>What to expect.</h2></div>
      <dl className="events-detail-facts">
        <div><dt>Who can attend?</dt><dd>Students, professionals, and community members from all backgrounds. No coding experience is required.</dd></div>
        <div><dt>Where is it?</dt><dd>Venture Development Center, Wheatley Peters Hall, 3rd Floor, UMass Boston, 100 Morrissey Boulevard, Boston, MA 02125. <a className="events-details-link" href="https://vdc.umb.edu/visit/">Venue directions</a></dd></div>
        <div><dt>What does it cost?</dt><dd>Registration is free. Reserve your place through the workshop’s Luma page, which carries current availability and updates.</dd></div>
      </dl>
      <div className="events-faq-list">
        <article className="events-faq-item"><h3>What will we work on?</h3><p>{gtm ? "Step into the role of a startup’s first go-to-market hire: identify potential customers, develop a strategy, and use AI tools to build customer acquisition workflows." : "Practice capturing the reasoning behind a recurring workflow. The session includes a live demonstration from audience input to a draft specification, followed by writing an AI skill for a task you repeat."}</p></article>
        <article className="events-faq-item"><h3>How should I prepare?</h3><p>{gtm ? "No prior technical experience is required. Check the Luma event page for any preparation updates before attending." : "Bring a charged laptop and one task you repeat each week in a class, job, or student organization."}</p></article>
        <article className="events-faq-item"><h3>Who is leading the session?</h3><p>{gtm ? "Amrutha “Amu” Killada is a go-to-market leader and educator who teaches practical GTM engineering and AI-powered growth workflows." : "Alex Turgeon and Logan Reilly of Valere will lead the session on context capture, workflow design, and human judgment."}</p></article>
        <article className="events-faq-item"><h3>Who organizes the series?</h3><p>Applied AI in Practice is a student-led workshop and speaker series founded and led by Ajanee Igharo at UMass Boston. <a href="/events">See the series calendar and other workshops.</a></p></article>
      </div>
      <p className="events-calendar-note">Event details checked against the organizer’s Luma listing on November 18, 2026. Use Luma for registration and subsequent updates.</p>
    </section>
  </main><footer className="site-footer"><p>Ajanee Igharo · Applied AI Engineer</p><a href="/events">All workshops</a><a href="/#work">Selected work</a></footer></>;
}
