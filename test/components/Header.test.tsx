import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, fireEvent, within } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import { renderWithIntl } from '../renderWithIntl';

const messages = {
  nav: { home: 'Home', portfolio: 'Portfolio', pricing: 'Pricing', contact: 'Contact', getQuote: 'Get a Quote' },
  languageSwitcher: { label: 'Language' },
};

describe('Header', () => {
  beforeEach(() => {
    vi.mocked(usePathname).mockReturnValue('/en/pricing');
  });

  it('renders localized nav links using the locale from the path', () => {
    renderWithIntl(<Header messages={messages} />);
    const desktopNav = screen.getByLabelText('Main navigation');
    expect(within(desktopNav).getByText('Home').closest('a')).toHaveAttribute('href', '/en');
    expect(within(desktopNav).getByText('Pricing').closest('a')).toHaveAttribute('href', '/en/pricing');
    expect(within(desktopNav).getByText('Contact').closest('a')).toHaveAttribute('href', '/en/contact');
  });

  it('falls back to the "en" locale when the path has no recognized locale segment', () => {
    vi.mocked(usePathname).mockReturnValue('/');
    renderWithIntl(<Header messages={messages} />);
    expect(screen.getByLabelText('Main navigation').querySelector('a')).toHaveAttribute('href', '/en');
  });

  it('toggles the mobile menu open and closed', () => {
    renderWithIntl(<Header messages={messages} />);
    expect(screen.queryByLabelText('Mobile navigation')).not.toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('Open menu'));
    expect(screen.getByLabelText('Mobile navigation')).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('Close menu'));
    expect(screen.queryByLabelText('Mobile navigation')).not.toBeInTheDocument();
  });

  it('closes the mobile menu after a nav link is clicked', () => {
    renderWithIntl(<Header messages={messages} />);
    fireEvent.click(screen.getByLabelText('Open menu'));
    const mobileNav = screen.getByLabelText('Mobile navigation');
    fireEvent.click(within(mobileNav).getByText('Pricing'));
    expect(screen.queryByLabelText('Mobile navigation')).not.toBeInTheDocument();
  });
});
