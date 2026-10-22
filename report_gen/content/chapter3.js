module.exports = {
  getChapter3: () => `
<!-- PAGE 13 -->
<div class="page main-page" data-page="13">
  <div class="chapter-header">
    <h2 class="chapter-title">CHAPTER 3</h2>
    <h3 class="chapter-subtitle">SYSTEM ANALYSIS</h3>
  </div>

  <h4 class="section-title">3.1 SYSTEM REQUIREMENTS SPECIFICATION</h4>
  <p class="body-text">
    A rigorous systems engineering analysis was executed to delineate the functional scope, behavioral boundaries, and operational constraints governing the HemoVault platform. The requirements are formally categorized into Functional Requirements (system behaviors, business logic, workflows) and Non-Functional Requirements (performance, security, usability, availability, and regulatory compliance).
  </p>

  <h5 style="font-size: 11pt; font-weight: bold; margin: 12px 0 6px 0;">3.1.1 Functional Requirements (FR):</h5>
  <p class="body-text">
    The functional capabilities of HemoVault are partitioned across eight interconnected subsystems:
  </p>

  <div class="requirement-block">
    <strong>FR-1: Identity Management &amp; Cryptographic Authentication</strong>
    <ul class="bullet-list" style="margin-top: 4px;">
      <li>The system shall authenticate users via unique email addresses and passwords cryptographically salted and hashed using the bcrypt algorithm with a minimum work factor of 10 rounds.</li>
      <li>Upon successful credential verification, the API shall issue a signed JSON Web Token (JWT) encapsulating the user's primary key (<code>_id</code>), role claims, and a 7-day expiration timestamp.</li>
      <li>The application shall support three distinct role hierarchies: <code>admin</code> (full medical system privilege), <code>donor</code> (personal profile and appointment booking), and <code>requester</code> (hospital blood requisitions).</li>
      <li>The system shall enforce RBAC middleware guards across all protected REST endpoints, rejecting unauthorized access attempts with HTTP 401 Unauthorized or HTTP 403 Forbidden status codes.</li>
    </ul>
  </div>

  <div class="requirement-block">
    <strong>FR-2: Donor Onboarding &amp; Clinical Eligibility Triage</strong>
    <ul class="bullet-list" style="margin-top: 4px;">
      <li>The system shall collect and validate donor demographics: legal name, gender, date of birth, blood group (A+, A-, B+, B-, AB+, AB-, O+), contact telephone, and residential address.</li>
      <li>The system shall maintain clinical vital records comprising body weight (kg), hemoglobin concentration (g/dL), resting pulse rate (beats per minute), systolic blood pressure, diastolic blood pressure, and historical donation timestamps.</li>
      <li>The system shall execute a deterministic mathematical rules engine validating donor eligibility against NBTC clinical thresholds prior to appointment confirmation.</li>
    </ul>
  </div>
</div>

<!-- PAGE 14 -->
<div class="page main-page" data-page="14">
  <p class="body-text">
    Table 3.1 details the clinical parameters, validation boundaries, and medical rationales enforced by HemoVault's Clinical Eligibility Engine.
  </p>

  <div class="table-container">
    <p class="table-caption">Table 3.1: Donor Clinical Vitals Acceptance Thresholds &amp; Statutory Medical Constraints</p>
    <table class="data-table">
      <thead>
        <tr>
          <th>Clinical Parameter</th>
          <th>Acceptable Range</th>
          <th>Evaluation Rule</th>
          <th>Clinical Rationale / Deferral Reason</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Donor Age</strong></td>
          <td>18 to 65 Years</td>
          <td><code>age &gt;= 18 &amp;&amp; age &lt;= 65</code></td>
          <td>Legal age of consent; cardiovascular safety in older adults</td>
        </tr>
        <tr>
          <td><strong>Body Weight</strong></td>
          <td>&ge; 45.0 kg</td>
          <td><code>weightKg &gt;= 45</code></td>
          <td>Prevents hypovolemia; limits draw to &lt; 13% total blood volume</td>
        </tr>
        <tr>
          <td><strong>Hemoglobin (Hb)</strong></td>
          <td>&ge; 12.5 g/dL</td>
          <td><code>hemoglobin &gt;= 12.5</code></td>
          <td>Guarantees donor does not become clinically anemic post-donation</td>
        </tr>
        <tr>
          <td><strong>Pulse Rate</strong></td>
          <td>60 to 100 bpm</td>
          <td><code>pulse &gt;= 60 &amp;&amp; pulse &lt;= 100</code></td>
          <td>Normal sinus rhythm; excludes bradycardia and acute tachycardia</td>
        </tr>
        <tr>
          <td><strong>Systolic Blood Pressure</strong></td>
          <td>100 to 140 mmHg</td>
          <td><code>systolic &gt;= 100 &amp;&amp; systolic &lt;= 140</code></td>
          <td>Excludes hypotensive syncopal risk and Stage 2 hypertension</td>
        </tr>
        <tr>
          <td><strong>Diastolic Blood Pressure</strong></td>
          <td>60 to 90 mmHg</td>
          <td><code>diastolic &gt;= 60 &amp;&amp; diastolic &lt;= 90</code></td>
          <td>Prevents coronary perfusion risk and vascular strain</td>
        </tr>
        <tr>
          <td><strong>Inter-Donation Interval</strong></td>
          <td>&ge; 90 Days (Whole Blood)</td>
          <td><code>(now - lastDate) &gt;= 90 days</code></td>
          <td>Allows complete erythropoiesis and bone marrow iron replenishment</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="requirement-block">
    <strong>FR-3: Phlebotomy Intake &amp; Unit Serial Generation</strong>
    <ul class="bullet-list" style="margin-top: 4px;">
      <li>Upon clinical phlebotomy completion, the system shall instantiate a unique <code>BloodUnit</code> record assigned an immutable human-readable identifier formatted as <code>BLD-YYYY-XXXX</code> (e.g., <code>BLD-2026-0042</code>).</li>
      <li>The unit must record collection timestamp, expiration timestamp computed from component fraction rules, volume in milliliters (standard 350 mL or 450 mL), and physical storage refrigerator location.</li>
      <li>All newly phlebotomized units must strictly initialize with an inventory status of <code>QUARANTINED</code> and a testing status of <code>PENDING</code>.</li>
    </ul>
  </div>
</div>

<!-- PAGE 15 -->
<div class="page main-page" data-page="15">
  <div class="requirement-block">
    <strong>FR-4: Diagnostic Laboratory Screening &amp; Safety Gatekeeper</strong>
    <ul class="bullet-list" style="margin-top: 4px;">
      <li>The system shall capture serological test outcomes across five mandatory infectious disease markers: Human Immunodeficiency Virus (HIV-1/2), Hepatitis B Surface Antigen (HBsAg), Hepatitis C Virus (HCV), Syphilis (Treponema pallidum / VDRL), and Malaria parasite.</li>
      <li>A blood unit shall transition to <code>AVAILABLE</code> status if, and only if, all five diagnostic fields are recorded as <code>NEGATIVE</code>.</li>
      <li>If any individual marker is recorded as <code>POSITIVE</code>, the system shall atomically mark the test record as <code>REACTIVE</code>, transition the blood unit to <code>DISCARDED</code> (Biohazard Quarantine), and bar it permanently from clinical allocation.</li>
    </ul>
  </div>

  <div class="requirement-block">
    <strong>FR-5: Multi-Tier Hospital Emergency Requisition &amp; FIFO Allocation</strong>
    <ul class="bullet-list" style="margin-top: 4px;">
      <li>Accredited hospital accounts shall submit requisitions specifying blood group, component fraction, quantity in units, and urgency level (<code>NORMAL</code>, <code>URGENT</code>, <code>CRITICAL</code>).</li>
      <li>The allocation engine shall query available stock matching the requested ABO/Rh group and component, sorting matching units in ascending order of collection date (First-In-First-Out).</li>
      <li>The allocation operation shall be atomic: units assigned to a requisition must transition from <code>AVAILABLE</code> to <code>RESERVED</code> or <code>ISSUED</code>, preventing simultaneous double-allocation race conditions.</li>
    </ul>
  </div>

  <div class="requirement-block">
    <strong>FR-6: Immutable Audit Logging &amp; Regulatory Hemovigilance</strong>
    <ul class="bullet-list" style="margin-top: 4px;">
      <li>Every lifecycle state mutation—collection, quarantine, testing approval, reservation, dispatch, and disposal—must be appended to an immutable <code>Transaction</code> audit collection recording the acting operator's user reference, timestamp, and metadata.</li>
    </ul>
  </div>

  <h5 style="font-size: 11pt; font-weight: bold; margin: 12px 0 6px 0;">3.1.2 Non-Functional Requirements (NFR):</h5>
  <ul class="bullet-list">
    <li><strong>Security &amp; Data Protection:</strong> All external API communications must occur over TLS/HTTPS. Passwords must never be stored in plaintext. JWT tokens must be transmitted via HTTP Authorization headers and stored client-side in secure browser storage.</li>
    <li><strong>High Performance &amp; Low Latency:</strong> Critical API endpoints (stock availability matrix, emergency allocation) must maintain average response latencies below 100 milliseconds under standard load.</li>
    <li><strong>Availability &amp; Fault Tolerance:</strong> The application shall maintain 99.9% uptime. If the primary external MongoDB Atlas connection experiences network failure, the application must automatically failover to embedded in-memory persistence without crashing.</li>
    <li><strong>Usability &amp; Responsive Presentation:</strong> The frontend user interface must be fully responsive across desktop workstations (1920x1080), laptops (1366x768), and tablet devices (768x1024), utilizing accessible healthcare-themed contrast palettes (WCAG AA compliant).</li>
  </ul>
</div>

<!-- PAGE 16 -->
<div class="page main-page" data-page="16">
  <h4 class="section-title">3.2 SOFTWARE AND HARDWARE REQUIREMENTS</h4>
  <p class="body-text">
    To ensure seamless reproducibility across development, academic evaluation, and cloud production environments, the minimum and recommended hardware and software configurations are specified below.
  </p>

  <h5 style="font-size: 11pt; font-weight: bold; margin: 12px 0 6px 0;">3.2.1 Hardware Requirements:</h5>
  <div class="table-container">
    <p class="table-caption">Table 3.2: Minimum and Recommended Hardware Specifications</p>
    <table class="data-table">
      <thead>
        <tr>
          <th>Component</th>
          <th>Development / Evaluation Machine</th>
          <th>Production Cloud Server (Recommended)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Processor (CPU)</strong></td>
          <td>Apple Silicon (M1/M2/M3) or Intel Core i5 @ 2.4 GHz (4 Cores)</td>
          <td>Quad-Core vCPU (e.g., AWS EC2 t3.xlarge or DigitalOcean Droplet)</td>
        </tr>
        <tr>
          <td><strong>Random Access Memory (RAM)</strong></td>
          <td>8 GB DDR4 / Unified Memory</td>
          <td>16 GB ECC RAM (to accommodate in-memory caching and search)</td>
        </tr>
        <tr>
          <td><strong>Storage Device (Disk)</strong></td>
          <td>256 GB Solid State Drive (NVMe SSD) with 5 GB free disk space</td>
          <td>100 GB NVMe SSD with automated EBS daily snapshots</td>
        </tr>
        <tr>
          <td><strong>Network Interface</strong></td>
          <td>Broadband Ethernet or Wi-Fi (minimum 10 Mbps upstream/downstream)</td>
          <td>Dedicated 1 Gbps redundant network uplink</td>
        </tr>
        <tr>
          <td><strong>Display Resolution</strong></td>
          <td>1366 &times; 768 minimum; 1920 &times; 1080 recommended</td>
          <td>Headless server (accessed via SSH / Cloud Console)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <p class="body-text">
    The application runtime is engineered for high computational efficiency. By leveraging the asynchronous non-blocking event loop of Node.js and client-side single page rendering via React 18, server-side CPU utilization remains below 12% even under concurrent simulated load tests.
  </p>
</div>

<!-- PAGE 17 -->
<div class="page main-page" data-page="17">
  <h5 style="font-size: 11pt; font-weight: bold; margin: 12px 0 6px 0;">3.2.2 Software Requirements:</h5>
  <div class="table-container">
    <p class="table-caption">Table 3.3: Software Environment, Frameworks, and Dependency Stack</p>
    <table class="data-table">
      <thead>
        <tr>
          <th>Category</th>
          <th>Software Technology</th>
          <th>Version</th>
          <th>Role in Architecture</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Operating System</strong></td>
          <td>macOS Sonoma / Darwin x86_64 or Linux Ubuntu 22.04 LTS</td>
          <td>Current</td>
          <td>Host computational environment for development and serving</td>
        </tr>
        <tr>
          <td><strong>Runtime Engine</strong></td>
          <td>Node.js JavaScript Runtime</td>
          <td>v20.18.0 LTS</td>
          <td>Executes asynchronous JavaScript server logic and API services</td>
        </tr>
        <tr>
          <td><strong>Package Manager</strong></td>
          <td>Node Package Manager (NPM)</td>
          <td>v10.8.2</td>
          <td>Manages project dependencies, scripts, and build artifacts</td>
        </tr>
        <tr>
          <td><strong>Backend Framework</strong></td>
          <td>Express.js</td>
          <td>v4.19.2</td>
          <td>HTTP REST API routing, middleware chaining, and JSON controllers</td>
        </tr>
        <tr>
          <td><strong>Database Management</strong></td>
          <td>MongoDB &amp; Mongoose ODM</td>
          <td>Mongoose v8.4.0 (MongoDB 7.0)</td>
          <td>NoSQL document persistence, schema validation, and indexing</td>
        </tr>
        <tr>
          <td><strong>Embedded Database</strong></td>
          <td>MongoMemoryServer</td>
          <td>v9.2.0</td>
          <td>Zero-setup local binary fallback for academic demonstration</td>
        </tr>
        <tr>
          <td><strong>Frontend Library</strong></td>
          <td>React.js &amp; React-DOM</td>
          <td>v18.2.0 / v19.x</td>
          <td>Component-based virtual DOM reactive user interface</td>
        </tr>
        <tr>
          <td><strong>Build Tool / Bundler</strong></td>
          <td>Vite</td>
          <td>v6.4.3</td>
          <td>Lightning-fast Hot Module Replacement (HMR) and production bundling</td>
        </tr>
        <tr>
          <td><strong>Client Routing</strong></td>
          <td>React Router DOM</td>
          <td>v6.23.1 / v7.x</td>
          <td>Client-side declarative routing and protected navigation guards</td>
        </tr>
        <tr>
          <td><strong>HTTP Client</strong></td>
          <td>Axios</td>
          <td>v1.7.0</td>
          <td>Promise-based HTTP client with request/response interceptors</td>
        </tr>
        <tr>
          <td><strong>Security &amp; Cryptography</strong></td>
          <td>bcryptjs &amp; jsonwebtoken</td>
          <td>bcryptjs v2.4.3, JWT v9.0.2</td>
          <td>Password hashing and stateless cryptographically signed tokens</td>
        </tr>
        <tr>
          <td><strong>Iconography &amp; UI</strong></td>
          <td>Lucide React &amp; Custom Vanilla CSS</td>
          <td>v0.378.0</td>
          <td>Vector iconography and cohesive healthcare design system</td>
        </tr>
        <tr>
          <td><strong>API Testing &amp; Tooling</strong></td>
          <td>Postman, cURL, VS Code, Git</td>
          <td>Current</td>
          <td>Endpoint debugging, version control, and collaborative workflows</td>
        </tr>
      </tbody>
    </table>
  </div>

  <p class="body-text">
    This precise combination of modern open-source technologies ensures complete platform independence, zero proprietary licensing fees, and extraordinary deployment agility across local workstations, cloud container environments (Docker), and serverless edges.
  </p>
</div>
`
};
