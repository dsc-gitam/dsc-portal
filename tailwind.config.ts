import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        accent: 'var(--accent)',
        success: 'var(--success)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        google: {
          blue: 'var(--google-blue)',
          red: 'var(--google-red)',
          yellow: 'var(--google-yellow)',
          green: 'var(--google-green)',
        },
      },
      fontFamily: {
        sans: ['Google Sans', 'sans-serif'],
        display: ['Google Sans Display', 'Google Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config