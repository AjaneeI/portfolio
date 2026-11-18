import React from "react";

const events = [
  {
    date: "Thu · Dec 3, 2026",
    time: "3:30–4:45 PM ET",
    title: "GTM Engineering: Discover an emerging career at the intersection of AI, business, marketing, and technology",
    speakers: "With Amrutha “Amu” Killada",
    href: "https://luma.com/1sts0xgz",
  },
  {
    date: "Fri · Dec 11, 2026",
    time: "12:00–1:30 PM ET",
    title: "Becoming AI-First: Context Capture & Starting with the Why",
    speakers: "With Alex Turgeon and Logan Reilly",
    href: "https://luma.com/gzrgw7b0",
  },
] as const;

export function HomeEvents() {
  return (
    <section className="home-events" id="series" aria-labelledby="home-events-title">
      <div className="home-events-brand">
        <div className="home-events-mark" aria-hidden="true"><span>AP</span></div>
        <div>
          <p className="home-events-eyebrow">Upcoming · Founder-led series</p>
          <h2 id="home-events-title">Applied AI in Practice</h2>
          <p className="home-events-tagline">Hands-on learning. Industry connections. Practical AI.</p>
          <p className="home-events-founder">Founded &amp; led by Ajanee Igharo</p>
        </div>
      </div>
      <div className="home-events-list">
        <p className="home-events-eyebrow">Upcoming workshops</p>
        {events.map((event) => (
          <article className="home-events-item" key={event.href}>
            <p className="home-events-meta"><span>{event.date}</span><span>{event.time}</span></p>
            <h3>{event.title}</h3>
            <p className="home-events-speakers">{event.speakers}</p>
            <a className="home-events-register" href={event.href} target="_blank" rel="noopener noreferrer">
              Register <span aria-hidden="true">↗</span>
            </a>
          </article>
        ))}
        <a className="home-events-calendar" href="https://luma.com/calendar/cal-Hn5j7FxO7A7Ensp" target="_blank" rel="noopener noreferrer">
          Explore the series <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
