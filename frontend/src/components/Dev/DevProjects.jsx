import React, { useState } from 'react';
import './dev.css';
import { useReveal } from './useReveal';

const PROJECTS = [
  {
    id: 1,
    num: '01',
    title: 'eMineral Pass',
    subtitle: 'Digital Mineral Transportation Authorization System',
    description:
      'Production government-compliance platform for mineral transport authorization in Uttar Pradesh. QR-based verification, multilingual PDF generation (English + Devanagari Hindi), role-based auth, and real-time pass tracking. Delivered as a freelance engagement — live in production.',
    tags: ['Next.js 16', 'TypeScript', 'Supabase', 'PostgreSQL', 'Framer Motion', 'TailwindCSS'],
    status: 'Production',
    statusColor: '#3fb950',
    year: '2026',
    liveUrl: 'https://www.mineraltrack.shop/',
    featured: true,
    image: '/assets/education-work.jpg',
    role: 'Full-Stack Developer & Designer (Freelance)',
    highlight: 'Government-compliant QR + PDF system',
  },
  {
    id: 2,
    num: '02',
    title: 'GovAid',
    subtitle: 'Government Schemes Portal — Sikkim',
    description:
      'Production-grade Django platform centralizing government welfare scheme discovery, eligibility evaluation, and application submission for Sikkim citizens. Aadhaar inputs Fernet-encrypted at field level. Role-based workflows for citizens, employees, and admins.',
    tags: ['Python', 'Django 5.2', 'TailwindCSS', 'SQLite', 'Fernet Encryption'],
    status: 'Live',
    statusColor: '#3fb950',
    year: '2025',
    liveUrl: 'https://govaid-5n3k.onrender.com/',
    featured: false,
    image: '/assets/education-lifestyle.jpg',
    role: 'Co-Developer',
    highlight: 'Aadhaar encryption + eligibility engine',
  },
  {
    id: 3,
    num: '03',
    title: 'LOG Detector',
    subtitle: 'Security Log Forensics CLI Tool',
    description:
      'Blazing-fast multiprocessed security log analyzer. Uses Shannon Entropy calculations, Kill-Chain correlation, and Distributed Attack Detection to instantly calculate system compromise probability. Generates HTML dashboards, CSV matrices, and JSON forensic reports.',
    tags: ['Python 3.8+', 'Multiprocessing', 'Shannon Entropy', 'Rich CLI', 'Flask', 'React'],
    status: 'Open Source',
    statusColor: '#d2a8ff',
    year: '2025',
    liveUrl: null,
    featured: false,
    image: '/assets/intro-portrait.jpg',
    role: 'Co-Developer',
    highlight: 'Kill-Chain + distributed attack detection',
  },
];

function FeaturedCard({ project }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="dev-project-card dev-reveal"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '20px',
        overflow: 'hidden',
        background: '#0D1117',
        marginBottom: '20px',
        cursor: 'default',
      }}
    >
      {/* Image side */}
      <div className="dev-img-wrap" style={{ position: 'relative', minHeight: '340px' }}>
        <img
          src={project.image}
          alt={project.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            minHeight: '340px',
          }}
        />
        {/* Dark overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(5,10,15,0.7) 0%, rgba(5,10,15,0.3) 100%)',
        }} />
        {/* Project number */}
        <div style={{
          position: 'absolute',
          top: '24px',
          left: '24px',
          fontSize: '72px',
          fontWeight: 900,
          color: 'rgba(255,255,255,0.08)',
          lineHeight: 1,
          letterSpacing: '-0.05em',
          userSelect: 'none',
        }}>
          {project.num}
        </div>
        {/* Status badge */}
        <div style={{
          position: 'absolute',
          top: '24px',
          right: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: `${project.statusColor}18`,
          border: `1px solid ${project.statusColor}40`,
          borderRadius: '999px',
          padding: '6px 14px',
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: project.statusColor }} />
          <span style={{ fontSize: '11px', fontWeight: 700, color: project.statusColor, letterSpacing: '0.06em' }}>
            {project.status}
          </span>
        </div>
      </div>

      {/* Content side */}
      <div style={{ padding: 'clamp(28px, 4vw, 44px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>
            Featured Project · {project.year}
          </div>
          <h3 style={{ fontSize: 'clamp(24px, 3.5vw, 38px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', marginBottom: '8px', lineHeight: 1.1 }}>
            {project.title}
          </h3>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', marginBottom: '20px', fontWeight: 500 }}>
            {project.subtitle}
          </p>
          <p style={{ fontSize: '15px', lineHeight: 1.75, color: 'rgba(255,255,255,0.65)', marginBottom: '24px' }}>
            {project.description}
          </p>

          {/* Role */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(232,68,25,0.08)',
            border: '1px solid rgba(232,68,25,0.2)',
            borderRadius: '8px',
            padding: '8px 14px',
            marginBottom: '24px',
          }}>
            <span style={{ fontSize: '11px', color: '#E84419', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Role
            </span>
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.65)', fontWeight: 500 }}>
              {project.role}
            </span>
          </div>

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}>
            {project.tags.map((tag) => (
              <span key={tag} className="dev-tech-tag" style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '6px',
                padding: '5px 10px',
                fontSize: '12px',
                color: 'rgba(255,255,255,0.6)',
                fontWeight: 500,
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="dev-btn-primary"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: '#E84419', color: '#fff',
                borderRadius: '999px', padding: '11px 22px',
                fontSize: '13px', fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              Live Site ↗
            </a>
          )}
          <a
            href="https://github.com/how-vaibhav"
            target="_blank"
            rel="noopener noreferrer"
            className="dev-btn-secondary"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.75)',
              borderRadius: '999px', padding: '11px 22px',
              fontSize: '13px', fontWeight: 600,
              textDecoration: 'none',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}

function SmallCard({ project, delay }) {
  return (
    <div
      className={`dev-project-card dev-reveal dev-d${delay}`}
      style={{
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '16px',
        overflow: 'hidden',
        background: '#0D1117',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'default',
      }}
    >
      {/* Image */}
      <div className="dev-img-wrap" style={{ position: 'relative', height: '200px' }}>
        <img
          src={project.image}
          alt={project.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(5,10,15,0.3) 0%, rgba(5,10,15,0.85) 100%)',
        }} />
        {/* Number watermark */}
        <div style={{
          position: 'absolute', bottom: '12px', right: '16px',
          fontSize: '56px', fontWeight: 900, color: 'rgba(255,255,255,0.07)',
          lineHeight: 1, letterSpacing: '-0.05em', userSelect: 'none',
        }}>
          {project.num}
        </div>
        {/* Status */}
        <div style={{
          position: 'absolute', top: '16px', left: '16px',
          display: 'flex', alignItems: 'center', gap: '6px',
          background: `${project.statusColor}18`,
          border: `1px solid ${project.statusColor}40`,
          borderRadius: '999px', padding: '5px 12px',
        }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: project.statusColor }} />
          <span style={{ fontSize: '10px', fontWeight: 700, color: project.statusColor, letterSpacing: '0.06em' }}>
            {project.status}
          </span>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginBottom: '8px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          {project.year} · {project.role}
        </div>
        <h3 style={{ fontSize: 'clamp(18px, 2.5vw, 24px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', marginBottom: '8px', lineHeight: 1.2 }}>
          {project.title}
        </h3>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginBottom: '12px', fontWeight: 500 }}>
          {project.subtitle}
        </p>
        <p style={{ fontSize: '13px', lineHeight: 1.7, color: 'rgba(255,255,255,0.55)', marginBottom: '20px', flex: 1 }}>
          {project.description}
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
          {project.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="dev-tech-tag" style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '5px', padding: '4px 9px',
              fontSize: '11px', color: 'rgba(255,255,255,0.55)', fontWeight: 500,
            }}>
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span style={{
              borderRadius: '5px', padding: '4px 9px',
              fontSize: '11px', color: 'rgba(255,255,255,0.3)', fontWeight: 500,
            }}>
              +{project.tags.length - 4} more
            </span>
          )}
        </div>

        {/* Link */}
        <div style={{ display: 'flex', gap: '10px' }}>
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="dev-btn-primary"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                background: '#E84419', color: '#fff',
                borderRadius: '999px', padding: '9px 18px',
                fontSize: '12px', fontWeight: 700, textDecoration: 'none',
              }}
            >
              Live ↗
            </a>
          ) : (
            <a
              href="https://github.com/SkylerOnRadio/best-team"
              target="_blank"
              rel="noopener noreferrer"
              className="dev-btn-primary"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                background: '#E84419', color: '#fff',
                borderRadius: '999px', padding: '9px 18px',
                fontSize: '12px', fontWeight: 700, textDecoration: 'none',
              }}
            >
              GitHub ↗
            </a>
          )}
          <a
            href="https://github.com/how-vaibhav"
            target="_blank"
            rel="noopener noreferrer"
            className="dev-btn-secondary"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.7)',
              borderRadius: '999px', padding: '9px 18px',
              fontSize: '12px', fontWeight: 600, textDecoration: 'none',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}

export default function DevProjects() {
  const ref = useReveal();
  const featured = PROJECTS.find((p) => p.featured);
  const rest = PROJECTS.filter((p) => !p.featured);

  return (
    <section
      id="dev-projects"
      ref={ref}
      style={{
        padding: 'clamp(80px, 10vw, 140px) clamp(24px, 5vw, 80px)',
        maxWidth: '1440px',
        margin: '0 auto',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Section header */}
      <div style={{ marginBottom: '64px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '16px' }}>
          <span className="dev-section-accent dev-reveal" style={{ fontSize: 'clamp(48px,8vw,90px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1 }}>
            03
          </span>
          <div className="dev-divider-line" style={{ height: '1px', flex: 1, background: 'rgba(255,255,255,0.1)' }} />
        </div>
        <h2 className="dev-reveal dev-d1" style={{ fontSize: 'clamp(28px,5vw,52px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', marginBottom: '12px' }}>
          PROJECTS
        </h2>
        <p className="dev-reveal dev-d2" style={{ fontSize: '16px', color: 'rgba(255,255,255,0.45)', maxWidth: '520px' }}>
          Production systems, open-source tools, and team projects — all shipped.
        </p>
      </div>

      {/* Featured project */}
      {featured && <FeaturedCard project={featured} />}

      {/* Two smaller cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
        marginTop: '0',
      }}>
        {rest.map((p, i) => (
          <SmallCard key={p.id} project={p} delay={i + 3} />
        ))}
      </div>
    </section>
  );
}
