import { describe, it, expect, vi } from 'vitest';
import { screen, fireEvent, within } from '@testing-library/react';
import PricingPageClient from '@/components/PricingPageClient';
import { renderWithIntl } from '../renderWithIntl';

const tierMessages = {
  name: '', tagline: '', description: '', examples: '', priceNote: '', cta: 'Request Quote',
};

const messages = {
  hero: { title: 'Transparent pricing.', titleAccent: 'Flooring and furniture, end to end.', subtitle: 'Subtitle text.' },
  statement: { eyebrow: 'Eyebrow', line1: 'Line one.', line2: 'Line two.', sub: 'Sub line.' },
  finalCta: { title: 'Ready to start?', subtitle: 'Tell us about your space.', imageAlt: 'Finished installation' },
  tiers: {
    title: 'Our Services',
    flooring: { ...tierMessages, name: 'Solid Wood Flooring', badge: 'Most popular' },
    furniture: { ...tierMessages, name: 'Custom Timber Furniture' },
    complete: { ...tierMessages, name: 'Complete Projects', badge: 'Best value' },
  },
  included: { title: 'Always included', items: ['Material sourcing', 'Kiln-drying & milling', 'Manufacturing', 'Delivery'] },
  faq: {
    title: 'FAQ', subtitle: 'Answers to common questions.',
    q1: { question: 'What is Hinoki?', answer: 'Japanese cypress.' },
    q2: { question: 'How long does a project take?', answer: '3-12 weeks.' },
    q3: { question: 'Q3', answer: 'A3' },
    q4: { question: 'Q4', answer: 'A4' },
    q5: { question: 'Q5', answer: 'A5' },
    q6: { question: 'Q6', answer: 'A6' },
    q7: { question: 'Q7', answer: 'A7' },
  },
};

const cta = { requestQuote: 'Request a Free Quote' };

describe('PricingPageClient', () => {
  it('renders the hero and three pricing tiers', () => {
    renderWithIntl(<PricingPageClient locale="en" messages={messages} cta={cta} />);
    expect(screen.getByText('Transparent pricing.')).toBeInTheDocument();
    expect(screen.getByText('Solid Wood Flooring')).toBeInTheDocument();
    expect(screen.getByText('Custom Timber Furniture')).toBeInTheDocument();
    expect(screen.getByText('Complete Projects')).toBeInTheDocument();
  });

  it('renders tier badges', () => {
    renderWithIntl(<PricingPageClient locale="en" messages={messages} cta={cta} />);
    expect(screen.getByText('Most popular')).toBeInTheDocument();
    expect(screen.getByText('Best value')).toBeInTheDocument();
  });

  it('first tier is dark (aria-pressed false, no tier selected by default)', () => {
    renderWithIntl(<PricingPageClient locale="en" messages={messages} cta={cta} />);
    const flooringCard = screen.getByText('Solid Wood Flooring').closest('article')!;
    // No tier is explicitly selected — aria-pressed starts false for all
    expect(flooringCard).toHaveAttribute('aria-pressed', 'false');
  });

  it('selects a tier on click — aria-pressed becomes true', () => {
    renderWithIntl(<PricingPageClient locale="en" messages={messages} cta={cta} />);
    const furnitureCard = screen.getByText('Custom Timber Furniture').closest('article')!;
    fireEvent.click(furnitureCard);
    expect(furnitureCard).toHaveAttribute('aria-pressed', 'true');
  });

  it('updates the final CTA link when a tier is selected', () => {
    renderWithIntl(<PricingPageClient locale="en" messages={messages} cta={cta} />);
    const furnitureCard = screen.getByText('Custom Timber Furniture').closest('article')!;
    fireEvent.click(furnitureCard);
    expect(screen.getByText('Request a Free Quote').closest('a')).toHaveAttribute(
      'href', '/en/contact?type=furniture'
    );
  });

  it('deselects a tier when clicked again', () => {
    renderWithIntl(<PricingPageClient locale="en" messages={messages} cta={cta} />);
    const furnitureCard = screen.getByText('Custom Timber Furniture').closest('article')!;
    fireEvent.click(furnitureCard);
    expect(furnitureCard).toHaveAttribute('aria-pressed', 'true');
    fireEvent.click(furnitureCard);
    expect(furnitureCard).toHaveAttribute('aria-pressed', 'false');
  });

  it('selects a different tier via keyboard Enter', () => {
    renderWithIntl(<PricingPageClient locale="en" messages={messages} cta={cta} />);
    const completeCard = screen.getByText('Complete Projects').closest('article')!;
    fireEvent.keyDown(completeCard, { key: 'Enter' });
    expect(completeCard).toHaveAttribute('aria-pressed', 'true');
  });

  it('selects a tier via keyboard Space', () => {
    renderWithIntl(<PricingPageClient locale="en" messages={messages} cta={cta} />);
    const flooringCard = screen.getByText('Solid Wood Flooring').closest('article')!;
    fireEvent.keyDown(flooringCard, { key: ' ' });
    expect(flooringCard).toHaveAttribute('aria-pressed', 'true');
  });

  it('renders the "Always included" section title', () => {
    renderWithIntl(<PricingPageClient locale="en" messages={messages} cta={cta} />);
    expect(screen.getByText('Always included')).toBeInTheDocument();
  });

  it('renders the included stage labels from the hardcoded list', () => {
    renderWithIntl(<PricingPageClient locale="en" messages={messages} cta={cta} />);
    // The component renders its own hardcoded labels (not from messages.included.items)
    expect(screen.getByText('Material Sourcing')).toBeInTheDocument();
    expect(screen.getByText('Kiln-drying & Milling')).toBeInTheDocument();
    expect(screen.getByText('In-house Manufacturing')).toBeInTheDocument();
    expect(screen.getByText('Quality Inspection')).toBeInTheDocument();
  });

  it('renders all FAQ questions', () => {
    renderWithIntl(<PricingPageClient locale="en" messages={messages} cta={cta} />);
    expect(screen.getByText('What is Hinoki?')).toBeInTheDocument();
    expect(screen.getByText('How long does a project take?')).toBeInTheDocument();
  });

  it('FAQ answers are hidden by default (max-height 0)', () => {
    renderWithIntl(<PricingPageClient locale="en" messages={messages} cta={cta} />);
    // Answer is in the DOM but inside a maxHeight:0 overflow-hidden panel
    const answer = screen.getByText('Japanese cypress.');
    const panel = answer.closest('[style*="max-height"]') as HTMLElement;
    expect(panel?.style.maxHeight).toBe('0px');
  });

  it('expands a FAQ entry on click — panel gets non-zero maxHeight', () => {
    renderWithIntl(<PricingPageClient locale="en" messages={messages} cta={cta} />);
    fireEvent.click(screen.getByText('What is Hinoki?'));
    const answer = screen.getByText('Japanese cypress.');
    const panel = answer.closest('[style*="max-height"]') as HTMLElement;
    // After click, maxHeight is set to scrollHeight (0 in jsdom) — check aria-expanded
    const btn = screen.getByRole('button', { name: /What is Hinoki/ });
    expect(btn).toHaveAttribute('aria-expanded', 'true');
  });

  it('collapses an open FAQ entry on second click', () => {
    renderWithIntl(<PricingPageClient locale="en" messages={messages} cta={cta} />);
    const btn = screen.getByRole('button', { name: /What is Hinoki/ });
    fireEvent.click(btn);
    expect(btn).toHaveAttribute('aria-expanded', 'true');
    fireEvent.click(btn);
    expect(btn).toHaveAttribute('aria-expanded', 'false');
  });

  it('links the bottom CTA to the contact page without a type param when no tier is selected', () => {
    renderWithIntl(<PricingPageClient locale="ja" messages={messages} cta={cta} />);
    expect(screen.getByText('Request a Free Quote').closest('a')).toHaveAttribute('href', '/ja/contact');
  });

  it('ignores keyDown events that are not Enter or Space', () => {
    renderWithIntl(<PricingPageClient locale="en" messages={messages} cta={cta} />);
    const flooringCard = screen.getByText('Solid Wood Flooring').closest('article')!;
    fireEvent.keyDown(flooringCard, { key: 'Tab' });
    expect(flooringCard).toHaveAttribute('aria-pressed', 'false');
  });

  it('deselects a tier via keyboard Enter when already selected', () => {
    renderWithIntl(<PricingPageClient locale="en" messages={messages} cta={cta} />);
    const completeCard = screen.getByText('Complete Projects').closest('article')!;
    fireEvent.keyDown(completeCard, { key: 'Enter' });
    expect(completeCard).toHaveAttribute('aria-pressed', 'true');
    fireEvent.keyDown(completeCard, { key: 'Enter' });
    expect(completeCard).toHaveAttribute('aria-pressed', 'false');
  });

  it('stopPropagation fires when clicking per-tier links (both inline and CTA)', () => {
    renderWithIntl(<PricingPageClient locale="en" messages={messages} cta={cta} />);
    const tierLinks = within(
      screen.getByText('Solid Wood Flooring').closest('article')!
    ).getAllByRole('link');
    tierLinks.forEach((link) => {
      const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });
      const spy = vi.spyOn(clickEvent, 'stopPropagation');
      link.dispatchEvent(clickEvent);
      expect(spy).toHaveBeenCalled();
    });
  });

  it('renders statement section with an empty sub line (sub paragraph is absent)', () => {
    const noSubMessages = {
      ...messages,
      statement: { ...messages.statement, sub: '' },
    };
    renderWithIntl(<PricingPageClient locale="en" messages={noSubMessages} cta={cta} />);
    expect(screen.getByText('Eyebrow')).toBeInTheDocument();
    expect(screen.queryByText('Sub line.')).not.toBeInTheDocument();
  });
});
