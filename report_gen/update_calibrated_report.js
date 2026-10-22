const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const { collegeLogoSvg, architectureSvg, classDiagramSvg, sequenceEmergencySvg, sequenceDonationSvg } = require('./content/diagrams');

const screenshotsDir = path.resolve(__dirname, '../docs/screenshots');
const getBase64Image = (filename) => {
  const filePath = path.join(screenshotsDir, filename);
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath);
    return `data:image/png;base64,${data.toString('base64')}`;
  }
  return '';
};

const imgLogin = getBase64Image('01_login_page.png');
const imgAdmin = getBase64Image('02_admin_dashboard.png');
const imgInventory = getBase64Image('03_inventory_management.png');
const imgTesting = getBase64Image('04_laboratory_screening.png');
const imgRequests = getBase64Image('05_emergency_requests.png');
const imgReports = getBase64Image('06_analytics_reports.png');
const imgDonor = getBase64Image('07_donor_portal.png');

console.log('Building calibrated 52-page document structure...');
