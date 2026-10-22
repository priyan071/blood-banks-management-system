const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { connectDB } = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const User = require('./models/User');
const { seedData } = require('./seeds/seed.js');

// Import routes
const authRoutes = require('./routes/authRoutes');
const donorRoutes = require('./routes/donorRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const testingRoutes = require('./routes/testingRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const requestRoutes = require('./routes/requestRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const reportRoutes = require('./routes/reportRoutes');

const app = express();

// Middleware
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  })
);
app.use(express.json());
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Health check data helper
const getHealthData = () => {
  const dbState = mongoose.connection.readyState;
  const dbStatusMap = { 0: 'disconnected', 1: 'connected', 2: 'connecting', 3: 'disconnecting' };

  return {
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'Blood Bank Management System API',
    institution: 'Easwari Engineering College - CSE (AIML)',
    author: 'Priyan R (310624148072)',
    database: {
      status: dbStatusMap[dbState] || 'unknown',
      connected: dbState === 1,
    },
    uptime: `${Math.floor(process.uptime())}s`,
    environment: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 5001,
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      donors: '/api/donors',
      appointments: '/api/appointments',
      tests: '/api/tests',
      inventory: '/api/inventory',
      requests: '/api/requests',
      transactions: '/api/transactions',
      dashboard: '/api/dashboard',
      reports: '/api/reports',
    },
  };
};

const healthHandler = (req, res) => {
  const data = getHealthData();
  if (req.accepts('html') && !req.accepts('json')) {
    return res.status(200).send(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>HemoVault API - Status: Online</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #0b0f19; color: #f3f4f6; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 20px; box-sizing: border-box; }
            .card { background: #111827; border: 1px solid #1f2937; border-radius: 12px; padding: 32px; max-width: 600px; width: 100%; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.5); }
            .badge { display: inline-flex; align-items: center; gap: 6px; padding: 4px 12px; border-radius: 9999px; font-size: 13px; font-weight: 600; background: #064e3b; color: #34d399; }
            .dot { width: 8px; height: 8px; border-radius: 50%; background: #10b981; }
            h1 { font-size: 22px; margin: 16px 0 8px; color: #fff; }
            p { margin: 4px 0; color: #9ca3af; font-size: 14px; }
            .meta { margin-top: 20px; padding-top: 16px; border-top: 1px solid #1f2937; display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-size: 13px; }
            .meta span { color: #6b7280; }
            .meta strong { color: #e5e7eb; }
            a { color: #f87171; text-decoration: none; font-weight: 500; }
            a:hover { text-decoration: underline; }
            pre { background: #030712; padding: 12px; border-radius: 8px; font-size: 12px; overflow-x: auto; color: #a7f3d0; margin-top: 16px; border: 1px solid #1f2937; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="badge"><div class="dot"></div> API ONLINE</div>
            <h1>HemoVault Blood Bank API</h1>
            <p>${data.institution}</p>
            <p>Author: <strong>${data.author}</strong></p>
            <div class="meta">
              <div><span>Database:</span> <strong>${data.database.status.toUpperCase()}</strong></div>
              <div><span>Uptime:</span> <strong>${data.uptime}</strong></div>
              <div><span>Port:</span> <strong>${data.port}</strong></div>
              <div><span>Frontend App:</span> <a href="http://localhost:5173" target="_blank">http://localhost:5173</a></div>
            </div>
            <pre>${JSON.stringify(data, null, 2)}</pre>
          </div>
        </body>
      </html>
    `);
  }
  return res.status(200).json(data);
};

// Health check and root API endpoints
app.get('/', healthHandler);
app.get('/health', healthHandler);
app.get('/api', healthHandler);
app.get('/api/health', healthHandler);
app.get('/api/status', healthHandler);

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/donors', donorRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/tests', testingRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/reports', reportRoutes);

// Error Handling Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5001;

// Start server and initialize database
async function startServer() {
  try {
    await connectDB();

    // Auto-seed if database has 0 users
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log('[Server] Database is empty. Running initial demonstration seeder...');
      await seedData(true);
    }

    const server = app.listen(PORT, '0.0.0.0', () => {
      console.log(`[BloodBank API] Server running in ${process.env.NODE_ENV || 'development'} mode on http://localhost:${PORT}`);
    });

    return server;
  } catch (err) {
    console.error('[BloodBank API] Server failed to start:', err);
    process.exit(1);
  }
}

if (require.main === module) {
  startServer();
}

module.exports = { app, startServer };
