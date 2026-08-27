import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import useResponsive from './useResponsive';
import './dev.css';

const TESTIMONIALS_DATA = [
  {
    id: 1,
    rating: 4.5,
    quote: "Honestly blown away by his design sense. He took our rough ideas and turned them into something that just looks and feels incredible to use.",
    author: 'Yasir Khan',
    role: 'Logistics Business Owner',
    bg: '#CCFF00',
    textColor: '#080808',
    starColor: '#080808',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
    startRotate: -45,
    endRotate: 0,
    startX: -400,
    startY: 250,
    startScale: 0.5,
  },
  {
    id: 2,
    rating: 4,
    quote: "Vaibhav is the guy you call when you need something that won't crash. He built our entire system from scratch and it hasn't dropped a single request.",
    author: 'Amrit Pal',
    role: 'Doctor / Clinic Owner',
    bg: '#FF70A6',
    textColor: '#080808',
    starColor: '#080808',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    startRotate: 30,
    endRotate: 0,
    startX: 0,
    startY: 350,
    startScale: 0.4,
  },
  {
    id: 3,
    rating: 4.5,
    quote: "Super easy to work with and knows backend architecture inside out. The platform he delivered is fast, secure, and we haven't had to worry about a thing.",
    author: 'Amrit Pal Singh',
    role: 'Cafe Owner',
    bg: '#FFFFFF',
    textColor: '#080808',
    starColor: '#080808',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    startRotate: 45,
    endRotate: 0,
    startX: 400,
    startY: 200,
    startScale: 0.5,
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
  const cardScale = useTransform(progress, [0, 1], [item.startScale || 0.5, 1]);
  const cardOpacity = useTransform(progress, [0, 0.6, 1], [0, 0.9, 1]);

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
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Giant Background Quote Mark */}
        <div style={{
          position: 'absolute',
          top: '-20px',
          right: '10px',
          fontSize: '180px',
          fontFamily: "'Georgia', serif",
          color: '#000000',
          opacity: 0.04,
          lineHeight: 1,
          pointerEvents: 'none',
          zIndex: 0,
        }}>
          "
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* 5-Star Rating Row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              marginBottom: '20px',
              fontSize: '20px',
              color: item.starColor,
              letterSpacing: '2px',
            }}
          >
            {Array.from({ length: Math.floor(item.rating) }).map((_, i) => (
              <span key={i}>★</span>
            ))}
            {item.rating % 1 !== 0 && (
              <span style={{ position: 'relative', display: 'inline-block' }}>
                <span style={{ color: 'rgba(0,0,0,0.15)' }}>★</span>
                <span style={{ position: 'absolute', left: 0, top: 0, overflow: 'hidden', width: '50%', color: item.starColor }}>★</span>
              </span>
            )}
          </div>

          {/* Testimonial Quote */}
          <div style={{
            borderLeft: `3.5px solid ${item.textColor}`,
            paddingLeft: '18px',
            margin: '0 0 32px 0',
          }}>
            <p
              style={{
                fontFamily: "'Caveat', cursive",
                fontSize: '26px',
                fontWeight: 600,
                lineHeight: 1.4,
                color: item.textColor,
                margin: 0,
                letterSpacing: '0em',
              }}
            >
              "{item.quote}"
            </p>
          </div>
        </div>

        {/* Author Row with Divider */}
        <div
          style={{
            borderTop: `2px solid ${item.textColor}`,
            paddingTop: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "'Archivo Black', 'Inter', sans-serif",
                fontSize: '15px',
                fontWeight: 900,
                color: item.textColor,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              {item.author}
            </div>

            <div
              style={{
                fontSize: '11px',
                fontWeight: 800,
                color: item.textColor,
                opacity: 0.7,
                marginTop: '4px',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              {item.role}
            </div>
          </div>
          
          {/* Decorative Brutalist Cross */}
          <div style={{ fontSize: '20px', fontWeight: 900, color: item.textColor, lineHeight: 1 }}>
            +
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function DevTestimonials() {
  const containerRef = useRef(null);
  const { isMobile } = useResponsive();
  const [hoveredIdx, setHoveredIdx] = useState(null);

  // Active continuous scroll progression through the section
  // Changed offset to 'end 60%' to snap into alignment slightly earlier while scrolling down
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 95%', 'end 65%'],
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
      {!isMobile && (
        <>
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
        </>
      )}

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
            <span style={{ color: '#ffffff' }}>4.5 RATED</span>
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
