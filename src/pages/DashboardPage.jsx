import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LISTINGS_DATA } from '../data/listingsData';
import { PropertyCard } from '../components/common/PropertyCard';
import { Heart, Bookmark, Calendar, Eye, Trash2, Bell, ArrowUpRight, Search, Settings, User, Lock, LogIn, CheckCircle } from 'lucide-react';

export const DashboardPage = ({ onSelectListing, onNavigate }) => {
  const [activeTab, setActiveTab] = useState('favorites'); // 'favorites', 'searches', 'showings', 'recent', 'settings'
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'
  
  // Settings Form State
  const [clientProfile, setClientProfile] = useState({
    name: 'Eleanor Vance',
    email: 'eleanor@vance.familyoffice.com',
    phone: '+1 (310) 555-0199',
    instantSms: true,
    weeklyDossier: true
  });
  const [settingsSaved, setSettingsSaved] = useState(false);

  const { favorites, toggleFavorite, savedSearches, removeSavedSearch, scheduledShowings, recentlyViewedIds } = useApp();

  const favoriteProperties = LISTINGS_DATA.filter(p => favorites.includes(p.id));
  const recentProperties = LISTINGS_DATA.filter(p => recentlyViewedIds.includes(p.id));

  const handleSettingsSubmit = (e) => {
    e.preventDefault();
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 2000);
  };

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', background: 'var(--bg-chalk)', paddingBottom: '6rem' }}>
      <div className="container">
        {/* Auth Gate Toggle Check */}
        {!isLoggedIn ? (
          <div style={{ maxWidth: '460px', margin: '3rem auto', background: '#FFFFFF', padding: '3rem', borderRadius: '20px', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-md)', textAlign: 'center' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--accent-sage-light)', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.2rem' }}>
              <Lock size={24} />
            </div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '0.4rem' }}>
              {authMode === 'login' ? 'Private Client Access' : 'Create Private Vault'}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>
              {authMode === 'login' ? 'Access your saved portfolios, search alerts, and showings.' : 'Register for sovereign off-market dossiers.'}
            </p>

            <form onSubmit={(e) => { e.preventDefault(); setIsLoggedIn(true); }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
              {authMode === 'signup' && (
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.3rem' }}>Full Legal Name</label>
                  <input type="text" required placeholder="e.g. Eleanor Vance" className="form-input" />
                </div>
              )}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.3rem' }}>Client Email</label>
                <input type="email" required placeholder="name@vance.com" className="form-input" />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.3rem' }}>Private Passkey</label>
                <input type="password" required placeholder="••••••••" className="form-input" />
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
                <LogIn size={16} />
                <span>{authMode === 'login' ? 'Unlock Private Vault' : 'Create Client Account'}</span>
              </button>
            </form>

            <div style={{ marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              {authMode === 'login' ? "Don't have a private vault? " : 'Already registered? '}
              <button
                onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
                style={{ color: 'var(--accent-emerald)', fontWeight: '600', textDecoration: 'underline' }}
              >
                {authMode === 'login' ? 'Create Account' : 'Sign In'}
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Dashboard Header */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '1.5rem', marginBottom: '3rem' }}>
              <div>
                <span style={{ color: 'var(--accent-emerald)', fontSize: '0.8rem', fontWeight: '600', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                  Private Client Portal
                </span>
                <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.6rem', marginTop: '0.2rem' }}>
                  Welcome Back, {clientProfile.name.split(' ')[0]}
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
                  Manage saved portfolio residences, automated off-market search alerts, and upcoming private showings.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '0.8rem' }}>
                <button
                  onClick={() => setIsLoggedIn(false)}
                  style={{ padding: '0.55rem 1rem', borderRadius: '8px', background: 'var(--bg-sand)', fontSize: '0.82rem', color: 'var(--text-muted)' }}
                >
                  Sign Out of Vault
                </button>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.2rem', marginBottom: '3rem' }}>
              <div style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: '14px', border: '1px solid var(--border-light)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Saved Residences</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.8rem', fontWeight: '700', color: 'var(--accent-emerald)', marginTop: '0.2rem' }}>
                  {favorites.length}
                </div>
              </div>
              <div style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: '14px', border: '1px solid var(--border-light)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Active Search Alerts</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.8rem', fontWeight: '700', marginTop: '0.2rem' }}>
                  {savedSearches.length}
                </div>
              </div>
              <div style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: '14px', border: '1px solid var(--border-light)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Confirmed Showings</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.8rem', fontWeight: '700', color: 'var(--accent-terracotta)', marginTop: '0.2rem' }}>
                  {scheduledShowings.length}
                </div>
              </div>
              <div style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: '14px', border: '1px solid var(--border-light)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Dossiers Viewed</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.8rem', fontWeight: '700', marginTop: '0.2rem' }}>
                  {recentlyViewedIds.length}
                </div>
              </div>
            </div>

            {/* Dashboard Tabs Bar */}
            <div
              style={{
                display: 'flex',
                gap: '0.6rem',
                background: '#FFFFFF',
                padding: '0.5rem',
                borderRadius: '12px',
                border: '1px solid var(--border-light)',
                marginBottom: '3rem',
                overflowX: 'auto',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              {[
                { id: 'favorites', label: `Saved Residences (${favorites.length})`, icon: Heart },
                { id: 'searches', label: `Search Alerts (${savedSearches.length})`, icon: Bookmark },
                { id: 'showings', label: `Private Showings (${scheduledShowings.length})`, icon: Calendar },
                { id: 'recent', label: `Recently Viewed (${recentlyViewedIds.length})`, icon: Eye },
                { id: 'settings', label: `Vault Settings`, icon: Settings }
              ].map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.7rem 1.4rem',
                      borderRadius: '8px',
                      fontSize: '0.88rem',
                      fontWeight: activeTab === tab.id ? '600' : '400',
                      background: activeTab === tab.id ? 'var(--accent-emerald)' : 'transparent',
                      color: activeTab === tab.id ? '#FFFFFF' : 'var(--text-noir)',
                      transition: 'all 0.2s',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    <Icon size={16} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab 1: Saved Favorites */}
            {activeTab === 'favorites' && (
              <div>
                {favoriteProperties.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '5rem 2rem', background: '#FFFFFF', borderRadius: '16px', border: '1px solid var(--border-light)' }}>
                    <Heart size={48} color="var(--accent-sage)" style={{ margin: '0 auto 1rem' }} />
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', marginBottom: '0.5rem' }}>
                      No Saved Residences Yet
                    </h3>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                      Click the heart icon on any residence card to save it to your private vault.
                    </p>
                    <button onClick={() => onNavigate('listings')} className="btn-primary">
                      Explore Active Residences
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2rem' }}>
                    {favoriteProperties.map(prop => (
                      <PropertyCard
                        key={prop.id}
                        property={prop}
                        onSelect={(p) => onSelectListing(p)}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: Saved Searches */}
            {activeTab === 'searches' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', maxWidth: '800px' }}>
                {savedSearches.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '4rem 2rem', background: '#FFFFFF', borderRadius: '16px' }}>
                    <Bookmark size={40} color="var(--text-muted)" style={{ margin: '0 auto 1rem' }} />
                    <h3>No Saved Search Alerts</h3>
                  </div>
                ) : (
                  savedSearches.map(s => (
                    <div
                      key={s.id}
                      style={{
                        background: '#FFFFFF',
                        borderRadius: '14px',
                        padding: '1.5rem 2rem',
                        border: '1px solid var(--border-light)',
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '1rem',
                        boxShadow: 'var(--shadow-sm)'
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.2rem' }}>
                          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem' }}>{s.title}</h3>
                          <span style={{ background: 'var(--accent-sage-light)', color: 'var(--accent-emerald)', fontSize: '0.75rem', fontWeight: '700', padding: '0.2rem 0.6rem', borderRadius: '12px' }}>
                            {s.frequency}
                          </span>
                        </div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                          Saved on {s.date} • {s.count} Matching Residences
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                        <button
                          onClick={() => onNavigate('listings')}
                          className="btn-primary"
                          style={{ padding: '0.55rem 1.1rem', fontSize: '0.82rem' }}
                        >
                          View Live Results →
                        </button>
                        <button
                          onClick={() => removeSavedSearch(s.id)}
                          style={{ padding: '0.55rem', borderRadius: '6px', color: '#9CA3AF', background: 'var(--bg-sand)' }}
                          title="Delete alert"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Tab 3: Showings Schedule */}
            {activeTab === 'showings' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', maxWidth: '800px' }}>
                {scheduledShowings.map(show => (
                  <div
                    key={show.id}
                    style={{
                      background: '#FFFFFF',
                      borderRadius: '14px',
                      padding: '1.8rem 2rem',
                      border: '1px solid var(--border-light)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      boxShadow: 'var(--shadow-sm)'
                    }}
                  >
                    <div>
                      <span style={{ color: 'var(--accent-emerald)', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                        {show.status} • {show.type}
                      </span>
                      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', margin: '0.2rem 0' }}>
                        {show.propertyTitle}
                      </h3>
                      <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                        Scheduled Time: <strong style={{ color: 'var(--text-noir)' }}>{show.date}</strong> (Advisor: {show.agentName})
                      </div>
                    </div>

                    <button
                      onClick={() => alert('Calendar invite exported.')}
                      className="btn-secondary"
                      style={{ padding: '0.6rem 1.2rem', fontSize: '0.85rem' }}
                    >
                      Export to Calendar
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 4: Recently Viewed */}
            {activeTab === 'recent' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2rem' }}>
                {recentProperties.map(prop => (
                  <PropertyCard
                    key={prop.id}
                    property={prop}
                    onSelect={(p) => onSelectListing(p)}
                  />
                ))}
              </div>
            )}

            {/* Tab 5: Account & Notification Settings */}
            {activeTab === 'settings' && (
              <div style={{ maxWidth: '640px', background: '#FFFFFF', padding: '2.5rem', borderRadius: '16px', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', marginBottom: '0.4rem' }}>
                  Private Profile & Security Preferences
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.8rem' }}>
                  Manage sovereign encryption settings and notification frequency.
                </p>

                {settingsSaved && (
                  <div style={{ background: 'var(--accent-sage-light)', color: 'var(--accent-emerald)', padding: '0.8rem 1rem', borderRadius: '8px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', fontWeight: '600' }}>
                    <CheckCircle size={16} />
                    <span>Preferences successfully updated!</span>
                  </div>
                )}

                <form onSubmit={handleSettingsSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.3rem' }}>Client Full Name</label>
                    <input
                      type="text"
                      className="form-input"
                      value={clientProfile.name}
                      onChange={(e) => setClientProfile({ ...clientProfile, name: e.target.value })}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.3rem' }}>Email Address</label>
                    <input
                      type="email"
                      className="form-input"
                      value={clientProfile.email}
                      onChange={(e) => setClientProfile({ ...clientProfile, email: e.target.value })}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.3rem' }}>Private Direct Line</label>
                    <input
                      type="tel"
                      className="form-input"
                      value={clientProfile.phone}
                      onChange={(e) => setClientProfile({ ...clientProfile, phone: e.target.value })}
                    />
                  </div>

                  <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={clientProfile.instantSms}
                        onChange={(e) => setClientProfile({ ...clientProfile, instantSms: e.target.checked })}
                      />
                      <span>Receive Instant SMS when an off-market match is registered</span>
                    </label>

                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={clientProfile.weeklyDossier}
                        onChange={(e) => setClientProfile({ ...clientProfile, weeklyDossier: e.target.checked })}
                      />
                      <span>Receive Weekly Ultra-Prime Valuation Intelligence Digest</span>
                    </label>
                  </div>

                  <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                    Save Vault Preferences
                  </button>
                </form>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
