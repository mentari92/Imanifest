// apps/mobile-web/tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./hooks/**/*.{js,ts,jsx,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#D4AF37", // Gold
          light: "#E5C158",
        },
        accent: {
          DEFAULT: "#F8FAFC", // Off White
          secondary: "#10B981", // Emerald
        },
        highlight: {
          DEFAULT: "#FFFFFF",
        },
        surface: {
          DEFAULT: "rgba(2, 44, 34, 0.4)", // Darker Emerald glass
          card:    "rgba(6, 78, 59, 0.6)", // Medium Emerald card
          modal:   "rgba(2, 44, 34, 0.95)",
          input:   "rgba(255, 255, 255, 0.05)",
        },
        background: {
          DEFAULT: "#022C22", // Deepest Emerald
        },
        border: {
          DEFAULT: "rgba(212, 175, 55, 0.2)", // Subtle Gold border
        },
        ink: {
          primary:   "#F8FAFC", // Off-white text
          secondary: "#94A3B8", // Muted slate
          disabled:  "#475569",
          inverse:   "#022C22", // Deep green text on gold buttons
        },
        status: {
          error:   "#FF6B6B",
          success: "#40C057",
          warning: "#FFD43B",
          info:    "#4DABF7",
        },
      },
      fontFamily: {
        sans:    ["Lora-Regular", "Lora-SemiBold"],
        display: ["PlayfairDisplay-Bold", "PlayfairDisplay-Regular"],
        mono:    ["JetBrainsMono-Regular"],
        arabic:  ["Amiri-Regular"],
      },
      borderRadius: {
        card:   "12px",
        button: "8px",
        pill:   "999px",
        verse:  "16px",
      },
      spacing: {
        "screen-x": "20px",
        "screen-y": "24px",
        "card-p":   "16px",
        "section":  "32px",
      },
      fontSize: {
        "display-xl": ["32px", { lineHeight: "40px", fontWeight: "700" }],
        "display-lg": ["26px", { lineHeight: "34px", fontWeight: "700" }],
        "display-md": ["22px", { lineHeight: "30px", fontWeight: "700" }],
        "body-lg":    ["17px", { lineHeight: "26px", fontWeight: "400" }],
        "body-md":    ["15px", { lineHeight: "24px", fontWeight: "400" }],
        "body-sm":    ["13px", { lineHeight: "20px", fontWeight: "400" }],
        "label":      ["13px", { lineHeight: "18px", fontWeight: "600" }],
        "mono":       ["13px", { lineHeight: "20px", fontWeight: "400" }],
        "arabic-lg":  ["26px", { lineHeight: "42px", fontWeight: "400" }],
        "arabic-md":  ["20px", { lineHeight: "34px", fontWeight: "400" }],
      },
      boxShadow: {
          card:    "0 4px 16px rgba(2, 44, 34, 0.4), 0 2px 4px rgba(2, 44, 34, 0.2)",
          "card-hover": "0 8px 24px rgba(2, 44, 34, 0.5)",
          verse:   "0 4px 12px rgba(212, 175, 55, 0.2)",
          gold:    "0 0 0 2px rgba(212, 175, 55, 0.40)",
        },
    },
  },
  plugins: [],
};