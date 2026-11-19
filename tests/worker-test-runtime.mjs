import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { Miniflare, convertV4MiniflareOptions } from 'miniflare';

// Execute the actual production bundle in workerd, including cloudflare: APIs.
export function createWorker(fetchAsset = async () => new Response('Not found', { status: 404 })) {
  const root = resolve('dist/server');
  const paths = ['index.js', ...readdirSync(root, { recursive: true }).filter(path => path.endsWith('.js') && path !== 'index.js')];
  const runtime = new Miniflare(convertV4MiniflareOptions({
    modules: paths.map(path => ({ type: 'ESModule', path: resolve(root, path) })),
    modulesRoot: root,
    compatibilityDate: '2026-11-16',
    compatibilityFlags: ['nodejs_compat'],
    serviceBindings: { ASSETS: fetchAsset },
  }));
  return {
    async fetch(request) {
      const worker = await runtime.getWorker();
      return worker.fetch(request.url, { method: request.method, headers: request.headers, redirect: 'manual' });
    },
    dispose() { return runtime.dispose(); },
  };
}
