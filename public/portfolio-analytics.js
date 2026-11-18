/* Google tag for the public portfolio only. No advertising features or custom PII. */
(() => {
  "use strict";
  const measurementId = "G-59B4CDEFMB";
  if (!["ajaneeigharo.com", "www.ajaneeigharo.com"].includes(location.hostname)) return;
  if (navigator.globalPrivacyControl || window.__portfolioAnalyticsLoaded) return;
  window.__portfolioAnalyticsLoaded = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  const gtag = window.gtag;
  gtag("js", new Date());
  let referrer = "";
  try { referrer = new URL(document.referrer).origin; } catch (_) { /* No referrer. */ }
  gtag("config", measurementId, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    page_location: location.origin + location.pathname,
    page_referrer: referrer,
  });
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://www.googletagmanager.com/gtag/js?id=" + measurementId;
  document.head.appendChild(script);

  const workshops = {
    "/1sts0xgz": "gtm-engineering",
    "/gzrgw7b0": "becoming-ai-first",
  };
  document.addEventListener("click", (event) => {
    const anchor = event.target instanceof Element ? event.target.closest("a[href]") : null;
    if (!anchor) return;
    let url;
    try { url = new URL(anchor.href, location.origin); } catch (_) { return; }
    let name;
    const parameters = { send_to: measurementId, transport_type: "beacon" };
    if (url.protocol === "mailto:") {
      name = "contact_click";
      parameters.destination_category = "email";
    } else if (["luma.com", "lu.ma"].includes(url.hostname)) {
      const slug = workshops[url.pathname];
      name = slug ? "workshop_registration_click" : "calendar_click";
      parameters.destination_category = slug ? "workshop_registration" : "series_calendar";
      if (slug) parameters.workshop_slug = slug;
    } else if (url.origin === location.origin && url.pathname === "/Ajanee_Igharo_Applied_AI_Engineer_Resume.pdf") {
      name = "resume_download";
      parameters.destination_category = "resume_pdf";
    }
    if (name) gtag("event", name, parameters);
  }, { capture: true });
})();
