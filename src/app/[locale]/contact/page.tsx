import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/siteUrl';
import ContactPageClient from '@/components/ContactPageClient';
import SchemaJsonLd from '@/components/SchemaJsonLd';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const msgs = (await import(`@/messages/${locale}.json`)).default;
  const meta = msgs.meta.contact;
  const siteUrl = SITE_URL;
  const baseUrl = 'https://flow-canicula.github.io/tnp';
  const ogLocale = locale === 'vi' ? 'vi_VN' : locale === 'ja' ? 'ja_JP' : 'en_US';

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    authors: [{ name: 'TNP', url: baseUrl }],
    alternates: {
      canonical: `${baseUrl}/${locale}/contact/`,
      languages: {
        en: `${baseUrl}/en/contact/`,
        vi: `${baseUrl}/vi/contact/`,
        ja: `${baseUrl}/ja/contact/`,
        'x-default': `${baseUrl}/en/contact/`,
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${baseUrl}/${locale}/contact/`,
      siteName: 'TNP',
      locale: ogLocale,
      type: 'website',
      images: [{ url: `${siteUrl}/assets/og/og-default.png`, width: 1200, height: 630, alt: meta.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [`${siteUrl}/assets/og/og-default.png`],
    },
    other: {
      'geo.region': 'VN-39',
      'geo.placename': 'Biên Hòa, Đồng Nai, Vietnam',
      'geo.position': '10.9334;106.8783',
      'ICBM': '10.9334, 106.8783',
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const msgs = (await import(`@/messages/${locale}.json`)).default;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'TNP', item: `https://flow-canicula.github.io/tnp/${locale}/` },
      { '@type': 'ListItem', position: 2, name: 'Contact', item: `https://flow-canicula.github.io/tnp/${locale}/contact/` },
    ],
  };

  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact TNP',
    description: 'Request a free quote for solid wood flooring or custom timber furniture from TNP.',
    url: `https://flow-canicula.github.io/tnp/${locale}/contact/`,
    mainEntity: {
      '@type': 'LocalBusiness',
      name: 'TNP',
      telephone: '+84903333729',
      email: 'thuy@tnpgr.vn',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Lô 35 đường số 9, Khu Công Nghiệp Tam Phước',
        addressLocality: 'Biên Hòa',
        addressRegion: 'Đồng Nai',
        addressCountry: 'VN',
      },
    },
  };

  return (
    <>
      <SchemaJsonLd schema={[contactSchema, breadcrumbSchema]} />
      <ContactPageClient locale={locale} messages={msgs.contact} />
    </>
  );
}
