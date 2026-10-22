const express = require('express');
const router = express.Router();
const {
  getNotifications,
  sendTestEmail,
  broadcastDonorCall,
  getNotificationStats,
} = require('../controllers/notificationController');
const { protect, authorize } = require('../middleware/auth');

// All routes require authentication
router.use(protect);

router.get('/', getNotifications);
router.get('/stats', getNotificationStats);
router.post('/test', authorize('admin'), sendTestEmail);
router.post('/broadcast-donor-call', authorize('admin'), broadcastDonorCall);

module.exports = router;
