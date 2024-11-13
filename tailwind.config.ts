const config = {
  important: true,
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: [
    './lib/components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        xs: '475px',
      },
      fontFamily: {
        sacramento: ['Sacramento', 'regular'],
      },
    },
  },
  daisyui: {
    themes: [
      {
        blue: {
          primary: '#274e88',
          secondary: '#006161',
          accent: '#E64833',
          neutral: '#90AEAD',
          'base-100': '#11233c',

          info: '#0000ff',
          success: '#00ff00',
          warning: '#00ff00',
          error: '#ff0000',
        },
        vintage: {
          primary: '#244855',
          secondary: '#874F41',
          accent: '#E64833',
          neutral: '#90AEAD',
          'base-100': '#FBE9D0',

          info: '#0000ff',
          success: '#00ff00',
          warning: '#00ff00',
          error: '#ff0000',
        },
      },
    ],
  },
  plugins: [require('daisyui')],
};
export default config;
