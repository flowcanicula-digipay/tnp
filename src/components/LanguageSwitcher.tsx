'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useTransition, useRef, useState, useEffect } from 'react';
import { Globe, ChevronDown } from 'lucide-react';

const LOCALES = [
  { code: 'en', label: 'English' },
  { code: 'vi', label: 'Tiếng Việt' },
  { code: 'ja', label: '日本語' },
] as const;

type LocaleCode = (typeof LOCALES)[number]['code'];

function getCurrentLocale(pathname: string): LocaleCode {
  const seg = pathname.split('/')[1] as LocaleCode;
  return LOCALES.some((l) => l.code === seg) ? seg : 'en';
}

interface Props {
  label: string;
}

export default function LanguageSwitcher({ label }: Props) {
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
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={label}
        aria-expanded={open}
        aria-haspopup="listbox"
        disabled={isPending}
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-forest-800 hover:bg-cream-100 transition-colors duration-200 cursor-pointer disabled:opacity-50"
      >
        <Globe className="w-4 h-4 text-timber-500" aria-hidden="true" />
        <span className="hidden sm:inline">{current?.label}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-stone-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={label}
          className="absolute right-0 top-full mt-1 w-40 bg-white rounded-xl shadow-lg border border-cream-200 py-1 z-50"
        >
          {LOCALES.map(({ code, label: localeLabel }) => (
            <li key={code} role="option" aria-selected={code === locale}>
              <button
                onClick={() => switchLocale(code)}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors duration-150 cursor-pointer ${
                  code === locale
                    ? 'text-timber-500 font-semibold bg-cream-50'
                    : 'text-forest-800 hover:bg-cream-50'
                }`}
              >
                {localeLabel}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
