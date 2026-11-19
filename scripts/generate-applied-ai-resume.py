"""Generate the approved one-page Applied AI resume. All text is black.
Factual sources: confirmed owner dates, website resume, LinkedIn and Notion
cross-check in October 28, 2026 resume review. This curated application resume
selects two projects; the website retains the complete portfolio.
"""
from pathlib import Path
import argparse
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, KeepTogether, HRFlowable
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from xml.sax.saxutils import escape

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--output', type=Path, required=True, help='Explicit candidate output path; do not replace the approved public PDF without review.')
OUT = parser.parse_args().output
OUT.parent.mkdir(parents=True, exist_ok=True)
styles={
 'name':ParagraphStyle('name',fontName='Times-Bold',fontSize=25,leading=28,spaceAfter=3,textColor=colors.black),
 'position':ParagraphStyle('position',fontName='Helvetica-Bold',fontSize=12,leading=16,spaceAfter=3,textColor=colors.black),
 'contact':ParagraphStyle('contact',fontName='Helvetica',fontSize=10,leading=14,spaceAfter=8,textColor=colors.black),
 'body':ParagraphStyle('body',fontName='Helvetica',fontSize=10.5,leading=13,spaceAfter=3,textColor=colors.black),
 'bullet':ParagraphStyle('bullet',fontName='Helvetica',fontSize=10.5,leading=13,leftIndent=10,firstLineIndent=-8,spaceAfter=3,textColor=colors.black),
 'heading':ParagraphStyle('heading',fontName='Helvetica-Bold',fontSize=11,leading=14,spaceBefore=6,spaceAfter=4,textColor=colors.black,keepWithNext=True),
 'title':ParagraphStyle('title',fontName='Helvetica-Bold',fontSize=11,leading=14,spaceAfter=2,textColor=colors.black,keepWithNext=True),
 'meta':ParagraphStyle('meta',fontName='Helvetica',fontSize=10,leading=13,spaceAfter=5,textColor=colors.black,keepWithNext=True),
}
story=[]
def p(t,style='body'):return Paragraph(t,styles[style])
def add(t,style='body'):story.append(p(t,style))
def section(t):add(t.upper(),'heading');story.append(HRFlowable(width='100%',thickness=.5,color=colors.black,spaceAfter=4))
def entry(title,meta,bullets):
 block=[p(title,'title'),p(meta,'meta')]+[p('- '+t,'bullet') for t in bullets]+[Spacer(1,2)]
 story.append(KeepTogether(block))
def link(url,label):return f'<link href="{escape(url)}" color="black">{escape(label)}</link>'
add('Ajanee Igharo','name')
add('APPLIED AI ENGINEERING | AGENTS, EVALUATION &amp; WORKFLOW AUTOMATION','position')
add('Boston, MA | '+link('mailto:ajaneeigharo@gmail.com','ajaneeigharo@gmail.com')+' | '+link('https://ajaneeigharo.com','ajaneeigharo.com')+'<br/>'+link('https://www.linkedin.com/in/ajaneeigharo/','linkedin.com/in/ajaneeigharo')+' | '+link('https://github.com/AjaneeI','github.com/AjaneeI'),'contact')

section('Technical skills')
add('<b>Development:</b> Python, SQL, TypeScript, JavaScript, React, Next.js, Git/GitHub, Docker, SQLite, ClickHouse<br/><b>AI &amp; quality:</b> MCP, tool use, structured outputs, guardrails, Playwright, GitHub Actions, CodeQL')
section('Selected technical projects')
entry(link('https://ajaneeigharo.com/work/agentic-analytics-lab','Agentic Analytics Lab'), '2026 | Flagship portfolio project | Python, SQL, ClickHouse',[
'Built synthetic-data analytics agents with dataset-scoped, read-only SQL tools and semantic safeguards; created a frozen Q1-Q6 benchmark, deterministic scoring, failure diagnostics, and Python 3.11/3.12 CI. Later engineering was agent-assisted.'
])
entry(link('https://ajaneeigharo.com/work/ai-workflow-reliability-console','AI Workflow Reliability Console (AWRC)'), '2026 | Project owner; agent-assisted development | Python, SQLite, JavaScript',[
'Built a local workspace to import evidence, inspect revisions, compare compatible runs or explain refusals, and export reports; separated reported claims from verification. Reviewed candidate passed 87 Python test methods.'
])
section('Experience')
entry('AI Programs &amp; Operations Coordinator','Paul English Applied AI Institute, UMass Boston | Nov 2025 - Nov 2026',[
'Coordinate cross-functional AI programs and Summer 2026 career-advisor workshop operations; co-develop Module 2 agent exercises with Rebaz Kamal using Python, OpenRouter, and Google Colab.'
])
entry('Financial Consulting &amp; Analytics Intern',"Girls' LEAP | Jan 2026 - Mar 2026",[
'Translated QuickBooks and treasury records into clearer financial decision-support information.'
])
entry('Project Manager',"Girls' LEAP | May 2022 - Mar 2026",[
'Coordinated Media Mindset, a youth digital-resilience initiative, and developed its stakeholder pitch.'
])
entry('Small Business Development Intern','Massachusetts Executive Office of Economic Development | Oct 2024 - Dec 2024',[
'Analyzed markets, financial information, and business models to inform small-business growth guidance and statewide incentive programs.'
])
entry('Venture Capital Extern','HP Tech Ventures | Sep 2024 - Oct 2024',[
'Assessed startup markets, competitors, and business models; prepared a thesis-aligned investment summary.'
])
section('Education')
add('<b>Master of Business Administration (MBA)</b> | UMass Boston | Expected May 2027<br/><b>Bachelor of Arts, Psychology</b> | UMass Boston | 2026')

def footer(canvas,doc):
 canvas.saveState();canvas.setFillColor(colors.black);canvas.setFont('Helvetica',9);canvas.restoreState()
doc=SimpleDocTemplate(str(OUT),pagesize=letter,rightMargin=42,leftMargin=42,topMargin=28,bottomMargin=34,title='Ajanee Igharo | Applied AI Engineering Resume',author='Ajanee Igharo')
doc.build(story,onFirstPage=footer,onLaterPages=footer)
print(OUT)
