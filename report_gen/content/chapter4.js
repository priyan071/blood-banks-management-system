const { architectureSvg, classDiagramSvg, sequenceEmergencySvg, sequenceDonationSvg } = require('./diagrams');

module.exports = {
  getChapter4: () => `
<!-- PAGE 18 -->
<div class="page main-page" data-page="18">
  <div class="chapter-header">
    <h2 class="chapter-title">CHAPTER 4</h2>
    <h3 class="chapter-subtitle">SYSTEM DESIGN</h3>
  </div>

  <h4 class="section-title">4.1 SYSTEM ARCHITECTURE</h4>
  <p class="body-text">
    The architectural paradigm of <strong>HemoVault</strong> is rooted in an enterprise-grade <strong>3-Tier Layered Architecture</strong> adhering to separation of concerns, high cohesion, and loose coupling. This decoupling ensures that presentation interfaces, core business services, and persistent data storage evolve independently without introducing systemic regressions.
  </p>

  <h5 style="font-size: 11pt; font-weight: bold; margin: 10px 0 4px 0;">4.1.1 Tier-by-Tier Architectural Decomposition:</h5>
  
  <p class="body-text">
    <strong>1. Presentation Tier (Client SPA):</strong> Engineered using <strong>React 18</strong> and <strong>Vite</strong>, this client layer runs entirely inside the user's web browser. It is responsible for rendering declarative, state-driven user interfaces for Administrators, Voluntary Donors, and Hospital Requesters. Using React Router DOM, navigation occurs instantly without full-page browser reloads. Centralized state is orchestrated via the <code>AuthContext</code> provider, while network requests are handled through an Axios HTTP instance configured with automatic request/response interceptors that inject JWT authorization headers into outgoing requests.
  </p>

  <p class="body-text">
    <strong>2. Application &amp; API Gateway Tier (Express &amp; Node.js):</strong> The middle tier executes on the asynchronous, event-driven Node.js runtime. An <strong>Express 4</strong> web server acts as the API Gateway. It terminates incoming HTTPS traffic, processes cross-origin resource sharing (CORS) policies, logs requests via Morgan middleware, and passes incoming payloads through JSON parsing engines. The gateway layer then routes requests through security middleware:
  </p>

  <ul class="bullet-list">
    <li><code>protect</code>: Cryptographically verifies the incoming Bearer token using HMAC-SHA256 and retrieves the active user context from the database.</li>
    <li><code>authorize(...roles)</code>: Evaluates whether the authenticated user possesses the requisite role claim (e.g., restricting inventory release strictly to <code>admin</code>).</li>
    <li><code>errorHandler</code>: Intercepts unhandled asynchronous rejections, formatting error responses into standardized JSON payloads while suppressing sensitive stack traces in production.</li>
  </ul>
</div>

<!-- PAGE 19 -->
<div class="page main-page" data-page="19">
  <p class="body-text">
    Figure 4.1 visually details the multi-tier architectural interactions of HemoVault, illustrating the flow of requests from the browser presentation tier down to persistent database storage.
  </p>

  <div class="diagram-box">
    <p class="diagram-caption">Figure 4.1: HemoVault Enterprise 3-Tier Layered Architecture Diagram</p>
    ${architectureSvg}
  </div>

  <p class="body-text">
    <strong>3. Persistence Tier (MongoDB / MongoMemoryServer):</strong> At the data foundation, MongoDB operates as the document-oriented datastore. Unlike rigid relational database tables, MongoDB's document model represents clinical vitals, laboratory test arrays, and transaction audit trails naturally as BSON structures. Object-Data-Modeling is managed through <strong>Mongoose</strong>, enforcing schema validations, pre-save cryptographic hooks, and cross-collection references (<code>ObjectId</code> population).
  </p>
</div>

<!-- PAGE 20 -->
<div class="page main-page" data-page="20">
  <h4 class="section-title">4.2 DETAILED MODULE DESCRIPTION</h4>
  <p class="body-text">
    The application logic within the middle tier is partitioned into eight modular, decoupled subsystems:
  </p>

  <div class="module-card">
    <h5 style="color: #991b1b; font-size: 11pt; margin-bottom: 4px;">Module 1: Authentication &amp; Role-Based Access Control (RBAC)</h5>
    <p class="body-text" style="font-size: 10pt; margin: 0;">
      Governs user identity registration, cryptographic password salting and hashing via <code>bcryptjs</code> (cost factor 10), and issue of stateless, signed JSON Web Tokens (JWT). Decodes user identity in subsequent HTTP requests and restricts access according to user role: <code>admin</code>, <code>donor</code>, or <code>requester</code>.
    </p>
  </div>

  <div class="module-card">
    <h5 style="color: #991b1b; font-size: 11pt; margin-bottom: 4px;">Module 2: Donor Management &amp; Algorithmic Clinical Triage</h5>
    <p class="body-text" style="font-size: 10pt; margin: 0;">
      Maintains longitudinal medical records for all voluntary donors. Evaluates clinical vital signs (age, weight, hemoglobin, pulse rate, systolic/diastolic blood pressure) against deterministic statutory safety boundaries. Computes exact next-eligible donation dates and issues digital donor cards.
    </p>
  </div>

  <div class="module-card">
    <h5 style="color: #991b1b; font-size: 11pt; margin-bottom: 4px;">Module 3: Donation Appointment Scheduling</h5>
    <p class="body-text" style="font-size: 10pt; margin: 0;">
      Facilitates appointment reservations across blood center venues and regional mobile collection camps. Enforces operational slot capacity limits, tracks status progression (<code>SCHEDULED</code> &rarr; <code>COMPLETED</code> &rarr; <code>CANCELLED</code>), and links completed donations directly to phlebotomy records.
    </p>
  </div>

  <div class="module-card">
    <h5 style="color: #991b1b; font-size: 11pt; margin-bottom: 4px;">Module 4: Pathology Laboratory Screening &amp; Safety Gatekeeper</h5>
    <p class="body-text" style="font-size: 10pt; margin: 0;">
      Acts as an inviolable biological safety barrier. Enforces diagnostic recording for 5 mandatory viral and bacterial markers (HIV, HBV, HCV, Syphilis, Malaria). Automatically transitions fully negative units from <code>QUARANTINED</code> to <code>AVAILABLE</code>, while locking reactive units into permanent quarantine.
    </p>
  </div>
</div>

<!-- PAGE 21 -->
<div class="page main-page" data-page="21">
  <div class="module-card">
    <h5 style="color: #991b1b; font-size: 11pt; margin-bottom: 4px;">Module 5: Cold-Chain Inventory &amp; Expiration TTL Engine</h5>
    <p class="body-text" style="font-size: 10pt; margin: 0;">
      Orchestrates real-time stock balances across all 8 ABO/Rh blood groups and 4 component fractions (Whole Blood, PRBC, Platelets, FFP). Enforces component-specific expiration rules (e.g., 5 days for Platelets, 42 days for PRBC). Sweeps database records to identify and mark outdated inventory before clinical dispatch can occur.
    </p>
  </div>

  <div class="module-card">
    <h5 style="color: #991b1b; font-size: 11pt; margin-bottom: 4px;">Module 6: Multi-Tier Hospital Emergency Requisition &amp; Dispatch</h5>
    <p class="body-text" style="font-size: 10pt; margin: 0;">
      Receives and prioritizes hospital blood requisitions according to clinical urgency: <code>NORMAL</code>, <code>URGENT</code>, and <code>CRITICAL</code>. Implements an automated First-In-First-Out (FIFO) allocation routine that identifies the oldest verified units, atomically reserves them, and manages physical dispatch handoff.
    </p>
  </div>

  <div class="module-card">
    <h5 style="color: #991b1b; font-size: 11pt; margin-bottom: 4px;">Module 7: Immutable Audit Ledger &amp; Hemovigilance Traceability</h5>
    <p class="body-text" style="font-size: 10pt; margin: 0;">
      Records every lifecycle state change into an append-only transaction collection. Captures timestamp, operator identity, unit serial, previous state, new state, and contextual notes, establishing complete legal and clinical chain of custody.
    </p>
  </div>

  <div class="module-card">
    <h5 style="color: #991b1b; font-size: 11pt; margin-bottom: 4px;">Module 8: Executive Analytics &amp; Statutory Report Generation</h5>
    <p class="body-text" style="font-size: 10pt; margin: 0;">
      Aggregates operational metrics across collections, testing pass rates, component distribution percentages, and hospital fulfillment efficiencies. Renders real-time analytical dashboards and exports printable compliance reports for health authority audits.
    </p>
  </div>

  <p class="body-text">
    These eight modules interact cohesively through well-defined RESTful contracts, guaranteeing that no blood unit can bypass regulatory stages.
  </p>
</div>

<!-- PAGE 22 -->
<div class="page main-page" data-page="22">
  <h4 class="section-title">4.3 DATABASE SCHEMA &amp; ENTITY-RELATIONSHIP DESIGN</h4>
  <p class="body-text">
    The persistence architecture of HemoVault is structured around seven primary collections in MongoDB:
  </p>

  <div class="table-container">
    <p class="table-caption">Table 4.1: MongoDB Database Collections &amp; Schema Architecture Overview</p>
    <table class="data-table">
      <thead>
        <tr>
          <th>Collection</th>
          <th>Primary Key</th>
          <th>Foreign References</th>
          <th>Key Fields &amp; Data Types</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>users</strong></td>
          <td><code>_id (ObjectId)</code></td>
          <td>None</td>
          <td><code>name, email (unique), password (hash), role, phone, bloodGroup</code></td>
        </tr>
        <tr>
          <td><strong>donors</strong></td>
          <td><code>_id (ObjectId)</code></td>
          <td><code>user &rarr; users._id</code></td>
          <td><code>bloodGroup, dateOfBirth, gender, weightKg, hemoglobin, pulseRate, BP</code></td>
        </tr>
        <tr>
          <td><strong>appointments</strong></td>
          <td><code>_id (ObjectId)</code></td>
          <td><code>donor &rarr; donors._id</code></td>
          <td><code>appointmentDate, timeSlot, status, bloodBankLocation, notes</code></td>
        </tr>
        <tr>
          <td><strong>bloodunits</strong></td>
          <td><code>_id (ObjectId)</code></td>
          <td><code>donor, testRecord</code></td>
          <td><code>unitId (unique), bloodGroup, componentType, volumeMl, status, expiry</code></td>
        </tr>
        <tr>
          <td><strong>bloodtests</strong></td>
          <td><code>_id (ObjectId)</code></td>
          <td><code>bloodUnit &rarr; bloodunits</code></td>
          <td><code>hivTest, hbvTest, hcvTest, syphilisTest, malariaTest, overallResult</code></td>
        </tr>
        <tr>
          <td><strong>bloodrequests</strong></td>
          <td><code>_id (ObjectId)</code></td>
          <td><code>hospitalUser, allocatedUnits</code></td>
          <td><code>bloodGroup, componentType, units, urgencyLevel, requestStatus</code></td>
        </tr>
        <tr>
          <td><strong>transactions</strong></td>
          <td><code>_id (ObjectId)</code></td>
          <td><code>bloodUnit, performedBy</code></td>
          <td><code>transactionType, details, notes, timestamp</code></td>
        </tr>
      </tbody>
    </table>
  </div>

  <p class="body-text">
    Figure 4.2 illustrates the complete Entity-Relationship diagram, showcasing cardinality (1:1 and 1:N) and object references across all collections.
  </p>
</div>

<!-- PAGE 23 -->
<div class="page main-page" data-page="23">
  <div class="diagram-box">
    <p class="diagram-caption">Figure 4.2: Comprehensive Database Entity-Relationship (ER) Schema Diagram</p>
    <svg width="680" height="420" viewBox="0 0 680 420" xmlns="http://www.w3.org/2000/svg" style="display:block; margin: 0 auto; max-width: 100%;">
      <defs>
        <marker id="erArrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 8 5 L 0 9 z" fill="#047857"/>
        </marker>
      </defs>

      <!-- Users Entity -->
      <rect x="20" y="20" width="160" height="120" rx="4" fill="#f0fdf4" stroke="#047857" stroke-width="1.5"/>
      <rect x="20" y="20" width="160" height="24" fill="#047857"/>
      <text x="100" y="36" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#ffffff" text-anchor="middle">USERS</text>
      <text x="28" y="58" font-family="Consolas, monospace" font-size="9" fill="#0f172a">PK _id: ObjectId</text>
      <text x="28" y="72" font-family="Arial, sans-serif" font-size="9" fill="#334155">email: String (Unique)</text>
      <text x="28" y="86" font-family="Arial, sans-serif" font-size="9" fill="#334155">password: Hash</text>
      <text x="28" y="100" font-family="Arial, sans-serif" font-size="9" fill="#334155">role: admin|donor|hosp</text>
      <text x="28" y="114" font-family="Arial, sans-serif" font-size="9" fill="#334155">bloodGroup: String</text>

      <!-- Donors Entity -->
      <rect x="260" y="20" width="170" height="135" rx="4" fill="#eff6ff" stroke="#1e40af" stroke-width="1.5"/>
      <rect x="260" y="20" width="170" height="24" fill="#1e40af"/>
      <text x="345" y="36" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#ffffff" text-anchor="middle">DONORS</text>
      <text x="268" y="58" font-family="Consolas, monospace" font-size="9" fill="#0f172a">PK _id: ObjectId</text>
      <text x="268" y="72" font-family="Consolas, monospace" font-size="9" fill="#1e40af">FK user: ObjectId</text>
      <text x="268" y="86" font-family="Arial, sans-serif" font-size="9" fill="#334155">weightKg: Number</text>
      <text x="268" y="100" font-family="Arial, sans-serif" font-size="9" fill="#334155">hemoglobin: Number</text>
      <text x="268" y="114" font-family="Arial, sans-serif" font-size="9" fill="#334155">pulseRate: Number</text>
      <text x="268" y="128" font-family="Arial, sans-serif" font-size="9" fill="#334155">eligibilityStatus: Enum</text>

      <!-- Connect Users -> Donors -->
      <line x1="180" y1="80" x2="260" y2="80" stroke="#047857" stroke-width="1.5" marker-end="url(#erArrow)"/>
      <text x="215" y="74" font-family="Arial, sans-serif" font-size="8.5" fill="#047857">1 : 1</text>

      <!-- BloodUnits Entity -->
      <rect x="490" y="20" width="170" height="145" rx="4" fill="#fef2f2" stroke="#b91c1c" stroke-width="1.5"/>
      <rect x="490" y="20" width="170" height="24" fill="#b91c1c"/>
      <text x="575" y="36" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#ffffff" text-anchor="middle">BLOOD_UNITS</text>
      <text x="498" y="58" font-family="Consolas, monospace" font-size="9" fill="#0f172a">PK _id: ObjectId</text>
      <text x="498" y="72" font-family="Arial, sans-serif" font-size="9" fill="#334155">unitId: String (BLD-..)</text>
      <text x="498" y="86" font-family="Consolas, monospace" font-size="9" fill="#b91c1c">FK donor: ObjectId</text>
      <text x="498" y="100" font-family="Arial, sans-serif" font-size="9" fill="#334155">bloodGroup: Enum</text>
      <text x="498" y="114" font-family="Arial, sans-serif" font-size="9" fill="#334155">componentType: Enum</text>
      <text x="498" y="128" font-family="Arial, sans-serif" font-size="9" fill="#334155">status: Quarantined|Avail</text>
      <text x="498" y="142" font-family="Arial, sans-serif" font-size="9" fill="#334155">expiryDate: Date</text>

      <!-- Connect Donors -> BloodUnits -->
      <line x1="430" y1="80" x2="490" y2="80" stroke="#1e40af" stroke-width="1.5" marker-end="url(#erArrow)"/>
      <text x="455" y="74" font-family="Arial, sans-serif" font-size="8.5" fill="#1e40af">1 : N</text>

      <!-- BloodTests Entity -->
      <rect x="490" y="220" width="170" height="155" rx="4" fill="#fffbeb" stroke="#b45309" stroke-width="1.5"/>
      <rect x="490" y="220" width="170" height="24" fill="#b45309"/>
      <text x="575" y="236" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#ffffff" text-anchor="middle">BLOOD_TESTS</text>
      <text x="498" y="258" font-family="Consolas, monospace" font-size="9" fill="#0f172a">PK _id: ObjectId</text>
      <text x="498" y="272" font-family="Consolas, monospace" font-size="9" fill="#b45309">FK bloodUnit: ObjectId</text>
      <text x="498" y="286" font-family="Arial, sans-serif" font-size="9" fill="#334155">hivTest: Neg|Pos</text>
      <text x="498" y="300" font-family="Arial, sans-serif" font-size="9" fill="#334155">hbvTest, hcvTest: Neg|Pos</text>
      <text x="498" y="314" font-family="Arial, sans-serif" font-size="9" fill="#334155">syphilisTest: Neg|Pos</text>
      <text x="498" y="328" font-family="Arial, sans-serif" font-size="9" fill="#334155">malariaTest: Neg|Pos</text>
      <text x="498" y="342" font-family="Arial, sans-serif" font-size="9" fill="#334155">overallResult: Passed|Reac</text>

      <!-- Connect BloodUnits -> BloodTests -->
      <line x1="575" y1="165" x2="575" y2="220" stroke="#b91c1c" stroke-width="1.5" marker-end="url(#erArrow)"/>
      <text x="585" y="195" font-family="Arial, sans-serif" font-size="8.5" fill="#b91c1c">1 : 1</text>

      <!-- BloodRequests Entity -->
      <rect x="260" y="220" width="170" height="140" rx="4" fill="#faf5ff" stroke="#7c3aed" stroke-width="1.5"/>
      <rect x="260" y="220" width="170" height="24" fill="#7c3aed"/>
      <text x="345" y="236" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#ffffff" text-anchor="middle">BLOOD_REQUESTS</text>
      <text x="268" y="258" font-family="Consolas, monospace" font-size="9" fill="#0f172a">PK _id: ObjectId</text>
      <text x="268" y="272" font-family="Consolas, monospace" font-size="9" fill="#7c3aed">FK hospitalUser: ObjectId</text>
      <text x="268" y="286" font-family="Arial, sans-serif" font-size="9" fill="#334155">bloodGroup: Enum</text>
      <text x="268" y="300" font-family="Arial, sans-serif" font-size="9" fill="#334155">units: Number</text>
      <text x="268" y="314" font-family="Arial, sans-serif" font-size="9" fill="#334155">urgencyLevel: Normal|Crit</text>
      <text x="268" y="328" font-family="Arial, sans-serif" font-size="9" fill="#334155">requestStatus: Pending|Done</text>

      <!-- Connect BloodRequests -> BloodUnits -->
      <line x1="430" y1="280" x2="490" y2="100" stroke="#7c3aed" stroke-width="1.5" stroke-dasharray="3,3" marker-end="url(#erArrow)"/>
      <text x="440" y="180" font-family="Arial, sans-serif" font-size="8.5" fill="#7c3aed">Allocates N Units</text>

      <!-- Transactions Entity -->
      <rect x="20" y="220" width="160" height="120" rx="4" fill="#f8fafc" stroke="#475569" stroke-width="1.5"/>
      <rect x="20" y="220" width="160" height="24" fill="#475569"/>
      <text x="100" y="236" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#ffffff" text-anchor="middle">TRANSACTIONS</text>
      <text x="28" y="258" font-family="Consolas, monospace" font-size="9" fill="#0f172a">PK _id: ObjectId</text>
      <text x="28" y="272" font-family="Arial, sans-serif" font-size="9" fill="#334155">type: Collection|Dispatch</text>
      <text x="28" y="286" font-family="Consolas, monospace" font-size="9" fill="#475569">FK bloodUnit: ObjectId</text>
      <text x="28" y="300" font-family="Consolas, monospace" font-size="9" fill="#475569">FK performedBy: ObjectId</text>
      <text x="28" y="314" font-family="Arial, sans-serif" font-size="9" fill="#334155">timestamp: Date</text>
    </svg>
  </div>
</div>

<!-- PAGE 24 -->
<div class="page main-page" data-page="24">
  <h4 class="section-title">4.4 UML CLASS DIAGRAM</h4>
  <p class="body-text">
    The structural organization of the backend object domain is modeled via the Unified Modeling Language (UML) Class Diagram depicted in Figure 4.3. Each class encapsulates properties matching Mongoose schema fields, accompanied by public instance and static methods that execute domain business logic.
  </p>

  <p class="body-text">
    Key object relationships captured within the class architecture include:
  </p>

  <ul class="bullet-list">
    <li><strong>Composition between User and Donor:</strong> A Donor object holds an essential foreign key reference to its parent User authentication record, extending identity with clinical anthropometrics.</li>
    <li><strong>One-to-One Association between BloodUnit and BloodTest:</strong> Each physically drawn blood unit possesses exactly one diagnostic test manifest that controls its inventory eligibility.</li>
    <li><strong>Aggregation between BloodRequest and BloodUnit:</strong> When a hospital requisition is fulfilled, the BloodRequest object aggregates multiple BloodUnit primary keys within its <code>allocatedUnits</code> array.</li>
    <li><strong>Audit Association via Transaction:</strong> Immutable event logging where any lifecycle state alteration links the affected BloodUnit and acting User.</li>
  </ul>

  <div class="diagram-box">
    <p class="diagram-caption">Figure 4.3: UML Class Diagram Representing Core Domain Entities &amp; Operations</p>
    ${classDiagramSvg}
  </div>
</div>

<!-- PAGE 25 -->
<div class="page main-page" data-page="25">
  <h4 class="section-title">4.5 UML SEQUENCE DIAGRAMS</h4>
  <p class="body-text">
    To model the temporal execution flow and asynchronous message passing between client components, API controllers, and database models, two critical clinical scenarios are formalized as sequence diagrams.
  </p>

  <h5 style="font-size: 11pt; font-weight: bold; margin: 10px 0 4px 0;">4.5.1 Sequence Diagram: Emergency Blood Requisition &amp; Atomic Allocation</h5>
  <p class="body-text">
    Figure 4.4 details the execution sequence when an accredited hospital posts an emergency request:
  </p>

  <ol class="numbered-list">
    <li>The hospital user triggers <code>POST /api/requests</code> specifying blood group (e.g., O+), component, quantity (e.g., 2 units), and urgency (<code>CRITICAL</code>).</li>
    <li>The <code>requestController</code> inspects stock in <code>BloodUnit</code> matching <code>AVAILABLE</code> status and unexpired date.</li>
    <li>Matching units are retrieved in ascending order of <code>collectionDate</code> (FIFO algorithm).</li>
    <li>The controller atomically updates the unit statuses to <code>RESERVED</code> and records the allocation in <code>BloodRequest</code>.</li>
    <li>An audit transaction is appended to the <code>Transaction</code> ledger, and an HTTP 201 response is returned to the hospital interface.</li>
  </ol>

  <div class="diagram-box">
    <p class="diagram-caption">Figure 4.4: Sequence Diagram: Priority-Queue Emergency Requisition Workflow</p>
    ${sequenceEmergencySvg}
  </div>
</div>

<!-- PAGE 26 -->
<div class="page main-page" data-page="26">
  <h5 style="font-size: 11pt; font-weight: bold; margin: 10px 0 4px 0;">4.5.2 Sequence Diagram: Phlebotomy Intake &amp; Diagnostic Safety Screening</h5>
  <p class="body-text">
    Figure 4.5 illustrates the sequence from physical blood collection through five-marker screening to inventory release:
  </p>

  <ol class="numbered-list">
    <li>The phlebotomist records vitals and draw parameters, invoking <code>POST /api/inventory/collect</code>.</li>
    <li>A <code>BloodUnit</code> is created in <code>QUARANTINED</code> status, and a linked <code>BloodTest</code> record is initialized as <code>PENDING</code>.</li>
    <li>Pathology technicians conduct serological assays and submit results via <code>PUT /api/tests/:id</code>.</li>
    <li>The gatekeeper verifies that all 5 markers are <code>NEGATIVE</code>. Upon verification, the unit transitions to <code>AVAILABLE</code>, and the donor's eligibility timer resets for 90 days.</li>
  </ol>

  <div class="diagram-box">
    <p class="diagram-caption">Figure 4.5: Sequence Diagram: Blood Donation, Laboratory Screening, and Stock Ingestion</p>
    ${sequenceDonationSvg}
  </div>
</div>

<!-- PAGE 27 -->
<div class="page main-page" data-page="27">
  <h4 class="section-title">4.6 FINITE STATE MACHINE &amp; CLINICAL CROSS-MATCH MATRIX</h4>
  <p class="body-text">
    To prevent any undefined or hazardous biological states, the lifecycle of every unit of blood within HemoVault is strictly governed by a deterministic <strong>Finite State Machine (FSM)</strong>.
  </p>

  <div class="diagram-box">
    <p class="diagram-caption">Figure 4.6: Blood Unit Finite State Machine (FSM) Lifecycle Transition Model</p>
    <svg width="660" height="170" viewBox="0 0 660 170" xmlns="http://www.w3.org/2000/svg" style="display:block; margin: 0 auto; max-width: 100%;">
      <defs>
        <marker id="fsmArrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 8 5 L 0 9 z" fill="#1e3a8a"/>
        </marker>
        <marker id="fsmArrowRed" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 8 5 L 0 9 z" fill="#b91c1c"/>
        </marker>
      </defs>

      <!-- States -->
      <circle cx="40" cy="85" r="16" fill="#1e293b"/>
      <circle cx="40" cy="85" r="12" fill="#ffffff"/>
      <circle cx="40" cy="85" r="8" fill="#1e293b"/>

      <line x1="56" y1="85" x2="100" y2="85" stroke="#1e3a8a" stroke-width="1.5" marker-end="url(#fsmArrow)"/>
      
      <rect x="100" y="65" width="105" height="40" rx="6" fill="#fef3c7" stroke="#d97706" stroke-width="1.5"/>
      <text x="152" y="89" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#92400e" text-anchor="middle">QUARANTINED</text>

      <line x1="205" y1="85" x2="255" y2="85" stroke="#1e3a8a" stroke-width="1.5" marker-end="url(#fsmArrow)"/>
      <text x="230" y="78" font-family="Arial, sans-serif" font-size="8" fill="#475569" text-anchor="middle">All 5 Neg</text>

      <rect x="255" y="65" width="105" height="40" rx="6" fill="#dcfce7" stroke="#16a34a" stroke-width="1.5"/>
      <text x="307" y="89" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#166534" text-anchor="middle">AVAILABLE</text>

      <line x1="360" y1="85" x2="410" y2="85" stroke="#1e3a8a" stroke-width="1.5" marker-end="url(#fsmArrow)"/>
      <text x="385" y="78" font-family="Arial, sans-serif" font-size="8" fill="#475569" text-anchor="middle">Allocate</text>

      <rect x="410" y="65" width="100" height="40" rx="6" fill="#dbeafe" stroke="#2563eb" stroke-width="1.5"/>
      <text x="460" y="89" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#1e40af" text-anchor="middle">RESERVED</text>

      <line x1="510" y1="85" x2="560" y2="85" stroke="#1e3a8a" stroke-width="1.5" marker-end="url(#fsmArrow)"/>
      <text x="535" y="78" font-family="Arial, sans-serif" font-size="8" fill="#475569" text-anchor="middle">Dispatch</text>

      <rect x="560" y="65" width="85" height="40" rx="6" fill="#f1f5f9" stroke="#475569" stroke-width="1.5"/>
      <text x="602" y="89" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#334155" text-anchor="middle">ISSUED</text>

      <!-- Discard branch -->
      <line x1="152" y1="105" x2="152" y2="140" stroke="#b91c1c" stroke-width="1.5"/>
      <line x1="152" y1="140" x2="307" y2="140" stroke="#b91c1c" stroke-width="1.5"/>
      <line x1="307" y1="105" x2="307" y2="140" stroke="#b91c1c" stroke-width="1.5"/>
      <line x1="307" y1="140" x2="460" y2="140" stroke="#b91c1c" stroke-width="1.5"/>
      <line x1="460" y1="140" x2="460" y2="135" stroke="#b91c1c" stroke-width="1.5"/>

      <rect x="380" y="125" width="160" height="30" rx="4" fill="#fee2e2" stroke="#b91c1c" stroke-width="1.5"/>
      <text x="460" y="144" font-family="Arial, sans-serif" font-size="9" font-weight="bold" fill="#991b1b" text-anchor="middle">DISCARDED / BIOHAZARD</text>
      <text x="220" y="152" font-family="Arial, sans-serif" font-size="8" fill="#b91c1c">Reactive Test OR Expiry Date Passed</text>
    </svg>
  </div>

  <p class="body-text">
    Table 4.2 documents the clinical ABO/Rh compatibility rules embedded within HemoVault's emergency cross-matching search algorithms.
  </p>

  <div class="table-container">
    <p class="table-caption">Table 4.2: Red Blood Cell Compatibility &amp; Universal Donor/Recipient Rules</p>
    <table class="data-table">
      <thead>
        <tr>
          <th>Recipient Group</th>
          <th>Compatible Donor RBC Groups (Can Receive From)</th>
          <th>Clinical Status</th>
        </tr>
      </thead>
      <tbody>
        <tr><td><strong>O-</strong></td><td>O- only</td><td>Universal Donor (Erythrocytes)</td></tr>
        <tr><td><strong>O+</strong></td><td>O+, O-</td><td>Most Common Blood Group</td></tr>
        <tr><td><strong>A-</strong></td><td>A-, O-</td><td>Rh-Negative Restriction</td></tr>
        <tr><td><strong>A+</strong></td><td>A+, A-, O+, O-</td><td>Compatible with A and O</td></tr>
        <tr><td><strong>B-</strong></td><td>B-, O-</td><td>Rh-Negative Restriction</td></tr>
        <tr><td><strong>B+</strong></td><td>B+, B-, O+, O-</td><td>Compatible with B and O</td></tr>
        <tr><td><strong>AB-</strong></td><td>AB-, A-, B-, O-</td><td>Can receive all Rh-negative</td></tr>
        <tr><td><strong>AB+</strong></td><td>All 8 Blood Groups (A+, A-, B+, B-, AB+, AB-, O+, O-)</td><td>Universal Recipient</td></tr>
      </tbody>
    </table>
  </div>
</div>
`
};
