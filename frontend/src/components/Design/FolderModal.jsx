import React, { useState, useEffect } from 'react';
import { soundFX } from './soundFX';

/**
 * FolderModal — Deep-dive case study dossier.
 * Styled as an open physical project file folder with high-res graphics,
 * interactive click-to-copy color swatches, typography specimens, and deliverables.
 */
export default function FolderModal({ project, onClose }) {
  const [copiedHex, setCopiedHex] = useState(null);

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const copyColor = (hex) => {
    soundFX.playSnap();
    navigator.clipboard.writeText(hex).then(() => {
      setCopiedHex(hex);
      setTimeout(() => setCopiedHex(null), 1800);
    });
  };

  return (
    <div
      className="dossier-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="dossier-modal-sheet">
        {/* Top Folder Header Tab Bar */}
        <div
          style={{
            background: project.folderColor || '#121316',
            color: project.folderColor === '#CCFF00' || project.folderColor === '#FBBF24' || project.folderColor === '#00D2FF' ? '#000000' : '#FFFFFF',
            padding: '14px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '2px solid #121316',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '16px' }}>📂</span>
            <span style={{ fontFamily: 'monospace', fontWeight: 900, fontSize: '13px', letterSpacing: '0.06em' }}>
              {project.tabLabel}
            </span>
            <span style={{ opacity: 0.6 }}>|</span>
            <span style={{ fontSize: '12px', fontWeight: 700 }}>{project.client}</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'rgba(0, 0, 0, 0.2)',
              border: 'none',
              borderRadius: '999px',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'inherit',
              fontSize: '16px',
              fontWeight: 900,
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
            title="Close Dossier (ESC)"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div style={{ padding: '28px' }}>
          {/* Hero Banner / High-Res Showcase Mockup */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxHeight: '440px',
              borderRadius: '12px',
              overflow: 'hidden',
              border: '2px solid #121316',
              boxShadow: '6px 6px 0px #121316',
              marginBottom: '28px',
              background: '#090A0D',
            }}
          >
            <img
              src={project.image}
              alt={project.title}
              style={{
                width: '100%',
                maxHeight: '440px',
                objectFit: 'cover',
                display: 'block',
              }}
            />

            {/* Washi tape accents */}
            <div className="washi-tape washi-tape-top-left" />
            <div className="washi-tape washi-tape-bottom-right" />
          </div>

          {/* Project Title & Meta Info */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: '16px',
              marginBottom: '24px',
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: '12px',
                  fontWeight: 800,
                  color: project.folderColor,
                  background: '#000',
                  padding: '2px 8px',
                  borderRadius: '4px',
                }}
              >
                EXHIBIT {project.number}
              </span>
              <h2
                style={{
                  fontSize: 'clamp(28px, 4vw, 40px)',
                  fontWeight: 900,
                  margin: '8px 0 6px',
                  color: '#111',
                }}
              >
                {project.title}
              </h2>
              <p style={{ fontSize: '16px', color: '#666', margin: 0, fontWeight: 500 }}>
                {project.subtitle}
              </p>
            </div>

            {/* Quick Metrics */}
            <div
              style={{
                display: 'flex',
                gap: '12px',
                background: '#F7F6F2',
                padding: '12px 16px',
                borderRadius: '10px',
                border: '1px solid rgba(0,0,0,0.1)',
              }}
            >
              <div>
                <div style={{ fontSize: '10px', color: '#777', textTransform: 'uppercase', fontFamily: 'monospace' }}>
                  Category
                </div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#111' }}>
                  {project.category}
                </div>
              </div>
              <div style={{ width: '1px', background: 'rgba(0,0,0,0.1)' }} />
              <div>
                <div style={{ fontSize: '10px', color: '#777', textTransform: 'uppercase', fontFamily: 'monospace' }}>
                  Year
                </div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#111' }}>
                  {project.year}
                </div>
              </div>
              <div style={{ width: '1px', background: 'rgba(0,0,0,0.1)' }} />
              <div>
                <div style={{ fontSize: '10px', color: '#777', textTransform: 'uppercase', fontFamily: 'monospace' }}>
                  Impact
                </div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: project.folderColor }}>
                  {project.stats?.impact || 'Acclaimed'}
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial Quote */}
          {project.quote && (
            <div
              style={{
                background: '#FFFBEB',
                border: '1.5px solid #FCD34D',
                borderRadius: '10px',
                padding: '16px 20px',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
              }}
            >
              <span style={{ fontSize: '24px' }}>💬</span>
              <div>
                <p style={{ margin: 0, fontStyle: 'italic', fontWeight: 700, color: '#92400E', fontSize: '14px' }}>
                  "{project.quote}"
                </p>
                <span style={{ fontSize: '12px', color: '#B45309', fontFamily: 'monospace' }}>
                  — {project.clientReviewer}
                </span>
              </div>
            </div>
          )}

          {/* Challenge & Solution Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '20px',
              marginBottom: '28px',
            }}
          >
            <div
              style={{
                background: '#FAFAFA',
                padding: '20px',
                borderRadius: '12px',
                border: '1px solid rgba(0,0,0,0.08)',
              }}
            >
              <h4 style={{ margin: '0 0 8px', fontSize: '13px', textTransform: 'uppercase', fontFamily: 'monospace', color: '#E84419' }}>
                [ 01. THE CREATIVE CHALLENGE ]
              </h4>
              <p style={{ margin: 0, fontSize: '14px', color: '#444', lineHeight: 1.6 }}>
                {project.challenge}
              </p>
            </div>

            <div
              style={{
                background: '#FAFAFA',
                padding: '20px',
                borderRadius: '12px',
                border: '1px solid rgba(0,0,0,0.08)',
              }}
            >
              <h4 style={{ margin: '0 0 8px', fontSize: '13px', textTransform: 'uppercase', fontFamily: 'monospace', color: '#10B981' }}>
                [ 02. THE STRATEGIC SOLUTION ]
              </h4>
              <p style={{ margin: 0, fontSize: '14px', color: '#444', lineHeight: 1.6 }}>
                {project.solution}
              </p>
            </div>
          </div>

          {/* Interactive Color Palette (Click to Copy!) */}
          <div style={{ marginBottom: '28px' }}>
            <h4
              style={{
                fontSize: '12px',
                textTransform: 'uppercase',
                fontFamily: 'monospace',
                color: '#666',
                marginBottom: '10px',
              }}
            >
              ✦ Brand Color Matrix (Click hex to copy)
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {project.palette?.map((col) => (
                <button
                  key={col.hex}
                  type="button"
                  onClick={() => copyColor(col.hex)}
                  className="color-chip-btn"
                  title="Click to copy HEX"
                >
                  <span
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '4px',
                      background: col.hex,
                      border: '1px solid rgba(0,0,0,0.15)',
                    }}
                  />
                  <span>{col.name}</span>
                  <span style={{ color: '#888' }}>
                    {copiedHex === col.hex ? '✓ COPIED!' : col.hex}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Deliverables & Specs */}
          <div
            style={{
              borderTop: '2px dashed #E5E2D8',
              paddingTop: '20px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '20px',
            }}
          >
            <div>
              <h4 style={{ fontSize: '12px', fontFamily: 'monospace', color: '#777', textTransform: 'uppercase', margin: '0 0 10px' }}>
                Deliverables Produced
              </h4>
              <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13px', color: '#444', lineHeight: 1.7 }}>
                {project.deliverables?.map((deliv, idx) => (
                  <li key={idx}>{deliv}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 style={{ fontSize: '12px', fontFamily: 'monospace', color: '#777', textTransform: 'uppercase', margin: '0 0 10px' }}>
                Typography System
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {project.fonts?.map((f, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '8px 12px',
                      background: '#F4F2EC',
                      borderRadius: '6px',
                      fontSize: '13px',
                      fontWeight: 700,
                      color: '#222',
                    }}
                  >
                    Aa — {f}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer actions inside modal */}
        <div
          style={{
            background: '#F8F6F0',
            borderTop: '1px solid rgba(0,0,0,0.1)',
            padding: '16px 28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ fontSize: '11px', color: '#777', fontFamily: 'monospace' }}>
            HOWVAIBHAV STUDIO ARCHIVE // EXHIBIT ID #{project.number}
          </span>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: '#121316',
              color: '#FFFFFF',
              border: 'none',
              padding: '8px 20px',
              borderRadius: '999px',
              fontSize: '12px',
              fontWeight: 800,
              cursor: 'pointer',
            }}
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
}
