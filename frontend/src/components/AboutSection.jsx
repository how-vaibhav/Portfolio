import React from 'react';

const ORANGE = '#E84419';

const glass = (opacity = 0.7) => ({
  background: `rgba(0,0,0,${opacity})`,
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
});

const PROJECT_CARDS = [
  {
    gradient: 'linear-gradient(145deg, #1c1c1c 0%, #2e2e2e 100%)',
    overlay: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)',
    label: 'Apparel & Fashion',
    tag: 'Brand Identity',
  },
  {
    gradient: 'linear-gradient(145deg, #141414 0%, #262626 100%)',
    overlay: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)',
    label: 'Product Design',
    tag: 'Creative Direction',
  },
  {
    gradient: 'linear-gradient(145deg, #1a1a1a 0%, #323232 100%)',
    overlay: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)',
    label: 'Packaging',
    tag: 'Brand Strategy',
  },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      style={{
        ...glass(0.7),
        padding: '88px 48px 80px',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Two column header */}
      <div
        style={{
          display: 'flex',
          gap: '48px',
          marginBottom: '72px',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
        }}
      >
        {/* Left */}
        <div style={{ flex: '1 1 420px' }}>
          <p
            style={{
              color: ORANGE,
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginBottom: '20px',
            }}
          >
            Behind the Designs
          </p>
          <h2
            style={{
              fontSize: 'clamp(38px, 5vw, 58px)',
              fontWeight: 900,
              lineHeight: 1.0,
              letterSpacing: '-0.04em',
              color: '#fff',
            }}
          >
            Shaping
            <br />
            Experiences That
            <br />
            Make Life Simpler
          </h2>
        </div>

        {/* Right */}
        <div style={{ flex: '1 1 380px', paddingTop: '32px' }}>
          <p
            style={{
              fontSize: '18px',
              fontWeight: 700,
              lineHeight: 1.55,
              color: 'rgba(255,255,255,0.9)',
              marginBottom: '28px',
              letterSpacing: '-0.02em',
            }}
          >
            I'm a product designer focused on building clean, intuitive interfaces that solve real-world problems.
          </p>

          <p
            style={{
              fontSize: '11px',
              color: 'rgba(255,255,255,0.35)',
              lineHeight: 1.8,
              marginBottom: '22px',
              letterSpacing: '0.01em',
            }}
          >
            Let's Build Something
            <br />
            Meaningful Together
          </p>

          <a
            href="#contact"
            style={{
              background: ORANGE,
              color: '#fff',
              border: 'none',
              borderRadius: '999px',
              padding: '12px 26px',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '9px',
              letterSpacing: '-0.01em',
              textDecoration: 'none',
              transition: 'opacity 0.2s, transform 0.15s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.87';
              e.currentTarget.style.transform = 'scale(1.03)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            Get in touch
            <span
              style={{
                background: 'rgba(255,255,255,0.22)',
                borderRadius: '50%',
                width: '22px',
                height: '22px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '13px',
              }}
            >
              →
            </span>
          </a>
        </div>
      </div>

      {/* Project image cards */}
      <div
        id="projects"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '14px',
        }}
      >
        {PROJECT_CARDS.map((card) => (
          <div
            key={card.label}
            style={{
              height: '300px',
              borderRadius: '18px',
              background: card.gradient,
              border: '1px solid rgba(255,255,255,0.07)',
              overflow: 'hidden',
              position: 'relative',
              cursor: 'pointer',
              transition: 'transform 0.3s ease, border-color 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
            }}
          >
            {/* Gradient overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: card.overlay,
              }}
            />

            {/* Card footer */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '20px 22px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
              }}
            >
              <p
                style={{
                  fontSize: '15px',
                  fontWeight: 700,
                  color: '#fff',
                  letterSpacing: '-0.02em',
                }}
              >
                {card.label}
              </p>
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: 600,
                  color: ORANGE,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}
              >
                {card.tag}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
