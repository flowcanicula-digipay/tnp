'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const mosaicImages = [
  { src: `${base}/assets/images/portfolio/portfolio-3.jpg`, alt: 'TNP completed flooring project — Biên Hòa, Vietnam' },
  { src: `${base}/assets/images/portfolio/portfolio-4.jpg`, alt: 'TNP custom timber furniture installation' },
  { src: `${base}/assets/images/installation/installation-4.jpg`, alt: 'Professional flooring installation by TNP crew' },
  { src: `${base}/assets/images/materials/materials-5.jpg`, alt: 'Premium hardwood materials at TNP factory' },
];

interface CtaBannerMessages {
  title: string;
  body: string;
  button: string;
}

export default function CtaBanner({ locale, messages }: { locale: string; messages: CtaBannerMessages }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden bg-forest-950">
      {/* Subtle full-bleed background */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <Image
          src={`${base}/assets/images/portfolio/portfolio-0.jpg`}
          alt=""
          fill
          aria-hidden="true"
          className="object-cover opacity-[0.07]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-950 via-forest-950/95 to-forest-900/70" />
      </div>

      <div className="relative container-wide section-padding">
        <div className="grid lg:grid-cols-[1fr_460px] gap-12 lg:gap-20 items-center">

          {/* Left — Content */}
          <div>
            <p className="section-label text-timber-300 mb-6">TNP</p>
            <h2 className="font-serif text-display-lg text-white leading-tight mb-6">
              {messages.title}
            </h2>
            <p className="text-stone-400 text-lg leading-relaxed mb-10 max-w-md">
              {messages.body}
            </p>
            <Link
              href={`/${locale}/contact`}
              className="btn-primary text-base px-8 py-4 inline-flex"
            >
              {messages.button}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          {/* Right — Interactive image mosaic */}
          <div className="grid grid-cols-2 gap-3 h-72 sm:h-80 lg:h-[420px]">
            {mosaicImages.map(({ src, alt }, i) => (
              <button
                key={i}
                type="button"
                aria-label={alt}
                className="relative rounded-2xl overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-timber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-forest-950"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(i)}
                onBlur={() => setHovered(null)}
                onClick={() => setHovered(hovered === i ? null : i)}
              >
                <Image
                  src={src}
                  alt={alt}
                  fill
                  className={`object-cover transition-all duration-500 ease-out ${
                    hovered === null
                      ? 'scale-100 brightness-[0.6]'
                      : hovered === i
                      ? 'scale-110 brightness-90'
                      : 'scale-100 brightness-[0.3]'
                  }`}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 40vw, 230px"
                />
                {/* Bottom gradient on active */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-forest-950/70 via-transparent to-transparent transition-opacity duration-300 ${
                    hovered === i ? 'opacity-100' : 'opacity-0'
                  }`}
                />
                {/* Amber ring on active */}
                <div
                  className={`absolute inset-0 rounded-2xl ring-2 ring-inset ring-timber-400 transition-opacity duration-200 ${
                    hovered === i ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </button>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
