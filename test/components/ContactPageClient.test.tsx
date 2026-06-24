import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import ContactPageClient from '@/components/ContactPageClient';
import { renderWithIntl } from '../renderWithIntl';

const messages = {
  hero: {
    title: "Let's build something",
    titleAccent: 'together.',
    subtitle: 'Tell us about your project and we will get back within 48 hours.',
  },
  form: {
    title: 'Start Your Project',
    name: { label: 'Name', placeholder: 'Your name' },
    email: { label: 'Email', placeholder: 'you@example.com' },
    phone: { label: 'Phone', placeholder: '+84...', hint: 'Zalo/WhatsApp ok' },
    projectType: {
      label: 'Project type', placeholder: 'Select project type',
      options: { flooring: 'Flooring', furniture: 'Furniture', both: 'Both', commercial: 'Commercial', other: 'Other' },
    },
    timberPreference: {
      label: 'Timber', hint: 'Pick any',
      options: { keyaki: 'Keyaki', hinoki: 'Hinoki', oak: 'Oak', walnut: 'Walnut', ash: 'Ash', teak: 'Teak', other: 'Other' },
    },
    location: {
      label: 'Location', placeholder: 'Select location',
      options: { vietnam: 'Vietnam', japan: 'Japan', international: 'International' },
    },
    quantity: { label: 'Quantity', placeholder: 'e.g. 50m2' },
    budget: { label: 'Budget', placeholder: 'Select budget range' },
    language: { label: 'Preferred language', options: { en: 'English', vi: 'Vietnamese', ja: 'Japanese' } },
    description: { label: 'Description', placeholder: 'Tell us more', hint: 'Optional' },
    fileNote: 'Have files? Mention it.',
    submit: 'Send My Project Details',
    privacy: 'We respond within 48 hours.',
    successTitle: 'Thank you!',
    successText: 'We will be in touch soon.',
  },
  sidebar: {
    directContact: {
      title: 'Reach us directly',
      hours: 'Monday – Saturday, 8:00 AM – 5:00 PM (GMT+7)',
    },
    nextSteps: {
      title: 'What happens next?',
      step1: 'We review your details within 48 hours.',
      step2: 'We discuss materials and timeline.',
      step3: 'You receive a detailed quote.',
    },
    trust: {
      title: 'Factory-direct from Vietnam',
      text: 'One price. One team. No middlemen.',
    },
    privacyNote: 'Your details are used only to discuss your project.',
    photoAlt: 'TNP installed flooring',
  },
};

describe('ContactPageClient', () => {
  it('renders the hero headline', () => {
    renderWithIntl(<ContactPageClient locale="en" messages={messages} />);
    // Both hero lines are rendered (in hero + statement wipe-in)
    const headlines = screen.getAllByText(messages.hero.title);
    expect(headlines.length).toBeGreaterThanOrEqual(1);
  });

  it('renders the hero accent line', () => {
    renderWithIntl(<ContactPageClient locale="en" messages={messages} />);
    const accents = screen.getAllByText(messages.hero.titleAccent);
    expect(accents.length).toBeGreaterThanOrEqual(1);
  });

  it('renders the form with its aria-label', () => {
    renderWithIntl(<ContactPageClient locale="en" messages={messages} />);
    expect(screen.getByRole('form', { name: messages.form.title })).toBeInTheDocument();
  });

  it('renders the sidebar direct-contact heading', () => {
    renderWithIntl(<ContactPageClient locale="en" messages={messages} />);
    expect(screen.getByText(messages.sidebar.directContact.title)).toBeInTheDocument();
  });

  it('renders real contact details — phone and email', () => {
    renderWithIntl(<ContactPageClient locale="en" messages={messages} />);
    expect(screen.getByText('+84 90 333 37 29')).toBeInTheDocument();
    expect(screen.getByText('thuy@tnpgr.vn')).toBeInTheDocument();
  });

  it('renders the factory address', () => {
    renderWithIntl(<ContactPageClient locale="en" messages={messages} />);
    expect(screen.getByText(/KCN Tam Phước/)).toBeInTheDocument();
  });

  it('renders the three next-steps in order', () => {
    renderWithIntl(<ContactPageClient locale="en" messages={messages} />);
    expect(screen.getByText(messages.sidebar.nextSteps.step1)).toBeInTheDocument();
    expect(screen.getByText(messages.sidebar.nextSteps.step2)).toBeInTheDocument();
    expect(screen.getByText(messages.sidebar.nextSteps.step3)).toBeInTheDocument();
  });

  it('renders the next-steps section title', () => {
    renderWithIntl(<ContactPageClient locale="en" messages={messages} />);
    expect(screen.getByText(messages.sidebar.nextSteps.title)).toBeInTheDocument();
  });

  it('renders the trust card content', () => {
    renderWithIntl(<ContactPageClient locale="en" messages={messages} />);
    expect(screen.getByText(messages.sidebar.trust.text)).toBeInTheDocument();
  });

  it('renders the privacy disclaimer in the sidebar', () => {
    renderWithIntl(<ContactPageClient locale="en" messages={messages} />);
    expect(screen.getByText(messages.sidebar.privacyNote)).toBeInTheDocument();
  });

  it('renders the business hours', () => {
    renderWithIntl(<ContactPageClient locale="en" messages={messages} />);
    expect(screen.getByText(messages.sidebar.directContact.hours)).toBeInTheDocument();
  });
});
