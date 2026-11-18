import type { MetadataRoute } from 'next';
const base = 'https://ajaneeigharo.com';
export default function sitemap(): MetadataRoute.Sitemap { return ['/', '/events', '/events/gtm-engineering', '/events/becoming-ai-first', '/resume', '/work/agentic-analytics-lab', '/work/agent-systems-evidence-scout', '/work/homeops-agent', '/work/ai-workflow-reliability-console', '/work/autonomous-repository-maintenance-system', '/work/enterprise-knowledge-validation-mcp', '/work/closing-the-loop'].map(path => ({ url: base + path, changeFrequency: 'monthly', priority: path === '/' ? 1 : 0.7 })); }
