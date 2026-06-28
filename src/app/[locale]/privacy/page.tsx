import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/siteUrl';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { routing } from '@/i18n/routing';

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`@/messages/${locale}.json`)).default;
  const p = messages.privacy;
  return {
    title: p.meta.title,
    description: p.meta.description,
    robots: { index: false, follow: true },
    openGraph: {
      title: p.meta.title,
      description: p.meta.description,
      url: `${SITE_URL}/${locale}/privacy/`,
      siteName: 'TNP Wood',
      images: [{ url: `${SITE_URL}/assets/og/og-default.png`, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: p.meta.title,
      description: p.meta.description,
      images: [`${SITE_URL}/assets/og/og-default.png`],
    },
  };
}

const sectionKeys = ['collect', 'use', 'storage', 'cookies', 'rights', 'contact'] as const;

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  const messages = (await import(`@/messages/${locale}.json`)).default;
  const p = messages.privacy;

  return (
    <div className="bg-cream-50 min-h-screen">
      {/* ─── HERO — cinematic, dark, bold ─────────────────────────────── */}
      <section className="relative overflow-hidden bg-forest-950 py-28 lg:py-36">
        {/* Decorative outline circles + heritage seal, matching pricing/portfolio language */}
        <div className="pointer-events-none select-none absolute -right-32 top-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full border border-timber-400/15" aria-hidden="true" />
        <div className="pointer-events-none select-none absolute -right-16 top-1/2 -translate-y-1/2 w-[320px] h-[320px] rounded-full border border-timber-400/10" aria-hidden="true" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${base}/assets/images/motifs/heritage-seal.svg`} alt="" aria-hidden="true"
          className="pointer-events-none select-none absolute right-16 top-1/2 -translate-y-1/2 w-44 h-44 opacity-[0.08] animate-motif-spin" />

        <div className="relative container-wide">
          <p className="section-label text-timber-400 mb-6 animate-drift-up" style={{ animationDelay: '0.1s' }}>
            TNP · Legal
          </p>
          <h1 className="font-serif leading-[1.0] tracking-tight mb-7">
            <span className="block text-white animate-drift-up" style={{ fontSize: 'clamp(2.6rem, 6.5vw, 5.5rem)', animationDelay: '0.2s' }}>
              {p.title}
            </span>
            <span className="block text-timber-400 animate-drift-up" style={{ fontSize: 'clamp(1.8rem, 4.5vw, 3.5rem)', animationDelay: '0.35s' }}>
              {p.titleAccent}
            </span>
          </h1>
          <div className="flex flex-col lg:flex-row lg:items-end gap-5 lg:gap-12 mb-6 animate-drift-up" style={{ animationDelay: '0.48s' }}>
            <div className="h-px w-16 bg-timber-500/50 lg:mb-1 shrink-0" />
            <p className="text-stone-300 text-lg max-w-xl leading-relaxed">{p.heroSubtitle}</p>
          </div>
          <p className="text-stone-500 text-sm animate-drift-up" style={{ animationDelay: '0.56s' }}>
            {p.lastUpdated}
          </p>
        </div>
      </section>

      {/* ─── CONTENT ───────────────────────────────────────────────────── */}
      <section className="container-wide max-w-3xl py-16 lg:py-24">
        <p className="text-stone-600 leading-relaxed mb-16 text-base border-l-2 border-timber-500/40 pl-6">
          {p.intro}
        </p>

        <div className="flex flex-col divide-y divide-cream-200">
          {sectionKeys.map((key, idx) => {
            const section = p.sections[key];
            return (
              <article key={key} className="py-10 first:pt-0">
                <div className="flex items-start gap-5 mb-4">
                  <span className="font-serif text-5xl lg:text-6xl font-bold text-cream-200 leading-none select-none tabular-nums shrink-0">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div className="pt-1">
                    <h2 className="font-serif text-2xl lg:text-3xl text-forest-900 leading-tight mb-2">
                      {section.title}
                    </h2>
                    <p className="text-timber-600 font-semibold text-base leading-snug">
                      {section.claim}
                    </p>
                  </div>
                </div>
                <p className="text-stone-600 leading-relaxed text-base pl-[4.25rem] lg:pl-[5rem]">
                  {section.body}
                </p>
              </article>
            );
          })}
        </div>

        <div className="mt-14 pt-8 border-t border-cream-200">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 text-timber-500 hover:text-timber-600 font-medium text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            {p.backToHome}
          </Link>
        </div>
      </section>
    </div>
  );
}
