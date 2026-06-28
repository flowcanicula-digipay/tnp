'use client';

import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import ContactForm from './ContactForm';
import Reveal from './Reveal';

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

interface ContactPageClientProps {
  locale: string;
  messages: ContactMessages;
}

interface ContactMessages {
  hero: { title: string; titleAccent: string; subtitle: string };
  form: FormMessages;
  sidebar: {
    directContact: { title: string; hours: string };
    nextSteps: { title: string; step1: string; step2: string; step3: string };
    trust: { title: string; text: string };
    privacyNote: string;
    photoAlt: string;
  };
}

interface FormMessages {
  title: string;
  name: { label: string; placeholder: string };
  email: { label: string; placeholder: string };
  phone: { label: string; placeholder: string; hint: string };
  projectType: { label: string; placeholder: string; options: Record<string, string> };
  timberPreference: { label: string; hint: string; options: Record<string, string> };
  location: { label: string; placeholder: string; options: Record<string, string> };
  quantity: { label: string; placeholder: string };
  budget: { label: string; placeholder: string };
  language: { label: string; options: Record<string, string> };
  description: { label: string; placeholder: string; hint: string };
  fileNote: string;
  submit: string;
  privacy: string;
  successTitle: string;
  successText: string;
}

/* ── Bold statement wipe-in ─────────────────────────────────────────────── */
function ContactStatement({ title, accent }: { title: string; accent: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.2 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className="mb-14 lg:mb-20">
      {[title, accent].map((line, i) => (
        <div key={i} className="overflow-hidden">
          <h2
            className="font-serif font-bold leading-[1.0] tracking-tight transition-transform duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform"
            style={{
              fontSize: 'clamp(2.8rem, 7vw, 6.5rem)',
              color: i === 0 ? '#1A1814' : '#A97B3E',
              transform: visible ? 'translateY(0%)' : 'translateY(115%)',
              transitionDelay: `${i * 0.14}s`,
            }}
          >
            {line}
          </h2>
        </div>
      ))}
    </div>
  );
}

export default function ContactPageClient({ locale, messages: c }: ContactPageClientProps) {
  const nextSteps = [
    { num: '01', text: c.sidebar.nextSteps.step1 },
    { num: '02', text: c.sidebar.nextSteps.step2 },
    { num: '03', text: c.sidebar.nextSteps.step3 },
  ];

  return (
    <>
      {/* ─── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative min-h-[28vh] flex items-end overflow-hidden bg-forest-950">
        <Image
          src={`${base}/assets/images/portfolio/portfolio-7.jpg`}
          alt="" fill priority aria-hidden="true"
          className="object-cover animate-ken-burns"
          sizes="100vw"
        />
        {/* layered gradients for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/70 via-30% to-forest-950/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-950/80 via-forest-950/30 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_20%_80%,rgba(169,123,62,0.18),transparent_70%)]" />

        {/* Vertical amber accent bar — top right */}
        <span aria-hidden="true" className="absolute top-0 right-12 h-28 w-[2px] bg-gradient-to-b from-transparent via-timber-400 to-transparent" />

        {/* Motif — spinning heritage seal top-right */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${base}/assets/images/motifs/heritage-seal.svg`} alt="" aria-hidden="true"
          className="absolute top-16 right-16 w-32 h-32 opacity-[0.08] animate-motif-spin hidden lg:block" />

        {/* floating motes */}
        <div aria-hidden="true" className="animate-float absolute left-[12%] top-[30%] h-2 w-2 rounded-full bg-timber-400/50 blur-[2px]" style={{ animationDuration: '7s' }} />
        <div aria-hidden="true" className="animate-float absolute right-[30%] top-[22%] h-1.5 w-1.5 rounded-full bg-timber-300/40 blur-[1px]" style={{ animationDuration: '9s', animationDelay: '1.4s' }} />

        <div className="relative container-wide pb-8 lg:pb-10 pt-24">
          <p className="section-label text-timber-400 mb-4 animate-drift-up" style={{ animationDelay: '0.1s' }}>
            TNP · Contact
          </p>
          <h1 className="font-serif leading-[1.0] tracking-tight mb-5">
            <span className="block text-white animate-drift-up" style={{ fontSize: 'clamp(2.2rem, 5vw, 4.5rem)', animationDelay: '0.2s' }}>
              {c.hero.title}
            </span>
            <span className="block text-timber-400 animate-drift-up" style={{ fontSize: 'clamp(1.8rem, 4vw, 3.5rem)', animationDelay: '0.32s' }}>
              {c.hero.titleAccent}
            </span>
          </h1>
          <div className="flex items-center gap-5 animate-drift-up" style={{ animationDelay: '0.44s' }}>
            <div className="h-px w-12 bg-timber-500/50 shrink-0" />
            <p className="text-stone-400 text-sm max-w-md leading-relaxed">{c.hero.subtitle}</p>
          </div>
        </div>
      </section>

      {/* ─── MAIN — split layout ───────────────────────────────────────── */}
      <section className="bg-cream-50">
        <div className="container-wide">
          <div className="grid lg:grid-cols-[1fr_420px] gap-0 lg:gap-16 items-start py-20 lg:py-28">

            {/* ── LEFT — bold statement + form ── */}
            <div>
              {/* Statement headline wipe-in */}
              <ContactStatement title={c.hero.title} accent={c.hero.titleAccent} />

              {/* Form card */}
              <div className="bg-white rounded-3xl shadow-[0_4px_60px_rgba(15,14,12,0.07)] overflow-hidden">
                {/* Card top bar */}
                <div className="flex items-center justify-between px-8 pt-8 pb-6 border-b border-cream-100">
                  <div>
                    <p className="section-label mb-1">Start Your Project</p>
                    <h2 className="font-serif text-2xl text-forest-900">{c.form.title}</h2>
                  </div>
                  {/* Luban ruler motif */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`${base}/assets/images/motifs/luban-ruler.svg`} alt="" aria-hidden="true" className="w-12 h-12 opacity-30" />
                </div>
                <div className="px-8 py-8">
                  <ContactForm locale={locale} messages={c.form} />
                </div>
              </div>
            </div>

            {/* ── RIGHT — sticky sidebar ── */}
            <aside className="flex flex-col gap-7 lg:sticky lg:top-24 pt-0 lg:pt-0 mt-10 lg:mt-0">

              {/* Photo */}
              <Reveal>
                <figure className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                  <Image
                    src={`${base}/assets/images/installation/installation-4.jpg`}
                    alt={c.sidebar.photoAlt} fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    sizes="420px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-forest-950/10 to-transparent" />
                  {/* Overlay text */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-white/50 text-[10px] uppercase tracking-widest font-bold mb-1">Factory-direct</p>
                    <p className="font-serif text-white text-xl leading-tight">Built in Biên Hòa.<br/>Shipped worldwide.</p>
                  </div>
                </figure>
              </Reveal>

              {/* Direct contact card */}
              <Reveal delay={0.08}>
                <div className="bg-forest-900 rounded-2xl p-7 text-white">
                  <div className="flex items-center gap-3 mb-6">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`${base}/assets/images/motifs/envelope-seal.svg`} alt="" aria-hidden="true"
                      className="w-8 h-8 opacity-70" style={{ filter: 'brightness(3) sepia(1) saturate(1.5)' }} />
                    <h3 className="font-serif text-lg">{c.sidebar.directContact.title}</h3>
                  </div>

                  <address className="not-italic flex flex-col gap-0 divide-y divide-white/10">
                    {/* Email primary */}
                    <a href="mailto:thuyken52914@yahoo.com.vn"
                      className="flex items-center gap-4 py-3.5 group">
                      <span className="text-timber-400/60 text-[10px] uppercase tracking-widest w-14 shrink-0">Email</span>
                      <span className="text-white/70 text-sm group-hover:text-timber-400 transition-colors truncate">thuyken52914@yahoo.com.vn</span>
                    </a>
                    {/* Email alt */}
                    <a href="mailto:anhkiet3333@yahoo.com"
                      className="flex items-center gap-4 py-3.5 group">
                      <span className="text-timber-400/60 text-[10px] uppercase tracking-widest w-14 shrink-0">Alt</span>
                      <span className="text-white/70 text-sm group-hover:text-timber-400 transition-colors truncate">anhkiet3333@yahoo.com</span>
                    </a>
                    {/* Phone */}
                    <a href="tel:+84903333729"
                      className="flex items-center gap-4 py-3.5 group">
                      <span className="text-timber-400/60 text-[10px] uppercase tracking-widest w-14 shrink-0">Phone</span>
                      <span className="text-white/70 text-sm group-hover:text-timber-400 transition-colors">+84 90 333 37 29</span>
                    </a>
                    {/* Address */}
                    <div className="flex items-start gap-4 py-3.5">
                      <span className="text-timber-400/60 text-[10px] uppercase tracking-widest w-14 shrink-0 mt-0.5">Address</span>
                      <span className="text-white/60 text-sm leading-relaxed">Lô 35 đường số 9, KCN Tam Phước, Biên Hòa, Vietnam</span>
                    </div>
                    {/* Hours */}
                    <div className="flex items-center gap-4 py-3.5">
                      <span className="text-timber-400/60 text-[10px] uppercase tracking-widest w-14 shrink-0">Hours</span>
                      <span className="text-white/50 text-sm italic">{c.sidebar.directContact.hours}</span>
                    </div>
                  </address>
                </div>
              </Reveal>

              {/* What happens next */}
              <Reveal delay={0.14}>
                <div className="bg-white rounded-2xl border border-cream-200 p-7">
                  <h3 className="font-serif text-lg text-forest-900 mb-6">{c.sidebar.nextSteps.title}</h3>
                  <ol className="flex flex-col gap-6">
                    {nextSteps.map(({ num, text }) => (
                      <li key={num} className="flex items-start gap-5">
                        <span className="font-serif text-3xl font-bold text-timber-300/70 leading-none shrink-0 w-10 tabular-nums">{num}</span>
                        <p className="text-stone-600 text-sm leading-relaxed pt-1">{text}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              </Reveal>

              {/* Trust amber card */}
              <Reveal delay={0.2}>
                <div className="relative overflow-hidden bg-timber-500 rounded-2xl p-7 text-white">
                  {/* decorative compass motif */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`${base}/assets/images/motifs/compass-seal.svg`} alt="" aria-hidden="true"
                    className="absolute -bottom-4 -right-4 w-24 h-24 opacity-20 animate-motif-spin" />
                  <p className="section-label text-timber-100/70 mb-3">{c.sidebar.trust.title}</p>
                  <p className="text-timber-50 text-sm leading-relaxed relative z-10">{c.sidebar.trust.text}</p>
                </div>
              </Reveal>

              {/* Privacy note */}
              <Reveal delay={0.24}>
                <p className="flex items-start gap-3 text-xs text-stone-400 px-1">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`${base}/assets/images/motifs/lotus-seal.svg`} alt="" aria-hidden="true" className="w-4 h-4 mt-0.5 shrink-0 opacity-50" />
                  {c.sidebar.privacyNote}
                </p>
              </Reveal>

            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
