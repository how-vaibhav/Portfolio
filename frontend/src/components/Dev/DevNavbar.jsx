import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useModeTransition } from '../../context/ModeTransitionContext';
import useResponsive from './useResponsive';
import { soundFX } from '../Design/soundFX';

export default function DevNavbar() {
  const { transitionTo } = useModeTransition();
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
          background: isScrolled ? 'rgba(8, 8, 8, 0.85)' : '#080808',
          backdropFilter: isScrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'none',
          border: isScrolled ? '2px solid rgba(204,255,0,0.3)' : '2px solid #CCFF00',
          boxShadow: isScrolled ? '0 10px 40px rgba(0,0,0,0.5)' : (isMobile ? '3px 3px 0 #000' : '6px 6px 0 #000'),
          borderRadius: '100px',
          padding: '6px 8px',
          display: 'flex',
          alignItems: 'center',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          width: isMobile ? '94%' : 'auto', // Keep it bounded on mobile
          maxWidth: '760px',
        }}
      >
        <nav 
          className="dev-hide-scrollbar"
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: isMobile ? 'space-between' : 'center',
            width: '100%',
            gap: isMobile ? '2px' : '6px',
            padding: '0 4px',
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
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  overflow: 'hidden',
                  padding: isMobile ? '8px 12px' : '9px 20px',
                  fontSize: isMobile ? '10px' : '12px',
                  fontWeight: 900,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: isActive ? '#080808' : 'rgba(255, 255, 255, 0.65)',
                  textDecoration: 'none',
                  borderRadius: 9999,
                  transition: 'color 0.3s ease',
                  zIndex: 1,
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => {
                  try { soundFX.playHover(); } catch {}
                  if (!isActive) e.currentTarget.style.color = '#ffffff';
                }}
                onClick={() => {
                  try { soundFX.playSnap(); } catch {}
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
                      borderRadius: 9999,
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

          {/* Elegant Divider */}
          <span
            style={{
              width: '1px',
              height: '18px',
              background: 'rgba(255, 255, 255, 0.2)',
              margin: '0 4px',
              flexShrink: 0,
            }}
          />

          {/* Custom Responsive Graphic Design Mode Button (Mobile Subtle Logo vs Laptop Full Badge) */}
          <button
            type="button"
            onClick={() => {
              try { soundFX.playWarp(); } catch {}
              transitionTo('/design');
            }}
            className="dev-design-mode-btn"
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: isMobile ? '0px' : '7px',
              padding: isMobile ? '0' : '9px 18px',
              width: isMobile ? '34px' : 'auto',
              height: isMobile ? '34px' : 'auto',
              minWidth: isMobile ? '34px' : 'auto',
              background: isMobile 
                ? 'linear-gradient(135deg, rgba(0, 210, 255, 0.18) 0%, rgba(0, 112, 243, 0.26) 100%)'
                : 'linear-gradient(135deg, #00D2FF 0%, #0070F3 100%)',
              color: isMobile ? '#00D2FF' : '#050811',
              borderRadius: 9999,
              fontSize: '11.5px',
              fontWeight: 900,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              boxShadow: isMobile
                ? '0 0 16px rgba(0, 210, 255, 0.4)'
                : '0 2px 18px rgba(0, 210, 255, 0.5)',
              border: isMobile
                ? '1.5px solid rgba(0, 210, 255, 0.65)'
                : '1px solid rgba(255, 255, 255, 0.45)',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              zIndex: 2,
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              try { soundFX.playHover(); } catch {}
              e.currentTarget.style.transform = isMobile ? 'scale(1.12)' : 'scale(1.06)';
              e.currentTarget.style.boxShadow = isMobile
                ? '0 0 24px rgba(0, 210, 255, 0.8)'
                : '0 4px 26px rgba(0, 210, 255, 0.8), 0 0 12px rgba(0, 210, 255, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = isMobile
                ? '0 0 16px rgba(0, 210, 255, 0.4)'
                : '0 2px 18px rgba(0, 210, 255, 0.5)';
            }}
            title="Open Graphic Design Portfolio (Cinematic Transition)"
            aria-label="Switch to Graphic Design Mode"
          >
            {isMobile ? (
              // On phone screens: Minimalist, subtle glowing geometric design logo
              <motion.span
                animate={{ rotate: [0, 90, 0], scale: [1, 1.15, 1] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                style={{
                  fontSize: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  filter: 'drop-shadow(0 0 6px #00D2FF)',
                  lineHeight: 1,
                }}
              >
                ✦
              </motion.span>
            ) : (
              // On laptop/desktop screens: Full button with animated spark and DESIGN label
              <>
                <motion.span
                  animate={{ rotate: [0, 90, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                  style={{ fontSize: '13px', display: 'inline-block' }}
                >
                  ✦
                </motion.span>
                <span>DESIGN</span>
              </>
            )}
          </button>
        </nav>
      </header>
</>
  );
}
