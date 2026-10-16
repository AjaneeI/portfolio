"""Check PDF parity against rendered resume HTML (lxml, pypdf required)."""
import re
import sys
from lxml import html
from pypdf import PdfReader


def normalize(value):
    return re.sub(r'\s+', '', value).replace('–', '-').replace('—', '-').replace('’', "'")


root = html.parse(sys.argv[1])
resume = root.xpath('//article[contains(@class,"resume-page")]')[0]
pdf = PdfReader(sys.argv[2])
assert len(pdf.pages) == 1, f'Expected one page, got {len(pdf.pages)}'
content = normalize(' '.join(page.extract_text() for page in pdf.pages))
nodes = resume.xpath('.//h1 | .//p[contains(@class,"resume-summary")] | ./section//*[self::h2 or self::h3 or self::p or self::time or self::dt or self::dd or self::li]')
for node in nodes:
    value = normalize(node.text_content())
    assert value in content, f'Missing PDF content: {node.text_content()}'
for stale in ['Last updated', 'TypeScript (project-based)', 'Dates pending', ':chatgpt-content-reference', 'filecite']:
    assert normalize(stale) not in content, stale
links = [a.get_object().get('/A', {}).get('/URI') for page in pdf.pages for a in page.get('/Annots', [])]
for href in resume.xpath('./section//a/@href'):
    target = 'https://ajaneeigharo.com' + href if href.startswith('/') else href
    assert target in links, f'Missing PDF link: {target}'
print(f'PASS: {len(nodes)} content blocks, one page, project/publication links and stale-copy checks')
