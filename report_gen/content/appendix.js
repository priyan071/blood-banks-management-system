module.exports = {
  getAppendix: () => `
<!-- PAGE 39 -->
<div class="page main-page" data-page="39">
  <div class="chapter-header">
    <h2 class="chapter-title">APPENDIX</h2>
    <h3 class="chapter-subtitle">SOURCE CODE REPOSITORY</h3>
  </div>

  <h4 class="section-title">1. PROJECT STRUCTURE</h4>
  <p class="body-text">The complete directory organization of the HemoVault MERN application:</p>
  <div class="code-block-container">
    <pre class="code-block"><code>blood-bank-system/
├── server/                               # Express.js REST API Backend
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                     # Smart MongoDB & MongoMemoryServer connector
│   │   ├── controllers/
│   │   │   ├── authController.js         # User registration, login, profile management
│   │   │   ├── donorController.js        # Donor vitals, history, certificates
│   │   │   ├── appointmentController.js  # Slot reservation, appointment tracking
│   │   │   ├── inventoryController.js    # Phlebotomy intake, stock matrix, expiry sweep
│   │   │   ├── testingController.js      # 5-marker TTI screening & gatekeeper logic
│   │   │   ├── requestController.js      # Hospital emergency request & FIFO allocation
│   │   │   ├── transactionController.js  # Immutable audit ledger queries
│   │   │   ├── dashboardController.js    # Executive statistical aggregations
│   │   │   └── reportController.js       # Statutory compliance reporting engine
│   │   ├── middleware/
│   │   │   ├── auth.js                   # JWT verification & request context hydration
│   │   │   ├── rbac.js                   # Role-Based Access Control permission enforcement
│   │   │   └── errorHandler.js           # Centralized exception interception
│   │   ├── models/
│   │   │   ├── User.js                   # User accounts & cryptographic hooks
│   │   │   ├── Donor.js                  # Donor clinical demographics & vitals
│   │   │   ├── Appointment.js            # Appointment scheduling documents
│   │   │   ├── BloodUnit.js              # Physical blood units & lifecycle statuses
│   │   │   ├── BloodTest.js              # Mandatory 5-marker laboratory screening
│   │   │   ├── BloodRequest.js           # Hospital emergency requisitions & allocations
│   │   │   └── Transaction.js            # Append-only immutable audit trail
│   │   ├── routes/                       # Express REST API route wiring
│   │   ├── seeds/seed.js                 # Automatic realistic data populator
│   │   ├── utils/                        # Eligibility algorithm, ID generator, audit logger
│   │   └── server.js                     # Application entrypoint & HTTP server
│   ├── .env                              # Environment variables configuration
│   └── package.json                      # Backend dependencies & script definitions
└── client/                               # React 18 Single Page Application (SPA)
    ├── src/
    │   ├── components/                   # DemoBar, Navbar, Sidebar, StatusBadge, Modal
    │   ├── context/AuthContext.jsx       # Global authentication state & 1-click demo switcher
    │   ├── pages/
    │   │   ├── auth/Login.jsx            # Multi-role authentication interface
    │   │   ├── auth/Register.jsx         # Donor & hospital self-service registration
    │   │   ├── admin/                    # Admin Dashboard, Inventory, Testing Lab, Requests
    │   │   ├── donor/                    # Donor Dashboard, Eligibility Calculator, Booking
    │   │   └── requester/                # Hospital Dashboard, Compatibility Search, Requisitions
    │   ├── services/api.js               # Axios HTTP instance with JWT interceptors
    │   ├── styles/index.css              # Custom medical design system & CSS variables
    │   ├── App.jsx                       # Client routing & protected navigation guards
    │   └── main.jsx                      # React DOM virtual root mounter
    ├── index.html                        # HTML5 document shell
    ├── vite.config.js                    # Vite bundler configuration
    └── package.json                      # Frontend dependencies & build tooling</code></pre>
  </div>
</div>

<!-- PAGE 40 -->
<div class="page main-page" data-page="40">
  <h4 class="section-title">2. BACKEND PACKAGE INSTALLATION</h4>
  <p class="body-text">Terminal commands to initialize and install server and client dependencies:</p>
  <div class="code-block-container">
    <pre class="code-block"><code># 1. Initialize root workspace and install concurrent orchestration
npm init -y
npm install concurrently --save-dev

# 2. Navigate to backend server directory and install runtime dependencies
cd server
npm install express mongoose dotenv cors morgan jsonwebtoken bcryptjs
npm install mongodb-memory-server --save-dev

# 3. Navigate to frontend client directory and install React & UI dependencies
cd ../client
npm install react react-dom react-router-dom axios lucide-react
npm install @vitejs/plugin-react vite --save-dev

# 4. Launch unified full-stack development environment concurrently
cd ..
npm run dev</code></pre>
  </div>

  <h4 class="section-title">3. DATABASE CONNECTION</h4>
  <p class="body-text">Smart MongoDB connection module with automated embedded MongoMemoryServer fallback:</p>
  <div class="code-block-container">
    <div class="code-title">server/src/config/db.js</div>
    <pre class="code-block"><code>const mongoose = require('mongoose');
let mongoServer = null;

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return mongoose.connection;
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/bloodbank';
  
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 3000 });
    console.log(\`[MongoDB] Connected successfully: \${mongoose.connection.host}\`);
  } catch (err) {
    console.warn(\`[MongoDB] Standard URI unreachable: \${err.message}\`);
    console.log('[MongoDB] Starting embedded high-performance instance (MongoMemoryServer)...');
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      mongoServer = await MongoMemoryServer.create({ instance: { dbName: 'bloodbank' } });
      const memoryUri = mongoServer.getUri();
      await mongoose.connect(memoryUri);
      console.log(\`[MongoDB] Connected to embedded memory instance: \${memoryUri}\`);
    } catch (memErr) {
      console.error('[MongoDB] Fatal error initializing database:', memErr.message);
      process.exit(1);
    }
  }
};

module.exports = { connectDB };</code></pre>
  </div>
</div>

<!-- PAGE 41 -->
<div class="page main-page" data-page="41">
  <h4 class="section-title">4. ENVIRONMENT VARIABLES CONFIGURATION</h4>
  <p class="body-text">Production and development environment configuration file:</p>
  <div class="code-block-container">
    <div class="code-title">.env / server/.env</div>
    <pre class="code-block"><code>PORT=5001
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/bloodbank
JWT_SECRET=super_secret_blood_bank_key_2026_jwt_token_auth
JWT_EXPIRE=7d</code></pre>
  </div>

  <h4 class="section-title">5. USER MODEL SCHEMA</h4>
  <p class="body-text">User authentication entity definition with role validation and password hooks:</p>
  <div class="code-block-container">
    <div class="code-title">server/src/models/User.js</div>
    <pre class="code-block"><code>const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Please provide a name'], trim: true },
    email: {
      type: String,
      required: [true, 'Please provide an email address'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
    },
    password: { type: String, required: [true, 'Please provide a password'], minlength: 6, select: false },
    role: { type: String, enum: ['admin', 'donor', 'requester'], default: 'donor', required: true },
    phone: { type: String, trim: true, default: '' },
    address: { type: String, trim: true, default: '' },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'UNKNOWN', ''],
      default: 'UNKNOWN',
    },
    hospitalName: { type: String, trim: true, default: '' },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);</code></pre>
  </div>
</div>

<!-- PAGE 42 -->
<div class="page main-page" data-page="42">
  <h4 class="section-title">6. PASSWORD HASHING AND REGISTRATION</h4>
  <p class="body-text">User registration controller creating credentials and linked donor profiles:</p>
  <div class="code-block-container">
    <div class="code-title">server/src/controllers/authController.js (register)</div>
    <pre class="code-block"><code>exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role = 'donor', phone, address, bloodGroup = 'O+', hospitalName } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'An account with this email already exists.' });
    }

    const user = await User.create({
      name, email, password, role, phone, address,
      bloodGroup: role === 'donor' ? bloodGroup : undefined,
      hospitalName: role === 'requester' ? hospitalName : undefined,
    });

    if (role === 'donor') {
      await Donor.create({
        user: user._id, bloodGroup,
        dateOfBirth: new Date(Date.now() - 25 * 365 * 24 * 60 * 60 * 1000),
        weightKg: 65, hemoglobin: 13.5, pulseRate: 72, bloodPressure: '120/80',
        eligibilityStatus: 'ELIGIBLE',
      });
    }

    const token = generateToken(user._id);
    res.status(201).json({ success: true, token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) { next(err); }
};</code></pre>
  </div>

  <h4 class="section-title">7. LOGIN AND JWT GENERATION</h4>
  <p class="body-text">Authentication controller verifying credentials and signing JWT bearer tokens:</p>
  <div class="code-block-container">
    <div class="code-title">server/src/controllers/authController.js (login)</div>
    <pre class="code-block"><code>exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide both email and password' });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const token = generateToken(user._id);
    let donorProfile = null;
    if (user.role === 'donor') {
      donorProfile = await Donor.findOne({ user: user._id });
    }

    res.status(200).json({
      success: true, token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role, bloodGroup: user.bloodGroup, donorProfile },
    });
  } catch (err) { next(err); }
};</code></pre>
  </div>
</div>

<!-- PAGE 43 -->
<div class="page main-page" data-page="43">
  <h4 class="section-title">8. AUTHENTICATION MIDDLEWARE</h4>
  <p class="body-text">Express middleware validating JWT tokens and enforcing role permissions:</p>
  <div class="code-block-container">
    <div class="code-title">server/src/middleware/auth.js &amp; rbac.js</div>
    <pre class="code-block"><code>// JWT Bearer Protection Middleware
const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) return res.status(401).json({ success: false, message: 'Token missing.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) return res.status(401).json({ success: false, message: 'User does not exist.' });
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token.' });
  }
};

// Role-Based Access Control Middleware
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: \`User role '\${req.user.role}' is not authorized to access this route.\`,
      });
    }
    next();
  };
};</code></pre>
  </div>

  <h4 class="section-title">9. CREATE API (PHLEBOTOMY BLOOD COLLECTION)</h4>
  <p class="body-text">API endpoint recording phlebotomy blood draw and initializing test record:</p>
  <div class="code-block-container">
    <div class="code-title">server/src/controllers/inventoryController.js (collectBlood)</div>
    <pre class="code-block"><code>exports.collectBlood = async (req, res, next) => {
  try {
    const { donorId, componentType = 'WHOLE_BLOOD', volumeMl = 450, storageLocation = 'Main Fridge 1' } = req.body;
    const donor = await Donor.findById(donorId);
    if (!donor) return res.status(404).json({ success: false, message: 'Donor not found' });

    // Generate unique unit serial number (BLD-YYYY-XXXX)
    const unitId = await generateUniqueUnitId();
    const expiryDate = calculateComponentExpiry(componentType, new Date());

    const unit = await BloodUnit.create({
      unitId, donor: donor._id, bloodGroup: donor.bloodGroup,
      componentType, volumeMl, storageLocation, expiryDate,
      inventoryStatus: 'QUARANTINED', testingStatus: 'PENDING',
    });

    const test = await BloodTest.create({ bloodUnit: unit._id });
    unit.testRecord = test._id;
    await unit.save();

    res.status(201).json({ success: true, unit, test });
  } catch (err) { next(err); }
};</code></pre>
  </div>
</div>

<!-- PAGE 44 -->
<div class="page main-page" data-page="44">
  <h4 class="section-title">10. READ API (AGGREGATED INVENTORY STOCK MATRIX)</h4>
  <p class="body-text">Controller querying real-time stock balances across all 8 ABO/Rh blood groups:</p>
  <div class="code-block-container">
    <div class="code-title">server/src/controllers/inventoryController.js (getStockSummary)</div>
    <pre class="code-block"><code>exports.getStockSummary = async (req, res, next) => {
  try {
    const now = new Date();
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

  <h4 class="section-title">11. UPDATE API (BLOOD SCREENING RESULTS &amp; GATEKEEPER)</h4>
  <p class="body-text">Controller updating diagnostic results and verifying biological clearance:</p>
  <div class="code-block-container">
    <div class="code-title">server/src/controllers/testingController.js (updateTestResults)</div>
    <pre class="code-block"><code>exports.updateTestResults = async (req, res, next) => {
  try {
    const { testId } = req.params;
    const { hivTest, hbvTest, hcvTest, syphilisTest, malariaTest } = req.body;
    const test = await BloodTest.findById(testId).populate('bloodUnit');

    test.hivTest = hivTest || test.hivTest;
    test.hbvTest = hbvTest || test.hbvTest;
    test.hcvTest = hcvTest || test.hcvTest;
    test.syphilisTest = syphilisTest || test.syphilisTest;
    test.malariaTest = malariaTest || test.malariaTest;

    const hasReactivity = [test.hivTest, test.hbvTest, test.hcvTest, test.syphilisTest, test.malariaTest].includes('POSITIVE');
    const isComplete = [test.hivTest, test.hbvTest, test.hcvTest, test.syphilisTest, test.malariaTest]
      .every(status => ['NEGATIVE', 'POSITIVE'].includes(status));

    if (hasReactivity) {
      test.overallResult = 'FAILED';
      await BloodUnit.findByIdAndUpdate(test.bloodUnit._id, { inventoryStatus: 'DISCARDED', testingStatus: 'FAILED' });
    } else if (isComplete) {
      test.overallResult = 'PASSED';
      await BloodUnit.findByIdAndUpdate(test.bloodUnit._id, { inventoryStatus: 'AVAILABLE', testingStatus: 'PASSED' });
    }

    await test.save();
    res.status(200).json({ success: true, test });
  } catch (err) { next(err); }
};</code></pre>
  </div>
</div>

<!-- PAGE 45 -->
<div class="page main-page" data-page="45">
  <h4 class="section-title">12. DELETE API (EXPIRED STOCK &amp; BIOHAZARD DISPOSAL)</h4>
  <p class="body-text">Controller safely disposing of contaminated or outdated blood units:</p>
  <div class="code-block-container">
    <div class="code-title">server/src/controllers/inventoryController.js (discardUnit)</div>
    <pre class="code-block"><code>exports.discardUnit = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { reason = 'Manual administrative disposal' } = req.body;

    const unit = await BloodUnit.findById(id);
    if (!unit) return res.status(404).json({ success: false, message: 'Unit not found' });

    unit.inventoryStatus = 'DISCARDED';
    unit.discardReason = reason;
    await unit.save();

    await logTransaction({
      transactionType: 'DISCARD',
      bloodUnit: unit._id,
      performedBy: req.user.id,
      details: \`Unit manually decommissioned. Reason: \${reason}\`,
    });

    res.status(200).json({ success: true, message: 'Unit decommissioned and marked as DISCARDED', unit });
  } catch (err) { next(err); }
};</code></pre>
  </div>

  <h4 class="section-title">13. EXPRESS ROUTE CONFIGURATION</h4>
  <p class="body-text">Mounting REST endpoints to modular routers in the Express server:</p>
  <div class="code-block-container">
    <div class="code-title">server/src/server.js (Route Wiring)</div>
    <pre class="code-block"><code>// Mount REST API Routers
app.use('/api/auth', authRoutes);
app.use('/api/donors', donorRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/tests', testingRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/reports', reportRoutes);</code></pre>
  </div>
</div>

<!-- PAGE 46 -->
<div class="page main-page" data-page="46">
  <h4 class="section-title">14. MAIN SERVER ENTRYPOINT</h4>
  <p class="body-text">Application bootstrap file configuring Express, database connection, and auto-seeder:</p>
  <div class="code-block-container">
    <div class="code-title">server/src/server.js</div>
    <pre class="code-block"><code>const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { connectDB } = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const User = require('./models/User');
const { seedData } = require('./seeds/seed.js');

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(morgan('dev'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'online', service: 'HemoVault Blood Bank API', author: 'Priyan R' });
});

// Mount Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/inventory', require('./routes/inventoryRoutes'));
app.use('/api/tests', require('./routes/testingRoutes'));
app.use('/api/requests', require('./routes/requestRoutes'));
app.use(errorHandler);

const PORT = process.env.PORT || 5001;
async function startServer() {
  await connectDB();
  const userCount = await User.countDocuments();
  if (userCount === 0) {
    console.log('[Server] Database is empty. Running initial demonstration seeder...');
    await seedData(true);
  }
  app.listen(PORT, '0.0.0.0', () => {
    console.log(\`[BloodBank API] Server running on http://localhost:\${PORT}\`);
  });
}

if (require.main === module) startServer();
module.exports = { app, startServer };</code></pre>
  </div>
</div>

<!-- PAGE 47 -->
<div class="page main-page" data-page="47">
  <h4 class="section-title">15. REACT LOGIN COMPONENT</h4>
  <p class="body-text">Client login page featuring multi-role authentication and 1-click evaluation buttons:</p>
  <div class="code-block-container">
    <div class="code-title">client/src/pages/auth/Login.jsx</div>
    <pre class="code-block"><code>import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, quickDemoLogin } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await login(email, password);
      if (user.role === 'admin') navigate('/admin');
      else if (user.role === 'donor') navigate('/donor');
      else if (user.role === 'requester') navigate('/requester');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="card">
        <h2>Sign In to HemoVault</h2>
        <div className="demo-buttons">
          <button onClick={() => quickDemoLogin('admin')}>Admin</button>
          <button onClick={() => quickDemoLogin('donor')}>Donor</button>
          <button onClick={() => quickDemoLogin('requester')}>Hospital</button>
        </div>
        <form onSubmit={handleLogin}>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}</code></pre>
  </div>
</div>

<!-- PAGE 48 -->
<div class="page main-page" data-page="48">
  <h4 class="section-title">16. ADMIN DASHBOARD LOGIC</h4>
  <p class="body-text">Administrative operational dashboard fetching live inventory statistics and charts:</p>
  <div class="code-block-container">
    <div class="code-title">client/src/pages/admin/AdminDashboard.jsx</div>
    <pre class="code-block"><code>import React, { useEffect, useState } from 'react';
import api from '../../services/api';

export default function AdminDashboard() {
  const [metrics, setMetrics] = useState(null);
  const [stockMatrix, setStockMatrix] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dashRes, stockRes] = await Promise.all([
          api.get('/dashboard/stats'),
          api.get('/inventory/summary')
        ]);
        setMetrics(dashRes.data.stats);
        setStockMatrix(stockRes.data.matrix);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="admin-dashboard">
      <div className="metrics-grid">
        <div className="stat-card">Total Units: {metrics?.availableUnits || 0}</div>
        <div className="stat-card">Pending Tests: {metrics?.pendingTests || 0}</div>
        <div className="stat-card">Active Donors: {metrics?.totalDonors || 0}</div>
        <div className="stat-card">Critical Requests: {metrics?.criticalRequests || 0}</div>
      </div>
      <div className="stock-matrix">
        {stockMatrix.map(item => (
          <div key={item.bloodGroup} className="stock-pill">
            <strong>{item.bloodGroup}</strong>: {item.total} Units
          </div>
        ))}
      </div>
    </div>
  );
}</code></pre>
  </div>
</div>

<!-- PAGE 49 -->
<div class="page main-page" data-page="49">
  <h4 class="section-title">17. REST API REQUEST AND RESPONSE EXAMPLES</h4>
  <p class="body-text">Concrete cURL commands and JSON response payloads for key endpoints:</p>

  <h5 style="font-size: 10.5pt; font-weight: bold; margin: 8px 0 4px 0;">17.1 User Authentication (POST /api/auth/login)</h5>
  <div class="code-block-container">
    <pre class="code-block"><code># cURL Request
curl -X POST http://localhost:5001/api/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{"email": "admin@bloodbank.org", "password": "Password@123"}'

# JSON Response (200 OK)
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NWQwM2I4...",
  "user": {
    "id": "665d03b87a8b32d201c1001",
    "name": "Dr. Priyan R (Medical Director)",
    "email": "admin@bloodbank.org",
    "role": "admin"
  }
}</code></pre>
  </div>

  <h5 style="font-size: 10.5pt; font-weight: bold; margin: 8px 0 4px 0;">17.2 Real-Time Stock Availability Matrix (GET /api/inventory/summary)</h5>
  <div class="code-block-container">
    <pre class="code-block"><code># cURL Request
curl -s http://localhost:5001/api/inventory/summary

# JSON Response (200 OK)
{
  "success": true,
  "matrix": [
    { "bloodGroup": "A+", "total": 14, "components": { "wholeBlood": 4, "redBloodCells": 6, "platelets": 2, "plasma": 2 } },
    { "bloodGroup": "O+", "total": 28, "components": { "wholeBlood": 8, "redBloodCells": 12, "platelets": 4, "plasma": 4 } },
    { "bloodGroup": "AB-", "total": 3, "components": { "wholeBlood": 1, "redBloodCells": 1, "platelets": 0, "plasma": 1 } }
  ]
}</code></pre>
  </div>
</div>
`
};
