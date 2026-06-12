import { ImageResponse } from 'next/og';
import { readFile } from 'fs/promises';
import { join } from 'path';

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = 'image/png';

/** Fetch a single woff2 file from Google Fonts (build-time only). Falls back to null. */
async function fetchFont(family: string, weight: number): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}&display=swap`,
      {
        headers: {
          // Use an older UA to receive a single full TTF/WOFF rather than subsetted woff2 shards
          'User-Agent': 'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1)',
        },
      }
    ).then((r) => r.text());

    const fontUrl = css.match(/url\(([^)]+)\)/)?.[1];
    if (!fontUrl) return null;
    return fetch(fontUrl).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

export interface OgContent {
  label: string;
  headline: string;
  sub: string;
}

/**
 * Build a 1200×630 OG image using a company photo as the background.
 * The left side carries a dark forest gradient so text stays legible.
 */
export async function buildOgImage(
  locale: string,
  bgRelPath: string, // relative to /public, e.g. "assets/images/portfolio/portfolio-1.jpg"
  content: OgContent
): Promise<ImageResponse> {
  const isJa = locale === 'ja';
  const fontFamily = isJa ? 'Noto Sans JP' : 'Noto Sans';

  const [logoBuf, bgBuf, fontData] = await Promise.all([
    readFile(join(process.cwd(), 'public/assets/logo/tnp_logo_primary.png')),
    readFile(join(process.cwd(), 'public', ...bgRelPath.split('/'))),
    fetchFont(isJa ? 'Noto Sans JP' : 'Noto Sans', 700),
  ]);

  const logoSrc = `data:image/png;base64,${logoBuf.toString('base64')}`;
  const bgMime = bgRelPath.endsWith('.jpg') || bgRelPath.endsWith('.jpeg') ? 'jpeg' : 'png';
  const bgSrc = `data:image/${bgMime};base64,${bgBuf.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          position: 'relative',
          backgroundColor: '#0a1410',
          fontFamily: `"${fontFamily}", system-ui, sans-serif`,
        }}
      >
        {/* Full-bleed background photo */}
        <img
          src={bgSrc}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          alt=""
        />

        {/* Left-heavy dark overlay — keeps text on the left legible while the photo shows through on the right */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to right, rgba(10,20,15,0.96) 0%, rgba(10,20,15,0.86) 42%, rgba(10,20,15,0.50) 70%, rgba(10,20,15,0.25) 100%)',
          }}
        />
        {/* Bottom vignette */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(10,20,15,0.65) 0%, transparent 45%)',
          }}
        />

        {/* Content layer */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '52px 72px',
            width: '100%',
            height: '100%',
          }}
        >
          {/* Top row: logo left, domain right */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}
          >
            <img
              src={logoSrc}
              style={{ height: 40, objectFit: 'contain', objectPosition: 'left' }}
              alt="TNP"
            />
            <div
              style={{
                color: 'rgba(168,162,158,0.75)',
                fontSize: 15,
                letterSpacing: 1,
              }}
            >
              tnpgr.vn
            </div>
          </div>

          {/* Bottom: brand + headline + subtitle */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Amber location label */}
            <div
              style={{
                color: '#C8965A',
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: 4,
                textTransform: 'uppercase',
                marginBottom: 16,
              }}
            >
              {content.label}
            </div>

            {/* Main headline */}
            <div
              style={{
                color: '#ffffff',
                fontSize: 50,
                fontWeight: 700,
                lineHeight: 1.2,
                maxWidth: 680,
                marginBottom: 20,
              }}
            >
              {content.headline}
            </div>

            {/* Subtitle + divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ color: '#a8a29e', fontSize: 17 }}>{content.sub}</div>
              <div
                style={{ width: 1, height: 16, backgroundColor: 'rgba(168,162,158,0.4)' }}
              />
              <div style={{ color: 'rgba(168,162,158,0.6)', fontSize: 15 }}>
                Biên Hòa, Vietnam
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: fontData
        ? [{ name: fontFamily, data: fontData, weight: 700, style: 'normal' as const }]
        : [],
    }
  );
}
