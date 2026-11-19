import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
const source = readFileSync(new URL('../public/portfolio-analytics.js', import.meta.url), 'utf8');
function setup({ hostname = 'ajaneeigharo.com', privateSignal = false, search = '?private=example' } = {}) {
  const listeners = {}, scripts = [], window = {};
  class Element { constructor(href) { this.href = href; } closest() { return this; } }
  const document = { referrer: 'https://chatgpt.com/?sensitive=example', head: { appendChild: s => scripts.push(s) }, createElement: () => ({}), addEventListener: (name, callback) => listeners[name] = callback };
  const context = { window, document, location: { hostname, origin: `https://${hostname}`, pathname: '/events', search }, navigator: { globalPrivacyControl: privateSignal }, URL, URLSearchParams, Element, Date };
  vm.runInNewContext(source, context);
  return { scripts, window, click: href => listeners.click?.({ target: new Element(href) }), again: () => vm.runInNewContext(source, context) };
}
test('tracks intended actions without custom email, URL or query payloads', () => {
  const s = setup();
  for (const url of ['https://luma.com/calendar/cal-Hn5j7FxO7A7Ensp','https://luma.com/1sts0xgz','https://luma.com/gzrgw7b0','/Ajanee_Igharo_Applied_AI_Engineer_Resume.pdf?v=private','mailto:someone@example.com']) s.click(url);
  s.click('/resume');
  const rows = Array.from(s.window.dataLayer, x => Array.from(x));
  assert.deepEqual(rows.filter(x => x[0] === 'event').map(x => x[1]), ['calendar_click','workshop_registration_click','workshop_registration_click','resume_download','contact_click']);
  assert.equal(rows[1][2].allow_google_signals, false);
  assert.equal(rows[1][2].page_location, 'https://ajaneeigharo.com/events');
  assert.equal(rows[1][2].page_referrer, 'https://chatgpt.com');
  assert.doesNotMatch(JSON.stringify(rows), /sensitive|private|someone@example|mailto:/);
  assert.equal(s.scripts.length, 1);
  s.again(); assert.equal(s.scripts.length, 1);
});
test('private previews and global privacy control do not load Analytics', () => {
  for (const options of [{hostname:'localhost'}, {hostname:'private.chatgpt.site'}, {privateSignal:true}]) {
    const s = setup(options); assert.equal(s.scripts.length, 0); assert.equal(s.window.dataLayer, undefined);
  }
});

test('approved campaign tags survive query stripping without transmitting arbitrary values', () => {
  const s=setup({search:'?utm_source=linkedin&utm_medium=social&utm_campaign=aal_walkthrough&email=someone@example.com&utm_content=private'});
  const config=Array.from(s.window.dataLayer[1])[2];
  assert.equal(config.campaign_source,'linkedin');
  assert.equal(config.campaign_medium,'social');
  assert.equal(config.campaign_name,'aal_walkthrough');
  assert.equal(config.page_location,'https://ajaneeigharo.com/events');
  assert.doesNotMatch(JSON.stringify(config),/someone|private|utm_|email/);
});
test('unapproved or incomplete campaign combinations do not override attribution', () => {
  for(const search of ['?utm_source=someone@example.com&utm_medium=social&utm_campaign=aal_walkthrough','?utm_source=linkedin&utm_medium=social&utm_campaign=private','?utm_source=linkedin','?utm_source=email&utm_medium=social&utm_campaign=aal_walkthrough']) {
    const s=setup({search});
    const config=Array.from(s.window.dataLayer[1])[2];
    assert.equal(config.campaign_source,undefined);
    assert.equal(config.campaign_medium,undefined);
    assert.equal(config.campaign_name,undefined);
    assert.doesNotMatch(JSON.stringify(config),/someone|private|utm_/);
  }
});
