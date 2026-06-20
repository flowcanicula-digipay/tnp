'use client';

import { useEffect, useRef, useState } from 'react';

interface StatCounterProps {
  value: string;
  label: string;
  delay?: number;
}

const COUNT_DURATION_MS = 1400;

export default function StatCounter({ value, label, delay = 0 }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [display, setDisplay] = useState(value);

  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : null;
  const suffix = match ? match[2] : '';

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || target === null) return;
    const targetValue = target;

    const start = performance.now();
    let raf: number;

    function tick(now: number) {
      const progress = Math.min((now - start) / COUNT_DURATION_MS, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(`${Math.round(eased * targetValue)}${suffix}`);
      if (progress < 1) raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible, target, suffix]);

  return (
    <div
      ref={ref}
      className={`py-4 transition-all duration-700 ease-out ${
        visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'
      }`}
      style={{ transitionDelay: visible ? `${delay}s` : '0s' }}
    >
      <p className="font-serif text-4xl lg:text-5xl font-bold mb-2 tabular-nums">{display}</p>
      <span
        className="block mx-auto mb-2 h-px w-10 origin-left bg-white/50 transition-transform duration-700 ease-out"
        style={{
          transform: visible ? 'scaleX(1)' : 'scaleX(0)',
          transitionDelay: visible ? `${delay + 0.15}s` : '0s',
        }}
        aria-hidden="true"
      />
      <p className="text-timber-100 text-sm font-medium uppercase tracking-wide">{label}</p>
    </div>
  );
}
