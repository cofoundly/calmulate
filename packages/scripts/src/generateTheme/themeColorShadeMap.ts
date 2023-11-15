// maps our theme color to the tailwind shade color
// e.g. in app.json, if themeColor is "teal", theme.brand.faint color will map to tailwind's teal-50 color
export const themeColorShadeMap = {
  // light mode
  theme: {
    brand: {
      faint: {
        color: 'base',
        shade: '50',
      },
      muted: {
        color: 'base',
        shade: '200',
      },
      subtle: {
        color: 'base',
        shade: '400',
      },
      DEFAULT: {
        color: 'base',
        shade: '500',
      },
      emphasis: {
        color: 'base',
        shade: '700',
      },
      inverted: { color: 'white' },
    },
    background: {
      muted: {
        color: 'neutral',
        shade: '50',
      },
      subtle: {
        color: 'neutral',
        shade: '100',
      },
      DEFAULT: { color: 'white' },
      emphasis: {
        color: 'neutral',
        shade: '700',
      },
    },
    border: {
      DEFAULT: {
        color: 'neutral',
        shade: '200',
      },
    },
    ring: {
      DEFAULT: {
        color: 'neutral',
        shade: '200',
      },
    },
    content: {
      subtle: {
        color: 'neutral',
        shade: '400',
      },
      DEFAULT: {
        color: 'neutral',
        shade: '700',
      },
      emphasis: {
        color: 'neutral',
        shade: '800',
      },
      strong: {
        color: 'neutral',
        shade: '900',
      },
      inverted: { color: 'white' },
    },
  },
  'dark-theme': {
    brand: {
      faint: {
        color: 'base',
        shade: '900',
      },
      muted: {
        color: 'base',
        shade: '950',
      },
      subtle: {
        color: 'base',
        shade: '800',
      },
      DEFAULT: {
        color: 'base',
        shade: '500',
      },
      emphasis: {
        color: 'base',
        shade: '400',
      },
      inverted: {
        color: 'neutral',
        shade: '950',
      },
    },
    background: {
      muted: {
        color: 'neutral',
        shade: '800',
      },
      subtle: {
        color: 'neutral',
        shade: '800',
      },
      DEFAULT: {
        color: 'neutral',
        shade: '900',
      },
      emphasis: {
        color: 'neutral',
        shade: '300',
      },
    },
    border: {
      DEFAULT: {
        color: 'neutral',
        shade: '800',
      },
    },
    ring: {
      DEFAULT: {
        color: 'neutral',
        shade: '800',
      },
    },
    content: {
      subtle: {
        color: 'neutral',
        shade: '600',
      },
      DEFAULT: {
        color: 'neutral',
        shade: '200',
      },
      emphasis: {
        color: 'neutral',
        shade: '100',
      },
      strong: {
        color: 'neutral',
        shade: '50',
      },
      inverted: {
        color: 'neutral',
        shade: '900',
      },
    },
  },
}
