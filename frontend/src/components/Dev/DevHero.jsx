import React, { useEffect, useState, useRef } from 'react';
import './dev.css';

const TERMINAL_SEQUENCE = [
  { type: 'prompt', text: '$ whoami',                                  delay: 500  },
  { type: 'output', text: 'vaibhav — full-stack developer & cs student', delay: 1100 },
  { type: 'prompt', text: '$ ls ./projects',                            delay: 1900 },
  { type: 'output', text: 'eMineral-pass/   govaid/   log-detector/',   delay: 2500 },
  { type: 'prompt', text: '$ git log --oneline -3',                     delay: 3300 },
  { type: 'output', text: 'a3f1c9e eMineral Pass — production deployed ✓', delay: 3900 },
  { type: 'output', text: '7b2d4a1 GovAid — citizen welfare portal',    delay: 4200 },
  { type: 'output', text: 'd8e2f3c LOG Detector — security CLI tool',   delay: 4500 },
  { type: 'prompt', text: '$ npm start',                                delay: 5200 },
  { type: 'success', text: '✓ Portfolio ready. Available for work 🚀',  delay: 5800 },
];

const SOCIALS = [
  { label: 'GitHub',   href: 'https://github.com/how-vaibhav', icon: '⌥' },
  { label: 'LinkedIn', href: '#',                               icon: '⇋' },
  { label: 'Email',    href: 'mailto:vaibhav10505@gmail.com',   icon: '✉' },
];

function StatPill({ num, label }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
      <span className="dev-stat-num" style={{
        fontSize: 'clamp(22px, 3vw, 32px)',
        fontWeight: 800,
        letterSpacing: '-0.04em',
        color: '#fff',
      }}>{num}</span>
      <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        {label}
      </span>
    </div>
  );
}

export default function DevHero() {
  const [lines, setLines] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 640);
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Animate hero elements in
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const targets = el.querySelectorAll('[data-hero-animate]');
    targets.forEach((t, i) => {
      setTimeout(() => {
        t.style.opacity = '1';
        t.style.transform = 'translateY(0) translateX(0)';
      }, 100 + i * 120);
    });
  }, []);

  // Type terminal lines
  useEffect(() => {
    const timers = TERMINAL_SEQUENCE.map((line) =>
      setTimeout(() => setLines((prev) => [...prev, line]), line.delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  const baseAnimStyle = {
    opacity: 0,
    transform: 'translateY(25px)',
    transition: 'opacity 0.75s cubic-bezier(0.22,1,0.36,1), transform 0.75s cubic-bezier(0.22,1,0.36,1)',
  };

  return (
    <section
      ref={heroRef}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'flex-start' : 'center',
        justifyContent: 'space-between',
        padding: isMobile
          ? '110px 24px 80px'
          : isTablet
          ? '110px 40px 90px'
          : '100px 64px 100px',
        gap: isMobile ? '48px' : '40px',
        position: 'relative',
        maxWidth: '1440px',
        margin: '0 auto',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* ── Left: Identity ── */}
      <div style={{ flex: '1 1 0', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '0' }}>

        {/* Available badge */}
        <div
          data-hero-animate
          style={{
            ...baseAnimStyle,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            background: 'rgba(16,185,129,0.08)',
            border: '1px solid rgba(16,185,129,0.25)',
            borderRadius: '999px',
            padding: '7px 16px 7px 12px',
            width: 'fit-content',
            marginBottom: '28px',
          }}
        >
          <span className="dev-pulse-dot" />
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#10b981', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Available for Work
          </span>
        </div>

        {/* Name */}
        <h1
          data-hero-animate
          className="dev-hero-name"
          style={{
            ...baseAnimStyle,
            fontSize: 'clamp(62px, 10vw, 136px)',
            fontWeight: 900,
            color: '#fff',
            marginBottom: isMobile ? '16px' : '20px',
          }}
        >
          VAIBHAV<br />TIWARI
        </h1>

        {/* Role line */}
        <p
          data-hero-animate
          style={{
            ...baseAnimStyle,
            fontSize: isMobile ? '16px' : '20px',
            color: 'rgba(255,255,255,0.55)',
            fontWeight: 400,
            letterSpacing: '-0.01em',
            marginBottom: '36px',
            lineHeight: 1.5,
          }}
        >
          Full-Stack Developer &amp; Designer&nbsp;
          <span style={{ color: 'rgba(255,255,255,0.25)' }}>·</span>&nbsp;
          CS Student
        </p>

        {/* CTA buttons */}
        <div
          data-hero-animate
          style={{ ...baseAnimStyle, display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '36px' }}
        >
          <a
            href="#dev-projects"
            className="dev-btn-primary"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: '#E84419',
              color: '#fff',
              borderRadius: '999px',
              padding: isMobile ? '12px 22px' : '14px 28px',
              fontSize: isMobile ? '13px' : '14px',
              fontWeight: 700,
              letterSpacing: '-0.01em',
              textDecoration: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            View Projects
            <span style={{ fontSize: '16px' }}>↓</span>
          </a>
          <a
            href="#dev-contact"
            className="dev-btn-secondary"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'rgba(255,255,255,0.05)',
              color: 'rgba(255,255,255,0.85)',
              borderRadius: '999px',
              padding: isMobile ? '12px 22px' : '14px 28px',
              fontSize: isMobile ? '13px' : '14px',
              fontWeight: 600,
              letterSpacing: '-0.01em',
              textDecoration: 'none',
              border: '1px solid rgba(255,255,255,0.12)',
              cursor: 'pointer',
            }}
          >
            Get in Touch
            <span style={{ fontSize: '16px' }}>→</span>
          </a>
        </div>

        {/* Social links */}
        <div
          data-hero-animate
          style={{ ...baseAnimStyle, display: 'flex', gap: '24px', flexWrap: 'wrap' }}
        >
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              className="dev-social-link dev-underline"
              target={s.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              style={{
                fontSize: '13px',
                fontWeight: 500,
                color: 'rgba(255,255,255,0.45)',
                letterSpacing: '0.02em',
                textDecoration: 'none',
              }}
            >
              {s.label}
            </a>
          ))}
        </div>

        {/* Stats — mobile below socials, desktop at bottom */}
        {isMobile && (
          <div style={{ display: 'flex', gap: '32px', marginTop: '40px', paddingTop: '32px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            <StatPill num="3"   label="Projects Shipped" />
            <StatPill num="10+" label="Tech Stacks" />
            <StatPill num="2025" label="Year Started" />
          </div>
        )}
      </div>

      {/* ── Right: Terminal mock ── */}
      {!isMobile && (
        <div
          data-hero-animate
          style={{
            ...baseAnimStyle,
            opacity: 0,
            transform: 'translateX(30px)',
            flex: isTablet ? '0 0 340px' : '0 0 440px',
            transition: 'opacity 0.9s cubic-bezier(0.22,1,0.36,1), transform 0.9s cubic-bezier(0.22,1,0.36,1)',
            transitionDelay: '0.5s',
          }}
        >
          {/* Terminal window */}
          <div style={{
            background: '#0D1117',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '14px',
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          }}>
            {/* Title bar */}
            <div style={{
              background: '#161B22',
              padding: '13px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}>
              <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#FF5F56', display: 'block' }} />
              <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#FFBD2E', display: 'block' }} />
              <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#27C93F', display: 'block' }} />
              <span style={{ marginLeft: '10px', fontSize: '12px', color: 'rgba(255,255,255,0.35)', fontFamily: 'monospace' }}>
                vaibhav@portfolio — zsh
              </span>
            </div>

            {/* Terminal body */}
            <div style={{
              padding: '20px 22px',
              fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
              fontSize: isTablet ? '12px' : '13px',
              lineHeight: '1.9',
              minHeight: '260px',
            }}>
              {lines.map((line, i) => (
                <div key={i} style={{
                  color: line.type === 'prompt'  ? '#58a6ff'
                       : line.type === 'success' ? '#3fb950'
                       : '#c9d1d9',
                  opacity: 0,
                  animation: `devFadeIn 0.3s ease forwards`,
                  animationDelay: '0s',
                }}>
                  {line.text}
                </div>
              ))}
              {lines.length < TERMINAL_SEQUENCE.length && (
                <span className="dev-cursor">▌</span>
              )}
            </div>
          </div>

          {/* Stats below terminal */}
          <div style={{
            display: 'flex',
            gap: '0',
            marginTop: '20px',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '12px',
            overflow: 'hidden',
          }}>
            {[
              { num: '3',    label: 'Projects Shipped' },
              { num: '10+',  label: 'Tech Stacks' },
              { num: '2025', label: 'Year Started' },
            ].map((s, i) => (
              <div key={i} style={{
                flex: 1,
                padding: '18px 16px',
                borderRight: i < 2 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                textAlign: 'center',
              }}>
                <div className="dev-stat-num" style={{ fontSize: '22px', fontWeight: 800, letterSpacing: '-0.04em', color: '#fff' }}>
                  {s.num}
                </div>
                <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.07em', marginTop: '3px' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Scroll indicator */}
      {!isMobile && (
        <div className="dev-scroll-indicator" style={{
          position: 'absolute',
          bottom: '36px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          color: 'rgba(255,255,255,0.25)',
          fontSize: '11px',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}>
          <span>Scroll</span>
          <span style={{ fontSize: '20px' }}>↓</span>
        </div>
      )}
    </section>
  );
}
