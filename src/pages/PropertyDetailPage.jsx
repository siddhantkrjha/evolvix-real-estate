import React, { useState, useEffect } from 'react';
import { GalleryLightbox } from '../components/property/GalleryLightbox';
import { InteractiveFloorPlan } from '../components/property/InteractiveFloorPlan';
import { MortgageCalculator } from '../components/property/MortgageCalculator';
import { PropertyCard } from '../components/common/PropertyCard';
import { AGENTS_DATA } from '../data/agentsData';
import { LISTINGS_DATA } from '../data/listingsData';
import { useApp } from '../context/AppContext';
import {
  Heart,
  Share2,
  Calendar,
  Phone,
  Mail,
  Printer,
  Compass,
  Building,
  ShieldCheck,
  Sparkles,
  ChevronDown,
  ChevronUp,
  MapPin,
  CheckCircle,
  Play,
  History,
  TrendingUp
} from 'lucide-react';

export const PropertyDetailPage = ({ property, onSelectListing, onSelectAgent, onNavigate }) => {
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const [isShowingModalOpen, setIsShowingModalOpen] = useState(false);
  const [showingDate, setShowingDate] = useState('Tomorrow, 2:00 PM');
  const [showingType, setShowingType] = useState('In-Person Private Tour');
  const [showingBooked, setShowingBooked] = useState(false);

  const { favorites, toggleFavorite, setScheduledShowings, addRecentlyViewed, openInquiryModal } = useApp();

  useEffect(() => {
    if (property) {
      addRecentlyViewed(property.id);
      window.scrollTo(0, 0);
    }
  }, [property, addRecentlyViewed]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!property) return null;

  const isFav = favorites.includes(property.id);
  const agent = AGENTS_DATA.find(a => a.id === property.agentId) || AGENTS_DATA[0];
  const similarProperties = LISTINGS_DATA.filter(p => p.id !== property.id).slice(0, 3);

  const formatPrice = (val) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  };

  const handleBookShowing = (e) => {
    e.preventDefault();
    setScheduledShowings(prev => [
      {
        id: `show-${Date.now()}`,
        propertyId: property.id,
        propertyTitle: property.title,
        date: showingDate,
        type: showingType,
        agentName: agent.name,
        status: 'Confirmed'
      },
      ...prev
    ]);
    setShowingBooked(true);
    setTimeout(() => {
      setShowingBooked(false);
      setIsShowingModalOpen(false);
      alert('Showing confirmed! Added to your Client Dashboard.');
    }, 1500);
  };

  const priceHistory = [
    { date: 'Nov 2024', event: 'Listed for Bespoke Private Offering', price: property.price, change: 'Current' },
    { date: 'Mar 2023', event: 'Comprehensive Architectural Restoration & Expansion', price: null, change: 'Renovation' },
    { date: 'Aug 2019', event: 'Previous Private Acquisition', price: Math.round(property.price * 0.72), change: '+38.9%' }
  ];

  return (
    <div style={{ paddingTop: '100px', background: 'var(--bg-chalk)', minHeight: '100vh', paddingBottom: '6rem' }}>
      {/* 1. SCROLL-AWARE STICKY SUMMARY BAR */}
      {showStickyBar && (
        <div
          style={{
            position: 'fixed',
            top: '70px',
            left: 0,
            right: 0,
            zIndex: 850,
            background: 'rgba(251, 251, 249, 0.95)',
            backdropFilter: 'blur(16px)',
            borderBottom: '1px solid var(--border-medium)',
            padding: '0.8rem 0',
            boxShadow: 'var(--shadow-md)',
            animation: 'fadeIn 0.3s'
          }}
        >
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: '700', fontSize: '1.1rem', fontFamily: 'var(--font-serif)' }}>{property.title}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {property.location.address} • {property.specs.beds} Beds • {property.specs.baths} Baths • {property.specs.sqft.toLocaleString()} sqft
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.4rem', fontWeight: '700', color: 'var(--accent-emerald)' }}>
                {formatPrice(property.price)}
              </div>
              <button
                onClick={() => setIsShowingModalOpen(true)}
                className="btn-primary"
                style={{ padding: '0.65rem 1.4rem', fontSize: '0.85rem' }}
              >
                Schedule Private Tour
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container">
        {/* Breadcrumb & Top Actions Strip */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <button onClick={() => onNavigate('home')} style={{ color: 'var(--text-muted)' }}>Home</button>
            <span>/</span>
            <button onClick={() => onNavigate('listings')} style={{ color: 'var(--text-muted)' }}>Residences</button>
            <span>/</span>
            <span style={{ color: 'var(--text-noir)', fontWeight: '600' }}>{property.location.neighborhoodName}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            {/* Print / PDF Listing Sheet Action */}
            <button
              onClick={() => window.print()}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.55rem 1rem',
                borderRadius: '8px',
                background: '#FFFFFF',
                border: '1px solid var(--border-light)',
                fontSize: '0.85rem',
                fontWeight: '500'
              }}
              title="Print Dossier Sheet"
            >
              <Printer size={16} />
              <span>Print Dossier (PDF)</span>
            </button>

            {/* Save to Favorites */}
            <button
              onClick={() => toggleFavorite(property.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.55rem 1rem',
                borderRadius: '8px',
                background: '#FFFFFF',
                border: '1px solid var(--border-light)',
                fontSize: '0.85rem',
                fontWeight: '500',
                color: isFav ? '#E11D48' : 'var(--text-noir)'
              }}
            >
              <Heart size={16} fill={isFav ? '#E11D48' : 'none'} />
              <span>{isFav ? 'Saved to Vault' : 'Save Residence'}</span>
            </button>

            {/* Share */}
            <button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                alert('Private listing link copied to clipboard.');
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.55rem 1rem',
                borderRadius: '8px',
                background: '#FFFFFF',
                border: '1px solid var(--border-light)',
                fontSize: '0.85rem',
                fontWeight: '500'
              }}
            >
              <Share2 size={16} />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* 2. FULL-WIDTH HERO GALLERY & LIGHTBOX */}
        <GalleryLightbox
          images={property.media.gallery}
          title={property.title}
          has360Tour={property.media.has360Tour}
        />

        {/* 3. MAIN SPEC GRID & NARRATIVE LAYOUT */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem', marginTop: '3rem' }}>
          {/* Left Column: Details, Amenities, Floor Plan, Mortgage */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {/* Title & Key Pricing Header */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem' }}>
                <span className={`badge-status ${property.status}`}>
                  {property.status.toUpperCase()}
                </span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  MLS #{property.mlsNumber}
                </span>
              </div>

              <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.2rem, 3.5vw, 3.2rem)', lineHeight: 1.15 }}>
                {property.title}
              </h1>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '1.05rem', marginTop: '0.4rem' }}>
                <MapPin size={18} color="var(--accent-emerald)" />
                <span>{property.location.address}, {property.location.city}, {property.location.state} {property.location.zip}</span>
              </div>

              {/* Stat Highlights Bar */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                  gap: '1rem',
                  background: '#FFFFFF',
                  padding: '1.5rem',
                  borderRadius: '14px',
                  border: '1px solid var(--border-light)',
                  marginTop: '2rem',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Offered At</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: '700', color: 'var(--accent-emerald)' }}>
                    {formatPrice(property.price)}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Bedrooms</div>
                  <div style={{ fontSize: '1.35rem', fontWeight: '600' }}>{property.specs.beds} Suites</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Bathrooms</div>
                  <div style={{ fontSize: '1.35rem', fontWeight: '600' }}>{property.specs.baths} Full / {property.specs.halfBaths || 0} Half</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Interior Living</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.35rem', fontWeight: '600' }}>
                    {property.specs.sqft.toLocaleString()} sqft
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Lot Size</div>
                  <div style={{ fontSize: '1.35rem', fontWeight: '600' }}>
                    {property.specs.lotSizeAcres ? `${property.specs.lotSizeAcres} Acres` : 'Urban Plot'}
                  </div>
                </div>
              </div>
            </div>

            {/* Narrative Description */}
            <div style={{ background: '#FFFFFF', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-light)' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '1rem' }}>
                Architectural & Spatial Narrative
              </h3>
              <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#374151' }}>
                {isDescExpanded ? property.description : `${property.description.slice(0, 240)}...`}
              </p>
              <button
                onClick={() => setIsDescExpanded(!isDescExpanded)}
                style={{ color: 'var(--accent-emerald)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.8rem' }}
              >
                {isDescExpanded ? (
                  <><span>Read Less</span><ChevronUp size={16} /></>
                ) : (
                  <><span>Read Full Architectural Narrative</span><ChevronDown size={16} /></>
                )}
              </button>
            </div>

            {/* Features & Amenities Grid */}
            <div style={{ background: '#FFFFFF', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-light)' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '1.2rem' }}>
                Distinguishing Amenities & Finishes
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                {property.amenities.map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.5rem 0' }}>
                    <CheckCircle size={18} color="var(--accent-emerald)" />
                    <span style={{ fontSize: '0.95rem', fontWeight: '500' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. PRICE HISTORY & VALUATION TIMELINE */}
            <div style={{ background: '#FFFFFF', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-light)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.2rem' }}>
                <History size={20} color="var(--accent-emerald)" />
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem' }}>
                  Provenance & Valuation Timeline
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                {priceHistory.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingBottom: '1rem',
                      borderBottom: idx < priceHistory.length - 1 ? '1px solid var(--border-light)' : 'none'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--accent-emerald)', fontWeight: '700', fontFamily: 'var(--font-mono)' }}>
                        {item.date}
                      </div>
                      <div style={{ fontWeight: '600', fontSize: '0.95rem', marginTop: '0.1rem' }}>
                        {item.event}
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      {item.price && (
                        <div style={{ fontFamily: 'var(--font-mono)', fontWeight: '700', fontSize: '1.1rem' }}>
                          {formatPrice(item.price)}
                        </div>
                      )}
                      <span style={{ fontSize: '0.75rem', background: 'var(--bg-sand)', padding: '0.2rem 0.6rem', borderRadius: '12px', color: 'var(--text-muted)' }}>
                        {item.change}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. INTERACTIVE FLOOR PLAN COMPONENT */}
            <InteractiveFloorPlan floors={property.floors} />

            {/* 6. 360 TOUR EMBED SIMULATION */}
            {property.media.has360Tour && (
              <div style={{ background: 'var(--bg-dark)', borderRadius: '16px', padding: '2rem', color: '#FFFFFF' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-sage)' }}>
                    <Sparkles size={18} />
                    <span style={{ fontSize: '0.85rem', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                      Virtual 360° Walkthrough
                    </span>
                  </div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>Spatial 4K Matterport Engine</span>
                </div>
                <div style={{ position: 'relative', height: '360px', borderRadius: '12px', overflow: 'hidden' }}>
                  <img src={property.media.gallery[1] || property.media.featuredImage} alt="Virtual Tour" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <button
                      onClick={() => alert('Launching immersive 3D Spatial Walkthrough...')}
                      style={{ width: '72px', height: '72px', borderRadius: '50%', background: '#FFFFFF', color: 'var(--text-noir)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 30px rgba(0,0,0,0.5)' }}
                    >
                      <Play size={28} fill="currentColor" style={{ marginLeft: '4px' }} />
                    </button>
                    <div style={{ marginTop: '1rem', fontWeight: '600', letterSpacing: '0.05em' }}>Click to Enter 3D Spatial Model</div>
                  </div>
                </div>
              </div>
            )}

            {/* 7. MORTGAGE CALCULATOR */}
            <MortgageCalculator
              defaultPrice={property.price}
              hoaMonthly={property.specs.hoaMonthly}
              annualTaxes={property.specs.annualTaxes}
            />
          </div>

          {/* Right Column: Sticky Showing & Agent Consultation Card */}
          <div>
            <div style={{ position: 'sticky', top: '100px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Schedule Private Tour Box */}
              <div
                style={{
                  background: '#FFFFFF',
                  borderRadius: '16px',
                  border: '1px solid var(--border-light)',
                  padding: '2rem',
                  boxShadow: 'var(--shadow-md)'
                }}
              >
                <span style={{ color: 'var(--accent-emerald)', fontSize: '0.75rem', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                  Private Client Services
                </span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', margin: '0.2rem 0 1rem' }}>
                  Request Confidential Showing
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <button
                    onClick={() => setIsShowingModalOpen(true)}
                    className="btn-primary"
                    style={{ width: '100%', padding: '0.9rem' }}
                  >
                    <Calendar size={18} />
                    <span>Schedule In-Person Tour</span>
                  </button>

                  <button
                    onClick={() => openInquiryModal(property.id, property.title)}
                    className="btn-secondary"
                    style={{ width: '100%', padding: '0.9rem' }}
                  >
                    <Mail size={18} />
                    <span>Inquire with Listing Agent</span>
                  </button>
                </div>
              </div>

              {/* Agent Attribution Card */}
              <div
                style={{
                  background: '#FFFFFF',
                  borderRadius: '16px',
                  border: '1px solid var(--border-light)',
                  padding: '1.8rem',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.2rem' }}>
                  <img
                    src={agent.photo}
                    alt={agent.name}
                    style={{ width: '70px', height: '70px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', fontWeight: '600', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                      Exclusive Listing Partner
                    </div>
                    <div
                      onClick={() => onSelectAgent(agent)}
                      style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: '600', cursor: 'pointer' }}
                    >
                      {agent.name}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{agent.title}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.88rem', borderTop: '1px solid var(--border-light)', paddingTop: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <Phone size={15} color="var(--accent-emerald)" />
                    <span>{agent.phone}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <Mail size={15} color="var(--accent-emerald)" />
                    <span>{agent.email}</span>
                  </div>
                </div>

                <button
                  onClick={() => onSelectAgent(agent)}
                  style={{ width: '100%', marginTop: '1.2rem', padding: '0.7rem', border: '1px solid var(--border-medium)', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '600', color: 'var(--accent-emerald)' }}
                >
                  View Advisor Profile & Record →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 8. SIMILAR RESIDENCES CAROUSEL */}
        <div style={{ marginTop: '6rem', borderTop: '1px solid var(--border-light)', paddingTop: '4rem' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', marginBottom: '2.5rem' }}>
            Comparable Prime Residences
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2rem' }}>
            {similarProperties.map(sim => (
              <PropertyCard
                key={sim.id}
                property={sim}
                onSelect={(p) => onSelectListing(p)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Schedule Showing Modal */}
      {isShowingModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1100,
            background: 'rgba(17,19,21,0.8)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
          }}
          onClick={() => setIsShowingModalOpen(false)}
        >
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '20px',
              padding: '2.5rem',
              maxWidth: '520px',
              width: '100%',
              boxShadow: 'var(--shadow-dark)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {showingBooked ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <CheckCircle size={60} color="var(--accent-emerald)" style={{ margin: '0 auto 1rem' }} />
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem' }}>Private Showing Confirmed</h3>
                <p style={{ color: 'var(--text-muted)' }}>{property.title} scheduled for {showingDate}.</p>
              </div>
            ) : (
              <form onSubmit={handleBookShowing}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: '0.4rem' }}>
                  Schedule Private Showing
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                  {property.title} • Hosted by {agent.name}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.3rem' }}>Showing Format</label>
                    <select
                      className="form-select"
                      value={showingType}
                      onChange={(e) => setShowingType(e.target.value)}
                    >
                      <option>In-Person Private Tour</option>
                      <option>Live Agent 4K Video Walkthrough</option>
                      <option>Private Architect & Builder Session</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.3rem' }}>Preferred Date & Window</label>
                    <select
                      className="form-select"
                      value={showingDate}
                      onChange={(e) => setShowingDate(e.target.value)}
                    >
                      <option>Tomorrow, 10:00 AM (Morning Light)</option>
                      <option>Tomorrow, 2:00 PM</option>
                      <option>Tomorrow, 5:30 PM (Sunset Viewing)</option>
                      <option>This Saturday, 11:00 AM</option>
                    </select>
                  </div>

                  <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
                    Confirm Tour Reservation
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
