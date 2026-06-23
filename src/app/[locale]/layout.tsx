import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SchemaJsonLd from '@/components/SchemaJsonLd';
import PrivacyBanner from '@/components/PrivacyBanner';
import LocaleSetter from '@/components/LocaleSetter';

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {};

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'en' | 'vi' | 'ja')) {
    notFound();
  }

  const messages = (await import(`@/messages/${locale}.json`)).default;

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://flow-canicula.github.io/tnp/#organization',
    name: 'TNP',
    url: 'https://flow-canicula.github.io/tnp',
    logo: 'https://flow-canicula.github.io/tnp/assets/logo/tnp_logo_primary.png',
    description: 'Premium solid wood flooring and custom timber furniture manufacturer. Japanese material standards, Vietnamese craftsmanship. Factory-direct from Biên Hòa, Vietnam.',
    telephone: '+84903333729',
    email: 'thuy@tnpgr.vn',
    foundingLocation: 'Biên Hòa, Đồng Nai, Vietnam',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Lô 35 đường số 9, Khu Công Nghiệp Tam Phước',
      addressLocality: 'Biên Hòa',
      addressRegion: 'Đồng Nai',
      addressCountry: 'VN',
    },
    areaServed: ['VN', 'JP'],
    knowsAbout: [
      'Solid wood flooring', 'Hardwood flooring', 'Timber furniture',
      'Hinoki cypress', 'Keyaki zelkova', 'Wood manufacturing',
      'Flooring installation', 'Furniture design',
    ],
    sameAs: ['https://www.facebook.com/Thinhnguyenphat.traocamgiacbinhyen'],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://flow-canicula.github.io/tnp/#website',
    url: 'https://flow-canicula.github.io/tnp',
    name: 'TNP',
    description: 'Supplying solid wood flooring and timber furniture.',
    publisher: { '@id': 'https://flow-canicula.github.io/tnp/#organization' },
    inLanguage: ['en', 'vi', 'ja'],
  };

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'FurnitureStore',
    name: 'TNP',
    description: 'Supplying solid wood flooring and timber furniture. Japanese material standards, Vietnamese manufacturing excellence.',
    url: 'https://flow-canicula.github.io/tnp',
    telephone: '+84903333729',
    email: 'thuy@tnpgr.vn',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Lô 35 đường số 9, Khu Công Nghiệp Tam Phước',
      addressLocality: 'Biên Hòa',
      addressRegion: 'Đồng Nai',
      addressCountry: 'VN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 10.9334,
      longitude: 106.8783,
    },
    areaServed: ['VN', 'JP'],
    availableLanguage: ['en', 'vi', 'ja'],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '17:30',
      },
    ],
    sameAs: ['https://www.facebook.com/Thinhnguyenphat.traocamgiacbinhyen'],
  };

  return (
    <>
      <LocaleSetter locale={locale} />
      <SchemaJsonLd schema={[organizationSchema, websiteSchema, localBusinessSchema]} />
      <Header messages={{ nav: messages.common.nav, languageSwitcher: messages.common.languageSwitcher }} />
      <main className="pt-16 lg:pt-18">
        {children}
      </main>
      <Footer locale={locale} messages={messages} />
      <PrivacyBanner locale={locale} messages={messages.common.privacyBanner} />
    </>
  );
}
