import React, { useState } from 'react';
import { NEIGHBORHOODS_DATA } from '../data/neighborhoodsData';
import { LISTINGS_DATA } from '../data/listingsData';
import { Sparkles, ArrowUpRight, TrendingUp, MapPin, Home } from 'lucide-react';

export const NeighborhoodsListPage = ({ onSelectNeighborhood, onSelectListing, onNavigate }) => {
  const [hoveredId, setHoveredId] = useState(null);

  const getNeighborhoodListingCount = (neighborhoodId) => {
    return LISTINGS_DATA.filter(l => l.location.neighborhoodId === neighborhoodId).length;
  };

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', background: 'var(--bg-chalk)', paddingBottom: '6rem' }}>

      {/* Hero */}
      <div
        style={{
          background: 'var(--bg-dark)',
          color: '#FFFFFF',
          padding: '5rem 0 4rem',
          marginBottom: '4rem',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2000&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.18
          }}
        />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-sage)', fontSize: '0.8rem', fontWeight: '600', letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', marginBottom: '0.8rem' }}>
            <Sparkles size={14} />
            <span>Geographic Dossiers</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#FFFFFF', lineHeight: 1.1, maxWidth: '700px' }}>
            Prime Luxury Enclaves<br />& Neighborhoods
          </h1>
          <p style={{ color: 'var(--text-sand)', fontSize: '1.1rem', marginTop: '1rem', maxWidth: '580px', lineHeight: '1.7' }}>
            Explore our curated geographic dossiers with real-time valuation metrics, lifestyle intelligence, and architectural heritage across the world's most sought-after residential enclaves.
          </p>
        </div>
      </div>

      <div className="container">
        {/* Market Intelligence Banner */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid var(--border-light)',
            padding: '2rem 2.5rem',
            marginBottom: '4rem',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '2rem',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--accent-emerald)' }}>
            <TrendingUp size={22} />
            <div>
              <div style={{ fontWeight: '700', fontSize: '1rem' }}>Live Market Intelligence</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Updated daily with off-market and active listing data</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap' }}>
            {[
              { label: 'Markets Covered', value: `${NEIGHBORHOODS_DATA.length}` },
              { label: 'Active Listings', value: `${LISTINGS_DATA.length}` },
              { label: 'Average YoY Growth', value: '+8.7%' }
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.6rem', fontWeight: '700', color: 'var(--accent-emerald)' }}>{s.value}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Section Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <span style={{ color: 'var(--accent-emerald)', fontSize: '0.8rem', fontWeight: '600', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
            Curated Enclaves
          </span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', marginTop: '0.3rem' }}>
            Explore by Location ({NEIGHBORHOODS_DATA.length} Markets)
          </h2>
        </div>

        {/* Neighborhoods Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '2rem', marginBottom: '5rem' }}>
          {NEIGHBORHOODS_DATA.map(neigh => {
            const listingCount = getNeighborhoodListingCount(neigh.id);
            return (
              <div
                key={neigh.id}
                onClick={() => onSelectNeighborhood && onSelectNeighborhood(neigh)}
                onMouseEnter={() => setHoveredId(neigh.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  position: 'relative',
                  height: '460px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  boxShadow: hoveredId === neigh.id ? 'var(--shadow-hover)' : 'var(--shadow-md)',
                  transform: hoveredId === neigh.id ? 'translateY(-6px)' : 'translateY(0)',
                  transition: 'all 0.4s var(--ease-luxury)'
                }}
              >
                <img
                  src={neigh.heroImage}
                  alt={neigh.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transform: hoveredId === neigh.id ? 'scale(1.07)' : 'scale(1)',
                    transition: 'transform 0.7s var(--ease-luxury)'
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(17,19,21,0.95) 0%, rgba(17,19,21,0.3) 55%, transparent 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '2rem',
                    color: '#FFF'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
                    <MapPin size={14} color="var(--accent-sage)" />
                    <span style={{ fontSize: '0.78rem', color: 'var(--accent-sage)', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                      {neigh.city}
                    </span>
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.9rem', color: '#FFF', lineHeight: 1.1, marginBottom: '0.5rem' }}>
                    {neigh.name}
                  </h3>
                  <p style={{ fontSize: '0.87rem', color: 'var(--text-sand)', marginBottom: '1.2rem', lineHeight: '1.5' }}>
                    {neigh.tagline}
                  </p>

                  {/* Stats Row */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '1rem', fontSize: '0.78rem' }}>
                    <div>
                      <div style={{ color: 'rgba(255,255,255,0.6)' }}>Median Price</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontWeight: '700', fontSize: '0.85rem' }}>{neigh.stats.medianPrice}</div>
                    </div>
                    <div>
                      <div style={{ color: 'rgba(255,255,255,0.6)' }}>YoY Growth</div>
                      <div style={{ fontWeight: '700', color: 'var(--accent-sage)', fontSize: '0.85rem' }}>{neigh.stats.yoyChange}</div>
                    </div>
                    <div>
                      <div style={{ color: 'rgba(255,255,255,0.6)' }}>Active Listings</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontWeight: '700', fontSize: '0.85rem', color: 'var(--accent-gold)' }}>
                        {listingCount > 0 ? `${listingCount} Evolvix` : neigh.stats.activeListingsCount}
                      </div>
                    </div>
                  </div>

                  {/* Hover CTA */}
                  <div style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    background: hoveredId === neigh.id ? 'var(--accent-emerald)' : 'rgba(17,19,21,0.7)',
                    backdropFilter: 'blur(8px)',
                    color: '#FFF',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    transition: 'all 0.3s',
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}>
                    <Home size={12} />
                    <span>Explore Dossier</span>
                    <ArrowUpRight size={12} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Markets Coming Soon */}
        <div style={{ background: 'var(--bg-sand)', borderRadius: '16px', padding: '3rem', textAlign: 'center', border: '1px solid var(--border-light)' }}>
          <span style={{ color: 'var(--accent-emerald)', fontSize: '0.8rem', fontWeight: '600', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
            Expanding Markets
          </span>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginTop: '0.4rem', marginBottom: '0.8rem' }}>
            Additional Enclaves Coming Soon
          </h3>
          <p style={{ color: 'var(--text-muted)', maxWidth: '500px', margin: '0 auto 1.5rem', fontSize: '0.95rem' }}>
            Malibu, The Hamptons, Palm Beach, Aspen, and London — launching Q2 2025. Register your interest for early access.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => onNavigate && onNavigate('listings')} className="btn-primary">
              <span>Browse All Residences</span>
              <ArrowUpRight size={16} />
            </button>
            <button onClick={() => onNavigate && onNavigate('contact')} className="btn-secondary">
              Register Market Interest
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
