import { writeFile } from 'node:fs/promises';
import worker from '../dist/server/index.js';

const output = process.argv[2];
if (!output) throw new Error('Usage: node scripts/export-resume.mjs output.html');
const response = await worker.fetch(new Request('https://ajaneeigharo.com/resume', { headers: { accept: 'text/html' } }), { ASSETS: { fetch: async () => new Response('Not found', { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
if (!response.ok) throw new Error(`Resume render failed: ${response.status}`);
await writeFile(output, await response.text());
