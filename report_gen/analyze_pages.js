const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto('file:///Users/priyan/Desktop/blood-bank-system/docs/HemoVault_Project_Report.html');
  const pageDivs = await page.$$eval('.page', els => els.map((el, i) => ({
    index: i + 1,
    height: el.offsetHeight,
  })));
  console.log('Total .page divs:', pageDivs.length);
  const oversized = pageDivs.filter(p => p.height > 950);
  console.log('Oversized divs count:', oversized.length);
  console.log('Oversized divs:', oversized);
  await browser.close();
})();
