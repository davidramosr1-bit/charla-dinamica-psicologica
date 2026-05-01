export const COLORS = {
  bg: "#0F1923",
  bgCard: "#1A2736",
  accent1: "#5EEAD4",
  accent2: "#A78BFA",
  accent3: "#FB923C",
  warning: "#F87171",
  success: "#34D399",
  textPrimary: "#F1F5F9",
  textSecondary: "#94A3B8",
  textMuted: "#64748B",
  tristeza: "#60A5FA",
  depresion: "#A78BFA",
  ansiedad: "#FB923C",
  glass: "rgba(30, 41, 59, 0.7)",
};

export const SLIDES = [
  {
    id: "cover",
    type: "cover",
    title: "Ansiedad y Depresión",
    subtitle: "Comprendiendo nuestras emociones",
    presenters: [
      "Psic. Andrea Moys de Alfaro",
      "Psic. Keren de Alvarenga",
    ],
    icon: "🧠",
  },
  {
    id: "intro",
    type: "content",
    title: "¿Por qué hablar de esto?",
    icon: "💬",
    points: [
      { emoji: "📊", text: "Según la OMS, más de 280 millones de personas sufren depresión en el mundo" },
      { emoji: "🌍", text: "Los trastornos de ansiedad afectan a 301 millones de personas globalmente" },
      { emoji: "🤝", text: "Hablar abiertamente reduce el estigma y abre puertas a la ayuda profesional" },
      { emoji: "💡", text: "Hoy aprenderemos a distinguir entre emociones normales y señales de alerta" },
    ],
  },
  {
    id: "tristeza",
    type: "concept",
    title: "Tristeza: Una emoción natural",
    icon: "😢",
    color: COLORS.tristeza,
    definition:
      "La tristeza es una emoción básica y temporal que surge como respuesta a situaciones de pérdida, decepción o dolor. Es una parte normal de la experiencia humana.",
    characteristics: [
      "Es temporal — tiene inicio y fin identificable",
      "Tiene una causa específica y reconocible",
      "Permite seguir funcionando en la vida diaria",
      "Se alivia con apoyo social, descanso o tiempo",
      "No afecta significativamente la autoestima",
    ],
  },
  {
    id: "depresion",
    type: "concept",
    title: "Depresión: Más allá de la tristeza",
    icon: "🌑",
    color: COLORS.depresion,
    definition:
      "La depresión es un trastorno del estado de ánimo que afecta cómo una persona piensa, siente y maneja las actividades diarias. Persiste por semanas o meses.",
    characteristics: [
      "Persiste al menos 2 semanas de forma continua",
      "Puede aparecer sin causa aparente",
      "Afecta el sueño, apetito, energía y concentración",
      "Genera sentimientos de inutilidad o culpa excesiva",
      "Puede incluir pensamientos de muerte o autolesión",
      "Requiere atención profesional",
    ],
  },
  {
    id: "ansiedad",
    type: "concept",
    title: "Ansiedad: Cuando el miedo se desborda",
    icon: "⚡",
    color: COLORS.ansiedad,
    definition:
      "La ansiedad es una respuesta de alerta excesiva ante situaciones percibidas como amenazantes. Cuando es desproporcionada o persistente, se convierte en un trastorno.",
    characteristics: [
      "Preocupación excesiva y difícil de controlar",
      "Síntomas físicos: taquicardia, sudoración, tensión muscular",
      "Dificultad para concentrarse o mente en blanco",
      "Irritabilidad y problemas para dormir",
      "Evitación de situaciones que generan miedo",
      "Anticipación catastrófica del futuro",
    ],
  },
  {
    id: "diferencias",
    type: "comparison",
    title: "¿Cómo diferenciarlas?",
    icon: "🔍",
    items: [
      {
        label: "Tristeza",
        color: COLORS.tristeza,
        emoji: "😢",
        traits: ["Temporal", "Causa clara", "Funcionas normalmente", "Se resuelve sola"],
      },
      {
        label: "Depresión",
        color: COLORS.depresion,
        emoji: "🌑",
        traits: ["Persistente (+2 sem)", "Sin causa clara", "Afecta lo cotidiano", "Requiere ayuda"],
      },
      {
        label: "Ansiedad",
        color: COLORS.ansiedad,
        emoji: "⚡",
        traits: ["Miedo al futuro", "Síntomas físicos", "Evitación", "Pensamientos acelerados"],
      },
    ],
  },
  {
    id: "video",
    type: "video",
    title: "Momento de reflexión",
    subtitle: "Video ilustrativo",
    icon: "🎬",
  },
  {
    id: "quiz-intro",
    type: "quiz-intro",
    title: "¡Dinámica Interactiva!",
    subtitle: "¿Tristeza, Depresión o Ansiedad?",
    description:
      "A continuación veremos ejemplos de la vida real. Juntos identificaremos si se trata de una emoción pasajera o algo que necesita atención profesional.",
    icon: "🎯",
  },
  { id: "quiz", type: "quiz" },
  {
    id: "casos",
    type: "cases",
    title: "Espacio de confianza",
    subtitle: "Comparte tu experiencia de forma anónima",
    icon: "🫂",
  },
  {
    id: "recursos",
    type: "resources",
    title: "Recursos y ayuda",
    icon: "🆘",
    resources: [
      { name: "Línea de crisis (El Salvador)", contact: "132", desc: "Atención las 24 horas" },
      { name: "Línea de la vida", contact: "2133-6300", desc: "Apoyo emocional gratuito" },
      {
        name: "Consulta profesional",
        contact: "Psic. Andrea Moys de Alfaro & Psic. Keren de Alvarenga",
        desc: "Agendar cita personalizada",
      },
    ],
  },
  {
    id: "cierre",
    type: "closing",
    title: "Recuerda...",
    icon: "🌟",
    messages: [
      "Sentir tristeza es humano, no es debilidad.",
      "Pedir ayuda es un acto de valentía.",
      "La ansiedad y la depresión son tratables.",
      "No estás solo/a en esto.",
    ],
    footer: "Gracias por participar — Psic. Andrea Moys de Alfaro & Psic. Keren de Alvarenga",
  },
];

export const QUIZ_QUESTIONS = [
  {
    scenario:
      "María perdió a su mascota hace 3 días. Llora frecuentemente, pero sigue yendo al trabajo y comiendo con normalidad. Sus amigas la consuelan y eso la hace sentir mejor.",
    answer: "tristeza",
    explanation:
      "María experimenta tristeza normal. Tiene una causa clara, es reciente, sigue funcionando en su vida diaria y el apoyo social la reconforta.",
  },
  {
    scenario:
      "Carlos tiene 2 meses sintiéndose vacío. Ya no disfruta el fútbol que antes amaba. Duerme 12 horas y aún se siente agotado. Ha perdido 5 kilos sin proponérselo y piensa que es una carga para su familia.",
    answer: "depresion",
    explanation:
      "Carlos muestra signos de depresión: duración prolongada, pérdida de interés (anhedonia), alteración del sueño y apetito, fatiga persistente y pensamientos de inutilidad.",
  },
  {
    scenario:
      "Ana siente que algo terrible va a pasar, aunque no sabe qué. Le sudan las manos, el corazón le late rápido y tiene un nudo en el estómago constante. Evita salir de casa por temor a que algo malo ocurra.",
    answer: "ansiedad",
    explanation:
      "Ana presenta ansiedad: preocupación sin causa específica, síntomas físicos (sudoración, taquicardia), sensación de peligro inminente y conductas de evitación.",
  },
  {
    scenario:
      "Pedro no consiguió el ascenso que esperaba. Está desanimado y un poco frustrado desde el viernes. El lunes decide hablar con su jefe para preguntar qué puede mejorar.",
    answer: "tristeza",
    explanation:
      "Pedro siente tristeza y frustración temporal. Tiene causa identificable, es de corta duración y toma acción constructiva para resolverlo.",
  },
  {
    scenario:
      "Laura no puede dejar de pensar en su presentación de mañana. Ha revisado las diapositivas 15 veces, imagina todos los errores posibles y no ha podido dormir en 3 noches. Siente presión en el pecho y le cuesta respirar.",
    answer: "ansiedad",
    explanation:
      "Laura presenta ansiedad anticipatoria: pensamientos repetitivos sobre el futuro, catastrofización, insomnio, y síntomas físicos como opresión en el pecho y dificultad respiratoria.",
  },
  {
    scenario:
      "Jorge lleva 3 semanas sin querer levantarse de la cama. Ha faltado al trabajo varias veces. Siente que nada tiene sentido y ha dejado de contestar llamadas de amigos y familiares. No recuerda la última vez que se rió.",
    answer: "depresion",
    explanation:
      "Jorge muestra depresión: duración prolongada, aislamiento social, pérdida de motivación, incapacidad de experimentar placer y afectación de la vida laboral.",
  },
  {
    scenario:
      "Sofía fue rechazada en una entrevista de trabajo. Lloró esa noche, habló con su mamá y al día siguiente comenzó a buscar nuevas ofertas con mejor ánimo.",
    answer: "tristeza",
    explanation:
      "Sofía experimenta tristeza normal y sana. Reacción proporcional, busca apoyo, se recupera rápidamente y toma acción.",
  },
  {
    scenario:
      "Miguel revisa la puerta 8 veces antes de salir, teme constantemente que alguien entre a robar. En el trabajo no puede concentrarse porque piensa en posibles accidentes de sus hijos. Ha empezado a tener dolores de cabeza crónicos.",
    answer: "ansiedad",
    explanation:
      "Miguel muestra ansiedad severa: comportamientos compulsivos de verificación, preocupación persistente e irracional, incapacidad de concentrarse y somatización (dolores de cabeza).",
  },
];

export const PRESENTER_PASSWORD = "salud2026";
