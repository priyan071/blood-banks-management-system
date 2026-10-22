module.exports = {
  getChapter1: () => `
<!-- PAGE 1 -->
<div class="page main-page" data-page="1">
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

  <p class="body-text">
    The acute biochemical fragility and disparate shelf-lives of these biological fractions impose stringent logistical constraints upon blood transfusion services (BTS). A modernized blood banking platform must operate not merely as a passive storage depot, but as a dynamic, high-velocity supply chain orchestrator. It must seamlessly harmonize donor recruitment campaigns, rigorous pre-donation clinical screening, precision phlebotomy collection, mandatory viral marker diagnostics, cold-chain regulatory compliance, and time-critical hospital requisition dispatch.
  </p>
</div>

<!-- PAGE 2 -->
<div class="page main-page" data-page="2">
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
        <tr>
          <td><strong>Whole Blood</strong></td>
          <td>CPDA-1</td>
          <td>2°C to 6°C</td>
          <td>35 Days</td>
          <td>Exchange transfusion, severe military trauma</td>
        </tr>
        <tr>
          <td><strong>Packed Red Cells (PRBC)</strong></td>
          <td>SAGM Additive</td>
          <td>2°C to 6°C</td>
          <td>42 Days</td>
          <td>Chronic severe anemia, surgical hemorrhage</td>
        </tr>
        <tr>
          <td><strong>Platelet Concentrate</strong></td>
          <td>Autologous Plasma</td>
          <td>20°C to 24°C (Agitated)</td>
          <td>5 Days</td>
          <td>Dengue thrombocytopenia, leukemia therapy</td>
        </tr>
        <tr>
          <td><strong>Fresh Frozen Plasma</strong></td>
          <td>Citrate Phosphate</td>
          <td>&le; -18°C</td>
          <td>365 Days</td>
          <td>Multiple coagulation factor deficiencies, DIC</td>
        </tr>
        <tr>
          <td><strong>Cryoprecipitate</strong></td>
          <td>Cryo-supernatant</td>
          <td>&le; -18°C</td>
          <td>365 Days</td>
          <td>Hemophilia A, von Willebrand, fibrinogen deficiency</td>
        </tr>
      </tbody>
    </table>
  </div>

  <p class="body-text">
    Managing this multifaceted biological inventory requires extreme precision. The coexistence of eight discrete blood groups across the ABO and Rhesus systems (A+, A-, B+, B-, AB+, AB-, O+, O-) multiplied across four major component fractions creates 32 distinct stock keeping units (SKUs), each requiring independent expiration tracking, temperature monitoring, and clinical compatibility cross-matching. Conventional manual tracking methods fail to manage this multidimensional complexity, directly jeopardizing patient care.
  </p>
</div>

<!-- PAGE 3 -->
<div class="page main-page" data-page="3">
  <h4 class="section-title">1.2 PROBLEM DEFINITION</h4>
  <p class="body-text">
    A comprehensive empirical evaluation of blood bank operations across government and municipal tertiary hospitals reveals that a substantial majority still rely on manual paper registers, disjointed legacy desktop spreadsheets, or localized non-networked software utilities. This fragmented operational posture engenders severe institutional vulnerabilities:
  </p>

  <ol class="numbered-list">
    <li>
      <strong>Information Asymmetry &amp; Opaque Inventory Visibility:</strong> Requisitioning hospitals, emergency casualty triage units, and intensive care physicians possess zero real-time visibility into the current blood stock balances of regional blood centers. When a patient arrives in hemorrhagic shock, attending doctors must assign medical orderlies or anxious family members to place frantic telephonic inquiries across multiple blood banks, squandering critical "golden hour" minutes while attempting to ascertain whether compatible units exist in storage.
    </li>
    <li>
      <strong>Catastrophic Stock Outdating &amp; Preventable Wastage:</strong> In the absence of automated Time-to-Live (TTL) surveillance and algorithmic First-In-First-Out (FIFO) stock rotation, blood units frequently migrate to the back of cold-storage shelves. Consequently, older units silently cross their 35-day or 5-day expiration thresholds unutilized, even while simultaneous localized shortages force cancellation of elective surgeries.
    </li>
    <li>
      <strong>Human Transcription Error in Diagnostic Safety Screening:</strong> Every unit of donated blood must undergo rigorous biological safety screening for Transfusion-Transmitted Infections (TTIs)—specifically HIV, Hepatitis B (HBsAg), Hepatitis C (HCV), Syphilis (VDRL), and Malaria. In paper-based systems, laboratory test results are manually hand-copied between diagnostic workbooks and physical blood bag labels. A single clerical transcription oversight or illegible handwriting slip can permit an infectious unit to be released into clinical circulation, triggering catastrophic iatrogenic infection.
    </li>
    <li>
      <strong>Absence of Standardized Clinical Eligibility Triage:</strong> Voluntary donors frequently arrive at collection camps without understanding medical exclusion criteria. Manual verbal interrogation by phlebotomists is non-standardized, leading to either inappropriate collections from anemic donors or wrongful rejection of willing volunteers due to subjective vital sign interpretations.
    </li>
    <li>
      <strong>Vulnerability to Data Tampering and Non-Traceability:</strong> Physical paper logbooks are inherently vulnerable to unauthorized physical tampering, accidental spillage, loss, and post-facto ledger fabrication. In legal medico-legal inquiries, establishing an unbroken chain of custody from donor vein to recipient arm becomes virtually impossible.
    </li>
  </ol>
</div>

<!-- PAGE 4 -->
<div class="page main-page" data-page="4">
  <h4 class="section-title">1.3 PROJECT OBJECTIVES</h4>
  <p class="body-text">
    The central aim of the <strong>HemoVault</strong> research and engineering project is to design, implement, and validate a secure, centralized, and cloud-ready full-stack blood banking management platform built upon the high-throughput <strong>MERN (MongoDB, Express.js, React.js, Node.js)</strong> stack. The core measurable engineering objectives comprise:
  </p>

  <div class="objective-card">
    <h5 style="color: #991b1b; font-size: 11pt; margin-bottom: 5px;">Objective 1: Centralized Real-Time Inventory Orchestration</h5>
    <p class="body-text" style="margin: 0; font-size: 10.5pt;">
      Construct a reactive web application that aggregates real-time inventory levels across all 8 ABO/Rh blood groups and 4 component fractions. Provide administrators with an interactive live matrix featuring automated visual threshold indicators (Surplus, Optimal, Low, Critical Deficit).
    </p>
  </div>

  <div class="objective-card">
    <h5 style="color: #991b1b; font-size: 11pt; margin-bottom: 5px;">Objective 2: Algorithmic Donor Eligibility Screening Engine</h5>
    <p class="body-text" style="margin: 0; font-size: 10.5pt;">
      Formulate and embed a deterministic mathematical eligibility algorithm that evaluates prospective donor age (&ge; 18 and &le; 65 years), body weight (&ge; 45 kg for females, &ge; 50 kg for males), hemoglobin concentration (&ge; 12.5 g/dL), resting pulse rate (60–100 bpm), systolic/diastolic blood pressure (100–140 / 60–90 mmHg), and inter-donation latency (&ge; 90 days for whole blood) prior to appointment booking.
    </p>
  </div>

  <div class="objective-card">
    <h5 style="color: #991b1b; font-size: 11pt; margin-bottom: 5px;">Objective 3: Cryptographically Enforced Laboratory Safety Gatekeeper</h5>
    <p class="body-text" style="margin: 0; font-size: 10.5pt;">
      Engineer a two-stage digital verification pipeline wherein all freshly phlebotomized units are tagged with a status of <code>QUARANTINED</code>. Prevent any transition to <code>AVAILABLE</code> status until diagnostic serological results for HIV, HBV, HCV, Syphilis, and Malaria are recorded as explicitly <code>NEGATIVE</code>. Units exhibiting reactivity must be automatically locked into <code>BIOHAZARD_DISPOSAL</code> status.
    </p>
  </div>

  <div class="objective-card">
    <h5 style="color: #991b1b; font-size: 11pt; margin-bottom: 5px;">Objective 4: Priority-Queue Emergency Hospital Requisition System</h5>
    <p class="body-text" style="margin: 0; font-size: 10.5pt;">
      Develop a dedicated hospital portal allowing accredited healthcare institutions to submit categorized blood requisitions with triage priority tags (<code>NORMAL</code>, <code>URGENT</code>, <code>CRITICAL</code>), coupled with an atomic First-In-First-Out (FIFO) unit allocation routine that prevents race conditions and negative inventory anomalies.
    </p>
  </div>

  <div class="objective-card">
    <h5 style="color: #991b1b; font-size: 11pt; margin-bottom: 5px;">Objective 5: End-to-End Cryptographic Auditability &amp; Traceability</h5>
    <p class="body-text" style="margin: 0; font-size: 10.5pt;">
      Implement an immutable transaction ledger using MongoDB sub-document logging that timestamps every state transition (Collection, Quarantine, Testing, Allocation, Dispatch, and Disposal) paired with authenticated administrative operator credentials.
    </p>
  </div>
</div>

<!-- PAGE 5 -->
<div class="page main-page" data-page="5">
  <h4 class="section-title">1.4 SCOPE OF THE PROJECT</h4>
  <p class="body-text">
    The architectural and operational scope of <strong>HemoVault</strong> encompasses the entire spectrum of blood transfusion operations within a regional healthcare network:
  </p>

  <h5 style="font-size: 11pt; font-weight: bold; margin: 12px 0 6px 0;">1.4.1 In-Scope Capabilities:</h5>
  <ul class="bullet-list">
    <li><strong>Multi-Role Role-Based Access Control (RBAC):</strong> Discrete authentication interfaces and permission boundaries for Administrators (Medical Officers &amp; Transfusion Specialists), Voluntary Blood Donors, and Institutional Hospital Requesters.</li>
    <li><strong>Donor Lifecycle Management:</strong> Digital registration, personal donation milestone tracking, digital donor identification card issuance, downloadable blood donation certificates, and appointment booking with interactive time-slot reservation.</li>
    <li><strong>Phlebotomy &amp; Component Fractionation:</strong> Dynamic serial number generation conforming to standard formats (<code>BLD-YYYY-XXXX</code>), recording volume in milliliters, extraction date, and target component types.</li>
    <li><strong>Automated Expiration &amp; Quarantine Watchdog:</strong> Background cron/event-driven monitors that sweep database records and transition expired units from <code>AVAILABLE</code> to <code>EXPIRED</code> status, preventing inadvertent clinical issue.</li>
    <li><strong>Interactive Statistical Reporting:</strong> Executive analytical dashboards presenting tabular metrics, donation group distribution percentages, component utilization trends, and printable statutory compliance reports.</li>
    <li><strong>Zero-Setup Embedded Database Architecture:</strong> High-reliability fallback mechanism that automatically instantiates an in-memory embedded MongoDB instance if an external database server is unreachable, guaranteeing seamless portability for academic evaluations.</li>
  </ul>

  <h5 style="font-size: 11pt; font-weight: bold; margin: 12px 0 6px 0;">1.4.2 Out-of-Scope / Demarcations:</h5>
  <p class="body-text">
    Physical hardware interfacing with automated automated enzyme-linked immunosorbent assay (ELISA) diagnostic analyzers, direct IoT cold-chain temperature telemetry sensors, and automated drone delivery navigation are delineated as architectural future enhancements.
  </p>
</div>

<!-- PAGE 6 -->
<div class="page main-page" data-page="6">
  <h4 class="section-title">1.5 MOTIVATION</h4>
  <p class="body-text">
    The imperative to build HemoVault stems directly from the United Nations Sustainable Development Goal 3 (SDG-3): <em>"Ensure healthy lives and promote well-being for all at all ages."</em> In developing nations, severe postpartum hemorrhage remains the single leading cause of maternal mortality, accounting for over 27% of maternal deaths worldwide. A mother suffering from profound uterine atony can bleed to death in less than two hours unless packed red blood cells and fresh frozen plasma are immediately infused. In clinical trauma surgery, every minute of delay in transfusing uncrossmatched or compatible blood to a victim of a motor vehicle collision increases relative mortality risk by approximately 5% per ten-minute increment.
  </p>

  <p class="body-text">
    Simultaneously, voluntary blood donors are frequently demotivated by bureaucratic inefficiency, lack of feedback regarding their donation utility, and absence of standardized digital credentials. By empowering donors with a modern, transparent digital experience—encompassing self-assessment calculators, digital donor cards, and transparent donation histories—HemoVault systematically elevates repeat donor retention rates.
  </p>

  <div class="highlight-quote">
    “The digitization of transfusion logistics is not merely an exercise in enterprise software modernization; it represents an urgent humanitarian intervention that directly bridges the gap between biological supply and mortal clinical demand.”
  </div>

  <p class="body-text">
    From an engineering perspective, modern web technologies—specifically the asynchronous, non-blocking I/O paradigm of Node.js, the schema flexibility of MongoDB, and the reactive component virtualization of React 18—offer unprecedented opportunities to engineer distributed medical platforms that are lightning-fast, fault-tolerant, and exceptionally intuitive to operate. HemoVault bridges this intersection of healthcare and software engineering, establishing an enterprise-grade reference architecture for centralized transfusion management.
  </p>
</div>
`
};
