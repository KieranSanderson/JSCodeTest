/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/*.{ts,tsx,html}",
    "./src/**/*.{ts,tsx,html}",
    "./**/*.{ts,tsx,html}",
    "./src/components/*.{ts,tsx,html}"
  ],
  theme: {
    extend: {
      colors: {
          transparent: 'transparent',
          current: 'currentColor',
          black: colors.black,
          blue: colors.blue,
          cyan: colors.cyan,
          emerald: colors.emerald,
          fuchsia: colors.fuchsia,
          slate: colors.slate,
          gray: colors.gray,
          neutral: colors.neutral,
          stone: colors.stone,
          green: colors.green,
          indigo: colors.indigo,
          lime: colors.lime,
          orange: colors.orange,
          pink: colors.pink,
          purple: colors.purple,
          red: colors.red,
          rose: colors.rose,
          sky: colors.sky,
          teal: colors.teal,
          violet: colors.violet,
          yellow: colors.amber,
          white: colors.white,
      },
      screens: {
        'sm': '640px',
        // => @media (min-width: 640px) { ... }

        'md': '768px',
        // => @media (min-width: 768px) { ... }

        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }

        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }

        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
      }
    },
  },
  plugins: [],
}

