/* eslint-disable @next/next/no-html-link-for-pages -- Native anchors avoid vinext's broken Link click interception. */
import { SiteNav } from "./site-nav";

export default function NotFound() {
  return <main><SiteNav label="Not found navigation" /><section className="detail" id="main-content"><p className="section-kicker">404 · Page not found</p><h1>This page is outside the map.</h1><p className="detail-lead">The link may have moved. Return to the portfolio or go directly to the selected work.</p><a className="primary-link" href="/">Return home →</a></section></main>;
}
