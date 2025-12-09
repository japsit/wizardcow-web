import React from 'react';

type Props = {
  variant?: 'wave' | 'diagonal' | 'blob';
  color?: string; // CSS color string for the fill area below the shape
  flip?: boolean; // flips vertically
  animated?: boolean;
  glitter?: boolean; // adds animated sparkle along the curve (wave only)
  sparkles?: boolean; // adds moving sparkle dots along the curve (wave only)
  sparklesCount?: number; // how many sparkle dots
  className?: string;
};

export default function ShapeDivider({
  variant = 'wave',
  color = '#ffffff',
  flip = false,
  animated = true,
  glitter = false,
  sparkles = false,
  sparklesCount = 18,
  className = '',
}: Props) {
  const base = `pointer-events-none absolute left-0 w-full z-10 ${flip ? 'rotate-180' : ''} ${
    animated ? 'shape-animated' : ''
  } ${className}`;

  if (variant === 'diagonal') {
    return (
      <svg
        aria-hidden
        className={`${base}`}
        style={{ bottom: 0, height: '90px' }}
        viewBox="0 0 1440 90"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <polygon fill={color} points="0,0 1440,0 1440,90" />
      </svg>
    );
  }

  if (variant === 'blob') {
    return (
      <svg
        aria-hidden
        className={`${base}`}
        style={{ bottom: 0, height: '120px' }}
        viewBox="0 0 1440 120"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          fill={color}
          d="M0,64 C120,96 240,112 360,96 C480,80 600,32 720,26.7 C840,21 960,59 1080,80 C1200,101 1320,107 1440,96 L1440,120 L0,120 Z"
        />
      </svg>
    );
  }

  // default: wave
  const waveD =
    'M0,64 C80,85 160,106 240,106 C320,106 400,85 480,75 C560,64 640,64 720,69 C800,75 880,85 960,85 C1040,85 1120,75 1200,69 C1280,64 1360,64 1440,69';
  return (
    <svg
      aria-hidden
      className={`${base}`}
      style={{ bottom: 0, height: '120px' }}
      viewBox="0 0 1440 120"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      {(glitter || sparkles) && (
        <defs>
          {glitter && (
            <linearGradient id="sparkleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255,255,255,0)" />
              <stop offset="40%" stopColor="rgba(255,255,255,0.95)" />
              <stop offset="60%" stopColor="rgba(110,0,129,0.9)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
          )}
          <radialGradient id="sparkDot" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="45%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="75%" stopColor="#6e0081" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#6e0081" stopOpacity="0.0" />
          </radialGradient>
          <filter id="sparkGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      )}
      <path
        fill={color}
        d={`${waveD} L1440,120 L0,120 Z`}
      />
      {glitter && (
        <path
          d={waveD}
          fill="none"
          stroke="url(#sparkleGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          className="sparkle-line"
        />
      )}
      {sparkles && (
        <g>
          {Array.from({ length: Math.max(1, sparklesCount) }).map((_, i) => (
            <circle
              key={i}
              r={3.4 + (i % 3) * 0.9}
              fill="url(#sparkDot)"
              stroke="#6e0081"
              strokeOpacity="0.55"
              strokeWidth="0.6"
              filter="url(#sparkGlow)"
              opacity={0}
            >
              <animateMotion
                dur={`${2.2 + ((i % 5) * 0.4).toFixed(2)}s`}
                begin={`${(i * 0.28).toFixed(2)}s`}
                repeatCount="indefinite"
                rotate="auto"
                path={waveD}
              />
              <animate
                attributeName="opacity"
                values="0;1;0"
                dur={`${0.9 + ((i % 4) * 0.4).toFixed(2)}s`}
                begin={`${(i * 0.19).toFixed(2)}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
        </g>
      )}
    </svg>
  );
}
