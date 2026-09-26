import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'hello myme',
  manifest: '/manifest.webmanifest',
  icons: { apple: '/icon-192.png' },
  formatDetection: { telephone: false },
  appleWebApp: {
    capable: true,
    title: 'myme',
    statusBarStyle: 'black-translucent',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,   
  viewportFit: 'cover', 
  themeColor: '#F5F5F5',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        {/* 시안 폰트(Pretendard) — 이미 쓰고 있으면 생략 */}
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}