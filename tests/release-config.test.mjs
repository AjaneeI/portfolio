import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
test('standard tests include analytics and release checks', () => {
 const pkg=JSON.parse(readFileSync(new URL('../package.json', import.meta.url)));
 assert.match(pkg.scripts.test,/tests\/\*\.test\.mjs/);
});
test('React server-component transport uses the patched release line', () => {
 const lock=JSON.parse(readFileSync(new URL('../package-lock.json', import.meta.url)));
 const [major,minor,patch]=lock.packages['node_modules/react-server-dom-webpack'].version.split('.').map(Number);
 assert.ok(major===19 && ((minor===2 && patch>=9)||minor>2));
});


test('small project labels meet normal-text contrast on the cream surface', () => {
 const css=readFileSync(new URL('../app/project-browser.css',import.meta.url),'utf8');
 const color=css.match(/\.work-tab-copy em\s*\{[^}]*color:(#[0-9a-f]{6})/)[1];
 const luminance=hex=>{
  const rgb=hex.slice(1).match(/../g).map(x=>parseInt(x,16)/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4);
  return .2126*rgb[0]+.7152*rgb[1]+.0722*rgb[2];
 };
 assert.ok((luminance('#f6f2e9')+.05)/(luminance(color)+.05)>=4.5);
});

test('all resolved fflate copies exclude the affected 0.7.0–0.7.4 range', () => {
 const lock=JSON.parse(readFileSync(new URL('../package-lock.json',import.meta.url)));
 for(const [path,pkg] of Object.entries(lock.packages)) {
  if(!path.endsWith('node_modules/fflate')) continue;
  const [major,minor,patch]=pkg.version.split('.').map(Number);
  assert.ok(!(major===0 && minor===7 && patch<5),`${path}: ${pkg.version}`);
 }
});
