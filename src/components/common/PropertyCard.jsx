import React from 'react';
import { useApp } from '../../context/AppContext';
import { NEIGHBORHOODS_DATA } from '../../data/neighborhoodsData';
import { Heart, Bed, Bath, Maximize2, Scale, Sparkles, MapPin } from 'lucide-react';

export const PropertyCard = ({ property, onSelect, onNeighborhoodClick }) => {
  const { favorites, toggleFavorite, compareIds, toggleCompare, setCursorState } = useApp();
  const isFav = favorites.includes(property.id);
  const isCompared = compareIds.includes(property.id);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'exclusive': return 'Private Exclusive';
      case 'pending': return 'Contract Pending';
      case 'sold': return 'Closed Archive';
      default: return 'Active Luxury';
    }
  };

  return (
    <div
      className="property-card"
      onMouseEnter={() => setCursorState({ active: true, text: 'VIEW RESIDENCE →', mode: 'card' })}
      onMouseLeave={() => setCursorState({ active: false, text: '', mode: 'default' })}
    >
      {/* Image Wrap */}
      <div
        className="card-image-wrap"
        onClick={() => onSelect && onSelect(property)}
        style={{ cursor: 'pointer' }}
      >
        <img
          src={property.media.featuredImage}
          alt={property.title}
          loading="lazy"
        />

        {/* Status Badge */}
        <div className="card-badge-top">
          <span className={`badge-status ${property.status}`}>
            {getStatusLabel(property.status)}
          </span>
        </div>

        {/* Top Right Heart Action */}
        <button
          className={`card-fav-btn ${isFav ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(property.id);
          }}
          aria-label="Save Listing"
          title={isFav ? "Remove from Favorites" : "Save to Favorites"}
        >
          <Heart size={18} fill={isFav ? '#E11D48' : 'none'} color={isFav ? '#E11D48' : 'currentColor'} />
        </button>

        {/* 360 Tour Tag if available */}
        {property.media.has360Tour && (
          <div
            style={{
              position: 'absolute',
              bottom: '12px',
              left: '12px',
              background: 'rgba(17, 19, 21, 0.75)',
              backdropFilter: 'blur(6px)',
              color: '#FFF',
              padding: '0.25rem 0.6rem',
              borderRadius: '4px',
              fontSize: '0.72rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              fontFamily: 'var(--font-mono)'
            }}
          >
            <Sparkles size={12} color="var(--accent-gold)" />
            <span>360° IMMERSIVE TOUR</span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="card-body">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span className="card-price">{formatPrice(property.price)}</span>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            ${property.specs.pricePerSqft.toLocaleString()}/sqft
          </span>
        </div>

        <h3
          className="card-title"
          onClick={() => onSelect && onSelect(property)}
          style={{ cursor: 'pointer' }}
        >
          {property.title}
        </h3>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--text-muted)', fontSize: '0.86rem', marginBottom: '0.8rem' }}>
          <MapPin size={14} />
          <span>
            {property.location.address},{' '}
            {onNeighborhoodClick ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const fullNeigh = NEIGHBORHOODS_DATA.find(n => n.id === property.location.neighborhoodId);
                  onNeighborhoodClick(fullNeigh || { id: property.location.neighborhoodId, name: property.location.neighborhoodName });
                }}
                style={{ color: 'var(--accent-emerald)', fontWeight: '500', textDecoration: 'underline', textDecorationStyle: 'dotted' }}
              >
                {property.location.neighborhoodName}
              </button>
            ) : (
              property.location.neighborhoodName
            )}
          </span>
        </div>

        {/* Specs Row */}
        <div className="card-specs-row">
          <div className="spec-item" title="Bedrooms">
            <Bed size={15} color="#6B7280" />
            <span className="spec-val">{property.specs.beds}</span>
            <span>Beds</span>
          </div>
          <div className="spec-item" title="Bathrooms">
            <Bath size={15} color="#6B7280" />
            <span className="spec-val">{property.specs.baths}</span>
            <span>Baths</span>
          </div>
          <div className="spec-item" title="Interior Square Footage">
            <Maximize2 size={14} color="#6B7280" />
            <span className="spec-val">{property.specs.sqft.toLocaleString()}</span>
            <span>Sq Ft</span>
          </div>
        </div>

        {/* Bottom Card Actions */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '1rem',
            paddingTop: '0.8rem',
            borderTop: '1px solid rgba(17, 19, 21, 0.05)',
            fontSize: '0.8rem'
          }}
        >
          <label
            onClick={(e) => e.stopPropagation()}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              cursor: 'pointer',
              color: isCompared ? 'var(--accent-emerald)' : '#6B7280',
              fontWeight: isCompared ? '600' : '400'
            }}
          >
            <input
              type="checkbox"
              checked={isCompared}
              onChange={() => toggleCompare(property.id)}
              style={{ accentColor: 'var(--accent-emerald)', cursor: 'pointer' }}
            />
            <Scale size={13} />
            <span>{isCompared ? 'Comparing' : 'Compare'}</span>
          </label>

          <button
            onClick={() => onSelect && onSelect(property)}
            style={{
              color: 'var(--accent-emerald)',
              fontWeight: '600',
              fontSize: '0.82rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.2rem'
            }}
          >
            Explore Dossier →
          </button>
        </div>
      </div>
    </div>
  );
};
