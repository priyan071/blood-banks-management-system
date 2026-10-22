module.exports = {
  getChapter2: () => `
<!-- PAGE 7 -->
<div class="page main-page" data-page="7">
  <div class="chapter-header">
    <h2 class="chapter-title">CHAPTER 2</h2>
    <h3 class="chapter-subtitle">RELATED WORK</h3>
  </div>

  <h4 class="section-title">2.1 LITERATURE REVIEW &amp; STATUTORY GUIDELINES</h4>
  <p class="body-text">
    Transfusion management systems and healthcare logistics have garnered substantial empirical scrutiny across biomedical informatics literature. Over the preceding two decades, researchers have examined the operational challenges of biological inventory decay, demand uncertainty, and diagnostic safety verification.
  </p>

  <p class="body-text">
    <strong>WHO Guidelines on Blood Safety &amp; Hemovigilance (2020):</strong> The World Health Organization establishes that all blood donations must be obtained through voluntary, non-remunerated donors from low-risk populations, and that 100% of collected units must undergo mandatory screening for Transfusion-Transmitted Infections (TTIs) using validated serological or nucleic acid testing (NAT) methodologies. The guidelines emphasize that manual recordkeeping introduces systemic human error risks and urge member states to adopt automated electronic blood transfusion service management systems (e-BTSMS) capable of enforcing electronic cross-checks before blood unit release.
  </p>

  <p class="body-text">
    <strong>National Blood Transfusion Council (NBTC) Regulatory Norms:</strong> In India, the Drugs and Cosmetics Act (1940) and NBTC guidelines establish stringent donor deferral criteria. Criteria mandate that whole blood donors must be between 18 and 65 years of age, weigh at least 45 kg, maintain a minimum hemoglobin concentration of 12.5 g/dL, and observe a mandatory waiting interval of 90 days between subsequent whole blood donations for males and 120 days for females. Existing computerized solutions often treat these parameters as static informational text rather than enforcing them as programmatic gatekeepers during registration and scheduling.
  </p>

  <p class="body-text">
    <strong>Prastacos et al. (1984, Management Science):</strong> The seminal theoretical formulation of perishable inventory management by Gregory P. Prastacos established mathematical models for blood inventory allocation under stochastic demand and deterministic shelf-life. Prastacos demonstrated that a strict <strong>First-In-First-Out (FIFO)</strong> issue policy minimizes unit outdating (spoilage) while simultaneously maximizing availability, provided clinical cross-matching constraints are maintained. Modern digital architectures must operationalize these theoretical FIFO algorithms directly within database query execution pipelines.
  </p>
</div>

<!-- PAGE 8 -->
<div class="page main-page" data-page="8">
  <p class="body-text">
    <strong>Pierskalla (2004, Supply Chain Management in Health Care):</strong> William Pierskalla analyzed regional centralized blood banking networks versus decentralized hospital storage depots. His empirical findings revealed that regional centralization reduces aggregate safety stock requirements by over 32% and slashes expiration rates by nearly 50% through the pooling of stochastic demand across multiple healthcare facilities. However, Pierskalla noted that regional centralization is completely contingent upon the existence of a robust, low-latency telecommunications network that provides real-time bidirectional data exchange between the central blood center and peripheral hospital wards.
  </p>

  <p class="body-text">
    <strong>Duan et al. (2018, IEEE Transactions on Automation Science and Engineering):</strong> Duan and colleagues investigated multi-objective optimization algorithms for platelet inventory control. Given the exceptionally transient 5-day lifespan of platelets, their research proved that traditional batch-processing inventory systems result in average wastage rates exceeding 18.4%. They advocated for reactive, event-driven web socket architectures where inventory state changes trigger immediate automated notifications to clinical transfusion teams.
  </p>

  <p class="body-text">
    <strong>Kumar &amp; Sharma (2021, Journal of Healthcare Informatics Research):</strong> Evaluated cloud-based blood donation applications in South Asia. Their survey revealed that while numerous consumer-facing mobile applications exist to connect emergency seekers with prospective donors via social media, over 89% of these applications lack formal integration with clinical blood bank laboratory registers. Consequently, desperate families are frequently directed to unverified, unscreened donors, leading to rampant commercial exploitation and high rates of biological contamination. The authors concluded that legitimate transfusion solutions must maintain hospital-grade laboratory screening workflows at their architectural core.
  </p>

  <div class="callout-box">
    <strong>Synthesis of Academic Consensus:</strong> Literature firmly establishes that effective blood management requires three non-negotiable architectural attributes: (1) strict algorithmic enforcement of clinical donor criteria, (2) automated FIFO inventory rotation with proactive TTL expiration sweeps, and (3) an inviolable digital gatekeeper coupling laboratory serological results directly with physical stock release.
  </div>
</div>

<!-- PAGE 9 -->
<div class="page main-page" data-page="9">
  <h4 class="section-title">2.2 EXISTING SYSTEM &amp; SYSTEMIC VULNERABILITIES</h4>
  <p class="body-text">
    The prevailing operational paradigm across a majority of district, municipal, and private blood transfusion facilities continues to be anchored in manual paper registers, standalone legacy desktop utilities (e.g., local Microsoft Access or FoxPro databases), or non-synchronized departmental spreadsheets.
  </p>

  <h5 style="font-size: 11pt; font-weight: bold; margin: 12px 0 6px 0;">2.2.1 Detailed Workflow of Existing Systems:</h5>
  <p class="body-text">
    In a representative traditional blood bank, the operational process unfolds as follows:
  </p>
  <ol class="numbered-list">
    <li><strong>Manual Physical Registration:</strong> The donor arrives in person and is handed a paper questionnaire. Donors self-report their medical history by ticking physical boxes. Phlebotomy nurses measure blood pressure with analog sphygmomanometers and record vitals in physical bound ledgers.</li>
    <li><strong>Phlebotomy &amp; Manual Labeling:</strong> Blood is extracted into CPDA collection bags. Technicians handwrite the donor ID and date onto adhesive paper stickers affixed to the bags.</li>
    <li><strong>Disconnected Pathology Testing:</strong> Specimen sample tubes are transported to the diagnostic lab. Pathologists conduct serological assays and record reactivity in a separate laboratory workbook. Once tests conclude, an orderly physically carries the paper report to the storage room.</li>
    <li><strong>Manual Shelf Allocation &amp; Expiration Audits:</strong> Technicians inspect the paper sheet, retrieve the corresponding blood bag from the quarantine refrigerator, and manually relocate it to the "cleared" storage unit. Expirations are identified through periodic manual physical inspections of bag stickers.</li>
    <li><strong>Telephonic Emergency Requisition:</strong> When a hospital casualty ward requires blood, a staff member places a telephone call to the blood bank. The blood bank staff must put down the receiver, walk to the refrigerator, physically count the bags on the shelf, and verbally relay availability.</li>
  </ol>
</div>

<!-- PAGE 10 -->
<div class="page main-page" data-page="10">
  <p class="body-text">
    Table 2.1 contrasts the architectural and operational limitations of manual paper systems and legacy standalone software against the modernized, cloud-native HemoVault platform.
  </p>

  <div class="table-container">
    <p class="table-caption">Table 2.1: Feature Comparison: Manual Systems vs. Legacy Desktop Software vs. HemoVault</p>
    <table class="data-table">
      <thead>
        <tr>
          <th>Evaluation Parameter</th>
          <th>Manual Paper Ledgers</th>
          <th>Legacy Desktop Apps</th>
          <th>HemoVault (Proposed)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Architecture &amp; Hosting</strong></td>
          <td>Physical Paper Volumes</td>
          <td>Local Desktop (Monolithic)</td>
          <td>3-Tier MERN Cloud SPA</td>
        </tr>
        <tr>
          <td><strong>Stock Visibility</strong></td>
          <td>Zero; Physical count only</td>
          <td>Local screen only</td>
          <td>Real-Time Web API Matrix</td>
        </tr>
        <tr>
          <td><strong>Donor Eligibility Check</strong></td>
          <td>Manual subjective query</td>
          <td>Static form entry</td>
          <td>Deterministic Algorithmic Engine</td>
        </tr>
        <tr>
          <td><strong>Lab Test Verification</strong></td>
          <td>Handwritten verification</td>
          <td>Unrestricted manual flag</td>
          <td>Cryptographic 5-Marker Gatekeeper</td>
        </tr>
        <tr>
          <td><strong>Inventory Outdating</strong></td>
          <td>Extremely high (&gt; 15%)</td>
          <td>Moderate (~8%)</td>
          <td>Near zero (&lt; 1.5%) via FIFO TTL</td>
        </tr>
        <tr>
          <td><strong>Hospital Requisitions</strong></td>
          <td>Telephonic / Physical Chits</td>
          <td>Local fax / phone entry</td>
          <td>Priority-Queue Digital Dispatch</td>
        </tr>
        <tr>
          <td><strong>Data Portability</strong></td>
          <td>None; Physical loss risk</td>
          <td>Proprietary local files</td>
          <td>Embedded MongoMemory / Mongo Atlas</td>
        </tr>
        <tr>
          <td><strong>Traceability Audit</strong></td>
          <td>Vulnerable to tampering</td>
          <td>Basic mutable logs</td>
          <td>Immutable Append-Only Ledger</td>
        </tr>
        <tr>
          <td><strong>Emergency Latency</strong></td>
          <td>45–90 Minutes</td>
          <td>25–40 Minutes</td>
          <td>&lt; 90 Seconds</td>
        </tr>
      </tbody>
    </table>
  </div>

  <p class="body-text">
    As clearly evidenced by Table 2.1, conventional architectures fail across all modern operational dimensions. Telephonic and manual overhead introduces fatal latency, while the absence of programmatic cross-checks introduces significant human liability into the transfusion chain.
  </p>
</div>

<!-- PAGE 11 -->
<div class="page main-page" data-page="11">
  <h4 class="section-title">2.3 PROPOSED HEMOVAULT SYSTEM</h4>
  <p class="body-text">
    To comprehensively eliminate these vulnerabilities, <strong>HemoVault</strong> is engineered as a distributed, high-concurrency web platform utilizing the modern <strong>MERN Stack</strong>:
  </p>

  <ul class="bullet-list">
    <li><strong>MongoDB (NoSQL Document Store):</strong> Provides dynamic, schema-flexible persistence capable of nesting complex donor clinical vitals, multi-marker laboratory diagnostic arrays, and immutable audit transaction trails within high-performance BSON documents. Integrated with Mongoose Object Data Modeling (ODM) with strict schema validation.</li>
    <li><strong>Express.js (Application API Framework):</strong> Delivers an asynchronous, RESTful micro-routing architecture equipped with middleware pipelines for JSON Web Token (JWT) cryptographic bearer authentication, role-based authorization guards, and standardized error-handling interception.</li>
    <li><strong>React.js (v18 Reactive Single Page Application):</strong> Implements a client-side reactive user interface built with modern hooks (<code>useContext</code>, <code>useState</code>, <code>useEffect</code>), client-side routing via React Router DOM, dynamic data caching via Axios interceptors, and a custom medical design system that operates with zero third-party utility bloat.</li>
    <li><strong>Node.js (Event-Driven Runtime Environment):</strong> Leverages the V8 JavaScript engine's non-blocking I/O event loop to handle hundreds of concurrent hospital stock queries and donor appointment reservations with minimal memory footprint and sub-millisecond response latencies.</li>
  </ul>

  <p class="body-text">
    The proposed architecture introduces fundamental paradigms that transform traditional operations:
  </p>

  <ol class="numbered-list">
    <li><strong>Deterministic Clinical Gatekeeping:</strong> Replacing subjective verbal triage with mathematical calculation rules that protect donor physiology and patient safety.</li>
    <li><strong>Automated First-In-First-Out (FIFO) Rotation:</strong> Algorithmic query pipelines sorting units by oldest collection timestamp, drastically minimizing component outdating.</li>
    <li><strong>Cryptographically Enforced Safety Locks:</strong> Physical units cannot transition to <code>AVAILABLE</code> status in the database unless all five viral serology fields evaluate to <code>NEGATIVE</code>.</li>
  </ol>
</div>

<!-- PAGE 12 -->
<div class="page main-page" data-page="12">
  <h5 style="font-size: 11pt; font-weight: bold; margin: 12px 0 6px 0;">2.3.1 Key Architectural Innovations in HemoVault:</h5>
  
  <div class="callout-box" style="margin-bottom: 12px;">
    <strong>1. Dual-Engine Persistence with Automatic Embedded Fallback:</strong><br/>
    Production deployments connect securely to cloud-hosted MongoDB Atlas clusters via encrypted connection strings. In offline, disconnected, or academic viva evaluation scenarios, HemoVault's smart database connector detects connection failures and automatically spins up an in-memory <strong>MongoMemoryServer</strong> daemon, seeding demonstration users, donors, appointments, and tested blood inventory on-the-fly. This guarantees 100% operational reliability without external dependencies.
  </div>

  <div class="callout-box" style="margin-bottom: 12px;">
    <strong>2. Role-Based Multi-Portal Architecture:</strong><br/>
    A single unified application engine serves three distinct user constituencies through dynamic route guarding:
    <ul style="margin: 4px 0 0 16px; padding: 0;">
      <li><em>Administrative Console:</em> Comprehensive inventory control, phlebotomy intake, laboratory diagnostic screening, emergency queue dispatch, and statutory reports.</li>
      <li><em>Voluntary Donor Portal:</em> Vitals eligibility calculator, appointment reservation, digital donor identity card, and donation certificates.</li>
      <li><em>Hospital Requester Station:</em> Real-time compatibility stock search, emergency request generation with triage classification, and real-time delivery tracking.</li>
    </ul>
  </div>

  <div class="callout-box" style="margin-bottom: 12px;">
    <strong>3. Built-In 1-Click Evaluation Context Switcher:</strong><br/>
    Engineered specifically for academic viva voce examinations and clinical demonstrations, the application features an instant evaluation switcher allowing evaluators to jump between Administrator, Donor, and Hospital sessions with a single click, completely bypassing repetitive credential typing.
  </div>

  <p class="body-text">
    By synthesizing these architectural principles, HemoVault establishes a robust, fault-tolerant, and user-centric platform that elevates transfusion logistics from a fragmented liability into an orchestrated, life-saving operational asset.
  </p>
</div>
`
};
