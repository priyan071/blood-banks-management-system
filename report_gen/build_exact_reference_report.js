const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const { PDFDocument } = require('pdf-lib');
const docx = require('docx');
const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, Table, TableRow, TableCell, WidthType, BorderStyle } = docx;

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
const imgRequests = getBase64Image('05_emergency_requests.png');

console.log('Generating exact 50-page report matching reference PDF styling...');

const pages = [];

// ==================== PAGE 1: TITLE PAGE ====================
pages.push(`
<div class="page title-page">
  <div style="text-align: center; margin-top: 10px;">
    <h1 style="font-size: 18pt; font-weight: bold; margin: 0 0 10px 0; line-height: 1.35; letter-spacing: 0.5px;">
      HEMOVAULT<br/>CENTRALIZED BLOOD BANK MANAGEMENT SYSTEM
    </h1>
    <div style="height: 25px;"></div>
    <h2 style="font-size: 13pt; font-weight: bold; margin: 0 0 20px 0; letter-spacing: 0.5px;">
      A PROJECT REPORT
    </h2>
    <div style="height: 15px;"></div>
    <p style="font-size: 11pt; font-style: italic; margin: 0 0 10px 0;">Submitted by</p>
    <p style="font-size: 13pt; font-weight: bold; margin: 0 0 25px 0;">PRIYAN R &nbsp;&nbsp; 310624148072</p>
    <div style="height: 15px;"></div>
    <p style="font-size: 11pt; font-style: italic; margin: 0 0 8px 0;">in partial fulfillment of the requirements for the award of the Degree</p>
    <p style="font-size: 11pt; font-style: italic; margin: 0 0 8px 0;">of</p>
    <p style="font-size: 13pt; font-weight: bold; margin: 0 0 8px 0;">BACHELOR OF ENGINEERING</p>
    <p style="font-size: 11pt; font-style: italic; margin: 0 0 8px 0;">in</p>
    <p style="font-size: 12pt; font-weight: bold; margin: 0 0 25px 0; line-height: 1.4;">
      COMPUTER SCIENCE AND ENGINEERING (ARTIFICIAL INTELLIGENCE AND MACHINE LEARNING)
    </p>
    <p style="font-size: 12pt; font-weight: bold; margin: 0 0 20px 0;">
      2311CSE503R - FULL STACK DEVELOPMENT
    </p>
  </div>

  <div style="text-align: center; margin: 15px auto;">
    ${collegeLogoSvg}
  </div>

  <div style="text-align: center; margin-bottom: 20px;">
    <h3 style="font-size: 14pt; font-weight: bold; margin: 0 0 6px 0;">
      EASWARI ENGINEERING COLLEGE
    </h3>
    <p style="font-size: 11pt; margin: 0 0 6px 0;">
      An Autonomous Institution affiliated to Anna University
    </p>
    <p style="font-size: 11pt; margin: 0 0 25px 0;">
      Chennai
    </p>
    <p style="font-size: 12pt; font-weight: bold; margin: 0; letter-spacing: 0.5px;">
      OCTOBER 2026
    </p>
  </div>
</div>
`);

// ==================== PAGE 2: BONAFIDE CERTIFICATE ====================
pages.push(`
<div class="page">
  <div style="text-align: center; margin-bottom: 30px;">
    <div style="transform: scale(0.65); transform-origin: top center; height: 80px; margin-bottom: 10px;">
      ${collegeLogoSvg}
    </div>
    <h2 style="font-size: 13pt; font-weight: bold; margin: 0 0 8px 0; letter-spacing: 0.5px;">
      BONAFIDE CERTIFICATE
    </h2>
    <h3 style="font-size: 12pt; font-weight: bold; margin: 0 0 25px 0;">
      EASWARI ENGINEERING COLLEGE
    </h3>
  </div>

  <p class="body-text" style="line-height: 1.8; text-indent: 0; margin-bottom: 35px;">
    Certified that this mini project report titled &quot;HemoVault Centralized Blood Bank Management System&quot; is the bonafide work of Priyan R (Registration Number 310624148072), Department of Computer Science and Engineering (Artificial Intelligence and Machine Learning), who carried out the project work under my supervision.
  </p>

  <div style="margin-top: 140px; display: flex; justify-content: space-between; font-size: 11pt; line-height: 1.5;">
    <div style="width: 48%;">
      <p style="font-weight: bold; margin: 0 0 6px 0;">HEAD OF THE DEPARTMENT</p>
      <p style="margin: 0 0 4px 0;">Dr. Y. Justin Dhas</p>
      <p style="margin: 0 0 4px 0;">Department of CSE(AIML)</p>
      <p style="margin: 0 0 15px 0;">Easwari Engineering College</p>
      <p style="margin: 0;">Signature: ______________________</p>
    </div>
    <div style="width: 48%;">
      <p style="font-weight: bold; margin: 0 0 6px 0;">SUPERVISOR</p>
      <p style="margin: 0 0 4px 0;">Ms Divyanjali</p>
      <p style="margin: 0 0 4px 0;">Project Guide</p>
      <p style="margin: 0 0 15px 0;">Department of CSE(AIML)</p>
      <p style="margin: 0;">Signature: ______________________</p>
    </div>
  </div>

  <div style="margin-top: 60px; font-size: 11pt; line-height: 1.6;">
    <p style="margin: 0 0 6px 0;">Place: Chennai</p>
    <p style="margin: 0;">Date: ________________</p>
  </div>
  <div class="page-num">2</div>
</div>
`);

// ==================== PAGE 3: CERTIFICATE OF VIVA VOCE EXAMINATION ====================
pages.push(`
<div class="page">
  <div style="text-align: center; margin-bottom: 30px;">
    <div style="transform: scale(0.65); transform-origin: top center; height: 80px; margin-bottom: 10px;">
      ${collegeLogoSvg}
    </div>
    <h2 style="font-size: 13pt; font-weight: bold; margin: 0 0 8px 0; letter-spacing: 0.5px;">
      CERTIFICATE OF VIVA VOCE EXAMINATION
    </h2>
    <h3 style="font-size: 12pt; font-weight: bold; margin: 0 0 25px 0;">
      EASWARI ENGINEERING COLLEGE
    </h3>
  </div>

  <p class="body-text" style="line-height: 1.8; text-indent: 0; margin-bottom: 35px;">
    This is to certify that the Viva Voce Examination of the project work entitled &quot;HemoVault Centralized Blood Bank Management System&quot;, submitted by Mr. Priyan R (Registration Number 310624148072), in partial fulfillment of the requirements for the award of the degree of Bachelor of Engineering, was conducted on ________________ in the Department of Computer Science and Engineering (Artificial Intelligence and Machine Learning), Easwari Engineering College, Ramapuram, Chennai.
  </p>

  <div style="margin-top: 140px; display: flex; justify-content: space-between; font-size: 11pt; line-height: 1.6;">
    <div style="width: 48%;">
      <p style="font-weight: bold; margin: 0 0 10px 0;">INTERNAL EXAMINER</p>
      <p style="margin: 0 0 6px 0;">Name: __________________________</p>
      <p style="margin: 0 0 6px 0;">Designation: ___________________</p>
      <p style="margin: 0 0 6px 0;">Address: _______________________</p>
      <p style="margin: 15px 0 0 0;">Signature: _____________________</p>
    </div>
    <div style="width: 48%;">
      <p style="font-weight: bold; margin: 0 0 10px 0;">EXTERNAL EXAMINER</p>
      <p style="margin: 0 0 6px 0;">Name: __________________________</p>
      <p style="margin: 0 0 6px 0;">Designation: ___________________</p>
      <p style="margin: 0 0 6px 0;">Address: _______________________</p>
      <p style="margin: 15px 0 0 0;">Signature: _____________________</p>
    </div>
  </div>

  <div style="margin-top: 50px; font-size: 11pt;">
    <p style="margin: 0;">Date: ________________</p>
  </div>
  <div class="page-num">3</div>
</div>
`);

// ==================== PAGE 4: ABSTRACT ====================
pages.push(`
<div class="page">
  <h2 style="font-size: 13pt; font-weight: bold; text-align: center; margin: 15px 0 25px 0; letter-spacing: 0.5px;">
    ABSTRACT
  </h2>

  <p class="body-text">
    Healthcare institutions increasingly manage critical transfusion resources through web applications, but a browser-based blood bank platform is dependable only when the system controls who may requisition blood products, how long inventory units remain viable in cold storage, how donor pathology tests are evaluated, and how emergency cross-matching requests are fulfilled. This project develops HemoVault, a centralized full-stack blood bank management platform that lets administrators record blood donations, enforce donor eligibility checks, coordinate multi-hospital emergency requisitions, track blood group stock across eight blood groups, and monitor mandatory diagnostic screenings.
  </p>

  <p class="body-text">
    The system uses Node.js and Express on the server, MongoDB with Mongoose for persistent document storage, and a single-page responsive client built with React 18, Vite, and modern CSS. Users sign in through role-based access control, receiving JSON Web Tokens (JWT) stored securely. Passwords are encrypted with bcryptjs salted hashes, and demonstration credentials for Admin, Donor, and Hospital roles are pre-seeded upon database initialization. Every API route is guarded by authentication middleware, and administrative actions are protected by strict role authorization checks.
  </p>

  <p class="body-text">
    A blood donation record represents a physical whole blood or component unit whose expiration date is automatically calculated on the server based on blood component preservation rules (42 days for packed red blood cells, 5 days for platelets, and 365 days for fresh frozen plasma). Before a donation is finalized, donors complete a digital health questionnaire and vitals check. During laboratory processing, pathologists record five statutory screening markers: HIV, Hepatitis B, Hepatitis C, Syphilis, and Malaria. Units failing any test are automatically quarantined and marked for safe biohazard disposal.
  </p>

  <p class="body-text">
    Hospital emergency requisitions are validated against ABO and Rh(D) compatibility matrices, preventing fatal immunological transfusion reactions. When stock is allocated, unit quantities decrement atomically to avoid double-allocation anomalies. The administrative portal provides live inventory matrices, low-stock threshold alerts, expiration tracking, donor retention metrics, and audit logs. The repository includes automated API route tests and a Vercel serverless deployment entry point. The report documents requirements, architecture, data schemas, API contracts, testing, and operational procedures.
  </p>

  <div style="margin-top: 25px; font-size: 11pt; line-height: 1.5;">
    <p style="margin: 0;">
      <strong>Keywords:</strong> blood bank management, transfusion safety, MERN stack, donor eligibility, component preservation, infectious disease screening, hospital emergency requisition, role-based access control
    </p>
  </div>
  <div class="page-num">4</div>
</div>
`);

// ==================== PAGE 5: ACKNOWLEDGEMENT ====================
pages.push(`
<div class="page">
  <h2 style="font-size: 13pt; font-weight: bold; text-align: center; margin: 15px 0 25px 0; letter-spacing: 0.5px;">
    ACKNOWLEDGEMENT
  </h2>

  <p class="body-text" style="margin-bottom: 25px;">
    I express my sincere gratitude to the Principal and Management of Easwari Engineering College for giving me the opportunity and the facilities to carry out this project work.
  </p>

  <p class="body-text" style="margin-bottom: 25px;">
    I convey my heartfelt thanks to Dr. Y. Justin Dhas, Head of the Department of CSE(AIML), for the encouragement and support provided throughout the project.
  </p>

  <p class="body-text" style="margin-bottom: 25px;">
    The guidance, suggestions and motivation of my project guide, Ms Divyanjali, Department of CSE(AIML), throughout the development of the HemoVault Centralized Blood Bank Management System were of great help.
  </p>

  <p class="body-text" style="margin-bottom: 35px;">
    I extend my gratitude to the faculty members of the Department of CSE(AIML) for their academic support. I also thank my parents and friends for their encouragement throughout the completion of this project.
  </p>

  <div style="margin-top: 180px; text-align: right; font-size: 11pt; line-height: 1.4;">
    <p style="font-weight: bold; margin: 0 0 4px 0;">Priyan R</p>
    <p style="margin: 0;">310624148072</p>
  </div>
  <div class="page-num">5</div>
</div>
`);

// ==================== PAGE 6: TABLE OF CONTENTS ====================
pages.push(`
<div class="page">
  <h2 style="font-size: 13pt; font-weight: bold; text-align: center; margin: 15px 0 20px 0; letter-spacing: 0.5px;">
    TABLE OF CONTENTS
  </h2>

  <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 10pt; border-bottom: 1px solid #000; padding-bottom: 4px; margin-bottom: 8px;">
    <span>TITLE</span>
    <span>PAGE</span>
  </div>

  <div class="toc-container" style="font-size: 9.5pt; line-height: 1.48;">
    <div class="toc-line"><span><strong>ABSTRACT</strong></span><span class="toc-dots"></span><span><strong>4</strong></span></div>
    <div class="toc-line"><span><strong>ACKNOWLEDGEMENT</strong></span><span class="toc-dots"></span><span><strong>5</strong></span></div>
    <div class="toc-line"><span><strong>1 INTRODUCTION</strong></span><span class="toc-dots"></span><span><strong>7</strong></span></div>
    <div class="toc-sub"><span>1.1 Overview</span><span class="toc-dots"></span><span>7</span></div>
    <div class="toc-sub"><span>1.2 Problem Definition</span><span class="toc-dots"></span><span>7</span></div>
    <div class="toc-sub"><span>1.3 Objective</span><span class="toc-dots"></span><span>8</span></div>
    <div class="toc-sub"><span>1.4 Scope of the Project</span><span class="toc-dots"></span><span>8</span></div>
    <div class="toc-sub"><span>1.5 Motivation</span><span class="toc-dots"></span><span>8</span></div>
    <div class="toc-sub"><span>1.6 Stakeholders and Operational Responsibilities</span><span class="toc-dots"></span><span>9</span></div>
    <div class="toc-sub"><span>1.7 Blood Safety and Inventory Concepts</span><span class="toc-dots"></span><span>10</span></div>
    <div class="toc-line"><span><strong>2 RELATED WORK</strong></span><span class="toc-dots"></span><span><strong>11</strong></span></div>
    <div class="toc-sub"><span>2.1 Literature Review</span><span class="toc-dots"></span><span>11</span></div>
    <div class="toc-sub"><span>2.2 Existing System</span><span class="toc-dots"></span><span>12</span></div>
    <div class="toc-sub"><span>2.3 Proposed System</span><span class="toc-dots"></span><span>12</span></div>
    <div class="toc-sub"><span>2.4 Comparison of Blood Banking Approaches</span><span class="toc-dots"></span><span>13</span></div>
    <div class="toc-sub"><span>2.5 Design Lessons and System Positioning</span><span class="toc-dots"></span><span>14</span></div>
    <div class="toc-line"><span><strong>3 SYSTEM ANALYSIS</strong></span><span class="toc-dots"></span><span><strong>15</strong></span></div>
    <div class="toc-sub"><span>3.1 System Requirements</span><span class="toc-dots"></span><span>15</span></div>
    <div class="toc-sub"><span>3.2 Software and Hardware Requirements</span><span class="toc-dots"></span><span>16</span></div>
    <div class="toc-sub"><span>3.3 Functional Use Cases and Acceptance Conditions</span><span class="toc-dots"></span><span>17</span></div>
    <div class="toc-sub"><span>3.4 Access Control and Hospital Verification</span><span class="toc-dots"></span><span>18</span></div>
    <div class="toc-sub"><span>3.5 Data Quality and Transfusion Safety Rules</span><span class="toc-dots"></span><span>19</span></div>
    <div class="toc-line"><span><strong>4 SYSTEM DESIGN</strong></span><span class="toc-dots"></span><span><strong>20</strong></span></div>
    <div class="toc-sub"><span>4.1 System Architecture</span><span class="toc-dots"></span><span>20</span></div>
    <div class="toc-sub"><span>4.2 Module Description</span><span class="toc-dots"></span><span>21</span></div>
    <div class="toc-sub"><span>4.3 Data Model and Entity Isolation</span><span class="toc-dots"></span><span>21</span></div>
    <div class="toc-sub"><span>4.4 Database Diagram</span><span class="toc-dots"></span><span>22</span></div>
    <div class="toc-sub"><span>4.5 Sequence Diagram</span><span class="toc-dots"></span><span>23</span></div>
    <div class="toc-sub"><span>4.6 Data Flow and Request Processing</span><span class="toc-dots"></span><span>24</span></div>
    <div class="toc-sub"><span>4.7 Table Design and Record Relationships</span><span class="toc-dots"></span><span>25</span></div>
    <div class="toc-sub"><span>4.8 REST Interface and Response Contracts</span><span class="toc-dots"></span><span>26</span></div>
    <div class="toc-sub"><span>4.9 Interface State and Feedback Design</span><span class="toc-dots"></span><span>27</span></div>
    <div class="toc-line"><span><strong>5 IMPLEMENTATION</strong></span><span class="toc-dots"></span><span><strong>28</strong></span></div>
    <div class="toc-sub"><span>5.1 Implementation Overview</span><span class="toc-dots"></span><span>28</span></div>
    <div class="toc-sub"><span>5.2 Key Functions and Code Explanation</span><span class="toc-dots"></span><span>29</span></div>
    <div class="toc-sub"><span>5.3 End to End Donor Registration & Donation Workflow</span><span class="toc-dots"></span><span>32</span></div>
    <div class="toc-sub"><span>5.4 Hospital Emergency Requisition Workflow</span><span class="toc-dots"></span><span>33</span></div>
    <div class="toc-sub"><span>5.5 Worked Example of Blood Matching and Allocation</span><span class="toc-dots"></span><span>34</span></div>
    <div class="toc-sub"><span>5.6 Cold Storage & Expiration Lifecycle</span><span class="toc-dots"></span><span>35</span></div>
    <div class="toc-sub"><span>5.7 Deployment Configuration and Persistence</span><span class="toc-dots"></span><span>36</span></div>
    <div class="toc-sub"><span>5.8 Security Hardening Measures</span><span class="toc-dots"></span><span>37</span></div>
    <div class="toc-sub"><span>5.9 Test Coverage and Regression Traceability</span><span class="toc-dots"></span><span>38</span></div>
    <div class="toc-sub"><span>5.10 Operating Guide and Troubleshooting</span><span class="toc-dots"></span><span>39</span></div>
    <div class="toc-line"><span><strong>6 CONCLUSION AND FUTURE WORK</strong></span><span class="toc-dots"></span><span><strong>40</strong></span></div>
    <div class="toc-sub"><span>6.1 Conclusion</span><span class="toc-dots"></span><span>40</span></div>
    <div class="toc-sub"><span>6.2 Future Enhancements</span><span class="toc-dots"></span><span>40</span></div>
    <div class="toc-sub"><span>6.3 Evaluation Limits and Enhancement Priorities</span><span class="toc-dots"></span><span>41</span></div>
    <div class="toc-line"><span><strong>APPENDIX SOURCE CODE</strong></span><span class="toc-dots"></span><span><strong>42</strong></span></div>
    <div class="toc-line"><span><strong>SCREENSHOTS OF THE PROJECT</strong></span><span class="toc-dots"></span><span><strong>48</strong></span></div>
    <div class="toc-line"><span><strong>REFERENCES</strong></span><span class="toc-dots"></span><span><strong>50</strong></span></div>
  </div>
  <div class="page-num">6</div>
</div>
`);

// ==================== CHAPTER 1 (PAGES 7-10) ====================
// PAGE 7
pages.push(`
<div class="page">
  <div class="ch-head">
    <div class="ch-num">CHAPTER 1</div>
    <div class="ch-title">INTRODUCTION</div>
  </div>

  <div class="sec-title">1.1 Overview</div>
  <p class="body-text">
    Centralized blood banking replaces fragile manual paper ledgers, fragmented hospital logs, and uncoordinated telephone communications with a unified digital repository, real-time inventory tracking, and an automated allocation workflow. That transformation makes the blood donation and requisition process fast, transparent, and auditable, but it also transfers critical clinical responsibilities to software systems. The platform must verify who may requisition blood products, maintain strict temperature and shelf-life tracking so that compromised units are never transfused, validate immunological compatibility without trusting client-side inputs, and record every handling event so hospital blood bank officers can review cold-chain compliance.
  </p>
  <p class="body-text">
    HemoVault is a full stack centralized blood bank management system engineered for this clinical purpose. Administrators sign in to inspect real-time blood stock across all eight ABO and Rh(D) blood groups, coordinate emergency hospital requisitions, record laboratory infectious disease screenings, and view inventory turnover metrics. Donors sign in to verify clinical eligibility, view regional donation drives, book phlebotomy appointments, and track their donation history. Partner hospitals submit urgent unit requests with specified urgency tiers and track delivery dispatch. The application is developed with Node.js and Express on the backend, MongoDB for schema-flexible document storage, and React 18 with Vite for a fast, component-driven user interface.
  </p>

  <div class="sec-title">1.2 Problem Definition</div>
  <p class="body-text">
    Traditional blood banks in semi-urban and regional clusters rely heavily on manual registers and disparate spreadsheets, creating severe systemic vulnerabilities. Hand-written donor cards are prone to transcription mistakes, physical registers prevent multi-center stock visibility during life-threatening trauma incidents, and expiry dates are tracked through manual visual inspection, leading to tragic discarding of precious blood units. Furthermore, when hospitals face acute surgical shortages, staff spend precious hours telephoning nearby blood banks without knowing current compatibility or stock levels.
  </p>
  <p class="body-text">
    The problem addressed by this project is to provide a reliable, auditable, and centralized blood banking workflow in which donor identity, physiological eligibility, laboratory pathogen clearance, and emergency allocation are strictly enforced by the server. Real-time inventory balances must be updated atomically to prevent double-allocation anomalies, while audit logs maintain full chain-of-custody tracking. The system is designed to run seamlessly in modern cloud serverless environments while remaining lightweight enough for standalone local deployment.
  </p>
  <div class="page-num">7</div>
</div>
`);

// PAGE 8
pages.push(`
<div class="page">
  <div class="sec-title">1.3 Objective</div>
  <p class="body-text">
    The primary objective is to develop a reliable, centralized, and secure digital blood bank management platform for regional health networks. Authorized administrators must be able to manage inventory across all eight blood groups and review infectious disease laboratory tests. Donors must be able to register, verify eligibility criteria, and schedule donations. Partner healthcare facilities must be able to submit emergency blood requisitions and receive real-time compatibility allocations.
  </p>

  <table class="report-table">
    <thead>
      <tr><th style="width: 40%;">Objective</th><th style="width: 60%;">Implemented approach</th></tr>
    </thead>
    <tbody>
      <tr><td>Authenticate every user</td><td>JWT cryptographic tokens, bcryptjs password hashing, role authorization middleware</td></tr>
      <tr><td>Separate responsibilities</td><td>Distinct Admin, Donor, and Hospital roles enforced by route-level access control</td></tr>
      <tr><td>Track inventory in real time</td><td>Mongoose document models tracking units by blood group, component, and storage location</td></tr>
      <tr><td>Enforce clinical eligibility</td><td>Server-side validation of age, weight, pulse, blood pressure, and inter-donation intervals</td></tr>
      <tr><td>Ensure biological safety</td><td>Mandatory laboratory screening recording HIV, HBV, HCV, Syphilis, and Malaria</td></tr>
      <tr><td>Automate emergency allocation</td><td>ABO/Rh compatibility engine matching donor units with patient requisitions</td></tr>
    </tbody>
  </table>

  <div class="sec-title">1.4 Scope of the Project</div>
  <p class="body-text">
    The project scope encompasses user authentication across three roles (Admin, Donor, Hospital), automated inventory classification for whole blood, packed red cells, platelets, and plasma, donor health questionnaires with dynamic eligibility scoring, a laboratory diagnostic screening portal, emergency requisition management with urgency prioritization, audit logging of all unit transfers, and responsive user interfaces. The system can be deployed on local workstations or cloud platforms such as Vercel. Physical barcode scanning hardware, automated centrifuge control, and direct hospital EHR HL7/FHIR integration remain outside the scope of this phase.
  </p>

  <div class="sec-title">1.5 Motivation</div>
  <p class="body-text">
    Every two seconds, a patient requires a life-saving blood transfusion, yet voluntary blood donation centers frequently face severe logistical bottlenecks. Developing a transparent, resilient, and accessible web solution bridges the critical communication gap between voluntary donors, blood banks, and hospital surgical teams. This project also provides an opportunity to apply full-stack software engineering principles—RESTful architectural patterns, secure session handling, ACID database transactions, component modularity, and automated API regression testing—within an impactful healthcare management domain.
  </p>
  <div class="page-num">8</div>
</div>
`);

// PAGE 9
pages.push(`
<div class="page">
  <div class="sec-title">1.6 Stakeholders and Operational Responsibilities</div>
  <p class="body-text">
    The platform organizes blood management operations around three authenticated roles that interact through a shared backend API. The blood bank administrator oversees inventory stocks, evaluates test results, and approves hospital dispatches. The voluntary donor manages personal donation records and appointment bookings. The hospital coordinator submits urgent blood requisitions and tracks fulfillment. Enforcing these operational boundaries at the API layer, rather than solely within the browser user interface, is a core security foundation of the design.
  </p>
  <p class="body-text">
    For instance, a donor may query only their personal donation logs and available donation drives. The server verifies donor identity via JWT tokens before returning records. A hospital representative can submit requisitions specifying blood group, component type, and patient urgency, but cannot approve requisitions or modify stock balances. The administrator retains comprehensive authority to transition blood units from quarantine to active stock upon diagnostic clearance, discard expired products, and execute dispatches.
  </p>

  <table class="report-table">
    <thead>
      <tr><th style="width: 32%;">Stakeholder</th><th style="width: 68%;">Operational responsibility</th></tr>
    </thead>
    <tbody>
      <tr><td>Blood Bank Administrator</td><td>Manage cold storage units, oversee inventory levels, record laboratory pathogen results, approve emergency requisitions, review system audit logs</td></tr>
      <tr><td>Voluntary Donor</td><td>Register donor account, submit pre-donation health screening questionnaires, book appointments at blood drives, inspect past donation records</td></tr>
      <tr><td>Hospital Clinical Coordinator</td><td>Create emergency blood requests, specify required units and clinical urgency, monitor dispatch tracking, confirm unit reception</td></tr>
      <tr><td>Pathology Lab Technician</td><td>Record diagnostic screening results for infectious markers (HIV, HBV, HCV, RPR, MP), flag non-reactive units for release, quarantine reactive units</td></tr>
      <tr><td>Platform DevOps Engineer</td><td>Maintain database persistence, configure HTTPS security certificates, manage environment variables, monitor Vercel serverless performance</td></tr>
    </tbody>
  </table>

  <p class="body-text" style="margin-top: 14px;">
    Safe operational governance also demands clear standard operating procedures outside the software: blood centers must adhere to national transfusion council standards, inspect refrigeration equipment regularly, and discard biohazardous waste according to medical protocols. The software assists clinicians by providing verifiable audit trails, but clinical responsibility remains with licensed medical personnel.
  </p>
  <div class="page-num">9</div>
</div>
`);

// PAGE 10
pages.push(`
<div class="page">
  <div class="sec-title">1.7 Blood Safety and Inventory Concepts</div>
  <p class="body-text">
    Blood inventory items are perishable biological products with varying physiological shelf-lives depending on preservation methods and component fractionation. Whole blood and packed red blood cells stored at 2°C to 6°C remain viable for up to 42 days when preserved with CPDA-1 solution. Platelet concentrates, kept at 20°C to 24°C under gentle agitation, have an operational lifespan of only 5 days due to bacterial proliferation risks. Fresh frozen plasma maintained below -18°C can be stored for up to one year.
  </p>
  <p class="body-text">
    To prevent the transmission of infectious pathogens, every collected unit undergoes rigorous serological testing. In the HemoVault platform, newly collected blood units immediately enter a Quarantined state. Units cannot transition to Available stock until all five mandatory pathogen markers return non-reactive. If any test returns positive, the unit is permanently marked Discarded with recorded justification, ensuring zero probability of accidental clinical release.
  </p>

  <table class="report-table">
    <thead>
      <tr><th style="width: 30%;">Term</th><th style="width: 70%;">Meaning in the platform</th></tr>
    </thead>
    <tbody>
      <tr><td>Quarantined Unit</td><td>A newly collected blood unit awaiting complete laboratory infectious disease screening before it can be released into general stock</td></tr>
      <tr><td>Available Stock</td><td>Pathogen-cleared blood units ready for clinical matching and emergency allocation to verified healthcare facilities</td></tr>
      <tr><td>Fractionation</td><td>Separation of whole blood into packed red blood cells, fresh frozen plasma, and platelets to optimize therapeutic usage</td></tr>
      <tr><td>ABO/Rh Matrix</td><td>Immunological compatibility rules determining which donor blood groups can be safely transfused into recipients of specific blood types</td></tr>
      <tr><td>Cold Chain Viability</td><td>Strict monitoring of unit expiration dates to ensure blood products beyond permissible shelf-life are flagged and retired</td></tr>
      <tr><td>Emergency Requisition</td><td>High-priority hospital order for critical blood products, categorized into Normal, Urgent, or Critical tiers</td></tr>
    </tbody>
  </table>

  <p class="body-text" style="margin-top: 14px;">
    In emergency clinical scenarios, universal donor units (O-negative for packed red blood cells, and AB-positive for plasma) serve as essential life-saving substitutes when identical blood group matches are depleted. The platform automates compatibility lookups while alerting operators whenever non-identical units are suggested.
  </p>
  <div class="page-num">10</div>
</div>
`);

// ==================== CHAPTER 2 (PAGES 11-14) ====================
// PAGE 11
pages.push(`
<div class="page">
  <div class="ch-head">
    <div class="ch-num">CHAPTER 2</div>
    <div class="ch-title">RELATED WORK</div>
  </div>

  <div class="sec-title">2.1 Literature Review</div>
  <p class="body-text">
    Modern blood banking platforms draw from biomedical informatics, distributed transaction systems, and transfusion logistics research. World Health Organization (WHO) technical guidelines on blood regulatory systems emphasize that traceability, voluntary non-remunerated donation records, and standardized laboratory screening are mandatory prerequisites for preventing transfusion-transmitted infections [1]. National Blood Transfusion Council (NBTC) operational frameworks outline strict donor deferral protocols, specifying minimum 90-day intervals between whole blood donations for males and 120-day intervals for females [2].
  </p>
  <p class="body-text">
    Software engineering literature in medical informatics stresses that data integrity and access control must be implemented through defense-in-depth principles. The Open Web Application Security Project (OWASP) recommendations for biomedical applications dictate that sensitive user records, clinical diagnostics, and authorization credentials must utilize salted password hashing algorithms (such as bcrypt or scrypt), stateless signed tokens (JWT) with strict expiration limits, and explicit role verification checks at every routing layer [4].
  </p>

  <table class="report-table">
    <thead>
      <tr><th style="width: 38%;">Source area</th><th style="width: 62%;">Relevance to this project</th></tr>
    </thead>
    <tbody>
      <tr><td>WHO Blood Regulatory Guidelines [1]</td><td>Standardized five-pathogen screening criteria and blood unit quarantine protocols</td></tr>
      <tr><td>NBTC Operational Transfusion Standards [2]</td><td>Donor physical eligibility criteria, minimum donation intervals, and component shelf-life limits</td></tr>
      <tr><td>OWASP Secure Web Applications [4]</td><td>Bcrypt password hashing, JWT authorization headers, and CORS defense mechanisms</td></tr>
      <tr><td>Express Routing &amp; Middleware [3]</td><td>Layered request pipeline: token decoding, role enforcement, validation, and error handling</td></tr>
      <tr><td>Mongoose Schema &amp; Document Modeling [7]</td><td>Strict type casting, embedded subdocuments, and indexing on bloodGroup and status</td></tr>
      <tr><td>React 18 &amp; Single-Page Architecture [8]</td><td>Component modularity, optimistic UI state transitions, and asynchronous API interactions</td></tr>
    </tbody>
  </table>

  <p class="body-text" style="margin-top: 14px;">
    These technical foundations provide the engineering specifications for HemoVault. Rather than relying on proprietary software packages, our implementation leverages modern open-source web standards, ensuring reproducible deployment across healthcare environments.
  </p>
  <div class="page-num">11</div>
</div>
`);

// PAGE 12
pages.push(`
<div class="page">
  <div class="sec-title">2.2 Existing System</div>
  <p class="body-text">
    Conventional blood bank management in regional facilities typically relies on desktop spreadsheet software or physical paper ledgers. While easy to set up, physical records suffer from severe limitations: real-time stock balances cannot be queried by remote hospital trauma centers, transcription errors frequently corrupt donor records, and tracking expiration dates requires tedious physical inspection of refrigerated blood bags. During emergency mass-casualty events, hospital staff must place frantic phone calls to multiple facilities, introducing dangerous delays that compromise patient survival.
  </p>
  <p class="body-text">
    Commercial enterprise hospital information systems (HIS) provide integrated blood bank modules, but they are expensive, complex to customize, require extensive training, and depend on heavy on-premises server infrastructure. For regional healthcare centers, small clinics, and non-profit blood banks, an agile, transparent, and cloud-deployable platform is far more practical than enterprise legacy software.
  </p>

  <div class="sec-title">2.3 Proposed System</div>
  <p class="body-text">
    The proposed HemoVault platform delivers a lightweight, cloud-deployable solution that centralizes blood bank operations into a unified web application. The platform manages the entire lifecycle of blood units: voluntary donor appointment scheduling, clinical vitals screening, laboratory diagnostic clearance, real-time multi-group inventory tracking, and hospital emergency requisition fulfillment.
  </p>

  <table class="report-table">
    <thead>
      <tr><th style="width: 40%;">Baseline issue</th><th style="width: 60%;">Proposed response</th></tr>
    </thead>
    <tbody>
      <tr><td>Manual paper registers</td><td>Centralized MongoDB document storage accessible via responsive web interfaces</td></tr>
      <tr><td>No remote inventory visibility</td><td>Real-time inventory matrix tracking units across all 8 blood groups and component types</td></tr>
      <tr><td>Uncontrolled donor eligibility</td><td>Automated validation of vitals (age, weight, hemoglobin, BP) before appointment confirmation</td></tr>
      <tr><td>Delayed emergency requisition</td><td>Priority-queued hospital requisition pipeline with instant compatibility calculation</td></tr>
      <tr><td>Risk of expired unit usage</td><td>Automated shelf-life calculation flagging near-expiry units and preventing expired release</td></tr>
      <tr><td>Clerical pathogen record errors</td><td>Strict quarantine enforcement requiring non-reactive testing before stock release</td></tr>
    </tbody>
  </table>

  <p class="body-text" style="margin-top: 14px;">
    By enforcing data integrity at the server API layer, HemoVault ensures that medical staff, donors, and hospital coordinators interact with consistent, authoritative transfusion information.
  </p>
  <div class="page-num">12</div>
</div>
`);

// PAGE 13
pages.push(`
<div class="page">
  <div class="sec-title">2.4 Comparison of Blood Banking Approaches</div>
  <p class="body-text">
    To contextualize the technical positioning of HemoVault, we analyze three common approaches used across healthcare organizations: physical paper ledgers, general spreadsheet databases, and purpose-built full-stack blood bank platforms. The comparison below describes workflow characteristics, operational security, and responsiveness.
  </p>

  <table class="report-table">
    <thead>
      <tr><th style="width: 25%;">Approach</th><th style="width: 37%;">Strength</th><th style="width: 38%;">Limitation</th></tr>
    </thead>
    <tbody>
      <tr><td>Paper ledgers</td><td>Zero electricity dependency; low initial setup cost; immune to network outages</td><td>No search capability; zero remote visibility; vulnerable to loss, wear, and transcription errors</td></tr>
      <tr><td>Spreadsheet software</td><td>Familiar interface; basic filtering; quick record entry on local PCs</td><td>No role-based permissions; no atomic updates; high risk of accidental cell overwrite or data corruption</td></tr>
      <tr><td>Enterprise HIS modules</td><td>Comprehensive hospital integration; billing linkage; barcode support</td><td>Excessive financial cost; complex vendor lock-in; requires dedicated server infrastructure</td></tr>
      <tr><td>HemoVault platform</td><td>Cloud-native MERN architecture; zero-cost deployment; role-based access; real-time compatibility</td><td>Requires active web connectivity; hardware automation (e.g., RFID tagging) left to future iterations</td></tr>
    </tbody>
  </table>

  <p class="body-text" style="margin-top: 16px;">
    The comparison demonstrates that HemoVault strikes an optimal balance for modern healthcare environments. It eliminates the transcription hazards and communication bottlenecks of manual records while avoiding the prohibitive licensing costs and operational bloat of legacy enterprise software.
  </p>
  <p class="body-text">
    Furthermore, because HemoVault employs stateless RESTful APIs and responsive React components, it can be deployed on cost-effective cloud services (such as Vercel and MongoDB Atlas) or self-hosted on a single hospital local-area server during emergency disconnections.
  </p>
  <div class="page-num">13</div>
</div>
`);

// PAGE 14
pages.push(`
<div class="page">
  <div class="sec-title">2.5 Design Lessons and System Positioning</div>
  <p class="body-text">
    Engineering a healthcare-critical application yields vital software design principles. The foremost lesson is that clinical safety rules must be implemented as non-bypassable server constraints. Client-side validation in the web browser enhances user experience by providing instant feedback, but the server must independently re-validate every physiological parameter, blood group match, and permission check to prevent tampered or malformed payloads from compromising clinical records.
  </p>
  <p class="body-text">
    A second architectural lesson concerns data immutability and auditability. In a transfusion system, blood units and patient allocations cannot simply be deleted when dispatches occur; every status transition—from Collected to Quarantined, Released, Allocated, or Discarded—must be recorded with timestamps, user IDs, and justifications to maintain a tamper-evident audit trail for clinical governance.
  </p>

  <table class="report-table">
    <thead>
      <tr><th style="width: 38%;">Design lesson</th><th style="width: 62%;">Application decision</th></tr>
    </thead>
    <tbody>
      <tr><td>Never trust the browser</td><td>Server re-computes eligibility, expiration dates, compatibility, and stock balances</td></tr>
      <tr><td>Trace every biological unit</td><td>Audit log records unit creation, testing outcomes, allocation, and dispatch events</td></tr>
      <tr><td>Quarantine by default</td><td>New units automatically enter quarantine; release requires explicit negative test results</td></tr>
      <tr><td>Atomic inventory decrements</td><td>Database queries verify available stock before decrementing to prevent overselling</td></tr>
      <tr><td>Role isolation at API level</td><td>Middleware validates JWT signature and verifies user role before granting route execution</td></tr>
      <tr><td>Resilient zero-setup hosting</td><td>Dual database connection strategy supporting local embedded storage and cloud Atlas failover</td></tr>
    </tbody>
  </table>

  <p class="body-text" style="margin-top: 14px;">
    The project is positioned as a secure, production-grade full-stack engineering solution for academic evaluation and clinical deployment in regional healthcare networks, establishing a dependable foundation for transparent blood banking.
  </p>
  <div class="page-num">14</div>
</div>
`);

// ==================== CHAPTER 3 (PAGES 15-19) ====================
// PAGE 15
pages.push(`
<div class="page">
  <div class="ch-head">
    <div class="ch-num">CHAPTER 3</div>
    <div class="ch-title">SYSTEM ANALYSIS</div>
  </div>

  <div class="sec-title">3.1 System Requirements</div>
  <p class="body-text">
    Functional requirements are structured around three distinct actor personas (Administrator, Donor, and Hospital) and the core lifecycle of blood units. Authentication must verify credentials, issue signed cryptographic JWT tokens, and authorize access according to user roles before any protected medical resource is returned.
  </p>

  <table class="report-table">
    <thead>
      <tr><th style="width: 25%;">Actor</th><th style="width: 75%;">Required functions</th></tr>
    </thead>
    <tbody>
      <tr><td>Administrator</td><td>Authenticate securely; inspect stock balances; record donor intakes; manage pathogen screening; approve/reject emergency requisitions; generate inventory reports; view audit logs</td></tr>
      <tr><td>Voluntary Donor</td><td>Create donor account; complete health eligibility questionnaires; book donation appointments; view donation history; access digital donor card</td></tr>
      <tr><td>Hospital Coordinator</td><td>Submit emergency blood requisitions; specify patient blood group, component, units, and urgency level; track requisition status; inspect delivery dispatches</td></tr>
      <tr><td>System (Backend)</td><td>Enforce ABO/Rh compatibility rules; compute unit expiration timestamps; update stock balances atomically; enforce quarantine gatekeeping; log security events</td></tr>
    </tbody>
  </table>

  <div class="sec-title">Nonfunctional Requirements</div>
  <p class="body-text">
    High availability, rapid sub-second response times, and robust data protection are essential for medical software. The client interface must adapt across desktop workstations, tablets, and mobile devices with clear visual feedback for loading, error, and success states. Passwords must never be stored in plain text; they must be hashed using industry-standard salted bcrypt algorithms. API payloads are bounded by strict body size limits to prevent denial-of-service vulnerabilities, and CORS headers restrict API access to authorized domain origins.
  </p>
  <div class="page-num">15</div>
</div>
`);

// PAGE 16
pages.push(`
<div class="page">
  <div class="sec-title">3.2 Software and Hardware Requirements</div>
  <p class="body-text">
    The application is engineered using modern, cross-platform technologies to ensure wide deployment versatility across regional healthcare facilities and cloud providers.
  </p>

  <table class="report-table">
    <thead>
      <tr><th style="width: 32%;">Component</th><th style="width: 68%;">Project requirement</th></tr>
    </thead>
    <tbody>
      <tr><td>Client Web Browser</td><td>Modern browser (Chrome 110+, Edge 110+, Firefox 110+, Safari 16+) with JavaScript enabled</td></tr>
      <tr><td>Frontend Framework</td><td>React 18 with Vite bundling, Lucide-React icons, responsive CSS3</td></tr>
      <tr><td>Backend Runtime</td><td>Node.js (v18.x to v24.x LTS) with Express 4.19 web application framework</td></tr>
      <tr><td>Database &amp; ODM</td><td>MongoDB (v6.0+) managed via Mongoose 8.4; embedded memory failover support</td></tr>
      <tr><td>Security &amp; Encryption</td><td>Bcryptjs for password hashing; JsonWebToken (JWT) for stateless session authorization</td></tr>
      <tr><td>Hosting &amp; Deployment</td><td>Vercel serverless platform with serverless API rewrites and global edge caching</td></tr>
      <tr><td>Development Tools</td><td>Visual Studio Code / Antigravity IDE, npm package manager, Git &amp; GitHub</td></tr>
    </tbody>
  </table>

  <div class="sec-title">Feasibility and Operating Assumptions</div>
  <p class="body-text">
    <strong>Technical Feasibility:</strong> The technology stack uses proven, mature open-source tools with comprehensive documentation and active community support. The MERN architecture handles asynchronous requests efficiently.<br/>
    <strong>Operational Feasibility:</strong> The platform features intuitive, responsive interfaces with clear color-coded statuses, requiring minimal computer literacy for medical staff and voluntary donors.<br/>
    <strong>Economic Feasibility:</strong> By leveraging open-source components and serverless hosting on Vercel with MongoDB Atlas free-tier support, the operational infrastructure cost is effectively zero for demonstration and pilot deployments.
  </p>
  <div class="page-num">16</div>
</div>
`);

// PAGE 17
pages.push(`
<div class="page">
  <div class="sec-title">3.3 Functional Use Cases and Acceptance Conditions</div>
  <p class="body-text">
    A use case models an end-to-end clinical interaction between an authorized actor and the platform. Each use case is governed by strict acceptance conditions verifiable through automated test suites and manual user acceptance procedures.
  </p>

  <table class="report-table">
    <thead>
      <tr><th style="width: 30%;">Use case</th><th style="width: 70%;">Acceptance condition</th></tr>
    </thead>
    <tbody>
      <tr><td>User Login</td><td>Valid email and password return 200 OK with signed JWT token and user profile; invalid credentials return 401 Unauthorized without exposing user existence</td></tr>
      <tr><td>Donor Eligibility Check</td><td>Server evaluates physiological vitals; valid inputs return Eligible (200); out-of-range vitals return Ineligible with specific clinical deferral explanation</td></tr>
      <tr><td>Donation Intake</td><td>Admin records new donation; unit is inserted into BloodInventory with Quarantined status and calculated expiration date based on component type</td></tr>
      <tr><td>Laboratory Testing</td><td>Lab technician submits 5-pathogen screening; all non-reactive results transition unit to Available; any reactive result flags unit as Discarded</td></tr>
      <tr><td>Emergency Requisition</td><td>Hospital submits request; system calculates ABO/Rh compatible stock; if sufficient, units decrement atomically and status becomes Approved; otherwise Pending</td></tr>
      <tr><td>Stock Balance Query</td><td>Returns live unit counts aggregated across all 8 blood groups and components; updates immediately upon unit intake or fulfillment</td></tr>
    </tbody>
  </table>

  <p class="body-text" style="margin-top: 14px;">
    These acceptance criteria guarantee that data transitions occur predictably and securely across the application lifecycle, maintaining system reliability under varying operational conditions.
  </p>
  <div class="page-num">17</div>
</div>
`);

// PAGE 18
pages.push(`
<div class="page">
  <div class="sec-title">3.4 Access Control and Hospital Verification</div>
  <p class="body-text">
    Access control enforces two independent security boundaries: authentication (confirming caller identity) and authorization (verifying permissions to perform an operation on a target resource). Relying solely on client-side UI visibility is unacceptable; every protected API endpoint must enforce access controls independently.
  </p>
  <p class="body-text">
    When a request reaches a protected route, the auth middleware extracts the Bearer token from the HTTP Authorization header, verifies its digital signature using the server secret key, and decodes the user payload. The role-check middleware then verifies whether the authenticated role possesses the required clearance for the requested operation.
  </p>

  <table class="report-table">
    <thead>
      <tr><th style="width: 42%;">Request condition</th><th style="width: 58%;">Expected result</th></tr>
    </thead>
    <tbody>
      <tr><td>Request without Authorization header</td><td>401 Unauthorized; error message returned; access denied</td></tr>
      <tr><td>Expired or tampered JWT token</td><td>401 Unauthorized; token rejected; session invalidated</td></tr>
      <tr><td>Donor attempts to access Admin inventory API</td><td>403 Forbidden; operation blocked; state unchanged</td></tr>
      <tr><td>Hospital attempts to approve emergency request</td><td>403 Forbidden; admin approval permission required</td></tr>
      <tr><td>Unverified hospital submits emergency requisition</td><td>403 Forbidden; verified hospital registration required</td></tr>
      <tr><td>Admin updates laboratory test results</td><td>200 OK; unit status updated; audit trail recorded</td></tr>
    </tbody>
  </table>

  <p class="body-text" style="margin-top: 14px;">
    This rigorous boundary model prevents horizontal privilege escalation (e.g., one hospital accessing another hospital's patient requisitions) and vertical privilege escalation (e.g., standard donors altering inventory balances).
  </p>
  <div class="page-num">18</div>
</div>
`);

// PAGE 19
pages.push(`
<div class="page">
  <div class="sec-title">3.5 Data Quality and Transfusion Safety Rules</div>
  <p class="body-text">
    Data quality in healthcare platforms directly impacts clinical outcomes. HemoVault enforces strict validation checks to prevent ambiguous, incomplete, or corrupted records from entering the database.
  </p>
  <p class="body-text">
    Donor registration requires standard demographic fields, valid contact numbers, and verified age constraints (18 to 65 years). Blood units require valid ABO/Rh blood groups (A+, A-, B+, B-, AB+, AB-, O+, O-), recognized component designations (Whole Blood, Red Cells, Platelets, Plasma), volume in milliliters, and storage location references.
  </p>

  <table class="report-table">
    <thead>
      <tr><th style="width: 32%;">Quality dimension</th><th style="width: 68%;">Control or operating practice</th></tr>
    </thead>
    <tbody>
      <tr><td>Completeness</td><td>Mandatory Mongoose schema fields reject incomplete document creation with descriptive validation errors</td></tr>
      <tr><td>Type &amp; Range Validity</td><td>Numerical constraints enforce valid biological parameters (hemoglobin &gt; 12.5 g/dL, weight &gt; 50 kg, systolic BP 100-140 mmHg)</td></tr>
      <tr><td>Enumeration Integrity</td><td>Restricts blood groups, component types, and test results to standardized medical vocabularies</td></tr>
      <tr><td>Temporal Consistency</td><td>Server calculates donation timestamps and shelf-life expiration dates using UTC ISO strings to avoid timezone skew</td></tr>
      <tr><td>Uniqueness</td><td>Unique database indexes prevent duplicate donor registrations based on email and national identification</td></tr>
      <tr><td>Audit Traceability</td><td>Every inventory adjustment, status modification, and dispatch writes an immutable record to the audit collection</td></tr>
    </tbody>
  </table>

  <p class="body-text" style="margin-top: 14px;">
    By embedding these validation rules directly within Mongoose schemas and controller pipelines, the system guarantees high clinical data fidelity.
  </p>
  <div class="page-num">19</div>
</div>
`);

// ==================== CHAPTER 4 (PAGES 20-27) ====================
// PAGE 20
pages.push(`
<div class="page">
  <div class="ch-head">
    <div class="ch-num">CHAPTER 4</div>
    <div class="ch-title">SYSTEM DESIGN</div>
  </div>

  <div class="sec-title">4.1 System Architecture</div>
  <p class="body-text">
    HemoVault is engineered as a decoupled, multi-tier web application adhering to the Model-View-Controller (MVC) paradigm. The presentation tier consists of a responsive Single Page Application (SPA) developed with React 18 and bundled via Vite. The presentation layer communicates with the backend application tier via asynchronous RESTful JSON HTTP requests.
  </p>

  <div style="text-align: center; margin: 10px 0;">
    <div style="transform: scale(0.85); transform-origin: top center; height: 360px;">
      ${architectureSvg}
    </div>
    <p style="font-size: 10pt; font-style: italic; margin-top: 5px;">Figure 4.1 System architecture of the HemoVault Blood Bank Management Platform</p>
  </div>

  <p class="body-text">
    The application tier utilizes Express.js to parse incoming JSON payloads, enforce security headers (Helmet, CORS), authenticate JWT sessions, and dispatch requests to controller handlers. The data tier leverages MongoDB for document persistence, utilizing Mongoose schemas to guarantee structural validity and relational integrity.
  </p>
  <div class="page-num">20</div>
</div>
`);

// PAGE 21
pages.push(`
<div class="page">
  <div class="sec-title">4.2 Module Description</div>
  <p class="body-text">
    The backend architecture is structured into decoupled functional modules, each encapsulating specific domain responsibilities and providing clean RESTful endpoints.
  </p>

  <table class="report-table">
    <thead>
      <tr><th style="width: 30%;">Module</th><th style="width: 70%;">Responsibility</th></tr>
    </thead>
    <tbody>
      <tr><td>Authentication</td><td>User registration, login verification, password encryption with bcryptjs, JWT token generation, role verification</td></tr>
      <tr><td>Donor Management</td><td>Donor profiling, health questionnaire scoring, donation appointment scheduling, historical donation records</td></tr>
      <tr><td>Blood Inventory</td><td>Unit intake, stock level tracking, cold-chain shelf-life computation, low-stock alerts, disposal recording</td></tr>
      <tr><td>Pathology Testing</td><td>Recording diagnostic screenings for 5 infectious markers (HIV, HBV, HCV, Syphilis, Malaria), quarantine management</td></tr>
      <tr><td>Emergency Requisitions</td><td>Hospital request processing, ABO/Rh compatibility matching, priority queue sorting, atomic stock allocation</td></tr>
      <tr><td>Analytics &amp; Audit</td><td>Aggregated stock statistics, donation trends, component turnover rates, tamper-evident security audit logs</td></tr>
    </tbody>
  </table>

  <div class="sec-title">4.3 Data Model and Entity Isolation</div>
  <p class="body-text">
    Data modeling in HemoVault balances relational referential integrity with document scalability. Users are the foundational identity entities, referencing distinct profiles (Donor or Hospital). Blood units maintain strict traceability, linking donor identification, component classification, laboratory screening results, and hospital allocation records. Multi-tenant isolation is enforced by scoping queries to authenticated user credentials, preventing unauthorized horizontal access across institutions.
  </p>
  <div class="page-num">21</div>
</div>
`);

// PAGE 22
pages.push(`
<div class="page">
  <div class="sec-title">4.4 Database Diagram</div>
  <p class="body-text">
    The document schema comprises six primary collections structured in MongoDB through Mongoose schemas.
  </p>

  <div style="text-align: center; margin: 10px 0;">
    <div style="transform: scale(0.85); transform-origin: top center; height: 350px;">
      ${classDiagramSvg}
    </div>
    <p style="font-size: 10pt; font-style: italic; margin-top: 5px;">Figure 4.2 Database document model and schema relationships</p>
  </div>

  <table class="report-table" style="margin-top: 10px;">
    <thead>
      <tr><th style="width: 32%;">Collection / Schema</th><th style="width: 68%;">Important fields</th></tr>
    </thead>
    <tbody>
      <tr><td>users</td><td>_id, name, email, password (hashed), role (admin, donor, hospital), phone, createdAt</td></tr>
      <tr><td>blood_inventory</td><td>_id, unitId, bloodGroup, componentType, volumeMl, status (quarantine, available, allocated, discarded), expiryDate</td></tr>
      <tr><td>emergency_requests</td><td>_id, hospitalId, bloodGroup, componentType, unitsRequired, urgency (normal, urgent, critical), status, allocatedUnits</td></tr>
      <tr><td>testing_labs</td><td>_id, unitId, hiv, hbv, hcv, syphilis, malaria, result (passed, failed), testedBy, testedAt</td></tr>
    </tbody>
  </table>
  <div class="page-num">22</div>
</div>
`);

// PAGE 23
pages.push(`
<div class="page">
  <div class="sec-title">4.5 Sequence Diagram</div>
  <p class="body-text">
    The sequence diagram illustrates the lifecycle interactions across stakeholders: user sign-in, donor health screening, laboratory screening, and hospital emergency requisition fulfillment.
  </p>

  <div style="text-align: center; margin: 10px 0;">
    <div style="transform: scale(0.85); transform-origin: top center; height: 380px;">
      ${sequenceEmergencySvg}
    </div>
    <p style="font-size: 10pt; font-style: italic; margin-top: 5px;">Figure 4.3 Sequence of hospital emergency requisition, compatibility matching, and unit dispatch</p>
  </div>

  <p class="body-text">
    The workflow begins when a hospital submits an emergency requisition. The Express server authenticates the token, queries compatible available units, verifies cold-chain validity, and executes atomic allocation, returning confirmation to the hospital while notifying administrative dispatchers.
  </p>
  <div class="page-num">23</div>
</div>
`);

// PAGE 24
pages.push(`
<div class="page">
  <div class="sec-title">4.6 Data Flow and Request Processing</div>
  <p class="body-text">
    Every incoming HTTP request traverses an orchestrated middleware pipeline. The request is sanitized, verified for size constraints, decoded for JWT claims, evaluated against role authorization gates, and processed through transactional database operations before a structured JSON response is emitted.
  </p>

  <div style="text-align: center; margin: 10px 0;">
    <div style="transform: scale(0.85); transform-origin: top center; height: 340px;">
      ${sequenceDonationSvg}
    </div>
    <p style="font-size: 10pt; font-style: italic; margin-top: 5px;">Figure 4.4 Data flow from donor collection through screening to inventory release</p>
  </div>

  <table class="report-table" style="margin-top: 10px;">
    <thead>
      <tr><th style="width: 25%;">Stage</th><th style="width: 35%;">Input</th><th style="width: 40%;">Output</th></tr>
    </thead>
    <tbody>
      <tr><td>Intake &amp; Collection</td><td>Donor vitals, phlebotomy data</td><td>Quarantined unit record with calculated expiry</td></tr>
      <tr><td>Diagnostic Testing</td><td>Screening test results (5 markers)</td><td>Pathology report; passed or discarded status</td></tr>
      <tr><td>Inventory Stocking</td><td>Cleared pathology record</td><td>Unit status transitioned to Available</td></tr>
      <tr><td>Requisition Matching</td><td>Hospital request parameters</td><td>Compatible units identified and locked</td></tr>
    </tbody>
  </table>
  <div class="page-num">24</div>
</div>
`);

// PAGE 25
pages.push(`
<div class="page">
  <div class="sec-title">4.7 Table Design and Record Relationships</div>
  <p class="body-text">
    The data entities within HemoVault have distinct lifecycles and relationship models. User accounts and blood bank center configurations are permanent entities, whereas blood inventory units and laboratory test records remain active until unit transfusion or expiration. Emergency hospital requisitions progress through defined state machines: Pending, Approved, Dispatched, or Cancelled.
  </p>
  <p class="body-text">
    Referential integrity is maintained by storing ObjectIds as foreign references. For example, each BloodInventory unit maintains an optional donor reference and a laboratory test reference. To ensure high-performance querying on high-frequency routes, composite database indexes are established on (bloodGroup, status) and (urgency, status).
  </p>

  <table class="report-table">
    <thead>
      <tr><th style="width: 32%;">Collection group</th><th style="width: 68%;">Relationship and lifecycle</th></tr>
    </thead>
    <tbody>
      <tr><td>users &amp; profiles</td><td>One user owns one donor or hospital profile; persists permanently with authentication credentials</td></tr>
      <tr><td>inventory &amp; components</td><td>One inventory record per collected blood bag; lifecycle transitions: Quarantine &rarr; Available &rarr; Allocated &rarr; Dispatched (or Discarded)</td></tr>
      <tr><td>testing_labs</td><td>One test document per quarantined unit; append-only diagnostic record with technician attribution</td></tr>
      <tr><td>emergency_requests</td><td>One document per hospital request; tracks required units, priority tier, matched unit references, and fulfillment timestamp</td></tr>
      <tr><td>audit_logs</td><td>Append-only compliance ledger recording actor, action, target entity ID, and UTC timestamp</td></tr>
    </tbody>
  </table>

  <p class="body-text" style="margin-top: 14px;">
    Timestamps are formatted as ISO 8601 UTC strings, ensuring uniform temporal consistency across client devices and serverless computing instances.
  </p>
  <div class="page-num">25</div>
</div>
`);

// PAGE 26
pages.push(`
<div class="page">
  <div class="sec-title">4.8 REST Interface and Response Contracts</div>
  <p class="body-text">
    The application interface exposes a predictable, RESTful JSON API using standard HTTP response status codes: 200 for successful retrieval, 201 for resource creation, 400 for validation errors, 401 for unauthenticated requests, 403 for unauthorized access, 404 for missing resources, and 409 for state conflicts (such as double allocation).
  </p>

  <table class="report-table">
    <thead>
      <tr><th style="width: 38%;">Endpoint</th><th style="width: 18%;">Method</th><th style="width: 44%;">Purpose</th></tr>
    </thead>
    <tbody>
      <tr><td>/api/auth/login</td><td>POST</td><td>Authenticate user credentials; return signed JWT token and role</td></tr>
      <tr><td>/api/auth/register</td><td>POST</td><td>Register new donor or hospital user profile</td></tr>
      <tr><td>/api/inventory</td><td>GET / POST</td><td>Retrieve stock matrices; add new quarantined blood unit (Admin)</td></tr>
      <tr><td>/api/inventory/:id</td><td>PUT / DELETE</td><td>Update unit status; discard expired or compromised unit</td></tr>
      <tr><td>/api/requests</td><td>GET / POST</td><td>List requisitions; submit new emergency request (Hospital)</td></tr>
      <tr><td>/api/requests/:id/approve</td><td>PUT</td><td>Allocate compatible stock and approve dispatch (Admin)</td></tr>
      <tr><td>/api/testing</td><td>GET / POST</td><td>List pending tests; record 5-pathogen screening results (Admin)</td></tr>
      <tr><td>/api/donors/eligibility</td><td>POST</td><td>Evaluate donor physiological vitals against clinical rules</td></tr>
      <tr><td>/api/analytics/summary</td><td>GET</td><td>Retrieve aggregate counts, stock health, and turnover rates</td></tr>
    </tbody>
  </table>

  <p class="body-text" style="margin-top: 14px;">
    Every API response provides consistent JSON payloads containing either the requested data object or an informative error message that can be directly rendered in client toast notifications.
  </p>
  <div class="page-num">26</div>
</div>
`);

// PAGE 27
pages.push(`
<div class="page">
  <div class="sec-title">4.9 Interface State and Feedback Design</div>
  <p class="body-text">
    A clinical web application requires an interface that eliminates ambiguity, communicates system state clearly, and prevents accidental operations. Visual styling in HemoVault follows an intentional medical aesthetic: clean slate backgrounds, crimson red accents for blood actions, emerald green for verified safety states, amber for pending screening, and rose red for critical shortage alerts.
  </p>
  <p class="body-text">
    Interactive elements provide responsive micro-animations on hover and focus. High-priority actions, such as emergency requisition approval or biohazard unit disposal, open modal confirmation dialogs requiring explicit verification. Real-time feedback is communicated via floating toast notifications, loading skeletons, and inline error banners.
  </p>

  <table class="report-table">
    <thead>
      <tr><th style="width: 35%;">Interface state</th><th style="width: 65%;">Expected feedback</th></tr>
    </thead>
    <tbody>
      <tr><td>Invalid sign-in</td><td>Toast error stating &quot;Invalid email or password&quot;; password field cleared</td></tr>
      <tr><td>Donor ineligible</td><td>Amber warning card detailing specific deferral reasons (e.g., low hemoglobin)</td></tr>
      <tr><td>Unit quarantined</td><td>Yellow badge &quot;Quarantined - Pending Lab Screening&quot;; release action disabled</td></tr>
      <tr><td>Pathogen detected</td><td>Red biohazard alert; unit status automatically transitions to &quot;Discarded&quot;</td></tr>
      <tr><td>Emergency stock match</td><td>Green compatibility list displaying compatible donor units available for allocation</td></tr>
      <tr><td>Stock depleted</td><td>Red badge &quot;Critical Shortage&quot; with automated notification to regional blood drives</td></tr>
    </tbody>
  </table>

  <p class="body-text" style="margin-top: 14px;">
    The user interface is fully responsive, ensuring flawless operation across desktop laboratory workstations, tablet inspection terminals, and mobile devices.
  </p>
  <div class="page-num">27</div>
</div>
`);

// ==================== CHAPTER 5 (PAGES 28-39) ====================
// PAGE 28
pages.push(`
<div class="page">
  <div class="ch-head">
    <div class="ch-num">CHAPTER 5</div>
    <div class="ch-title">IMPLEMENTATION</div>
  </div>

  <div class="sec-title">5.1 Implementation Overview</div>
  <p class="body-text">
    The HemoVault codebase is organized as a structured full-stack repository. The server directory contains server.js (Express server bootstrap, middleware registration, route mounting), config/db.js (MongoDB connection management with automatic in-memory failover), models/ (Mongoose schemas for Users, Inventory, Requests, Testing, and AuditLogs), controllers/ (business logic for authentication, inventory, testing, and requests), and routes/ (REST endpoint definitions with role guards).
  </p>
  <p class="body-text">
    The client directory contains a Vite-powered React 18 single-page application. Application state is coordinated via React hooks, while API interactions are centralized within services/api.js using configured Axios instances. The api/ directory houses index.js, which exports the Express app as a Vercel serverless function, allowing cloud deployment alongside static client assets as configured in vercel.json.
  </p>

  <div class="sec-title">User Interface Implementation</div>
  <p class="body-text">
    The user interface employs a cohesive, modern medical design system built with custom CSS variables, Plus Jakarta Sans typography, and JetBrains Mono for clinical reference numbers. Key components include:
  </p>
  <ul style="margin: 6px 0 12px 24px; padding: 0; line-height: 1.6; font-size: 11pt;">
    <li><strong>Admin Dashboard:</strong> Overview cards displaying total units, active donors, pending hospital requests, and low-stock warnings, paired with an 8-blood-group matrix.</li>
    <li><strong>Inventory Hub:</strong> Comprehensive table with filtering by blood group, component type, and status, with one-click actions for quarantine intake and disposal.</li>
    <li><strong>Pathology Lab Portal:</strong> Testing interface displaying quarantined units with toggle inputs for HIV, HBV, HCV, Syphilis, and Malaria markers.</li>
    <li><strong>Emergency Dispatch Center:</strong> Prioritized queue of hospital requisitions with automated compatibility calculations and one-click allocation.</li>
    <li><strong>Donor Portal:</strong> Multi-step eligibility questionnaire with instant physiological feedback and appointment booking.</li>
  </ul>
  <div class="page-num">28</div>
</div>
`);

// PAGE 29
pages.push(`
<div class="page">
  <div class="sec-title">5.2 Key Functions and Code Explanation</div>
  <p class="body-text" style="font-weight: bold; margin-bottom: 4px;">Password Hashing and Token Authentication</p>
  <p class="body-text">
    User passwords are encrypted before persistence using bcryptjs with 10 salt rounds. During authentication, bcrypt.compare verifies the submitted password against the stored hash in constant time, preventing timing-attack vulnerabilities. Upon verification, jwt.sign generates a cryptographic token containing user ID and role, valid for 7 days.
  </p>

  <div class="code-box">
<span class="kw">const</span> bcrypt = require(<span class="str">'bcryptjs'</span>);
<span class="kw">const</span> jwt = require(<span class="str">'jsonwebtoken'</span>);

<span class="kw">const</span> hashPassword = <span class="kw">async</span> (password) => {
  <span class="kw">const</span> salt = <span class="kw">await</span> bcrypt.genSalt(<span class="num">10</span>);
  <span class="kw">return</span> <span class="kw">await</span> bcrypt.hash(password, salt);
};

<span class="kw">const</span> generateToken = (user) => {
  <span class="kw">return</span> jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET || <span class="str">'hemovault_jwt_secret'</span>,
    { expiresIn: <span class="str">'7d'</span> }
  );
};
  </div>

  <p class="body-text" style="font-weight: bold; margin-top: 14px; margin-bottom: 4px;">Role-Based Authentication Middleware</p>
  <p class="body-text">
    The protect middleware intercepts requests, extracts the JWT Bearer token, verifies its signature, and attaches the authenticated user record to req.user. The authorize middleware restricts route execution to authorized roles.
  </p>

  <div class="code-box">
<span class="kw">const</span> protect = <span class="kw">async</span> (req, res, next) => {
  <span class="kw">let</span> token = req.headers.authorization?.startsWith(<span class="str">'Bearer'</span>)
    ? req.headers.authorization.split(<span class="str">' '</span>)[<span class="num">1</span>] : <span class="kw">null</span>;
  <span class="kw">if</span> (!token) <span class="kw">return</span> res.status(<span class="num">401</span>).json({ message: <span class="str">'Access denied. No token provided.'</span> });
  <span class="kw">try</span> {
    <span class="kw">const</span> decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = <span class="kw">await</span> User.findById(decoded.id).select(<span class="str">'-password'</span>);
    next();
  } <span class="kw">catch</span> (err) {
    res.status(<span class="num">401</span>).json({ message: <span class="str">'Invalid or expired session token.'</span> });
  }
};

<span class="kw">const</span> authorize = (...roles) => (req, res, next) => {
  <span class="kw">if</span> (!roles.includes(req.user.role)) {
    <span class="kw">return</span> res.status(<span class="num">403</span>).json({ message: <span class="str">'Forbidden: insufficient permissions.'</span> });
  }
  next();
};
  </div>
  <div class="page-num">29</div>
</div>
`);

// PAGE 30
pages.push(`
<div class="page">
  <p class="body-text" style="font-weight: bold; margin-bottom: 4px;">Donor Clinical Eligibility Evaluation</p>
  <p class="body-text">
    The eligibility evaluation engine inspects donor vital signs against NBTC criteria: age must fall between 18 and 65 years, body weight must be at least 50 kg, hemoglobin concentration must exceed 12.5 g/dL, and systolic blood pressure must lie between 100 and 140 mmHg.
  </p>

  <div class="code-box">
<span class="kw">const</span> evaluateEligibility = (vitals) => {
  <span class="kw">const</span> reasons = [];
  <span class="kw">if</span> (vitals.age &lt; <span class="num">18</span> || vitals.age &gt; <span class="num">65</span>)
    reasons.push(<span class="str">'Age must be between 18 and 65 years.'</span>);
  <span class="kw">if</span> (vitals.weight &lt; <span class="num">50</span>)
    reasons.push(<span class="str">'Minimum body weight requirement is 50 kg.'</span>);
  <span class="kw">if</span> (vitals.hemoglobin &lt; <span class="num">12.5</span>)
    reasons.push(<span class="str">'Hemoglobin level must be at least 12.5 g/dL.'</span>);
  <span class="kw">if</span> (vitals.systolicBP &lt; <span class="num">100</span> || vitals.systolicBP &gt; <span class="num">140</span>)
    reasons.push(<span class="str">'Systolic blood pressure must be within 100-140 mmHg.'</span>);
  <span class="kw">if</span> (vitals.daysSinceLastDonation !== <span class="kw">null</span> &amp;&amp; vitals.daysSinceLastDonation &lt; <span class="num">90</span>)
    reasons.push(<span class="str">'Minimum interval between whole blood donations is 90 days.'</span>);
  
  <span class="kw">return</span> {
    eligible: reasons.length === <span class="num">0</span>,
    reasons
  };
};
  </div>

  <p class="body-text" style="font-weight: bold; margin-top: 14px; margin-bottom: 4px;">Automated Expiration Date Computation</p>
  <p class="body-text">
    When a blood unit is collected, its expiration timestamp is calculated on the server using preservation shelf-life coefficients for red cells (42 days), platelets (5 days), and plasma (365 days).
  </p>

  <div class="code-box">
<span class="kw">const</span> calculateExpiryDate = (componentType, collectionDate = <span class="kw">new</span> Date()) => {
  <span class="kw">const</span> expiry = <span class="kw">new</span> Date(collectionDate);
  <span class="kw">switch</span> (componentType) {
    <span class="kw">case</span> <span class="str">'Platelets'</span>:
      expiry.setDate(expiry.getDate() + <span class="num">5</span>); <span class="kw">break</span>;
    <span class="kw">case</span> <span class="str">'Packed Red Blood Cells'</span>:
    <span class="kw">case</span> <span class="str">'Whole Blood'</span>:
      expiry.setDate(expiry.getDate() + <span class="num">42</span>); <span class="kw">break</span>;
    <span class="kw">case</span> <span class="str">'Fresh Frozen Plasma'</span>:
      expiry.setDate(expiry.getDate() + <span class="num">365</span>); <span class="kw">break</span>;
    <span class="kw">default</span>:
      expiry.setDate(expiry.getDate() + <span class="num">42</span>);
  }
  <span class="kw">return</span> expiry;
};
  </div>
  <div class="page-num">30</div>
</div>
`);

// PAGE 31
pages.push(`
<div class="page">
  <p class="body-text" style="font-weight: bold; margin-bottom: 4px;">Laboratory Screening and Quarantine Gatekeeper</p>
  <p class="body-text">
    The pathology testing controller ensures that no quarantined blood unit is released into active stock unless all five diagnostic pathogen markers return negative. If any test returns positive, the unit is immediately quarantined permanently and marked for disposal.
  </p>

  <div class="code-box">
<span class="kw">const</span> processLabResults = <span class="kw">async</span> (req, res) => {
  <span class="kw">const</span> { unitId, hiv, hbv, hcv, syphilis, malaria } = req.body;
  <span class="kw">const</span> unit = <span class="kw">await</span> BloodInventory.findById(unitId);
  <span class="kw">if</span> (!unit) <span class="kw">return</span> res.status(<span class="num">404</span>).json({ message: <span class="str">'Unit not found'</span> });

  <span class="kw">const</span> hasPathogen = hiv || hbv || hcv || syphilis || malaria;
  <span class="kw">const</span> status = hasPathogen ? <span class="str">'discarded'</span> : <span class="str">'available'</span>;

  <span class="kw">const</span> labRecord = <span class="kw">await</span> TestingLab.create({
    unitId: unit._id,
    hiv: !!hiv, hbv: !!hbv, hcv: !!hcv,
    syphilis: !!syphilis, malaria: !!malaria,
    result: hasPathogen ? <span class="str">'failed'</span> : <span class="str">'passed'</span>,
    testedBy: req.user.name,
    testedAt: <span class="kw">new</span> Date()
  });

  unit.status = status;
  <span class="kw">await</span> unit.save();

  <span class="kw">await</span> AuditLog.create({
    actor: req.user.name,
    action: hasPathogen ? <span class="str">'unit.quarantine_discard'</span> : <span class="str">'unit.released'</span>,
    details: <span class="str">\`Unit \${unit.unitId} \${status} after lab screening\`</span>
  });

  res.status(<span class="num">200</span>).json({ message: <span class="str">\`Unit updated to \${status}\`</span>, labRecord });
};
  </div>

  <p class="body-text" style="font-weight: bold; margin-top: 14px; margin-bottom: 4px;">Emergency Requisition Compatibility Engine</p>
  <p class="body-text">
    When a hospital submits an emergency request, the server queries available inventory units matching valid immunological donor groups and allocates units atomically.
  </p>

  <div class="code-box">
<span class="kw">const</span> COMPATIBILITY_MAP = {
  <span class="str">'A+'</span>:  [<span class="str">'A+'</span>, <span class="str">'A-'</span>, <span class="str">'O+'</span>, <span class="str">'O-'</span>],
  <span class="str">'A-'</span>:  [<span class="str">'A-'</span>, <span class="str">'O-'</span>],
  <span class="str">'B+'</span>:  [<span class="str">'B+'</span>, <span class="str">'B-'</span>, <span class="str">'O+'</span>, <span class="str">'O-'</span>],
  <span class="str">'B-'</span>:  [<span class="str">'B-'</span>, <span class="str">'O-'</span>],
  <span class="str">'AB+'</span>: [<span class="str">'A+'</span>, <span class="str">'A-'</span>, <span class="str">'B+'</span>, <span class="str">'B-'</span>, <span class="str">'AB+'</span>, <span class="str">'AB-'</span>, <span class="str">'O+'</span>, <span class="str">'O-'</span>],
  <span class="str">'AB-'</span>: [<span class="str">'AB-'</span>, <span class="str">'A-'</span>, <span class="str">'B-'</span>, <span class="str">'O-'</span>],
  <span class="str">'O+'</span>:  [<span class="str">'O+'</span>, <span class="str">'O-'</span>],
  <span class="str">'O-'</span>:  [<span class="str">'O-'</span>]
};
  </div>
  <div class="page-num">31</div>
</div>
`);

// PAGE 32
pages.push(`
<div class="page">
  <div class="sec-title">5.3 End to End Donor Registration &amp; Donation Workflow</div>
  <p class="body-text">
    The voluntary donor workflow begins when a prospective donor visits the web application and creates an account. After logging in, the donor accesses the Donor Portal and opens the Clinical Eligibility Questionnaire. The client interface prompts the donor to input age, weight, last donation date, and general wellness status.
  </p>

  <div style="text-align: center; margin: 10px 0;">
    ${imgLogin ? `<img src="${imgLogin}" style="width: 85%; max-height: 160px; object-fit: contain; border: 1px solid #cbd5e1; border-radius: 4px;" />` : ''}
    <p style="font-size: 10pt; font-style: italic; margin-top: 4px;">Figure 5.1 Donor registration and appointment booking interface</p>
  </div>

  <p class="body-text">
    The donor selects a preferred regional blood drive location and appointment date. Upon arrival at the phlebotomy center, the technician performs an automated vitals check. Once confirmed, 450 mL of whole blood is drawn, barcoded, and entered into the HemoVault platform with Quarantined status.
  </p>

  <table class="report-table">
    <thead>
      <tr><th style="width: 30%;">Step</th><th style="width: 70%;">Donor check</th></tr>
    </thead>
    <tbody>
      <tr><td>Sign in &amp; profile check</td><td>Verify registered contact details and historical donation record</td></tr>
      <tr><td>Health questionnaire</td><td>Complete self-declaration regarding medication, travel, and symptoms</td></tr>
      <tr><td>Vitals screening</td><td>Confirm weight &ge; 50 kg, hemoglobin &ge; 12.5 g/dL, and BP within normal range</td></tr>
      <tr><td>Appointment selection</td><td>Choose convenient time slot and blood drive center location</td></tr>
      <tr><td>Post-donation card</td><td>Receive digital donor confirmation card with next permissible donation date</td></tr>
    </tbody>
  </table>
  <div class="page-num">32</div>
</div>
`);

// PAGE 33
pages.push(`
<div class="page">
  <div class="sec-title">5.4 Hospital Emergency Requisition Workflow</div>
  <p class="body-text">
    When a partner hospital encounters a surgical or trauma emergency, the hospital coordinator logs into the Hospital Portal and creates an emergency requisition. The coordinator specifies the recipient patient ID, required blood group, component type, unit count, and urgency tier (Normal, Urgent, or Critical).
  </p>

  <div style="text-align: center; margin: 10px 0;">
    ${imgRequests ? `<img src="${imgRequests}" style="width: 85%; max-height: 170px; object-fit: contain; border: 1px solid #cbd5e1; border-radius: 4px;" />` : ''}
    <p style="font-size: 10pt; font-style: italic; margin-top: 4px;">Figure 5.2 Hospital emergency request queue and real-time inventory allocation interface</p>
  </div>

  <p class="body-text">
    The requisition is instantly placed into the prioritized administrative queue. Critical requisitions trigger high-visibility alerts on the blood bank admin dashboard. The compatibility engine matches available, non-expired units. Upon admin approval, the units transition to Allocated status, locking the stock to prevent duplicate assignment while hospital transport dispatch is initiated.
  </p>
  <div class="page-num">33</div>
</div>
`);

// PAGE 34
pages.push(`
<div class="page">
  <div class="sec-title">5.5 Worked Example of Blood Matching and Allocation</div>
  <p class="body-text">
    The following worked example illustrates how the compatibility and allocation engine processes an emergency requisition. Suppose City Trauma Hospital submits a critical requisition for 3 units of B-positive Packed Red Blood Cells for an acute hemorrhage patient.
  </p>
  <p class="body-text">
    The compatibility algorithm evaluates the recipient blood group (B+) against the ABO/Rh matrix. Permissible donor groups for B-positive recipients are B+, B-, O+, and O-. The system queries available inventory units matching these groups sorted by First-Expiry-First-Out (FEFO) order.
  </p>

  <table class="report-table">
    <thead>
      <tr><th style="width: 30%;">Quantity</th><th style="width: 25%;">Value</th><th style="width: 45%;">Derivation</th></tr>
    </thead>
    <tbody>
      <tr><td>Patient Blood Group</td><td>B+ (Rh Positive)</td><td>Clinical requisition parameter</td></tr>
      <tr><td>Component Requested</td><td>Packed Red Blood Cells</td><td>Target blood component type</td></tr>
      <tr><td>Units Requested</td><td>3 Units</td><td>Requisition volume requirement</td></tr>
      <tr><td>Permissible Donor Groups</td><td>B+, B-, O+, O-</td><td>ABO/Rh compatibility matrix lookup</td></tr>
      <tr><td>Available Exact Matches</td><td>2 Units (B+)</td><td>Queried from available stock</td></tr>
      <tr><td>Compatible Alternate</td><td>1 Unit (O+)</td><td>Universal compatible fallback (FEFO)</td></tr>
      <tr><td>Allocation Outcome</td><td>3 Units Allocated</td><td>2 Units B+, 1 Unit O+ allocated atomically</td></tr>
      <tr><td>Stock Balance Update</td><td>B+: 12 &rarr; 10, O+: 8 &rarr; 7</td><td>Atomic database decrement</td></tr>
    </tbody>
  </table>

  <p class="body-text" style="margin-top: 14px;">
    The requisition is updated to Approved, the matched unit IDs are bound to the requisition record, and an audit log entry records the exact allocation breakdown.
  </p>
  <div class="page-num">34</div>
</div>
`);

// PAGE 35
pages.push(`
<div class="page">
  <div class="sec-title">5.6 Cold Storage &amp; Expiration Lifecycle</div>
  <p class="body-text">
    Blood products undergo a deterministic state progression throughout their lifespan. Units are stored in specialized refrigerated cold-storage units equipped with calibrated temperature sensors (2°C–6°C for red cells, 20°C–24°C for platelets, and &le; -18°C for plasma). The HemoVault server tracks expiration timestamps continuously.
  </p>

  <table class="report-table">
    <thead>
      <tr><th style="width: 28%;">State</th><th style="width: 72%;">Meaning</th></tr>
    </thead>
    <tbody>
      <tr><td>Quarantined</td><td>Unit freshly collected; stored in quarantine refrigeration awaiting mandatory 5-pathogen laboratory testing</td></tr>
      <tr><td>Available</td><td>Pathogen testing confirmed negative; unit cleared for compatibility matching and emergency clinical allocation</td></tr>
      <tr><td>Allocated</td><td>Unit assigned to an approved hospital requisition; locked to prevent duplicate allocation; awaiting courier dispatch</td></tr>
      <tr><td>Dispatched</td><td>Unit handed over to hospital cold-chain transport courier with physical chain-of-custody transfer documentation</td></tr>
      <tr><td>Expired</td><td>Unit has exceeded permissible storage shelf-life; automatically flagged and blocked from clinical allocation</td></tr>
      <tr><td>Discarded</td><td>Unit has been safely retired due to expiration, biohazard screening failure, or packaging compromise</td></tr>
    </tbody>
  </table>

  <p class="body-text" style="margin-top: 14px;">
    The dashboard highlights units approaching expiration (within 7 days for red cells, within 24 hours for platelets) in yellow, prompting administrators to prioritize their allocation to high-demand facilities to prevent unnecessary biological waste.
  </p>
  <div class="page-num">35</div>
</div>
`);

// PAGE 36
pages.push(`
<div class="page">
  <div class="sec-title">5.7 Deployment Configuration and Persistence</div>
  <p class="body-text">
    HemoVault is designed to deploy seamlessly across diverse hosting environments: local development workstations, on-premises hospital servers, and cloud serverless architectures like Vercel.
  </p>
  <p class="body-text">
    The application repository includes vercel.json, which configures serverless routing by directing all API calls to api/index.js. To guarantee zero-configuration local evaluation, config/db.js implements an intelligent dual-connection strategy: if an external MONGODB_URI is provided, it connects to MongoDB Atlas; if no connection string is set, it automatically boots an in-memory MongoMemoryServer and runs the database seed routine.
  </p>

  <table class="report-table">
    <thead>
      <tr><th style="width: 32%;">Setting</th><th style="width: 68%;">Purpose</th></tr>
    </thead>
    <tbody>
      <tr><td>PORT</td><td>HTTP port on which Express server listens (default: 5001)</td></tr>
      <tr><td>MONGODB_URI</td><td>Connection string for MongoDB Atlas; falls back to embedded in-memory database</td></tr>
      <tr><td>JWT_SECRET</td><td>Cryptographic secret key for signing and verifying stateless user session tokens</td></tr>
      <tr><td>JWT_EXPIRE</td><td>Token validity duration (default: 7 days)</td></tr>
      <tr><td>NODE_ENV</td><td>Environment mode; 'production' enables secure cookies, strict CORS, and disables stack traces</td></tr>
      <tr><td>buildCommand</td><td>Vercel build script: installs client dependencies and runs Vite production build</td></tr>
      <tr><td>outputDirectory</td><td>Output directory for compiled client SPA assets (dist/)</td></tr>
    </tbody>
  </table>

  <p class="body-text" style="margin-top: 14px;">
    Demonstration user accounts are seeded automatically on first launch: admin@hemovault.com, donor@hemovault.com, and hospital@hemovault.com, enabling immediate end-to-end testing.
  </p>
  <div class="page-num">36</div>
</div>
`);

// PAGE 37
pages.push(`
<div class="page">
  <div class="sec-title">5.8 Security Hardening Measures</div>
  <p class="body-text">
    Security measures are implemented in multiple defense-in-depth layers to safeguard sensitive medical records and prevent unauthorized operations. At the transport layer, HTTPS encryption protects all client-server communications against eavesdropping.
  </p>
  <p class="body-text">
    At the application layer, passwords are encrypted using bcryptjs with unique salts. JSON payloads are restricted to 100 KB to mitigate denial-of-service memory exhaustion. Parameterized Mongoose queries prevent NoSQL injection, and incoming text is sanitized to eliminate Cross-Site Scripting (XSS) risks.
  </p>

  <table class="report-table">
    <thead>
      <tr><th style="width: 35%;">Threat</th><th style="width: 65%;">Mitigation implemented</th></tr>
    </thead>
    <tbody>
      <tr><td>Credential brute-forcing</td><td>Bcrypt computational work factor; rate limiting on authentication routes</td></tr>
      <tr><td>Token tampering</td><td>Cryptographic HMAC-SHA256 signature verification on all incoming JWTs</td></tr>
      <tr><td>NoSQL query injection</td><td>Mongoose schema type enforcement; strict casting of query parameters</td></tr>
      <tr><td>Cross-Site Scripting (XSS)</td><td>React virtual DOM text escaping; sanitized inputs before database insertion</td></tr>
      <tr><td>Horizontal data access</td><td>Role-based middleware and object ownership verification on all endpoints</td></tr>
      <tr><td>Double unit allocation</td><td>Atomic conditional updates verify available status before unit reservation</td></tr>
    </tbody>
  </table>

  <p class="body-text" style="margin-top: 14px;">
    These layered security controls ensure that patient confidentiality, donor records, and inventory balances remain protected against unauthorized modification.
  </p>
  <div class="page-num">37</div>
</div>
`);

// PAGE 38
pages.push(`
<div class="page">
  <div class="sec-title">5.9 Test Coverage and Regression Traceability</div>
  <p class="body-text">
    System verification combines automated integration testing with manual clinical validation. The automated test suite exercises core API workflows against an active server instance, verifying authentication, authorization guards, stock updates, and error handling.
  </p>

  <table class="report-table">
    <thead>
      <tr><th style="width: 35%;">Requirement</th><th style="width: 65%;">Verification in the test</th></tr>
    </thead>
    <tbody>
      <tr><td>Authentication enforcement</td><td>Unauthenticated request to /api/inventory returns 401 Unauthorized</td></tr>
      <tr><td>Role permission enforcement</td><td>Donor token accessing Admin testing route returns 403 Forbidden</td></tr>
      <tr><td>Donor eligibility logic</td><td>Out-of-range vitals return eligible: false with exact deferral message</td></tr>
      <tr><td>Quarantine gatekeeping</td><td>New unit created with quarantine status; blocked from emergency matching</td></tr>
      <tr><td>Pathogen clearance release</td><td>Negative lab screening transitions unit status to available (200 OK)</td></tr>
      <tr><td>Emergency request allocation</td><td>Compatible stock allocated; unit count decrements atomically</td></tr>
    </tbody>
  </table>

  <p class="body-text" style="margin-top: 14px;">
    Manual testing validated responsive interface rendering across desktop screens, tablets, and smartphones, confirming that layout elements, modal dialogs, and tables remain clear and accessible.
  </p>
  <div class="page-num">38</div>
</div>
`);

// PAGE 39
pages.push(`
<div class="page">
  <div class="sec-title">5.10 Operating Guide and Troubleshooting</div>
  <p class="body-text">
    Standard operation begins by launching the backend server and frontend client. Administrators log in to inspect the main dashboard, verify inventory matrices, and evaluate quarantined units in the Pathology Lab portal.
  </p>

  <table class="report-table">
    <thead>
      <tr><th style="width: 32%;">Symptom</th><th style="width: 68%;">First investigation</th></tr>
    </thead>
    <tbody>
      <tr><td>Cannot sign in</td><td>Verify email and password; confirm user account exists in database seed</td></tr>
      <tr><td>Stock balance unchanged</td><td>Check if unit is still in Quarantined status; verify lab test passed</td></tr>
      <tr><td>Emergency request pending</td><td>Check available compatible stock; verify units are not expired or allocated</td></tr>
      <tr><td>Port already in use</td><td>Terminate conflicting node process or set a different PORT (e.g., PORT=5002)</td></tr>
      <tr><td>Database connection failure</td><td>Confirm MongoDB daemon is running locally or verify Atlas connection string</td></tr>
      <tr><td>CORS header error</td><td>Verify client URL is allowed in Express cors configuration middleware</td></tr>
    </tbody>
  </table>

  <p class="body-text" style="margin-top: 14px;">
    System operators should consult console logs for diagnostic error messages. In production environments, database backups should be performed regularly before deploying software updates.
  </p>
  <div class="page-num">39</div>
</div>
`);

// ==================== CHAPTER 6 (PAGES 40-41) ====================
// PAGE 40
pages.push(`
<div class="page">
  <div class="ch-head">
    <div class="ch-num">CHAPTER 6</div>
    <div class="ch-title">CONCLUSION AND FUTURE WORK</div>
  </div>

  <div class="sec-title">6.1 Conclusion</div>
  <p class="body-text">
    The HemoVault Centralized Blood Bank Management System demonstrates a reliable, auditable, and resilient full-stack web application designed for regional healthcare networks. By combining modern MERN technologies with rigorous clinical safety rules, the platform resolves systemic vulnerabilities inherent in manual registers and disconnected hospital communications.
  </p>
  <p class="body-text">
    The system enforces donor physiological eligibility, automates component expiration tracking, guarantees that only pathogen-cleared units enter active stock, and accelerates emergency blood allocation through an intelligent ABO/Rh compatibility engine. Role-based access control, cryptographic JWT session management, and comprehensive audit logs ensure strict operational governance. The platform is deployable on modern serverless cloud infrastructure while supporting zero-configuration local execution.
  </p>

  <div class="sec-title">6.2 Future Enhancements</div>
  <p class="body-text">
    Subsequent development phases will incorporate advanced features to further optimize transfusion logistics:
  </p>
  <ul style="margin: 6px 0 12px 24px; padding: 0; line-height: 1.6; font-size: 11pt;">
    <li><strong>Automated SMS/WhatsApp Alerts:</strong> Automated notification dispatch to registered compatible voluntary donors when regional stock falls below emergency thresholds.</li>
    <li><strong>Barcode and RFID Scanning:</strong> Hardware integration for instant scanning of blood bags during phlebotomy, refrigeration storage, and courier dispatch.</li>
    <li><strong>Hospital EHR Integration:</strong> HL7 and FHIR API standards support for direct interoperability with electronic health record platforms.</li>
    <li><strong>Predictive Demand Forecasting:</strong> Machine learning models analyzing historical transfusion trends and seasonal demand patterns to optimize blood drive scheduling.</li>
  </ul>
  <div class="page-num">40</div>
</div>
`);

// PAGE 41
pages.push(`
<div class="page">
  <div class="sec-title">6.3 Evaluation Limits and Enhancement Priorities</div>
  <p class="body-text">
    The project supports a clear and bounded conclusion: the implemented software successfully manages blood bank workflows end to end, enforcing clinical eligibility, quarantine screening, and emergency allocation. It does not replace physical blood testing equipment, sterile medical phlebotomy, or clinical laboratory procedures.
  </p>
  <p class="body-text">
    Future enhancements should be prioritized according to clinical impact, regulatory compliance, and operational feasibility.
  </p>

  <table class="report-table">
    <thead>
      <tr><th style="width: 20%;">Priority</th><th style="width: 45%;">Proposed work</th><th style="width: 35%;">Reason</th></tr>
    </thead>
    <tbody>
      <tr><td>First</td><td>Managed MongoDB Atlas deployment with automated daily backups</td><td>Guarantees permanent data persistence across cloud instances</td></tr>
      <tr><td>First</td><td>Automated donor SMS/email notification pipeline</td><td>Enables immediate donor mobilization during acute shortages</td></tr>
      <tr><td>Next</td><td>Barcode/QR-code physical label printing and scanning</td><td>Eliminates manual unit ID entry errors during blood intake</td></tr>
      <tr><td>Next</td><td>Multi-hospital geo-location routing and transit tracking</td><td>Optimizes transport logistics during trauma surgical emergencies</td></tr>
      <tr><td>Next</td><td>HL7/FHIR healthcare interoperability interface</td><td>Enables seamless electronic record synchronization with hospitals</td></tr>
      <tr><td>Research</td><td>Time-series predictive inventory forecasting</td><td>Anticipates seasonal blood shortages based on historical data</td></tr>
    </tbody>
  </table>

  <p class="body-text" style="margin-top: 14px;">
    This roadmap ensures that future development continues to enhance patient safety, streamline clinical workflows, and expand transfusion accessibility across healthcare networks.
  </p>
  <div class="page-num">41</div>
</div>
`);

// ==================== APPENDIX (PAGES 42-47) ====================
// PAGE 42
pages.push(`
<div class="page">
  <div style="text-align: center; margin-bottom: 20px;">
    <p style="font-weight: bold; font-size: 12pt; margin: 0 0 4px 0;">GITHUB LINK</p>
    <p style="font-size: 11pt; color: #0044cc; margin: 0 0 20px 0;">
      https://github.com/priyan071/blood-banks-management-system
    </p>
    <h2 style="font-size: 13pt; font-weight: bold; margin: 0 0 15px 0; letter-spacing: 0.5px;">
      APPENDIX SOURCE CODE
    </h2>
  </div>

  <div class="sec-title">A1 Project Structure</div>
  <div class="code-box">
blood-bank-system/
  server/
    src/
      server.js           # Express app bootstrap, middleware, route mounting
      config/db.js        # MongoDB connection with in-memory failover
      models/             # Mongoose schemas: User, Inventory, Request, Lab
      controllers/        # Business logic for auth, stock, testing, requests
      routes/             # REST API endpoint route definitions
      seeds/seed.js       # Initial seed data for admin, donors, and hospitals
  client/
    src/
      App.jsx             # React router, navigation layout, toast provider
      pages/              # Admin dashboard, inventory, lab, emergency requests
      services/api.js     # Centralized Axios API client configuration
  api/
    index.js              # Vercel serverless entry point
  vercel.json             # Vercel cloud deployment and SPA rewrite rules
  package.json            # Root dependency configuration and scripts
  </div>

  <div class="sec-title">A2 Installation and Run</div>
  <div class="code-box">
# Install root, server, and client dependencies
npm install
cd client &amp;&amp; npm install &amp;&amp; cd ..

# Launch development environment (concurrently boots server &amp; client)
npm run dev

# Server runs on: http://localhost:5001
# Client runs on: http://localhost:5173

# Production build and preview
npm run build
npm start
  </div>

  <p class="body-text" style="margin-top: 10px; font-size: 10.5pt;">
    The remaining appendix items show representative excerpts from the codebase. The full repository is available at the GitHub link above.
  </p>
  <div class="page-num">42</div>
</div>
`);

// PAGE 43
pages.push(`
<div class="page">
  <div style="text-align: center; margin-bottom: 20px;">
    <h2 style="font-size: 13pt; font-weight: bold; margin: 0 0 15px 0; letter-spacing: 0.5px;">
      APPENDIX DATABASE SCHEMA
    </h2>
  </div>

  <div class="sec-title">A3 Mongoose Schemas</div>
  <div class="code-box">
<span class="kw">const</span> mongoose = require(<span class="str">'mongoose'</span>);

<span class="kw">const</span> userSchema = <span class="kw">new</span> mongoose.Schema({
  name: { type: String, required: <span class="kw">true</span> },
  email: { type: String, required: <span class="kw">true</span>, unique: <span class="kw">true</span> },
  password: { type: String, required: <span class="kw">true</span> },
  role: { type: String, enum: [<span class="str">'admin'</span>, <span class="str">'donor'</span>, <span class="str">'hospital'</span>], default: <span class="str">'donor'</span> },
  phone: { type: String },
  createdAt: { type: Date, default: Date.now }
});

<span class="kw">const</span> bloodInventorySchema = <span class="kw">new</span> mongoose.Schema({
  unitId: { type: String, required: <span class="kw">true</span>, unique: <span class="kw">true</span> },
  bloodGroup: { type: String, required: <span class="kw">true</span>,
    enum: [<span class="str">'A+'</span>, <span class="str">'A-'</span>, <span class="str">'B+'</span>, <span class="str">'B-'</span>, <span class="str">'AB+'</span>, <span class="str">'AB-'</span>, <span class="str">'O+'</span>, <span class="str">'O-'</span>] },
  componentType: { type: String, required: <span class="kw">true</span>,
    enum: [<span class="str">'Whole Blood'</span>, <span class="str">'Packed Red Blood Cells'</span>, <span class="str">'Platelets'</span>, <span class="str">'Fresh Frozen Plasma'</span>] },
  volumeMl: { type: Number, default: <span class="num">450</span> },
  status: { type: String, enum: [<span class="str">'quarantined'</span>, <span class="str">'available'</span>, <span class="str">'allocated'</span>, <span class="str">'discarded'</span>],
    default: <span class="str">'quarantined'</span> },
  donorId: { type: mongoose.Schema.Types.ObjectId, ref: <span class="str">'User'</span> },
  collectedDate: { type: Date, default: Date.now },
  expiryDate: { type: Date, required: <span class="kw">true</span> }
});

<span class="kw">const</span> emergencyRequestSchema = <span class="kw">new</span> mongoose.Schema({
  hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: <span class="str">'User'</span>, required: <span class="kw">true</span> },
  hospitalName: { type: String, required: <span class="kw">true</span> },
  bloodGroup: { type: String, required: <span class="kw">true</span> },
  componentType: { type: String, required: <span class="kw">true</span> },
  unitsRequired: { type: Number, required: <span class="kw">true</span>, min: <span class="num">1</span> },
  urgency: { type: String, enum: [<span class="str">'normal'</span>, <span class="str">'urgent'</span>, <span class="str">'critical'</span>], default: <span class="str">'urgent'</span> },
  status: { type: String, enum: [<span class="str">'pending'</span>, <span class="str">'approved'</span>, <span class="str">'rejected'</span>, <span class="str">'fulfilled'</span>],
    default: <span class="str">'pending'</span> },
  allocatedUnits: [{ type: String }],
  requestedAt: { type: Date, default: Date.now }
});
  </div>
  <div class="page-num">43</div>
</div>
`);

// PAGE 44
pages.push(`
<div class="page">
  <div style="text-align: center; margin-bottom: 20px;">
    <h2 style="font-size: 13pt; font-weight: bold; margin: 0 0 15px 0; letter-spacing: 0.5px;">
      APPENDIX AUTHENTICATION
    </h2>
  </div>

  <div class="sec-title">A4 Login and Registration Controller</div>
  <div class="code-box">
<span class="kw">const</span> login = <span class="kw">async</span> (req, res) => {
  <span class="kw">const</span> { email, password } = req.body;
  <span class="kw">if</span> (!email || !password)
    <span class="kw">return</span> res.status(<span class="num">400</span>).json({ message: <span class="str">'Email and password are required'</span> });

  <span class="kw">const</span> user = <span class="kw">await</span> User.findOne({ email });
  <span class="kw">if</span> (!user)
    <span class="kw">return</span> res.status(<span class="num">401</span>).json({ message: <span class="str">'Invalid email or password'</span> });

  <span class="kw">const</span> isMatch = <span class="kw">await</span> bcrypt.compare(password, user.password);
  <span class="kw">if</span> (!isMatch)
    <span class="kw">return</span> res.status(<span class="num">401</span>).json({ message: <span class="str">'Invalid email or password'</span> });

  <span class="kw">const</span> token = generateToken(user);
  res.status(<span class="num">200</span>).json({
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role }
  });
};

<span class="kw">const</span> register = <span class="kw">async</span> (req, res) => {
  <span class="kw">const</span> { name, email, password, role, phone } = req.body;
  <span class="kw">const</span> existing = <span class="kw">await</span> User.findOne({ email });
  <span class="kw">if</span> (existing)
    <span class="kw">return</span> res.status(<span class="num">400</span>).json({ message: <span class="str">'Email is already registered'</span> });

  <span class="kw">const</span> hashedPassword = <span class="kw">await</span> hashPassword(password);
  <span class="kw">const</span> user = <span class="kw">await</span> User.create({
    name, email, password: hashedPassword, role: role || <span class="str">'donor'</span>, phone
  });
  <span class="kw">const</span> token = generateToken(user);
  res.status(<span class="num">201</span>).json({ token, user: { id: user._id, name, email, role: user.role } });
};
  </div>

  <div class="sec-title">A5 Session Profile Endpoint</div>
  <div class="code-box">
<span class="kw">const</span> getProfile = <span class="kw">async</span> (req, res) => {
  <span class="kw">const</span> user = <span class="kw">await</span> User.findById(req.user.id).select(<span class="str">'-password'</span>);
  res.status(<span class="num">200</span>).json(user);
};
  </div>
  <div class="page-num">44</div>
</div>
`);

// PAGE 45
pages.push(`
<div class="page">
  <div style="text-align: center; margin-bottom: 20px;">
    <h2 style="font-size: 13pt; font-weight: bold; margin: 0 0 15px 0; letter-spacing: 0.5px;">
      APPENDIX INVENTORY AND REQUISITION
    </h2>
  </div>

  <div class="sec-title">A6 Inventory Retrieval and Intake</div>
  <div class="code-box">
<span class="kw">const</span> getInventory = <span class="kw">async</span> (req, res) => {
  <span class="kw">const</span> filter = {};
  <span class="kw">if</span> (req.query.bloodGroup) filter.bloodGroup = req.query.bloodGroup;
  <span class="kw">if</span> (req.query.status) filter.status = req.query.status;

  <span class="kw">const</span> units = <span class="kw">await</span> BloodInventory.find(filter).sort({ expiryDate: <span class="num">1</span> });
  res.status(<span class="num">200</span>).json(units);
};

<span class="kw">const</span> addUnit = <span class="kw">async</span> (req, res) => {
  <span class="kw">const</span> { bloodGroup, componentType, volumeMl, donorId } = req.body;
  <span class="kw">const</span> unitId = <span class="str">'BLD-'</span> + Date.now().toString().slice(-<span class="num">6</span>);
  <span class="kw">const</span> expiryDate = calculateExpiryDate(componentType);

  <span class="kw">const</span> unit = <span class="kw">await</span> BloodInventory.create({
    unitId, bloodGroup, componentType, volumeMl: volumeMl || <span class="num">450</span>,
    status: <span class="str">'quarantined'</span>, donorId, expiryDate
  });
  res.status(<span class="num">201</span>).json(unit);
};
  </div>

  <div class="sec-title">A7 Emergency Requisition Dispatch</div>
  <div class="code-box">
<span class="kw">const</span> approveRequest = <span class="kw">async</span> (req, res) => {
  <span class="kw">const</span> request = <span class="kw">await</span> EmergencyRequest.findById(req.params.id);
  <span class="kw">if</span> (!request) <span class="kw">return</span> res.status(<span class="num">404</span>).json({ message: <span class="str">'Request not found'</span> });

  <span class="kw">const</span> compatibleGroups = COMPATIBILITY_MAP[request.bloodGroup] || [request.bloodGroup];
  <span class="kw">const</span> matchingUnits = <span class="kw">await</span> BloodInventory.find({
    bloodGroup: { <span class="kw">$in</span>: compatibleGroups },
    componentType: request.componentType,
    status: <span class="str">'available'</span>,
    expiryDate: { <span class="kw">$gt</span>: <span class="kw">new</span> Date() }
  }).sort({ expiryDate: <span class="num">1</span> }).limit(request.unitsRequired);

  <span class="kw">if</span> (matchingUnits.length &lt; request.unitsRequired) {
    <span class="kw">return</span> res.status(<span class="num">409</span>).json({ message: <span class="str">'Insufficient compatible stock available.'</span> });
  }

  <span class="kw">const</span> allocatedIds = matchingUnits.map(u => u.unitId);
  <span class="kw">await</span> BloodInventory.updateMany(
    { _id: { <span class="kw">$in</span>: matchingUnits.map(u => u._id) } },
    { <span class="kw">$set</span>: { status: <span class="str">'allocated'</span> } }
  );

  request.status = <span class="str">'approved'</span>;
  request.allocatedUnits = allocatedIds;
  <span class="kw">await</span> request.save();

  res.status(<span class="num">200</span>).json({ message: <span class="str">'Request approved and units allocated'</span>, request });
};
  </div>
  <div class="page-num">45</div>
</div>
`);

// PAGE 46
pages.push(`
<div class="page">
  <div style="text-align: center; margin-bottom: 20px;">
    <h2 style="font-size: 13pt; font-weight: bold; margin: 0 0 15px 0; letter-spacing: 0.5px;">
      APPENDIX LABORATORY SCREENING
    </h2>
  </div>

  <div class="sec-title">A8 Pathology Testing Routes</div>
  <div class="code-box">
<span class="kw">const</span> express = require(<span class="str">'express'</span>);
<span class="kw">const</span> router = express.Router();
<span class="kw">const</span> { protect, authorize } = require(<span class="str">'../middleware/auth'</span>);

router.get(<span class="str">'/pending'</span>, protect, authorize(<span class="str">'admin'</span>), <span class="kw">async</span> (req, res) => {
  <span class="kw">const</span> quarantinedUnits = <span class="kw">await</span> BloodInventory.find({ status: <span class="str">'quarantined'</span> })
    .sort({ collectedDate: <span class="num">1</span> });
  res.status(<span class="num">200</span>).json(quarantinedUnits);
});

router.post(<span class="str">'/screen'</span>, protect, authorize(<span class="str">'admin'</span>), <span class="kw">async</span> (req, res) => {
  <span class="kw">const</span> { unitId, hiv, hbv, hcv, syphilis, malaria } = req.body;
  <span class="kw">const</span> unit = <span class="kw">await</span> BloodInventory.findOne({ unitId });
  <span class="kw">if</span> (!unit) <span class="kw">return</span> res.status(<span class="num">404</span>).json({ message: <span class="str">'Unit not found'</span> });

  <span class="kw">const</span> reactive = hiv || hbv || hcv || syphilis || malaria;
  <span class="kw">const</span> outcome = reactive ? <span class="str">'failed'</span> : <span class="str">'passed'</span>;

  <span class="kw">await</span> TestingLab.create({
    unitId: unit._id, hiv, hbv, hcv, syphilis, malaria,
    result: outcome, testedBy: req.user.name, testedAt: <span class="kw">new</span> Date()
  });

  unit.status = reactive ? <span class="str">'discarded'</span> : <span class="str">'available'</span>;
  <span class="kw">await</span> unit.save();

  res.status(<span class="num">200</span>).json({ status: unit.status, outcome });
});
  </div>

  <div class="sec-title">A9 Component Stock Summary Aggregation</div>
  <div class="code-box">
<span class="kw">const</span> getStockMatrix = <span class="kw">async</span> (req, res) => {
  <span class="kw">const</span> matrix = <span class="kw">await</span> BloodInventory.aggregate([
    { <span class="kw">$match</span>: { status: <span class="str">'available'</span>, expiryDate: { <span class="kw">$gt</span>: <span class="kw">new</span> Date() } } },
    { <span class="kw">$group</span>: { _id: <span class="str">'$bloodGroup'</span>, totalUnits: { <span class="kw">$sum</span>: <span class="num">1</span> } } }
  ]);
  res.status(<span class="num">200</span>).json(matrix);
};
  </div>
  <div class="page-num">46</div>
</div>
`);

// PAGE 47
pages.push(`
<div class="page">
  <div style="text-align: center; margin-bottom: 20px;">
    <h2 style="font-size: 13pt; font-weight: bold; margin: 0 0 15px 0; letter-spacing: 0.5px;">
      APPENDIX FRONTEND &amp; VERCEL
    </h2>
  </div>

  <div class="sec-title">A10 Client API Service (Axios Instance)</div>
  <div class="code-box">
<span class="kw">import</span> axios <span class="kw">from</span> <span class="str">'axios'</span>;

<span class="kw">const</span> API = axios.create({
  baseURL: <span class="str">'/api'</span>,
  headers: { <span class="str">'Content-Type'</span>: <span class="str">'application/json'</span> }
});

API.interceptors.request.use((config) => {
  <span class="kw">const</span> token = localStorage.getItem(<span class="str">'hemovault_token'</span>);
  <span class="kw">if</span> (token) {
    config.headers.Authorization = <span class="str">\`Bearer \${token}\`</span>;
  }
  <span class="kw">return</span> config;
});

<span class="kw">export</span> <span class="kw">default</span> API;
  </div>

  <div class="sec-title">A11 Vercel Serverless Entry Point (api/index.js)</div>
  <div class="code-box">
<span class="kw">const</span> { app } = require(<span class="str">'../server/src/server'</span>);
<span class="kw">const</span> { connectDB } = require(<span class="str">'../server/src/config/db'</span>);
<span class="kw">const</span> User = require(<span class="str">'../server/src/models/User'</span>);
<span class="kw">const</span> { seedData } = require(<span class="str">'../server/src/seeds/seed'</span>);

<span class="kw">let</span> isSeeded = <span class="kw">false</span>;

module.exports = <span class="kw">async</span> (req, res) => {
  <span class="kw">try</span> {
    <span class="kw">await</span> connectDB();
    <span class="kw">if</span> (!isSeeded) {
      <span class="kw">const</span> count = <span class="kw">await</span> User.countDocuments();
      <span class="kw">if</span> (count === <span class="num">0</span>) <span class="kw">await</span> seedData(<span class="kw">false</span>);
      isSeeded = <span class="kw">true</span>;
    }
  } <span class="kw">catch</span> (err) {
    console.error(<span class="str">'Database connection error:'</span>, err.message);
  }
  <span class="kw">return</span> app(req, res);
};
  </div>
  <div class="page-num">47</div>
</div>
`);

// ==================== SCREENSHOTS (PAGES 48-49) ====================
// PAGE 48
pages.push(`
<div class="page">
  <div style="text-align: center; margin-bottom: 20px;">
    <h2 style="font-size: 13pt; font-weight: bold; margin: 0 0 15px 0; letter-spacing: 0.5px;">
      SCREENSHOTS OF THE PROJECT
    </h2>
  </div>

  <div style="text-align: center; margin-bottom: 25px;">
    ${imgLogin ? `<img src="${imgLogin}" style="width: 82%; max-height: 220px; object-fit: contain; border: 1px solid #94a3b8; border-radius: 4px;" />` : ''}
    <p style="font-size: 10pt; font-style: italic; margin-top: 6px;">Figure S1 Sign-in page of the HemoVault Blood Bank Platform</p>
  </div>
  <p class="body-text">
    The sign-in page collects user credentials and provides quick-access evaluation buttons for Administrator, Donor, and Hospital test accounts. Upon submission, the server returns a signed JWT token that activates the corresponding role portal.
  </p>

  <div style="text-align: center; margin-top: 20px; margin-bottom: 10px;">
    ${imgAdmin ? `<img src="${imgAdmin}" style="width: 82%; max-height: 220px; object-fit: contain; border: 1px solid #94a3b8; border-radius: 4px;" />` : ''}
    <p style="font-size: 10pt; font-style: italic; margin-top: 6px;">Figure S2 Admin Dashboard with statistics and 8-blood-group inventory matrix</p>
  </div>
  <div class="page-num">48</div>
</div>
`);

// PAGE 49
pages.push(`
<div class="page">
  <div style="text-align: center; margin-top: 10px; margin-bottom: 25px;">
    ${imgInventory ? `<img src="${imgInventory}" style="width: 82%; max-height: 220px; object-fit: contain; border: 1px solid #94a3b8; border-radius: 4px;" />` : ''}
    <p style="font-size: 10pt; font-style: italic; margin-top: 6px;">Figure S3 Blood inventory stock management &amp; component distribution</p>
  </div>
  <p class="body-text">
    The inventory hub displays all biological units in the system with filter controls for blood group, component type, and status. Operators can record new whole blood intakes and execute safe biohazard disposals.
  </p>

  <div style="text-align: center; margin-top: 20px; margin-bottom: 10px;">
    ${imgRequests ? `<img src="${imgRequests}" style="width: 82%; max-height: 220px; object-fit: contain; border: 1px solid #94a3b8; border-radius: 4px;" />` : ''}
    <p style="font-size: 10pt; font-style: italic; margin-top: 6px;">Figure S4 Hospital emergency requisition queue and compatibility matching</p>
  </div>
  <div class="page-num">49</div>
</div>
`);

// ==================== REFERENCES (PAGE 50) ====================
// PAGE 50
pages.push(`
<div class="page">
  <div style="text-align: center; margin-bottom: 25px;">
    <h2 style="font-size: 13pt; font-weight: bold; margin: 15px 0 20px 0; letter-spacing: 0.5px;">
      REFERENCES
    </h2>
  </div>

  <div class="ref-item">[1] World Health Organization. <em>Requirements for the Collection, Processing and Quality Control of Blood, Blood Components and Plasma Derivatives</em>. WHO Technical Report Series, Geneva, 2021.</div>

  <div class="ref-item">[2] National Blood Transfusion Council. <em>Standards for Blood Banks and Blood Transfusion Services</em>. Ministry of Health and Family Welfare, Government of India, New Delhi, 2022.</div>

  <div class="ref-item">[3] Express.js Documentation. <em>Routing and Middleware Architecture</em>. https://expressjs.com/en/guide/routing.html, 2026.</div>

  <div class="ref-item">[4] OWASP Foundation. <em>REST Security and Authentication Cheat Sheet Series</em>. https://cheatsheetseries.owasp.org/, 2025.</div>

  <div class="ref-item">[5] MongoDB Documentation. <em>Schema Design, Document Indexing, and Transaction Management</em>. https://www.mongodb.com/docs/, 2026.</div>

  <div class="ref-item">[6] Mongoose ODM. <em>Schema Validation, Middleware Hooks, and Population</em>. https://mongoosejs.com/docs/, 2026.</div>

  <div class="ref-item">[7] React Documentation. <em>Components, Hooks, State Management, and Virtual DOM</em>. https://react.dev/, 2026.</div>

  <div class="ref-item">[8] Vite Documentation. <em>Fast Frontend Tooling and Hot Module Replacement</em>. https://vite.dev/, 2026.</div>

  <div class="ref-item">[9] Vercel Documentation. <em>Serverless Functions, Routing Rewrites, and Monorepo Deployments</em>. https://vercel.com/docs, 2026.</div>

  <div class="ref-item">[10] JSON Web Token (JWT). <em>RFC 7519: JSON Web Token Architecture</em>. Internet Engineering Task Force (IETF), https://jwt.io/, 2024.</div>

  <p class="body-text" style="margin-top: 35px; line-height: 1.6;">
    Online documentation and statutory guidelines were consulted in October 2026. Source code, schema models, and interface screenshots in this report were taken from the project repository and a live run of the HemoVault platform; the application can be reviewed at the GitHub link given in the appendix.
  </p>
  <div class="page-num">50</div>
</div>
`);

// ==================== CSS STYLES ====================
const cssStyles = `
  @page {
    size: A4 portrait;
    margin: 0;
  }
  * {
    box-sizing: border-box;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
  body {
    font-family: 'Times New Roman', Times, Georgia, serif;
    font-size: 11pt;
    line-height: 1.48;
    color: #000000;
    margin: 0;
    padding: 0;
    background: #ffffff;
  }
  .page {
    width: 210mm;
    height: 297mm;
    padding: 24mm 22mm 20mm 24mm;
    box-sizing: border-box;
    page-break-after: always;
    page-break-inside: avoid;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background: #ffffff;
    overflow: hidden;
  }
  .title-page {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 26mm 22mm 22mm 24mm;
  }
  .page-num {
    position: absolute;
    bottom: 12mm;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 11pt;
    font-family: 'Times New Roman', Times, serif;
    color: #000000;
  }
  .ch-head {
    text-align: center;
    margin-bottom: 20px;
    padding-top: 5px;
  }
  .ch-num {
    font-size: 13pt;
    font-weight: bold;
    margin-bottom: 4px;
    letter-spacing: 0.5px;
  }
  .ch-title {
    font-size: 13pt;
    font-weight: bold;
    letter-spacing: 0.5px;
  }
  .sec-title {
    font-size: 11.5pt;
    font-weight: bold;
    margin: 12px 0 6px 0;
    color: #000000;
  }
  .body-text {
    text-align: justify;
    margin: 0 0 10px 0;
    line-height: 1.48;
  }
  .report-table {
    width: 100%;
    border-collapse: collapse;
    margin: 10px 0 12px 0;
    font-size: 10pt;
    line-height: 1.35;
  }
  .report-table th, .report-table td {
    border: 1px solid #000000;
    padding: 5px 7px;
    vertical-align: top;
  }
  .report-table th {
    font-weight: bold;
    background-color: #f8fafc;
    text-align: left;
  }
  .code-box {
    background-color: #f8fafc;
    border: 1px solid #cbd5e1;
    border-radius: 4px;
    padding: 8px 10px;
    font-family: 'Courier New', Courier, monospace;
    font-size: 8.5pt;
    line-height: 1.35;
    margin: 8px 0 12px 0;
    white-space: pre;
    overflow: hidden;
  }
  .code-box .kw { color: #0000ee; font-weight: bold; }
  .code-box .str { color: #a31515; }
  .code-box .num { color: #098658; }
  .toc-line, .toc-sub {
    display: flex;
    align-items: baseline;
    margin: 1px 0;
  }
  .toc-sub {
    padding-left: 18px;
  }
  .toc-dots {
    flex-grow: 1;
    border-bottom: 1px dotted #555555;
    margin: 0 5px;
  }
  .ref-item {
    margin-bottom: 10px;
    line-height: 1.45;
    text-align: justify;
    padding-left: 24px;
    text-indent: -24px;
  }
`;

const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>HemoVault Project Report</title>
  <style>${cssStyles}</style>
</head>
<body>
  ${pages.join('\n')}
</body>
</html>`;

const docsDir = path.resolve(__dirname, '../docs');
const htmlPath = path.join(docsDir, 'HemoVault_Project_Report.html');
const pdfPath = path.join(docsDir, 'HemoVault_Project_Report.pdf');
const docxPath = path.join(docsDir, 'HemoVault_Project_Report.docx');

fs.writeFileSync(htmlPath, fullHtml, 'utf-8');
console.log('HTML written to:', htmlPath);

(async () => {
  console.log('Rendering 50-page PDF with Puppeteer...');
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.goto('file://' + htmlPath, { waitUntil: 'networkidle0' });

  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: { top: 0, bottom: 0, left: 0, right: 0 }
  });

  await browser.close();

  const pdfBytes = fs.readFileSync(pdfPath);
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const pageCount = pdfDoc.getPageCount();
  console.log('==============================================');
  console.log('FINAL COMPILED PDF PAGE COUNT:', pageCount);
  console.log('FINAL COMPILED PDF FILE SIZE:', (pdfBytes.length / (1024 * 1024)).toFixed(2), 'MB');
  console.log('PDF SAVED LOCATION:', pdfPath);
  console.log('==============================================');

  // BUILD COMPLETE DOCX
  console.log('Generating complete Word (.docx) document...');
  const doc = new Document({
    creator: 'Priyan R (310624148072)',
    title: 'HemoVault: Centralized Blood Bank Management System',
    description: 'Academic Project Report for Bachelor of Engineering in CSE (AIML), Easwari Engineering College',
    sections: [{
      properties: {
        page: { margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 } }
      },
      children: [
        new Paragraph({
          text: 'HEMOVAULT: CENTRALIZED BLOOD BANK MANAGEMENT SYSTEM',
          heading: HeadingLevel.TITLE,
          alignment: AlignmentType.CENTER,
          spacing: { after: 300 }
        }),
        new Paragraph({
          text: 'A PROJECT REPORT',
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 }
        }),
        new Paragraph({
          text: 'Submitted by',
          alignment: AlignmentType.CENTER,
          spacing: { after: 100 }
        }),
        new Paragraph({
          text: 'PRIYAN R   310624148072',
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 }
        }),
        new Paragraph({
          text: 'in partial fulfillment of the requirements for the award of the Degree of',
          alignment: AlignmentType.CENTER,
          spacing: { after: 100 }
        }),
        new Paragraph({
          text: 'BACHELOR OF ENGINEERING in COMPUTER SCIENCE AND ENGINEERING (ARTIFICIAL INTELLIGENCE AND MACHINE LEARNING)',
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 }
        }),
        new Paragraph({
          text: '2311CSE503R - FULL STACK DEVELOPMENT',
          alignment: AlignmentType.CENTER,
          spacing: { after: 300 }
        }),
        new Paragraph({
          text: 'EASWARI ENGINEERING COLLEGE',
          alignment: AlignmentType.CENTER,
          spacing: { after: 50 }
        }),
        new Paragraph({
          text: 'An Autonomous Institution affiliated to Anna University',
          alignment: AlignmentType.CENTER,
          spacing: { after: 50 }
        }),
        new Paragraph({
          text: 'Chennai',
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 }
        }),
        new Paragraph({
          text: 'OCTOBER 2026',
          alignment: AlignmentType.CENTER,
          pageBreakBefore: false,
          spacing: { after: 400 }
        }),

        // BONAFIDE CERTIFICATE
        new Paragraph({
          text: 'BONAFIDE CERTIFICATE',
          heading: HeadingLevel.HEADING_1,
          alignment: AlignmentType.CENTER,
          pageBreakBefore: true,
          spacing: { after: 200 }
        }),
        new Paragraph({
          text: 'EASWARI ENGINEERING COLLEGE',
          alignment: AlignmentType.CENTER,
          spacing: { after: 300 }
        }),
        new Paragraph({
          text: 'Certified that this mini project report titled "HemoVault Centralized Blood Bank Management System" is the bonafide work of Priyan R (Registration Number 310624148072), Department of Computer Science and Engineering (Artificial Intelligence and Machine Learning), who carried out the project work under my supervision.',
          alignment: AlignmentType.JUSTIFIED,
          spacing: { after: 600 }
        }),
        new Paragraph({
          text: 'HEAD OF THE DEPARTMENT                                     SUPERVISOR',
          spacing: { after: 100 }
        }),
        new Paragraph({
          text: 'Dr. Y. Justin Dhas                                         Ms Divyanjali',
          spacing: { after: 50 }
        }),
        new Paragraph({
          text: 'Department of CSE(AIML)                                    Project Guide, Department of CSE(AIML)',
          spacing: { after: 50 }
        }),
        new Paragraph({
          text: 'Easwari Engineering College                                Easwari Engineering College',
          spacing: { after: 400 }
        }),

        // VIVA VOCE
        new Paragraph({
          text: 'CERTIFICATE OF VIVA VOCE EXAMINATION',
          heading: HeadingLevel.HEADING_1,
          alignment: AlignmentType.CENTER,
          pageBreakBefore: true,
          spacing: { after: 200 }
        }),
        new Paragraph({
          text: 'EASWARI ENGINEERING COLLEGE',
          alignment: AlignmentType.CENTER,
          spacing: { after: 300 }
        }),
        new Paragraph({
          text: 'This is to certify that the Viva Voce Examination of the project work entitled "HemoVault Centralized Blood Bank Management System", submitted by Mr. Priyan R (Registration Number 310624148072), in partial fulfillment of the requirements for the award of the degree of Bachelor of Engineering, was conducted on ________________ in the Department of Computer Science and Engineering (Artificial Intelligence and Machine Learning), Easwari Engineering College, Ramapuram, Chennai.',
          alignment: AlignmentType.JUSTIFIED,
          spacing: { after: 600 }
        }),
        new Paragraph({
          text: 'INTERNAL EXAMINER                                         EXTERNAL EXAMINER',
          spacing: { after: 300 }
        }),

        // ABSTRACT
        new Paragraph({
          text: 'ABSTRACT',
          heading: HeadingLevel.HEADING_1,
          alignment: AlignmentType.CENTER,
          pageBreakBefore: true,
          spacing: { after: 300 }
        }),
        new Paragraph({
          text: 'Healthcare institutions increasingly manage critical transfusion resources through web applications, but a browser-based blood bank platform is dependable only when the system controls who may requisition blood products, how long inventory units remain viable in cold storage, how donor pathology tests are evaluated, and how emergency cross-matching requests are fulfilled. This project develops HemoVault, a centralized full-stack blood bank management platform that lets administrators record blood donations, enforce donor eligibility checks, coordinate multi-hospital emergency requisitions, track blood group stock across eight blood groups, and monitor mandatory diagnostic screenings.',
          alignment: AlignmentType.JUSTIFIED,
          spacing: { after: 200 }
        }),
        new Paragraph({
          text: 'The system uses Node.js and Express on the server, MongoDB with Mongoose for persistent document storage, and a single-page responsive client built with React 18, Vite, and modern CSS. Users sign in through role-based access control, receiving JSON Web Tokens (JWT) stored securely. Passwords are encrypted with bcryptjs salted hashes, and demonstration credentials for Admin, Donor, and Hospital roles are pre-seeded upon database initialization.',
          alignment: AlignmentType.JUSTIFIED,
          spacing: { after: 200 }
        }),
        new Paragraph({
          text: 'A blood donation record represents a physical whole blood or component unit whose expiration date is automatically calculated on the server based on blood component preservation rules. Hospital emergency requisitions are validated against ABO and Rh(D) compatibility matrices, preventing fatal immunological transfusion reactions.',
          alignment: AlignmentType.JUSTIFIED,
          spacing: { after: 300 }
        }),
        new Paragraph({
          text: 'Keywords: blood bank management, transfusion safety, MERN stack, donor eligibility, component preservation, infectious disease screening, hospital emergency requisition, role-based access control',
          spacing: { after: 400 }
        }),

        // ACKNOWLEDGEMENT
        new Paragraph({
          text: 'ACKNOWLEDGEMENT',
          heading: HeadingLevel.HEADING_1,
          alignment: AlignmentType.CENTER,
          pageBreakBefore: true,
          spacing: { after: 300 }
        }),
        new Paragraph({
          text: 'I express my sincere gratitude to the Principal and Management of Easwari Engineering College for giving me the opportunity and the facilities to carry out this project work.\n\nI convey my heartfelt thanks to Dr. Y. Justin Dhas, Head of the Department of CSE(AIML), for the encouragement and support provided throughout the project.\n\nThe guidance, suggestions and motivation of my project guide, Ms Divyanjali, Department of CSE(AIML), throughout the development of the HemoVault Centralized Blood Bank Management System were of great help.\n\nI extend my gratitude to the faculty members of the Department of CSE(AIML) for their academic support. I also thank my parents and friends for their encouragement throughout the completion of this project.',
          alignment: AlignmentType.JUSTIFIED,
          spacing: { after: 600 }
        }),
        new Paragraph({
          text: 'Priyan R (310624148072)',
          alignment: AlignmentType.RIGHT,
          spacing: { after: 400 }
        }),

        // CHAPTER 1
        new Paragraph({
          text: 'CHAPTER 1: INTRODUCTION',
          heading: HeadingLevel.HEADING_1,
          pageBreakBefore: true,
          spacing: { after: 200 }
        }),
        new Paragraph({
          text: '1.1 Overview\nCentralized blood banking replaces fragile manual paper ledgers, fragmented hospital logs, and uncoordinated telephone communications with a unified digital repository, real-time inventory tracking, and an automated allocation workflow. That transformation makes the blood donation and requisition process fast, transparent, and auditable, but it also transfers critical clinical responsibilities to software systems. The platform must verify who may requisition blood products, maintain strict temperature and shelf-life tracking so that compromised units are never transfused, validate immunological compatibility without trusting client-side inputs, and record every handling event so hospital blood bank officers can review cold-chain compliance.\n\n1.2 Problem Definition\nTraditional blood banks in semi-urban and regional clusters rely heavily on manual registers and disparate spreadsheets, creating severe systemic vulnerabilities. Hand-written donor cards are prone to transcription mistakes, physical registers prevent multi-center stock visibility during life-threatening trauma incidents, and expiry dates are tracked through manual visual inspection, leading to tragic discarding of precious blood units.\n\n1.3 Objective\nThe primary objective is to develop a reliable, centralized, and secure digital blood bank management platform for regional health networks. Authorized administrators must be able to manage inventory across all eight blood groups and review infectious disease laboratory tests. Donors must be able to register, verify eligibility criteria, and schedule donations. Partner healthcare facilities must be able to submit emergency blood requisitions and receive real-time compatibility allocations.\n\n1.4 Scope of the Project\nThe project scope encompasses user authentication across three roles (Admin, Donor, Hospital), automated inventory classification for whole blood, packed red cells, platelets, and plasma, donor health questionnaires with dynamic eligibility scoring, a laboratory diagnostic screening portal, emergency requisition management with urgency prioritization, audit logging of all unit transfers, and responsive user interfaces.\n\n1.5 Motivation\nEvery two seconds, a patient requires a life-saving blood transfusion, yet voluntary blood donation centers frequently face severe logistical bottlenecks. Developing a transparent, resilient, and accessible web solution bridges the critical communication gap between voluntary donors, blood banks, and hospital surgical teams.',
          alignment: AlignmentType.JUSTIFIED,
          spacing: { after: 400 }
        }),

        // CHAPTER 2
        new Paragraph({
          text: 'CHAPTER 2: RELATED WORK',
          heading: HeadingLevel.HEADING_1,
          pageBreakBefore: true,
          spacing: { after: 200 }
        }),
        new Paragraph({
          text: '2.1 Literature Review\nModern blood banking platforms draw from biomedical informatics, distributed transaction systems, and transfusion logistics research. World Health Organization (WHO) technical guidelines on blood regulatory systems emphasize that traceability, voluntary non-remunerated donation records, and standardized laboratory screening are mandatory prerequisites for preventing transfusion-transmitted infections. National Blood Transfusion Council (NBTC) operational frameworks outline strict donor deferral protocols, specifying minimum 90-day intervals between whole blood donations for males and 120-day intervals for females.\n\n2.2 Existing System\nConventional blood bank management in regional facilities typically relies on desktop spreadsheet software or physical paper ledgers. While easy to set up, physical records suffer from severe limitations: real-time stock balances cannot be queried by remote hospital trauma centers, transcription errors frequently corrupt donor records, and tracking expiration dates requires tedious physical inspection of refrigerated blood bags.\n\n2.3 Proposed System\nThe proposed HemoVault platform delivers a lightweight, cloud-deployable solution that centralizes blood bank operations into a unified web application. The platform manages the entire lifecycle of blood units: voluntary donor appointment scheduling, clinical vitals screening, laboratory diagnostic clearance, real-time multi-group inventory tracking, and hospital emergency requisition fulfillment.',
          alignment: AlignmentType.JUSTIFIED,
          spacing: { after: 400 }
        }),

        // CHAPTER 3
        new Paragraph({
          text: 'CHAPTER 3: SYSTEM ANALYSIS',
          heading: HeadingLevel.HEADING_1,
          pageBreakBefore: true,
          spacing: { after: 200 }
        }),
        new Paragraph({
          text: '3.1 System Requirements\nFunctional requirements are structured around three distinct actor personas (Administrator, Donor, and Hospital) and the core lifecycle of blood units. Authentication must verify credentials, issue signed cryptographic JWT tokens, and authorize access according to user roles before any protected medical resource is returned.\n\n3.2 Software and Hardware Requirements\nClient: Modern browser with JavaScript enabled.\nFrontend: React 18 with Vite bundling, Lucide-React icons, responsive CSS3.\nBackend: Node.js (v18.x to v24.x LTS) with Express 4.19 framework.\nDatabase: MongoDB with Mongoose 8.4 ODM.\nSecurity: Bcryptjs password hashing, JWT authorization.\nHosting: Vercel serverless platform.\n\n3.3 Functional Use Cases\nUse cases include User Login, Donor Eligibility Check, Donation Intake, Laboratory Testing, Emergency Requisition, and Stock Balance Query.',
          alignment: AlignmentType.JUSTIFIED,
          spacing: { after: 400 }
        }),

        // CHAPTER 4
        new Paragraph({
          text: 'CHAPTER 4: SYSTEM DESIGN',
          heading: HeadingLevel.HEADING_1,
          pageBreakBefore: true,
          spacing: { after: 200 }
        }),
        new Paragraph({
          text: '4.1 System Architecture\nHemoVault is engineered as a decoupled, multi-tier web application adhering to the Model-View-Controller (MVC) paradigm. The presentation tier consists of a responsive Single Page Application (SPA) developed with React 18 and bundled via Vite. The presentation layer communicates with the backend application tier via asynchronous RESTful JSON HTTP requests.\n\n4.2 Module Description\nModules include Authentication, Donor Management, Blood Inventory, Pathology Testing, Emergency Requisitions, and Analytics & Audit.\n\n4.3 Data Model and Database Schema\nThe MongoDB document schema comprises six primary collections: Users, Donors, BloodInventory, EmergencyRequests, TestingLabs, and AuditLogs.',
          alignment: AlignmentType.JUSTIFIED,
          spacing: { after: 400 }
        }),

        // CHAPTER 5
        new Paragraph({
          text: 'CHAPTER 5: IMPLEMENTATION',
          heading: HeadingLevel.HEADING_1,
          pageBreakBefore: true,
          spacing: { after: 200 }
        }),
        new Paragraph({
          text: '5.1 Implementation Overview\nThe backend is implemented in Node.js and Express, organizing controllers, models, and routes. The frontend is built with React 18, Vite, and Axios for centralized API communications.\n\n5.2 Key Functions and Code Explanation\nIncludes bcrypt password encryption, JWT authentication middleware, donor eligibility evaluation, blood component shelf-life calculation, laboratory 5-pathogen screening, and emergency ABO/Rh compatibility allocation.\n\n5.3 End to End Donor Registration & Donation Workflow\nDetails donor registration, health questionnaires, vitals assessment, phlebotomy scheduling, and post-donation recovery.\n\n5.4 Hospital Emergency Requisition Workflow\nDetails requisition submission, priority queue placement, compatible stock identification, admin approval, and courier dispatch.',
          alignment: AlignmentType.JUSTIFIED,
          spacing: { after: 400 }
        }),

        // CHAPTER 6
        new Paragraph({
          text: 'CHAPTER 6: CONCLUSION AND FUTURE WORK',
          heading: HeadingLevel.HEADING_1,
          pageBreakBefore: true,
          spacing: { after: 200 }
        }),
        new Paragraph({
          text: '6.1 Conclusion\nThe HemoVault Centralized Blood Bank Management System demonstrates a reliable, auditable, and resilient full-stack web application designed for regional healthcare networks. By combining modern MERN technologies with rigorous clinical safety rules, the platform resolves systemic vulnerabilities inherent in manual registers and disconnected hospital communications.\n\n6.2 Future Enhancements\nFuture roadmap enhancements include automated donor SMS/email alerts, barcode/RFID blood bag scanning, hospital EHR HL7/FHIR integration, and predictive inventory forecasting.\n\nGitHub Repository:\nhttps://github.com/priyan071/blood-banks-management-system',
          alignment: AlignmentType.JUSTIFIED,
          spacing: { after: 400 }
        }),

        // REFERENCES
        new Paragraph({
          text: 'REFERENCES',
          heading: HeadingLevel.HEADING_1,
          pageBreakBefore: true,
          spacing: { after: 200 }
        }),
        new Paragraph({
          text: '[1] World Health Organization. Requirements for the Collection, Processing and Quality Control of Blood, Blood Components and Plasma Derivatives. WHO Technical Report Series, Geneva, 2021.\n[2] National Blood Transfusion Council. Standards for Blood Banks and Blood Transfusion Services. Ministry of Health and Family Welfare, Government of India, New Delhi, 2022.\n[3] Express.js Documentation. Routing and Middleware Architecture. https://expressjs.com/en/guide/routing.html, 2026.\n[4] OWASP Foundation. REST Security and Authentication Cheat Sheet Series. https://cheatsheetseries.owasp.org/, 2025.\n[5] MongoDB Documentation. Schema Design, Document Indexing, and Transaction Management. https://www.mongodb.com/docs/, 2026.\n[6] Mongoose ODM. Schema Validation, Middleware Hooks, and Population. https://mongoosejs.com/docs/, 2026.\n[7] React Documentation. Components, Hooks, State Management, and Virtual DOM. https://react.dev/, 2026.\n[8] Vite Documentation. Fast Frontend Tooling and Hot Module Replacement. https://vite.dev/, 2026.\n[9] Vercel Documentation. Serverless Functions, Routing Rewrites, and Monorepo Deployments. https://vercel.com/docs, 2026.\n[10] JSON Web Token (JWT). RFC 7519: JSON Web Token Architecture. Internet Engineering Task Force (IETF), https://jwt.io/, 2024.',
          alignment: AlignmentType.JUSTIFIED,
          spacing: { after: 200 }
        })
      ]
    }]
  });

  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(docxPath, buffer);
  console.log('DOCX written to:', docxPath);
  console.log('DOCX FILE SIZE:', (buffer.length / 1024).toFixed(2), 'KB');
  console.log('ALL EXPORTS COMPLETED SUCCESSFULLY!');
})();
