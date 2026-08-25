import React, { useState } from 'react';
import './dev.css';
import { Ripple } from '../ui/ripple';

export default function DevContactCta() {
  const [emailHovered, setEmailHovered] = useState(false);
  const [phoneHovered, setPhoneHovered] = useState(false);

  return (
    <footer
      id="contact"
      style={{
        background: '#080808',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        paddingTop: '80px',
        paddingBottom: '40px',
        paddingLeft: 'clamp(20px, 4.5vw, 64px)',
        paddingRight: 'clamp(20px, 4.5vw, 64px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* ── Ripple Effect behind the CTA ── */}
      <Ripple
        mainCircleSize={240}
        mainCircleOpacity={0.18}
        numCircles={7}
        color="#CCFF00"
      />

      <div style={{ maxWidth: '1360px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        {/* Main CTA 2-Column Row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '48px',
            alignItems: 'center',
            marginBottom: '72px',
          }}
        >
          {/* Left: Massive Typography + Availability Pill */}
          <div>
            <h2
              style={{
                fontFamily: "'Archivo Black', 'Inter', sans-serif",
                fontSize: 'clamp(44px, 6vw, 76px)',
                fontWeight: 900,
                lineHeight: 0.95,
                letterSpacing: '-0.045em',
                textTransform: 'uppercase',
                margin: '0 0 24px 0',
              }}
            >
              <span style={{ color: '#ffffff', display: 'block' }}>LET'S BUILD</span>
              <span style={{ color: '#CCFF00', display: 'block' }}>SOMETHING</span>
              <span style={{ color: '#CCFF00', display: 'block' }}>GREAT TOGETHER.</span>
            </h2>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                borderRadius: '4px',
                background: '#121214',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                color: '#ffffff',
              }}
            >
              <span style={{ color: '#CCFF00', fontWeight: 900 }}>➔</span>
              I'M AVAILABLE FOR FREELANCE & FULL-TIME PROJECTS
            </div>
          </div>

          {/* Right: High-End Contact Hub Box */}
          <div
            style={{
              background: '#0e0e12',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '16px',
              padding: 'clamp(24px, 3.5vw, 36px)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.7)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Subtle background accent glow */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '160px',
                height: '160px',
                background: 'radial-gradient(circle at top right, rgba(42, 92, 255, 0.15), transparent 70%)',
                pointerEvents: 'none',
              }}
            />

            {/* Header / Eyebrow */}
            <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '12px' }}>
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 900,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: '#CCFF00',
                  marginBottom: '4px',
                }}
              >
                ✦ DIRECT COMMUNICATION
              </div>
              <p style={{ fontSize: '12.5px', color: 'rgba(255, 255, 255, 0.6)', margin: 0, lineHeight: 1.4 }}>
                Reach out for architectural consultations, client projects, or full-stack engineering.
              </p>
            </div>

            {/* 1. Email Interactive Action Card */}
            <a
              href="mailto:vaibhav10505@gmail.com?subject=Project%20Inquiry%20%2F%20Collaboration"
              onMouseEnter={() => setEmailHovered(true)}
              onMouseLeave={() => setEmailHovered(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 18px',
                background: emailHovered ? '#16161d' : '#121217',
                border: emailHovered ? '1px solid rgba(204, 255, 0, 0.45)' : '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '10px',
                textDecoration: 'none',
                boxShadow: emailHovered ? '0 8px 24px rgba(204, 255, 0, 0.15)' : 'none',
                transform: emailHovered ? 'translateY(-2px)' : 'translateY(0)',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                {/* Mail Icon Box */}
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    background: 'rgba(204, 255, 0, 0.1)',
                    border: '1px solid rgba(204, 255, 0, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px',
                    color: '#CCFF00',
                    flexShrink: 0,
                  }}
                >
                  ✉
                </div>

                <div>
                  <div
                    style={{
                      fontSize: '10px',
                      fontWeight: 800,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'rgba(255, 255, 255, 0.45)',
                      marginBottom: '2px',
                    }}
                  >
                    EMAIL ADDRESS
                  </div>
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '14px',
                      fontWeight: 700,
                      color: '#ffffff',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    vaibhav10505@gmail.com
                  </div>
                </div>
              </div>

              {/* Action Badge */}
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: 900,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  color: emailHovered ? '#000000' : '#CCFF00',
                  background: emailHovered ? '#CCFF00' : 'rgba(204, 255, 0, 0.12)',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: '1px solid rgba(204, 255, 0, 0.3)',
                  transition: 'all 0.2s ease',
                  flexShrink: 0,
                }}
              >
                COMPOSE ↗
              </span>
            </a>

            {/* 2. Phone / WhatsApp Interactive Action Card */}
            <a
              href="tel:+916387636285"
              onMouseEnter={() => setPhoneHovered(true)}
              onMouseLeave={() => setPhoneHovered(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 18px',
                background: phoneHovered ? '#16161d' : '#121217',
                border: phoneHovered ? '1px solid rgba(42, 92, 255, 0.5)' : '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '10px',
                textDecoration: 'none',
                boxShadow: phoneHovered ? '0 8px 24px rgba(42, 92, 255, 0.2)' : 'none',
                transform: phoneHovered ? 'translateY(-2px)' : 'translateY(0)',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                {/* Phone Icon Box */}
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    background: 'rgba(42, 92, 255, 0.12)',
                    border: '1px solid rgba(42, 92, 255, 0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px',
                    color: '#2A5CFF',
                    flexShrink: 0,
                  }}
                >
                  📞
                </div>

                <div>
                  <div
                    style={{
                      fontSize: '10px',
                      fontWeight: 800,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'rgba(255, 255, 255, 0.45)',
                      marginBottom: '2px',
                    }}
                  >
                    DIRECT PHONE / CALL
                  </div>
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '14px',
                      fontWeight: 700,
                      color: '#ffffff',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    +91 6387636285
                  </div>
                </div>
              </div>

              {/* Action Badge */}
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: 900,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  color: phoneHovered ? '#ffffff' : '#2A5CFF',
                  background: phoneHovered ? '#2A5CFF' : 'rgba(42, 92, 255, 0.12)',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: '1px solid rgba(42, 92, 255, 0.35)',
                  transition: 'all 0.2s ease',
                  flexShrink: 0,
                }}
              >
                CALL DIRECT ↗
              </span>
            </a>

            {/* Bottom Live Response Status */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '11px',
                fontWeight: 700,
                color: 'rgba(255, 255, 255, 0.5)',
                paddingTop: '6px',
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#22C55E',
                  boxShadow: '0 0 8px #22C55E',
                  display: 'inline-block',
                }}
              />
              <span>TYPICAL RESPONSE TIME: WITHIN 2-4 HOURS</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Social Links */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '24px',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          {/* Brand — intentionally blank */}
          <div style={{ width: '80px' }} />

          {/* Social Icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {[
              { label: 'GitHub', href: 'https://github.com/how-vaibhav', icon: '⌥' },
              { label: 'LinkedIn', href: '#', icon: '⇋' },
              { label: 'Twitter', href: '#', icon: '𝕏' },
              { label: 'Email', href: 'mailto:vaibhav10505@gmail.com?subject=Project%20Inquiry%20%2F%20Collaboration', icon: '✉' },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : '_self'}
                rel="noopener noreferrer"
                style={{
                  color: 'rgba(255, 255, 255, 0.6)',
                  fontSize: '16px',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#CCFF00')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)')}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
