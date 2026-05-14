"use client";
import { useState } from "react";
import { C, PRESENTER_PASSWORD } from "../data";

export default function RoleSelection({ onSelectRole }) {
  const [showPwd, setShowPwd] = useState(false);
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const submit = () => {
    if (pwd === PRESENTER_PASSWORD) onSelectRole("presenter");
    else { setError(true); setShake(true); setTimeout(() => setShake(false), 500); setTimeout(() => setError(false), 2500); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${C.bg} 0%, #1A1F2E 50%, ${C.bg} 100%)` }}>
      <div className="fixed -top-[10%] -left-[5%] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${C.accent1}15, transparent 70%)`, filter: "blur(60px)" }} />
      <div className="fixed top-[60%] left-[80%] w-[350px] h-[350px] rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${C.accent2}15, transparent 70%)`, filter: "blur(60px)" }} />

      {/* Presenter access - corner button */}
      {!showPwd && (
        <button onClick={() => setShowPwd(true)}
          className="fixed top-4 right-4 py-2 px-4 rounded-lg text-xs cursor-pointer z-20"
          style={{ background: C.accent2 + "10", border: `1px solid ${C.accent2}22`, color: C.accent2 }}>
          👩‍⚕️ Expositora
        </button>
      )}

      <div className="text-center px-6 max-w-md w-full relative z-10">
        <span className="text-6xl inline-block" style={{ animation: "float 3s ease-in-out infinite" }}>🧠</span>
        <h1 className="text-3xl font-extrabold mt-4 mb-2"
          style={{ background: `linear-gradient(135deg, ${C.accent1}, ${C.accent2})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          La salud mental en la Fe
        </h1>

        {!showPwd ? (
          <div className="mt-8">
            <button onClick={() => onSelectRole("participant")}
              className="w-full p-5 rounded-2xl flex items-center gap-3.5 text-left transition-all hover:scale-[1.02]"
              style={{ border: `1px solid ${C.accent1}33`, background: C.accent1 + "12", color: C.tp }}>
              <span className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                style={{ background: C.accent1 + "22" }}>🙋</span>
              <div>
                <div className="font-semibold text-lg">Soy participante</div>
                <div className="text-sm font-normal" style={{ color: C.tm }}>Participar en las actividades</div>
              </div>
            </button>
          </div>
        ) : (
          <div className={`rounded-2xl p-8 mt-6 ${shake ? "" : ""}`}
            style={{ background: C.glass, backdropFilter: "blur(16px)", border: `1px solid ${C.tm}22`, animation: shake ? "shake 0.4s ease" : "fadeIn 0.4s ease" }}>
            <span className="text-3xl block mb-2">🔐</span>
            <h3 className="text-lg font-bold" style={{ color: C.accent2 }}>Acceso expositora</h3>
            <input type="password" value={pwd}
              onChange={e => { setPwd(e.target.value); setError(false); }}
              onKeyDown={e => e.key === "Enter" && submit()}
              placeholder="Contraseña" autoFocus
              className="w-full py-3 px-4 rounded-xl text-base text-center tracking-[4px] outline-none mt-4"
              style={{ background: C.bgCard, border: `2px solid ${error ? C.warning : C.tm + "33"}`, color: C.tp }} />
            {error && <p className="text-sm mt-2" style={{ color: C.warning, animation: "fadeIn 0.3s ease" }}>Contraseña incorrecta</p>}
            <div className="flex gap-3 mt-5">
              <button onClick={() => { setShowPwd(false); setPwd(""); setError(false); }}
                className="flex-1 py-3 rounded-xl text-sm cursor-pointer"
                style={{ border: `1px solid ${C.tm}33`, background: "transparent", color: C.tm }}>← Volver</button>
              <button onClick={submit}
                className="flex-1 py-3 rounded-xl text-sm font-bold cursor-pointer border-none"
                style={{ background: `linear-gradient(135deg, ${C.accent2}, ${C.accent1})`, color: C.bg }}>Ingresar</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
