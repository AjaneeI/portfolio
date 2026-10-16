import type { MetadataRoute } from 'next';
const base = 'https://ajaneeigharo.com';
export default function sitemap(): MetadataRoute.Sitemap { return ['/', '/resume', '/work/agentic-analytics-lab', '/work/agent-systems-evidence-scout', '/work/homeops-agent', '/work/closing-the-loop'].map(path => ({ url: base + path, changeFrequency: 'monthly', priority: path === '/' ? 1 : 0.7 })); }
