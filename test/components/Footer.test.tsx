import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, within } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import Footer from '@/components/Footer';
import { renderWithIntl } from '../renderWithIntl';

const messages = {
  common: {
    footer: {
      scene: { location: 'Biên Hòa', viLabel: 'Việt Nam · Gỗ tự nhiên', materials: 'ヒノキ・ケヤキ', craft: 'Crafted with care' },
      brand: { tagline: 'Supplying solid wood flooring and timber furniture.', social: 'Follow us' },
      quickLinks: {
        title: 'Quick links', home: 'Home', about: 'About', process: 'Process',
        pricing: 'Pricing', contact: 'Contact', privacy: 'Privacy',
      },
      contact: { title: 'Contact', address: 'Lô 35 đường số 9, Biên Hòa' },
      markets: { title: 'Markets served', text: 'Vietnam, Japan, and worldwide.' },
      copyright: '© {year} TNP. All rights reserved.',
      certifications: 'Certifications',
    },
    languageSwitcher: { label: 'Language' },
  },
};

describe('Footer', () => {
  beforeEach(() => {
    vi.mocked(usePathname).mockReturnValue('/en');
  });

  it('renders the brand tagline and Vietnamese scene caption', () => {
    renderWithIntl(<Footer locale="en" messages={messages} />);
    expect(screen.getByText(messages.common.footer.brand.tagline)).toBeInTheDocument();
    expect(screen.getByText(/Việt Nam/).textContent).toContain('Gỗ tự nhiên');
  });

  it('builds locale-aware quick links', () => {
    renderWithIntl(<Footer locale="ja" messages={messages} />);
    const quickLinks = screen.getByLabelText('Footer navigation');
    expect(within(quickLinks).getByText('Pricing').closest('a')).toHaveAttribute('href', '/ja/pricing');
    expect(within(quickLinks).getByText('Privacy').closest('a')).toHaveAttribute('href', '/ja/privacy');
  });

  it('substitutes {year} in the copyright string', () => {
    renderWithIntl(<Footer locale="en" messages={messages} />);
    const year = new Date().getFullYear();
    expect(screen.getByText(`© ${year} TNP. All rights reserved.`)).toBeInTheDocument();
  });

  it('renders direct contact details', () => {
    renderWithIntl(<Footer locale="en" messages={messages} />);
    expect(screen.getByText('thuy@tnpgr.vn').closest('a')).toHaveAttribute('href', 'mailto:thuy@tnpgr.vn');
    expect(screen.getByText('+84 90 333 37 29').closest('a')).toHaveAttribute('href', 'tel:+84903333729');
  });
});
