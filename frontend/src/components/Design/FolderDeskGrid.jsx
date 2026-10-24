import React, { useState } from 'react';
import { soundFX } from './soundFX';

/**
 * FolderDeskGrid — Exact creative homage to Reference 2 (Robin).
 * Tactile physical folder desk with chamfered tabs, washi tape,
 * polaroids, notebook lined texture, and playful sticker badges.
 */
export default function FolderDeskGrid({ projects, onSelectProject }) {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section
      style={{
        width: 'min(94%, 1320px)',
        margin: '20px auto 32px',
        position: 'relative',
      }}
    >
      {/* ── Section Header (Reference 2 Robin Style) ── */}
      <div
        style={{
          borderBottom: '2px dashed #D2CEBE',
          paddingBottom: '16px',
          marginBottom: '24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        {/* Handwritten badge label */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            border: '2px solid #111',
            borderRadius: '999px',
            padding: '4px 16px',
            background: '#FFF8DB',
            boxShadow: '3px 3px 0px #111',
            fontFamily: 'Space Grotesk',
            fontSize: '11px',
            fontWeight: 800,
            textTransform: 'uppercase',
            marginBottom: '14px',
          }}
        >
          <span>📂</span>
          <span>CURATED FILING CABINET</span>
          <span style={{ color: '#E84419' }}>✦</span>
        </div>

        <h2
          style={{
            fontFamily: 'Fraunces',
            fontSize: 'clamp(28px, 4vw, 50px)',
            fontWeight: 700,
            color: '#121316',
            margin: '0 0 12px',
            letterSpacing: '-0.025em',
          }}
        >
          Physical Folder Desk & Case Archives
        </h2>

        <p
          style={{
            maxWidth: '620px',
            fontSize: '14px',
            color: '#555',
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          Inspired by traditional print ateliers and industrial workbenches.
          Every project is packaged as an archival folder with full typography specs,
          die-lines, and client artifacts.
        </p>

        {/* Sticker tags row (Reference 2 badges) */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '8px',
            marginTop: '20px',
          }}
        >
          <span
            style={{
              background: '#FBBF24',
              color: '#000',
              padding: '6px 14px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 800,
              boxShadow: '2px 2px 0px #000',
              border: '1.5px solid #000',
            }}
          >
            Brand Identity ✦
          </span>
          <span
            style={{
              background: '#10B981',
              color: '#fff',
              padding: '6px 14px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 800,
              boxShadow: '2px 2px 0px #000',
              border: '1.5px solid #000',
            }}
          >
            Packaging Design 📦
          </span>
          <span
            style={{
              background: '#EC4899',
              color: '#fff',
              padding: '6px 14px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 800,
              boxShadow: '2px 2px 0px #000',
              border: '1.5px solid #000',
            }}
          >
            3D & Motion ⚡
          </span>
          <span
            style={{
              background: '#3B82F6',
              color: '#fff',
              padding: '6px 14px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 800,
              boxShadow: '2px 2px 0px #000',
              border: '1.5px solid #000',
            }}
          >
            Editorial Systems ✛
          </span>
        </div>
      </div>

      {/* ── Folder Cards Grid ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
          gap: '24px 20px',
        }}
      >
        {projects.map((project, idx) => {
          const isHovered = hoveredId === project.id;
          return (
            <div
              key={project.id}
              className="desk-card-chamfer"
              onMouseEnter={() => {
                setHoveredId(project.id);
                soundFX.playTick();
              }}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => {
                soundFX.playSnap();
                onSelectProject(project);
              }}
              style={{
                cursor: 'pointer',
              }}
            >
              {/* Reference 2 Tabbed Header with Notch */}
              <div
                className="desk-tab-header"
                style={{
                  background: project.folderColor,
                  color: project.folderColor === '#CCFF00' || project.folderColor === '#FBBF24' || project.folderColor === '#00D2FF' ? '#000000' : '#FFFFFF',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '14px' }}>•</span>
                  <span>PROJECT {project.number}</span>
                  <span style={{ opacity: 0.6 }}>//</span>
                  <span>{project.category}</span>
                </div>
                <span style={{ fontSize: '10px', opacity: 0.85 }}>{project.year}</span>
              </div>

              {/* Main Folder Body with Polaroid / Mockup pinned with Washi Tape */}
              <div
                style={{
                  padding: '20px',
                  background: '#FFFFFF',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                  justifyContent: 'space-between',
                }}
              >
                {/* Washi tape strip pinned at corner */}
                <div
                  className="washi-tape washi-tape-top-right"
                  style={{
                    background: idx % 2 === 0 ? 'rgba(255, 235, 170, 0.9)' : 'rgba(200, 240, 255, 0.9)',
                  }}
                />

                {/* Artwork Mockup */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '240px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    border: '1.5px solid #111',
                    boxShadow: '3px 3px 0px #111',
                    marginBottom: '18px',
                  }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease',
                      transform: isHovered ? 'scale(1.06)' : 'scale(1)',
                    }}
                    loading="lazy"
                  />

                  {/* Stamp badge */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '10px',
                      left: '10px',
                      background: 'rgba(0, 0, 0, 0.75)',
                      color: '#fff',
                      padding: '3px 8px',
                      borderRadius: '4px',
                      fontSize: '10px',
                      fontWeight: 700,
                      backdropFilter: 'blur(4px)',
                      border: '1px solid rgba(255,255,255,0.2)',
                    }}
                  >
                    {project.client}
                  </div>
                </div>

                {/* Project Title and Specs */}
                <div>
                  <h3
                    style={{
                      fontSize: '22px',
                      fontWeight: 800,
                      margin: '0 0 6px',
                      color: '#111',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span>{project.title}</span>
                    <span
                      style={{
                        fontSize: '16px',
                        transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
                        transition: 'transform 0.2s',
                        color: project.folderColor,
                      }}
                    >
                      ↗
                    </span>
                  </h3>

                  <p
                    style={{
                      fontSize: '13px',
                      color: '#555',
                      lineHeight: 1.5,
                      margin: '0 0 16px',
                    }}
                  >
                    {project.subtitle}
                  </p>
                </div>

                {/* Bottom Color Swatches & Deliverables */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '12px',
                    borderTop: '1px solid rgba(0, 0, 0, 0.08)',
                  }}
                >
                  {/* Swatches */}
                  <div style={{ display: 'flex', gap: '5px' }}>
                    {project.palette?.map((col) => (
                      <span
                        key={col.hex}
                        style={{
                          width: '14px',
                          height: '14px',
                          borderRadius: '50%',
                          background: col.hex,
                          border: '1px solid rgba(0,0,0,0.15)',
                          display: 'inline-block',
                        }}
                        title={col.name}
                      />
                    ))}
                  </div>

                  <span
                    style={{
                      fontFamily: 'monospace',
                      fontSize: '11px',
                      fontWeight: 800,
                      color: '#000',
                      background: '#F0EFE9',
                      padding: '3px 8px',
                      borderRadius: '4px',
                    }}
                  >
                    {project.stats?.deliverables || 'Full Suite'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
