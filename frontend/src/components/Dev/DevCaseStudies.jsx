import React, { useState } from 'react';
import './dev.css';

const CASE_STUDIES = [
  {
    id: 0,
    num: '01',
    name: 'eMINERAL PASS',
    subtitle: 'Digitized mineral transport permits with real-time QR tracking',
    featuredTitle: 'eMINERAL PASS SAAS',
    description:
      'A complete government-compliant SaaS platform with QR pass generation, bilingual PDF exports (English + Devanagari Hindi), role-based access control, and real-time audit logs.',
    stats: [
      { value: '180%', label: 'INCREASE IN SIGNUPS' },
      { value: '2.4X', label: 'FASTER AUDIT TIME' },
      { value: '99.9%', label: 'SYSTEM UPTIME' },
    ],
    liveUrl: 'https://www.mineraltrack.shop/',
    revenue: '$48.2k',
    growth: '↑ 24.5%',
    chartPoints: '0,45 20,38 40,25 60,30 80,12 100,8',
    recentLogs: [
      { name: 'eForm-C Pass #8492', status: 'Active Verified', amount: '₹14,500' },
      { name: 'Transit Permit #8491', status: 'QR Scanned', amount: '₹8,200' },
      { name: 'Mineral Fleet Pass #8490', status: 'Completed', amount: '₹22,000' },
    ],
  },
  {
    id: 1,
    num: '02',
    name: 'GOVAID SIKKIM',
    subtitle: 'Secure citizen welfare scheme discovery & Fernet encryption',
    featuredTitle: 'GOVAID PORTAL',
    description:
      'Production-grade Django welfare portal centralizing government scheme evaluation, Verhoeff Aadhaar validation, and automated eligibility matching for citizens across Sikkim.',
    stats: [
      { value: '120K+', label: 'ELIGIBLE CITIZENS' },
      { value: '100%', label: 'FERNET ENCRYPTION' },
      { value: '95+', label: 'PAGESPEED SCORE' },
    ],
    liveUrl: 'https://govaid-5n3k.onrender.com/',
    revenue: '45+ Schemes',
    growth: '↑ 100% Live',
    chartPoints: '0,40 20,32 40,20 60,18 80,10 100,5',
    recentLogs: [
      { name: 'Education Grant Tier-1', status: 'Approved', amount: 'Active' },
      { name: 'Rural Housing Subsidy', status: 'Under Review', amount: 'Verified' },
      { name: 'Agriculture Support Fund', status: 'Disbursed', amount: 'Direct' },
    ],
  },
  {
    id: 2,
    num: '03',
    name: 'LOG DETECTOR',
    subtitle: 'Multiprocessed log forensics & kill-chain entropy detection',
    featuredTitle: 'LOG DETECTOR CLI & APP',
    description:
      'Blazing-fast security forensic analyzer that calculates Shannon entropy baselines and tracks 5-stage cyber kill-chains across gigabytes of server logs in parallel seconds.',
    stats: [
      { value: '10X', label: 'PARALLEL SPEEDUP' },
      { value: '7', label: 'RISK ZONES TRACKED' },
      { value: '0-99', label: 'FORENSIC RISK SCORE' },
    ],
    liveUrl: 'https://github.com/how-vaibhav/Portfolio',
    revenue: '100k+ Lines/s',
    growth: '0-Sec Tamper',
    chartPoints: '0,50 20,42 40,35 60,15 80,8 100,2',
    recentLogs: [
      { name: 'Distributed Attack Window', status: 'Escalated', amount: 'Tagged' },
      { name: 'Shannon Entropy Obfuscation', status: 'Flagged', amount: 'Alert' },
      { name: 'Timeline Integrity Check', status: 'Verified', amount: 'Pass' },
    ],
  },
];

export default function DevCaseStudies() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const active = CASE_STUDIES[selectedIdx];

  return (
    <section
      id="case-studies"
      style={{
        paddingTop: '60px',
        paddingBottom: '90px',
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
            marginBottom: '32px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            paddingBottom: '16px',
          }}
        >
          CASE STUDIES
        </div>

        {/* 2-Column Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px',
            alignItems: 'stretch',
          }}
        >
          {/* Left Column: List of 3 Case Studies */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {CASE_STUDIES.map((c, idx) => {
              const isSelected = selectedIdx === idx;

              return (
                <div
                  key={c.id}
                  onClick={() => setSelectedIdx(idx)}
                  style={{
                    padding: '24px 28px',
                    borderRadius: '12px',
                    background: isSelected ? '#121214' : 'rgba(255,255,255,0.02)',
                    border: isSelected
                      ? '1px solid rgba(204, 255, 0, 0.4)'
                      : '1px solid rgba(255, 255, 255, 0.08)',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.background = '#101012';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                    }
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '28px',
                        fontWeight: 900,
                        color: isSelected ? '#CCFF00' : 'rgba(255, 255, 255, 0.4)',
                        lineHeight: 1,
                      }}
                    >
                      {c.num}
                    </span>

                    <div>
                      <h4
                        style={{
                          fontSize: '16px',
                          fontWeight: 800,
                          color: '#ffffff',
                          margin: '0 0 6px 0',
                          letterSpacing: '-0.02em',
                          textTransform: 'uppercase',
                        }}
                      >
                        {c.name}
                      </h4>
                      <p
                        style={{
                          fontSize: '13px',
                          color: 'rgba(255, 255, 255, 0.55)',
                          margin: 0,
                          lineHeight: 1.4,
                          maxWidth: '340px',
                        }}
                      >
                        {c.subtitle}
                      </p>
                    </div>
                  </div>

                  <span
                    style={{
                      fontSize: '18px',
                      fontWeight: 900,
                      color: isSelected ? '#CCFF00' : 'rgba(255, 255, 255, 0.3)',
                    }}
                  >
                    ↗
                  </span>
                </div>
              );
            })}
          </div>

          {/* Right Column: Featured Case Study Spotlight Card */}
          <div
            style={{
              background: '#2563EB',
              borderRadius: '16px',
              padding: 'clamp(24px, 3.5vw, 40px)',
              color: '#ffffff',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(37, 99, 235, 0.35)',
            }}
          >
            {/* Top Tag */}
            <div style={{ marginBottom: '20px' }}>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'rgba(255, 255, 255, 0.8)',
                  display: 'block',
                  marginBottom: '8px',
                }}
              >
                FEATURED CASE STUDY
              </span>

              <h3
                style={{
                  fontSize: 'clamp(32px, 4vw, 44px)',
                  fontWeight: 900,
                  letterSpacing: '-0.04em',
                  textTransform: 'uppercase',
                  margin: '0 0 12px 0',
                  lineHeight: 0.95,
                }}
              >
                {active.featuredTitle}
              </h3>

              <p
                style={{
                  fontSize: '14px',
                  color: 'rgba(255, 255, 255, 0.85)',
                  lineHeight: 1.5,
                  maxWidth: '560px',
                  margin: 0,
                }}
              >
                {active.description}
              </p>
            </div>

            {/* Middle Stats Bar */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '16px',
                padding: '18px 0',
                borderTop: '1px solid rgba(255, 255, 255, 0.2)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
                margin: '20px 0',
              }}
            >
              {active.stats.map((s) => (
                <div key={s.label}>
                  <div style={{ fontSize: '24px', fontWeight: 900, letterSpacing: '-0.03em' }}>{s.value}</div>
                  <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.06em', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Embedded Live Interactive SaaS Mockup Widget */}
            <div
              style={{
                background: '#ffffff',
                color: '#0F172A',
                borderRadius: '12px',
                padding: '16px',
                boxShadow: '0 16px 40px rgba(0, 0, 0, 0.3)',
                marginBottom: '24px',
                display: 'grid',
                gridTemplateColumns: '120px 1fr',
                gap: '16px',
              }}
            >
              {/* Mini Sidebar */}
              <div style={{ borderRight: '1px solid #E2E8F0', paddingRight: '12px' }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#2563EB', marginBottom: '12px' }}>✦ DASHBOARD</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '10px', fontWeight: 600, color: '#64748B' }}>
                  <span style={{ color: '#0F172A', fontWeight: 800 }}>• Overview</span>
                  <span>• Analytics</span>
                  <span>• Permits</span>
                  <span>• Verification</span>
                  <span>• Settings</span>
                </div>
              </div>

              {/* Main Mini Dashboard Area */}
              <div>
                {/* Header with Revenue */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div>
                    <span style={{ fontSize: '10px', color: '#64748B', fontWeight: 600 }}>Total Metric</span>
                    <div style={{ fontSize: '18px', fontWeight: 900, color: '#0F172A' }}>{active.revenue}</div>
                  </div>
                  <span style={{ fontSize: '10px', fontWeight: 800, color: '#16A34A', background: '#DCFCE7', padding: '2px 8px', borderRadius: '999px' }}>
                    {active.growth}
                  </span>
                </div>

                {/* SVG Chart Line */}
                <div style={{ width: '100%', height: '36px', marginBottom: '10px' }}>
                  <svg viewBox="0 0 100 50" width="100%" height="100%" preserveAspectRatio="none">
                    <polyline fill="none" stroke="#2563EB" strokeWidth="3" points={active.chartPoints} />
                  </svg>
                </div>

                {/* Recent Logs List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {active.recentLogs.map((log) => (
                    <div
                      key={log.name}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '9px',
                        fontWeight: 600,
                        color: '#334155',
                        borderTop: '1px solid #F1F5F9',
                        paddingTop: '3px',
                      }}
                    >
                      <span>{log.name}</span>
                      <span style={{ color: '#2563EB', fontWeight: 700 }}>{log.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <a
                href={active.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="dev-btn-lime"
                style={{ textDecoration: 'none' }}
              >
                READ FULL CASE STUDY ↗
              </a>

              {/* View Project Pill */}
              <a
                href={active.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#ffffff',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: '#000000',
                  padding: '8px 16px',
                  borderRadius: '999px',
                }}
              >
                VIEW PROJECT ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
