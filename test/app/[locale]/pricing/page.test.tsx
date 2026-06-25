import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import en from '@/messages/en.json';
import vi from '@/messages/vi.json';
import PricingPage, { generateMetadata, generateStaticParams } from '@/app/[locale]/pricing/page';
import { renderServerPage } from '../../../renderServerPage';

describe('Pricing page metadata', () => {
  it('lists all three locales for static generation', () => {
    expect(generateStaticParams()).toEqual([{ locale: 'en' }, { locale: 'vi' }, { locale: 'ja' }]);
  });

  it('builds canonical + alternate URLs scoped to /pricing/', async () => {
    const meta = await generateMetadata({ params: Promise.resolve({ locale: 'vi' }) });
    expect(meta.alternates?.canonical).toBe('https://tnp.skaldris.com/vi/pricing/');
    expect(meta.alternates?.languages?.en).toBe('https://tnp.skaldris.com/en/pricing/');
    expect(meta.title).toBe(vi.meta.pricing.title);
  });
});

describe('PricingPage', () => {
  it('renders the pricing tiers and FAQ schema for the given locale', async () => {
    const { container } = await renderServerPage(
      PricingPage({ params: Promise.resolve({ locale: 'en' }) })
    );

    expect(screen.getByText(en.pricing.tiers.flooring.name)).toBeInTheDocument();

    const script = container.querySelector('script[type="application/ld+json"]');
    const schemas = JSON.parse(script!.innerHTML);
    expect(schemas.map((s: { '@type': string }) => s['@type'])).toEqual([
      'ItemList',
      'FAQPage',
      'BreadcrumbList',
    ]);
  });

  it('builds the breadcrumb schema with locale-aware URLs', async () => {
    const { container } = await renderServerPage(
      PricingPage({ params: Promise.resolve({ locale: 'ja' }) })
    );
    const script = container.querySelector('script[type="application/ld+json"]');
    const [, , breadcrumb] = JSON.parse(script!.innerHTML);
    expect(breadcrumb.itemListElement[1].item).toBe('https://tnp.skaldris.com/ja/pricing/');
  });
});
