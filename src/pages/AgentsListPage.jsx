import React, { useState } from 'react';
import { AGENTS_DATA } from '../data/agentsData';
import { Sparkles, ArrowUpRight, Star, Phone, Mail, Award, Building2 } from 'lucide-react';

export const AgentsListPage = ({ onSelectAgent, onNavigate }) => {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', background: 'var(--bg-chalk)', paddingBottom: '6rem' }}>

      {/* Hero Header */}
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
            backgroundImage: `url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.15
          }}
        />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-sage)', fontSize: '0.8rem', fontWeight: '600', letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', marginBottom: '0.8rem' }}>
            <Sparkles size={14} />
            <span>Private Advisory Collective</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#FFFFFF', lineHeight: 1.1, maxWidth: '700px' }}>
            Our Principal<br />Partners & Advisors
          </h1>
          <p style={{ color: 'var(--text-sand)', fontSize: '1.1rem', marginTop: '1rem', maxWidth: '600px', lineHeight: '1.7' }}>
            A curated collective of senior luxury real estate advisors with decades of experience in ultra-prime residential markets across North America.
          </p>
          <div style={{ display: 'flex', gap: '3rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
            {[
              { label: 'Collective Sales Volume', value: '$1.85B+' },
              { label: 'Combined Experience', value: '45+ Years' },
              { label: 'Markets Covered', value: '12 Prime Enclaves' }
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: '700', color: 'var(--accent-sage)' }}>{s.value}</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-light)', marginTop: '0.2rem' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container">
        {/* Differentiators */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginBottom: '4.5rem' }}>
          {[
            { icon: Award, title: 'Fiduciary-First Ethos', desc: 'Every partner operates under strict confidentiality agreements and NDA protocols for all client interactions.' },
            { icon: Building2, title: 'Institutional-Grade Analysis', desc: 'Access to off-market deal flow, sovereign wealth comparables, and institutional valuation modeling.' },
            { icon: Star, title: 'Trophy Residences Only', desc: 'Our advisors specialize exclusively in properties $5M and above in the world\'s most coveted enclaves.' }
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} style={{ background: '#FFFFFF', padding: '1.8rem', borderRadius: '14px', border: '1px solid var(--border-light)', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'var(--accent-sage-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={20} color="var(--accent-emerald)" />
                </div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: '1.6' }}>{item.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Section Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span style={{ color: 'var(--accent-emerald)', fontSize: '0.8rem', fontWeight: '600', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
              Meet The Team
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', marginTop: '0.3rem' }}>
              Advisory Partners ({AGENTS_DATA.length})
            </h2>
          </div>
          <button onClick={() => onNavigate && onNavigate('contact')} className="btn-secondary">
            <span>Work With Our Team</span>
            <ArrowUpRight size={16} />
          </button>
        </div>

        {/* Agents Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2.5rem' }}>
          {AGENTS_DATA.map(agent => (
            <div
              key={agent.id}
              onClick={() => onSelectAgent && onSelectAgent(agent)}
              onMouseEnter={() => setHoveredId(agent.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                cursor: 'pointer',
                borderRadius: '16px',
                overflow: 'hidden',
                background: '#FFFFFF',
                border: '1px solid var(--border-light)',
                boxShadow: hoveredId === agent.id ? 'var(--shadow-hover)' : 'var(--shadow-sm)',
                transform: hoveredId === agent.id ? 'translateY(-6px)' : 'translateY(0)',
                transition: 'all 0.3s var(--ease-luxury)'
              }}
            >
              <div style={{ height: '380px', overflow: 'hidden', position: 'relative' }}>
                <img
                  src={agent.photo}
                  alt={agent.name}
                  style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                    transform: hoveredId === agent.id ? 'scale(1.05)' : 'scale(1)',
                    transition: 'transform 0.7s var(--ease-luxury)'
                  }}
                />
                <div style={{ position: 'absolute', bottom: '14px', left: '14px', background: 'rgba(17,19,21,0.88)', backdropFilter: 'blur(8px)', color: '#FFF', padding: '0.35rem 0.9rem', borderRadius: '20px', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: '600' }}>
                  Volume: {agent.stats.salesVolume}
                </div>
                {hoveredId === agent.id && (
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(17,19,21,0.7) 0%, transparent 50%)', display: 'flex', alignItems: 'flex-end', padding: '1.5rem' }}>
                    <div style={{ background: 'var(--accent-emerald)', color: '#FFF', padding: '0.6rem 1.2rem', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span>View Full Profile</span>
                      <ArrowUpRight size={14} />
                    </div>
                  </div>
                )}
              </div>

              <div style={{ padding: '1.6rem' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', marginBottom: '0.2rem' }}>{agent.name}</h3>
                <div style={{ color: 'var(--accent-emerald)', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.8rem' }}>{agent.title}</div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: '1.5', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', marginBottom: '1rem' }}>
                  {agent.tagline}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', borderTop: '1px solid var(--border-light)', paddingTop: '1rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Phone size={13} color="var(--accent-emerald)" />
                    <span>{agent.phone}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Mail size={13} color="var(--accent-emerald)" />
                    <span>{agent.email}</span>
                  </div>
                </div>
                {agent.specialties && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '1rem' }}>
                    {agent.specialties.slice(0, 3).map((spec, i) => (
                      <span key={i} style={{ background: 'var(--bg-sand)', padding: '0.2rem 0.6rem', borderRadius: '12px', fontSize: '0.72rem', fontWeight: '600', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                        {spec}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ marginTop: '5rem', background: 'var(--bg-dark)', borderRadius: '20px', padding: '4rem', textAlign: 'center', color: '#FFFFFF' }}>
          <span style={{ color: 'var(--accent-sage)', fontSize: '0.8rem', fontWeight: '600', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
            Private Consultation
          </span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: '#FFFFFF', marginTop: '0.4rem', marginBottom: '0.8rem' }}>
            Ready to Begin Your Search?
          </h2>
          <p style={{ color: 'var(--text-sand)', fontSize: '1.05rem', maxWidth: '520px', margin: '0 auto 2rem' }}>
            Connect with a Principal Advisor for a private, NDA-protected consultation about your residential acquisition or representation needs.
          </p>
          <button
            onClick={() => onNavigate && onNavigate('contact')}
            className="btn-primary"
            style={{ background: '#FFFFFF', color: 'var(--accent-emerald)', padding: '1rem 2.4rem', fontSize: '1rem', fontWeight: '600' }}
          >
            Schedule Private Consultation →
          </button>
        </div>
      </div>
    </div>
  );
};
