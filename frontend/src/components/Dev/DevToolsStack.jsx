import React, { useState, useEffect } from 'react';
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
        width: '180px',
        flexShrink: 0,
        background: isHovered
          ? 'linear-gradient(180deg, rgba(30, 30, 38, 0.6) 0%, rgba(20, 20, 28, 0.85) 100%)'
          : 'linear-gradient(180deg, rgba(20, 20, 26, 0.35) 0%, rgba(12, 12, 16, 0.65) 100%)',
        backdropFilter: 'blur(24px) saturate(150%)',
        WebkitBackdropFilter: 'blur(24px) saturate(150%)',
        border: '1px solid',
        borderColor: isHovered ? item.border : 'rgba(255, 255, 255, 0.06)',
        borderTopColor: isHovered ? item.border : 'rgba(255, 255, 255, 0.15)', // Rim light effect
        borderRadius: '16px',
        padding: '14px 18px',
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        cursor: 'pointer',
        boxShadow: isHovered
          ? `0 20px 40px ${item.bg}, inset 0 1px 1px rgba(255,255,255,0.2)`
          : '0 10px 30px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.08)',
        transform: isHovered ? 'translateY(-4px) scale(1.03)' : 'translateY(0) scale(1)',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Official Vector Logo Box */}
      <div
        style={{
          width: '38px',
          height: '38px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          background: isHovered ? item.bg : 'rgba(255, 255, 255, 0.02)',
          borderRadius: '10px',
          padding: '6px',
          border: `1px solid ${isHovered ? item.border : 'rgba(255, 255, 255, 0.04)'}`,
          transition: 'all 0.4s ease',
          boxShadow: isHovered ? `0 0 15px ${item.bg}` : 'none',
        }}
      >
        <img
          src={item.icon}
          alt={item.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            filter: isHovered ? 'drop-shadow(0 0 8px rgba(255,255,255,0.6))' : 'none',
            transition: 'filter 0.4s ease',
          }}
          loading="lazy"
        />
      </div>

      {/* Title */}
      <span
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '14.5px',
          fontWeight: 800,
          color: isHovered ? '#ffffff' : 'rgba(255, 255, 255, 0.75)',
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 860);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section
      id="tools"
      style={{
        position: 'relative',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        background: '#040404',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        minHeight: isMobile ? '500px' : 'auto', // Give space for Marquees on mobile
      }}
    >
      {/* Banner image dictates the exact height on desktop, but covers on mobile to prevent squishing */}
      <img
        src="/assets/footer-banner.png"
        alt="Tools and Stack Background"
        aria-hidden="true"
        style={{
          display: 'block',
          width: '100%',
          height: isMobile ? '100%' : 'auto',
          position: isMobile ? 'absolute' : 'relative',
          inset: 0,
          objectFit: isMobile ? 'cover' : 'contain',
          objectPosition: 'center',
          zIndex: 0,
        }}
      />



      {/* Content wrapper layered exactly over the image */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          gap: '30px',
          paddingBottom: 'clamp(20px, 5vw, 60px)',
        }}
      >
        {/* Marquee Rows Overlay */}

        {/* Dual-Direction Infinite Magic UI Marquee with Edge Gradient Masks */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            overflow: 'hidden',
          }}
        >
          {/* Row 1 — Languages & Core Frameworks (Left to Right) */}
        <Marquee duration={35} pauseOnHover={false} gap="24px" repeat={4}>
          {ROW_1_STACK.map((item) => (
            <TechCard key={item.name} item={item} />
          ))}
        </Marquee>

        {/* Row 2 — Backend, Databases & DevOps (Right to Left / Reverse) */}
        <div style={{ marginTop: '24px' }}>
          <Marquee duration={40} reverse={true} pauseOnHover={false} gap="24px" repeat={4}>
            {ROW_2_STACK.map((item) => (
              <TechCard key={item.name} item={item} />
            ))}
          </Marquee>
        </div>
        </div>
      </div>
    </section>
  );
}
