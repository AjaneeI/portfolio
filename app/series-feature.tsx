/* eslint-disable @next/next/no-img-element -- Approved local PNG mark; no remote image dependency. */
const sessions = [
  {
    date: "THU · DEC 03",
    time: "3:30–4:45 PM ET",
    title: "GTM Engineering: Discover an Emerging Career",
    speaker: "With Amrutha “Amu” Killada",
    registrationUrl: "https://luma.com/1sts0xgz",
  },
  {
    date: "FRI · DEC 11",
    time: "12:00–1:30 PM ET",
    title: "Becoming AI-First: Context Capture & Starting with the Why",
    speaker: "With Alex Turgeon and Logan Reilly",
    registrationUrl: null,
  },
] as const;

export function SeriesFeature() {
  return (
    <section className="series-showcase" id="series" aria-labelledby="series-title">
      <div className="series-frame">
        <div className="series-identity">
          <img src="/applied-ai-in-practice-ap-monogram.png" alt="" width="128" height="128" loading="lazy" />
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
            <article className="series-event" key={session.date}>
              <div className="series-event-date">
                <span>{session.date}</span>
                <small>{session.time}</small>
              </div>
              <div className="series-event-detail">
                <h4>{session.title}</h4>
                <p>{session.speaker}</p>
                {session.registrationUrl ? (
                  <a href={session.registrationUrl} target="_blank" rel="noopener noreferrer">
                    Register ↗
                  </a>
                ) : (
                  <span className="series-registration-pending">Registration coming soon</span>
                )}
              </div>
            </article>
          ))}
          <a className="series-calendar-link" href="https://luma.com/calendar/cal-Hn5j7FxO7A7Ensp" target="_blank" rel="noopener noreferrer">
            Explore the series <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
