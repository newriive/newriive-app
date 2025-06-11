
module.exports = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          indigo: '#3B3B98',      // primary brand
          gold: '#F9A825',        // highlight
          teal: '#009688',        // accent
          gray: '#F5F5F5',        // bg light
          dark: '#4B5563',        // text dark
          white: '#FFFFFF',
        },
      },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        sm: '6px',
        md: '12px',
        xl: '24px',
      },
      boxShadow: {
        md: '0 4px 12px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
}
