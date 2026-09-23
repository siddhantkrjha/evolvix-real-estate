import React, { useState } from 'react';
import { Calculator, DollarSign, Percent, Calendar } from 'lucide-react';

export const MortgageCalculator = ({ defaultPrice = 15000000, hoaMonthly = 1200, annualTaxes = 180000 }) => {
  const [homePrice, setHomePrice] = useState(defaultPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState(25);
  const [interestRate, setInterestRate] = useState(6.25);
  const [loanTermYears, setLoanTermYears] = useState(30);

  // Math calculations
  const downPaymentAmount = (homePrice * downPaymentPercent) / 100;
  const principalLoanAmount = homePrice - downPaymentAmount;
  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = loanTermYears * 12;

  const monthlyPrincipalAndInterest = monthlyRate > 0
    ? (principalLoanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) / (Math.pow(1 + monthlyRate, totalMonths) - 1)
    : principalLoanAmount / totalMonths;

  const monthlyTaxes = annualTaxes / 12;
  const monthlyInsurance = (homePrice * 0.0035) / 12; // Approx 0.35% luxury property insurance
  const totalMonthlyPayment = monthlyPrincipalAndInterest + monthlyTaxes + (hoaMonthly || 0) + monthlyInsurance;

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div
      style={{
        background: '#FFFFFF',
        borderRadius: '16px',
        border: '1px solid var(--border-light)',
        padding: '2.2rem',
        boxShadow: 'var(--shadow-sm)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-emerald)', fontSize: '0.8rem', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
        <Calculator size={15} />
        <span>Financial Modeling</span>
      </div>
      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', marginTop: '0.2rem', marginBottom: '1.5rem' }}>
        Private Wealth & Mortgage Estimator
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
        {/* Interactive Sliders & Inputs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
          {/* Home Price */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.88rem', fontWeight: '600' }}>
              <span>Purchase Price</span>
              <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-emerald)' }}>{formatCurrency(homePrice)}</span>
            </div>
            <input
              type="range"
              min="2000000"
              max="50000000"
              step="250000"
              value={homePrice}
              onChange={(e) => setHomePrice(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--accent-emerald)' }}
            />
          </div>

          {/* Down Payment */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.88rem', fontWeight: '600' }}>
              <span>Down Payment ({downPaymentPercent}%)</span>
              <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-emerald)' }}>{formatCurrency(downPaymentAmount)}</span>
            </div>
            <input
              type="range"
              min="10"
              max="50"
              step="5"
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--accent-emerald)' }}
            />
          </div>

          {/* Interest Rate & Term */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.3rem' }}>
                Interest Rate (%)
              </label>
              <input
                type="number"
                step="0.05"
                min="2.0"
                max="12.0"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="form-input"
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.3rem' }}>
                Loan Duration
              </label>
              <select
                value={loanTermYears}
                onChange={(e) => setLoanTermYears(Number(e.target.value))}
                className="form-select"
              >
                <option value={15}>15-Year Fixed</option>
                <option value={30}>30-Year Fixed</option>
                <option value={10}>10-Year ARM / Jumbo</option>
              </select>
            </div>
          </div>
        </div>

        {/* Breakdown Card */}
        <div
          style={{
            background: 'var(--bg-sand)',
            borderRadius: '14px',
            padding: '1.8rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '600' }}>
              Estimated Total Monthly Investment
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '2.4rem', fontWeight: '700', color: 'var(--accent-emerald)', marginTop: '0.2rem' }}>
              {formatCurrency(totalMonthlyPayment)}
              <span style={{ fontSize: '0.9rem', fontWeight: '400', color: 'var(--text-muted)' }}>/mo</span>
            </div>
          </div>

          {/* Cost Allocation Rows */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', marginTop: '1.5rem', borderTop: '1px solid rgba(17, 19, 21, 0.08)', paddingTop: '1.2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
              <span style={{ color: '#4B5563' }}>Principal & Interest</span>
              <strong style={{ fontFamily: 'var(--font-mono)' }}>{formatCurrency(monthlyPrincipalAndInterest)}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
              <span style={{ color: '#4B5563' }}>Estimated Property Taxes</span>
              <strong style={{ fontFamily: 'var(--font-mono)' }}>{formatCurrency(monthlyTaxes)}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
              <span style={{ color: '#4B5563' }}>HOA / Enclave Dues</span>
              <strong style={{ fontFamily: 'var(--font-mono)' }}>{formatCurrency(hoaMonthly || 0)}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
              <span style={{ color: '#4B5563' }}>Hazard & Umbrella Insurance</span>
              <strong style={{ fontFamily: 'var(--font-mono)' }}>{formatCurrency(monthlyInsurance)}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
