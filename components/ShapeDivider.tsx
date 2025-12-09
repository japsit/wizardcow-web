import React from 'react';

type Props = {
  variant?: 'wave' | 'diagonal' | 'blob';
  color?: string; // CSS color string for the fill area below the shape
  flip?: boolean; // flips vertically
  animated?: boolean;
  className?: string;
};

export default function ShapeDivider({
  variant = 'wave',
  color = '#ffffff',
  flip = false,
  animated = true,
  className = '',
}: Props) {
  const base = `pointer-events-none absolute left-0 w-full ${flip ? 'rotate-180' : ''} ${
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
        d="M0,64 C80,85 160,106 240,106 C320,106 400,85 480,75 C560,64 640,64 720,69 C800,75 880,85 960,85 C1040,85 1120,75 1200,69 C1280,64 1360,64 1440,69 L1440,120 L0,120 Z"
      />
    </svg>
  );
}
