'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Reveal from './Reveal';

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

type Category = 'flooring' | 'furniture' | 'complete';
type FilterKey = 'all' | Category;

/* Gallery image pool — all real TNP photos, one per gallery item by index. */
const GALLERY_IMAGES = [
  // ── stairs & flooring ───────────────────────────────────────────────────
  'stair-grand-curved-hall.jpg',
  'stair-walnut-marble-treads.jpg',
  'stair-solid-wood-balustrade.jpg',
  'stair-oak-glass-balustrade.jpg',
  'stair-oak-treads-closeup.jpg',
  'stair-ironwork-balustrade.jpg',
  'installation-stairs-1.jpg',
  'installation-stairs-2.jpg',
  'installation-beauty-2.jpg',
  // ── interior doors ──────────────────────────────────────────────────────
  'door-interior-classic-panel.jpg',
  'door-interior-3panel-ivory.jpg',
  'door-interior-louvred-double.jpg',
  'door-interior-ventilated-panel.jpg',
  'door-interior-walnut-circle.jpg',
  'door-interior-rustic-solid.jpg',
  'door-interior-vertical-slat.jpg',
  'door-interior-minimalist-walnut.jpg',
  'door-interior-knotty-alder-arched.jpg',
  // ── exterior doors ──────────────────────────────────────────────────────
  'door-exterior-arched-white.jpg',
  'door-exterior-arched-double-white.jpg',
  'door-exterior-arched-dark.jpg',
  'door-exterior-white-double-panel.jpg',
  'door-exterior-rustic-pine-double.jpg',
  'door-exterior-walnut-double.jpg',
  'exterior-door-arched.jpg',
  'exterior-door-installed.jpg',
  // ── folding doors ───────────────────────────────────────────────────────
  'door-folding-glass-exterior.jpg',
  'door-folding-stained-glass.jpg',
  'door-folding-white-brick.jpg',
  'door-folding-white-open.jpg',
  // ── sliding doors ───────────────────────────────────────────────────────
  'door-sliding-glass-white.jpg',
  'door-sliding-wardrobe.jpg',
  'door-sliding-glass-room.jpg',
  'door-sliding-grey-wainscoting.jpg',
  // ── factory / complete projects ─────────────────────────────────────────
  'factory-door-making.jpg',
  'factory-door-frames.jpg',
  'factory-doors-lined-up.jpg',
  'factory-doors-in-progress.jpg',
  'factory-frames-production.jpg',
  'factory-workers-assembling.jpg',
  'factory-slat-craft.jpg',
  'factory-doors-painted.jpg',
  'coffered-ceiling-wood.jpg',
  'installation-cabinet-1.jpg',
  'installation-doors-1.jpg',
  'installation-grand-2.jpg',
  'installation-door-4.jpg',
  'creation-1.jpg',
  'furniture-0.jpg',
  'furniture-1.jpg',
  'furniture-2.jpg',
  'furniture-3.jpg',
] as const;

function galleryImageSrc(filename: typeof GALLERY_IMAGES[number]) {
  return `${base}/assets/images/portfolio/${filename}`;
}

interface GalleryItem { title: string; category: Category }

interface PortfolioMessages {
  hero: { eyebrow: string; title: string; titleAccent: string; subtitle: string; ctaPrimary: string; ctaSecondary: string; imageAlt: string };
  philosophy: { eyebrow: string; line1: string; line2: string; sub: string };
  geo: { eyebrow: string; title: string; subtitle: string; locations: string[]; yourPlace: string; exportNote: string };
  gallery: {
    eyebrow: string; title: string; subtitle: string;
    filters: { all: string; flooring: string; furniture: string; complete: string };
    viewProject: string; items: GalleryItem[];
  };
  closingCta: { title: string; subtitle: string; button: string };
}

interface PortfolioPageClientProps { locale: string; messages: PortfolioMessages }

/* ── Bold wipe-in statement, matching pricing/contact pattern ──────────── */
function PhilosophyStatement({ eyebrow, line1, line2, sub }: { eyebrow: string; line1: string; line2: string; sub: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.25 });
    obs.observe(el); return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden bg-cream-50 py-24 lg:py-36">
      <div className="pointer-events-none select-none absolute -left-32 top-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full border border-timber-400/20" aria-hidden="true" />
      <div className="pointer-events-none select-none absolute -left-16 top-1/2 -translate-y-1/2 w-[320px] h-[320px] rounded-full border border-timber-400/15" aria-hidden="true" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`${base}/assets/images/motifs/compass-seal.svg`} alt="" aria-hidden="true"
        className="pointer-events-none select-none absolute left-16 top-1/2 -translate-y-1/2 w-44 h-44 opacity-[0.07] animate-motif-spin" />

      <div className="relative container-wide">
        <p className={`flex items-center gap-2 text-timber-500 font-sans font-semibold text-xs uppercase tracking-widest mb-8 transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <span className="inline-block w-5 h-px bg-timber-500" aria-hidden="true" />
          {eyebrow}
        </p>
        <div className="max-w-4xl ml-auto text-right">
          {[line1, line2].map((line, i) => (
            <div key={i} className="overflow-hidden">
              <p
                className="font-serif font-bold text-forest-900 leading-[1.02] transition-transform duration-[950ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform"
                style={{ fontSize: 'clamp(2.2rem, 6vw, 5.5rem)', transform: visible ? 'translateY(0%)' : 'translateY(110%)', transitionDelay: `${i * 0.13}s`, color: i === 1 ? '#A97B3E' : undefined }}
              >
                {line}
              </p>
            </div>
          ))}
        </div>
        {sub && (
          <p className={`text-stone-500 text-lg mt-10 max-w-lg ml-auto text-right transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: `${2 * 0.13 + 0.18}s` }}>{sub}</p>
        )}
      </div>
    </section>
  );
}

/* ── Vietnam map + service-area pins ────────────────────────────────────── */
function GeoSection({ g }: { g: PortfolioMessages['geo'] }) {
  // Hand-placed pin positions along Vietnam's outline (percent-based, roughly HCMC area clustered + spread for readability)
  const pins = [
    { top: '38%', left: '46%' },
    { top: '48%', left: '58%' },
    { top: '58%', left: '40%' },
    { top: '66%', left: '54%' },
    { top: '30%', left: '62%' },
    { top: '74%', left: '46%' },
    { top: '22%', left: '50%' },
  ];

  return (
    <section className="relative overflow-hidden bg-forest-950 py-24 lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_30%,rgba(169,123,62,0.1),transparent_70%)]" />
      <div className="relative container-wide">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="section-label text-timber-400 mb-4">{g.eyebrow}</p>
            <h2 className="font-serif text-white mb-5" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', lineHeight: 1.1 }}>{g.title}</h2>
            <p className="text-stone-400 text-lg">{g.subtitle}</p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative max-w-3xl mx-auto">
            {/* Decorative cultural motifs scattered around the map */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${base}/assets/images/motifs/non-la.svg`} alt="" aria-hidden="true" className="hidden sm:block absolute -left-4 top-4 w-12 h-12 opacity-40" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${base}/assets/images/motifs/lotus.svg`} alt="" aria-hidden="true" className="hidden sm:block absolute -right-2 top-20 w-10 h-10 opacity-40" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${base}/assets/images/motifs/coffee.svg`} alt="" aria-hidden="true" className="hidden sm:block absolute left-2 bottom-8 w-9 h-9 opacity-35" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${base}/assets/images/motifs/banh-mi.svg`} alt="" aria-hidden="true" className="hidden sm:block absolute right-6 bottom-2 w-10 h-10 opacity-35" />

            {/* Map outline placeholder — Vietnam silhouette via flag-vn motif as a stylised backdrop */}
            <div className="relative aspect-[3/4] max-w-sm mx-auto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${base}/assets/images/motifs/viet-home.svg`} alt="" aria-hidden="true"
                className="absolute inset-0 w-full h-full opacity-[0.15] animate-glow-pulse" />

              {/* Pins — Vietnamese flag-motif pin marks each service area */}
              {pins.map((pos, i) => (
                <div key={i} className="absolute -translate-x-1/2 -translate-y-1/2 group" style={pos}>
                  <div className="relative flex items-center justify-center">
                    <span className="absolute w-8 h-8 rounded-full bg-timber-500/20 animate-glow-pulse" style={{ animationDelay: `${i * 0.3}s` }} />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`${base}/assets/images/motifs/viet-pin.svg`} alt="" aria-hidden="true"
                      className="w-5 h-5 drop-shadow-lg relative z-10" />
                  </div>
                  <span className="absolute left-1/2 top-full -translate-x-1/2 mt-1 whitespace-nowrap text-[10px] text-white/70 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {g.locations[i]}
                  </span>
                </div>
              ))}

              {/* "Your place?" marker — distinct, playful, center-bottom */}
              <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ top: '88%' }}>
                <div className="flex flex-col items-center gap-1">
                  <span className="flex items-center justify-center w-9 h-9 rounded-full bg-timber-500 shadow-[0_0_24px_rgba(169,123,62,0.6)] animate-glow-pulse p-1.5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`${base}/assets/images/motifs/viet-pin.svg`} alt="" aria-hidden="true" className="w-full h-full brightness-[2.2] saturate-0" />
                  </span>
                  <span className="text-white text-xs font-bold whitespace-nowrap">{g.yourPlace}</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Location chip list */}
        <Reveal delay={0.2}>
          <div className="flex flex-wrap justify-center gap-2.5 mt-14 max-w-2xl mx-auto">
            {g.locations.map((loc) => (
              <span key={loc} className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white/70 text-xs font-medium">
                {loc}
              </span>
            ))}
            <span className="px-4 py-2 rounded-full border border-timber-500/40 bg-timber-500/10 text-timber-300 text-xs font-medium">
              {g.exportNote}
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════ */
export default function PortfolioPageClient({ locale, messages: p }: PortfolioPageClientProps) {
  const [filter, setFilter] = useState<FilterKey>('all');

  const filterKeys: FilterKey[] = ['all', 'flooring', 'furniture', 'complete'];
  const filteredItems = p.gallery.items
    .map((item, idx) => ({ ...item, img: galleryImageSrc(GALLERY_IMAGES[idx % GALLERY_IMAGES.length]) }))
    .filter((item) => filter === 'all' || item.category === filter);

  return (
    <>
      {/* ─── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative min-h-[70vh] flex flex-col justify-end overflow-hidden bg-forest-950">
        <Image
          src={`${base}/assets/images/portfolio/installation-grand-3.jpg`}
          alt="" fill priority aria-hidden="true"
          className="object-cover animate-ken-burns"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/70 via-35% to-forest-950/15" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_100%,rgba(169,123,62,0.16),transparent_70%)]" />

        <div className="relative container-wide pb-16 lg:pb-24 pt-32">
          <p className="section-label text-timber-400 mb-5 animate-drift-up" style={{ animationDelay: '0.1s' }}>{p.hero.eyebrow}</p>
          <h1 className="font-serif leading-[1.0] tracking-tight mb-7">
            <span className="block text-white animate-drift-up" style={{ fontSize: 'clamp(2.8rem, 7.5vw, 7rem)', animationDelay: '0.2s' }}>{p.hero.title}</span>
            <span className="block text-timber-400 animate-drift-up" style={{ fontSize: 'clamp(2.2rem, 6vw, 5.5rem)', animationDelay: '0.35s' }}>{p.hero.titleAccent}</span>
          </h1>
          <p className="text-stone-300 text-lg max-w-xl leading-relaxed mb-9 animate-drift-up" style={{ animationDelay: '0.48s' }}>
            {p.hero.subtitle}
          </p>
          <div className="flex flex-wrap items-center gap-4 animate-drift-up" style={{ animationDelay: '0.6s' }}>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2.5 bg-timber-500 hover:bg-timber-400 text-white font-semibold text-sm px-7 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(169,123,62,0.4)]"
            >
              {p.hero.ctaPrimary}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link
              href={`/${locale}/pricing`}
              className="inline-flex items-center gap-2.5 border border-white/25 hover:border-white/50 text-white font-medium text-sm px-7 py-4 rounded-full transition-colors duration-300"
            >
              {p.hero.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>

      {/* ─── PHILOSOPHY STATEMENT ──────────────────────────────────────── */}
      <PhilosophyStatement eyebrow={p.philosophy.eyebrow} line1={p.philosophy.line1} line2={p.philosophy.line2} sub={p.philosophy.sub} />

      {/* ─── GEO / SERVICE AREA ────────────────────────────────────────── */}
      <GeoSection g={p.geo} />

      {/* ─── FILTERABLE GALLERY ────────────────────────────────────────── */}
      <section className="section-padding bg-cream-100">
        <div className="container-wide">
          <Reveal>
            <div className="mb-12">
              <p className="section-label mb-4">{p.gallery.eyebrow}</p>
              <h2 className="font-serif text-forest-900 mb-4" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.75rem)', lineHeight: 1.1 }}>
                {p.gallery.title}
              </h2>
              <p className="text-stone-500 text-lg max-w-xl">{p.gallery.subtitle}</p>
            </div>
          </Reveal>

          {/* Filter pills */}
          <Reveal delay={0.06}>
            <div className="flex flex-wrap gap-2.5 mb-12">
              {filterKeys.map((key) => {
                const active = filter === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setFilter(key)}
                    aria-pressed={active}
                    className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                      active
                        ? 'bg-forest-900 text-white shadow-md'
                        : 'bg-white text-forest-800 border border-cream-200 hover:border-timber-300'
                    }`}
                  >
                    {p.gallery.filters[key]}
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* Masonry-ish responsive grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredItems.map((item, idx) => (
              <Reveal key={item.title} delay={(idx % 6) * 0.06}>
                <article className="group relative rounded-2xl overflow-hidden aspect-[4/5] cursor-default">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-forest-950/10 to-transparent" />

                  {/* Category badge */}
                  <span className="absolute top-4 left-4 inline-block bg-white/90 backdrop-blur-sm text-forest-900 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                    {p.gallery.filters[item.category]}
                  </span>

                  {/* Hover reveal arrow */}
                  <span className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 text-white" aria-hidden="true" />
                  </span>

                  {/* Title */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="font-serif text-white text-lg leading-snug">{item.title}</h3>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CLOSING CTA ───────────────────────────────────────────────── */}
      <section className="relative flex min-h-[48vh] items-center justify-center overflow-hidden bg-forest-950 px-6 py-20">
        <Image
          src={`${base}/assets/images/portfolio/portfolio-4.jpg`}
          alt="" fill aria-hidden="true"
          className="object-cover scale-110 animate-ken-burns brightness-[0.4] saturate-[0.85]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/80 to-forest-950/35" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(169,123,62,0.18),transparent_60%)]" />
        <div aria-hidden="true" className="animate-float absolute left-[16%] top-[36%] h-2.5 w-2.5 rounded-full bg-timber-400/55 blur-[2px]" style={{ animationDuration: '6s' }} />
        <div aria-hidden="true" className="animate-float absolute right-[20%] top-[42%] h-2 w-2 rounded-full bg-timber-300/45 blur-[2px]" style={{ animationDuration: '8s', animationDelay: '1.2s' }} />

        <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center text-center">
          <Reveal><span aria-hidden="true" className="block h-10 w-px bg-timber-500/50 mx-auto mb-6" /></Reveal>
          <Reveal delay={0.06}><p className="section-label text-timber-400 mb-5">TNP</p></Reveal>
          <Reveal delay={0.12}>
            <h2 className="font-serif text-white mb-5" style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', lineHeight: 1.1 }}>{p.closingCta.title}</h2>
          </Reveal>
          <Reveal delay={0.2}><p className="text-stone-300 text-lg max-w-md mx-auto mb-10">{p.closingCta.subtitle}</p></Reveal>
          <Reveal delay={0.28}>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-3 bg-timber-500 hover:bg-timber-400 text-white font-semibold text-base px-9 py-5 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(169,123,62,0.4)]"
            >
              {p.closingCta.button}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
