/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  purge: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backdropBlur: {
        "3xl": "3rem",
      },
      keyframes: {
        showRight: {
          "0%": {
            opacity: "0",
            transform: "translateX(-70px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0px)",
          },
        },
        changeWidthIn: {
          "0%": {
            width: "10%",
          },
          "100%": {
            width: "5%",
          },
        },
        showModal: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        showCreateAvatar: {
          "0%": {
            height: "40%",
            width: "30%",
            opacity: "0",
          },
          "100%": {
            heigth: "25%",
            width: "25%",
            opacity: "1",
          },
        },
      },
      boxShadow: {
        right: "4px 0 6px -4px rgba(0, 0, 0, 0.3)",
      },
      animation: {
        showRight: "showRight 0.2s ease-out",
        changeWidthIn: "changeWidthIn 0.2s ease-out",
        changeWidthOut: "changeWidthOut 0.2s ease-out",
        showModal: "showModal 0.1s ease-out",
        hideModal: "hideModal 0.1s ease-out",
        showCreateAvatar: "showCreateAvatar 0.1s ease-out",
      },
      backdropOpacity: {
        50: "0.5",
      },
    },
    colors: {
      current: "currentColor",
      black: {
        light: "#262626",
        faded: "#00000059",
        dark: "#000",
      },
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
        bright: "#3b82f6",
        pure: "#0095F6",
        200: "#bae6fd",
        300: "#7dd3fc",
        400: "#38bdf8",
      },
      slate: {
        100: "#f8fafc",
      },
      gray: {
        50: "#f9fafb",
        70: "#f3f3f3",
        100: "#f3f4f6",
        200: "#e5e7eb",
        300: "#d1d5db",
        400: "#9ca3af",
        500: "#6b7280",
        base: "#00000010",
        background: "#fafafa",
        primary: "#dbdbdb",
        medium: "#8e8e8e",
      },
      zinc: {
        700: "#27272a",
        600: "#52525b",
      },
      rose: {
        500: "#f43f5e",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
