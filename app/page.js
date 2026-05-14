"use client";
import { useState, useEffect } from "react";
import { C } from "./data";
import RoleSelection from "./components/RoleSelection";
import ParticipantView from "./components/ParticipantView";
import {
  CoverSlide, BodyDynamicsSlide, VideoSlide, QuizSlide,
  ImageSlide, BrainstormPresenterSlide, BrainstormQRSlide, WordUniverseSlide,
} from "./components/Slides";

const TOTAL_SLIDES = 9;

function ProgressBar({ current, total }) {
  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-[101]" style={{ background: C.tm + "22" }}>
      <div className="h-full rounded-r transition-all duration-500"
        style={{ width: `${((current + 1) / total) * 100}%`, background: `linear-gradient(90deg, ${C.accent1}, ${C.accent2})` }} />
    </div>
  );
}

function PresenterView() {
  const [slide, setSlide] = useState(0);
  const [siteUrl, setSiteUrl] = useState("");

  useEffect(() => { setSiteUrl(window.location.origin); }, []);

  const goNext = () => setSlide(s => Math.min(s + 1, TOTAL_SLIDES - 1));
  const goPrev = () => setSlide(s => Math.max(s - 1, 0));

  useEffect(() => {
    const h = (e) => {
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); goNext(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); goPrev(); }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  const renderSlide = () => {
    switch (slide) {
      case 0: return <CoverSlide />;
      case 1: return <BodyDynamicsSlide />;
      case 2: return <VideoSlide />;
      case 3: return <QuizSlide siteUrl={siteUrl} />;
      case 4: return <ImageSlide src="/que-no-es-ansiedad.png" alt="¿Qué no es la ansiedad?" />;
      case 5: return <ImageSlide src="/que-es-ansiedad.png" alt="¿Qué es la ansiedad?" />;
      case 6: return <BrainstormPresenterSlide />;
      case 7: return <BrainstormQRSlide siteUrl={siteUrl} />;
      case 8: return <WordUniverseSlide />;
      default: return null;
    }
  };

  const isFirst = slide === 0;
  const isLast = slide === TOTAL_SLIDES - 1;
  const navBtn = (disabled) => ({
    padding: "10px 24px", borderRadius: 12,
    border: `1px solid ${disabled ? C.tm + "33" : C.accent1 + "66"}`,
    background: disabled ? "transparent" : C.accent1 + "15",
    color: disabled ? C.tm : C.accent1,
    cursor: disabled ? "not-allowed" : "pointer",
    fontSize: 15, fontWeight: 600,
  });

  return (
    <div className="relative overflow-hidden min-h-screen"
      style={{ background: `linear-gradient(135deg, ${C.bg} 0%, #1A1F2E 50%, ${C.bg} 100%)` }}>
      <div className="fixed -top-[10%] -left-[5%] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${C.accent1}15, transparent 70%)`, filter: "blur(60px)" }} />
      <div className="fixed top-[60%] left-[80%] w-[350px] h-[350px] rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${C.accent2}15, transparent 70%)`, filter: "blur(60px)" }} />
      <div className="fixed top-[30%] left-[50%] w-[250px] h-[250px] rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${C.ansiedad}15, transparent 70%)`, filter: "blur(60px)" }} />

      <ProgressBar current={slide} total={TOTAL_SLIDES} />

      <div key={slide}>{renderSlide()}</div>

      <div className="fixed bottom-0 left-0 right-0 flex justify-center items-center gap-3 py-4 px-6 z-[100]"
        style={{ background: "rgba(15,25,35,0.95)", backdropFilter: "blur(12px)", borderTop: `1px solid ${C.tm}33` }}>
        <button onClick={goPrev} disabled={isFirst} style={navBtn(isFirst)}>← Anterior</button>
        <span className="text-sm min-w-[60px] text-center" style={{ color: C.tm, fontVariantNumeric: "tabular-nums" }}>
          {slide + 1} / {TOTAL_SLIDES}
        </span>
        <button onClick={goNext} disabled={isLast} style={navBtn(isLast)}>Siguiente →</button>
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
