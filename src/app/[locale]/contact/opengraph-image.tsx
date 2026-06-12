import { OG_SIZE, OG_CONTENT_TYPE, buildOgImage } from '@/lib/og-image';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'vi' }, { locale: 'ja' }];
}

const content = {
  en: {
    label: 'TNP · Start Your Project',
    headline: "Let's build something together.",
    sub: 'Free quote within 48 hours · Factory-direct from Vietnam',
  },
  vi: {
    label: 'TNP · Bắt đầu dự án của bạn',
    headline: 'Hãy cùng tạo nên điều gì đó.',
    sub: 'Báo giá miễn phí trong 48 giờ · Trực tiếp từ nhà máy',
  },
  ja: {
    label: 'TNP · プロジェクトを始めましょう',
    headline: '一緒に作り上げましょう。',
    sub: '48時間以内に無料見積もり · ベトナム工場直送',
  },
};

export default async function OgImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const c = content[locale as keyof typeof content] ?? content.en;
  return buildOgImage(locale, 'assets/images/installation/installation-1.jpg', c);
}
