import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import useResponsive from './useResponsive';
// import ModeToggle from '../ModeToggle';

export default function DevNavbar() {
  const { isMobile } = useResponsive();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    const sections = ['home', 'work', 'tools', 'experience', 'contact'];
    
    // IntersectionObserver for tracking active section without layout thrashing
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: '-30% 0px -60% 0px', // Triggers when section hits the upper middle
      }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const navLinks = [
    { label: 'HOME', href: '#home', id: 'home' },
    { label: 'WORK', href: '#work', id: 'work' },
    { label: 'TOOLS', href: '#tools', id: 'tools' },
    { label: 'EXP', href: '#experience', id: 'experience' },
    { label: 'CONTACT', href: '#contact', id: 'contact' },
  ];

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: isMobile ? 16 : 32,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 100,
          background: isScrolled ? 'rgba(8, 8, 8, 0.8)' : '#080808',
          backdropFilter: isScrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'none',
          border: isScrolled ? '2px solid rgba(204,255,0,0.3)' : '2px solid #CCFF00',
          boxShadow: isScrolled ? '0 10px 40px rgba(0,0,0,0.5)' : (isMobile ? '3px 3px 0 #000' : '6px 6px 0 #000'),
          borderRadius: '100px',
          padding: '6px 8px',
          display: 'flex',
          alignItems: 'center',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          width: isMobile ? '92%' : 'auto', // Keep it bounded on mobile
          maxWidth: '500px',
        }}
      >
        <nav 
          className="dev-hide-scrollbar"
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: isMobile ? 'space-between' : 'center',
            width: '100%',
            gap: isMobile ? '2px' : '8px',
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {navLinks.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.label}
                href={item.href}
                style={{
                  position: 'relative',
                  padding: isMobile ? '10px 14px' : '10px 24px',
                  fontSize: isMobile ? '11px' : '13px',
                  fontWeight: 900,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: isActive ? '#080808' : 'rgba(255, 255, 255, 0.65)',
                  textDecoration: 'none',
                  borderRadius: '100px',
                  transition: 'color 0.3s ease',
                  zIndex: 1,
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.color = 'rgba(255, 255, 255, 0.65)';
                }}
              >
                {isActive && (
                  <motion.div
                    layoutId="dev-nav-pill"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: '#CCFF00',
                      borderRadius: '100px',
                      zIndex: -1,
                    }}
                    transition={{
                      type: 'tween',
                      ease: 'circOut',
                      duration: 0.25,
                    }}
                  />
                )}
                <span style={{ position: 'relative', zIndex: 2 }}>{item.label}</span>
              </a>
            );
          })}
        </nav>
      </header>

      {/* Independent Mode Toggle floating at the top right - HIDING UNTIL DESIGN PAGE IS READY
      <div 
        style={{ 
          position: 'fixed', 
          top: isMobile ? 16 : 32, 
          right: isMobile ? 16 : 32, 
          zIndex: 100,
          background: '#080808',
          border: '2px solid rgba(255,255,255,0.1)',
          borderRadius: '50%',
          padding: '6px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = '#CCFF00';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
        }}
      >
        <ModeToggle />
      </div>
      */}
    </>
  );
}
