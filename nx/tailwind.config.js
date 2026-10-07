/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  corePlugins: { preflight: false }, // tema TelorIjo sudah punya reset sendiri
  theme: { extend: { colors: { tj: { green: '#2e8b2e', lime: '#9be15a', ink: '#14281a', yellow: '#ffc94d' } } } },
  plugins: []
};
