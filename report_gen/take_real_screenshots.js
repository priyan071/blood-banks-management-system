const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function run() {
  const screenshotDir = path.resolve(__dirname, '../docs/screenshots');
  fs.mkdirSync(screenshotDir, { recursive: true });

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 960, deviceScaleFactor: 2 });

  // 1. Login Page
  console.log('Capturing Login Page...');
  await page.goto('http://localhost:5173/login', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: path.join(screenshotDir, '01_login_page.png') });

  // Login via API to get token
  const loginRes = await page.evaluate(async () => {
    const res = await fetch('http://localhost:5001/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@bloodbank.org', password: 'Password@123' })
    });
    return await res.json();
  });

  console.log('Admin login status:', loginRes.success);
  if (loginRes.token) {
    await page.evaluate((data) => {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }, loginRes);

    // 2. Admin Dashboard
    console.log('Capturing Admin Dashboard...');
    await page.goto('http://localhost:5173/admin', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 1200));
    await page.screenshot({ path: path.join(screenshotDir, '02_admin_dashboard.png') });

    // 3. Admin Inventory
    console.log('Capturing Admin Inventory...');
    await page.goto('http://localhost:5173/admin/inventory', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 1200));
    await page.screenshot({ path: path.join(screenshotDir, '03_inventory_management.png') });

    // 4. Admin Testing Lab
    console.log('Capturing Lab Testing...');
    await page.goto('http://localhost:5173/admin/testing', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 1200));
    await page.screenshot({ path: path.join(screenshotDir, '04_laboratory_screening.png') });

    // 5. Emergency Requests
    console.log('Capturing Emergency Requests...');
    await page.goto('http://localhost:5173/admin/requests', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 1200));
    await page.screenshot({ path: path.join(screenshotDir, '05_emergency_requests.png') });

    // 6. Reports & Analytics
    console.log('Capturing Reports & Analytics...');
    await page.goto('http://localhost:5173/admin/reports', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 1200));
    await page.screenshot({ path: path.join(screenshotDir, '06_analytics_reports.png') });
  }

  // Donor login
  const donorRes = await page.evaluate(async () => {
    const res = await fetch('http://localhost:5001/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'priyan.donor@gmail.com', password: 'Password@123' })
    });
    return await res.json();
  });

  if (donorRes.token) {
    await page.evaluate((data) => {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }, donorRes);

    // 7. Donor Portal
    console.log('Capturing Donor Portal...');
    await page.goto('http://localhost:5173/donor', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 1200));
    await page.screenshot({ path: path.join(screenshotDir, '07_donor_portal.png') });

    // 8. Donor Eligibility Check
    console.log('Capturing Eligibility Check...');
    await page.goto('http://localhost:5173/donor/eligibility', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 1200));
    await page.screenshot({ path: path.join(screenshotDir, '08_donor_eligibility.png') });
  }

  // Hospital Requester login
  const hospRes = await page.evaluate(async () => {
    const res = await fetch('http://localhost:5001/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'apollo@hospital.org', password: 'Password@123' })
    });
    return await res.json();
  });

  if (hospRes.token) {
    await page.evaluate((data) => {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }, hospRes);

    // 9. Hospital Dashboard
    console.log('Capturing Hospital Dashboard...');
    await page.goto('http://localhost:5173/requester', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 1200));
    await page.screenshot({ path: path.join(screenshotDir, '09_hospital_dashboard.png') });
  }

  await browser.close();
  console.log('All 9 real screenshots captured perfectly!');
}

run().catch(console.error);
