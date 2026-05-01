"use client";
import { useState, useEffect, useCallback } from "react";
import { COLORS } from "../data";

export default function CasesSlide({ slide, role = "presenter" }) {
  const [cases, setCases] = useState([]);
  const [showSubmitted, setShowSubmitted] = useState(false);
  const [newCase, setNewCase] = useState("");
  const [justSent, setJustSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [clearing, setClearing] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);

  const glass = { background: COLORS.glass, backdropFilter: "blur(16px)", border: `1px solid ${COLORS.textMuted}22` };

  // Fetch cases
  const fetchCases = useCallback(async () => {
    try {
      const res = await fetch("/api/cases");
      if (res.ok) {
        const data = await res.json();
        setCases(data);
      }
    } catch (e) { /* silent */ }
  }, []);

  useEffect(() => {
    fetchCases();
    // Poll every 4 seconds for live updates
    const interval = setInterval(fetchCases, 4000);
    return () => clearInterval(interval);
  }, [fetchCases]);

  // Submit case
  const submitCase = async () => {
    if (!newCase.trim() || sending) return;
    setSending(true);
    try {
      const res = await fetch("/api/cases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: newCase.trim() }),
      });
      if (res.ok) {
        setNewCase("");
        setJustSent(true);
        setTimeout(() => setJustSent(false), 3000);
        fetchCases();
      }
    } catch (e) { /* silent */ }
    setSending(false);
  };

  // Toggle read
  const toggleRead = async (id, currentRead) => {
    try {
      await fetch("/api/cases", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, read: !currentRead }),
      });
      setCases((prev) => prev.map((c) => (c.id === id ? { ...c, read: !currentRead } : c)));
    } catch (e) { /* silent */ }
  };

  // Clear all
  const clearCases = async () => {
    if (!confirmClear) {
      setConfirmClear(true);
      setTimeout(() => setConfirmClear(false), 5000);
      return;
    }
    setClearing(true);
    try {
      await fetch("/api/cases", { method: "DELETE" });
      setCases([]);
      setConfirmClear(false);
    } catch (e) { /* silent */ }
    setClearing(false);
  };

  const unreadCount = cases.filter((c) => !c.read).length;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-8 pb-24 animate-fade-in relative z-10">
      <div className="max-w-[800px] w-full">
        {/* Header */}
        <div className="text-center mb-7">
          <span className="text-5xl inline-block animate-float">{slide.icon}</span>
          <h2 className="text-3xl font-bold mt-2">{slide.title}</h2>
          <p className="text-base mt-2" style={{ color: COLORS.textSecondary }}>{slide.subtitle}</p>
        </div>

        {/* Tabs — only for presenters */}
        {role === "presenter" && (
          <div className="flex gap-2 mb-6 justify-center">
            {[
              { label: "Enviar caso", idx: 0 },
              { label: `Ver casos recibidos${unreadCount > 0 ? ` (${unreadCount} nuevo${unreadCount > 1 ? "s" : ""})` : ""}`, idx: 1 },
            ].map(({ label, idx }) => (
              <button key={idx} onClick={() => setShowSubmitted(idx === 1)}
                className="py-2.5 px-6 rounded-xl text-sm font-semibold cursor-pointer border-none transition-all"
                style={{
                  background: (idx === 1) === showSubmitted ? COLORS.accent1 + "22" : "transparent",
                  color: (idx === 1) === showSubmitted ? COLORS.accent1 : COLORS.textMuted,
                  borderBottom: (idx === 1) === showSubmitted ? `2px solid ${COLORS.accent1}` : "2px solid transparent",
                }}>
                {label}
              </button>
            ))}
          </div>
        )}

        {/* Submit form */}
        {(!showSubmitted || role === "participant") ? (
          <div className="rounded-2xl p-9" style={glass}>
            <div className="flex items-center gap-2 mb-4 py-2 px-3.5 rounded-lg"
              style={{ background: COLORS.accent1 + "10" }}>
              <span>🔒</span>
              <span className="text-sm" style={{ color: COLORS.accent1 }}>
                Completamente anónimo — no se registra ningún dato personal
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-5" style={{ color: COLORS.textSecondary }}>
              Describe brevemente cómo te has sentido últimamente, alguna situación que te preocupe,
              o algo que quieras que la psicóloga aborde. Tu identidad permanece completamente privada.
            </p>
            <textarea value={newCase} onChange={(e) => setNewCase(e.target.value)}
              placeholder="Escribe aquí tu experiencia o situación..."
              className="w-full min-h-[120px] p-4 rounded-xl text-base leading-relaxed resize-y outline-none transition-colors"
              style={{
                background: COLORS.bgCard,
                border: `1px solid ${COLORS.textMuted}33`,
                color: COLORS.textPrimary,
              }}
              onFocus={(e) => (e.target.style.borderColor = COLORS.accent1 + "66")}
              onBlur={(e) => (e.target.style.borderColor = COLORS.textMuted + "33")}
            />
            <div className="flex justify-end mt-4 items-center gap-4">
              {justSent && (
                <span className="text-sm animate-fade-in" style={{ color: COLORS.success }}>
                  ✅ Enviado de forma anónima
                </span>
              )}
              <button onClick={submitCase} disabled={!newCase.trim() || sending}
                className="py-3 px-8 rounded-xl border-none text-sm font-bold cursor-pointer transition-all"
                style={{
                  background: newCase.trim()
                    ? `linear-gradient(135deg, ${COLORS.accent1}, ${COLORS.accent2})`
                    : COLORS.textMuted + "33",
                  color: newCase.trim() ? COLORS.bg : COLORS.textMuted,
                  cursor: newCase.trim() ? "pointer" : "not-allowed",
                }}>
                {sending ? "Enviando..." : "Enviar anónimamente"}
              </button>
            </div>
          </div>
        ) : (
          /* ── Cases received (presenter only) ── */
          <div>
            <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
              <span className="text-sm" style={{ color: COLORS.textMuted }}>
                {cases.length} caso{cases.length !== 1 ? "s" : ""} recibido{cases.length !== 1 ? "s" : ""}
                {unreadCount > 0 && (
                  <span className="ml-2 py-0.5 px-2 rounded-full text-xs font-bold"
                    style={{ background: COLORS.accent1 + "22", color: COLORS.accent1 }}>
                    {unreadCount} sin leer
                  </span>
                )}
              </span>
              {cases.length > 0 && (
                <button onClick={clearCases} disabled={clearing}
                  className="py-1.5 px-4 rounded-lg text-sm cursor-pointer transition-all"
                  style={{
                    border: `1px solid ${confirmClear ? COLORS.warning : COLORS.warning + "44"}`,
                    background: confirmClear ? COLORS.warning + "20" : "transparent",
                    color: COLORS.warning,
                  }}>
                  {clearing ? "Limpiando..." : confirmClear ? "⚠️ Confirmar: Borrar todo" : "🗑️ Limpiar todos"}
                </button>
              )}
            </div>

            {cases.length === 0 ? (
              <div className="rounded-2xl text-center py-12 px-8" style={glass}>
                <span className="text-4xl block mb-3">📭</span>
                <p style={{ color: COLORS.textMuted }}>Aún no se han recibido casos</p>
                <p className="text-sm mt-2" style={{ color: COLORS.textMuted }}>
                  Los participantes pueden enviar desde sus celulares
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {cases.map((c, i) => (
                  <div key={c.id}
                    className="rounded-2xl p-5 transition-all animate-slide-up"
                    style={{
                      ...glass,
                      borderLeft: `3px solid ${c.read ? COLORS.textMuted + "44" : COLORS.accent2}`,
                      opacity: c.read ? 0.65 : 1,
                      animationDelay: `${i * 0.05}s`,
                      animationFillMode: "both",
                    }}>
                    <div className="flex justify-between items-center mb-2 flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold" style={{ color: c.read ? COLORS.textMuted : COLORS.accent2 }}>
                          {c.read ? "✓ Leído" : "● Nuevo"} — Caso anónimo #{i + 1}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs" style={{ color: COLORS.textMuted }}>{c.timestamp}</span>
                        <button onClick={() => toggleRead(c.id, c.read)}
                          className="py-1 px-3 rounded-lg text-xs cursor-pointer border-none transition-all"
                          style={{
                            background: c.read ? COLORS.accent2 + "15" : COLORS.success + "15",
                            color: c.read ? COLORS.accent2 : COLORS.success,
                          }}>
                          {c.read ? "Marcar sin leer" : "Marcar leído ✓"}
                        </button>
                      </div>
                    </div>
                    <p className="text-base leading-relaxed" style={{ color: COLORS.textSecondary }}>{c.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
