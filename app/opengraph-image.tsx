import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'Swayam Awari - Software Engineer';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#09090B',
          backgroundImage: 'radial-gradient(circle at 50% -20%, rgba(99, 102, 241, 0.15) 0%, rgba(9, 9, 11, 1) 70%), linear-gradient(to right, #27272A 1px, transparent 1px), linear-gradient(to bottom, #27272A 1px, transparent 1px)',
          backgroundSize: '100% 100%, 64px 64px, 64px 64px',
          fontFamily: 'sans-serif',
          padding: '60px',
        }}
      >
        <h1
          style={{
            fontSize: '96px',
            fontWeight: 800,
            color: '#e5e1e4',
            letterSpacing: '-0.04em',
            margin: '0 0 24px 0',
            textAlign: 'center',
          }}
        >
          Swayam Awari
        </h1>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: '36px',
            fontWeight: 500,
            color: '#a1a1aa',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            marginBottom: '48px',
          }}
        >
          Software Engineer <span style={{ color: '#6366f1', margin: '0 20px' }}>•</span> Full Stack Developer
        </div>
        <p
          style={{
            fontSize: '28px',
            color: '#a1a1aa',
            margin: 0,
            textAlign: 'center',
            maxWidth: '900px',
            lineHeight: 1.6,
          }}
        >
          Building reliable software and AI-powered digital products.
        </p>
      </div>
    ),
    {
      ...size,
    }
  );
}
