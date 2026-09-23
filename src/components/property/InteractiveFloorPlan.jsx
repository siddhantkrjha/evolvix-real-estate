import React, { useState } from 'react';
import { Layers, MapPin, Eye, Compass } from 'lucide-react';

export const InteractiveFloorPlan = ({ floors = [] }) => {
  const [activeFloorIdx, setActiveFloorIdx] = useState(0);
  const [selectedHotspot, setSelectedHotspot] = useState(null);

  if (!floors || floors.length === 0) return null;

  const currentFloor = floors[activeFloorIdx];

  return (
    <div
      style={{
        background: '#FFFFFF',
        borderRadius: '16px',
        border: '1px solid var(--border-light)',
        padding: '2rem',
        boxShadow: 'var(--shadow-sm)'
      }}
    >
      {/* Header & Floor Tabs */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '1.5rem',
          paddingBottom: '1rem',
          borderBottom: '1px solid var(--border-light)'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-emerald)', fontSize: '0.8rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--font-mono)' }}>
            <Layers size={14} />
            <span>Architectural Schematics</span>
          </div>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginTop: '0.2rem' }}>
            Interactive Floor Plan & Spatial Layout
          </h3>
        </div>

        {/* Level Switcher */}
        <div style={{ display: 'flex', background: 'var(--bg-sand)', padding: '0.3rem', borderRadius: '8px', gap: '0.3rem' }}>
          {floors.map((fl, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveFloorIdx(idx);
                setSelectedHotspot(null);
              }}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                fontSize: '0.85rem',
                fontWeight: activeFloorIdx === idx ? '600' : '400',
                background: activeFloorIdx === idx ? '#FFFFFF' : 'transparent',
                color: activeFloorIdx === idx ? 'var(--text-noir)' : 'var(--text-muted)',
                boxShadow: activeFloorIdx === idx ? 'var(--shadow-sm)' : 'none',
                transition: 'all 0.2s'
              }}
            >
              {fl.level.split('—')[0].trim()}
            </button>
          ))}
        </div>
      </div>

      {/* Floor Plan Canvas Graphic */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '380px',
          background: '#F8F7F4',
          borderRadius: '12px',
          border: '1px dashed var(--border-medium)',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {/* Architectural Grid & Background Blueprint simulation */}
        <svg
          width="100%"
          height="100%"
          style={{ position: 'absolute', inset: 0, opacity: 0.25 }}
        >
          <defs>
            <pattern id="blueprint-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1B3B2B" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#blueprint-grid)" />
          
          {/* Stylized Architectural Walls Vector */}
          <rect x="15%" y="15%" width="70%" height="70%" fill="none" stroke="#111315" strokeWidth="2.5" />
          <line x1="45%" y1="15%" x2="45%" y2="85%" stroke="#111315" strokeWidth="1.5" strokeDasharray="6,4" />
          <line x1="15%" y1="50%" x2="45%" y2="50%" stroke="#111315" strokeWidth="1.5" />
          <line x1="45%" y1="65%" x2="85%" y2="65%" stroke="#111315" strokeWidth="1.5" />
        </svg>

        <div style={{ position: 'absolute', top: '15px', right: '15px', display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
          <Compass size={16} />
          <span>North-Facing Panoramic Glazing</span>
        </div>

        {/* Hotspot Pins */}
        {currentFloor.hotspots && currentFloor.hotspots.map((spot, idx) => (
          <div
            key={idx}
            style={{
              position: 'absolute',
              top: `${spot.y}%`,
              left: `${spot.x}%`,
              transform: 'translate(-50%, -50%)',
              zIndex: 10
            }}
          >
            <button
              onClick={() => setSelectedHotspot(spot)}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: selectedHotspot?.name === spot.name ? 'var(--accent-terracotta)' : 'var(--accent-emerald)',
                color: '#FFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
                border: '2px solid #FFF',
                transition: 'transform 0.2s',
                animation: 'pulseGlow 2s infinite'
              }}
              title={spot.name}
            >
              <Eye size={15} />
            </button>
          </div>
        ))}

        {/* Selected Hotspot Callout Box */}
        {selectedHotspot && (
          <div
            style={{
              position: 'absolute',
              bottom: '20px',
              left: '20px',
              right: '20px',
              background: 'rgba(17, 19, 21, 0.9)',
              backdropFilter: 'blur(10px)',
              padding: '1rem 1.4rem',
              borderRadius: '10px',
              color: '#FFF',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              zIndex: 20
            }}
          >
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--accent-sage)', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                Focal Room Callout
              </div>
              <div style={{ fontSize: '1.05rem', fontWeight: '600' }}>
                {selectedHotspot.name}
              </div>
            </div>
            <button
              onClick={() => setSelectedHotspot(null)}
              style={{ color: '#FFF', fontSize: '0.8rem', textDecoration: 'underline' }}
            >
              Close
            </button>
          </div>
        )}
      </div>

      {/* Floor Room List */}
      <div style={{ marginTop: '1.2rem', display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#4B5563', alignSelf: 'center', marginRight: '0.4rem' }}>
          Included Spaces ({currentFloor.sqft} sqft):
        </span>
        {currentFloor.rooms.map((r, i) => (
          <span
            key={i}
            style={{
              background: 'var(--bg-sand)',
              padding: '0.35rem 0.75rem',
              borderRadius: '20px',
              fontSize: '0.8rem',
              color: 'var(--text-noir)',
              fontWeight: '500'
            }}
          >
            {r}
          </span>
        ))}
      </div>
    </div>
  );
};
