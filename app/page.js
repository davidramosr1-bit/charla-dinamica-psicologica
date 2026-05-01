"use client";
import { useState, useEffect } from "react";
import { COLORS, SLIDES } from "./data";
import RoleSelection from "./components/RoleSelection";
import {
  CoverSlide, ContentSlide, ConceptSlide, ComparisonSlide,
  VideoSlide, QuizIntroSlide, ResourcesSlide, ClosingSlide,
} from "./components/Slides";
import QuizSlide from "./components/QuizSlide";
import CasesSlide from "./components/CasesSlide";

function ProgressBar({ current, total }) {
  const pct = ((current + 1) / total) * 100;
  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-[101]" style={{ background: COLORS.textMuted + "22" }}>
      <div className="h-full rounded-r transition-all duration-500"
        style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${COLORS.accent1}, ${COLORS.accent2})` }} />
    </div>
  );
}

function ParticipantView() {
  const casesSlide = SLIDES.find((s) => s.id === "casos");
  return (
    <div className="relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${COLORS.bg} 0%, #1A1F2E 50%, ${COLORS.bg} 100%)` }}>
      <div className="fixed -top-[10%] -left-[5%] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${COLORS.accent1}15, transparent 70%)`, filter: "blur(60px)" }} />
      <div className="fixed top-[60%] left-[80%] w-[350px] h-[350px] rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${COLORS.accent2}15, transparent 70%)`, filter: "blur(60px)" }} />
      <CasesSlide slide={casesSlide} role="participant" />
    </div>
  );
}

function PresenterView() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slide = SLIDES[currentSlide];
  const isFirst = currentSlide === 0;
  const isLast = currentSlide === SLIDES.length - 1;

  const goNext = () => setCurrentSlide((s) => Math.min(s + 1, SLIDES.length - 1));
  const goPrev = () => setCurrentSlide((s) => Math.max(s - 1, 0));

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); goNext(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); goPrev(); }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const renderSlide = () => {
    switch (slide.type) {
      case "cover": return <CoverSlide slide={slide} />;
      case "content": return <ContentSlide slide={slide} />;
      case "concept": return <ConceptSlide slide={slide} />;
      case "comparison": return <ComparisonSlide slide={slide} />;
      case "video": return <VideoSlide slide={slide} />;
      case "quiz-intro": return <QuizIntroSlide slide={slide} />;
      case "quiz": return <QuizSlide />;
      case "cases": return <CasesSlide slide={slide} role="presenter" />;
      case "resources": return <ResourcesSlide slide={slide} />;
      case "closing": return <ClosingSlide slide={slide} />;
      default: return null;
    }
  };

  const navBtnStyle = (disabled) => ({
    padding: "10px 24px",
    borderRadius: 12,
    border: `1px solid ${disabled ? COLORS.textMuted + "33" : COLORS.accent1 + "66"}`,
    background: disabled ? "transparent" : COLORS.accent1 + "15",
    color: disabled ? COLORS.textMuted : COLORS.accent1,
    cursor: disabled ? "not-allowed" : "pointer",
    fontSize: 15,
    fontWeight: 600,
  });

  return (
    <div className="relative overflow-hidden min-h-screen"
      style={{ background: `linear-gradient(135deg, ${COLORS.bg} 0%, #1A1F2E 50%, ${COLORS.bg} 100%)` }}>
      {/* Ambient orbs */}
      <div className="fixed -top-[10%] -left-[5%] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${COLORS.accent1}15, transparent 70%)`, filter: "blur(60px)" }} />
      <div className="fixed top-[60%] left-[80%] w-[350px] h-[350px] rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${COLORS.accent2}15, transparent 70%)`, filter: "blur(60px)" }} />
      <div className="fixed top-[30%] left-[50%] w-[250px] h-[250px] rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${COLORS.ansiedad}15, transparent 70%)`, filter: "blur(60px)" }} />

      <ProgressBar current={currentSlide} total={SLIDES.length} />

      <div key={currentSlide}>
        {renderSlide()}
      </div>

      {/* Navigation */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-center items-center gap-3 py-4 px-6 z-[100]"
        style={{ background: "rgba(15, 25, 35, 0.95)", backdropFilter: "blur(12px)", borderTop: `1px solid ${COLORS.textMuted}33` }}>
        <button onClick={goPrev} disabled={isFirst} style={navBtnStyle(isFirst)}>← Anterior</button>
        <span className="text-sm min-w-[60px] text-center tabular-nums" style={{ color: COLORS.textMuted }}>
          {currentSlide + 1} / {SLIDES.length}
        </span>
        <button onClick={goNext} disabled={isLast} style={navBtnStyle(isLast)}>Siguiente →</button>
      </div>
    </div>
  );
}

export default function Home() {
  const [role, setRole] = useState(null);

  if (role === null) return <RoleSelection onSelectRole={setRole} />;
  if (role === "participant") return <ParticipantView />;
  return <PresenterView />;
}
