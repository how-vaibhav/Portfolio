import React, { useState } from 'react';
import { motion } from 'motion/react';
import useResponsive from './useResponsive';
import './dev.css';

export default function DevContactCta() {
  const [emailHovered, setEmailHovered] = useState(false);
  const [phoneHovered, setPhoneHovered] = useState(false);
  const { isMobile, isTablet } = useResponsive();

  return (
    <footer
      id="contact"
      style={{
        background: '#080808',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        paddingTop: isMobile ? '50px' : '80px',
        paddingBottom: isMobile ? '24px' : '40px',
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
            gridTemplateColumns: (isMobile || isTablet) ? '1fr' : '1fr 1fr',
            gap: isMobile ? '32px' : '48px',
            alignItems: 'center',
            marginBottom: isMobile ? '40px' : '72px',
          }}
        >
          {/* Left: Massive Typography + Availability Pill */}
          <div>
            <h2
              style={{
                fontFamily: "'Archivo Black', 'Inter', sans-serif",
                fontSize: isMobile ? 'clamp(36px, 10vw, 44px)' : 'clamp(44px, 6vw, 76px)',
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
                fontSize: isMobile ? '10px' : '12px',
                fontWeight: 700,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                color: '#ffffff',
                lineHeight: 1.4,
              }}
            >
              <span style={{ color: '#CCFF00', fontWeight: 900 }}>➔</span>
              I'M AVAILABLE FOR FREELANCE & FULL-TIME PROJECTS
            </div>
          </div>

          {/* Right: Neo-Brutalist Contact Hub */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: '#0a0a0c',
              border: '2px solid rgba(255,255,255,0.1)',
              borderTop: '3px solid #CCFF00',
              borderRadius: '2px',
              overflow: 'hidden',
              boxShadow: '7px 7px 0px rgba(204,255,0,0.2)',
              position: 'relative',
              width: '100%',
            }}
          >
            {/* Header */}
            <div style={{
              padding: '22px 28px 18px',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px',
            }}>
              <div>
                <div style={{
                  fontSize: '9px', fontWeight: 900, letterSpacing: '0.22em',
                  textTransform: 'uppercase', color: '#CCFF00', marginBottom: '8px',
                  display: 'flex', alignItems: 'center', gap: '8px',
                }}>
                  <span style={{ width: 18, height: 2, background: '#CCFF00', display: 'inline-block', flexShrink: 0 }} />
                  DIRECT COMMUNICATION
                </div>
              </div>


            </div>

            {/* Email row */}
            <motion.a
              href="mailto:howvaibhav@gmail.com?subject=Project%20Inquiry%20%2F%20Collaboration"
              className="dev-contact-row"
              onMouseEnter={() => setEmailHovered(true)}
              onMouseLeave={() => setEmailHovered(false)}
              whileHover={{ x: 3 }}
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                flexWrap: isMobile ? 'wrap' : 'nowrap',
                gap: isMobile ? '14px' : '12px',
                padding: '20px 28px',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                textDecoration: 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                <motion.div
                  whileHover={{ scale: 1.08, rotate: -4 }}
                  style={{
                    width: '44px', height: '44px', flexShrink: 0,
                    background: emailHovered ? 'rgba(204,255,0,0.15)' : 'rgba(204,255,0,0.07)',
                    border: `2px solid ${emailHovered ? '#CCFF00' : 'rgba(204,255,0,0.25)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '18px', transition: 'all 0.25s ease',
                  }}
                >✉</motion.div>
                <div>
                  <div style={{
                    fontSize: '9px', fontWeight: 900, letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: emailHovered ? '#CCFF00' : 'rgba(255,255,255,0.3)',
                    marginBottom: '5px', transition: 'color 0.25s ease',
                  }}>EMAIL ADDRESS</div>
                  <div style={{
                    fontFamily: "'Archivo Black', sans-serif",
                    fontSize: isMobile ? '12px' : '14px', fontWeight: 900,
                    color: '#ffffff', letterSpacing: '-0.02em',
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '210px',
                  }}>howvaibhav@gmail.com</div>
                </div>
              </div>
              <motion.div
                whileHover={{ scale: 1.04 }}
                style={{
                  fontSize: '10px', fontWeight: 900, letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: emailHovered ? '#080808' : '#CCFF00',
                  background: emailHovered ? '#CCFF00' : 'transparent',
                  padding: '9px 16px',
                  border: '2px solid #CCFF00',
                  transition: 'all 0.22s ease', flexShrink: 0,
                  cursor: 'pointer',
                }}
              >COMPOSE ↗</motion.div>
            </motion.a>

            {/* Phone row */}
            <motion.a
              href="tel:+916387636285"
              className="dev-contact-row dev-contact-row--blue"
              onMouseEnter={() => setPhoneHovered(true)}
              onMouseLeave={() => setPhoneHovered(false)}
              whileHover={{ x: 3 }}
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                flexWrap: isMobile ? 'wrap' : 'nowrap',
                gap: isMobile ? '14px' : '12px',
                padding: '20px 28px',
                textDecoration: 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                <motion.div
                  whileHover={{ scale: 1.08, rotate: 4 }}
                  style={{
                    width: '44px', height: '44px', flexShrink: 0,
                    background: phoneHovered ? 'rgba(37,85,255,0.2)' : 'rgba(37,85,255,0.07)',
                    border: `2px solid ${phoneHovered ? '#2555FF' : 'rgba(37,85,255,0.3)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '18px', transition: 'all 0.25s ease',
                  }}
                >📞</motion.div>
                <div>
                  <div style={{
                    fontSize: '9px', fontWeight: 900, letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: phoneHovered ? '#2555FF' : 'rgba(255,255,255,0.3)',
                    marginBottom: '5px', transition: 'color 0.25s ease',
                  }}>DIRECT PHONE / CALL</div>
                  <div style={{
                    fontFamily: "'Archivo Black', sans-serif",
                    fontSize: '14px', fontWeight: 900,
                    color: '#ffffff', letterSpacing: '-0.02em',
                  }}>+91 6387636285</div>
                </div>
              </div>
              <motion.div
                whileHover={{ scale: 1.04 }}
                style={{
                  fontSize: '10px', fontWeight: 900, letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: phoneHovered ? '#ffffff' : '#2555FF',
                  background: phoneHovered ? '#2555FF' : 'transparent',
                  padding: '9px 16px',
                  border: '2px solid #2555FF',
                  transition: 'all 0.22s ease', flexShrink: 0,
                  cursor: 'pointer',
                }}
              >CALL DIRECT ↗</motion.div>
            </motion.a>

          </motion.div>
        </div>

        {/* Bottom Bar: Social Links */}
        <div
          style={{
            display: 'flex',
            justifyContent: isMobile ? 'center' : 'space-between',
            alignItems: 'center',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '24px',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          {/* Brand — intentionally blank */}
          {!isMobile && <div style={{ width: '80px' }} />}

          {/* Social Icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '12px' : '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
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
