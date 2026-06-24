import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import en from '@/messages/en.json';
import ContactPage, { generateMetadata, generateStaticParams } from '@/app/[locale]/contact/page';
import { renderServerPage } from '../../../renderServerPage';

describe('Contact page metadata', () => {
  it('lists all three locales for static generation', () => {
    expect(generateStaticParams()).toEqual([{ locale: 'en' }, { locale: 'vi' }, { locale: 'ja' }]);
  });

  it('builds canonical + geo metadata scoped to /contact/', async () => {
    const meta = await generateMetadata({ params: Promise.resolve({ locale: 'en' }) });
    expect(meta.alternates?.canonical).toBe('https://flow-canicula.github.io/tnp/en/contact/');
    expect(meta.other?.['geo.placename']).toBe('Biên Hòa, Đồng Nai, Vietnam');
  });
});

describe('ContactPage', () => {
  it('renders the hero, contact form, and sidebar for the given locale', async () => {
    await renderServerPage(ContactPage({ params: Promise.resolve({ locale: 'en' }) }));

    // Title appears in both hero and the statement wipe-in — use getAllByText
    expect(screen.getAllByText(en.contact.hero.title).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByRole('form', { name: en.contact.form.title })).toBeInTheDocument();
    expect(screen.getByText('+84 90 333 37 29')).toBeInTheDocument();
  });

  it('renders the "what happens next" steps in order', async () => {
    await renderServerPage(ContactPage({ params: Promise.resolve({ locale: 'en' }) }));
    expect(screen.getByText(en.contact.sidebar.nextSteps.step1)).toBeInTheDocument();
    expect(screen.getByText(en.contact.sidebar.nextSteps.step3)).toBeInTheDocument();
  });

  it('injects ContactPage + BreadcrumbList JSON-LD schema', async () => {
    const { container } = await renderServerPage(
      ContactPage({ params: Promise.resolve({ locale: 'ja' }) })
    );
    const script = container.querySelector('script[type="application/ld+json"]');
    const schemas = JSON.parse(script!.innerHTML);
    expect(schemas.map((s: { '@type': string }) => s['@type'])).toEqual(['ContactPage', 'BreadcrumbList']);
  });
});
