(() => {
 const root=document.querySelector('.work-browser');
 if(!root || root.dataset.browserReady)return;
 root.dataset.browserReady="true";
 const controller=new AbortController();
 const signal=controller.signal;
 const tabs=[...root.querySelectorAll('[role=tab]')];
 const panels=[...root.querySelectorAll('[role=tabpanel]')];
 const counter=root.querySelector('.work-counter');
 const preference=matchMedia('(prefers-reduced-motion: reduce)');
 let current=0;
 let animation;
 function select(index,focus=false){
  current=(index+tabs.length)%tabs.length;
  animation?.cancel();
  tabs.forEach((tab,i)=>{tab.setAttribute('aria-selected',String(i===current));tab.tabIndex=i===current?0:-1;});
  panels.forEach((panel,i)=>{panel.hidden=i!==current;});
  counter.textContent=String(current+1).padStart(2,'0')+' / '+String(tabs.length).padStart(2,'0');
  if(document.body.classList.contains('motion-on')&&!preference.matches){
   animation=panels[current].animate([{opacity:.25,transform:'translateY(16px)'},{opacity:1,transform:'translateY(0)'}],{duration:650,easing:'cubic-bezier(.16,1,.3,1)'});
  }
  if(focus)tabs[current].focus({preventScroll:true});
  if(matchMedia('(max-width:900px)').matches){
   const list=root.querySelector('.work-tabs');
   list.scrollTo({left:Math.max(0,tabs[current].offsetLeft-list.offsetLeft-8),behavior:preference.matches?'instant':'smooth'});
  }
 }
 tabs.forEach((tab,i)=>{
  tab.addEventListener('click',()=>select(i),{signal});
  tab.addEventListener('keydown',event=>{
   const keys={ArrowDown:current+1,ArrowRight:current+1,ArrowUp:current-1,ArrowLeft:current-1,Home:0,End:tabs.length-1};
   if(event.key in keys){event.preventDefault();select(keys[event.key],true);}
  },{signal});
 });
 root.querySelector('[data-project-previous]').addEventListener('click',()=>select(current-1),{signal});
 root.querySelector('[data-project-next]').addEventListener('click',()=>select(current+1),{signal});
 preference.addEventListener('change',()=>animation?.cancel(),{signal});
 const orientation=matchMedia('(max-width:900px)');
 function orient(){root.querySelector('[role=tablist]').setAttribute('aria-orientation',orientation.matches?'horizontal':'vertical');}
 orientation.addEventListener('change',orient,{signal});orient();
 addEventListener('project-browser-cleanup',()=>{animation?.cancel();controller.abort();delete root.dataset.browserReady;},{once:true});
})();
