import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/siteUrl';
import PortfolioPageClient from '@/components/PortfolioPageClient';
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
  const messages = (await import(`@/messages/${locale}.json`)).default;
  const meta = messages.meta.portfolio;
  const ogLocale = locale === 'vi' ? 'vi_VN' : locale === 'ja' ? 'ja_JP' : 'en_US';

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    authors: [{ name: 'TNP', url: SITE_URL }],
    alternates: {
      canonical: `${SITE_URL}/${locale}/portfolio/`,
      languages: {
        en: `${SITE_URL}/en/portfolio/`,
        vi: `${SITE_URL}/vi/portfolio/`,
        ja: `${SITE_URL}/ja/portfolio/`,
        'x-default': `${SITE_URL}/en/portfolio/`,
      },
    },
    openGraph: {
      title: meta.ogTitle ?? meta.title,
      description: meta.description,
      url: `${SITE_URL}/${locale}/portfolio/`,
      siteName: 'TNP Wood',
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
  };
}

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = (await import(`@/messages/${locale}.json`)).default;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'TNP', item: `${SITE_URL}/${locale}/` },
      { '@type': 'ListItem', position: 2, name: 'Portfolio', item: `${SITE_URL}/${locale}/portfolio/` },
    ],
  };

  const portfolioSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'TNP Portfolio',
    description: 'A gallery of TNP solid wood flooring and timber furniture projects across Vietnam and export markets.',
    url: `${SITE_URL}/${locale}/portfolio/`,
    about: {
      '@type': 'LocalBusiness',
      name: 'TNP',
      legalName: 'Thịnh Nguyên Phát Wooden Co., Ltd.',
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
      <SchemaJsonLd schema={[portfolioSchema, breadcrumbSchema]} />
      <PortfolioPageClient locale={locale} messages={messages.portfolio} />
    </>
  );
}
