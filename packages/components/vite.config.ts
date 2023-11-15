import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import svgr from 'vite-plugin-svgr'
import viteTsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
const config = ({ mode }) => {
  // this allows us to use env variables in this file
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  return defineConfig({
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
    ],
    // @ts-expect-error test is valid config
    test: {
      environment: 'happy-dom',
      setupFiles: ['./src/test/setup.ts'],
    },
  })
}

export default config
