const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: String,
      required: true,
      trim: true,
    },
    recipientEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    recipientRole: {
      type: String,
      enum: ['admin', 'donor', 'requester', 'all', 'system'],
      default: 'system',
    },
    type: {
      type: String,
      enum: [
        'EMERGENCY_REQUEST_RECEIVED',
        'REQUEST_APPROVED',
        'REQUEST_REJECTED',
        'APPOINTMENT_CONFIRMED',
        'APPOINTMENT_UPDATED',
        'TEST_COMPLETED',
        'LOW_STOCK_ALERT',
        'URGENT_DONOR_CALL',
        'CUSTOM_TEST',
      ],
      required: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['DELIVERED', 'SIMULATED', 'FAILED'],
      default: 'DELIVERED',
    },
    previewUrl: {
      type: String,
      default: null,
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Notification', notificationSchema);
