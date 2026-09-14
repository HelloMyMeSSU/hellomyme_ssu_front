import type { Metadata } from 'next';
import './globals.css'; // Global CSS (Tailwind가 포함된 스타일 파일)

export const metadata: Metadata = {
  title: 'HelloMyMe',
  description: 'AI 기반 문제 풀이 학습 서비스',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        {children}
      </body>
    </html>
  );
}