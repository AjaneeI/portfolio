"use client";

import { useEffect } from "react";

export function PortfolioMotion() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/portfolio-motion.js";
    script.async = true;
    const browserScript = document.createElement("script");
    browserScript.src = "/project-browser.js";
    browserScript.async = true;
    const artworkScript = document.createElement("script");
    artworkScript.src = "/artwork-reveal.js?v=1";
    artworkScript.async = true;
    document.body.append(script, browserScript, artworkScript);
    return () => {
      window.dispatchEvent(new Event("portfolio-motion-cleanup"));
      window.dispatchEvent(new Event("project-browser-cleanup"));
      window.dispatchEvent(new Event("artwork-reveal-cleanup"));
      script.remove();
      browserScript.remove();
      artworkScript.remove();
    };
  }, []);
  return null;
}
