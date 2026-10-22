module.exports = {
  getChapter5: () => `
<!-- PAGE 28 -->
<div class="page main-page" data-page="28">
  <div class="chapter-header">
    <h2 class="chapter-title">CHAPTER 5</h2>
    <h3 class="chapter-subtitle">IMPLEMENTATION</h3>
  </div>

  <h4 class="section-title">5.1 IMPLEMENTATION OVERVIEW</h4>
  <p class="body-text">
    The implementation of <strong>HemoVault</strong> translates the architectural specifications and design models established in Chapter 4 into clean, production-grade source code. The full-stack system is engineered using a cohesive, modern JavaScript/TypeScript ecosystem across both frontend and backend layers:
  </p>

  <ul class="bullet-list">
    <li><strong>Runtime Environment:</strong> Node.js v20.18.0 LTS utilizing ES6+ module features, asynchronous async/await concurrency, and event-driven file streams.</li>
    <li><strong>Backend Framework:</strong> Express.js v4.19.2 configured with modular route dispatching, Morgan request logging, Cross-Origin Resource Sharing (CORS) security headers, and JSON body parsing.</li>
    <li><strong>Persistence &amp; ODM:</strong> MongoDB paired with Mongoose ODM v8.4.0, featuring schema-level constraints, indexing for high-velocity queries, pre-save cryptographic middleware hooks, and an embedded <strong>MongoMemoryServer</strong> fallback engine.</li>
    <li><strong>Frontend Client:</strong> React 18 SPA bundled via Vite v6.4.3, leveraging React Hooks (<code>useState</code>, <code>useEffect</code>, <code>useContext</code>, <code>useMemo</code>), React Router DOM for declarative navigation, and custom CSS variables for responsive styling.</li>
  </ul>

  <h4 class="section-title">5.2 KEY FUNCTIONS &amp; IN-DEPTH CODE EXPLANATION</h4>
  <p class="body-text">
    This section provides exhaustive code explanations of the foundational business logic algorithms, security middleware, and transactional data controllers that form HemoVault's core engine.
  </p>

  <h5 style="font-size: 11pt; font-weight: bold; margin: 10px 0 4px 0;">5.2.1 Dual-Engine Database Connector with Automatic In-Memory Fallback</h5>
  <p class="body-text">
    In healthcare systems, high availability is paramount. The database connector in <code>server/src/config/db.js</code> attempts an initial connection to an external or cloud-hosted MongoDB Atlas URI with a strict 3-second timeout. If the connection fails (e.g., in offline rural clinics, classroom networks, or academic viva evaluation laptops without a running MongoDB service), the system catches the exception and immediately spins up an embedded <strong>MongoMemoryServer</strong> daemon:
  </p>
</div>

<!-- PAGE 29 -->
<div class="page main-page" data-page="29">
  <div class="code-block-container">
    <div class="code-title">Listing 5.1: Smart Database Connection with Automatic Fallback (server/src/config/db.js)</div>
    <pre class="code-block"><code>const mongoose = require('mongoose');
let mongoServer = null;

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return mongoose.connection;
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/bloodbank';
  
  try {
    // Attempt standard connection with 3000ms fail-fast timeout
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 3000 });
    console.log(\`[MongoDB] Connected: \${mongoose.connection.host}/\${mongoose.connection.name}\`);
  } catch (err) {
    console.warn(\`[MongoDB] Standard URI (\${uri}) failed: \${err.message}\`);
    console.log('[MongoDB] Starting embedded high-performance instance (MongoMemoryServer)...');
    
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      mongoServer = await MongoMemoryServer.create({ instance: { dbName: 'bloodbank' } });
      const memoryUri = mongoServer.getUri();
      await mongoose.connect(memoryUri);
      console.log(\`[MongoDB] Connected to embedded instance: \${memoryUri}\`);
    } catch (memErr) {
      console.error('[MongoDB] Fatal database initialization failure:', memErr.message);
      process.exit(1);
    }
  }
};</code></pre>
  </div>

  <p class="body-text">
    <strong>Technical Explanation:</strong> By checking <code>mongoose.connection.readyState &gt;= 1</code>, the function prevents redundant connections. The <code>serverSelectionTimeoutMS: 3000</code> option ensures the application does not hang waiting for unresponsive network sockets. When MongoMemoryServer instantiates, it runs a real MongoDB binary entirely within RAM, providing 100% feature compatibility (indexing, aggregation pipelines, document locking) with zero installation friction.
  </p>
</div>

<!-- PAGE 30 -->
<div class="page main-page" data-page="30">
  <h5 style="font-size: 11pt; font-weight: bold; margin: 10px 0 4px 0;">5.2.2 Cryptographic Password Hashing &amp; User Authentication Model</h5>
  <p class="body-text">
    The <code>User</code> schema defined in <code>server/src/models/User.js</code> enforces data hygiene and cryptographic security. Passwords undergo automated one-way salting and hashing via <code>bcryptjs</code> in a Mongoose pre-save hook:
  </p>

  <div class="code-block-container">
    <div class="code-title">Listing 5.2: Cryptographic Hashing Hook (server/src/models/User.js)</div>
    <pre class="code-block"><code>// Pre-save middleware: Hash password before persisting
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  
  // Generate cryptographic salt with 10 calculation rounds
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Instance method to compare plain password with stored hash
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};</code></pre>
  </div>

  <p class="body-text">
    <strong>Technical Explanation:</strong> The guard <code>if (!this.isModified('password')) return next()</code> ensures that whenever administrative details (such as contact telephone or address) are updated, the already-hashed password is not accidentally re-hashed. The <code>matchPassword</code> helper utilizes <code>bcrypt.compare</code>, which runs in constant time to prevent side-channel timing attacks.
  </p>

  <h5 style="font-size: 11pt; font-weight: bold; margin: 12px 0 4px 0;">5.2.3 Stateless JWT Authorization Middleware &amp; RBAC Guard</h5>
  <p class="body-text">
    The authorization middleware in <code>server/src/middleware/auth.js</code> validates incoming bearer tokens from HTTP <code>Authorization</code> headers:
  </p>

  <div class="code-block-container">
    <div class="code-title">Listing 5.3: JWT Verification Middleware (server/src/middleware/auth.js)</div>
    <pre class="code-block"><code>const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return res.status(401).json({ success: false, message: 'Authorization token missing.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'User record not found.' });
    }
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid or expired JWT token.' });
  }
};</code></pre>
  </div>
</div>

<!-- PAGE 31 -->
<div class="page main-page" data-page="31">
  <h5 style="font-size: 11pt; font-weight: bold; margin: 10px 0 4px 0;">5.2.4 Deterministic Clinical Eligibility Assessment Algorithm</h5>
  <p class="body-text">
    The clinical eligibility engine in <code>server/src/utils/eligibility.js</code> mathematically computes whether a prospective donor satisfies all medical safety criteria:
  </p>

  <div class="code-block-container">
    <div class="code-title">Listing 5.4: Clinical Eligibility Rules Engine (server/src/utils/eligibility.js)</div>
    <pre class="code-block"><code>const assessDonorEligibility = ({ dateOfBirth, weightKg, hemoglobin, pulseRate, bloodPressure, lastDonationDate }) => {
  const issues = [];
  const now = new Date();

  // 1. Age Verification (18 to 65 years)
  if (dateOfBirth) {
    const age = Math.floor((now - new Date(dateOfBirth)) / (365.25 * 24 * 60 * 60 * 1000));
    if (age < 18) issues.push(\`Underage: \${age} yrs (Minimum is 18)\`);
    else if (age > 65) issues.push(\`Overage: \${age} yrs (Maximum is 65)\`);
  }

  // 2. Weight Threshold (&gt;= 45.0 kg)
  if (weightKg !== undefined && weightKg < 45) {
    issues.push(\`Weight deficit: \${weightKg}kg (Minimum acceptable is 45kg)\`);
  }

  // 3. Hemoglobin Concentration (&gt;= 12.5 g/dL)
  if (hemoglobin !== undefined && hemoglobin < 12.5) {
    issues.push(\`Low hemoglobin: \${hemoglobin} g/dL (Minimum acceptable is 12.5 g/dL)\`);
  }

  // 4. Pulse Rate (60 to 100 bpm)
  if (pulseRate !== undefined && (pulseRate < 60 || pulseRate > 100)) {
    issues.push(\`Abnormal pulse rate: \${pulseRate} bpm (Normal range is 60-100)\`);
  }

  // 5. Blood Pressure Parsing (Systolic 100-140, Diastolic 60-90 mmHg)
  if (bloodPressure && bloodPressure.includes('/')) {
    const [systolic, diastolic] = bloodPressure.split('/').map(Number);
    if (systolic < 100 || systolic > 140) issues.push(\`Systolic BP out of range: \${systolic} mmHg (100-140)\`);
    if (diastolic < 60 || diastolic > 90) issues.push(\`Diastolic BP out of range: \${diastolic} mmHg (60-90)\`);
  }

  // 6. Inter-Donation Latency Interval (&gt;= 90 Days)
  if (lastDonationDate) {
    const daysSince = Math.floor((now - new Date(lastDonationDate)) / (24 * 60 * 60 * 1000));
    if (daysSince < 90) issues.push(\`Interval too short: \${daysSince} days since last draw (Minimum is 90)\`);
  }

  return {
    isEligible: issues.length === 0,
    status: issues.length === 0 ? 'ELIGIBLE' : 'TEMPORARILY_DEFERRED',
    summary: issues.length === 0 ? 'Donor satisfies all statutory medical criteria.' : issues.join('; '),
    issues,
  };
};</code></pre>
  </div>
</div>

<!-- PAGE 32 -->
<div class="page main-page" data-page="32">
  <h5 style="font-size: 11pt; font-weight: bold; margin: 10px 0 4px 0;">5.2.5 Laboratory Screening Gatekeeper &amp; Safety Release Controller</h5>
  <p class="body-text">
    The laboratory testing controller in <code>server/src/controllers/testingController.js</code> acts as the critical biological firewall. It updates diagnostic marker results and atomically updates unit inventory eligibility:
  </p>

  <div class="code-block-container">
    <div class="code-title">Listing 5.5: Laboratory Diagnostic Gatekeeper (server/src/controllers/testingController.js)</div>
    <pre class="code-block"><code>exports.updateTestResults = async (req, res, next) => {
  try {
    const { testId } = req.params;
    const { hivTest, hbvTest, hcvTest, syphilisTest, malariaTest, remarks } = req.body;

    const test = await BloodTest.findById(testId).populate('bloodUnit');
    if (!test) return res.status(404).json({ success: false, message: 'Test record not found' });

    test.hivTest = hivTest || test.hivTest;
    test.hbvTest = hbvTest || test.hbvTest;
    test.hcvTest = hcvTest || test.hcvTest;
    test.syphilisTest = syphilisTest || test.syphilisTest;
    test.malariaTest = malariaTest || test.malariaTest;
    test.testedBy = req.user.id;
    test.testDate = new Date();

    // Check if any viral/parasitic marker evaluates to POSITIVE
    const hasReactivity = [test.hivTest, test.hbvTest, test.hcvTest, test.syphilisTest, test.malariaTest]
      .includes('POSITIVE');
    
    // Check if all 5 markers have been fully recorded
    const isComplete = [test.hivTest, test.hbvTest, test.hcvTest, test.syphilisTest, test.malariaTest]
      .every(status => ['NEGATIVE', 'POSITIVE'].includes(status));

    if (hasReactivity) {
      test.overallResult = 'FAILED';
      // Atomically quarantine and lock into disposal state
      await BloodUnit.findByIdAndUpdate(test.bloodUnit._id, {
        inventoryStatus: 'DISCARDED',
        testingStatus: 'FAILED',
        discardReason: 'Serological Reactivity (Biohazard)',
      });
      await logTransaction({
        transactionType: 'DISCARD',
        bloodUnit: test.bloodUnit._id,
        performedBy: req.user.id,
        details: \`Unit locked into biohazard disposal. Reactivity detected in serology.\`,
      });
    } else if (isComplete) {
      test.overallResult = 'PASSED';
      // Release verified safe blood unit to active available inventory
      await BloodUnit.findByIdAndUpdate(test.bloodUnit._id, {
        inventoryStatus: 'AVAILABLE',
        testingStatus: 'PASSED',
      });
      await logTransaction({
        transactionType: 'TESTING',
        bloodUnit: test.bloodUnit._id,
        performedBy: req.user.id,
        details: 'All 5 TTI screening markers confirmed NEGATIVE. Unit released to stock.',
      });
    }

    await test.save();
    res.status(200).json({ success: true, test });
  } catch (err) { next(err); }
};</code></pre>
  </div>
</div>

<!-- PAGE 33 -->
<div class="page main-page" data-page="33">
  <h5 style="font-size: 11pt; font-weight: bold; margin: 10px 0 4px 0;">5.2.6 Emergency Hospital Requisition &amp; Atomic FIFO Allocation</h5>
  <p class="body-text">
    In <code>server/src/controllers/requestController.js</code>, when an emergency request is approved, the system queries available stock, sorts by oldest collection date (FIFO), and locks the units:
  </p>

  <div class="code-block-container">
    <div class="code-title">Listing 5.6: Atomic FIFO Allocation Engine (server/src/controllers/requestController.js)</div>
    <pre class="code-block"><code>exports.allocateUnits = async (req, res, next) => {
  try {
    const { requestId } = req.params;
    const bloodRequest = await BloodRequest.findById(requestId);
    if (!bloodRequest) return res.status(404).json({ success: false, message: 'Request not found' });

    const requiredUnits = bloodRequest.unitsRequested;
    const now = new Date();

    // Query unexpired, fully cleared units matching ABO/Rh group sorted by FIFO (oldest first)
    const matchingUnits = await BloodUnit.find({
      bloodGroup: bloodRequest.bloodGroup,
      componentType: bloodRequest.componentType,
      inventoryStatus: 'AVAILABLE',
      testingStatus: 'PASSED',
      expiryDate: { $gt: now },
    })
      .sort({ collectionDate: 1 }) // First-In, First-Out (FIFO)
      .limit(requiredUnits);

    if (matchingUnits.length < requiredUnits) {
      return res.status(400).json({
        success: false,
        message: \`Insufficient stock. Available: \${matchingUnits.length}, Requested: \${requiredUnits}\`,
      });
    }

    const unitIds = matchingUnits.map(u => u._id);

    // Atomically transition matching units to RESERVED
    await BloodUnit.updateMany(
      { _id: { $in: unitIds } },
      { inventoryStatus: 'RESERVED', assignedRequest: bloodRequest._id }
    );

    bloodRequest.allocatedUnits = unitIds;
    bloodRequest.requestStatus = 'ALLOCATED';
    await bloodRequest.save();

    // Log individual audit transactions
    for (const unit of matchingUnits) {
      await logTransaction({
        transactionType: 'ISSUE',
        bloodUnit: unit._id,
        performedBy: req.user.id,
        details: \`Allocated to Emergency Requisition #\${bloodRequest._id} (\${bloodRequest.urgencyLevel})\`,
      });
    }

    res.status(200).json({ success: true, message: 'Units allocated successfully', allocatedUnits: matchingUnits });
  } catch (err) { next(err); }
};</code></pre>
  </div>
</div>

<!-- PAGE 34 -->
<div class="page main-page" data-page="34">
  <h5 style="font-size: 11pt; font-weight: bold; margin: 10px 0 4px 0;">5.2.7 Automatic Expiration Sweeper &amp; Real-Time Aggregated Stock Matrix</h5>
  <p class="body-text">
    The stock summary endpoint in <code>server/src/controllers/inventoryController.js</code> executes an automated sweep to transition expired units, followed by a MongoDB aggregation across all 8 ABO/Rh groups:
  </p>

  <div class="code-block-container">
    <div class="code-title">Listing 5.7: Expiration Sweeper &amp; Aggregated Stock Matrix (server/src/controllers/inventoryController.js)</div>
    <pre class="code-block"><code>exports.getStockSummary = async (req, res, next) => {
  try {
    const now = new Date();

    // Sweep: Mark any expired units automatically
    const expiredUnits = await BloodUnit.find({
      inventoryStatus: 'AVAILABLE',
      expiryDate: { $lt: now },
    });

    for (const unit of expiredUnits) {
      unit.inventoryStatus = 'EXPIRED';
      await unit.save();
      await logTransaction({
        transactionType: 'DISCARD',
        bloodUnit: unit._id,
        details: \`Automatic Time-To-Live expiration sweep. Expiry date \${unit.expiryDate} surpassed.\`,
      });
    }

    // High-performance aggregation grouped by blood group
    const summary = await BloodUnit.aggregate([
      { $match: { inventoryStatus: 'AVAILABLE', expiryDate: { $gt: now } } },
      {
        $group: {
          _id: '$bloodGroup',
          totalUnits: { $sum: 1 },
          wholeBlood: { $sum: { $cond: [{ $eq: ['$componentType', 'WHOLE_BLOOD'] }, 1, 0] } },
          rbc: { $sum: { $cond: [{ $eq: ['$componentType', 'RED_BLOOD_CELLS'] }, 1, 0] } },
          platelets: { $sum: { $cond: [{ $eq: ['$componentType', 'PLATELETS'] }, 1, 0] } },
          plasma: { $sum: { $cond: [{ $eq: ['$componentType', 'PLASMA'] }, 1, 0] } },
        },
      },
    ]);

    // Format output across all 8 standard groups ensuring zero counts are populated
    const formattedMatrix = ALL_BLOOD_GROUPS.map(group => {
      const match = summary.find(s => s._id === group);
      return {
        bloodGroup: group,
        total: match ? match.totalUnits : 0,
        components: {
          wholeBlood: match ? match.wholeBlood : 0,
          redBloodCells: match ? match.rbc : 0,
          platelets: match ? match.platelets : 0,
          plasma: match ? match.plasma : 0,
        },
      };
    });

    res.status(200).json({ success: true, matrix: formattedMatrix });
  } catch (err) { next(err); }
};</code></pre>
  </div>
</div>

<!-- PAGE 35 -->
<div class="page main-page" data-page="35">
  <h5 style="font-size: 11pt; font-weight: bold; margin: 10px 0 4px 0;">5.2.8 Client-Side Centralized Authentication Context &amp; Axios Interceptor</h5>
  <p class="body-text">
    In the React frontend, session persistence, demo role switching, and API token injection are cleanly handled in <code>client/src/context/AuthContext.jsx</code> and <code>client/src/services/api.js</code>:
  </p>

  <div class="code-block-container">
    <div class="code-title">Listing 5.8: Axios Interceptor for Token Bearer Injection (client/src/services/api.js)</div>
    <pre class="code-block"><code>import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api',
  headers: { 'Content-Type': 'application/json' },
});

// Request Interceptor: Inject JWT token into Authorization header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = \`Bearer \${token}\`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Automatically redirect to login upon 401 Unauthorized
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;</code></pre>
  </div>

  <p class="body-text">
    <strong>Technical Explanation:</strong> The request interceptor eliminates the need to manually pass authorization headers across every Axios call in every React component. The response interceptor gracefully handles token expiration or revocation by purging stale browser storage and navigating the user back to the login gateway.
  </p>
</div>
`
};
