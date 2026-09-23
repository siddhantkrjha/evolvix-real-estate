import React from 'react';
import { useApp } from '../../context/AppContext';
import { LISTINGS_DATA } from '../../data/listingsData';
import { X, Scale, ArrowRight, Check, Minus } from 'lucide-react';

export const ComparisonDrawer = ({ onSelectListing }) => {
  const { compareIds, toggleCompare, isCompareOpen, setIsCompareOpen } = useApp();

  if (compareIds.length === 0) return null;

  const comparedListings = LISTINGS_DATA.filter(item => compareIds.includes(item.id));

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  };

  // Minimized floating pill when closed
  if (!isCompareOpen) {
    return (
      <div
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 800,
          background: 'var(--bg-dark)',
          color: '#FFF',
          padding: '0.8rem 1.4rem',
          borderRadius: '40px',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          boxShadow: 'var(--shadow-dark)',
          border: '1px solid rgba(255,255,255,0.15)',
          cursor: 'pointer'
        }}
        onClick={() => setIsCompareOpen(true)}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Scale size={18} color="var(--accent-sage)" />
          <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>
            Compare Residences ({compareIds.length}/3)
          </span>
        </div>
        <button
          style={{
            background: 'var(--accent-emerald)',
            color: '#FFF',
            padding: '0.35rem 0.8rem',
            borderRadius: '20px',
            fontSize: '0.75rem',
            fontWeight: '600'
          }}
        >
          View Matrix →
        </button>
      </div>
    );
  }

  // Full Screen / Expanded Comparison Modal
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'rgba(17, 19, 21, 0.75)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center'
      }}
      onClick={() => setIsCompareOpen(false)}
    >
      <div
        style={{
          background: '#FFFFFF',
          width: '100%',
          maxWidth: '1200px',
          maxHeight: '90vh',
          borderTopLeftRadius: '24px',
          borderTopRightRadius: '24px',
          overflowY: 'auto',
          padding: '2rem 2.5rem',
          boxShadow: 'var(--shadow-dark)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-light)' }}>
          <div>
            <span style={{ color: 'var(--accent-emerald)', fontSize: '0.8rem', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
              Side-by-Side Analysis
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem' }}>Residence Comparison Matrix</h2>
          </div>
          <button
            onClick={() => setIsCompareOpen(false)}
            style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'var(--bg-sand)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Comparison Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `200px repeat(${comparedListings.length}, 1fr)`,
            gap: '1.5rem',
            overflowX: 'auto'
          }}
        >
          {/* Column 0: Metric Labels */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', paddingTop: '220px', fontWeight: '600', color: '#4B5563', fontSize: '0.9rem' }}>
            <div style={{ height: '36px', display: 'flex', alignItems: 'center' }}>Price</div>
            <div style={{ height: '36px', display: 'flex', alignItems: 'center' }}>Price / Sq Ft</div>
            <div style={{ height: '36px', display: 'flex', alignItems: 'center' }}>Bedrooms / Baths</div>
            <div style={{ height: '36px', display: 'flex', alignItems: 'center' }}>Interior Living</div>
            <div style={{ height: '36px', display: 'flex', alignItems: 'center' }}>Lot Size</div>
            <div style={{ height: '36px', display: 'flex', alignItems: 'center' }}>Year Built</div>
            <div style={{ height: '36px', display: 'flex', alignItems: 'center' }}>Monthly HOA</div>
            <div style={{ height: '36px', display: 'flex', alignItems: 'center' }}>Architect</div>
            <div style={{ height: '36px', display: 'flex', alignItems: 'center' }}>360° Virtual Tour</div>
          </div>

          {/* Listing Columns */}
          {comparedListings.map((prop) => (
            <div key={prop.id} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {/* Card Thumbnail */}
              <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', height: '200px' }}>
                <img src={prop.media.featuredImage} alt={prop.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <button
                  onClick={() => toggleCompare(prop.id)}
                  style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(0,0,0,0.6)', color: '#FFF', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  title="Remove from comparison"
                >
                  <X size={14} />
                </button>
                <div style={{ position: 'absolute', bottom: '8px', left: '8px', right: '8px', background: 'rgba(17,19,21,0.85)', backdropFilter: 'blur(6px)', padding: '0.4rem 0.6rem', borderRadius: '6px', color: '#FFF' }}>
                  <div style={{ fontWeight: '600', fontSize: '0.85rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{prop.title}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-sand)' }}>{prop.location.neighborhoodName}</div>
                </div>
              </div>

              {/* Data Rows */}
              <div style={{ height: '36px', display: 'flex', alignItems: 'center', fontFamily: 'var(--font-mono)', fontWeight: '700', fontSize: '1.1rem', color: 'var(--accent-emerald)' }}>
                {formatCurrency(prop.price)}
              </div>
              <div style={{ height: '36px', display: 'flex', alignItems: 'center', fontFamily: 'var(--font-mono)' }}>
                ${prop.specs.pricePerSqft.toLocaleString()}/sqft
              </div>
              <div style={{ height: '36px', display: 'flex', alignItems: 'center' }}>
                {prop.specs.beds} Beds • {prop.specs.baths} Baths
              </div>
              <div style={{ height: '36px', display: 'flex', alignItems: 'center', fontFamily: 'var(--font-mono)' }}>
                {prop.specs.sqft.toLocaleString()} sqft
              </div>
              <div style={{ height: '36px', display: 'flex', alignItems: 'center' }}>
                {prop.specs.lotSizeAcres ? `${prop.specs.lotSizeAcres} Acres` : 'N/A'}
              </div>
              <div style={{ height: '36px', display: 'flex', alignItems: 'center' }}>
                {prop.specs.yearBuilt}
              </div>
              <div style={{ height: '36px', display: 'flex', alignItems: 'center', fontFamily: 'var(--font-mono)' }}>
                {prop.specs.hoaMonthly ? formatCurrency(prop.specs.hoaMonthly) : '$0'}
              </div>
              <div style={{ height: '36px', display: 'flex', alignItems: 'center', fontSize: '0.85rem' }}>
                {prop.specs.architect || 'Custom Private Design'}
              </div>
              <div style={{ height: '36px', display: 'flex', alignItems: 'center' }}>
                {prop.media.has360Tour ? (
                  <span style={{ color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.85rem', fontWeight: '600' }}>
                    <Check size={16} /> Available
                  </span>
                ) : (
                  <span style={{ color: '#9CA3AF', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.85rem' }}>
                    <Minus size={16} /> Video Only
                  </span>
                )}
              </div>

              {/* View Button */}
              <button
                className="btn-primary"
                style={{ marginTop: '0.5rem', padding: '0.7rem 1rem', fontSize: '0.85rem' }}
                onClick={() => {
                  setIsCompareOpen(false);
                  if (onSelectListing) onSelectListing(prop);
                }}
              >
                <span>Full Property Dossier</span>
                <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
