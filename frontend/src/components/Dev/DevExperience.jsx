import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import './dev.css';

const TIMELINE_DATA = [
  {
    year: '2021',
    role: 'Started Journey',
    tag: 'Foundation',
    desc: 'Self-taught developer building web applications, responsive components, and UI solutions.',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'Git'],
    highlightColor: '#CCFF00',
    threshold: 0.15,
  },
  {
    year: '2022',
    role: 'Freelance Developer',
    tag: 'Client Work',
    desc: 'Delivered web projects and client portfolios with performance optimization and clean code.',
    skills: ['React', 'Tailwind', 'REST APIs', 'UI/UX'],
    highlightColor: '#CCFF00',
    threshold: 0.35,
  },
  {
    year: '2023',
    role: 'Systems & Security',
    tag: 'Forensics',
    desc: 'Engineered Python forensic analyzers, Shannon entropy engines, and database systems.',
    skills: ['Python', 'Multiprocessing', 'Security Analysis', 'PostgreSQL'],
    highlightColor: '#2A5CFF',
    threshold: 0.55,
  },
  {
    year: '2024',
    role: 'Full-Stack Architect',
    tag: 'Enterprise',
    desc: 'Architected enterprise platforms (eMineral Pass, GovAid) with QR verification and encryption.',
    skills: ['Next.js', 'Django 5', 'Fernet Encryption', 'Supabase'],
    highlightColor: '#2A5CFF',
    threshold: 0.75,
  },
  {
    year: '2025+',
    role: 'Independent Creator',
    tag: 'Active Now',
    desc: 'Building scalable products, interactive web applications, and helping modern brands grow.',
    skills: ['Canvas 60fps', 'Motion Systems', 'SaaS Architecture', 'Cloud Deployment'],
    highlightColor: '#CCFF00',
    threshold: 0.9,
    isActive: true,
  },
];

export default function DevExperience() {
  const sectionRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeIdx, setActiveIdx] = useState(4);

  // Track scroll progression through the experience section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 80%', 'end 35%'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 32,
    restDelta: 0.001,
  });

  // Calculate beam width/height from scroll progress
  const beamScaleX = useTransform(smoothProgress, [0, 1], [0, 1]);
  const beamScaleY = useTransform(smoothProgress, [0, 1], [0, 1]);
  const percentageText = useTransform(smoothProgress, (p) => `${Math.round(p * 100)}%`);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 860);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update active card based on scroll position
  useEffect(() => {
    const unsubscribe = smoothProgress.on('change', (v) => {
      let current = 0;
      for (let i = 0; i < TIMELINE_DATA.length; i++) {
        if (v >= TIMELINE_DATA[i].threshold - 0.1) {
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
        paddingTop: '36px',
        paddingBottom: '90px',
        paddingLeft: 'clamp(20px, 4.5vw, 64px)',
        paddingRight: 'clamp(20px, 4.5vw, 64px)',
        background: '#080808',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background ambient lighting */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '500px',
          height: '350px',
          background: 'radial-gradient(circle, rgba(204, 255, 0, 0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1360px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        {/* Section Header with Live Scroll Progress Indicator */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '44px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            paddingBottom: '16px',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span
              style={{
                fontSize: '12px',
                fontWeight: 900,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#ffffff',
              }}
            >
              EXPERIENCE
            </span>
          </div>
        </div>

        {/* 2-Column Responsive Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 340px',
            gap: '32px',
            alignItems: 'stretch',
          }}
        >
          {/* Left Column: Timeline Track + Interactive Scroll Cards */}
          <div style={{ position: 'relative' }}>
            {/* 1. Underlying Base Dim Track Line */}
            <div
              style={{
                position: 'absolute',
                top: isMobile ? '24px' : '40px',
                bottom: isMobile ? '24px' : 'auto',
                left: isMobile ? '24px' : '20px',
                right: isMobile ? 'auto' : '20px',
                width: isMobile ? '2px' : 'auto',
                height: isMobile ? 'auto' : '2px',
                background: 'rgba(255, 255, 255, 0.1)',
                zIndex: 0,
              }}
            />

            {/* 2. Scroll-Linked Glowing Laser Beam Line */}
            {isMobile ? (
              <motion.div
                style={{
                  position: 'absolute',
                  top: '24px',
                  bottom: '24px',
                  left: '24px',
                  width: '3px',
                  background: 'linear-gradient(180deg, #CCFF00 0%, #2A5CFF 60%, #CCFF00 100%)',
                  boxShadow: '0 0 16px #CCFF00',
                  transformOrigin: 'top center',
                  scaleY: beamScaleY,
                  zIndex: 0,
                }}
              />
            ) : (
              <motion.div
                style={{
                  position: 'absolute',
                  top: '40px',
                  left: '20px',
                  right: '20px',
                  height: '3px',
                  background: 'linear-gradient(90deg, #CCFF00 0%, #2A5CFF 50%, #CCFF00 100%)',
                  boxShadow: '0 0 16px #CCFF00',
                  transformOrigin: 'left center',
                  scaleX: beamScaleX,
                  zIndex: 0,
                }}
              />
            )}

            {/* Cards Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(5, 1fr)',
                gap: isMobile ? '20px' : '14px',
                position: 'relative',
                zIndex: 1,
              }}
            >
              {TIMELINE_DATA.map((item, index) => {
                const isSelected = activeIdx === index;
                const isPassed = activeIdx >= index;

                return (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    onClick={() => setActiveIdx(index)}
                    className="dev-hover-card"
                    style={{
                      background: isSelected ? '#15151a' : isPassed ? '#101014' : '#0c0c0f',
                      border: isSelected
                        ? `1.5px solid ${item.highlightColor}`
                        : isPassed
                        ? '1px solid rgba(255, 255, 255, 0.18)'
                        : '1px solid rgba(255, 255, 255, 0.06)',
                      borderRadius: '12px',
                      padding: '22px 16px',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      minHeight: isMobile ? 'auto' : '270px',
                      boxShadow: isSelected
                        ? `0 16px 36px ${item.highlightColor}30`
                        : '0 8px 24px rgba(0,0,0,0.5)',
                      position: 'relative',
                      overflow: 'hidden',
                      paddingLeft: isMobile ? '58px' : '16px',
                      transform: isSelected ? 'translateY(-4px)' : 'translateY(0)',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  >
                    {/* Node Dot with Pulsing Glow on Activation */}
                    <div
                      style={{
                        position: isMobile ? 'absolute' : 'static',
                        left: isMobile ? '17px' : 'auto',
                        top: isMobile ? '24px' : 'auto',
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        background: isPassed ? item.highlightColor : '#222226',
                        boxShadow: isPassed ? `0 0 16px ${item.highlightColor}` : 'none',
                        border: '3px solid #080808',
                        marginBottom: isMobile ? '0' : '16px',
                        flexShrink: 0,
                        transition: 'all 0.35s ease',
                      }}
                    />

                    <div>
                      {/* Year & Tag Row */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginBottom: '8px',
                          gap: '6px',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'Archivo Black', 'Inter', sans-serif",
                            fontSize: '22px',
                            fontWeight: 900,
                            color: isPassed ? '#ffffff' : 'rgba(255, 255, 255, 0.6)',
                            letterSpacing: '-0.03em',
                            lineHeight: 1,
                          }}
                        >
                          {item.year}
                        </span>

                        <span
                          style={{
                            fontSize: '9px',
                            fontWeight: 800,
                            letterSpacing: '0.06em',
                            textTransform: 'uppercase',
                            color: isPassed ? item.highlightColor : 'rgba(255, 255, 255, 0.4)',
                            background: isPassed ? `${item.highlightColor}18` : 'rgba(255, 255, 255, 0.05)',
                            padding: '3px 8px',
                            borderRadius: '4px',
                            border: `1px solid ${isPassed ? `${item.highlightColor}40` : 'rgba(255,255,255,0.08)'}`,
                          }}
                        >
                          {item.tag}
                        </span>
                      </div>

                      {/* Role Name */}
                      <h4
                        style={{
                          fontSize: '13px',
                          fontWeight: 800,
                          color: isSelected ? '#ffffff' : 'rgba(255, 255, 255, 0.85)',
                          textTransform: 'uppercase',
                          margin: '0 0 8px 0',
                          letterSpacing: '-0.01em',
                          lineHeight: 1.25,
                        }}
                      >
                        {item.role}
                      </h4>

                      {/* Description */}
                      <p
                        style={{
                          fontSize: '11.5px',
                          color: isPassed ? 'rgba(255, 255, 255, 0.7)' : 'rgba(255, 255, 255, 0.45)',
                          lineHeight: 1.5,
                          margin: '0 0 14px 0',
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
                        gap: '4px',
                        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                        paddingTop: '10px',
                      }}
                    >
                      {item.skills.map((s) => (
                        <span
                          key={s}
                          style={{
                            fontSize: '9px',
                            fontWeight: 700,
                            color: isPassed ? 'rgba(255, 255, 255, 0.85)' : 'rgba(255, 255, 255, 0.5)',
                            background: isPassed ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.03)',
                            padding: '2px 6px',
                            borderRadius: '3px',
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

          {/* Right Column: Giant 5+ Experience Card with Interactive Live State */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            style={{
              background: '#CCFF00',
              color: '#000000',
              borderRadius: '16px',
              padding: 'clamp(28px, 4vw, 36px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden',
              clipPath:
                'polygon(0 0, 100% 0, 100% calc(100% - 32px), calc(100% - 32px) 100%, 0 100%)',
              boxShadow: '0 20px 50px rgba(204, 255, 0, 0.25)',
              minHeight: '280px',
            }}
          >
            <div>
              {/* Giant 5+ */}
              <div
                style={{
                  fontFamily: "'Archivo Black', 'Inter', sans-serif",
                  fontSize: 'clamp(64px, 7vw, 92px)',
                  fontWeight: 900,
                  lineHeight: 0.85,
                  letterSpacing: '-0.06em',
                  marginBottom: '14px',
                }}
              >
                5+
              </div>

              {/* Title Badge */}
              <div
                style={{
                  fontSize: '13px',
                  fontWeight: 900,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  lineHeight: 1.3,
                  marginBottom: '20px',
                }}
              >
                YEARS OF CONTINUOUS ENGINEERING & CREATIVE BUILDING
              </div>
            </div>

            {/* Quick Metrics Breakdown */}
            <div
              style={{
                borderTop: '2px solid rgba(0, 0, 0, 0.2)',
                paddingTop: '16px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
              }}
            >
              <div>
                <div style={{ fontSize: '18px', fontWeight: 900, lineHeight: 1 }}>100%</div>
                <div style={{ fontSize: '9px', fontWeight: 800, textTransform: 'uppercase', opacity: 0.75 }}>
                  Gov-Grade Security
                </div>
              </div>

              <div>
                <div style={{ fontSize: '18px', fontWeight: 900, lineHeight: 1 }}>60 FPS</div>
                <div style={{ fontSize: '9px', fontWeight: 800, textTransform: 'uppercase', opacity: 0.75 }}>
                  Canvas Performance
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
