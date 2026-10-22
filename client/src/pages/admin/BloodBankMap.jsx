import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import api from '../../services/api';

// Blood banks in Tamil Nadu / Chennai area
const BLOOD_BANKS = [
  {
    id: 1,
    name: 'Easwari Blood Transfusion Center',
    address: 'Ramapuram, Chennai - 600089',
    lat: 13.0264,
    lng: 80.1743,
    phone: '+91 44 2249 0100',
    type: 'Primary (Our Center)',
    isMain: true,
  },
  {
    id: 2,
    name: 'Government General Hospital Blood Bank',
    address: 'Park Town, Chennai - 600003',
    lat: 13.0836,
    lng: 80.2824,
    phone: '+91 44 2530 5000',
    type: 'Government',
  },
  {
    id: 3,
    name: 'Apollo Hospitals Blood Bank',
    address: 'Greams Road, Chennai - 600006',
    lat: 13.0607,
    lng: 80.2185,
    phone: '+91 44 2829 3333',
    type: 'Private',
  },
  {
    id: 4,
    name: 'Fortis Malar Hospital Blood Bank',
    address: 'Adyar, Chennai - 600020',
    lat: 13.0067,
    lng: 80.2627,
    phone: '+91 44 4289 2222',
    type: 'Private',
  },
  {
    id: 5,
    name: 'Sri Ramachandra Blood Bank',
    address: 'Porur, Chennai - 600116',
    lat: 13.0339,
    lng: 80.1762,
    phone: '+91 44 4592 8600',
    type: 'Private',
  },
  {
    id: 6,
    name: 'Rajiv Gandhi Govt. General Hospital',
    address: 'Park Town, Chennai - 600003',
    lat: 13.0785,
    lng: 80.2751,
    phone: '+91 44 2530 6010',
    type: 'Government',
  },
  {
    id: 7,
    name: 'Kauvery Hospital Blood Bank',
    address: 'Alwarpet, Chennai - 600018',
    lat: 13.0272,
    lng: 80.2563,
    phone: '+91 44 4000 6000',
    type: 'Private',
  },
  {
    id: 8,
    name: 'MIOT International Blood Bank',
    address: 'Manapakkam, Chennai - 600089',
    lat: 13.0132,
    lng: 80.1781,
    phone: '+91 44 4200 2288',
    type: 'Private',
  },
];

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

// Demo inventory for non-main banks
function generateDemoInventory() {
  const inv = {};
  BLOOD_GROUPS.forEach((bg) => {
    const rand = Math.floor(Math.random() * 20);
    inv[bg] = rand;
  });
  return inv;
}

function getAvailabilityColor(units) {
  if (units >= 10) return '#10b981';
  if (units >= 3) return '#f59e0b';
  return '#ef4444';
}

function getMarkerColor(bank, inventory) {
  if (!inventory) return '#6b7280';
  const values = Object.values(inventory);
  const total = values.reduce((a, b) => a + b, 0);
  if (total >= 50) return '#10b981';
  if (total >= 15) return '#f59e0b';
  return '#ef4444';
}

function createMarkerIcon(color, isMain) {
  return L.divIcon({
    html: `
      <div style="
        width:${isMain ? 44 : 36}px;
        height:${isMain ? 44 : 36}px;
        background:${color};
        border-radius:50% 50% 50% 0;
        transform:rotate(-45deg);
        border:3px solid white;
        box-shadow:0 4px 12px rgba(0,0,0,0.35);
        display:flex;align-items:center;justify-content:center;
      ">
        <span style="transform:rotate(45deg);font-size:${isMain ? 18 : 14}px;">${isMain ? '🩸' : '🏥'}</span>
      </div>`,
    className: '',
    iconSize: [isMain ? 44 : 36, isMain ? 44 : 36],
    iconAnchor: [isMain ? 22 : 18, isMain ? 44 : 36],
    popupAnchor: [0, -(isMain ? 44 : 36)],
  });
}

export default function BloodBankMap() {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [inventory, setInventory] = useState({});
  const [selectedBank, setSelectedBank] = useState(null);
  const [filterBG, setFilterBG] = useState('');
  const [loading, setLoading] = useState(true);

  // Generate demo inventory for all banks
  useEffect(() => {
    const inv = {};
    BLOOD_BANKS.forEach((b) => {
      inv[b.id] = generateDemoInventory();
    });
    setInventory(inv);
    setLoading(false);

    // Fetch real inventory for main bank
    api.get('/inventory').then((res) => {
      const units = res.data?.units || res.data?.data || [];
      const realInv = {};
      BLOOD_GROUPS.forEach((bg) => {
        realInv[bg] = units.filter(
          (u) => u.bloodGroup === bg && u.inventoryStatus === 'AVAILABLE'
        ).length;
      });
      setInventory((prev) => ({ ...prev, 1: realInv }));
    }).catch(() => {});
  }, []);

  // Init map directly with Leaflet
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      center: [13.05, 80.22],
      zoom: 12,
      zoomControl: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);

    // Add markers
    BLOOD_BANKS.forEach((bank) => {
      const color = bank.isMain ? '#dc2626' : '#3b82f6';
      const marker = L.marker([bank.lat, bank.lng], {
        icon: createMarkerIcon(color, bank.isMain),
      }).addTo(map);

      marker.on('click', () => setSelectedBank(bank));
    });

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update markers when inventory or filter changes
  useEffect(() => {
    if (!mapInstanceRef.current || loading) return;
    // Markers already added, just update selection panel
  }, [inventory, filterBG, loading]);

  const filteredBanks = BLOOD_BANKS.filter((b) => {
    if (!filterBG) return true;
    return (inventory[b.id]?.[filterBG] || 0) > 0;
  });

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 80px)', gap: 0, background: '#0b1120' }}>
      {/* Left Panel */}
      <div style={{
        width: '340px',
        flexShrink: 0,
        background: '#111827',
        borderRight: '1px solid #1e293b',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}>
        {/* Header */}
        <div style={{ padding: '1.25rem 1.25rem 0.75rem', borderBottom: '1px solid #1e293b' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '1.5rem' }}>🗺️</span>
            <div>
              <h2 style={{ color: '#fff', margin: 0, fontSize: '1.1rem', fontWeight: 800 }}>Blood Bank Map</h2>
              <p style={{ color: '#64748b', margin: 0, fontSize: '0.75rem' }}>Chennai, Tamil Nadu</p>
            </div>
          </div>

          {/* Filter */}
          <select
            value={filterBG}
            onChange={(e) => setFilterBG(e.target.value)}
            style={{
              width: '100%',
              padding: '0.55rem 0.75rem',
              borderRadius: '8px',
              background: '#1e293b',
              border: '1px solid #334155',
              color: filterBG ? '#ef4444' : '#94a3b8',
              fontSize: '0.85rem',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            <option value="">🔍 Filter by Blood Group</option>
            {BLOOD_GROUPS.map((bg) => (
              <option key={bg} value={bg}>{bg}</option>
            ))}
          </select>

          {/* Legend */}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.75rem' }}>
            {[['#10b981', 'Available'], ['#f59e0b', 'Low'], ['#ef4444', 'Critical']].map(([c, l]) => (
              <div key={l} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.72rem', color: '#94a3b8' }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
                {l}
              </div>
            ))}
          </div>
        </div>

        {/* Bank List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0.75rem' }}>
          {filteredBanks.map((bank) => {
            const inv = inventory[bank.id] || {};
            const total = Object.values(inv).reduce((a, b) => a + b, 0);
            const color = total >= 50 ? '#10b981' : total >= 15 ? '#f59e0b' : '#ef4444';
            const isSelected = selectedBank?.id === bank.id;

            const filteredUnits = filterBG ? (inv[filterBG] || 0) : total;

            return (
              <div
                key={bank.id}
                onClick={() => {
                  setSelectedBank(bank);
                  if (mapInstanceRef.current) {
                    mapInstanceRef.current.setView([bank.lat, bank.lng], 15, { animate: true });
                  }
                }}
                style={{
                  padding: '0.85rem',
                  borderRadius: '10px',
                  marginBottom: '0.5rem',
                  background: isSelected ? '#1e293b' : 'transparent',
                  border: `1px solid ${isSelected ? '#334155' : 'transparent'}`,
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
                onMouseEnter={(e) => { if (!isSelected) e.currentTarget.style.background = '#1a2332'; }}
                onMouseLeave={(e) => { if (!isSelected) e.currentTarget.style.background = 'transparent'; }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '170px' }}>
                        {bank.isMain ? '🩸' : '🏥'} {bank.name}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '2px' }}>{bank.address}</div>
                    <div style={{ fontSize: '0.72rem', color: '#475569', marginTop: '1px' }}>{bank.phone}</div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: '0.5rem' }}>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color }}>
                      {filterBG ? filteredUnits : total}
                    </div>
                    <div style={{ fontSize: '0.65rem', color: '#64748b' }}>{filterBG ? filterBG : 'units'}</div>
                  </div>
                </div>

                {/* Blood group mini bars */}
                {!filterBG && (
                  <div style={{ display: 'flex', gap: '3px', marginTop: '0.6rem', flexWrap: 'wrap' }}>
                    {BLOOD_GROUPS.map((bg) => {
                      const units = inv[bg] || 0;
                      const c = getAvailabilityColor(units);
                      return (
                        <div key={bg} style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '0.6rem', color: '#64748b', marginBottom: '2px' }}>{bg}</div>
                          <div style={{
                            width: '22px', height: '6px', borderRadius: '3px',
                            background: units > 0 ? c : '#1e293b',
                          }} />
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Stats Footer */}
        <div style={{ padding: '0.75rem 1.25rem', borderTop: '1px solid #1e293b', display: 'flex', gap: '1rem' }}>
          <div style={{ textAlign: 'center', flex: 1 }}>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ef4444' }}>{BLOOD_BANKS.length}</div>
            <div style={{ fontSize: '0.68rem', color: '#64748b' }}>Blood Banks</div>
          </div>
          <div style={{ textAlign: 'center', flex: 1 }}>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#10b981' }}>
              {Object.values(inventory).reduce((total, inv) => total + Object.values(inv).reduce((a, b) => a + b, 0), 0)}
            </div>
            <div style={{ fontSize: '0.68rem', color: '#64748b' }}>Total Units</div>
          </div>
          <div style={{ textAlign: 'center', flex: 1 }}>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#3b82f6' }}>8</div>
            <div style={{ fontSize: '0.68rem', color: '#64748b' }}>Blood Types</div>
          </div>
        </div>
      </div>

      {/* Map Area */}
      <div style={{ flex: 1, position: 'relative' }}>
        <div ref={mapRef} style={{ width: '100%', height: '100%' }} />

        {/* Selected Bank Detail Panel */}
        {selectedBank && (
          <div style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            width: '280px',
            background: 'rgba(17, 24, 39, 0.97)',
            borderRadius: '14px',
            border: '1px solid #1e293b',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
            zIndex: 1000,
            overflow: 'hidden',
          }}>
            <div style={{
              padding: '1rem',
              background: selectedBank.isMain
                ? 'linear-gradient(135deg, #dc2626, #991b1b)'
                : 'linear-gradient(135deg, #1d4ed8, #1e40af)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.7)', marginBottom: '2px' }}>
                    {selectedBank.type}
                  </div>
                  <h3 style={{ color: '#fff', margin: 0, fontSize: '0.95rem', fontWeight: 800 }}>
                    {selectedBank.name}
                  </h3>
                  <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.8)', marginTop: '3px' }}>
                    📍 {selectedBank.address}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.8)', marginTop: '2px' }}>
                    📞 {selectedBank.phone}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedBank(null)}
                  style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff', width: 26, height: 26, borderRadius: '50%', cursor: 'pointer', fontSize: '0.8rem' }}
                >
                  ✕
                </button>
              </div>
            </div>

            <div style={{ padding: '1rem' }}>
              <div style={{ fontSize: '0.72rem', color: '#64748b', marginBottom: '0.6rem', fontWeight: 700, textTransform: 'uppercase' }}>
                Blood Inventory
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem' }}>
                {BLOOD_GROUPS.map((bg) => {
                  const units = inventory[selectedBank.id]?.[bg] || 0;
                  const color = getAvailabilityColor(units);
                  return (
                    <div key={bg} style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '0.4rem 0.6rem',
                      borderRadius: '7px',
                      background: '#1e293b',
                      border: `1px solid ${color}30`,
                    }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#fff' }}>{bg}</span>
                      <span style={{ fontSize: '0.8rem', fontWeight: 800, color }}>{units}</span>
                    </div>
                  );
                })}
              </div>

              <a
                href={`tel:${selectedBank.phone}`}
                style={{
                  display: 'block',
                  marginTop: '0.85rem',
                  padding: '0.55rem',
                  borderRadius: '8px',
                  background: '#dc2626',
                  color: '#fff',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  textAlign: 'center',
                  textDecoration: 'none',
                }}
              >
                📞 Call Blood Bank
              </a>
            </div>
          </div>
        )}

        {/* Map Attribution / Title Overlay */}
        <div style={{
          position: 'absolute',
          top: '1rem',
          left: '1rem',
          background: 'rgba(17,24,39,0.9)',
          padding: '0.5rem 0.85rem',
          borderRadius: '8px',
          border: '1px solid #1e293b',
          zIndex: 1000,
        }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#fff' }}>🗺️ Live Blood Bank Locator</div>
          <div style={{ fontSize: '0.65rem', color: '#64748b' }}>Chennai, Tamil Nadu · {BLOOD_BANKS.length} centers</div>
        </div>
      </div>
    </div>
  );
}
