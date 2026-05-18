import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0A0A0A",
        bone: "#F5F1EA",
        gold: "#B8935A",
        "gold-dim": "#8C6F44",
        "ink-soft": "#1A1A1A",
        "bone-dim": "#E8E2D5",
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display": ["clamp(3.5rem, 11vw, 11rem)", { lineHeight: "0.92", letterSpacing: "-0.04em" }],
        "display-sm": ["clamp(2.5rem, 7vw, 6rem)", { lineHeight: "0.95", letterSpacing: "-0.03em" }],
        "kicker": ["0.75rem", { lineHeight: "1", letterSpacing: "0.25em" }],
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "in-out-expo": "cubic-bezier(0.87, 0, 0.13, 1)",
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "ken-burns": "kenBurns 18s ease-in-out infinite alternate",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        kenBurns: {
          "0%": { transform: "scale(1) translate(0, 0)" },
          "100%": { transform: "scale(1.12) translate(-1%, -1%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
