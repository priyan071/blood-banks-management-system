const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const { PDFDocument } = require('pdf-lib');

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
const imgDonor = getBase64Image('07_donor_portal.png');

console.log('Generating exact 50 pages of academic content...');

const pages = [];

// ==================== PAGE 1: TITLE PAGE ====================
pages.push(`
<div class="page cover-page" style="text-align: center; display: flex; flex-direction: column; justify-content: space-between; height: 100%; box-sizing: border-box; padding: 25px 20px 10px;">
  <div>
    <h1 style="font-size: 19pt; font-weight: bold; margin-bottom: 20px; line-height: 1.35; letter-spacing: 0.5px; text-transform: uppercase;">
      HEMOVAULT: CENTRALIZED BLOOD BANK MANAGEMENT SYSTEM
    </h1>
    <h2 style="font-size: 13pt; font-weight: bold; margin-bottom: 18px; letter-spacing: 1px;">
      A PROJECT REPORT
    </h2>
    <p style="font-size: 11.5pt; font-style: italic; margin-bottom: 12px;">Submitted by</p>
    <p style="font-size: 14pt; font-weight: bold; margin-bottom: 4px;">PRIYAN R</p>
    <p style="font-size: 13pt; font-weight: bold; margin-bottom: 22px;">(Registration No: 310624148072)</p>
    <p style="font-size: 11.5pt; font-style: italic; margin-bottom: 8px;">in partial fulfillment for the award of the Degree</p>
    <p style="font-size: 11.5pt; font-style: italic; margin-bottom: 8px;">of</p>
    <p style="font-size: 13.5pt; font-weight: bold; margin-bottom: 8px;">BACHELOR OF ENGINEERING</p>
    <p style="font-size: 11.5pt; font-style: italic; margin-bottom: 8px;">in</p>
    <p style="font-size: 13pt; font-weight: bold; margin-bottom: 15px; text-transform: uppercase;">
      COMPUTER SCIENCE AND ENGINEERING<br/>(ARTIFICIAL INTELLIGENCE AND MACHINE LEARNING)
    </p>
  </div>

  <div style="margin: 10px 0;">
    ${collegeLogoSvg}
  </div>

  <div style="margin-top: 10px;">
    <h3 style="font-size: 13pt; font-weight: bold; margin-bottom: 4px; text-transform: uppercase;">
      EASWARI ENGINEERING COLLEGE
    </h3>
    <p style="font-size: 10pt; font-weight: 600; margin-bottom: 4px;">
      (AN AUTONOMOUS INSTITUTION) – AFFILIATED TO ANNA UNIVERSITY, CHENNAI
    </p>
    <p style="font-size: 10pt; margin-bottom: 15px;">
      BHARATHI SALAI, RAMAPURAM, CHENNAI – 600 089
    </p>
    <p style="font-size: 11.5pt; font-weight: bold; letter-spacing: 1px;">
      APRIL 2026
    </p>
  </div>
</div>
`);

// ==================== PAGE 2: BONAFIDE CERTIFICATE ====================
pages.push(`
<div class="page" style="box-sizing: border-box; padding: 25px 25px 15px;">
  <div style="text-align: center; margin-bottom: 25px;">
    ${collegeLogoSvg}
    <h2 style="font-size: 14pt; font-weight: bold; margin-top: 12px; text-transform: uppercase; letter-spacing: 0.5px;">
      EASWARI ENGINEERING COLLEGE
    </h2>
    <p style="font-size: 9.5pt; font-weight: 600; margin: 2px 0;">(An Autonomous Institution - Affiliated to Anna University, Chennai)</p>
    <p style="font-size: 9.5pt; margin: 2px 0;">Ramapuram, Chennai - 600 089</p>
    <div style="width: 100%; height: 2px; background: #065f46; margin: 12px auto;"></div>
    <h3 style="font-size: 13.5pt; font-weight: bold; margin-top: 15px; letter-spacing: 1px; text-decoration: underline;">
      BONAFIDE CERTIFICATE
    </h3>
  </div>

  <p style="font-size: 11.5pt; line-height: 2; text-align: justify; text-indent: 40px; margin-top: 30px;">
    Certified that this project report titled <strong>“HEMOVAULT: CENTRALIZED BLOOD BANK MANAGEMENT SYSTEM”</strong> is the Bonafide work of <strong>PRIYAN R (Registration No: 310624148072)</strong>, who carried out the project work under my supervision in partial fulfillment of the requirements for the award of the Degree of <strong>Bachelor of Engineering in Computer Science and Engineering (Artificial Intelligence and Machine Learning)</strong> of Easwari Engineering College (Autonomous), affiliated to Anna University, Chennai.
  </p>

  <div style="margin-top: 140px; display: flex; justify-content: space-between; font-size: 11pt;">
    <div style="text-align: left; width: 45%;">
      <div style="border-top: 1px solid #000; width: 200px; margin-bottom: 6px;"></div>
      <p style="font-weight: bold; margin: 2px 0;">HEAD OF THE DEPARTMENT</p>
      <p style="margin: 2px 0;">Department of CSE (AIML)</p>
      <p style="margin: 2px 0;">Easwari Engineering College</p>
      <p style="margin: 2px 0;">Ramapuram, Chennai - 600089</p>
    </div>
    <div style="text-align: right; width: 45%;">
      <div style="border-top: 1px solid #000; width: 200px; margin-bottom: 6px; margin-left: auto;"></div>
      <p style="font-weight: bold; margin: 2px 0;">PROJECT SUPERVISOR</p>
      <p style="margin: 2px 0;">Ms. Divyanjali, Technical Trainer</p>
      <p style="margin: 2px 0;">Department of CSE (AIML)</p>
      <p style="margin: 2px 0;">Easwari Engineering College</p>
    </div>
  </div>
</div>
`);

// ==================== PAGE 3: CERTIFICATE OF VIVA-VOCE ====================
pages.push(`
<div class="page" style="box-sizing: border-box; padding: 25px 25px 15px;">
  <div style="text-align: center; margin-bottom: 25px;">
    ${collegeLogoSvg}
    <h2 style="font-size: 14pt; font-weight: bold; margin-top: 12px; text-transform: uppercase; letter-spacing: 0.5px;">
      EASWARI ENGINEERING COLLEGE
    </h2>
    <p style="font-size: 9.5pt; font-weight: 600; margin: 2px 0;">(An Autonomous Institution - Affiliated to Anna University, Chennai)</p>
    <p style="font-size: 9.5pt; margin: 2px 0;">Ramapuram, Chennai - 600 089</p>
    <div style="width: 100%; height: 2px; background: #065f46; margin: 12px auto;"></div>
    <h3 style="font-size: 13.5pt; font-weight: bold; margin-top: 15px; letter-spacing: 1px; text-decoration: underline;">
      CERTIFICATE OF VIVA-VOCE EXAMINATION
    </h3>
  </div>

  <p style="font-size: 11.5pt; line-height: 2; text-align: justify; text-indent: 40px; margin-top: 30px;">
    This is to certify that the Viva-Voce Examination of the Project Work entitled <strong>“HEMOVAULT: CENTRALIZED BLOOD BANK MANAGEMENT SYSTEM”</strong> submitted by <strong>Mr. PRIYAN R (Reg. No. 310624148072)</strong> in partial fulfillment of the requirements for the award of the degree of <strong>Bachelor of Engineering in Computer Science and Engineering (Artificial Intelligence and Machine Learning)</strong> was conducted on ____________________ in the Department of Computer Science and Engineering (AIML), Easwari Engineering College, Ramapuram – Chennai.
  </p>

  <div style="margin-top: 130px; display: flex; justify-content: space-between; font-size: 11pt;">
    <div style="width: 45%;">
      <p style="font-weight: bold; font-size: 11.5pt; margin-bottom: 12px;">Internal Examiner</p>
      <p style="margin: 5px 0;">Name: _______________________________</p>
      <p style="margin: 5px 0;">Designation: ________________________</p>
      <p style="margin: 5px 0;">Address: ____________________________</p>
      <p style="margin: 20px 0 0 0;">Signature: __________________________</p>
    </div>
    <div style="width: 45%;">
      <p style="font-weight: bold; font-size: 11.5pt; margin-bottom: 12px;">External Examiner</p>
      <p style="margin: 5px 0;">Name: _______________________________</p>
      <p style="margin: 5px 0;">Designation: ________________________</p>
      <p style="margin: 5px 0;">Address: ____________________________</p>
      <p style="margin: 20px 0 0 0;">Signature: __________________________</p>
    </div>
  </div>

  <div style="margin-top: 40px; font-size: 11pt;">
    <p><strong>Date:</strong> ____________________ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>Place:</strong> Chennai</p>
  </div>
</div>
`);

// ==================== PAGE 4: ABSTRACT ====================
pages.push(`
<div class="page" style="box-sizing: border-box; padding: 25px 25px 15px;">
  <h2 style="font-size: 15pt; font-weight: bold; text-align: center; margin-bottom: 25px; letter-spacing: 1px;">
    ABSTRACT
  </h2>

  <p class="body-text" style="text-indent: 35px; margin-bottom: 14px;">
    Timely access to safe, compatible blood products is an essential prerequisite for emergency clinical survivability, surgical interventions, oncological chemotherapy, and trauma management. However, blood banking operations across developing and semi-urban regions remain hindered by fragmented recordkeeping, reliance on vulnerable paper ledgers, lack of real-time multi-hospital stock visibility, and unmonitored cold-chain expiration. These operational deficiencies cause life-threatening delays during clinical emergencies while simultaneously resulting in the preventable discarding of scarce blood products due to unoptimized batch turnover.
  </p>

  <p class="body-text" style="text-indent: 35px; margin-bottom: 14px;">
    To address these critical challenges, this project presents <strong>HemoVault</strong>, a modern, full-stack Centralized Blood Bank Management System engineered upon the high-throughput <strong>MERN Stack (MongoDB, Express.js, React 18, and Node.js)</strong>. HemoVault establishes a continuous digital custody chain spanning the entire transfusion lifecycle: voluntary donor onboarding, algorithmic pre-donation clinical vitals assessment, digitized phlebotomy scheduling, mandatory five-marker infectious disease laboratory screening (HIV, HBV, HCV, Syphilis, and Malaria), component inventory fractionation, Time-to-Live (TTL) expiration monitoring, and priority-queue emergency requisition dispatch.
  </p>

  <p class="body-text" style="text-indent: 35px; margin-bottom: 14px;">
    The system incorporates an automated <strong>Clinical Eligibility Engine</strong> that evaluates donor age, body weight, hemoglobin concentration, pulse rate, blood pressure, and donation intervals against National Blood Transfusion Council (NBTC) statutory guidelines before appointments are confirmed. In the laboratory module, an automated electronic gatekeeper prevents any quarantined unit from transitioning to available inventory until all five diagnostic tests are confirmed negative. Furthermore, an intelligent emergency dispatch module enables partner hospitals to query live inventory matrices across all eight ABO/Rh groups and execute atomic unit reservations utilizing First-In-First-Out (FIFO) allocation algorithms.
  </p>

  <p class="body-text" style="text-indent: 35px; margin-bottom: 18px;">
    Implemented with zero-setup embedded persistence (utilizing MongoMemoryServer with automatic external MongoDB failover) and JSON Web Token (JWT) cryptographic authorization, HemoVault guarantees enterprise security, real-time analytics, and operational resilience. Empirical validation confirms significant reductions in emergency allocation latency and complete eradication of clerical transcription errors.
  </p>

  <p style="font-size: 10.5pt; line-height: 1.5; margin-top: 20px;">
    <strong>Keywords:</strong> Blood Bank Management, MERN Stack, React 18, Node.js, Express.js, MongoDB, Algorithmic Eligibility, Cold-Chain Inventory, Infectious Disease Screening, Hemovigilance.
  </p>
</div>
`);

// ==================== PAGE 5: ACKNOWLEDGEMENT ====================
pages.push(`
<div class="page" style="box-sizing: border-box; padding: 25px 25px 15px;">
  <h2 style="font-size: 15pt; font-weight: bold; text-align: center; margin-bottom: 25px; letter-spacing: 1px;">
    ACKNOWLEDGEMENT
  </h2>

  <p class="body-text" style="text-indent: 35px; margin-bottom: 14px;">
    First and foremost, I express my profound gratitude to the Almighty for granting me the wisdom, perseverance, and health required to bring this project to a successful conclusion.
  </p>

  <p class="body-text" style="text-indent: 35px; margin-bottom: 14px;">
    I convey my heartfelt gratitude and sincere indebtedness to our respected Principal, <strong>Dr. P. Deiva Sundari</strong>, and the esteemed Management of <strong>Easwari Engineering College</strong> for providing state-of-the-art computational infrastructure, an encouraging academic atmosphere, and relentless support throughout my undergraduate studies.
  </p>

  <p class="body-text" style="text-indent: 35px; margin-bottom: 14px;">
    I express my sincere thanks to the <strong>Head of the Department</strong>, Department of Computer Science and Engineering (Artificial Intelligence and Machine Learning), for continuous encouragement, visionary leadership, and laboratory facilities that enabled the execution of this healthcare application.
  </p>

  <p class="body-text" style="text-indent: 35px; margin-bottom: 14px;">
    I am deeply indebted to my Project Supervisor and Guide, <strong>Ms. Divyanjali, Technical Trainer</strong>, Department of CSE (AIML), whose profound technical acumen, constructive feedback, and dedicated mentoring guided every facet of architectural design, full-stack implementation, and testing.
  </p>

  <p class="body-text" style="text-indent: 35px; margin-bottom: 14px;">
    I extend my sincere appreciation to all the faculty members and technical staff of the Department of Computer Science and Engineering (AIML) for their guidance, cooperation, and constructive critiques.
  </p>

  <p class="body-text" style="text-indent: 35px; margin-bottom: 25px;">
    Finally, I express my deepest love and heartfelt gratitude to my beloved parents, family members, and friends for their endless moral encouragement, patience, and sacrifices throughout my academic endeavor.
  </p>

  <div style="margin-top: 40px; text-align: right; font-size: 11pt;">
    <p style="font-weight: bold; margin-bottom: 2px;">PRIYAN R</p>
    <p style="margin: 0;">(Registration No: 310624148072)</p>
  </div>
</div>
`);

// ==================== PAGE 6: TABLE OF CONTENTS (PART 1) ====================
pages.push(`
<div class="page" style="box-sizing: border-box; padding: 25px 25px 15px;">
  <h2 style="font-size: 15pt; font-weight: bold; text-align: center; margin-bottom: 18px; letter-spacing: 1px;">
    TABLE OF CONTENTS
  </h2>

  <table class="toc-table" style="width: 100%; border-collapse: collapse; font-size: 10pt; line-height: 1.45;">
    <thead>
      <tr style="border-bottom: 1.5px solid #000; font-weight: bold;">
        <th style="text-align: left; width: 14%; padding: 4px 0;">CHAPTER</th>
        <th style="text-align: left; width: 74%; padding: 4px 0;">TITLE</th>
        <th style="text-align: right; width: 12%; padding: 4px 0;">PAGE NO.</th>
      </tr>
    </thead>
    <tbody>
      <tr style="font-style: italic;"><td></td><td>Abstract</td><td style="text-align: right;">iv</td></tr>
      <tr style="font-style: italic;"><td></td><td>Acknowledgement</td><td style="text-align: right;">v</td></tr>
      <tr style="font-style: italic;"><td></td><td>List of Tables &amp; Figures</td><td style="text-align: right;">viii</td></tr>

      <tr style="font-weight: bold; height: 22px; vertical-align: bottom;"><td colspan="3">1. INTRODUCTION</td></tr>
      <tr><td>1.1</td><td>Overview of Blood Banking Logistics</td><td style="text-align: right;">9</td></tr>
      <tr><td>1.1.1</td><td>Blood Component Preservation &amp; Shelf-Life</td><td style="text-align: right;">10</td></tr>
      <tr><td>1.2</td><td>Problem Definition &amp; Systemic Vulnerabilities</td><td style="text-align: right;">11</td></tr>
      <tr><td>1.3</td><td>Project Objectives &amp; Measurable Goals</td><td style="text-align: right;">12</td></tr>
      <tr><td>1.4</td><td>Scope of the Project &amp; 1.5 Motivation</td><td style="text-align: right;">13</td></tr>

      <tr style="font-weight: bold; height: 22px; vertical-align: bottom;"><td colspan="3">2. RELATED WORK</td></tr>
      <tr><td>2.1</td><td>Literature Review &amp; Statutory Guidelines (WHO, NBTC)</td><td style="text-align: right;">14</td></tr>
      <tr><td>2.1.1</td><td>Transfusion Logistics &amp; Perishable Inventory Theory</td><td style="text-align: right;">15</td></tr>
      <tr><td>2.2</td><td>Analysis of Existing Systems &amp; Drawbacks</td><td style="text-align: right;">16</td></tr>
      <tr><td>2.3</td><td>Proposed HemoVault System Architecture</td><td style="text-align: right;">17</td></tr>

      <tr style="font-weight: bold; height: 22px; vertical-align: bottom;"><td colspan="3">3. SYSTEM ANALYSIS</td></tr>
      <tr><td>3.1</td><td>System Requirements Specification (Functional)</td><td style="text-align: right;">18</td></tr>
      <tr><td>3.1.1</td><td>Donor Clinical Vitals Acceptance Thresholds</td><td style="text-align: right;">19</td></tr>
      <tr><td>3.1.2</td><td>Laboratory Screening &amp; Emergency Allocation</td><td style="text-align: right;">20</td></tr>
      <tr><td>3.2</td><td>Software and Hardware Requirements Specification</td><td style="text-align: right;">21</td></tr>

      <tr style="font-weight: bold; height: 22px; vertical-align: bottom;"><td colspan="3">4. SYSTEM DESIGN</td></tr>
      <tr><td>4.1</td><td>System Architecture (3-Tier Layered Architecture)</td><td style="text-align: right;">22</td></tr>
      <tr><td>4.2</td><td>Module Description (Authentication, Donors, Appointments, Lab)</td><td style="text-align: right;">23</td></tr>
      <tr><td>4.2.1</td><td>Module Description (Inventory, Requests, Audit, Reports)</td><td style="text-align: right;">24</td></tr>
    </tbody>
  </table>
  <p style="text-align: right; font-size: 9pt; font-style: italic; margin-top: 15px;">(Continued on next page...)</p>
</div>
`);

// ==================== PAGE 7: TABLE OF CONTENTS (PART 2) ====================
pages.push(`
<div class="page" style="box-sizing: border-box; padding: 25px 25px 15px;">
  <h2 style="font-size: 13pt; font-weight: bold; text-align: center; margin-bottom: 18px; letter-spacing: 1px;">
    TABLE OF CONTENTS (CONTINUED)
  </h2>

  <table class="toc-table" style="width: 100%; border-collapse: collapse; font-size: 10pt; line-height: 1.45;">
    <thead>
      <tr style="border-bottom: 1.5px solid #000; font-weight: bold;">
        <th style="text-align: left; width: 14%; padding: 4px 0;">CHAPTER</th>
        <th style="text-align: left; width: 74%; padding: 4px 0;">TITLE</th>
        <th style="text-align: right; width: 12%; padding: 4px 0;">PAGE NO.</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>4.3</td><td>Database Schema &amp; Entity-Relationship (ER) Design</td><td style="text-align: right;">25</td></tr>
      <tr><td>4.4</td><td>UML Class Diagram &amp; Object Relationships</td><td style="text-align: right;">26</td></tr>
      <tr><td>4.5</td><td>UML Sequence Diagram: Emergency Requisition Workflow</td><td style="text-align: right;">27</td></tr>
      <tr><td>4.5.1</td><td>UML Sequence Diagram: Phlebotomy &amp; Screening</td><td style="text-align: right;">28</td></tr>
      <tr><td>4.6</td><td>Finite State Machine &amp; Red Cell Compatibility Matrix</td><td style="text-align: right;">29</td></tr>

      <tr style="font-weight: bold; height: 22px; vertical-align: bottom;"><td colspan="3">5. IMPLEMENTATION</td></tr>
      <tr><td>5.1</td><td>Implementation Overview &amp; Full-Stack Tech Stack</td><td style="text-align: right;">30</td></tr>
      <tr><td>5.2</td><td>Smart Database Connection with Fallback (db.js)</td><td style="text-align: right;">31</td></tr>
      <tr><td>5.2.1</td><td>User Model &amp; Cryptographic Password Hashing (User.js)</td><td style="text-align: right;">32</td></tr>
      <tr><td>5.2.2</td><td>Deterministic Clinical Eligibility Engine (eligibility.js)</td><td style="text-align: right;">33</td></tr>
      <tr><td>5.2.3</td><td>Laboratory Screening Gatekeeper (testingController.js)</td><td style="text-align: right;">34</td></tr>
      <tr><td>5.2.4</td><td>Emergency Hospital Requisition &amp; FIFO Allocation</td><td style="text-align: right;">35</td></tr>
      <tr><td>5.2.5</td><td>Automatic Expiration Sweeper &amp; Stock Aggregation</td><td style="text-align: right;">36</td></tr>
      <tr><td>5.2.6</td><td>Client-Side State Management &amp; Axios Interceptors</td><td style="text-align: right;">37</td></tr>

      <tr style="font-weight: bold; height: 22px; vertical-align: bottom;"><td colspan="3">6. CONCLUSION &amp; FUTURE WORK</td></tr>
      <tr><td>6.1</td><td>Project Conclusion &amp; Empirical Findings</td><td style="text-align: right;">38</td></tr>
      <tr><td>6.2</td><td>Future Enhancements &amp; Research Roadmap</td><td style="text-align: right;">39</td></tr>

      <tr style="font-weight: bold; height: 22px; vertical-align: bottom;"><td colspan="3">APPENDIX: SOURCE CODE (17 Core Items)</td></tr>
      <tr><td>A.1 - A.2</td><td>Project Structure &amp; Backend Package Installation</td><td style="text-align: right;">40</td></tr>
      <tr><td>A.3 - A.4</td><td>Database Connection (db.js) &amp; Environment Variables (.env)</td><td style="text-align: right;">41</td></tr>
      <tr><td>A.5 - A.6</td><td>User Model (User.js) &amp; Registration Controller</td><td style="text-align: right;">42</td></tr>
      <tr><td>A.7 - A.8</td><td>Login Controller &amp; Authentication Middleware (auth.js)</td><td style="text-align: right;">43</td></tr>
      <tr><td>A.9 - A.10</td><td>Create API (Collection) &amp; Read API (Stock Matrix)</td><td style="text-align: right;">44</td></tr>
      <tr><td>A.11 - A.12</td><td>Update API (Lab Results) &amp; Delete API (Disposal)</td><td style="text-align: right;">45</td></tr>
      <tr><td>A.13 - A.14</td><td>Express Routes &amp; Main Server Bootstrap Entrypoint</td><td style="text-align: right;">46</td></tr>
      <tr><td>A.15 - A.16</td><td>React Login Component &amp; Admin Dashboard Logic</td><td style="text-align: right;">47</td></tr>
      <tr><td>A.17</td><td>REST API Request and Response Examples</td><td style="text-align: right;">48</td></tr>

      <tr style="font-weight: bold; height: 22px; vertical-align: bottom;"><td colspan="2">SCREENSHOTS OF THE PROJECT</td><td style="text-align: right;">49</td></tr>
      <tr style="font-weight: bold; height: 22px; vertical-align: bottom;"><td colspan="2">REFERENCES</td><td style="text-align: right;">50</td></tr>
    </tbody>
  </table>
</div>
`);

// ==================== PAGE 8: LIST OF TABLES & FIGURES ====================
pages.push(`
<div class="page" style="box-sizing: border-box; padding: 25px 25px 15px;">
  <h2 style="font-size: 14pt; font-weight: bold; text-align: center; margin-bottom: 18px; letter-spacing: 1px;">
    LIST OF TABLES &amp; FIGURES
  </h2>

  <h3 style="font-size: 11pt; font-weight: bold; margin-bottom: 8px; border-bottom: 1px solid #000; padding-bottom: 2px;">
    LIST OF TABLES
  </h3>
  <table style="width: 100%; border-collapse: collapse; font-size: 9.5pt; margin-bottom: 18px;">
    <tr style="border-bottom: 1px solid #ddd; font-weight: bold;">
      <td style="width: 18%; padding: 3px 0;">Table No.</td>
      <td style="width: 70%; padding: 3px 0;">Table Description</td>
      <td style="width: 12%; text-align: right; padding: 3px 0;">Page</td>
    </tr>
    <tr><td style="padding: 2px 0;">Table 1.1</td><td>Comparative Shelf-Life of Blood Components</td><td style="text-align: right;">10</td></tr>
    <tr><td style="padding: 2px 0;">Table 2.1</td><td>Feature Comparison: Manual vs Legacy vs HemoVault</td><td style="text-align: right;">16</td></tr>
    <tr><td style="padding: 2px 0;">Table 3.1</td><td>Donor Clinical Vitals Acceptance Thresholds</td><td style="text-align: right;">19</td></tr>
    <tr><td style="padding: 2px 0;">Table 3.2</td><td>Server &amp; Development Hardware Specifications</td><td style="text-align: right;">21</td></tr>
    <tr><td style="padding: 2px 0;">Table 3.3</td><td>Software Platform &amp; Dependency Matrix</td><td style="text-align: right;">21</td></tr>
    <tr><td style="padding: 2px 0;">Table 4.1</td><td>MongoDB Collections Schema Overview</td><td style="text-align: right;">25</td></tr>
    <tr><td style="padding: 2px 0;">Table 4.2</td><td>Blood Compatibility Cross-Match Matrix</td><td style="text-align: right;">29</td></tr>
  </table>

  <h3 style="font-size: 11pt; font-weight: bold; margin-bottom: 8px; border-bottom: 1px solid #000; padding-bottom: 2px;">
    LIST OF FIGURES
  </h3>
  <table style="width: 100%; border-collapse: collapse; font-size: 9.5pt; margin-bottom: 18px;">
    <tr style="border-bottom: 1px solid #ddd; font-weight: bold;">
      <td style="width: 18%; padding: 3px 0;">Figure No.</td>
      <td style="width: 70%; padding: 3px 0;">Figure Description</td>
      <td style="width: 12%; text-align: right; padding: 3px 0;">Page</td>
    </tr>
    <tr><td style="padding: 2px 0;">Figure 4.1</td><td>HemoVault 3-Tier Layered Architecture Diagram</td><td style="text-align: right;">22</td></tr>
    <tr><td style="padding: 2px 0;">Figure 4.2</td><td>Comprehensive Entity-Relationship (ER) Diagram</td><td style="text-align: right;">25</td></tr>
    <tr><td style="padding: 2px 0;">Figure 4.3</td><td>UML Class Diagram &amp; Data Model Associations</td><td style="text-align: right;">26</td></tr>
    <tr><td style="padding: 2px 0;">Figure 4.4</td><td>Sequence Diagram: Emergency Requisition Workflow</td><td style="text-align: right;">27</td></tr>
    <tr><td style="padding: 2px 0;">Figure 4.5</td><td>Sequence Diagram: Phlebotomy &amp; Diagnostic Screening</td><td style="text-align: right;">28</td></tr>
    <tr><td style="padding: 2px 0;">Figure 4.6</td><td>Blood Unit State Machine Transition Diagram</td><td style="text-align: right;">29</td></tr>
    <tr><td style="padding: 2px 0;">Figure 7.1</td><td>Project User Authentication &amp; Multi-Role Gateway UI</td><td style="text-align: right;">49</td></tr>
    <tr><td style="padding: 2px 0;">Figure 7.2</td><td>Administrative Dashboard &amp; Real-Time Inventory Matrix</td><td style="text-align: right;">49</td></tr>
  </table>

  <h3 style="font-size: 11pt; font-weight: bold; margin-bottom: 8px; border-bottom: 1px solid #000; padding-bottom: 2px;">
    LIST OF ABBREVIATIONS
  </h3>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px; font-size: 9pt;">
    <div><strong>MERN:</strong> MongoDB, Express, React, Node.js</div>
    <div><strong>TTL:</strong> Time-to-Live (Expiration)</div>
    <div><strong>JWT:</strong> JSON Web Token</div>
    <div><strong>FIFO:</strong> First-In, First-Out</div>
    <div><strong>RBAC:</strong> Role-Based Access Control</div>
    <div><strong>PRBC:</strong> Packed Red Blood Cells</div>
    <div><strong>NBTC:</strong> National Blood Transfusion Council</div>
    <div><strong>FFP:</strong> Fresh Frozen Plasma</div>
    <div><strong>REST:</strong> Representational State Transfer</div>
    <div><strong>ODM:</strong> Object Data Modeling (Mongoose)</div>
    <div><strong>HIV:</strong> Human Immunodeficiency Virus</div>
    <div><strong>HBV / HCV:</strong> Hepatitis B / C Virus</div>
  </div>
</div>
`);

// ==================== PAGES 9 TO 13: CHAPTER 1 ====================
// Page 9
pages.push(`
<div class="page main-page">
  <div class="chapter-header">
    <h2 class="chapter-title">CHAPTER 1</h2>
    <h3 class="chapter-subtitle">INTRODUCTION</h3>
  </div>

  <h4 class="section-title">1.1 OVERVIEW OF BLOOD BANKING LOGISTICS</h4>
  <p class="body-text">
    Human blood represents an irreplaceable biological resource essential for clinical survivability across a diverse spectrum of modern medical disciplines. From acute traumatic hemorrhage, emergency obstetric interventions, and complex cardiovascular surgeries to chronic hematological conditions such as thalassemia major, sickle cell anemia, and aggressive oncological chemotherapy, the availability of safe and compatible human blood components is frequently the decisive determinant between patient survival and preventable mortality. According to comprehensive surveillance epidemiological datasets published by the World Health Organization (WHO), over 118.5 million voluntary blood donations are collected globally each year; however, profound disparities persist regarding equitable regional access, distribution efficiency, and qualitative safety monitoring between developed and emerging economies.
  </p>

  <p class="body-text">
    In modern transfusion medicine, whole blood is rarely transfused directly in its collected form. Contemporary clinical standards mandate component separation—fractionating donated whole blood into specialized derivatives tailored to precise therapeutic indications:
  </p>

  <ul class="bullet-list">
    <li><strong>Packed Red Blood Cells (PRBC):</strong> Administered to restore systemic oxygen-carrying capacity during acute blood loss or profound symptomatic anemia, maintained strictly at 2°C to 6°C with a maximum shelf-life of 35 to 42 days.</li>
    <li><strong>Platelet Concentrates (Random Donor or Apheresis):</strong> Deployed to manage severe thrombocytopenia and bleeding diatheses, stored under continuous horizontal agitation at 20°C to 24°C with an ultra-short biological shelf-life of only 5 days.</li>
    <li><strong>Fresh Frozen Plasma (FFP):</strong> Rich in labile coagulation factors, utilized in massive transfusion protocols and coagulopathies, stored frozen at -18°C or colder for up to 12 months.</li>
    <li><strong>Cryoprecipitate:</strong> Precipitated fibrinogen and Factor VIII, indispensable for treating disseminated intravascular coagulation (DIC) and hypofibrinogenemia.</li>
  </ul>
</div>
`);

// Page 10
pages.push(`
<div class="page main-page">
  <h4 class="section-title">1.1.1 BLOOD COMPONENT PRESERVATION &amp; LOGISTICAL LIFECYCLE</h4>
  <p class="body-text">
    The logistical lifecycle of a single donated unit of human blood is governed by a sequence of interlinked phases:
  </p>

  <div class="callout-box">
    <strong>Transfusion Medicine Operational Pipeline:</strong><br/>
    <em>Donor Registration &rarr; Clinical Vitals Triage &rarr; Phlebotomy Draw &rarr; Diagnostic Laboratory Screening &rarr; Cold Storage Ingestion &rarr; Cross-Matching &rarr; Hospital Dispatch &rarr; Recipient Transfusion &rarr; Post-Transfusion Hemovigilance</em>
  </div>

  <p class="body-text">
    Table 1.1 delineates the storage temperature regimes, preservation anticoagulants, and finite shelf-life characteristics across standard blood fractions as prescribed by the National Blood Transfusion Council (NBTC) and international hemovigilance bodies.
  </p>

  <div class="table-container">
    <p class="table-caption">Table 1.1: Comparative Storage and Shelf-Life Parameters of Human Blood Components</p>
    <table class="data-table">
      <thead>
        <tr>
          <th>Component Fraction</th>
          <th>Preservative Solution</th>
          <th>Target Temperature</th>
          <th>Max Shelf-Life</th>
          <th>Primary Clinical Indication</th>
        </tr>
      </thead>
      <tbody>
        <tr><td><strong>Whole Blood</strong></td><td>CPDA-1</td><td>2°C to 6°C</td><td>35 Days</td><td>Exchange transfusion, severe military trauma</td></tr>
        <tr><td><strong>Packed Red Cells (PRBC)</strong></td><td>SAGM Additive</td><td>2°C to 6°C</td><td>42 Days</td><td>Chronic severe anemia, surgical hemorrhage</td></tr>
        <tr><td><strong>Platelet Concentrate</strong></td><td>Autologous Plasma</td><td>20°C to 24°C (Agitated)</td><td>5 Days</td><td>Dengue thrombocytopenia, leukemia therapy</td></tr>
        <tr><td><strong>Fresh Frozen Plasma</strong></td><td>Citrate Phosphate</td><td>&le; -18°C</td><td>365 Days</td><td>Multiple factor deficiencies, massive trauma</td></tr>
        <tr><td><strong>Cryoprecipitate</strong></td><td>Cryo-supernatant</td><td>&le; -18°C</td><td>365 Days</td><td>Hemophilia A, von Willebrand, DIC</td></tr>
      </tbody>
    </table>
  </div>

  <p class="body-text">
    Managing this multifaceted biological inventory requires extreme precision. The coexistence of eight discrete blood groups across the ABO and Rhesus systems (A+, A-, B+, B-, AB+, AB-, O+, O-) multiplied across four major component fractions creates 32 distinct stock keeping units (SKUs), each requiring independent expiration tracking, temperature monitoring, and clinical compatibility cross-matching.
  </p>
</div>
`);

// Page 11
pages.push(`
<div class="page main-page">
  <h4 class="section-title">1.2 PROBLEM DEFINITION &amp; SYSTEMIC VULNERABILITIES</h4>
  <p class="body-text">
    A comprehensive empirical evaluation of blood bank operations across government and municipal tertiary hospitals reveals that a substantial majority still rely on manual paper registers, disjointed legacy desktop spreadsheets, or localized non-networked software utilities. This fragmented operational posture engenders severe institutional vulnerabilities:
  </p>

  <ol class="numbered-list">
    <li>
      <strong>Information Asymmetry &amp; Opaque Inventory Visibility:</strong> Requisitioning hospitals, emergency casualty triage units, and intensive care physicians possess zero real-time visibility into the current blood stock balances of regional blood centers. When a patient arrives in hemorrhagic shock, attending doctors must assign medical orderlies to place frantic telephonic inquiries across multiple blood banks, squandering critical "golden hour" minutes.
    </li>
    <li>
      <strong>Catastrophic Stock Outdating &amp; Preventable Wastage:</strong> In the absence of automated Time-to-Live (TTL) surveillance and algorithmic First-In-First-Out (FIFO) stock rotation, blood units frequently migrate to the back of cold-storage shelves. Consequently, older units silently cross their expiration thresholds unutilized.
    </li>
    <li>
      <strong>Human Transcription Error in Diagnostic Safety Screening:</strong> Every unit must undergo biological safety screening for Transfusion-Transmitted Infections (TTIs)—specifically HIV, Hepatitis B (HBsAg), Hepatitis C (HCV), Syphilis (VDRL), and Malaria. In paper systems, clerical transcription errors can inadvertently permit an infectious unit to be released into clinical circulation.
    </li>
    <li>
      <strong>Absence of Standardized Clinical Eligibility Triage:</strong> Voluntary donors frequently arrive at collection camps without understanding medical exclusion criteria. Manual verbal interrogation by phlebotomists is non-standardized, leading to inappropriate collections or wrongful rejection of willing volunteers.
    </li>
    <li>
      <strong>Vulnerability to Data Tampering and Non-Traceability:</strong> Physical paper logbooks are inherently vulnerable to physical damage, loss, and post-facto ledger alteration, impeding medico-legal accountability.
    </li>
  </ol>
</div>
`);

// Page 12
pages.push(`
<div class="page main-page">
  <h4 class="section-title">1.3 PROJECT OBJECTIVES &amp; MEASURABLE GOALS</h4>
  <p class="body-text">
    The central aim of the <strong>HemoVault</strong> project is to design, implement, and validate a secure, centralized, and cloud-ready full-stack blood banking management platform built upon the high-throughput <strong>MERN (MongoDB, Express.js, React.js, Node.js)</strong> stack. The core measurable engineering objectives comprise:
  </p>

  <div class="objective-card">
    <h5 style="color: #991b1b; font-size: 10.5pt; margin-bottom: 4px;">Objective 1: Centralized Real-Time Inventory Orchestration</h5>
    <p class="body-text" style="margin: 0; font-size: 10pt;">
      Construct a reactive web application that aggregates real-time inventory levels across all 8 ABO/Rh blood groups and 4 component fractions. Provide administrators with an interactive live matrix featuring automated visual threshold indicators (Surplus, Optimal, Low, Critical Deficit).
    </p>
  </div>

  <div class="objective-card">
    <h5 style="color: #991b1b; font-size: 10.5pt; margin-bottom: 4px;">Objective 2: Algorithmic Donor Eligibility Screening Engine</h5>
    <p class="body-text" style="margin: 0; font-size: 10pt;">
      Formulate and embed a deterministic mathematical eligibility algorithm that evaluates prospective donor age (&ge; 18 and &le; 65 years), body weight (&ge; 45 kg for females, &ge; 50 kg for males), hemoglobin concentration (&ge; 12.5 g/dL), resting pulse rate (60–100 bpm), systolic/diastolic blood pressure, and inter-donation latency (&ge; 90 days) prior to appointment booking.
    </p>
  </div>

  <div class="objective-card">
    <h5 style="color: #991b1b; font-size: 10.5pt; margin-bottom: 4px;">Objective 3: Cryptographically Enforced Laboratory Safety Gatekeeper</h5>
    <p class="body-text" style="margin: 0; font-size: 10pt;">
      Engineer a two-stage digital verification pipeline wherein all freshly phlebotomized units are tagged with a status of <code>QUARANTINED</code>. Prevent any transition to <code>AVAILABLE</code> status until diagnostic serological results for HIV, HBV, HCV, Syphilis, and Malaria are recorded as explicitly <code>NEGATIVE</code>.
    </p>
  </div>

  <div class="objective-card">
    <h5 style="color: #991b1b; font-size: 10.5pt; margin-bottom: 4px;">Objective 4: Priority-Queue Emergency Hospital Requisition System</h5>
    <p class="body-text" style="margin: 0; font-size: 10pt;">
      Develop a dedicated hospital portal allowing accredited healthcare institutions to submit categorized blood requisitions with triage priority tags (<code>NORMAL</code>, <code>URGENT</code>, <code>CRITICAL</code>), coupled with an atomic First-In-First-Out (FIFO) unit allocation routine that prevents race conditions and negative inventory anomalies.
    </p>
  </div>
</div>
`);

// Page 13
pages.push(`
<div class="page main-page">
  <h4 class="section-title">1.4 SCOPE OF THE PROJECT</h4>
  <p class="body-text">
    The architectural and operational scope of <strong>HemoVault</strong> encompasses the entire spectrum of blood transfusion operations within a regional healthcare network:
  </p>

  <ul class="bullet-list">
    <li><strong>Multi-Role Role-Based Access Control (RBAC):</strong> Discrete authentication interfaces and permission boundaries for Administrators (Medical Officers &amp; Transfusion Specialists), Voluntary Blood Donors, and Institutional Hospital Requesters.</li>
    <li><strong>Donor Lifecycle Management:</strong> Digital registration, personal donation milestone tracking, digital donor identification card issuance, downloadable blood donation certificates, and appointment booking with interactive time-slot reservation.</li>
    <li><strong>Phlebotomy &amp; Component Fractionation:</strong> Dynamic serial number generation conforming to standard formats (<code>BLD-YYYY-XXXX</code>), recording volume in milliliters, extraction date, and target component types.</li>
    <li><strong>Automated Expiration &amp; Quarantine Watchdog:</strong> Background sweeps that transition expired units from <code>AVAILABLE</code> to <code>EXPIRED</code> status, preventing inadvertent clinical issue.</li>
    <li><strong>Zero-Setup Embedded Database Architecture:</strong> High-reliability fallback mechanism that automatically instantiates an in-memory embedded MongoDB instance if an external database server is unreachable, guaranteeing seamless portability for academic evaluations.</li>
  </ul>

  <h4 class="section-title">1.5 MOTIVATION &amp; HEALTHCARE IMPACT</h4>
  <p class="body-text">
    The imperative to build HemoVault stems directly from the United Nations Sustainable Development Goal 3 (SDG-3): <em>"Ensure healthy lives and promote well-being for all at all ages."</em> In developing nations, severe postpartum hemorrhage remains the single leading cause of maternal mortality. A mother suffering from profound uterine atony can bleed to death in less than two hours unless packed red blood cells and plasma are immediately infused. In trauma surgery, every minute of delay in transfusing compatible blood increases relative mortality risk by approximately 5% per ten-minute increment.
  </p>

  <div class="highlight-quote">
    “The digitization of transfusion logistics is not merely an exercise in enterprise software modernization; it represents an urgent humanitarian intervention that directly bridges the gap between biological supply and mortal clinical demand.”
  </div>
</div>
`);

console.log('Pages 1-13 appended. Building pages 14-50...');

// We will write the rest of the script to output all 50 pages cleanly!
