"use client";
import { useEffect } from "react";
export function ResumeMotion() {
 useEffect(() => {
  const root = document.querySelector<HTMLElement>(".resume-design"); if (!root) return;
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  const toggle = root.querySelector<HTMLButtonElement>("[data-rm-toggle]");
  let manuallyReduced = false; let reduced = preference.matches; let frame = 0;
  const animations: Animation[] = [];
  function sync() { reduced = manuallyReduced || preference.matches; root!.dataset.reduced = String(reduced); toggle?.setAttribute("aria-pressed", String(reduced)); if(toggle) toggle.textContent = reduced ? "Motion reduced" : "Reduce motion"; if(reduced) animations.forEach(a=>a.finish()); }
  function change() { manuallyReduced = !reduced; sync(); }
  function navigate(event: Event) { const a=event.currentTarget as HTMLAnchorElement; const target=document.getElementById(a.hash.slice(1)); if(!target)return;event.preventDefault();target.scrollIntoView({behavior:reduced ? "instant" : "smooth",block:"start"});history.replaceState(null,"",a.hash); }
  const links=[...root.querySelectorAll<HTMLAnchorElement>("[data-rm-link]")];links.forEach(a=>a.addEventListener("click",navigate));
  sync(); preference.addEventListener("change", sync); toggle?.addEventListener("click", change);
  if(!reduced) root.querySelectorAll("[data-rm-intro]").forEach((el,i)=>animations.push(el.animate([{opacity:.3,transform:"translateY(22px)"},{opacity:1,transform:"translateY(0)"}],{duration:900,delay:i*100,easing:"cubic-bezier(.22,1,.36,1)"})));
  const observer = new IntersectionObserver(entries=>entries.forEach(entry=>{ if(entry.isIntersecting){if(!reduced) animations.push(entry.target.animate([{opacity:.55,transform:"translateY(22px)"},{opacity:1,transform:"translateY(0)"}],{duration:850,easing:"cubic-bezier(.22,1,.36,1)"}));observer.unobserve(entry.target);} }),{threshold:.08});
  root.querySelectorAll("[data-rm-reveal]").forEach(el=>observer.observe(el));
  const sections = [...root.querySelectorAll<HTMLElement>("[data-rm-section]")];
  function update(){ frame=0;const max=document.documentElement.scrollHeight-innerHeight;root!.style.setProperty("--read-progress",String(max>0?scrollY/max:0));let active=sections[0]?.querySelector("h2")?.id;sections.forEach(section=>{if(section.getBoundingClientRect().top<innerHeight*.38)active=section.querySelector("h2")?.id;}); root!.querySelectorAll<HTMLAnchorElement>("[data-rm-link]").forEach(a=>{if(a.hash===`#${active}`)a.setAttribute("aria-current","location");else a.removeAttribute("aria-current");});const timeline=root!.querySelector<HTMLElement>(".rd-section-experience .rd-content");if(timeline){const r=timeline.getBoundingClientRect();root!.style.setProperty("--timeline-progress",String(Math.max(0,Math.min(1,(innerHeight*.6-r.top)/r.height))));}}
  function schedule(){if(!frame)frame=requestAnimationFrame(update);}window.addEventListener("scroll",schedule,{passive:true});window.addEventListener("resize",schedule);update();
  return ()=>{links.forEach(a=>a.removeEventListener("click",navigate));observer.disconnect();cancelAnimationFrame(frame);animations.forEach(a=>a.cancel());preference.removeEventListener("change",sync);toggle?.removeEventListener("click",change);window.removeEventListener("scroll",schedule);window.removeEventListener("resize",schedule);};
 }, []);
 return null;
}
