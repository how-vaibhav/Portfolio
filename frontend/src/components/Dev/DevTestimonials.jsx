import React from 'react';
import './dev.css';

const TESTIMONIALS = [
  {
    id: 1,
    quote:
      'Working with him was an absolute game changer. The project was delivered on time, with government-grade security, and exceeded all our expectations.',
    author: 'Daniel K.',
    role: 'Operations Lead, Mineral Track',
    bg: '#2563EB',
    textColor: '#ffffff',
    avatar: '👨‍💼',
  },
  {
    id: 2,
    quote:
      "He's not just a developer, he's a true problem solver. The scheme evaluation algorithms and encryption in GovAid were top-tier. Highly recommended!",
    author: 'Sophia M.',
    role: 'Product Lead, GovAid Portal',
    bg: '#141416',
    textColor: '#ffffff',
    avatar: '👩‍💻',
  },
  {
    id: 3,
    quote:
      'Clean code, clear communication, and outstanding execution. The multiprocessing architecture was blazing fast. Will work again!',
    author: 'Alex R.',
    role: 'Principal Architect, Security Ops',
    bg: '#0A0A0C',
    textColor: '#ffffff',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    avatar: '👨‍🔬',
  },
];

export default function DevTestimonials() {
  return (
    <section
      id="about"
      style={{
        paddingTop: '60px',
        paddingBottom: '90px',
        paddingLeft: 'clamp(20px, 4.5vw, 64px)',
        paddingRight: 'clamp(20px, 4.5vw, 64px)',
        background: '#080808',
      }}
    >
      <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
        {/* Section Header */}
        <div
          style={{
            fontSize: '12px',
            fontWeight: 800,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#ffffff',
            marginBottom: '32px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            paddingBottom: '16px',
          }}
        >
          WHAT CLIENTS SAY
        </div>

        {/* 2-Column Grid: Testimonials Cards + Architecture Right Block */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
            alignItems: 'stretch',
          }}
        >
          {/* Left 3 Testimonial Cards Column */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px',
            }}
          >
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="dev-hover-card"
                style={{
                  background: t.bg,
                  color: t.textColor,
                  border: t.border || 'none',
                  borderRadius: '12px',
                  padding: '28px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '220px',
                  boxShadow: '0 12px 30px rgba(0, 0, 0, 0.4)',
                }}
              >
                <div>
                  {/* Quote Icon */}
                  <span
                    style={{
                      fontSize: '36px',
                      lineHeight: 1,
                      fontFamily: 'serif',
                      color: t.bg === '#2563EB' ? '#ffffff' : '#CCFF00',
                      display: 'block',
                      marginBottom: '12px',
                    }}
                  >
                    “
                  </span>

                  {/* Quote Text */}
                  <p
                    style={{
                      fontSize: '13px',
                      lineHeight: 1.6,
                      color: t.bg === '#2563EB' ? '#ffffff' : 'rgba(255, 255, 255, 0.8)',
                      margin: 0,
                    }}
                  >
                    {t.quote}
                  </p>
                </div>

                {/* Author Info */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginTop: '20px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                    paddingTop: '14px',
                  }}
                >
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '16px',
                    }}
                  >
                    {t.avatar}
                  </div>

                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 800 }}>— {t.author}</div>
                    <div style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.6)' }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Architecture Building Image Card with Neon Lime Accent */}
          <div
            style={{
              position: 'relative',
              borderRadius: '16px',
              overflow: 'hidden',
              minHeight: '380px',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7)',
              background: '#0a0a0c',
            }}
          >
            <img
              src="/assets/brutalist_architecture.jpg"
              alt="Brutalist Architecture"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />

            {/* Neon Lime Geometric Polygon Accent at Bottom Left */}
            <div
              style={{
                position: 'absolute',
                bottom: '-20px',
                left: '-20px',
                width: '140px',
                height: '140px',
                background: '#CCFF00',
                clipPath: 'polygon(0 0, 100% 100%, 0 100%)',
                opacity: 0.9,
                boxShadow: '0 0 40px rgba(204, 255, 0, 0.6)',
              }}
            />

            {/* Electric Blue Polygon Accent at Right */}
            <div
              style={{
                position: 'absolute',
                bottom: '15%',
                right: '0',
                width: '80px',
                height: '40px',
                background: '#2563EB',
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 30% 100%)',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
