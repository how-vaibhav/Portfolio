import React, { useState, useEffect } from 'react';
import ModeToggle from '../ModeToggle';

export default function DevNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 960);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
      
      const sections = ['home', 'work', 'case-studies', 'about', 'experience', 'contact'];
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
    { label: 'TOOLS', href: '#tools', id: 'tools' },
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
        background: isScrolled ? 'rgba(8, 8, 8, 0.92)' : 'rgba(8, 8, 8, 0.65)',
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
      {/* Brand Logo */}
      <a
        href="#home"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2px',
          textDecoration: 'none',
          color: '#ffffff',
          fontWeight: 900,
          fontSize: '18px',
          letterSpacing: '-0.03em',
          textTransform: 'uppercase',
        }}
      >
        <span>DEV/</span>
        <span style={{ color: '#CCFF00' }}>PIXEL</span>
      </a>

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
