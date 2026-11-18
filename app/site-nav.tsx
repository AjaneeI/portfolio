import { ArrowUpRight } from "./arrow-up-right";
/* eslint-disable @next/next/no-html-link-for-pages -- Native anchors avoid vinext's broken Link click interception. */

type SiteNavProps = { label: string; current?: "resume" | "events" };
const links = [["Work", "/#work"], ["Series", "/events"], ["About", "/#about"], ["Resume", "/resume"]] as const;

export function SiteNav({ label, current }: SiteNavProps) {
  return <header className="site-header">
    <a className="skip-link" href="#main-content">Skip to content</a>
    <nav className="nav" aria-label={label}>
      <a className="wordmark" href="/" aria-label="Ajanee Igharo home">Ajanee Igharo</a>
      <div className="desktop-nav">{links.map(([name, href]) => <a key={name} aria-current={((name === "Resume" && current === "resume") || (name === "Series" && current === "events")) ? "page" : undefined} href={href}>{name}</a>)}</div>
      <a className="nav-contact" href="mailto:ajaneeigharo@gmail.com">Get in Touch <ArrowUpRight /></a>
      <details className="mobile-menu"><summary>Menu</summary><div>{links.map(([name, href]) => <a key={name} aria-current={((name === "Resume" && current === "resume") || (name === "Series" && current === "events")) ? "page" : undefined} href={href}>{name}</a>)}<a href="https://github.com/AjaneeI">GitHub <ArrowUpRight /></a></div></details>
    </nav>
  </header>;
}
