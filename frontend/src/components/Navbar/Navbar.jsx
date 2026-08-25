import React, { useState, useEffect } from 'react';
import ModeToggle from '../ModeToggle';

const ORANGE = '#E84419';

/**
 * DevNavbar — used on the root Dev page (/).
 * Exact match with Dev/Pixel layout from reference design.
 */
export function DevNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 960);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      const sections = ['home', 'work', 'case-studies', 'tools', 'experience', 'about', 'contact'];
      for (const s of sections) {
        const el = document.getElementById(s);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(s);
            break;
          }
        }
      }
    };

    handleResize();
    handleScroll();
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { label: 'HOME', href: '#home', id: 'home' },
    { label: 'WORK', href: '#work', id: 'work' },
    { label: 'CASE STUDIES', href: '#case-studies', id: 'case-studies' },
    { label: 'ABOUT', href: '#about', id: 'about' },
    { label: 'EXPERIENCE', href: '#experience', id: 'experience' },
    { label: 'CONTACT', href: '#contact', id: 'contact' },
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: isScrolled ? 'rgba(8, 8, 8, 0.94)' : 'rgba(8, 8, 8, 0.75)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        padding: isMobile ? '14px 20px' : '18px 48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'all 0.3s ease',
      }}
    >
      {/* Brand — intentionally blank */}
      <a
        href="#home"
        style={{
          display: 'flex',
          alignItems: 'center',
          textDecoration: 'none',
          width: '80px',
        }}
      />

      {/* Center Nav Links (Desktop) */}
      {!isMobile && (
        <nav style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              style={{
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: activeSection === item.id ? '#CCFF00' : 'rgba(255, 255, 255, 0.7)',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
                position: 'relative',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color =
                  activeSection === item.id ? '#CCFF00' : 'rgba(255, 255, 255, 0.7)')
              }
            >
              {item.label}
              {activeSection === item.id && (
                <span
                  style={{
                    position: 'absolute',
                    bottom: '-6px',
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: '#CCFF00',
                    borderRadius: '1px',
                  }}
                />
              )}
            </a>
          ))}
        </nav>
      )}

      {/* Right Side: Mode Switcher + CTA Button */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <ModeToggle />

        <a
          href="#contact"
          style={{
            background: '#CCFF00',
            color: '#000000',
            fontWeight: 800,
            fontSize: isMobile ? '11px' : '12px',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            padding: isMobile ? '9px 14px' : '10px 20px',
            borderRadius: '4px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            textDecoration: 'none',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 18px rgba(204, 255, 0, 0.3)',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 24px rgba(204, 255, 0, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 18px rgba(204, 255, 0, 0.3)';
          }}
        >
          LET'S BUILD ↗
        </a>
      </div>
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
            { name: 'Projects', href: '#creative-work' },
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
