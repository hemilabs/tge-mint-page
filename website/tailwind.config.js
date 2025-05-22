/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [],
  theme: {
    extend: {
      boxShadow: {
        "button-primary":
          "0px 1px 2px 0px rgba(10, 10, 10, 0.04), 0px 0px 6px 0px rgba(255, 246, 237, 0.24) inset",
        "button-primary-focused":
          "0px 0px 0px 2px #FFF, 0px 0px 0px 4px var(--Color-Orange-500, #FF6C15), 0px 1px 2px 0px rgba(10, 10, 10, 0.04), 0px 0px 6px 0px rgba(255, 246, 237, 0.24) inset",
        "button-secondary": "0px 1px 2px 0px rgba(10, 10, 10, 0.04)",
        "button-secondary-focused":
          "0px 0px 0px 2px #FFF, 0px 0px 0px 4px var(--Color-Orange-500, #FF6C15), 0px 1px 2px 0px rgba(10, 10, 10, 0.04)",
      },
      colors: {
        orange: {
          50: "#FFF6ED",
          100: "#FFEBD4",
          200: "#FFD4A8",
          300: "#FFB570",
          400: "#FF8937",
          500: "#FF6C15",
          600: "#F04D06",
          700: "#C73807",
          800: "#9e2d0E",
          900: "#7F280F",
          950: "#451105",
          hemi: "#FF5F00",
        },
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      fontSize: {
        // Prefer ordering by font size instead of keys
        /* eslint-disable sort-keys */
        xxs: [
          "0.688rem", // 11px,
          {
            letterSpacing: "-0.22px",
            lineHeight: "11px",
          },
        ],
        sm: [
          "0.8125rem", // 13px
          {
            letterSpacing: "-0.28px",
            lineHeight: "20px",
          },
        ],
        "4.5xl": [
          "2.5rem",
          {
            letterSpacing: "-0.075",
            lineHeight: "3rem",
          },
        ],
        "6.5xl": [
          "4rem",
          {
            letterSpacing: "-0.15rem",
            lineHeight: "4.5rem",
          },
        ],
        /* eslint-enable sort-keys */
      },
      spacing: {
        4.5: "1.125rem",
        6.5: "1.625rem",
        18: "4.5rem",
      },
    },
  },
};
