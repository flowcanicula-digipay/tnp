'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const LOCALE_KEY = 'tnp_locale';
const SUPPORTED = ['en', 'vi', 'ja'] as const;
type Locale = (typeof SUPPORTED)[number];

function detectLocale(): Locale {
  // 1. Last locale the user explicitly chose
  try {
    const stored = localStorage.getItem(LOCALE_KEY);
    if (stored && SUPPORTED.includes(stored as Locale)) return stored as Locale;
  } catch { /* localStorage unavailable */ }

  // 2. Browser language preference — covers "browser set to Vietnamese/Japanese"
  //    and also works well as a proxy for location (most Vietnamese users have vi,
  //    most Japanese users have ja set as their browser language).
  const langs = [
    navigator.language,
    ...(navigator.languages ?? []),
  ];
  for (const lang of langs) {
    const l = lang?.toLowerCase() ?? '';
    if (l.startsWith('vi')) return 'vi';
    if (l.startsWith('ja')) return 'ja';
  }

  return 'en';
}

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace(`/${detectLocale()}`);
  }, [router]);

  // Blank while detecting — keeps the flash minimal
  return null;
}
