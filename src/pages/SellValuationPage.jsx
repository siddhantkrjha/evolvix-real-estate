import React, { useState } from 'react';
import { Shield, Sparkles, CheckCircle2, ArrowRight, ArrowLeft, Home, DollarSign, Award, ChevronDown, ChevronUp, Camera, Palette, Globe, Lock } from 'lucide-react';

export const SellValuationPage = ({ onNavigate }) => {
  const [step, setStep] = useState(1);
  
  // Funnel Form State
  const [address, setAddress] = useState('');
  const [propertyType, setPropertyType] = useState('estate');
  const [beds, setBeds] = useState(5);
  const [baths, setBaths] = useState(6);
  const [sqft, setSqft] = useState(7500);
  const [condition, setCondition] = useState('Mint Architectural / Turnkey');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [activeFaq, setActiveFaq] = useState(null);

  // Valuation Result
  const [estimatedRange, setEstimatedRange] = useState(null);

  // Ballpark instant quick estimate widget
  const [ballparkSqft, setBallparkSqft] = useState(6500);
  const [ballparkType, setBallparkType] = useState('estate');

  const calculateBallpark = () => {
    const rate = ballparkType === 'penthouse' ? 2200 : ballparkType === 'estate' ? 1900 : 1650;
    return ballparkSqft * rate;
  };

  const calculateEstimate = (e) => {
    e.preventDefault();
    const baseSqftRate = propertyType === 'penthouse' ? 2100 : propertyType === 'estate' ? 1800 : 1600;
    const conditionMultiplier = condition.includes('Mint') ? 1.15 : 1.0;
    const estimatedValue = sqft * baseSqftRate * conditionMultiplier;
    const low = Math.round((estimatedValue * 0.94) / 50000) * 50000;
    const high = Math.round((estimatedValue * 1.08) / 50000) * 50000;

    setEstimatedRange({ low, high, median: estimatedValue });
    setStep(4);
  };

  const formatPrice = (val) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  };

  const soldComps = [
    { title: 'The Carolwood Estate, Holmby Hills', price: 28500000, date: 'Closed Dec 2024', sqft: 12500 },
    { title: 'Skyline Terrace Penthouse, TriBeCa', price: 16200000, date: 'Closed Nov 2024', sqft: 7200 },
    { title: 'Biscayne Bayfront Villa, Venetian Is.', price: 21800000, date: 'Closed Jan 2025', sqft: 8900 }
  ];

  const sellerFaqs = [
    {
      q: 'How does Evolvix protect my privacy during the sales process?',
      a: 'We offer fully private off-market syndication. Your residence is never posted on public MLS or consumer portals unless explicitly requested. Viewings are strictly by appointment for vetted buyers under Non-Disclosure Agreements.'
    },
    {
      q: 'What is included in the Evolvix Architectural Media Concierge?',
      a: 'Our in-house production team creates 4K architectural films, spatial dollhouse 3D models, sunset twilight photography, and bespoke linen-bound monographs for sovereign buyers.'
    },
    {
      q: 'What are typical closing timelines for ultra-prime residences?',
      a: 'Through our targeted private buyer network, our average time to contract is 14 days, with institutional escrow coordination completing within 21 to 30 days.'
    }
  ];

  const sellerTestimonials = [
    {
      quote: "Evolvix secured an off-market sale $2.4M above our private benchmark with zero public open houses or media exposure.",
      seller: "Former Fortune 50 CEO",
      enclave: "Bel Air Estate Seller"
    },
    {
      quote: "Their sovereign wealth syndication brought pre-qualified family office buyers from Zurich and London within two weeks.",
      seller: "Biotech Founder",
      enclave: "SoHo Penthouse Seller"
    }
  ];

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', background: 'var(--bg-chalk)', paddingBottom: '6rem' }}>
      <div className="container">
        {/* Hero Section */}
        <div style={{ maxWidth: '820px', margin: '0 auto 3.5rem', textAlign: 'center' }}>
          <span style={{ color: 'var(--accent-emerald)', fontSize: '0.8rem', fontWeight: '600', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
            Evolvix Private Valuation Engine
          </span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)', lineHeight: 1.15, marginTop: '0.3rem' }}>
            Find Out What Your Legacy Home is Worth
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginTop: '0.8rem' }}>
            Combine real-time prime comp analytics with sovereign wealth appetite indices for an institutional property appraisal.
          </p>
        </div>

        {/* 4-Step Interactive Valuation Container */}
        <div
          style={{
            maxWidth: '780px',
            margin: '0 auto 5rem',
            background: '#FFFFFF',
            borderRadius: '24px',
            padding: 'clamp(2rem, 4vw, 3.5rem)',
            boxShadow: 'var(--shadow-lg)',
            border: '1px solid var(--border-light)'
          }}
        >
          {/* Progress Bar */}
          <div style={{ marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '0.5rem', fontFamily: 'var(--font-mono)' }}>
              <span>STEP {step} OF 4</span>
              <span>
                {step === 1 && 'Property Address & Verification'}
                {step === 2 && 'Architectural Specifications'}
                {step === 3 && 'Condition & Timeline'}
                {step === 4 && 'Institutional Valuation Estimate'}
              </span>
            </div>
            <div style={{ width: '100%', height: '6px', background: 'var(--bg-sand)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: `${(step / 4) * 100}%`, height: '100%', background: 'var(--accent-emerald)', transition: 'width 0.35s ease' }} />
            </div>
          </div>

          {/* STEP 1: Address */}
          {step === 1 && (
            <div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: '0.5rem' }}>
                Enter Residence Address
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '1.8rem' }}>
                We pull tax assessor data and active off-market comparable metrics for this parcel.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', marginBottom: '0.4rem' }}>Property Address</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 10480 Bellagio Road, Bel Air, CA 90077"
                    className="form-input"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', marginBottom: '0.4rem' }}>Primary Architectural Classification</label>
                  <select
                    className="form-select"
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                  >
                    <option value="estate">Trophy Estate / Gated Compound</option>
                    <option value="penthouse">High-Rise Penthouse / Loft</option>
                    <option value="waterfront">Prime Waterfront / Barrier Island</option>
                    <option value="single_family">Heritage Single-Family Manor</option>
                  </select>
                </div>

                <button
                  type="button"
                  disabled={!address}
                  onClick={() => setStep(2)}
                  className="btn-primary"
                  style={{ marginTop: '1rem', padding: '0.9rem', opacity: address ? 1 : 0.6 }}
                >
                  <span>Proceed to Specifications</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Specs */}
          {step === 2 && (
            <div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: '0.5rem' }}>
                Spatial Specifications
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '1.8rem' }}>
                Verify interior living area and room configurations.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem', fontSize: '0.85rem', fontWeight: '600' }}>
                    <span>Interior Square Footage</span>
                    <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-emerald)' }}>{sqft.toLocaleString()} sq ft</span>
                  </div>
                  <input
                    type="range"
                    min="2500"
                    max="25000"
                    step="250"
                    value={sqft}
                    onChange={(e) => setSqft(Number(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--accent-emerald)' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', marginBottom: '0.4rem' }}>Bedrooms</label>
                    <select
                      className="form-select"
                      value={beds}
                      onChange={(e) => setBeds(Number(e.target.value))}
                    >
                      <option value={3}>3 Bedrooms</option>
                      <option value={4}>4 Bedrooms</option>
                      <option value={5}>5 Bedrooms</option>
                      <option value={6}>6+ Bedrooms</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', marginBottom: '0.4rem' }}>Bathrooms</label>
                    <select
                      className="form-select"
                      value={baths}
                      onChange={(e) => setBaths(Number(e.target.value))}
                    >
                      <option value={4}>4 Baths</option>
                      <option value={6}>6 Baths</option>
                      <option value={8}>8+ Baths</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                  <button type="button" onClick={() => setStep(1)} className="btn-secondary" style={{ flex: 1 }}>
                    <ArrowLeft size={16} />
                    <span>Back</span>
                  </button>
                  <button type="button" onClick={() => setStep(3)} className="btn-primary" style={{ flex: 2 }}>
                    <span>Continue to Condition</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Condition & Client Info */}
          {step === 3 && (
            <form onSubmit={calculateEstimate}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: '0.5rem' }}>
                Condition & Confidential Delivery
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '1.8rem' }}>
                Where should we transmit your institutional Comparative Market Analysis (CMA)?
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', marginBottom: '0.4rem' }}>Renovation & Finishes Condition</label>
                  <select
                    className="form-select"
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                  >
                    <option>Mint Architectural / Turnkey Designer Finishes</option>
                    <option>Excellent / Recently Updated</option>
                    <option>Original Heritage / Renovation Opportunity</option>
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', marginBottom: '0.4rem' }}>Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Richard Sterling"
                      className="form-input"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', marginBottom: '0.4rem' }}>Email for Report Delivery</label>
                    <input
                      type="email"
                      required
                      placeholder="richard@sterling.com"
                      className="form-input"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                  <button type="button" onClick={() => setStep(2)} className="btn-secondary" style={{ flex: 1 }}>
                    <ArrowLeft size={16} />
                    <span>Back</span>
                  </button>
                  <button type="submit" className="btn-primary" style={{ flex: 2 }}>
                    <Sparkles size={16} />
                    <span>Calculate Market Estimate</span>
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* STEP 4: Valuation Output Result */}
          {step === 4 && estimatedRange && (
            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
              <div style={{ display: 'inline-flex', padding: '0.4rem 1rem', background: 'var(--accent-sage-light)', color: 'var(--accent-emerald)', borderRadius: '30px', fontWeight: '700', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', marginBottom: '1rem' }}>
                INSTITUTIONAL VALUATION GENERATED
              </div>

              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', marginBottom: '0.4rem' }}>
                Estimated Private Market Value
              </h2>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                {address || 'Confidential Residence'}
              </div>

              <div
                style={{
                  background: 'var(--bg-dark)',
                  color: '#FFF',
                  padding: '2.5rem',
                  borderRadius: '20px',
                  boxShadow: 'var(--shadow-md)',
                  marginBottom: '2rem'
                }}
              >
                <div style={{ fontSize: '0.85rem', color: 'var(--accent-sage)', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'var(--font-mono)' }}>
                  Estimated Target Multiple Range
                </div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', fontWeight: '600', color: '#FFF', margin: '0.5rem 0' }}>
                  {formatPrice(estimatedRange.low)} — {formatPrice(estimatedRange.high)}
                </div>
                <p style={{ color: 'var(--text-sand)', fontSize: '0.9rem', maxWidth: '480px', margin: '0 auto' }}>
                  Based on recent comps averaging ${Math.round(estimatedRange.median / sqft)}/sqft across prime comparable enclaves.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <button
                  onClick={() => onNavigate('contact')}
                  className="btn-primary"
                  style={{ padding: '0.9rem 2rem' }}
                >
                  Schedule Partner In-Person Assessment
                </button>
                <button
                  onClick={() => setStep(1)}
                  className="btn-secondary"
                >
                  Recalculate
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Instant Ballpark Estimate Quick Widget */}
        <div style={{ maxWidth: '780px', margin: '0 auto 5rem', background: '#FFFFFF', padding: '2.5rem', borderRadius: '20px', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--accent-emerald)', marginBottom: '0.4rem' }}>
            <Sparkles size={18} />
            <span style={{ fontSize: '0.8rem', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
              Quick Ballpark Benchmark
            </span>
          </div>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', marginBottom: '1.2rem' }}>
            Instant Square Footage Valuation Multiple
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.3rem' }}>
                Estimated Sq Ft: {ballparkSqft.toLocaleString()}
              </label>
              <input
                type="range"
                min="3000"
                max="20000"
                step="500"
                value={ballparkSqft}
                onChange={(e) => setBallparkSqft(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--accent-emerald)' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.3rem' }}>Property Class</label>
              <select
                className="form-select"
                value={ballparkType}
                onChange={(e) => setBallparkType(e.target.value)}
              >
                <option value="estate">Trophy Estate</option>
                <option value="penthouse">High-Rise Penthouse</option>
                <option value="waterfront">Waterfront Villa</option>
              </select>
            </div>

            <div style={{ background: 'var(--bg-sand)', padding: '1rem', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Estimated Value</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.4rem', fontWeight: '700', color: 'var(--accent-emerald)' }}>
                {formatPrice(calculateBallpark())}
              </div>
            </div>
          </div>
        </div>

        {/* Selling Process Timeline (List -> Market -> Offers -> Close) */}
        <div style={{ maxWidth: '960px', margin: '0 auto 5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ color: 'var(--accent-emerald)', fontSize: '0.8rem', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
              Execution Lifecycle
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', marginTop: '0.2rem' }}>
              The Private Representation Process
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
            {[
              { step: '01', title: 'NDA & Discretion', desc: 'Execution of confidentiality agreements and archival asset valuation.' },
              { step: '02', title: '4K Architectural Media', desc: 'Bespoke cinematography, spatial 3D tour capture, and monograph production.' },
              { step: '03', title: 'Private Syndication', desc: 'Direct placement with sovereign entities, tech founders, and family offices.' },
              { step: '04', title: 'Escrow Execution', desc: 'Institutional legal oversight, currency settlement, and seamless closing.' }
            ].map((item, idx) => (
              <div key={idx} style={{ background: '#FFFFFF', padding: '2rem 1.5rem', borderRadius: '16px', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.8rem', fontWeight: '700', color: 'var(--accent-emerald)', marginBottom: '0.6rem' }}>
                  {item.step}
                </div>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', marginBottom: '0.4rem' }}>{item.title}</h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Seller Specific Testimonials */}
        <div style={{ maxWidth: '880px', margin: '0 auto 5rem', background: 'var(--bg-dark)', color: '#FFFFFF', padding: '3.5rem', borderRadius: '24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{ color: 'var(--accent-sage)', fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
              Seller Provenance
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: '#FFF', marginTop: '0.2rem' }}>
              What Trophy Home Sellers Experience
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {sellerTestimonials.map((t, idx) => (
              <div key={idx} style={{ borderLeft: '2px solid var(--accent-sage)', paddingLeft: '1.5rem' }}>
                <p style={{ fontStyle: 'italic', fontSize: '1rem', lineHeight: '1.7', color: 'var(--text-sand)', marginBottom: '1rem' }}>
                  "{t.quote}"
                </p>
                <div style={{ fontWeight: '600', color: '#FFF' }}>{t.seller}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--accent-sage)' }}>{t.enclave}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Recently Closed Comps Strip */}
        <div style={{ maxWidth: '960px', margin: '0 auto 5rem' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: '1.5rem', textAlign: 'center' }}>
            Recently Closed Comparable Trophy Transactions
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {soldComps.map((comp, i) => (
              <div key={i} style={{ background: '#FFFFFF', padding: '1.6rem', borderRadius: '14px', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', fontWeight: '600', fontFamily: 'var(--font-mono)' }}>{comp.date}</div>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', margin: '0.3rem 0' }}>{comp.title}</h4>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.3rem', fontWeight: '700', color: 'var(--accent-emerald)' }}>
                  {formatPrice(comp.price)}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                  {comp.sqft.toLocaleString()} sqft • ${Math.round(comp.price / comp.sqft)}/sqft
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Seller FAQ Accordion */}
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', textAlign: 'center', marginBottom: '2rem' }}>
            Seller Advisory Questions & Discretion FAQs
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {sellerFaqs.map((faq, i) => (
              <div key={i} style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid var(--border-light)', overflow: 'hidden' }}>
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
    </div>
  );
};
