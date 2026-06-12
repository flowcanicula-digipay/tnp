'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';

const STORAGE_KEY = 'tnp_privacy_accepted';

interface BannerMessages {
  text: string;
  linkLabel: string;
  accept: string;
}

interface PrivacyBannerProps {
  locale: string;
  messages: BannerMessages;
}

export default function PrivacyBanner({ locale, messages: m }: PrivacyBannerProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      // localStorage unavailable — don't show banner
    }
  }, []);

  function accept() {
    try { localStorage.setItem(STORAGE_KEY, '1'); } catch { /* ignore */ }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Privacy notice"
      className="fixed bottom-0 left-0 right-0 z-50 bg-forest-900/95 backdrop-blur-sm border-t border-forest-700 shadow-2xl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-stone-300 text-sm leading-relaxed flex-1">
          {m.text}{' '}
          <Link
            href={`/${locale}/privacy`}
            className="text-timber-300 hover:text-timber-200 underline underline-offset-2 transition-colors"
          >
            {m.linkLabel}
          </Link>
          .
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={accept}
            className="bg-timber-500 hover:bg-timber-600 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors duration-200"
          >
            {m.accept}
          </button>
          <button
            onClick={accept}
            aria-label="Dismiss"
            className="text-stone-400 hover:text-stone-200 transition-colors p-1"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
