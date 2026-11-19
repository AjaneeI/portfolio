"""Verify shared facts between the current web resume and its curated one-page PDF.

The PDF deliberately selects fewer projects and shorter bullets than the web page.
This checks shared identity, role dates, selected projects and links, not verbatim
full-page parity. Usage: python scripts/verify-resume.py rendered.html resume.pdf
Requires lxml and pypdf.
"""
import argparse
import re
from urllib.parse import urlsplit
from lxml import html
from pypdf import PdfReader


def normalize(value):
    value = re.sub(r'\bto\b', '-', value)
    return re.sub(r'\s+', '', value).replace('–', '-').replace('—', '-').replace('’', "'").casefold()


def require(condition, message):
    if not condition:
        raise ValueError(message)


def verify(html_path, pdf_path):
    root = html.parse(str(html_path))
    resumes = root.xpath('//main[contains(concat(" ",normalize-space(@class)," ")," resume-design ")]')
    require(len(resumes) == 1, 'Expected the current resume-design main element')
    resume = resumes[0]
    reader = PdfReader(str(pdf_path))
    require(len(reader.pages) == 1, f'Expected one page, got {len(reader.pages)}')
    content = normalize(' '.join(page.extract_text() or '' for page in reader.pages))
    web = normalize(resume.text_content() + " " + " ".join(resume.xpath(".//a/@href")))
    for fact in ['Ajanee Igharo', 'Boston, MA', 'ajaneeigharo@gmail.com', 'Expected May 2027', 'Python', 'SQL', 'TypeScript']:
        require(normalize(fact) in content and normalize(fact) in web, f'Shared fact missing: {fact}')
    roles = ['AI Programs & Operations Coordinator', 'Small Business Development Intern', 'Venture Capital Extern', 'Financial Consulting & Analytics Intern']
    for role in roles:
        entries = resume.xpath('.//article[contains(concat(" ",normalize-space(@class)," ")," resume-entry ")][.//h3[normalize-space(.)=$role]]', role=role)
        require(len(entries) == 1, f'Expected one web entry for {role}')
        dates = entries[0].xpath('.//time/text()')
        require(len(dates) == 1, f'Missing dates for {role}')
        require(normalize(role) in content, f'PDF role missing: {role}')
        start = content.index(normalize(role)) + len(normalize(role))
        following = [content.find(normalize(other), start) for other in roles + ['Project Manager', 'EDUCATION'] if other != role]
        end = min((index for index in following if index >= 0), default=len(content))
        require(normalize(dates[0]) in content[start:end], f'PDF/web dates differ for {role}: {dates[0]}')
    for project in ['Agentic Analytics Lab', 'AI Workflow Reliability Console (AWRC)']:
        require(normalize(project) in content and normalize(project) in web, f'Selected project missing: {project}')
    for stale in ['Nov 2025 - Present', 'Last updated', 'Dates pending', ':chatgpt-content-reference', 'filecite']:
        require(normalize(stale) not in content, f'Stale PDF text: {stale}')
    links = set()
    for page in reader.pages:
        for annotation in page.get('/Annots', []):
            action = annotation.get_object().get('/A')
            if action:
                uri = action.get_object().get('/URI')
                if uri:
                    links.add(str(uri).rstrip('/'))
    for target in ['mailto:ajaneeigharo@gmail.com', 'https://ajaneeigharo.com', 'https://www.linkedin.com/in/ajaneeigharo', 'https://github.com/AjaneeI', 'https://ajaneeigharo.com/work/agentic-analytics-lab', 'https://ajaneeigharo.com/work/ai-workflow-reliability-console']:
        require(target in links, f'Missing PDF link: {target}')
    downloads = resume.xpath('.//a[@download and contains(@href,".pdf")]/@href')
    require(len(downloads) >= 2, 'Expected top and bottom resume downloads')
    require(len(set(downloads)) == 1, 'Resume buttons must download the same PDF')
    require(urlsplit(downloads[0]).path == '/Ajanee_Igharo_Applied_AI_Engineer_Resume.pdf', 'Unexpected PDF download path')
    print(f'PASS: one page; shared identity, {len(roles)} role dates, two selected projects, six PDF links and consistent downloads. Curated content differs intentionally.')


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('html_path')
    parser.add_argument('pdf_path')
    args = parser.parse_args()
    verify(args.html_path, args.pdf_path)
