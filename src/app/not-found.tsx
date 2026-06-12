'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Home, MessageCircle } from 'lucide-react';

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const shavings = [
  { id: 1,  x: '6%',  y: '14%', w: 70,  rot: 22,  dur: 6.2, delay: 0    },
  { id: 2,  x: '20%', y: '72%', w: 52,  rot: -44, dur: 8.1, delay: 1.3  },
  { id: 3,  x: '36%', y: '22%', w: 84,  rot: 68,  dur: 7.0, delay: 0.5  },
  { id: 4,  x: '53%', y: '83%', w: 46,  rot: -18, dur: 9.2, delay: 2.1  },
  { id: 5,  x: '66%', y: '9%',  w: 76,  rot: 82,  dur: 6.7, delay: 0.8  },
  { id: 6,  x: '77%', y: '55%', w: 40,  rot: -62, dur: 7.8, delay: 1.6  },
  { id: 7,  x: '89%', y: '31%', w: 62,  rot: 37,  dur: 8.4, delay: 0.4  },
  { id: 8,  x: '13%', y: '48%', w: 34,  rot: -55, dur: 5.9, delay: 1.9  },
  { id: 9,  x: '43%', y: '63%', w: 72,  rot: 14,  dur: 7.3, delay: 2.6  },
  { id: 10, x: '82%', y: '78%', w: 44,  rot: 73,  dur: 6.1, delay: 0.9  },
  { id: 11, x: '28%', y: '90%', w: 58,  rot: -32, dur: 8.6, delay: 1.1  },
  { id: 12, x: '60%', y: '40%', w: 50,  rot: 51,  dur: 6.8, delay: 2.4  },
  { id: 13, x: '3%',  y: '58%', w: 38,  rot: -78, dur: 7.6, delay: 0.2  },
  { id: 14, x: '93%', y: '62%', w: 66,  rot: 28,  dur: 9.0, delay: 3.0  },
];

export default function NotFound() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const [hovered404, setHovered404] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth  - 0.5) * 28,
        y: (e.clientY / window.innerHeight - 0.5) * 18,
      });
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#09100d] flex flex-col items-center justify-center select-none">

      {/* ── Background photo — parallax layer ─────────────────────────── */}
      <div
        className="absolute inset-[-40px] transition-transform duration-700 ease-out will-change-transform"
        style={mounted ? { transform: `translate(${mouse.x}px, ${mouse.y}px)` } : undefined}
      >
        <Image
          src={`${base}/assets/images/company/company-2.jpg`}
          alt=""
          fill
          priority
          aria-hidden="true"
          className="object-cover object-center opacity-20"
          sizes="120vw"
        />
      </div>

      {/* ── Overlay stack ─────────────────────────────────────────────── */}
      <div className="absolute inset-0 bg-[#09100d]/72" />
      {/* Vignette — darker at edges */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 72% 60% at 50% 50%, transparent 0%, rgba(9,16,13,0.65) 100%)' }}
      />
      {/* Subtle horizontal light band through the center */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 90% 35% at 50% 48%, rgba(200,150,90,0.04) 0%, transparent 100%)' }}
      />

      {/* ── Floating wood shavings ────────────────────────────────────── */}
      {shavings.map((s) => (
        <span
          key={s.id}
          aria-hidden="true"
          className="absolute pointer-events-none rounded-full animate-float"
          style={{
            left: s.x,
            top: s.y,
            width: s.w,
            height: Math.max(4, Math.round(s.w * 0.11)),
            background: `linear-gradient(90deg, transparent, rgba(200,150,90,0.45), transparent)`,
            '--rot': `${s.rot}deg`,
            animationDuration: `${s.dur}s`,
            animationDelay: `${s.delay}s`,
          } as React.CSSProperties}
        />
      ))}

      {/* ── Main content ──────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl w-full">

        {/* Ambient label */}
        <p
          className="text-[#C8965A] text-[10px] sm:text-xs font-bold tracking-[0.45em] uppercase mb-10 animate-fade-in"
          style={{ animationDelay: '0.1s' }}
        >
          TNP · Biên Hòa · Vietnam · Error
        </p>

        {/* ── Giant "404" ─────────────────────────────────────────────── */}
        <div
          role="img"
          aria-label="404 — page not found"
          className={`font-serif leading-none cursor-default transition-all duration-500 ${
            hovered404 ? '' : 'animate-glow-pulse'
          }`}
          style={{
            fontSize: 'clamp(6rem, 24vw, 19rem)',
            WebkitTextStroke: hovered404
              ? '1.5px rgba(200,150,90,1)'
              : '1.5px rgba(200,150,90,0.65)',
            color: hovered404 ? 'rgba(200,150,90,0.12)' : 'transparent',
            filter: hovered404
              ? 'drop-shadow(0 0 40px rgba(200,150,90,0.7)) drop-shadow(0 0 100px rgba(200,150,90,0.25))'
              : undefined,
            letterSpacing: '-0.04em',
          }}
          onMouseEnter={() => setHovered404(true)}
          onMouseLeave={() => setHovered404(false)}
        >
          404
        </div>

        {/* ── Decorative divider ──────────────────────────────────────── */}
        <div className="flex items-center gap-5 w-full max-w-sm mt-2 mb-9">
          <div
            className="flex-1 h-px origin-right animate-scale-in"
            style={{
              background: 'linear-gradient(to left, rgba(200,150,90,0.55), transparent)',
              animationDelay: '0.3s',
            }}
          />
          <div className="w-1.5 h-1.5 rounded-full bg-[#C8965A] opacity-70 animate-fade-in" style={{ animationDelay: '0.5s' }} />
          <div
            className="flex-1 h-px origin-left animate-scale-in"
            style={{
              background: 'linear-gradient(to right, rgba(200,150,90,0.55), transparent)',
              animationDelay: '0.3s',
            }}
          />
        </div>

        {/* ── Headline ────────────────────────────────────────────────── */}
        <h1
          className="font-serif text-white text-2xl sm:text-3xl lg:text-[2.6rem] leading-tight mb-5 animate-drift-up"
          style={{ animationDelay: '0.2s' }}
        >
          This page wandered off<br className="hidden sm:block" /> the workshop floor.
        </h1>

        {/* ── Subtext ─────────────────────────────────────────────────── */}
        <p
          className="text-[#a8a29e] text-base sm:text-lg leading-relaxed mb-12 max-w-sm animate-drift-up"
          style={{ animationDelay: '0.35s' }}
        >
          The timber was here. The craftsmen looked.
          Even the Hinoki didn&apos;t know where it went.
        </p>

        {/* ── CTA buttons ─────────────────────────────────────────────── */}
        <div
          className="flex flex-wrap gap-4 justify-center animate-drift-up"
          style={{ animationDelay: '0.5s' }}
        >
          <Link
            href="/en/"
            className="group flex items-center gap-2.5 px-8 py-3.5 rounded-2xl bg-[#A97B3E] hover:bg-[#C8965A] text-white font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-xl"
            style={{ boxShadow: '0 0 0 0 rgba(200,150,90,0)', transition: 'background 0.3s, transform 0.3s, box-shadow 0.3s' }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 8px 32px rgba(200,150,90,0.35)')}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 0 0 0 rgba(200,150,90,0)')}
          >
            <Home className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform duration-200" aria-hidden="true" />
            Back to Home
          </Link>
          <Link
            href="/en/contact"
            className="flex items-center gap-2.5 px-8 py-3.5 rounded-2xl border border-[rgba(200,150,90,0.35)] hover:border-[rgba(200,150,90,0.8)] text-[#C8965A] hover:text-[#D4A96A] font-semibold text-sm transition-all duration-300 hover:bg-[rgba(200,150,90,0.07)] hover:scale-105"
          >
            <MessageCircle className="w-4 h-4" aria-hidden="true" />
            Contact Us
          </Link>
        </div>
      </div>

      {/* ── Bottom ambient strip ─────────────────────────────────────── */}
      <div
        className="absolute bottom-7 left-0 right-0 flex items-center justify-center gap-6 animate-fade-in"
        style={{ animationDelay: '1s' }}
      >
        <div className="w-12 h-px bg-[rgba(200,150,90,0.25)]" />
        <span className="text-[#4a4a44] text-[10px] tracking-[0.35em] uppercase font-medium">
          tnpgr.vn · supplying solid wood flooring &amp; timber furniture
        </span>
        <div className="w-12 h-px bg-[rgba(200,150,90,0.25)]" />
      </div>
    </div>
  );
}
