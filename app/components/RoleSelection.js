"use client";
import { useState } from "react";
import { COLORS, PRESENTER_PASSWORD } from "../data";

export default function RoleSelection({ onSelectRole }) {
  const [mode, setMode] = useState(null);
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const submitPassword = () => {
    if (pwd === PRESENTER_PASSWORD) {
      onSelectRole("presenter");
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setTimeout(() => setError(false), 2500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${COLORS.bg} 0%, #1A1F2E 50%, ${COLORS.bg} 100%)` }}>
      {/* Ambient orbs */}
      <div className="fixed -top-[10%] -left-[5%] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${COLORS.accent1}15, transparent 70%)`, filter: "blur(60px)" }} />
      <div className="fixed top-[60%] left-[80%] w-[350px] h-[350px] rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${COLORS.accent2}15, transparent 70%)`, filter: "blur(60px)" }} />

      <div className="text-center px-8 max-w-md w-full relative z-10">
        <div className="mb-5">
          <span className="text-6xl inline-block animate-float">🧠</span>
        </div>
        <h1 className="text-3xl font-extrabold mb-2"
          style={{ background: `linear-gradient(135deg, ${COLORS.accent1}, ${COLORS.accent2})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Ansiedad y Depresión
        </h1>
        <p className="text-base mb-9" style={{ color: COLORS.textSecondary }}>
          Comprendiendo nuestras emociones
        </p>

        {mode === null ? (
          <div className="flex flex-col gap-4">
            <button onClick={() => onSelectRole("participant")}
              className="p-5 rounded-2xl flex items-center gap-3.5 text-left transition-all hover:scale-[1.02]"
              style={{ border: `1px solid ${COLORS.accent1}33`, background: COLORS.accent1 + "12", color: COLORS.textPrimary }}>
              <span className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                style={{ background: COLORS.accent1 + "22" }}>🙋</span>
              <div>
                <div className="font-semibold text-lg">Soy participante</div>
                <div className="text-sm font-normal" style={{ color: COLORS.textMuted }}>
                  Enviar mi experiencia de forma anónima
                </div>
              </div>
            </button>

            <button onClick={() => setMode("password")}
              className="p-5 rounded-2xl flex items-center gap-3.5 text-left transition-all hover:scale-[1.02]"
              style={{ border: `1px solid ${COLORS.accent2}33`, background: COLORS.accent2 + "12", color: COLORS.textPrimary }}>
              <span className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                style={{ background: COLORS.accent2 + "22" }}>👩‍⚕️</span>
              <div>
                <div className="font-semibold text-lg">Soy expositora</div>
                <div className="text-sm font-normal" style={{ color: COLORS.textMuted }}>
                  Acceder a la presentación completa
                </div>
              </div>
            </button>
          </div>
        ) : (
          <div className={`rounded-2xl p-8 ${shake ? "animate-shake" : "animate-fade-in"}`}
            style={{ background: COLORS.glass, backdropFilter: "blur(16px)", border: `1px solid ${COLORS.textMuted}22` }}>
            <div className="mb-5">
              <span className="text-4xl">🔐</span>
              <h3 className="text-lg font-bold mt-2" style={{ color: COLORS.accent2 }}>Acceso de expositora</h3>
              <p className="text-sm mt-1.5" style={{ color: COLORS.textMuted }}>Ingresa la contraseña para acceder</p>
            </div>
            <input type="password" value={pwd}
              onChange={(e) => { setPwd(e.target.value); setError(false); }}
              onKeyDown={(e) => e.key === "Enter" && submitPassword()}
              placeholder="Contraseña" autoFocus
              className="w-full py-3.5 px-4 rounded-xl text-base text-center tracking-[4px] outline-none transition-colors"
              style={{
                background: COLORS.bgCard,
                border: `2px solid ${error ? COLORS.warning : COLORS.textMuted + "33"}`,
                color: COLORS.textPrimary,
              }} />
            {error && (
              <p className="text-sm mt-2.5 animate-fade-in" style={{ color: COLORS.warning }}>
                Contraseña incorrecta. Intenta de nuevo.
              </p>
            )}
            <div className="flex gap-3 mt-5">
              <button onClick={() => { setMode(null); setPwd(""); setError(false); }}
                className="flex-1 py-3 rounded-xl text-base cursor-pointer"
                style={{ border: `1px solid ${COLORS.textMuted}33`, background: "transparent", color: COLORS.textMuted }}>
                ← Volver
              </button>
              <button onClick={submitPassword}
                className="flex-1 py-3 rounded-xl text-base font-bold cursor-pointer border-none"
                style={{ background: `linear-gradient(135deg, ${COLORS.accent2}, ${COLORS.accent1})`, color: COLORS.bg }}>
                Ingresar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
