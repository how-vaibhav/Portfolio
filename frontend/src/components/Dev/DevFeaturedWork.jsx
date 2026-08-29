import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import useResponsive from './useResponsive';
import './dev.css';

const PROJECTS = [
  {
    id: 'emineral',
    num: '01',
    title: 'eMineral Pass',
    tag: 'SaaS Platform',
    accent: '#2555FF',
    image: '/assets/project-emineral-screenshot.png',
    url: 'https://www.mineraltrack.shop/',
    desc: 'Gov-compliant mineral transport permit with QR verification & real-time tracking.',
    year: '2026',
  },
  {
    id: 'govaid',
    num: '02',
    title: 'GOVAID',
    tag: 'GovTech Portal',
    accent: '#CCFF00',
    image: '/assets/project-govaid-screenshot.png',
    url: 'https://govaid-5n3k.onrender.com/',
    desc: 'Welfare scheme evaluation engine with Fernet encryption & eligibility scoring.',
    year: '2025',
  },
  {
    id: 'logdetector',
    num: '03',
    title: 'LOG DETECTOR',
    tag: 'Security & Forensics',
    accent: '#FF4D4D',
    image: '/assets/project-logdetector-screenshot.png',
    url: 'https://github.com/SkylerOnRadio/log-checker',
    desc: 'Multiprocessed log analyzer using Shannon entropy & MITRE Kill-Chain mapping.',
    year: '2026',
  },
];

/* ─── Single card with stripe-reveal ─────────────── */
function ProjectCard({ p, i, isMobile, isTablet }) {
  const ref = useRef(null);

  /* Scroll progress: starts when card enters bottom of viewport, ends mid-screen */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.95', 'start 0.45'],
  });

  /* Spring-smooth the raw scroll progress so animation feels silky */
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 22, restDelta: 0.001 });

  /* Stripe: scaleX 1→0, origin right, so it peels away rightward */
  const stripeScale = useTransform(smooth, [0, 0.75], [1, 0]);

  /* Card fade + lift */
  const cardOpacity = useTransform(smooth, [0, 0.2], [0, 1]);
  const cardY = useTransform(smooth, [0, 1], [24, 0]);

  const isEven = i % 2 === 0;
  const tabColor = p.accent === '#CCFF00' ? '#080808' : '#ffffff';

  return (
    <div ref={ref} style={{ position: 'relative', overflow: 'hidden' }}>

      {/* Stripe cover — peels away as card enters view */}
      <motion.div
        style={{
          position: 'absolute', inset: 0, zIndex: 3,
          background: p.accent,
          scaleX: stripeScale,
          transformOrigin: 'right',
          pointerEvents: 'none',
          willChange: 'transform',
        }}
      />

      {/* The card */}
      <motion.a
        href={p.url}
        target={p.url.startsWith('http') ? '_blank' : '_self'}
        rel="noopener noreferrer"
        style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : (isEven ? 'row' : 'row-reverse'),
          textDecoration: 'none',
          background: '#0c0c0e',
          border: '1px solid rgba(255,255,255,0.06)',
          minHeight: '172px',
          position: 'relative',
          overflow: 'hidden',
          opacity: cardOpacity,
          y: cardY,
          willChange: 'transform, opacity',
        }}
        whileHover={{ borderColor: 'rgba(255,255,255,0.16)', transition: { duration: 0.25 } }}
      >
        {/* Number tab */}
        <div style={{
          position: 'absolute',
          top: 0, bottom: isMobile ? 'auto' : 0,
          left: isMobile ? 0 : (isEven ? 0 : 'auto'),
          right: isMobile ? 'auto' : (isEven ? 'auto' : 0),
          width: isMobile ? 'auto' : '40px',
          padding: isMobile ? '6px 12px' : 0,
          background: p.accent,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          writingMode: isMobile ? 'horizontal-tb' : 'vertical-rl',
          fontFamily: "'Archivo Black', sans-serif",
          fontSize: '10px',
          fontWeight: 900,
          letterSpacing: '0.18em',
          color: tabColor,
          userSelect: 'none',
          zIndex: 4,
          flexShrink: 0,
        }}>
          {p.num}
        </div>

        {/* Image block */}
        <div style={{
          flex: isMobile ? 'auto' : isTablet ? '0 0 260px' : '0 0 340px', // Narrower on tablet to fit
          height: isMobile ? '200px' : 'auto',
          overflow: 'hidden',
          marginLeft: isMobile ? 0 : (isEven ? '40px' : 0),
          marginRight: isMobile ? 0 : (isEven ? 0 : '40px'),
          position: 'relative',
          background: '#0c0c0e', // Match card background to hide letterboxing
        }}>
          <motion.img
            src={p.image}
            alt={p.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain', // Ensures the screenshot is completely visible
              objectPosition: 'center',
              display: 'block',
            }}
            whileHover={{ scale: 1.05, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } }}
          />
          {/* Very subtle bottom-only vignette so image reads clearly */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'linear-gradient(to bottom, transparent 55%, rgba(12,12,14,0.55) 100%)',
          }} />
          {/* Year chip on image */}
          <div style={{
            position: 'absolute',
            top: 10,
            right: 10,
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(6px)',
            padding: '2px 9px',
            fontSize: '9px', fontWeight: 800, letterSpacing: '0.1em',
            color: 'rgba(255,255,255,0.55)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}>
            {p.year}
          </div>
        </div>

        {/* Text body */}
        <div style={{
          flex: 1,
          padding: '20px 22px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '8px',
        }}>
          {/* Tag row */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <span style={{
              fontSize: '10px', fontWeight: 800,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: p.accent,
              display: 'flex', alignItems: 'center', gap: '6px',
            }}>
              <span style={{
                width: 5, height: 5, borderRadius: '50%',
                background: p.accent, display: 'inline-block',
                boxShadow: `0 0 6px ${p.accent}`,
              }} />
              {p.tag}
            </span>

            {/* Professional Circular Arrow Icon */}
            <motion.div
              style={{
                width: '32px', height: '32px',
                borderRadius: '50%',
                border: `1px solid rgba(255, 255, 255, 0.15)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff',
                background: 'rgba(255, 255, 255, 0.03)',
              }}
              whileHover={{
                background: p.accent,
                color: '#000',
                borderColor: p.accent,
                scale: 1.1,
                rotate: 45,
                transition: { duration: 0.25, ease: 'easeOut' }
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </motion.div>
          </div>

          {/* Title */}
          <h3 style={{
            fontFamily: "'Archivo Black', sans-serif",
            fontSize: '23px', fontWeight: 900, letterSpacing: '-0.035em',
            textTransform: 'uppercase', margin: 0,
            color: '#ffffff', lineHeight: 1.05,
          }}>
            {p.title}
          </h3>

          {/* Description */}
          <p style={{
            fontSize: '12.5px',
            color: 'rgba(255,255,255,0.4)',
            lineHeight: 1.65,
            margin: 0,
          }}>
            {p.desc}
          </p>
        </div>
      </motion.a>
    </div>
  );
}

/* ─── Section ─────────────────────────────────────── */
export default function DevFeaturedWork() {
  const { isMobile, isTablet } = useResponsive();

  useEffect(() => {
    // Only necessary internal effects
  }, []);

  return (
    <section
      id="work"
      style={{
        padding: 'clamp(40px, 5vw, 60px) clamp(20px, 5vw, 80px)',
        background: '#080808',
        position: 'relative',
      }}
    >
      {/* Notebook ruled lines */}
      <div className="dev-notebook-lines" />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'flex-end', marginBottom: '40px',
          }}
        >
          <div>
            <div style={{
              fontSize: '11px', fontWeight: 800, letterSpacing: '0.14em',
              textTransform: 'uppercase', color: '#CCFF00', marginBottom: '8px',
              display: 'flex', alignItems: 'center', gap: '8px',
            }}>
              <span style={{ width: 18, height: 1.5, background: '#CCFF00', display: 'inline-block' }} />
              Selected Work
            </div>
            <h2 style={{
              fontFamily: "'Archivo Black', sans-serif",
              fontSize: 'clamp(26px, 3.5vw, 44px)',
              fontWeight: 900, letterSpacing: '-0.04em',
              textTransform: 'uppercase', color: '#ffffff',
              margin: 0, lineHeight: 1,
            }}>
              Featured{' '}
              <span style={{ WebkitTextStroke: '1.5px #2555FF', color: 'transparent' }}>
                Projects
              </span>
            </h2>
          </div>

          <a
            href="https://github.com/how-vaibhav?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: '10px', fontWeight: 800, letterSpacing: '0.1em',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)',
              textDecoration: 'none', paddingBottom: '2px',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              transition: 'color 0.2s, border-color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#CCFF00'; e.currentTarget.style.borderBottomColor = '#CCFF00'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.3)'; e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.1)'; }}
          >
            All Projects ↗
          </a>
        </motion.div>

        {/* Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {PROJECTS.map((p, i) => <ProjectCard key={p.id} p={p} i={i} isMobile={isMobile} isTablet={isTablet} />)}
        </div>
      </div>
    </section>
  );
}
