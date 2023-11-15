import { dirname, join, resolve } from 'path'
import copy from 'rollup-plugin-copy'
import generatePackageJson from 'rollup-plugin-generate-package-json'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

import { dependencies, engines, name, version } from './package.json'

/**
 * List of the regular expressions that match the packages that should be kept external
 */
const externalDepsList: RegExp[] = []
/**
 * The dependencies that should be included in the generated package.json file
 */
const externalDepsObj = {}

/** For each dependency that is not a monorepo package, mark it as an external dependency */
Object.keys(dependencies).forEach(dep => {
  if (dependencies[dep] !== '*') {
    // This regex matches the pattern: 'package', 'package/subpackage', etc.
    const depRegex = new RegExp(`^${dep}(/.*)?$`)
    externalDepsList.push(depRegex)
    externalDepsObj[dep] = dependencies[dep]
  }
})

/**
 * This is the base package.json that will be generated in the output
 */
const basePackage = {
  name: `${name}-dist`,
  version,
  engines,
  type: 'module',
  main: './index.js',
}

export default defineConfig({
  plugins: [tsconfigPaths()],
  resolve: {
    // This setting is necessary for vite to resolve symlinks to packages in the monorepo
    preserveSymlinks: true,
    alias: {
      // fixes This browser does not support `document.implementation.createHTMLDocument` => https://github.com/remarkablemark/html-react-parser/issues/736
      'html-dom-parser': join(dirname(resolve('html-dom-parser')), 'lib/server/html-to-dom.js'),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'functions',
      fileName: 'index',
      // we build to es module format because it is the most modern format and we don't need to support other formats
      formats: ['es'],
    },
    outDir: 'dist',
    rollupOptions: {
      external: externalDepsList,
      plugins: [
        generatePackageJson({
          baseContents: basePackage,
          additionalDependencies: externalDepsObj,
        }),
        /* If you use environment variables in the cloud functions, you will want to copy them into dist */
        copy({
          targets: [{ src: '.env*', dest: 'dist' }],
          hook: 'closeBundle', // we must specify the closeBundle hook so that the files don't get overwritten... that may be a bug with plugin, however, with this setting it works
        }),
      ],
    },
  },
})
