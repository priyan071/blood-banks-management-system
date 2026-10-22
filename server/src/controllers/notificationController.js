const Notification = require('../models/Notification');
const Donor = require('../models/Donor');
const User = require('../models/User');
const emailService = require('../utils/emailService');

// @desc    Get notification history
// @route   GET /api/notifications
// @access  Private
exports.getNotifications = async (req, res, next) => {
  try {
    const { type, role, limit = 50 } = req.query;

    const filter = {};
    if (type) filter.type = type;
    if (role) filter.recipientRole = role;

    // Non-admin users only see their own email notifications
    if (req.user && req.user.role !== 'admin') {
      filter.recipientEmail = req.user.email;
    }

    const notifications = await Notification.find(filter)
      .sort({ createdAt: -1 })
      .limit(Number(limit));

    const total = await Notification.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: notifications.length,
      total,
      notifications,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Send a test email
// @route   POST /api/notifications/test
// @access  Private (Admin)
exports.sendTestEmail = async (req, res, next) => {
  try {
    const { to, subject, message } = req.body;
    const targetEmail = to || req.user.email;

    const result = await emailService.sendCustomTestEmail({
      to: targetEmail,
      subject: subject || 'HemoVault Email Notification Test',
      message: message || 'Your HemoVault notification system is active and running cleanly.',
      recipientName: req.user.name || 'HemoVault User',
    });

    res.status(200).json({
      success: true,
      message: `Email dispatched to ${targetEmail}`,
      result,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Broadcast emergency donor call for a specific blood group
// @route   POST /api/notifications/broadcast-donor-call
// @access  Private (Admin)
exports.broadcastDonorCall = async (req, res, next) => {
  try {
    const { bloodGroup, unitsNeeded = 3, hospitalName = 'Easwari General Hospital' } = req.body;

    if (!bloodGroup) {
      return res.status(400).json({ success: false, message: 'Blood group is required' });
    }

    // Find donors with matching blood group
    const donors = await Donor.find({
      bloodGroup,
      status: 'ACTIVE',
    }).populate('user', 'email name');

    let sentCount = 0;
    const errors = [];

    // Also include admin or user themselves if no donors found in mock DB
    const recipients = donors.map((d) => ({
      name: d.name || (d.user && d.user.name) || 'Registered Hero Donor',
      email: d.email || (d.user && d.user.email),
    })).filter((r) => !!r.email);

    if (recipients.length === 0 && req.user && req.user.email) {
      recipients.push({ name: req.user.name, email: req.user.email });
    }

    for (const recipient of recipients) {
      try {
        await emailService.sendUrgentDonorCall({
          donorEmail: recipient.email,
          donorName: recipient.name,
          bloodGroup,
          unitsNeeded,
          hospitalName,
        });
        sentCount++;
      } catch (err) {
        errors.push({ email: recipient.email, error: err.message });
      }
    }

    res.status(200).json({
      success: true,
      message: `Urgent donor broadcast sent to ${sentCount} donor(s) for ${bloodGroup}`,
      sentCount,
      recipientsCount: recipients.length,
      errors,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get notification stats
// @route   GET /api/notifications/stats
// @access  Private
exports.getNotificationStats = async (req, res, next) => {
  try {
    const totalSent = await Notification.countDocuments({ status: 'DELIVERED' });
    const totalFailed = await Notification.countDocuments({ status: 'FAILED' });

    const byType = await Notification.aggregate([
      { $group: { _id: '$type', count: { $sum: 1 } } },
    ]);

    res.status(200).json({
      success: true,
      stats: {
        totalSent,
        totalFailed,
        byType: byType.reduce((acc, curr) => {
          acc[curr._id] = curr.count;
          return acc;
        }, {}),
      },
    });
  } catch (err) {
    next(err);
  }
};
