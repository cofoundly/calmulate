import { app, tailwindTheme } from 'config'
import fs from 'fs'
import path from 'path'
import colors from 'tailwindcss/colors'

import { log } from '@/utils/log'

import { args } from './args'
import { themeColorShadeMap } from './themeColorShadeMap'

const THEME_COLORS = tailwindTheme.extend.colors
const PATH_TO_CONFIG_MODULE = require.resolve('config')
const PATH_TO_CONFIG_FOLDER = path.join(PATH_TO_CONFIG_MODULE, '..')
const INVALID_COLORS = ['inherit', 'current', 'transparent', 'black', 'white']

const getHexColorFromThemeColor = (
  baseColors:
    | string
    | {
        [key: string]: string
      },
  themeColor: {
    color: string
    shade?: string
  },
): string => {
  if (typeof baseColors === 'string') {
    throw new Error(`themeColor ${baseColors} is not a valid color`)
  }

  if (themeColor.color === 'white') {
    return '#fff'
  }

  const color = baseColors[themeColor.shade as keyof typeof baseColors]

  return color
}

async function main(): Promise<void> {
  log('Generating theme...')

  const { themeColor = app.colors.theme, neutralColor = app.colors.neutral } = await args()

  if (INVALID_COLORS.includes(themeColor)) {
    throw new Error(`themeColor ${themeColor} is not a valid color`)
  }

  if (INVALID_COLORS.includes(neutralColor)) {
    throw new Error(`neutralColor ${neutralColor} is not a valid color`)
  }

  const baseColors = colors[themeColor as keyof typeof colors]

  if (!baseColors) {
    throw new Error(`themeColor ${themeColor} is not a valid color`)
  }

  const neutralColors = colors[neutralColor as keyof typeof colors]

  if (!neutralColors) {
    throw new Error(`neutralColor ${neutralColor} is not a valid color`)
  }

  const newThemeColors = {
    ...THEME_COLORS,
  }

  // for each color in themeColorShadeMap, convert it to tailwind's color
  Object.keys(newThemeColors).forEach(themeKey => {
    type ThemeKey = keyof typeof newThemeColors

    Object.keys(newThemeColors[themeKey as ThemeKey]).forEach(usageKey => {
      type UsageKey = keyof typeof newThemeColors[ThemeKey]

      Object.keys(newThemeColors[themeKey as ThemeKey][usageKey as UsageKey]).forEach(variantKey => {
        type VariantKey = keyof typeof newThemeColors[ThemeKey][UsageKey]

        const themeColor = themeColorShadeMap[themeKey as ThemeKey][usageKey as UsageKey][variantKey as VariantKey]
        const color = getHexColorFromThemeColor(themeColor.color === 'base' ? baseColors : neutralColors, themeColor)

        newThemeColors[themeKey as ThemeKey][usageKey as UsageKey][variantKey as VariantKey] = color
      })
    })
  })

  // write the new themeColors to themeColors.json
  fs.writeFileSync(path.join(PATH_TO_CONFIG_FOLDER, `themeColors.json`), JSON.stringify(newThemeColors, null, 2))

  // and themeColor and neutralColor to app.json
  const newApp: typeof app = {
    ...app,
    colors: {
      theme: themeColor,
      neutral: neutralColor,
    },
  }

  fs.writeFileSync(path.join(PATH_TO_CONFIG_FOLDER, `app.json`), JSON.stringify(newApp, null, 2) + '\n')

  log('Done ✅')
}

main()
