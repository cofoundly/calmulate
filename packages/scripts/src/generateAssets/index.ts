import { tailwindTheme } from 'config'
import { readFileSync, unlinkSync, writeFileSync } from 'fs'
import * as path from 'path'

import { copyFile } from '@/utils/copyFile'
import { createFavicon } from '@/utils/createFavicon'
import { createPng } from '@/utils/createPng'
import { ensureFileDirExists } from '@/utils/ensureFileDirExists'
import { log } from '@/utils/log'

const CURRENT_WORKING_DIRECTORY = process.env.PWD || __dirname
const ROOT_PATH = path.join(CURRENT_WORKING_DIRECTORY, '..')
const APP_PATH = path.join(ROOT_PATH, './app')
const APP_PUBLIC_PATH = path.join(APP_PATH, './public')
const APP_FAVICON_PATH = path.join(APP_PUBLIC_PATH, './favicon.ico')
const COMPONENTS_PATH = path.join(ROOT_PATH, './components')
const COMPONENTS_ASSETS_PATH = path.join(COMPONENTS_PATH, './src/assets')
const WEBSITE_PATH = path.join(ROOT_PATH, './website')
const WEBSITE_APP_PATH = path.join(WEBSITE_PATH, './src/app')
const PATH_TO_CONFIG_MODULE = require.resolve('config')
const PATH_TO_CONFIG_FOLDER = path.join(PATH_TO_CONFIG_MODULE, '..')
const LOGO_PATH = path.join(PATH_TO_CONFIG_FOLDER, 'logo.svg')
const BRAND_COLOR = tailwindTheme.extend.colors.theme.brand.DEFAULT
const BRANDED_LOGO_PATH = path.join(PATH_TO_CONFIG_FOLDER, 'logo-temp.svg')

async function main(): Promise<void> {
  log('Generating assets...')

  ensureFileDirExists(APP_PUBLIC_PATH)
  ensureFileDirExists(COMPONENTS_ASSETS_PATH)
  ensureFileDirExists(WEBSITE_APP_PATH)

  // replace any instances of currentColor in the svg with our brand color
  // for use as favicon, emails etc.
  const svgString = readFileSync(LOGO_PATH, 'utf8')

  const svgStringWithBrandColor = svgString.replace(/currentColor/g, BRAND_COLOR)

  // create temporary file with brand color
  writeFileSync(BRANDED_LOGO_PATH, svgStringWithBrandColor)

  await copyFile({
    inputPath: BRANDED_LOGO_PATH,
    outputPath: path.join(APP_PUBLIC_PATH, './icon.svg'),
  })

  await createFavicon({
    inputPath: BRANDED_LOGO_PATH,
    outputPath: APP_FAVICON_PATH,
  })

  await copyFile({
    inputPath: APP_FAVICON_PATH,
    outputPath: path.join(WEBSITE_APP_PATH, './icon.ico'),
  })

  await createPng({
    inputPath: BRANDED_LOGO_PATH,
    outputPath: path.join(APP_PUBLIC_PATH, './apple-touch-icon.png'),
    size: 180,
  })

  await createPng({
    inputPath: BRANDED_LOGO_PATH,
    outputPath: path.join(APP_PUBLIC_PATH, './icon-emails.png'),
    size: 64,
  })

  await copyFile({
    inputPath: LOGO_PATH,
    outputPath: path.join(COMPONENTS_ASSETS_PATH, './logo.svg'),
  })

  // remove temporary file
  unlinkSync(BRANDED_LOGO_PATH)

  log('Done ✅')
}

main()
