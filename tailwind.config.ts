import type { Config } from "tailwindcss";

/**
 * EYK Mueblería · Tailwind config
 * El sistema de diseño completo (color, tipografía, easing) vive como
 * variables CSS en src/app/globals.css. Aquí solo registramos los tokens
 * que necesitan ser utilities Tailwind (fonts, colores con nombre, etc.).
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-spectral)", "Georgia", "serif"],
        body: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      colors: {
        // Aliases mapeados a las CSS vars (para `bg-bone`, `text-walnut`, etc.)
        bone: "var(--color-bone)",
        "bone-2": "var(--color-bone-2)",
        "bone-3": "var(--color-bone-3)",
        line: "var(--color-line)",
        "line-strong": "var(--color-line-strong)",
        ink: "var(--color-ink)",
        "ink-2": "var(--color-ink-2)",
        "ink-muted": "var(--color-ink-muted)",
        "ink-subtle": "var(--color-ink-subtle)",
        walnut: "var(--color-walnut)",
        "walnut-deep": "var(--color-walnut-deep)",
        clay: "var(--color-clay)",
        "clay-soft": "var(--color-clay-soft)",
        sage: "var(--color-sage)",
      },
      transitionTimingFunction: {
        "out-quart": "cubic-bezier(0.165, 0.84, 0.44, 1)",
        "out-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
      },
      maxWidth: {
        edge: "84rem",
      },
    },
  },
  plugins: [],
};

export default config;
