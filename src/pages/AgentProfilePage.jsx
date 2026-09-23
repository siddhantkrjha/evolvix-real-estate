import React, { useState } from 'react';
import { LISTINGS_DATA } from '../data/listingsData';
import { AGENTS_DATA } from '../data/agentsData';
import { PropertyCard } from '../components/common/PropertyCard';
import { StatsCounter } from '../components/common/StatsCounter';
import { Phone, Mail, Calendar, CheckCircle, Play, FileText, X, ArrowUpRight } from 'lucide-react';

export const AgentProfilePage = ({ agent, onSelectListing, onNavigate }) => {
  const currentAgent = agent || AGENTS_DATA[0];
  const [selectedConsultDate, setSelectedConsultDate] = useState('Tomorrow, 3:00 PM');
  const [consultBooked, setConsultBooked] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportEmail, setReportEmail] = useState('');
  const [reportSent, setReportSent] = useState(false);

  const agentListings = LISTINGS_DATA.filter(p => p.agentId === currentAgent.id);
  const otherAgents = AGENTS_DATA.filter(a => a.id !== currentAgent.id);

  const handleBookConsult = (e) => {
    e.preventDefault();
    setConsultBooked(true);
    setTimeout(() => {
      setConsultBooked(false);
      alert(`Consultation confirmed with ${currentAgent.name} for ${selectedConsultDate}. A calendar invitation has been dispatched.`);
    }, 1500);
  };

  const handleReportDownload = (e) => {
    e.preventDefault();
    setReportSent(true);
    setTimeout(() => {
      setReportSent(false);
      setIsReportModalOpen(false);
      alert(`The Q1 Ultra-Prime Market Intelligence Report prepared by ${currentAgent.name} has been sent to ${reportEmail}.`);
    }, 1500);
  };

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', background: 'var(--bg-chalk)', paddingBottom: '6rem' }}>
      <div className="container">
        {/* Agent Profile Hero */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '20px',
            overflow: 'hidden',
            border: '1px solid var(--border-light)',
            boxShadow: 'var(--shadow-md)',
            marginBottom: '3.5rem'
          }}
        >
          <div
            style={{
              height: '240px',
              background: `linear-gradient(to right, rgba(17,19,21,0.85), rgba(27,59,43,0.7)), url('${currentAgent.coverPhoto}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              paddingRight: '2rem'
            }}
          >
            {/* Watch Video Intro Trigger */}
            <button
              onClick={() => setIsVideoModalOpen(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                background: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.4)',
                color: '#FFFFFF',
                padding: '0.65rem 1.2rem',
                borderRadius: '30px',
                fontSize: '0.82rem',
                fontWeight: '600'
              }}
            >
              <Play size={14} fill="#FFF" />
              <span>Watch 2-Min Video Briefing</span>
            </button>
          </div>

          <div style={{ padding: '0 3rem 2.5rem', position: 'relative', marginTop: '-70px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '2rem' }}>
              <div style={{ display: 'flex', gap: '1.8rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
                <img
                  src={currentAgent.photo}
                  alt={currentAgent.name}
                  style={{ width: '140px', height: '140px', borderRadius: '50%', objectFit: 'cover', border: '4px solid #FFFFFF', boxShadow: 'var(--shadow-md)' }}
                />
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--accent-emerald)', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                    {currentAgent.license}
                  </div>
                  <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', marginTop: '0.1rem' }}>
                    {currentAgent.name}
                  </h1>
                  <div style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>
                    {currentAgent.title}
                  </div>
                </div>
              </div>

              {/* Direct Connect Buttons & Download Report */}
              <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setIsReportModalOpen(true)}
                  className="btn-secondary"
                  style={{ padding: '0.7rem 1.2rem', fontSize: '0.85rem' }}
                >
                  <FileText size={16} />
                  <span>Market Report</span>
                </button>
                <a href={`tel:${currentAgent.phone}`} className="btn-secondary" style={{ padding: '0.7rem 1.2rem', fontSize: '0.85rem' }}>
                  <Phone size={16} />
                  <span>{currentAgent.phone}</span>
                </a>
                <a href={`mailto:${currentAgent.email}`} className="btn-primary" style={{ padding: '0.7rem 1.4rem', fontSize: '0.85rem' }}>
                  <Mail size={16} />
                  <span>Direct Message</span>
                </a>
              </div>
            </div>

            {/* Specialties & Enclaves Badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginTop: '2rem' }}>
              {currentAgent.specialties.map((spec, i) => (
                <span key={i} style={{ background: 'var(--bg-sand)', padding: '0.4rem 0.9rem', borderRadius: '20px', fontSize: '0.82rem', fontWeight: '500' }}>
                  {spec}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Counters Strip */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid var(--border-light)',
            padding: '2.5rem',
            marginBottom: '3.5rem',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
            <StatsCounter value={parseFloat(currentAgent.stats.salesVolume.replace(/[^0-9.]/g, ''))} prefix="$" suffix="M+" label="Career Sales Volume" />
            <StatsCounter value={parseInt(currentAgent.stats.homesSold, 10)} suffix=" Homes" label="Trophy Residences Closed" />
            <StatsCounter value={parseInt(currentAgent.stats.avgDaysOnMarket, 10)} suffix=" Days" label="Average Days on Market" />
            <div style={{ textAlign: 'center' }}>
              <div className="stat-counter-val" style={{ color: 'var(--accent-terracotta)' }}>{currentAgent.stats.clientSatisfaction}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '0.4rem', fontWeight: '500' }}>Client Trust Index</div>
            </div>
          </div>
        </div>

        {/* Main 2-Column: Bio & Booking / Testimonials */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.1fr', gap: '3rem', marginBottom: '5rem' }}>
          <div>
            {/* Bio Narrative */}
            <div style={{ background: '#FFFFFF', padding: '2.2rem', borderRadius: '16px', border: '1px solid var(--border-light)', marginBottom: '2.5rem' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: '1rem' }}>
                Strategic Advisory Background
              </h2>
              <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#374151' }}>
                {currentAgent.bio}
              </p>
            </div>

            {/* Active Portfolio */}
            <div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: '1.5rem' }}>
                Represented Properties & Active Listings ({agentListings.length})
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {agentListings.map(p => (
                  <PropertyCard
                    key={p.id}
                    property={p}
                    onSelect={(prop) => onSelectListing(prop)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Book Consultation & Testimonials */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Calendar Booking Card */}
            <div style={{ background: '#FFFFFF', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', marginBottom: '0.4rem' }}>
                Book Private Advisory Session
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.2rem' }}>
                Schedule a confidential 30-minute video or in-person consultation with {currentAgent.name}.
              </p>

              {consultBooked ? (
                <div style={{ textAlign: 'center', padding: '1rem' }}>
                  <CheckCircle size={40} color="var(--accent-emerald)" style={{ margin: '0 auto 0.5rem' }} />
                  <div style={{ fontWeight: '600' }}>Session Confirmed!</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Calendar invite sent.</div>
                </div>
              ) : (
                <form onSubmit={handleBookConsult}>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.3rem' }}>Available Time Slot</label>
                    <select
                      className="form-select"
                      value={selectedConsultDate}
                      onChange={(e) => setSelectedConsultDate(e.target.value)}
                    >
                      <option>Tomorrow, 11:00 AM EST</option>
                      <option>Tomorrow, 3:00 PM EST</option>
                      <option>Thursday, 10:00 AM EST</option>
                      <option>Friday, 2:00 PM EST</option>
                    </select>
                  </div>

                  <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                    <Calendar size={16} />
                    <span>Reserve Session</span>
                  </button>
                </form>
              )}
            </div>

            {/* Testimonials */}
            <div style={{ background: 'var(--bg-dark)', color: '#FFFFFF', padding: '2rem', borderRadius: '16px' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: '#FFF', marginBottom: '1.2rem' }}>
                Client Endorsements
              </h3>
              {currentAgent.testimonials.map((t, idx) => (
                <div key={idx} style={{ marginBottom: '1.5rem', borderBottom: idx < currentAgent.testimonials.length - 1 ? '1px solid var(--border-dark)' : 'none', paddingBottom: '1rem' }}>
                  <p style={{ fontStyle: 'italic', fontSize: '0.92rem', color: 'var(--text-sand)', lineHeight: '1.6' }}>
                    "{t.quote}"
                  </p>
                  <div style={{ marginTop: '0.6rem', fontWeight: '600', fontSize: '0.88rem', color: '#FFF' }}>
                    {t.author}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--accent-sage)' }}>
                    {t.context}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Meet the Advisory Collective */}
        <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '4rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
            <div>
              <span style={{ color: 'var(--accent-emerald)', fontSize: '0.8rem', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                Collaborative Brokerage
              </span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginTop: '0.2rem' }}>
                Explore Other Regional Partners
              </h2>
            </div>
            {onNavigate && (
              <button onClick={() => onNavigate('agents')} className="btn-secondary">
                <span>All Advisors</span>
                <ArrowUpRight size={15} />
              </button>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {otherAgents.map(ag => (
              <div
                key={ag.id}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  if (onNavigate) onNavigate('agent');
                }}
                style={{ background: '#FFFFFF', borderRadius: '14px', overflow: 'hidden', border: '1px solid var(--border-light)', cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}
              >
                <img src={ag.photo} alt={ag.name} style={{ width: '100%', height: '240px', objectFit: 'cover' }} />
                <div style={{ padding: '1.2rem' }}>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem' }}>{ag.name}</h4>
                  <div style={{ fontSize: '0.82rem', color: 'var(--accent-emerald)', fontWeight: '600' }}>{ag.title}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>Sales: {ag.stats.salesVolume}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Video Intro Modal */}
      {isVideoModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1100,
            background: 'rgba(17,19,21,0.85)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
          }}
          onClick={() => setIsVideoModalOpen(false)}
        >
          <div
            style={{
              background: '#000000',
              borderRadius: '20px',
              overflow: 'hidden',
              maxWidth: '720px',
              width: '100%',
              boxShadow: 'var(--shadow-dark)',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsVideoModalOpen(false)}
              style={{ position: 'absolute', top: '16px', right: '16px', color: '#FFF', background: 'rgba(0,0,0,0.6)', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}
            >
              <X size={20} />
            </button>
            <div style={{ position: 'relative', aspectRatio: '16/9' }}>
              <img src={currentAgent.coverPhoto} alt={currentAgent.name} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} />
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#FFF', padding: '2rem', textAlign: 'center' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                  <Play size={28} fill="#FFF" style={{ marginLeft: '3px' }} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem' }}>Advisor Perspective: {currentAgent.name}</h3>
                <p style={{ color: 'var(--text-sand)', fontSize: '0.9rem', maxWidth: '440px', marginTop: '0.4rem' }}>
                  Ultra-Prime Market Advisory & Fiduciary Representation Overview
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Download Market Report Modal */}
      {isReportModalOpen && (
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
          onClick={() => setIsReportModalOpen(false)}
        >
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '20px',
              padding: '2.5rem',
              maxWidth: '480px',
              width: '100%',
              boxShadow: 'var(--shadow-dark)',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsReportModalOpen(false)}
              style={{ position: 'absolute', top: '16px', right: '16px' }}
            >
              <X size={20} />
            </button>

            {reportSent ? (
              <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                <CheckCircle size={48} color="var(--accent-emerald)" style={{ margin: '0 auto 1rem' }} />
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem' }}>Report Transmitted</h3>
                <p style={{ color: 'var(--text-muted)' }}>The confidential dossier is in your inbox.</p>
              </div>
            ) : (
              <form onSubmit={handleReportDownload}>
                <div style={{ color: 'var(--accent-emerald)', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', marginBottom: '0.3rem' }}>
                  Complimentary Research
                </div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', marginBottom: '0.5rem' }}>
                  Download Q1 Luxury Dossier
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                  Comprehensive pricing velocity, liquidity analysis, and off-market trends curated by {currentAgent.name}.
                </p>

                <div style={{ marginBottom: '1.2rem' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.3rem' }}>Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="name@privateoffice.com"
                    value={reportEmail}
                    onChange={(e) => setReportEmail(e.target.value)}
                    className="form-input"
                  />
                </div>

                <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                  <FileText size={16} />
                  <span>Receive Confidential PDF</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
