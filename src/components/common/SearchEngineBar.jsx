import React, { useState } from 'react';
import { Search, MapPin, DollarSign, Home, BedDouble } from 'lucide-react';

export const SearchEngineBar = ({ onSearch, initialFilters = {}, mode = 'hero' }) => {
  const [location, setLocation] = useState(initialFilters.location || '');
  const [propertyType, setPropertyType] = useState(initialFilters.propertyType || 'all');
  const [priceTier, setPriceTier] = useState(initialFilters.priceTier || 'all');
  const [beds, setBeds] = useState(initialFilters.beds || 'all');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch({
        location,
        propertyType,
        priceTier,
        beds
      });
    }
  };

  if (mode === 'sticky') {
    return (
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.6rem',
          alignItems: 'center',
          background: '#FFFFFF',
          padding: '0.75rem 1.2rem',
          borderRadius: '12px',
          border: '1px solid var(--border-medium)',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: '1', minWidth: '180px' }}>
          <MapPin size={16} color="var(--accent-emerald)" />
          <input
            type="text"
            placeholder="Search Enclave, Zip, or Keyword..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={{ border: 'none', outline: 'none', width: '100%', fontSize: '0.9rem' }}
          />
        </div>

        <select
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
          style={{ border: '1px solid var(--border-light)', padding: '0.5rem 0.8rem', borderRadius: '6px', fontSize: '0.85rem' }}
        >
          <option value="all">All Residence Types</option>
          <option value="estate">Trophy Estates</option>
          <option value="penthouse">Penthouses</option>
          <option value="waterfront">Waterfront</option>
          <option value="single_family">Single Family</option>
        </select>

        <select
          value={priceTier}
          onChange={(e) => setPriceTier(e.target.value)}
          style={{ border: '1px solid var(--border-light)', padding: '0.5rem 0.8rem', borderRadius: '6px', fontSize: '0.85rem' }}
        >
          <option value="all">Any Price</option>
          <option value="5-10m">$5M – $10M</option>
          <option value="10-20m">$10M – $20M</option>
          <option value="20m+">$20M+</option>
        </select>

        <button type="submit" className="btn-primary" style={{ padding: '0.55rem 1.2rem', fontSize: '0.85rem' }}>
          <Search size={14} />
          <span>Apply</span>
        </button>
      </form>
    );
  }

  // Hero Mode
  return (
    <div
      style={{
        background: 'rgba(255, 255, 255, 0.92)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        padding: '1.2rem',
        borderRadius: '16px',
        boxShadow: '0 24px 48px -12px rgba(0,0,0,0.3)',
        border: '1px solid rgba(255, 255, 255, 0.5)',
        width: '100%',
        maxWidth: '960px',
        margin: '0 auto'
      }}
    >
      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1rem',
            alignItems: 'center'
          }}
        >
          {/* Location Query */}
          <div style={{ padding: '0.4rem 0.8rem', borderRight: '1px solid rgba(17, 19, 21, 0.08)' }}>
            <label style={{ display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', fontWeight: '600' }}>
              Prime Location
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.2rem' }}>
              <MapPin size={16} color="var(--accent-emerald)" />
              <input
                type="text"
                placeholder="Bel Air, SoHo, Aspen..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                style={{ border: 'none', outline: 'none', background: 'transparent', width: '100%', fontSize: '0.95rem', fontWeight: '500' }}
              />
            </div>
          </div>

          {/* Property Category */}
          <div style={{ padding: '0.4rem 0.8rem', borderRight: '1px solid rgba(17, 19, 21, 0.08)' }}>
            <label style={{ display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', fontWeight: '600' }}>
              Residence Style
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.2rem' }}>
              <Home size={16} color="var(--accent-emerald)" />
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                style={{ border: 'none', outline: 'none', background: 'transparent', width: '100%', fontSize: '0.92rem', fontWeight: '500' }}
              >
                <option value="all">All Portfolios</option>
                <option value="estate">Trophy Estates</option>
                <option value="penthouse">Penthouses</option>
                <option value="waterfront">Waterfront Estates</option>
                <option value="single_family">Heritage Manors</option>
              </select>
            </div>
          </div>

          {/* Price Range */}
          <div style={{ padding: '0.4rem 0.8rem', borderRight: '1px solid rgba(17, 19, 21, 0.08)' }}>
            <label style={{ display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', fontWeight: '600' }}>
              Target Capital
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.2rem' }}>
              <DollarSign size={16} color="var(--accent-emerald)" />
              <select
                value={priceTier}
                onChange={(e) => setPriceTier(e.target.value)}
                style={{ border: 'none', outline: 'none', background: 'transparent', width: '100%', fontSize: '0.92rem', fontWeight: '500' }}
              >
                <option value="all">All Valuations</option>
                <option value="5-10m">$5M – $10M</option>
                <option value="10-20m">$10M – $20M</option>
                <option value="20m+">$20M+ Ultra-Prime</option>
              </select>
            </div>
          </div>

          {/* Bedrooms */}
          <div style={{ padding: '0.4rem 0.8rem' }}>
            <label style={{ display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', fontWeight: '600' }}>
              Bedrooms
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.2rem' }}>
              <BedDouble size={16} color="var(--accent-emerald)" />
              <select
                value={beds}
                onChange={(e) => setBeds(e.target.value)}
                style={{ border: 'none', outline: 'none', background: 'transparent', width: '100%', fontSize: '0.92rem', fontWeight: '500' }}
              >
                <option value="all">Any Suites</option>
                <option value="3+">3+ Bedrooms</option>
                <option value="4+">4+ Bedrooms</option>
                <option value="6+">6+ Bedrooms</option>
              </select>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="submit"
            className="btn-primary"
            style={{ width: '100%', maxWidth: '240px', padding: '0.85rem 1.8rem', fontSize: '0.95rem' }}
          >
            <Search size={18} />
            <span>Search Residences</span>
          </button>
        </div>
      </form>
    </div>
  );
};
