import React, { useState } from 'react';
import { Marquee } from '../ui/marquee';
import './dev.css';

// Exact tech stack from README with official vector icons and branding
const TECH_STACK_DATA = [
  // ── Languages ──────────────────────────────────────────────────────────
  {
    name: 'TypeScript',
    icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg',
    color: '#3178C6',
    border: 'rgba(49, 120, 198, 0.4)',
    bg: 'rgba(49, 120, 198, 0.1)',
  },
  {
    name: 'JavaScript',
    icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg',
    color: '#F7DF1E',
    border: 'rgba(247, 223, 30, 0.4)',
    bg: 'rgba(247, 223, 30, 0.1)',
  },
  {
    name: 'Python',
    icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg',
    color: '#3776AB',
    border: 'rgba(55, 118, 171, 0.4)',
    bg: 'rgba(55, 118, 171, 0.1)',
  },
  {
    name: 'C++',
    icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/cplusplus/cplusplus-original.svg',
    color: '#00599C',
    border: 'rgba(0, 89, 156, 0.4)',
    bg: 'rgba(0, 89, 156, 0.1)',
  },
  {
    name: 'Shell / Bash',
    icon: 'https://cdn.simpleicons.org/gnubash/4EAA25',
    color: '#4EAA25',
    border: 'rgba(78, 170, 37, 0.4)',
    bg: 'rgba(78, 170, 37, 0.1)',
  },

  // ── Frameworks & Databases ─────────────────────────────────────────────
  {
    name: 'React',
    icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg',
    color: '#61DAFB',
    border: 'rgba(97, 218, 251, 0.4)',
    bg: 'rgba(97, 218, 251, 0.1)',
  },
  {
    name: 'Next.js',
    icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg',
    color: '#FFFFFF',
    border: 'rgba(255, 255, 255, 0.35)',
    bg: 'rgba(255, 255, 255, 0.08)',
  },
  {
    name: 'TailwindCSS',
    icon: 'https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg',
    color: '#38B2AC',
    border: 'rgba(56, 178, 172, 0.4)',
    bg: 'rgba(56, 178, 172, 0.1)',
  },
  {
    name: 'Node.js',
    icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg',
    color: '#339933',
    border: 'rgba(51, 153, 51, 0.4)',
    bg: 'rgba(51, 153, 51, 0.1)',
  },
  {
    name: 'Express',
    icon: 'https://cdn.simpleicons.org/express/ffffff',
    color: '#FFFFFF',
    border: 'rgba(255, 255, 255, 0.35)',
    bg: 'rgba(255, 255, 255, 0.08)',
  },
  {
    name: 'Django',
    icon: 'https://cdn.simpleicons.org/django/ffffff',
    color: '#092E20',
    border: 'rgba(43, 166, 107, 0.5)',
    bg: 'rgba(9, 46, 32, 0.25)',
  },
  {
    name: 'PostgreSQL',
    icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg',
    color: '#4169E1',
    border: 'rgba(65, 105, 225, 0.4)',
    bg: 'rgba(65, 105, 225, 0.1)',
  },
  {
    name: 'MySQL',
    icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg',
    color: '#4479A1',
    border: 'rgba(68, 121, 161, 0.4)',
    bg: 'rgba(68, 121, 161, 0.1)',
  },
  {
    name: 'Supabase',
    icon: 'https://cdn.simpleicons.org/supabase/3ecf8e',
    color: '#3ECF8E',
    border: 'rgba(62, 207, 142, 0.4)',
    bg: 'rgba(62, 207, 142, 0.1)',
  },

  // ── Tools & DevOps ─────────────────────────────────────────────────────
  {
    name: 'Docker',
    icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg',
    color: '#2496ED',
    border: 'rgba(36, 150, 237, 0.4)',
    bg: 'rgba(36, 150, 237, 0.1)',
  },
  {
    name: 'Git',
    icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg',
    color: '#F05032',
    border: 'rgba(240, 80, 50, 0.4)',
    bg: 'rgba(240, 80, 50, 0.1)',
  },
  {
    name: 'Ubuntu',
    icon: 'https://cdn.simpleicons.org/ubuntu/E95420',
    color: '#E95420',
    border: 'rgba(233, 84, 32, 0.4)',
    bg: 'rgba(233, 84, 32, 0.1)',
  },
];

// Row 1: Languages & Core Frontend/Frameworks
const ROW_1_STACK = TECH_STACK_DATA.slice(0, 9);
// Row 2: Backends, Databases & DevOps
const ROW_2_STACK = TECH_STACK_DATA.slice(9);

function TechCard({ item }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: '165px',
        flexShrink: 0,
        background: isHovered ? '#16161c' : '#101014',
        border: isHovered ? `1px solid ${item.border}` : '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '10px',
        padding: '12px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        cursor: 'pointer',
        boxShadow: isHovered ? `0 8px 24px ${item.bg}` : '0 4px 14px rgba(0,0,0,0.3)',
        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
        transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Official Vector Logo */}
      <div
        style={{
          width: '32px',
          height: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          background: isHovered ? item.bg : 'rgba(255, 255, 255, 0.03)',
          borderRadius: '6px',
          padding: '5px',
          border: `1px solid ${isHovered ? item.border : 'rgba(255, 255, 255, 0.06)'}`,
          transition: 'all 0.2s ease',
        }}
      >
        <img
          src={item.icon}
          alt={item.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            filter: isHovered ? 'drop-shadow(0 0 6px rgba(255,255,255,0.4))' : 'none',
          }}
          loading="lazy"
        />
      </div>

      {/* Title */}
      <span
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '13px',
          fontWeight: 800,
          color: isHovered ? '#ffffff' : 'rgba(255, 255, 255, 0.9)',
          letterSpacing: '-0.02em',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {item.name}
      </span>
    </div>
  );
}

export default function DevToolsStack() {
  return (
    <section
      id="tools"
      style={{
        paddingTop: '32px',
        paddingBottom: '10px',
        background: '#080808',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          paddingLeft: 'clamp(20px, 4.5vw, 64px)',
          paddingRight: 'clamp(20px, 4.5vw, 64px)',
        }}
      >
        {/* Section Header */}
        <div
          style={{
            fontSize: '12px',
            fontWeight: 900,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#ffffff',
            marginBottom: '20px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            paddingBottom: '14px',
          }}
        >
          TOOLS & STACK
        </div>
      </div>

      {/* Dual-Direction Infinite Magic UI Marquee with Edge Gradient Masks */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          overflow: 'hidden',
        }}
      >
        {/* Left Edge Gradient Fade Mask */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            width: 'clamp(30px, 6vw, 100px)',
            background: 'linear-gradient(to right, #080808 25%, transparent 100%)',
            zIndex: 10,
            pointerEvents: 'none',
          }}
        />

        {/* Right Edge Gradient Fade Mask */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            width: 'clamp(30px, 6vw, 100px)',
            background: 'linear-gradient(to left, #080808 25%, transparent 100%)',
            zIndex: 10,
            pointerEvents: 'none',
          }}
        />

        {/* Row 1 — Languages & Core Frameworks (Left to Right) */}
        <Marquee duration={28} pauseOnHover={true} gap="12px" repeat={4}>
          {ROW_1_STACK.map((item) => (
            <TechCard key={item.name} item={item} />
          ))}
        </Marquee>

        {/* Row 2 — Backend, Databases & DevOps (Right to Left / Reverse) */}
        <div style={{ marginTop: '10px' }}>
          <Marquee duration={30} reverse={true} pauseOnHover={true} gap="12px" repeat={4}>
            {ROW_2_STACK.map((item) => (
              <TechCard key={item.name} item={item} />
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
