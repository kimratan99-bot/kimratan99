import type { Metadata } from "next";
import "./globals.css";
import MathChatbot from "@/components/MathChatbot";

/* ──────────────────────────────────────────
   SEO & 메타데이터 설정
   ────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "승평온라인 | 나만의 교육용 웹앱",
  description:
    "승평온라인 - 누구나 쉽게 시작하는 교육용 웹 서비스 플랫폼입니다.",
  keywords: ["교육", "웹앱", "승평온라인", "학습", "온라인교육"],
  /* 여기에 Open Graph, Twitter Card 등 추가 메타데이터를 설정하세요 */
};

/* ──────────────────────────────────────────
   루트 레이아웃 (전체 페이지 공통 구조)
   ────────────────────────────────────────── */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="flex min-h-screen flex-col">
        {/* ── 전체 페이지는 Header → Main → Footer 구조입니다 ── */}
        {children}
        
        {/* ── AI 수학 튜터 챗봇 ── */}
        <MathChatbot />
      </body>
    </html>
  );
}
