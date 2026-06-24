'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useTransition, useRef, useState, useEffect } from 'react';
import { Globe } from 'lucide-react';

const LOCALES = [
  { code: 'en', label: 'English',     short: 'EN' },
  { code: 'vi', label: 'Tiếng Việt',  short: 'VI' },
  { code: 'ja', label: '日本語',       short: 'JA' },
] as const;

type LocaleCode = (typeof LOCALES)[number]['code'];

function getCurrentLocale(pathname: string): LocaleCode {
  const seg = pathname.split('/')[1] as LocaleCode;
  return LOCALES.some((l) => l.code === seg) ? seg : 'en';
}

interface Props {
  label: string;
  align?: 'left' | 'right';
  /** Opens the panel above the trigger instead of below — use for footer placements. */
  openUpward?: boolean;
}

export default function LanguageSwitcher({ label, align = 'right', openUpward = false }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const locale = getCurrentLocale(pathname);
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function switchLocale(next: string) {
    setOpen(false);
    try { localStorage.setItem('tnp_locale', next); } catch { /* ignore */ }
    const segs = pathname.split('/');
    segs[1] = next;
    startTransition(() => router.push(segs.join('/') || `/${next}/`));
  }

  const current = LOCALES.find((l) => l.code === locale);

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={label}
        aria-expanded={open}
        aria-haspopup="listbox"
        disabled={isPending}
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-forest-800 hover:text-timber-500 transition-colors duration-200 cursor-pointer disabled:opacity-40 select-none"
      >
        <Globe className="w-4 h-4 text-timber-500 shrink-0" aria-hidden="true" />
        <span className="hidden sm:inline text-[13px] font-semibold tracking-wide">{current?.short}</span>
        {/* Thin chevron drawn with CSS — no icon component */}
        <svg
          width="10" height="6" viewBox="0 0 10 6" fill="none"
          aria-hidden="true"
          className={`text-stone-400 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        >
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Dropdown panel */}
      <div
        role="listbox"
        aria-label={label}
        className={`
          absolute w-44 z-50
          ${openUpward ? 'bottom-full mb-2 origin-bottom' : 'top-full mt-2 origin-top'}
          bg-white/95 backdrop-blur-md
          rounded-xl overflow-hidden
          shadow-[0_8px_32px_rgba(15,14,12,0.12),0_2px_8px_rgba(15,14,12,0.06)]
          border border-cream-200/60
          transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${open
            ? 'opacity-100 scale-y-100 translate-y-0 pointer-events-auto'
            : `opacity-0 scale-y-95 pointer-events-none ${openUpward ? 'translate-y-1' : '-translate-y-1'}`
          }
          ${align === 'left' ? 'left-0' : 'right-0'}
        `}
      >
        {LOCALES.map(({ code, label: localeLabel, short }, i) => {
          const isActive = code === locale;
          return (
            <div key={code}>
              {i > 0 && <div className="mx-4 h-px bg-cream-200/80" />}
              <button
                role="option"
                aria-selected={isActive}
                onClick={() => switchLocale(code)}
                className={`
                  w-full flex items-center justify-between gap-3
                  px-4 py-3 text-left cursor-pointer
                  transition-colors duration-150
                  ${isActive
                    ? 'text-timber-600 bg-cream-50'
                    : 'text-forest-800 hover:bg-cream-50 hover:text-timber-500'
                  }
                `}
              >
                <span className="text-[13px] font-medium">{localeLabel}</span>
                {isActive && (
                  <span className="text-[10px] font-bold uppercase tracking-widest text-timber-500/60">{short}</span>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
