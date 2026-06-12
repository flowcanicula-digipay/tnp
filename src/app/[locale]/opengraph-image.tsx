import { OG_SIZE, OG_CONTENT_TYPE, buildOgImage } from '@/lib/og-image';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'vi' }, { locale: 'ja' }];
}

const content = {
  en: {
    label: 'TNP · Biên Hòa, Vietnam',
    headline: 'Solid wood flooring and timber furniture.',
    sub: 'Japanese quality · Vietnamese craftsmanship',
  },
  vi: {
    label: 'TNP · Biên Hòa, Việt Nam',
    headline: 'Sàn gỗ tự nhiên và nội thất gỗ cao cấp.',
    sub: 'Chất lượng Nhật Bản · Tay nghề Việt Nam',
  },
  ja: {
    label: 'TNP · ベトナム・ビエンホア',
    headline: '無垢材フローリング・木製家具。',
    sub: '日本品質・ベトナムの職人技',
  },
};

export default async function OgImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const c = content[locale as keyof typeof content] ?? content.en;
  return buildOgImage(locale, 'assets/images/portfolio/portfolio-1.jpg', c);
}
