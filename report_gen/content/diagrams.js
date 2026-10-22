module.exports = {
  collegeLogoSvg: `
<svg width="120" height="120" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg" style="display:block; margin:0 auto;">
  <circle cx="80" cy="80" r="76" fill="#ffffff" stroke="#047857" stroke-width="6"/>
  <circle cx="80" cy="80" r="66" fill="#f0fdf4" stroke="#d97706" stroke-width="2"/>
  <!-- Top arc text -->
  <path id="arcTop" d="M 22,80 A 58,58 0 0,1 138,80" fill="none" stroke="none" />
  <text font-family="'Times New Roman', serif" font-size="10" font-weight="bold" fill="#065f46" text-anchor="middle">
    <textPath href="#arcTop" startOffset="50%">EASWARI ENGINEERING COLLEGE</textPath>
  </text>
  <!-- Bottom arc text -->
  <path id="arcBottom" d="M 138,80 A 58,58 0 0,1 22,80" fill="none" stroke="none" />
  <text font-family="'Times New Roman', serif" font-size="9" font-weight="bold" fill="#065f46" text-anchor="middle">
    <textPath href="#arcBottom" startOffset="50%">EDUCATE AND EXCEL</textPath>
  </text>
  <!-- Center emblem -->
  <rect x="52" y="50" width="56" height="56" rx="10" fill="#047857" stroke="#fbbf24" stroke-width="2" />
  <!-- Lamp / SRM symbol representation -->
  <path d="M 64,88 L 96,88 L 90,98 L 70,98 Z" fill="#fef08a" stroke="#d97706" stroke-width="1.5"/>
  <path d="M 80,60 C 74,68 76,74 80,78 C 84,74 86,68 80,60 Z" fill="#ef4444" stroke="#dc2626" stroke-width="1"/>
  <circle cx="80" cy="72" r="3" fill="#fde047" />
  <rect x="58" y="78" width="44" height="6" rx="2" fill="#ffffff" />
  <text x="80" y="83" font-family="'Times New Roman', serif" font-size="6" font-weight="bold" fill="#047857" text-anchor="middle">EEC</text>
  <!-- Autonomous banner -->
  <rect x="42" y="112" width="76" height="16" rx="4" fill="#065f46" stroke="#fbbf24" stroke-width="1"/>
  <text x="80" y="123" font-family="'Times New Roman', serif" font-size="7.5" font-weight="bold" fill="#ffffff" text-anchor="middle">AUTONOMOUS</text>
</svg>
`,

  architectureSvg: `
<svg width="700" height="420" viewBox="0 0 700 420" xmlns="http://www.w3.org/2000/svg" style="display:block; margin: 15px auto; max-width: 100%;">
  <defs>
    <linearGradient id="gradClient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#eff6ff"/><stop offset="100%" stop-color="#dbeafe"/>
    </linearGradient>
    <linearGradient id="gradApi" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef2f2"/><stop offset="100%" stop-color="#fee2e2"/>
    </linearGradient>
    <linearGradient id="gradService" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f0fdf4"/><stop offset="100%" stop-color="#dcfce7"/>
    </linearGradient>
    <linearGradient id="gradDb" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#faf5ff"/><stop offset="100%" stop-color="#f3e8ff"/>
    </linearGradient>
    <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 8 5 L 0 9 z" fill="#374151"/>
    </marker>
  </defs>

  <!-- Presentation Layer -->
  <rect x="20" y="20" width="660" height="85" rx="8" fill="url(#gradClient)" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="35" y="42" font-family="'Times New Roman', serif" font-size="14" font-weight="bold" fill="#1e40af">PRESENTATION LAYER (React 18 + Vite SPA)</text>
  <rect x="35" y="52" width="135" height="40" rx="6" fill="#ffffff" stroke="#93c5fd"/>
  <text x="102" y="70" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#1e3a8a" text-anchor="middle">Admin Dashboard</text>
  <text x="102" y="84" font-family="Arial, sans-serif" font-size="9" fill="#475569" text-anchor="middle">Stock & Diagnostics</text>

  <rect x="185" y="52" width="135" height="40" rx="6" fill="#ffffff" stroke="#93c5fd"/>
  <text x="252" y="70" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#1e3a8a" text-anchor="middle">Donor Portal</text>
  <text x="252" y="84" font-family="Arial, sans-serif" font-size="9" fill="#475569" text-anchor="middle">Vitals & Appointments</text>

  <rect x="335" y="52" width="145" height="40" rx="6" fill="#ffffff" stroke="#93c5fd"/>
  <text x="407" y="70" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#1e3a8a" text-anchor="middle">Hospital Portal</text>
  <text x="407" y="84" font-family="Arial, sans-serif" font-size="9" fill="#475569" text-anchor="middle">Emergency Requisitions</text>

  <rect x="495" y="52" width="170" height="40" rx="6" fill="#ffffff" stroke="#93c5fd"/>
  <text x="580" y="70" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#1e3a8a" text-anchor="middle">Shared UI & Axios Client</text>
  <text x="580" y="84" font-family="Arial, sans-serif" font-size="9" fill="#475569" text-anchor="middle">JWT Interceptor & Guards</text>

  <!-- Connectors 1 -->
  <line x1="350" y1="105" x2="350" y2="135" stroke="#374151" stroke-width="2" marker-end="url(#arrow)"/>
  <text x="360" y="124" font-family="Arial, sans-serif" font-size="10" fill="#4b5563">HTTPS / JSON REST Calls</text>

  <!-- API Gateway & Middleware -->
  <rect x="20" y="135" width="660" height="75" rx="8" fill="url(#gradApi)" stroke="#ef4444" stroke-width="1.5"/>
  <text x="35" y="157" font-family="'Times New Roman', serif" font-size="14" font-weight="bold" fill="#991b1b">API GATEWAY & MIDDLEWARE LAYER (Node.js & Express 4)</text>
  
  <rect x="35" y="165" width="145" height="35" rx="5" fill="#ffffff" stroke="#fca5a5"/>
  <text x="107" y="186" font-family="Arial, sans-serif" font-size="10.5" font-weight="bold" fill="#7f1d1d" text-anchor="middle">CORS & Security Headers</text>

  <rect x="195" y="165" width="145" height="35" rx="5" fill="#ffffff" stroke="#fca5a5"/>
  <text x="267" y="186" font-family="Arial, sans-serif" font-size="10.5" font-weight="bold" fill="#7f1d1d" text-anchor="middle">JWT Auth Protection</text>

  <rect x="355" y="165" width="150" height="35" rx="5" fill="#ffffff" stroke="#fca5a5"/>
  <text x="430" y="186" font-family="Arial, sans-serif" font-size="10.5" font-weight="bold" fill="#7f1d1d" text-anchor="middle">Role-Based Access (RBAC)</text>

  <rect x="520" y="165" width="145" height="35" rx="5" fill="#ffffff" stroke="#fca5a5"/>
  <text x="592" y="186" font-family="Arial, sans-serif" font-size="10.5" font-weight="bold" fill="#7f1d1d" text-anchor="middle">Global Error Handler</text>

  <!-- Connectors 2 -->
  <line x1="350" y1="210" x2="350" y2="240" stroke="#374151" stroke-width="2" marker-end="url(#arrow)"/>
  <text x="360" y="228" font-family="Arial, sans-serif" font-size="10" fill="#4b5563">Dispatched Controllers</text>

  <!-- Application Logic Layer -->
  <rect x="20" y="240" width="660" height="85" rx="8" fill="url(#gradService)" stroke="#10b981" stroke-width="1.5"/>
  <text x="35" y="262" font-family="'Times New Roman', serif" font-size="14" font-weight="bold" fill="#065f46">BUSINESS LOGIC & CONTROLLER LAYER</text>

  <rect x="35" y="272" width="120" height="42" rx="5" fill="#ffffff" stroke="#86efac"/>
  <text x="95" y="289" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#047857" text-anchor="middle">Donor & Eligibility</text>
  <text x="95" y="303" font-family="Arial, sans-serif" font-size="8.5" fill="#475569" text-anchor="middle">Clinical Vitals Rule</text>

  <rect x="165" y="272" width="120" height="42" rx="5" fill="#ffffff" stroke="#86efac"/>
  <text x="225" y="289" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#047857" text-anchor="middle">Lab Testing Station</text>
  <text x="225" y="303" font-family="Arial, sans-serif" font-size="8.5" fill="#475569" text-anchor="middle">5-Marker Screening</text>

  <rect x="295" y="272" width="120" height="42" rx="5" fill="#ffffff" stroke="#86efac"/>
  <text x="355" y="289" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#047857" text-anchor="middle">Inventory Engine</text>
  <text x="355" y="303" font-family="Arial, sans-serif" font-size="8.5" fill="#475569" text-anchor="middle">TTL Expiry & 8 Groups</text>

  <rect x="425" y="272" width="120" height="42" rx="5" fill="#ffffff" stroke="#86efac"/>
  <text x="485" y="289" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#047857" text-anchor="middle">Emergency Request</text>
  <text x="485" y="303" font-family="Arial, sans-serif" font-size="8.5" fill="#475569" text-anchor="middle">FIFO Unit Allocation</text>

  <rect x="555" y="272" width="115" height="42" rx="5" fill="#ffffff" stroke="#86efac"/>
  <text x="612" y="289" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#047857" text-anchor="middle">Traceability Log</text>
  <text x="612" y="303" font-family="Arial, sans-serif" font-size="8.5" fill="#475569" text-anchor="middle">Immutable Audit</text>

  <!-- Connectors 3 -->
  <line x1="350" y1="325" x2="350" y2="350" stroke="#374151" stroke-width="2" marker-end="url(#arrow)"/>
  <text x="360" y="341" font-family="Arial, sans-serif" font-size="10" fill="#4b5563">Mongoose ODM ODM Queries</text>

  <!-- Persistence Layer -->
  <rect x="20" y="350" width="660" height="58" rx="8" fill="url(#gradDb)" stroke="#8b5cf6" stroke-width="1.5"/>
  <text x="35" y="372" font-family="'Times New Roman', serif" font-size="13" font-weight="bold" fill="#581c87">PERSISTENCE LAYER (MongoDB Database / Embedded MongoMemoryServer Fallback)</text>
  <text x="35" y="393" font-family="Consolas, monospace" font-size="10.5" fill="#4338ca">Collections: [ users | donors | appointments | bloodunits | bloodtests | bloodrequests | transactions ]</text>
</svg>
`,

  classDiagramSvg: `
<svg width="700" height="440" viewBox="0 0 700 440" xmlns="http://www.w3.org/2000/svg" style="display:block; margin: 15px auto; max-width: 100%;">
  <defs>
    <marker id="uArrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 8 5 L 0 9 z" fill="#1e3a8a"/>
    </marker>
  </defs>

  <!-- User Class -->
  <rect x="20" y="20" width="190" height="150" rx="4" fill="#f8fafc" stroke="#1e3a8a" stroke-width="1.5"/>
  <rect x="20" y="20" width="190" height="26" fill="#1e3a8a"/>
  <text x="115" y="37" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#ffffff" text-anchor="middle">«Model» User</text>
  <text x="26" y="60" font-family="Arial, sans-serif" font-size="9.5" fill="#0f172a">- _id: ObjectId</text>
  <text x="26" y="74" font-family="Arial, sans-serif" font-size="9.5" fill="#0f172a">- name: String</text>
  <text x="26" y="88" font-family="Arial, sans-serif" font-size="9.5" fill="#0f172a">- email: String [Unique]</text>
  <text x="26" y="102" font-family="Arial, sans-serif" font-size="9.5" fill="#0f172a">- password: String [Hashed]</text>
  <text x="26" y="116" font-family="Arial, sans-serif" font-size="9.5" fill="#0f172a">- role: Enum('admin','donor','requester')</text>
  <line x1="20" y1="126" x2="210" y2="126" stroke="#94a3b8"/>
  <text x="26" y="142" font-family="Arial, sans-serif" font-size="9.5" fill="#0f172a">+ matchPassword(pwd): Boolean</text>
  <text x="26" y="156" font-family="Arial, sans-serif" font-size="9.5" fill="#0f172a">+ pre('save'): HashPassword</text>

  <!-- Donor Class -->
  <rect x="250" y="20" width="200" height="150" rx="4" fill="#f8fafc" stroke="#047857" stroke-width="1.5"/>
  <rect x="250" y="20" width="200" height="26" fill="#047857"/>
  <text x="350" y="37" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#ffffff" text-anchor="middle">«Model» Donor</text>
  <text x="256" y="60" font-family="Arial, sans-serif" font-size="9.5" fill="#0f172a">- user: ObjectId [Ref: User]</text>
  <text x="256" y="74" font-family="Arial, sans-serif" font-size="9.5" fill="#0f172a">- bloodGroup: Enum(8 Groups)</text>
  <text x="256" y="88" font-family="Arial, sans-serif" font-size="9.5" fill="#0f172a">- dateOfBirth: Date, gender: String</text>
  <text x="256" y="102" font-family="Arial, sans-serif" font-size="9.5" fill="#0f172a">- weightKg: Number, hemoglobin: Num</text>
  <text x="256" y="116" font-family="Arial, sans-serif" font-size="9.5" fill="#0f172a">- eligibilityStatus: Enum</text>
  <line x1="250" y1="126" x2="450" y2="126" stroke="#94a3b8"/>
  <text x="256" y="142" font-family="Arial, sans-serif" font-size="9.5" fill="#0f172a">+ evaluateVitals(): Assessment</text>
  <text x="256" y="156" font-family="Arial, sans-serif" font-size="9.5" fill="#0f172a">+ canDonateNext(): Date</text>

  <!-- Association User -> Donor -->
  <line x1="210" y1="95" x2="250" y2="95" stroke="#1e3a8a" stroke-width="1.5" marker-end="url(#uArrow)"/>
  <text x="220" y="88" font-family="Arial, sans-serif" font-size="9" fill="#1e3a8a">1:1</text>

  <!-- BloodUnit Class -->
  <rect x="490" y="20" width="190" height="150" rx="4" fill="#f8fafc" stroke="#b91c1c" stroke-width="1.5"/>
  <rect x="490" y="20" width="190" height="26" fill="#b91c1c"/>
  <text x="585" y="37" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#ffffff" text-anchor="middle">«Model» BloodUnit</text>
  <text x="496" y="60" font-family="Arial, sans-serif" font-size="9.5" fill="#0f172a">- unitId: String [BLD-YYYY-XXXX]</text>
  <text x="496" y="74" font-family="Arial, sans-serif" font-size="9.5" fill="#0f172a">- donor: ObjectId [Ref: Donor]</text>
  <text x="496" y="88" font-family="Arial, sans-serif" font-size="9.5" fill="#0f172a">- bloodGroup: Enum, volumeMl: Num</text>
  <text x="496" y="102" font-family="Arial, sans-serif" font-size="9.5" fill="#0f172a">- componentType: Enum(4 types)</text>
  <text x="496" y="116" font-family="Arial, sans-serif" font-size="9.5" fill="#0f172a">- inventoryStatus: Enum</text>
  <line x1="490" y1="126" x2="680" y2="126" stroke="#94a3b8"/>
  <text x="496" y="142" font-family="Arial, sans-serif" font-size="9.5" fill="#0f172a">+ checkExpired(): Boolean</text>
  <text x="496" y="156" font-family="Arial, sans-serif" font-size="9.5" fill="#0f172a">+ allocateTo(requestId): Void</text>

  <!-- BloodTest Class -->
  <rect x="490" y="240" width="190" height="170" rx="4" fill="#f8fafc" stroke="#7c2d12" stroke-width="1.5"/>
  <rect x="490" y="240" width="190" height="26" fill="#7c2d12"/>
  <text x="585" y="257" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#ffffff" text-anchor="middle">«Model» BloodTest</text>
  <text x="496" y="280" font-family="Arial, sans-serif" font-size="9.5" fill="#0f172a">- bloodUnit: ObjectId [Ref]</text>
  <text x="496" y="294" font-family="Arial, sans-serif" font-size="9.5" fill="#0f172a">- hivTest: Enum('NEGATIVE',..)</text>
  <text x="496" y="308" font-family="Arial, sans-serif" font-size="9.5" fill="#0f172a">- hbvTest, hcvTest: Enum</text>
  <text x="496" y="322" font-family="Arial, sans-serif" font-size="9.5" fill="#0f172a">- syphilisTest, malariaTest: Enum</text>
  <text x="496" y="336" font-family="Arial, sans-serif" font-size="9.5" fill="#0f172a">- overallResult: Enum</text>
  <line x1="490" y1="346" x2="680" y2="346" stroke="#94a3b8"/>
  <text x="496" y="364" font-family="Arial, sans-serif" font-size="9.5" fill="#0f172a">+ evaluateGatekeeper(): Result</text>
  <text x="496" y="380" font-family="Arial, sans-serif" font-size="9.5" fill="#0f172a">+ releaseToInventory(): Boolean</text>
  <text x="496" y="396" font-family="Arial, sans-serif" font-size="9.5" fill="#0f172a">+ biohazardQuarantine(): Void</text>

  <!-- Association BloodUnit <-> BloodTest -->
  <line x1="585" y1="170" x2="585" y2="240" stroke="#b91c1c" stroke-width="1.5" marker-end="url(#uArrow)"/>
  <text x="595" y="205" font-family="Arial, sans-serif" font-size="9" fill="#b91c1c">1:1 Test</text>

  <!-- BloodRequest Class -->
  <rect x="250" y="240" width="200" height="170" rx="4" fill="#f8fafc" stroke="#4338ca" stroke-width="1.5"/>
  <rect x="250" y="240" width="200" height="26" fill="#4338ca"/>
  <text x="350" y="257" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#ffffff" text-anchor="middle">«Model» BloodRequest</text>
  <text x="256" y="280" font-family="Arial, sans-serif" font-size="9.5" fill="#0f172a">- hospitalUser: ObjectId [Ref]</text>
  <text x="256" y="294" font-family="Arial, sans-serif" font-size="9.5" fill="#0f172a">- bloodGroup: Enum, units: Num</text>
  <text x="256" y="308" font-family="Arial, sans-serif" font-size="9.5" fill="#0f172a">- urgencyLevel: Enum(3 levels)</text>
  <text x="256" y="322" font-family="Arial, sans-serif" font-size="9.5" fill="#0f172a">- requestStatus: Enum(PENDING..)</text>
  <text x="256" y="336" font-family="Arial, sans-serif" font-size="9.5" fill="#0f172a">- allocatedUnits: [ObjectId]</text>
  <line x1="250" y1="346" x2="450" y2="346" stroke="#94a3b8"/>
  <text x="256" y="364" font-family="Arial, sans-serif" font-size="9.5" fill="#0f172a">+ verifyAvailableStock(): Num</text>
  <text x="256" y="380" font-family="Arial, sans-serif" font-size="9.5" fill="#0f172a">+ executeFulfillment(): Boolean</text>
  <text x="256" y="396" font-family="Arial, sans-serif" font-size="9.5" fill="#0f172a">+ logAuditTrail(): Void</text>

  <!-- Association BloodRequest -> BloodUnit -->
  <line x1="450" y1="300" x2="490" y2="140" stroke="#4338ca" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#uArrow)"/>
  <text x="430" y="210" font-family="Arial, sans-serif" font-size="9" fill="#4338ca">Allocates N Units</text>

  <!-- Transaction Class -->
  <rect x="20" y="240" width="190" height="170" rx="4" fill="#f8fafc" stroke="#374151" stroke-width="1.5"/>
  <rect x="20" y="240" width="190" height="26" fill="#374151"/>
  <text x="115" y="257" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#ffffff" text-anchor="middle">«Model» Transaction</text>
  <text x="26" y="280" font-family="Arial, sans-serif" font-size="9.5" fill="#0f172a">- transactionType: Enum</text>
  <text x="26" y="294" font-family="Arial, sans-serif" font-size="9.5" fill="#0f172a">- bloodUnit: ObjectId [Ref]</text>
  <text x="26" y="308" font-family="Arial, sans-serif" font-size="9.5" fill="#0f172a">- performedBy: ObjectId [Ref]</text>
  <text x="26" y="322" font-family="Arial, sans-serif" font-size="9.5" fill="#0f172a">- details: String, notes: String</text>
  <text x="26" y="336" font-family="Arial, sans-serif" font-size="9.5" fill="#0f172a">- timestamp: Date [Auto]</text>
  <line x1="20" y1="346" x2="210" y2="346" stroke="#94a3b8"/>
  <text x="26" y="364" font-family="Arial, sans-serif" font-size="9.5" fill="#0f172a">+ recordAudit(): Boolean</text>
  <text x="26" y="380" font-family="Arial, sans-serif" font-size="9.5" fill="#0f172a">+ generateTraceReport(): Obj</text>
</svg>
`,

  sequenceEmergencySvg: `
<svg width="700" height="420" viewBox="0 0 700 420" xmlns="http://www.w3.org/2000/svg" style="display:block; margin: 15px auto; max-width: 100%;">
  <defs>
    <marker id="sArrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 8 5 L 0 9 z" fill="#dc2626"/>
    </marker>
    <marker id="sArrowBlue" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 8 5 L 0 9 z" fill="#2563eb"/>
    </marker>
  </defs>

  <!-- Lifelines -->
  <rect x="30" y="20" width="100" height="30" rx="4" fill="#dbeafe" stroke="#2563eb"/>
  <text x="80" y="40" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#1e40af" text-anchor="middle">Hospital</text>
  <line x1="80" y1="50" x2="80" y2="400" stroke="#94a3b8" stroke-dasharray="4,4"/>

  <rect x="180" y="20" width="110" height="30" rx="4" fill="#fee2e2" stroke="#dc2626"/>
  <text x="235" y="40" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#991b1b" text-anchor="middle">Request Ctrl</text>
  <line x1="235" y1="50" x2="235" y2="400" stroke="#94a3b8" stroke-dasharray="4,4"/>

  <rect x="340" y="20" width="110" height="30" rx="4" fill="#dcfce7" stroke="#16a34a"/>
  <text x="395" y="40" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#166534" text-anchor="middle">Inventory Model</text>
  <line x1="395" y1="50" x2="395" y2="400" stroke="#94a3b8" stroke-dasharray="4,4"/>

  <rect x="500" y="20" width="110" height="30" rx="4" fill="#f3e8ff" stroke="#9333ea"/>
  <text x="555" y="40" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#6b21a8" text-anchor="middle">Audit Ledger</text>
  <line x1="555" y1="50" x2="555" y2="400" stroke="#94a3b8" stroke-dasharray="4,4"/>

  <!-- Messages -->
  <!-- 1 -->
  <line x1="80" y1="90" x2="235" y2="90" stroke="#dc2626" stroke-width="1.5" marker-end="url(#sArrow)"/>
  <text x="155" y="82" font-family="Arial, sans-serif" font-size="10" fill="#991b1b" text-anchor="middle">1. POST /api/requests (O+, 2 Units, CRITICAL)</text>

  <!-- 2 -->
  <line x1="235" y1="130" x2="395" y2="130" stroke="#2563eb" stroke-width="1.5" marker-end="url(#sArrowBlue)"/>
  <text x="315" y="122" font-family="Arial, sans-serif" font-size="10" fill="#1e40af" text-anchor="middle">2. find({ bloodGroup: 'O+', status: 'AVAILABLE' })</text>

  <!-- 3 -->
  <line x1="395" y1="170" x2="235" y2="170" stroke="#2563eb" stroke-width="1.5" stroke-dasharray="3,3" marker-end="url(#sArrowBlue)"/>
  <text x="315" y="162" font-family="Arial, sans-serif" font-size="10" fill="#1e40af" text-anchor="middle">3. return verified FIFO units [BLD-2026-0012, 0015]</text>

  <!-- 4 -->
  <line x1="235" y1="210" x2="395" y2="210" stroke="#dc2626" stroke-width="1.5" marker-end="url(#sArrow)"/>
  <text x="315" y="202" font-family="Arial, sans-serif" font-size="10" fill="#991b1b" text-anchor="middle">4. updateMany({ inventoryStatus: 'RESERVED' })</text>

  <!-- 5 -->
  <line x1="235" y1="250" x2="555" y2="250" stroke="#2563eb" stroke-width="1.5" marker-end="url(#sArrowBlue)"/>
  <text x="395" y="242" font-family="Arial, sans-serif" font-size="10" fill="#1e40af" text-anchor="middle">5. logTransaction({ type: 'DISPATCH', requestId })</text>

  <!-- 6 -->
  <line x1="555" y1="290" x2="235" y2="290" stroke="#2563eb" stroke-width="1.5" stroke-dasharray="3,3" marker-end="url(#sArrowBlue)"/>
  <text x="395" y="282" font-family="Arial, sans-serif" font-size="10" fill="#1e40af" text-anchor="middle">6. Audit ledger entry confirmed</text>

  <!-- 7 -->
  <line x1="235" y1="340" x2="80" y2="340" stroke="#16a34a" stroke-width="2" marker-end="url(#sArrowBlue)"/>
  <text x="155" y="332" font-family="Arial, sans-serif" font-size="10.5" font-weight="bold" fill="#166534" text-anchor="middle">7. 201 Created: { status: 'ALLOCATED', units: [...] }</text>
</svg>
`,

  sequenceDonationSvg: `
<svg width="700" height="420" viewBox="0 0 700 420" xmlns="http://www.w3.org/2000/svg" style="display:block; margin: 15px auto; max-width: 100%;">
  <defs>
    <marker id="dArrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 8 5 L 0 9 z" fill="#047857"/>
    </marker>
    <marker id="dArrowRed" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 8 5 L 0 9 z" fill="#dc2626"/>
    </marker>
  </defs>

  <rect x="30" y="20" width="100" height="30" rx="4" fill="#dcfce7" stroke="#047857"/>
  <text x="80" y="40" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#047857" text-anchor="middle">Donor</text>
  <line x1="80" y1="50" x2="80" y2="400" stroke="#94a3b8" stroke-dasharray="4,4"/>

  <rect x="180" y="20" width="110" height="30" rx="4" fill="#fee2e2" stroke="#dc2626"/>
  <text x="235" y="40" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#991b1b" text-anchor="middle">Phlebotomy</text>
  <line x1="235" y1="50" x2="235" y2="400" stroke="#94a3b8" stroke-dasharray="4,4"/>

  <rect x="340" y="20" width="110" height="30" rx="4" fill="#fef3c7" stroke="#d97706"/>
  <text x="395" y="40" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#b45309" text-anchor="middle">Lab Screening</text>
  <line x1="395" y1="50" x2="395" y2="400" stroke="#94a3b8" stroke-dasharray="4,4"/>

  <rect x="500" y="20" width="110" height="30" rx="4" fill="#dbeafe" stroke="#2563eb"/>
  <text x="555" y="40" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#1e40af" text-anchor="middle">Cold Storage Inv</text>
  <line x1="555" y1="50" x2="555" y2="400" stroke="#94a3b8" stroke-dasharray="4,4"/>

  <!-- Messages -->
  <line x1="80" y1="90" x2="235" y2="90" stroke="#047857" stroke-width="1.5" marker-end="url(#dArrow)"/>
  <text x="155" y="82" font-family="Arial, sans-serif" font-size="10" fill="#047857" text-anchor="middle">1. Complete Vitals &amp; Blood Draw (450 mL)</text>

  <line x1="235" y1="130" x2="395" y2="130" stroke="#dc2626" stroke-width="1.5" marker-end="url(#dArrowRed)"/>
  <text x="315" y="122" font-family="Arial, sans-serif" font-size="10" fill="#991b1b" text-anchor="middle">2. Create Unit [BLD-XXXX] (Status: QUARANTINED)</text>

  <line x1="395" y1="180" x2="395" y2="210" stroke="#d97706" stroke-width="1.5"/>
  <line x1="395" y1="210" x2="435" y2="210" stroke="#d97706" stroke-width="1.5"/>
  <line x1="435" y1="210" x2="435" y2="180" stroke="#d97706" stroke-width="1.5"/>
  <text x="445" y="200" font-family="Arial, sans-serif" font-size="9" fill="#b45309">Run 5 Tests (HIV, HBV, HCV, Syphilis, Malaria)</text>

  <line x1="395" y1="250" x2="555" y2="250" stroke="#047857" stroke-width="1.5" marker-end="url(#dArrow)"/>
  <text x="475" y="242" font-family="Arial, sans-serif" font-size="10" fill="#047857" text-anchor="middle">3. All Tests NEGATIVE: Release to Available Inventory</text>

  <line x1="555" y1="290" x2="555" y2="320" stroke="#2563eb" stroke-width="1.5"/>
  <text x="565" y="310" font-family="Arial, sans-serif" font-size="9" fill="#1e40af">Calculate Component TTL Expiry</text>

  <line x1="395" y1="360" x2="80" y2="360" stroke="#047857" stroke-width="1.5" marker-end="url(#dArrow)"/>
  <text x="235" y="352" font-family="Arial, sans-serif" font-size="10" fill="#047857" text-anchor="middle">4. Issue Digital Certificate &amp; Reset 90-Day Eligibility Counter</text>
</svg>
`
};
