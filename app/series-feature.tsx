/* eslint-disable @next/next/no-img-element -- Approved local PNG mark; no remote image dependency. */
const sessions = [
  {
    date: "Thu · Dec 3, 2026",
    dateTime: "2026-12-03",
    time: "3:30–4:45 PM ET",
    title: "GTM Engineering: Discover an emerging career at the intersection of AI, business, marketing, and technology.",
    speaker: "With Amrutha “Amu” Killada",
    registrationUrl: "https://luma.com/1sts0xgz",
  },
  {
    date: "Fri · Dec 11, 2026",
    dateTime: "2026-12-11",
    time: "12–1:30 PM ET",
    title: "Becoming AI-First: Context Capture & Starting with the Why",
    speaker: "With Alex Turgeon and Logan Reilly",
    // No public registration URL is approved. Keep this session non-interactive until confirmed.
    registrationUrl: null,
  },
] as const;

export function SeriesFeature() {
  return (
    <section className="series-showcase" id="series" aria-labelledby="series-title">
      <div className="series-frame">
        <div className="series-identity">
          <img src="/applied-ai-in-practice-ap-monogram.png" alt="" width="480" height="480" loading="lazy" />
        </div>
        <div className="series-description">
          <p className="series-kicker">Upcoming · Founder-led series</p>
          <h2 id="series-title">Applied AI in Practice</h2>
          <p className="series-tagline">Hands-on learning. Industry connections. Practical AI.</p>
          <p className="series-credit">Founded &amp; led by Ajanee Igharo</p>
        </div>
        <div className="series-events">
          <h3 className="series-events-title">Upcoming workshops</h3>
          {sessions.map((session) => (
            <article className="series-event" key={session.dateTime} aria-labelledby={`session-${session.dateTime}`}>
              <div className="series-event-date">
                <time dateTime={session.dateTime}>{session.date}</time>
                <small>{session.time}</small>
              </div>
              <div className="series-event-detail">
                <h4 id={`session-${session.dateTime}`}>{session.title}</h4>
                <p>{session.speaker}</p>
                {session.registrationUrl ? (
                  <a href={session.registrationUrl} target="_blank" rel="noopener noreferrer" aria-label="Register for the December 3 workshop (opens in a new tab)">
                    Register <svg aria-hidden="true" width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 13 13 3M3 3h10v10" /></svg>
                  </a>
                ) : (
                  <span className="series-registration-pending">Registration coming soon</span>
                )}
              </div>
            </article>
          ))}
          <a className="series-calendar-link" href="https://luma.com/calendar/cal-Hn5j7FxO7A7Ensp" target="_blank" rel="noopener noreferrer">
            Explore the series <svg aria-hidden="true" width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 13 13 3M3 3h10v10" /></svg>
          </a>
        </div>
      </div>
    </section>
  );
}
