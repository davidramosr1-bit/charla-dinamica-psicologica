"use client";
import { useState } from "react";
import { C, QUIZ_QUESTIONS, BRAINSTORM_COLORS } from "../data";

export default function ParticipantView() {
  const [section, setSection] = useState("menu");

  return (
    <div className="relative overflow-hidden min-h-screen"
      style={{ background: `linear-gradient(135deg, ${C.bg} 0%, #1A1F2E 50%, ${C.bg} 100%)` }}>
      <div className="fixed -top-[10%] -left-[5%] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${C.accent1}15, transparent 70%)`, filter: "blur(60px)" }} />
      <div className="fixed top-[60%] left-[80%] w-[350px] h-[350px] rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${C.accent2}15, transparent 70%)`, filter: "blur(60px)" }} />

      {section === "menu" && <ParticipantMenu onSelect={setSection} />}
      {section === "quiz" && <ParticipantQuiz onBack={() => setSection("menu")} />}
      {section === "brainstorm" && <ParticipantBrainstorm onBack={() => setSection("menu")} />}
    </div>
  );
}

function ParticipantMenu({ onSelect }) {
  const glass = { background: C.glass, backdropFilter: "blur(16px)", border: `1px solid ${C.tm}22` };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative z-10" style={{ animation: "fadeIn 0.5s ease" }}>
      <span className="text-6xl mb-4" style={{ animation: "float 3s ease-in-out infinite" }}>🧠</span>
      <h1 className="text-2xl font-extrabold mb-1"
        style={{ background: `linear-gradient(135deg, ${C.accent1}, ${C.accent2})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
        La salud mental en la Fe
      </h1>
      <p className="text-sm mb-8" style={{ color: C.ts }}>Elige una actividad</p>

      <div className="flex flex-col gap-4 max-w-[360px] w-full">
        <button onClick={() => onSelect("quiz")}
          className="p-5 rounded-2xl flex items-center gap-3 text-left transition-all hover:scale-[1.02]"
          style={{ ...glass, borderLeft: `3px solid ${C.accent1}` }}>
          <span className="text-3xl">🎯</span>
          <div>
            <div className="font-semibold text-base" style={{ color: C.tp }}>Quiz interactivo</div>
            <div className="text-xs" style={{ color: C.tm }}>¿Tristeza, depresión o ansiedad?</div>
          </div>
        </button>

        <button onClick={() => onSelect("brainstorm")}
          className="p-5 rounded-2xl flex items-center gap-3 text-left transition-all hover:scale-[1.02]"
          style={{ ...glass, borderLeft: `3px solid ${C.accent2}` }}>
          <span className="text-3xl">💡</span>
          <div>
            <div className="font-semibold text-base" style={{ color: C.tp }}>Lluvia de ideas</div>
            <div className="text-xs" style={{ color: C.tm }}>Comparte tus palabras</div>
          </div>
        </button>
      </div>
    </div>
  );
}

function ParticipantQuiz({ onBack }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [stats, setStats] = useState({ correct: 0, total: 0 });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const q = QUIZ_QUESTIONS[currentQ];
  const options = [
    { key: "tristeza", label: "Tristeza", color: C.tristeza, emoji: "😢" },
    { key: "depresion", label: "Depresión", color: C.depresion, emoji: "🌑" },
    { key: "ansiedad", label: "Ansiedad", color: C.ansiedad, emoji: "⚡" },
  ];

  const handleSelect = async (key) => {
    if (revealed) return;
    setSelected(key);
    setRevealed(true);
    setStats(p => ({ correct: p.correct + (key === q.answer ? 1 : 0), total: p.total + 1 }));
    setSending(true);
    try {
      await fetch("/api/cases", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: `Caso ${currentQ + 1}: seleccionó "${key}" (${key === q.answer ? "✅ correcto" : "❌ incorrecto"})` }),
      });
      setSent(true); setTimeout(() => setSent(false), 2000);
    } catch {}
    setSending(false);
  };

  const next = () => { setCurrentQ(c => c + 1); setSelected(null); setRevealed(false); };
  const isFinished = currentQ >= QUIZ_QUESTIONS.length;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative z-10" style={{ animation: "fadeIn 0.5s ease" }}>
      <div className="max-w-[500px] w-full">
        <button onClick={onBack} className="text-sm mb-4 cursor-pointer bg-transparent border-none" style={{ color: C.tm }}>← Volver al menú</button>

        {isFinished ? (
          <div className="rounded-2xl p-8 text-center" style={{ background: C.glass, backdropFilter: "blur(16px)" }}>
            <span className="text-5xl block mb-3">🎉</span>
            <h3 className="text-xl font-bold mb-2" style={{ color: C.accent1 }}>¡Completado!</h3>
            <p style={{ color: C.ts }}>Resultado: {stats.correct} de {stats.total}</p>
          </div>
        ) : (
          <>
            <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: C.accent1 }}>
              Caso {currentQ + 1} de {QUIZ_QUESTIONS.length}
            </div>
            <div className="rounded-2xl p-5 mb-4" style={{ background: C.glass, backdropFilter: "blur(16px)", borderLeft: `3px solid ${C.accent1}` }}>
              <p className="text-sm leading-relaxed" style={{ color: C.ts }}>{q.scenario}</p>
            </div>
            <div className="flex flex-col gap-2 mb-4">
              {options.map(opt => {
                const isCorrect = opt.key === q.answer;
                const isSel = opt.key === selected;
                let bg = C.bgCard, border = `1px solid ${C.tm}22`;
                if (revealed) { if (isCorrect) { bg = C.success + "18"; border = `2px solid ${C.success}`; } else if (isSel) { bg = C.warning + "18"; border = `2px solid ${C.warning}`; } }
                return (
                  <button key={opt.key} onClick={() => handleSelect(opt.key)}
                    className="flex items-center gap-3 py-3 px-4 rounded-xl text-sm font-medium text-left"
                    style={{ background: bg, border, color: C.tp }}>
                    <span className="text-xl">{opt.emoji}</span><span className="flex-1">{opt.label}</span>
                    {revealed && isCorrect && <span>✅</span>}
                    {revealed && isSel && !isCorrect && <span>❌</span>}
                  </button>
                );
              })}
            </div>
            {revealed && (
              <>
                <div className="rounded-xl p-4 mb-4" style={{ background: C.success + "10", borderLeft: `3px solid ${C.success}`, animation: "slideUp 0.3s ease" }}>
                  <p className="text-sm" style={{ color: C.ts }}>{q.explanation}</p>
                </div>
                {currentQ < QUIZ_QUESTIONS.length - 1 && (
                  <button onClick={next} className="w-full py-3 rounded-xl border-none text-sm font-bold cursor-pointer"
                    style={{ background: `linear-gradient(135deg, ${C.accent1}, ${C.accent2})`, color: C.bg }}>
                    Siguiente →
                  </button>
                )}
              </>
            )}
            {sent && <p className="text-xs text-center mt-2" style={{ color: C.success }}>✅ Respuesta enviada</p>}
          </>
        )}
      </div>
    </div>
  );
}

function ParticipantBrainstorm({ onBack }) {
  const [words, setWords] = useState(["", "", "", "", "", ""]);
  const [zoom, setZoom] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const boxColors = BRAINSTORM_COLORS;

  const updateWord = (i, val) => { const w = [...words]; w[i] = val; setWords(w); };

  const submit = async () => {
    const filled = words.filter(w => w.trim());
    if (filled.length === 0) return;
    setSending(true);
    try {
      await fetch("/api/responses", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ words: filled }),
      });
      setSubmitted(true);
    } catch {}
    setSending(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative z-10" style={{ animation: "fadeIn 0.5s ease" }}>
      <div className="max-w-[500px] w-full">
        <button onClick={onBack} className="text-sm mb-4 cursor-pointer bg-transparent border-none" style={{ color: C.tm }}>← Volver al menú</button>

        {submitted ? (
          <div className="rounded-2xl p-8 text-center" style={{ background: C.glass, backdropFilter: "blur(16px)" }}>
            <span className="text-5xl block mb-3">🎉</span>
            <h3 className="text-xl font-bold mb-2" style={{ color: C.accent1 }}>¡Gracias!</h3>
            <p style={{ color: C.ts }}>Tus palabras han sido enviadas</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-5">
              <span className="text-3xl">💡</span>
              <h2 className="text-xl font-bold mt-1" style={{ color: C.accent1 }}>Lluvia de ideas</h2>
              <p className="text-sm mt-1" style={{ color: C.accent3 }}>¿Qué palabra asocias con depresión?</p>
            </div>

            {zoom !== null ? (
              <div style={{ animation: "fadeIn 0.3s ease" }}>
                <div className="rounded-2xl p-6" style={{ border: `2px solid ${boxColors[zoom]}`, background: C.bgCard }}>
                  <span className="text-sm font-bold block mb-3" style={{ color: boxColors[zoom] }}>Palabra #{zoom + 1}</span>
                  <input type="text" value={words[zoom]} onChange={e => updateWord(zoom, e.target.value)}
                    placeholder="Escribe aquí..." autoFocus
                    className="w-full py-3 px-4 rounded-xl text-lg text-center outline-none"
                    style={{ background: C.bg, border: `1px solid ${boxColors[zoom]}44`, color: C.tp }} />
                  <button onClick={() => setZoom(null)} className="mt-3 w-full py-2.5 rounded-xl border-none text-sm font-bold cursor-pointer"
                    style={{ background: boxColors[zoom], color: C.bg }}>✓ Listo</button>
                </div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {words.map((w, i) => (
                    <button key={i} onClick={() => setZoom(i)}
                      className="rounded-xl p-4 text-center cursor-pointer transition-all"
                      style={{ border: `2px solid ${boxColors[i]}`, background: C.bgCard, minHeight: 80 }}>
                      <span className="text-xs font-bold block mb-1" style={{ color: boxColors[i] }}>#{i + 1}</span>
                      {w ? <span className="text-sm font-bold" style={{ color: C.tp }}>{w}</span> :
                        <span className="text-xs" style={{ color: C.tm }}>Toca</span>}
                    </button>
                  ))}
                </div>
                <button onClick={submit} disabled={sending || words.every(w => !w.trim())}
                  className="w-full py-3 rounded-xl border-none text-base font-bold cursor-pointer"
                  style={{
                    background: words.some(w => w.trim()) ? `linear-gradient(135deg, ${C.accent1}, ${C.accent2})` : C.tm + "33",
                    color: words.some(w => w.trim()) ? C.bg : C.tm,
                  }}>
                  {sending ? "Enviando..." : "Enviar mis palabras"}
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
