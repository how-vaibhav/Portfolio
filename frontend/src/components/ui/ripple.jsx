import React from 'react';

// Inject keyframes once globally
const STYLE_ID = 'magicui-ripple-styles';
if (typeof document !== 'undefined' && !document.getElementById(STYLE_ID)) {
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    @keyframes magicui-ripple {
      0%, 100% {
        transform: translate(-50%, -50%) scale(1);
      }
      50% {
        transform: translate(-50%, -50%) scale(0.9);
      }
    }
    .magicui-ripple-circle {
      animation: magicui-ripple 2s ease infinite;
      position: absolute;
      border-radius: 50%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(1);
    }
  `;
  document.head.appendChild(style);
}

export const Ripple = React.memo(function Ripple({
  mainCircleSize = 210,
  mainCircleOpacity = 0.24,
  numCircles = 8,
  // Pass hex or plain rgb values like '#CCFF00' or '34,197,94'
  // OR pass an rgba string like 'rgba(204,255,0,1)' — we handle all cases
  color = '255,255,255',
  style = {},
  ...props
}) {
  // Normalize color to an rgb triplet string "r,g,b"
  let rgb = color;
  if (color.startsWith('#')) {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    rgb = `${r},${g},${b}`;
  } else if (color.startsWith('rgba(') || color.startsWith('rgb(')) {
    // extract numbers
    const nums = color.match(/[\d.]+/g);
    if (nums && nums.length >= 3) {
      rgb = `${nums[0]},${nums[1]},${nums[2]}`;
    }
  }

  return (
    <div
      style={{
        pointerEvents: 'none',
        position: 'absolute',
        inset: 0,
        userSelect: 'none',
        overflow: 'hidden',
        zIndex: 0,
        ...style,
      }}
      {...props}
    >
      {Array.from({ length: numCircles }, (_, i) => {
        const size = mainCircleSize + i * 70;
        const opacity = Math.max(0, mainCircleOpacity - i * 0.025);
        const animationDelay = `${i * 0.12}s`;

        return (
          <div
            key={i}
            className="magicui-ripple-circle"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              opacity,
              animationDelay,
              border: `1px solid rgba(${rgb}, 0.85)`,
              background: `rgba(${rgb}, 0.04)`,
              boxShadow: `0 0 16px rgba(${rgb}, 0.12)`,
            }}
          />
        );
      })}
    </div>
  );
});

Ripple.displayName = 'Ripple';
