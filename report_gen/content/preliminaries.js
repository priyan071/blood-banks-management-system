const { collegeLogoSvg } = require('./diagrams');

module.exports = {
  getTitlePage: () => `
<div class="page cover-page" style="text-align: center; display: flex; flex-direction: column; justify-content: space-between; height: 100%; box-sizing: border-box; padding: 40px 20px 20px;">
  <div>
    <h1 style="font-size: 20pt; font-weight: bold; margin-bottom: 25px; line-height: 1.4; letter-spacing: 0.5px; text-transform: uppercase;">
      HEMOVAULT: CENTRALIZED BLOOD BANK MANAGEMENT SYSTEM
    </h1>
    <h2 style="font-size: 13pt; font-weight: bold; margin-bottom: 20px; letter-spacing: 1px;">
      A PROJECT REPORT
    </h2>
    <p style="font-size: 12pt; font-style: italic; margin-bottom: 15px;">Submitted by</p>
    <p style="font-size: 14pt; font-weight: bold; margin-bottom: 5px;">PRIYAN R</p>
    <p style="font-size: 13pt; font-weight: bold; margin-bottom: 30px;">(Registration No: 310624148072)</p>
    <p style="font-size: 12pt; font-style: italic; margin-bottom: 10px;">in partial fulfillment for the award of the Degree</p>
    <p style="font-size: 12pt; font-style: italic; margin-bottom: 10px;">of</p>
    <p style="font-size: 14pt; font-weight: bold; margin-bottom: 10px;">BACHELOR OF ENGINEERING</p>
    <p style="font-size: 12pt; font-style: italic; margin-bottom: 10px;">in</p>
    <p style="font-size: 13pt; font-weight: bold; margin-bottom: 25px; text-transform: uppercase;">
      COMPUTER SCIENCE AND ENGINEERING<br/>(ARTIFICIAL INTELLIGENCE AND MACHINE LEARNING)
    </p>
  </div>

  <div style="margin: 15px 0;">
    ${collegeLogoSvg}
  </div>

  <div style="margin-top: 15px;">
    <h3 style="font-size: 13pt; font-weight: bold; margin-bottom: 5px; text-transform: uppercase;">
      EASWARI ENGINEERING COLLEGE
    </h3>
    <p style="font-size: 10.5pt; font-weight: 600; margin-bottom: 5px;">
      (AN AUTONOMOUS INSTITUTION) – AFFILIATED TO ANNA UNIVERSITY, CHENNAI
    </p>
    <p style="font-size: 10.5pt; margin-bottom: 25px;">
      BHARATHI SALAI, RAMAPURAM, CHENNAI – 600 089
    </p>
    <p style="font-size: 12pt; font-weight: bold; letter-spacing: 1px;">
      APRIL 2026
    </p>
  </div>
</div>
`,

  getBonafideCertificate: () => `
<div class="page" style="box-sizing: border-box; padding: 40px 30px 20px;">
  <div style="text-align: center; margin-bottom: 35px;">
    ${collegeLogoSvg}
    <h2 style="font-size: 15pt; font-weight: bold; margin-top: 15px; text-transform: uppercase; letter-spacing: 0.5px;">
      EASWARI ENGINEERING COLLEGE
    </h2>
    <p style="font-size: 10pt; font-weight: 600;">(An Autonomous Institution - Affiliated to Anna University, Chennai)</p>
    <p style="font-size: 10pt;">Ramapuram, Chennai - 600 089</p>
    <div style="width: 100%; height: 2px; background: #065f46; margin: 15px auto;"></div>
    <h3 style="font-size: 14pt; font-weight: bold; margin-top: 25px; letter-spacing: 1px; text-decoration: underline;">
      BONAFIDE CERTIFICATE
    </h3>
  </div>

  <p style="font-size: 12pt; line-height: 2.2; text-align: justify; text-indent: 50px; margin-top: 40px;">
    Certified that this project report titled <strong>“HEMOVAULT: CENTRALIZED BLOOD BANK MANAGEMENT SYSTEM”</strong> is the Bonafide work of <strong>PRIYAN R (Registration No: 310624148072)</strong>, who carried out the project work under my supervision in partial fulfillment of the requirements for the award of the Degree of <strong>Bachelor of Engineering in Computer Science and Engineering (Artificial Intelligence and Machine Learning)</strong> of Easwari Engineering College (Autonomous), affiliated to Anna University, Chennai.
  </p>

  <div style="margin-top: 160px; display: flex; justify-content: space-between; font-size: 12pt;">
    <div style="text-align: left; width: 45%;">
      <div style="border-top: 1px solid #000; width: 220px; margin-bottom: 8px;"></div>
      <p style="font-weight: bold; margin: 2px 0;">HEAD OF THE DEPARTMENT</p>
      <p style="margin: 2px 0;">Department of CSE (AIML)</p>
      <p style="margin: 2px 0;">Easwari Engineering College</p>
      <p style="margin: 2px 0;">Ramapuram, Chennai - 600089</p>
    </div>
    <div style="text-align: right; width: 45%;">
      <div style="border-top: 1px solid #000; width: 220px; margin-bottom: 8px; margin-left: auto;"></div>
      <p style="font-weight: bold; margin: 2px 0;">PROJECT SUPERVISOR</p>
      <p style="margin: 2px 0;">Ms. Divyanjali, Technical Trainer</p>
      <p style="margin: 2px 0;">Department of CSE (AIML)</p>
      <p style="margin: 2px 0;">Easwari Engineering College</p>
    </div>
  </div>
</div>
`,

  getVivaVoceCertificate: () => `
<div class="page" style="box-sizing: border-box; padding: 40px 30px 20px;">
  <div style="text-align: center; margin-bottom: 35px;">
    ${collegeLogoSvg}
    <h2 style="font-size: 15pt; font-weight: bold; margin-top: 15px; text-transform: uppercase; letter-spacing: 0.5px;">
      EASWARI ENGINEERING COLLEGE
    </h2>
    <p style="font-size: 10pt; font-weight: 600;">(An Autonomous Institution - Affiliated to Anna University, Chennai)</p>
    <p style="font-size: 10pt;">Ramapuram, Chennai - 600 089</p>
    <div style="width: 100%; height: 2px; background: #065f46; margin: 15px auto;"></div>
    <h3 style="font-size: 14pt; font-weight: bold; margin-top: 25px; letter-spacing: 1px; text-decoration: underline;">
      CERTIFICATE OF VIVA-VOCE EXAMINATION
    </h3>
  </div>

  <p style="font-size: 12pt; line-height: 2.2; text-align: justify; text-indent: 50px; margin-top: 40px;">
    This is to certify that the Viva-Voce Examination of the Project Work entitled <strong>“HEMOVAULT: CENTRALIZED BLOOD BANK MANAGEMENT SYSTEM”</strong> submitted by <strong>Mr. PRIYAN R (Reg. No. 310624148072)</strong> in partial fulfillment of the requirements for the award of the degree of <strong>Bachelor of Engineering in Computer Science and Engineering (Artificial Intelligence and Machine Learning)</strong> was conducted on ____________________ in the Department of Computer Science and Engineering (AIML), Easwari Engineering College, Ramapuram – Chennai.
  </p>

  <div style="margin-top: 150px; display: flex; justify-content: space-between; font-size: 11pt;">
    <div style="width: 45%;">
      <p style="font-weight: bold; font-size: 12pt; margin-bottom: 15px;">Internal Examiner</p>
      <p style="margin: 6px 0;">Name: _______________________________</p>
      <p style="margin: 6px 0;">Designation: ________________________</p>
      <p style="margin: 6px 0;">Address: ____________________________</p>
      <p style="margin: 6px 0;">____________________________________</p>
      <p style="margin: 25px 0 0 0;">Signature: __________________________</p>
    </div>
    <div style="width: 45%;">
      <p style="font-weight: bold; font-size: 12pt; margin-bottom: 15px;">External Examiner</p>
      <p style="margin: 6px 0;">Name: _______________________________</p>
      <p style="margin: 6px 0;">Designation: ________________________</p>
      <p style="margin: 6px 0;">Address: ____________________________</p>
      <p style="margin: 6px 0;">____________________________________</p>
      <p style="margin: 25px 0 0 0;">Signature: __________________________</p>
    </div>
  </div>

  <div style="margin-top: 50px; font-size: 11.5pt;">
    <p><strong>Date:</strong> ____________________</p>
    <p><strong>Place:</strong> Chennai</p>
  </div>
</div>
`,

  getAbstract: () => `
<div class="page" style="box-sizing: border-box; padding: 40px 30px 20px;">
  <h2 style="font-size: 16pt; font-weight: bold; text-align: center; margin-bottom: 30px; letter-spacing: 1px;">
    ABSTRACT
  </h2>

  <p style="font-size: 12pt; line-height: 1.8; text-align: justify; text-indent: 40px; margin-bottom: 18px;">
    Timely access to safe, compatible blood products is a critical pillar of modern healthcare delivery, emergency resuscitation, and oncological therapy. Conventional blood banking infrastructures in developing and semi-urban regions frequently suffer from severe fragmentation, paper-dependent manual registers, lack of real-time multi-center stock visibility, unmonitored cold-chain shelf-life deterioration, and cumbersome requisition pipelines. These operational bottlenecks frequently precipitate preventable delays during surgical emergencies and trauma management, while simultaneously resulting in the tragic wastage of scarce, unexpired blood components due to poor batch rotation.
  </p>

  <p style="font-size: 12pt; line-height: 1.8; text-align: justify; text-indent: 40px; margin-bottom: 18px;">
    To overcome these systemic vulnerabilities, this project presents <strong>HemoVault</strong>, a modern, full-stack Centralized Blood Bank Management System architected on the high-performance <strong>MERN Stack (MongoDB, Express.js, React.js, and Node.js)</strong>. HemoVault establishes an unbroken digital custody trail spanning the entire transfusion lifecycle: voluntary donor onboarding, algorithmic clinical vitals assessment, digitized phlebotomy scheduling, mandatory five-marker infectious disease laboratory screening (HIV, Hepatitis B, Hepatitis C, Syphilis, and Malaria), component-level inventory segregation, time-to-live (TTL) expiration tracking, and multi-tier emergency requisition routing.
  </p>

  <p style="font-size: 12pt; line-height: 1.8; text-align: justify; text-indent: 40px; margin-bottom: 18px;">
    The system incorporates an automated <strong>Eligibility Evaluation Engine</strong> that validates donor age, body weight, hemoglobin concentration, pulse rate, blood pressure, and historical donation intervals against National Blood Transfusion Council (NBTC) guidelines prior to phlebotomy. In the laboratory module, an automated electronic gatekeeper prevents any quarantined blood unit from transitioning to available inventory until all five diagnostic assays are explicitly confirmed negative. Furthermore, an intelligent emergency dispatch module enables partner hospitals to query live inventory matrices across all eight standard ABO/Rh blood groups and execute atomic unit reservations utilizing First-In-First-Out (FIFO) allocation algorithms.
  </p>

  <p style="font-size: 12pt; line-height: 1.8; text-align: justify; text-indent: 40px; margin-bottom: 25px;">
    Implemented with zero-setup embedded persistence (utilizing MongoMemoryServer with automatic external MongoDB URI failover), JSON Web Token (JWT) cryptographic authorization, and role-based access control (RBAC), HemoVault delivers enterprise-grade data security, responsive real-time analytics, and high operational throughput. Empirical testing demonstrates significant reductions in emergency fulfillment latency, absolute eradication of transcription errors, and guaranteed compliance with international hemovigilance protocols.
  </p>

  <p style="font-size: 11pt; line-height: 1.6; margin-top: 30px;">
    <strong>Keywords:</strong> Blood Bank Management, MERN Stack, React 18, Node.js, Express.js, MongoDB, Algorithmic Eligibility, Cold-Chain Inventory, Infectious Disease Screening, Hemovigilance.
  </p>
</div>
`,

  getAcknowledgement: () => `
<div class="page" style="box-sizing: border-box; padding: 40px 30px 20px;">
  <h2 style="font-size: 16pt; font-weight: bold; text-align: center; margin-bottom: 35px; letter-spacing: 1px;">
    ACKNOWLEDGEMENT
  </h2>

  <p style="font-size: 12pt; line-height: 2; text-align: justify; text-indent: 40px; margin-bottom: 18px;">
    First and foremost, I express my profound gratitude to the Almighty for bestowing upon me the strength, determination, and wisdom required to bring this project work to a successful fruition.
  </p>

  <p style="font-size: 12pt; line-height: 2; text-align: justify; text-indent: 40px; margin-bottom: 18px;">
    I express my heartfelt gratitude and sincere indebtedness to our respected Principal, <strong>Dr. P. Deiva Sundari</strong>, and the esteemed Management of <strong>Easwari Engineering College</strong> for providing state-of-the-art computational infrastructure, encouraging academic environment, and relentless support throughout my academic tenure.
  </p>

  <p style="font-size: 12pt; line-height: 2; text-align: justify; text-indent: 40px; margin-bottom: 18px;">
    I convey my profound gratitude to the <strong>Head of the Department</strong>, Department of Computer Science and Engineering (Artificial Intelligence and Machine Learning), for providing insightful encouragement, academic leadership, and essential resources that fostered the development of this full-stack healthcare platform.
  </p>

  <p style="font-size: 12pt; line-height: 2; text-align: justify; text-indent: 40px; margin-bottom: 18px;">
    I am deeply grateful and indebted to my Project Supervisor and Guide, <strong>Ms. Divyanjali, Technical Trainer</strong>, Department of CSE (AIML), whose profound technical acumen, constructive critiques, rigorous mentoring, and unwavering patience guided me at every stage of design, system implementation, and testing.
  </p>

  <p style="font-size: 12pt; line-height: 2; text-align: justify; text-indent: 40px; margin-bottom: 18px;">
    I extend my sincere thanks to all the respected faculty members, technical laboratory assistants, and administrative staff of the Department of Computer Science and Engineering (AIML) for their continuous cooperation, valuable suggestions, and moral support.
  </p>

  <p style="font-size: 12pt; line-height: 2; text-align: justify; text-indent: 40px; margin-bottom: 30px;">
    Finally, I owe my deepest debt of affection and gratitude to my beloved parents, family members, and dear friends for their unconditional love, moral inspiration, sacrifices, and perpetual encouragement throughout my studies and during the execution of this endeavor.
  </p>

  <div style="margin-top: 50px; text-align: right; font-size: 12pt;">
    <p style="font-weight: bold; margin-bottom: 3px;">PRIYAN R</p>
    <p style="margin: 0;">(Reg No: 310624148072)</p>
  </div>
</div>
`,

  getTableOfContents: () => `
<div class="page" style="box-sizing: border-box; padding: 40px 30px 20px;">
  <h2 style="font-size: 16pt; font-weight: bold; text-align: center; margin-bottom: 25px; letter-spacing: 1px;">
    TABLE OF CONTENTS
  </h2>

  <table class="toc-table" style="width: 100%; border-collapse: collapse; font-size: 11pt; line-height: 1.6;">
    <thead>
      <tr style="border-bottom: 1.5px solid #000; font-weight: bold;">
        <th style="text-align: left; width: 15%; padding: 6px 0;">CHAPTER</th>
        <th style="text-align: left; width: 73%; padding: 6px 0;">TITLE</th>
        <th style="text-align: right; width: 12%; padding: 6px 0;">PAGE NO.</th>
      </tr>
    </thead>
    <tbody>
      <tr style="font-style: italic;"><td></td><td>Abstract</td><td style="text-align: right;">iv</td></tr>
      <tr style="font-style: italic;"><td></td><td>Acknowledgement</td><td style="text-align: right;">v</td></tr>
      <tr style="font-style: italic;"><td></td><td>List of Tables</td><td style="text-align: right;">viii</td></tr>
      <tr style="font-style: italic;"><td></td><td>List of Figures</td><td style="text-align: right;">ix</td></tr>
      <tr style="font-style: italic;"><td></td><td>List of Abbreviations</td><td style="text-align: right;">x</td></tr>

      <tr style="font-weight: bold; height: 26px; vertical-align: bottom;"><td colspan="3">1. INTRODUCTION</td></tr>
      <tr><td>1.1</td><td>Overview of Blood Banking Logistics</td><td style="text-align: right;">1</td></tr>
      <tr><td>1.2</td><td>Problem Definition</td><td style="text-align: right;">3</td></tr>
      <tr><td>1.3</td><td>Project Objectives</td><td style="text-align: right;">4</td></tr>
      <tr><td>1.4</td><td>Scope of the Project</td><td style="text-align: right;">5</td></tr>
      <tr><td>1.5</td><td>Motivation &amp; Healthcare Impact</td><td style="text-align: right;">6</td></tr>

      <tr style="font-weight: bold; height: 26px; vertical-align: bottom;"><td colspan="3">2. RELATED WORK</td></tr>
      <tr><td>2.1</td><td>Literature Review &amp; Statutory Guidelines</td><td style="text-align: right;">7</td></tr>
      <tr><td>2.2</td><td>Analysis of Existing Systems &amp; Drawbacks</td><td style="text-align: right;">9</td></tr>
      <tr><td>2.3</td><td>Proposed HemoVault Architecture &amp; Advantages</td><td style="text-align: right;">11</td></tr>

      <tr style="font-weight: bold; height: 26px; vertical-align: bottom;"><td colspan="3">3. SYSTEM ANALYSIS</td></tr>
      <tr><td>3.1</td><td>System Requirements Specification</td><td style="text-align: right;">13</td></tr>
      <tr><td></td><td style="padding-left: 20px;">3.1.1 Functional Requirements</td><td style="text-align: right;">13</td></tr>
      <tr><td></td><td style="padding-left: 20px;">3.1.2 Non-Functional Requirements</td><td style="text-align: right;">15</td></tr>
      <tr><td>3.2</td><td>Software and Hardware Specification</td><td style="text-align: right;">16</td></tr>

      <tr style="font-weight: bold; height: 26px; vertical-align: bottom;"><td colspan="3">4. SYSTEM DESIGN</td></tr>
      <tr><td>4.1</td><td>System Architecture (3-Tier MERN Architecture)</td><td style="text-align: right;">18</td></tr>
      <tr><td>4.2</td><td>Detailed Module Description</td><td style="text-align: right;">20</td></tr>
      <tr><td>4.3</td><td>Database Schema &amp; Entity-Relationship Design</td><td style="text-align: right;">23</td></tr>
      <tr><td>4.4</td><td>UML Class Diagram &amp; Object Relationships</td><td style="text-align: right;">25</td></tr>
      <tr><td>4.5</td><td>UML Sequence Diagrams &amp; Dynamic Workflow</td><td style="text-align: right;">27</td></tr>
      <tr><td>4.6</td><td>State Machine &amp; Data Flow Diagrams (DFD)</td><td style="text-align: right;">29</td></tr>

      <tr style="font-weight: bold; height: 26px; vertical-align: bottom;"><td colspan="3">5. IMPLEMENTATION</td></tr>
      <tr><td>5.1</td><td>Implementation Overview &amp; Engineering Stack</td><td style="text-align: right;">31</td></tr>
      <tr><td>5.2</td><td>Key Functions &amp; In-Depth Code Explanation</td><td style="text-align: right;">32</td></tr>
      <tr><td></td><td style="padding-left: 20px;">5.2.1 Authentication &amp; RBAC Authorization</td><td style="text-align: right;">32</td></tr>
      <tr><td></td><td style="padding-left: 20px;">5.2.2 Clinical Eligibility Engine</td><td style="text-align: right;">34</td></tr>
      <tr><td></td><td style="padding-left: 20px;">5.2.3 Laboratory Testing &amp; Safety Gatekeeper</td><td style="text-align: right;">35</td></tr>
      <tr><td></td><td style="padding-left: 20px;">5.2.4 Inventory TTL Expiry &amp; Allocation Algorithms</td><td style="text-align: right;">36</td></tr>
      <tr><td></td><td style="padding-left: 20px;">5.2.5 Immutable Audit Ledger Mechanism</td><td style="text-align: right;">37</td></tr>

      <tr style="font-weight: bold; height: 26px; vertical-align: bottom;"><td colspan="3">6. CONCLUSION &amp; FUTURE WORK</td></tr>
      <tr><td>6.1</td><td>Project Conclusion &amp; Empirical Findings</td><td style="text-align: right;">38</td></tr>
      <tr><td>6.2</td><td>Future Enhancements &amp; Roadmap</td><td style="text-align: right;">39</td></tr>

      <tr style="font-weight: bold; height: 26px; vertical-align: bottom;"><td colspan="3">APPENDIX: SOURCE CODE (17 Core Components)</td></tr>
      <tr><td>A.1</td><td>Project Folder Structure</td><td style="text-align: right;">41</td></tr>
      <tr><td>A.2</td><td>Backend Package Installation</td><td style="text-align: right;">41</td></tr>
      <tr><td>A.3</td><td>Database Connection Script (db.js)</td><td style="text-align: right;">42</td></tr>
      <tr><td>A.4</td><td>Environment Variables Configuration (.env)</td><td style="text-align: right;">42</td></tr>
      <tr><td>A.5</td><td>User Model Schema (User.js)</td><td style="text-align: right;">43</td></tr>
      <tr><td>A.6</td><td>Password Hashing &amp; Registration Controller</td><td style="text-align: right;">43</td></tr>
      <tr><td>A.7</td><td>Login &amp; JWT Generation Controller</td><td style="text-align: right;">44</td></tr>
      <tr><td>A.8</td><td>Authentication Middleware (auth.js)</td><td style="text-align: right;">44</td></tr>
      <tr><td>A.9</td><td>Create API (Donor Registration &amp; Unit Creation)</td><td style="text-align: right;">45</td></tr>
      <tr><td>A.10</td><td>Read API (Inventory Matrix &amp; Dashboard Analytics)</td><td style="text-align: right;">45</td></tr>
      <tr><td>A.11</td><td>Update API (Lab Marker Verification)</td><td style="text-align: right;">46</td></tr>
      <tr><td>A.12</td><td>Delete API (Expired Stock Disposal)</td><td style="text-align: right;">46</td></tr>
      <tr><td>A.13</td><td>Express Route Configuration</td><td style="text-align: right;">47</td></tr>
      <tr><td>A.14</td><td>Main Server Entrypoint (server.js)</td><td style="text-align: right;">47</td></tr>
      <tr><td>A.15</td><td>React Login Component (Login.jsx)</td><td style="text-align: right;">48</td></tr>
      <tr><td>A.16</td><td>Admin Dashboard Logic (AdminDashboard.jsx)</td><td style="text-align: right;">48</td></tr>
      <tr><td>A.17</td><td>REST API Request and Response Schemas</td><td style="text-align: right;">49</td></tr>

      <tr style="font-weight: bold; height: 26px; vertical-align: bottom;"><td colspan="2">SCREENSHOTS OF THE PROJECT</td><td style="text-align: right;">50</td></tr>
      <tr style="font-weight: bold; height: 26px; vertical-align: bottom;"><td colspan="2">REFERENCES</td><td style="text-align: right;">52</td></tr>
    </tbody>
  </table>
</div>
`,

  getListsOfTablesFigures: () => `
<div class="page" style="box-sizing: border-box; padding: 40px 30px 20px;">
  <h2 style="font-size: 15pt; font-weight: bold; text-align: center; margin-bottom: 25px; letter-spacing: 1px;">
    LIST OF TABLES &amp; FIGURES
  </h2>

  <h3 style="font-size: 12pt; font-weight: bold; margin-bottom: 12px; border-bottom: 1px solid #000; padding-bottom: 4px;">
    LIST OF TABLES
  </h3>
  <table style="width: 100%; border-collapse: collapse; font-size: 10.5pt; margin-bottom: 25px;">
    <tr style="border-bottom: 1px solid #ddd; font-weight: bold;">
      <td style="width: 18%; padding: 4px 0;">Table No.</td>
      <td style="width: 70%; padding: 4px 0;">Table Description</td>
      <td style="width: 12%; text-align: right; padding: 4px 0;">Page</td>
    </tr>
    <tr><td style="padding: 3px 0;">Table 1.1</td><td>Comparative Shelf-Life of Blood Components</td><td style="text-align: right;">2</td></tr>
    <tr><td style="padding: 3px 0;">Table 2.1</td><td>Feature Comparison: Manual vs Legacy vs HemoVault</td><td style="text-align: right;">10</td></tr>
    <tr><td style="padding: 3px 0;">Table 3.1</td><td>Donor Clinical Vitals Acceptance Thresholds</td><td style="text-align: right;">14</td></tr>
    <tr><td style="padding: 3px 0;">Table 3.2</td><td>Server &amp; Development Hardware Specifications</td><td style="text-align: right;">16</td></tr>
    <tr><td style="padding: 3px 0;">Table 3.3</td><td>Software Platform &amp; Dependency Matrix</td><td style="text-align: right;">17</td></tr>
    <tr><td style="padding: 3px 0;">Table 4.1</td><td>MongoDB Collections Schema Overview</td><td style="text-align: right;">24</td></tr>
    <tr><td style="padding: 3px 0;">Table 4.2</td><td>Blood Compatibility Cross-Match Matrix</td><td style="text-align: right;">28</td></tr>
  </table>

  <h3 style="font-size: 12pt; font-weight: bold; margin-bottom: 12px; border-bottom: 1px solid #000; padding-bottom: 4px;">
    LIST OF FIGURES
  </h3>
  <table style="width: 100%; border-collapse: collapse; font-size: 10.5pt; margin-bottom: 25px;">
    <tr style="border-bottom: 1px solid #ddd; font-weight: bold;">
      <td style="width: 18%; padding: 4px 0;">Figure No.</td>
      <td style="width: 70%; padding: 4px 0;">Figure Description</td>
      <td style="width: 12%; text-align: right; padding: 4px 0;">Page</td>
    </tr>
    <tr><td style="padding: 3px 0;">Figure 4.1</td><td>HemoVault 3-Tier Layered Architecture Diagram</td><td style="text-align: right;">19</td></tr>
    <tr><td style="padding: 3px 0;">Figure 4.2</td><td>Comprehensive Entity-Relationship (ER) Diagram</td><td style="text-align: right;">23</td></tr>
    <tr><td style="padding: 3px 0;">Figure 4.3</td><td>UML Class Diagram &amp; Data Model Associations</td><td style="text-align: right;">25</td></tr>
    <tr><td style="padding: 3px 0;">Figure 4.4</td><td>Sequence Diagram: Emergency Requisition Workflow</td><td style="text-align: right;">27</td></tr>
    <tr><td style="padding: 3px 0;">Figure 4.5</td><td>Sequence Diagram: Phlebotomy &amp; Diagnostic Screening</td><td style="text-align: right;">28</td></tr>
    <tr><td style="padding: 3px 0;">Figure 4.6</td><td>Blood Unit State Machine Transition Diagram</td><td style="text-align: right;">29</td></tr>
    <tr><td style="padding: 3px 0;">Figure 7.1</td><td>User Authentication &amp; Multi-Role Gateway UI</td><td style="text-align: right;">50</td></tr>
    <tr><td style="padding: 3px 0;">Figure 7.2</td><td>Executive Administrative Operations Dashboard</td><td style="text-align: right;">50</td></tr>
    <tr><td style="padding: 3px 0;">Figure 7.3</td><td>Real-Time Cold-Storage Inventory Matrix</td><td style="text-align: right;">50</td></tr>
    <tr><td style="padding: 3px 0;">Figure 7.4</td><td>Pathology Testing &amp; 5-Marker Diagnostic Console</td><td style="text-align: right;">51</td></tr>
    <tr><td style="padding: 3px 0;">Figure 7.5</td><td>Emergency Hospital Requisition Queue</td><td style="text-align: right;">51</td></tr>
    <tr><td style="padding: 3px 0;">Figure 7.6</td><td>Donor Portal &amp; Digital Card Generator</td><td style="text-align: right;">51</td></tr>
  </table>

  <h3 style="font-size: 12pt; font-weight: bold; margin-bottom: 12px; border-bottom: 1px solid #000; padding-bottom: 4px;">
    LIST OF ABBREVIATIONS
  </h3>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 10pt;">
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
`
};
