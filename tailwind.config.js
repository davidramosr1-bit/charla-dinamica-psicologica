/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0F1923",
        "bg-card": "#1A2736",
        accent1: "#5EEAD4",
        accent2: "#A78BFA",
        accent3: "#FB923C",
        tristeza: "#60A5FA",
        depresion: "#A78BFA",
        ansiedad: "#FB923C",
      },
      fontFamily: {
        sans: ["'Segoe UI'", "'Helvetica Neue'", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease",
        "slide-up": "slideUp 0.5s ease",
        float: "float 3s ease-in-out infinite",
        pulse2: "pulse2 2s ease-in-out infinite",
        shake: "shake 0.4s ease",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulse2: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "20%, 60%": { transform: "translateX(-8px)" },
          "40%, 80%": { transform: "translateX(8px)" },
        },
      },
    },
  },
  plugins: [],
};
