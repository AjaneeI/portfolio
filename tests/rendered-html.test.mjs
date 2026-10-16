import assert from 'node:assert/strict';
import test from 'node:test';
const { default: worker } = await import('../dist/server/index.js');
async function page(path) {
  const res = await response(path);
  assert.equal(res.status, 200, path);
  return res.text();
}
async function response(path) {
  return worker.fetch(new Request(`http://localhost${path}`, { headers: { accept: 'text/html' } }), { ASSETS: { fetch: async () => new Response('Not found', { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
}
test('homepage has the new identity, selected work, and functional routes', async () => {
  const html = await page('/');
  for (const expected of ['Applied AI Engineer', 'systems for', 'real-world', 'Agentic Analytics Lab', 'Agent Systems Evidence Scout', 'HomeOps Agent', 'Closing the Loop', 'I care about what happens after the demo', '/resume', '/work/agentic-analytics-lab', '/work/agent-systems-evidence-scout', '/work/homeops-agent', 'mailto:ajaneeigharo@gmail.com']) assert.ok(html.includes(expected), expected);
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
  assert.match(agentic, /146 passing tests/);
  assert.doesNotMatch(agentic, /architecture is planned|has not been implemented|remains future work/);
  assert.match(await page('/work/homeops-agent'), /simulated for reproducible testing/);
  assert.match(await page('/work/agent-systems-evidence-scout'), /39 deterministic tests/);
  assert.match(await page('/work/closing-the-loop'), /not production software/);
  assert.match(await page('/resume'), /Expected May 2027/);
});

test('project pages publish self-contained article metadata', async () => {
  const projects = [
    {
      path: '/work/agentic-analytics-lab',
      title: 'Agentic Analytics Lab | Ajanee Igharo',
      description: 'Evaluation-driven analytics-agent lab testing when specialized execution is worth added complexity, with ClickHouse, guardrails, CI, and failure analysis.',
      modified: '2026-10-05',
    },
    {
      path: '/work/agent-systems-evidence-scout',
      title: 'Agent Systems Evidence Scout | Ajanee Igharo',
      description: 'Evidence-controlled arXiv research agent with bounded tools, per-run verification, deterministic citation guardrails, regression tests, and live integration evidence.',
      modified: '2026-10-05',
    },
    {
      path: '/work/homeops-agent',
      title: 'HomeOps Agent | Ajanee Igharo',
      description: 'Human-in-the-loop AI prototype with explicit tool contracts, approval gates, simulated devices, failure handling, and audit logging.',
    },
    {
      path: '/work/closing-the-loop',
      title: 'Closing the Loop | Ajanee Igharo',
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
  assert.ok(html.includes('<title>Ajanee Igharo | Resume</title>'));
  assert.ok(html.includes(`<meta name="description" content="${description}"`));
  assert.ok(html.includes(`<meta property="og:description" content="${description}"`));
  assert.ok(html.includes(`<meta name="twitter:description" content="${description}"`));
  assert.ok(html.includes('<link rel="canonical" href="https://ajaneeigharo.com/resume"'));
  const sectionOrder = [
    'Education',
    'Experience',
    'Selected Projects',
    'Technical Skills',
    'Writing &amp; Speaking',
    'Leadership &amp; Recognition',
  ];
  let position = -1;
  for (const section of sectionOrder) {
    const next = html.indexOf(section);
    assert.ok(next > position, section);
    position = next;
  }
  for (const exactClaim of [
    'AI Programs &amp; Operations Coordinator',
    'Summer 2026 AI workshop series serving 30+ career advisors',
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
  assert.match(html, /href="\/Ajanee_Igharo_Applied_AI_Engineer_Resume\.pdf"[^>]*download/);
  assert.match(html, />Download Resume PDF</);
  assert.match(html, /href="\/#work"[^>]*>View all projects</);
});

test('resume release preserves authoritative roles, chronology and project boundaries', async () => {
  const html = await page('/resume');
  const experience = html.match(/aria-labelledby="experience"[\s\S]*?<\/section>/)[0];
  const entries = [...experience.matchAll(/<article class="resume-entry">([\s\S]*?)<\/article>/g)].map(x => x[1]);
  assert.equal((entries[0].match(/<li>/g) || []).length, 3);
  assert.match(entries[0], /AI Programs &amp; Operations Coordinator/);
  assert.match(entries[0], /30\+ career advisors/);
  assert.match(entries[0], /Rebaz Kamal/);
  assert.match(entries[0], /plain Python, OpenRouter, and Google Colab/);
  assert.match(entries.find(x => x.includes('Small Business Development Intern')), /Summer 2025/);
  assert.match(entries.find(x => x.includes('Financial Consulting')), /Nov 2025/);
  assert.match(html, /Programming &amp; Web/);
  assert.match(html, /Python, SQL, TypeScript, HTML\/CSS, React, Next.js/);
  const projects = html.match(/aria-labelledby="projects"[\s\S]*?<\/section>/)[0];
  const titles = [...projects.matchAll(/<h3><a[^>]*>(.*?)<\/a><\/h3>/g)].map(x => x[1]);
  assert.deepEqual(titles, ['Agentic Analytics Lab', 'Gateway: Agentic Commerce Assurance', 'HomeOps Agent']);
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
