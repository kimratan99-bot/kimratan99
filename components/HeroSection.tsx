/* ──────────────────────────────────────────
   Hero Section 컴포넌트
   - 메인 환영 문구 & CTA 버튼
   ────────────────────────────────────────── */

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* ── 배경 데코레이션 ── */}
      <div className="absolute inset-0 -z-10">
        {/* 그라디언트 블러 원형 장식 */}
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-primary-400/20 blur-3xl sm:h-96 sm:w-96" />
        <div className="absolute -right-20 top-20 h-72 w-72 rounded-full bg-accent-400/20 blur-3xl sm:h-96 sm:w-96" />
        <div className="absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-primary-300/10 blur-3xl" />
      </div>

      {/* ── 콘텐츠 ── */}
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-3xl text-center">
          {/* 뱃지 */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-4 py-1.5 text-sm font-medium text-primary-700">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-500" />
            </span>
            교육의 새로운 시작
          </div>

          {/* 메인 타이틀 */}
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            나만의{" "}
            <span className="gradient-text">교육용 웹앱</span>
            <br />
            만들기
          </h1>

          {/* 설명 문구 */}
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-500 sm:text-xl">
            승평온라인과 함께 나만의 교육 콘텐츠를 만들고 공유하세요.
            <br className="hidden sm:block" />
            간단한 설정만으로 누구나 쉽게 시작할 수 있습니다.
          </p>

          {/* CTA 버튼 영역 */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {/* 메인 CTA 버튼 (Placeholder) */}
            <button
              type="button"
              className="gradient-bg group inline-flex items-center gap-2 rounded-2xl px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary-500/25 transition-all duration-200 hover:shadow-xl hover:shadow-primary-500/30 hover:brightness-110 active:scale-[0.97]"
              onClick={() => alert("🎉 기능이 곧 추가될 예정입니다!")}
            >
              무료로 시작하기
              <svg
                className="h-5 w-5 transition-transform group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>

            {/* 보조 버튼 — 여기에 추가 CTA 버튼을 넣으세요 */}
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-8 py-3.5 text-base font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:border-slate-400 hover:bg-slate-50 active:scale-[0.97]"
              onClick={() => alert("📖 자세한 소개 페이지가 준비 중입니다!")}
            >
              자세히 알아보기
            </button>
          </div>

          {/* 부가 정보 — 여기에 통계, 사용자 아바타 등을 추가하세요 */}
          <p className="mt-8 text-sm text-slate-400">
            ✦ 설치 불필요 &nbsp;·&nbsp; ✦ 무료 시작 &nbsp;·&nbsp; ✦ 반응형 지원
          </p>
        </div>
      </div>

      {/* ──────────────────────────────────────
         여기 아래에 Features 카드 그리드 등
         추가 섹션을 넣을 수 있습니다.
         예: <FeatureCards />
         ────────────────────────────────────── */}
    </section>
  );
}
