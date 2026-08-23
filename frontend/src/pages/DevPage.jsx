import React from 'react';
import { DevNavbar } from '../components/Navbar/Navbar';

/**
 * DevPage — Root Developer / CS Portfolio Mode.
 * Clean, dark canvas ready for custom developer projects and sections.
 */
export default function DevPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#050A0F',
        color: '#fff',
        fontFamily: "'Inter', system-ui, sans-serif",
        overflowX: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Subtle grid background */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Radial accent glow — top-left */}
      <div
        style={{
          position: 'fixed',
          top: '-20%',
          left: '-10%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(232,68,25,0.08) 0%, transparent 70%)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Radial accent glow — bottom-right */}
      <div
        style={{
          position: 'fixed',
          bottom: '-20%',
          right: '-10%',
          width: '700px',
          height: '700px',
          background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Dev Navbar with Mode Toggle */}
      <DevNavbar />

      {/* Main Content Area */}
      <main
        style={{
          position: 'relative',
          zIndex: 2,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '100px 24px 60px',
          textAlign: 'center',
        }}
      >
        {/* Placeholder / Workspace Area for custom dev projects */}
      </main>
    </div>
  );
}
