import React, { useState, useEffect } from 'react';
import { BLOG_DATA } from '../data/blogData';
import { AGENTS_DATA } from '../data/agentsData';
import { ArrowLeft, Clock, Share2, Bookmark, Check, ArrowUpRight, MessageSquare, Send } from 'lucide-react';

export const BlogDetailPage = ({ article, onNavigate, onSelectAgent }) => {
  const currentArticle = article || BLOG_DATA[0];
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const [comments, setComments] = useState([
    { author: 'Harrison S.', text: 'The capital flow data from London into Miami waterfront enclaves matches what we are seeing across our private syndicate.', date: '2 days ago' }
  ]);
  const [commentText, setCommentText] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');

  const authorAgent = AGENTS_DATA.find(a => a.name === currentArticle.authorName) || AGENTS_DATA[0];
  const relatedArticles = BLOG_DATA.filter(b => b.id !== currentArticle.id).slice(0, 2);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / (windowHeight || 1)}`;
      setScrollProgress(Number(scroll));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setComments(prev => [...prev, { author: commentAuthor || 'Verified Client', text: commentText, date: 'Just now' }]);
    setCommentText('');
    setCommentAuthor('');
  };

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', background: 'var(--bg-chalk)', paddingBottom: '6rem' }}>
      {/* Reading Progress Indicator */}
      <div
        style={{
          position: 'fixed',
          top: '70px',
          left: 0,
          right: 0,
          height: '3px',
          background: 'transparent',
          zIndex: 950
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${scrollProgress * 100}%`,
            background: 'var(--accent-emerald)',
            transition: 'width 0.1s'
          }}
        />
      </div>

      <div className="container">
        {/* Back Link */}
        <button
          onClick={() => onNavigate('blog')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}
        >
          <ArrowLeft size={16} />
          <span>Back to Market Intelligence</span>
        </button>

        {/* Article Header */}
        <div style={{ maxWidth: '960px', margin: '0 auto 2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.8rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
            <span style={{ background: 'var(--accent-emerald)', color: '#FFF', padding: '0.25rem 0.75rem', borderRadius: '20px', fontWeight: '600' }}>
              {currentArticle.category}
            </span>
            <span style={{ color: 'var(--text-muted)' }}>{currentArticle.readTime}</span>
            <span>•</span>
            <span style={{ color: 'var(--text-muted)' }}>{currentArticle.publishDate}</span>
          </div>

          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.2rem, 4vw, 3.4rem)', lineHeight: 1.15, marginBottom: '1.5rem' }}>
            {currentArticle.title}
          </h1>

          {/* Author Strip */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)', padding: '1rem 0', flexWrap: 'wrap', gap: '1rem' }}>
            <div
              style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}
              onClick={() => onSelectAgent && onSelectAgent(authorAgent)}
            >
              <img
                src={currentArticle.authorPhoto}
                alt={currentArticle.authorName}
                style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <div>
                <div style={{ fontWeight: '600' }}>{currentArticle.authorName}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{currentArticle.authorTitle}, Evolvix Private Brokerage</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.8rem' }}>
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                  alert('Article link copied to clipboard.');
                }}
                style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--accent-emerald)', fontWeight: '600', padding: '0.4rem 0.8rem', borderRadius: '6px', background: 'var(--bg-sand)' }}
              >
                <Share2 size={16} />
                <span>Share Intelligence</span>
              </button>
            </div>
          </div>
        </div>

        {/* Cover Photo */}
        <div style={{ maxWidth: '1080px', height: '480px', borderRadius: '16px', overflow: 'hidden', margin: '0 auto 3.5rem', boxShadow: 'var(--shadow-md)' }}>
          <img src={currentArticle.coverImage} alt={currentArticle.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        {/* 2-Column: Body + Sticky Table of Contents Sidebar */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3.5rem', maxWidth: '1080px', margin: '0 auto' }}>
          {/* Main Article Content */}
          <div>
            <div style={{ background: '#FFFFFF', padding: 'clamp(2rem, 4vw, 3.5rem)', borderRadius: '20px', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
              <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#1F2937', fontStyle: 'italic', marginBottom: '2.5rem', borderLeft: '4px solid var(--accent-emerald)', paddingLeft: '1.5rem' }}>
                "{currentArticle.excerpt}"
              </p>

              {currentArticle.sections.map((sec, idx) => (
                <div key={idx} id={`section-${idx}`} style={{ marginBottom: '3rem' }}>
                  <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: '1.2rem', color: 'var(--text-noir)' }}>
                    {sec.heading}
                  </h2>
                  <p style={{ fontSize: '1.05rem', lineHeight: '1.85', color: '#374151' }}>
                    {sec.content}
                  </p>
                </div>
              ))}

              {/* Mid-Article Advisory Banner */}
              <div style={{ background: 'var(--bg-dark)', color: '#FFFFFF', padding: '2rem', borderRadius: '14px', margin: '2.5rem 0' }}>
                <span style={{ color: 'var(--accent-sage)', fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                  Executive Consultation
                </span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#FFF', margin: '0.3rem 0 0.8rem' }}>
                  Require Private Modeling on This Asset Class?
                </h3>
                <button onClick={() => onNavigate('contact')} className="btn-primary" style={{ background: 'var(--accent-sage)', color: 'var(--bg-dark)', padding: '0.7rem 1.4rem', fontSize: '0.85rem' }}>
                  Consult Research Authors →
                </button>
              </div>

              {/* Author Bio Card */}
              <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '2rem', marginTop: '2.5rem', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <img src={currentArticle.authorPhoto} alt={currentArticle.authorName} style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', fontWeight: '700', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Author & Advisory Partner</div>
                  <h3
                    onClick={() => onSelectAgent && onSelectAgent(authorAgent)}
                    style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', cursor: 'pointer' }}
                  >
                    {currentArticle.authorName}
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                    Senior Partner specializing in sovereign property placement and architectural acquisitions.
                  </p>
                </div>
              </div>
            </div>

            {/* Discussion / Commentary Section */}
            <div style={{ background: '#FFFFFF', padding: '2.5rem', borderRadius: '20px', border: '1px solid var(--border-light)', marginTop: '3rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <MessageSquare size={20} color="var(--accent-emerald)" />
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem' }}>
                  Private Client Commentary ({comments.length})
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                {comments.map((c, i) => (
                  <div key={i} style={{ background: 'var(--bg-chalk)', padding: '1.2rem', borderRadius: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem', fontSize: '0.82rem' }}>
                      <strong style={{ color: 'var(--text-noir)' }}>{c.author}</strong>
                      <span style={{ color: 'var(--text-muted)' }}>{c.date}</span>
                    </div>
                    <p style={{ fontSize: '0.9rem', color: '#4B5563' }}>{c.text}</p>
                  </div>
                ))}
              </div>

              <form onSubmit={handleAddComment} style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <input
                  type="text"
                  placeholder="Your Name (Optional / Anonymous)"
                  value={commentAuthor}
                  onChange={(e) => setCommentAuthor(e.target.value)}
                  className="form-input"
                  style={{ padding: '0.6rem 1rem' }}
                />
                <textarea
                  rows={3}
                  required
                  placeholder="Contribute analytical perspective to this dossier..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="form-textarea"
                />
                <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start', padding: '0.7rem 1.4rem', fontSize: '0.85rem' }}>
                  <Send size={14} />
                  <span>Submit Client Note</span>
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Sticky Table of Contents & Related Reports */}
          <div>
            <div style={{ position: 'sticky', top: '100px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {/* Table of Contents */}
              <div style={{ background: '#FFFFFF', padding: '1.8rem', borderRadius: '16px', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', marginBottom: '1rem' }}>
                  Dossier Sections
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {currentArticle.sections.map((sec, idx) => (
                    <a
                      key={idx}
                      href={`#section-${idx}`}
                      style={{
                        fontSize: '0.88rem',
                        color: activeSection === idx ? 'var(--accent-emerald)' : 'var(--text-muted)',
                        fontWeight: activeSection === idx ? '600' : '400',
                        padding: '0.4rem 0',
                        borderBottom: '1px solid var(--border-light)',
                        display: 'block'
                      }}
                      onClick={() => setActiveSection(idx)}
                    >
                      {idx + 1}. {sec.heading}
                    </a>
                  ))}
                </div>
              </div>

              {/* Related Intelligence Articles */}
              <div style={{ background: '#FFFFFF', padding: '1.8rem', borderRadius: '16px', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', marginBottom: '1rem' }}>
                  Related Dossiers
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {relatedArticles.map(rel => (
                    <div
                      key={rel.id}
                      onClick={() => onNavigate('blog')}
                      style={{ display: 'flex', gap: '0.8rem', cursor: 'pointer' }}
                    >
                      <img src={rel.coverImage} alt={rel.title} style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' }} />
                      <div>
                        <div style={{ fontSize: '0.85rem', fontWeight: '600', lineHeight: '1.3' }}>{rel.title}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{rel.readTime}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
