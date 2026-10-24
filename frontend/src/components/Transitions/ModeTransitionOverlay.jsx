import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useModeTransition } from '../../context/ModeTransitionContext';

/**
 * ModeTransitionOverlay — Pure Element Motion Transition.
 * Absolutely ZERO text. Driven purely by kinetic graphic elements:
 * - Staggered cascading architectural louvers & cyber matrix slats
 * - Radiant laser slice beams
 * - Rotating geometric aperture rings & CMYK registration crosshairs
 * - Dual-orbit cyber reticles & neon energy filaments
 */
export default function ModeTransitionOverlay() {
  const { isTransitioning, targetMode, phase } = useModeTransition();
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Animate progress bar during the transition
  useEffect(() => {
    if (!isTransitioning) {
      setProgress(0);
      return;
    }
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 15 : 100));
    }, 25);
    return () => clearInterval(interval);
  }, [isTransitioning]);

  if (!isTransitioning || !targetMode) return null;

  const isEnteringDesign = targetMode === 'design';

  // Architectural louver colors for Design Mode
  const designLouvers = [
    { color: 'linear-gradient(135deg, #111215 0%, #1A1C22 100%)', delay: 0 },
    { color: 'linear-gradient(135deg, #FF4500 0%, #FF6600 100%)', delay: 0.03 },
    { color: 'linear-gradient(135deg, #E65100 0%, #FF8F00 100%)', delay: 0.06 },
    { color: 'linear-gradient(135deg, #00D2FF 0%, #0099CC 100%)', delay: 0.09 },
    { color: '#F7F5F0', delay: 0.12 },
  ];

  // Cyber slat matrix for Dev Mode
  const devSlatCount = isMobile ? 4 : 6;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 99999,
        pointerEvents: 'all',
        overflow: 'hidden',
      }}
    >
      <AnimatePresence mode="wait">
        {isEnteringDesign ? (
          /* ════════════════════════════════════════════════════════════════
             DESIGN MODE — PURE ATELIER APERTURE & CHROMATIC ELEMENT MOTION
             ════════════════════════════════════════════════════════════════ */
          <motion.div
            key="trans-to-design"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
            style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}
          >
            {/* Ambient Darkened Backdrop */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(10, 11, 14, 0.92)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
              }}
            />

            {/* Staggered Cascading Architectural Louvers */}
            {designLouvers.map((louver, idx) => {
              const isCovering = phase === 'covering';
              return (
                <motion.div
                  key={`louver-${idx}`}
                  initial={{ y: '-105%', rotate: (idx % 2 === 0 ? -1 : 1) * 1.5 }}
                  animate={
                    isCovering
                      ? { y: `${idx * 20}%`, rotate: 0 }
                      : { y: `${-110 - idx * 22}%`, rotate: (idx % 2 === 0 ? -1.5 : 1.5) }
                  }
                  transition={{
                    duration: 0.38,
                    delay: isCovering ? louver.delay : (designLouvers.length - 1 - idx) * 0.025,
                    ease: [0.76, 0, 0.24, 1],
                  }}
                  style={{
                    position: 'absolute',
                    top: '-6%',
                    left: '-5%',
                    width: '110%',
                    height: '28%',
                    background: louver.color,
                    boxShadow: '0 16px 40px rgba(0, 0, 0, 0.4)',
                    zIndex: idx + 2,
                    willChange: 'transform',
                  }}
                />
              );
            })}

            {/* Glowing Laser Seam across meeting line */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={phase === 'covering' ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.14 }}
              style={{
                position: 'absolute',
                top: '50%',
                left: 0,
                right: 0,
                height: '2.5px',
                background: 'linear-gradient(90deg, transparent, #00D2FF 30%, #FF5500 70%, transparent)',
                boxShadow: '0 0 25px #00D2FF, 0 0 50px #FF5500',
                zIndex: 8,
              }}
            />

            {/* Precision Corner Registration Marks (Pure SVG Geometry, No Text) */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: 12,
                padding: 'clamp(20px, 4vw, 40px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                pointerEvents: 'none',
              }}
            >
              {/* Top Row: CMYK Registration Chips & Crosshairs */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {['#00FFFF', '#FF00FF', '#FFFF00', '#111113'].map((c, i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.08 + i * 0.04 }}
                      style={{
                        width: isMobile ? '8px' : '11px',
                        height: isMobile ? '8px' : '11px',
                        borderRadius: '50%',
                        background: c,
                        border: '1.5px solid rgba(255, 255, 255, 0.7)',
                        display: 'inline-block',
                      }}
                    />
                  ))}
                </div>

                {/* Top Right Precision Crosshair */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="8" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
                  <line x1="12" y1="2" x2="12" y2="22" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
                  <line x1="2" y1="12" x2="22" y2="12" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
                </svg>
              </div>

              {/* Bottom Row: Corner Crosshairs */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="8" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
                  <line x1="12" y1="2" x2="12" y2="22" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
                  <line x1="2" y1="12" x2="22" y2="12" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
                </svg>

                <div style={{ display: 'flex', gap: '6px' }}>
                  {[1, 2, 3].map((n) => (
                    <span
                      key={n}
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: '#00D2FF',
                        boxShadow: '0 0 8px #00D2FF',
                        display: 'inline-block',
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Center Pure Graphic Focal Motion Element (NO TEXT) */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 20,
                pointerEvents: 'none',
              }}
            >
              <motion.div
                initial={{ scale: 0.65, opacity: 0 }}
                animate={
                  phase === 'covering'
                    ? { scale: 1, opacity: 1 }
                    : { scale: 1.25, opacity: 0 }
                }
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}
              >
                {/* Concentric Rotating Shutter Blades & Rings */}
                <div style={{ position: 'relative', width: isMobile ? '120px' : '160px', height: isMobile ? '120px' : '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {/* Outer Pulsing Glow Halo */}
                  <motion.div
                    animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.8, 0.4] }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                    style={{
                      position: 'absolute',
                      inset: '-10px',
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, rgba(0, 210, 255, 0.3) 0%, rgba(255, 85, 0, 0.2) 60%, transparent 75%)',
                      filter: 'blur(12px)',
                    }}
                  />

                  {/* Outer Dashed Orbit */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '50%',
                      border: '2px dashed rgba(255, 255, 255, 0.7)',
                    }}
                  />

                  {/* Inner Counter-Rotating Golden Ring */}
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
                    style={{
                      position: 'absolute',
                      inset: isMobile ? '12px' : '16px',
                      borderRadius: '50%',
                      border: '2px solid rgba(255, 85, 0, 0.85)',
                      borderTopColor: '#00D2FF',
                      borderBottomColor: '#FF5500',
                    }}
                  />

                  {/* Center Geometric Starburst Prism */}
                  <motion.div
                    animate={{ rotate: 360, scale: [0.9, 1.1, 0.9] }}
                    transition={{
                      rotate: { repeat: Infinity, duration: 4, ease: 'linear' },
                      scale: { repeat: Infinity, duration: 1.5, ease: 'easeInOut' },
                    }}
                    style={{
                      width: isMobile ? '38px' : '48px',
                      height: isMobile ? '38px' : '48px',
                      background: 'linear-gradient(135deg, #FF5500, #00D2FF)',
                      clipPath: 'polygon(50% 0%, 65% 35%, 100% 50%, 65% 65%, 50% 100%, 35% 65%, 0% 50%, 35% 35%)',
                      boxShadow: '0 0 25px #00D2FF, 0 0 45px #FF5500',
                    }}
                  />
                </div>

                {/* Minimalist Glowing Gradient Progress Filament (No Text) */}
                <div
                  style={{
                    width: isMobile ? '140px' : '200px',
                    height: '4px',
                    background: 'rgba(255, 255, 255, 0.15)',
                    borderRadius: '999px',
                    overflow: 'hidden',
                    marginTop: '20px',
                    boxShadow: '0 0 10px rgba(0,0,0,0.5)',
                  }}
                >
                  <motion.div
                    style={{
                      height: '100%',
                      background: 'linear-gradient(90deg, #FF5500, #00D2FF)',
                      borderRadius: '999px',
                      width: `${progress}%`,
                    }}
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          /* ════════════════════════════════════════════════════════════════
             DEV MODE — PURE CYBER MATRIX SLATS & NEON RETICLE MOTION
             ════════════════════════════════════════════════════════════════ */
          <motion.div
            key="trans-to-dev"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
            style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}
          >
            {/* Ambient Cyber Backdrop with CRT Scanlines */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: '#060709',
                backgroundImage:
                  'repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.5) 0px, rgba(0, 0, 0, 0.5) 2px, transparent 2px, transparent 4px)',
                zIndex: 1,
              }}
            />

            {/* Vertical Cascading Cyber Slats with Neon Lime trailing borders */}
            {Array.from({ length: devSlatCount }).map((_, idx) => {
              const isCovering = phase === 'covering';
              const fromTop = idx % 2 === 0;
              return (
                <motion.div
                  key={`cyber-slat-${idx}`}
                  initial={{ y: fromTop ? '-105%' : '105%' }}
                  animate={
                    isCovering
                      ? { y: '0%' }
                      : { y: fromTop ? '-110%' : '110%' }
                  }
                  transition={{
                    duration: 0.36,
                    delay: isCovering ? idx * 0.03 : (devSlatCount - 1 - idx) * 0.025,
                    ease: [0.76, 0, 0.24, 1],
                  }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: `${(idx / devSlatCount) * 100}%`,
                    width: `${100 / devSlatCount + 0.6}%`,
                    height: '100%',
                    background: idx % 2 === 0 ? '#08090C' : '#0B0D11',
                    borderRight: '2px solid rgba(204, 255, 0, 0.85)',
                    boxShadow: '0 0 25px rgba(204, 255, 0, 0.35)',
                    zIndex: 2,
                    willChange: 'transform',
                  }}
                />
              );
            })}

            {/* Glowing Center Horizontal Laser Slice */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={phase === 'covering' ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
              transition={{ duration: 0.28, delay: 0.12 }}
              style={{
                position: 'absolute',
                top: '50%',
                left: 0,
                right: 0,
                height: '2.5px',
                background: 'linear-gradient(90deg, transparent, #CCFF00, #FFFFFF, #CCFF00, transparent)',
                boxShadow: '0 0 25px #CCFF00, 0 0 50px rgba(204, 255, 0, 0.7)',
                zIndex: 8,
              }}
            />

            {/* Cyber HUD Corner Brackets (Pure SVG Geometry, No Text) */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: 12,
                padding: 'clamp(20px, 4vw, 40px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                pointerEvents: 'none',
              }}
            >
              {/* Top Brackets */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M2 10V2H10" stroke="#CCFF00" strokeWidth="2.5" strokeLinecap="square" />
                </svg>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M22 10V2H14" stroke="#CCFF00" strokeWidth="2.5" strokeLinecap="square" />
                </svg>
              </div>

              {/* Bottom Brackets */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M2 14V22H10" stroke="#CCFF00" strokeWidth="2.5" strokeLinecap="square" />
                </svg>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M22 14V22H14" stroke="#CCFF00" strokeWidth="2.5" strokeLinecap="square" />
                </svg>
              </div>
            </div>

            {/* Center Pure Cyber Radar & Reticle Motion Element (NO TEXT) */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 20,
                pointerEvents: 'none',
              }}
            >
              <motion.div
                initial={{ scale: 0.65, opacity: 0 }}
                animate={
                  phase === 'covering'
                    ? { scale: 1, opacity: 1 }
                    : { scale: 1.25, opacity: 0 }
                }
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}
              >
                {/* Cyber Targeting Radar Rings */}
                <div style={{ position: 'relative', width: isMobile ? '120px' : '160px', height: isMobile ? '120px' : '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {/* Outer Pulsing Neon Green Halo */}
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.7, 0.3] }}
                    transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                    style={{
                      position: 'absolute',
                      inset: '-10px',
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, rgba(204, 255, 0, 0.35) 0%, transparent 70%)',
                      filter: 'blur(14px)',
                    }}
                  />

                  {/* Outer Radar Crosshair Reticle Ring */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '50%',
                      border: '2px dashed #CCFF00',
                      boxShadow: '0 0 15px rgba(204, 255, 0, 0.4)',
                    }}
                  />

                  {/* Inner Counter-Clockwise Segmented Ring */}
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
                    style={{
                      position: 'absolute',
                      inset: isMobile ? '14px' : '18px',
                      borderRadius: '50%',
                      border: '2px solid rgba(255, 255, 255, 0.8)',
                      borderTopColor: '#CCFF00',
                      borderBottomColor: '#CCFF00',
                    }}
                  />

                  {/* Center Cyber Prism Diamond Node */}
                  <motion.div
                    animate={{ rotate: 45, scale: [0.85, 1.15, 0.85] }}
                    transition={{
                      scale: { repeat: Infinity, duration: 1.2, ease: 'easeInOut' },
                    }}
                    style={{
                      width: isMobile ? '24px' : '30px',
                      height: isMobile ? '24px' : '30px',
                      background: '#CCFF00',
                      boxShadow: '0 0 25px #CCFF00, 0 0 45px rgba(204, 255, 0, 0.8)',
                      borderRadius: '3px',
                    }}
                  />
                </div>

                {/* Minimalist Neon Cyber Power Filament (No Text) */}
                <div
                  style={{
                    width: isMobile ? '140px' : '200px',
                    height: '4px',
                    background: 'rgba(255, 255, 255, 0.15)',
                    borderRadius: '999px',
                    overflow: 'hidden',
                    marginTop: '20px',
                    boxShadow: '0 0 10px rgba(0,0,0,0.5)',
                  }}
                >
                  <motion.div
                    style={{
                      height: '100%',
                      background: '#CCFF00',
                      boxShadow: '0 0 12px #CCFF00',
                      borderRadius: '999px',
                      width: `${progress}%`,
                    }}
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
