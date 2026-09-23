import React from 'react';
import { ArrowUpRight, ShieldCheck, Mail, MapPin, Phone } from 'lucide-react';

export const Footer = ({ onNavigate }) => {
  return (
    <footer style={{ backgroundColor: 'var(--bg-dark)', color: 'var(--text-white)', paddingTop: '5rem', paddingBottom: '3rem' }}>
      <div className="container">
        {/* Top Newsletter Strip */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2rem',
            paddingBottom: '3.5rem',
            borderBottom: '1px solid var(--border-dark)'
          }}
        >
          <div style={{ maxWidth: '520px' }}>
            <span style={{ color: 'var(--accent-sage)', fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
              Private Intelligence
            </span>
            <h3 style={{ color: '#FFFFFF', marginTop: '0.4rem', fontFamily: 'var(--font-serif)', fontSize: '1.8rem' }}>
              The Private Client Register
            </h3>
            <p style={{ color: 'var(--text-light)', fontSize: '0.95rem', marginTop: '0.4rem' }}>
              Receive monthly off-market acquisitions, quarterly market valuations, and architectural releases before public syndication.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert('Thank you. You have been registered on the Evolvix Private Client Register.');
            }}
            style={{ display: 'flex', gap: '0.6rem', flex: '1', maxWidth: '460px' }}
          >
            <input
              type="email"
              placeholder="Enter confidential email..."
              required
              style={{
                flex: 1,
                padding: '0.85rem 1.2rem',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.18)',
                borderRadius: '8px',
                color: '#FFF',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />
            <button
              type="submit"
              className="btn-primary"
              style={{ padding: '0.85rem 1.5rem', whiteSpace: 'nowrap' }}
            >
              <span>Subscribe</span>
              <ArrowUpRight size={16} />
            </button>
          </form>
        </div>

        {/* Multi-Column Main Footer */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '3rem',
            padding: '3.5rem 0',
            borderBottom: '1px solid var(--border-dark)'
          }}
        >
          {/* Column 1: Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '6px',
                  background: 'var(--accent-emerald)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-serif)',
                  fontWeight: '700',
                  color: '#FFF'
                }}
              >
                E
              </div>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', letterSpacing: '0.05em' }}>
                EVOLVIX
              </span>
            </div>
            <p style={{ color: 'var(--text-light)', fontSize: '0.88rem', lineHeight: '1.6', marginBottom: '1.2rem' }}>
              Boutique private luxury brokerage representing trophy residential architecture, landmark estates, and ultra-prime developments across the world's most coveted enclaves.
            </p>
            <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-light)', fontSize: '0.85rem' }}>
              <a href="#" style={{ color: 'var(--text-sand)' }}>Instagram</a>
              <span>•</span>
              <a href="#" style={{ color: 'var(--text-sand)' }}>LinkedIn</a>
              <span>•</span>
              <a href="#" style={{ color: 'var(--text-sand)' }}>YouTube</a>
            </div>
          </div>

          {/* Column 2: Flagship Galleries */}
          <div>
            <h4 style={{ color: 'var(--accent-sage)', fontSize: '0.85rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1.2rem', fontFamily: 'var(--font-mono)' }}>
              Flagship Galleries
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', color: 'var(--text-light)', fontSize: '0.88rem' }}>
              <div>
                <strong style={{ color: '#FFF' }}>Beverly Hills Flagship</strong>
                <div>9601 Wilshire Blvd, Penthouse 12</div>
                <div style={{ color: 'var(--accent-sage)' }}>+1 (310) 849-2200</div>
              </div>
              <div>
                <strong style={{ color: '#FFF' }}>Manhattan Salon</strong>
                <div>520 Broadway, 8th Floor, SoHo</div>
                <div style={{ color: 'var(--accent-sage)' }}>+1 (212) 694-8830</div>
              </div>
              <div>
                <strong style={{ color: '#FFF' }}>Miami Design District</strong>
                <div>160 NE 40th Street, Suite 400</div>
                <div style={{ color: 'var(--accent-sage)' }}>+1 (305) 712-4411</div>
              </div>
            </div>
          </div>

          {/* Column 3: Navigation */}
          <div>
            <h4 style={{ color: 'var(--accent-sage)', fontSize: '0.85rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1.2rem', fontFamily: 'var(--font-mono)' }}>
              Curated Portfolios
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.88rem', color: 'var(--text-light)' }}>
              <li><button onClick={() => onNavigate('listings')} style={{ color: 'var(--text-light)' }}>All Prime Residences</button></li>
              <li><button onClick={() => onNavigate('listings')} style={{ color: 'var(--text-light)' }}>Architectural & Waterfront</button></li>
              <li><button onClick={() => onNavigate('listings')} style={{ color: 'var(--text-light)' }}>Penthouse Duplexes</button></li>
              <li><button onClick={() => onNavigate('neighborhoods')} style={{ color: 'var(--text-light)' }}>Neighborhood Dossiers</button></li>
              <li><button onClick={() => onNavigate('sell')} style={{ color: 'var(--text-light)' }}>Asset Valuation Portal</button></li>
              <li><button onClick={() => onNavigate('dashboard')} style={{ color: 'var(--text-light)' }}>Saved Residences</button></li>
            </ul>
          </div>

          {/* Column 4: Advisory & Legal */}
          <div>
            <h4 style={{ color: 'var(--accent-sage)', fontSize: '0.85rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1.2rem', fontFamily: 'var(--font-mono)' }}>
              Advisory & Compliance
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.88rem', color: 'var(--text-light)' }}>
              <li><button onClick={() => onNavigate('about')} style={{ color: 'var(--text-light)' }}>About Our Heritage</button></li>
              <li><button onClick={() => onNavigate('agents')} style={{ color: 'var(--text-light)' }}>Private Advisors</button></li>
              <li><button onClick={() => onNavigate('blog')} style={{ color: 'var(--text-light)' }}>Market Reports</button></li>
              <li><button onClick={() => onNavigate('contact')} style={{ color: 'var(--text-light)' }}>Press & Inquiries</button></li>
              <li><a href="#" style={{ color: 'var(--text-light)' }}>Privacy Policy & Terms</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Disclosures & Equal Housing */}
        <div
          style={{
            paddingTop: '2rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
            fontSize: '0.78rem',
            color: '#6B7280'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span>© {new Date().getFullYear()} Evolvix Real Estate Advisory, Inc. All rights reserved.</span>
            <span>•</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
              <ShieldCheck size={14} color="var(--accent-sage)" />
              Equal Housing Opportunity
            </span>
          </div>
          <div>
            Real estate listings held by brokerage firms other than Evolvix are marked with the IDX icon. All information deemed reliable but not guaranteed.
          </div>
        </div>
      </div>
    </footer>
  );
};
