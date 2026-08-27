import React, { useState, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform, animate } from 'motion/react';
import { PixelImage } from '../ui/pixel-image';
import useResponsive from './useResponsive';
import './dev.css';

/* ─── Counter (runs once on mount) ─────────────── */
function useCountUp(target, delay = 0) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => {
      const ctrl = animate(0, target, {
        duration: 1.6,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (v) => setValue(Math.round(v)),
      });
      return ctrl.stop;
    }, delay * 1000);
    return () => clearTimeout(t);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return value;
}

/* ─── Motion variants (defined outside component so no re-alloc) */
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.13, delayChildren: 0.3 } } };
const lineV   = { hidden: { y: '105%', opacity: 0, skewY: 4 }, visible: { y: 0, opacity: 1, skewY: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } } };
const fadeV   = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } } };

export default function DevHero() {
  const { isMobile, isTablet } = useResponsive();

  /* ── Spring parallax — only 2 source values, all transforms are cheap */
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const sx = useSpring(rawX, { stiffness: 50, damping: 20 });
  const sy = useSpring(rawY, { stiffness: 50, damping: 20 });

  /* Fewer derived transforms = fewer subscriptions */
  const rectX = useTransform(sx, v => v * 0.35);
  const rectY = useTransform(sy, v => v * 0.35);
  const circX = useTransform(sx, v => v * -0.6);
  const circY = useTransform(sy, v => v * -0.6);
  const imgX  = useTransform(sx, v => v * 0.1);
  const imgY  = useTransform(sy, v => v * 0.1);

  const projects = useCountUp(10, 0.9);
  const clients  = useCountUp(5, 1.1);
  const years    = useCountUp(5, 1.3);

  /* requestAnimationFrame throttled mousemove to cap at 60fps and avoid main-thread blocking */
  const onMouseMove = useCallback((e) => {
    requestAnimationFrame(() => {
      rawX.set((e.clientX / window.innerWidth  - 0.5) * 28);
      rawY.set((e.clientY / window.innerHeight - 0.5) * 28);
    });
  }, [rawX, rawY]);

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [onMouseMove]);

  return (
    <section
      id="home"
      style={{
        minHeight: (isMobile || isTablet) ? 'auto' : '100vh',
        paddingTop: isMobile ? '72px' : '112px',
        paddingBottom: (isMobile || isTablet) ? '64px' : 0,
        paddingLeft:  isMobile ? '24px' : isTablet ? '44px' : '80px',
        paddingRight: isMobile ? '24px' : isTablet ? '44px' : '80px',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        background: '#080808',
      }}
    >
      {/* Dot grid — pure CSS, zero JS cost */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.055) 1.5px, transparent 1.5px)',
        backgroundSize: '28px 28px',
      }} />

      {/* Ambient glows — static after fade-in, GPU composited */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
        style={{
          position: 'absolute', top: '-15%', right: '-8%',
          width: '60%', height: '90%', zIndex: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at 60% 30%, rgba(37,85,255,0.25) 0%, transparent 65%)',
          willChange: 'opacity',
        }}
      />
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.8 }}
        style={{
          position: 'absolute', bottom: '-5%', left: '0%',
          width: '35%', height: '50%', zIndex: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at center, rgba(204,255,0,0.09) 0%, transparent 70%)',
          willChange: 'opacity',
        }}
      />

      {/* ── Main layout ──────────────────── */}
      <div style={{
        maxWidth: '1400px', margin: '0 auto', width: '100%',
        position: 'relative', zIndex: 2,
        display: 'flex', flexDirection: (isMobile || isTablet) ? 'column' : 'row',
        alignItems: 'center', justifyContent: 'space-between',
        gap: (isMobile || isTablet) ? '48px' : 0,
        paddingBottom: isMobile ? '32px' : 0,
        minHeight: (isMobile || isTablet) ? 'auto' : 'calc(100vh - 112px)',
      }}>

        {/* ══ LEFT: Text ══════════════════ */}
        <div style={{
          flex: '1 1 52%', zIndex: 10, display: 'flex',
          flexDirection: 'column', alignItems: 'flex-start',
          paddingBottom: isMobile ? 0 : '60px',
        }}>

          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, x: -28, rotate: -5 }}
            animate={{ opacity: 1, x: 0, rotate: -1.5 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            style={{
              background: '#CCFF00', padding: '7px 16px',
              fontWeight: 900, fontSize: '12px',
              textTransform: 'uppercase', letterSpacing: '0.1em',
              marginBottom: '32px',
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              color: '#080808', boxShadow: '5px 5px 0px #2555FF',
            }}
          >
            <span style={{
              width: 7, height: 7, borderRadius: '50%',
              background: '#080808', display: 'inline-block',
              animation: 'devPulse 1.8s ease-in-out infinite',
            }} />
            Creative Developer
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={stagger} initial="hidden" animate="visible"
            style={{
              fontFamily: "'Archivo Black', 'Inter', sans-serif",
              fontSize: isMobile ? '40px' : isTablet ? '64px' : '88px',
              fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.04em',
              textTransform: 'uppercase', margin: 0, color: '#ffffff',
            }}
          >
            {['I DESIGN.', 'I CODE.'].map((text, idx) => (
              <div key={text} style={{ overflow: 'hidden', paddingRight: '20px' }}>
                <motion.div 
                  variants={lineV}
                  style={{ display: 'inline-block', cursor: 'default', transformOrigin: 'left center' }}
                  whileHover={{ 
                    color: 'transparent', 
                    WebkitTextStroke: isMobile ? '1px #ffffff' : '2px #ffffff',
                    x: isMobile ? 8 : 15,
                    skewX: -8,
                    transition: { duration: 0.2, ease: 'easeOut' }
                  }}
                >
                  {text}
                </motion.div>
              </div>
            ))}

            <div style={{ overflow: 'hidden', marginTop: '14px', marginBottom: '4px', paddingRight: '20px' }}>
              <motion.div
                variants={lineV}
                style={{
                  display: 'inline-block', background: '#2555FF', color: '#fff',
                  padding: '5px 20px', marginLeft: '-4px',
                  border: '1.5px solid rgba(255,255,255,0.18)',
                  boxShadow: '10px 10px 0px rgba(204,255,0,0.9)',
                  position: 'relative', overflow: 'hidden', cursor: 'default'
                }}
                whileHover={{
                  scale: 1.05,
                  rotate: -2,
                  boxShadow: '15px 15px 0px rgba(255,112,166,1)',
                  background: '#1A3FCC',
                  transition: { type: 'spring', stiffness: 300, damping: 15 }
                }}
              >
                {/* Shimmer — CSS animation, zero JS */}
                <span className="dev-shimmer" />
                I ELEVATE
              </motion.div>
            </div>

            <div style={{ overflow: 'hidden', paddingTop: '8px', paddingRight: '20px' }}>
              <motion.div 
                variants={lineV}
                style={{ 
                  fontFamily: "'Lobster Two', cursive", 
                  fontStyle: 'italic', 
                  textTransform: 'none', 
                  color: '#CCFF00', 
                  fontSize: isMobile ? '56px' : isTablet ? '84px' : '110px',
                  lineHeight: 0.9,
                  letterSpacing: '0',
                  display: 'inline-block',
                  cursor: 'default',
                  transformOrigin: 'left center'
                }}
                whileHover={{
                  rotate: 2,
                  scale: 1.05,
                  color: '#FF70A6',
                  transition: { type: 'spring', stiffness: 300, damping: 15 }
                }}
              >
                Brands.
              </motion.div>
            </div>
          </motion.h1>

          {/* Stats */}
          <motion.div
            variants={stagger} initial="hidden" animate="visible"
            style={{
              display: 'flex', gap: isMobile ? '28px' : '44px',
              marginTop: '48px', paddingTop: '24px',
              borderTop: '1px solid rgba(255,255,255,0.1)', width: '100%',
            }}
          >
            {[
              { val: projects, label: 'Projects' },
              { val: clients,  label: 'Clients'  },
              { val: years,    label: 'Yrs Exp'  },
            ].map(({ val, label }) => (
              <motion.div key={label} variants={fadeV} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{
                  fontFamily: "'Archivo Black', sans-serif",
                  fontSize: isMobile ? '36px' : '48px',
                  fontWeight: 900, color: '#CCFF00', lineHeight: 1, letterSpacing: '-0.04em',
                }}>
                  {val}+
                </span>
                <span style={{
                  fontSize: '10px', fontWeight: 800, letterSpacing: '0.12em',
                  textTransform: 'uppercase', color: 'rgba(255,255,255,0.38)',
                }}>
                  {label}
                </span>
              </motion.div>
            ))}
          </motion.div>

        </div>

        {/* ══ RIGHT: Image + Geometry ═════ */}
        <div style={{
          flex: '1 1 48%', position: 'relative', display: 'flex',
          justifyContent: 'center', alignItems: 'flex-end',
          minHeight: isMobile ? '440px' : isTablet ? '680px' : '100%',
          alignSelf: 'stretch', width: '100%',
        }}>

          {/* Blue rectangle — GPU layer via willChange */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0, rotate: 9 }}
            animate={{ scale: 1, opacity: 1, rotate: 4 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            style={{
              position: 'absolute', top: '6%', right: '4%',
              width: '80%', height: '78%',
              background: 'linear-gradient(150deg, #2555FF 0%, #1530a0 100%)',
              border: '1px solid rgba(100,150,255,0.2)',
              zIndex: 1,
              x: rectX, y: rectY,
              willChange: 'transform',
            }}
          />

          {/* Spinning dashed ring — pure CSS via className */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.16,1,0.3,1] }}
            style={{
              position: 'absolute', bottom: '12%', left: isMobile ? '-2%' : '3%',
              width: isMobile ? '150px' : '210px', height: isMobile ? '150px' : '210px',
              zIndex: 2, x: circX, y: circY,
              willChange: 'transform',
            }}
          >
            {/* Outer dashed ring — rotated by CSS, not JS */}
            <div className="dev-spin-ring" style={{
              width: '100%', height: '100%', borderRadius: '50%',
              border: '2px dashed rgba(204,255,0,0.5)',
              position: 'relative',
            }}>
              <div style={{
                position: 'absolute', top: -5, left: '50%', marginLeft: -5,
                width: 10, height: 10, borderRadius: '50%',
                background: '#CCFF00',
                boxShadow: '0 0 10px #CCFF00, 0 0 20px rgba(204,255,0,0.4)',
              }} />
            </div>
            {/* Inner solid circle */}
            <div style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: isMobile ? '80px' : '110px', height: isMobile ? '80px' : '110px',
              background: '#CCFF00', borderRadius: '50%',
            }} />
          </motion.div>

          {/* Cross */}
          <motion.div
            initial={{ scale: 0, rotate: 45, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ duration: 0.65, ease: [0.16,1,0.3,1], delay: 0.6 }}
            style={{ position: 'absolute', top: '4%', left: '3%', zIndex: 5, willChange: 'transform' }}
          >
            <svg width="52" height="52" viewBox="0 0 100 100">
              <rect x="42" y="0" width="16" height="100" fill="#CCFF00" rx="2" />
              <rect x="0" y="42" width="100" height="16" fill="#CCFF00" rx="2" />
            </svg>
          </motion.div>

          {/* Corner bracket */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.45 }}
            style={{
              position: 'absolute', top: '4%', right: '4%', zIndex: 6,
              color: '#CCFF00', fontFamily: 'monospace', fontSize: '26px', fontWeight: 900,
            }}
          >
            {'{ }'}
          </motion.div>

          {/* Slash marks */}
          <motion.div
            initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            style={{
              position: 'absolute', top: '36%', right: '-6%', zIndex: 4,
              fontFamily: 'monospace', fontSize: '28px', fontWeight: 900,
              color: 'rgba(255,255,255,0.12)', transform: 'rotate(-10deg)',
              userSelect: 'none', lineHeight: 0.8,
            }}
          >
            ///////
            <br/>
            ///////
          </motion.div>

          {/* Photo with advanced Pixel Reveal effect */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
            style={{
              position: 'absolute', bottom: 0, right: isMobile ? '-5%' : '0%',
              zIndex: 5, width: isMobile ? '110%' : isTablet ? '100%' : '110%',
              height: isMobile ? '90%' : '95%',
              pointerEvents: 'none',
              x: imgX, y: imgY,
              willChange: 'transform',
              transform: isMobile ? 'scale(2.1) translateY(20%)' : isTablet ? 'scale(2.2) translateY(22%)' : 'scale(2.5) translateY(25%)',
              /* Crucial Optimization: Apply the heavy shadow to the merged composition container, 
                 not the 64 individual pixel image grid elements */
              filter: 'drop-shadow(14px 0px 0px rgba(37,85,255,0.55))',
            }}
          >
            <PixelImage 
              src="/assets/vaibhav-hero-cutout.png" 
              grid="6x4" 
              pixelFadeInDuration={800}
              colorRevealDelay={1000}
            />
          </motion.div>

          {/* Counter-rotating outer ring — CSS only, no JS */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            style={{
              position: 'absolute',
              right: isMobile ? '8%' : '10%',
              top: '18%', zIndex: 7, pointerEvents: 'none',
            }}
          >
            <div className="dev-spin-ring-reverse" style={{
              width: isMobile ? '240px' : '320px',
              height: isMobile ? '240px' : '320px',
              borderRadius: '50%',
              border: '1px dashed rgba(37,85,255,0.45)',
              position: 'relative',
            }}>
              <div style={{
                position: 'absolute', bottom: -4, left: '50%', marginLeft: -4,
                width: 8, height: 8, borderRadius: '50%',
                background: '#2555FF',
                boxShadow: '0 0 10px #2555FF',
              }} />
              <div style={{
                position: 'absolute', top: -3, right: '22%',
                width: 5, height: 5, borderRadius: '50%',
                background: '#fff', boxShadow: '0 0 6px #fff',
              }} />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
