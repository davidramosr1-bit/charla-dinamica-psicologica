"use client";
import { COLORS } from "../data";

function Icon({ emoji, size = 48 }) {
  return (
    <span className="inline-block animate-float" style={{ fontSize: size }}>
      {emoji}
    </span>
  );
}

const glass = {
  background: COLORS.glass,
  backdropFilter: "blur(16px)",
  border: `1px solid ${COLORS.textMuted}22`,
};

export function CoverSlide({ slide }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-8 pb-24 text-center animate-fade-in relative z-10">
      <div className="mb-6"><Icon emoji={slide.icon} size={72} /></div>
      <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4 leading-tight"
        style={{ background: `linear-gradient(135deg, ${COLORS.accent1}, ${COLORS.accent2})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
        {slide.title}
      </h1>
      <p className="text-xl font-light mb-8" style={{ color: COLORS.textSecondary }}>{slide.subtitle}</p>
      <div className="flex flex-col gap-2.5 items-center">
        {slide.presenters.map((name, i) => (
          <div key={i} className="inline-flex items-center gap-2.5 py-3 px-7 rounded-full"
            style={{ ...glass }}>
            <span className="text-lg">👩‍⚕️</span>
            <span className="text-base font-medium" style={{ color: COLORS.accent1 }}>{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ContentSlide({ slide }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-8 pb-24 animate-fade-in relative z-10">
      <div className="rounded-2xl p-9 max-w-[900px] w-full" style={glass}>
        <div className="flex items-center gap-4 mb-7">
          <Icon emoji={slide.icon} size={36} />
          <h2 className="text-3xl font-bold">{slide.title}</h2>
        </div>
        <div className="flex flex-col gap-4">
          {slide.points.map((p, i) => (
            <div key={i} className="flex items-start gap-4 p-4 rounded-xl animate-slide-up"
              style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.textMuted}15`, animationDelay: `${i * 0.1}s`, animationFillMode: "both" }}>
              <span className="text-2xl shrink-0">{p.emoji}</span>
              <p className="text-base leading-relaxed" style={{ color: COLORS.textSecondary }}>{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ConceptSlide({ slide }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-8 pb-24 animate-fade-in relative z-10">
      <div className="rounded-2xl p-9 max-w-[900px] w-full" style={{ ...glass, borderTop: `3px solid ${slide.color}` }}>
        <div className="flex items-center gap-4 mb-2">
          <Icon emoji={slide.icon} size={36} />
          <span className="inline-block py-1 px-3.5 rounded-full text-xs font-bold tracking-widest uppercase"
            style={{ color: slide.color, background: slide.color + "18", border: `1px solid ${slide.color}33` }}>
            Concepto clave
          </span>
        </div>
        <h2 className="text-3xl font-bold mb-5" style={{ color: slide.color }}>{slide.title}</h2>
        <p className="text-base leading-relaxed p-4 rounded-xl mb-7"
          style={{ color: COLORS.textSecondary, background: slide.color + "08", borderLeft: `3px solid ${slide.color}44` }}>
          {slide.definition}
        </p>
        <h3 className="text-sm font-bold tracking-widest uppercase mb-4" style={{ color: COLORS.textMuted }}>Características</h3>
        <div className="flex flex-col gap-2.5">
          {slide.characteristics.map((c, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg animate-slide-up"
              style={{ background: COLORS.bgCard, animationDelay: `${i * 0.08}s`, animationFillMode: "both" }}>
              <div className="w-2 h-2 rounded-full shrink-0" style={{ background: slide.color }} />
              <span className="text-sm leading-relaxed" style={{ color: COLORS.textSecondary }}>{c}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ComparisonSlide({ slide }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-8 pb-24 animate-fade-in relative z-10">
      <div className="text-center mb-7">
        <Icon emoji={slide.icon} size={36} />
        <h2 className="text-3xl font-bold mt-2">{slide.title}</h2>
      </div>
      <div className="flex gap-5 max-w-[960px] w-full flex-wrap justify-center">
        {slide.items.map((item, i) => (
          <div key={i} className="flex-1 min-w-[260px] max-w-[300px] rounded-2xl p-7 animate-slide-up"
            style={{ ...glass, borderTop: `3px solid ${item.color}`, animationDelay: `${i * 0.15}s`, animationFillMode: "both" }}>
            <div className="text-center mb-4">
              <span className="text-4xl">{item.emoji}</span>
              <h3 className="text-xl font-bold mt-2" style={{ color: item.color }}>{item.label}</h3>
            </div>
            {item.traits.map((t, j) => (
              <div key={j} className="py-2 px-3 mb-2 rounded-lg text-sm text-center"
                style={{ background: item.color + "10", color: COLORS.textSecondary }}>
                {t}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function VideoSlide({ slide }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-8 pb-24 text-center animate-fade-in relative z-10">
      <div className="rounded-2xl py-16 px-10 flex flex-col items-center max-w-[700px] w-full" style={glass}>
        <div className="w-24 h-24 rounded-full flex items-center justify-center mb-7 animate-pulse2"
          style={{ background: `linear-gradient(135deg, ${COLORS.accent1}22, ${COLORS.accent2}22)` }}>
          <Icon emoji={slide.icon} size={48} />
        </div>
        <h2 className="text-4xl font-bold mb-3">{slide.title}</h2>
        <p className="text-lg mb-8" style={{ color: COLORS.textSecondary }}>{slide.subtitle}</p>
        <div className="py-3.5 px-8 rounded-xl text-base font-semibold"
          style={{ background: COLORS.accent1 + "15", border: `1px solid ${COLORS.accent1}33`, color: COLORS.accent1 }}>
          ▶ Reproducir video externamente
        </div>
        <p className="text-sm mt-5" style={{ color: COLORS.textMuted }}>
          Avance a la siguiente diapositiva cuando el video termine
        </p>
      </div>
    </div>
  );
}

export function QuizIntroSlide({ slide }) {
  const opts = [
    { label: "Tristeza", color: COLORS.tristeza, emoji: "😢" },
    { label: "Depresión", color: COLORS.depresion, emoji: "🌑" },
    { label: "Ansiedad", color: COLORS.ansiedad, emoji: "⚡" },
  ];
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-8 pb-24 text-center animate-fade-in relative z-10">
      <div className="mb-5"><Icon emoji={slide.icon} size={64} /></div>
      <h2 className="text-4xl font-extrabold mb-3"
        style={{ background: `linear-gradient(135deg, ${COLORS.tristeza}, ${COLORS.depresion}, ${COLORS.ansiedad})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
        {slide.title}
      </h2>
      <p className="text-2xl font-semibold mb-5" style={{ color: COLORS.accent1 }}>{slide.subtitle}</p>
      <p className="text-base max-w-[600px] leading-relaxed" style={{ color: COLORS.textSecondary }}>{slide.description}</p>
      <div className="flex gap-4 mt-9 justify-center flex-wrap">
        {opts.map((o, i) => (
          <div key={i} className="py-3 px-6 rounded-xl text-base font-semibold flex items-center gap-2"
            style={{ background: o.color + "15", border: `1px solid ${o.color}33`, color: o.color }}>
            <span>{o.emoji}</span> {o.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ResourcesSlide({ slide }) {
  const icons = ["📞", "💚", "👩‍⚕️"];
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-8 pb-24 animate-fade-in relative z-10">
      <div className="max-w-[700px] w-full text-center">
        <Icon emoji={slide.icon} size={48} />
        <h2 className="text-3xl font-bold mt-2 mb-7">{slide.title}</h2>
        <div className="flex flex-col gap-4">
          {slide.resources.map((r, i) => (
            <div key={i} className="rounded-2xl p-6 flex items-center gap-5 animate-slide-up"
              style={{ ...glass, animationDelay: `${i * 0.1}s`, animationFillMode: "both" }}>
              <div className="w-13 h-13 rounded-xl flex items-center justify-center text-2xl shrink-0"
                style={{ width: 52, height: 52, background: `linear-gradient(135deg, ${COLORS.accent1}22, ${COLORS.accent2}22)` }}>
                {icons[i]}
              </div>
              <div className="text-left">
                <h3 className="text-base font-bold mb-1">{r.name}</h3>
                <p className="text-xl font-bold mb-1" style={{ color: COLORS.accent1 }}>{r.contact}</p>
                <p className="text-sm" style={{ color: COLORS.textMuted }}>{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ClosingSlide({ slide }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-8 pb-24 text-center animate-fade-in relative z-10">
      <Icon emoji={slide.icon} size={64} />
      <h2 className="text-4xl font-extrabold mt-4 mb-8"
        style={{ background: `linear-gradient(135deg, ${COLORS.accent1}, ${COLORS.accent2})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
        {slide.title}
      </h2>
      <div className="flex flex-col gap-4 max-w-[600px] mb-10">
        {slide.messages.map((m, i) => (
          <div key={i} className="py-4 px-6 rounded-2xl text-lg animate-slide-up"
            style={{ ...glass, color: COLORS.textSecondary, animationDelay: `${i * 0.15}s`, animationFillMode: "both" }}>
            {m}
          </div>
        ))}
      </div>
      <p className="text-base font-medium py-3 px-7 rounded-full"
        style={{ color: COLORS.accent1, background: COLORS.accent1 + "10", border: `1px solid ${COLORS.accent1}22` }}>
        {slide.footer}
      </p>
    </div>
  );
}
