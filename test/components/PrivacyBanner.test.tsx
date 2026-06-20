import { describe, it, expect } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import PrivacyBanner from '@/components/PrivacyBanner';
import { renderWithIntl } from '../renderWithIntl';

const messages = { text: 'We use cookies.', linkLabel: 'Learn more', accept: 'Accept' };

describe('PrivacyBanner', () => {
  it('shows the banner when no prior consent is stored', () => {
    renderWithIntl(<PrivacyBanner locale="en" messages={messages} />);
    expect(screen.getByRole('dialog', { name: 'Privacy notice' })).toBeInTheDocument();
    expect(screen.getByText('Learn more').closest('a')).toHaveAttribute('href', '/en/privacy');
  });

  it('does not render when consent was already accepted', () => {
    window.localStorage.setItem('tnp_privacy_accepted', '1');
    renderWithIntl(<PrivacyBanner locale="en" messages={messages} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('hides the banner and stores consent when Accept is clicked', () => {
    renderWithIntl(<PrivacyBanner locale="en" messages={messages} />);
    fireEvent.click(screen.getByRole('button', { name: 'Accept' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(window.localStorage.getItem('tnp_privacy_accepted')).toBe('1');
  });

  it('hides the banner and stores consent when dismissed via the close icon', () => {
    renderWithIntl(<PrivacyBanner locale="en" messages={messages} />);
    fireEvent.click(screen.getByRole('button', { name: 'Dismiss' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(window.localStorage.getItem('tnp_privacy_accepted')).toBe('1');
  });
});
