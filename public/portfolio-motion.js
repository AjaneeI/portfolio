(() => {
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  let enabled = !preference.matches;
  let observer;
  let raf = 0;
  const running = new Set();
  const seen = new WeakSet();
  const targets = [...document.querySelectorAll('.section-kicker,.work-heading h2,.work-heading > p,.project-number,.project-type,.project h3,.project-name,.project-evidence > div,.project-actions,.approach-intro > *,.principle,.context h2,.context p,.story-grid > *,.contact-label,.contact h2,.contact-actions a')];
  const image = document.querySelector('.hero-image img');
  const heroSection = document.querySelector('.editorial-hero');
  const progress = document.createElement('div');
  progress.className = 'motion-progress';
  progress.setAttribute('aria-hidden','true');
  document.body.append(progress);
  const active = () => enabled && !preference.matches;
  function animate(node, frames, options={}) {
    if (!node || !active() || !node.animate) return;
    const animation = node.animate(frames, {duration:1050, easing:'cubic-bezier(.16,1,.3,1)', fill:'backwards', ...options});
    running.add(animation);
    animation.finished.then(() => running.delete(animation)).catch(() => running.delete(animation));
    return animation;
  }
  function entrance(node, delay=0) {
    if (!node) return;
    node.classList.remove('motion-pending');
    node.dataset.motionState = 'revealing';
    const animation = animate(node,[{opacity:0,transform:'translateY(36px)'},{opacity:1,transform:'translateY(0)'}],{delay});
    if (animation) animation.finished.then(() => { node.dataset.motionState='revealed'; }).catch(() => { node.dataset.motionState='revealed'; });
    else node.dataset.motionState='revealed';
  }
  function hero() {
    entrance(document.querySelector('.hero-eyebrow'),80);
    document.querySelectorAll('.hero-copy h1 > *').forEach((node,i) => {
      node.dataset.motionState='revealing';
      const a=animate(node,[{opacity:0,transform:'translateY(52px)',clipPath:'inset(0 0 95% 0)'},{opacity:1,transform:'translateY(0)',clipPath:'inset(-15% -15% -15% -15%)'}],{duration:1250,delay:180+i*190});
      a?.finished.then(()=>{node.dataset.motionState='revealed';}).catch(()=>{});
    });
    animate(document.querySelector('.hero-accent'),[{transform:'scaleX(0)',transformOrigin:'left'},{transform:'scaleX(1)',transformOrigin:'left'}],{duration:1150,delay:600});
    entrance(document.querySelector('.hero-summary'),650);
    document.querySelectorAll('.hero-actions a').forEach((node,i)=>entrance(node,800+i*130));
    animate(image,[{opacity:.45},{opacity:1}],{duration:1700});
    animate(image,[{scale:'1.10'},{scale:'1'}],{duration:5500,easing:'cubic-bezier(.2,.6,.35,1)'});
    updateScroll();
  }
  function reveal(node) {
    let delay=0;
    if (node.parentElement?.classList.contains('project-evidence')) delay=[...node.parentElement.children].indexOf(node)*120;
    if (node.classList.contains('project-type')) delay=80;
    if (node.matches('.project h3')) delay=140;
    if (node.classList.contains('project-name')) delay=230;
    entrance(node,Math.min(delay,360));
    if (node.matches('.section-kicker')) {
      node.classList.add('motion-rule');
      animate(node,[{clipPath:'inset(0 100% 0 0)'},{clipPath:'inset(0 0 0 0)'}],{duration:1000});
    }
  }
  function observe() {
    observer?.disconnect();
    targets.forEach(node=>node.classList.remove('motion-pending'));
    if (!active() || !('IntersectionObserver' in window)) return;
    observer=new IntersectionObserver(entries=>{
      for(const entry of entries){
        if(!entry.isIntersecting)continue;
        if(!seen.has(entry.target)){reveal(entry.target);seen.add(entry.target);}
        observer.unobserve(entry.target);
      }
    },{threshold:.06,rootMargin:'0px 0px -36px 0px'});
    targets.forEach(node=>{
      if(seen.has(node))return;
      // Hide only below-fold entries. Content above a deep link remains available.
      if(node.getBoundingClientRect().top>innerHeight)node.classList.add('motion-pending');
      observer.observe(node);
    });
  }
  function updateScroll(){
    raf=0;
    if(!active()){
      if(image)image.style.transform='';
      progress.style.transform='scaleX(0)';
      return;
    }
    const length=document.documentElement.scrollHeight-innerHeight;
    progress.style.transform='scaleX('+Math.max(0,Math.min(1,scrollY/Math.max(1,length)))+')';
    if(image&&heroSection){
      const rect=heroSection.getBoundingClientRect();
      const fraction=Math.max(0,Math.min(1,-rect.top/Math.max(1,rect.height)));
      image.style.transform='translateY('+(fraction*26)+'px) scale('+(1+fraction*.025)+')';
    }
  }
  const onScroll=()=>{if(!raf)raf=requestAnimationFrame(updateScroll);};
  addEventListener('scroll',onScroll,{passive:true});
  function cancel(){for(const a of running)a.cancel();running.clear();targets.forEach(node=>node.classList.remove('motion-pending'));}
  function apply(){
    document.body.classList.toggle('motion-on',active());
    cancel();observe();updateScroll();
  }
  const onPreference=()=>{enabled=!preference.matches;apply();};
  preference.addEventListener('change',onPreference);
  addEventListener('portfolio-motion-cleanup',()=>{observer?.disconnect();cancel();cancelAnimationFrame(raf);removeEventListener('scroll',onScroll);preference.removeEventListener('change',onPreference);document.body.classList.remove('motion-on');if(image)image.style.transform='';progress.remove();},{once:true});
  apply();hero();
})();
