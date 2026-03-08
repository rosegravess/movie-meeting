'use client';

import { useEffect, useRef } from 'react';

interface ConfettiProps {
  trigger: number; // increment this value to fire a new burst
}

const COLORS = ['#B8E04A', '#FF5C47', '#6EC6F0', '#C4AEFF', '#D4A847'];

export default function Confetti({ trigger }: ConfettiProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prevTrigger  = useRef(0);

  useEffect(() => {
    if (trigger === prevTrigger.current) return;
    prevTrigger.current = trigger;

    const container = containerRef.current;
    if (!container) return;

    for (let i = 0; i < 70; i++) {
      const p = document.createElement('div');
      p.className = 'confetti-piece';
      const size = 4 + Math.random() * 6;
      p.style.cssText = [
        `left:${Math.random() * 100}vw`,
        `background:${COLORS[Math.floor(Math.random() * COLORS.length)]}`,
        `animation-duration:${1.5 + Math.random() * 2}s`,
        `animation-delay:${Math.random() * 0.5}s`,
        `width:${size}px`,
        `height:${size}px`,
        `border-radius:${Math.random() > 0.5 ? '50%' : '1px'}`,
      ].join(';');
      container.appendChild(p);
      setTimeout(() => p.remove(), 4000);
    }
  }, [trigger]);

  return <div ref={containerRef} />;
}
