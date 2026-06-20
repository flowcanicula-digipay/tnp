import { describe, it, expect } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import StatCounter from '@/components/StatCounter';
import { renderWithIntl } from '../renderWithIntl';

describe('StatCounter', () => {
  it('renders the label', () => {
    renderWithIntl(<StatCounter value="300+" label="Projects completed" />);
    expect(screen.getByText('Projects completed')).toBeInTheDocument();
  });

  it('animates a numeric prefix up to its target value, keeping the suffix', async () => {
    renderWithIntl(<StatCounter value="300+" label="Projects" />);
    await waitFor(() => {
      expect(screen.getByText('300+')).toBeInTheDocument();
    });
  });

  it('renders non-numeric values unchanged', () => {
    renderWithIntl(<StatCounter value="N/A" label="Unknown" />);
    expect(screen.getByText('N/A')).toBeInTheDocument();
  });
});
