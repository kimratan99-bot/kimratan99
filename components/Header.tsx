"use client";

import { useState } from "react";
import Link from "next/link";

/* ──────────────────────────────────────────
   Header 컴포넌트
   - 서비스 로고 & 네비게이션 바
   - 모바일 햄버거 메뉴 포함
   ────────────────────────────────────────── */

/* 네비게이션 링크 목록 — 여기에 새로운 메뉴 항목을 추가하세요 */
const navLinks = [
  { href: "/", label: "홈" },
  { href: "#features", label: "기능소개" },
  { href: "#about", label: "소개" },
  // { href: "/courses", label: "강좌" },
  // { href: "/community", label: "커뮤니티" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* ── 로고 ── */}
        <Link href="/" className="flex items-center gap-2">
          <div className="gradient-bg flex h-9 w-9 items-center justify-center rounded-xl text-lg font-black text-white shadow-md shadow-primary-500/20">
            승
          </div>
          <span className="text-xl font-extrabold tracking-tight text-slate-900">
            승평<span className="gradient-text">온라인</span>
          </span>
        </Link>

        {/* ── 데스크톱 네비게이션 ── */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-primary-600"
            >
              {link.label}
            </Link>
          ))}

          {/* 여기에 로그인/회원가입 버튼 등을 추가하세요 */}
          <div className="ml-3 border-l border-slate-200 pl-3">
            <button className="gradient-bg rounded-xl px-5 py-2 text-sm font-semibold text-white shadow-md shadow-primary-500/25 transition-all hover:shadow-lg hover:shadow-primary-500/30 hover:brightness-110 active:scale-[0.97]">
              시작하기
            </button>
          </div>
        </nav>

        {/* ── 모바일 햄버거 버튼 ── */}
        <button
          type="button"
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="메뉴 열기"
        >
          {mobileMenuOpen ? (
            /* X 아이콘 */
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            /* 햄버거 아이콘 */
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </button>
      </div>

      {/* ── 모바일 메뉴 드롭다운 ── */}
      {mobileMenuOpen && (
        <nav className="border-t border-slate-200/60 bg-white px-4 pb-4 pt-2 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block rounded-lg px-4 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-primary-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <button className="gradient-bg mt-2 w-full rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-md">
            시작하기
          </button>
        </nav>
      )}
    </header>
  );
}
