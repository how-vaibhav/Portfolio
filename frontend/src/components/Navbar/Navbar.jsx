import React from 'react';
import ModeToggle from '../ModeToggle';

const ORANGE = '#E84419';

/**
 * DevNavbar — used on the root Dev page (/).
 * Minimal: just logo + mode toggle.
 */
export function DevNavbar() {
  return (
    <header style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '20px 48px',
      zIndex: 100,
      background: 'rgba(5, 10, 15, 0.7)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
    }}>
      {/* Logo */}
      <span style={{
        fontWeight: 800,
        fontSize: '17px',
        letterSpacing: '-0.04em',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}>
        <span style={{
          fontFamily: 'monospace',
          fontSize: '13px',
          color: 'rgba(255,255,255,0.35)',
          letterSpacing: '-0.02em',
        }}>{'<'}</span>
        Vaibhav
        <span style={{
          fontFamily: 'monospace',
          fontSize: '13px',
          color: 'rgba(255,255,255,0.35)',
          letterSpacing: '-0.02em',
        }}>{'/>'}</span>
      </span>

      {/* Mode Toggle */}
      <ModeToggle />
    </header>
  );
}

/**
 * DesignNavbar — used on the Design page (/design).
 * Full nav with links + mode toggle replacing the dark/light toggle.
 */
export function DesignNavbar() {
  return (
    <header style={{
      position: 'absolute',
      top: 0, left: 0, right: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '24px 48px',
      zIndex: 30,
    }}>
      {/* Logo */}
      <span style={{
        fontWeight: 800, fontSize: '17px', letterSpacing: '-0.03em',
        color: '#fff',
      }}>
        Vaibhav
      </span>

      {/* Nav links */}
      <nav style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
        {[
          { name: 'Home', href: '#home' },
          { name: 'Studio', href: '#studio' },
          { name: 'About', href: '#about' },
          { name: 'Education', href: '#education' },
          { name: 'Contact', href: '#contact' },
        ].map(item => (
          <a key={item.name} href={item.href} style={{
            fontSize: '14px', fontWeight: 500,
            color: 'rgba(255,255,255,0.75)',
            transition: 'color 0.2s',
          }}
            onMouseEnter={e => e.target.style.color = '#fff'}
            onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.75)'}
          >
            {item.name}
          </a>
        ))}
      </nav>

      {/* Right side: mode toggle + CTA */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <ModeToggle />

        <a href="#contact" style={{
          background: ORANGE, color: '#fff', border: 'none',
          borderRadius: '999px', padding: '11px 24px',
          fontSize: '13px', fontWeight: 700, cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: '8px',
          letterSpacing: '-0.01em',
          textDecoration: 'none',
          transition: 'opacity 0.2s, transform 0.15s',
        }}
          onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'scale(1.03)'; }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1)'; }}
        >
          Get in touch
          <span style={{
            background: 'rgba(255,255,255,0.25)', borderRadius: '50%',
            width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '13px',
          }}>→</span>
        </a>
      </div>
    </header>
  );
}
