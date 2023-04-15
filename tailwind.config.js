/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./index.html","./src/**/*.{ts,tsx}" ],
  darkMode: 'class',
  theme: {
    extend: {},
    screens: {
      'se': '375px',
      'xs': '390px',
      'xr': '414px',
      'sm': '640px',
			'md': '768px',
      'lmd': '820px',
			'lg': '1024px',
			'xl': '1280px',
			'2xl': '1536px',
    }
  },
  plugins: [],
}

