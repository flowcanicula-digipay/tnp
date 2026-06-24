import { describe, it, expect } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import PortfolioPageClient from '@/components/PortfolioPageClient';
import { renderWithIntl } from '../renderWithIntl';

const messages = {
  hero: {
    eyebrow: 'TNP · Portfolio',
    title: 'The work,',
    titleAccent: 'not the pitch.',
    subtitle: 'A gallery of real projects.',
    ctaPrimary: 'Start Your Project',
    ctaSecondary: 'See Our Services',
    imageAlt: 'A finished TNP project',
  },
  philosophy: {
    eyebrow: 'What This Is',
    line1: 'A portfolio,',
    line2: 'not a highlight reel.',
    sub: 'No staged renders, no borrowed photos.',
  },
  geo: {
    eyebrow: 'Where We Build',
    title: 'Rooted in Biên Hòa.',
    subtitle: 'Shipping across Vietnam and beyond.',
    locations: ['Phú Mỹ Hưng', 'Thảo Điền', 'Vinhomes Central Park', 'Thủ Thiêm', 'An Phú', 'District 10', 'Vinhomes Golden River'],
    yourPlace: 'Your place?',
    exportNote: '+ Export to Japan & beyond',
  },
  gallery: {
    eyebrow: 'Selected Work',
    title: 'Best known for furniture. Built on flooring.',
    subtitle: 'Filter by what you are planning.',
    filters: { all: 'All', flooring: 'Flooring', furniture: 'Furniture', complete: 'Complete Projects' },
    viewProject: 'View project',
    items: [
      { title: 'Hinoki Floor, Curved Hall', category: 'flooring' as const },
      { title: 'Walnut Dining Set', category: 'furniture' as const },
      { title: 'Full Apartment Fit-Out', category: 'complete' as const },
    ],
  },
  closingCta: {
    title: 'Like what you see?',
    subtitle: 'Tell us about your space.',
    button: 'Start Your Project',
  },
};

describe('PortfolioPageClient', () => {
  it('renders the hero title and subtitle', () => {
    renderWithIntl(<PortfolioPageClient locale="en" messages={messages} />);
    expect(screen.getAllByText('The work,').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('A gallery of real projects.')).toBeInTheDocument();
  });

  it('renders the hero CTAs linking to contact and pricing', () => {
    renderWithIntl(<PortfolioPageClient locale="en" messages={messages} />);
    // "Start Your Project" appears in both the hero and the closing CTA — take the first (hero)
    const heroCta = screen.getAllByText('Start Your Project')[0];
    expect(heroCta.closest('a')).toHaveAttribute('href', '/en/contact');
    expect(screen.getByText('See Our Services').closest('a')).toHaveAttribute('href', '/en/pricing');
  });

  it('renders the philosophy statement lines', () => {
    renderWithIntl(<PortfolioPageClient locale="en" messages={messages} />);
    expect(screen.getByText('A portfolio,')).toBeInTheDocument();
    expect(screen.getByText('not a highlight reel.')).toBeInTheDocument();
  });

  it('renders all service-area location chips', () => {
    renderWithIntl(<PortfolioPageClient locale="en" messages={messages} />);
    for (const loc of messages.geo.locations) {
      expect(screen.getAllByText(loc).length).toBeGreaterThanOrEqual(1);
    }
  });

  it('renders the "your place" marker and export note', () => {
    renderWithIntl(<PortfolioPageClient locale="en" messages={messages} />);
    expect(screen.getByText('Your place?')).toBeInTheDocument();
    expect(screen.getByText('+ Export to Japan & beyond')).toBeInTheDocument();
  });

  it('renders all gallery items by default (filter = all)', () => {
    renderWithIntl(<PortfolioPageClient locale="en" messages={messages} />);
    expect(screen.getByText('Hinoki Floor, Curved Hall')).toBeInTheDocument();
    expect(screen.getByText('Walnut Dining Set')).toBeInTheDocument();
    expect(screen.getByText('Full Apartment Fit-Out')).toBeInTheDocument();
  });

  it('renders the four filter pills', () => {
    renderWithIntl(<PortfolioPageClient locale="en" messages={messages} />);
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Flooring' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Furniture' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Complete Projects' })).toBeInTheDocument();
  });

  it('"All" filter is pressed by default', () => {
    renderWithIntl(<PortfolioPageClient locale="en" messages={messages} />);
    expect(screen.getByRole('button', { name: 'All' })).toHaveAttribute('aria-pressed', 'true');
  });

  it('filtering by Flooring shows only flooring items', () => {
    renderWithIntl(<PortfolioPageClient locale="en" messages={messages} />);
    fireEvent.click(screen.getByRole('button', { name: 'Flooring' }));
    expect(screen.getByText('Hinoki Floor, Curved Hall')).toBeInTheDocument();
    expect(screen.queryByText('Walnut Dining Set')).not.toBeInTheDocument();
    expect(screen.queryByText('Full Apartment Fit-Out')).not.toBeInTheDocument();
  });

  it('filtering by Furniture shows only furniture items', () => {
    renderWithIntl(<PortfolioPageClient locale="en" messages={messages} />);
    fireEvent.click(screen.getByRole('button', { name: 'Furniture' }));
    expect(screen.getByText('Walnut Dining Set')).toBeInTheDocument();
    expect(screen.queryByText('Hinoki Floor, Curved Hall')).not.toBeInTheDocument();
  });

  it('filtering by Complete Projects shows only complete items', () => {
    renderWithIntl(<PortfolioPageClient locale="en" messages={messages} />);
    fireEvent.click(screen.getByRole('button', { name: 'Complete Projects' }));
    expect(screen.getByText('Full Apartment Fit-Out')).toBeInTheDocument();
    expect(screen.queryByText('Hinoki Floor, Curved Hall')).not.toBeInTheDocument();
  });

  it('switching back to "All" restores all items and updates aria-pressed', () => {
    renderWithIntl(<PortfolioPageClient locale="en" messages={messages} />);
    fireEvent.click(screen.getByRole('button', { name: 'Furniture' }));
    expect(screen.getByRole('button', { name: 'Furniture' })).toHaveAttribute('aria-pressed', 'true');
    fireEvent.click(screen.getByRole('button', { name: 'All' }));
    expect(screen.getByRole('button', { name: 'All' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText('Hinoki Floor, Curved Hall')).toBeInTheDocument();
    expect(screen.getByText('Walnut Dining Set')).toBeInTheDocument();
  });

  it('does not render any address/location text on gallery cards', () => {
    renderWithIntl(<PortfolioPageClient locale="en" messages={messages} />);
    expect(screen.queryByText('Vinhomes Central Park, HCMC')).not.toBeInTheDocument();
    expect(screen.queryByText('Thủ Thiêm, HCMC')).not.toBeInTheDocument();
  });

  it('renders the closing CTA with locale-aware contact link', () => {
    renderWithIntl(<PortfolioPageClient locale="ja" messages={messages} />);
    expect(screen.getByText('Like what you see?')).toBeInTheDocument();
    const ctaLinks = screen.getAllByText('Start Your Project');
    const closingLink = ctaLinks[ctaLinks.length - 1].closest('a');
    expect(closingLink).toHaveAttribute('href', '/ja/contact');
  });
});
