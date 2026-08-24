import React, { useState } from 'react';
import './dev.css';
import { useReveal } from './useReveal';

const EMAIL = 'vaibhav10505@gmail.com';

const LINKS = [
  { label: 'GitHub',   href: 'https://github.com/how-vaibhav', desc: '@how-vaibhav' },
  { label: 'LinkedIn', href: '#',                               desc: 'Connect with me' },
  { label: 'Email',    href: `mailto:${EMAIL}`,                 desc: EMAIL },
];

export default function DevContact() {
  const ref = useReveal();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section
      id="dev-contact"
      ref={ref}
      style={{
        padding: 'clamp(80px, 10vw, 140px) clamp(24px, 5vw, 80px) clamp(80px, 10vw, 120px)',
        maxWidth: '1440px',
        margin: '0 auto',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Section header */}
      <div style={{ marginBottom: '64px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '16px' }}>
          <span className="dev-section-accent dev-reveal" style={{ fontSize: 'clamp(48px,8vw,90px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1 }}>
            04
          </span>
          <div className="dev-divider-line" style={{ height: '1px', flex: 1, background: 'rgba(255,255,255,0.1)' }} />
        </div>
        <h2 className="dev-reveal dev-d1" style={{ fontSize: 'clamp(28px,5vw,52px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff' }}>
          CONTACT
        </h2>
      </div>

      {/* Main contact block */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 'clamp(40px, 6vw, 80px)',
        alignItems: 'start',
      }}>

        {/* Left: Big text */}
        <div>
          <h3 className="dev-reveal" style={{
            fontSize: 'clamp(36px, 6vw, 80px)',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            lineHeight: 0.9,
            color: '#fff',
            marginBottom: '32px',
          }}>
            LET'S BUILD<br />SOMETHING<br />
            <span className="dev-section-accent">TOGETHER.</span>
          </h3>
          <p className="dev-reveal dev-d2" style={{
            fontSize: '16px',
            lineHeight: 1.75,
            color: 'rgba(255,255,255,0.55)',
            maxWidth: '420px',
          }}>
            Open to freelance projects, internships, and full-time roles.
            Whether you have an idea or a problem that needs solving — let's talk.
          </p>
        </div>

        {/* Right: Email + links */}
        <div>
          {/* Email copy block */}
          <div
            className="dev-reveal dev-d2"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '16px',
              padding: '24px',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              flexWrap: 'wrap',
            }}
          >
            <div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>
                Email
              </div>
              <a
                href={`mailto:${EMAIL}`}
                className="dev-underline"
                style={{ fontSize: '16px', fontWeight: 700, color: '#fff', textDecoration: 'none' }}
              >
                {EMAIL}
              </a>
            </div>
            <button
              onClick={handleCopy}
              className="dev-copy-btn"
              style={{
                background: copied ? 'rgba(63,185,80,0.12)' : 'rgba(255,255,255,0.06)',
                border: `1px solid ${copied ? 'rgba(63,185,80,0.3)' : 'rgba(255,255,255,0.1)'}`,
                borderRadius: '8px',
                padding: '9px 18px',
                fontSize: '12px',
                fontWeight: 700,
                color: copied ? '#3fb950' : 'rgba(255,255,255,0.7)',
                cursor: 'pointer',
                letterSpacing: '0.04em',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              {copied ? '✓ Copied!' : 'Copy Email'}
            </button>
          </div>

          {/* Social links */}
          <div className="dev-reveal dev-d3" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 20px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  transition: 'background 0.25s ease, border-color 0.25s ease, transform 0.25s ease',
                  gap: '16px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#fff', marginBottom: '2px' }}>
                    {link.label}
                  </div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>
                    {link.desc}
                  </div>
                </div>
                <span style={{ fontSize: '18px', color: 'rgba(255,255,255,0.25)' }}>↗</span>
              </a>
            ))}
          </div>

          {/* Direct CTA */}
          <div className="dev-reveal dev-d4" style={{ marginTop: '24px' }}>
            <a
              href={`mailto:${EMAIL}`}
              className="dev-btn-primary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                background: '#E84419',
                color: '#fff',
                borderRadius: '999px',
                padding: '16px 32px',
                fontSize: '15px',
                fontWeight: 700,
                textDecoration: 'none',
                width: '100%',
                justifyContent: 'center',
                boxSizing: 'border-box',
              }}
            >
              Send Me an Email
              <span style={{ fontSize: '18px' }}>→</span>
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="dev-reveal dev-d5" style={{
        marginTop: 'clamp(60px, 8vw, 100px)',
        paddingTop: '32px',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
      }}>
        <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.25)' }}>
          © 2025 Vaibhav Tiwari — Built with React + Vite
        </span>
        <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.25)' }}>
          Lucknow, India 🇮🇳
        </span>
      </div>
    </section>
  );
}
