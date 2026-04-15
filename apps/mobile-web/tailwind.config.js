/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // ── Stitch / Imanifest holographic palette ──────────────────────
        primary: {
          DEFAULT: "#605d71",
          dim: "#545164",
          fixed: "#e5dff8",
          "fixed-dim": "#d7d1e9",
          container: "#e5dff8",
        },
        "on-primary": "#fcf7ff",
        "on-primary-container": "#524f63",
        "on-primary-fixed": "#403d50",
        "on-primary-fixed-variant": "#5c596d",
        "inverse-primary": "#e5dff8",

        secondary: {
          DEFAULT: "#6d5965",
          dim: "#614e59",
          fixed: "#ffe4f2",
          "fixed-dim": "#f0d6e4",
          container: "#ffe4f2",
        },
        "on-secondary": "#fff7f8",
        "on-secondary-container": "#65515d",
        "on-secondary-fixed": "#513f4a",
        "on-secondary-fixed-variant": "#6f5b67",

        tertiary: {
          DEFAULT: "#206c3a",
          dim: "#0e6030",
          fixed: "#a9f7b7",
          "fixed-dim": "#9be9aa",
          container: "#a9f7b7",
        },
        "on-tertiary": "#e8ffe8",
        "on-tertiary-container": "#0e6030",
        "on-tertiary-fixed": "#004c22",
        "on-tertiary-fixed-variant": "#1d6b39",
        "sage-green": "#166534",

        background: { DEFAULT: "#f9f9fd" },
        "on-background": "#2f3338",

        surface: {
          DEFAULT: "#f9f9fd",
          bright: "#f9f9fd",
          dim: "#d6dae2",
          variant: "#dfe2ea",
          tint: "#605d71",
          container: "#eceef3",
          "container-low": "#f2f3f8",
          "container-high": "#e6e8ee",
          "container-highest": "#dfe2ea",
          "container-lowest": "#ffffff",
        },
        "on-surface": "#2f3338",
        "on-surface-variant": "#5b5f65",
        "inverse-surface": "#0c0e11",
        "inverse-on-surface": "#9c9da0",

        outline: { DEFAULT: "#777b81", variant: "#aeb2b9" },

        error: { DEFAULT: "#ac3149", dim: "#770326", container: "#f76a80" },
        "on-error": "#fff7f7",
        "on-error-container": "#68001f",

        // ── Backward-compat aliases ──────────────────────────────────────
        accent: { DEFAULT: "#a9f7b7", secondary: "#206c3a" },
        ink: {
          primary: "#2f3338",
          secondary: "#5b5f65",
          disabled: "#aeb2b9",
          inverse: "#f9f9fd",
        },
        border: { DEFAULT: "rgba(96,93,113,0.2)" },
        status: {
          error: "#ac3149",
          success: "#206c3a",
          warning: "#d97706",
          info: "#4dabf7",
        },
      },

      fontFamily: {
        sans: ["Plus Jakarta Sans", "Lora-Regular", "system-ui", "sans-serif"],
        display: ["Newsreader", "PlayfairDisplay-Bold", "Georgia", "serif"],
        headline: ["Newsreader", "PlayfairDisplay-Bold", "Georgia", "serif"],
        body: ["Noto Serif", "Lora-Regular", "Georgia", "serif"],
        label: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
        arabic: ["Amiri", "Amiri-Regular", "serif"],
        mono: ["JetBrainsMono-Regular", "monospace"],
      },

      borderRadius: {
        card: "12px",
        button: "8px",
        pill: "999px",
        verse: "16px",
        "2xl": "16px",
        "3xl": "24px",
        "4xl": "32px",
        "5xl": "40px",
      },

      spacing: {
        "screen-x": "20px",
        "screen-y": "24px",
        "card-p": "16px",
        section: "32px",
      },

      fontSize: {
        "display-xl": ["32px", { lineHeight: "40px", fontWeight: "700" }],
        "display-lg": ["26px", { lineHeight: "34px", fontWeight: "700" }],
        "display-md": ["22px", { lineHeight: "30px", fontWeight: "700" }],
        "body-lg": ["17px", { lineHeight: "26px", fontWeight: "400" }],
        "body-md": ["15px", { lineHeight: "24px", fontWeight: "400" }],
        "body-sm": ["13px", { lineHeight: "20px", fontWeight: "400" }],
        "body-xs": ["11px", { lineHeight: "16px", fontWeight: "400" }],
        label: ["13px", { lineHeight: "18px", fontWeight: "600" }],
        mono: ["13px", { lineHeight: "20px", fontWeight: "400" }],
        "arabic-lg": ["26px", { lineHeight: "42px", fontWeight: "400" }],
        "arabic-md": ["20px", { lineHeight: "34px", fontWeight: "400" }],
      },

      boxShadow: {
        card: "0 4px 16px rgba(96,93,113,0.1)",
        glass: "0 12px 40px rgba(26,24,41,0.06)",
        "glass-lg": "0 20px 50px rgba(0,0,0,0.1)",
      },
    },
  },
  plugins: [],
};
