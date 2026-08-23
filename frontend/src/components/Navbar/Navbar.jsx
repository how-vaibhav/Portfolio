import React, { useState, useEffect } from 'react';
import ModeToggle from '../ModeToggle';

const ORANGE = '#E84419';

/**
 * DevNavbar — used on the root Dev page (/).
 * Clean, responsive navbar.
 */
export function DevNavbar() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: isMobile ? '14px 18px' : '20px 48px',
        zIndex: 100,
        background: 'rgba(5, 10, 15, 0.75)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Logo */}
      <span
        style={{
          fontWeight: 800,
          fontSize: isMobile ? '15px' : '17px',
          letterSpacing: '-0.04em',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        <span
          style={{
            fontFamily: 'monospace',
            fontSize: '12px',
            color: 'rgba(255,255,255,0.35)',
          }}
        >
          &lt;
        </span>
        Vaibhav
        <span
          style={{
            fontFamily: 'monospace',
            fontSize: '12px',
            color: 'rgba(255,255,255,0.35)',
          }}
        >
          /&gt;
        </span>
      </span>

      {/* Mode Toggle */}
      <ModeToggle />
    </header>
  );
}

/**
 * DesignNavbar — used on the Design page (/design).
 * Responsive with automatic mobile layout.
 */
export function DesignNavbar() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      setIsMobile(w < 768);
      setIsTablet(w >= 768 && w < 960);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: isMobile ? '16px 20px' : isTablet ? '18px 32px' : '24px 48px',
        zIndex: 30,
        gap: '16px',
      }}
    >
      {/* Logo */}
      <span
        style={{
          fontWeight: 800,
          fontSize: isMobile ? '16px' : '17px',
          letterSpacing: '-0.03em',
          color: '#fff',
          flexShrink: 0,
        }}
      >
        Vaibhav
      </span>

      {/* Nav links — hidden on mobile & tablet for clean viewport */}
      {!isMobile && !isTablet && (
        <nav style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
          {[
            { name: 'Home', href: '#home' },
            { name: 'Studio', href: '#studio' },
            { name: 'About', href: '#about' },
            { name: 'Education', href: '#education' },
            { name: 'Contact', href: '#contact' },
          ].map((item) => (
            <a
              key={item.name}
              href={item.href}
              style={{
                fontSize: '14px',
                fontWeight: 500,
                color: 'rgba(255,255,255,0.75)',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.target.style.color = '#fff')}
              onMouseLeave={(e) => (e.target.style.color = 'rgba(255,255,255,0.75)')}
            >
              {item.name}
            </a>
          ))}
        </nav>
      )}

      {/* Right side: Mode Toggle + CTA */}
      <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '8px' : '12px' }}>
        <ModeToggle />

        <a
          href="#contact"
          style={{
            background: ORANGE,
            color: '#fff',
            border: 'none',
            borderRadius: '999px',
            padding: isMobile ? '8px 14px' : '11px 22px',
            fontSize: isMobile ? '12px' : '13px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            letterSpacing: '-0.01em',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            transition: 'opacity 0.2s, transform 0.15s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '0.88';
            e.currentTarget.style.transform = 'scale(1.03)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '1';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          {isMobile ? 'Contact' : 'Get in touch'}
          <span
            style={{
              background: 'rgba(255,255,255,0.25)',
              borderRadius: '50%',
              width: isMobile ? '18px' : '22px',
              height: isMobile ? '18px' : '22px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: isMobile ? '10px' : '13px',
            }}
          >
            →
          </span>
        </a>
      </div>
    </header>
  );
}
