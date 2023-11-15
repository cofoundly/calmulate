import defaultTheme from 'tailwindcss/defaultTheme'

import themeColors from './themeColors.json'

export const tailwindTheme = {
  transparent: 'transparent',
  current: 'currentColor',
  extend: {
    fontFamily: {
      sans: ['Inter Variable', ...defaultTheme.fontFamily.sans],
      display: ['Lexend Variable', ...defaultTheme.fontFamily.sans],
    },
    // we extract the colors to themeColors so that we can change them easily using our helper script
    // yarn build:theme --themeColor teal --neutralColor gray
    // but if you would prefer to hardcode the colors, you can do that too
    colors: themeColors,
  },
}
