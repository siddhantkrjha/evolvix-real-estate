import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

export const GalleryLightbox = ({ images = [], title = 'Residence Gallery' }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  if (!images || images.length === 0) return null;

  const nextSlide = () => {
    setActiveIdx((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setActiveIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div>
      {/* Editorial Multi-Frame Gallery Container */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '1rem',
          height: 'clamp(420px, 60vh, 640px)',
          borderRadius: '16px',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        {/* Main Hero Frame */}
        <div
          style={{ position: 'relative', height: '100%', cursor: 'pointer', overflow: 'hidden' }}
          onClick={() => { setActiveIdx(0); setIsOpen(true); }}
        >
          <img
            src={images[0]}
            alt={`${title} - Main View`}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s var(--ease-luxury)' }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 60%)'
            }}
          />
        </div>

        {/* 2-Stacked Side Thumbnails */}
        <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: '1rem', height: '100%' }}>
          {images.slice(1, 3).map((img, i) => (
            <div
              key={i}
              style={{ position: 'relative', cursor: 'pointer', overflow: 'hidden' }}
              onClick={() => { setActiveIdx(i + 1); setIsOpen(true); }}
            >
              <img
                src={img}
                alt={`${title} - Perspective ${i + 2}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              {i === 1 && images.length > 3 && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(17, 19, 21, 0.65)',
                    backdropFilter: 'blur(4px)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFF',
                    fontWeight: '600',
                    fontSize: '1.1rem'
                  }}
                >
                  <Maximize2 size={24} style={{ marginBottom: '0.4rem' }} />
                  <span>+{images.length - 3} More Photographs</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Floating Open Fullscreen Button */}
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            background: 'rgba(17, 19, 21, 0.85)',
            backdropFilter: 'blur(10px)',
            color: '#FFFFFF',
            padding: '0.65rem 1.25rem',
            borderRadius: '30px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.85rem',
            fontWeight: '600',
            border: '1px solid rgba(255,255,255,0.2)',
            zIndex: 10
          }}
        >
          <Maximize2 size={16} />
          <span>View All ({images.length}) Photos</span>
        </button>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 2000,
            background: 'rgba(11, 12, 14, 0.96)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '1.5rem 2rem'
          }}
        >
          {/* Lightbox Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#FFF' }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--accent-sage)', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                {title}
              </span>
              <div style={{ fontSize: '1rem', fontWeight: '500' }}>
                Photograph {activeIdx + 1} of {images.length}
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)',
                color: '#FFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X size={24} />
            </button>
          </div>

          {/* Main Photo & Navigation */}
          <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem 0' }}>
            <button
              onClick={prevSlide}
              style={{
                position: 'absolute',
                left: '10px',
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.12)',
                color: '#FFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10
              }}
            >
              <ChevronLeft size={28} />
            </button>

            <img
              src={images[activeIdx]}
              alt={`Slide ${activeIdx + 1}`}
              style={{
                maxWidth: '90vw',
                maxHeight: '72vh',
                objectFit: 'contain',
                borderRadius: '8px',
                boxShadow: '0 20px 50px rgba(0,0,0,0.6)'
              }}
            />

            <button
              onClick={nextSlide}
              style={{
                position: 'absolute',
                right: '10px',
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.12)',
                color: '#FFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10
              }}
            >
              <ChevronRight size={28} />
            </button>
          </div>

          {/* Bottom Thumbnail Rail */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.8rem', overflowX: 'auto', padding: '0.5rem 0' }}>
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt=""
                onClick={() => setActiveIdx(i)}
                style={{
                  width: '80px',
                  height: '54px',
                  objectFit: 'cover',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  border: activeIdx === i ? '2px solid var(--accent-sage)' : '2px solid transparent',
                  opacity: activeIdx === i ? 1 : 0.5,
                  transition: 'all 0.2s'
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
