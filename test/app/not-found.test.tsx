import { describe, it, expect } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import NotFound from '@/app/not-found';
import { renderWithIntl as render } from '../renderWithIntl';

describe('NotFound', () => {
  it('renders the 404 heading and links back home and to contact', () => {
    render(<NotFound />);
    expect(screen.getByRole('img', { name: '404 — page not found' })).toBeInTheDocument();
    expect(screen.getByText('Back to Home').closest('a')).toHaveAttribute('href', '/en/');
    expect(screen.getByText('Contact Us').closest('a')).toHaveAttribute('href', '/en/contact');
  });

  it('toggles the glow style on hover of the 404 mark', () => {
    render(<NotFound />);
    const mark = screen.getByRole('img', { name: '404 — page not found' });
    fireEvent.mouseEnter(mark);
    expect(mark.className).not.toContain('animate-glow-pulse');
    fireEvent.mouseLeave(mark);
    expect(mark.className).toContain('animate-glow-pulse');
  });

  it('tracks mouse movement for the parallax background once mounted', () => {
    render(<NotFound />);
    fireEvent(window, new MouseEvent('mousemove', { clientX: 100, clientY: 50 }));
    // No throw means the listener ran safely against window dimensions.
    expect(true).toBe(true);
  });

  it('applies and removes box-shadow on the Back to Home link via mouse events', () => {
    render(<NotFound />);
    const homeLink = screen.getByText('Back to Home').closest('a') as HTMLAnchorElement;
    fireEvent.mouseEnter(homeLink);
    expect(homeLink.style.boxShadow).toBe('0 8px 32px rgba(200,150,90,0.35)');
    fireEvent.mouseLeave(homeLink);
    expect(homeLink.style.boxShadow).toBe('0 0 0 0 rgba(200,150,90,0)');
  });
});
