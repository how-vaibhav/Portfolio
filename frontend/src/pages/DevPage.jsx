import React, { useEffect, useRef } from 'react';
import { DevNavbar } from '../components/Navbar/Navbar';

/* ─── Terminal typing animation ─────────────────────── */
const LINES = [
  { prefix: '$ ', text: 'whoami', delay: 0, color: '#7dd3fc' },
  { prefix: '  ', text: 'Vaibhav — Full-Stack Developer & CS Student', delay: 700, color: 'rgba(255,255,255,0.75)' },
  { prefix: '$ ', text: 'ls ./skills', delay: 1500, color: '#7dd3fc' },
  { prefix: '  ', text: 'React  Next.js  Node.js  Python  TypeScript  C++', delay: 2200, color: '#86efac' },
  { prefix: '$ ', text: 'cat ./status.md', delay: 3000, color: '#7dd3fc' },
  { prefix: '  ', text: 'Open to freelance projects & collaborations ✓', delay: 3700, color: '#fde68a' },
];

function TerminalLine({ prefix, text, delay, color }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = '0';
    const t = setTimeout(() => {
      el.style.transition = 'opacity 0.4s ease';
      el.style.opacity = '1';
    }, delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div ref={ref} style={{ display: 'flex', gap: '8px', lineHeight: 1.7 }}>
      <span style={{ color: '#E84419', fontWeight: 700, flexShrink: 0 }}>{prefix}</span>
      <span style={{ color }}>{text}</span>
    </div>
  );
}

/* ─── Floating tech badges ────────────────────────────── */
const TECHS = [
  { label: 'React', x: '8%', y: '22%', delay: '0s' },
  { label: 'Node.js', x: '82%', y: '18%', delay: '0.4s' },
  { label: 'TypeScript', x: '75%', y: '60%', delay: '0.8s' },
  { label: 'Python', x: '10%', y: '68%', delay: '1.2s' },
  { label: 'Next.js', x: '88%', y: '80%', delay: '0.2s' },
  { label: 'C++', x: '5%', y: '88%', delay: '1s' },
];

/* ─── Main Page ─────────────────────────────────────── */
export default function DevPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#050A0F',
      color: '#fff',
      fontFamily: "'Inter', system-ui, sans-serif",
      overflowX: 'hidden',
      position: 'relative',
    }}>
      {/* Subtle grid background */}
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        zIndex: 0,
        pointerEvents: 'none',
      }} />

      {/* Radial accent glow — top-left */}
      <div style={{
        position: 'fixed',
        top: '-20%',
        left: '-10%',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(232,68,25,0.12) 0%, transparent 70%)',
        zIndex: 0,
        pointerEvents: 'none',
      }} />
      {/* Radial accent glow — bottom-right */}
      <div style={{
        position: 'fixed',
        bottom: '-20%',
        right: '-10%',
        width: '700px',
        height: '700px',
        background: 'radial-gradient(circle, rgba(99,102,241,0.10) 0%, transparent 70%)',
        zIndex: 0,
        pointerEvents: 'none',
      }} />

      {/* Floating tech badges */}
      {TECHS.map(({ label, x, y, delay }) => (
        <div key={label} style={{
          position: 'fixed',
          left: x,
          top: y,
          zIndex: 1,
          pointerEvents: 'none',
          animation: `floatBadge 4s ease-in-out infinite`,
          animationDelay: delay,
          opacity: 0.18,
        }}>
          <span style={{
            padding: '5px 12px',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '999px',
            fontSize: '11px',
            fontWeight: 600,
            color: 'rgba(255,255,255,0.7)',
            letterSpacing: '0.04em',
            background: 'rgba(255,255,255,0.04)',
          }}>{label}</span>
        </div>
      ))}

      <DevNavbar />

      {/* Hero */}
      <main style={{
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '100px 24px 60px',
        textAlign: 'center',
      }}>
        {/* Status badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 16px',
          border: '1px solid rgba(134,239,172,0.3)',
          borderRadius: '999px',
          background: 'rgba(134,239,172,0.07)',
          marginBottom: '40px',
        }}>
          <span style={{
            width: '6px', height: '6px',
            borderRadius: '50%',
            background: '#86efac',
            boxShadow: '0 0 8px #86efac',
            animation: 'pulse 2s ease-in-out infinite',
            display: 'inline-block',
          }} />
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#86efac', letterSpacing: '0.05em' }}>
            Available for work
          </span>
        </div>

        {/* Main heading */}
        <h1 style={{
          fontSize: 'clamp(52px, 9vw, 130px)',
          fontWeight: 900,
          lineHeight: 0.9,
          letterSpacing: '-0.05em',
          marginBottom: '28px',
          maxWidth: '900px',
        }}>
          <span style={{ color: '#fff' }}>Building</span>
          <br />
          <span style={{
            background: 'linear-gradient(135deg, #E84419 0%, #ff8c69 50%, #E84419 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>things</span>
          <span style={{ color: '#fff' }}> that</span>
          <br />
          <span style={{ color: 'rgba(255,255,255,0.35)' }}>matter.</span>
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: 'clamp(15px, 2vw, 20px)',
          color: 'rgba(255,255,255,0.5)',
          maxWidth: '520px',
          lineHeight: 1.7,
          marginBottom: '56px',
          fontWeight: 400,
        }}>
          Full-stack developer & CS student crafting clean,
          performant web experiences from backend to pixel.
        </p>

        {/* Terminal block */}
        <div style={{
          width: '100%',
          maxWidth: '560px',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '16px',
          overflow: 'hidden',
          textAlign: 'left',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
        }}>
          {/* Terminal title bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '12px 16px',
            borderBottom: '1px solid rgba(255,255,255,0.07)',
            background: 'rgba(255,255,255,0.02)',
          }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f57' }} />
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#febc2e' }} />
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#28c840' }} />
            <span style={{
              marginLeft: '8px',
              fontSize: '11px',
              color: 'rgba(255,255,255,0.3)',
              fontFamily: 'monospace',
            }}>vaibhav@portfolio ~ </span>
          </div>

          {/* Terminal lines */}
          <div style={{
            padding: '20px 20px',
            fontFamily: "'Fira Code', 'Courier New', monospace",
            fontSize: '13px',
          }}>
            {LINES.map((line, i) => (
              <TerminalLine key={i} {...line} />
            ))}
            {/* blinking cursor */}
            <div style={{ display: 'flex', gap: '8px', marginTop: '4px', alignItems: 'center' }}>
              <span style={{ color: '#E84419', fontWeight: 700 }}>$ </span>
              <span style={{
                display: 'inline-block',
                width: '8px',
                height: '16px',
                background: 'rgba(255,255,255,0.6)',
                borderRadius: '1px',
                animation: 'blink 1s step-end infinite',
                verticalAlign: 'middle',
              }} />
            </div>
          </div>
        </div>

        {/* Hint to toggle */}
        <p style={{
          marginTop: '48px',
          fontSize: '12px',
          color: 'rgba(255,255,255,0.25)',
          letterSpacing: '0.04em',
        }}>
          Toggle <strong style={{ color: 'rgba(232,68,25,0.6)' }}>✦ Design</strong> in the navbar to explore my creative work →
        </p>
      </main>

      {/* Keyframe styles injected via style tag */}
      <style>{`
        @keyframes floatBadge {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
