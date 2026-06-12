import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

interface FooterProps {
  locale: string;
  messages: {
    common: {
      footer: {
        brand: { tagline: string; social: string };
        quickLinks: { title: string; home: string; about: string; process: string; pricing: string; contact: string; privacy: string };
        contact: { title: string; address: string };
        markets: { title: string; text: string };
        copyright: string;
        certifications: string;
      };
      languageSwitcher: { label: string };
    };
  };
}

export default function Footer({ locale, messages }: FooterProps) {
  const f = messages.common.footer;
  const year = new Date().getFullYear();
  const copyright = f.copyright.replace('{year}', String(year));

  return (
    <footer className="bg-forest-900 text-cream-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Column 1 — Brand */}
          <div>
            <Link href={`/${locale}`}>
              <Image
                src="/assets/logo/tnp_logo_primary.png"
                alt="TNP logo"
                width={110}
                height={36}
                className="h-8 w-auto object-contain mb-4"
              />
            </Link>
            <p className="text-stone-400 text-sm leading-relaxed">{f.brand.tagline}</p>
            <div className="mt-4 flex items-center gap-3">
              <a
                href="https://www.facebook.com/Thinhnguyenphat.traocamgiacbinhyen"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TNP on Facebook"
                className="text-stone-400 hover:text-timber-300 transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.027 4.388 11.024 10.125 11.927v-8.437H7.078v-3.49h3.047V9.413c0-3.025 1.792-4.697 4.533-4.697 1.313 0 2.686.235 2.686.235v2.97h-1.513c-1.491 0-1.956.93-1.956 1.874v2.278h3.328l-.532 3.49h-2.796v8.437C19.612 23.097 24 18.1 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2 — Quick links */}
          <nav aria-label="Footer navigation">
            <h3 className="text-cream-200 font-semibold text-sm uppercase tracking-wider mb-4">
              {f.quickLinks.title}
            </h3>
            <ul className="flex flex-col gap-2.5">
              {[
                { href: `/${locale}`, label: f.quickLinks.home },
                { href: `/${locale}#about`, label: f.quickLinks.about },
                { href: `/${locale}#process`, label: f.quickLinks.process },
                { href: `/${locale}/pricing`, label: f.quickLinks.pricing },
                { href: `/${locale}/contact`, label: f.quickLinks.contact },
                { href: `/${locale}/privacy`, label: f.quickLinks.privacy },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-stone-400 hover:text-timber-300 text-sm transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 3 — Contact */}
          <address className="not-italic">
            <h3 className="text-cream-200 font-semibold text-sm uppercase tracking-wider mb-4">
              {f.contact.title}
            </h3>
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-timber-400 mt-0.5 shrink-0" aria-hidden="true" />
                <a href="mailto:thuy@tnpgr.vn" className="text-stone-400 hover:text-timber-300 text-sm transition-colors">
                  thuy@tnpgr.vn
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-timber-400 mt-0.5 shrink-0" aria-hidden="true" />
                <a href="tel:+84903333729" className="text-stone-400 hover:text-timber-300 text-sm transition-colors">
                  +84 90 333 37 29
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-timber-400 mt-0.5 shrink-0" aria-hidden="true" />
                <span className="text-stone-400 text-sm leading-relaxed">{f.contact.address}</span>
              </li>
            </ul>
          </address>

          {/* Column 4 — Markets */}
          <div>
            <h3 className="text-cream-200 font-semibold text-sm uppercase tracking-wider mb-4">
              {f.markets.title}
            </h3>
            <p className="text-stone-400 text-sm leading-relaxed">{f.markets.text}</p>
            {/* TODO: add certifications (FSC, ISO, JAS) */}
            <p className="mt-4 text-xs text-stone-600 italic">{f.certifications}: {/* TODO */}</p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-forest-800 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-5">
          <p className="text-stone-500 text-xs">{copyright}</p>
          <Link
            href={`/${locale}/privacy`}
            className="text-stone-500 hover:text-timber-300 text-xs transition-colors duration-200"
          >
            {f.quickLinks.privacy}
          </Link>
        </div>
        <LanguageSwitcher label={messages.common.languageSwitcher.label} />
      </div>
    </footer>
  );
}
