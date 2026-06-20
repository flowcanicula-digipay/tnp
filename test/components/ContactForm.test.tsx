import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import ContactForm from '@/components/ContactForm';
import { renderWithIntl } from '../renderWithIntl';

const messages = {
  title: 'Start Your Project',
  name: { label: 'Name', placeholder: 'Your name' },
  email: { label: 'Email', placeholder: 'you@example.com' },
  phone: { label: 'Phone', placeholder: '+84...', hint: 'Zalo/WhatsApp ok' },
  projectType: {
    label: 'Project type', placeholder: 'Select',
    options: { flooring: 'Flooring', furniture: 'Furniture', both: 'Both', commercial: 'Commercial', other: 'Other' },
  },
  timberPreference: {
    label: 'Timber', hint: 'Pick any',
    options: { keyaki: 'Keyaki', hinoki: 'Hinoki', oak: 'Oak', walnut: 'Walnut', ash: 'Ash', teak: 'Teak', other: 'Other' },
  },
  location: {
    label: 'Location', placeholder: 'Select',
    options: { vietnam: 'Vietnam', japan: 'Japan', international: 'International' },
  },
  quantity: { label: 'Quantity', placeholder: 'e.g. 50m2' },
  budget: { label: 'Budget', placeholder: 'Select' },
  language: {
    label: 'Preferred language',
    options: { en: 'English', vi: 'Vietnamese', ja: 'Japanese' },
  },
  description: { label: 'Description', placeholder: 'Tell us more', hint: 'Optional' },
  fileNote: 'Have files? Mention it.',
  submit: 'Send My Project Details',
  privacy: 'We respond within 48 hours.',
  successTitle: 'Thank you!',
  successText: 'We will be in touch soon.',
};

describe('ContactForm', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true }));
  });

  it('renders all required fields', () => {
    renderWithIntl(<ContactForm locale="en" messages={messages} />);
    expect(screen.getByLabelText(/Name/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: messages.submit })).toBeInTheDocument();
  });

  it('toggles timber checkboxes on and off', () => {
    renderWithIntl(<ContactForm locale="en" messages={messages} />);
    const hinoki = screen.getByRole('checkbox', { name: /Hinoki/ });
    expect(hinoki).not.toBeChecked();
    fireEvent.click(hinoki);
    expect(hinoki).toBeChecked();
    fireEvent.click(hinoki);
    expect(hinoki).not.toBeChecked();
  });

  it('defaults the preferred-language radio to the current locale', () => {
    renderWithIntl(<ContactForm locale="ja" messages={messages} />);
    const ja = screen.getByRole('radio', { name: 'Japanese' });
    expect(ja).toBeChecked();
  });

  it('submits the form to formspree and shows the success state', async () => {
    renderWithIntl(<ContactForm locale="en" messages={messages} />);
    fireEvent.change(screen.getByLabelText(/Name/), { target: { value: 'Tanaka' } });
    fireEvent.change(screen.getByLabelText(/Email/), { target: { value: 'tanaka@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: messages.submit }));

    await waitFor(() => {
      expect(screen.getByText('Thank you!')).toBeInTheDocument();
    });
    expect(fetch).toHaveBeenCalledWith(
      'https://formspree.io/f/mpqeyjea',
      expect.objectContaining({ method: 'POST' })
    );
  });

  it('alerts the user when the submission fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network error')));
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    renderWithIntl(<ContactForm locale="en" messages={messages} />);
    fireEvent.click(screen.getByRole('button', { name: messages.submit }));

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalled();
    });
    expect(screen.queryByText('Thank you!')).not.toBeInTheDocument();
  });
});
