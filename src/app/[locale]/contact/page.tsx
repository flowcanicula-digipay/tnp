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
  const ogLocale = locale === 'vi' ? 'vi_VN' : locale === 'ja' ? 'ja_JP' : 'en_US';

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    authors: [{ name: 'TNP', url: SITE_URL }],
    alternates: {
      canonical: `${SITE_URL}/${locale}/contact/`,
      languages: {
        en: `${SITE_URL}/en/contact/`,
        vi: `${SITE_URL}/vi/contact/`,
        ja: `${SITE_URL}/ja/contact/`,
        'x-default': `${SITE_URL}/en/contact/`,
      },
    },
    openGraph: {
      title: meta.ogTitle ?? meta.title,
      description: meta.description,
      url: `${SITE_URL}/${locale}/contact/`,
      siteName: 'TNP',
      locale: ogLocale,
      type: 'website',
      images: [{ url: `${SITE_URL}/assets/og/og-default.png`, width: 1200, height: 630, alt: meta.ogTitle ?? meta.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.ogTitle ?? meta.title,
      description: meta.description,
      images: [`${SITE_URL}/assets/og/og-default.png`],
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
      { '@type': 'ListItem', position: 1, name: 'TNP', item: `${SITE_URL}/${locale}/` },
      { '@type': 'ListItem', position: 2, name: 'Contact', item: `${SITE_URL}/${locale}/contact/` },
    ],
  };

  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact TNP',
    description: 'Request a free quote for solid wood flooring or custom timber furniture from TNP.',
    url: `${SITE_URL}/${locale}/contact/`,
    mainEntity: {
      '@type': 'LocalBusiness',
      name: 'TNP',
      legalName: 'Thinh Nguyen Phat Wooden Co., Ltd.',
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
