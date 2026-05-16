import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import QuadraticGrapher from "@/components/QuadraticGrapher";

/* ──────────────────────────────────────────
   메인 페이지
   ────────────────────────────────────────── */
export default function Home() {
  return (
    <>
      {/* ── 상단 헤더 ── */}
      <Header />

      {/* ── 메인 콘텐츠 영역 ── */}
      <main className="flex-1">
        {/* Hero 섹션 */}
        <HeroSection />

        {/* ── 이차함수 그래프 시뮬레이터 섹션 ── */}
        <section id="features" className="py-24 bg-slate-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
                실시간 <span className="gradient-text">함수 그래프</span> 탐구
              </h2>
              <p className="mt-4 text-lg text-slate-500">
                변수를 조작하며 함수의 변화를 직관적으로 이해해 보세요.
              </p>
            </div>

            <QuadraticGrapher />
          </div>
        </section>

        {/* ──────────────────────────────────────
           여기에 새로운 섹션 컴포넌트를 추가하세요
           예시:
           <FeaturesSection />
           <CoursesSection />
           <TestimonialsSection />
           ────────────────────────────────────── */}
      </main>

      {/* ── 하단 푸터 ── */}
      <Footer />
    </>
  );
}
