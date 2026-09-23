import React, { useState, useEffect } from 'react';
import { AGENTS_DATA } from '../data/agentsData';
import { Mail, Phone, MapPin, Clock, Send, ChevronDown, ChevronUp, CheckCircle, MessageSquare, Calendar, X, Sparkles, Bot } from 'lucide-react';

export const ContactPage = ({ onSelectAgent }) => {
  const [selectedOffice, setSelectedOffice] = useState('beverly-hills');
  const [inquiryType, setInquiryType] = useState('buying');
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  // Booking Modal
  const [isBookCallOpen, setIsBookCallOpen] = useState(false);
  const [callBooked, setCallBooked] = useState(false);

  // Live Chat Floating Widget State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'advisor', text: 'Welcome to Evolvix Private Advisory. How may our senior partners assist your property search or valuation today?' }
  ]);
  const [userInput, setUserInput] = useState('');

  // Time Clocks simulation
  const [times, setTimes] = useState({ la: '', ny: '', miami: '' });

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      setTimes({
        la: now.toLocaleTimeString('en-US', { timeZone: 'America/Los_Angeles', hour: '2-digit', minute: '2-digit' }),
        ny: now.toLocaleTimeString('en-US', { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit' }),
        miami: now.toLocaleTimeString('en-US', { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit' })
      });
    };
    updateTimes();
    const interval = setInterval(updateTimes, 10000);
    return () => clearInterval(interval);
  }, []);

  const offices = [
    {
      id: 'beverly-hills',
      name: 'Beverly Hills Flagship',
      address: '9601 Wilshire Boulevard, Penthouse 12, Beverly Hills, CA 90210',
      phone: '+1 (310) 849-2200',
      email: 'beverlyhills@evolvixluxury.com',
      time: times.la,
      timezone: 'PST'
    },
    {
      id: 'manhattan',
      name: 'Manhattan SoHo Salon',
      address: '520 Broadway, 8th Floor, New York, NY 10012',
      phone: '+1 (212) 694-8830',
      email: 'manhattan@evolvixluxury.com',
      time: times.ny,
      timezone: 'EST'
    },
    {
      id: 'miami',
      name: 'Miami Design District',
      address: '160 NE 40th Street, Suite 400, Miami, FL 33137',
      phone: '+1 (305) 712-4411',
      email: 'miami@evolvixluxury.com',
      time: times.miami,
      timezone: 'EST'
    }
  ];

  const faqs = [
    {
      q: 'How does Evolvix ensure complete confidentiality for high-profile clients?',
      a: 'We maintain institutional Non-Disclosure Agreements (NDAs), encrypted private file repositories, and off-market listing protocols that exclude public MLS syndication unless authorized.'
    },
    {
      q: 'Can Evolvix facilitate cross-border capital placements and currency settlements?',
      a: 'Yes. Our private wealth network coordinates directly with international family offices, escrow partners, and legal counsel specializing in cross-border acquisitions.'
    },
    {
      q: 'What is the minimum asset tier represented by Evolvix?',
      a: 'While our primary transactional focus is ultra-prime properties above $5,000,000, we represent bespoke architectural residences of exceptional provenance across all tiers.'
    }
  ];

  const currentOfficeData = offices.find(o => o.id === selectedOffice) || offices[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      alert('Thank you. Your inquiry has been routed directly to the appropriate regional Managing Partner.');
    }, 1800);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    const newMsg = { sender: 'user', text: userInput };
    setChatMessages(prev => [...prev, newMsg]);
    setUserInput('');

    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        {
          sender: 'advisor',
          text: 'Thank you for your message. An executive advisor has been alerted and can also be reached directly at +1 (310) 849-2200.'
        }
      ]);
    }, 800);
  };

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', background: 'var(--bg-chalk)', paddingBottom: '6rem' }}>
      <div className="container">
        {/* Header */}
        <div style={{ maxWidth: '680px', marginBottom: '3.5rem' }}>
          <span style={{ color: 'var(--accent-emerald)', fontSize: '0.8rem', fontWeight: '600', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
            Global Flagship Salons
          </span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.8rem', marginTop: '0.2rem' }}>
            Initiate a Private Dialogue
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginTop: '0.6rem' }}>
            Reach our regional managing partners for private showings, seller representation, or confidential advisory.
          </p>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => setIsBookCallOpen(true)}
              className="btn-primary"
              style={{ padding: '0.75rem 1.4rem', fontSize: '0.88rem' }}
            >
              <Calendar size={16} />
              <span>Book a Consultation Call</span>
            </button>

            <button
              onClick={() => setIsChatOpen(true)}
              className="btn-secondary"
              style={{ padding: '0.75rem 1.4rem', fontSize: '0.88rem' }}
            >
              <MessageSquare size={16} />
              <span>Live Concierge Chat</span>
            </button>
          </div>
        </div>

        {/* 2-Column: Form & Offices */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '3.5rem', marginBottom: '5rem' }}>
          {/* Left Column: Form */}
          <div style={{ background: '#FFFFFF', padding: '2.5rem', borderRadius: '20px', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-md)' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: '1.2rem' }}>
              Confidential Inquiry Form
            </h2>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                <CheckCircle size={56} color="var(--accent-emerald)" style={{ margin: '0 auto 1rem' }} />
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem' }}>Inquiry Dispatched</h3>
                <p style={{ color: 'var(--text-muted)' }}>An executive partner will contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                {/* Segmented Inquiry Tabs */}
                <div style={{ display: 'flex', background: 'var(--bg-sand)', padding: '0.3rem', borderRadius: '8px', gap: '0.3rem' }}>
                  {['buying', 'selling', 'press'].map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setInquiryType(type)}
                      style={{
                        flex: 1,
                        padding: '0.5rem',
                        borderRadius: '6px',
                        fontSize: '0.82rem',
                        fontWeight: inquiryType === type ? '600' : '400',
                        background: inquiryType === type ? '#FFFFFF' : 'transparent',
                        boxShadow: inquiryType === type ? 'var(--shadow-sm)' : 'none',
                        textTransform: 'capitalize'
                      }}
                    >
                      {type === 'press' ? 'Press & Media' : `I Am ${type.charAt(0).toUpperCase() + type.slice(1)}`}
                    </button>
                  ))}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.3rem' }}>Full Legal Name</label>
                  <input type="text" required placeholder="e.g. Eleanor Vance" className="form-input" />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.3rem' }}>Email Address</label>
                    <input type="email" required placeholder="eleanor@vance.com" className="form-input" />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.3rem' }}>Phone Number (Click-to-Call)</label>
                    <input type="tel" placeholder="+1 (555) 000-0000" className="form-input" />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.3rem' }}>Message / Advisory Scope</label>
                  <textarea rows={4} required placeholder="Detail specific enclaves, price thresholds, or property addresses..." className="form-textarea" />
                </div>

                <button type="submit" className="btn-primary" style={{ padding: '0.9rem', width: '100%' }}>
                  <Send size={16} />
                  <span>Transmit Confidential Inquiry</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Office Switcher & Live Clocks */}
          <div>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {offices.map(o => (
                <button
                  key={o.id}
                  onClick={() => setSelectedOffice(o.id)}
                  style={{
                    padding: '0.6rem 1rem',
                    borderRadius: '8px',
                    fontSize: '0.82rem',
                    fontWeight: selectedOffice === o.id ? '600' : '400',
                    background: selectedOffice === o.id ? 'var(--accent-emerald)' : '#FFFFFF',
                    color: selectedOffice === o.id ? '#FFFFFF' : 'var(--text-noir)',
                    border: '1px solid var(--border-light)'
                  }}
                >
                  {o.name.split(' ')[0]}
                </button>
              ))}
            </div>

            <div style={{ background: '#FFFFFF', padding: '2.2rem', borderRadius: '16px', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem' }}>{currentOfficeData.name}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-emerald)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: '600' }}>
                  <Clock size={15} />
                  <span>{currentOfficeData.time} ({currentOfficeData.timezone})</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.92rem' }}>
                <div style={{ display: 'flex', gap: '0.8rem' }}>
                  <MapPin size={18} color="var(--accent-emerald)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{currentOfficeData.address}</span>
                </div>
                <div style={{ display: 'flex', gap: '0.8rem' }}>
                  <Phone size={18} color="var(--accent-emerald)" style={{ flexShrink: 0 }} />
                  <a href={`tel:${currentOfficeData.phone}`} style={{ color: 'inherit', fontWeight: '600' }}>{currentOfficeData.phone}</a>
                </div>
                <div style={{ display: 'flex', gap: '0.8rem' }}>
                  <Mail size={18} color="var(--accent-emerald)" style={{ flexShrink: 0 }} />
                  <span>{currentOfficeData.email}</span>
                </div>
              </div>
            </div>

            {/* Quick Agent Directory */}
            <div style={{ background: 'var(--bg-sand)', padding: '1.8rem', borderRadius: '16px' }}>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', marginBottom: '1rem' }}>
                Direct Partner Directory
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {AGENTS_DATA.map(agent => (
                  <div
                    key={agent.id}
                    onClick={() => onSelectAgent(agent)}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#FFFFFF', padding: '0.8rem 1rem', borderRadius: '8px', cursor: 'pointer' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                      <img src={agent.photo} alt={agent.name} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
                      <div>
                        <div style={{ fontWeight: '600', fontSize: '0.88rem' }}>{agent.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{agent.title.split('—')[0]}</div>
                      </div>
                    </div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--accent-emerald)', fontWeight: '600' }}>Profile →</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', textAlign: 'center', marginBottom: '2rem' }}>
            Frequently Asked Advisory Questions
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {faqs.map((faq, i) => (
              <div
                key={i}
                style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid var(--border-light)', overflow: 'hidden' }}
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  style={{ width: '100%', padding: '1.2rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'left', fontWeight: '600', fontSize: '1rem' }}
                >
                  <span>{faq.q}</span>
                  {activeFaq === i ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                {activeFaq === i && (
                  <div style={{ padding: '0 1.5rem 1.4rem', color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.6' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Book a Call Modal */}
      {isBookCallOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1100,
            background: 'rgba(17,19,21,0.8)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
          }}
          onClick={() => setIsBookCallOpen(false)}
        >
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '20px',
              padding: '2.5rem',
              maxWidth: '480px',
              width: '100%',
              boxShadow: 'var(--shadow-dark)',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsBookCallOpen(false)}
              style={{ position: 'absolute', top: '16px', right: '16px' }}
            >
              <X size={20} />
            </button>

            {callBooked ? (
              <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                <CheckCircle size={48} color="var(--accent-emerald)" style={{ margin: '0 auto 1rem' }} />
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem' }}>Call Reservation Confirmed</h3>
                <p style={{ color: 'var(--text-muted)' }}>An advisor calendar invite has been dispatched.</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setCallBooked(true);
                  setTimeout(() => {
                    setCallBooked(false);
                    setIsBookCallOpen(false);
                  }, 1800);
                }}
              >
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', marginBottom: '0.4rem' }}>
                  Schedule Private Consultation Call
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
                  Select a date & time for a confidential phone or encrypted Zoom session.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.3rem' }}>Preferred Date & Window</label>
                    <select className="form-select">
                      <option>Tomorrow at 10:00 AM (EST)</option>
                      <option>Tomorrow at 2:00 PM (EST)</option>
                      <option>Thursday at 11:30 AM (EST)</option>
                      <option>Friday at 4:00 PM (EST)</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.3rem' }}>Your Direct Phone / WhatsApp</label>
                    <input type="tel" required placeholder="+1 (555) 000-0000" className="form-input" />
                  </div>

                  <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
                    <Calendar size={16} />
                    <span>Confirm Consultation</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Floating Live Concierge Chat Widget */}
      {isChatOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 1000,
            width: '360px',
            background: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid var(--border-light)',
            boxShadow: 'var(--shadow-dark)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <div style={{ background: 'var(--bg-dark)', color: '#FFFFFF', padding: '1rem 1.2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Bot size={18} color="var(--accent-sage)" />
              <div>
                <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>Evolvix Private Advisory</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--accent-sage)' }}>● Live Concierge Online</div>
              </div>
            </div>
            <button onClick={() => setIsChatOpen(false)} style={{ color: '#FFF' }}>
              <X size={18} />
            </button>
          </div>

          <div style={{ padding: '1rem', height: '240px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.8rem', background: 'var(--bg-chalk)' }}>
            {chatMessages.map((m, idx) => (
              <div
                key={idx}
                style={{
                  alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                  background: m.sender === 'user' ? 'var(--accent-emerald)' : '#FFFFFF',
                  color: m.sender === 'user' ? '#FFFFFF' : 'var(--text-noir)',
                  padding: '0.6rem 0.9rem',
                  borderRadius: '12px',
                  maxWidth: '85%',
                  fontSize: '0.85rem',
                  boxShadow: 'var(--shadow-sm)',
                  lineHeight: '1.4'
                }}
              >
                {m.text}
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} style={{ padding: '0.8rem', borderTop: '1px solid var(--border-light)', display: 'flex', gap: '0.4rem', background: '#FFFFFF' }}>
            <input
              type="text"
              placeholder="Ask an advisor..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="form-input"
              style={{ padding: '0.5rem 0.8rem', fontSize: '0.85rem' }}
            />
            <button type="submit" className="btn-primary" style={{ padding: '0.5rem 0.8rem' }}>
              <Send size={14} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
