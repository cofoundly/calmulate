import { sentryVitePlugin } from '@sentry/vite-plugin'
import react from '@vitejs/plugin-react'
import colors from 'tailwindcss/colors'
import { defineConfig, loadEnv } from 'vite'
import handlebars from 'vite-plugin-handlebars'
import svgr from 'vite-plugin-svgr'
import viteTsconfigPaths from 'vite-tsconfig-paths'

import { app } from '../config'

// https://vitejs.dev/config/
const config = ({ mode }) => {
  // this allows us to use env variables in this file
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  const SHOULD_USE_SENTRY = Boolean(
    process.env.VITE_SENTRY_AUTH_TOKEN && process.env.VITE_SENTRY_ORG && process.env.VITE_SENTRY_PROJECT,
  )

  return defineConfig({
    build: {
      sourcemap: SHOULD_USE_SENTRY,
    },
    plugins: [
      viteTsconfigPaths(),
      react({
        // disable fastRefresh while testing to fix https://stackoverflow.com/questions/73815639/how-to-use-jsx-in-a-web-worker-with-vite
        fastRefresh: !process.env.TEST,
      }),
      svgr({
        exportAsDefault: true,
        svgrOptions: {
          svgoConfig: {
            attributes: {
              fill: 'currentColor',
            },
          },
          // enables us to size svg's with the css font-size property
          icon: '1em',
        },
      }),
      handlebars({
        context: {
          title: app.name,
          description: app.description,
          themeColor: colors[app.colors.theme as keyof typeof colors][500],
        },
      }),
      {
        ...(SHOULD_USE_SENTRY &&
          sentryVitePlugin({
            authToken: process.env.VITE_SENTRY_AUTH_TOKEN,
            org: process.env.VITE_SENTRY_ORG,
            project: process.env.VITE_SENTRY_PROJECT,
          })),
      },
    ],
    // @ts-expect-error test is valid config
    test: {
      environment: 'happy-dom',
      setupFiles: ['./src/test/setup.ts'],
    },
  })
}

export default config
