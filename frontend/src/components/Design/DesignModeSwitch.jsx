import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useModeTransition } from '../../context/ModeTransitionContext';
import { soundFX } from './soundFX';

/**
 * DesignModeSwitch — Sleek floating top bar for Design Mode.
 * - Fully adapted for phone screens (iPhone, Android, tablet & desktop).
 * - Button labeled strictly as "DEV" with high-impact cinematic mode transition.
 * - Tactile spring-animated view switcher pill with sliding glider.
 * - Minimal, distraction-free aesthetic with Google Fonts (Syne & Space Grotesk).
 */
export default function DesignModeSwitch({ activeView, onViewChange }) {
  const { transitionTo } = useModeTransition();
  const [isScrolled, setIsScrolled] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleScroll();
    handleResize();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleSound = () => {
    soundFX.enabled = !soundOn;
    setSoundOn(!soundOn);
    if (!soundOn) soundFX.playSnap();
  };

  const handleReturnToDev = (e) => {
    e.preventDefault();
    transitionTo('/');
  };

  return (
    <header className={`design-mode-bar ${isScrolled ? 'is-scrolled' : ''}`}>
      {/* Left: Brand Identity */}
      <div
        className="design-brand-pill"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: isMobile ? '5px' : '8px',
          cursor: 'pointer',
          userSelect: 'none',
          flexShrink: 0,
        }}
        onClick={() => {
          soundFX.playTick();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        title="HowVaibhav — Graphic Design Archive 2026"
      >
        <motion.span
          animate={{ rotate: [0, 90, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
          style={{ fontSize: isMobile ? '13px' : '15px', color: '#FF5500', display: 'inline-block' }}
        >
          ✦
        </motion.span>
        <span
          className="design-pill-title"
          style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 900,
            fontSize: isMobile ? '13px' : '15px',
            letterSpacing: '-0.02em',
            color: '#111113',
            whiteSpace: 'nowrap',
          }}
        >
          {isMobile ? 'HowVaibhav' : 'HowVaibhav'}
        </span>
      </div>

      {/* Center: Improved Spring-Gliding View Toggle Button (Phone-optimized) */}
      <div
        className="design-view-toggle-wrap"
        style={{
          display: 'flex',
          alignItems: 'center',
          background: 'rgba(0, 0, 0, 0.06)',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          padding: isMobile ? '2px' : '4px',
          borderRadius: '999px',
          position: 'relative',
          gap: '2px',
          flexShrink: 0,
        }}
      >
        {/* 3D Conveyor Button */}
        <button
          type="button"
          onClick={() => {
            soundFX.playTick();
            onViewChange('3d');
          }}
          style={{
            position: 'relative',
            padding: isMobile ? '5px 9px' : '6px 14px',
            borderRadius: '999px',
            border: 'none',
            fontSize: isMobile ? '10px' : '11px',
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 800,
            cursor: 'pointer',
            background: 'transparent',
            color: activeView === '3d' ? '#FFFFFF' : '#555555',
            display: 'flex',
            alignItems: 'center',
            gap: isMobile ? '3px' : '6px',
            zIndex: 1,
            transition: 'color 0.2s ease',
            whiteSpace: 'nowrap',
          }}
          title="Switch to 3D Isometric Conveyor View"
        >
          {activeView === '3d' && (
            <motion.div
              layoutId="viewGlider"
              style={{
                position: 'absolute',
                inset: 0,
                background: '#121316',
                borderRadius: '999px',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.22)',
                zIndex: -1,
              }}
              transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            />
          )}
          <span style={{ fontSize: isMobile ? '11px' : '12px', color: activeView === '3d' ? '#00D2FF' : 'inherit' }}>◈</span>
          <span>{isMobile ? '3D' : '3D Conveyor'}</span>
        </button>

        {/* Desk Grid Button */}
        <button
          type="button"
          onClick={() => {
            soundFX.playTick();
            onViewChange('grid');
          }}
          style={{
            position: 'relative',
            padding: isMobile ? '5px 9px' : '6px 14px',
            borderRadius: '999px',
            border: 'none',
            fontSize: isMobile ? '10px' : '11px',
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 800,
            cursor: 'pointer',
            background: 'transparent',
            color: activeView === 'grid' ? '#FFFFFF' : '#555555',
            display: 'flex',
            alignItems: 'center',
            gap: isMobile ? '3px' : '6px',
            zIndex: 1,
            transition: 'color 0.2s ease',
            whiteSpace: 'nowrap',
          }}
          title="Switch to Physical Filing Cabinet Desk View"
        >
          {activeView === 'grid' && (
            <motion.div
              layoutId="viewGlider"
              style={{
                position: 'absolute',
                inset: 0,
                background: '#121316',
                borderRadius: '999px',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.22)',
                zIndex: -1,
              }}
              transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            />
          )}
          <span style={{ fontSize: isMobile ? '11px' : '12px', color: activeView === 'grid' ? '#FF5500' : 'inherit' }}>⊞</span>
          <span>{isMobile ? 'Grid' : 'Desk Grid'}</span>
        </button>
      </div>

      {/* Right: Sound toggle + Sleek "DEV" Mode Switch Button */}
      <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '5px' : '8px', flexShrink: 0 }}>
        {/* Audio Toggle (Compact on phones) */}
        <button
          type="button"
          onClick={toggleSound}
          title={soundOn ? 'Mute Interaction Audio' : 'Enable Interaction Audio'}
          style={{
            background: 'rgba(0,0,0,0.04)',
            border: '1px solid rgba(0,0,0,0.08)',
            cursor: 'pointer',
            fontSize: isMobile ? '11px' : '13px',
            padding: isMobile ? '5px' : '7px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: soundOn ? '#111' : '#AAA',
            transition: 'all 0.2s ease',
          }}
        >
          {soundOn ? '🔊' : '🔇'}
        </button>

        {/* PRIMARY SWITCH LABELED AS "DEV" ONLY */}
        <button
          type="button"
          onClick={handleReturnToDev}
          className="design-return-btn"
          title="Switch to Software Developer & CS Mode"
          style={{
            background: '#111215',
            color: '#FFFFFF',
            border: '1.5px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '9999px',
            padding: isMobile ? '6px 12px' : '7px 16px',
            fontSize: isMobile ? '10px' : '12px',
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 900,
            letterSpacing: '0.06em',
            display: 'inline-flex',
            alignItems: 'center',
            gap: isMobile ? '4px' : '7px',
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#CCFF00';
            e.currentTarget.style.transform = 'translateY(-1px) scale(1.03)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.35)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = '0 4px 14px rgba(0, 0, 0, 0.2)';
          }}
        >
          <span style={{ fontSize: isMobile ? '11px' : '13px' }}>←</span>
          <span>DEV</span>
          <span
            style={{
              fontFamily: 'monospace',
              fontSize: isMobile ? '9px' : '11px',
              fontWeight: 800,
              background: '#CCFF00',
              color: '#07080A',
              padding: isMobile ? '1px 4px' : '1px 5px',
              borderRadius: '4px',
              letterSpacing: '-0.04em',
            }}
          >
            &lt;/&gt;
          </span>
        </button>
      </div>
    </header>
  );
}
