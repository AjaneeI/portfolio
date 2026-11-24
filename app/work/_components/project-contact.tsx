/* eslint-disable @next/next/no-html-link-for-pages -- Match existing native portfolio navigation. */
import styles from "./project-contact.module.css";

export function ProjectContact() {
  return (
    <aside className={styles.contact} aria-label="Hiring and resume">
      <a data-contact-purpose="hiring" href="mailto:ajaneeigharo@gmail.com?subject=Boston%20hiring%20opportunity">Discuss an applied AI role</a>
      <a href="/resume">Review my resume</a>
    </aside>
  );
}
