import { defineConfig, loadEnv } from 'vite'
import viteTsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
const config = ({ mode }) => {
  // this allows us to use env variables in this file
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  return defineConfig({
    plugins: [viteTsconfigPaths()],
  })
}

export default config
