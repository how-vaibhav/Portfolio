import React, { useState } from 'react';

const ORANGE = '#E84419';

export default function ContactScaleSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    businessAge: '',
    challenge: '',
    marketingSpend: '',
    revenue: '',
    paidAds: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const inputStyle = {
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid rgba(255, 255, 255, 0.18)',
    padding: '12px 0 10px 0',
    color: '#fff',
    fontSize: '14px',
    fontWeight: 400,
    outline: 'none',
    transition: 'border-color 0.2s ease',
  };

  const selectStyle = {
    ...inputStyle,
    appearance: 'none',
    WebkitAppearance: 'none',
    cursor: 'pointer',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.4)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 4px center',
    paddingRight: '24px',
  };

  const labelStyle = {
    display: 'block',
    fontSize: '11px',
    fontWeight: 600,
    letterSpacing: '0.06em',
    color: 'rgba(255, 255, 255, 0.7)',
    textTransform: 'uppercase',
    marginBottom: '4px',
  };

  return (
    <section
      id="contact"
      style={{
        background: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '96px 48px 90px',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Top Header Row with Title & Let's Talk Pill */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '64px',
            flexWrap: 'wrap',
            gap: '24px',
          }}
        >
          {/* Main Headline */}
          <div>
            <h2
              style={{
                fontSize: 'clamp(44px, 6.5vw, 84px)',
                fontWeight: 900,
                lineHeight: 0.92,
                letterSpacing: '-0.04em',
                color: '#fff',
                textTransform: 'uppercase',
                margin: 0,
              }}
            >
              READY TO
            </h2>
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '16px',
                flexWrap: 'wrap',
                marginTop: '6px',
              }}
            >
              <span
                style={{
                  fontSize: 'clamp(44px, 6.5vw, 84px)',
                  fontWeight: 900,
                  lineHeight: 0.92,
                  letterSpacing: '-0.04em',
                  color: '#fff',
                  textTransform: 'uppercase',
                }}
              >
                GROW
              </span>
              <span
                style={{
                  fontSize: 'clamp(28px, 4vw, 54px)',
                  fontWeight: 800,
                  lineHeight: 1.05,
                  letterSpacing: '-0.03em',
                  color: 'rgba(255, 255, 255, 0.92)',
                  textTransform: 'uppercase',
                }}
              >
                & SCALE YOUR COMPANY?
              </span>
            </div>
          </div>

          {/* Frosted Glass "Let's Talk" Badge */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '24px',
              padding: '16px 24px',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              maxWidth: '220px',
            }}
          >
            <p
              style={{
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                color: '#fff',
                textTransform: 'uppercase',
                margin: 0,
                marginBottom: '4px',
              }}
            >
              LET'S TALK
            </p>
            <p
              style={{
                fontSize: '10px',
                color: 'rgba(255, 255, 255, 0.5)',
                lineHeight: 1.4,
                margin: 0,
              }}
            >
              Drop us a line and let's discuss your project
            </p>
          </div>
        </div>

        {/* 2-Column Responsive Form */}
        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '40px 64px',
              marginBottom: '56px',
            }}
          >
            {/* Column 1 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
              {/* Name */}
              <div>
                <label style={labelStyle}>YOUR NAME*</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="John Addison"
                  value={formData.name}
                  onChange={handleChange}
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderBottomColor = ORANGE)}
                  onBlur={(e) => (e.target.style.borderBottomColor = 'rgba(255, 255, 255, 0.18)')}
                />
              </div>

              {/* Email */}
              <div>
                <label style={labelStyle}>YOUR EMAIL*</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="johnaddison@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderBottomColor = ORANGE)}
                  onBlur={(e) => (e.target.style.borderBottomColor = 'rgba(255, 255, 255, 0.18)')}
                />
              </div>

              {/* Challenge */}
              <div>
                <label style={labelStyle}>WHAT'S YOUR BIGGEST CHALLENGE IN SCALING RIGHT NOW?</label>
                <select
                  name="challenge"
                  value={formData.challenge}
                  onChange={handleChange}
                  style={selectStyle}
                  onFocus={(e) => (e.target.style.borderBottomColor = ORANGE)}
                  onBlur={(e) => (e.target.style.borderBottomColor = 'rgba(255, 255, 255, 0.18)')}
                >
                  <option value="" style={{ background: '#111', color: '#888' }}>
                    Select your challenge
                  </option>
                  <option value="leads" style={{ background: '#111', color: '#fff' }}>
                    Lead Generation & Customer Acquisition
                  </option>
                  <option value="brand" style={{ background: '#111', color: '#fff' }}>
                    Brand Identity & Positioning
                  </option>
                  <option value="conversion" style={{ background: '#111', color: '#fff' }}>
                    Conversion Rate Optimization & Funnels
                  </option>
                  <option value="product" style={{ background: '#111', color: '#fff' }}>
                    Product Design & Experience
                  </option>
                </select>
              </div>

              {/* Revenue */}
              <div>
                <label style={labelStyle}>WHAT'S YOUR ESTIMATED ANNUAL REVENUE?</label>
                <select
                  name="revenue"
                  value={formData.revenue}
                  onChange={handleChange}
                  style={selectStyle}
                  onFocus={(e) => (e.target.style.borderBottomColor = ORANGE)}
                  onBlur={(e) => (e.target.style.borderBottomColor = 'rgba(255, 255, 255, 0.18)')}
                >
                  <option value="" style={{ background: '#111', color: '#888' }}>
                    Select revenue range
                  </option>
                  <option value="0-100k" style={{ background: '#111', color: '#fff' }}>
                    $0 - $100k
                  </option>
                  <option value="100k-500k" style={{ background: '#111', color: '#fff' }}>
                    $100k - $500k
                  </option>
                  <option value="500k-1M" style={{ background: '#111', color: '#fff' }}>
                    $500k - $1M
                  </option>
                  <option value="1M-5M" style={{ background: '#111', color: '#fff' }}>
                    $1M - $5M
                  </option>
                  <option value="5M+" style={{ background: '#111', color: '#fff' }}>
                    $5M+
                  </option>
                </select>
              </div>
            </div>

            {/* Column 2 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
              {/* Phone */}
              <div>
                <label style={labelStyle}>YOUR NUMBER*</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="+1 (514) 123 4567"
                  value={formData.phone}
                  onChange={handleChange}
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderBottomColor = ORANGE)}
                  onBlur={(e) => (e.target.style.borderBottomColor = 'rgba(255, 255, 255, 0.18)')}
                />
              </div>

              {/* Business Age */}
              <div>
                <label style={labelStyle}>HOW LONG HAVE YOU BEEN IN BUSINESS?</label>
                <select
                  name="businessAge"
                  value={formData.businessAge}
                  onChange={handleChange}
                  style={selectStyle}
                  onFocus={(e) => (e.target.style.borderBottomColor = ORANGE)}
                  onBlur={(e) => (e.target.style.borderBottomColor = 'rgba(255, 255, 255, 0.18)')}
                >
                  <option value="" style={{ background: '#111', color: '#888' }}>
                    Select duration
                  </option>
                  <option value="0-1" style={{ background: '#111', color: '#fff' }}>
                    0 - 1 year
                  </option>
                  <option value="1-3" style={{ background: '#111', color: '#fff' }}>
                    1 - 3 years
                  </option>
                  <option value="3-5" style={{ background: '#111', color: '#fff' }}>
                    3 - 5 years
                  </option>
                  <option value="5+" style={{ background: '#111', color: '#fff' }}>
                    5+ years
                  </option>
                </select>
              </div>

              {/* Marketing Spend */}
              <div>
                <label style={labelStyle}>HOW MUCH DO YOU SPEND ON MARKETING EACH MONTH?</label>
                <select
                  name="marketingSpend"
                  value={formData.marketingSpend}
                  onChange={handleChange}
                  style={selectStyle}
                  onFocus={(e) => (e.target.style.borderBottomColor = ORANGE)}
                  onBlur={(e) => (e.target.style.borderBottomColor = 'rgba(255, 255, 255, 0.18)')}
                >
                  <option value="" style={{ background: '#111', color: '#888' }}>
                    Select budget
                  </option>
                  <option value="<1k" style={{ background: '#111', color: '#fff' }}>
                    &lt; $1,000 / mo
                  </option>
                  <option value="1k-5k" style={{ background: '#111', color: '#fff' }}>
                    $1,000 - $5,000 / mo
                  </option>
                  <option value="5k-15k" style={{ background: '#111', color: '#fff' }}>
                    $5,000 - $15,000 / mo
                  </option>
                  <option value="15k+" style={{ background: '#111', color: '#fff' }}>
                    $15,000+ / mo
                  </option>
                </select>
              </div>

              {/* Paid Ads */}
              <div>
                <label style={labelStyle}>ARE YOU RUNNING PAID ADS RIGHT NOW?</label>
                <select
                  name="paidAds"
                  value={formData.paidAds}
                  onChange={handleChange}
                  style={selectStyle}
                  onFocus={(e) => (e.target.style.borderBottomColor = ORANGE)}
                  onBlur={(e) => (e.target.style.borderBottomColor = 'rgba(255, 255, 255, 0.18)')}
                >
                  <option value="" style={{ background: '#111', color: '#888' }}>
                    Select option
                  </option>
                  <option value="no" style={{ background: '#111', color: '#fff' }}>
                    No
                  </option>
                  <option value="meta" style={{ background: '#111', color: '#fff' }}>
                    Yes — Meta Ads
                  </option>
                  <option value="google" style={{ background: '#111', color: '#fff' }}>
                    Yes — Google Ads
                  </option>
                  <option value="multi" style={{ background: '#111', color: '#fff' }}>
                    Yes — Multi-channel
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* Bottom Submit Action */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <button
              type="submit"
              style={{
                width: '100%',
                maxWidth: '420px',
                height: '52px',
                borderRadius: '999px',
                border: '1px solid rgba(255, 255, 255, 0.35)',
                background: 'rgba(255, 255, 255, 0.04)',
                color: '#fff',
                fontSize: '14px',
                fontWeight: 600,
                letterSpacing: '0.04em',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                transition: 'all 0.25s ease',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = ORANGE;
                e.currentTarget.style.background = ORANGE;
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(232, 68, 25, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.35)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {submitted ? (
                <span>✓ Request Received!</span>
              ) : (
                <>
                  <span>Submit Inquiry</span>
                  <span style={{ fontSize: '18px', transition: 'transform 0.2s' }}>↘</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
