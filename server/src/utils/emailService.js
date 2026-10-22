const nodemailer = require('nodemailer');
const Notification = require('../models/Notification');

let transporter = null;
let isEthereal = false;

// Initialize Transporter
async function getTransporter() {
  if (transporter) return transporter;

  // Check if real SMTP credentials are provided in env
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    console.log('[EmailService] Configured custom SMTP transporter for:', process.env.SMTP_USER);
    return transporter;
  }

  // Fallback: Create test Ethereal account for development/demo
  try {
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
    isEthereal = true;
    console.log('[EmailService] Using simulated Ethereal test transporter:', testAccount.user);
    return transporter;
  } catch (err) {
    console.warn('[EmailService] Ethereal init failed, falling back to JSON mock stream:', err.message);
    transporter = nodemailer.createTransport({
      jsonTransport: true,
    });
    return transporter;
  }
}

// Reusable branded email layout wrapper
function renderTemplate({ title, subtitle, contentHtml, footerText }) {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${title}</title>
      <style>
        body { margin:0; padding:0; background-color:#0b0f19; font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; color:#e2e8f0; }
        .wrapper { width:100%; max-width:600px; margin:24px auto; background-color:#111827; border:1px solid #1f2937; border-radius:16px; overflow:hidden; box-shadow:0 20px 40px rgba(0,0,0,0.5); }
        .header { background:linear-gradient(135deg, #b91c1c 0%, #7f1d1d 100%); padding:28px; text-align:center; }
        .logo { font-size:24px; font-weight:800; color:#ffffff; letter-spacing:-0.5px; margin:0; }
        .sublogo { font-size:13px; color:#fca5a5; margin-top:4px; font-weight:500; }
        .body { padding:32px 28px; }
        .headline { font-size:20px; font-weight:700; color:#ffffff; margin:0 0 12px 0; }
        .subline { font-size:14px; color:#94a3b8; margin:0 0 24px 0; line-height:1.5; }
        .box { background-color:#1e293b; border:1px solid #334155; border-radius:12px; padding:20px; margin:20px 0; }
        .badge { display:inline-block; padding:4px 12px; border-radius:9999px; font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:0.5px; }
        .badge-red { background:#fee2e2; color:#991b1b; }
        .badge-green { background:#dcfce7; color:#166534; }
        .badge-amber { background:#fef3c7; color:#92400e; }
        .info-row { display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid #334155; font-size:14px; }
        .info-label { color:#94a3b8; font-weight:500; }
        .info-val { color:#f8fafc; font-weight:600; }
        .btn { display:inline-block; background-color:#dc2626; color:#ffffff !important; font-weight:700; font-size:14px; text-decoration:none; padding:12px 28px; border-radius:8px; margin-top:20px; box-shadow:0 4px 12px rgba(220,38,38,0.4); text-align:center; }
        .footer { padding:20px 28px; background-color:#0b0f19; border-top:1px solid #1f2937; text-align:center; font-size:12px; color:#64748b; line-height:1.6; }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="header">
          <div class="logo">🩸 HEMOVAULT</div>
          <div class="sublogo">Blood Bank Management & Emergency Response Network</div>
        </div>
        <div class="body">
          <h2 class="headline">${title}</h2>
          ${subtitle ? `<p class="subline">${subtitle}</p>` : ''}
          ${contentHtml}
        </div>
        <div class="footer">
          ${footerText || 'Easwari Engineering College · Department of CSE (AIML) · Emergency Helpline: 1800-BLOOD-HELP'}
          <br />You are receiving this notification because you are a registered user/donor in HemoVault.
        </div>
      </div>
    </body>
  </html>
  `;
}

// Low-level dispatcher
async function dispatchEmail({ to, subject, html, text, type, recipientName, recipientRole = 'system', metadata = {} }) {
  try {
    const mailer = await getTransporter();
    const fromAddress = process.env.EMAIL_FROM || '"HemoVault Blood Bank" <notifications@hemovault.org>';

    const info = await mailer.sendMail({
      from: fromAddress,
      to,
      subject,
      text: text || subject,
      html,
    });

    let previewUrl = null;
    if (isEthereal && info.messageId) {
      previewUrl = nodemailer.getTestMessageUrl(info);
      console.log(`[EmailService] Preview URL for "${subject}":`, previewUrl);
    }

    // Persist to Notification history
    const notification = await Notification.create({
      recipient: recipientName || to,
      recipientEmail: to,
      recipientRole,
      type,
      subject,
      message: text || subject,
      status: 'DELIVERED',
      previewUrl: previewUrl || null,
      metadata,
    });

    return {
      success: true,
      messageId: info.messageId,
      previewUrl,
      notification,
    };
  } catch (error) {
    console.error('[EmailService] Failed to send email:', error.message);
    try {
      await Notification.create({
        recipient: recipientName || to,
        recipientEmail: to,
        recipientRole,
        type,
        subject,
        message: text || subject,
        status: 'FAILED',
        metadata: { ...metadata, error: error.message },
      });
    } catch (_) {}

    return { success: false, error: error.message };
  }
}

// Workflow 1: Emergency Blood Request Created (Sent to Requester / Hospital)
async function sendEmergencyRequestReceived({
  requesterEmail,
  requesterName,
  patientName,
  bloodGroup,
  units,
  hospitalName,
  urgency,
  requestId,
}) {
  const subject = `[URGENT] Blood Request Registered - ${units} Unit(s) of ${bloodGroup}`;
  const html = renderTemplate({
    title: 'Emergency Blood Request Registered',
    subtitle: `Hello ${requesterName || 'Partner Hospital'}, your emergency request has been placed in our priority queue.`,
    contentHtml: `
      <div class="box">
        <div style="margin-bottom:12px;">
          <span class="badge ${urgency === 'CRITICAL' ? 'badge-red' : 'badge-amber'}">${urgency || 'HIGH'} PRIORITY</span>
        </div>
        <table width="100%" cellpadding="6" style="border-collapse:collapse; font-size:14px;">
          <tr><td style="color:#94a3b8;">Patient Name</td><td style="color:#fff; font-weight:700;">${patientName}</td></tr>
          <tr><td style="color:#94a3b8;">Blood Group</td><td style="color:#ef4444; font-weight:800; font-size:16px;">${bloodGroup}</td></tr>
          <tr><td style="color:#94a3b8;">Units Required</td><td style="color:#fff; font-weight:700;">${units} Units</td></tr>
          <tr><td style="color:#94a3b8;">Destination Hospital</td><td style="color:#fff;">${hospitalName}</td></tr>
          <tr><td style="color:#94a3b8;">Request Reference</td><td style="color:#60a5fa; font-family:monospace;">${requestId || 'REQ-' + Date.now()}</td></tr>
        </table>
      </div>
      <p style="font-size:13px; color:#cbd5e1; line-height:1.6;">
        Our blood transfusion officers and automated inventory dispatch system are reviewing available tested inventory units. You will receive an instant notification as soon as matching units are dispatched.
      </p>
    `,
  });

  return dispatchEmail({
    to: requesterEmail,
    subject,
    html,
    text: `Your emergency request for ${units} units of ${bloodGroup} for patient ${patientName} has been received.`,
    type: 'EMERGENCY_REQUEST_RECEIVED',
    recipientName: requesterName,
    recipientRole: 'requester',
    metadata: { patientName, bloodGroup, units, hospitalName, urgency, requestId },
  });
}

// Workflow 2: Request Approved / Dispatched
async function sendRequestStatusUpdate({
  requesterEmail,
  requesterName,
  patientName,
  bloodGroup,
  units,
  status,
  allocatedUnits = [],
  hospitalName,
}) {
  const isApproved = status === 'APPROVED';
  const subject = isApproved
    ? `✅ Blood Request Approved & Units Allocated - ${bloodGroup}`
    : `❌ Blood Request Status Update - ${bloodGroup}`;

  const html = renderTemplate({
    title: isApproved ? 'Blood Units Dispatched & Allocated' : 'Blood Request Update',
    subtitle: `Hello ${requesterName}, update regarding emergency blood requisition for ${patientName}.`,
    contentHtml: `
      <div class="box">
        <div style="margin-bottom:12px;">
          <span class="badge ${isApproved ? 'badge-green' : 'badge-red'}">${status}</span>
        </div>
        <p style="margin:0 0 12px 0; color:#e2e8f0; font-size:14px;">
          ${
            isApproved
              ? `We have successfully allocated <strong>${units} Unit(s)</strong> of tested and certified safe <strong>${bloodGroup}</strong> blood.`
              : `Unfortunately, the requisition could not be fulfilled at this moment.`
          }
        </p>
        ${
          allocatedUnits && allocatedUnits.length > 0
            ? `
          <div style="margin-top:14px; background:#0f172a; padding:12px; border-radius:8px;">
            <div style="font-size:12px; color:#94a3b8; font-weight:700; margin-bottom:6px;">ALLOCATED BARCODES / SERIALS:</div>
            ${allocatedUnits
              .map(
                (u) =>
                  `<div style="font-family:monospace; color:#34d399; font-size:13px; padding:3px 0;">📦 ${
                    u.unitSerialNumber || u
                  } (${bloodGroup})</div>`
              )
              .join('')}
          </div>
        `
            : ''
        }
      </div>
      <p style="font-size:13px; color:#94a3b8;">
        Pickup / Delivery Center: <strong>Easwari Blood Transfusion Center, Ramapuram, Chennai</strong>. Contact +91 44 2249 0100 for ambulance coordination.
      </p>
    `,
  });

  return dispatchEmail({
    to: requesterEmail,
    subject,
    html,
    text: `Request for ${patientName} (${bloodGroup}) has been ${status}.`,
    type: isApproved ? 'REQUEST_APPROVED' : 'REQUEST_REJECTED',
    recipientName: requesterName,
    recipientRole: 'requester',
    metadata: { patientName, bloodGroup, units, status, allocatedUnits, hospitalName },
  });
}

// Workflow 3: Appointment Confirmed (Sent to Donor)
async function sendAppointmentConfirmation({
  donorEmail,
  donorName,
  appointmentDate,
  timeSlot,
  centerName = 'Easwari Blood Transfusion Center',
  address = 'Ramapuram, Chennai - 600089',
}) {
  const formattedDate = new Date(appointmentDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const subject = `🩸 Blood Donation Appointment Confirmed - ${formattedDate}`;
  const html = renderTemplate({
    title: 'Your Donation Appointment is Confirmed!',
    subtitle: `Thank you, ${donorName}. You are helping save up to 3 precious lives!`,
    contentHtml: `
      <div class="box">
        <table width="100%" cellpadding="6" style="border-collapse:collapse; font-size:14px;">
          <tr><td style="color:#94a3b8;">Date</td><td style="color:#fff; font-weight:700;">${formattedDate}</td></tr>
          <tr><td style="color:#94a3b8;">Time Slot</td><td style="color:#38bdf8; font-weight:700;">${timeSlot}</td></tr>
          <tr><td style="color:#94a3b8;">Location</td><td style="color:#fff; font-weight:600;">${centerName}</td></tr>
          <tr><td style="color:#94a3b8;">Address</td><td style="color:#94a3b8; font-size:12px;">${address}</td></tr>
        </table>
      </div>
      <div style="background:#0f172a; border-radius:10px; padding:16px; margin-top:16px; font-size:13px; color:#cbd5e1;">
        <strong style="color:#f87171;">💡 Tips Before Donating:</strong>
        <ul style="margin:8px 0 0 16px; padding:0; line-height:1.7;">
          <li>Drink at least 500ml of water before your appointment</li>
          <li>Eat a healthy, light meal 1-2 hours prior</li>
          <li>Get a solid 7-8 hours of sleep the night before</li>
          <li>Bring a government-issued photo ID (Aadhaar / Voter ID / Driving License)</li>
        </ul>
      </div>
    `,
  });

  return dispatchEmail({
    to: donorEmail,
    subject,
    html,
    text: `Your donation appointment is scheduled for ${formattedDate} at ${timeSlot} at ${centerName}.`,
    type: 'APPOINTMENT_CONFIRMED',
    recipientName: donorName,
    recipientRole: 'donor',
    metadata: { appointmentDate, timeSlot, centerName },
  });
}

// Workflow 4: Blood Test Completed & Certified (Sent to Donor)
async function sendTestResultsNotification({
  donorEmail,
  donorName,
  bloodGroup,
  unitSerialNumber,
  resultStatus,
}) {
  const isPassed = resultStatus === 'PASSED';
  const subject = isPassed
    ? `🌟 Your Donated Blood Has Been Certified & Added to Inventory!`
    : `HemoVault: Important Update on Your Recent Blood Donation`;

  const html = renderTemplate({
    title: isPassed ? 'Your Blood Unit is Certified Safe!' : 'Blood Test Notice',
    subtitle: `Hello ${donorName}, here is the laboratory diagnostic report for your recent blood donation.`,
    contentHtml: `
      <div class="box">
        <div style="margin-bottom:10px;">
          <span class="badge ${isPassed ? 'badge-green' : 'badge-red'}">LAB STATUS: ${resultStatus}</span>
        </div>
        <p style="font-size:14px; color:#e2e8f0; line-height:1.6;">
          ${
            isPassed
              ? `Your blood sample (Serial: <code style="color:#34d399;">${unitSerialNumber}</code>, Group: <strong>${bloodGroup}</strong>) passed all mandatory screenings for HIV, Hepatitis B/C, Syphilis, and Malaria. It is now safely in stock and ready to save a life.`
              : `Your recent sample was flagged during standard serological testing. Our medical counselor will reach out for a private consultation.`
          }
        </p>
      </div>
    `,
  });

  return dispatchEmail({
    to: donorEmail,
    subject,
    html,
    text: `Blood test result for unit ${unitSerialNumber} (${bloodGroup}): ${resultStatus}`,
    type: 'TEST_COMPLETED',
    recipientName: donorName,
    recipientRole: 'donor',
    metadata: { bloodGroup, unitSerialNumber, resultStatus },
  });
}

// Workflow 5: Low Stock Alert (Sent to Admin / Clinical Officers)
async function sendLowStockAlert({ adminEmail, bloodGroup, currentUnits, threshold = 5 }) {
  const subject = `⚠️ LOW STOCK ALERT: ${bloodGroup} Blood Reserves Critical (${currentUnits} units)`;
  const html = renderTemplate({
    title: 'Blood Inventory Low Stock Warning',
    subtitle: 'Automated inventory monitoring detected critically low blood units.',
    contentHtml: `
      <div class="box">
        <span class="badge badge-red">CRITICAL STOCK</span>
        <div style="font-size:24px; font-weight:800; color:#ef4444; margin:12px 0 6px 0;">
          ${bloodGroup}: Only ${currentUnits} Unit(s) Left
        </div>
        <p style="font-size:13px; color:#94a3b8; margin:0;">
          Current inventory of <strong>${bloodGroup}</strong> has dropped below the minimum reserve threshold of ${threshold} units. Immediate donor camp or emergency donor recall is advised.
        </p>
      </div>
    `,
  });

  return dispatchEmail({
    to: adminEmail || 'admin@hemovault.org',
    subject,
    html,
    text: `Low stock alert: ${bloodGroup} currently has only ${currentUnits} units remaining.`,
    type: 'LOW_STOCK_ALERT',
    recipientName: 'Blood Bank Administrator',
    recipientRole: 'admin',
    metadata: { bloodGroup, currentUnits, threshold },
  });
}

// Workflow 6: Broadcast Urgent Donor Call
async function sendUrgentDonorCall({
  donorEmail,
  donorName,
  bloodGroup,
  unitsNeeded = 3,
  hospitalName = 'Emergency Ward - Chennai',
}) {
  const subject = `🚨 URGENT CALL: Blood Group ${bloodGroup} Urgently Needed in Chennai!`;
  const html = renderTemplate({
    title: `Urgent Donor Request: ${bloodGroup}`,
    subtitle: `Dear ${donorName}, an urgent emergency needs donors with your blood type right now.`,
    contentHtml: `
      <div class="box">
        <span class="badge badge-red">EMERGENCY DONOR CALL</span>
        <div style="font-size:20px; font-weight:800; color:#ef4444; margin:12px 0 8px 0;">
          ${unitsNeeded} Units of ${bloodGroup} Needed
        </div>
        <p style="font-size:14px; color:#e2e8f0; line-height:1.6;">
          An emergency request was lodged at <strong>${hospitalName}</strong> requiring <strong>${bloodGroup}</strong> blood. As a registered, eligible hero in our database, your donation can directly save a life today.
        </p>
      </div>
      <p style="text-align:center;">
        <a href="http://localhost:5173/donor/book" class="btn">Book Donation Appointment Now</a>
      </p>
    `,
  });

  return dispatchEmail({
    to: donorEmail,
    subject,
    html,
    text: `Urgent donor call: ${bloodGroup} needed at ${hospitalName}. Please schedule an appointment.`,
    type: 'URGENT_DONOR_CALL',
    recipientName: donorName,
    recipientRole: 'donor',
    metadata: { bloodGroup, unitsNeeded, hospitalName },
  });
}

// Workflow 7: Custom Test Email (from Notification Center UI)
async function sendCustomTestEmail({ to, subject, message, recipientName }) {
  const emailSubject = subject || 'HemoVault Email System Verification';
  const html = renderTemplate({
    title: emailSubject,
    subtitle: 'Automated Email Verification Dispatch',
    contentHtml: `
      <div class="box">
        <span class="badge badge-green">SYSTEM VERIFIED</span>
        <p style="margin:12px 0; font-size:14px; color:#f8fafc; line-height:1.6;">
          ${message || 'This is a test notification confirming that the HemoVault email and notification subsystem is operating at 100% capacity.'}
        </p>
      </div>
      <div style="font-size:12px; color:#64748b;">
        Timestamp: ${new Date().toISOString()} · Engine: Nodemailer SMTP
      </div>
    `,
  });

  return dispatchEmail({
    to,
    subject: emailSubject,
    html,
    text: message || 'HemoVault email test succeeded.',
    type: 'CUSTOM_TEST',
    recipientName: recipientName || to,
    recipientRole: 'admin',
    metadata: { test: true },
  });
}

module.exports = {
  dispatchEmail,
  sendEmergencyRequestReceived,
  sendRequestStatusUpdate,
  sendAppointmentConfirmation,
  sendTestResultsNotification,
  sendLowStockAlert,
  sendUrgentDonorCall,
  sendCustomTestEmail,
};
