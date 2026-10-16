"""Generate the canonical PDF from built resume HTML. No duplicated factual copy.

Dependencies: reportlab, lxml. Run after npm run build and export-resume.mjs.
Usage: python scripts/generate-resume.py rendered.html output.pdf
"""
import sys
from html import escape
from pathlib import Path
from urllib.parse import urljoin
from lxml import html
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import letter
from reportlab.pdfbase.pdfdoc import PDFString
from reportlab.platypus import SimpleDocTemplate, Paragraph, KeepTogether, HRFlowable


def clean(text):
    return ' '.join(text.split()).replace('–', '-').replace('—', '-').replace('’', "'")


def text(node):
    return clean(node.text_content())


def has(cls):
    return f"contains(concat(' ', normalize-space(@class), ' '), ' {cls} ')"


def inline(node):
    result = escape(clean(node.text or ''))
    for child in node:
        value = inline(child)
        if child.tag == 'a':
            href = urljoin('https://ajaneeigharo.com', child.get('href', ''))
            value = f'<link href="{escape(href, quote=True)}">{value}</link>'
        elif child.tag == 'strong':
            value = f'<b>{value}</b>'
        result += (' ' if result and value else '') + value
        if child.tail and clean(child.tail):
            result += ' ' + escape(clean(child.tail))
    return result


def build(source, destination):
    root = html.parse(source)
    resume = root.xpath(f'//article[{has("resume-page")}]')[0]
    green = colors.HexColor('#174b39')
    styles = {
        'name': ParagraphStyle('name', fontName='Times-Bold', fontSize=18, leading=20, alignment=TA_CENTER, spaceAfter=2),
        'contact': ParagraphStyle('contact', fontName='Times-Roman', fontSize=8.5, leading=9.3, alignment=TA_CENTER, spaceAfter=2),
        'summary': ParagraphStyle('summary', fontName='Times-Roman', fontSize=9, leading=9.8, spaceAfter=1),
        'section': ParagraphStyle('section', fontName='Times-Bold', fontSize=10, leading=10.8, textColor=green, spaceBefore=2, spaceAfter=0, keepWithNext=True),
        'title': ParagraphStyle('title', fontName='Times-Bold', fontSize=9, leading=9.7, spaceBefore=1, spaceAfter=0, keepWithNext=True),
        'body': ParagraphStyle('body', fontName='Times-Roman', fontSize=8.5, leading=9.5, spaceAfter=0),
        'meta': ParagraphStyle('meta', fontName='Times-Italic', fontSize=8.3, leading=9.2, textColor=colors.HexColor('#303633'), spaceAfter=0, keepWithNext=True),
        'bullet': ParagraphStyle('bullet', fontName='Times-Roman', fontSize=8.5, leading=9.5, leftIndent=9, firstLineIndent=-7, spaceAfter=0),
    }
    def p(value, kind='body'):
        return Paragraph(value, styles[kind])
    story = [p(escape(text(resume.xpath('.//h1')[0])), 'name')]
    address = resume.xpath('.//address')[0]
    contacts = [f'<link href="{escape(x.get("href"), quote=True)}">{inline(x)}</link>' if x.tag == 'a' else inline(x) for x in address]
    contacts.append('<link href="https://ajaneeigharo.com">ajaneeigharo.com</link>')
    story.append(p(' | '.join(contacts), 'contact'))
    story.append(p(inline(resume.xpath(f'.//p[{has("resume-summary")}]')[0]), 'summary'))
    for section in resume.xpath('./section'):
        section_id = section.get('aria-labelledby')
        story.append(p(escape(text(section.xpath('./h2')[0])), 'section'))
        story.append(HRFlowable(width='100%', thickness=.5, color=green, spaceAfter=1))
        if section_id == 'education':
            for entry in section.xpath(f'.//div[{has("education-entry")}]'):
                title = escape(text(entry.xpath('.//h3')[0]))
                date = escape(text(entry.xpath('./time')[0]))
                items = [p(title + ' | ' + date, 'title')]
                items += [p(inline(x)) for x in entry.xpath('.//p')]
                story.append(KeepTogether(items))
        elif section_id in ('experience', 'projects'):
            for entry in section.xpath('./div/article'):
                title = inline(entry.xpath('.//h3')[0])
                date = escape(text(entry.xpath('.//time')[0]))
                items = [p(title + ' | ' + date, 'title')]
                items += [p(inline(x), 'meta') for x in entry.xpath(f'.//p[{has("resume-organization")} or {has("resume-context")}]')]
                items += [p('- ' + inline(x), 'bullet') for x in entry.xpath('./ul/li')]
                items += [p(inline(x), 'meta') for x in entry.xpath(f'./p[{has("technologies")}]')]
                story.append(KeepTogether(items))
            for note in section.xpath(f'.//div[{has("resume-role-history")}]/p'):
                story.append(p(inline(note)))
        elif section_id == 'skills':
            for item in section.xpath('./dl/div'):
                story.append(p('<b>' + escape(text(item.xpath('./dt')[0])) + ':</b> ' + escape(text(item.xpath('./dd')[0]))))
        else:
            for item in section.xpath('./ul/li'):
                story.append(p(inline(item)))
    destination = Path(destination)
    destination.parent.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(str(destination), pagesize=letter, leftMargin=18, rightMargin=18, topMargin=12, bottomMargin=12,
                            title='Ajanee Igharo Resume', author='Ajanee Igharo', subject='Portfolio resume revision 2026-10-05')
    def page_footer(canvas, document):
        canvas._doc.Catalog.Lang = PDFString('en-US')
    doc.build(story, onFirstPage=page_footer, onLaterPages=page_footer)
    print(destination)


if __name__ == '__main__':
    build(sys.argv[1], sys.argv[2])
