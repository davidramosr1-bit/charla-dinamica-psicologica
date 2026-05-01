"use client";
import { useState } from "react";
import { COLORS, QUIZ_QUESTIONS } from "../data";

export default function QuizSlide() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [stats, setStats] = useState({ correct: 0, total: 0 });
  const q = QUIZ_QUESTIONS[currentQ];

  const options = [
    { key: "tristeza", label: "Tristeza pasajera", color: COLORS.tristeza, emoji: "😢" },
    { key: "depresion", label: "Depresión", color: COLORS.depresion, emoji: "🌑" },
    { key: "ansiedad", label: "Ansiedad", color: COLORS.ansiedad, emoji: "⚡" },
  ];

  const handleSelect = (key) => {
    if (revealed) return;
    setSelected(key);
    setRevealed(true);
    setStats((prev) => ({
      correct: prev.correct + (key === q.answer ? 1 : 0),
      total: prev.total + 1,
    }));
  };

  const nextQuestion = () => {
    if (currentQ < QUIZ_QUESTIONS.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelected(null);
      setRevealed(false);
    }
  };

  const isFinished = currentQ === QUIZ_QUESTIONS.length - 1 && revealed;
  const glass = { background: COLORS.glass, backdropFilter: "blur(16px)", border: `1px solid ${COLORS.textMuted}22` };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-8 pb-24 animate-fade-in relative z-10">
      <div className="max-w-[800px] w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <span className="inline-block py-1 px-3.5 rounded-full text-xs font-bold tracking-widest uppercase"
            style={{ color: COLORS.accent1, background: COLORS.accent1 + "18", border: `1px solid ${COLORS.accent1}33` }}>
            Caso {currentQ + 1} de {QUIZ_QUESTIONS.length}
          </span>
          <span className="text-sm" style={{ color: COLORS.textMuted }}>
            ✅ {stats.correct}/{stats.total} correctas
          </span>
        </div>

        {/* Progress */}
        <div className="w-full h-1.5 rounded-full mb-7" style={{ background: COLORS.textMuted + "22" }}>
          <div className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${((currentQ + (revealed ? 1 : 0)) / QUIZ_QUESTIONS.length) * 100}%`,
              background: `linear-gradient(90deg, ${COLORS.accent1}, ${COLORS.accent2})`,
            }} />
        </div>

        {/* Scenario */}
        <div className="rounded-2xl p-9 mb-6" style={{ ...glass, borderLeft: `4px solid ${COLORS.accent1}` }}>
          <h3 className="text-sm font-bold tracking-widest uppercase mb-3.5" style={{ color: COLORS.accent1 }}>
            📋 Escenario
          </h3>
          <p className="text-base leading-relaxed" style={{ color: COLORS.textSecondary }}>{q.scenario}</p>
        </div>

        {/* Options */}
        <div className="flex flex-col gap-3 mb-6">
          {options.map((opt) => {
            const isCorrect = opt.key === q.answer;
            const isSelected = opt.key === selected;
            let bg = COLORS.bgCard;
            let border = `1px solid ${COLORS.textMuted}22`;
            if (revealed) {
              if (isCorrect) { bg = COLORS.success + "18"; border = `2px solid ${COLORS.success}`; }
              else if (isSelected) { bg = COLORS.warning + "18"; border = `2px solid ${COLORS.warning}`; }
            } else if (isSelected) { bg = opt.color + "15"; border = `2px solid ${opt.color}`; }

            return (
              <button key={opt.key} onClick={() => handleSelect(opt.key)}
                className="flex items-center gap-3.5 py-4 px-5 rounded-xl text-base font-medium text-left transition-all"
                style={{ background: bg, border, color: COLORS.textPrimary, cursor: revealed ? "default" : "pointer",
                  transform: revealed && isCorrect ? "scale(1.02)" : "scale(1)" }}>
                <span className="text-2xl">{opt.emoji}</span>
                <span className="flex-1">{opt.label}</span>
                {revealed && isCorrect && <span className="text-xl">✅</span>}
                {revealed && isSelected && !isCorrect && <span className="text-xl">❌</span>}
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {revealed && (
          <div className="rounded-2xl p-6 animate-slide-up" style={{ ...glass, borderLeft: `4px solid ${COLORS.success}` }}>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-2.5" style={{ color: COLORS.success }}>
              💡 Explicación
            </h4>
            <p className="text-base leading-relaxed" style={{ color: COLORS.textSecondary }}>{q.explanation}</p>
          </div>
        )}

        {/* Next */}
        {revealed && !isFinished && (
          <div className="text-center mt-6">
            <button onClick={nextQuestion}
              className="py-3.5 px-10 rounded-xl border-none text-base font-bold cursor-pointer transition-transform hover:scale-105"
              style={{ background: `linear-gradient(135deg, ${COLORS.accent1}, ${COLORS.accent2})`, color: COLORS.bg }}>
              Siguiente caso →
            </button>
          </div>
        )}

        {isFinished && (
          <div className="text-center mt-6 p-7 rounded-2xl animate-slide-up" style={glass}>
            <span className="text-5xl block mb-3">🎉</span>
            <h3 className="text-xl font-bold mb-2" style={{ color: COLORS.accent1 }}>¡Dinámica completada!</h3>
            <p className="text-base" style={{ color: COLORS.textSecondary }}>
              Resultado: {stats.correct} de {stats.total} correctas
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
