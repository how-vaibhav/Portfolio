import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import useResponsive from './useResponsive';
import './dev.css';

const TIMELINE_DATA = [
  {
    year: '2022',
    role: 'Digital Design & Media',
    tag: 'Foundation',
    desc: 'Focused on creative fundamentals, mastering video editing, photo manipulation, and visual design.',
    skills: ['Premiere Pro', 'Photoshop', 'Video Editing', 'Visual Design'],
    highlightColor: '#CCFF00', // Lime
    threshold: 0.15,
  },
  {
    year: '2023',
    role: 'Frontend Engineering',
    tag: 'Client-Side Logic',
    desc: 'Transitioned into software engineering, architecting high-performance, responsive user interfaces and robust interactive systems.',
    skills: ['UI Architecture', 'ES6+ Engineering', 'Responsive Systems', 'Version Control'],
    highlightColor: '#FF70A6', // Pink
    threshold: 0.35,
  },
  {
    year: '2024',
    role: 'Systems Architecture',
    tag: 'Architecture & Security',
    desc: 'Architected enterprise platforms, implementing advanced encryption, forensic analyzers, and scalable databases.',
    skills: ['System Architecture', 'Django 5', 'Security Analysis'],
    highlightColor: '#70D6FF', // Cyan
    threshold: 0.55,
  },
  {
    year: '2025',
    role: 'Freelance Developer',
    tag: 'Client Work',
    desc: 'Delivered high-performance web projects and client portfolios, focusing on UI/UX and full-stack solutions.',
    skills: ['React', 'Next.js', 'Supabase'],
    highlightColor: '#CCFF00', // Lime
    threshold: 0.75,
  },
  {
    year: '2026+',
    role: 'Independent Creator',
    tag: 'Active Now',
    desc: 'Working on my placement journey and actively building the personal brand HowVaibhav.',
    skills: ['SaaS Architecture', 'Personal Branding'],
    highlightColor: '#FF70A6', // Pink
    threshold: 0.9,
    isActive: true,
  },
];

export default function DevExperience() {
  const sectionRef = useRef(null);
  const { isMobile, isTablet } = useResponsive();
  const [activeIdx, setActiveIdx] = useState(4); // Default to last

  // Track scroll progression through the experience section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 80%', 'end 50%'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  // Calculate beam width/height from scroll progress
  const beamScaleX = useTransform(smoothProgress, [0, 1], [0, 1]);
  const beamScaleY = useTransform(smoothProgress, [0, 1], [0, 1]);

  // Update active card based on scroll position
  useEffect(() => {
    const unsubscribe = smoothProgress.on('change', (v) => {
      let current = 0;
      for (let i = 0; i < TIMELINE_DATA.length; i++) {
        if (v >= TIMELINE_DATA[i].threshold - 0.15) {
          current = i;
        }
      }
      setActiveIdx(current);
    });
    return () => unsubscribe();
  }, [smoothProgress]);

  return (
    <section
      id="experience"
      ref={sectionRef}
      style={{
        paddingTop: '80px',
        paddingBottom: '120px',
        paddingLeft: 'clamp(20px, 4.5vw, 64px)',
        paddingRight: 'clamp(20px, 4.5vw, 64px)',
        background: '#080808', // Reverted to deep black for overall site consistency
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Brutalist ambient grid background (optional but adds texture) */}
      <div 
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundSize: '40px 40px',
          backgroundImage: 'linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div style={{ maxWidth: '1360px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            textAlign: 'center',
            marginBottom: '64px',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '11px',
              fontWeight: 900,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#FF70A6',
              marginBottom: '12px',
              background: 'rgba(255, 112, 166, 0.08)',
              padding: '6px 14px',
              borderRadius: '999px',
              border: '1px solid rgba(255, 112, 166, 0.25)',
            }}
          >
            <span>✦ CAREER & EVOLUTION</span>
            <span style={{ color: 'rgba(255, 255, 255, 0.4)' }}>|</span>
            <span style={{ color: '#ffffff' }}>2022 — PRESENT</span>
          </div>

          <h2
            style={{
              fontFamily: "'Archivo Black', sans-serif",
              fontSize: 'clamp(34px, 5.5vw, 60px)',
              fontWeight: 900,
              textTransform: 'uppercase',
              color: '#ffffff',
              margin: '0 0 14px 0',
              letterSpacing: '-0.04em',
              lineHeight: 1,
            }}
          >
            TIMELINE
          </h2>
        </motion.div>

        {/* Full-width Responsive Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '32px',
            alignItems: 'stretch',
          }}
        >
          {/* Timeline Track + Interactive Scroll Cards */}
          <div style={{ position: 'relative', paddingBottom: '20px' }}>
            
            {/* 1. Underlying Base Dim Track Line */}
            <div
              style={{
                position: 'absolute',
                top: isMobile ? '24px' : '40px',
                bottom: isMobile ? '24px' : 'auto',
                left: isMobile ? '24px' : '20px',
                right: isMobile ? 'auto' : '20px',
                width: isMobile ? '4px' : 'auto',
                height: isMobile ? 'auto' : '4px',
                background: 'rgba(255, 255, 255, 0.08)',
                zIndex: 0,
              }}
            />

            {/* 2. Scroll-Linked Solid White/Neon Beam Line */}
            {isMobile ? (
              <motion.div
                style={{
                  position: 'absolute',
                  top: '24px',
                  bottom: '24px',
                  left: '24px',
                  width: '4px',
                  background: '#ffffff',
                  boxShadow: '0 0 15px rgba(255,255,255,0.7)',
                  transformOrigin: 'top center',
                  scaleY: beamScaleY,
                  zIndex: 1,
                }}
              />
            ) : (
              <motion.div
                style={{
                  position: 'absolute',
                  top: '40px',
                  left: '20px',
                  right: '20px',
                  height: '4px',
                  background: '#ffffff',
                  boxShadow: '0 0 15px rgba(255,255,255,0.7)',
                  transformOrigin: 'left center',
                  scaleX: beamScaleX,
                  zIndex: 1,
                }}
              />
            )}

            {/* Cards Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(3, 1fr)' : 'repeat(5, 1fr)',
                gap: isMobile ? '24px' : isTablet ? '20px' : '16px',
                position: 'relative',
                zIndex: 2,
              }}
            >
              {TIMELINE_DATA.map((item, index) => {
                const isSelected = activeIdx === index;
                const isPassed = activeIdx >= index;

                return (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ y: 0 }}
                    animate={{
                      opacity: isSelected ? 1 : 0.35,
                      scale: isSelected ? 1.05 : 1,
                      y: isSelected ? -10 : 0,
                      filter: isSelected ? 'grayscale(0%)' : 'grayscale(70%)',
                    }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.5, type: 'spring', stiffness: 300, damping: 25 }}
                    onClick={() => setActiveIdx(index)}
                    className="dev-hover-card"
                    style={{
                      background: '#080808',
                      // Dark Brutalist Borders
                      border: isSelected ? `3px solid ${item.highlightColor}` : '2px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '0px',
                      padding: '24px 16px',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-start',
                      minHeight: isMobile ? 'auto' : isTablet ? 'auto' : '360px',
                      // Harsh Solid Shadows in Neon Colors
                      boxShadow: isSelected ? `8px 8px 0px ${item.highlightColor}, 0 20px 40px rgba(0,0,0,0.6)` : 'none',
                      position: 'relative',
                      overflow: 'hidden',
                      paddingLeft: isMobile ? '64px' : '16px',
                      zIndex: isSelected ? 10 : 1,
                      transition: 'border 0.3s, box-shadow 0.3s',
                    }}
                  >
                    {/* Brutalist Node Block (Square) */}
                    <div
                      style={{
                        position: isMobile ? 'absolute' : 'static',
                        left: isMobile ? '15px' : 'auto',
                        top: isMobile ? '24px' : 'auto',
                        width: '22px',
                        height: '22px',
                        background: isPassed ? item.highlightColor : '#080808',
                        border: isPassed ? `3px solid ${item.highlightColor}` : '3px solid rgba(255, 255, 255, 0.2)',
                        boxShadow: isSelected ? `0 0 20px ${item.highlightColor}` : 'none',
                        marginBottom: isMobile ? '0' : '24px',
                        flexShrink: 0,
                        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                        transform: isSelected ? 'scale(1.4) rotate(45deg)' : 'scale(1) rotate(0deg)',
                      }}
                    />

                    <div style={{ flexGrow: 1 }}>
                      {/* Year & Tag Row */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginBottom: '16px',
                          flexWrap: 'wrap',
                          gap: '8px',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'Archivo Black', 'Inter', sans-serif",
                            fontSize: '32px',
                            fontWeight: 900,
                            color: isSelected ? item.highlightColor : '#ffffff',
                            letterSpacing: '-0.04em',
                            lineHeight: 1,
                            transition: 'color 0.3s ease',
                          }}
                        >
                          {item.year}
                        </span>

                        <span
                          style={{
                            fontSize: '9px',
                            fontWeight: 900,
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            color: isSelected ? '#080808' : 'rgba(255, 255, 255, 0.6)',
                            background: isSelected ? item.highlightColor : 'transparent',
                            padding: '4px 8px',
                            border: `2px solid ${isSelected ? item.highlightColor : 'rgba(255, 255, 255, 0.2)'}`,
                            borderRadius: '20px',
                            transition: 'all 0.3s ease',
                          }}
                        >
                          {item.tag}
                        </span>
                      </div>

                      {/* Role Name */}
                      <h4
                        style={{
                          fontFamily: "'Lobster Two', cursive",
                          fontSize: '28px',
                          fontStyle: 'italic',
                          fontWeight: 700,
                          color: '#ffffff',
                          textTransform: 'none',
                          margin: '0 0 12px 0',
                          letterSpacing: '0.02em',
                          lineHeight: 1.1,
                        }}
                      >
                        {item.role}
                      </h4>

                      {/* Description */}
                      <p
                        style={{
                          fontSize: '13px',
                          color: 'rgba(255, 255, 255, 0.65)',
                          fontWeight: 500,
                          lineHeight: 1.5,
                          margin: '0 0 24px 0',
                        }}
                      >
                        {item.desc}
                      </p>
                    </div>

                    {/* Skill Tags */}
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '6px',
                        borderTop: isSelected ? `2.5px solid ${item.highlightColor}40` : '2px solid rgba(255, 255, 255, 0.1)',
                        paddingTop: '16px',
                        marginTop: 'auto',
                      }}
                    >
                      {item.skills.map((s) => (
                        <span
                          key={s}
                          style={{
                            fontSize: '10px',
                            fontWeight: 800,
                            color: isSelected ? '#080808' : 'rgba(255, 255, 255, 0.7)',
                            background: isSelected ? item.highlightColor : 'rgba(255, 255, 255, 0.08)',
                            padding: '6px 10px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.04em',
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
