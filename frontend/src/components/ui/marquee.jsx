import React from 'react';

// Inject keyframes globally once
const MARQUEE_STYLE_ID = 'magicui-marquee-styles';
if (typeof document !== 'undefined' && !document.getElementById(MARQUEE_STYLE_ID)) {
  const style = document.createElement('style');
  style.id = MARQUEE_STYLE_ID;
  style.textContent = `
    @keyframes magicui-marquee {
      from {
        transform: translateX(0);
      }
      to {
        transform: translateX(calc(-100% - var(--gap, 1.25rem)));
      }
    }
    @keyframes magicui-marquee-vertical {
      from {
        transform: translateY(0);
      }
      to {
        transform: translateY(calc(-100% - var(--gap, 1.25rem)));
      }
    }
    .magicui-marquee-content {
      display: flex;
      flex-shrink: 0;
      justify-content: space-around;
      gap: var(--gap, 1.25rem);
      will-change: transform;
      animation: magicui-marquee var(--duration, 35s) linear infinite;
    }
    .magicui-marquee-vertical .magicui-marquee-content {
      flex-direction: column;
      animation-name: magicui-marquee-vertical;
    }
    .magicui-marquee-reverse .magicui-marquee-content {
      animation-direction: reverse;
    }
    .magicui-marquee-container:hover .magicui-marquee-pause:hover {
      animation-play-state: paused;
    }
  `;
  document.head.appendChild(style);
}

export function Marquee({
  className = '',
  reverse = false,
  pauseOnHover = true,
  children,
  vertical = false,
  repeat = 4,
  duration = 35,
  gap = '1.25rem',
  style = {},
  ...props
}) {
  return (
    <div
      className={`magicui-marquee-container ${vertical ? 'magicui-marquee-vertical' : ''} ${reverse ? 'magicui-marquee-reverse' : ''} ${className}`}
      style={{
        display: 'flex',
        flexDirection: vertical ? 'column' : 'row',
        gap: gap,
        overflow: 'hidden',
        padding: '8px 0',
        userSelect: 'none',
        '--gap': gap,
        '--duration': `${duration}s`,
        ...style,
      }}
      {...props}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={`magicui-marquee-content ${pauseOnHover ? 'magicui-marquee-pause' : ''}`}
            aria-hidden={i !== 0}
            style={{
              display: 'flex',
              flexDirection: vertical ? 'column' : 'row',
              gap: gap,
            }}
          >
            {children}
          </div>
        ))}
    </div>
  );
}
