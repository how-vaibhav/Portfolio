import React from 'react';
import './dev.css';
import { Ripple } from '../ui/ripple';

export default function DevContactCta() {
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
        mainCircleOpacity={0.2}
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

          {/* Right: Contact Information Box */}
          <div
            style={{
              background: '#121214',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              padding: '32px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              boxShadow: '0 16px 40px rgba(0, 0, 0, 0.5)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Small accent ripple inside the contact card */}
            <Ripple
              mainCircleSize={100}
              mainCircleOpacity={0.18}
              numCircles={5}
              color="#2555FF"
            />

            {/* Email */}
            <a
              href="mailto:vaibhav10505@gmail.com"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                color: '#ffffff',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: 600,
                transition: 'color 0.2s',
                position: 'relative',
                zIndex: 2,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#CCFF00')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#ffffff')}
            >
              <span style={{ fontSize: '18px', color: '#CCFF00' }}>✉</span>
              <span>vaibhav10505@gmail.com</span>
            </a>

            {/* Connect */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                color: 'rgba(255,255,255,0.8)',
                fontSize: '14px',
                position: 'relative',
                zIndex: 2,
              }}
            >
              <span style={{ fontSize: '18px', color: '#CCFF00' }}>📞</span>
              <span>Schedule a Meeting / Call</span>
            </div>

            {/* Location */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                color: 'rgba(255,255,255,0.8)',
                fontSize: '14px',
                position: 'relative',
                zIndex: 2,
              }}
            >
              <span style={{ fontSize: '18px', color: '#CCFF00' }}>📍</span>
              <span>Worldwide / Remote</span>
            </div>

            {/* Action CTA */}
            <a
              href="mailto:vaibhav10505@gmail.com"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                color: '#CCFF00',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: 800,
                textTransform: 'uppercase',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                paddingTop: '16px',
                position: 'relative',
                zIndex: 2,
              }}
            >
              <span style={{ fontSize: '18px' }}>🚀</span>
              <span>Let's start a project ↗</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar: Brand Logo + Copyright + Social Links */}
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

          {/* Copyright */}
          <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.4)', fontWeight: 500 }}>
            © 2026 Vaibhav. All rights reserved.
          </div>

          {/* Social Icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {[
              { label: 'GitHub', href: 'https://github.com/how-vaibhav', icon: '⌥' },
              { label: 'LinkedIn', href: '#', icon: '⇋' },
              { label: 'Twitter', href: '#', icon: '𝕏' },
              { label: 'Email', href: 'mailto:vaibhav10505@gmail.com', icon: '✉' },
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
