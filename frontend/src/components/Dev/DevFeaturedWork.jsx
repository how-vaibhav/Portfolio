import React from 'react';
import './dev.css';

const FEATURED_PROJECTS = [
  {
    id: 'emineral',
    title: 'eMINERAL',
    displayTitle: 'SPARK / eMINERAL',
    subtitle: 'SaaS Platform',
    bg: '#2563EB',
    textColor: '#ffffff',
    tagBg: '#000000',
    tagText: '#ffffff',
    image: '/assets/card_blue_saas.jpg',
    url: 'https://www.mineraltrack.shop/',
    desc: 'Gov-compliant mineral transport permit authorization with QR verification.',
  },
  {
    id: 'govaid',
    title: 'GOVAID',
    displayTitle: 'NEXORA / GOVAID',
    subtitle: 'GovTech Portal',
    bg: '#141416',
    textColor: '#ffffff',
    tagBg: 'rgba(255,255,255,0.1)',
    tagText: '#ffffff',
    image: '/assets/card_mono_curve.jpg',
    url: 'https://govaid-5n3k.onrender.com/',
    desc: 'Centralized welfare scheme evaluation engine with Fernet encryption.',
  },
  {
    id: 'logdetector',
    title: 'LOG DETECT',
    displayTitle: 'VELOCE / LOG DETECTOR',
    subtitle: 'Security & Forensics',
    bg: '#0F0F12',
    textColor: '#ffffff',
    tagBg: 'rgba(255,255,255,0.1)',
    tagText: '#ffffff',
    image: '/assets/card_white_shoe.jpg',
    url: '#case-studies',
    desc: 'Multiprocessed security log analyzer with Shannon entropy & Kill-Chain.',
  },
  {
    id: 'canvas',
    title: 'OUTLIER',
    displayTitle: 'OUTLIER / CANVAS',
    subtitle: 'Interactive Engine',
    bg: '#CCFF00',
    textColor: '#000000',
    tagBg: '#000000',
    tagText: '#CCFF00',
    image: null,
    metric: '↑ 240%',
    url: '/design',
    desc: 'Hardware-accelerated 60fps frame scrubbing canvas engine.',
  },
];

export default function DevFeaturedWork() {
  return (
    <section
      id="work"
      style={{
        paddingTop: '60px',
        paddingBottom: '80px',
        paddingLeft: 'clamp(20px, 4.5vw, 64px)',
        paddingRight: 'clamp(20px, 4.5vw, 64px)',
        background: '#080808',
      }}
    >
      <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '28px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            paddingBottom: '16px',
          }}
        >
          <span
            style={{
              fontSize: '12px',
              fontWeight: 800,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#ffffff',
            }}
          >
            FEATURED WORK
          </span>

          <a
            href="#case-studies"
            style={{
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#CCFF00',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            SEE ALL PROJECTS ↗
          </a>
        </div>

        {/* 4 Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '20px',
          }}
        >
          {FEATURED_PROJECTS.map((p) => {
            const isOutlier = p.id === 'canvas';

            return (
              <a
                key={p.id}
                href={p.url}
                target={p.url.startsWith('http') ? '_blank' : '_self'}
                rel="noopener noreferrer"
                className="dev-hover-card"
                style={{
                  background: p.bg,
                  color: p.textColor,
                  borderRadius: '12px',
                  padding: '24px',
                  minHeight: '340px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  textDecoration: 'none',
                  position: 'relative',
                  overflow: 'hidden',
                  border: isOutlier ? 'none' : '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: isOutlier
                    ? '0 12px 30px rgba(204, 255, 0, 0.25)'
                    : '0 12px 30px rgba(0, 0, 0, 0.5)',
                }}
              >
                {/* Card Title */}
                <div>
                  <h3
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '28px',
                      fontWeight: 900,
                      letterSpacing: '-0.04em',
                      textTransform: 'uppercase',
                      margin: 0,
                      color: p.textColor,
                    }}
                  >
                    {p.title}
                  </h3>
                </div>

                {/* Center Image or Metric Graphic */}
                <div
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '16px 0',
                    position: 'relative',
                  }}
                >
                  {p.image ? (
                    <div
                      style={{
                        width: '100%',
                        height: '140px',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        position: 'relative',
                        background: '#000000',
                      }}
                    >
                      <img
                        src={p.image}
                        alt={p.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                          transition: 'transform 0.4s ease',
                        }}
                      />
                    </div>
                  ) : (
                    /* Neon Outlier Metric Card */
                    <div
                      style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        gap: '12px',
                      }}
                    >
                      {/* Metric Pill */}
                      <div
                        style={{
                          background: '#000000',
                          color: '#CCFF00',
                          fontWeight: 900,
                          fontSize: '18px',
                          padding: '6px 14px',
                          borderRadius: '6px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                        }}
                      >
                        {p.metric}
                      </div>

                      {/* Geometric Blocks */}
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(4, 1fr)',
                          gap: '4px',
                          width: '100%',
                        }}
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                          <div
                            key={n}
                            style={{
                              height: '14px',
                              background: n > 5 ? 'rgba(0,0,0,0.15)' : '#000000',
                              borderRadius: '2px',
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Row Tag & Arrow */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderTop: isOutlier
                      ? '1px solid rgba(0,0,0,0.15)'
                      : '1px solid rgba(255,255,255,0.12)',
                    paddingTop: '14px',
                  }}
                >
                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                      color: isOutlier ? '#000000' : 'rgba(255,255,255,0.7)',
                    }}
                  >
                    {p.subtitle}
                  </span>

                  <span
                    style={{
                      fontSize: '14px',
                      fontWeight: 900,
                      color: isOutlier ? '#000000' : '#ffffff',
                    }}
                  >
                    ↗
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
