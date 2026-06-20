import { describe, it, expect } from 'vitest';
import { screen, fireEvent, within } from '@testing-library/react';
import CtaBanner from '@/components/CtaBanner';
import { renderWithIntl } from '../renderWithIntl';

const messages = { title: 'Ready to start?', body: 'Tell us about your space.', button: 'Request a Free Quote' };

describe('CtaBanner', () => {
  it('renders the title, body, and a locale-aware CTA link', () => {
    renderWithIntl(<CtaBanner locale="vi" messages={messages} />);
    expect(screen.getByText('Ready to start?')).toBeInTheDocument();
    expect(screen.getByText('Request a Free Quote').closest('a')).toHaveAttribute('href', '/vi/contact');
  });

  it('renders four mosaic image buttons', () => {
    renderWithIntl(<CtaBanner locale="en" messages={messages} />);
    expect(screen.getAllByRole('button')).toHaveLength(4);
  });

  it('highlights a mosaic tile on hover and clears it on mouse leave', () => {
    renderWithIntl(<CtaBanner locale="en" messages={messages} />);
    const [first] = screen.getAllByRole('button');
    fireEvent.mouseEnter(first);
    expect(within(first).getByRole('img').className).toContain('scale-110');
    fireEvent.mouseLeave(first);
    expect(within(first).getByRole('img').className).toContain('scale-100');
  });

  it('toggles the active tile when clicked', () => {
    renderWithIntl(<CtaBanner locale="en" messages={messages} />);
    const [first] = screen.getAllByRole('button');
    fireEvent.click(first);
    expect(within(first).getByRole('img').className).toContain('scale-110');
    fireEvent.click(first);
    expect(within(first).getByRole('img').className).toContain('scale-100');
  });
});
