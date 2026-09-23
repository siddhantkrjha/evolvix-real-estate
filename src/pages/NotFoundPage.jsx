import React from 'react';
import { SearchEngineBar } from '../components/common/SearchEngineBar';
import { Compass, Home, ArrowLeft } from 'lucide-react';

export const NotFoundPage = ({ onNavigate }) => {
  return (
    <div
      style={{
        paddingTop: '120px',
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-chalk)',
        textAlign: 'center',
        paddingBottom: '5rem'
      }}
    >
      <div className="container" style={{ maxWidth: '680px' }}>
        <div
          style={{
            display: 'inline-flex',
            padding: '0.4rem 1rem',
            borderRadius: '30px',
            background: 'var(--bg-sand)',
            fontSize: '0.8rem',
            fontWeight: '600',
            fontFamily: 'var(--font-mono)',
            color: 'var(--accent-emerald)',
            marginBottom: '1.2rem'
          }}
        >
          ERROR 404 — PRIVATE DOSSIER NOT FOUND
        </div>

        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', lineHeight: 1.15, marginBottom: '1rem' }}>
          An Uncharted Destination
        </h1>

        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '2.5rem', lineHeight: '1.6' }}>
          The residence or market intelligence report you are seeking may have been placed under contract or relocated to our private archive.
        </p>

        {/* Embedded Recovery Search */}
        <div style={{ marginBottom: '2.5rem' }}>
          <SearchEngineBar
            mode="sticky"
            onSearch={(filters) => onNavigate('listings', filters)}
          />
        </div>

        {/* Quick Recovery Action Links */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => onNavigate('home')}
            className="btn-primary"
            style={{ padding: '0.85rem 1.8rem' }}
          >
            <Home size={16} />
            <span>Return to Flagship Home</span>
          </button>
          <button
            onClick={() => onNavigate('listings')}
            className="btn-secondary"
            style={{ padding: '0.85rem 1.8rem' }}
          >
            <span>Explore All Prime Residences</span>
          </button>
        </div>
      </div>
    </div>
  );
};
