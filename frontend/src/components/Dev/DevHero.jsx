import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, animate } from 'motion/react';
import './dev.css';

/* ── Animated counter hook ─────────────────────────── */
function useCountUp(target, duration = 1.6) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const controls = animate(0, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return controls.stop;
  }, [target, duration]);
  return value;
}

/* ── Stagger container variants ────────────────────── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const wordVariants = {
  hidden: { y: '110%', opacity: 0, skewY: 6 },
  visible: {
    y: 0,
    opacity: 1,
    skewY: 0,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function DevHero() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const sectionRef = useRef(null);

  /* Spring-physics mouse parallax */
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 60, damping: 20 });
  const springY = useSpring(rawY, { stiffness: 60, damping: 20 });

  /* Parallax derivations */
  const bgRectX  = useTransform(springX, v => v * 0.4);
  const bgRectY  = useTransform(springY, v => v * 0.4);
  const circleX  = useTransform(springX, v => v * -0.7);
  const circleY  = useTransform(springY, v => v * -0.7);
  const crossX   = useTransform(springX, v => v * 1.2);
  const crossY   = useTransform(springY, v => v * 1.2);
  const imgX     = useTransform(springX, v => v * 0.15);
  const imgY     = useTransform(springY, v => v * 0.15);

  /* Counters */
  const projectCount  = useCountUp(12);
  const clientCount   = useCountUp(8);
  const yearCount     = useCountUp(3);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      setIsMobile(w < 768);
      setIsTablet(w >= 768 && w < 1080);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e) => {
      rawX.set((e.clientX / window.innerWidth  - 0.5) * 30);
      rawY.set((e.clientY / window.innerHeight - 0.5) * 30);
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [rawX, rawY]);

  return (
    <section
      id="home"
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        paddingTop: isMobile ? '100px' : '120px',
        paddingBottom: '0',
        paddingLeft:  isMobile ? '20px' : isTablet ? '40px' : '80px',
        paddingRight: isMobile ? '20px' : isTablet ? '40px' : '80px',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        background: '#080808',
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.07) 1.5px, transparent 1.5px)',
        backgroundSize: '28px 28px',
      }}
    >

      {/* ── Ambient blue glow ─────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '55%',
          height: '80%',
          background: 'radial-gradient(ellipse at center, rgba(37,85,255,0.22) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.8 }}
        style={{
          position: 'absolute',
          bottom: '5%',
          left: '5%',
          width: '30%',
          height: '40%',
          background: 'radial-gradient(ellipse at center, rgba(204,255,0,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* ── Main layout ───────────────────────────────── */}
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          width: '100%',
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: isMobile ? '60px' : '0',
          paddingBottom: isMobile ? '80px' : '0',
        }}
      >

        {/* ════════════════════════════
            LEFT: Typography
        ════════════════════════════ */}
        <div
          style={{
            flex: '1 1 52%',
            position: 'relative',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            marginTop: isMobile ? '0' : '-60px',
          }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -40, rotate: -6 }}
            animate={{ opacity: 1, x: 0, rotate: -2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            style={{
              background: '#CCFF00',
              padding: '8px 18px',
              fontWeight: 900,
              fontSize: '13px',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '36px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: '#080808',
              boxShadow: '5px 5px 0px #2555FF',
              transform: 'rotate(-2deg)',
            }}
          >
            <span style={{
              width: 8, height: 8,
              borderRadius: '50%',
              background: '#080808',
              display: 'inline-block',
              animation: 'devPulse 1.5s ease-in-out infinite',
            }} />
            Creative Developer
          </motion.div>

          {/* Headline – each line clip-animates from below */}
          <motion.h1
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{
              fontFamily: "'Archivo Black', 'Inter', sans-serif",
              fontSize: isMobile ? '56px' : isTablet ? '78px' : '108px',
              fontWeight: 900,
              lineHeight: 0.88,
              letterSpacing: '-0.045em',
              textTransform: 'uppercase',
              margin: 0,
              color: '#ffffff',
              overflow: 'hidden',
            }}
          >
            <div style={{ overflow: 'hidden' }}>
              <motion.div variants={wordVariants}>I DESIGN.</motion.div>
            </div>
            <div style={{ overflow: 'hidden' }}>
              <motion.div variants={wordVariants}>I CODE.</motion.div>
            </div>

            {/* "I ELEVATE" blue block */}
            <div style={{ overflow: 'hidden', marginTop: '14px', marginBottom: '14px' }}>
              <motion.div
                variants={wordVariants}
                style={{
                  display: 'inline-block',
                  background: '#2555FF',
                  color: '#ffffff',
                  padding: '4px 20px',
                  border: '2px solid rgba(255,255,255,0.2)',
                  boxShadow: '8px 8px 0px rgba(204,255,0,0.85)',
                  marginLeft: '-4px',
                }}
              >
                I ELEVATE
              </motion.div>
            </div>

            <div style={{ overflow: 'hidden' }}>
              <motion.div variants={wordVariants}>BRANDS.</motion.div>
            </div>
          </motion.h1>

          {/* Stats row */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{
              display: 'flex',
              gap: isMobile ? '24px' : '40px',
              marginTop: '48px',
              paddingTop: '32px',
              borderTop: '1px solid rgba(255,255,255,0.12)',
              width: '100%',
            }}
          >
            {[
              { val: projectCount, label: 'Projects', suffix: '+' },
              { val: clientCount,  label: 'Clients',  suffix: '+' },
              { val: yearCount,    label: 'Years Exp', suffix: '+' },
            ].map(({ val, label, suffix }) => (
              <motion.div key={label} variants={fadeUpVariants} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{
                  fontFamily: "'Archivo Black', sans-serif",
                  fontSize: isMobile ? '36px' : '48px',
                  fontWeight: 900,
                  color: '#CCFF00',
                  lineHeight: 1,
                  letterSpacing: '-0.04em',
                }}>
                  {val}{suffix}
                </span>
                <span style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.45)',
                }}>
                  {label}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 1 }}
            style={{
              marginTop: '48px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              color: 'rgba(255,255,255,0.4)',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
              style={{
                width: '24px', height: '38px',
                border: '2px solid rgba(255,255,255,0.2)',
                borderRadius: '12px',
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                paddingTop: '6px',
              }}
            >
              <div style={{
                width: '4px', height: '8px',
                background: '#CCFF00',
                borderRadius: '2px',
              }} />
            </motion.div>
            Scroll to explore
          </motion.div>
        </div>

        {/* ════════════════════════════
            RIGHT: Image + graphics
        ════════════════════════════ */}
        <div
          style={{
            flex: '1 1 48%',
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
            minHeight: isMobile ? '560px' : isTablet ? '680px' : '860px',
            width: '100%',
          }}
        >

          {/* Blue rectangle (layer 1) */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, rotate: 8 }}
            animate={{ scale: 1, opacity: 1, rotate: 4 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            style={{
              position: 'absolute',
              top: isMobile ? '5%' : '8%',
              right: '3%',
              width: '82%',
              height: '78%',
              background: 'linear-gradient(145deg, #2555FF 0%, #1a3ab8 100%)',
              border: '1px solid rgba(100,140,255,0.3)',
              zIndex: 1,
              x: bgRectX,
              y: bgRectY,
            }}
          />

          {/* Lime circle (layer 2) */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            style={{
              position: 'absolute',
              bottom: '12%',
              left: isMobile ? '-4%' : '2%',
              width: isMobile ? '140px' : '200px',
              height: isMobile ? '140px' : '200px',
              background: '#CCFF00',
              borderRadius: '50%',
              zIndex: 2,
              x: circleX,
              y: circleY,
            }}
          />

          {/* Cross graphic (layer 3) */}
          <motion.div
            initial={{ scale: 0, rotate: 45, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
            style={{
              position: 'absolute',
              top: '4%',
              left: '4%',
              zIndex: 4,
              x: crossX,
              y: crossY,
            }}
          >
            <svg width="56" height="56" viewBox="0 0 100 100">
              <rect x="40" y="0"  width="20" height="100" fill="#CCFF00" />
              <rect x="0"  y="40" width="100" height="20" fill="#CCFF00" />
            </svg>
          </motion.div>

          {/* Slashes */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            style={{
              position: 'absolute',
              top: '38%',
              right: '-8%',
              zIndex: 4,
              fontFamily: 'monospace',
              fontSize: '30px',
              fontWeight: 900,
              color: 'rgba(255,255,255,0.15)',
              userSelect: 'none',
              lineHeight: 0.8,
              transform: 'rotate(-10deg)',
            }}
          >
            ///////
            <br />
            ///////
          </motion.div>

          {/* Corner bracket decal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            style={{
              position: 'absolute',
              top: '5%',
              right: '5%',
              zIndex: 6,
              color: '#CCFF00',
              fontFamily: 'monospace',
              fontSize: '28px',
              fontWeight: 900,
              lineHeight: 1,
            }}
          >
            {`{ }`}
          </motion.div>

          {/* Subject image (layer 5) */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            style={{
              position: 'absolute',
              bottom: '-20px',
              zIndex: 5,
              width: isMobile ? '145%' : '168%',
              left: isMobile ? '-22%' : '-34%',
              display: 'flex',
              justifyContent: 'center',
              pointerEvents: 'none',
              x: imgX,
              y: imgY,
            }}
          >
            <img
              src="/assets/vaibhav-hero-cutout.png"
              alt="Vaibhav"
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: isMobile ? '680px' : isTablet ? '860px' : '1060px',
                objectFit: 'contain',
                objectPosition: 'bottom center',
                filter: 'grayscale(100%) contrast(1.25) drop-shadow(0 0 40px rgba(0,0,0,0.9)) drop-shadow(12px 12px 0px rgba(37,85,255,0.5))',
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* ── Marquee ───────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: '#CCFF00',
          color: '#080808',
          padding: '13px 0',
          display: 'flex',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          fontFamily: "'Inter', sans-serif",
          fontWeight: 900,
          fontSize: '15px',
          letterSpacing: '0.12em',
          zIndex: 20,
        }}
      >
        <div className="dev-marquee-content">
          {Array(4).fill(null).map((_, i) => (
            <span key={i}>
              &nbsp;&nbsp;//&nbsp;&nbsp;CREATIVE DEVELOPER
              &nbsp;&nbsp;//&nbsp;&nbsp;FRONTEND ARCHITECT
              &nbsp;&nbsp;//&nbsp;&nbsp;UI/UX DESIGNER
              &nbsp;&nbsp;//&nbsp;&nbsp;SYSTEMS THINKER
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
