import assert from 'node:assert/strict';
import test, { after } from 'node:test';
import { createWorker } from './worker-test-runtime.mjs';
const worker = createWorker();
after(() => worker.dispose());
async function page(path) {
  const res = await response(path);
  assert.equal(res.status, 200, path);
  return res.text();
}
async function response(path) {
  return worker.fetch(new Request(`http://localhost${path}`, { headers: { accept: 'text/html' } }), { ASSETS: { fetch: async () => new Response('Not found', { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
}

// Strip markup without inserting spaces: missing JSX whitespace must stay visible.
function textContent(markup) {
  return markup.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '')
    .replace(/<!--[^]*?-->/g, '').replace(/<[^>]+>/g, '')
    .replace(/&#x27;|&#39;|&apos;/g, "'").replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ').trim();
}

test('homepage H1 keeps literal spaces between its styled fragments', async () => {
  const html = await page('/');
  const h1 = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)?.[1];
  assert.ok(h1);
  assert.equal(textContent(h1), 'systems for real-world workflows.');
});

for (const [path, className, expected] of [
  ['/', 'hero-summary', 'I’m Ajanee Igharo, a Boston-based applied AI engineer. I build and evaluate agent systems for organizational workflows, with a focus on tool use, workflow automation, and human oversight.'],
  ['/work/agentic-analytics-lab', 'detail-lead', 'Agentic Analytics Lab tests whether specialized execution improves a Python analytics agent when the task type is supplied. Its experiments use synthetic data and do not establish performance on free-text task routing.'],
  ['/work/ai-workflow-reliability-console', 'detail-lead', 'AI Workflow Reliability Console is a local Python and SQLite tool for inspecting imported AI workflow evidence. It separates source-reported outcomes from what the available records support. It does not execute workflows or authenticate imported evidence.'],
]) {
  test(`initial HTML exposes the approved identity or evidence boundary: ${path}`, async () => {
    const html = (await page(path)).replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '');
    const lead = html.match(new RegExp(`<p class="${className}">([\\s\\S]*?)<\\/p>`))?.[1];
    assert.ok(lead);
    assert.equal(textContent(lead), expected);
  });
}

test('parsed article author and publisher share the existing canonical Person identity', async () => {
  const paths = ['/work/agentic-analytics-lab', '/work/ai-workflow-reliability-console', '/work/agent-systems-evidence-scout', '/work/homeops-agent', '/work/closing-the-loop', '/work/enterprise-knowledge-validation-mcp', '/work/autonomous-repository-maintenance-system'];
  for (const path of paths) {
    const html = await page(path);
    const nodes = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
      .flatMap(match => { const data = JSON.parse(match[1]); return data['@graph'] ?? [data]; });
    const person = nodes.find(node => node['@type'] === 'Person' && node['@id'] === 'https://ajaneeigharo.com/#person');
    const article = nodes.find(node => node['@type'] === 'TechArticle');
    assert.ok(person, `${path}: established Person`);
    assert.ok(article, `${path}: article`);
    for (const role of ['author', 'publisher']) {
      assert.equal(article[role]['@id'], 'https://ajaneeigharo.com/#person', `${path}: ${role}`);
      assert.equal(article[role]['@id'], person['@id']);
    }
  }
});
test('homepage has the new identity, selected work, and functional routes', async () => {
  const html = await page('/');
  for (const expected of ['Applied AI Engineer', 'systems for', 'real-world', 'Agentic Analytics Lab', 'Enterprise Knowledge Validation MCP', 'AI Workflow Reliability Console', 'Autonomous Repository Maintenance System', 'Closing the Loop', 'I care about what happens after the demo', '/resume', '/work/agentic-analytics-lab', '/work/ai-workflow-reliability-console', '/work/autonomous-repository-maintenance-system', 'mailto:ajaneeigharo@gmail.com']) assert.ok(html.includes(expected), expected);
  for (const stale of ['Human-centered AI · Product analytics · Strategy', 'Artifact in development', 'being prepared for review', 'Product Analyst', 'Strategy Analyst']) assert.ok(!html.includes(stale), stale);
  assert.ok(html.includes('Ajanee Igharo | Applied AI Engineer'));
  assert.equal((html.match(/<h1/g) || []).length, 1);
  assert.doesNotMatch(html, /homepage-reference\.png/);
});
test('project and resume routes render with honest status', async () => {
  const agentic = await page('/work/agentic-analytics-lab');
  assert.match(agentic, /oracle_metadata_routed_v0/);
  assert.match(agentic, /does not evaluate natural-language route inference/);
  assert.match(agentic, /Q3 and Q5 failed consistently/);
  assert.match(agentic, /289 tests/);
  assert.doesNotMatch(agentic, /architecture is planned|has not been implemented|remains future work/);
  assert.match(await page('/work/homeops-agent'), /simulated for reproducible testing/);
  assert.match(await page('/work/agent-systems-evidence-scout'), /39 deterministic tests/);
  assert.match(await page('/work/closing-the-loop'), /not production software/);
  assert.match(await page('/resume'), /Expected May 2027/);
});

test('Gateway stays last, credits the team, and discloses fixture and live-verification limits', async () => {
  const html = await page('/');
  const entries = [...html.matchAll(/<article\b(?=[^>]*class="work-panel")[^>]*>([\s\S]*?)<\/article>/g)].map(match => match[1]);
  assert.equal(entries.length, 5);
  assert.doesNotMatch(html, /reliability-studies-title|work-tab-copy">Evidence Scout|work-tab-copy">HomeOps Agent/);
  assert.ok(entries[2].includes('/work/ai-workflow-reliability-console'));
  assert.ok(entries[3].includes('/work/autonomous-repository-maintenance-system'));
  assert.deepEqual(entries.map(entry => entry.match(/<h3>([^<]+)<\/h3>/)[1]), [
    'Agentic Analytics Lab', 'Enterprise Knowledge Validation MCP', 'AI Workflow Reliability Console', 'Autonomous Repository Maintenance System', 'Glasswing Gateway',
  ]);
  const gateway = entries[4];
  assert.match(gateway, /Collaborative Full-Stack \/ Applied AI Engineering/);
  assert.match(gateway, /Team implementation/);
  assert.doesNotMatch(gateway, /What I built|Read case study|live demo/i);
  for (const boundary of ['synthetic identity and model outputs', 'Hosted Supabase behavior and live-model outcomes remain unverified', 'not a production service', 'Later release hardening was AI-assisted', 'Nathan, Andrew, and LeulTe']) {
    assert.ok(gateway.includes(boundary), boundary);
  }
  assert.match(gateway, /href="https:\/\/github.com\/AjaneeI\/glasswing-gateway"/);
  assert.match(gateway, /href="https:\/\/github.com\/AjaneeI\/glasswing-gateway\/blob\/main\/docs\/contributions.md"/);
  assert.ok(html.indexOf('work-browser-footer') > html.indexOf('Glasswing Gateway'));
  assert.match(html, /href="\/work\/closing-the-loop"/);
});

test('project pages publish self-contained article metadata', async () => {
  const projects = [
    {
      path: '/work/agentic-analytics-lab',
      title: 'Agentic Analytics Lab: Analytics Agent Evaluation | Ajanee Igharo',
      description: 'Evaluation-driven analytics-agent lab testing when specialized execution is worth added complexity, with ClickHouse, guardrails, CI, and failure analysis.',
      modified: '2026-11-20',
    },
    {
      path: '/work/agent-systems-evidence-scout',
      title: 'Agent Systems Evidence Scout | Ajanee Igharo',
      description: 'An arXiv research agent with bounded tools, citation checks, regression tests, and documented integration evidence.',
      modified: '2026-11-18',
    },
    {
      path: '/work/homeops-agent',
      modified: '2026-10-28',
      title: 'HomeOps Agent: Human-in-the-Loop Automation | Ajanee Igharo',
      description: 'Human-in-the-loop AI prototype with explicit tool contracts, approval gates, simulated devices, failure handling, and audit logging.',
    },
    {
      path: '/work/closing-the-loop',
      title: 'Closing the Loop: Customer Portal Analytics | Ajanee Igharo',
      description: 'Product analytics case study focused on measuring customer portal journeys, friction, follow-through, workflow outcomes, and responsible AI boundaries.',
      modified: '2026-09-22T17:22:33.065Z',
    },
  ];

  for (const project of projects) {
    const html = await page(project.path);
    const url = `https://ajaneeigharo.com${project.path}`;
    assert.ok(project.description.length >= 100);
    assert.ok(html.includes(`<title>${project.title}</title>`));
    assert.ok(html.includes(`<link rel="canonical" href="${url}"`));
    assert.ok(html.includes(`<meta name="description" content="${project.description}"`));
    assert.ok(html.includes('<meta name="author" content="Ajanee Igharo"'));
    assert.ok(html.includes(`<meta property="og:url" content="${url}"`));
    assert.ok(html.includes(`<meta property="og:title" content="${project.title}"`));
    assert.ok(html.includes(`<meta property="og:description" content="${project.description}"`));
    assert.ok(html.includes(`<meta name="twitter:title" content="${project.title}"`));
    assert.ok(html.includes(`<meta name="twitter:description" content="${project.description}"`));
    assert.ok(html.includes('<meta property="og:locale" content="en_US"'));
    assert.ok(html.includes('<meta property="og:image" content="https://ajaneeigharo.com/og.png"'));
    assert.ok(html.includes('<meta name="twitter:card" content="summary_large_image"'));
    assert.ok(html.includes('<meta name="twitter:site" content="@AjaneeIgharo"'));
    assert.ok(html.includes('<meta name="twitter:image" content="https://ajaneeigharo.com/og.png"'));
    assert.doesNotMatch(html, /article:published_time|datePublished/);
    assert.ok(html.includes('"@type":"TechArticle"'));
    assert.ok(html.includes(`"mainEntityOfPage":{"@type":"WebPage","@id":"${url}"}`));
    assert.ok(html.includes('"name":"Ajanee Igharo"'));
    assert.ok(html.includes('"https://www.linkedin.com/in/ajaneeigharo/"'));
    assert.ok(html.includes('"https://github.com/AjaneeI"'));
    if (project.modified) {
      assert.ok(html.includes(`<meta property="article:modified_time" content="${project.modified}"`));
      assert.ok(html.includes(`"dateModified":"${project.modified}"`));
    } else {
      assert.doesNotMatch(html, /article:modified_time|dateModified/);
    }
  }
});

test('resume is recruiter-scannable and exposes the existing PDF download', async () => {
  const html = await page('/resume');
  const description = 'Ajanee Igharo is an MBA candidate building and evaluating reliable agent systems and implementing applied AI programs for real organizational workflows.';
  assert.ok(html.includes('<title>Applied AI Engineer Resume | Ajanee Igharo</title>'));
  assert.ok(html.includes(`<meta name="description" content="${description}"`));
  assert.ok(html.includes(`<meta property="og:description" content="${description}"`));
  assert.ok(html.includes(`<meta name="twitter:description" content="${description}"`));
  assert.ok(html.includes('<link rel="canonical" href="https://ajaneeigharo.com/resume"'));
  const sectionOrder = [...html.matchAll(/<section[^>]*aria-labelledby="([^"]+)"/g)].map(match => match[1]);
  assert.deepEqual(sectionOrder, ['experience', 'projects', 'education', 'skills', 'publications', 'leadership']);
  for (const id of sectionOrder) {
    assert.ok(html.includes(`href="#${id}"`), `resume section navigation: ${id}`);
    assert.match(html, new RegExp(`<h2 id="${id}">`));
  }
  for (const exactClaim of [
    'AI Programs &amp; Operations Coordinator',
    'Led Summer 2026 AI workshop operations for career advisors',
    'Small Business Development Intern',
    'Financial Consulting &amp; Analytics Intern',
    'Nov 2025',
    'Venture Capital Extern',
    'Gateway: Agentic Commerce Assurance',
    'Analyzed market trends, financial information, and business models',
    'Workflow Systems',
    'Member',
    '3rd Place',
    'Expected May 2027',
    'AI Industry Applications Lab',
  ]) assert.ok(html.includes(exactClaim), exactClaim);
  for (const staleClaim of ['Community Outreach Chair', 'Founder and Member', 'Applied AI Engineer</p>', 'Focused On', 'View full experience', 'Last updated', 'Closing the Loop', 'Agent Systems Evidence Scout', 'second place', 'Excellence in Team Collaboration', 'MBA in Data Analytics', 'Computer Science minor', 'Accelerated Master', 'Dates pending verification', 'Exact dates', 'Agents for Humans Hackathon', 'TypeScript (project-based)', 'Work / Knowledge Systems']) assert.ok(!html.includes(staleClaim), staleClaim);
  assert.match(html, /href="\/Ajanee_Igharo_Applied_AI_Engineer_Resume\.pdf(?:\?[^"]*)?"[^>]*download/);
  assert.match(html, />Download Resume PDF(?:\s|<)/);
  assert.match(html, /href="\/#work"[^>]*>Work<\/a>/);
});

test('resume release preserves authoritative roles, chronology and project boundaries', async () => {
  const html = await page('/resume');
  const experience = html.match(/aria-labelledby="experience"[\s\S]*?<\/section>/)?.[0];
  assert.ok(experience, 'resume experience section exists');
  const entries = [...experience.matchAll(/<article class="resume-entry"[^>]*>([\s\S]*?)<\/article>/g)].map(x => x[1]);
  assert.equal(entries.length, 4);
  assert.deepEqual(entries.map(entry => entry.match(/<h3>(.*?)<\/h3>/)?.[1]), [
    'AI Programs &amp; Operations Coordinator',
    'Small Business Development Intern',
    'Venture Capital Extern',
    'Financial Consulting &amp; Analytics Intern',
  ]);
  assert.deepEqual(entries.map(entry => entry.match(/<time>(.*?)<\/time>/)?.[1]), [
    'Nov 2025 to Nov 2026', 'Oct 2024 to Dec 2024', 'Sep 2024 to Oct 2024', 'Jan 2026 to Mar 2026',
  ]);
  assert.equal((entries[0].match(/<li>/g) || []).length, 3);
  assert.doesNotMatch(html, /30\+ career advisors/);
  assert.match(entries[0], /Rebaz Kamal/);
  assert.match(entries[0], /including Python, OpenRouter, and Google Colab agent exercises/);
  for (const role of ['Project Manager | May 2022 to Mar 2026', 'Board Member | Sep 2021 to Sep 2022', 'Lead Mentor | May 2018 to Apr 2022']) {
    assert.ok(experience.includes(role), role);
  }
  assert.match(html, /Programming &amp; Web/);
  assert.match(html, /Python, SQL, TypeScript, HTML\/CSS, React, Next.js/);
  const projects = html.match(/aria-labelledby="projects"[\s\S]*?<\/section>/)[0];
  const titles = [...projects.matchAll(/<h3><a[^>]*>(.*?)<\/a><\/h3>/g)].map(x => x[1]);
  assert.deepEqual(titles, ['Agentic Analytics Lab', 'AI Workflow Reliability Console (AWRC)', 'Autonomous Repository Maintenance System (ARMS)', 'Gateway: Agentic Commerce Assurance']);
  assert.match(projects, /Team hackathon prototype/);
  assert.match(projects, /separate, unmerged pull request/);
  assert.match(projects, /synthetic data/);
  assert.doesNotMatch(html, /Student Assistant to Professor Wei Ding|Supported applied AI program and faculty operations|Applied AI Programs &amp; Operations Coordinator|Accelerated|TypeScript \(project-based\)|Last updated|:chatgpt-content-reference|filecite|turn\d+(?:search|view)|Dates pending|Exact dates|Agents for Humans/);
});

test('every visible Resume navigation target uses /resume', async () => {
  for (const path of ['/', '/resume', '/work/agentic-analytics-lab', '/work/agent-systems-evidence-scout', '/work/homeops-agent', '/work/closing-the-loop']) {
    const html = await page(path);
    assert.match(html, /href="\/resume"/, path);
    assert.doesNotMatch(html, /next\/link|data-prefetch/, path);
  }
});

test('shared navigation is crawlable and consistent across primary pages', async () => {
  for (const path of ['/', '/resume', '/work/agentic-analytics-lab', '/work/agent-systems-evidence-scout', '/work/homeops-agent', '/work/closing-the-loop']) {
    const html = await page(path);
    for (const href of ['/#work', '/#about', '/resume', 'https://github.com/AjaneeI', 'mailto:ajaneeigharo@gmail.com']) {
      assert.ok(html.includes(`href="${href}"`), `${path}: ${href}`);
    }
  }
});

test('authored pages contain no em dashes', async () => {
  for (const path of ['/', '/resume', '/work/agentic-analytics-lab', '/work/agent-systems-evidence-scout', '/work/homeops-agent', '/work/closing-the-loop']) {
    assert.doesNotMatch(await page(path), /\u2014/, path);
  }
});

test('homepage and crawl files expose production discovery signals', async () => {
  const html = await page('/');
  for (const expected of ['rel="canonical" href="https://ajaneeigharo.com"', 'property="og:image" content="https://ajaneeigharo.com/og.png"', 'rel="manifest" href="/manifest.webmanifest"', '"@type":"WebSite"', '"jobTitle":"Applied AI Engineer"']) assert.ok(html.includes(expected), expected);
  const robots = await response('/robots.txt');
  assert.equal(robots.status, 200);
  assert.match(await robots.text(), /Sitemap: https:\/\/ajaneeigharo\.com\/sitemap\.xml/);
  const sitemap = await response('/sitemap.xml');
  assert.equal(sitemap.status, 200);
  assert.match(await sitemap.text(), /work\/agent-systems-evidence-scout/);
});

test('public responses carry baseline browser security headers', async () => {
  const res = await response('/');
  assert.equal(res.headers.get('x-content-type-options'), 'nosniff');
  assert.equal(res.headers.get('x-frame-options'), 'DENY');
  assert.equal(res.headers.get('referrer-policy'), 'strict-origin-when-cross-origin');
  assert.equal(res.headers.get('permissions-policy'), 'camera=(), microphone=(), geolocation=()');
  assert.equal(res.headers.get('cross-origin-opener-policy'), 'same-origin');
});

test('Closing the Loop has one canonical route and stale route redirects permanently', async () => {
  const html = await page('/work/closing-the-loop');
  assert.match(html, /<link rel="canonical" href="https:\/\/ajaneeigharo\.com\/work\/closing-the-loop"/);
  assert.doesNotMatch(await page('/'), /href="\/work\/mychart-patient-portal"/);
  const stale = await response('/work/mychart-patient-portal');
  assert.equal(stale.status, 308);
  assert.equal(stale.headers.get('location'), 'http://localhost/work/closing-the-loop');
});


test('MCP portfolio entry preserves read-only and synthetic-evidence boundaries', async () => {
  const html = await page('/work/enterprise-knowledge-validation-mcp');
  for (const expected of ['check_procedure_status', 'assess_action_readiness', '106 tests', '36', 'execution_authorized=false', 'synthetic', 'October 16, 2026', 'No live Glean']) assert.ok(html.includes(expected), expected);
  const home = await page('/');
  assert.match(home, /href="\/work\/enterprise-knowledge-validation-mcp"/);
  const tabs = [...home.matchAll(/<button\b(?=[^>]*role="tab")[^>]*>/g)].map(match => match[0]);
  assert.equal(tabs.length, 5);
  assert.equal(tabs.filter(tab => tab.includes('aria-selected="true"')).length, 1);
  assert.equal(tabs.filter(tab => tab.includes('tabindex="0"')).length, 1);
  assert.match(html, /https:\/\/github.com\/AjaneeI\/enterprise-knowledge-validation-mcp/);
});

test('independent series preserves its place, credit, artwork and public calendar', async () => {
  const html = await page('/');
  const series = html.match(/<section class="series-showcase"[\s\S]*?<\/section>/)?.[0];
  assert.ok(series, 'series section exists');
  for (const text of ['Applied AI in Practice', 'Founded &amp; led by Ajanee Igharo', 'Hands-on learning. Industry connections. Practical AI.']) {
    assert.ok(series.includes(text), text);
  }
  assert.ok(html.indexOf('id="series"') > html.indexOf('id="hero-title"'));
  assert.ok(html.indexOf('id="series"') < html.indexOf('id="work"'));
  assert.match(series, /src="\/applied-ai-in-practice-ap-monogram\.png"/);
  assert.doesNotMatch(series, /UMass|University|PEAAII|sponsor|waitlist/i);
  const links = [...series.matchAll(/href="([^"]+)"/g)].map(match => match[1]);
  assert.deepEqual(links, ['https://luma.com/1sts0xgz', 'https://luma.com/gzrgw7b0', '/events']);
});

test('workshops publish the approved programs and link both approved registration pages', async () => {
  const html = await page('/');
  const sessions = [...html.matchAll(/<article class="series-event"[^>]*>([\s\S]*?)<\/article>/g)].map(match => match[1]);
  assert.equal(sessions.length, 2);
  assert.match(sessions[0], /GTM Engineering: Discover an emerging career at the intersection of AI, business, marketing, and technology\./);
  assert.match(sessions[0], /Amrutha “Amu” Killada/);
  assert.match(sessions[0], /datetime="2026-12-03"/i);
  assert.match(sessions[0], /Thu[^<]*Dec 3, 2026/);
  assert.match(sessions[0], /3:30–4:45 PM ET/);
  assert.match(sessions[0], /href="https:\/\/luma\.com\/1sts0xgz"[^>]*target="_blank"[^>]*rel="noopener noreferrer"/);
  assert.match(sessions[1], /Becoming AI-First: Context Capture &amp; Starting with the Why/);
  assert.match(sessions[1], /Alex Turgeon and Logan Reilly/);
  assert.match(sessions[1], /datetime="2026-12-11"/i);
  assert.match(sessions[1], /Fri[^<]*Dec 11, 2026/);
  assert.match(sessions[1], /12–1:30 PM ET/);
  assert.match(sessions[1], /href="https:\/\/luma\.com\/gzrgw7b0"/);
  assert.doesNotMatch(html, /Registration coming soon/);
});


test('public homepage preserves monochrome SVG arrows in hero and shared navigation', async () => {
  const html = await page('/');
  assert.doesNotMatch(html, /\u2197|&#(?:8599|x2197);/i);
  const hero = html.match(/<div class="hero-actions">([\s\S]*?)<\/section>/)?.[1];
  assert.ok(hero);
  assert.equal((hero.match(/<svg\b/g) || []).length, 3);
  assert.equal((hero.match(/stroke="currentColor"/g) || []).length, 3);
  for (const href of ['#work', 'https://github.com/AjaneeI', '/resume']) {
    assert.ok(hero.includes(`href="${href}"`), href);
  }
  const nav = html.match(/<nav[^>]*>([\s\S]*?)<\/nav>/)?.[1];
  assert.ok(nav.includes('href="/events"'));
  assert.match(nav, /<svg[^>]*class="arrow-up-right"/);
});

 test('events page publishes workshops, discovery metadata, and registration', async () => {
 const html = await page('/events');
 assert.equal((html.match(/<h1/g)||[]).length, 1);
 for (const text of ['https://luma.com/1sts0xgz','https://luma.com/gzrgw7b0','CollectionPage','ItemList','BreadcrumbList','Applied AI in Practice live calendar','Common questions']) assert.ok(html.includes(text),text);
 assert.match(html, /rel="canonical" href="https:\/\/ajaneeigharo.com\/events"/);
 assert.ok((await (await response('/sitemap.xml')).text()).includes('https://ajaneeigharo.com/events'));
 });

test('workshop detail pages expose accurate single-event schema and registration', async () => {
 for (const [slug,registration,date] of [['gtm-engineering','1sts0xgz','2026-12-03T15:30:00-05:00'],['becoming-ai-first','gzrgw7b0','2026-12-11T12:00:00-05:00']]) {
 const html=await page('/events/'+slug);
 assert.equal((html.match(/<h1/g)||[]).length,1);
 assert.ok(html.includes('"@type":"Event"'));
 assert.ok(html.includes('"startDate":"'+date+'"'));
 assert.ok(html.includes('https://luma.com/'+registration));
 assert.ok(html.includes('"price":0'));
 assert.ok(html.includes('No coding experience is required.'));
 assert.ok(html.includes('https://ajaneeigharo.com/events/'+slug));
 }
 const home=await page('/');
 assert.doesNotMatch(home,/I serve as AI Programs/);
 assert.ok(home.includes('jobTitle":"Applied AI Engineer'));
});

test('supporting projects and Series remain discoverable without changing selected work', async () => {
 const home=await page('/');
 const work=home.match(/<section[^>]*id="work"[\s\S]*?<\/section>/)?.[0];
 assert.ok(work);
 for (const path of ['/work/homeops-agent','/work/agent-systems-evidence-scout']) assert.ok(work.includes('href="'+path+'"'),path);
 const resume=await page('/resume');
 assert.match(resume, /href="\/events">Series<\/a>/);
 const events=await page('/events');
 assert.ok(events.includes('GTM Engineering: Discover an emerging career at the intersection of AI, business, marketing, and technology.'));
 assert.ok(events.includes('href="https://luma.com/applied-ai-in-practice"'));
});


test('www requests redirect permanently without losing path or query', async () => {
  const result = await worker.fetch(new Request('https://www.ajaneeigharo.com/resume?source=example'), {}, {waitUntil(){},passThroughOnException(){}});
  assert.equal(result.status, 308);
  assert.equal(result.headers.get('location'), 'https://ajaneeigharo.com/resume?source=example');
});

test('resume downloads expose one clean indexable PDF URL', async () => {
  const html = await page('/resume');
  const links = [...html.matchAll(/href="([^"]+\.pdf[^"]*)"/g)].map(m => m[1]);
  assert.ok(links.length >= 1);
  assert.ok(links.every(link => link === '/Ajanee_Igharo_Applied_AI_Engineer_Resume.pdf'));
});

test('PDF responses retain asset bytes and declare their canonical', async () => {
  const calls = [];
  const asset = new Uint8Array([37,80,68,70,45]);
  const pdfWorker = createWorker(async request => {
    calls.push(new URL(request.url).pathname);
    return new Response(asset, {headers:{'content-type':'application/pdf'}});
  });
  after(() => pdfWorker.dispose());
  for (const suffix of ['', '?v=20261118-approved']) {
    const result = await pdfWorker.fetch(new Request('https://ajaneeigharo.com/Ajanee_Igharo_Applied_AI_Engineer_Resume.pdf'+suffix));
    assert.equal(result.status, 200);
    assert.equal(result.headers.get('content-type'),'application/pdf');
    assert.equal(result.headers.get('link'),'<https://ajaneeigharo.com/Ajanee_Igharo_Applied_AI_Engineer_Resume.pdf>; rel="canonical"');
    assert.equal(result.headers.get('x-robots-tag'),null);
    assert.deepEqual(new Uint8Array(await result.arrayBuffer()),asset);
  }
  assert.equal(calls.length,2);
});

test('homepage images distinguish decorative alt text from missing attributes', async () => {
  const html = await page('/');
  const markup = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '');
  const images = [...markup.matchAll(/<img\b[^>]*>/g)].map(m => m[0]);
  assert.ok(images.length >= 9);
  assert.ok(images.every(image => /\balt="[^"]*"/.test(image)));
  assert.match(html, /aria-hidden="true"><img[^>]*alt=""/);
});


test('ended appointment uses historical verbs without changing approved dates', async () => {
 const html=await page('/resume');
 assert.match(html,/Coordinated applied AI programs/);
 assert.match(html,/Supported the Applied AI Microcredential Program; co-developed Module 2/);
 assert.match(html,/Nov 2025 to Nov 2026/);
});


test('search metadata is present in the initial HTML head', async () => {
 for (const path of ['/', '/resume', '/events', '/events/gtm-engineering', '/events/becoming-ai-first', '/work/agentic-analytics-lab', '/work/homeops-agent', '/work/closing-the-loop', '/work/agent-systems-evidence-scout', '/work/enterprise-knowledge-validation-mcp', '/work/ai-workflow-reliability-console', '/work/autonomous-repository-maintenance-system']) {
  const html=await page(path);
  const head=html.slice(0,html.indexOf('</head>'));
  assert.match(head,/<meta name="description" content="[^"]+"/,path);
  assert.match(head,/<link rel="canonical"/,path);
 }
});

test('events hero is visible in server HTML before client animation scripts', async () => {
 const html=(await page('/events')).replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,'');
 const hero=html.match(/<section class="events-hero"[\s\S]*?<\/section>/)?.[0];
 assert.ok(hero);
 assert.doesNotMatch(hero, /opacity:\s*0|filter:\s*blur\([1-9]/);
});

test('AAL explainer separates supplied task type from route inference with source evidence', async () => {
 const html=await page('/work/agentic-analytics-lab');
 assert.match(html,/What does supplied routing metadata let us test/);
 assert.match(html,/Known routes let me examine execution/);
 assert.match(html,/conceptual system diagram/);
 assert.match(html,/src="\/images\/aal-architecture.svg"/);
 assert.match(html,/58add5e58e581be21d3511fc4cd2cb5be44f49b7/);
 assert.match(html,/not a held-out generalization result/);
});
test('AWRC walkthrough makes inspect compare and refusal meanings explicit', async () => {
 const html=await page('/work/ai-workflow-reliability-console');
 for(const phrase of ['Read the evidence in three steps','Inspect the record','Compare compatible evidence','Read the refusal','does not run the imported workflow','does not measure a newly executed workflow']) assert.ok(html.includes(phrase),phrase);
 assert.match(html,/awrc-overview.jpg/);
 assert.match(html,/awrc-verification.json/);
});
