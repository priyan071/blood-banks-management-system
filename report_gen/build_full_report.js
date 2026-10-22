const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const preliminaries = require('./content/preliminaries');
const chapter1 = require('./content/chapter1');
const chapter2 = require('./content/chapter2');
const chapter3 = require('./content/chapter3');
const chapter4 = require('./content/chapter4');
const chapter5 = require('./content/chapter5');
const chapter6 = require('./content/chapter6');
const appendix = require('./content/appendix');
const screenshots = require('./content/screenshots');
const references = require('./content/references');

const cssStyles = `
  @page {
    size: A4 portrait;
    margin: 20mm 15mm 20mm 20mm;
  }

  * {
    box-sizing: border-box;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  body {
    font-family: "Times New Roman", Times, Georgia, serif;
    font-size: 11.5pt;
    line-height: 1.55;
    color: #111827;
    margin: 0;
    padding: 0;
    background: #ffffff;
  }

  .page {
    page-break-after: always;
    page-break-inside: avoid;
    width: 100%;
    min-height: 250mm;
    position: relative;
    padding: 10px 0;
  }

  .cover-page {
    page-break-after: always;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: center;
  }

  .chapter-header {
    text-align: center;
    margin-bottom: 25px;
    padding-top: 10px;
  }

  .chapter-title {
    font-size: 15pt;
    font-weight: bold;
    letter-spacing: 1px;
    margin: 0 0 5px 0;
    color: #000000;
  }

  .chapter-subtitle {
    font-size: 13.5pt;
    font-weight: bold;
    letter-spacing: 0.5px;
    margin: 0;
    color: #065f46;
    text-transform: uppercase;
  }

  .section-title {
    font-size: 12pt;
    font-weight: bold;
    margin: 18px 0 8px 0;
    color: #000000;
    text-transform: uppercase;
    border-bottom: 1px solid #e2e8f0;
    padding-bottom: 3px;
  }

  .body-text {
    text-align: justify;
    margin: 0 0 10px 0;
    line-height: 1.55;
  }

  .bullet-list, .numbered-list {
    margin: 6px 0 12px 24px;
    padding: 0;
  }

  .bullet-list li, .numbered-list li {
    margin-bottom: 6px;
    text-align: justify;
    line-height: 1.5;
  }

  .callout-box {
    background-color: #f8fafc;
    border-left: 4px solid #065f46;
    padding: 10px 14px;
    margin: 12px 0;
    border-radius: 0 6px 6px 0;
    font-size: 10.5pt;
    line-height: 1.5;
  }

  .highlight-quote {
    font-style: italic;
    background: #fdf2f2;
    border-left: 4px solid #dc2626;
    padding: 10px 16px;
    margin: 14px 0;
    border-radius: 0 6px 6px 0;
    font-size: 11pt;
    color: #7f1d1d;
    text-align: center;
  }

  .objective-card, .module-card, .enhancement-box, .requirement-block {
    background: #ffffff;
    border: 1px solid #cbd5e1;
    border-radius: 6px;
    padding: 10px 14px;
    margin-bottom: 10px;
  }

  .table-container {
    margin: 14px 0;
    width: 100%;
  }

  .table-caption {
    font-size: 10pt;
    font-weight: bold;
    text-align: center;
    margin-bottom: 5px;
    color: #334155;
  }

  .data-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 10pt;
    line-height: 1.4;
  }

  .data-table th {
    background-color: #065f46;
    color: #ffffff;
    font-weight: bold;
    padding: 7px 8px;
    border: 1px solid #047857;
    text-align: left;
    font-size: 9.5pt;
  }

  .data-table td {
    padding: 6px 8px;
    border: 1px solid #cbd5e1;
    vertical-align: top;
  }

  .data-table tr:nth-child(even) {
    background-color: #f8fafc;
  }

  .code-block-container {
    margin: 10px 0;
    border: 1px solid #cbd5e1;
    border-radius: 6px;
    background: #f8fafc;
    overflow: hidden;
  }

  .code-title {
    background: #e2e8f0;
    padding: 4px 10px;
    font-family: Consolas, monospace;
    font-size: 9pt;
    font-weight: bold;
    color: #1e293b;
    border-bottom: 1px solid #cbd5e1;
  }

  .code-block {
    margin: 0;
    padding: 8px 12px;
    font-family: Consolas, Monaco, "Courier New", monospace;
    font-size: 8.5pt;
    line-height: 1.35;
    color: #0f172a;
    background: #f8fafc;
    white-space: pre-wrap;
    word-break: break-word;
  }

  .diagram-box {
    margin: 12px 0;
    text-align: center;
  }

  .diagram-caption {
    font-size: 10pt;
    font-weight: bold;
    text-align: center;
    margin-bottom: 6px;
    color: #1e3a8a;
  }

  .screenshot-container {
    margin: 10px 0;
    text-align: center;
  }

  .screenshot-caption {
    font-size: 10.5pt;
    font-weight: bold;
    margin-bottom: 5px;
    color: #1e293b;
  }

  .screenshot-img {
    max-width: 95%;
    max-height: 95mm;
    height: auto;
    border: 1px solid #cbd5e1;
    border-radius: 6px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.08);
  }

  .reference-list {
    margin: 10px 0 0 24px;
    padding: 0;
    font-size: 10.5pt;
  }

  .reference-list li {
    margin-bottom: 14px;
    line-height: 1.5;
    text-align: justify;
  }
`;

const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>HemoVault: Centralized Blood Bank Management System - Project Report</title>
  <style>${cssStyles}</style>
</head>
<body>
  ${preliminaries.getTitlePage()}
  ${preliminaries.getBonafideCertificate()}
  ${preliminaries.getVivaVoceCertificate()}
  ${preliminaries.getAbstract()}
  ${preliminaries.getAcknowledgement()}
  ${preliminaries.getTableOfContents()}
  ${preliminaries.getListsOfTablesFigures()}
  ${chapter1.getChapter1()}
  ${chapter2.getChapter2()}
  ${chapter3.getChapter3()}
  ${chapter4.getChapter4()}
  ${chapter5.getChapter5()}
  ${chapter6.getChapter6()}
  ${appendix.getAppendix()}
  ${screenshots.getScreenshots()}
  ${references.getReferences()}
</body>
</html>
`;

// Save HTML to docs/
const docsDir = path.resolve(__dirname, '../docs');
fs.mkdirSync(docsDir, { recursive: true });
const htmlPath = path.join(docsDir, 'HemoVault_Project_Report.html');
fs.writeFileSync(htmlPath, htmlContent, 'utf-8');
console.log('Master HTML report written successfully to:', htmlPath);

// Generate PDF using Puppeteer
async function generatePdf() {
  console.log('Launching headless browser to compile PDF...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  await page.goto('file://' + htmlPath, { waitUntil: 'networkidle0' });

  const pdfPath = path.join(docsDir, 'HemoVault_Project_Report.pdf');

  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: `
      <div style="font-family:'Times New Roman',serif; font-size:8pt; color:#64748b; width:100%; border-bottom:0.5px solid #cbd5e1; padding-bottom:3px; margin: 0 20mm; display:flex; justify-content:space-between;">
        <span>HEMOVAULT: CENTRALIZED BLOOD BANK MANAGEMENT SYSTEM</span>
        <span>EASWARI ENGINEERING COLLEGE</span>
      </div>
    `,
    footerTemplate: `
      <div style="font-family:'Times New Roman',serif; font-size:8pt; color:#64748b; width:100%; border-top:0.5px solid #cbd5e1; padding-top:3px; margin: 0 20mm; display:flex; justify-content:space-between;">
        <span>DEPARTMENT OF CSE (AIML)</span>
        <span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
      </div>
    `,
    margin: {
      top: '22mm',
      bottom: '20mm',
      left: '20mm',
      right: '15mm'
    }
  });

  await browser.close();
  console.log('Master PDF compiled successfully to:', pdfPath);
}

generatePdf().catch(err => {
  console.error('Error generating PDF:', err);
  process.exit(1);
});
