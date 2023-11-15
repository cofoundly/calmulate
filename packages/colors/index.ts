import { Color } from '@tremor/react'

import { app } from 'config'

const TAILWIND_COLORS: Color[] = [
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose',
]

const THEME_COLOR = app.colors.theme as Color

// shift the TAILWIND_COLORS array so that the theme color is first but the TAILWIND_COLORS array order is preserved
export const colors: Color[] = TAILWIND_COLORS.slice(TAILWIND_COLORS.indexOf(THEME_COLOR)).concat(
  TAILWIND_COLORS.slice(0, TAILWIND_COLORS.indexOf(THEME_COLOR)),
)
