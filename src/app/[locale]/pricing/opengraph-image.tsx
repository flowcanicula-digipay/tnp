import { OG_SIZE, OG_CONTENT_TYPE, buildOgImage } from '@/lib/og-image';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'vi' }, { locale: 'ja' }];
}

const content = {
  en: {
    label: 'TNP Pricing · Biên Hòa, Vietnam',
    headline: 'Transparent pricing for flooring and furniture.',
    sub: 'Sourcing · Manufacturing · Delivery · Installation',
  },
  vi: {
    label: 'TNP Báo giá · Biên Hòa, Việt Nam',
    headline: 'Báo giá rõ ràng cho sàn gỗ và nội thất.',
    sub: 'Từ nguồn gỗ đến lắp đặt hoàn chỉnh',
  },
  ja: {
    label: 'TNP 価格案内 · ベトナム・ビエンホア',
    headline: 'フローリング・家具のわかりやすい価格。',
    sub: '素材調達から設置まで一貫対応',
  },
};

export default async function OgImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const c = content[locale as keyof typeof content] ?? content.en;
  return buildOgImage(locale, 'assets/images/materials/materials-3.jpg', c);
}
