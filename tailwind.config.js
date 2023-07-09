/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  purge: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: false,
  theme: {
    fill: (theme) => ({
      red: theme("colors.red.primary"),
    }),
    extend: {
      backdropBlur: {
        "3xl": "3rem",
      },
      backdropOpacity: {
        50: "0.5",
      },
    },
    colors: {
      white: "#ffffff",
      yellow: {
        300: "#fde047",
      },
      pink: {
        600: "#db2777",
      },
      amber: {
        500: "#f59e0b",
      },
      blue: {
        medium: "#3b82f6",
        primary: "#0095F6",
        200: "#bae6fd",
        300: "#7dd3fc",
        400: "#38bdf8",
      },
      black: {
        light: "#262626",
        faded: "#00000059",
        dark: "#020617",
      },
      slate: {
        100: "#f8fafc",
      },
      gray: {
        50: "#f9fafb",
        100: "#f3f4f6",
        200: "#e5e7eb",
        300: "#d1d5db",
        400: "#9ca3af",
        500: "#6b7280",
        base: "rgba(0, 0, 0, 0.1)",
        background: "#fafafa",
        primary: "#dbdbdb",
        medium: "#8e8e8e",
      },
      red: {
        primary: "#ed4956",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
