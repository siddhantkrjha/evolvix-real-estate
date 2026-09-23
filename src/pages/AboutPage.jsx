import React from 'react';
import { AGENTS_DATA } from '../data/agentsData';
import { StatsCounter } from '../components/common/StatsCounter';
import { ShieldCheck, Award, Globe, HeartHandshake, ArrowUpRight, Sparkles, Building, Landmark, Newspaper } from 'lucide-react';

export const AboutPage = ({ onSelectAgent, onNavigate }) => {
  const pressMentions = [
    { outlet: 'Forbes Global Properties', quote: 'Setting the benchmark for discretionary advisory in luxury enclaves.' },
    { outlet: 'Architectural Digest', quote: 'Representing the world’s most significant modernist masterworks.' },
    { outlet: 'The Wall Street Journal', quote: 'Leading sovereign wealth and private equity property placements.' },
    { outlet: 'Robb Report', quote: 'A boutique advisory collective redefining ultra-high-net-worth real estate.' }
  ];

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', background: 'var(--bg-chalk)', paddingBottom: '6rem' }}>
      <div className="container">
        {/* Heritage Hero */}
        <div style={{ maxWidth: '820px', marginBottom: '3.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-emerald)', fontSize: '0.8rem', fontWeight: '600', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', marginBottom: '0.6rem' }}>
            <Sparkles size={14} />
            <span>The Evolvix Heritage</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 4.5vw, 3.8rem)', lineHeight: 1.15 }}>
            Redefining High-Trust Luxury Real Estate Advisory
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem', marginTop: '1rem', lineHeight: '1.7' }}>
            Founded on the principle that landmark architecture deserves bespoke fiduciary representation, Evolvix bridges confidential private wealth networks with data-led market timing.
          </p>
        </div>

        {/* Origin Photo Showcase */}
        <div style={{ position: 'relative', height: '480px', borderRadius: '20px', overflow: 'hidden', marginBottom: '4rem', boxShadow: 'var(--shadow-md)' }}>
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85"
            alt="Evolvix Brokerage Heritage"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(17,19,21,0.85) 0%, transparent 60%)', display: 'flex', alignItems: 'flex-end', padding: '2.5rem', color: '#FFF' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem' }}>Trophy Real Estate. Absolute Discretion.</div>
              <div style={{ color: 'var(--text-sand)', fontSize: '0.95rem', marginTop: '0.3rem' }}>Beverly Hills • Manhattan • Miami Beach • London Enclaves</div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid var(--border-light)',
            padding: '2.5rem',
            marginBottom: '4.5rem',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
            <StatsCounter value={28} suffix=" Years" label="Heritage in Private Advisory" duration={1500} />
            <StatsCounter value={1.85} prefix="$" suffix="B+" label="Career Sales Volume" duration={2000} />
            <StatsCounter value={950} prefix="" suffix="+ Assets" label="Trophy Residences Closed" duration={2200} />
            <StatsCounter value={100} prefix="" suffix="%" label="Fiduciary Discretion Compliance" duration={1800} />
          </div>
        </div>

        {/* Narrative & Core Values Grid */}
        <div style={{ marginBottom: '5rem' }}>
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 3rem' }}>
            <span style={{ color: 'var(--accent-emerald)', fontSize: '0.8rem', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
              Core Tenets
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', marginTop: '0.3rem' }}>
              The Pillars of Our Representation
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            <div style={{ background: '#FFFFFF', padding: '2.2rem', borderRadius: '16px', border: '1px solid var(--border-light)' }}>
              <ShieldCheck size={32} color="var(--accent-emerald)" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', marginBottom: '0.6rem' }}>Fiduciary Discretion</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.6' }}>
                We protect our clients’ privacy with strict NDAs and off-market channels, ensuring high-profile transactions occur without media leaks.
              </p>
            </div>

            <div style={{ background: '#FFFFFF', padding: '2.2rem', borderRadius: '16px', border: '1px solid var(--border-light)' }}>
              <Award size={32} color="var(--accent-emerald)" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', marginBottom: '0.6rem' }}>Architectural Curatorship</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.6' }}>
                Every residence in our portfolio undergoes rigorous architectural provenance vetting, from mid-century modernists to contemporary masters.
              </p>
            </div>

            <div style={{ background: '#FFFFFF', padding: '2.2rem', borderRadius: '16px', border: '1px solid var(--border-light)' }}>
              <Globe size={32} color="var(--accent-emerald)" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', marginBottom: '0.6rem' }}>Global Syndicate</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.6' }}>
                Our private syndication reaches sovereign wealth entities, tech founders, and family offices across London, Geneva, Dubai, and Singapore.
              </p>
            </div>
          </div>
        </div>

        {/* Press Mentions & Awards Strip */}
        <div style={{ background: 'var(--bg-dark)', color: '#FFFFFF', borderRadius: '20px', padding: '3.5rem', marginBottom: '5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{ color: 'var(--accent-sage)', fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
              Recognition & Accolades
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: '#FFF', marginTop: '0.3rem' }}>
              Featured in Global Publications
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
            {pressMentions.map((press, idx) => (
              <div key={idx} style={{ borderLeft: '2px solid var(--accent-sage)', paddingLeft: '1.2rem' }}>
                <div style={{ color: 'var(--accent-sage)', fontWeight: '700', fontSize: '0.9rem', marginBottom: '0.4rem', fontFamily: 'var(--font-mono)' }}>
                  {press.outlet}
                </div>
                <p style={{ color: 'var(--text-sand)', fontSize: '0.88rem', fontStyle: 'italic', lineHeight: '1.6' }}>
                  "{press.quote}"
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Community Philanthropy & Preservation */}
        <div style={{ background: '#FFFFFF', borderRadius: '20px', padding: '3rem', border: '1px solid var(--border-light)', marginBottom: '5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--accent-emerald)', marginBottom: '0.6rem' }}>
            <HeartHandshake size={24} />
            <span style={{ fontSize: '0.8rem', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
              Architectural Preservation Initiative
            </span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.9rem', marginBottom: '0.8rem' }}>
            Preserving Mid-Century and Historic Enclaves
          </h2>
          <p style={{ color: '#4B5563', fontSize: '1rem', lineHeight: '1.8', maxWidth: '800px' }}>
            Evolvix pledges a portion of closing proceeds toward local architectural trusts and historic preservation societies, protecting landmark modernist structures and heritage parklands for future generations.
          </p>
        </div>

        {/* Executive Team Directory */}
        <div style={{ marginBottom: '4rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '1rem', marginBottom: '2.5rem' }}>
            <div>
              <span style={{ color: 'var(--accent-emerald)', fontSize: '0.8rem', fontWeight: '600', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                Managing Partners
              </span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', marginTop: '0.2rem' }}>
                Executive Leadership Group
              </h2>
            </div>
            <button onClick={() => onNavigate('contact')} className="btn-primary">
              Connect with Leadership
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {AGENTS_DATA.map(agent => (
              <div
                key={agent.id}
                onClick={() => onSelectAgent(agent)}
                style={{ background: '#FFFFFF', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border-light)', cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}
              >
                <img src={agent.photo} alt={agent.name} style={{ width: '100%', height: '320px', objectFit: 'cover' }} />
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem' }}>{agent.name}</h3>
                  <div style={{ color: 'var(--accent-emerald)', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.5rem' }}>{agent.title}</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{agent.license}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
