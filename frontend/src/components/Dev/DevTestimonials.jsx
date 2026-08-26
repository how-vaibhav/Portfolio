import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import './dev.css';

const TESTIMONIALS_DATA = [
  {
    id: 1,
    rating: 5,
    quote:
      'Working with Vaibhav was an absolute game changer. The eMineral Pass platform was delivered with rock-solid QR verification and government-grade security.',
    author: 'Daniel K.',
    role: 'Operations Lead, Mineral Track',
    bg: '#CCFF00',
    textColor: '#080808',
    starColor: '#080808',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    // Dynamic physics ranges: [start (unscrolled), settled (in-view)]
    startRotate: -18,
    endRotate: -6,
    startX: -80,
    startY: 90,
  },
  {
    id: 2,
    rating: 5,
    quote:
      "He's not just a developer, he's a true systems problem solver. The scheme evaluation algorithms and Fernet encryption were flawless and lightning fast.",
    author: 'Sophia M.',
    role: 'Product Lead, GovAid Portal',
    bg: '#FF70A6',
    textColor: '#080808',
    starColor: '#080808',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    startRotate: 16,
    endRotate: 5,
    startX: 60,
    startY: 110,
  },
  {
    id: 3,
    rating: 5,
    quote:
      'Clean code, clear communication, and outstanding execution. The multiprocessed Python log analyzer processed gigabytes in seconds. Extraordinary engineer.',
    author: 'Alex R.',
    role: 'Principal Architect, Security Ops',
    bg: '#FFFFFF',
    textColor: '#080808',
    starColor: '#080808',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    startRotate: -14,
    endRotate: -4,
    startX: -50,
    startY: 130,
  },
  {
    id: 4,
    rating: 5,
    quote:
      'The 60fps canvas engine and responsive animations he built gave our platform an ultra-premium feel. Conversion rates increased by 40% immediately.',
    author: 'Vikram S.',
    role: 'Co-Founder, Veloce Labs',
    bg: '#70D6FF',
    textColor: '#080808',
    starColor: '#080808',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    startRotate: 20,
    endRotate: 6,
    startX: 80,
    startY: 100,
  },
];

// Sparkle Star Icon
function SparkleStar({ size = 22, color = '#CCFF00', style = {} }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      style={{
        pointerEvents: 'none',
        filter: `drop-shadow(0 0 8px ${color})`,
        ...style,
      }}
    >
      <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
    </svg>
  );
}

// Single Scroll-Bound Physics Card
function PhysicsTestimonialCard({ item, index, progress, isHovered, onHover, onLeave }) {
  // Continuous scroll-linked transformations
  const cardRotate = useTransform(progress, [0, 1], [item.startRotate, item.endRotate]);
  const cardX = useTransform(progress, [0, 1], [item.startX, 0]);
  const cardY = useTransform(progress, [0, 1], [item.startY, 0]);
  const cardScale = useTransform(progress, [0, 1], [0.82, 1]);
  const cardOpacity = useTransform(progress, [0, 0.4, 1], [0.2, 0.85, 1]);

  return (
    <motion.div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      style={{
        position: 'relative',
        rotate: isHovered ? 0 : cardRotate,
        x: isHovered ? 0 : cardX,
        y: isHovered ? -14 : cardY,
        scale: isHovered ? 1.06 : cardScale,
        opacity: cardOpacity,
        zIndex: isHovered ? 40 : index + 2,
        cursor: 'pointer',
        display: 'flex',
        transition: isHovered ? 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
      }}
    >
      {/* Individual Sparkle Accent on Corner */}
      {(index === 0 || index === 2 || index === 3) && (
        <SparkleStar
          size={24}
          color={item.bg === '#FFFFFF' ? '#CCFF00' : '#ffffff'}
          style={{
            position: 'absolute',
            top: index === 0 ? '-12px' : 'auto',
            bottom: index !== 0 ? '-12px' : 'auto',
            right: index % 2 === 0 ? '-10px' : 'auto',
            left: index % 2 !== 0 ? '-10px' : 'auto',
            zIndex: 5,
          }}
        />
      )}

      {/* Neo-Brutalist Sticker Card */}
      <div
        style={{
          background: item.bg,
          color: item.textColor,
          borderRadius: '16px',
          padding: '28px 24px 22px 24px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
          minHeight: '270px',
          border: '2.5px solid #000000',
          boxShadow: isHovered
            ? '12px 12px 0px #000000, 0 24px 50px rgba(0, 0, 0, 0.8)'
            : '6px 6px 0px #000000',
          transition: 'box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div>
          {/* 5-Star Rating Row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              marginBottom: '16px',
              fontSize: '18px',
              color: item.starColor,
              letterSpacing: '2px',
            }}
          >
            {Array.from({ length: item.rating }).map((_, i) => (
              <span key={i}>★</span>
            ))}
          </div>

          {/* Testimonial Quote */}
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '14px',
              fontWeight: 600,
              lineHeight: 1.6,
              color: item.textColor,
              margin: '0 0 20px 0',
              letterSpacing: '-0.01em',
            }}
          >
            "{item.quote}"
          </p>
        </div>

        {/* Author Row with Avatar and Divider */}
        <div
          style={{
            borderTop: '1.5px solid rgba(0, 0, 0, 0.15)',
            paddingTop: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <img
            src={item.avatar}
            alt={item.author}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2px solid #000000',
              flexShrink: 0,
            }}
            loading="lazy"
          />

          <div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '13.5px',
                fontWeight: 900,
                color: item.textColor,
                letterSpacing: '-0.01em',
              }}
            >
              {item.author}
            </div>

            <div
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: 'rgba(0, 0, 0, 0.65)',
                marginTop: '2px',
              }}
            >
              {item.role}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function DevTestimonials() {
  const containerRef = useRef(null);
  const [hoveredIdx, setHoveredIdx] = useState(null);

  // Active continuous scroll progression through the section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 90%', 'end 40%'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 30,
    restDelta: 0.001,
  });

  // Header dynamic transforms based on scroll
  const headerOpacity = useTransform(smoothProgress, [0, 0.3], [0.4, 1]);
  const headerY = useTransform(smoothProgress, [0, 0.3], [30, 0]);

  return (
    <section
      id="about"
      ref={containerRef}
      style={{
        paddingTop: '80px',
        paddingBottom: '130px',
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
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '800px',
          height: '500px',
          background: 'radial-gradient(ellipse at center, rgba(204, 255, 0, 0.035) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Floating Sparkle Stars */}
      <SparkleStar
        size={26}
        color="#CCFF00"
        style={{ position: 'absolute', top: '100px', left: '7%', opacity: 0.7 }}
      />
      <SparkleStar
        size={30}
        color="#FF70A6"
        style={{ position: 'absolute', top: '160px', right: '8%', opacity: 0.8 }}
      />
      <SparkleStar
        size={22}
        color="#70D6FF"
        style={{ position: 'absolute', bottom: '90px', left: '12%', opacity: 0.6 }}
      />
      <SparkleStar
        size={26}
        color="#FFFFFF"
        style={{ position: 'absolute', bottom: '130px', right: '10%', opacity: 0.7 }}
      />

      <div style={{ maxWidth: '1360px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        {/* Section Header */}
        <motion.div
          style={{
            textAlign: 'center',
            marginBottom: '56px',
            opacity: headerOpacity,
            y: headerY,
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
              color: '#CCFF00',
              marginBottom: '12px',
              background: 'rgba(204, 255, 0, 0.08)',
              padding: '6px 14px',
              borderRadius: '999px',
              border: '1px solid rgba(204, 255, 0, 0.25)',
            }}
          >
            <span>✦ CLIENT TESTIMONIALS</span>
            <span style={{ color: 'rgba(255, 255, 255, 0.4)' }}>|</span>
            <span style={{ color: '#ffffff' }}>5.0 RATED</span>
          </div>

          <h2
            style={{
              fontFamily: "'Archivo Black', 'Inter', sans-serif",
              fontSize: 'clamp(34px, 5.5vw, 60px)',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              color: '#ffffff',
              margin: '0 0 14px 0',
              textTransform: 'uppercase',
              lineHeight: 1,
            }}
          >
            WHAT THEY SAY
          </h2>

          <p
            style={{
              fontSize: '14px',
              color: 'rgba(255, 255, 255, 0.6)',
              maxWidth: '520px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Direct testimonials from startup founders, product directors, and security architects.
          </p>
        </motion.div>

        {/* 4 Continuously Scroll-Linked Physics Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '32px 24px',
            alignItems: 'stretch',
          }}
        >
          {TESTIMONIALS_DATA.map((item, index) => (
            <PhysicsTestimonialCard
              key={item.id}
              item={item}
              index={index}
              progress={smoothProgress}
              isHovered={hoveredIdx === item.id}
              onHover={() => setHoveredIdx(item.id)}
              onLeave={() => setHoveredIdx(null)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
