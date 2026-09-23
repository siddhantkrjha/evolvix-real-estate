import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Heart, Scale, Menu, X, ArrowUpRight } from 'lucide-react';

export const Navbar = ({ activePage, onNavigate, transparentHero = false }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { favorites, compareIds, setIsCompareOpen, openInquiryModal } = useApp();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isLight = transparentHero && !isScrolled;

  const navLinks = [
    { label: 'Residences', page: 'listings' },
    { label: 'Sell & Valuation', page: 'sell' },
    { label: 'Enclaves', page: 'neighborhoods' },
    { label: 'Advisors', page: 'agents' },
    { label: 'Intelligence', page: 'blog' },
    { label: 'Heritage', page: 'about' },
    { label: 'Contact', page: 'contact' }
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 900,
        transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        padding: isScrolled ? '0.8rem 0' : '1.4rem 0',
        backgroundColor: isScrolled
          ? 'rgba(251, 251, 249, 0.92)'
          : transparentHero
          ? 'transparent'
          : 'rgba(251, 251, 249, 0.95)',
        backdropFilter: isScrolled || !transparentHero ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: isScrolled || !transparentHero ? 'blur(16px)' : 'none',
        borderBottom: isScrolled || !transparentHero
          ? '1px solid rgba(17, 19, 21, 0.08)'
          : '1px solid rgba(255, 255, 255, 0.15)',
        color: isLight ? '#FFFFFF' : 'var(--text-noir)'
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand Logo */}
        <button
          onClick={() => onNavigate('home')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textAlign: 'left' }}
        >
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '8px',
              background: isLight ? 'rgba(255,255,255,0.2)' : 'var(--accent-emerald)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              fontFamily: 'var(--font-serif)',
              fontSize: '1.2rem',
              fontWeight: '700',
              border: isLight ? '1px solid rgba(255,255,255,0.4)' : 'none'
            }}
          >
            E
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: '600', letterSpacing: '0.04em', lineHeight: 1.1, color: isLight ? '#FFF' : 'var(--text-noir)' }}>
              EVOLVIX
            </div>
            <div style={{ fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: isLight ? 'rgba(255,255,255,0.8)' : 'var(--text-muted)' }}>
              Private Brokerage
            </div>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav style={{ display: 'none', gap: '2rem', alignItems: 'center' }} className="desktop-nav">
          {navLinks.map((item) => (
            <button
              key={item.page}
              onClick={() => onNavigate(item.page)}
              style={{
                fontSize: '0.9rem',
                fontWeight: activePage === item.page ? '600' : '400',
                color: activePage === item.page
                  ? isLight ? '#FFFFFF' : 'var(--accent-emerald)'
                  : isLight ? 'rgba(255,255,255,0.85)' : '#4B5563',
                letterSpacing: '0.02em',
                transition: 'color 0.2s',
                position: 'relative',
                padding: '0.2rem 0'
              }}
            >
              {item.label}
              {activePage === item.page && (
                <span
                  style={{
                    position: 'absolute',
                    bottom: '-4px',
                    left: '0',
                    width: '100%',
                    height: '2px',
                    backgroundColor: isLight ? '#FFFFFF' : 'var(--accent-emerald)',
                    borderRadius: '2px'
                  }}
                />
              )}
            </button>
          ))}
        </nav>

        {/* Actions & Utilities */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
          {/* Compare Button */}
          {compareIds.length > 0 && (
            <button
              onClick={() => setIsCompareOpen(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.45rem 0.85rem',
                borderRadius: '20px',
                background: isLight ? 'rgba(255,255,255,0.2)' : 'var(--bg-sand)',
                color: isLight ? '#FFF' : 'var(--text-noir)',
                fontSize: '0.8rem',
                fontWeight: '500',
                border: isLight ? '1px solid rgba(255,255,255,0.3)' : '1px solid var(--border-light)'
              }}
              title="Compare Listings"
            >
              <Scale size={15} />
              <span>Compare ({compareIds.length})</span>
            </button>
          )}

          {/* Favorites Button */}
          <button
            onClick={() => onNavigate('dashboard')}
            style={{
              position: 'relative',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: isLight ? 'rgba(255,255,255,0.15)' : 'var(--bg-sand)',
              color: isLight ? '#FFFFFF' : 'var(--text-noir)',
              border: isLight ? '1px solid rgba(255,255,255,0.25)' : '1px solid var(--border-light)',
              transition: 'transform 0.2s'
            }}
            title="Saved Residences"
          >
            <Heart size={18} fill={favorites.length > 0 ? (isLight ? '#FFFFFF' : 'var(--accent-emerald)') : 'none'} />
            {favorites.length > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-3px',
                  right: '-3px',
                  background: 'var(--accent-emerald)',
                  color: '#FFFFFF',
                  fontSize: '0.65rem',
                  fontWeight: '700',
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid #FFF'
                }}
              >
                {favorites.length}
              </span>
            )}
          </button>

          {/* Direct Private Consultation CTA */}
          <button
            onClick={() => openInquiryModal()}
            className="consultation-btn"
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '0.5rem',
              background: isLight ? '#FFFFFF' : 'var(--accent-emerald)',
              color: isLight ? 'var(--accent-emerald)' : '#FFFFFF',
              padding: '0.65rem 1.25rem',
              borderRadius: '6px',
              fontSize: '0.85rem',
              fontWeight: '600',
              letterSpacing: '0.02em',
              transition: 'all 0.2s'
            }}
          >
            <span>Consult Advisor</span>
            <ArrowUpRight size={14} />
          </button>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'flex',
              padding: '0.5rem',
              color: isLight ? '#FFF' : 'var(--text-noir)'
            }}
            className="mobile-menu-btn"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'var(--bg-chalk)',
            borderBottom: '1px solid var(--border-medium)',
            padding: '1.5rem 2rem 2rem',
            boxShadow: 'var(--shadow-lg)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.2rem'
          }}
        >
          {navLinks.map((item) => (
            <button
              key={item.page}
              onClick={() => {
                onNavigate(item.page);
                setMobileMenuOpen(false);
              }}
              style={{
                textAlign: 'left',
                fontSize: '1.1rem',
                fontWeight: activePage === item.page ? '600' : '400',
                color: activePage === item.page ? 'var(--accent-emerald)' : 'var(--text-noir)',
                padding: '0.4rem 0',
                borderBottom: '1px solid var(--border-light)'
              }}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => {
              onNavigate('dashboard');
              setMobileMenuOpen(false);
            }}
            style={{
              textAlign: 'left',
              fontSize: '1.1rem',
              color: 'var(--text-noir)',
              padding: '0.4rem 0',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem'
            }}
          >
            <Heart size={18} />
            <span>Private Client Dashboard ({favorites.length} Saved)</span>
          </button>
          <button
            onClick={() => {
              openInquiryModal();
              setMobileMenuOpen(false);
            }}
            className="btn-primary"
            style={{ width: '100%', marginTop: '0.5rem' }}
          >
            Schedule Private Consultation
          </button>
        </div>
      )}

      <style>{`
        @media (min-width: 992px) {
          .desktop-nav { display: flex !important; }
          .consultation-btn { display: inline-flex !important; }
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>
    </header>
  );
};
