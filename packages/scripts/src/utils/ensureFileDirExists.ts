import * as fs from 'fs'

export const ensureFileDirExists = (dir: string): void => {
  fs.mkdirSync(dir, { recursive: true })
}
