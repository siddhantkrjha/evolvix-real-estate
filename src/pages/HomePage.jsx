import React, { useState, useEffect } from 'react';
import { LISTINGS_DATA } from '../data/listingsData';
import { AGENTS_DATA } from '../data/agentsData';
import { NEIGHBORHOODS_DATA } from '../data/neighborhoodsData';
import { PropertyCard } from '../components/common/PropertyCard';
import { SearchEngineBar } from '../components/common/SearchEngineBar';
import { StatsCounter } from '../components/common/StatsCounter';
import { MortgageCalculator } from '../components/property/MortgageCalculator';
import { useApp } from '../context/AppContext';
import {
  ArrowUpRight,
  Play,
  Sparkles,
  Shield,
  ChevronRight,
  ChevronLeft,
  Award,
  Building2,
  Star,
  Quote,
  Calculator,
  CheckCircle2
} from 'lucide-react';

export const HomePage = ({ onNavigate, onSelectListing, onSelectAgent, onSelectNeighborhood }) => {
  const [filterCategory, setFilterCategory] = useState('all');
  const [currentTestimonialIdx, setCurrentTestimonialIdx] = useState(0);
  const { openInquiryModal } = useApp();

  const testimonials = [
    {
      quote: "Evolvix orchestrated the acquisition of our Holmby Hills estate with extraordinary discretion. Their institutional modeling and off-market syndication network are unmatched in North America.",
      author: "Lord Alistair Sterling",
      role: "Global Managing Director, Sovereign Capital",
      location: "Acquired $32.5M Estate in Bel Air, CA",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
    },
    {
      quote: "Selling our TriBeCa penthouse required absolute privacy and targeted international marketing. The team delivered three sovereign offers within 18 days above our reserve price.",
      author: "Elena Rostova",
      role: "Tech Founder & Venture Capitalist",
      location: "Sold $18.2M Penthouse in SoHo / TriBeCa, NYC",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    },
    {
      quote: "The architectural depth and fiduciary precision Evolvix brings to real estate advisory feels more like a private family office than a traditional brokerage.",
      author: "Marcus Vance",
      role: "Principal, Vance Heritage Trust",
      location: "Acquired $24.8M Waterfront Compound in Miami, FL",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
    }
  ];

  // Auto-advance testimonials carousel every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonialIdx((prev) => (prev + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const filteredProperties = LISTINGS_DATA.filter(item => {
    if (filterCategory === 'all') return true;
    if (filterCategory === 'estate') return item.propertyType === 'estate';
    if (filterCategory === 'penthouse') return item.propertyType === 'penthouse';
    if (filterCategory === 'waterfront') return item.propertyType === 'waterfront';
    return true;
  });

  const spotlightProperty = LISTINGS_DATA[0];

  return (
    <div style={{ paddingTop: '0' }}>
      {/* 1. HERO SECTION (Full-bleed high-res photography/video treatment) */}
      <section
        style={{
          position: 'relative',
          minHeight: '94vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          padding: '130px 1.5rem 70px',
          backgroundImage: `linear-gradient(to bottom, rgba(17, 19, 21, 0.45) 0%, rgba(17, 19, 21, 0.7) 100%), url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=90')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#FFFFFF'
        }}
      >
        <div style={{ maxWidth: '940px', marginBottom: '2.5rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.45rem 1.1rem',
              borderRadius: '30px',
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              fontSize: '0.8rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              marginBottom: '1.2rem',
              fontFamily: 'var(--font-mono)'
            }}
          >
            <Sparkles size={14} color="var(--accent-gold)" />
            <span>Private Luxury Real Estate Advisory</span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.8rem, 6vw, 4.8rem)',
              fontWeight: 500,
              lineHeight: 1.08,
              letterSpacing: '-0.02em',
              color: '#FFFFFF',
              textShadow: '0 4px 24px rgba(0,0,0,0.4)'
            }}
          >
            Curating Exceptional Living Across the World’s Prime Enclaves
          </h1>

          <p
            style={{
              fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
              color: 'rgba(255, 255, 255, 0.9)',
              marginTop: '1.2rem',
              fontWeight: 300,
              maxWidth: '720px',
              margin: '1.2rem auto 0',
              lineHeight: '1.6'
            }}
          >
            Exclusive off-market estates, architectural masterworks, and penthouse sanctuaries represented with discretion and data precision.
          </p>
        </div>

        {/* Embedded Hero Search Engine Bar */}
        <SearchEngineBar
          mode="hero"
          onSearch={(filters) => {
            onNavigate('listings', filters);
          }}
        />
      </section>

      {/* 2. MARKET STATS BAR (Scroll Animated Counters) */}
      <section
        style={{
          background: '#FFFFFF',
          borderBottom: '1px solid var(--border-light)',
          padding: '3.2rem 0'
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '2.5rem',
              alignItems: 'center'
            }}
          >
            <StatsCounter value={1.85} prefix="$" suffix="B+" label="Career Sales Volume" duration={2000} />
            <StatsCounter value={14} suffix=" Days" label="Median Days to Contract" duration={1800} />
            <StatsCounter value={99.4} suffix="%" label="List-to-Sale Valuation Ratio" duration={2200} />
            <StatsCounter value={350} prefix="" suffix="+ Trophy Assets" label="Global Private Portfolio" duration={2400} />
          </div>
        </div>
      </section>

      {/* 3. CURATED RESIDENCES (Featured Listings Carousel/Grid) */}
      <section style={{ padding: '6rem 0', background: 'var(--bg-chalk)' }}>
        <div className="container">
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              gap: '1.5rem',
              marginBottom: '3rem'
            }}
          >
            <div>
              <span style={{ color: 'var(--accent-emerald)', fontSize: '0.8rem', fontWeight: '600', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                Curated Collection
              </span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', marginTop: '0.3rem' }}>
                Featured Prime Residences
              </h2>
            </div>

            {/* Filter Tabs */}
            <div style={{ display: 'flex', gap: '0.5rem', background: 'var(--bg-sand)', padding: '0.35rem', borderRadius: '30px' }}>
              {[
                { id: 'all', label: 'All Portfolios' },
                { id: 'estate', label: 'Estates' },
                { id: 'penthouse', label: 'Penthouses' },
                { id: 'waterfront', label: 'Waterfront' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setFilterCategory(tab.id)}
                  style={{
                    padding: '0.5rem 1.2rem',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    fontWeight: filterCategory === tab.id ? '600' : '400',
                    background: filterCategory === tab.id ? 'var(--accent-emerald)' : 'transparent',
                    color: filterCategory === tab.id ? '#FFFFFF' : 'var(--text-noir)',
                    transition: 'all 0.2s'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Properties Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '2rem'
            }}
          >
            {filteredProperties.map(prop => (
              <PropertyCard
                key={prop.id}
                property={prop}
                onSelect={(p) => onSelectListing(p)}
                onNeighborhoodClick={onSelectNeighborhood}
              />
            ))}
          </div>

          {/* View All Button */}
          <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
            <button
              onClick={() => onNavigate('listings')}
              className="btn-secondary"
              style={{ padding: '1rem 2.4rem', fontSize: '0.95rem' }}
            >
              <span>Explore All Global Residences</span>
              <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* 4. VIRTUAL TOUR SPOTLIGHT (Cinematic 360 Walkthrough Section) */}
      <section style={{ padding: '5.5rem 0', background: 'var(--bg-dark)', color: '#FFFFFF' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
              gap: '3.5rem',
              alignItems: 'center'
            }}
          >
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-sage)', fontSize: '0.8rem', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                <Sparkles size={14} />
                <span>Cinematic Immersive Showcase</span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.6rem', color: '#FFFFFF', marginTop: '0.5rem', lineHeight: 1.15 }}>
                {spotlightProperty.title}
              </h2>
              <p style={{ color: 'var(--text-sand)', fontSize: '1.05rem', margin: '1.2rem 0 1.8rem', lineHeight: 1.6 }}>
                Experience spatial architecture without geographic boundaries. Tour every cantilevered terrace, marble primary suite, and wine vault with precision 4K dollhouse walkthroughs.
              </p>

              <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', borderTop: '1px solid var(--border-dark)', paddingTop: '1.5rem' }}>
                <div>
                  <div style={{ color: 'var(--text-light)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Valuation</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.4rem', fontWeight: '700', color: '#FFF' }}>
                    ${(spotlightProperty.price / 1000000).toFixed(2)}M
                  </div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-light)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Interior Space</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.4rem', fontWeight: '700', color: '#FFF' }}>
                    {spotlightProperty.specs.sqft.toLocaleString()} sqft
                  </div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-light)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Enclave</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: '600', color: '#FFF' }}>
                    {spotlightProperty.location.neighborhoodName}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => onSelectListing(spotlightProperty)}
                  className="btn-primary"
                  style={{ background: 'var(--accent-sage)', color: 'var(--bg-dark)' }}
                >
                  <Play size={16} fill="currentColor" />
                  <span>Launch 360° Walkthrough</span>
                </button>
                <button
                  onClick={() => openInquiryModal(spotlightProperty.id, spotlightProperty.title)}
                  className="btn-ghost-white"
                >
                  Request Private Showing
                </button>
              </div>
            </div>

            {/* Spotlight Visual Frame */}
            <div
              style={{
                position: 'relative',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 30px 60px rgba(0,0,0,0.6)',
                aspectRatio: '16/10',
                cursor: 'pointer'
              }}
              onClick={() => onSelectListing(spotlightProperty)}
            >
              <img
                src={spotlightProperty.media.featuredImage}
                alt={spotlightProperty.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(0,0,0,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <div
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.92)',
                    color: 'var(--text-noir)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
                    transition: 'transform 0.3s'
                  }}
                >
                  <Play size={32} fill="currentColor" style={{ marginLeft: '4px' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. NEIGHBORHOODS & ENCLAVES (Bento Grid of Curated Areas) */}
      <section style={{ padding: '6rem 0', background: 'var(--bg-sand)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3.5rem' }}>
            <span style={{ color: 'var(--accent-emerald)', fontSize: '0.8rem', fontWeight: '600', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
              Geographic Dossiers
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', marginTop: '0.3rem' }}>
              Prime Luxury Enclaves
            </h2>
            <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              Explore real-time valuation metrics, architectural heritage, and lifestyle indices across premier zip codes.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2rem'
            }}
          >
            {NEIGHBORHOODS_DATA.map(neigh => (
              <div
                key={neigh.id}
                onClick={() => onSelectNeighborhood(neigh)}
                style={{
                  position: 'relative',
                  height: '420px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-md)'
                }}
              >
                <img
                  src={neigh.heroImage}
                  alt={neigh.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s var(--ease-luxury)' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(17,19,21,0.9) 0%, rgba(17,19,21,0.2) 60%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '2rem',
                    color: '#FFF'
                  }}
                >
                  <span style={{ fontSize: '0.8rem', color: 'var(--accent-sage)', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                    {neigh.city}
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: '#FFF', margin: '0.2rem 0 0.5rem' }}>
                    {neigh.name}
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-sand)', marginBottom: '1.2rem' }}>
                    {neigh.tagline}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '0.8rem', fontSize: '0.82rem' }}>
                    <div>
                      <div style={{ color: 'var(--text-light)' }}>Median Valuation</div>
                      <strong style={{ fontFamily: 'var(--font-mono)' }}>{neigh.stats.medianPrice}</strong>
                    </div>
                    <div>
                      <div style={{ color: 'var(--text-light)' }}>YoY Velocity</div>
                      <strong style={{ color: 'var(--accent-sage)' }}>{neigh.stats.yoyChange}</strong>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. AGENTS & ADVISORY COLLECTIVE */}
      <section style={{ padding: '6rem 0', background: '#FFFFFF' }}>
        <div className="container">
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              gap: '1.5rem',
              marginBottom: '3.5rem'
            }}
          >
            <div>
              <span style={{ color: 'var(--accent-emerald)', fontSize: '0.8rem', fontWeight: '600', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                Private Advisory Group
              </span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', marginTop: '0.3rem' }}>
                Meet Our Principal Partners
              </h2>
            </div>
            <button
              onClick={() => onNavigate('agents')}
              className="btn-secondary"
            >
              <span>View All Advisors</span>
              <ChevronRight size={16} />
            </button>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2.5rem'
            }}
          >
            {AGENTS_DATA.map(agent => (
              <div
                key={agent.id}
                onClick={() => onSelectAgent(agent)}
                style={{
                  cursor: 'pointer',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  background: 'var(--bg-chalk)',
                  border: '1px solid var(--border-light)',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'transform 0.3s'
                }}
              >
                <div style={{ height: '360px', overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={agent.photo}
                    alt={agent.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      left: '12px',
                      background: 'rgba(17,19,21,0.85)',
                      backdropFilter: 'blur(6px)',
                      color: '#FFF',
                      padding: '0.3rem 0.8rem',
                      borderRadius: '20px',
                      fontSize: '0.75rem',
                      fontFamily: 'var(--font-mono)'
                    }}
                  >
                    Volume: {agent.stats.salesVolume}
                  </div>
                </div>

                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', marginBottom: '0.2rem' }}>
                    {agent.name}
                  </h3>
                  <div style={{ color: 'var(--accent-emerald)', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.6rem' }}>
                    {agent.title}
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineClamp: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {agent.tagline}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS CAROUSEL (Smooth Auto-Advance & Controls) */}
      <section style={{ padding: '6rem 0', background: 'var(--bg-chalk)', borderTop: '1px solid var(--border-light)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 3.5rem' }}>
            <span style={{ color: 'var(--accent-emerald)', fontSize: '0.8rem', fontWeight: '600', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
              Fiduciary Distinction
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', marginTop: '0.3rem' }}>
              Client Trust & Provenance
            </h2>
          </div>

          <div
            style={{
              maxWidth: '900px',
              margin: '0 auto',
              background: '#FFFFFF',
              borderRadius: '24px',
              padding: 'clamp(2.5rem, 5vw, 4rem)',
              border: '1px solid var(--border-light)',
              boxShadow: 'var(--shadow-md)',
              position: 'relative',
              transition: 'all 0.4s ease'
            }}
          >
            <div style={{ display: 'flex', gap: '0.3rem', color: 'var(--accent-gold)', marginBottom: '1.5rem' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill="currentColor" />
              ))}
            </div>

            <Quote size={48} color="var(--bg-sand)" style={{ position: 'absolute', top: '30px', right: '40px', opacity: 0.8 }} />

            <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.2rem, 2.2vw, 1.55rem)', lineHeight: '1.6', color: 'var(--text-noir)', fontStyle: 'italic', marginBottom: '2rem' }}>
              "{testimonials[currentTestimonialIdx].quote}"
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1.5rem', borderTop: '1px solid var(--border-light)', paddingTop: '1.8rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <img
                  src={testimonials[currentTestimonialIdx].image}
                  alt={testimonials[currentTestimonialIdx].author}
                  style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <div style={{ fontWeight: '600', fontSize: '1.05rem' }}>{testimonials[currentTestimonialIdx].author}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--accent-emerald)', fontWeight: '500' }}>{testimonials[currentTestimonialIdx].role}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{testimonials[currentTestimonialIdx].location}</div>
                </div>
              </div>

              {/* Carousel Navigation Buttons */}
              <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                <button
                  onClick={() => setCurrentTestimonialIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: 'var(--bg-sand)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-noir)',
                    transition: 'all 0.2s'
                  }}
                  aria-label="Previous Testimonial"
                >
                  <ChevronLeft size={20} />
                </button>
                <div style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', fontWeight: '600', color: 'var(--text-muted)', minWidth: '45px', textAlign: 'center' }}>
                  0{currentTestimonialIdx + 1} / 0{testimonials.length}
                </div>
                <button
                  onClick={() => setCurrentTestimonialIdx((prev) => (prev + 1) % testimonials.length)}
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: 'var(--bg-sand)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-noir)',
                    transition: 'all 0.2s'
                  }}
                  aria-label="Next Testimonial"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. INTERACTIVE MORTGAGE & AFFORDABILITY CALCULATOR ADD-ON */}
      <section style={{ padding: '5.5rem 0', background: '#FFFFFF', borderTop: '1px solid var(--border-light)' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ color: 'var(--accent-emerald)', fontSize: '0.8rem', fontWeight: '600', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
              Capital Planning Suite
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', marginTop: '0.3rem' }}>
              Portfolio Financing & Liquidity Planner
            </h2>
            <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              Model down payment allocations, jumbo loan terms, and blended carrying costs across prime residential acquisitions.
            </p>
          </div>

          <MortgageCalculator defaultPrice={12500000} hoaMonthly={1800} annualTaxes={95000} />
        </div>
      </section>

      {/* 9. MID-PAGE VALUATION CTA BANNER */}
      <section style={{ padding: '5rem 0', background: 'var(--bg-dark)', color: '#FFFFFF' }}>
        <div className="container">
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(27,59,43,0.9) 0%, rgba(17,19,21,0.95) 100%)',
              borderRadius: '24px',
              padding: 'clamp(2.5rem, 5vw, 4.5rem)',
              border: '1px solid rgba(255,255,255,0.15)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '2.5rem'
            }}
          >
            <div style={{ maxWidth: '560px' }}>
              <span style={{ color: 'var(--accent-sage)', fontSize: '0.8rem', letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                Asset Valuation Portal
              </span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: '#FFF', marginTop: '0.4rem', lineHeight: 1.15 }}>
                Understand the True Value of Your Legacy Residence
              </h2>
              <p style={{ color: 'var(--text-sand)', fontSize: '1.05rem', marginTop: '1rem' }}>
                Access off-market comps, sovereign capital demand indices, and an institutional appraisal prepared by our senior partners.
              </p>
            </div>

            <div>
              <button
                onClick={() => onNavigate('sell')}
                className="btn-primary"
                style={{ background: '#FFFFFF', color: 'var(--accent-emerald)', padding: '1.1rem 2.4rem', fontSize: '1rem', fontWeight: '600' }}
              >
                <span>Initiate Property Valuation →</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
