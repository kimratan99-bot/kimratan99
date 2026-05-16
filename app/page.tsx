import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";

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
