module.exports = {
  content: ['./src/**/*.tsx',
  './screens/**/*.{tsx,js}',
  './components/**/*.{tsx,js}',
  './src/**/*.{html,js,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: require('tailwind-rn/unsupported-core-plugins'),
}
