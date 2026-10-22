const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function capture() {
  const screenshotDir = path.resolve(__dirname, '../docs/screenshots');
  fs.mkdirSync(screenshotDir, { recursive: true });

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log('Navigating to login...');
  await page.goto('http://localhost:5173/login', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: path.join(screenshotDir, '01_login_page.png') });

  console.log('Logging in as admin...');
  await page.evaluate(() => {
    // Click demo admin button if available or fill form
    const emailInput = document.querySelector('input[type="email"]');
    const passInput = document.querySelector('input[type="password"]');
    if (emailInput && passInput) {
      emailInput.value = 'admin@bloodbank.org';
      passInput.value = 'Password@123';
      emailInput.dispatchEvent(new Event('input', { bubbles: true }));
      passInput.dispatchEvent(new Event('input', { bubbles: true }));
    }
  });

  const submitBtn = await page.$('button[type="submit"]');
  if (submitBtn) {
    await submitBtn.click();
    await new Promise(r => setTimeout(r, 2000));
  }

  console.log('Capturing admin dashboard...');
  await page.screenshot({ path: path.join(screenshotDir, '02_admin_dashboard.png') });

  console.log('Navigating to Inventory...');
  await page.goto('http://localhost:5173/admin/inventory', { waitUntil: 'networkidle2' }).catch(() => {});
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(screenshotDir, '03_inventory_management.png') });

  console.log('Navigating to Testing...');
  await page.goto('http://localhost:5173/admin/testing', { waitUntil: 'networkidle2' }).catch(() => {});
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(screenshotDir, '04_laboratory_screening.png') });

  console.log('Navigating to Emergency Requests...');
  await page.goto('http://localhost:5173/admin/requests', { waitUntil: 'networkidle2' }).catch(() => {});
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(screenshotDir, '05_emergency_requests.png') });

  console.log('Navigating to Reports...');
  await page.goto('http://localhost:5173/admin/reports', { waitUntil: 'networkidle2' }).catch(() => {});
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(screenshotDir, '06_analytics_reports.png') });

  await browser.close();
  console.log('Screenshots captured successfully in', screenshotDir);
}

capture().catch(console.error);
