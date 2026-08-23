import React, { useState, useEffect, useRef } from 'react';

/**
 * WelcomeSection — "WELCOME TO MY CREATIVE SPACE"
 * Transparent background — canvas scroll animation shows through underneath.
 * Responsive for phone, tablet, and desktop viewports.
 */
export default function WelcomeSection() {
  const ref = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      style={{
        background: 'transparent',
        position: 'relative',
        zIndex: 10,
        padding: isMobile ? '70px 20px 80px' : '120px 48px 140px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        overflow: 'hidden',
      }}
    >
      <div
        ref={ref}
        style={{
          opacity: 0,
          transform: 'translateY(36px)',
          transition: 'opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)',
          maxWidth: '1200px',
          width: '100%',
        }}
      >
        {/* Eyebrow label */}
        <p
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: isMobile ? '10px' : '11px',
            fontWeight: 600,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#E84419',
            margin: isMobile ? '0 0 18px' : '0 0 28px',
          }}
        >
          Creative Portfolio
        </p>

        {/* Main headline — Bebas Neue */}
        <h2
          style={{
            fontFamily: "'Bebas Neue', 'Impact', 'Arial Narrow', sans-serif",
            fontSize: isMobile
              ? 'clamp(46px, 14vw, 84px)'
              : 'clamp(72px, 13vw, 190px)',
            fontWeight: 400,
            lineHeight: 0.92,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            margin: 0,
            color: '#fff',
          }}
        >
          {/* Line 1 */}
          <span style={{ display: 'block' }}>
            Welcome to
          </span>

          {/* Line 2 */}
          <span
            style={{
              display: 'block',
              color: 'rgba(255,255,255,0.35)',
              letterSpacing: isMobile ? '0.06em' : '0.1em',
            }}
          >
            My Creative
          </span>

          {/* Line 3 */}
          <span
            style={{
              display: 'block',
              color: 'transparent',
              WebkitTextStroke: isMobile
                ? '1.5px rgba(255,255,255,0.85)'
                : '2px rgba(255,255,255,0.85)',
              letterSpacing: isMobile ? '0.08em' : '0.14em',
            }}
          >
            Space
          </span>
        </h2>

        {/* Thin divider line */}
        <div
          style={{
            width: isMobile ? '48px' : '64px',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)',
            margin: isMobile ? '28px auto 0' : '40px auto 0',
          }}
        />
      </div>
    </section>
  );
}
