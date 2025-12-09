"use client";
import { useMemo } from 'react';
import { Engine, ISourceOptions } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";
import Particles from "react-tsparticles";

type Props = {
  className?: string;
};

export default function ParticlesBackground({ className }: Props) {
  const options: ISourceOptions = useMemo(() => ({
    background: { color: { value: "transparent" } },
    fullScreen: { enable: false },
    detectRetina: true,
    fpsLimit: 60,
    motion: { disable: false, reduce: { value: true } },
    particles: {
      number: { value: 60, density: { enable: true, area: 800 } },
      color: { value: ["#6e0081", "#a855f7", "#6366f1"] },
      links: { enable: true, color: "#6e0081", distance: 140, opacity: 0.25, width: 1 },
      move: { enable: true, speed: 0.6, outModes: { default: "out" } },
      opacity: { value: 0.25 },
      size: { value: { min: 1, max: 3 } },
      shape: { type: "circle" },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: "repulse" },
        resize: true,
      },
      modes: {
        repulse: { distance: 80, duration: 0.4 },
      },
    },
  }), []);

  // Respect reduced motion by returning null (no particles)
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return null;
  }

  const init = async (engine: Engine) => {
    await loadSlim(engine);
  };

  return (
    <Particles id="tsparticles" className={className} options={options} init={init} />
  );
}
