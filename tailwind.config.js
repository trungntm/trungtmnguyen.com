/* eslint-disable @typescript-eslint/no-require-imports */
/** @type {import("tailwindcss").Config } */
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        shine: 'shine var(--duration) ease-in-out infinite',
        'series-fade-in': 'series-fade-in 0.5s ease-out',
        'series-scale': 'series-scale 0.2s ease-out',
        'series-progress': 'series-progress 1s ease-in-out',
        'series-pulse': 'series-pulse 2s infinite',
        'series-glow': 'series-glow 2s infinite',
      },
      keyframes: {
        shine: {
          '0%': {
            'background-position': '0% 0%',
          },
          '50%': {
            'background-position': '100% 100%',
          },
          '100%': {
            'background-position': '0% 0%',
          },
        },
        'series-fade-in': {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'series-scale': {
          '0%': {
            transform: 'scale(0.95)',
          },
          '100%': {
            transform: 'scale(1)',
          },
        },
        'series-progress': {
          '0%': {
            transform: 'scaleX(0)',
          },
          '100%': {
            transform: 'scaleX(1)',
          },
        },
        'series-pulse': {
          '0%, 100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
          '50%': {
            opacity: '0.8',
            transform: 'scale(1.05)',
          },
        },
        'series-glow': {
          '0%, 100%': {
            'box-shadow': '0 0 0 0 rgba(59, 130, 246, 0.4)',
          },
          '50%': {
            'box-shadow': '0 0 0 8px rgba(59, 130, 246, 0)',
          },
        },
      },
      spacing: {
        'series-xs': '0.125rem',
        'series-sm': '0.375rem',
        'series-md': '0.75rem',
        'series-lg': '1.25rem',
        'series-xl': '2rem',
      },
      borderRadius: {
        series: '0.5rem',
        'series-lg': '0.75rem',
        'series-xl': '1rem',
      },
      boxShadow: {
        series: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'series-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'series-glow': '0 0 0 1px rgba(59, 130, 246, 0.1), 0 1px 3px 0 rgba(59, 130, 246, 0.1)',
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            a: {
              color: theme('colors.primary.500'),
              '&:hover': {
                color: `${theme('colors.primary.600')}`,
                cursor: 'pointer',
              },
              code: { color: theme('colors.primary.400') },
            },
            'h1,h2': {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
            },
            h3: {
              fontWeight: '600',
            },
            code: {
              color: theme('colors.indigo.500'),
            },
          },
        },
        invert: {
          css: {
            a: {
              color: theme('colors.primary.500'),
              '&:hover': {
                color: `${theme('colors.primary.400')}`,
                cursor: 'pointer',
              },
              code: { color: theme('colors.primary.400') },
            },
            'h1,h2,h3,h4,h5,h6': {
              color: theme('colors.gray.100'),
            },
          },
        },
      }),
    },
  },

  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/container-queries'),
  ],
}
