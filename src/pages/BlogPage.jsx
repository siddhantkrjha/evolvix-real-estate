import React, { useState } from 'react';
import { BLOG_DATA } from '../data/blogData';
import { ArrowUpRight } from 'lucide-react';

export const BlogPage = ({ onSelectArticle }) => {
  const [selectedCat, setSelectedCat] = useState('all');

  const filteredPosts = BLOG_DATA.filter(post => {
    if (selectedCat === 'all') return true;
    return post.category.toLowerCase().includes(selectedCat.toLowerCase());
  });

  const featuredPost = BLOG_DATA.find(p => p.featured) || BLOG_DATA[0];

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', background: 'var(--bg-chalk)', paddingBottom: '6rem' }}>
      <div className="container">
        {/* Header */}
        <div style={{ maxWidth: '700px', marginBottom: '3rem' }}>
          <span style={{ color: 'var(--accent-emerald)', fontSize: '0.8rem', fontWeight: '600', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
            Evolvix Intelligence & Analysis
          </span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.8rem', marginTop: '0.2rem' }}>
            Market Insights & Architectural Dossiers
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginTop: '0.6rem' }}>
            Quarterly asset valuations, off-market liquidity flows, and design perspectives curated by our private brokerage group.
          </p>
        </div>

        {/* Featured Large Article Card */}
        {featuredPost && (
          <div
            onClick={() => onSelectArticle(featuredPost)}
            style={{
              background: '#FFFFFF',
              borderRadius: '20px',
              overflow: 'hidden',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              boxShadow: 'var(--shadow-md)',
              border: '1px solid var(--border-light)',
              cursor: 'pointer',
              marginBottom: '4rem'
            }}
          >
            <div style={{ height: '100%', minHeight: '340px', overflow: 'hidden' }}>
              <img
                src={featuredPost.coverImage}
                alt={featuredPost.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.8rem' }}>
                  <span style={{ background: 'var(--accent-emerald)', color: '#FFF', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                    Featured Intelligence
                  </span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{featuredPost.readTime}</span>
                </div>

                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.9rem', lineHeight: '1.25', marginBottom: '1rem' }}>
                  {featuredPost.title}
                </h2>

                <p style={{ color: '#4B5563', fontSize: '1rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                  {featuredPost.excerpt}
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-light)', paddingTop: '1.2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                  <img src={featuredPost.authorPhoto} alt={featuredPost.authorName} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <div style={{ fontWeight: '600', fontSize: '0.88rem' }}>{featuredPost.authorName}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{featuredPost.publishDate}</div>
                  </div>
                </div>

                <span style={{ color: 'var(--accent-emerald)', fontWeight: '600', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  Read Report <ArrowUpRight size={16} />
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: 'All Intelligence' },
            { id: 'market', label: 'Market Reports' },
            { id: 'architecture', label: 'Architecture & Design' },
            { id: 'buying', label: 'Acquisition Strategies' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.id)}
              style={{
                padding: '0.6rem 1.3rem',
                borderRadius: '30px',
                fontSize: '0.85rem',
                fontWeight: selectedCat === cat.id ? '600' : '400',
                background: selectedCat === cat.id ? 'var(--accent-emerald)' : '#FFFFFF',
                color: selectedCat === cat.id ? '#FFFFFF' : 'var(--text-noir)',
                border: '1px solid var(--border-light)',
                transition: 'all 0.2s'
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Article Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2.5rem' }}>
          {filteredPosts.map(post => (
            <div
              key={post.id}
              onClick={() => onSelectArticle(post)}
              style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid var(--border-light)',
                boxShadow: 'var(--shadow-sm)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s'
              }}
            >
              <div style={{ height: '220px', overflow: 'hidden' }}>
                <img src={post.coverImage} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>

              <div style={{ padding: '1.8rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem', fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  <span style={{ color: 'var(--accent-emerald)', fontWeight: '600' }}>{post.category}</span>
                  <span>{post.readTime}</span>
                </div>

                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', lineHeight: '1.3', marginBottom: '0.8rem' }}>
                  {post.title}
                </h3>

                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.5rem', flex: 1 }}>
                  {post.excerpt}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', borderTop: '1px solid var(--border-light)', paddingTop: '1rem', fontSize: '0.82rem' }}>
                  <img src={post.authorPhoto} alt={post.authorName} style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                  <span style={{ fontWeight: '500' }}>{post.authorName}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
