/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0a0a12',
        bg2: '#101018',
        panel: '#15151f',
        line: '#000000',
        green: '#39ff6a',
        red: '#ff3355',
        amber: '#ffc23c',
        offwhite: '#f4f6f5',
        dim: '#7c8389',
      },
    },
  },
  plugins: [],
};
