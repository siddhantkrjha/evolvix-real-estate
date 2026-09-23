import React, { useState, useMemo, useEffect } from 'react';
import { LISTINGS_DATA } from '../data/listingsData';
import { PropertyCard } from '../components/common/PropertyCard';
import { InteractiveMap } from '../components/map/InteractiveMap';
import { useApp } from '../context/AppContext';
import { LayoutGrid, Columns, Map, Bookmark, SlidersHorizontal, ArrowUpDown, Sparkles, X, Check, Filter } from 'lucide-react';

export const ListingsPage = ({ initialFilters = {}, onSelectListing, onSelectNeighborhood }) => {
  const [viewMode, setViewMode] = useState('split'); // 'grid', 'split', 'map'
  const [hoveredListingId, setHoveredListingId] = useState(null);
  const [isFilterOpenMobile, setIsFilterOpenMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Filters State
  const [searchQuery, setSearchQuery] = useState(initialFilters.location || '');
  const [selectedType, setSelectedType] = useState(initialFilters.propertyType || 'all');
  const [priceMax, setPriceMax] = useState(35000000);
  const [minBeds, setMinBeds] = useState('all');
  const [sortBy, setSortBy] = useState('price-desc'); // price-desc, price-asc, newest, sqft-desc

  // Save search alert modal
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [searchAlertName, setSearchAlertName] = useState('Prime Portfolio Alert');
  const [alertSaved, setAlertSaved] = useState(false);

  const { saveSearch } = useApp();

  // Simulate smooth skeleton reload on filter change
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 250);
    return () => clearTimeout(timer);
  }, [searchQuery, selectedType, priceMax, minBeds, sortBy]);

  // Filter logic
  const filteredListings = useMemo(() => {
    return LISTINGS_DATA.filter(item => {
      // Keyword/Location search
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesLocation = item.location.city.toLowerCase().includes(q) ||
          item.location.neighborhoodName.toLowerCase().includes(q) ||
          item.location.address.toLowerCase().includes(q) ||
          item.title.toLowerCase().includes(q);
        if (!matchesLocation) return false;
      }

      // Property Type
      if (selectedType !== 'all' && item.propertyType !== selectedType) {
        return false;
      }

      // Price Filter
      if (item.price > priceMax) {
        return false;
      }

      // Beds
      if (minBeds !== 'all') {
        const numBeds = parseInt(minBeds, 10);
        if (item.specs.beds < numBeds) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'sqft-desc') return b.specs.sqft - a.specs.sqft;
      return 0;
    });
  }, [searchQuery, selectedType, priceMax, minBeds, sortBy]);

  const handleSaveSearchSubmit = (e) => {
    e.preventDefault();
    saveSearch(searchAlertName, { searchQuery, selectedType, priceMax, minBeds });
    setAlertSaved(true);
    setTimeout(() => {
      setAlertSaved(false);
      setIsSaveModalOpen(false);
    }, 1500);
  };

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', background: 'var(--bg-chalk)' }}>
      {/* Top Header & View Controls Bar */}
      <div style={{ background: '#FFFFFF', borderBottom: '1px solid var(--border-light)', padding: '1.5rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1.2rem' }}>
            <div>
              <span style={{ color: 'var(--accent-emerald)', fontSize: '0.8rem', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                Global Portfolio
              </span>
              <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginTop: '0.1rem' }}>
                Prime Residential Offerings ({filteredListings.length})
              </h1>
            </div>

            {/* View Switchers & Save Search Action */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => setIsSaveModalOpen(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.6rem 1.1rem',
                  borderRadius: '8px',
                  background: 'var(--bg-sand)',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  color: 'var(--text-noir)',
                  border: '1px solid var(--border-light)'
                }}
              >
                <Bookmark size={15} color="var(--accent-emerald)" />
                <span>Save This Search Alert</span>
              </button>

              {/* View Toggle Tabs */}
              <div style={{ display: 'flex', background: 'var(--bg-sand)', padding: '0.3rem', borderRadius: '8px', gap: '0.2rem' }}>
                <button
                  onClick={() => setViewMode('grid')}
                  style={{
                    padding: '0.5rem 0.8rem',
                    borderRadius: '6px',
                    fontSize: '0.82rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    background: viewMode === 'grid' ? '#FFFFFF' : 'transparent',
                    color: viewMode === 'grid' ? 'var(--text-noir)' : 'var(--text-muted)',
                    fontWeight: viewMode === 'grid' ? '600' : '400',
                    boxShadow: viewMode === 'grid' ? 'var(--shadow-sm)' : 'none'
                  }}
                >
                  <LayoutGrid size={15} />
                  <span>Grid</span>
                </button>

                <button
                  onClick={() => setViewMode('split')}
                  style={{
                    padding: '0.5rem 0.8rem',
                    borderRadius: '6px',
                    fontSize: '0.82rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    background: viewMode === 'split' ? '#FFFFFF' : 'transparent',
                    color: viewMode === 'split' ? 'var(--text-noir)' : 'var(--text-muted)',
                    fontWeight: viewMode === 'split' ? '600' : '400',
                    boxShadow: viewMode === 'split' ? 'var(--shadow-sm)' : 'none'
                  }}
                >
                  <Columns size={15} />
                  <span>Split Map</span>
                </button>

                <button
                  onClick={() => setViewMode('map')}
                  style={{
                    padding: '0.5rem 0.8rem',
                    borderRadius: '6px',
                    fontSize: '0.82rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    background: viewMode === 'map' ? '#FFFFFF' : 'transparent',
                    color: viewMode === 'map' ? 'var(--text-noir)' : 'var(--text-muted)',
                    fontWeight: viewMode === 'map' ? '600' : '400',
                    boxShadow: viewMode === 'map' ? 'var(--shadow-sm)' : 'none'
                  }}
                >
                  <Map size={15} />
                  <span>Map Only</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="container" style={{ padding: '2rem 1.5rem 5rem' }}>
        {/* Horizontal Quick Filter Strip */}
        <div
          style={{
            background: '#FFFFFF',
            padding: '1.2rem 1.5rem',
            borderRadius: '12px',
            border: '1px solid var(--border-light)',
            marginBottom: '2rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.2rem',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', flex: 1 }}>
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search enclaves (e.g. Bel Air, SoHo, Miami)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input"
              style={{ maxWidth: '280px', padding: '0.6rem 1rem', fontSize: '0.88rem' }}
            />

            {/* Type Selector */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="form-select"
              style={{ maxWidth: '180px', padding: '0.6rem 0.8rem', fontSize: '0.88rem' }}
            >
              <option value="all">All Styles</option>
              <option value="estate">Trophy Estates</option>
              <option value="penthouse">Penthouses</option>
              <option value="waterfront">Waterfront</option>
              <option value="single_family">Single Family</option>
            </select>

            {/* Beds Selector */}
            <select
              value={minBeds}
              onChange={(e) => setMinBeds(e.target.value)}
              className="form-select"
              style={{ maxWidth: '140px', padding: '0.6rem 0.8rem', fontSize: '0.88rem' }}
            >
              <option value="all">Any Beds</option>
              <option value="4">4+ Bedrooms</option>
              <option value="5">5+ Bedrooms</option>
              <option value="6">6+ Bedrooms</option>
            </select>

            {/* Price Max Slider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', minWidth: '220px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                Max: ${(priceMax / 1000000).toFixed(1)}M
              </span>
              <input
                type="range"
                min="5000000"
                max="35000000"
                step="1000000"
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                style={{ flex: 1, accentColor: 'var(--accent-emerald)' }}
              />
            </div>
          </div>

          {/* Sort Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ArrowUpDown size={15} color="var(--text-muted)" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="form-select"
              style={{ padding: '0.6rem 0.8rem', fontSize: '0.85rem' }}
            >
              <option value="price-desc">Price: High to Low</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="sqft-desc">Interior Square Footage</option>
            </select>
          </div>
        </div>

        {/* View Renderings */}
        {isLoading ? (
          /* Skeleton Loader Mode */
          <div style={{ display: 'grid', gridTemplateColumns: viewMode === 'split' ? '1.1fr 0.9fr' : 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2rem' }}>
            {[1, 2, 3, 4].map(idx => (
              <div key={idx} style={{ background: '#FFFFFF', borderRadius: '14px', padding: '1.2rem', border: '1px solid var(--border-light)' }}>
                <div className="skeleton" style={{ width: '100%', height: '220px', borderRadius: '10px', marginBottom: '1rem' }} />
                <div className="skeleton" style={{ width: '40%', height: '24px', marginBottom: '0.5rem' }} />
                <div className="skeleton" style={{ width: '70%', height: '18px', marginBottom: '0.5rem' }} />
                <div className="skeleton" style={{ width: '50%', height: '14px' }} />
              </div>
            ))}
          </div>
        ) : filteredListings.length === 0 ? (
          /* Empty State */
          <div style={{ textAlign: 'center', padding: '5rem 2rem', background: '#FFFFFF', borderRadius: '16px', border: '1px solid var(--border-light)' }}>
            <Sparkles size={48} color="var(--accent-sage)" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: '0.5rem' }}>
              No Residences Match These Parameters
            </h3>
            <p style={{ color: 'var(--text-muted)', maxWidth: '480px', margin: '0 auto 1.5rem' }}>
              Try broadening your price tier or clearing location filters to explore our complete off-market and active portfolio.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedType('all');
                setPriceMax(35000000);
                setMinBeds('all');
              }}
              className="btn-primary"
            >
              Reset All Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          /* 3-Column Grid Mode */
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
            {filteredListings.map(prop => (
              <PropertyCard
                key={prop.id}
                property={prop}
                onSelect={(p) => onSelectListing(p)}
                onNeighborhoodClick={onSelectNeighborhood}
              />
            ))}
          </div>
        ) : viewMode === 'split' ? (
          /* Split View Mode (Listings on left, Map on right) */
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '2rem', minHeight: '80vh' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxHeight: '82vh', overflowY: 'auto', paddingRight: '0.5rem' }}>
              {filteredListings.map(prop => (
                <div
                  key={prop.id}
                  onMouseEnter={() => setHoveredListingId(prop.id)}
                  onMouseLeave={() => setHoveredListingId(null)}
                >
                  <PropertyCard
                    property={prop}
                    onSelect={(p) => onSelectListing(p)}
                    onNeighborhoodClick={onSelectNeighborhood}
                  />
                </div>
              ))}
            </div>

            <div style={{ position: 'sticky', top: '120px', height: '82vh' }}>
              <InteractiveMap
                listings={filteredListings}
                hoveredId={hoveredListingId}
                onSelectListing={onSelectListing}
              />
            </div>
          </div>
        ) : (
          /* Full Map View Mode */
          <div style={{ height: '78vh' }}>
            <InteractiveMap
              listings={filteredListings}
              hoveredId={hoveredListingId}
              onSelectListing={onSelectListing}
            />
          </div>
        )}
      </div>

      {/* Save Search Modal */}
      {isSaveModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1100,
            background: 'rgba(17,19,21,0.75)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
          }}
          onClick={() => setIsSaveModalOpen(false)}
        >
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '16px',
              padding: '2.2rem',
              maxWidth: '480px',
              width: '100%',
              boxShadow: 'var(--shadow-dark)',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsSaveModalOpen(false)}
              style={{ position: 'absolute', top: '16px', right: '16px' }}
            >
              <X size={20} />
            </button>

            {alertSaved ? (
              <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                <Check size={48} color="var(--accent-emerald)" style={{ margin: '0 auto 1rem' }} />
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem' }}>Search Alert Saved!</h3>
                <p style={{ color: 'var(--text-muted)' }}>You will receive instant off-market notifications matching this profile.</p>
              </div>
            ) : (
              <form onSubmit={handleSaveSearchSubmit}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', marginBottom: '0.4rem' }}>
                  Create Saved Search Alert
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                  Get notified the moment a new luxury estate matching your criteria enters our private registry.
                </p>

                <div style={{ marginBottom: '1.2rem' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.3rem' }}>Alert Label</label>
                  <input
                    type="text"
                    required
                    value={searchAlertName}
                    onChange={(e) => setSearchAlertName(e.target.value)}
                    className="form-input"
                  />
                </div>

                <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                  Confirm Search Alert
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
