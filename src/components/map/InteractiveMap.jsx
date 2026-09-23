import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

export const InteractiveMap = ({ listings = [], hoveredId = null, onSelectListing }) => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Initialize Leaflet map
      const map = L.map(mapContainerRef.current, {
        center: [34.0837, -118.4487],
        zoom: 11,
        zoomControl: true,
        scrollWheelZoom: false
      });

      // Warm Carto Voyager Luxury Map Tiles
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
        maxZoom: 19
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Trigger map invalidation for smooth resize
    setTimeout(() => {
      map.invalidateSize();
    }, 200);

    // Clear existing markers
    Object.values(markersRef.current).forEach(marker => marker.remove());
    markersRef.current = {};

    const bounds = [];

    listings.forEach(listing => {
      if (!listing.location || !listing.location.coordinates) return;

      const { lat, lng } = listing.location.coordinates;
      bounds.push([lat, lng]);

      const isHovered = hoveredId === listing.id;
      const formattedPrice = `$${(listing.price / 1000000).toFixed(1)}M`;

      // Create Custom HTML Price Badge Marker
      const customIcon = L.divIcon({
        className: 'custom-map-price-pin',
        html: `
          <div style="
            background: ${isHovered ? '#111315' : '#1B3B2B'};
            color: #FFFFFF;
            padding: 5px 12px;
            border-radius: 20px;
            font-family: 'Space Grotesk', monospace;
            font-weight: 700;
            font-size: 12px;
            box-shadow: 0 4px 14px rgba(0,0,0,0.35);
            border: 2px solid #FFFFFF;
            white-space: nowrap;
            cursor: pointer;
            transition: all 0.2s;
            transform: ${isHovered ? 'scale(1.18)' : 'scale(1)'};
          ">
            ${formattedPrice}
          </div>
        `,
        iconSize: [64, 32],
        iconAnchor: [32, 16]
      });

      const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);

      marker.on('click', () => {
        if (onSelectListing) onSelectListing(listing);
      });

      // Popup on pin
      marker.bindPopup(`
        <div style="font-family: sans-serif; min-width: 170px; padding: 4px;">
          <img src="${listing.media.featuredImage}" style="width: 100%; height: 95px; object-fit: cover; border-radius: 6px; margin-bottom: 6px;" />
          <div style="font-weight: 700; font-size: 13px; color: #111;">${listing.title}</div>
          <div style="color: #1B3B2B; font-weight: 700; font-size: 14px; margin-top: 2px;">$${listing.price.toLocaleString()}</div>
          <div style="font-size: 11px; color: #666;">${listing.specs.beds} Beds • ${listing.specs.baths} Baths • ${listing.specs.sqft} sqft</div>
        </div>
      `);

      markersRef.current[listing.id] = marker;
    });

    if (bounds.length > 0) {
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
    }

  }, [listings, hoveredId, onSelectListing]);

  // Effect to pulse marker when listing is hovered
  useEffect(() => {
    if (!mapInstanceRef.current || !hoveredId) return;
    const marker = markersRef.current[hoveredId];
    if (marker) {
      marker.openPopup();
    }
  }, [hoveredId]);

  return (
    <div
      ref={mapContainerRef}
      style={{
        width: '100%',
        height: '100%',
        minHeight: '450px',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-md)',
        border: '1px solid var(--border-light)'
      }}
    />
  );
};
