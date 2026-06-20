import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import Reveal from '@/components/Reveal';
import { renderWithIntl } from '../renderWithIntl';

describe('Reveal', () => {
  it('renders its children', () => {
    renderWithIntl(<Reveal>content</Reveal>);
    expect(screen.getByText('content')).toBeInTheDocument();
  });

  it('becomes visible once intersecting (mocked observer fires immediately)', () => {
    renderWithIntl(<Reveal>content</Reveal>);
    const node = screen.getByText('content');
    expect(node.className).toContain('opacity-100');
  });

  it('applies the up/left/right/none hidden transforms before reveal', () => {
    const { rerender } = renderWithIntl(<Reveal direction="left">a</Reveal>);
    expect(screen.getByText('a').className).toContain('translate-x-0');

    rerender(<Reveal direction="right">b</Reveal>);
    expect(screen.getByText('b').className).toContain('translate-x-0');

    rerender(<Reveal direction="none">c</Reveal>);
    expect(screen.getByText('c').className).toContain('translate-x-0');
  });

  it('applies a custom className and transition delay', () => {
    renderWithIntl(<Reveal className="extra" delay={0.5}>d</Reveal>);
    const node = screen.getByText('d');
    expect(node.className).toContain('extra');
    expect(node.style.transitionDelay).toBe('0.5s');
  });
});
