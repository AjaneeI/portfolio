"use client";

/* eslint-disable @next/next/no-img-element -- These are actual local evidence captures, served without image transformation. */
import { useState } from "react";
import { ArrowUpRight } from "../../arrow-up-right";
import styles from "./portfolio-case-study.module.css";

export type EvidenceCapture = {
  label: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
};

type EvidenceCapturesProps = {
  id: string;
  label: string;
  captures: readonly EvidenceCapture[];
};

export function EvidenceCaptures({ id, label, captures }: EvidenceCapturesProps) {
  const [selected, setSelected] = useState(0);
  const capture = captures[selected] ?? captures[0];
  const panelId = `${id}-image`;

  if (!capture) return null;

  return (
    <div className={styles.captureGallery} id={id} role="group" aria-label={label}>
      <p className={styles.captureKicker}>Actual local captures</p>
      <div className={styles.captureControls} role="group" aria-label="Choose a capture">
        {captures.map((item, index) => (
          <button
            className={styles.captureButton}
            key={item.src}
            type="button"
            aria-pressed={index === selected}
            aria-controls={panelId}
            onClick={() => setSelected(index)}
          >
            <span className={styles.captureNumber} aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            {item.label}
          </button>
        ))}
      </div>
      <figure className={styles.captureFigure} id={panelId}>
        <div className={styles.captureFrame}>
          <img
            className={styles.captureImage}
            src={capture.src}
            alt={capture.alt}
            width={capture.width}
            height={capture.height}
            loading="lazy"
            decoding="async"
          />
        </div>
        <figcaption className={styles.captureCaption}>
          <div aria-live="polite" aria-atomic="true">
            <strong>{capture.label}</strong>
            <span>{capture.caption}</span>
          </div>
          <a href={capture.src} target="_blank" rel="noreferrer" className={styles.textLink}>
            Open full-size capture <ArrowUpRight />
            <span className={styles.srOnly}> (opens in a new tab)</span>
          </a>
        </figcaption>
      </figure>
    </div>
  );
}
