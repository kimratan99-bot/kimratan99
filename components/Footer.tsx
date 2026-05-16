import Link from "next/link";

/* ──────────────────────────────────────────
   Footer 컴포넌트
   - 카피라이트 & 링크
   ────────────────────────────────────────── */

/* 푸터 링크 목록 — 여기에 새로운 링크를 추가하세요 */
const footerLinks = [
  { href: "#", label: "이용약관" },
  { href: "#", label: "개인정보처리방침" },
  { href: "#", label: "문의하기" },
  // { href: "/faq", label: "FAQ" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200/60 bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          {/* ── 로고 & 카피라이트 ── */}
          <div className="text-center sm:text-left">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="gradient-bg flex h-7 w-7 items-center justify-center rounded-lg text-xs font-black text-white">
                승
              </div>
              <span className="text-lg font-bold text-white">
                승평<span className="text-primary-400">온라인</span>
              </span>
            </Link>
            <p className="mt-2 text-sm text-slate-400">
              © {currentYear} 승평온라인. All rights reserved.
            </p>
          </div>

          {/* ── 링크 목록 ── */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-slate-400 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* 여기에 소셜 미디어 아이콘 등을 추가하세요 */}
        </div>

        {/* ──────────────────────────────────────
           여기에 뉴스레터 구독, 추가 링크 그룹 등
           푸터 확장 콘텐츠를 추가하세요
           ────────────────────────────────────── */}
      </div>
    </footer>
  );
}
