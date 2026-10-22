const fs = require('fs');
const puppeteer = require('puppeteer');

async function testPages() {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  // Create 52 dummy pages
  let html = '<html><head><style>@page{size:A4; margin:20mm 15mm 20mm 20mm;} .page{page-break-after:always; height:250mm; max-height:250mm; overflow:hidden; box-sizing:border-box; border:1px solid #eee; padding:10px;}</style></head><body>';
  for (let i = 1; i <= 52; i++) {
    html += `<div class="page"><h2>Page ${i}</h2><p>Testing calibrated pagination...</p></div>`;
  }
  html += '</body></html>';

  await page.setContent(html);
  const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });
  await browser.close();

  const count = (pdfBuffer.toString('latin1').match(/\/Type\s*\/Page\b/g) || []).length;
  console.log('Resulting PDF page count:', count);
}

testPages();
