import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import en from '@/messages/en.json';
import vi from '@/messages/vi.json';
import PortfolioPage, { generateMetadata, generateStaticParams } from '@/app/[locale]/portfolio/page';
import { renderServerPage } from '../../../renderServerPage';

describe('Portfolio page metadata', () => {
  it('lists all three locales for static generation', () => {
    expect(generateStaticParams()).toEqual([{ locale: 'en' }, { locale: 'vi' }, { locale: 'ja' }]);
  });

  it('builds canonical + alternate URLs scoped to /portfolio/', async () => {
    const meta = await generateMetadata({ params: Promise.resolve({ locale: 'vi' }) });
    expect(meta.alternates?.canonical).toBe('https://tnp.skaldris.com/vi/portfolio/');
    expect(meta.alternates?.languages?.en).toBe('https://tnp.skaldris.com/en/portfolio/');
    expect(meta.title).toBe(vi.meta.portfolio.title);
  });

  it('sets ogLocale to en_US for English', async () => {
    const meta = await generateMetadata({ params: Promise.resolve({ locale: 'en' }) });
    expect((meta.openGraph as { locale?: string })?.locale).toBe('en_US');
  });

  it('sets ogLocale to vi_VN for Vietnamese', async () => {
    const meta = await generateMetadata({ params: Promise.resolve({ locale: 'vi' }) });
    expect((meta.openGraph as { locale?: string })?.locale).toBe('vi_VN');
  });

  it('sets ogLocale to ja_JP for Japanese', async () => {
    const meta = await generateMetadata({ params: Promise.resolve({ locale: 'ja' }) });
    expect((meta.openGraph as { locale?: string })?.locale).toBe('ja_JP');
  });
});

describe('PortfolioPage', () => {
  it('renders the hero and gallery for the given locale', async () => {
    await renderServerPage(PortfolioPage({ params: Promise.resolve({ locale: 'en' }) }));
    expect(screen.getAllByText(en.portfolio.hero.title).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(en.portfolio.gallery.title)).toBeInTheDocument();
  });

  it('injects CollectionPage + BreadcrumbList JSON-LD schema', async () => {
    const { container } = await renderServerPage(
      PortfolioPage({ params: Promise.resolve({ locale: 'ja' }) })
    );
    const script = container.querySelector('script[type="application/ld+json"]');
    const schemas = JSON.parse(script!.innerHTML);
    expect(schemas.map((s: { '@type': string }) => s['@type'])).toEqual(['CollectionPage', 'BreadcrumbList']);
  });

  it('builds the breadcrumb schema with locale-aware URLs', async () => {
    const { container } = await renderServerPage(
      PortfolioPage({ params: Promise.resolve({ locale: 'vi' }) })
    );
    const script = container.querySelector('script[type="application/ld+json"]');
    const [, breadcrumb] = JSON.parse(script!.innerHTML);
    expect(breadcrumb.itemListElement[1].item).toBe('https://tnp.skaldris.com/vi/portfolio/');
  });
});
