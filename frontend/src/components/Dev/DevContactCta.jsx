import React, { useState, useEffect } from 'react';
import './dev.css';

export default function DevContactCta() {
  const [emailHovered, setEmailHovered] = useState(false);
  const [phoneHovered, setPhoneHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 860);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <footer
      id="contact"
      style={{
        background: '#080808',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        paddingTop: '80px',
        paddingBottom: '40px',
        paddingLeft: 'clamp(20px, 4.5vw, 64px)',
        paddingRight: 'clamp(20px, 4.5vw, 64px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient glow accent — GPU composited, no JS */}
      <div style={{
        position: 'absolute', bottom: 0, right: 0,
        width: '50%', height: '60%',
        background: 'radial-gradient(ellipse at 80% 80%, rgba(37,85,255,0.12) 0%, transparent 65%)',
        pointerEvents: 'none', zIndex: 0,
      }} />
      <div style={{
        position: 'absolute', top: 0, left: 0,
        width: '40%', height: '50%',
        background: 'radial-gradient(ellipse at 20% 20%, rgba(204,255,0,0.07) 0%, transparent 65%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      <div style={{ maxWidth: '1360px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        {/* Main CTA 2-Column Row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '48px',
            alignItems: 'center',
            marginBottom: '72px',
          }}
        >
          {/* Left: Massive Typography + Availability Pill */}
          <div>
            <h2
              style={{
                fontFamily: "'Archivo Black', 'Inter', sans-serif",
                fontSize: 'clamp(44px, 6vw, 76px)',
                fontWeight: 900,
                lineHeight: 0.95,
                letterSpacing: '-0.045em',
                textTransform: 'uppercase',
                margin: '0 0 24px 0',
              }}
            >
              <span style={{ color: '#ffffff', display: 'block' }}>LET'S BUILD</span>
              <span style={{ color: '#CCFF00', display: 'block' }}>SOMETHING</span>
              <span style={{ color: '#CCFF00', display: 'block' }}>GREAT TOGETHER.</span>
            </h2>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                borderRadius: '4px',
                background: '#121214',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                color: '#ffffff',
              }}
            >
              <span style={{ color: '#CCFF00', fontWeight: 900 }}>➔</span>
              I'M AVAILABLE FOR FREELANCE & FULL-TIME PROJECTS
            </div>
          </div>

          {/* Right: Premium Contact Hub */}
          <div
            style={{
              background: 'linear-gradient(145deg, #0e0e14 0%, #0a0a10 100%)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '20px',
              padding: 'clamp(24px, 3.5vw, 38px)',
              display: 'flex',
              flexDirection: 'column',
              gap: '18px',
              boxShadow: '0 24px 80px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.06)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Corner glow */}
            <div style={{
              position: 'absolute', top: 0, right: 0,
              width: '180px', height: '180px',
              background: 'radial-gradient(circle at top right, rgba(37,85,255,0.18), transparent 70%)',
              pointerEvents: 'none',
            }} />
            <div style={{
              position: 'absolute', bottom: 0, left: 0,
              width: '120px', height: '120px',
              background: 'radial-gradient(circle at bottom left, rgba(204,255,0,0.08), transparent 70%)',
              pointerEvents: 'none',
            }} />

            {/* Header */}
            <div style={{
              borderBottom: '1px solid rgba(255,255,255,0.07)',
              paddingBottom: '16px',
              display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
            }}>
              <div>
                <div style={{
                  fontSize: '10px', fontWeight: 900, letterSpacing: '0.18em',
                  textTransform: 'uppercase', color: '#CCFF00', marginBottom: '6px',
                  display: 'flex', alignItems: 'center', gap: '7px',
                }}>
                  <span style={{ width: 14, height: 1.5, background: '#CCFF00', display: 'inline-block' }} />
                  DIRECT COMMUNICATION
                </div>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.38)', margin: 0, lineHeight: 1.5 }}>
                  Architectural consultations, client projects, full-stack engineering.
                </p>
              </div>
              {/* Live indicator */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)',
                padding: '4px 10px', borderRadius: '20px', flexShrink: 0,
              }}>
                <span style={{
                  width: 6, height: 6, borderRadius: '50%', background: '#22C55E',
                  display: 'inline-block',
                  boxShadow: '0 0 0 0 rgba(34,197,94,0.6)',
                  animation: 'devPulse 2s ease-in-out infinite',
                }} />
                <span style={{ fontSize: '9px', fontWeight: 800, letterSpacing: '0.1em', color: '#22C55E' }}>ONLINE</span>
              </div>
            </div>

            {/* Email card */}
            <a
              href="mailto:vaibhav10505@gmail.com?subject=Project%20Inquiry%20%2F%20Collaboration"
              onMouseEnter={() => setEmailHovered(true)}
              onMouseLeave={() => setEmailHovered(false)}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                flexWrap: isMobile ? 'wrap' : 'nowrap',
                gap: isMobile ? '14px' : '0',
                padding: '18px 20px',
                background: emailHovered
                  ? 'linear-gradient(135deg, rgba(204,255,0,0.08), rgba(204,255,0,0.03))'
                  : 'rgba(255,255,255,0.03)',
                border: emailHovered ? '1px solid rgba(204,255,0,0.4)' : '1px solid rgba(255,255,255,0.07)',
                borderRadius: '14px',
                textDecoration: 'none',
                boxShadow: emailHovered ? '0 8px 32px rgba(204,255,0,0.12), inset 0 1px 0 rgba(204,255,0,0.1)' : 'none',
                transform: emailHovered ? 'translateY(-3px)' : 'translateY(0)',
                transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                position: 'relative', overflow: 'hidden',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '46px', height: '46px', borderRadius: '12px', flexShrink: 0,
                  background: emailHovered ? 'rgba(204,255,0,0.18)' : 'rgba(204,255,0,0.08)',
                  border: `1px solid ${emailHovered ? 'rgba(204,255,0,0.5)' : 'rgba(204,255,0,0.2)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '20px', transition: 'all 0.3s ease',
                  boxShadow: emailHovered ? '0 0 20px rgba(204,255,0,0.2)' : 'none',
                }}>
                  ✉
                </div>
                <div>
                  <div style={{
                    fontSize: '10px', fontWeight: 800, letterSpacing: '0.1em',
                    textTransform: 'uppercase', color: 'rgba(255,255,255,0.38)', marginBottom: '4px',
                  }}>EMAIL ADDRESS</div>
                  <div style={{
                    fontSize: '14px', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.01em',
                  }}>vaibhav10505@gmail.com</div>
                </div>
              </div>
              <div style={{
                fontSize: '10px', fontWeight: 900, letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: emailHovered ? '#000' : '#CCFF00',
                background: emailHovered ? '#CCFF00' : 'rgba(204,255,0,0.1)',
                padding: '7px 14px', borderRadius: '8px',
                border: '1px solid rgba(204,255,0,0.3)',
                transition: 'all 0.25s ease', flexShrink: 0,
                boxShadow: emailHovered ? '0 4px 16px rgba(204,255,0,0.3)' : 'none',
              }}>COMPOSE ↗</div>
            </a>

            {/* Phone card */}
            <a
              href="tel:+916387636285"
              onMouseEnter={() => setPhoneHovered(true)}
              onMouseLeave={() => setPhoneHovered(false)}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                flexWrap: isMobile ? 'wrap' : 'nowrap',
                gap: isMobile ? '14px' : '0',
                padding: '18px 20px',
                background: phoneHovered
                  ? 'linear-gradient(135deg, rgba(37,85,255,0.1), rgba(37,85,255,0.04))'
                  : 'rgba(255,255,255,0.03)',
                border: phoneHovered ? '1px solid rgba(37,85,255,0.45)' : '1px solid rgba(255,255,255,0.07)',
                borderRadius: '14px',
                textDecoration: 'none',
                boxShadow: phoneHovered ? '0 8px 32px rgba(37,85,255,0.15), inset 0 1px 0 rgba(37,85,255,0.1)' : 'none',
                transform: phoneHovered ? 'translateY(-3px)' : 'translateY(0)',
                transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '46px', height: '46px', borderRadius: '12px', flexShrink: 0,
                  background: phoneHovered ? 'rgba(37,85,255,0.2)' : 'rgba(37,85,255,0.08)',
                  border: `1px solid ${phoneHovered ? 'rgba(37,85,255,0.55)' : 'rgba(37,85,255,0.25)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '20px', transition: 'all 0.3s ease',
                  boxShadow: phoneHovered ? '0 0 20px rgba(37,85,255,0.25)' : 'none',
                }}>📞</div>
                <div>
                  <div style={{
                    fontSize: '10px', fontWeight: 800, letterSpacing: '0.1em',
                    textTransform: 'uppercase', color: 'rgba(255,255,255,0.38)', marginBottom: '4px',
                  }}>DIRECT PHONE / CALL</div>
                  <div style={{
                    fontSize: '14px', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.01em',
                  }}>+91 6387636285</div>
                </div>
              </div>
              <div style={{
                fontSize: '10px', fontWeight: 900, letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: phoneHovered ? '#fff' : '#2555FF',
                background: phoneHovered ? '#2555FF' : 'rgba(37,85,255,0.1)',
                padding: '7px 14px', borderRadius: '8px',
                border: '1px solid rgba(37,85,255,0.35)',
                transition: 'all 0.25s ease', flexShrink: 0,
                boxShadow: phoneHovered ? '0 4px 16px rgba(37,85,255,0.35)' : 'none',
              }}>CALL DIRECT ↗</div>
            </a>

          </div>
        </div>

        {/* Bottom Bar: Social Links */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '24px',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          {/* Brand — intentionally blank */}
          <div style={{ width: '80px' }} />

          {/* Social Icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {[
              { 
                label: 'GitHub', 
                href: 'https://github.com/how-vaibhav', 
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.15-.38 6.5-1.4 6.5-7.17 0-1.56-.5-2.8-1.5-3.8.16-.38.65-1.8-.15-3.8 0 0-1.2-.4-3.9 1.4a13.4 13.4 0 0 0-7 0c-2.7-1.8-3.9-1.4-3.9-1.4-.8 2-.3 3.4-.1 3.8-1 1-1.5 2.24-1.5 3.8 0 5.75 3.35 6.78 6.5 7.16A4.8 4.8 0 0 0 8 18v4" />
                  </svg>
                )
              },
              { 
                label: 'YouTube', 
                href: 'https://www.youtube.com/@how-vaibhav', 
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                    <path d="m10 15 5-3-5-3z" />
                  </svg>
                )
              },
              { 
                label: 'LinkedIn', 
                href: 'https://www.linkedin.com/in/how-vaibhav/', 
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                )
              },
              { 
                label: 'Instagram', 
                href: 'https://www.instagram.com/how_vaibhav/', 
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16.11 7.5v.01" />
                    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                  </svg>
                )
              },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : '_self'}
                rel="noopener noreferrer"
                style={{
                  color: 'rgba(255, 255, 255, 0.6)',
                  fontSize: '14px',
                  fontWeight: 900,
                  letterSpacing: '0.05em',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '36px',
                  height: '36px',
                  borderRadius: '6px',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#080808';
                  e.currentTarget.style.background = '#CCFF00';
                  e.currentTarget.style.borderColor = '#CCFF00';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)';
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
