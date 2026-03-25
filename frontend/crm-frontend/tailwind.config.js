/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0A0F2C',
          light: '#1a2050',
        },
        accent: '#1D4ED8',
        surface: '#F8F9FA',
        border: '#E5E7EB',
        muted: '#6B7280',
        tag: {
          weekly: '#D1FAE5',
          'weekly-text': '#065F46',
          monthly: '#FEF3C7',
          'monthly-text': '#92400E',
          personal: '#EDE9FE',
          'personal-text': '#5B21B6',
          product: '#DBEAFE',
          'product-text': '#1E40AF',
          business: '#FCE7F3',
          'business-text': '#9D174D',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      },
      borderRadius: {
        DEFAULT: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
        full: '9999px',
      },
      boxShadow: {
        card: '0 1px 3px 0 rgba(0,0,0,0.08), 0 1px 2px -1px rgba(0,0,0,0.06)',
        modal: '0 20px 60px rgba(0,0,0,0.15)',
      },
    },
  },
  plugins: [],
}
