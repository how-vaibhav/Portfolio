import React from 'react';
import './dev.css';

const TIMELINE = [
  {
    year: '2021',
    role: 'Started Journey',
    desc: 'Self-taught developer building web applications, responsive components, and UI solutions.',
  },
  {
    year: '2022',
    role: 'Freelance Developer',
    desc: 'Delivered web projects and client portfolios with performance optimization and clean code.',
  },
  {
    year: '2023',
    role: 'Systems & Security',
    desc: 'Engineered Python forensic analyzers, Shannon entropy engines, and database systems.',
  },
  {
    year: '2024',
    role: 'Full-Stack Architect',
    desc: 'Architected enterprise platforms (eMineral Pass, GovAid) with QR verification and encryption.',
  },
  {
    year: '2025+',
    role: 'Independent Creator',
    desc: 'Building scalable products, interactive web applications, and helping modern brands grow.',
  },
];

export default function DevExperience() {
  return (
    <section
      id="experience"
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
            marginBottom: '36px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            paddingBottom: '16px',
          }}
        >
          EXPERIENCE
        </div>

        {/* Timeline Grid + 5+ Years Badge Box */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px',
            alignItems: 'center',
          }}
        >
          {/* Left: Horizontal Connected Timeline */}
          <div style={{ position: 'relative', padding: '10px 0' }}>
            {/* Glowing Lime Horizontal Timeline Line */}
            <div
              style={{
                position: 'absolute',
                top: '18px',
                left: '12px',
                right: '12px',
                height: '2px',
                background: 'linear-gradient(90deg, #CCFF00 0%, #2A5CFF 100%)',
                zIndex: 0,
                opacity: 0.8,
              }}
            />

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '16px',
                position: 'relative',
                zIndex: 1,
              }}
            >
              {TIMELINE.map((item, index) => (
                <div key={item.year} style={{ display: 'flex', flexDirection: 'column' }}>
                  {/* Glowing Node Dot */}
                  <div
                    style={{
                      width: '14px',
                      height: '14px',
                      borderRadius: '50%',
                      background: index === TIMELINE.length - 1 ? '#2A5CFF' : '#CCFF00',
                      boxShadow: index === TIMELINE.length - 1
                        ? '0 0 14px #2A5CFF'
                        : '0 0 14px #CCFF00',
                      border: '3px solid #080808',
                      marginBottom: '16px',
                    }}
                  />

                  {/* Year */}
                  <span
                    style={{
                      fontSize: '18px',
                      fontWeight: 900,
                      color: '#ffffff',
                      letterSpacing: '-0.02em',
                      marginBottom: '4px',
                    }}
                  >
                    {item.year}
                  </span>

                  {/* Role Title */}
                  <h4
                    style={{
                      fontSize: '12px',
                      fontWeight: 800,
                      color: index === TIMELINE.length - 1 ? '#2A5CFF' : '#CCFF00',
                      textTransform: 'uppercase',
                      margin: '0 0 8px 0',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {item.role}
                  </h4>

                  {/* Description */}
                  <p
                    style={{
                      fontSize: '11px',
                      color: 'rgba(255, 255, 255, 0.6)',
                      lineHeight: 1.5,
                      margin: 0,
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Giant 5+ Years Highlight Card */}
          <div
            style={{
              background: '#CCFF00',
              color: '#000000',
              borderRadius: '16px',
              padding: 'clamp(28px, 4vw, 44px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
              position: 'relative',
              overflow: 'hidden',
              clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 32px), calc(100% - 32px) 100%, 0 100%)',
              boxShadow: '0 20px 50px rgba(204, 255, 0, 0.25)',
              minHeight: '220px',
            }}
          >
            {/* Giant 5+ */}
            <div
              style={{
                fontSize: 'clamp(64px, 8vw, 96px)',
                fontWeight: 900,
                lineHeight: 0.85,
                letterSpacing: '-0.05em',
                marginBottom: '14px',
              }}
            >
              5+
            </div>

            {/* Badge Text */}
            <div
              style={{
                fontSize: '12px',
                fontWeight: 900,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                lineHeight: 1.35,
                maxWidth: '240px',
              }}
            >
              YEARS OF EXPERIENCE CONTINUOUSLY LEARNING & BUILDING
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
