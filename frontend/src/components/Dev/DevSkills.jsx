import React from 'react';
import './dev.css';
import { useReveal } from './useReveal';

const SKILL_CATEGORIES = [
  {
    title: 'Frontend',
    color: '#58a6ff',
    skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'TailwindCSS', 'Framer Motion', 'HTML5', 'CSS3'],
  },
  {
    title: 'Backend',
    color: '#3fb950',
    skills: ['Node.js', 'Express.js', 'Python', 'Django', 'REST APIs', 'JWT Auth', 'Next.js API Routes'],
  },
  {
    title: 'Databases',
    color: '#d2a8ff',
    skills: ['PostgreSQL', 'Supabase', 'SQLite', 'MongoDB', 'SQL', 'ORM / Prisma'],
  },
  {
    title: 'Tools & DevOps',
    color: '#ffa657',
    skills: ['Git', 'GitHub', 'Vercel', 'Render', 'Docker (basics)', 'Vite', 'npm / pipx', 'Linux CLI'],
  },
  {
    title: 'Languages',
    color: '#E84419',
    skills: ['JavaScript', 'TypeScript', 'Python', 'C++', 'SQL', 'Bash'],
  },
];

const MARQUEE_SKILLS = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'Django',
  'PostgreSQL', 'Supabase', 'TailwindCSS', 'Framer Motion', 'Git', 'Vercel',
  'MongoDB', 'REST APIs', 'JWT', 'C++', 'Express', 'SQLite', 'Docker',
  'React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'Django',
  'PostgreSQL', 'Supabase', 'TailwindCSS', 'Framer Motion', 'Git', 'Vercel',
  'MongoDB', 'REST APIs', 'JWT', 'C++', 'Express', 'SQLite', 'Docker',
];

export default function DevSkills() {
  const ref = useReveal();

  return (
    <section
      id="dev-skills"
      ref={ref}
      style={{
        padding: 'clamp(80px, 10vw, 140px) 0',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      {/* Section header */}
      <div style={{
        padding: '0 clamp(24px, 5vw, 80px)',
        maxWidth: '1440px',
        margin: '0 auto',
        marginBottom: '64px',
        boxSizing: 'border-box',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '16px' }}>
          <span className="dev-section-accent dev-reveal" style={{ fontSize: 'clamp(48px,8vw,90px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1 }}>
            02
          </span>
          <div className="dev-divider-line" style={{ height: '1px', flex: 1, background: 'rgba(255,255,255,0.1)' }} />
        </div>
        <h2 className="dev-reveal dev-d1" style={{ fontSize: 'clamp(28px,5vw,52px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff' }}>
          SKILLS &amp; TECHNOLOGIES
        </h2>
      </div>

      {/* Marquee strip */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '18px 0',
        background: 'rgba(255,255,255,0.02)',
        overflow: 'hidden',
        marginBottom: '70px',
        position: 'relative',
      }}>
        {/* Edge fade masks */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
          background: 'linear-gradient(to right, #050A0F 0%, transparent 8%, transparent 92%, #050A0F 100%)',
        }} />
        <div className="dev-marquee-track">
          {MARQUEE_SKILLS.map((skill, i) => (
            <span key={i} style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '14px',
              padding: '0 28px',
              fontSize: '14px',
              fontWeight: 600,
              color: 'rgba(255,255,255,0.5)',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}>
              <span style={{ color: 'rgba(232,68,25,0.6)', fontSize: '16px' }}>✦</span>
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Skill categories grid */}
      <div style={{
        padding: '0 clamp(24px, 5vw, 80px)',
        maxWidth: '1440px',
        margin: '0 auto',
        boxSizing: 'border-box',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '20px',
        }}>
          {SKILL_CATEGORIES.map((cat, ci) => (
            <div
              key={cat.title}
              className={`dev-reveal dev-d${ci + 2}`}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '14px',
                padding: '24px',
                transition: 'border-color 0.3s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${cat.color}40`; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
            >
              {/* Category header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '16px',
              }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: cat.color, flexShrink: 0 }} />
                <span style={{ fontSize: '11px', fontWeight: 700, color: cat.color, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  {cat.title}
                </span>
              </div>

              {/* Skills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="dev-skill-tag"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '6px',
                      padding: '5px 10px',
                      fontSize: '12px',
                      fontWeight: 500,
                      color: 'rgba(255,255,255,0.7)',
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
