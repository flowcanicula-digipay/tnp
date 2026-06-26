'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import Reveal from './Reveal';

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const tierKeys = ['flooring', 'furniture', 'complete'] as const;

const tierImages = [
  `${base}/assets/images/materials/materials-2.jpg`,
  `${base}/assets/images/creation/creation.jpg`,
  `${base}/assets/images/portfolio/portfolio-2.jpg`,
];

const tierMotifs = [
  `${base}/assets/images/motifs/pricing-consult.svg`,
  `${base}/assets/images/motifs/pricing-design.svg`,
  `${base}/assets/images/motifs/pricing-fullservice.svg`,
];

const includedData = [
  { label: 'Material Sourcing',         img: `${base}/assets/images/materials/materials-1.jpg`,       motif: `${base}/assets/images/motifs/timber-stack.svg` },
  { label: 'Kiln-drying & Milling',     img: `${base}/assets/images/creation/building-2.jpg`,         motif: `${base}/assets/images/motifs/kiln-mill.svg` },
  { label: 'In-house Manufacturing',    img: `${base}/assets/images/creation/creation.jpg`,            motif: `${base}/assets/images/motifs/factory-roofline.svg` },
  { label: 'Quality Inspection',        img: `${base}/assets/images/creation/building-4.jpg`,          motif: `${base}/assets/images/motifs/inspect-mark.svg` },
  { label: 'Delivery & Protection',     img: `${base}/assets/images/installation/installation-6.jpg`,  motif: `${base}/assets/images/motifs/pallet-wrap.svg` },
  { label: 'Professional Installation', img: `${base}/assets/images/installation/installation-3.jpg`,  motif: `${base}/assets/images/motifs/installation.svg` },
];

const faqKeys = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7'] as const;

type TierKey = (typeof tierKeys)[number];
type FaqKey  = (typeof faqKeys)[number];

interface TierMessages {
  name: string; tagline: string; description: string;
  examples: string; priceNote: string; cta: string; badge?: string;
}
interface FaqEntry { question: string; answer: string; }
interface PricingMessages {
  hero: { title: string; titleAccent: string; subtitle: string };
  statement: { eyebrow: string; line1: string; line2: string; sub: string };
  tiers: { title: string; flooring: TierMessages; furniture: TierMessages; complete: TierMessages };
  included: { title: string; items: string[] };
  faq: { title: string; subtitle: string; q1: FaqEntry; q2: FaqEntry; q3: FaqEntry; q4: FaqEntry; q5: FaqEntry; q6: FaqEntry; q7: FaqEntry };
  finalCta: { title: string; subtitle: string; imageAlt: string };
}
interface CtaMessages { requestQuote: string; }
interface PricingPageClientProps { locale: string; messages: PricingMessages; cta: CtaMessages; }

/* ── Vivid amber inline SVG icons for "Always Included" ────────────────── */
const INCLUDED_ICONS = [
  /* 0 — Material Sourcing: stacked timber logs */
  <svg key="timber" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="24" cy="38" rx="18" ry="5" fill="#A97B3E" opacity=".35"/>
    <rect x="8" y="30" width="32" height="6" rx="3" fill="#C49255"/>
    <rect x="10" y="22" width="28" height="6" rx="3" fill="#D4A96A"/>
    <rect x="13" y="14" width="22" height="6" rx="3" fill="#C49255"/>
    <rect x="16" y="7"  width="16" height="6" rx="3" fill="#A97B3E"/>
    <line x1="24" y1="7" x2="24" y2="36" stroke="#6E4D22" strokeWidth="1.5" strokeDasharray="3 3" opacity=".5"/>
  </svg>,
  /* 1 — Kiln-drying & Milling: flame above a plank */
  <svg key="kiln" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="34" width="32" height="7" rx="3" fill="#C49255"/>
    <path d="M24 32 C24 32 16 24 20 16 C20 16 22 22 24 20 C24 20 22 12 28 8 C28 8 26 18 30 18 C30 18 34 12 32 20 C34 18 36 24 28 32 Z" fill="#D4A96A"/>
    <path d="M24 32 C24 32 19 26 22 20 C22 20 23 24 24 22 C24 22 23 16 27 13 C27 13 26 22 28 21 C29 20 30 23 27 28 Z" fill="#A97B3E"/>
  </svg>,
  /* 2 — In-house Manufacturing: factory roof silhouette */
  <svg key="factory" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 38 L4 22 L16 14 L16 22 L28 14 L28 22 L44 14 L44 38 Z" fill="#C49255" opacity=".9"/>
    <rect x="18" y="28" width="12" height="10" rx="1" fill="#6E4D22"/>
    <rect x="7"  y="26" width="7"  height="7"  rx="1" fill="#A97B3E"/>
    <rect x="34" y="26" width="7"  height="7"  rx="1" fill="#A97B3E"/>
    <path d="M4 38 L44 38" stroke="#6E4D22" strokeWidth="1.5"/>
  </svg>,
  /* 3 — Quality Inspection: magnifier over checkmark */
  <svg key="inspect" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="13" stroke="#D4A96A" strokeWidth="3" fill="none"/>
    <path d="M14 20 L18 24 L26 16" stroke="#C49255" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="29" y1="29" x2="42" y2="42" stroke="#A97B3E" strokeWidth="4" strokeLinecap="round"/>
  </svg>,
  /* 4 — Delivery & Protection: wrapped package with bow */
  <svg key="pallet" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="18" width="32" height="22" rx="3" fill="#C49255" opacity=".9"/>
    <rect x="8" y="36" width="32" height="4"  rx="2" fill="#A97B3E"/>
    <line x1="24" y1="18" x2="24" y2="40" stroke="#6E4D22" strokeWidth="2"/>
    <line x1="8"  y1="29" x2="40" y2="29" stroke="#6E4D22" strokeWidth="2"/>
    {/* bow */}
    <path d="M24 18 C24 18 18 10 14 12 C10 14 16 20 24 18 Z" fill="#D4A96A"/>
    <path d="M24 18 C24 18 30 10 34 12 C38 14 32 20 24 18 Z" fill="#D4A96A"/>
    <circle cx="24" cy="18" r="2.5" fill="#A97B3E"/>
  </svg>,
  /* 5 — Professional Installation: hand holding a floor plank with level */
  <svg key="install" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6"  y="30" width="36" height="6" rx="2" fill="#C49255"/>
    <rect x="6"  y="22" width="36" height="6" rx="2" fill="#D4A96A"/>
    <rect x="6"  y="14" width="36" height="6" rx="2" fill="#A97B3E"/>
    <rect x="6"  y="38" width="36" height="3" rx="1.5" fill="#6E4D22"/>
    {/* level bubble */}
    <circle cx="24" cy="25" r="3" fill="#6E4D22"/>
    <circle cx="24" cy="25" r="1.5" fill="#D4A96A"/>
  </svg>,
];

function IncludedIcon({ index }: { index: number }) {
  return (
    <span className="w-14 h-14 drop-shadow-[0_2px_12px_rgba(169,123,62,0.7)] animate-glow-pulse">
      {INCLUDED_ICONS[index % INCLUDED_ICONS.length]}
    </span>
  );
}

/* ── Smooth accordion panel ─────────────────────────────────────────────── */
function FaqPanel({ answer, open }: { answer: string; open: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  /* c8 ignore next */
  useEffect(() => { if (ref.current) setHeight(ref.current.scrollHeight); }, [answer]);
  return (
    <div
      style={{ maxHeight: open ? height : 0 }}
      className="overflow-hidden transition-[max-height] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
    >
      <div ref={ref} className="px-9 pb-7 pt-0">
        <p className="text-stone-500 text-[15px] leading-relaxed border-l-2 border-timber-400/40 pl-5">{answer}</p>
      </div>
    </div>
  );
}

/* ── Magical compass-star FAQ toggle icon ──────────────────────────────── *
 * An 8-pointed compass rose / Japanese mon star.
 * Closed: petals pointing at cardinal + diagonal axes, gold-amber.
 * Open:   rotated 22.5° so the arms align to × — morphs into a dismiss glyph.
 * The outer ring breathes with a subtle scale pulse when open.
 */
function StarToggle({ open }: { open: boolean }) {
  return (
    <span className="relative flex items-center justify-center w-8 h-8 shrink-0" aria-hidden="true">
      {/* Outer breathing ring — only visible when open */}
      <span
        className="absolute inset-0 rounded-full border border-timber-400/50 transition-all duration-700 ease-out"
        style={{
          opacity: open ? 1 : 0,
          transform: open ? 'scale(1.35)' : 'scale(0.7)',
        }}
      />
      {/* Inner dim ring — always visible, fades when open */}
      <span
        className="absolute inset-[3px] rounded-full border border-stone-300/60 transition-all duration-500"
        style={{ opacity: open ? 0 : 1 }}
      />

      {/* 8-pointed compass star SVG */}
      <svg
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="none"
        className="relative z-10 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
        style={{
          transform: open ? 'rotate(135deg) scale(1.15)' : 'rotate(0deg) scale(1)',
          filter: open
            ? 'drop-shadow(0 0 4px rgba(169,123,62,0.7))'
            : 'drop-shadow(0 0 0px rgba(169,123,62,0))',
        }}
      >
        {/* Cardinal petals (N S E W) — thin diamond shapes */}
        <path
          d="M12 2 L13.2 10.8 L12 12 L10.8 10.8 Z"
          className="transition-colors duration-300"
          fill={open ? '#A97B3E' : '#A89F94'}
        />
        <path
          d="M22 12 L13.2 13.2 L12 12 L13.2 10.8 Z"
          className="transition-colors duration-300"
          fill={open ? '#A97B3E' : '#A89F94'}
        />
        <path
          d="M12 22 L10.8 13.2 L12 12 L13.2 13.2 Z"
          className="transition-colors duration-300"
          fill={open ? '#A97B3E' : '#A89F94'}
        />
        <path
          d="M2 12 L10.8 10.8 L12 12 L10.8 13.2 Z"
          className="transition-colors duration-300"
          fill={open ? '#A97B3E' : '#A89F94'}
        />
        {/* Diagonal petals (NE SE SW NW) — shorter, slightly thinner */}
        <path
          d="M19.07 4.93 L13.5 11.1 L12.9 12.9 L11.1 13.5 Z"
          className="transition-colors duration-300"
          fill={open ? '#C49255' : '#C0B5A8'}
          opacity={open ? 1 : 0.7}
        />
        <path
          d="M19.07 19.07 L12.9 13.5 L11.1 12.9 L10.5 11.1 Z"
          className="transition-colors duration-300"
          fill={open ? '#C49255' : '#C0B5A8'}
          opacity={open ? 1 : 0.7}
        />
        <path
          d="M4.93 19.07 L10.5 12.9 L11.1 11.1 L12.9 10.5 Z"
          className="transition-colors duration-300"
          fill={open ? '#C49255' : '#C0B5A8'}
          opacity={open ? 1 : 0.7}
        />
        <path
          d="M4.93 4.93 L11.1 10.5 L12.9 11.1 L13.5 12.9 Z"
          className="transition-colors duration-300"
          fill={open ? '#C49255' : '#C0B5A8'}
          opacity={open ? 1 : 0.7}
        />
        {/* Centre dot */}
        <circle
          cx="12" cy="12" r="1.8"
          className="transition-colors duration-300"
          fill={open ? '#6E4D22' : '#8C8278'}
        />
      </svg>
    </span>
  );
}

/* ── Bold Statement ─────────────────────────────────────────────────────── */
function PricingStatement({ eyebrow, line1, line2, sub }: { eyebrow: string; line1: string; line2: string; sub: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    /* c8 ignore start */
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.25 });
    obs.observe(el); return () => obs.disconnect();
    /* c8 ignore stop */
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden bg-cream-50 py-28 lg:py-40">
      <div className="pointer-events-none select-none absolute -right-32 top-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full border border-timber-400/20" aria-hidden="true" />
      <div className="pointer-events-none select-none absolute -right-16 top-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full border border-timber-400/15" aria-hidden="true" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`${base}/assets/images/motifs/heritage-seal.svg`} alt="" aria-hidden="true"
        className="pointer-events-none select-none absolute right-20 top-1/2 -translate-y-1/2 w-52 h-52 opacity-[0.06] animate-motif-spin" />

      <div className="relative container-wide">
        <p className={`flex items-center gap-2 text-timber-500 font-sans font-semibold text-xs uppercase tracking-widest mb-8 transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <span className="inline-block w-5 h-px bg-timber-500" aria-hidden="true" />
          {eyebrow}
        </p>
        <div className="max-w-5xl">
          {[line1, line2].map((line, i) => (
            <div key={i} className="overflow-hidden">
              <p
                className="font-serif font-bold uppercase text-forest-900 leading-[1.02] transition-transform duration-[950ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform"
                style={{ fontSize: 'clamp(2.4rem, 6.5vw, 6rem)', transform: visible ? 'translateY(0%)' : 'translateY(110%)', transitionDelay: `${i * 0.13}s` }}
              >
                {line.split(' ').map((word, wi) => (
                  <span key={wi} className={wi % 2 === 1 ? 'text-timber-500' : 'text-forest-900'}>{word} </span>
                ))}
              </p>
            </div>
          ))}
        </div>
        {sub && (
          <p className={`text-stone-500 text-lg italic mt-10 max-w-lg transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: `${2 * 0.13 + 0.18}s` }}>{sub}</p>
        )}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════ */
export default function PricingPageClient({ locale, messages: p, cta }: PricingPageClientProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedTier, setSelectedTier] = useState<TierKey | null>(null);

  return (
    <>
      {/* ─── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative min-h-[65vh] flex flex-col justify-end overflow-hidden bg-forest-950">
        <Image
          src={`${base}/assets/images/portfolio/portfolio-0.jpg`}
          alt="" fill priority
          className="object-cover animate-ken-burns"
          sizes="100vw"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/65 via-30% to-forest-950/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_100%,rgba(169,123,62,0.15),transparent_70%)]" />

        <div className="relative container-wide pb-16 lg:pb-22 pt-32">
          <p className="section-label text-timber-400 mb-5 animate-drift-up" style={{ animationDelay: '0.1s' }}>TNP · Pricing</p>
          <h1 className="font-serif leading-[1.0] tracking-tight mb-7">
            <span className="block text-white animate-drift-up" style={{ fontSize: 'clamp(2.8rem, 7.5vw, 7rem)', animationDelay: '0.2s' }}>{p.hero.title}</span>
            <span className="block text-timber-400 animate-drift-up" style={{ fontSize: 'clamp(2.2rem, 6vw, 5.5rem)', animationDelay: '0.35s' }}>{p.hero.titleAccent}</span>
          </h1>
          <div className="flex flex-col lg:flex-row lg:items-end gap-5 lg:gap-12 animate-drift-up" style={{ animationDelay: '0.5s' }}>
            <div className="h-px w-16 bg-timber-500/50 lg:mb-1 shrink-0" />
            <p className="text-stone-300 text-base max-w-lg leading-relaxed">{p.hero.subtitle}</p>
          </div>
        </div>
      </section>

      {/* ─── BOLD STATEMENT ────────────────────────────────────────────── */}
      <PricingStatement eyebrow={p.statement.eyebrow} line1={p.statement.line1} line2={p.statement.line2} sub={p.statement.sub} />

      {/* ─── PRICING TIERS ─────────────────────────────────────────────── */}
      <section className="section-padding bg-cream-100">
        <div className="container-wide">
          <Reveal>
            <div className="mb-14">
              <p className="section-label mb-4">01 — Services &amp; Pricing</p>
              <h2 className="font-serif text-forest-900" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.1 }}>{p.tiers.title}</h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-5 items-stretch">
            {tierKeys.map((key: TierKey, idx) => {
              const tier = p.tiers[key];
              /* A tier is "dark" if it is selected, OR if nothing is selected and it is index 0 */
              const isDark = selectedTier === key || (selectedTier === null && idx === 0);
              const isSelected = selectedTier === key;

              return (
                <Reveal key={key} delay={idx * 0.1}>
                  <article
                    role="button"
                    tabIndex={0}
                    aria-pressed={isSelected}
                    onClick={() => setSelectedTier(isSelected ? null : key)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedTier(isSelected ? null : key); } }}
                    className={`relative flex flex-col rounded-2xl overflow-hidden h-full cursor-pointer select-none
                      transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                      ${isDark
                        ? 'bg-forest-900 text-white shadow-2xl scale-[1.02] ring-2 ring-timber-500/60'
                        : 'bg-white border border-cream-200 text-forest-900 hover:shadow-xl hover:-translate-y-1'
                      }`}
                  >
                    {/* Selected amber glow pulse overlay */}
                    {isSelected && (
                      <div className="absolute inset-0 rounded-2xl pointer-events-none animate-ring-glow-pulse" aria-hidden="true" />
                    )}

                    {/* Top meta row */}
                    <div className="flex items-start justify-between p-6 pb-0">
                      <span className={`font-serif text-sm tabular-nums ${isDark ? 'text-white/40' : 'text-stone-300'}`}>
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      {/* Motif circle */}
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center p-2.5 transition-colors duration-300 ${isDark ? 'bg-white/10' : 'bg-cream-100'}`}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={tierMotifs[idx]} alt="" aria-hidden="true" className="w-full h-full" />
                      </div>
                    </div>

                    {/* Badge */}
                    {tier.badge && (
                      <div className="px-6 pt-4">
                        <span className="inline-block bg-timber-500 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                          {tier.badge}
                        </span>
                      </div>
                    )}

                    {/* Name & tagline */}
                    <div className="px-6 pt-4 pb-0">
                      <p className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${isDark ? 'text-timber-400' : 'text-timber-500'}`}>
                        {tier.tagline}
                      </p>
                      <h3 className={`font-serif text-2xl lg:text-3xl leading-tight mb-4 ${isDark ? 'text-white' : 'text-forest-900'}`}>
                        {tier.name}
                      </h3>
                      <p className={`text-sm leading-relaxed mb-5 ${isDark ? 'text-white/60' : 'text-stone-500'}`}>
                        {tier.description}
                      </p>
                    </div>

                    {/* Checklist */}
                    <ul className="px-6 flex flex-col gap-2.5 flex-1">
                      {tier.examples.split(' · ').map((ex) => (
                        <li key={ex} className="flex items-start gap-2.5">
                          <Check className={`w-4 h-4 mt-0.5 shrink-0 ${isDark ? 'text-timber-400' : 'text-timber-500'}`} aria-hidden="true" />
                          <span className={`text-sm ${isDark ? 'text-white/70' : 'text-stone-600'}`}>{ex}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Footer */}
                    <div className={`mt-6 mx-6 mb-6 pt-5 border-t ${isDark ? 'border-white/10' : 'border-cream-200'}`}>
                      <p className={`text-xs mb-4 ${isDark ? 'text-white/40' : 'text-stone-400'}`}>
                        {tier.priceNote} —{' '}
                        <Link
                          href={`/${locale}/contact?type=${key}`}
                          onClick={(e) => e.stopPropagation()}
                          className={`underline underline-offset-2 transition-colors ${isDark ? 'text-timber-400 hover:text-timber-300' : 'text-timber-500 hover:text-timber-600'}`}
                        >
                          contact us
                        </Link>
                      </p>
                      <Link
                        href={`/${locale}/contact?type=${key}`}
                        onClick={(e) => e.stopPropagation()}
                        className={`w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-full font-semibold text-sm transition-all duration-200 ${
                          isDark
                            ? 'bg-timber-500 hover:bg-timber-400 text-white'
                            : 'border border-forest-900 hover:bg-forest-900 hover:text-white text-forest-900'
                        }`}
                      >
                        {tier.cta}
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </Link>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── ALWAYS INCLUDED — full-bleed photo strip ──────────────────── */}
      <section className="bg-forest-950">
        <div className="container-wide py-12 lg:py-16">
          <Reveal>
            <div className="flex flex-col sm:flex-row sm:items-end gap-3 sm:gap-10">
              <div>
                <p className="section-label text-timber-400 mb-3">02 — Always Included</p>
                <h2 className="font-serif text-white text-3xl lg:text-4xl">{p.included.title}</h2>
              </div>
              <p className="text-stone-500 text-sm max-w-sm sm:mb-1">
                No hidden add-ons after the quote. Everything below is part of every TNP project.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none">
          {includedData.map(({ label, img }, i) => (
            <div
              key={i}
              className="relative shrink-0 snap-start group"
              style={{ width: `${100 / includedData.length}%`, minWidth: '220px', aspectRatio: '3/4' }}
            >
              <Image src={img} alt={label} fill
                className="object-cover brightness-[0.45] group-hover:brightness-[0.6] transition-[filter] duration-500"
                sizes="20vw" />
              {i < includedData.length - 1 && (
                <div className="absolute inset-y-0 right-0 w-px bg-white/10 z-10" />
              )}

              {/* Vivid amber icon — inline SVG, always warm */}
              <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                <IncludedIcon index={i} />
              </div>

              <div className="absolute bottom-0 left-0 right-0 px-4 py-4 z-10 bg-gradient-to-t from-forest-950/85 to-transparent">
                <p className="text-white text-[9px] font-bold uppercase tracking-[0.18em]">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── FAQ ───────────────────────────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="container-wide max-w-4xl">
          <Reveal>
            <div className="mb-12">
              <p className="flex items-center gap-2 text-timber-500 font-sans font-semibold text-[10px] uppercase tracking-widest mb-5">
                03 — Frequently Asked Questions
              </p>
              <h2 className="font-serif text-forest-900" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', lineHeight: 1.1, fontVariant: 'small-caps' }}>
                {p.faq.title}
              </h2>
            </div>
          </Reveal>

          <dl className="divide-y divide-cream-200">
            {faqKeys.map((key: FaqKey, idx) => {
              const entry = p.faq[key];
              const isOpen = openFaq === idx;
              return (
                <Reveal key={key} delay={idx * 0.03}>
                  <div>
                    <dt>
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        aria-expanded={isOpen}
                        className="w-full flex items-center justify-between gap-6 py-7 text-left cursor-pointer"
                      >
                        <div className="flex items-center gap-5">
                          <span className="font-serif text-[11px] font-bold text-timber-500 tabular-nums shrink-0 w-4">
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                          <span className="font-serif text-base lg:text-lg text-forest-900 leading-snug uppercase" style={{ fontVariant: 'small-caps', letterSpacing: '0.01em' }}>
                            {entry.question}
                          </span>
                        </div>
                        <StarToggle open={isOpen} />
                      </button>
                    </dt>
                    <dd><FaqPanel answer={entry.answer} open={isOpen} /></dd>
                  </div>
                </Reveal>
              );
            })}
          </dl>
        </div>
      </section>

      {/* ─── FINAL CTA ─────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[52vh] items-center justify-center overflow-hidden bg-forest-950 px-6 py-24">
        <Image src={`${base}/assets/images/portfolio/portfolio-3.jpg`} alt={p.finalCta.imageAlt} fill aria-hidden="true"
          className="object-cover scale-110 animate-ken-burns brightness-[0.4] saturate-[0.85]" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/80 to-forest-950/35" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(169,123,62,0.18),transparent_60%)]" />
        <div aria-hidden="true" className="animate-float absolute left-[14%] top-[38%] h-2.5 w-2.5 rounded-full bg-timber-400/55 blur-[2px]" style={{ animationDuration: '6s' }} />
        <div aria-hidden="true" className="animate-float absolute right-[19%] top-[44%] h-2 w-2 rounded-full bg-timber-300/45 blur-[2px]" style={{ animationDuration: '8s', animationDelay: '1.2s' }} />

        <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center text-center">
          <Reveal><span aria-hidden="true" className="block h-10 w-px bg-timber-500/50 mx-auto mb-6" /></Reveal>
          <Reveal delay={0.06}><p className="section-label text-timber-400 mb-5">TNP</p></Reveal>
          <Reveal delay={0.12}>
            <h2 className="font-serif text-white mb-5" style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', lineHeight: 1.1 }}>{p.finalCta.title}</h2>
          </Reveal>
          <Reveal delay={0.2}><p className="text-stone-300 text-lg max-w-md mx-auto mb-10">{p.finalCta.subtitle}</p></Reveal>
          <Reveal delay={0.28}>
            <Link
              href={selectedTier ? `/${locale}/contact?type=${selectedTier}` : `/${locale}/contact`}
              className="inline-flex items-center gap-3 bg-timber-500 hover:bg-timber-400 text-white font-semibold text-base px-9 py-5 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(169,123,62,0.4)]"
            >
              {cta.requestQuote}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
