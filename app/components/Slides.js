"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { C, BODY_DYNAMICS, QUIZ_QUESTIONS, BRAINSTORM_COLORS } from "../data";

const glass = { background: C.glass, backdropFilter: "blur(16px)", border: `1px solid ${C.tm}22` };

// ─── Slide 1: Cover ───
export function CoverSlide() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-8 pb-24 text-center" style={{ animation: "fadeIn 0.5s ease" }}>
      <span className="text-7xl inline-block" style={{ animation: "float 3s ease-in-out infinite" }}>🧠</span>
      <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mt-6 mb-8 leading-tight"
        style={{ background: `linear-gradient(135deg, ${C.accent1}, ${C.accent2})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
        La salud mental en la Fe
      </h1>
      <div className="flex gap-6 flex-wrap justify-center">
        {["Hna. Andrea Moys de Alfaro", "Hna. Keren de Alvarenga"].map((n, i) => (
          <div key={i} className="inline-flex items-center gap-2.5 py-3 px-6 rounded-full" style={glass}>
            <span className="text-lg">👩‍⚕️</span>
            <span className="text-base font-medium" style={{ color: C.accent1 }}>{n}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Slide 2: Body dynamics ───
export function BodyDynamicsSlide() {
  const [active, setActive] = useState(null);
  const [running, setRunning] = useState(false);
  const timerRef = useRef(null);

  const runSequence = () => {
    setRunning(true);
    let i = 0;
    setActive(0);
    timerRef.current = setInterval(() => {
      i++;
      if (i >= BODY_DYNAMICS.length) { clearInterval(timerRef.current); setRunning(false); setActive(null); }
      else setActive(i);
    }, 4000);
  };

  useEffect(() => () => clearInterval(timerRef.current), []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-8 pb-24" style={{ animation: "fadeIn 0.5s ease" }}>
      <span className="text-5xl mb-4" style={{ animation: "float 3s ease-in-out infinite" }}>🏃</span>
      <h2 className="text-3xl font-bold mb-2" style={{ color: C.accent1 }}>Dinámica corporal</h2>
      <p className="text-base mb-8" style={{ color: C.ts }}>Exprésalo con tu cuerpo</p>

      <div className="grid grid-cols-2 gap-4 max-w-[700px] w-full mb-8">
        {BODY_DYNAMICS.map((d, i) => (
          <button key={i} onClick={() => setActive(active === i ? null : i)}
            className="rounded-2xl p-6 text-center transition-all duration-500"
            style={{
              ...glass,
              borderTop: `3px solid ${d.color}`,
              transform: active === i ? "scale(1.08)" : "scale(1)",
              boxShadow: active === i ? `0 0 30px ${d.color}44` : "none",
            }}>
            <span className="text-5xl block mb-3" style={{ animation: active === i ? "pulse2 1s ease-in-out infinite" : "none" }}>{d.emoji}</span>
            <h3 className="text-xl font-bold mb-1" style={{ color: d.color }}>{d.emotion}</h3>
            <p className="text-sm" style={{ color: C.ts }}>{d.gesture}</p>
            {active === i && (
              <p className="text-base font-semibold mt-3" style={{ color: d.color, animation: "slideUp 0.4s ease" }}>
                {d.instruction}
              </p>
            )}
          </button>
        ))}
      </div>

      <button onClick={runSequence} disabled={running}
        className="py-3 px-8 rounded-xl border-none text-base font-bold cursor-pointer"
        style={{ background: running ? C.tm + "33" : `linear-gradient(135deg, ${C.accent1}, ${C.accent2})`, color: running ? C.tm : C.bg }}>
        {running ? "En progreso..." : "▶ Iniciar secuencia"}
      </button>
    </div>
  );
}

// ─── Slide 3: Video pause ───
export function VideoSlide() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-8 pb-24 text-center" style={{ animation: "fadeIn 0.5s ease" }}>
      <div className="rounded-2xl py-16 px-10 flex flex-col items-center max-w-[700px] w-full" style={glass}>
        <div className="w-24 h-24 rounded-full flex items-center justify-center mb-7"
          style={{ background: `linear-gradient(135deg, ${C.accent1}22, ${C.accent2}22)`, animation: "pulse2 2s ease-in-out infinite" }}>
          <span className="text-5xl">🎬</span>
        </div>
        <h2 className="text-4xl font-bold mb-3">Momento de reflexión</h2>
        <p className="text-lg mb-8" style={{ color: C.ts }}>Video ilustrativo</p>
        <div className="py-3.5 px-8 rounded-xl text-base font-semibold"
          style={{ background: C.accent1 + "15", border: `1px solid ${C.accent1}33`, color: C.accent1 }}>
          ▶ Reproducir video externamente
        </div>
        <p className="text-sm mt-5" style={{ color: C.tm }}>Avance a la siguiente diapositiva cuando el video termine</p>
      </div>
    </div>
  );
}

// ─── Slide 4: Quiz + QR ───
export function QuizSlide({ siteUrl }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [stats, setStats] = useState({ correct: 0, total: 0 });
  const q = QUIZ_QUESTIONS[currentQ];
  const options = [
    { key: "tristeza", label: "Tristeza pasajera", color: C.tristeza, emoji: "😢" },
    { key: "depresion", label: "Depresión", color: C.depresion, emoji: "🌑" },
    { key: "ansiedad", label: "Ansiedad", color: C.ansiedad, emoji: "⚡" },
  ];

  const handleSelect = (key) => {
    if (revealed) return;
    setSelected(key);
    setRevealed(true);
    setStats(p => ({ correct: p.correct + (key === q.answer ? 1 : 0), total: p.total + 1 }));
  };
  const next = () => { if (currentQ < QUIZ_QUESTIONS.length - 1) { setCurrentQ(currentQ + 1); setSelected(null); setRevealed(false); } };
  const isFinished = currentQ === QUIZ_QUESTIONS.length - 1 && revealed;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-8 pb-24" style={{ animation: "fadeIn 0.5s ease" }}>
      <div className="max-w-[800px] w-full">
        <div className="flex justify-between items-center mb-5">
          <span className="py-1 px-3.5 rounded-full text-xs font-bold tracking-widest uppercase"
            style={{ color: C.accent1, background: C.accent1 + "18", border: `1px solid ${C.accent1}33` }}>
            Caso {currentQ + 1} de {QUIZ_QUESTIONS.length}
          </span>
          <span className="text-sm" style={{ color: C.tm }}>✅ {stats.correct}/{stats.total}</span>
        </div>

        <div className="w-full h-1.5 rounded-full mb-7" style={{ background: C.tm + "22" }}>
          <div className="h-full rounded-full transition-all duration-500"
            style={{ width: `${((currentQ + (revealed ? 1 : 0)) / QUIZ_QUESTIONS.length) * 100}%`, background: `linear-gradient(90deg, ${C.accent1}, ${C.accent2})` }} />
        </div>

        <div className="rounded-2xl p-8 mb-6" style={{ ...glass, borderLeft: `4px solid ${C.accent1}` }}>
          <h3 className="text-sm font-bold tracking-widest uppercase mb-3" style={{ color: C.accent1 }}>📋 Escenario</h3>
          <p className="text-base leading-relaxed" style={{ color: C.ts }}>{q.scenario}</p>
        </div>

        <div className="flex flex-col gap-3 mb-6">
          {options.map(opt => {
            const isCorrect = opt.key === q.answer;
            const isSel = opt.key === selected;
            let bg = C.bgCard, border = `1px solid ${C.tm}22`;
            if (revealed) { if (isCorrect) { bg = C.success + "18"; border = `2px solid ${C.success}`; } else if (isSel) { bg = C.warning + "18"; border = `2px solid ${C.warning}`; } }
            else if (isSel) { bg = opt.color + "15"; border = `2px solid ${opt.color}`; }
            return (
              <button key={opt.key} onClick={() => handleSelect(opt.key)}
                className="flex items-center gap-3.5 py-4 px-5 rounded-xl text-base font-medium text-left transition-all"
                style={{ background: bg, border, color: C.tp, cursor: revealed ? "default" : "pointer" }}>
                <span className="text-2xl">{opt.emoji}</span><span className="flex-1">{opt.label}</span>
                {revealed && isCorrect && <span>✅</span>}
                {revealed && isSel && !isCorrect && <span>❌</span>}
              </button>
            );
          })}
        </div>

        {revealed && (
          <div className="rounded-2xl p-6 mb-6" style={{ ...glass, borderLeft: `4px solid ${C.success}`, animation: "slideUp 0.4s ease" }}>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-2" style={{ color: C.success }}>💡 Explicación</h4>
            <p className="text-base leading-relaxed" style={{ color: C.ts }}>{q.explanation}</p>
          </div>
        )}

        {revealed && !isFinished && (
          <div className="text-center">
            <button onClick={next} className="py-3 px-10 rounded-xl border-none text-base font-bold cursor-pointer"
              style={{ background: `linear-gradient(135deg, ${C.accent1}, ${C.accent2})`, color: C.bg }}>
              Siguiente caso →
            </button>
          </div>
        )}

        {isFinished && (
          <div className="text-center p-7 rounded-2xl" style={{ ...glass, animation: "slideUp 0.5s ease" }}>
            <span className="text-5xl block mb-3">🎉</span>
            <h3 className="text-xl font-bold mb-2" style={{ color: C.accent1 }}>¡Dinámica completada!</h3>
            <p className="text-base" style={{ color: C.ts }}>Resultado: {stats.correct} de {stats.total} correctas</p>
            {siteUrl && (
              <div className="mt-6 p-4 rounded-xl" style={{ background: C.bgCard }}>
                <p className="text-sm mb-3" style={{ color: C.accent1 }}>📱 Escanea para participar:</p>
                <QRCode url={siteUrl} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Slides 5 & 6: Images ───
export function ImageSlide({ src, alt }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 pb-24" style={{ animation: "fadeIn 0.5s ease" }}>
      <div className="max-w-[900px] w-full rounded-2xl overflow-hidden shadow-2xl">
        <img src={src} alt={alt} className="w-full h-auto" style={{ objectFit: "contain" }} />
      </div>
    </div>
  );
}

// ─── Slide 7: Brainstorm (presenter) ───
export function BrainstormPresenterSlide() {
  const [words, setWords] = useState(["", "", "", "", "", ""]);
  const [zoom, setZoom] = useState(null);

  const updateWord = (i, val) => { const w = [...words]; w[i] = val; setWords(w); };

  const boxColors = ["#5EEAD4", "#FB923C", "#60A5FA", "#A78BFA", "#F472B6", "#FBBF24"];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-8 pb-24" style={{ animation: "fadeIn 0.5s ease" }}>
      <div className="max-w-[900px] w-full">
        <div className="text-center mb-6">
          <span className="text-4xl">💡</span>
          <h2 className="text-3xl font-bold mt-2" style={{
            background: `linear-gradient(135deg, ${C.accent1}, ${C.accent2})`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
          }}>Lluvia de ideas</h2>
          <p className="text-lg mt-2" style={{ color: C.accent3 }}>¿Qué palabra asocias con depresión?</p>
          <p className="text-sm mt-1" style={{ color: C.tm }}>Toca un cuadro para agrandarlo y escribir</p>
        </div>

        {zoom !== null ? (
          <div className="flex flex-col items-center" style={{ animation: "fadeIn 0.3s ease" }}>
            <div className="w-full max-w-[500px] rounded-2xl p-8" style={{ border: `3px solid ${boxColors[zoom]}`, background: C.bgCard }}>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold"
                  style={{ background: boxColors[zoom] + "33", color: boxColors[zoom] }}>{zoom + 1}</span>
                <span className="text-sm font-semibold" style={{ color: boxColors[zoom] }}>Palabra #{zoom + 1}</span>
              </div>
              <input type="text" value={words[zoom]} onChange={e => updateWord(zoom, e.target.value)}
                placeholder="Escribe aquí..." autoFocus
                className="w-full py-4 px-5 rounded-xl text-2xl text-center outline-none"
                style={{ background: C.bg, border: `2px solid ${boxColors[zoom]}44`, color: C.tp }} />
              <button onClick={() => setZoom(null)}
                className="mt-4 w-full py-3 rounded-xl border-none text-base font-bold cursor-pointer"
                style={{ background: boxColors[zoom], color: C.bg }}>
                ✓ Listo
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {words.map((w, i) => (
              <button key={i} onClick={() => setZoom(i)}
                className="rounded-2xl p-5 text-center cursor-pointer transition-all hover:scale-105"
                style={{ border: `2px solid ${boxColors[i]}`, background: C.bgCard, minHeight: 120 }}>
                <span className="text-sm font-bold block mb-2" style={{ color: boxColors[i] }}>#{i + 1}</span>
                {w ? (
                  <span className="text-xl font-bold" style={{ color: C.tp }}>{w}</span>
                ) : (
                  <span className="text-sm" style={{ color: C.tm }}>Toca para escribir</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Slide 8: QR to brainstorm for participants ───
export function BrainstormQRSlide({ siteUrl }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-8 pb-24 text-center" style={{ animation: "fadeIn 0.5s ease" }}>
      <div className="rounded-2xl p-10 max-w-[500px] w-full" style={glass}>
        <span className="text-5xl block mb-4">📱</span>
        <h2 className="text-3xl font-bold mb-2" style={{ color: C.accent1 }}>¡Tu turno!</h2>
        <p className="text-base mb-6" style={{ color: C.ts }}>
          Escanea el código QR y comparte tus palabras asociadas con depresión
        </p>
        {siteUrl && <QRCode url={siteUrl} />}
        <p className="text-sm mt-4" style={{ color: C.tm }}>Las respuestas aparecerán en vivo en la siguiente diapositiva</p>
      </div>
    </div>
  );
}

// ─── Slide 9: Live word universe ───
export function WordUniverseSlide() {
  const [responses, setResponses] = useState([]);
  const [allWords, setAllWords] = useState([]);

  const fetchResponses = useCallback(async () => {
    try {
      const res = await fetch("/api/responses");
      if (res.ok) {
        const data = await res.json();
        setResponses(data);
        const words = [];
        data.forEach(r => r.words.forEach(w => words.push(w)));
        setAllWords(words);
      }
    } catch {}
  }, []);

  useEffect(() => {
    fetchResponses();
    const iv = setInterval(fetchResponses, 3000);
    return () => clearInterval(iv);
  }, [fetchResponses]);

  const clearAll = async () => {
    await fetch("/api/responses", { method: "DELETE" });
    setResponses([]);
    setAllWords([]);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-8 pb-24" style={{ animation: "fadeIn 0.5s ease" }}>
      <div className="max-w-[900px] w-full">
        <div className="text-center mb-6">
          <span className="text-4xl">🌌</span>
          <h2 className="text-3xl font-bold mt-2" style={{ color: C.accent1 }}>Universo de respuestas</h2>
          <p className="text-sm mt-1" style={{ color: C.ts }}>
            {allWords.length} palabra{allWords.length !== 1 ? "s" : ""} de {responses.length} participante{responses.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="rounded-2xl p-8 min-h-[400px] relative flex flex-wrap gap-3 items-center justify-center content-center" style={glass}>
          {allWords.length === 0 ? (
            <div className="text-center">
              <span className="text-5xl block mb-3">📭</span>
              <p style={{ color: C.tm }}>Esperando respuestas de los participantes...</p>
            </div>
          ) : (
            allWords.map((w, i) => {
              const color = BRAINSTORM_COLORS[i % BRAINSTORM_COLORS.length];
              const size = 16 + Math.random() * 14;
              return (
                <span key={i} className="inline-block px-4 py-2 rounded-full font-bold"
                  style={{
                    fontSize: size, color, background: color + "15", border: `1px solid ${color}33`,
                    animation: `popIn 0.5s ease ${i * 0.08}s both`,
                    "--dx": `${(Math.random() - 0.5) * 10}px`,
                    "--dy": `${(Math.random() - 0.5) * 10}px`,
                    "--rot": `${(Math.random() - 0.5) * 6}deg`,
                  }}>
                  {w}
                </span>
              );
            })
          )}
        </div>

        {allWords.length > 0 && (
          <div className="text-center mt-4">
            <button onClick={clearAll} className="py-2 px-6 rounded-lg text-sm cursor-pointer"
              style={{ border: `1px solid ${C.warning}44`, background: "transparent", color: C.warning }}>
              🗑️ Limpiar respuestas
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── QR Code component ───
function QRCode({ url }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    if (typeof window !== "undefined" && canvasRef.current) {
      import("qrcode").then(QR => {
        QR.toCanvas(canvasRef.current, url, {
          width: 200, margin: 2,
          color: { dark: "#0F1923", light: "#F1F5F9" },
        });
      });
    }
  }, [url]);
  return <canvas ref={canvasRef} className="mx-auto rounded-xl" />;
}

export { QRCode };
