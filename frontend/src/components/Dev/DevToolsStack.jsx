import React from 'react';
import './dev.css';

const TECH_STACK = [
  { name: 'HTML5', code: '5', color: '#E34F26', bg: 'rgba(227, 79, 38, 0.1)', border: 'rgba(227, 79, 38, 0.3)' },
  { name: 'CSS3', code: '3', color: '#1572B6', bg: 'rgba(21, 114, 182, 0.1)', border: 'rgba(21, 114, 182, 0.3)' },
  { name: 'JS', code: 'JS', color: '#F7DF1E', bg: 'rgba(247, 223, 30, 0.1)', border: 'rgba(247, 223, 30, 0.3)' },
  { name: 'TS', code: 'TS', color: '#3178C6', bg: 'rgba(49, 120, 198, 0.1)', border: 'rgba(49, 120, 198, 0.3)' },
  { name: 'REACT', code: '⚛', color: '#61DAFB', bg: 'rgba(97, 218, 251, 0.1)', border: 'rgba(97, 218, 251, 0.3)' },
  { name: 'NEXT.JS', code: 'N', color: '#FFFFFF', bg: 'rgba(255, 255, 255, 0.1)', border: 'rgba(255, 255, 255, 0.25)' },
  { name: 'TAILWIND', code: '≈', color: '#38B2AC', bg: 'rgba(56, 178, 172, 0.1)', border: 'rgba(56, 178, 172, 0.3)' },
  { name: 'PYTHON', code: 'Py', color: '#3776AB', bg: 'rgba(55, 118, 171, 0.1)', border: 'rgba(55, 118, 171, 0.3)' },
  { name: 'DJANGO', code: 'Dj', color: '#092E20', bg: 'rgba(9, 46, 32, 0.4)', border: 'rgba(9, 46, 32, 0.7)' },
  { name: 'FIGMA', code: '❖', color: '#F24E1E', bg: 'rgba(242, 78, 30, 0.1)', border: 'rgba(242, 78, 30, 0.3)' },
  { name: 'NODE.JS', code: '⬡', color: '#339933', bg: 'rgba(51, 153, 51, 0.1)', border: 'rgba(51, 153, 51, 0.3)' },
  { name: 'SUPABASE', code: '⚡', color: '#3ECF8E', bg: 'rgba(62, 207, 142, 0.1)', border: 'rgba(62, 207, 142, 0.3)' },
];

export default function DevToolsStack() {
  return (
    <section
      id="tools"
      style={{
        paddingTop: '40px',
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
            fontSize: '12px',
            fontWeight: 800,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#ffffff',
            marginBottom: '28px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            paddingBottom: '16px',
          }}
        >
          TOOLS & STACK
        </div>

        {/* Tools Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
            gap: '14px',
          }}
        >
          {TECH_STACK.map((t) => (
            <div
              key={t.name}
              className="dev-hover-card"
              style={{
                background: '#121214',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '8px',
                padding: '20px 12px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                textAlign: 'center',
                cursor: 'default',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = t.border;
                e.currentTarget.style.boxShadow = `0 8px 24px ${t.bg}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Colored Badge */}
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '6px',
                  background: t.bg,
                  border: `1px solid ${t.border}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '15px',
                  fontWeight: 900,
                  color: t.color,
                  fontFamily: 'monospace',
                }}
              >
                {t.code}
              </div>

              {/* Tool Name */}
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  letterSpacing: '0.04em',
                  color: 'rgba(255, 255, 255, 0.85)',
                  textTransform: 'uppercase',
                }}
              >
                {t.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
