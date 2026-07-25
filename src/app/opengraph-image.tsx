import { ImageResponse } from 'next/og';

export const alt = 'Trueyy SDK Documentation';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#0B1A10',
          padding: '72px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            color: '#4CD964',
            fontSize: 38,
            fontWeight: 700,
          }}
        >
          Trueyy · Docs
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              color: '#FFFFFF',
              fontSize: 66,
              fontWeight: 800,
              lineHeight: 1.1,
            }}
          >
            Trueyy SDK Documentation
          </div>
          <div style={{ display: 'flex', color: '#E5E7EB', fontSize: 30, marginTop: 28 }}>
            Embed live interview-integrity monitoring into your own ATS.
          </div>
        </div>
        <div style={{ display: 'flex', color: '#9FB3A6', fontSize: 24 }}>
          @trueyy-sdk/node · @trueyy-sdk/web · docs.trueyy.com
        </div>
      </div>
    ),
    { ...size },
  );
}
