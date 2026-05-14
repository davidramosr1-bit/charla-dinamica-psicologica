export const C = {
  bg: "#0F1923", bgCard: "#1A2736", accent1: "#5EEAD4", accent2: "#A78BFA",
  accent3: "#FB923C", warning: "#F87171", success: "#34D399",
  tp: "#F1F5F9", ts: "#94A3B8", tm: "#64748B",
  tristeza: "#60A5FA", depresion: "#A78BFA", ansiedad: "#FB923C",
  glass: "rgba(30,41,59,0.7)",
};

export const PRESENTER_PASSWORD = "salud2026";

export const QUIZ_QUESTIONS = [
  {
    scenario: "María perdió a su mascota hace 3 días. Llora frecuentemente, pero sigue yendo al trabajo y comiendo con normalidad. Sus amigas la consuelan y eso la hace sentir mejor.",
    answer: "tristeza",
    explanation: "María experimenta tristeza normal. Tiene una causa clara, es reciente, sigue funcionando en su vida diaria y el apoyo social la reconforta.",
  },
  {
    scenario: "Carlos tiene 2 meses sintiéndose vacío. Ya no disfruta el fútbol que antes amaba. Duerme 12 horas y aún se siente agotado. Ha perdido 5 kilos sin proponérselo y piensa que es una carga para su familia.",
    answer: "depresion",
    explanation: "Carlos muestra signos de depresión: duración prolongada, pérdida de interés (anhedonia), alteración del sueño y apetito, fatiga persistente y pensamientos de inutilidad.",
  },
  {
    scenario: "Ana siente que algo terrible va a pasar, aunque no sabe qué. Le sudan las manos, el corazón le late rápido y tiene un nudo en el estómago constante. Evita salir de casa por temor a que algo malo ocurra.",
    answer: "ansiedad",
    explanation: "Ana presenta ansiedad: preocupación sin causa específica, síntomas físicos (sudoración, taquicardia), sensación de peligro inminente y conductas de evitación.",
  },
  {
    scenario: "Laura no puede dejar de pensar en su presentación de mañana. Ha revisado las diapositivas 15 veces, imagina todos los errores posibles y no ha podido dormir en 3 noches. Siente presión en el pecho y le cuesta respirar.",
    answer: "ansiedad",
    explanation: "Laura presenta ansiedad anticipatoria: pensamientos repetitivos sobre el futuro, catastrofización, insomnio, y síntomas físicos como opresión en el pecho y dificultad respiratoria.",
  },
];

export const BODY_DYNAMICS = [
  { emotion: "Alegría", gesture: "Brazos arriba", emoji: "😊", color: "#34D399", instruction: "¡Levanta los brazos al cielo!" },
  { emotion: "Ansiedad", gesture: "Manos en el pecho", emoji: "😰", color: "#FB923C", instruction: "Lleva las manos al pecho" },
  { emotion: "Tristeza", gesture: "Cabeza baja", emoji: "😢", color: "#60A5FA", instruction: "Inclina la cabeza hacia abajo" },
  { emotion: "Confianza", gesture: "Brazos cruzados con firmeza", emoji: "💪", color: "#A78BFA", instruction: "Cruza los brazos con firmeza" },
];

export const BRAINSTORM_COLORS = ["#5EEAD4", "#A78BFA", "#FB923C", "#F472B6", "#60A5FA", "#FBBF24"];
