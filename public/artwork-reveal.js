(() => {
  const root = document.querySelector('.work-browser');
  if (!root || root.dataset.artworkReady) return;
  root.dataset.artworkReady = 'true';
  const controller = new AbortController();
  const { signal } = controller;
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const speed = root.querySelector('#art-connection');
  const replay = root.querySelector('[data-art-replay]');
  const reducedControl = root.querySelector('#art-reduced-motion');
  const announcement = root.querySelector('.art-live-status');
  const states = [...root.querySelectorAll('[data-artwork]')].map(frame => ({
    frame, img: frame.querySelector('.art-image'), asset: null,
    ticket: 0, timer: 0, shown: false, started: false, retries: 0,
  }));
  let active = null;

  function announce(text) { if (announcement) announcement.textContent = text; }
  function applyPreference() {
    root.dataset.artReduced = String(preference.matches || Boolean(reducedControl?.checked));
  }
  applyPreference();
  preference.addEventListener('change', applyPreference, { signal });
  reducedControl?.addEventListener('change', applyPreference, { signal });

  function decodedAsset(state) {
    if (state.asset) return state.asset;
    const { img } = state;
    state.asset = new Promise((resolve, reject) => {
      let settled = false;
      const clean = () => {
        img.removeEventListener('load', loaded);
        img.removeEventListener('error', failed);
      };
      function failed() {
        if (settled) return;
        settled = true; clean(); reject(new Error('Artwork could not be loaded'));
      }
      function loaded() {
        if (settled) return;
        if (!img.naturalWidth) { failed(); return; }
        settled = true; clean();
        // Wait for pixels to be decoded before revealing, including cache hits.
        const decoded = typeof img.decode === 'function' ? img.decode() : Promise.resolve();
        decoded.then(resolve, () => img.naturalWidth ? resolve() : reject(new Error('Artwork could not be decoded')));
      }
      img.addEventListener('load', loaded, { signal });
      img.addEventListener('error', failed, { signal });
      img.loading = 'eager';
      img.fetchPriority = state === active ? 'high' : 'low';
      if (img.complete) queueMicrotask(img.naturalWidth ? loaded : failed);
    });
    return state.asset;
  }

  function show(state, force = false) {
    if (!state || (state.started && !force)) return;
    state.started = true;
    const ticket = ++state.ticket;
    clearTimeout(state.timer);
    const started = performance.now();
    // The hold exists only in this explicitly labelled, private preview control.
    // Without the control, a real load has no cosmetic minimum waiting time.
    const demoDuration = speed?.value === 'slow' ? 2000 : 0;
    delete state.frame.dataset.artElapsedMs;
    state.frame.dataset.artMode = speed?.value || 'natural';
    state.frame.dataset.artControlConnected = String(Boolean(speed?.isConnected));
    state.frame.dataset.artTicket = String(ticket);
    state.frame.dataset.artState = 'loading';
    state.frame.setAttribute('aria-busy', 'true');
    state.frame.querySelector('.art-error').hidden = true;
    announce('Loading concept visual');
    decodedAsset(state).then(() => {
      if (signal.aborted || ticket !== state.ticket) return;
      const reveal = () => {
        if (signal.aborted || ticket !== state.ticket) return;
        state.frame.dataset.artState = 'ready';
        state.frame.dataset.artElapsedMs = String(Math.round(performance.now() - started));
        state.frame.setAttribute('aria-busy', 'false');
        state.shown = true;
        if (state === active) announce('Concept visual ready');
      };
      const remaining = Math.max(0, demoDuration - (performance.now() - started));
      if (remaining) state.timer = setTimeout(reveal, remaining);
      else requestAnimationFrame(() => requestAnimationFrame(reveal));
    }).catch(() => {
      if (signal.aborted || ticket !== state.ticket) return;
      state.frame.dataset.artState = 'error';
      state.frame.setAttribute('aria-busy', 'false');
      state.frame.querySelector('.art-error').hidden = false;
      if (state === active) announce('The concept visual could not load. You can try again.');
    });
  }

  function sync() {
    const next = states.find(state => !state.frame.closest('[role=tabpanel]').hidden) || null;
    if (next === active) return;
    active = next;
    if (replay) replay.disabled = !active;
    if (active) {
      const rect = active.frame.getBoundingClientRect();
      if (rect.top < innerHeight && rect.bottom > 0) show(active);
    }
    else announce('');
  }
  const observer = new MutationObserver(sync);
  root.querySelectorAll('[role=tabpanel]').forEach(panel => observer.observe(panel, { attributes: true, attributeFilter: ['hidden'] }));
  const viewportObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
      const state = states.find(item => item.frame === entry.target);
      entry.target.dataset.artInView = String(entry.isIntersecting);
      if (entry.isIntersecting && state === active) show(state);
    }
  }, { threshold: .06 });
  states.forEach(state => viewportObserver.observe(state.frame));
  sync();
  replay?.addEventListener('click', () => {
    // Preview-only: keep the visual in view when replaying its short sequence.
    active?.frame.scrollIntoView({ block: 'center', behavior: 'instant' });
    show(active, true);
  }, { signal });
  speed?.addEventListener('change', () => show(active, true), { signal });

  // A tab hover or keyboard focus can warm the small responsive asset early.
  function warm(event) {
    const tab = event.target.closest('[role=tab]');
    if (!tab) return;
    const state = states.find(item => item.frame.closest('[role=tabpanel]').id === tab.getAttribute('aria-controls'));
    if (state) decodedAsset(state).catch(() => {});
  }
  root.addEventListener('pointerover', warm, { signal });
  root.addEventListener('focusin', warm, { signal });
  root.addEventListener('click', event => {
    const retry = event.target.closest('[data-art-retry]');
    if (!retry) return;
    const state = states.find(item => item.frame.contains(retry));
    if (!state) return;
    state.asset = null;
    const suffix = '?retry=' + (++state.retries);
    state.img.srcset = state.img.srcset.replace(/\.webp(?:\?retry=\d+)?/g, '.webp' + suffix);
    state.img.src = state.img.src.replace(/\.webp(?:\?retry=\d+)?$/, '.webp' + suffix);
    show(state, true);
  }, { signal });

  addEventListener('artwork-reveal-cleanup', () => {
    controller.abort(); observer.disconnect(); viewportObserver.disconnect();
    states.forEach(state => { ++state.ticket; clearTimeout(state.timer); });
    delete root.dataset.artworkReady;
  }, { once: true });
})();
