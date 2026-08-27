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
        background: isScrolled ? 'rgba(4, 4, 4, 0.65)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(24px) saturate(180%)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(24px) saturate(180%)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid transparent',
        boxShadow: isScrolled ? '0 10px 30px rgba(0,0,0,0.4)' : 'none',
        padding: isMobile ? (isScrolled ? '12px 20px' : '16px 20px') : (isScrolled ? '14px 48px' : '24px 48px'),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Brand — intentionally blank */}
      {!isMobile && (
        <a
          href="#home"
          style={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            width: '80px',
          }}
        />
      )}

      {/* Center Nav Links (Scrollable on Mobile) */}
      <nav 
        className="dev-hide-scrollbar"
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: isMobile ? '24px' : '32px',
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch',
          maxWidth: isMobile ? 'calc(100vw - 80px)' : 'none',
          padding: isMobile ? '4px 0' : 0,
          marginRight: isMobile ? 'auto' : 0,
        }}
      >
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
              whiteSpace: 'nowrap',
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

      {/* Right Side: Mode Switcher */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <ModeToggle />
      </div>
    </header>
  );
}
