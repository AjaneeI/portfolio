/* eslint-disable @next/next/no-html-link-for-pages -- Native anchors avoid vinext's broken Link click interception. */

type SiteNavProps = { label: string; current?: "resume" };
const links = [["Work", "/#work"], ["About", "/#about"], ["Resume", "/resume"]] as const;

export function SiteNav({ label, current }: SiteNavProps) {
  return <header className="site-header">
    <a className="skip-link" href="#main-content">Skip to content</a>
    <nav className="nav" aria-label={label}>
      <a className="wordmark" href="/" aria-label="Ajanee Igharo home">Ajanee Igharo</a>
      <div className="desktop-nav">{links.map(([name, href]) => <a key={name} aria-current={name === "Resume" && current === "resume" ? "page" : undefined} href={href}>{name}</a>)}</div>
      <a className="nav-contact" href="mailto:ajaneeigharo@gmail.com">Get in Touch <span aria-hidden="true">↗</span></a>
      <details className="mobile-menu"><summary>Menu</summary><div>{links.map(([name, href]) => <a key={name} aria-current={name === "Resume" && current === "resume" ? "page" : undefined} href={href}>{name}</a>)}<a href="https://github.com/AjaneeI">GitHub <span aria-hidden="true">↗</span></a></div></details>
    </nav>
  </header>;
}
