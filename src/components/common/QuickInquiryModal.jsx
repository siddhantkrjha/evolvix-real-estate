import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Shield, Send, CheckCircle2 } from 'lucide-react';

export const QuickInquiryModal = () => {
  const { isInquiryModalOpen, inquiryContext, closeInquiryModal } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [interestType, setInterestType] = useState('Private Showing');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isInquiryModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      closeInquiryModal();
      alert('Thank you. A Senior Private Advisor from Evolvix will contact you discreetly within 2 hours.');
    }, 1800);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1100,
        background: 'rgba(17, 19, 21, 0.8)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem'
      }}
      onClick={closeInquiryModal}
    >
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: '20px',
          width: '100%',
          maxWidth: '560px',
          padding: '2.5rem',
          boxShadow: 'var(--shadow-dark)',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeInquiryModal}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'var(--bg-sand)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <X size={18} />
        </button>

        {isSubmitted ? (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <CheckCircle2 size={64} color="var(--accent-emerald)" style={{ margin: '0 auto 1.5rem' }} />
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: '0.5rem' }}>
              Inquiry Registered
            </h3>
            <p style={{ color: 'var(--text-muted)' }}>
              Your confidential inquiry has been routed to our Senior Advisory Group.
            </p>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-emerald)', fontSize: '0.8rem', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
              <Shield size={14} />
              <span>Confidential Advisory Service</span>
            </div>

            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', marginTop: '0.4rem', marginBottom: '0.2rem' }}>
              {inquiryContext.propertyTitle ? `Inquire: ${inquiryContext.propertyTitle}` : 'Schedule a Private Consultation'}
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Direct access to our senior partners for off-market access, private showings, or bespoke portfolio consultation.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.3rem' }}>Your Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lord Harrison Sterling"
                  className="form-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.3rem' }}>Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="harrison@sterling.com"
                    className="form-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.3rem' }}>Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className="form-input"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.3rem' }}>Inquiry Classification</label>
                <select
                  className="form-select"
                  value={interestType}
                  onChange={(e) => setInterestType(e.target.value)}
                >
                  <option>Private In-Person Tour</option>
                  <option>Off-Market Portfolio Inquiry</option>
                  <option>Seller Representation & Valuation</option>
                  <option>International Capital Placement</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.3rem' }}>Confidential Notes</label>
                <textarea
                  rows={3}
                  placeholder="Preferred dates, NDA requirements, or specific requests..."
                  className="form-textarea"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <button type="submit" className="btn-primary" style={{ marginTop: '0.5rem', width: '100%' }}>
                <Send size={16} />
                <span>Submit Confidential Request</span>
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
