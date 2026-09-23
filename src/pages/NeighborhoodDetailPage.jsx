import React, { useState } from 'react';
import { NEIGHBORHOODS_DATA } from '../data/neighborhoodsData';
import { LISTINGS_DATA } from '../data/listingsData';
import { AGENTS_DATA } from '../data/agentsData';
import { PropertyCard } from '../components/common/PropertyCard';
import { InteractiveMap } from '../components/map/InteractiveMap';
import { MapPin, Navigation, School, Utensils, Trees, Phone, Mail, ArrowUpRight, Car, Train, Clock } from 'lucide-react';

export const NeighborhoodDetailPage = ({ neighborhood, onSelectListing, onSelectAgent, onNavigate }) => {
  const currentNeighborhood = neighborhood || NEIGHBORHOODS_DATA[0];
  const neighborhoodListings = LISTINGS_DATA.filter(p => p.location.neighborhoodId === currentNeighborhood.id);
  const specialist = AGENTS_DATA.find(a => a.id === currentNeighborhood.specialistAgentId) || AGENTS_DATA[0];
  const relatedNeighborhoods = NEIGHBORHOODS_DATA.filter(n => n.id !== currentNeighborhood.id);

  const [commuteTarget, setCommuteTarget] = useState('downtown');
  const [commuteMinutes, setCommuteMinutes] = useState({ drive: 18, transit: 26 });

  const handleCommuteChange = (target) => {
    setCommuteTarget(target);
    if (target === 'downtown') setCommuteMinutes({ drive: 18, transit: 26 });
    else if (target === 'airport') setCommuteMinutes({ drive: 24, transit: 40 });
    else if (target === 'beach') setCommuteMinutes({ drive: 12, transit: 20 });
    else setCommuteMinutes({ drive: 15, transit: 22 });
  };

  const lifestyleGallery = [
    currentNeighborhood.heroImage,
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80'
  ];

  return (
    <div style={{ paddingTop: '0', minHeight: '100vh', background: 'var(--bg-chalk)', paddingBottom: '6rem' }}>
      {/* Hero Section */}
      <section
        style={{
          position: 'relative',
          minHeight: '65vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '120px 2rem 50px',
          backgroundImage: `linear-gradient(to top, rgba(17,19,21,0.92) 0%, rgba(17,19,21,0.3) 100%), url('${currentNeighborhood.heroImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#FFFFFF'
        }}
      >
        <div className="container">
          <span style={{ fontSize: '0.85rem', color: 'var(--accent-sage)', letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
            {currentNeighborhood.city} Dossier
          </span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 5vw, 4.2rem)', color: '#FFF', margin: '0.3rem 0 0.8rem' }}>
            {currentNeighborhood.name}
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-sand)', maxWidth: '680px', lineHeight: '1.5' }}>
            {currentNeighborhood.tagline}
          </p>
        </div>
      </section>

      {/* Market Snapshot Stats Bar */}
      <section style={{ background: '#FFFFFF', borderBottom: '1px solid var(--border-light)', padding: '2.5rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Median Residence Price</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.8rem', fontWeight: '700', color: 'var(--accent-emerald)' }}>
                {currentNeighborhood.stats.medianPrice}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Price Per Square Foot</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.8rem', fontWeight: '700' }}>
                {currentNeighborhood.stats.pricePerSqft}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Annual YoY Appreciation</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.8rem', fontWeight: '700', color: 'var(--accent-terracotta)' }}>
                {currentNeighborhood.stats.yoyChange}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Active Available Portfolios</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.8rem', fontWeight: '700' }}>
                {currentNeighborhood.stats.activeListingsCount} Residences
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container" style={{ paddingTop: '4rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3.5rem' }}>
          <div>
            {/* Overview Narrative */}
            <div style={{ background: '#FFFFFF', padding: '2.5rem', borderRadius: '16px', border: '1px solid var(--border-light)', marginBottom: '3rem' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: '1rem' }}>
                The Character of {currentNeighborhood.name}
              </h2>
              <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#374151' }}>
                {currentNeighborhood.description}
              </p>
            </div>

            {/* Lifestyle & Infrastructure Index */}
            <div style={{ background: '#FFFFFF', padding: '2.5rem', borderRadius: '16px', border: '1px solid var(--border-light)', marginBottom: '3rem' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', marginBottom: '1.5rem' }}>
                Lifestyle & Urban Infrastructure
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600', marginBottom: '0.4rem' }}>
                    <Navigation size={18} color="var(--accent-emerald)" />
                    <span>Walk & Transit Scores</span>
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    Walkability: <strong style={{ color: 'var(--text-noir)' }}>{currentNeighborhood.lifestyle.walkScore}/100</strong> • Transit: <strong style={{ color: 'var(--text-noir)' }}>{currentNeighborhood.lifestyle.transitScore}/100</strong>
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600', marginBottom: '0.4rem' }}>
                    <School size={18} color="var(--accent-emerald)" />
                    <span>Premier Private Academies</span>
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    {currentNeighborhood.lifestyle.privateSchools}
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600', marginBottom: '0.4rem' }}>
                    <Utensils size={18} color="var(--accent-emerald)" />
                    <span>Michelin Dining & Clubs</span>
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    {currentNeighborhood.lifestyle.diningHighlights.join(', ')}
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600', marginBottom: '0.4rem' }}>
                    <Trees size={18} color="var(--accent-emerald)" />
                    <span>Parks & Private Sanctuaries</span>
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    {currentNeighborhood.lifestyle.parksAndRecreation.join(', ')}
                  </div>
                </div>
              </div>
            </div>

            {/* Commute Time Calculator Widget */}
            <div style={{ background: '#FFFFFF', padding: '2.5rem', borderRadius: '16px', border: '1px solid var(--border-light)', marginBottom: '3rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
                <Clock size={20} color="var(--accent-emerald)" />
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem' }}>
                  Commute & Transit Estimates
                </h3>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                Estimated transit velocity from {currentNeighborhood.name} to major commerce and international transit hubs.
              </p>

              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                {[
                  { id: 'downtown', label: 'Financial District' },
                  { id: 'airport', label: 'International Airport' },
                  { id: 'beach', label: 'Private Yacht Club / Marina' },
                  { id: 'tech', label: 'Tech Innovation Enclave' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => handleCommuteChange(item.id)}
                    style={{
                      padding: '0.5rem 1rem',
                      borderRadius: '20px',
                      fontSize: '0.82rem',
                      fontWeight: commuteTarget === item.id ? '600' : '400',
                      background: commuteTarget === item.id ? 'var(--accent-emerald)' : 'var(--bg-sand)',
                      color: commuteTarget === item.id ? '#FFFFFF' : 'var(--text-noir)',
                      transition: 'all 0.2s'
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', background: 'var(--bg-chalk)', padding: '1.2rem', borderRadius: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                  <Car size={24} color="var(--accent-emerald)" />
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Private Vehicle / Chauffeur</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.3rem', fontWeight: '700' }}>~{commuteMinutes.drive} Mins</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                  <Train size={24} color="var(--accent-emerald)" />
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Express Rail / Heliport</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.3rem', fontWeight: '700' }}>~{commuteMinutes.transit} Mins</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Lifestyle Photo Gallery */}
            <div style={{ background: '#FFFFFF', padding: '2.5rem', borderRadius: '16px', border: '1px solid var(--border-light)', marginBottom: '3rem' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '1.2rem' }}>
                Lifestyle & Architectural Vignettes
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                {lifestyleGallery.map((img, i) => (
                  <div key={i} style={{ height: '180px', borderRadius: '10px', overflow: 'hidden' }}>
                    <img src={img} alt="Neighborhood vignette" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
            </div>

            {/* Active Residences in this Enclave */}
            <div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '1.5rem' }}>
                Featured Residences in {currentNeighborhood.name} ({neighborhoodListings.length})
              </h2>
              {neighborhoodListings.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
                  {neighborhoodListings.map(prop => (
                    <PropertyCard
                      key={prop.id}
                      property={prop}
                      onSelect={(p) => onSelectListing(p)}
                    />
                  ))}
                </div>
              ) : (
                <div style={{ background: '#FFFFFF', padding: '2rem', borderRadius: '12px', textAlign: 'center', color: 'var(--text-muted)' }}>
                  All public listings currently under contract. Inquire for off-market inventory.
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Specialist Advisor Card & Related Enclaves */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ position: 'sticky', top: '100px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {/* Dedicated Specialist Card */}
              <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid var(--border-light)', padding: '2rem', boxShadow: 'var(--shadow-sm)' }}>
                <span style={{ color: 'var(--accent-emerald)', fontSize: '0.75rem', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                  Dedicated Enclave Specialist
                </span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', marginTop: '0.2rem', marginBottom: '1.2rem' }}>
                  {specialist.name}
                </h3>

                <img
                  src={specialist.photo}
                  alt={specialist.name}
                  style={{ width: '100%', height: '240px', objectFit: 'cover', borderRadius: '12px', marginBottom: '1.2rem' }}
                />

                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                  Leading advisory and confidential off-market acquisitions in {currentNeighborhood.name}.
                </p>

                <button
                  onClick={() => onSelectAgent(specialist)}
                  className="btn-primary"
                  style={{ width: '100%', padding: '0.85rem' }}
                >
                  <span>Consult Enclave Advisor</span>
                  <ArrowUpRight size={16} />
                </button>
              </div>

              {/* Related Neighborhoods */}
              <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid var(--border-light)', padding: '1.8rem', boxShadow: 'var(--shadow-sm)' }}>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', marginBottom: '1rem' }}>
                  Related Luxury Enclaves
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  {relatedNeighborhoods.map(rel => (
                    <div
                      key={rel.id}
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        if (onNavigate) onNavigate('neighborhood');
                      }}
                      style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.6rem', borderRadius: '8px', background: 'var(--bg-sand)', cursor: 'pointer' }}
                    >
                      <img src={rel.heroImage} alt={rel.name} style={{ width: '48px', height: '48px', borderRadius: '6px', objectFit: 'cover' }} />
                      <div>
                        <div style={{ fontWeight: '600', fontSize: '0.88rem' }}>{rel.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{rel.city} • {rel.stats.medianPrice}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
