import type { Config } from 'tailwindcss';

const config: Config = {
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
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      screens: {
        xs: '475px',
      },
      fontFamily: {
        sacramento: ['Sacramento', 'regular'],
      },
      gridTemplateColumns: {
        'auto-fit': 'repeat(auto-fit, minmax(200px, 1fr))', // if you change the minmax value, please also change it in resourcesGridWrapper component
      },
    },
  },
  daisyui: {
    themes: [
      {
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
        sleek: {
          primary: '#D1E8E2',
          secondary: '#FFCB9A',
          accent: '#D8B08C',
          neutral: '#116466',
          'base-100': '#2C3531',

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
