import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#1F1219",
        plum: {
          900: "#2A1220",
          800: "#3A1830",
          700: "#52283F",
        },
        rose: {
          DEFAULT: "#C8325F",
          dark: "#A3244B",
          light: "#F4A9C0",
        },
        blush: {
          50: "#FFF7F8",
          100: "#FCEEF1",
          200: "#F6D7E0",
        },
        line: {
          DEFAULT: "#F1E4E8",
          strong: "#EADBE0",
        },
        muted: "#6E5A63",
        strike: "#7A6570",
        success: {
          DEFAULT: "#2E6B45",
          bg: "#E4F2E9",
        },
        tint: {
          1: "#FBE4EA",
          2: "#FCE6D9",
          3: "#FAF0D4",
          4: "#E2EEE5",
          5: "#ECE4F6",
          6: "#E2ECF6",
          7: "#F1E8DF",
        },
      },
      fontFamily: {
        bricolage: ["var(--font-bricolage)", "system-ui", "sans-serif"],
        instrument: ["var(--font-instrument)", "Georgia", "serif"],
        dmsans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        anek: ["var(--font-anek-bangla)", "system-ui", "sans-serif"],
        siliguri: ["var(--font-hind-siliguri)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        pill: "999px",
        card: "24px",
        "card-lg": "32px",
        input: "14px",
        modal: "28px",
      },
      maxWidth: {
        container: "1328px",
      },
      boxShadow: {
        modal: "0 40px 80px -30px rgba(20, 8, 14, 0.6)",
        card: "0 24px 48px -20px rgba(58, 24, 48, 0.35)",
        pill: "0 4px 14px 0 rgba(31, 18, 25, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
