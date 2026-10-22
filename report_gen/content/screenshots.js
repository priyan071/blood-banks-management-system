const fs = require('fs');
const path = require('path');

const screenshotsDir = path.resolve(__dirname, '../../docs/screenshots');
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
const imgEligibility = getBase64Image('08_donor_eligibility.png');
const imgHospital = getBase64Image('09_hospital_dashboard.png');

module.exports = {
  getScreenshots: () => `
<!-- PAGE 50 -->
<div class="page main-page" data-page="50">
  <div class="chapter-header">
    <h2 class="chapter-title">SCREENSHOTS OF THE PROJECT</h2>
  </div>

  <div class="screenshot-container" style="margin-bottom: 25px;">
    <p class="screenshot-caption">Figure 7.1: User Authentication &amp; Multi-Role Evaluation Gateway</p>
    <img src="${imgLogin}" class="screenshot-img" alt="Login Page" />
    <p class="body-text" style="font-size: 9.5pt; margin-top: 4px;">
      <em>Interface showing multi-role login interface equipped with 1-click evaluation shortcuts for Admin, Donor, and Hospital.</em>
    </p>
  </div>

  <div class="screenshot-container">
    <p class="screenshot-caption">Figure 7.2: Executive Administrative Dashboard &amp; Real-Time Inventory</p>
    <img src="${imgAdmin}" class="screenshot-img" alt="Admin Dashboard" />
    <p class="body-text" style="font-size: 9.5pt; margin-top: 4px;">
      <em>Real-time operational dashboard showcasing available units, pending tests, registered donors, and blood group cards.</em>
    </p>
  </div>
</div>

<!-- PAGE 51 -->
<div class="page main-page" data-page="51">
  <div class="screenshot-container" style="margin-bottom: 25px;">
    <p class="screenshot-caption">Figure 7.3: Cold-Storage Blood Inventory Management Console</p>
    <img src="${imgInventory}" class="screenshot-img" alt="Inventory Management" />
    <p class="body-text" style="font-size: 9.5pt; margin-top: 4px;">
      <em>Detailed unit tracking grid showing unique unit serials (BLD-YYYY-XXXX), component types, expiration countdowns, and storage locations.</em>
    </p>
  </div>

  <div class="screenshot-container">
    <p class="screenshot-caption">Figure 7.4: Pathology Laboratory Screening &amp; Infectious Disease Diagnostics</p>
    <img src="${imgTesting}" class="screenshot-img" alt="Laboratory Testing" />
    <p class="body-text" style="font-size: 9.5pt; margin-top: 4px;">
      <em>Biological safety gatekeeper console where 5 TTI viral/parasitic markers (HIV, HBV, HCV, Syphilis, Malaria) are verified.</em>
    </p>
  </div>
</div>

<!-- PAGE 52 -->
<div class="page main-page" data-page="52">
  <div class="screenshot-container" style="margin-bottom: 25px;">
    <p class="screenshot-caption">Figure 7.5: Hospital Emergency Blood Requisition &amp; Priority Dispatch Station</p>
    <img src="${imgRequests}" class="screenshot-img" alt="Emergency Requests" />
    <p class="body-text" style="font-size: 9.5pt; margin-top: 4px;">
      <em>Priority-queue dispatcher displaying pending emergency requisitions tagged by urgency level with 1-click FIFO unit allocation.</em>
    </p>
  </div>

  <div class="screenshot-container">
    <p class="screenshot-caption">Figure 7.6: Donor Portal, Digital Card &amp; Clinical Vitals Self-Assessment</p>
    <img src="${imgDonor}" class="screenshot-img" alt="Donor Portal" />
    <p class="body-text" style="font-size: 9.5pt; margin-top: 4px;">
      <em>Voluntary donor self-service portal displaying digital donor identification card, donation history, and appointment booking.</em>
    </p>
  </div>
</div>
`
};
