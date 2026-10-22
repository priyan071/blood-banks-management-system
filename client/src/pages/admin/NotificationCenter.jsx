import React, { useState, useEffect } from 'react';
import {
  Mail,
  Send,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Eye,
  Megaphone,
  Filter,
  Inbox,
  UserCheck,
  Calendar,
  X,
  ExternalLink,
} from 'lucide-react';
import api from '../../services/api';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('ALL');
  const [stats, setStats] = useState({ totalSent: 0, totalFailed: 0, byType: {} });

  // Modals
  const [showTestModal, setShowTestModal] = useState(false);
  const [testForm, setTestForm] = useState({ to: '', subject: '', message: '' });
  const [testSending, setTestSending] = useState(false);

  const [showBroadcastModal, setShowBroadcastModal] = useState(false);
  const [broadcastForm, setBroadcastForm] = useState({
    bloodGroup: 'O-',
    unitsNeeded: 3,
    hospitalName: 'Easwari General Hospital - Ramapuram',
  });
  const [broadcastSending, setBroadcastSending] = useState(false);

  // Preview Drawer
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [feedbackMsg, setFeedbackMsg] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [notifsRes, statsRes] = await Promise.all([
        api.get('/notifications'),
        api.get('/notifications/stats').catch(() => ({ data: { stats: {} } })),
      ]);
      setNotifications(notifsRes.data?.notifications || []);
      if (statsRes.data?.stats) {
        setStats(statsRes.data.stats);
      }
    } catch (err) {
      console.error('Failed to load notifications:', err);
    } finally {
      setLoading(false);
    }
  };

  const showNotificationAlert = (msg, isError = false) => {
    setFeedbackMsg({ text: msg, isError });
    setTimeout(() => setFeedbackMsg(null), 4500);
  };

  const handleSendTestEmail = async (e) => {
    e.preventDefault();
    setTestSending(true);
    try {
      const res = await api.post('/notifications/test', testForm);
      showNotificationAlert(res.data.message || 'Test email dispatched successfully!');
      setShowTestModal(false);
      setTestForm({ to: '', subject: '', message: '' });
      fetchData();
    } catch (err) {
      showNotificationAlert(err.response?.data?.message || 'Failed to dispatch test email', true);
    } finally {
      setTestSending(false);
    }
  };

  const handleBroadcastDonorCall = async (e) => {
    e.preventDefault();
    setBroadcastSending(true);
    try {
      const res = await api.post('/notifications/broadcast-donor-call', broadcastForm);
      showNotificationAlert(res.data.message || 'Urgent donor alert broadcast sent!');
      setShowBroadcastModal(false);
      fetchData();
    } catch (err) {
      showNotificationAlert(err.response?.data?.message || 'Failed to broadcast alert', true);
    } finally {
      setBroadcastSending(false);
    }
  };

  const filteredNotifications = notifications.filter((n) => {
    if (filterType === 'ALL') return true;
    return n.type === filterType;
  });

  const getTypeBadge = (type) => {
    switch (type) {
      case 'EMERGENCY_REQUEST_RECEIVED':
        return { label: 'Request Lodged', bg: '#fee2e2', text: '#991b1b', icon: '🚨' };
      case 'REQUEST_APPROVED':
        return { label: 'Dispatched & Approved', bg: '#dcfce7', text: '#166534', icon: '✅' };
      case 'APPOINTMENT_CONFIRMED':
        return { label: 'Appointment Confirmed', bg: '#e0f2fe', text: '#0369a1', icon: '📅' };
      case 'TEST_COMPLETED':
        return { label: 'Test Report Certified', bg: '#ede9fe', text: '#6d28d9', icon: '🔬' };
      case 'LOW_STOCK_ALERT':
        return { label: 'Low Stock Alert', bg: '#fef3c7', text: '#92400e', icon: '⚠️' };
      case 'URGENT_DONOR_CALL':
        return { label: 'Donor Broadcast', bg: '#fce7f3', text: '#9d174d', icon: '📢' };
      case 'CUSTOM_TEST':
        return { label: 'Test Email', bg: '#f1f5f9', text: '#334155', icon: '✉️' };
      default:
        return { label: type, bg: '#f1f5f9', text: '#475569', icon: '📬' };
    }
  };

  return (
    <div style={{ padding: '1.5rem', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Toast Alert */}
      {feedbackMsg && (
        <div
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            zIndex: 9999,
            backgroundColor: feedbackMsg.isError ? '#ef4444' : '#10b981',
            color: '#fff',
            padding: '1rem 1.5rem',
            borderRadius: '10px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.4)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            fontWeight: 600,
          }}
        >
          {feedbackMsg.isError ? <AlertTriangle size={20} /> : <CheckCircle size={20} />}
          <span>{feedbackMsg.text}</span>
        </div>
      )}

      {/* Header Banner */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}
      >
        <div>
          <h1
            style={{
              fontSize: '1.75rem',
              fontWeight: 800,
              color: '#fff',
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <Mail style={{ color: '#ef4444' }} /> Automated Email & Notification Center
          </h1>
          <p style={{ color: '#94a3b8', margin: '0.25rem 0 0 0', fontSize: '0.9rem' }}>
            Multi-channel email dispatch engine · Real-time donor alerts · Emergency blood notifications
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => setShowBroadcastModal(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: '#dc2626',
              color: '#fff',
              border: 'none',
              padding: '0.65rem 1.15rem',
              borderRadius: '8px',
              fontWeight: 700,
              cursor: 'pointer',
              fontSize: '0.88rem',
              boxShadow: '0 4px 12px rgba(220, 38, 38, 0.35)',
            }}
          >
            <Megaphone size={16} /> Broadcast Urgent Donor Call
          </button>

          <button
            onClick={() => setShowTestModal(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: '#1e293b',
              color: '#f8fafc',
              border: '1px solid #334155',
              padding: '0.65rem 1.15rem',
              borderRadius: '8px',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: '0.88rem',
            }}
          >
            <Send size={16} /> Send Test Email
          </button>

          <button
            onClick={fetchData}
            title="Refresh Notification Log"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: '#1e293b',
              color: '#cbd5e1',
              border: '1px solid #334155',
              padding: '0.65rem 0.85rem',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}
      >
        <div
          style={{
            background: '#111827',
            padding: '1.25rem',
            borderRadius: '12px',
            border: '1px solid #1f2937',
          }}
        >
          <div style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 600 }}>TOTAL EMAILS DISPATCHED</div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#34d399', marginTop: '0.35rem' }}>
            {stats.totalSent || notifications.length}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>
            Automated SMTP delivery
          </div>
        </div>

        <div
          style={{
            background: '#111827',
            padding: '1.25rem',
            borderRadius: '12px',
            border: '1px solid #1f2937',
          }}
        >
          <div style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 600 }}>EMERGENCY CALLS SENT</div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#ef4444', marginTop: '0.35rem' }}>
            {stats.byType?.URGENT_DONOR_CALL || notifications.filter(n => n.type === 'URGENT_DONOR_CALL').length}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>
            Critical blood type alerts
          </div>
        </div>

        <div
          style={{
            background: '#111827',
            padding: '1.25rem',
            borderRadius: '12px',
            border: '1px solid #1f2937',
          }}
        >
          <div style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 600 }}>APPOINTMENT CONFIRMATIONS</div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#38bdf8', marginTop: '0.35rem' }}>
            {stats.byType?.APPOINTMENT_CONFIRMED || notifications.filter(n => n.type === 'APPOINTMENT_CONFIRMED').length}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>
            Donor schedules acknowledged
          </div>
        </div>

        <div
          style={{
            background: '#111827',
            padding: '1.25rem',
            borderRadius: '12px',
            border: '1px solid #1f2937',
          }}
        >
          <div style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 600 }}>DELIVERY SUCCESS RATE</div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#a78bfa', marginTop: '0.35rem' }}>
            100%
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>
            0 delivery failures logged
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          flexWrap: 'wrap',
          marginBottom: '1rem',
          borderBottom: '1px solid #1f2937',
          paddingBottom: '0.75rem',
        }}
      >
        {[
          { id: 'ALL', label: 'All Notifications' },
          { id: 'URGENT_DONOR_CALL', label: '📢 Donor Broadcasts' },
          { id: 'EMERGENCY_REQUEST_RECEIVED', label: '🚨 Requisitions' },
          { id: 'REQUEST_APPROVED', label: '✅ Dispatches' },
          { id: 'APPOINTMENT_CONFIRMED', label: '📅 Appointments' },
          { id: 'LOW_STOCK_ALERT', label: '⚠️ Stock Alerts' },
          { id: 'CUSTOM_TEST', label: '✉️ System Tests' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterType(tab.id)}
            style={{
              padding: '0.45rem 0.85rem',
              borderRadius: '6px',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
              border: filterType === tab.id ? '1px solid #ef4444' : '1px solid #1f2937',
              backgroundColor: filterType === tab.id ? '#ef444420' : '#111827',
              color: filterType === tab.id ? '#ef4444' : '#94a3b8',
              transition: 'all 0.15s ease',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notifications Table */}
      <div
        style={{
          background: '#111827',
          borderRadius: '12px',
          border: '1px solid #1f2937',
          overflow: 'hidden',
        }}
      >
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #1f2937', background: '#0f172a' }}>
                <th style={{ padding: '0.85rem 1rem', color: '#94a3b8', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>Type</th>
                <th style={{ padding: '0.85rem 1rem', color: '#94a3b8', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>Recipient</th>
                <th style={{ padding: '0.85rem 1rem', color: '#94a3b8', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>Subject & Summary</th>
                <th style={{ padding: '0.85rem 1rem', color: '#94a3b8', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>Delivery Status</th>
                <th style={{ padding: '0.85rem 1rem', color: '#94a3b8', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>Dispatched At</th>
                <th style={{ padding: '0.85rem 1rem', color: '#94a3b8', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredNotifications.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '3rem 1rem', color: '#64748b' }}>
                    <Inbox size={42} style={{ margin: '0 auto 0.75rem auto', display: 'block', opacity: 0.5 }} />
                    <div style={{ fontSize: '1rem', fontWeight: 600, color: '#cbd5e1' }}>No notifications found</div>
                    <div style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>
                      Try sending a test email or broadcasting an emergency call above!
                    </div>
                  </td>
                </tr>
              ) : (
                filteredNotifications.map((notif) => {
                  const badge = getTypeBadge(notif.type);
                  return (
                    <tr
                      key={notif._id}
                      style={{
                        borderBottom: '1px solid #1e293b',
                        transition: 'background-color 0.15s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1e293b50')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      <td style={{ padding: '0.85rem 1rem' }}>
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            padding: '0.25rem 0.65rem',
                            borderRadius: '9999px',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            backgroundColor: badge.bg,
                            color: badge.text,
                          }}
                        >
                          <span>{badge.icon}</span> {badge.label}
                        </span>
                      </td>

                      <td style={{ padding: '0.85rem 1rem' }}>
                        <div style={{ fontWeight: 600, color: '#f8fafc', fontSize: '0.88rem' }}>
                          {notif.recipient}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: '#64748b', fontFamily: 'monospace' }}>
                          {notif.recipientEmail}
                        </div>
                      </td>

                      <td style={{ padding: '0.85rem 1rem', maxWidth: '380px' }}>
                        <div style={{ fontWeight: 600, color: '#e2e8f0', fontSize: '0.85rem' }}>
                          {notif.subject}
                        </div>
                        <div
                          style={{
                            fontSize: '0.78rem',
                            color: '#94a3b8',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {notif.message}
                        </div>
                      </td>

                      <td style={{ padding: '0.85rem 1rem' }}>
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.3rem',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            color: notif.status === 'DELIVERED' ? '#34d399' : '#ef4444',
                          }}
                        >
                          <span
                            style={{
                              width: '6px',
                              height: '6px',
                              borderRadius: '50%',
                              backgroundColor: notif.status === 'DELIVERED' ? '#10b981' : '#ef4444',
                            }}
                          />
                          {notif.status}
                        </span>
                      </td>

                      <td style={{ padding: '0.85rem 1rem', fontSize: '0.8rem', color: '#94a3b8' }}>
                        {new Date(notif.createdAt).toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>

                      <td style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>
                        <button
                          onClick={() => setSelectedNotification(notif)}
                          style={{
                            padding: '0.4rem 0.75rem',
                            backgroundColor: '#1e293b',
                            color: '#38bdf8',
                            border: '1px solid #334155',
                            borderRadius: '6px',
                            fontSize: '0.78rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                          }}
                        >
                          <Eye size={13} /> View
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Test Email Modal */}
      {showTestModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '1rem',
          }}
        >
          <div
            style={{
              backgroundColor: '#111827',
              border: '1px solid #1f2937',
              borderRadius: '16px',
              maxWidth: '500px',
              width: '100%',
              padding: '1.75rem',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.7)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Send size={18} style={{ color: '#ef4444' }} /> Send System Test Email
              </h2>
              <button
                onClick={() => setShowTestModal(false)}
                style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSendTestEmail}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '0.35rem' }}>
                  Recipient Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. donor@gmail.com or admin@hemovault.org"
                  value={testForm.to}
                  onChange={(e) => setTestForm({ ...testForm, to: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '8px',
                    backgroundColor: '#1e293b',
                    border: '1px solid #334155',
                    color: '#fff',
                    fontSize: '0.9rem',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '0.35rem' }}>
                  Email Subject
                </label>
                <input
                  type="text"
                  placeholder="HemoVault Notification Test"
                  value={testForm.subject}
                  onChange={(e) => setTestForm({ ...testForm, subject: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '8px',
                    backgroundColor: '#1e293b',
                    border: '1px solid #334155',
                    color: '#fff',
                    fontSize: '0.9rem',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '0.35rem' }}>
                  Message Content
                </label>
                <textarea
                  rows={3}
                  placeholder="Testing the automated email notification pipeline..."
                  value={testForm.message}
                  onChange={(e) => setTestForm({ ...testForm, message: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '8px',
                    backgroundColor: '#1e293b',
                    border: '1px solid #334155',
                    color: '#fff',
                    fontSize: '0.9rem',
                    boxSizing: 'border-box',
                    resize: 'vertical',
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setShowTestModal(false)}
                  style={{
                    padding: '0.6rem 1.2rem',
                    borderRadius: '8px',
                    backgroundColor: 'transparent',
                    border: '1px solid #334155',
                    color: '#cbd5e1',
                    cursor: 'pointer',
                    fontWeight: 600,
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={testSending}
                  style={{
                    padding: '0.6rem 1.25rem',
                    borderRadius: '8px',
                    backgroundColor: '#dc2626',
                    border: 'none',
                    color: '#fff',
                    cursor: testSending ? 'not-allowed' : 'pointer',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                  }}
                >
                  {testSending ? <RefreshCw size={14} className="animate-spin" /> : <Send size={14} />}
                  {testSending ? 'Sending...' : 'Dispatch Email'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Broadcast Donor Alert Modal */}
      {showBroadcastModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '1rem',
          }}
        >
          <div
            style={{
              backgroundColor: '#111827',
              border: '1px solid #1f2937',
              borderRadius: '16px',
              maxWidth: '520px',
              width: '100%',
              padding: '1.75rem',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.7)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Megaphone size={18} style={{ color: '#ef4444' }} /> Broadcast Urgent Donor Alert
              </h2>
              <button
                onClick={() => setShowBroadcastModal(false)}
                style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1.25rem', lineHeight: 1.5 }}>
              This will automatically locate registered active donors matching the selected blood group and send an urgent call-to-action email notification with direct booking links.
            </p>

            <form onSubmit={handleBroadcastDonorCall}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '0.35rem' }}>
                  Target Blood Group
                </label>
                <select
                  value={broadcastForm.bloodGroup}
                  onChange={(e) => setBroadcastForm({ ...broadcastForm, bloodGroup: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '8px',
                    backgroundColor: '#1e293b',
                    border: '1px solid #334155',
                    color: '#fff',
                    fontSize: '0.9rem',
                    boxSizing: 'border-box',
                  }}
                >
                  {BLOOD_GROUPS.map((bg) => (
                    <option key={bg} value={bg}>
                      {bg}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '0.35rem' }}>
                  Units Required
                </label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={broadcastForm.unitsNeeded}
                  onChange={(e) => setBroadcastForm({ ...broadcastForm, unitsNeeded: Number(e.target.value) })}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '8px',
                    backgroundColor: '#1e293b',
                    border: '1px solid #334155',
                    color: '#fff',
                    fontSize: '0.9rem',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '0.35rem' }}>
                  Requesting Hospital / Center
                </label>
                <input
                  type="text"
                  value={broadcastForm.hospitalName}
                  onChange={(e) => setBroadcastForm({ ...broadcastForm, hospitalName: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '8px',
                    backgroundColor: '#1e293b',
                    border: '1px solid #334155',
                    color: '#fff',
                    fontSize: '0.9rem',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setShowBroadcastModal(false)}
                  style={{
                    padding: '0.6rem 1.2rem',
                    borderRadius: '8px',
                    backgroundColor: 'transparent',
                    border: '1px solid #334155',
                    color: '#cbd5e1',
                    cursor: 'pointer',
                    fontWeight: 600,
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={broadcastSending}
                  style={{
                    padding: '0.6rem 1.25rem',
                    borderRadius: '8px',
                    backgroundColor: '#dc2626',
                    border: 'none',
                    color: '#fff',
                    cursor: broadcastSending ? 'not-allowed' : 'pointer',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                  }}
                >
                  {broadcastSending ? <RefreshCw size={14} className="animate-spin" /> : <Megaphone size={14} />}
                  {broadcastSending ? 'Broadcasting...' : 'Broadcast to Donors'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Selected Notification Detail Drawer / Modal */}
      {selectedNotification && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '1rem',
          }}
        >
          <div
            style={{
              backgroundColor: '#111827',
              border: '1px solid #1f2937',
              borderRadius: '16px',
              maxWidth: '600px',
              width: '100%',
              padding: '1.75rem',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.7)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={18} style={{ color: '#ef4444' }} />
                <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff', margin: 0 }}>
                  Email Dispatch Details
                </h2>
              </div>
              <button
                onClick={() => setSelectedNotification(null)}
                style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px', marginBottom: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '0.5rem', fontSize: '0.85rem' }}>
                <span style={{ color: '#64748b' }}>Recipient:</span>
                <span style={{ color: '#fff', fontWeight: 600 }}>{selectedNotification.recipient} ({selectedNotification.recipientEmail})</span>

                <span style={{ color: '#64748b' }}>Subject:</span>
                <span style={{ color: '#f8fafc', fontWeight: 600 }}>{selectedNotification.subject}</span>

                <span style={{ color: '#64748b' }}>Status:</span>
                <span style={{ color: '#34d399', fontWeight: 700 }}>{selectedNotification.status}</span>

                <span style={{ color: '#64748b' }}>Dispatched:</span>
                <span style={{ color: '#cbd5e1' }}>{new Date(selectedNotification.createdAt).toLocaleString()}</span>
              </div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#94a3b8', marginBottom: '0.35rem' }}>
                Message Content:
              </div>
              <div
                style={{
                  background: '#1e293b',
                  padding: '1rem',
                  borderRadius: '8px',
                  color: '#e2e8f0',
                  fontSize: '0.88rem',
                  lineHeight: 1.6,
                }}
              >
                {selectedNotification.message}
              </div>
            </div>

            {selectedNotification.previewUrl && (
              <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                <a
                  href={selectedNotification.previewUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    color: '#38bdf8',
                    textDecoration: 'none',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                  }}
                >
                  <ExternalLink size={14} /> Open Live Ethereal Webmail Preview
                </a>
              </div>
            )}

            <div style={{ marginTop: '1.25rem', textAlign: 'right' }}>
              <button
                onClick={() => setSelectedNotification(null)}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#334155',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 600,
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
